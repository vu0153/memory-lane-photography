# Memory Lane Photo Studio | AI Management Dashboard

**FINAL SPEC v1.0 | 28 November 2026**
**Status:** Approved design specification for staging development. Not yet fully implemented.

## 1. Goal and scope

An internal-only AI Management Dashboard within the existing Memory Lane Admin interface, following the owner's approved personalized mockup. Two studio owners (Mark and Long) each sign in and see their correct portrait, greeting, language and a factual management briefing. Both communicate with **one AI Manager**, which coordinates five specialist AI departments.

**Hierarchy:** Owners -> AI Manager -> Customer Service; Booking & Scheduling; Studio Operations; Brand & Marketing; Finance & Analytics.

**Not in scope:** Public-facing org chart, fictitious agency staff, automatic outgoing mail, unapproved quotes, automatic booking confirmation, background execution without approved permissions.

## 2. Verified Admin identities and personalized presentation

| Account | Admin display | Default language | Portrait |
| --- | --- | --- | --- |
| mark@marklee.au | Mark | English (en-AU) | Second uploaded photo, glasses with canola field background |
| ngoclong327@gmail.com | Long | Vietnamese (vi-VN) | First uploaded photo, blue sky background |

Both accounts are verified and allowlisted in staging Supabase as of 28 November 2026. Render profile from authenticated server-side user ID, not an unverified email field or client-side toggle. The preview mockup's Mark/Long switch is **not** an impersonation feature and must not appear in the live Admin.

Use original owner-supplied portrait files; create cropped circular thumbnails with configurable focal points, without changes to person/identity. Store originals privately (e.g. private Supabase Storage) and serve through authenticated short-lived URLs; never commit full-size portraits to a public GitHub branch or expose a public Storage bucket.

Plan private admin profile records keyed by auth.users.id: display_name, locale, avatar_storage_path, optional photo crop settings. Every backend operation verifies Supabase user token and active admin_users membership. Logout and account change clear prior personalized state. No private Manager messages or profile assets should leak between accounts.

### Greeting and locale behavior

- On page load, show verified portrait and name immediately; greeting depends on time in **Australia/Adelaide**.
- Mark sample: “Good morning, Mark. Here's your studio briefing.”
- Long sample: “Chào buổi sáng, Long. Đây là báo cáo mới nhất từ AI Manager.”
- Manager answers Mark in natural Australian English, Long in natural Vietnamese, unless they explicitly request otherwise.
- English/Vietnamese display preferences must be enforced in the Manager API, not just translated UI labels. Do not hard-code Manager's default reply as Vietnamese for every account.
- Allow each user to change personal display language through Settings without gaining access to another person's identity.

## 3. Visual design

Faithfully implement the **approved two-profile desktop mockup** while improving transitions and interaction quality. Admin-only.

**Visual system:** dark navy left sidebar, soft blue/white main content, cobalt blue active states, clean Inter or system sans type, restrained card shadows, large readable headings, 14-18px corner radii, generous spacing. Avoid yellow/gold interface accents.

Suggested colors: navy #112645, deep blue #153D70, cobalt #2563EB, background #F3F7FC, white #FFFFFF, muted text #536477. Use existing Memory Lane brand rather than replacing its public-site branding.

### Desktop structure

1. **Left fixed/collapsible sidebar:** Studio branding, Dashboard, AI Management (active), Bookings, Clients, Photo Sessions, Gallery Delivery, Marketing, Finance, Settings. Don't turn unimplemented Admin areas into fake working links.
2. **Top header:** “AI Management System”, subtitle, actual authenticated owner avatar/name, notifications and account/logout menu.
3. **Personal hero:** Large portrait, personalized greeting, concise AI Manager intro and current briefing; soft image/gradient background.
4. **Interactive org chart:** Owner -> central dominant AI Manager -> five horizontally connected department cards.
5. **Three information cards:** Manager Briefing; Needs Your Approval; Department Updates. Each row uses factual records, age/freshness and a relevant action link.
6. **Existing workflows:** AI Manager chat, AI Inbox/quote drafts, Policies & Knowledge remain directly accessible.
7. No mock “Online” badges, invented customer counts, fabricated activity timelines or demo approvals in actual connected UI.

## 4. Org chart and interactive department panels

