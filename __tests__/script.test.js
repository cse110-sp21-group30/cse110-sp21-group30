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
      let close_faq = await page.$("#faq button"); //close faq modal
      await close_faq.click();
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
    const num_HP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(num_HP_bullets).toBe(1);
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

  test('edit a bullet point', async () => {
      jest.setTimeout(30000);
      //make another bullet
      let text_box = await page.$('#editor_text');
      await text_box.click();
      await text_box.type('Testing Editing Bullets'); //add text
      await page.select("#select2", "work"); //add label
      await page.$eval('#entry_date', el => el.value = '2020-02-20'); //fill date
      await page.keyboard.press('Enter'); //submit bullet

      await page.evaluate(() => {
        document.querySelector("#hp_bullets > bullet-point").shadowRoot.querySelector("article > img.edit.hide-hover").click();
    });

      //edit modal should be populated with bullet info
      let edit_date = await page.$eval('#edit_date', el => el.value);
      let edit_content = await page.$eval('#edit_modal textarea', el => el.value);
      let edit_labels = await page.$eval('#edit_labels', el => el.value);
      expect(edit_date).toBe("2020-02-20");
      expect(edit_content).toBe("Testing Editing Bullets");
      expect(edit_labels).toBe("work");

      //edit
      let edit_box = await page.$('#edit_modal textarea');
      await edit_box.click();
      await edit_box.type('-more text here!'); //edit text
      await page.select("#edit_labels", "school");
      await page.$eval('#edit_date', el => el.value = "2021-07-04");
      let submit_edit = await page.$('#save_edits');
      await submit_edit.click();

      let bullet = await page.$('bullet-point');
      let data = await bullet.getProperty('entry');
      let json_obj = await data.jsonValue();

      //check that edits are saved
      expect(json_obj.content).toBe("Testing Editing Bullets-more text here!");
      expect(json_obj.labels).toBe("school");
      expect(json_obj.deadline).toBe("2021-07-04");
  });

  test('delete bullet point', async () => {
     await page.evaluate(() => {
        document.querySelector("#hp_bullets > bullet-point").shadowRoot.querySelector("article > img.edit.hide-hover").click();
    });

    let delete_bullet = await page.$('#delete_bullet');
    await delete_bullet.evaluate( d => d.click() );

    const num_HP_bullets = await page.evaluate(() => {
      return (Array.from(document.querySelector('#hp_bullets').children).length);
    })
    expect(num_HP_bullets).toBe(0);
  });

  test('Home url test', async() => {
    expect(page.url()).toMatch("https://nbuhr9.github.io/test-server/");
  });

  test('Archive view url', async() => {
    let archive_button = await page.$('#archive');
    await archive_button.evaluate( b => b.click() );
    expect(page.url()).toMatch('#archive');
  });

  test('Back arrow button', async() => {
      await page.goBack();
      expect(page.url()).toBe("https://nbuhr9.github.io/test-server/");
  });
});
