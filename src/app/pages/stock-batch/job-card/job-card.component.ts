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
              this.printBatchData.forEach(el=>{
                if (el.batchDataList.length > 24) {

                  //seperating 2 lists...
                  let tempGrs = [];
                  let len = el.batchDataList.length;
                  for (let a = 24; a < len; a++) {
                    tempGrs.push({ ...el.batchDataList[24] });
                    let removed = el.batchDataList.splice(24,1);
                  }
                  el["batchDataList2"] = [...tempGrs];
                  if (el["batchDataList2"].length < 24) {
                    for (let a = 0; a < 24; a++) {
                      if (!el.batchDataList2[a]) {
                        el.batchDataList2.push({...this.tempGr});
                      }
                    }
                  }
                } else if (el.batchDataList.length < 24) {
                  for (let a = 0; a < 24; a++) {
                    if (!el.batchDataList[a]) {
                      el.batchDataList.push({...this.tempGr});
                    }
                  }
                }
  
                //set list 2 as empty;
                if (!el.batchDataList2) {
                  el["batchDataList2"] = [];
                  for (let a = 0; a < 24; a++) {
                    el["batchDataList2"].push({...this.tempGr});
                  }
                }
  
                //set sequence no....
                let i1 = 1;
                for (let idx = 0; idx < 24; idx++){
                  el.batchDataList[idx]['sr'] = i1;
                  el.batchDataList2[idx]['sr'] = i1 + 24;
                  i1 += 1;
                }
  
                let totalMtrl1 = 0;
                totalMtrl1 = el.batchDataList.map((a) => a.mtr).reduce(function (a, b) { return a + b; });
                let totalMtrl2 = 0 
                totalMtrl2 = el.batchDataList2.map((a) => a.mtr).reduce(function (a, b) { return a + b; });
                let totalWtl1 = 0;
                totalWtl1 = el.batchDataList.map((a) => a.wt).reduce(function (a, b) { return a + b; });
                let totalWtl2 = 0;
                totalWtl2 = el.batchDataList2.map((a) => a.wt).reduce(function (a, b) { return a + b; });
                el["totalMtrList1"] = Number(totalMtrl1)
                el["totalMtrList2"] = Number(totalMtrl2)
                el["totalWtList1"] = Number(totalWtl1)
                el["totalWtList2"] = Number(totalWtl2)
              });
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
    this.printBatchData.forEach((batch, i) => {
     let inter1 = setInterval(() => {
        let data1 = <HTMLElement>document.getElementById("print-jobCard" + i);
        if (data1 != null) {
          doc.append(data1);
         clearInterval(inter1);
        }
      }, 10);
    });

    setTimeout(() => {
      doc.print();
      this.activeModal.close(true);
    }, 1000);
  }
}
