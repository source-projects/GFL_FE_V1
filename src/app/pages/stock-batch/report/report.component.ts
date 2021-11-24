import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
import { sortBy as _sortBy } from 'lodash';

import { ExportService } from '../../../@theme/services/export.service';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';

@Component({
  selector: "ngx-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
  public maxDate: any;
  public currentDate = new Date();
  @Input() shortReport = [];
  headers;
  constructor(
    private stockService: StockBatchService,
    private exportService: ExportService,
    public datepipe: DatePipe
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

    this.getShortReport();
  }

  headerArray = [];
  headerKeys = [];
  copyHeaderKeys = [];
  getShortReport() {

    if(this.shortReport && this.shortReport.length){
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

      if(this.shortReport[0].list && this.shortReport[0].list.length){
        let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
        this.headerArray = Object.keys(this.shortReport[0].list[0]);
        let finalHeader = [];
        this.headerArray.forEach((ele, i) => {
          finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
          finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
        });
        this.headers = [...finalHeader];
    
      }
    }
  
    this.printReport();

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
          
        }, 1000);
      }
    }, 10);
  }

}
