import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
import { sortBy as _sortBy } from 'lodash';

@Component({
  selector: "ngx-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.scss"],
})
export class InvoiceReportComponent implements OnInit {
  
  public maxDate: any;
  public currentDate = new Date();
  @Input() shortReport = [];
  headers;
  totalFinishedMeter: number;
  totalGrayMeter: number;
  totalAmount: number;

  constructor(
   
    public datepipe: DatePipe,
    
  ) {
    
  }

  ngOnInit(): void {
    this.maxDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      23,
      59
    );
    this.getShortReport()
  }



  headerArray = [];
  headerKeys = [];
  copyHeaderKeys = [];
  getShortReport() {
    this.totalAmount = 0;
    this.totalFinishedMeter = 0;
    this.totalGrayMeter = 0;

    if (this.shortReport && this.shortReport.length) {
      let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
      this.copyHeaderKeys = Object.keys(this.shortReport[0]);
      let finalHeader = [];
      this.copyHeaderKeys.forEach((ele, i) => {
        finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
        finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
      });
      finalHeader = finalHeader.filter(v => v !== "List");
      this.copyHeaderKeys = this.copyHeaderKeys.filter(v => v !== "list");
      this.headerKeys = [...finalHeader];
      if (this.shortReport[0].list && this.shortReport[0].list.length) {
        let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
        this.headerArray = Object.keys(this.shortReport[0].list[0]);
        let finalHeader = [];
        this.headerArray.forEach((ele, i) => {
          finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
          finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
        });
        this.headers = [...finalHeader];

        this.shortReport.forEach((element) => {
          element.list.forEach(billData => {
            this.totalFinishedMeter += billData.totalFinishMtr;
            this.totalGrayMeter += billData.totalMtr;
            this.totalAmount += billData.taxAmt;
          });
        });
      }
      this.shortReport = _sortBy(this.shortReport, 'invoiceNo');
      this.printReport();
    }
  }

  printReport() {
    let doc = new wijmo.PrintDocument({
      title: "",
    });
    doc.append(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">'
    );
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );
    let inter1 = setInterval(() => {
      let data1 = <HTMLElement>document.getElementById("shortReport");
      if (data1 != null) {
        doc.append(data1);
        clearInterval(inter1);
        setTimeout(() => {
          doc.print();
          this.shortReport = [];
        }, 1000)
      }
    }, 10);
  }

}
