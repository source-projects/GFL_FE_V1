import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaymentGuard } from '../../../@theme/guards/payment.guard';
import { CommonService } from '../../../@theme/services/common.service';
import { PaymentService } from '../../../@theme/services/payment.service';

@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  public loading = false;
  
  flag = false;
  disabled = false;

  paymentList = [];
  copyPaymentList = [];
  tablestyle = "bootstrap";
  // radioSelect = 0;
  // radioArray = [
  //   { id: 1, value: "View Own", disabled: false },
  //   { id: 2, value: "View Group", disabled: false },
  //   { id: 3, value: "View All", disabled: false },
  // ];
  userHeadId;
  userId;
  permissions: Number;

  // hidden: boolean = true;
  // hiddenEdit: boolean = true;
  // hiddenView: boolean = true;

  // ownDelete = true;
  // allDelete = true;
  // groupDelete = true;

  // ownEdit = true;
  // allEdit = true;
  // groupEdit = true;

  public destroy$ : Subject<void> = new Subject<void>();

  public tableHeaders = ["id","partyName", "amtPaid", "createdDate", "aadhaar"];
  searchStr = "";
  searchANDCondition = false;
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonService,
    private paymentGuard:PaymentGuard,
    private payment:PaymentService,
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getAllPaymentList();
    // this.getAddAcess();
    // this.getViewAccess();
    // this.getDeleteAccess();
    // this.getDeleteAccess1();
    // this.getEditAccess();
    // this.getEditAccess1();
    // if (this.paymentGuard.accessRights("view all")) {
    //   this.getAllPaymentList(0, "all");
    //   this.hidden = this.ownDelete;
    //   this.hiddenEdit = this.ownEdit;
    //   this.radioSelect = 3;
    // } else if (this.paymentGuard.accessRights("view group")) {
    //   this.getAllPaymentList(this.userId, "group");
    //   this.hidden = this.groupDelete;
    //   this.hiddenEdit = this.groupEdit;
    //   this.radioSelect = 2;
    // } else if (this.paymentGuard.accessRights("view")) {
    //   this.getAllPaymentList(this.userId, "own");
    //   this.hidden = this.allDelete;
    //   this.hiddenEdit = this.allEdit;
    //   this.radioSelect = 1;
    // }
  }
  // getAddAcess() {
  //   if (this.paymentGuard.accessRights("add")) {
  //     this.disabled = false;
  //   } else {
  //     this.disabled = true;
  //   }
  // }
  // onChange(event) {
  //   this.paymentList = [];
  //   switch (event) {
  //     case 1:
  //       this.getAllPaymentList(this.userId, "own");
  //       this.hidden = this.ownDelete;
  //       this.hiddenEdit = this.ownEdit;
  //       break;

  //     case 2:
  //       this.getAllPaymentList(this.userId, "group");
  //       this.hidden = this.groupDelete;
  //       this.hiddenEdit = this.groupEdit;
  //       break;

  //     case 3:
  //       this.getAllPaymentList(0, "all");
  //       this.hidden = this.allDelete;
  //       this.hiddenEdit = this.allEdit;
  //       break;
  //   }
  // }

  // open() {
  //   this.flag = true;

  //   const modalRef = this.modalService.open(ExportPopupComponent);
  //   modalRef.componentInstance.headers = this.headers;
  //   modalRef.componentInstance.list = this.stock;
  //   modalRef.componentInstance.moduleName = this.module;
  // }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyPaymentList[0]);
    this.paymentList = this.copyPaymentList.filter((item) => {
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

  getAllPaymentList() {
    this.loading = true;
    this.payment.getAllPayment().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.paymentList = data["data"];
            this.copyPaymentList = this.paymentList.map((element)=>({id:element.id,partyName:element.partyName, amtPaid: element.amtPaid,
              createdDate: element.createdDate}))
        }

      });
  }

  // deleteStockBatch(id) {
  //   const modalRef = this.modalService.open(ConfirmationDialogComponent, {
  //     size: "sm",
  //   });
  //   modalRef.result.then((result) => {
  //     if (result) {
  //       this.payment.deleteStockBatchById(id).pipe(takeUntil(this.destroy$)).subscribe(
  //         (data) => {
  //           if (data["success"]) {
  //             this.onChange(this.radioSelect);
  //           }
  //         },
  //         (error) => {
  //         }
  //       );
  //     }
  //   });
  // }

  // getViewAccess() {
  //   if (!this.paymentGuard.accessRights("view")) {
  //     this.radioArray[0].disabled = true;
  //   } else this.radioArray[0].disabled = false;
  //   if (!this.paymentGuard.accessRights("view group")) {
  //     this.radioArray[1].disabled = true;
  //   } else this.radioArray[1].disabled = false;
  //   if (!this.paymentGuard.accessRights("view all")) {
  //     this.radioArray[2].disabled = true;
  //   } else this.radioArray[2].disabled = false;
  // }

  // getDeleteAccess() {
  //   if (this.paymentGuard.accessRights("delete")) {
  //     this.ownDelete = false;
  //     this.hidden = this.ownDelete;
  //   }
  //   if (this.paymentGuard.accessRights("delete group")) {
  //     this.groupDelete = false;
  //     this.hidden = this.groupDelete;
  //   }
  //   if (this.paymentGuard.accessRights("delete all")) {
  //     this.allDelete = false;
  //     this.hidden = this.allDelete;
  //   }
  // }
  // getDeleteAccess1() {
  //   if (this.paymentGuard.accessRights("delete")) {
  //     this.ownDelete = false;
  //     this.hidden = this.ownDelete;
  //   } else {
  //     this.hidden = true;
  //   }
  // }

  // getEditAccess() {
  //   if (this.paymentGuard.accessRights("edit")) {
  //     this.ownEdit = false;
  //     this.hiddenEdit = this.ownEdit;
  //   }
  //   if (this.paymentGuard.accessRights("edit group")) {
  //     this.groupEdit = false;
  //     this.hiddenEdit = this.groupEdit;
  //   }
  //   if (this.paymentGuard.accessRights("edit all")) {
  //     this.allEdit = false;
  //     this.hiddenEdit = this.allEdit;
  //   }
  // }

  // getEditAccess1() {
  //   if (this.paymentGuard.accessRights("edit")) {
  //     this.ownEdit = false;
  //     this.hiddenEdit = this.ownEdit;
  //   } else {
  //     this.hiddenEdit = true;
  //   }
  // }

}
