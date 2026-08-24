const Exceljs = require('exceljs');

async function excelTest() {

    const workbook = new Exceljs.Workbook();
    await workbook.xlsx.readFile("./tests/File/download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            console.log(cell.value);
        });
    });
}

excelTest();



async function excelTest1() {

    let output = {row:-1,col:-1}; // local variable used for rewrite the cell value 
    const workbook = new Exceljs.Workbook();

    // read the xlsx file
    await workbook.xlsx.readFile("./tests/File/download.xlsx");
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === "Apple")
            {
                output.row = rowNumber;
                output.col = colNumber;
            }
        });
    });

    //Write the xlsx
    const cell = worksheet.getCell(output.row,output.col);
    cell.value = "Iphone";
    await workbook.xlsx.writeFile("./tests/File/download.xlsx");
}

excelTest1();