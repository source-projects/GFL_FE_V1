import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as wijmo from "@grapecity/wijmo";
import { PrintInvoiceData, QualityList } from "app/@theme/model/printInvoice";
import { PrintInvoiceService } from "app/@theme/services/print-invoice.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
  selector: "ngx-print-layout",
  templateUrl: "./print-layout.component.html",
  styleUrls: ["./print-layout.component.scss"],
})
export class PrintLayoutComponent implements OnInit {
  d: Subscription;
  doc: any;
  arrayOfValues: Array<string>;
  public invoiceNo: string;
  public printInvoiceFlag: boolean = false;
  public printInvoiceData: PrintInvoiceData[];
  public myDate;
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private printService: PrintInvoiceService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    const myArray = this._route.snapshot.queryParamMap.get("myArray");
    if (myArray === null) {
      this.invoiceIds = new Array<string>();
    } else {
      this.invoiceIds = JSON.parse(myArray);
    }
    console.log("Invoice NO:", this.invoiceIds);
    // this.invoiceNo = this._route.snapshot.paramMap.get("id");

    this.start();
  }

  start() {
    if (this.invoiceIds != null) {
      this.myDate = new Date();
      this.myDate = this.datePipe.transform(this.myDate, "dd-MM-yyyy");

      let index = 0;
      this.printInvoiceData = [];
      for (const ele of this.invoiceIds) {
        this.invoiceNo = ele;

        this.printService.getInvoiceByNoToPrint(this.invoiceNo).subscribe(
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
              }

              //calculate total amount, mtr, f.mtr, pcs
              this.printInvoiceData[index].totalMtr = 0;
              this.printInvoiceData[index].totalAmt = 0;
              this.printInvoiceData[index].totalPcs = 0;
              this.printInvoiceData[index].totalFinishMtr = 0;

              this.printInvoiceData[index].qualityList.forEach((quality) => {
                if(quality.totalMtr){
                this.printInvoiceData[index].totalMtr += quality.totalMtr;
                this.printInvoiceData[index].totalAmt += quality.amt;
                this.printInvoiceData[index].totalPcs += quality.pcs;
                this.printInvoiceData[index].totalFinishMtr += quality.finishMtr;
                }
              });

              this.printInvoiceData[index].discount = this.printInvoiceData[index].totalAmt * 0.03;
              this.printInvoiceData[index].sgst = this.printInvoiceData[index].cgst = this.printInvoiceData[index].totalAmt * 0.025;
              this.printInvoiceData[index].taxAmt = this.printInvoiceData[index].totalAmt - this.printInvoiceData[index].discount;
              this.printInvoiceData[index].netAmt = 
                this.printInvoiceData[index].sgst + this.printInvoiceData[index].cgst + this.printInvoiceData[index].taxAmt; 
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
    }
  }

  getInvoiceDataToPrint() {}

  print() {
    // if(this.printInvoiceFlag){
    let doc = new wijmo.PrintDocument({
      title: "",
    });
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
    }, 1000);
  }
}
