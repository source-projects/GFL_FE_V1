import { Component, OnInit } from "@angular/core";
import { PurchaseRequest } from "app/@theme/model/purchaseRequest";
import { CommonService } from "app/@theme/services/common.service";
import { PurchaseService } from "app/@theme/services/purchase.service";
import { SupplierService } from "app/@theme/services/supplier.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-purchase-request",
  templateUrl: "./purchase-request.component.html",
  styleUrls: ["./purchase-request.component.scss"],
})
export class PurchaseRequestComponent implements OnInit {
  public supplierList: any[];
  public purchaseRequest: PurchaseRequest = new PurchaseRequest();
  public formSubmitted: boolean = false;


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
    this.supplierService.getItemWithSupplier().subscribe(
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
      this.purchaseService.addPurchaseRequest(this.purchaseRequest).subscribe(
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
