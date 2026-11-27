# Memory Lane AI Owner Dashboard | Staging implementation status

**Build date:** 28 November 2026. **Branch:** feature/ai-live-chat. **Production:** untouched. **Status:** Ready for manual Preview QA, not production release.

## Completed in branch
- Personalized dark-navy Admin navigation, light blue hero, manager org chart and factual department briefing cards.
- Responsive desktop/laptop/tablet/mobile layout; desktop adjacent department hover/focus popup and inline detail on compact screens.
- Keyboard-accessible department buttons, Escape-to-close, pointer hover and click-to-pin, focus rings and reduced-motion support.
- Authenticated staging API endpoint: functions/api/ai/admin/overview.js. All reads require valid Supabase user JWT and admin_users allowlist.
- Preview-only gate and staging project guard, preserving existing production Admin.
- Two signed-in profiles keyed to Supabase auth.users.id: Mark (en-AU) and Long (vi-VN).
- Private cropped portrait data (192x192 WebP thumbnail) stored in RLS-protected ai_admin_profiles, not in the public GitHub repo.
- Personal upload icon in header allows each verified Admin to replace only their own portrait, with client WebP resizing and server validation.
- Personalized time-of-day greetings calculated in Australia/Adelaide timezone without unnecessary OpenAI API calls.
- Dashboard fetches real staging recent chat sessions, pending quote requests, proposed department tasks, active policies and verified agent registry launch state.
- Empty, preview, planned and disconnected states are explicit; no invented activities or "all agents online" claims.
- AI Manager model instructions now apply English for Mark and Vietnamese for Long based on authenticated user profile.
- AI Manager Console basic labels translated for Long; quote inbox and other legacy Admin modules may still show English.
- AI Manager task execution, automated outbound email and production booking access remain disabled.

## Staging setup and validation
- Supabase project: memory-lane-ai-staging (livorstsjtixdgksuzou).
- Migration: create_private_admin_profiles. RLS enabled, no table grants to anon/authenticated.
- Two confirmed and authorized staging Admin users; verified profile locale and stored photo data signatures with SQL.
- CI syntax/tests: tests/ai-dashboard.test.mjs plus existing Manager/chat tests, verified green on branch at development time.
- Cloudflare Preview must expose the OPENAI_API_KEY, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY and AI_MANAGER_ENABLED variables if Manager chat is to be enabled.
- No TURNSTILE_* variables needed just to view the private dashboard. Public AI chat remains off until separate Turnstile verification.

## Owner QA checklist
1. In Cloudflare Deployments, open the **newest successful Preview** on feature/ai-live-chat, append /admin.html.
2. Log in as mark@marklee.au; confirm portrait, English greeting, org chart, real quote counts and empty states.
3. Hover Customer Service and other department cards: popup should appear nearby on wide desktop; click pins it; Escape closes it.
4. Tap department cards on iPad/mobile and test responsive layout with no horizontal page overflow.
5. Open AI Manager from sidebar: verify English replies for Mark and only task proposals (no execution).
6. Log out, then log in as ngoclong327@gmail.com; confirm Long's portrait and Vietnamese greeting/Manager replies.
7. Test quote inbox and policy editor, including correct separation of Manager conversation history.
8. Test stale/no-network states and reduced-motion preference.
9. Do not merge PR until a real-browser QA pass, an API budget review and production-release gate review.

## Boundaries and pending work
- Cloudflare Preview deployment cannot be directly inspected through the available connected tools; GitHub CI passing is not a browser end-to-end validation.
- AI Manager currently proposes tasks rather than actually calling all five child agents.
- Summary is a deterministic factual overview assembled from real staging records, not a new LLM call on every page load.
- Department statuses represent rollout state, not a live heartbeat.
- Quotes are draft-only. No outgoing emails, Facebook/Instagram posting, verified cross-device customer history or booking/payment operations.
- Real production data remains isolated. Any integration requires a separate security and privacy review before release.
