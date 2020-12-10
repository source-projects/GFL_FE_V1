import { Component, OnInit } from '@angular/core';
import { ColorService } from 'app/@theme/services/color.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'app/@theme/services/common.service';
import { DatePipe } from '@angular/common';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ColorGuard } from 'app/@theme/guards/color.guard';

@Component({

  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {


  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  colorList = [];
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own" , disabled:false},
    { id: 2, value: "View Group" , disabled:false},
    { id: 3, value: "View All" , disabled:false}
  ];
  userId;
  userHeadId;

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

  ownDelete=true;
  allDelete=true;
  groupDelete=true;

  ownEdit=true;
  allEdit=true;
  groupEdit=true;
  
  constructor(private colorService: ColorService,
    private route: Router,
    private modalService: NgbModal,

    public colorGuard: ColorGuard,
    private jwtToken: JwtTokenService,
    private toastr: ToastrService,
    private commonService: CommonService

    
  ) { }

  ngOnInit(): void {
    
    this.edit = this.colorGuard.accessRights('edit'); 
    this.edit_group = this.colorGuard.accessRights('edit group');
    this.edit_all = this.colorGuard.accessRights('edit all');


    this.delete = this.colorGuard.accessRights('delete'); 
    this.delete_group = this.colorGuard.accessRights('delete group');
    this.delete_all = this.colorGuard.accessRights('delete all');


    this.view = this.colorGuard.accessRights('view'); 
    this.view_group = this.colorGuard.accessRights('view group');
    this.view_all = this.colorGuard.accessRights('view all');

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];

    this.getViewAccess();
    this.getColor(this.userId, "own");
    this.getDeleteAccess();
    this.getEditAccess();
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

  getColor(id, getBy) {
    this.colorService.getColor(id, getBy).subscribe(
      data => {
        if (data["success"]) {
          this.colorList = data['data'];
          let index = 0
          this.colorList.forEach(element => {
            this.colorList[index].billDate = new Date(element.billDate).toDateString();
            this.colorList[index].chlDate = new Date(element.chlDate).toDateString();
            index++;
          });
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error)
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


