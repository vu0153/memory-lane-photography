# Memory Lane Booking Workflow and Audit Guide

**Purpose:** This booking workflow explains how to process every Memory Lane enquiry from first submission to completion. Use it as the operating guide for daily booking management, Free Portrait registrations, paid session follow up, and future audit checks.

**Applies to:**

- Family Session
- Couple Session
- Friends and Memories
- Portrait Session
- Small Event Coverage
- Free Portrait Session

**Main admin areas used:**

- Admin Dashboard
- Bookings tab
- Free Portrait tab
- View Details popup
- Internal Admin Notes
- Quoted Price
- Status dropdown

---

## 1. Full booking workflow overview

```mermaid
flowchart TD
    A[Customer submits enquiry] --> B[Booking appears in Admin Dashboard]
    B --> C[Status is New]
    C --> D{Is it a real booking?}

    D -->|Test or spam| E[Delete booking from table]
    D -->|Real enquiry| F[Open View Details]

    F --> G{Session type}

    G -->|Free Portrait| H[Check Free Portrait workflow]
    G -->|Paid session| I[Check paid booking workflow]

    H --> J{Matches an active Free Portrait session?}
    J -->|Yes| K[Contact customer and confirm slot]
    J -->|No| L[Ask customer to choose a valid Free Portrait date]

    I --> M[Contact customer for missing details]
    M --> N[Send quote or package option]

    K --> O[Change status to Booked]
    L --> P[Keep status as Contacted until fixed]
    N --> Q[Change status to Quoted]

    Q --> R{Customer accepts quote?}
    R -->|Yes| S[Change status to Booked]
    R -->|No reply| T[Follow up]
    R -->|Declines| U[Change status to Cancelled]

    O --> V[Prepare for session]
    S --> V

    V --> W[Complete photo session]
    W --> X[Backup and edit images]
    X --> Y[Deliver final images]
    Y --> Z[Change status to Completed]

    T --> AA{Reply received?}
    AA -->|Yes| M
    AA -->|No after final follow up| U
```

---

## 2. Booking status rules

Use status changes consistently. This is the main audit trail inside the dashboard.

| Status | Use this when | Required action |
|---|---|---|
| New | A booking has just arrived | Review and decide if it is real |
| Contacted | You have messaged, called, or emailed the customer | Add an internal note with contact method and date |
| Quoted | You sent a price or package option | Enter the quoted price |
| Booked | Customer confirmed the session | Add date, time, location, and final plan in notes |
| Completed | Session is finished and images have been delivered or are fully handled | Add final delivery note |
| Cancelled | Customer cancelled, did not reply, or booking was not suitable | Add reason in notes |

**Rule:** Do not leave real bookings as `New` after you have contacted the customer.

---

## 3. Daily booking handling process

Run this process every day.

```mermaid
flowchart TD
    A[Open Admin Dashboard] --> B[Open Bookings tab]
    B --> C[Filter or scan New bookings]
    C --> D{Any New bookings?}

    D -->|No| E[Check upcoming Booked sessions]
    D -->|Yes| F[Open each booking with View Details]

    F --> G{Is it test or spam?}
    G -->|Yes| H[Delete booking]
    G -->|No| I[Contact customer]

    I --> J[Change status to Contacted]
    J --> K[Add internal note]
    K --> L{Session type}

    L -->|Free Portrait| M[Check Free Portrait session date]
    L -->|Paid session| N[Ask questions or send quote]

    M --> O[Confirm or request correct date]
    N --> P[Enter quoted price if quote sent]

    O --> Q[Update status]
    P --> Q
    Q --> R[End daily review]
    E --> R
```

Daily checklist:

- [ ] Review all `New` bookings.
- [ ] Delete test or spam only.
- [ ] Contact every real new customer.
- [ ] Change status after action.
- [ ] Add internal notes.
- [ ] Enter quoted price for paid quotes.
- [ ] Check Free Portrait registrations against session dates.
- [ ] Review tomorrow and this week bookings.

---

## 4. Real booking triage

When a booking arrives, classify it first.

```mermaid
flowchart TD
    A[New booking] --> B{Valid contact details?}
    B -->|No phone and no email| C[Mark as invalid or delete if clearly spam]
    B -->|Yes| D{Looks like spam or test?}

    D -->|Yes| E[Delete only if confirmed test or spam]
    D -->|No| F{Service type}

    F -->|Free Portrait Session| G[Use Free Portrait workflow]
    F -->|Paid service| H[Use paid booking workflow]
```

Check these fields:

| Field | What to check |
|---|---|
| Name | Looks real, not random test text |
| Phone | Usable Australian number if provided |
| Email | Looks valid |
| Service | Session type selected |
| Preferred Date | Customer selected a date |
| Message | Helps you understand what they want |
| Free Portrait Event ID | Should exist for Free Portrait bookings after the latest patch |

---

## 5. Paid session workflow

Use this for Family, Couple, Friends, Portrait, and Small Event bookings.

