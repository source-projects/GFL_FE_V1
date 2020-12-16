import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/@theme/services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';

@Component({
  selector: 'ngx-stock-batch',
  templateUrl: './stock-batch.component.html',
  styleUrls: ['./stock-batch.component.scss']
})
export class StockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  public loading = false;
  stockList;
  stock = [];
  headers = ["Stock In Type", "Party Name", "Bill No", "Bill Date", "Chl No", "Chl Date"];
  flag = false;
  disabled = false;

  tablestyle = "bootstrap";
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false }
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
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public stockBatchGuard: StockBatchGuard,
    private stockBatchService: StockBatchService,
    private commonService: CommonService,
    private exportService: ExportService,
    private jwtToken: JwtTokenService,
  ) { 
  }

  ngOnInit(): void {

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getAddAcess();
    this.getStockBatchList(this.userId, "own");
    this.getViewAccess();
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
  }
  getAddAcess() {
    if (this.stockBatchGuard.accessRights('add')) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.stockList = [];
    switch (event) {
      case 1:
        this.getStockBatchList(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getStockBatchList(this.userHeadId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getStockBatchList(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.stock;
  }

  getStockBatchList(id, getBy) {
    this.loading = true;
    this.stockBatchService.getAllStockBatchList(id, getBy).subscribe(
      data => {
        if (data["success"]) {
          this.stockList = data["data"];
          let index = 0
          this.stockList.forEach(element => {
            this.stockList[index].billDate = new Date(element.billDate).toDateString();
            this.stockList[index].chlDate = new Date(element.chlDate).toDateString();
            index++;
          });
          this.stock=this.stockList.map((element)=>({stockInType:element.stockInType, partyName: element.partyName,
            billNo: element.billNo, billDate:element.billDate, chlNo:element.chlNo, chlDate:element.chlDate }))         
        } 
          
          this.loading = false;
      },
      error => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    )
    
  }

  deleteStockBatch(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.stockBatchService.deleteStockBatchById(id).subscribe(
          data => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.onChange(this.radioSelect);
            }
          },
          error => {
            this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    });
  }

  getViewAccess() {
    if (!this.stockBatchGuard.accessRights('view')) {
      this.radioArray[0].disabled = true;
    }
    else
      this.radioArray[0].disabled = false;
    if (!this.stockBatchGuard.accessRights('view group')) {
      this.radioArray[1].disabled = true;
    }
    else
      this.radioArray[1].disabled = false;
    if (!this.stockBatchGuard.accessRights('view all')) {
      this.radioArray[2].disabled = true;
    }
    else
      this.radioArray[2].disabled = false;

  }

  getDeleteAccess(){
    if(this.stockBatchGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete; 
    }
     if(this.stockBatchGuard.accessRights('delete group')){
      this.groupDelete=false;
      this.hidden=this.groupDelete;
    }
     if(this.stockBatchGuard.accessRights('delete all')){
      this.allDelete=false;
      this.hidden=this.allDelete; 
    }
  }
  getDeleteAccess1(){
    if(this.stockBatchGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete; 
    }
    else{
      this.hidden=true;
    }
  }

  getEditAccess(){
    if(this.stockBatchGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
     if(this.stockBatchGuard.accessRights('edit group')){
      this.groupEdit=false;
      this.hiddenEdit=this.groupEdit;
    }
     if(this.stockBatchGuard.accessRights('edit all')){
      this.allEdit=false;
      this.hiddenEdit=this.allEdit;
    }
  }

  getEditAccess1(){
    if(this.stockBatchGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
    else{
      this.hiddenEdit=true;
    }
  }

}
