import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { UserGuard } from 'app/@theme/guards/user.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { UserService } from "app/@theme/services/user.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  
  public loading = false;
  tableStyle = 'bootstrap';
  userList=[];
  copyUserList = [];
  user=[];
  headers=["User Name", "First Name", "Last Name", "Company", "Designation" ];
  module="user";

  flag = false;

  userId;
  userHeadId;
  radioSelect = 0;
  radioArray = [
    {id:1, value:"View Own" , disabled:false},
    {id:2, value:"View Group" , disabled:false},
    {id:3, value:"View All" , disabled:false}
  ];
  
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
    private route:Router,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private userService:UserService,
    private commonService: CommonService,
    private exportService: ExportService,


    public userGuard: UserGuard,
    private jwtToken: JwtTokenService,
  ) { }

  ngOnInit(): void {

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];

    this.getViewAccess();
    this.getAddAcess();
    // this.getAllUser(this.userId,"own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if(this.userGuard.accessRights('view all')){
      this.getAllUser(0,"all");
      this.hidden=this.ownDelete; 
      this.hiddenEdit=this.ownEdit;
      this.radioSelect=3;
    }
     else if(this.userGuard.accessRights('view group')){
      this.getAllUser(this.userId,"group");
      this.hidden=this.groupDelete;
      this.hiddenEdit=this.groupEdit;
      this.radioSelect=2;
    }
    else if(this.userGuard.accessRights('view')){
      this.getAllUser(this.userId,"own");
      this.hidden=this.allDelete;
      this.hiddenEdit=this.allEdit;
      this.radioSelect=1;

    }
  }
  getAddAcess(){
    if(this.userGuard.accessRights('add')){
      this.disabled=false;
    }
    else{
      this.disabled=true;
    }
  }
  onChange(event){
    this.userList = [];
    switch(event){
      case 1: 
              this.getAllUser(this.userId,"own");
              this.hidden=this.ownDelete; 
              this.hiddenEdit=this.ownEdit;
              break;

      case 2: 
              this.getAllUser(this.userId,"group");
              this.hidden=this.groupDelete;
              this.hiddenEdit=this.groupEdit;
              break;

      case 3:
              this.getAllUser(0,"all");
              this.hidden=this.allDelete;
              this.hiddenEdit=this.allEdit;
              break;
    }
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.user;
     modalRef.componentInstance.moduleName = this.module;

  }

  filter(value:any){
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyUserList[0]);
    this.userList = this.copyUserList.filter(item => {
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

  getAllUser(id,getBy){
    this.loading = true;
    this.userService.getAllUser(id,getBy).subscribe(
      data =>{
        if(data["success"]){
          this.userList = data['data'];
          this.user=this.userList.map((element)=>({id:element.id,userName:element.userName, firstName: element.firstName,
            lastName: element.lastName, company:element.company, designation:element.designation }))
          this.copyUserList = this.userList.map((element)=>({id:element.id,userName:element.userName, firstName: element.firstName,
            lastName: element.lastName, company:element.company, designation:element.designation }))
          }
          this.loading = false;
      },
      error=>{
        // this.toastr.error(errorData.Serever_Error)
        this.loading = false;
      }
    );
    
  }

  deleteUser(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.userService.deleteUserDetailsById(id).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }


  getViewAccess(){
    if(!this.userGuard.accessRights('view')){
      this.radioArray[0].disabled=true;
    }
    else
    this.radioArray[0].disabled=false;
     if(!this.userGuard.accessRights('view group')){
      this.radioArray[1].disabled=true;
    }
    else
    this.radioArray[1].disabled=false;
     if(!this.userGuard.accessRights('view all')){
      this.radioArray[2].disabled=true;
    }
    else
    this.radioArray[2].disabled=false;

  }

  getDeleteAccess(){
    if(this.userGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }
     if(this.userGuard.accessRights('delete group')){
      this.groupDelete=false;
      this.hidden=this.groupDelete;
    }
     if(this.userGuard.accessRights('delete all')){
      this.allDelete=false;
      this.hidden=this.allDelete;
    }
  }
  getDeleteAccess1(){
    if(this.userGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }
    else{
      this.hidden=true;
    }
  }

  getEditAccess(){
    if(this.userGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
     if(this.userGuard.accessRights('edit group')){
      this.groupEdit=false;
      this.hiddenEdit=this.groupEdit;

    }
     if( this.userGuard.accessRights('edit all')){
      this.allEdit=false;
      this.hiddenEdit=this.allEdit;
    }
  }

  getEditAccess1(){
    if(this.userGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
    else{
      this.hiddenEdit=true;
    }
  }


}
