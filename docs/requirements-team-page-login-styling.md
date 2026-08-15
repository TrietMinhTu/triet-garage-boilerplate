# Requirements — Team Page + Login Styling

**Prepared by:** Kareem Khleifat, BA
**Team:** Team 47 — RMIT Garage boilerplate capstone
**Validated against:** UX mockup from Michael Fajardo (login + team page, reconstructed from the live build on `feature/restyleSignIn`)
**Date:** 2026-08-14

## Team Page — Fields

| Field | Required | Display rule |
|---|---|---|
| Name | Yes | Bold, primary line on the card |
| Photo | No | Circular avatar, ~80px. If missing: initials rendered on the existing tinted brand-circle avatar ring (no new asset) |
| Role | Yes | Shown beneath name |
| Blurb | No | Plain text, ~140-character limit, 3-line clamp with "…more" toggle past the limit |

## Login Page — Scope

**Styling only.** No changes to authentication logic, input validation, or session handling from what currently exists in the codebase.

- The sign-in field is intentionally labeled "Username" even though it validates as an email address — confirmed, not a defect.
- The "Don't have an account?" sign-up link should be visible at all times, not conditionally shown only after a failed sign-in attempt. This is a **behavior fix**, not a styling change — out of scope for this card, needs to be raised with Dev separately.

## Edge Cases

1. **Long blurb** (>140 chars) — 3-line clamp + "…more" toggle. Already built.
2. **Missing photo** — initials on tinted brand circle, same ring/shape as a loaded photo, so it never renders broken. Approved, not yet built.
3. **Sign-up link visibility** — currently gated behind a failed login attempt; should always show. Flagged for Dev, not a styling/requirements item.

## Content fix noted

Placeholder team data has "Triet Tan" — should read "Triet Tu."
