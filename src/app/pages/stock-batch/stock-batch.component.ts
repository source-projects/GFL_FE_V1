import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-stock-batch',
  templateUrl: './stock-batch.component.html',
  styleUrls: ['./stock-batch.component.scss']
})
export class StockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  
  stockList = [];

  tablestyle = "bootstrap";
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own", disabled:false },
    { id: 2, value: "View Group", disabled:false },
    { id: 3, value: "View All" , disabled:false}
  ];
  userHeadId;
  userId;
  permissions: Number;
   
  hidden :boolean=true;
  delete: Boolean = false;
  delete_group: Boolean = false;
  delete_all: Boolean =false;

  hiddenEdit:boolean=true;
  edit: Boolean = false;
  edit_group: Boolean = false;
  edit_all: Boolean =false;

  hiddenView:boolean=true;
  view: Boolean = false;
  view_group: Boolean = false;
  view_all: Boolean =false;

  hiddenCol:boolean=true;

  ownDelete=true;
  allDelete=true;
  groupDelete=true;

  ownEdit=true;
  allEdit=true;
  groupEdit=true;
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public stockBatchGuard: StockBatchGuard,
    private stockBatchService: StockBatchService,
    private jwtToken: JwtTokenService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

    this.edit = this.stockBatchGuard.accessRights('edit'); 
    this.edit_group = this.stockBatchGuard.accessRights('edit group');
    this.edit_all = this.stockBatchGuard.accessRights('edit all');


    this.delete = this.stockBatchGuard.accessRights('delete'); 
    this.delete_group = this.stockBatchGuard.accessRights('delete group');
    this.delete_all = this.stockBatchGuard.accessRights('delete all');


    this.view = this.stockBatchGuard.accessRights('view'); 
    this.view_group = this.stockBatchGuard.accessRights('view group');
    this.view_all = this.stockBatchGuard.accessRights('view all');

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getStockBatchList(this.userId, "own");
    this.getDeleteAccess();
    this.getEditAccess();
  }

  onChange(event) {
    this.stockList = [];
    switch (event) {
      case 1:
        this.getStockBatchList(this.userId, "own");
        this.hidden=this.ownDelete; 
        this.hiddenEdit=this.ownEdit;
        break;

      case 2:
        this.getStockBatchList(this.userHeadId, "group");
        this.hidden=this.groupDelete;
        this.hiddenEdit=this.groupEdit;
        break;

      case 3:
        this.getStockBatchList(0, "all");
        this.hidden=this.allDelete;
        this.hiddenEdit=this.allEdit;
        break;
    }
  }

  getStockBatchList(id, getBy) {
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
        } else
          this.toastr.error(data["msg"]);
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
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

            else
              this.toastr.error(data["msg"])
          },
          error => {
            this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    });
  }

  getViewAccess(){
    if(!this.view){
      this.radioArray[0].disabled=true;
    }
    else
    this.radioArray[0].disabled=false;
     if(!this.view_group){
      this.radioArray[1].disabled=true;
    }
    else
    this.radioArray[1].disabled=false;
     if(!this.view_all){
      this.radioArray[2].disabled=true;
    }
    else
    this.radioArray[2].disabled=false;

  }

  getDeleteAccess(){
    if(this.delete){
      this.ownDelete=false;
    }
     if(this.delete_group){
      this.groupDelete=false;
    }
     if(this.delete_all){
      this.allDelete=false;
    }
  }

  getEditAccess(){
    if(this.edit){
      this.ownEdit=false;
    }
     if(this.edit_group){
      this.groupEdit=false;

    }
     if(this.edit_all){
      this.allEdit=false;
    }
  }

}
