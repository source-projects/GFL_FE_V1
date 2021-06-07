import { takeUntil } from 'rxjs/operators';
import { DatePipe } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as wijmo from "@grapecity/wijmo";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { PrintInvoiceData, QualityList, BatchWithGrList } from "../../../@theme/model/printInvoice";
import { PrintInvoiceService } from "../../../@theme/services/print-invoice.service";
import { ToastrService } from "ngx-toastr";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "ngx-print-layout",
  templateUrl: "./print-layout.component.html",
  styleUrls: ["./print-layout.component.scss"],
})
export class PrintLayoutComponent implements OnInit, OnDestroy {
  d: Subscription;
  doc: any;
  arrayOfValues: Array<string>;
  public invoiceNo: string;
  public printInvoiceFlag: boolean = false;
  public printInvoiceData: PrintInvoiceData[];
  public myDate;
  @Input() finalInvoice: any;
  @Input() previewFlag = false;
  @Input() discount

  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  invoiceData = [];
  copyType = ["Original", "Duplicate", "Triplicate"]
  private destroy$ = new Subject<void>();

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private printService: PrintInvoiceService,
    private router: Router,
    private _route: ActivatedRoute,
    public activeModal: NgbActiveModal,

  ) { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    const myArray = this._route.snapshot.queryParamMap.get("myArray");
    const invoiceNo = this._route.snapshot.queryParamMap.get("invoice");
    if (myArray === null) {
      this.invoiceIds = new Array<string>();
    } else {
      this.invoiceIds = JSON.parse(myArray);
    }

    if (this.finalInvoice) {
      this.printService.getInvoiceByBatchAndStock(this.finalInvoice).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.printInvoiceData = data["data"];
            this.start();
          }
        },
        (error) => {

        }
      )
    } else {
      if (invoiceNo) {
        this.printService.getInvoiceByNoToPrint(invoiceNo).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.printInvoiceData = data["data"];
              this.start();
              this.print();
            }
          },
          (error) => {

          }
        )
      } else {
        this.start();
      }

    }

  }


  start() {
    if (this.invoiceIds.length > 0) {
      this.myDate = new Date();
      this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");

      let index = 0;
      this.printInvoiceData = [];
      for (const ele of this.invoiceIds) {
        this.invoiceNo = ele;

        this.printService.getInvoiceByNoToPrint(this.invoiceNo).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.printInvoiceData.push(new PrintInvoiceData());
              this.printInvoiceData[index] = data["data"];
              for (let i = 0; i < 4; i++) {
                if (!this.printInvoiceData[index].qualityList[i]) {
                  this.printInvoiceData[index].qualityList.push(
                    new QualityList()
                  );
                }
                this.printInvoiceData[index].batchWithGrList.forEach(element => {
                  element.batchDataList.sort(function (obj1, obj2) {
                    return obj1.sequenceId - obj2.sequenceId;
                  })

                  element.batchDataList.forEach(ele => {
                    if (ele.mtr == "0") {
                      ele.mtr = "-"
                    }
                  })
                });


              }
              //calculate total amount, mtr, f.mtr, pcs
              this.printInvoiceData[index].totalMtr = 0;
              this.printInvoiceData[index].totalAmt = 0;
              this.printInvoiceData[index].totalPcs = 0;
              this.printInvoiceData[index].totalFinishMtr = 0;

              this.printInvoiceData[index].qualityList.forEach((quality) => {
                if (quality.totalMtr) {
                  this.printInvoiceData[index].totalMtr += quality.totalMtr;
                  this.printInvoiceData[index].totalAmt += quality.amt;
                  this.printInvoiceData[index].totalPcs += quality.pcs;
                  this.printInvoiceData[index].totalFinishMtr += quality.finishMtr;
                }
              });

              //calculating shrinkage, total mtr, total finish mtr...
              this.printInvoiceData[index].batchWithGrList.forEach(element => {
                element.totalMtr = 0;
                element.totalFMtr = 0;
                element.shrinkage = 0;
                element.lotDataLength = element.batchDataList.length;
                element.batchDataList.forEach(lot => {
                  if (lot.mtr == "-") {
                    lot.mtr = "0";
                  }
                  element.totalMtr += Number(lot.mtr);
                  element.totalFMtr += lot.finishMtr
                  if (lot.mtr == "0") {
                    lot.mtr = "-";
                  }
                });
                element.totalMtr = (element.totalMtr).toFixed(2);
                element.totalFMtr = (element.totalFMtr).toFixed(2);
                element.shrinkage = (((element.totalMtr - element.totalFMtr) / element.totalMtr) * 100).toFixed(2);
              });

              //for making 4 blocks
              let lengthOfLots = this.printInvoiceData[index].batchWithGrList.length;
              for (let lotIndex = 0; lotIndex < 4 - lengthOfLots; lotIndex++) {
                this.printInvoiceData[index].batchWithGrList.push(new BatchWithGrList());
              }
              if (!this.printInvoiceData[index].discount)
                this.printInvoiceData[index].discount = Number(((this.printInvoiceData[index].totalAmt * this.discount) / 100).toFixed(2));

              if (!this.printInvoiceData[index].taxAmt)
                this.printInvoiceData[index].taxAmt = Number((this.printInvoiceData[index].totalAmt - this.printInvoiceData[index].discount).toFixed(2));

              if (!this.printInvoiceData[index].sgst)
                this.printInvoiceData[index].sgst = this.printInvoiceData[index].cgst = Number((this.printInvoiceData[index].taxAmt * 0.025).toFixed(2));

              if (!this.printInvoiceData[index].netAmt) {
                this.printInvoiceData[index].netAmt =
                  this.printInvoiceData[index].sgst + this.printInvoiceData[index].cgst + this.printInvoiceData[index].taxAmt;
                  this.printInvoiceData[index].netAmt = Math.round(this.printInvoiceData[index].netAmt);
              }
              index++;
              if (index == this.invoiceIds.length) {
                this.print();
              }
              // this.printInvoiceFlag = true;
            } else {
              this.toastr.error(data["msg"]);
              this.router.navigate(["pages/generate_invoice"]);
            }
            //this.print();
          },
          (error) => {
            this.router.navigate(["pages/generate_invoice"]);
          }
        );
        // this.getInvoiceDataToPrint();
      }
    } else {

      // this.myDate = new Date();
      // this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");

      let arr = [];
      arr.push(this.printInvoiceData);
      this.printInvoiceData = arr;
      let index = 0;
      this.printInvoiceData[index].batchWithGrList.forEach(element => {
        element.batchDataList.sort(function (obj1, obj2) {
          return obj1.sequenceId - obj2.sequenceId;
        })

        for (let i = 0; i < 4; i++) {
          if (!this.printInvoiceData[index].qualityList[i]) {
            this.printInvoiceData[index].qualityList.push(
              new QualityList()
            );
          }
        }

        element.batchDataList.forEach(ele => {
          if (ele.mtr == "0") {
            ele.mtr = "-"

          }
        })
      });
      this.printInvoiceData[index].totalMtr = 0;
      this.printInvoiceData[index].totalAmt = 0;
      this.printInvoiceData[index].totalPcs = 0;
      this.printInvoiceData[index].totalFinishMtr = 0;

      this.printInvoiceData[index].qualityList.forEach((quality) => {
        if (quality.totalMtr) {
          this.printInvoiceData[index].totalMtr += quality.totalMtr;
          this.printInvoiceData[index].totalAmt += quality.amt;
          this.printInvoiceData[index].totalPcs += quality.pcs;
          this.printInvoiceData[index].totalFinishMtr += quality.finishMtr;
        }
      });

      //calculating shrinkage, total mtr, total finish mtr...
      this.printInvoiceData[index].batchWithGrList.forEach(element => {
        element.totalMtr = 0;
        element.totalFMtr = 0;
        element.shrinkage = 0;
        element.lotDataLength = element.batchDataList.length;
        element.batchDataList.forEach(lot => {
          if (lot.mtr == "-") {
            lot.mtr = "0";
          }
          element.totalMtr += Number(lot.mtr)
          element.totalFMtr += lot.finishMtr
          if (lot.mtr == "0") {
            lot.mtr = "-";
          }
        });
        element.totalMtr = (element.totalMtr).toFixed(2);
        element.totalFMtr = (element.totalFMtr).toFixed(2);
        element.shrinkage = (((element.totalMtr - element.totalFMtr) / element.totalMtr) * 100).toFixed(2);
      });

      //for making 4 blocks
      let lengthOfLots = this.printInvoiceData[index].batchWithGrList.length;
      for (let lotIndex = 0; lotIndex < 4 - lengthOfLots; lotIndex++) {
        this.printInvoiceData[index].batchWithGrList.push(new BatchWithGrList());
      }

      if (!this.printInvoiceData[index].discount)
                this.printInvoiceData[index].discount = Number(((this.printInvoiceData[index].totalAmt * this.discount) / 100).toFixed(2));

              if (!this.printInvoiceData[index].taxAmt)
                this.printInvoiceData[index].taxAmt = Number((this.printInvoiceData[index].totalAmt - this.printInvoiceData[index].discount).toFixed(2));

              if (!this.printInvoiceData[index].sgst)
                this.printInvoiceData[index].sgst = this.printInvoiceData[index].cgst = Number((this.printInvoiceData[index].taxAmt * 0.025).toFixed(2));

              if (!this.printInvoiceData[index].netAmt) {
                this.printInvoiceData[index].netAmt =
                  this.printInvoiceData[index].sgst + this.printInvoiceData[index].cgst + this.printInvoiceData[index].taxAmt;
                  this.printInvoiceData[index].netAmt = Math.round(this.printInvoiceData[index].netAmt);
              }

    }
  }

  getInvoiceDataToPrint() { }

  print() {
    // if(this.printInvoiceFlag){
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

    for (let i = 0; i < this.printInvoiceData.length; i++) {
      let inter1 = setInterval(() => {
        let data1 = <HTMLElement>document.getElementById("printpdf" + i);
        if (data1 != null) {
          doc.append(data1);
          clearInterval(inter1);
        }
      }, 10);
    }

    setTimeout(() => {
      doc.print();
      this.router.navigate(['pages/generate_invoice']);
    }, 1000);
  }

  onCancel() {
    this.activeModal.close(false);
  }

  onPrint() {
    let obj = {};
    obj = {
      cgst: this.printInvoiceData[0].cgst,
      discount: this.printInvoiceData[0].discount,
      taxAmt: this.printInvoiceData[0].taxAmt,
      sgst: this.printInvoiceData[0].sgst,
      netAmt: this.printInvoiceData[0].netAmt,
      print: "print"
    }
    this.activeModal.close(obj);

  }

  onSave() {
    let obj = {};
    if (this.printInvoiceData && this.printInvoiceData.length) {
      obj = {
        cgst: this.printInvoiceData[0].cgst,
        discount: this.printInvoiceData[0].discount,
        taxAmt: this.printInvoiceData[0].taxAmt,
        sgst: this.printInvoiceData[0].sgst,
        netAmt: this.printInvoiceData[0].netAmt
      }
    }
    this.activeModal.close(obj);
  }
}
