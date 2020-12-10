import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { UserService } from "app/@theme/services/user.service";
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { UserGuard } from 'app/@theme/guards/user.guard';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  

  tableStyle = 'bootstrap';
  userList=[];
  user=[];
  headers=["User Name", "First Name", "Last Name", "Company", "Designation" ];
  flag = false;

  userId;
  userHeadId;
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own" , disabled:false},
    {id:2, value:"View Group" , disabled:false},
    {id:3, value:"View All" , disabled:false}
  ];
  
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

     
    this.edit = this.userGuard.accessRights('edit'); 
    this.edit_group = this.userGuard.accessRights('edit group');
    this.edit_all = this.userGuard.accessRights('edit all');


    this.delete = this.userGuard.accessRights('delete'); 
    this.delete_group = this.userGuard.accessRights('delete group');
    this.delete_all = this.userGuard.accessRights('delete all');


    this.view = this.userGuard.accessRights('view'); 
    this.view_group = this.userGuard.accessRights('view group');
    this.view_all = this.userGuard.accessRights('view all');

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];

    this.getViewAccess();
    this.getAllUser(this.userId,"own");
    this.getDeleteAccess();
    this.getEditAccess()
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
              this.getAllUser(this.userHeadId,"group");
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
  }

  getAllUser(id,getBy){
    this.userService.getAllUser(id,getBy).subscribe(
      data =>{
        if(data["success"]){
          this.userList = data['data'];
          this.user=this.userList.map((element)=>({userName:element.userName, firstName: element.firstName,
            lastName: element.lastName, company:element.company, designation:element.designation }))
            console.log(this.user);
          }
        else
          this.toastr.error(data["msg"])
      },
      error=>{
        this.toastr.error(errorData.Serever_Error)
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
