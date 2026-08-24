const { test, expect } = require('@playwright/test');
const writeExcel = require('./ExcelExample');

test.only('upload downlaod excel validation', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const dl = await downloadPromise;
    await writeExcel.writeExcel(textSearch, 350, { rowChange: 0, columnChange: 2 }, "/Users/abhishekkumar/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("/Users/abhishekkumar/Downloads/download.xlsx");

    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});

