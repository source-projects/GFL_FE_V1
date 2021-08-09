import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExportPopupComponent } from '../../@theme/components/export-popup/export-popup.component';
import { CommonGuard } from '../../@theme/guards/common.guard';
import * as errorData from '../../@theme/json/error.json';
import { CommonService } from '../../@theme/services/common.service';
import { SupplierService } from '../../@theme/services/supplier.service';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit, OnDestroy {
  public loading = false;
  tableStyle = "bootstrap";
  public tableHeaders = ["supplierName", "discountPercentage", "gstPercentage", "paymentTerms", "remark"];


  public errorData: any = (errorData as any).default;

  //to get SupplierList
  supplierList = [];
  copySupplierList = [];
  supplier = [];
  headers = ["Supplier Name", "Discount%", "GST%", "Payment Terms", "Remark"];
  module="supplier";

  radioSelect = 0;
  flag = false;
  disabled = false;
  radioArray = [
    { id: 1, value: "View Own", disabled: false , checked:false},
    { id: 2, value: "View Group", disabled: false, checked:false },
    { id: 3, value: "View All", disabled: false , checked:true }
  ];
  userHeadId;
  userId;
  permissions: Number;

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  ownDelete = true;
  allDelete = true;
  groupDelete = true;

  ownEdit = true;
  allEdit = true;
  groupEdit = true;

  searchStr = "";
  searchANDCondition = false;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private commonService: CommonService,
    private supplierService: SupplierService,
    public commonGuard: CommonGuard,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {


    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getAddAcess();
    // this.getSupplierList(this.userId, "own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if(this.commonService.accessRights('view all',"supplier")){
      this.getSupplierList(0,"all");
      this.hidden=this.allDelete; 
      this.hiddenEdit=this.allEdit;
      this.radioSelect=3;
    }
     else if(this.commonService.accessRights('view group',"supplier")){
      this.getSupplierList(this.userId,"group");
      this.hidden=this.groupDelete;
      this.hiddenEdit=this.groupEdit;
      this.radioSelect=2;
    }
    else if(this.commonService.accessRights('view',"supplier")){
      this.getSupplierList(this.userId,"own");
      this.hidden=this.ownDelete;
      this.hiddenEdit=this.ownEdit;
      this.radioSelect=1;

    }
  }
  getAddAcess() {
    if (this.commonService.accessRights('add',"supplier")) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.supplierList = [];
    switch (event) {
      case 1:
        this.getSupplierList(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getSupplierList(this.userId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getSupplierList(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.supplier;
    modalRef.componentInstance.moduleName = this.module;

  }

  filter(value:any){
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copySupplierList[0]);
    this.supplierList = this.copySupplierList.filter(item => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }


  public getSupplierList(id, getBy) {
    this.loading = true;
    this.supplierService.getAllSupplier(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data['success']) {
          if (data['data'].length > 0) {
            this.supplierList = data['data']
            this.supplier = this.supplierList.map((element) => ({
              id:element.id,supplierName: element.supplierName, discountPercentage: element.discountPercentage,
              gstPercentage: element.gstPercentage, paymentTerms: element.paymentTerms, remark: element.remark
            }))

            this.copySupplierList = this.supplierList.map((element) => ({
              id:element.id,supplierName: element.supplierName, discountPercentage: element.discountPercentage,
              gstPercentage: element.gstPercentage, paymentTerms: element.paymentTerms, remark: element.remark
            }))
          }
          
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    )
  }

  getViewAccess() {
    if (!this.commonService.accessRights('view',"supplier")) {
      this.radioArray[0].disabled = true;
    }
    else
      this.radioArray[0].disabled = false;
    if (!this.commonService.accessRights('view group',"supplier")) {
      this.radioArray[1].disabled = true;
    }
    else
      this.radioArray[1].disabled = false;
    if (!this.commonService.accessRights('view all',"supplier")) {
      this.radioArray[2].disabled = true;
    }
    else
      this.radioArray[2].disabled = false;

  }

  getDeleteAccess() {
    if (this.commonService.accessRights('delete',"supplier")) {
      this.ownDelete = false;
      this.hidden=this.ownDelete;
    }
    if (this.commonService.accessRights('delete group',"supplier")) {
      this.groupDelete = false;
      this.hidden=this.groupDelete;
    }
    if (this.commonService.accessRights('delete all',"supplier")) {
      this.allDelete = false;
      this.hidden=this.allDelete;
    }
  }
  getDeleteAccess1() {
    if (this.commonService.accessRights('delete',"supplier")) {
      this.ownDelete = false;
      this.hidden=this.ownDelete;
    }
    else{
      this.hidden=true;
    }
  }

  getEditAccess() {
    if (this.commonService.accessRights('edit',"supplier")) {
      this.ownEdit = false;
      this.hiddenEdit=this.ownEdit;
    }
    if (this.commonService.accessRights('edit group',"supplier")) {
      this.groupEdit = false;
      this.hiddenEdit=this.groupEdit;

    }
    if (this.commonService.accessRights('edit all',"supplier")) {
      this.allEdit = false;
      this.hiddenEdit=this.allEdit;
    }
  }
  getEditAccess1() {
    if (this.commonService.accessRights('edit',"supplier")) {
      this.ownEdit = false;
      this.hiddenEdit=this.ownEdit;
    }
    else{
      this.hiddenEdit=true;
    }
  }


}
