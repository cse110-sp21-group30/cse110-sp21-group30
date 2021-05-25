describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('https://nbuhr9.github.io/test-server/');
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

  test('make bullet point', async () => {
      let text_box = await page.$('#editor_text');
      await text_box.click(); //after click, box should have no text
      await text_box.type('Test Input'); //add text
      await page.keyboard.press('Enter'); //submit bullet, and wait for bullet to appear
      await page.waitForSelector('bullet-point');

      let bullet = await page.$('bullet-point');
      let data = await bullet.getProperty('entry');
      let jsonObj = await data.jsonValue();
      expect(jsonObj.content).toBe("Test Input");
      expect(jsonObj.bullet_id).toBe("1");
  });
});