```mermaid
flowchart TD
    A[Paid booking received] --> B[Open View Details]
    B --> C[Check service, date, message, contact details]
    C --> D{Enough detail to quote?}

    D -->|No| E[Ask follow up questions]
    D -->|Yes| F[Prepare quote]

    E --> G[Change status to Contacted]
    G --> H[Add internal note]
    H --> I[Wait for customer reply]

    F --> J[Send package or custom quote]
    J --> K[Enter Quoted Price]
    K --> L[Change status to Quoted]

    L --> M{Customer response}
    M -->|Accepts| N[Confirm date, time, location]
    M -->|Questions| O[Reply and update notes]
    M -->|Declines| P[Change status to Cancelled]
    M -->|No reply| Q[Follow up]

    N --> R[Change status to Booked]
    R --> S[Prepare session]
    S --> T[Complete session]
    T --> U[Deliver images]
    U --> V[Change status to Completed]

    Q --> W{Final reply?}
    W -->|Yes| O
    W -->|No| P
```

Ask these questions when details are missing:

- How many people will be photographed?
- What kind of photos do you want?
- Do you have a preferred location?
- Do you prefer morning, afternoon, or sunset?
- Is this for a special event or milestone?
- Do you need help choosing outfits?
- Do you need the photos by a specific date?

Internal note example:

```text
Contacted by email on 25 June. Customer wants a couple session at Glenelg, sunset preferred. Waiting for final date confirmation.
```

Quote note example:

```text
Quoted A$350 for Couple Session. Includes relaxed session, edited gallery, and Adelaide location guidance. Waiting for response.
```

Booked note example:

```text
Booked for 12 July, 4:30 pm at Glenelg. Couple session. Warm natural style requested. Customer confirmed by email.
```

---

## 6. Free Portrait workflow

Use this for Free Portrait registrations only.

```mermaid
flowchart TD
    A[Free Portrait booking received] --> B[Open View Details]
    B --> C[Check Preferred Date]
    C --> D[Open Free Portrait tab]
    D --> E{Does preferred date match a published session?}

    E -->|Yes| F[Check session capacity and timing]
    E -->|No| G[Contact customer and ask them to choose a valid session date]

    F --> H{Can accept registration?}
    H -->|Yes| I[Confirm slot with customer]
    H -->|No| J[Offer another Free Portrait session if available]

    I --> K[Change status to Booked]
    K --> L[Add internal note with session name and date]

    J --> M[Keep as Contacted until customer chooses]
    G --> M

    L --> N[Before session, send reminder]
    N --> O[Session day]
    O --> P{Customer attends?}

    P -->|Yes| Q[Mark as Completed after images handled]
    P -->|No| R[Keep status Booked or Cancelled based on your choice, add No show note]
```

Free Portrait checks:

| Check | Expected result |
|---|---|
| Service type | Free Portrait Session |
| Preferred Date | Same date as one active Free Portrait session |
| Free Portrait Event ID | Linked to the correct session |
| Session status | Published or active |
| End time | Booking should relate to that session and be counted before the end time |
| Customer expectation | One individual portrait only |

Free Portrait internal note example:

```text
Free Portrait registration for 12 July session at Semaphore. Confirmed by email. Individual portrait only.
```

If date does not match:

```text
Customer selected Free Portrait but preferred date does not match an active session. Asked customer to choose one of the published dates.
```

If customer does not attend:

```text
No show for 12 July Free Portrait session. No images delivered.
```

---

## 7. Follow up process

Use this when a customer has not replied.

```mermaid
flowchart TD
    A[Waiting for reply] --> B{How long since last contact?}
    B -->|Less than 24 hours| C[Wait]
    B -->|24 to 48 hours| D[Send first follow up]
    B -->|3 to 5 days| E[Send final follow up]
    B -->|No reply after final follow up| F[Change status to Cancelled]

    D --> G[Add note]
    E --> G
    F --> H[Add cancellation reason]
```

Recommended follow up timing:

| Stage | Timing | Action |
|---|---:|---|
| First contact | Same day as enquiry | Reply and change status to Contacted |
| First follow up | 24 to 48 hours later | Short reminder |
| Final follow up | 3 to 5 days later | Final check |
| Close booking | After no reply | Change to Cancelled |

Follow up note example:

```text
First follow up sent on 27 June. No response yet.
```

Cancellation note example:

```text
No reply after two follow ups. Marked as cancelled on 1 July.
```

---

## 8. Pre-session checklist

Use this once the booking is `Booked`.

```mermaid
flowchart TD
    A[Booking confirmed] --> B[Check date and time]
    B --> C[Check location]
    C --> D[Check weather if outdoor]
    D --> E[Prepare camera gear]
    E --> F[Send reminder to customer]
    F --> G[Attend session]
```

Checklist:

