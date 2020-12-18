import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Angular2Txt } from 'angular2-txt/Angular2-txt';
import * as FileSaver from 'file-saver';
import { FileSaverOptions } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})

export class ExportService {
  [x: string]: any;

  constructor( private httpClient: HttpClient, private commonService: CommonService ) { }

  fileType:string;
  fileExtension:string;
  templateToFile:any[];
  options: FileSaverOptions = {
    autoBom: false,
  };

  public exportExcel(jsonData: any[], fileName: string, Headers: string[],): void {

    this.fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    this.fileExtension = '.xlsx';

    console.log(jsonData);
    console.log(Headers);
    this.templateToFile = jsonData.map(Object.values);
    console.log(this.templateToFile)
    this.templateToFile.splice(0, 0, Headers)
    console.log(this.templateToFile);

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.templateToFile);

    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    console.log(wb);
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveFile(excelBuffer, fileName);
  }

  public exportText(jsonData: any[], fileName: string, Headers: string[]): void {
    console.log(jsonData);
    var options = {
      headers: Headers,
      fieldSeparator: ' , ',
      quoteStrings: '"',
      decimalseparator: '.',
    };

    new Angular2Txt(jsonData, fileName, options);

  }

  public exportPdf(jsonData: any[], fileName: string, Headers: string[]): void {
    console.log(jsonData);
    var outputData = [];
    outputData = jsonData.map(Object.values);
    console.log(outputData);
    var headers = [Headers];
    var doc = new jsPDF();

    doc.setFontSize(11);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: headers,
      body: outputData,
    })
    doc.save(fileName + '.pdf');
  }
 
  private saveFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public sendMail(documentModal){
    return this.httpClient.post(this.commonService.envUrl()+'api/Document', documentModal);
  }
}

