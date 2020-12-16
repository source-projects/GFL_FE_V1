import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ProgramService } from 'app/@theme/services/program.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public loading = false;
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

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getAddAcess();
    this.getProgramList(this.userId, "own");
    this.getDeleteAccess();
    this.getEditAccess();
  }
  getAddAcess(){
    if(this.programGuard.accessRights('add')){
      this.disabled=false;
    }
    else{
      this.disabled=true;
    }
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
    this.loading=true;
    this.programService.getProgramList(id, getBy).subscribe(
      data => {
        if (data['success']) {
          this.programList = data['data']
          this.program=this.programList.map((element)=>({partyName:element.partyName, programBy: element.programBy,
            qualityId: element.qualityId, qualityName:element.qualityName, qualityType:element.qualityType, priority:element.priority }))
            this.loading=false;
        }
        else {
          // this.toastr.error(data['msg']);
          this.loading=false;
        }
      },
      error => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading=false;
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
    if(!this.programGuard.accessRights('view')){
      this.radioArray[0].disabled=true;
    }
    else
    this.radioArray[0].disabled=false;

    if(!this.programGuard.accessRights('view group')){
      this.radioArray[1].disabled=true;
    }
    else
    this.radioArray[1].disabled=false;
     if(!this.programGuard.accessRights('view all')){
      this.radioArray[2].disabled=true;
    }
    else
    this.radioArray[2].disabled=false;

  }

  getDeleteAccess(){
    if(this.programGuard.accessRights('delete')){
      this.ownDelete=false;
      this.hidden=this.ownEdit;
    }
     if(this.programGuard.accessRights('delete group')){
      this.groupDelete=false;
      this.hidden=this.groupDelete;
    }
     if(this.programGuard.accessRights('delete all')){
      this.allDelete=false;
      this.hidden=this.allDelete;
    }
  }

  getEditAccess(){
    if(this.programGuard.accessRights('edit')){
      this.ownEdit=false;
      this.hiddenEdit=this.ownEdit;
    }
     if(this.programGuard.accessRights('edit group')){
      this.groupEdit=false;
      this.hiddenEdit=this.groupEdit;

    }
     if(this.programGuard.accessRights('edit all')){
      this.allEdit=false;
      this.hiddenEdit=this.allEdit;
    }
  }


}
