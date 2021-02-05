import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/@theme/services/common.service';
import { GenerateInvoiceService } from 'app/@theme/services/generate-invoice.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NavigationExtras, Router } from '@angular/router';

// import { Invoice } from "app/@theme/model/invoice";

@Component({
  selector: 'ngx-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  checked = false;
  public loading = false;
  InvoiceList = [];
  copyInvoiceList = [];
  Invoice=[];
  finalcheckedrows = [];
  // invoiceValues: Invoice = new Invoice();

  hidden :boolean=true;
  hiddenEdit:boolean=true;
  hiddenView:boolean=true;
  
  constructor(    
    private commonService: CommonService,
    private generateInvoiceService: GenerateInvoiceService,
    private _NgbModal: NgbModal,
    private router:Router

    
    ) { }

  ngOnInit(): void {
    this.getAllInvoice();
  }

  
  filter(value:any){
    const val = value.toString().toLowerCase().trim();
    const count = this.copyInvoiceList.length;
    const keys = Object.keys(this.copyInvoiceList[0]);
    this.InvoiceList = this.copyInvoiceList.filter(item => {
      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }

  getAllInvoice() {
    this.loading = true;
   
    this.generateInvoiceService.getAllDipatch().subscribe(
      (data) => {
       
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.copyInvoiceList = data["data"];
          // this.Invoice=this.InvoiceList.map((element)=>({createdDate:element.createdDate, id: element.id, isSendToParty: element.isSendToParty}))
        }
        else {
          // this.toastr.error(data['msg'])
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
        this.loading = false;
      }
    );
  }

  print(){

    const queryParams: any = {};
    const arrayOfValues = this.finalcheckedrows;
    if(arrayOfValues.length != 0){
      queryParams.myArray = JSON.stringify(arrayOfValues);
    const navigationExtras: NavigationExtras = {
      queryParams
    };

    this.router.navigate(['/pages/generate_invoice/print/'], navigationExtras);
    }
    
  }

  onSelect(value: any) {

    this.finalcheckedrows = [];
    let arr:any[] = value.selected;
    arr.forEach(ele =>{
      this.finalcheckedrows.push(ele.invoiceNo)
    })
    // this.finalcheckedrows = arr;
    
  }
}
