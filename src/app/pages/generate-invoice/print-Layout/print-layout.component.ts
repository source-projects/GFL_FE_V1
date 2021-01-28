import { DatePipe } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as wijmo from "@grapecity/wijmo";
import { PrintInvoiceData } from "app/@theme/model/printInvoice";
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
  public printInvoiceData: PrintInvoiceData;
  public myDate;
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


  constructor(private datePipe: DatePipe, private toastr: ToastrService, private printService: PrintInvoiceService, private router: Router, private _route: ActivatedRoute) { }
  ngOnInit() {

    const myArray = this._route.snapshot.queryParamMap.get('myArray');
    if (myArray === null) {
      this.invoiceIds = new Array<string>();
    } else {
      this.invoiceIds = JSON.parse(myArray);
    }
    console.log("Invoice NO:", this.invoiceIds)
    // this.invoiceNo = this._route.snapshot.paramMap.get("id");

    this.start();

  }


  start() {

    if (this.invoiceIds != null) {
      this.myDate = new Date();
      this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');


      for (const ele of this.invoiceIds) {

        this.invoiceNo = ele;
        this.printService.getInvoiceByNoToPrint(this.invoiceNo).subscribe(
          (data) => {
            if (data['success']) {
              this.printInvoiceData = new PrintInvoiceData();
              this.printInvoiceData = data['data'];
              // this.printInvoiceFlag = true;
    
            }
            else {
              this.toastr.error(data['msg']);
              this.router.navigate(['pages/generate_invoice']);
            }
            this.print();
          },
          error => {
            this.router.navigate(['pages/generate_invoice']);
          }
        );
        // this.getInvoiceDataToPrint();

      }
    }
  }

  getInvoiceDataToPrint() {

    
  }

  print() {

    // if(this.printInvoiceFlag){
    let doc = new wijmo.PrintDocument({
      title: "PrintDocument Test",
    });
    doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
    doc.append('<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">');

    let inter = setInterval(() => {
      let data1 = document.getElementById("printpdf");
      if (data1 != null) {
        doc.append(data1);
        doc.print();
        clearInterval(inter);
      }
    }, 10);
    // }
  }

}
