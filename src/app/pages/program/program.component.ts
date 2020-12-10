import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ProgramService } from 'app/@theme/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/@theme/services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';


@Component({
  selector: 'ngx-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  programList: any[];
  program=[];
  headers=["Party Name", "Program By", "Quality Id", "Quality Name", "Quality Type", "Priority" ];
  tableStyle = "bootstrap";
  flag = false;

  userId;
  userHeadId;
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own" , disabled:false },
    { id: 2, value: "View Group" , disabled:false},
    { id: 3, value: "View All", disabled:false }
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
    private commonService: CommonService, 
    private programService: ProgramService, 
    private router: Router, 
    public programGuard: ProgramGuard,
    private jwtToken: JwtTokenService,
    private toastr: ToastrService, 
    private modalService: NgbModal,
    private exportService: ExportService
    ) { }
 
 

  ngOnInit(): void {

    this.edit = this.programGuard.accessRights('edit'); 
    this.edit_group = this.programGuard.accessRights('edit group');
    this.edit_all = this.programGuard.accessRights('edit all');


    this.delete = this.programGuard.accessRights('delete'); 
    this.delete_group = this.programGuard.accessRights('delete group');
    this.delete_all = this.programGuard.accessRights('delete all');


    this.view = this.programGuard.accessRights('view'); 
    this.view_group = this.programGuard.accessRights('view group');
    this.view_all = this.programGuard.accessRights('view all');


    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getProgramList(this.userId, "own");
    this.getDeleteAccess();
    this.getEditAccess();
  }

  onChange(event) {
    this.programList = [];
    switch (event) {
      case 1:
        this.getProgramList(this.userId, "own");
        this.hidden=this.ownDelete; 
        this.hiddenEdit=this.ownEdit;
        break;

      case 2:
        this.getProgramList(this.userHeadId, "group");
        this.hidden=this.groupDelete;
        this.hiddenEdit=this.groupEdit;
        break;

      case 3:
        this.getProgramList(0, "all");
        this.hidden=this.allDelete;
        this.hiddenEdit=this.allEdit;
        break;
    }
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.program;
  }

  public getProgramList(id, getBy) {
    this.programService.getProgramList(id, getBy).subscribe(
      data => {
        if (data['success']) {
          this.programList = data['data']
          this.program=this.programList.map((element)=>({partyName:element.partyName, programBy: element.programBy,
            qualityId: element.qualityId, qualityName:element.qualityName, qualityType:element.qualityType, priority:element.priority }))
            console.log(this.program);
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  deleteProgram(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.programService.deleteProgramDetailsById(id).subscribe(
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
