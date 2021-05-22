import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PurchaseRequest } from "../../../@theme/model/purchaseRequest";
import { CommonService } from "../../../@theme/services/common.service";
import { PurchaseService } from "../../../@theme/services/purchase.service";
import { SupplierService } from "../../../@theme/services/supplier.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-purchase-request",
  templateUrl: "./purchase-request.component.html",
  styleUrls: ["./purchase-request.component.scss"],
})
export class PurchaseRequestComponent implements OnInit, OnDestroy {
  public supplierList: any[];
  public purchaseRequest: PurchaseRequest = new PurchaseRequest();
  public formSubmitted: boolean = false;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private toastr: ToastrService,
    private commonService: CommonService,
    private purchaseService: PurchaseService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getSupplierList();
  }

  getSupplierList() {
    this.supplierService.getItemWithSupplier().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) this.supplierList = data["data"];
      },
      (error) => {}
    );
  }

  supplierSelected(event) {
    this.supplierList.forEach((e) => {
      if (e.supplierId == this.purchaseRequest.supplierId) {
        this.purchaseRequest.itemId = e.itemId;
        this.purchaseRequest.supplierName = e.supplierName;
        this.purchaseRequest.itemName = e.itemName;
      }
    });
  }

  itemSelected(event) {
    this.supplierList.forEach((e) => {
      if (e.itemId == this.purchaseRequest.itemId) {
        this.purchaseRequest.supplierId = e.supplierId;
        this.purchaseRequest.supplierName = e.supplierName;
        this.purchaseRequest.itemName = e.itemName;
      }
    });
  }

  makeRequest(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      let user = this.commonService.getUser();
      let userHead = this.commonService.getUserHeadId();
      this.purchaseRequest.createdBy = user.userId;
      this.purchaseRequest.userHeadId = userHead.userHeadId;
      this.purchaseService.addPurchaseRequest(this.purchaseRequest).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) this.toastr.success("Item requested");
          this.formSubmitted = false;
          this.purchaseRequest = new PurchaseRequest();
        },
        (error) => {
          this.toastr.error("Error Requesting item");
        }
      );
    } else {
      return;
    }
  }

}
