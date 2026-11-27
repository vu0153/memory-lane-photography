# Memory Lane AI Live Chat: Preview Implementation

Status: **Staged feature, not production ready.** No production database changes or outbound email delivery are included.

## Implemented

- Responsive public chat popup in css/ai-chat.css and js/ai-chat.js.
- Cloudflare Pages chat API in functions/api/ai/chat.js with a Turnstile challenge, named virtual assistant, session token and quote request queue.
- Staged SQL in docs/sql/ai-chat-preview-schema.sql (applied ONLY to the staging project).
- Admin quote review API in functions/api/ai/admin/quotes.js, verifying Supabase Auth and admin_users.
- Admin AI Inbox in js/ai-inbox.js and css/ai-inbox.css. Can save email/price drafts; cannot send emails.
- .gitignore protection for local secrets.
- Cloudflare branch-preview public Supabase client now automatically points to staging; production/custom domain still points to production.
- Preview Admin login now authenticates against staging and displays only the AI Inbox. Legacy Admin write panels are not initialized.
- Preview chat APIs reject production domains and incorrect Supabase project URLs.

## Staging project now provisioned (27 November 2026)

- Supabase project: memory-lane-ai-staging
- Project ref: livorstsjtixdgksuzou
- Organization: MemoryLane
- Region: ap-southeast-2 (Sydney)
- Monthly project creation cost quoted by Supabase: USD 0
- Migrations: create_ai_chat_staging_schema (20261127052723); add_ai_chat_staging_rate_limiter (20261127053254)
- Tables: ai_chat_sessions, ai_chat_messages, ai_quote_requests, ai_chat_rate_limits, admin_users
- All five tables have RLS enabled, with no anon or authenticated table access.
- Synthetic insert tests passed inside a transaction that was rolled back; all three AI content tables remain empty.
- No changes were made to the production Supabase project.

WARNING: Do not configure a Cloudflare preview with production Supabase secrets. The preview credentials must be scoped to the staging project above.

## Remaining staging setup

1. Completed: separate Supabase preview project created with NO real customer records.
2. Completed: reviewed schema applied to the staging project; migration recorded.
3. Create a TEST Auth user in the staging project Dashboard (Authentication > Users > Add user), then add their UUID to the staging admin_users table. Do not share the user's password with ChatGPT.
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

The browser now selects staging Supabase whenever the hostname is a branch Preview of memory-lane-photography.pages.dev. Legacy booking form writes are still intentionally blocked on preview, and legacy Admin CRUD panels remain disabled. The staging project has only the dedicated AI tables, so the remaining site sections are for UI review only. Never enter real client details in preview.

## How it currently works

- With missing secrets, GET /api/ai/chat returns enabled=false, and the popup offers the existing booking form.
- When enabled, a visitor is given one named virtual assistant and a 256-bit random session token stored in the browser.
- Only the SHA-256 hash of the token is stored in Supabase. Same-browser return can restore chat history.
- The model is instructed not to quote prices or promise a date; quote questions request an email.
- Email plus quote request goes to admin queue. Admin can set draft price, subject and body. No outbound email is sent.
- The customer-supplied email is not verified. Cross-device recovery by email needs a separate OTP workflow.

## Before production

- Preview backend enforces an atomic limit of 24 chat messages per hour per Cloudflare client IP; IPs are stored as salted hashes, and only the server role may call the rate-limiter RPC.
- Add production abuse monitoring, OpenAI spending controls and load tests. Turnstile and a basic IP limit alone do not fully stop abuse.
- Build immutable approval and email outbox with idempotent Resend delivery. Never let the model initiate sending.
- Add privacy notices, retention/deletion policy and verified email identity recovery.
- Test all stages and failure handling with synthetic data before using customer data.
- Audit existing RLS vulnerabilities (booking delete and Free Portrait editing policies) separately; get approval before any production migration.
- Obtain approval of the Pull Request and plan a reversible production deployment.

Do not merge this PR into main yet.