- [ ] Confirm date and time.
- [ ] Confirm location and meeting point.
- [ ] Save customer contact details.
- [ ] Check travel time.
- [ ] Check weather.
- [ ] Charge camera batteries.
- [ ] Format or prepare memory cards.
- [ ] Prepare lens and backup gear.
- [ ] Bring props or lighting if needed.
- [ ] Send reminder message.

Reminder note example:

```text
Reminder sent one day before session. Location and time confirmed.
```

---

## 9. Post-session workflow

```mermaid
flowchart TD
    A[Session completed] --> B[Backup photos]
    B --> C[Select best images]
    C --> D[Edit photos]
    D --> E[Export final images]
    E --> F[Deliver gallery or selected images]
    F --> G[Update internal notes]
    G --> H[Change status to Completed]
```

Post-session checklist:

- [ ] Backup images.
- [ ] Select best images.
- [ ] Edit selected photos.
- [ ] Export final files.
- [ ] Deliver images to customer.
- [ ] Add delivery note.
- [ ] Change status to Completed.

Completed note example:

```text
Session completed. Final edited images delivered by Google Drive on 15 July.
```

---

## 10. Delete rules

Only delete bookings when they should not be part of your business records.

```mermaid
flowchart TD
    A[Need to remove booking?] --> B{Is it a test, duplicate, or spam?}
    B -->|Yes| C[Delete booking]
    B -->|No| D[Do not delete]
    D --> E[Use Cancelled status instead]
```

Delete only:

- Test submissions
- Obvious spam
- Duplicate booking created by mistake
- Mistyped test data from your own testing

Do not delete:

- Real customer enquiries
- Cancelled bookings
- No reply bookings
- No show bookings
- Completed bookings

**Audit rule:** For real bookings, use `Cancelled` instead of deleting. This keeps your enquiry history and conversion data accurate.

---

## 11. Weekly audit checklist

Run this once a week.

```mermaid
flowchart TD
    A[Weekly audit] --> B[Filter New]
    B --> C[Filter Contacted]
    C --> D[Filter Quoted]
    D --> E[Filter Booked]
    E --> F[Review Free Portrait sessions]
    F --> G[Check completed and cancelled records]
```

Checklist:

- [ ] No real bookings stuck in `New`.
- [ ] Every `Contacted` booking has an internal note.
- [ ] Every `Quoted` booking has a quoted price.
- [ ] Every `Booked` booking has date, time, and location confirmed.
- [ ] Every completed session is marked `Completed`.
- [ ] Cancelled bookings have a reason.
- [ ] Free Portrait registrations match the correct session.
- [ ] Test bookings have been deleted.
- [ ] Spam bookings have been deleted.

---

## 12. Monthly audit checklist

Run this at the end of each month.

| Area | What to check |
|---|---|
| Total bookings | Check booking volume |
| New to Contacted | Make sure new bookings were handled quickly |
| Quoted revenue | Check all quoted bookings have prices |
| Booked revenue | Check booked and completed sessions |
| Completed revenue | Check final completed income |
| Cancelled bookings | Review reasons |
| Free Portrait sessions | Check registration count per session |
| Notes quality | Each real booking should have clear notes |

Monthly audit questions:

- How many enquiries came in?
- How many became booked sessions?
- Which service types received the most interest?
- Which quotes did not convert?
- Did Free Portrait create follow up paid opportunities?
- Were any bookings missed?
- Were any bookings deleted that should have been cancelled instead?

---

## 13. Naming and note standards

Use short, factual notes. Do not write long paragraphs unless needed.

Good note format:

```text
[Date] [Action] [Result] [Next step]
```

Examples:

```text
25 June. Contacted by email. Asked for number of people and preferred location. Waiting for reply.
```

```text
28 June. Customer confirmed Family Session at Glenelg, 4:30 pm. Status changed to Booked.
```

```text
12 July. Free Portrait customer attended. Selected images delivered same day. Status changed to Completed.
```

---

## 14. Audit summary flow

```mermaid
flowchart TD
    A[Start audit] --> B[Check all real bookings have correct status]
    B --> C[Check all paid quotes have Quoted Price]
    C --> D[Check all Booked sessions have notes]
    D --> E[Check all Free Portrait bookings link to correct session]
    E --> F[Check Completed sessions have delivery notes]
    F --> G[Check Cancelled bookings have reason]
    G --> H[Delete only test and spam]
    H --> I[Audit complete]
```

---

## 15. Quick reference

| Situation | Status | Note needed | Delete? |
|---|---|---|---|
| New real enquiry | New then Contacted | Yes | No |
| Contacted customer | Contacted | Yes | No |
| Quote sent | Quoted | Yes, plus price | No |
| Customer confirmed | Booked | Yes | No |
| Session finished | Completed | Yes | No |
| Customer cancelled | Cancelled | Yes | No |
| Customer never replied | Cancelled | Yes | No |
| Free Portrait registration | Booked after confirmation | Yes | No |
| Free Portrait no show | Booked or Cancelled, based on your choice | Yes | No |
| Test booking | Not needed | Not needed | Yes |
| Spam booking | Not needed | Not needed | Yes |
