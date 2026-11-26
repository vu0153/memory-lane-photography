-- Memory Lane AI Live Chat V1, staged schema only.
-- DO NOT run against production until backups, preview isolation and approval are complete.
-- Backend only; do not grant anon/authenticated access to customer messages.
CREATE TABLE IF NOT EXISTS public.ai_chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE CHECK (length(token_hash) = 64),
  persona text NOT NULL CHECK (persona IN ('Sophie','Emma','Alex','Olivia')),
  quote_status text NOT NULL DEFAULT 'none'
    CHECK (quote_status IN ('none','collecting','pending_review','quoted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS public.ai_chat_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id uuid NOT NULL REFERENCES public.ai_chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 5000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_chat_messages_recent
  ON public.ai_chat_messages (session_id, created_at DESC, id DESC);
CREATE TABLE IF NOT EXISTS public.ai_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES public.ai_chat_sessions(id) ON DELETE CASCADE,
  email text NOT NULL CHECK (char_length(email) <= 254),
  context_excerpt text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending_review'
    CHECK (status IN ('pending_review','reviewing','approved','sent','cancelled')),
  quoted_price_aud numeric(10,2) CHECK (quoted_price_aud >= 0),
  email_subject text,
  email_body text,
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ai_quote_requests_review
  ON public.ai_quote_requests(status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS ai_quote_requests_one_active
  ON public.ai_quote_requests(session_id) WHERE status IN ('pending_review','reviewing','approved');
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_quote_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.ai_chat_sessions,public.ai_chat_messages,public.ai_quote_requests FROM anon,authenticated;
REVOKE ALL ON SEQUENCE public.ai_chat_messages_id_seq FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.ai_chat_sessions,public.ai_chat_messages,public.ai_quote_requests TO service_role;
GRANT USAGE,SELECT ON SEQUENCE public.ai_chat_messages_id_seq TO service_role;
-- Intentional: no public/anon/authenticated policies on private AI tables.
-- Access only through the authenticated Cloudflare server API.
-- For production: add retention/deletion policy, email verification, export and backup.
