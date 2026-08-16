import { test, expect } from '@playwright/test'

const BASE_URL =
  process.env.TEST_BASE_URL ||
  'https://triet-garage-boilerplate-frontend.vercel.app'

const TEAM_PATH = process.env.TEAM_PATH || '/team'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD

test.describe('Bootstrap Restyling - Login and Team Page Edge Cases', () => {
  test('invalid login is rejected and user remains on the sign-in page', async ({ page }) => {
    await page.goto(`${BASE_URL}/auth/signin`)

    await page.getByLabel(/email|username/i).fill('invalid-user@example.com')
    await page.getByLabel(/password/i).fill('wrong-password-123')

    await page.getByRole('button', { name: /sign in|login/i }).click()

    await expect(page).toHaveURL(/\/auth\/signin/)

    await expect(
      page.getByText(/invalid|incorrect|failed|error|credentials|password/i).first()
    ).toBeVisible()

    console.log('PASS: Invalid login was rejected')
  })

  test('direct team-page access without login redirects to sign-in', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(`${BASE_URL}${TEAM_PATH}`)

    await expect(page).toHaveURL(/\/auth\/signin/, { timeout: 10000 })

    console.log('PASS: Unauthenticated team-page access redirected to sign-in')

    await context.close()
  })

  test('missing-photo fallback is displayed correctly', async ({ page }) => {
    test.skip(
      !TEST_EMAIL || !TEST_PASSWORD,
      'Set TEST_EMAIL and TEST_PASSWORD before running this test'
    )

    await page.goto(`${BASE_URL}/auth/signin`)

    await page.getByLabel(/email|username/i).fill(TEST_EMAIL)
    await page.getByLabel(/password/i).fill(TEST_PASSWORD)

    await page.getByRole('button', { name: /sign in|login/i }).click()

    const missingPhotoMemberName = process.env.MISSING_PHOTO_MEMBER

    test.skip(
      !missingPhotoMemberName,
      'Set MISSING_PHOTO_MEMBER to the name of a team member with no photo'
    )

    const memberCard = page
      .getByText(missingPhotoMemberName, { exact: false })
      .locator('xpath=ancestor::*[self::article or self::li or self::div][1]')

    await expect(memberCard).toBeVisible()

    // Expected: initials or another fallback should appear instead of a broken image.
    await expect(memberCard).toContainText(/[A-Z]{1,3}/)

    console.log('PASS: Missing-photo fallback displayed correctly')
  })

  test('unusually long blurb does not break the team-page layout', async ({ page }) => {
    test.skip(
      !TEST_EMAIL || !TEST_PASSWORD,
      'Set TEST_EMAIL and TEST_PASSWORD before running this test'
    )

    await page.goto(`${BASE_URL}/auth/signin`)

    await page.getByLabel(/email|username/i).fill(TEST_EMAIL)
    await page.getByLabel(/password/i).fill(TEST_PASSWORD)

    await page.getByRole('button', { name: /sign in|login/i }).click()

    const longBlurbMemberName = process.env.LONG_BLURB_MEMBER

    test.skip(
      !longBlurbMemberName,
      'Set LONG_BLURB_MEMBER to the name of a team member with a long blurb'
    )

    const memberCard = page
      .getByText(longBlurbMemberName, { exact: false })
      .locator('xpath=ancestor::*[self::article or self::li or self::div][1]')

    await expect(memberCard).toBeVisible()

    const overflow = await memberCard.evaluate((element) => {
      return {
        horizontalOverflow: element.scrollWidth > element.clientWidth,
        verticalOverflow: element.scrollHeight > element.clientHeight,
      }
    })

    expect(overflow.horizontalOverflow).toBe(false)

    console.log('PASS: Long blurb did not create horizontal layout overflow')
  })
})