| Department | Responsibility | Staging state |
| --- | --- | --- |
| AI Manager | Owner liaison, structured planning, department task proposals, supported reporting and approval escalation | Preview when enabled; otherwise Disabled |
| Customer Service | Website chat, service guidance, client details, quote requests, escalation of concerns | Preview |
| Booking & Scheduling | Appointment planning, availability checks after calendar integration, booking follow-up | Planned |
| Studio Operations | Shoot checklists, session workflows, gallery and delivery tracking after integration | Planned |
| Brand & Marketing | Campaign and social content drafts, branding consistency, future publishing integration | Planned |
| Finance & Analytics | Booking-to-revenue reporting, studio costs, AI API spending and performance after integrations | Planned |

**Desktop hover/focus:** Selected department tile lifts 3-5px, gets a subtle cobalt border/glow, selected connector line brightens and a contextual info panel slides/fades beside it. Panel includes responsibility, current operational status, connected tools, latest real work (if any), approval needs and a View Details action. Panel must remain open while pointer enters it. Clicking a department pins its panel. Dismiss via Close button or Escape. Keep panel within viewport and do not obscure essential content.

**Tablet/mobile:** Tap opens accessible side panel or bottom sheet, never require mouse hover. Keyboard focus, Enter/Space, Escape and visible focus rings are supported. Respect WCAG 2.2 hover content rules (dismissible, hoverable, persistent): https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html

**Status semantics:** Live = active connection verified, Preview = test-only, Planned = not yet implemented, Unavailable = service offline/error, Needs attention = verified issue. Merely having an agent row in the database does not make it online.

## 5. Motion system: premium but restrained

- Hero greeting reveal: opacity + translate, 280-380ms, once on page entry.
- Bottom cards appear in staggered sequence with 45-70ms offset and total entrance under 650ms.
- Department hover: translateY(-3 to -5px), soft shadow and outlined selection, 180-240ms.
- Icons shift or scale imperceptibly on hover; no endless floating icons.
- Connector lines brighten for selected relationship; no persistent decorative waves.
- AI Manager card has a one-time subtle light sweep when loaded, not infinite pulse.
- Popup/drawer transitions: fade + translate 180-240ms, avoid layout jumping.
- Buttons show subtle press/hover feedback; loading placeholders do not simulate completed activity.
- Respect CSS prefers-reduced-motion: reduce and replace nonessential transforms with instant or minimal transitions. See https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- Avoid moving/animated backgrounds, excessive parallax, sparkling particles or fake status heartbeat.
- Optimize animations using transform and opacity, avoid repaint-heavy continuous effects.

## 6. Personalized AI Manager briefing and reporting rules

**Hero briefing:** Immediately display a truthful read-only snapshot derived from available staging records or a previously generated briefing labeled with the actual generation timestamp. Refresh manually or on dashboard entry with throttling and caching. Do not spend OpenAI tokens on every simple hello or every page refresh.

Manager's executive summary should prioritize:
- Pending client quote requests and approvals.
- New customer enquiries when Customer Service chat is enabled.
- Proposed/open assigned agent tasks.
- Booking issues only after a real booking/calendar adapter is connected.
- Departments reporting genuine outages or missing integration.
- Recently approved policy updates.

**Current source-of-truth mappings:**
- ai_agent_registry: registered departments and configured launch state, not live health.
- ai_quote_requests: actual quote reviews and drafts.
- ai_manager_tasks: actual task proposals; current API filters tasks by creator, so implement a separately authorized studio-wide view for shared management reporting.
- ai_policy_versions: currently active policy versions.
- ai_chat_sessions / ai_chat_messages: real staging conversation activity, exposed as privacy-safe counts only.
- Real bookings, finance, calendar, Instagram/Facebook and email are **not connected to the staging dashboard** today. Display “Not connected/Planned”, never a synthetic number.

Shared operational data should be visible to both verified admins where studio policy permits. Private Manager message threads remain account-specific. Support real data freshness timestamps and links to source records. Missing data must be labeled “No data yet/Chưa có dữ liệu” or “Unavailable”, not replaced with invented sample values.

**Data flow:** agent integrations -> authorized staging backend -> normalized read-only overview -> AI Manager summarizes supported facts -> user sees linked cards and proposals. Do not treat AI model memory as authoritative business data.

## 7. Manager authority, tasks, policies and quotes

