describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501/cse110-sp21-group30-thirdSprint/source/index.html');
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

  test('make LP bullet point', async () => {
      let open_editor = await page.$('#edit');
      await open_editor.click();
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

  test('check if bullet added to correct column (LP)', async () => {
    const numLPBullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    expect(numLPBullets).toBe(1);
  });

  test('test bullet migration (LP -> HP)', async () => {
    await page.evaluate(() => {
      document.querySelector("#lp_bullets > bullet-point").shadowRoot.querySelector("article > button.change-priority").click();
    })
    const numLPBullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    const numHPBullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(numLPBullets).toBe(0);
    expect(numHPBullets).toBe(1);
  });

  test('delete bullet point', async() => {
    await page.evaluate(() => {
      document.querySelector("#hp_bullets > bullet-point").shadowRoot.querySelector("article > button.del").click();
    })
    const numHPBullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(numHPBullets).toBe(0);
  });

});
