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

  test('make HP bullet point', async () => {
      jest.setTimeout(10000);
      let open_editor = await page.$('#edit');
      await open_editor.click();
      let text_box = await page.$('#editor_text');
      await text_box.click(); //after click, box should have no text
      await text_box.type('Test Input'); //add text
      await page.keyboard.press('Enter'); //submit bullet, and wait for bullet to appear
      await page.waitForSelector('bullet-point');

      let bullet = await page.$('bullet-point');
      let data = await bullet.getProperty('entry');
      let json_obj = await data.jsonValue();
      expect(json_obj.content).toBe("Test Input");
      expect(json_obj.bullet_id).toBe("1");
  });

  test('check if bullet added to correct column (HP)', async () => {
    const num_LP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(num_LP_bullets).toBe(1);
  });

  test('test bullet migration (HP -> LP)', async () => {
    await page.evaluate(() => {
      document.querySelector("#hp_bullets > bullet-point").shadowRoot.querySelector("article > img.change-priority.hide-hover").click();
    })
    const num_HP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    const num_LP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    expect(num_HP_bullets).toBe(0);
    expect(num_LP_bullets).toBe(1);
  });

  test('delete bullet point', async() => {
    await page.evaluate(() => {
      document.querySelector("#lp_bullets > bullet-point").shadowRoot.querySelector("article > img.del.hide-hover").click();
    })
    const num_LP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#lp_bullets').children).length);
    })
    expect(num_LP_bullets).toBe(0);
  });

  //Test for changing to archive page toggle
  test('Archive view url', async() => {
      let archive_button = await page.$('#archive');
      await archive_button.click();
      expect(page.url()).toMatch('#archive');
  });

  //Testing the back button
  test('Back arrow button', async() => {
    let placeHolder = page.url(); //starting url (home)
    let archive_button = await page.$('#archive');
    await archive_button.click();
    await page.goBack(); //Simulates clikcing the back button
    expect(page.url()).toBe('beansHome'); //This should check if it contains /#entry1
});

});
