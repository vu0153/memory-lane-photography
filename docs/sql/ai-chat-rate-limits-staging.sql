-- Staging-only atomic rate limiter for AI live chat.
-- The RPC is intentionally private: only the service_role may execute it.
CREATE TABLE IF NOT EXISTS public.ai_chat_rate_limits (
  key_hash text PRIMARY KEY CHECK (length(key_hash)=64),
  bucket_started_at timestamptz NOT NULL DEFAULT now(),
  hit_count integer NOT NULL DEFAULT 0 CHECK (hit_count>=0)
);
ALTER TABLE public.ai_chat_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.ai_chat_rate_limits FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.ai_chat_rate_limits TO service_role;

CREATE OR REPLACE FUNCTION public.ai_chat_claim_rate_limit(
  p_key_hash text,
  p_max integer DEFAULT 24,
  p_window_seconds integer DEFAULT 3600
) RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public,pg_temp
AS $fn$
DECLARE v_count integer;
BEGIN
  IF length(coalesce(p_key_hash,'')) <> 64 OR
     p_max < 1 OR p_max > 1000 OR
     p_window_seconds < 60 OR p_window_seconds > 86400 THEN
    RETURN false;
  END IF;
  INSERT INTO public.ai_chat_rate_limits AS r (key_hash,bucket_started_at,hit_count)
  VALUES (p_key_hash,clock_timestamp(),1)
  ON CONFLICT (key_hash)
  DO UPDATE SET
    bucket_started_at = CASE
      WHEN r.bucket_started_at < clock_timestamp()-make_interval(secs=>p_window_seconds)
      THEN clock_timestamp() ELSE r.bucket_started_at END,
    hit_count = CASE
      WHEN r.bucket_started_at < clock_timestamp()-make_interval(secs=>p_window_seconds)
      THEN 1 ELSE least(r.hit_count+1,p_max+1) END
  RETURNING hit_count INTO v_count;
  RETURN v_count <= p_max;
END;
$fn$;
REVOKE EXECUTE ON FUNCTION public.ai_chat_claim_rate_limit(text,integer,integer)
  FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.ai_chat_claim_rate_limit(text,integer,integer)
  TO service_role;
