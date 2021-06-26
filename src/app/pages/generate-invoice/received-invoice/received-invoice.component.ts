import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cloneDeep } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { GenerateInvoiceService } from '../../../@theme/services/generate-invoice.service';

@Component({
  selector: 'ngx-received-invoice',
  templateUrl: './received-invoice.component.html',
  styleUrls: ['./received-invoice.component.scss']
})
export class ReceivedInvoiceComponent implements OnInit {
  InvoiceList = [];
  copyInvoiceList = [];
  public loading: boolean = false;
  private destroy$ : Subject<void> = new Subject<void>();
  
  constructor(
    private route: Router,
    private generateInvoiceService: GenerateInvoiceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getAllInvoice();
  }

  tableChange(event) {
    if (event === "sign") {
      this.route.navigate(["/pages/generate_invoice/sign"]);
    } else if (event === "generate") {
      this.route.navigate(["/pages/generate_invoice/"]);
    }
  }

  deleteSignedInvoice(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.generateInvoiceService.saveNewSignedInvoice([{invoiceNo: id, signByParty: false}]).pipe(takeUntil(this.destroy$)).subscribe(
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
      }
    });
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

  getAllInvoice() {
    this.loading = true;
    this.InvoiceList = [];
    this.copyInvoiceList = [];
    this.generateInvoiceService.getAllDipatch('signed').pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.InvoiceList = data["data"];
          this.InvoiceList.forEach(ele => {
            ele.netAmt = ele.netAmt.toFixed(2);
          })
          this.copyInvoiceList = data["data"];
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

}
