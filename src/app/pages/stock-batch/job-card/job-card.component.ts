import { Component, Input, OnInit } from "@angular/core";
import * as wijmo from "@grapecity/wijmo";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
@Component({
  selector: "ngx-job-card",
  templateUrl: "./job-card.component.html",
  styleUrls: ["./job-card.component.scss"],
})
export class JobCardComponent implements OnInit {
  @Input() isDirectPrintFlag;
  @Input() stockBatchData;
  @Input() stockId;
  public printBatchData = [];
  public tempGr: any = { sr: "", mtr: "", wt: "" };

  constructor(
    private activeModal: NgbActiveModal,
    private stockBatchService: StockBatchService
  ) {}

  ngOnInit(): void {
    if (this.isDirectPrintFlag) {
      this.getstockDataById();
      //this.printNow()
    }
  }

  getstockDataById() {
    //get batch ids for print...
    let batchIds = this.stockBatchData.batchData
      .map((item) => item.batchId)
      .filter((value, index, self) => self.indexOf(value) === index);
    let i = 0;
    for (let batch of batchIds) {
      this.stockBatchService
        .getJobCardData(this.stockId, batch)
        .subscribe((data) => {
          if (data["success"]) {
            this.printBatchData.push(data["data"]);
            if (this.printBatchData.length == batchIds.length) {
              if (this.printBatchData[i].batchDataList.length > 24) {
                //seperating 2 lists...
                let tempGrs = [];
                for (
                  let a = 24;
                  a < this.printBatchData[i].batchDataList.length;
                  a++
                ) {
                  tempGrs.push({ ...this.printBatchData[i].batchDataList[24] });
                  let removed = this.printBatchData[i].batchDataList[24].splice(
                    24,
                    1
                  );
                }
                this.printBatchData[i]["batchDataList2"] = [...tempGrs];
                if (this.printBatchData[i]["batchDataList2"].length < 24) {
                  for (let a = 0; a < 24; a++) {
                    if (!this.printBatchData[i].batchDataList2[a]) {
                      this.printBatchData[i].batchDataList2.push(this.tempGr);
                    }
                  }
                }
              } else if (this.printBatchData[i].batchDataList.length < 24) {
                for (let a = 0; a < 24; a++) {
                  if (!this.printBatchData[i].batchDataList[a]) {
                    this.printBatchData[i].batchDataList.push(this.tempGr);
                  }
                }
              }

              //set list 2 as empty;
              if (!this.printBatchData[i].batchDataList2) {
                this.printBatchData[i]["batchDataList2"] = [];
                for (let a = 0; a < 24; a++) {
                  this.printBatchData[i]["batchDataList2"].push(this.tempGr);
                }
              }

              //set sequence no....
              let i1 = 0;
              this.printBatchData[i].batchDataList.forEach((element) => {
                element["sr"] = i1++;
              });
              if (this.printBatchData[i].batchDataList2) {
                this.printBatchData[i].batchDataList2.forEach((element) => {
                  element["sr"] = i1++;
                });
              }

              let totalMtrl1: number = this.printBatchData[i].batchDataList.map(a => a.mtr).reduce(function(a, b){  return a + b; });
              let totalMtrl2: number = this.printBatchData[i].batchDataList2.map(a => a.mtr).reduce(function(a, b){  return a + b; });
              let totalWtl1: number = this.printBatchData[i].batchDataList.map(a => a.wt).reduce(function(a, b){  return a + b; });
              let totalWtl2: number = this.printBatchData[i].batchDataList2.map(a => a.wt).reduce(function(a, b){  return a + b; });
              this.printBatchData[i]['totalMtrList1'] = totalMtrl1? totalMtrl1 : '-';
              this.printBatchData[i]['totalMtrList2'] = totalMtrl2? totalMtrl2 : '-';
              this.printBatchData[i]['totalWtList1'] = totalWtl1? totalWtl1 : '-';
              this.printBatchData[i]['totalWtList2'] = totalWtl2? totalWtl2 : '-';
              this.printNow();
            }
          }
        });
      i++;
    }
  }

  printNow() {
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
    doc.append('<link href="./job-card.component.scss" rel="stylesheet">');
    let tempFlag = false;
    // let inter = setInterval(() => {
    //   let element = <HTMLElement>document.getElementById("print-jobCard");
    //   if (element) {
    //     doc.append(element);
    //     doc.print();
    //     // this.printFlag = true;
    //     tempFlag = true;
    //     clearInterval(inter);
    //     this.activeModal.close();
    //   }
    // }, 10);
    this.printBatchData.forEach((batch, i) => {
      let element = <HTMLElement>document.getElementById("print-jobCard" + i);
      if (element) {
        doc.append(element);
        doc.print();
      }
    });
    this.activeModal.close();
  }
}
