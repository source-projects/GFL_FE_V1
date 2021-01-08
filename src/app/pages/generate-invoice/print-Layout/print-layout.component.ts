import { Component, OnInit } from "@angular/core";
import { PrintInvoiceService } from "app/@theme/services/print-invoice.service";
import { Subscription } from "rxjs";
import * as wijmo from "@grapecity/wijmo";
import { ActivatedRoute, Router } from "@angular/router";
import { PrintInvoiceData } from "app/@theme/model/printInvoice";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: "ngx-print-layout",
  templateUrl: "./print-layout.component.html",
  styleUrls: ["./print-layout.component.scss"],
})
export class PrintLayoutComponent implements OnInit {
  d: Subscription;

  public invoiceNo: string;
  public printInvoiceFlag: boolean = false;
  public printInvoiceData: PrintInvoiceData;
  public myDate;
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];


  constructor(private datePipe: DatePipe, private toastr: ToastrService, private printService: PrintInvoiceService, private router:Router, private _route: ActivatedRoute) {}
  ngOnInit() {
    
    this.invoiceNo = this._route.snapshot.paramMap.get("id");
    if(this.invoiceNo != null){
      this.myDate = new Date();
      this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
      this.printInvoiceData = new PrintInvoiceData();
      this.getInvoiceDataToPrint();
    }
  }

  ngAfterViewInit(){
    // if (this.printService.isExport) {
    //   this.print();
    //   // setTimeout(print, 1000);
    // }
  }

  getInvoiceDataToPrint(){
    this.printService.getInvoiceByNoToPrint(this.invoiceNo).subscribe(
      data=>{
        if(data['success']){
          this.printInvoiceData = data['data'];
          this.printInvoiceFlag = true;
          this.print();
        }
        else{
          this.toastr.error(data['msg']);
          this.router.navigate(['pages/generate_invoice']);
        }
      },
      error=>{
        this.router.navigate(['pages/generate_invoice']);
      }
    )
  }

  print(){
   // if(this.printInvoiceFlag){
      let doc = new wijmo.PrintDocument({
        title: "PrintDocument Test",
      });
      doc.append('<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">');
        doc.append('<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">');
      
      let inter = setInterval(()=>{
        let data1 = document.getElementById("printpdf");
        if(data1 != null){
          doc.append(data1);
          doc.print();
          clearInterval(inter);
        }
      },10);
      
   // }
  }

  
}
