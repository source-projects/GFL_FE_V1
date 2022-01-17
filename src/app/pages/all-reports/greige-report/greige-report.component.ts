import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
import { sortBy as _sortBy } from 'lodash';

@Component({
  selector: 'ngx-greige-report',
  templateUrl: './greige-report.component.html',
  styleUrls: ['./greige-report.component.scss']
})
export class GreigeReportComponent implements OnInit {

  public maxDate: any;
  public currentDate = new Date();
  @Input() shortReport = [];
  @Input() toDate;
  @Input() fromDate;
  headers;
  brijeshTakka = 0;
  manishTakka = 0;
  gloryTakka = 0;
  brijeshMtr = 0;
  manishMtr = 0;
  gloryMtr = 0;
  brijeshBVal = 0;
  manishBVal = 0;
  gloryBVal = 0;
  takkaTotal = 0;
  mtrTotal = 0;
  bValTotal = 0;

  constructor(public datepipe: DatePipe,) { }

  ngOnInit(): void {
    this.brijeshTakka = 0;
    this.manishTakka = 0;
    this.gloryTakka = 0;
    this.brijeshMtr = 0;
    this.manishMtr = 0;
    this.gloryMtr = 0;
    this.brijeshBVal = 0;
    this.manishBVal = 0;
    this.gloryBVal = 0;
    this.takkaTotal = 0;
    this.mtrTotal = 0;
    this.bValTotal = 0;
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
  subHeaderKeys = [];
  subHeaderArray = [];
  getShortReport() {

    if (this.shortReport && this.shortReport.length) {


      this.shortReport.forEach(val => {
        if (val.masterName.toString().toLowerCase() == 'brijesh') {
          this.brijeshTakka = val.totalPcs;
          this.brijeshMtr = val.totalMtr;
          this.brijeshBVal = val.totalBillingValue;
        }
        if (val.masterName.toString().toLowerCase() == 'manish') {
          this.manishTakka = val.totalPcs;
          this.manishMtr = val.totalMtr;
          this.manishBVal = val.totalBillingValue;
        }
        if (val.masterName.toString().toLowerCase() == 'glory') {
          this.gloryTakka = val.totalPcs;
          this.gloryMtr = val.totalMtr;
          this.gloryBVal = val.totalBillingValue;
        }
      });

      this.takkaTotal = Number((this.brijeshTakka + this.manishTakka + this.gloryTakka).toFixed(2));
      this.mtrTotal = Number((this.brijeshMtr + this.manishMtr + this.gloryMtr).toFixed(2));
      this.bValTotal = Number((this.brijeshBVal + this.manishBVal + this.gloryBVal).toFixed(2));

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
        finalHeader = finalHeader.filter(v => v !== "List");

        this.headerArray = this.headerArray.filter(v => v !== "list");
        this.headers = [...finalHeader];


        if (this.shortReport[0].list[0].list && this.shortReport[0].list[0].list.length) {
                    
          let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
          this.subHeaderArray = Object.keys(this.shortReport[0].list[0].list[0]);

          let finalHeader = [];
          this.subHeaderArray.forEach((ele, i) => {
            finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
            finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
          });
          finalHeader = finalHeader.filter(v => v !== "List");

          this.subHeaderArray = this.subHeaderArray.filter(v => v !== "list");
          this.subHeaderKeys = [...finalHeader];

          this.shortReport.forEach(ele => {
            ele.list.forEach(element => {
              element['qualityObject'] = this.groupBy(element.list,'qualityId');
              let keys = Object.keys(element['qualityObject']);
              if(keys && keys.length){
                keys.forEach(val => {
                  let pcs = 0;
                  let mtr = 0;
                  let wt = 0;
                  let bVal = 0;
                  element['qualityObject'][val].forEach(value => {
                    pcs = pcs + value.totalPcs;
                    mtr = mtr + value.totalMtr;
                    bVal = bVal + value.billingValue;
                    wt = wt + value.totalWt;
                  });
                  let obj = {
                    data:element['qualityObject'][val]
                  }
                  element['qualityObject'][val].forEach(value => {
                    obj['pcs'] = pcs.toFixed(2);
                    obj['mtr'] = mtr.toFixed(2);
                    obj['bVal'] = bVal.toFixed(2);
                    obj['wt'] = wt.toFixed(2);
                  });
                  element['qualityObject'][val] = obj;
                })
              }
            });
          })
        }
      }

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

  groupBy(objectArray, property) {

    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);

      return acc;
    }, {});
  }


}
