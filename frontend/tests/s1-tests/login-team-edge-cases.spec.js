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
      page
        .getByText(/invalid|incorrect|failed|error|credentials|password/i)
        .first()
    ).toBeVisible()

    console.log('PASS: Invalid login was rejected')
  })

  test('direct team-page access without login redirects to sign-in', async ({
    browser,
  }) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(`${BASE_URL}${TEAM_PATH}`)

    await expect(page).toHaveURL(/\/auth\/signin/, {
      timeout: 10000,
    })

    console.log(
      'PASS: Unauthenticated team-page access redirected to sign-in'
    )

    await context.close()
  })

  test('unusually long blurb does not break the team-page layout', async ({
    page,
  }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error(
        'TEST_EMAIL and TEST_PASSWORD environment variables must be provided'
      )
    }

    // Log in first
    await page.goto(`${BASE_URL}/auth/signin`)

    await page.getByLabel(/email|username/i).fill(TEST_EMAIL)
    await page.getByLabel(/password/i).fill(TEST_PASSWORD)

    await page.getByRole('button', { name: /sign in|login/i }).click()

    // Confirm Team page loaded
    await expect(page).toHaveURL(/\/team/, {
      timeout: 10000,
    })

    // Use a member who has a long blurb
    const memberName = page.getByText(
      'Mihindukulasuriya Fernando',
      { exact: true }
    )

    await expect(memberName).toBeVisible()

    // Find the member's card
    const memberCard = memberName.locator(
      'xpath=ancestor::div[contains(@class, "rounded")][1]'
    )

    await expect(memberCard).toBeVisible()

    // Check that the card does not overflow horizontally
    const horizontalOverflow = await memberCard.evaluate((element) => {
      return element.scrollWidth > element.clientWidth
    })

    expect(horizontalOverflow).toBe(false)

    console.log(
      'PASS: Long blurb remains inside the card and does not break the layout'
    )
  })
})