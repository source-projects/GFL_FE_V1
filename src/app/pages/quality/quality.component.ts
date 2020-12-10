import { Component, OnInit } from '@angular/core';
import { QualityService } from '../../@theme/services/quality.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { StoreTokenService } from 'app/@theme/services/store-token.service';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';

@Component({
  selector: 'ngx-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})

export class QualityComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  permissions: Number;
  radioArray = [
    {id:1, value:"View Own" , disabled:false},
    {id:2, value:"View Group" , disabled:false},
    {id:3, value:"View All" , disabled:false}
  ];
  qualityList=[];
  quality=[];
  headers=["Quality Id", "Quality Name", "Quality Type", "Party Name" ];
  flag = false;

  
  radioSelect = 1;
  userId;
  userHeadId;
  tableStyle = 'bootstrap';

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
 
  
  constructor(
    private commonService: CommonService,
    public qualityGuard: QualityGuard, 
    private qualityService: QualityService, 
    private toastr: ToastrService, 
    private jwtToken: JwtTokenService, 
    private storeTokenService: StoreTokenService,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
  
    this.edit = this.qualityGuard.accessRights('edit'); 
    this.edit_group = this.qualityGuard.accessRights('edit group');
    this.edit_all = this.qualityGuard.accessRights('edit all');


    this.delete = this.qualityGuard.accessRights('delete'); 
    this.delete_group = this.qualityGuard.accessRights('delete group');
    this.delete_all = this.qualityGuard.accessRights('delete all');


    this.view = this.qualityGuard.accessRights('view'); 
    this.view_group = this.qualityGuard.accessRights('view group');
    this.view_all = this.qualityGuard.accessRights('view all');

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getQualityList(this.userId, "own");
    this.getDeleteAccess();
    this.getEditAccess();
  }


  onChange(event){
    this.qualityList = [];
    switch(event){
      case 1: 
              this.getQualityList(this.userId,"own");
              this.hidden=this.ownDelete; 
              this.hiddenEdit=this.ownEdit;
              break;

      case 2: 
              this.getQualityList(this.userHeadId,"group");
              this.hidden=this.groupDelete;
              this.hiddenEdit=this.groupEdit;
              break;

      case 3:
              this.getQualityList(0,"all");
              this.hidden=this.allDelete;
              this.hiddenEdit=this.allEdit;
              break;
    }
  }

open(){
  this.flag=true;
 
  const modalRef = this.modalService.open(ExportPopupComponent);
   modalRef.componentInstance.headers = this.headers;
   modalRef.componentInstance.list = this.quality;
}

  getQualityList(id,getBy) {
    this.qualityService.getallQuality(id,getBy).subscribe(
      data => {
        if (data['success']) {
          this.qualityList = data['data']
          this.quality=this.qualityList.map((element)=>({qualityId:element.qualityId, qualityName: element.qualityName,
             qualityType: element.qualityType,partyName:element.partyName }))
             console.log(this.quality);
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
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
