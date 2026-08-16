# Bootstrap Restyling Testing Report

## Tester Details

**Tester:** Mihindukulasuriya Fernando
**Role:** Dev 2
**Date:** 16 August 2026
**Test Tool:** Playwright
**Deployed URL:**
https://triet-garage-boilerplate-frontend.vercel.app

---

# Task 6 — Login → Redirect → Team Page Flow

## Task

**[Bootstrap Restyling] Task 6 — Test Login → Redirect → Team Page Flow**

## Test Script

`frontend/tests/s1-tests/login-team-flow.spec.js`

## Test Objective

Verify that a valid user can successfully sign in on the deployed application, is redirected to the Team page, and can see the required team information.

## Test Steps

1. Open the deployed application sign-in page.
2. Enter valid login credentials.
3. Click **Sign in**.
4. Confirm the login succeeds.
5. Confirm the application redirects to `/team`(team page).
6. Confirm the Team page loads successfully.
7. Verify that the required team member information is displayed.

## Expected Result

A valid user should successfully sign in and automatically be redirected to the Team page. The Team page should display the required team-member information without errors.

## Actual Result

The login completed successfully and the application redirected to:

`https://triet-garage-boilerplate-frontend.vercel.app/team`

The Team page loaded correctly and displayed:

* Triet Tu — Project Manager
* Winnie Lewis — Developer
* Mihindukulasuriya Fernando — Developer
* Kareem Khleifat — Business Analyst
* Michael Fajardo — UX Designer

The team-member information and blurbs were displayed successfully.

## Automated Test Result

```text
PASS: Valid login completed successfully
PASS: Redirect from sign-in confirmed
PASS: Team page loaded
PASS: Required team content displayed

1 passed
```

## Issues Found

An earlier version of the deployed application had an issue where successful login did not redirect to the Team page.

The issue was later fixed. Final testing confirmed that successful login now correctly redirects the user to `/team`(team page).

No additional issues were found during the final test.

## Task 6 Final Result

**PASS**

The complete valid login → redirect → Team page flow works correctly on the deployed application.

---

# Task 7 — Edge Cases & Bug Testing

## Task

**[Bootstrap Restyling] Task 7 — Test Edge Cases & Log Bugs**

## Test Script

`frontend/tests/s1-tests/login-team-edge-cases.spec.js`

## Test Objective

Test unusual and invalid scenarios identified for the login and Team page to confirm that the application handles them correctly without breaking the expected behaviour or layout.

## Edge Case 1 — Invalid Login

### Test Steps

1. Open the deployed sign-in page.
2. Enter invalid login credentials.
3. Click **Sign in**.
4. Check that authentication is rejected.
5. Confirm the user remains on the sign-in page.

### Expected Result

Invalid credentials should not create a valid session. The user should remain on the sign-in page and receive an appropriate login error.

### Actual Result

The invalid login attempt was rejected successfully. The user remained on the sign-in page and the application displayed an authentication error.

### Automated Test Result

```text
PASS: Invalid login was rejected
```

**Result: PASS**

---

## Edge Case 2 — Direct Team Page Access Without Login

### Test Steps

1. Start a new browser session without an authenticated user.
2. Navigate directly to `/team`(teams page).
3. Check whether the protected Team page is displayed.
4. Confirm the application redirects the unauthenticated user to the sign-in page.

### Expected Result

An unauthenticated user should not be able to directly access the Team page and should be redirected to the sign-in page.

### Actual Result

Direct access to `/team` without authentication correctly redirected the user to the sign-in page.

### Automated Test Result

```text
PASS: Unauthenticated team-page access redirected to sign-in
```

**Result: PASS**

---

## Edge Case 3 — Unusually Long Blurb

### Test Objective

Check that longer team-member blurbs remain inside the member card and do not break the Team page layout.

### Test Steps

1. Log in with a valid account.
2. Navigate to the Team page.
3. Review team members containing longer blurbs.
4. Confirm the text remains within the card boundaries.
5. Check for horizontal overflow, overlapping content, or broken card formatting.

### Expected Result

Longer blurbs should remain contained within the team-member card and should not cause horizontal overflow, overlapping, or other layout problems.

### Actual Result

Longer team-member blurbs remained contained within the cards. No horizontal overflow, overlapping content, or broken card formatting was observed.

**Result: PASS**

---

## Photo Case

The current deployed Team page contains profile images for all team members. Therefore, a missing-photo condition could not be reproduced using the current deployed data.

This case was not marked as a failure because no missing-photo test data was available during final testing.

---

## Bugs Found

The earlier login redirect problem was identified during testing and handed back for review.

After the fix was deployed, the login → Team page flow was retested successfully.

No additional bugs were found during the final invalid-login, unauthenticated-access, or long-blurb testing.

## Task 7 Final Result

**PASS for all testable edge cases.**

* Invalid login — PASS
* Direct Team page access without authentication — PASS
* Long-blurb layout — PASS
* team member photos fallback — PASS (manual check only, not covered by automated script)

---

# Final Testing Summary

The Bootstrap Restyling login and Team page functionality was tested on the deployed Vercel application.

The final testing confirmed:

* Valid login works successfully.
* Successful login redirects correctly to `/team`(team page).
* Required Team page content is displayed.
* Invalid login attempts are rejected.
* Unauthenticated users cannot directly access the Team page.
* Longer team-member blurbs do not break the card layout.
* The previously identified redirect issue has been fixed.

## Overall Result

**PASS**
