# Memory Lane AI Live Chat: Preview Implementation

Status: **Staged feature, not production ready.** No production database changes or outbound email delivery are included.

## Implemented

- Responsive public chat popup in css/ai-chat.css and js/ai-chat.js.
- Cloudflare Pages chat API in functions/api/ai/chat.js with a Turnstile challenge, named virtual assistant, session token and quote request queue.
- Staged SQL in docs/sql/ai-chat-preview-schema.sql (not applied automatically).
- Admin quote review API in functions/api/ai/admin/quotes.js, verifying Supabase Auth and admin_users.
- Admin AI Inbox in js/ai-inbox.js and css/ai-inbox.css. Can save email/price drafts; cannot send emails.
- .gitignore protection for local secrets.

## Required staging setup

1. Create a separate Supabase preview project with NO real customer records.
2. Review and run docs/sql/ai-chat-preview-schema.sql in the preview project.
3. Create a test Admin and add the test user to admin_users (needs same schema as production).
4. In Cloudflare Pages Preview environment only, configure:
   - AI_CHAT_ENABLED=true (only after staging tests)
   - OPENAI_API_KEY (secret, low spend cap)
   - AI_CHAT_MODEL=gpt-4.1-mini (check availability)
   - SUPABASE_URL (preview project URL, never production)
   - SUPABASE_SERVICE_ROLE_KEY (preview secret, server only)
   - SUPABASE_ANON_KEY (preview publishable or anon key for Auth verification)
   - TURNSTILE_SECRET_KEY (secret)
   - AI_CHAT_TURNSTILE_SITE_KEY (site key with preview hostname)
5. Test UI and API using fictitious clients and email addresses only.

IMPORTANT: existing js/supabase.js still points to PRODUCTION Supabase for the rest of the static website. Therefore preview is NOT fully isolated. Do not submit regular booking forms on a preview deployment. A separate follow-up patch must route non-AI preview functionality to a staging Supabase project before production-like end-to-end testing.

## How it currently works

- With missing secrets, GET /api/ai/chat returns enabled=false, and the popup offers the existing booking form.
- When enabled, a visitor is given one named virtual assistant and a 256-bit random session token stored in the browser.
- Only the SHA-256 hash of the token is stored in Supabase. Same-browser return can restore chat history.
- The model is instructed not to quote prices or promise a date; quote questions request an email.
- Email plus quote request goes to admin queue. Admin can set draft price, subject and body. No outbound email is sent.
- The customer-supplied email is not verified. Cross-device recovery by email needs a separate OTP workflow.

## Before production

- Apply authenticated per-client rate limits, OpenAI spending controls and monitoring. Turnstile alone does not fully stop abuse.
- Build immutable approval and email outbox with idempotent Resend delivery. Never let the model initiate sending.
- Add privacy notices, retention/deletion policy and verified email identity recovery.
- Test all stages and failure handling with synthetic data before using customer data.
- Audit existing RLS vulnerabilities (booking delete and Free Portrait editing policies) separately; get approval before any production migration.
- Obtain approval of the Pull Request and plan a reversible production deployment.

Do not merge this PR into main yet.