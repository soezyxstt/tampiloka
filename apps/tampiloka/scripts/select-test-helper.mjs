export async function chooseSelect(page, trigger, value) {
  await trigger.click();
  await page.waitForFunction(element => document.getElementById(element.getAttribute('aria-controls'))?.getAttribute('role') === 'listbox', await trigger.elementHandle());
  const listbox = page.locator(`[role="listbox"][id=${JSON.stringify(await trigger.getAttribute('aria-controls'))}]`);
  await listbox.waitFor({ state: 'visible' });
  await listbox.locator(`[role="option"][data-value="${value}"]`).click();
  await listbox.waitFor({ state: 'hidden' });
}
