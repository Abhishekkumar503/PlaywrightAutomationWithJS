const Exceljs = require('exceljs');

const sheet = "Sheet1";

async function readExcel(worksheet, searchText) {

    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.col = colNumber;
            }
        });
    });
    return output;
}


async function writeExcel(searchText, replaceText, change, filePath) {
    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheet);
    const output = await readExcel(worksheet, searchText);
    if (output.row != -1 && output.col != -1) {
        const cell = worksheet.getCell(output.row + change.rowChange, output.col + change.columnChange);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
    }
    else
        console.log("Search text is not found! ");
}
writeExcel("Banana", 350, { rowChange: 0, columnChange: 2 }, "./tests/File/download.xlsx");
module.exports = { writeExcel };