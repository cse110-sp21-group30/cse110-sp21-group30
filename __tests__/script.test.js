describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/source/index.html');
    await page.waitForTimeout(500);
  });

  test('testing dates', async () => {
      const date = new Date();
      const d = date.getDate().toString();
      const options = { weekday: 'long' };
      let dayOfWeek = new Intl.DateTimeFormat('en-US', options).format(date).substring(0,3);
      const todaysDate = await page.$eval('#dates_grid_item22', elem => elem.textContent);
      const todaysDayOfWeek = await page.$eval('#dates_grid_item12', elem => elem.textContent);
      expect(todaysDayOfWeek).toBe(dayOfWeek);
      expect(todaysDate).toBe(d);
  });
});
