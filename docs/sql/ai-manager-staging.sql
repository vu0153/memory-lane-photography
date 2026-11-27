-- Memory Lane AI Manager staging, 28 Nov 2026.
-- Run only in the Supabase staging project livorstsjtixdgksuzou.
-- All tables are backend-only. Production must not receive this migration.
CREATE TABLE IF NOT EXISTS public.ai_agent_registry (
  slug text PRIMARY KEY CHECK (slug IN ('manager','customer_service','booking','studio_operations','marketing','finance')),
  display_name text NOT NULL,
  purpose text NOT NULL,
  launch_state text NOT NULL CHECK (launch_state IN ('preview','planned')),
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.ai_agent_registry(slug,display_name,purpose,launch_state)
VALUES
 ('manager','AI Manager','Owner liaison and internal task coordination','preview'),
 ('customer_service','Customer Service','Website conversations and quote enquiry collection','preview'),
 ('booking','Booking & Scheduling','Scheduling checks and booking follow-up','planned'),
 ('studio_operations','Studio Operations','Photo session preparation and gallery delivery','planned'),
 ('marketing','Brand & Marketing','Brand consistency and social content drafts','planned'),
 ('finance','Finance & Analytics','Reporting on sales, margin and performance','planned')
ON CONFLICT(slug) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.ai_policy_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_key text NOT NULL CHECK (policy_key IN ('brand_voice','services','customer_service','booking','studio_operations','marketing','finance')),
  version integer NOT NULL CHECK (version >= 1),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 100),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 8000),
  state text NOT NULL CHECK (state IN ('active','archived')),
  published_by uuid REFERENCES auth.users(id),
  published_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(policy_key,version)
);
CREATE UNIQUE INDEX IF NOT EXISTS ai_policy_one_active
  ON public.ai_policy_versions(policy_key) WHERE state='active';
CREATE INDEX IF NOT EXISTS ai_policy_recent ON public.ai_policy_versions(policy_key,version DESC);

INSERT INTO public.ai_policy_versions(policy_key,version,title,body,state)
VALUES
 ('brand_voice',1,'Studio communication style',
  'Use clear, natural Australian English. Be welcoming, concise and professional. Identify virtual assistants as AI, not human employees. Do not invent testimonials, policies or promises.','active'),
 ('customer_service',1,'Enquiry handling',
  'Ask about the requested photography service, preferred date, location, number of participants and contact email when relevant. Personal quotes are sent separately by email only after studio-owner approval. Do not claim a price or date is confirmed. Escalate complaints and requests to speak to the owner.','active'),
 ('booking',1,'Scheduling restrictions',
  'Preferred dates are requests only. The studio owner confirms actual availability and paid bookings. Do not promise available sessions, deposits, cancellations or refund terms unless explicitly approved.','active')
ON CONFLICT(policy_key,version) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.ai_manager_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  role text NOT NULL CHECK(role IN ('owner','manager')),
  body text NOT NULL CHECK(char_length(body) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_manager_messages_user_recent
  ON public.ai_manager_messages(user_id,created_at DESC,id DESC);

CREATE TABLE IF NOT EXISTS public.ai_manager_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by uuid NOT NULL REFERENCES auth.users(id),
  agent_slug text NOT NULL REFERENCES public.ai_agent_registry(slug),
  title text NOT NULL CHECK(char_length(title) BETWEEN 2 AND 140),
  instructions text NOT NULL CHECK(char_length(instructions) BETWEEN 1 AND 3000),
  status text NOT NULL DEFAULT 'proposed'
    CHECK(status IN ('proposed','approved','blocked','cancelled','completed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz
);
CREATE INDEX IF NOT EXISTS ai_manager_tasks_user_recent
  ON public.ai_manager_tasks(requested_by,created_at DESC);

ALTER TABLE public.ai_agent_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_policy_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_manager_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_manager_tasks ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.ai_agent_registry, public.ai_policy_versions, public.ai_manager_messages, public.ai_manager_tasks FROM anon,authenticated;
REVOKE ALL ON SEQUENCE public.ai_manager_messages_id_seq FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.ai_agent_registry, public.ai_policy_versions, public.ai_manager_messages, public.ai_manager_tasks TO service_role;
GRANT USAGE,SELECT ON SEQUENCE public.ai_manager_messages_id_seq TO service_role;

-- Publish a new policy version atomically. This only runs as the backend service role.
CREATE OR REPLACE FUNCTION public.ai_publish_policy(
  p_key text, p_title text, p_body text, p_publisher uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_next integer;
  v_id uuid;
BEGIN
  IF p_key NOT IN ('brand_voice','services','customer_service','booking','studio_operations','marketing','finance')
     OR char_length(coalesce(p_title,'')) NOT BETWEEN 2 AND 100
     OR char_length(coalesce(p_body,'')) NOT BETWEEN 1 AND 8000
     OR p_publisher IS NULL THEN
    RAISE EXCEPTION 'Invalid policy version';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtext('memorylane_policy_' || p_key)::bigint);
  SELECT coalesce(max(version),0)+1 INTO v_next
    FROM public.ai_policy_versions WHERE policy_key=p_key;
  UPDATE public.ai_policy_versions SET state='archived'
    WHERE policy_key=p_key AND state='active';
  INSERT INTO public.ai_policy_versions(policy_key,version,title,body,state,published_by)
    VALUES(p_key,v_next,p_title,p_body,'active',p_publisher)
    RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.ai_publish_policy(text,text,text,uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.ai_publish_policy(text,text,text,uuid) TO service_role;
