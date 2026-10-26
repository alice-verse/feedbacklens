const { test, expect } = require('@playwright/test');
const CSV = 'date,source,rating,text\n2026-09-01,App,2,"Slow and crashes, frustrating"\n2026-09-02,App,5,Love the clean design\n';
const demo = async page => { await page.goto('/'); await page.getByRole('button', { name: 'Load demo data' }).click(); };

test('demo data fills the dashboard', async ({ page }) => {
  await demo(page);
  await expect(page.locator('#kpi')).toContainText('Feedback records');
  await expect(page.locator('#pri tr').nth(1)).toBeVisible();
  await expect(page.locator('#note')).toContainText('Demo data');
});
test('uploads a CSV file', async ({ page }) => {
  await page.goto('/');
  await page.setInputFiles('#f', { name: 'mine.csv', mimeType: 'text/csv', buffer: Buffer.from(CSV) });
  await expect(page.locator('#note')).toContainText('Loaded “mine.csv”: 2 records');
});
test('rejects an unsupported file with a clear error', async ({ page }) => {
  await page.goto('/');
  await page.setInputFiles('#f', { name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
  await expect(page.locator('#note')).toContainText('Unsupported file type');
  await expect(page.locator('#note')).toHaveClass(/err/);
});
test('search narrows the feedback table', async ({ page }) => {
  await demo(page);
  await expect(page.locator('#cnt')).toHaveText('Showing 23 of 23');
  await page.locator('#s').fill('pricing');
  await expect(page.locator('#cnt')).not.toHaveText('Showing 23 of 23');
});
test('exports filtered feedback as CSV', async ({ page }) => {
  await demo(page);
  const [d] = await Promise.all([page.waitForEvent('download'), page.locator('#ex').click()]);
  expect(d.suggestedFilename()).toBe('feedback-export.csv');
});
test('ask shows evidence and says when AI is not connected', async ({ page }) => {
  await page.route('**/.netlify/functions/ask', r => r.fulfill({ status: 501, body: '{}' }));
  await demo(page);
  await page.locator('#q').fill('slow dashboard');
  await page.getByRole('button', { name: 'Ask' }).click();
  await expect(page.locator('#ans')).toContainText('retrieval only');
  await expect(page.locator('#ans')).toContainText('Evidence');
});
test('cloud save explains it is not configured', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#cstat')).toContainText('not configured');
});
