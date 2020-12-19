import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
//import { ExportService } from 'app/@theme/services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { PartyService } from "app/@theme/services/party.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit {
  public loading = false;
  public errorData: any = (errorData as any).default;
  permissions: Number;
  tablestyle = "bootstrap";
  disabled=false;
  partyList = [];
  party=[];
  headers=["Party Name", "Party Address1", "Contact No", "City", "State" ];
  module="party";
  flag=false;
  radioSelect = 0;
  radioArray = [
    {id:1, value:"View Own" , disabled:false},
    {id:2, value:"View Group", disabled:false},
    {id:3, value:"View All" ,disabled:false}
  ];
  userHeadId;
  userId;

  hidden :boolean=true;
  hiddenEdit:boolean=true;
  hiddenView:boolean=true;

  ownDelete=true;
  allDelete=true;
  groupDelete=true;

  ownEdit=true;
  allEdit=true;
  groupEdit=true;
  constructor(
    private partyService: PartyService,
    private route: Router,
    private modalService: NgbModal,
    public partyGuard: PartyGuard,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private commonService: CommonService,
    //private exportService: ExportService,
    private _NgbModal: NgbModal,
    private jwtToken: JwtTokenService,
    
  ) { }

  ngOnInit(): void {

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getAddAcess();
    // this.getAllParty(this.userId,"own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if(this.partyGuard.accessRights('view')){
      this.getAllParty(this.userId,"own");
      this.hidden=this.ownDelete; 
      this.hiddenEdit=this.ownEdit;
      this.radioSelect=1;
    }
     else if(this.partyGuard.accessRights('view group')){
      this.getAllParty(this.userHeadId,"group");
      this.hidden=this.groupDelete;
      this.hiddenEdit=this.groupEdit;
      this.radioSelect=2;
    }
    else if(this.partyGuard.accessRights('view all')){
      this.getAllParty(0,"all");
      this.hidden=this.allDelete;
      this.hiddenEdit=this.allEdit;
      this.radioSelect=3;

    }
  }

  getAllParty(id,getBy) {
    this.loading = true;
   
    this.partyService.getAllPartyList(id,getBy).subscribe(
      (data) => {
       
        if (data["success"]) {
          this.partyList = data["data"];
          this.party=this.partyList.map((element)=>({partyName:element.partyName, partyAddress1: element.partyAddress1, contactNo: element.contactNo,
            city:element.city, state: element.state}))
        }
        else {
          // this.toastr.error(data['msg'])
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
        this.loading = false;
      }
    );
  }

  getViewAccess(){
    if(!this.partyGuard.accessRights('view')){
      this.radioArray[0].disabled=true;
    }
    else
    this.radioArray[0].disabled=false;

    if(!this.partyGuard.accessRights('view group')){
      this.radioArray[1].disabled=true;
    }
    else
    this.radioArray[1].disabled=false;

    if(!this.partyGuard.accessRights('view all')){
      this.radioArray[2].disabled=true;
    }
    else
    this.radioArray[2].disabled=false;

  }

  getDeleteAccess(){
    if(this.partyGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }
    
     if( this.partyGuard.accessRights('delete group')){
      this.groupDelete=false;
      this.hidden=this.groupDelete;
    }
     if(this.partyGuard.accessRights('delete all')){
      this.allDelete=false;
      this.hidden=this.allDelete;
    }
  }

  getDeleteAccess1(){
    if(this.partyGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownDelete;
    }else{
      this.hidden=true;
    }
  }

  getEditAccess(){
    if(this.partyGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
     if(this.partyGuard.accessRights('edit group')){
      this.groupEdit=false;
      this.hiddenEdit=this.groupEdit;

    }
     if(this.partyGuard.accessRights('edit all')){
      this.allEdit=false;
      this.hiddenEdit=this.allEdit;
    }
  }
  getEditAccess1(){
    if(this.partyGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
    else{
      this.hiddenEdit=true;
    }
  }
  getAddAcess(){
    if(this.partyGuard.accessRights('add')){
      this.disabled=false;
    }
    else{
      this.disabled=true;
    }
  }
  onChange(event){
    this.partyList = [];
    switch(event){
      case 1: 
              this.getAllParty(this.userId,"own");
                this.hidden=this.ownDelete; 
                this.hiddenEdit=this.ownEdit;
              break;

      case 2: 
              this.getAllParty(this.userHeadId,"group");
                this.hidden=this.groupDelete;
                this.hiddenEdit=this.groupEdit;
              break;

      case 3:
              this.getAllParty(0,"all");
                this.hidden=this.allDelete;
                this.hiddenEdit=this.allEdit;
              break;
    }
  }

open(){
  this.flag=true;
 
  const modalRef = this.modalService.open(ExportPopupComponent);
   modalRef.componentInstance.headers = this.headers;
   modalRef.componentInstance.list = this.party;
   modalRef.componentInstance.moduleName = this.module;
}

  deleteParty(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.partyService.deletePartyDetailsById(id).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

 
}
