import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ColorService } from "app/@theme/services/color.service";
import { Color, ColorDataList } from "app/@theme/model/color";
import * as errorData from 'app/@theme/json/error.json';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngx-add-edit-color',
  templateUrl: './add-edit-color.component.html',
  styleUrls: ['./add-edit-color.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddEditColorComponent implements OnInit {

  userHead;
  public errorData: any = (errorData as any).default;
  colorDataListArray: ColorDataList[] = [];
  color: Color = new Color();
  colorDataList: ColorDataList = new ColorDataList();
  //Form Validation
  formSubmitted: boolean = false;
  //to store current color Id
  currentColorId;
  index: any;
  //To store usreID
  user: any;
  //To Store Supplier Data
  supplierList: any[];
  //To store Supplier Rate Data
  supplierListRate: any[];
  //To Store fabric Data
  fabric: any[];
  //To store Total quantity for Calculation
  calculationTotalQuantity: any;
  convertedDate: any;
  convertedDate2: any;
  constructor(
    private _route: ActivatedRoute,
    private commonService: CommonService,
    private supplierService: SupplierService,
    private colorService: ColorService,
    private toastrService: NbToastrService,
    private route: Router,
    private toastr: ToastrService,
    private datepipe: DatePipe,
  ) {
    this.colorDataListArray.push(this.colorDataList);
    this.color.colorDataList = this.colorDataListArray;
  }

  ngOnInit(): void {
    this.getData();
    this.getUpdateData();
    this.getSupplierList();
  }

  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentColorId = this._route.snapshot.paramMap.get('id');
  }

  getUpdateData() {
    if (this.currentColorId != null) {
      this.colorService.getColorDataById(this.currentColorId).subscribe(
        data => {
          this.color = data["data"];
          //For Item Name List
          this.supplierService.getSupplierItemWithRateById(this.color.supplierId).subscribe(
            data => {
              if (data['success']) {
                this.supplierListRate = data['data'];
              }
              else {
                this.toastr.error(data['msg'])
              }
            },
            error => {
              this.toastr.error(errorData.Serever_Error)
            })
          this.color.billDate = new Date(this.color.billDate);
          this.color.chlDate = new Date(this.color.chlDate);
          this.calculateTotalQuantity(0);
          this.calculateAmount(0);
          let amount: any
          this.color.colorDataList.forEach(element => {
            amount = Number(element.rate) * Number(element.quantity);
            element.amount = parseInt(amount);
          });
        },
        error => {
          this.toastr.error(errorData.Serever_Error)
        }
      )
    }
  }

  getSupplierList() {
    this.supplierService.getSupplierName(0, "all").subscribe(
      data => {
        if (data['success']) {
          this.supplierList = data['data'];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error)
      }
    )
  }

  getAllSupplierRate(event) {
    if (event != undefined) {
      if (this.color.supplierId) {
        this.supplierService.getSupplierItemWithRateById(this.color.supplierId).subscribe(
          data => {
            if (data['success']) {
              this.supplierListRate = data['data'];
            }
            else {
              this.toastr.error(data['msg'])
            }
          },
          error => {
            this.toastr.error(errorData.Serever_Error)
          }
        )
      }
    }
    else {
      this.getSupplierList();
    }
  }


  itemSelected(rowIndex) {
    let id = this.color.colorDataList[rowIndex].itemId;
    this.supplierListRate.forEach(element => {
      if (id == element.id) {
        this.color.colorDataList[rowIndex].rate = element.rate;
      }
    });

  }

  onKeyUp(e, rowIndex, colIndex, colName) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode == 13) {
      this.index = "colorList" + (rowIndex + 1) + "-" + colIndex;
      if (rowIndex === this.color.colorDataList.length - 1) {
        let item = this.color.colorDataList[rowIndex];
        if (colName == 'quantityPerBox') {
          if (!item.quantityPerBox) {
            this.toastr.error('Quantity per box required');
            return;
          }
        }
        else if (colName == 'noOfBox') {
          if (!item.noOfBox) {
            this.toastr.error('No of box required');
            return;
          }
        }
        else if (colName == 'quantity') {
          if (!item.quantity) {
            this.toastr.error('Total quantity required');
            return;
          }
        }
        let obj = {
          itemName: null,
          quantityPerBox: null,
          noOfBox: null,
          quantity: null,
          id: null,
          quantityUnit: "kg",
          itemId: null,
          rate: null,
          controlId: null,
          amount: null,
        };
        let list = this.color.colorDataList;
        list.push(obj);
        this.color.colorDataList = [...list];
        let interval = setInterval(() => {

          let field = document.getElementById(this.index)

          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50)
      }
      else {
        let interval = setInterval(() => {

          let field = document.getElementById(this.index)

          if (field != null) {
            field.focus();
            clearInterval(interval);
          }
        }, 50)
        //alert("Go to any last row input to add new row");
      }
    }
  }

  calculateAmount(rowIndex) {
    let calcAmount;
    let rate;
    let qun;
    qun = this.color.colorDataList[rowIndex].quantity;
    rate = this.color.colorDataList[rowIndex].rate;
    calcAmount = Number(rate * qun);
    this.color.colorDataList[rowIndex].amount = parseInt(calcAmount);
  }

  calculateTotalQuantity(rowIndex) {
    let totalquantity;
    let quantityPerBoxTempValue;
    let noOfBoxTempValue;
    quantityPerBoxTempValue = this.color.colorDataList[rowIndex].quantityPerBox;
    noOfBoxTempValue = this.color.colorDataList[rowIndex].noOfBox;
    totalquantity = (quantityPerBoxTempValue * noOfBoxTempValue);
    this.color.colorDataList[rowIndex].quantity = parseInt(totalquantity);
  }

  addColor(colorForm) {
    this.formSubmitted = true;
    if (colorForm.valid) {
      this.color.userHeadId = this.userHead.userHeadId;
      this.color.createdBy = this.user.userId;
      this.colorService.addColor(this.color).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/color"]);
            this.toastr.success(errorData.Add_Success)
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
  }

  removeItem(id) {
    let idCount = this.color.colorDataList.length
    let item = this.color.colorDataList;
    if (idCount == 1) {
      item[0].id = null;
      item[0].itemId = null;
      item[0].quantity = null;
      item[0].quantityPerBox = null;
      item[0].quantity = null;
      item[0].rate = null;
      item[0].noOfBox = null;
      let list = item;
      this.color.colorDataList = [...list];
    }
    else {
      let removed = item.splice(id, 1);
      let list = item;
      this.color.colorDataList = [...list];
    }
  }

  updateColor(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      this.color.updatedBy = this.user.userId;
      this.colorService.updateColor(this.color).subscribe(
        data => {
          if (data['success']) {
            this.route.navigate(["/pages/color"]);
            this.toastr.success(errorData.Update_Success);
          }
        },
        error => {
          this.toastr.error(errorData.Update_Error);
        }
      )
    }
  }
}