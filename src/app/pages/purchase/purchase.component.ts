import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from '../../@theme/services/common.service';
import { ConfirmationDialogComponent } from '../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { CommonGuard } from '../../@theme/guards/common.guard';
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

  public tableHeaders = ["amt","approvedName", "departmentName", "receiverName"];
  searchStr = "";
  searchANDCondition = false;
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  constructor(
    private purchseService : PurchaseNewService,
    private commonGuard : CommonGuard,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private commonService : CommonService,
    private route: Router,

  ) { }

  ngOnInit(): void {
    this.getAccess();
    this.getAllPurchase();
  }


  getAccess() {
    if (this.commonService.accessRights("add","purchase")) {
      this.hiddenAdd = false;
    }
    if (this.commonService.accessRights("delete","purchase")) {
      this.hiddenDelete = false;
    }
    if (this.commonService.accessRights("edit","purchase")) {
      this.hiddenEdit = false;
    }
  }

  getAllPurchase(){
    this.loading = true;

    this.purchseService.getPurchase().pipe(takeUntil(this.destroy$)).subscribe(
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
        this.purchseService.deletePurchase(id).pipe(takeUntil(this.destroy$)).subscribe(
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
