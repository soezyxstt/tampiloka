export async function chooseSelect(page, trigger, value) {
  await trigger.click();
  const listbox = page.getByRole('listbox');
  await listbox.waitFor({ state: 'visible' });
  await listbox.locator(`[role="option"][data-value="${value}"]`).click();
}
