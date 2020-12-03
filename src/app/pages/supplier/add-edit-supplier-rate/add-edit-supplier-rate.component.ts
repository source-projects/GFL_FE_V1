import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { CommonService } from "app/@theme/services/common.service";
import { SupplierService } from "app/@theme/services/supplier.service";
import * as errorData from "app/@theme/json/error.json";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-add-edit-supplier-rate",
  templateUrl: "./add-edit-supplier-rate.component.html",
  styleUrls: ["./add-edit-supplier-rate.component.scss"],
})
export class AddEditSupplierRateComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  //data fatch supplier Name
  supplier: [];

  itemTypeData = [
    { id: "dye", name: "Dye" },
    { id: "chemical", name: "chemical" },
  ];

  //Form Validation flag
  formSubmitted: boolean = false;
  discount: number;
  gst: number;
  userHead;
  //form field values
  formValues = {
    id: null,
    supplierName: null,
    gstPercentage: null,
    discountPercentage: null,
    remark: null,
    paymentTerms: null,
    createdBy: null,
    updatedBy: null,
    supplierId: null,
    supplierRates: [
      {
        itemType: null,
        supplierId: null,
        createdBy: null,
        updatedBy: null,
        userHeadId: null,
        itemName: null,
        rate: null,
        discountedRate: null,
        gstRate: null,
        id: null,
      },
    ],
  };

  user;

  //for fatching selected supplier id
  //supplierId

  supplierList;
  index: any;
  myForm: any;

  mySupplierRateId;

  constructor(
    private commonService: CommonService,
    private supplierService: SupplierService,
    private router: Router,
    private _route: ActivatedRoute,
    private toastrService: NbToastrService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSupplierName();
    this.getData();
    if (this.mySupplierRateId != null) this.getUpdateData();
  }

  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.mySupplierRateId = this._route.snapshot.paramMap.get("id");
  }

  getUpdateData() {
    this.supplierService.getAllSupplierById(this.mySupplierRateId).subscribe(
      (data) => {
        if (data["success"]) {
          this.formValues = data["data"];
          if (this.formValues.supplierRates.length == 0) {
            let obj = {
              id: null,
              supplierName: null,
              gstPercentage: null,
              discountPercentage: null,
              remark: null,
              createdBy: null,
              updatedBy: null,
              paymentTerms: null,
              userHeadId: null,
              supplierId: null,
              itemType: null,
              itemName: null,
              rate: null,
              discountedRate: null,
              gstRate: null,
            };
            let list = this.formValues.supplierRates;
            list.push(obj);
            this.formValues.supplierRates = [...list];
          }
          this.discount = this.formValues.discountPercentage;
          this.gst = this.formValues.gstPercentage;
        } else {
          this.toastr.error(data["msg"]);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public getSupplierName() {
    this.user = this.commonService.getUser();
    this.supplierService.getAllSupplier(0, "all").subscribe(
      (data) => {
        if (data["success"]) {
          this.supplier = data["data"];
        } else {
          this.toastr.error(data["msg"]);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public addSupplierRateInfo(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      this.formValues.id = this.formValues.supplierRates[0].supplierId;
      delete this.formValues.discountPercentage;
      delete this.formValues.supplierName;
      delete this.formValues.supplierId;
      delete this.formValues.gstPercentage;
      delete this.formValues.remark;
      delete this.formValues.paymentTerms;
      delete this.formValues.updatedBy;
      delete this.formValues.supplierRates[0].discountedRate;
      delete this.formValues.supplierRates[0].gstRate;
      this.formValues.supplierRates.forEach((e) => {
        e.createdBy = this.user.userId;
        e.userHeadId = this.userHead.userHeadId;
      });
      this.supplierService.addSupplierRateInSystem(this.formValues).subscribe(
        (data) => {
          if (data["success"]) {
            this.router.navigate(["pages/supplier"]);
            this.toastr.success(errorData.Add_Success);
          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    } else {
      return;
    }
  }

  public updateSupplierRateInfo(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      this.formValues.supplierId = this.formValues.supplierRates[0].supplierId;
      delete this.formValues.discountPercentage;
      delete this.formValues.supplierName;
      this.formValues.supplierId = this.formValues.id;
      delete this.formValues.id;
      delete this.formValues.gstPercentage;
      delete this.formValues.remark;
      delete this.formValues.paymentTerms;
      delete this.formValues.createdBy;
      this.formValues.supplierRates.forEach((e) => {
        delete e.discountedRate;
        delete e.gstRate;
        e.updatedBy = this.user.userId;
        e.supplierId = this.formValues.supplierId;
      });
      this.formValues.updatedBy = this.user.userId;
      this.supplierService
        .updateSupplierRateInSystem(this.formValues)
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.router.navigate(["pages/supplier"]);
              this.toastr.success(errorData.Update_Success);
            } else {
              this.toastr.error(errorData.Update_Error);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
    } else {
      return;
    }
  }

  public goBackToPreviousPage(): any {
    this.router.navigate(["pages/supplier"]);
  }

  getDetail(id) {
    this.formValues.supplierRates[0].supplierId = id;
    for (let item of this.supplier) {
      if (item["id"] == id) {
        this.discount = item["discountPercentage"];
        this.gst = item["gstPercentage"];
        this.formValues.supplierRates[0].discountedRate = this.discount;
        this.formValues.supplierRates[0].gstRate = this.gst;
      }
    }
  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = e.keyCode ? e.keyCode : e.which;
    if (keyCode == 13) {
      this.index = "supplierList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.formValues.supplierRates.length - 1) {
        let item = this.formValues.supplierRates[rowIndex];
        if (colName == "itemName") {
          if (!item.itemName) {
            this.toastr.error("Item name is required");
            return;
          }
        } else if (colName == "itemType") {
          if (!item.itemType) {
            this.toastr.error("Item type is required");
            return;
          }
        } else if (colName == "rate") {
          if (!item.rate) {
            this.toastr.error("Rate is required");
            return;
          }
        }
        let obj = {
          id: null,
          supplierName: null,
          gstPercentage: null,
          discountPercentage: null,
          remark: null,
          createdBy: null,
          updatedBy: null,
          paymentTerms: null,
          userHeadId: null,
          supplierId: null,
          itemType: null,
          itemName: null,
          rate: null,
          discountedRate: null,
          gstRate: null,
        };
        let list = this.formValues.supplierRates;
        list.push(obj);
        this.formValues.supplierRates = [...list];
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50);
      } else {
        let interval = setInterval(() => {
          let field = document.getElementById(this.index);
          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50);
        // alert("Go to any last row input to add new row");
      }
    }
  }

  calculateGstDiscountPercentage(rowIndex) {
    let calculatedDiscount;
    let calculatedGst;
    let itemRate = Number(this.formValues.supplierRates[rowIndex].rate);
    let D = Number((itemRate * this.discount) / 100);
    calculatedDiscount = Number(itemRate - D);
    let CGst = Number((calculatedDiscount + this.gst) / 100);
    calculatedGst = Number(calculatedDiscount + CGst);
    this.formValues.supplierRates[rowIndex].discountedRate = Number(
      parseFloat(calculatedDiscount).toFixed(2)
    );
    this.formValues.supplierRates[rowIndex].gstRate = Number(
      parseFloat(calculatedGst).toFixed(2)
    );
  }

  removeItem(id) {
    let idCount = this.formValues.supplierRates.length;
    let item = this.formValues.supplierRates;
    if (idCount == 1) {
      item[0].itemName = null;
      item[0].rate = null;
      item[0].discountedRate = null;
      item[0].gstRate = null;
      let list = item;
      this.formValues.supplierRates = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.formValues.supplierRates = [...list];
    }
  }
}
