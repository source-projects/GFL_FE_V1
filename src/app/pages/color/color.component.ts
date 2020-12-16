import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { ColorGuard } from 'app/@theme/guards/color.guard';
import * as errorData from 'app/@theme/json/error.json';
import { ColorService } from 'app/@theme/services/color.service';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ToastrService } from 'ngx-toastr';

@Component({

  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  public loading = false;

 public errorData: any = (errorData as any).default;
 
 tableStyle = 'bootstrap';
 colorList=[];
 color=[];
 headers=["Supplier Name", "Bill No", "Bill Date", "Challan No", "Challan Date" ];
 radioSelect=1;
 flag = false;

 radioArray = [
  {id:1, value:"View Own", disabled:false},
  {id:2, value:"View Group", disabled:false},
  {id:3, value:"View All", disabled:false}
];
 userId;
 userHeadId;
 permissions: Number;

 hidden :boolean=true;
 hiddenEdit:boolean=true;
 hiddenView:boolean=true;

 ownDelete=true;
 allDelete=true;
 groupDelete=true;

 ownEdit=true;
 allEdit=true;
 groupEdit=true;
 disabled=false;
  constructor(
    private colorService: ColorService,
  
    private route: Router,
    private modalService: NgbModal,

    public colorGuard: ColorGuard,
    private jwtToken: JwtTokenService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private exportService: ExportService

  ) { }

  ngOnInit(): void {

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];

    this.getViewAccess();
    this.getAddAcess();
    this.getColor(this.userId, "own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
  }
  getAddAcess(){
    if(this.colorGuard.accessRights('add')){
      this.disabled=false;
    }
    else{
      this.disabled=true;
    }
  }
  onChange(event) {
    this.colorList = [];
    switch (event) {
      case 1:
        this.getColor(this.userId, "own");
        this.hidden=this.ownDelete; 
        this.hiddenEdit=this.ownEdit;
        break;

      case 2:
        this.getColor(this.userHeadId, "group");
        this.hidden=this.groupDelete;
        this.hiddenEdit=this.groupEdit;
        break;

      case 3:
        this.getColor(0, "all");
        this.hidden=this.allDelete;
        this.hiddenEdit=this.allEdit;
        break;
    }
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.color;
  }

  getColor(id, getBy) {
    this.loading=true;
    this.colorService.getColor(id, getBy).subscribe(
      data => {
        if (data["success"]) {
          this.colorList = data['data']
          this.color=this.colorList.map((element)=>({supplierName:element.supplierName, billNo: element.billNo,
            billDate: element.billDate, challanNo:element.challanNo, challanDate:element.challanDate }))
          this.colorList = data['data'];
          let index = 0
          this.colorList.forEach(element => {
            this.colorList[index].billDate = new Date(element.billDate).toDateString();
            this.colorList[index].chlDate = new Date(element.chlDate).toDateString();
            index++;
          });
        }
        // else {
        //   // this.toastr.error(data['msg']);
          
        // }
        this.loading=false;
      },
      error => {
        // this.toastr.error(errorData.Serever_Error)
        this.loading=false;
      }
    );
  }

  deleteColor(rowId) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.colorService.deleteColorById(rowId).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete)
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }

  getViewAccess(){
    if(!this.colorGuard.accessRights('view')){
      this.radioArray[0].disabled=true;
    }
    else
    this.radioArray[0].disabled=false;
     if(!this.colorGuard.accessRights('view group')){
      this.radioArray[1].disabled=true;
    }
    else
    this.radioArray[1].disabled=false;
     if(!this.colorGuard.accessRights('view all')){
      this.radioArray[2].disabled=true;
    }
    else
    this.radioArray[2].disabled=false;

  }

  getDeleteAccess(){
    if(this.colorGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }
     if(this.colorGuard.accessRights('delete group')){
      this.groupDelete=false;
      this.hidden=this.groupDelete;
    }
     if(this.colorGuard.accessRights('delete all')){
      this.allDelete=false;
      this.hidden=this.allDelete;
    }
  }
  getDeleteAccess1(){
    if(this.colorGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }
    else{
      this.hidden=true;
    }
  }

  getEditAccess(){
    if(this.colorGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
     if(this.colorGuard.accessRights('edit group')){
      this.groupEdit=false;
      this.hiddenEdit=this.groupEdit;
    }
     if(this.colorGuard.accessRights('edit all')){
      this.allEdit=false;
      this.hiddenEdit=this.allEdit;
    }
  }
  getEditAccess1(){
    if(this.colorGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
    else{
      this.hiddenEdit=true;
    }
  }



}


