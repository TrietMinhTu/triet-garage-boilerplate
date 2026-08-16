import { test, expect } from '@playwright/test'

const BASE_URL =
  process.env.TEST_BASE_URL ||
  'https://triet-garage-boilerplate-frontend.vercel.app'

const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD

test.describe('Bootstrap Restyling - Login to Team Page Flow', () => {
  test('valid login redirects to the team page and required content is displayed', async ({
    page,
  }) => {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
      throw new Error(
        'TEST_EMAIL and TEST_PASSWORD environment variables must be provided'
      )
    }

    // 1. Open the deployed application
    await page.goto(`${BASE_URL}/auth/signin`)

    // 2. Confirm the sign-in page loaded
    await expect(page).toHaveURL(/\/auth\/signin/)

    // 3. Enter valid login credentials
    await page
      .getByLabel(/email|username/i)
      .fill(TEST_EMAIL)

    await page
      .getByLabel(/password/i)
      .fill(TEST_PASSWORD)

    // 4. Submit the login form
    await page
      .getByRole('button', { name: /sign in|login/i })
      .click()

    // 5. Confirm successful redirect away from sign-in
    await expect(page).not.toHaveURL(/\/auth\/signin/)

    console.log('Current URL:', page.url())
    console.log('Page text:', await page.locator('body').innerText())

    // 6. Confirm the Team page is displayed
    await expect(
      page.getByRole('heading', { name: 'Team' })
    ).toBeVisible()

    await expect(
      page.getByText(/meet the people behind the work/i)
    ).toBeVisible()

    // 7. Confirm team-member content is present
    await expect(page.getByText(/triet tu/i)).toBeVisible()
    await expect(page.getByText(/winnie lewis/i)).toBeVisible()
    await expect(page.getByText(/mihindukulasuriya fernando/i)).toBeVisible()
    await expect(page.getByText(/kareem khleifat/i)).toBeVisible()
    await expect(page.getByText(/michael fajardo/i)).toBeVisible()

    // 8. Confirm developer/role information is displayed
    await expect(
      page.getByText(/developer|dev/i).first()
    ).toBeVisible()

    console.log('PASS: Valid login completed successfully')
    console.log('PASS: Redirect from sign-in confirmed')
    console.log('PASS: Team page loaded')
    console.log('PASS: Required team content displayed')
  })
})