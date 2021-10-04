import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenerateInvoiceService } from '../../../@theme/services/generate-invoice.service';

@Component({
  selector: 'ngx-sign-invoice',
  templateUrl: './sign-invoice.component.html',
  styleUrls: ['./sign-invoice.component.scss']
})
export class SignInvoiceComponent implements OnInit {
  finalcheckedrows = [];
  InvoiceList = [];
  
  copyInvoiceList = [];
  public loading: boolean = false;
  private destroy$ : Subject<void> = new Subject<void>();
  constructor(
    private route: Router,
    private generateInvoiceService: GenerateInvoiceService,
    private toastr: ToastrService,
    private datePipe:DatePipe
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getAllInvoice();
  }

  tableChange(event) {
    if (event === "received") {
      this.route.navigate(["/pages/generate_invoice/sign/view"]);
    } else if (event === "generate") {
      this.route.navigate(["/pages/generate_invoice/"]);
    }
  }
  
  signNewInvoice(){
    if(this.finalcheckedrows.length){
      this.loading = true;
      let obj = [];
      this.finalcheckedrows.forEach(element => {
        obj.push({invoiceNo: element.invoiceNo, signByParty: true});
      });
      this.generateInvoiceService.saveNewSignedInvoice(obj).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data['msg']);
            this.getAllInvoice();
          } else {
            this.toastr.error(data['msg']);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
    }else{
      this.toastr.error("Select at least one invoice.")
    }
  }

  onSelect(value: any) {
    this.finalcheckedrows = [];
    this.finalcheckedrows = value.selected;
  }

  getAllInvoice() {
    this.loading = true;
    this.finalcheckedrows = [];
    this.InvoiceList = [];
    this.copyInvoiceList = [];
    this.generateInvoiceService.getAllDipatch('unsigned').pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.InvoiceList.forEach(ele => {
            ele.netAmt = ele.netAmt.toFixed(2);
            ele.date = this.datePipe.transform(ele.date,"dd/MM/yyyy");
          })
          this.copyInvoiceList = cloneDeep(this.InvoiceList);
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    if(val){
      this.InvoiceList = this.copyInvoiceList.filter( f=>
        this.matchString(f, 'partyName', val) ||
        this.matchString(f, 'invoiceNo', val) ||
        this.matchString(f, 'totalMtr', val) ||
        this.matchString(f, 'batchList', val) ||
        this.matchString(f, 'finishMtr', val) ||
        this.matchString(f, 'netAmt', val)
      );
    }else{
      this.InvoiceList = cloneDeep(this.copyInvoiceList); 
    }
  }

  matchString(item, key, searchString){
    if(key == 'batchList'){
      return item[key].filter(f => f.batchId.toLowerCase().includes(searchString)).length > 0
    }else{
      return item[key].toString().toLowerCase().includes(searchString);
    }
  }

}
