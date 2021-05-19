import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PurchaseGuard } from '../../@theme/guards/purchase.guard';
import { ConfirmationDialogComponent } from '../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { PurchaseNewService } from '../../@theme/services/purchase-new.service';

@Component({
  selector: 'ngx-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  loading = false;
  tableStyle = "bootstrap";
  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

  purchaseArray = [];
  copyPurchaseArray = [];

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  constructor(
    private purchseService : PurchaseNewService,
    private purchaseGuard : PurchaseGuard,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private route: Router,

  ) { }

  ngOnInit(): void {
    this.getAccess();
    this.getAllPurchase();
  }


  getAccess() {
    if (this.purchaseGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.purchaseGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.purchaseGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    }
  }

  getAllPurchase(){
    this.loading = true;

    this.purchseService.getPurchase().subscribe(
      (data) => {
        if(data['success']){
          this.purchaseArray = data["data"];
          this.copyPurchaseArray = this.purchaseArray.map((element) => ({
            id: element.id,
            amt: element.amt,
            approvedName: element.approvedName,
            departmentName: element.departmentName,
            receiverName: element.receiverName,
            checked: element.checked
          }));

          this.loading = false;
        }else{
          this.loading = false;
        }
      },
      (error) => {

      }
    )
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyPurchaseArray[0]);
    this.purchaseArray = this.copyPurchaseArray.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
    }

  deletePurchase(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.purchseService.deletePurchase(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.getAllPurchase();

            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
          }
        );
      }
    });
  }

}
