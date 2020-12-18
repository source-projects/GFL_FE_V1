import { Component, OnInit } from "@angular/core";
import { PrintInvoiceService } from "app/@theme/services/print-invoice.service";
import { Subscription } from "rxjs";
import * as wijmo from "@grapecity/wijmo";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-print-layout",
  templateUrl: "./print-layout.component.html",
  styleUrls: ["./print-layout.component.scss"],
})
export class PrintLayoutComponent implements OnInit {
  d: Subscription;

  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  rowd = [{}, {}, {}];
  lotRowd = [{}, {}, {}, {}];
  col = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  constructor(private printService: PrintInvoiceService, private router:Router) {}
  ngOnInit() {
  }

  ngAfterViewInit(){
    if (this.printService.isExport) {
      this.print();
      // setTimeout(print, 1000);
    }
  }
  print(){
    let doc = new wijmo.PrintDocument({
      title: "PrintDocument Test",
    });
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );
    doc.append(document.getElementById("printpdf"));
    doc.print();  
    // let interval = setInterval(()=>{
    //   let btn = document.getElementsByClassName("action-button")
    //   if(btn != null){
    //     let slide = btn[0] as HTMLElement;
    //     slide.click();
    //     clearInterval(interval);
    //   }
    // }, 1000)
  }
}
