import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: "ngx-print-lot-return",
  templateUrl: "./print-lot-return.component.html",
  styleUrls: ["./print-lot-return.component.scss"],
})
export class PrintLotReturnComponent implements OnInit, OnDestroy {
  public chlNo: number;
  public lotReturnData: any;
  public list1 = [];
  public list2 = [];
  public list3 = [];
  public list4 = [];
  public totalMtr = {
    list1: 0,
    list2: 0,
    list3: 0,
    list4: 0,
    total: 0
  };
  public totalCount = {
    total: 0,
    list1: 0,
    list2: 0,
    list3: 0,
    list4: 0,
  };

  private destroy$ = new Subject<void>();
  constructor(
    private _route: ActivatedRoute,
    private stockService: StockBatchService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    // this.printNow();
    this.chlNo = Number(this._route.snapshot.queryParamMap.get("chlNo"));
    if (this.chlNo) {
      this.stockService
        .returnLotgetById(this.chlNo)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res["success"]) {
            this.lotReturnData = res["data"];
            this.totalCount.total = this.lotReturnData.batchReturnList.length
            for(let i = 1; i <= 48 ; i++){
              if(i <= 12){
                this.list1.push(this.lotReturnData.batchReturnList[i-1]?this.lotReturnData.batchReturnList[i-1]:{mtr:''})
                this.list1[this.list1.length-1]['idx']=this.lotReturnData.batchReturnList[i-1]?i:''
              }
              if(i <= 24 && i >= 13){
                this.list2.push(this.lotReturnData.batchReturnList[i-1]?this.lotReturnData.batchReturnList[i-1]:{mtr:''})
                this.list2[this.list2.length-1]['idx']=this.lotReturnData.batchReturnList[i-1]?i:''
              }
              if(i <= 36 && i >= 25){
                this.list3.push(this.lotReturnData.batchReturnList[i-1]?this.lotReturnData.batchReturnList[i-1]:{mtr:''})
                this.list3[this.list3.length-1]['idx']=this.lotReturnData.batchReturnList[i-1]?i:''
              }
              if(i <= 48 && i >= 37){
                this.list4.push(this.lotReturnData.batchReturnList[i-1]?this.lotReturnData.batchReturnList[i-1]:{mtr:''})
                this.list4[this.list4.length-1]['idx']=this.lotReturnData.batchReturnList[i-1]?i:''
              }
            }

            this.setTotal();
            this.printNow();
          } else {
            this.toastr.error(res['msg']);
            this.router.navigate(["pages/stock-batch/return-lot/view"]);
          }
        }, error=>{
          this.router.navigate(["pages/stock-batch/return-lot/view"]);
        });
    }
  }

  setTotal(){
    this.totalMtr.total = 0;
    let total = 0;
    this.list1.forEach((e)=>{
      if(e.mtr){
        this.totalMtr.total += e.mtr
        total += e.mtr
        this.totalCount.list1++
      }
    })
    this.totalMtr.list1 = total;
    total = 0;
    this.list2.forEach((e)=>{
      if(e.mtr){
        this.totalMtr.total += e.mtr
        total += e.mtr
        this.totalCount.list2++
      }
    })
    this.totalMtr.list2 = total;
    total = 0;
    this.list3.forEach((e)=>{
      if(e.mtr){
        this.totalMtr.total += e.mtr
        total += e.mtr
        this.totalCount.list3++
      }
    })
    this.totalMtr.list3 = total;
    total = 0;
    this.list4.forEach((e)=>{
      if(e.mtr){
        this.totalMtr.total += e.mtr
        total += e.mtr
        this.totalCount.list4++
      }
    })
    this.totalMtr.list4 = total;
  }

  printNow(){
    let doc = new wijmo.PrintDocument({
      title: "",
    });
    doc.append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">');
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );

      let inter1 = setInterval(() => {
        let data1 = <HTMLElement>document.getElementById("printpdf");
        if (data1 != null) {
          doc.append(data1);
          clearInterval(inter1);
        }
      }, 10);

    setTimeout(() => {
      doc.print();
      this.router.navigate(['pages/stock-batch/return-lot/view']);
    }, 1000);
  }
}
