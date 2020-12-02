import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  templateToExcel:any[];




  public exportExcel(jsonData: any[], fileName: string, excelHeaders:string[]): void {
    console.log(jsonData);
    console.log(excelHeaders);
    this.templateToExcel=jsonData.map(Object.values);
    console.log(this.templateToExcel)
    this.templateToExcel.splice(0,0,excelHeaders)
    console.log(this.templateToExcel);
 
   
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.templateToExcel);
    
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    console.log(wb);
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }
 
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
}

