-- Memory Lane private owner profiles, isolated staging only.
-- Small, lossily-compressed WebP portrait bytes are kept behind the admin-only API.
-- Never expose this table to anon / authenticated roles, public Storage or GitHub.
CREATE TABLE IF NOT EXISTS public.ai_admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL CHECK(char_length(display_name) BETWEEN 1 AND 70),
  locale text NOT NULL DEFAULT 'en-AU' CHECK(locale IN ('en-AU','vi-VN')),
  avatar_webp_base64 text CHECK(avatar_webp_base64 IS NULL OR char_length(avatar_webp_base64) BETWEEN 20 AND 100000),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_admin_profiles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.ai_admin_profiles FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON public.ai_admin_profiles TO service_role;
INSERT INTO public.ai_admin_profiles(user_id,display_name,locale)
SELECT id, CASE WHEN lower(email)='mark@marklee.au' THEN 'Mark' ELSE 'Long' END,
 CASE WHEN lower(email)='mark@marklee.au' THEN 'en-AU' ELSE 'vi-VN' END
FROM auth.users
WHERE lower(email) IN ('mark@marklee.au','ngoclong327@gmail.com')
AND email_confirmed_at IS NOT NULL
AND EXISTS(SELECT 1 FROM public.admin_users a WHERE a.user_id=auth.users.id)
ON CONFLICT(user_id) DO NOTHING;
