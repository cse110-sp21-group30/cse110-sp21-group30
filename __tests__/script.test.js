describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto("https://nbuhr9.github.io/test-server/");
  });
      
  test('testing dates', async () => {
      const date = new Date();
      const d = date.getDate().toString();
      const options = { weekday: 'long' };
      let day_of_week = new Intl.DateTimeFormat('en-US', options).format(date).substring(0,3);
      const todays_date = await page.$eval('#dates_grid_item22', elem => elem.textContent);
      const todays_day_of_week = await page.$eval('#dates_grid_item12', elem => elem.textContent);
      expect(todays_day_of_week).toBe(day_of_week);
      expect(todays_date).toBe(d);
  });

test('make LP bullet point', async () => {
      let text_box = await page.$('#editor_text');
      await text_box.click();
      await text_box.type('Test Input');
      await page.keyboard.press('Enter');
      await page.waitForSelector('bullet-point');

      let bullet = await page.$('bullet-point');
      let data = await bullet.getProperty('entry');
      let jsonObj = await data.jsonValue();
      expect(jsonObj.content).toBe("Test Input");
      expect(jsonObj.bullet_id).toBe("1");
  });

  test('check if bullet added to correct column (LP)', async () => {
    const num_LP_Bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    expect(num_LP_Bullets).toBe(1);
  });

  test('test bullet migration (LP -> HP)', async () => {
    await page.evaluate(() => {
      document.querySelector("#lp_bullets > bullet-point").shadowRoot.querySelector("article > button.change-priority").click();
    })
    const num_LP_Bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    const num_HP_Bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(num_LP_Bullets).toBe(0);
    expect(num_HP_Bullets).toBe(1);
  });

  test('delete bullet point', async() => {
    await page.evaluate(() => {
      document.querySelector("#hp_bullets > bullet-point").shadowRoot.querySelector("article > button.general").click();
    })
    const num_HP_Bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(num_HP_Bullets).toBe(0);
  });

});

