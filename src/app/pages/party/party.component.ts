import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PartyService } from "app/@theme/services/party.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/@theme/services/common.service';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import { toUnicode } from 'punycode';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  permissions: Number;
  tablestyle = "bootstrap";

  partyList = [];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own" , disabled:false},
    {id:2, value:"View Group", disabled:false},
    {id:3, value:"View All" ,disabled:false}
  ];
  userHeadId;
  userId;

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

  own=true;
  all=true;
  group=true;

  ownEdit=true;
  allEdit=true;
  groupEdit=true;
  
  ownCol=true;
  allCol=true;
  groupCol=true;

  constructor(
    private partyService: PartyService,
    private route: Router,
    private modalService: NgbModal,
    public partyGuard: PartyGuard,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private jwtToken: JwtTokenService,
    private commonService: CommonService,
    
  ) { }

  ngOnInit(): void {
    // this.access = this.partyGuard.accessRights('edit');
    this.delete = this.partyGuard.accessRights('delete'); 
    this.delete_group = this.partyGuard.accessRights('delete group');
    this.delete_all = this.partyGuard.accessRights('delete all');

    this.edit = this.partyGuard.accessRights('edit'); 
    this.edit_group = this.partyGuard.accessRights('edit group');
    this.edit_all = this.partyGuard.accessRights('edit all');
    
    this.view = this.partyGuard.accessRights('view'); 
    this.view_group = this.partyGuard.accessRights('view group');
    this.view_all = this.partyGuard.accessRights('view all');

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getAllParty(this.userId,"own");
    this.getDeleteAccess();
    this.getEditAccess();
    // this.getColAccess();
    
  }


  getAllParty(id,getBy) {
    this.partyService.getAllPartyList(id,getBy).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
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
      this.own=false;
    }
     if(this.delete_group){
      this.group=false;
    }
     if(this.delete_all){
      this.all=false;
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

  onChange(event){
    this.partyList = [];
    switch(event){
      case 1: 
              this.getAllParty(this.userId,"own");
                this.hidden=this.own; 
                this.hiddenEdit=this.ownEdit;
                this.hiddenCol=this.ownCol;
                
              break;

      case 2: 
              this.getAllParty(this.userHeadId,"group");
                this.hidden=this.group;
                this.hiddenEdit=this.groupEdit;
                this.hiddenCol=this.groupCol;
              break;

      case 3:
              this.getAllParty(0,"all");
                this.hidden=this.all;
                this.hiddenEdit=this.allEdit;
                this.hiddenCol=this.allCol;
              break;
    }
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
