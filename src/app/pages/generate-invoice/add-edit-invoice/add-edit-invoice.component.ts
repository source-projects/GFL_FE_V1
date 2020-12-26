import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as errorData from 'app/@theme/json/error.json';
import { Invoice, invoiceobj } from "app/@theme/model/invoice";
import { GenerateInvoiceService } from 'app/@theme/services/generate-invoice.service';
import { PartyService } from 'app/@theme/services/party.service';
import { keys } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-add-edit-invoice',
  templateUrl: './add-edit-invoice.component.html',
  styleUrls: ['./add-edit-invoice.component.scss']
})
export class AddEditInvoiceComponent implements OnInit {

  finalcheckedrows = [];
  party: any[];
  batch: any[];
  mtrList:any[];
  public disableButton = false;
  public errorData: any = (errorData as any).default;
  mtr=[];
  invoiceValues: Invoice = new Invoice();
  formSubmitted = false;
  public loading = false;
  qualityList: any[];
cid:any;
bid:any; 

  constructor(
    private generateInvoiceService:GenerateInvoiceService,
    private partyService: PartyService,
    private route: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getPartyList();
    // this.getBatchList();
  }
  
  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }


  getBatchList(event) {
    this.loading = true;
    if(event !=undefined){
    if(this.invoiceValues.partyId){
    this.generateInvoiceService.getBatchByParty(this.invoiceValues.partyId).subscribe(
      (data) => {
        if (data["success"]) {
          this.batch = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
    }
  }
  else{
    this.loading = false;
  }
  }

  // getMtrList(event) {
  //   this.loading = true;
  //   if(event !=undefined){
  //   if(this.invoiceValues.batchId ){
  //     this.batch.forEach(e=>{
  //       if(e.batchId==this.invoiceValues.batchId){
  //         this.invoiceValues.controlId=e.controlId;
  //       }
  //     })

  //   this.generateInvoiceService.getFinishedMtrList(this.invoiceValues.batchId,this.invoiceValues.controlId).subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         this.mtrList = data["data"];
  //          this.mtr=data['data']
  //         this.loading = false;
  //       } else {
  //         this.loading = false;[]
  //       }
  //     },
  //     (error) => {
  //       this.loading = false;
  //     }
  //   );
  //   }
  // }
  // else{
  //   this.loading = false;
  // }
  // }
  addInvoice(invoiceForm) {
    this.disableButton=true;
    this.formSubmitted = true;
    if (invoiceForm.valid) {
      this.generateInvoiceService.addInvoicedata(this.finalcheckedrows).subscribe(
        data => {
          if (data['success']) {
           this.route.navigate(["/pages/generate_invoice"]);
            this.toastr.success(errorData.Add_Success);
          }
          else {
            this.toastr.error(errorData.Add_Error)
          }
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
    this.disableButton=false;
  }

  onSelect(value:any){


    let arr:any = value.selected
    let obj:invoiceobj = new invoiceobj();
    arr.map(ele=>{
      obj.batchId = ele.batchId;
      obj.stockId =ele.controlId;
  
    })
    this.finalcheckedrows.push(obj);
  }
    
}
