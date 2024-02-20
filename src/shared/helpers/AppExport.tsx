import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export const EXPORT_PAGE_SIZE = 20;

export const saveAsExcelFile = (buffer: any, fileName: string): void => {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
        data,
        `${fileName}-Export${new Date().getTime()}${EXCEL_EXTENSION}`
    );
};

export const exportAsExcelFile = (json: any[], excelFileName: string): void => {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
        Sheets: { Result: worksheet },
        SheetNames: ['Result'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });
    saveAsExcelFile(excelBuffer, excelFileName);
};
