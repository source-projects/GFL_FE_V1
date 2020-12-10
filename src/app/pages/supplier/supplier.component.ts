import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'app/@theme/services/common.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';

@Component({
  selector: 'ngx-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  tableStyle="bootstrap";

  public errorData: any = (errorData as any).default;

  //to get SupplierList
  supplierList=[];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"  , disabled:false},
    {id:2, value:"View Group"  , disabled:false},
    {id:3, value:"View All"  , disabled:false}
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
    private commonService:CommonService, 
    private supplierService:SupplierService,
    public supplierGuard: SupplierGuard,
    private jwtToken: JwtTokenService,
     private router:Router, 
     private toastr: ToastrService) { }
   
  ngOnInit(): void {
    this.edit = this.supplierGuard.accessRights('edit'); 
    this.edit_group = this.supplierGuard.accessRights('edit group');
    this.edit_all = this.supplierGuard.accessRights('edit all');


    this.delete = this.supplierGuard.accessRights('delete'); 
    this.delete_group = this.supplierGuard.accessRights('delete group');
    this.delete_all = this.supplierGuard.accessRights('delete all');


    this.view = this.supplierGuard.accessRights('view'); 
    this.view_group = this.supplierGuard.accessRights('view group');
    this.view_all = this.supplierGuard.accessRights('view all');

  
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getSupplierList(this.userId,"own");
    this.getDeleteAccess();
    this.getEditAccess();
  }

  onChange(event){
    this.supplierList=[];
    switch(event){
      case 1: 
              this.getSupplierList(this.userId,"own");
              this.hidden=this.ownDelete; 
              this.hiddenEdit=this.ownEdit;
              break;

      case 2: 
              this.getSupplierList(this.userHeadId,"group");
              this.hidden=this.groupDelete;
              this.hiddenEdit=this.groupEdit;
              break;

      case 3:
              this.getSupplierList(0,"all");
              this.hidden=this.allDelete;
              this.hiddenEdit=this.allEdit;
              break;
    }
  }

  public getSupplierList(id,getBy){
    this.supplierService.getAllSupplier(id,getBy).subscribe(
      data=>{
        this.supplierList=data['data']
        this.router.navigate(['pages/supplier']);
      },
      error=>{
        //toaster
        this.toastr.error(errorData.Serever_Error);
      }
    )
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