- Owners interact with a single AI Manager. It may propose delegation to any of the five departments and explain planned work.
- MVP Manager-created tasks have status **Proposed** and are **not automatically executed**. Expand to Approved -> In progress -> Completed/Blocked/Cancelled only with actual execution capability, audit logs and explicit owner permissions.
- Manager may suggest a policy revision. Admin publishes a new policy version only after explicit confirmation; track actor, timestamp and prior version.
- The Customer Service model consumes published, approved policies on future responses. Fixed safety rules cannot be overridden by user-authored policy text.
- **Never show a personalised dollar quote in public AI Chat.** Collect needs and customer email, queue in AI Inbox, owner reviews price and outbound email separately.
- **Never auto-confirm bookings, process refunds/payments, send emails or publish social posts** without a tested integration and corresponding approval controls.
- Child agents must use restricted data adapters/service operations, not arbitrary prompt instructions or unrestricted access.

## 8. Implementation design

Extend existing vanilla HTML/CSS/JavaScript Cloudflare Pages and Supabase Staging rather than migrating framework.

Suggested new modules:
- css/ai-dashboard.css: responsive design tokens, chart, cards and motion.
- js/ai-dashboard.js: authenticated user state, localization, org chart interaction and real data rendering.
- functions/api/ai/admin/overview.js: authorized real snapshot, records and freshness.
- Future authenticated profile/avatar handlers: private signed assets and locale preferences.
- Supabase migration for restricted ai_admin_profiles and any shared task audit/view needs.

Preserve and integrate:
- admin.html and js/admin.js login/session and other Admin features.
- functions/api/ai/admin/manager.js Manager planning and policies.
- functions/api/ai/admin/quotes.js and existing AI Inbox.
- Existing staging-only Supabase project and protections.

Every private endpoint validates authenticated session + admin allowlist. Protect against cross-user data leakage and CSRF/cross-origin writes, never deliver secret API keys to browser. Keep strict preview URL and staging project checks. Use RLS with grants limited to backend service role. Plan sensible logging, retention, data minimization and error states.

**Fallbacks:** Manager disabled, OpenAI balance depleted, stale briefing, photo missing, network errors, expired session and partly unavailable departments. Dashboard shell and truthful read-only records must still work without generating AI output.

## 9. Responsive requirements

- Desktop >= 1200px: persistent sidebar, five-card org chart in one row, 3-column briefing.
- Laptop 900-1199px: narrower nav, compact org chart, summary cards adapt as needed.
- Tablet 600-899px: collapsible sidebar, accessible scrollable or wrapped chart and side drawer.
- Mobile < 600px: vertical hierarchy from Owner to Manager to departments, single-column briefing and touch-first drawers, no page-wide horizontal overflow.
- Meet readable contrast and focus order, proper image alt text, status text beyond color coding and keyboard accessibility.

## 10. Delivery plan and acceptance tests

**Phase 1 | Layout and user profiles**: accurate approved dashboard UI, personalized photos and locale, true states, responsive layout.

**Phase 2 | Interaction and motion**: animated org chart, correct hover/tap/focus popups, selected connectors, reduced-motion and keyboard behavior.

**Phase 3 | Backend data and briefing**: secure overview from real staging tables, shared factual studio approvals, briefings with timestamps, optional AI generated summaries with cost caps, localized Manager.

**Phase 4 | Quality and release review**: auth and RLS checks, test Mark and Long sign-in, stale/error handling, visual review, mobile/iPad testing, activity logging and acceptance sign-off.

### Definition of done
1. Mark signs in and sees Mark's correct photo, English greeting and authorized dashboard.
2. Long signs in and sees Long's correct photo, Vietnamese greeting and authorized dashboard.
3. No visible mock identity switch allows impersonation; no logged-out access or cross-user leaks.
4. The AI Manager acts as sole owner-facing coordinator; it proposes only, never performs restricted actions.
5. Department popovers correctly open, persist and dismiss on desktop/keyboard/mobile.
6. All activity counts and status badges reflect real sources or explicitly indicate not connected.
7. Quote approvals require owner review and are never auto-sent.
8. Staging works when AI is disabled or a data adapter fails.
9. Motion is smooth and reduced-motion compliant at desktop/mobile widths.
10. Automated checks and manual tests pass in Preview; **Draft PR #1 is not merged without owner approval**.

## 11. Decisions locked

- Internal Admin dashboard only, not public.
- Use approved navy/soft blue/white two-profile mockup.
- Portrait 1 = Long; portrait 2 = Mark.
- Mark English by default, Long Vietnamese by default.
- One AI Manager, five specialized departments.
- Professional hover interactions and purposeful animation.
- Real records and explicit human approval before automation.
