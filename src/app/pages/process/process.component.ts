import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
import { ProcessGuard } from 'app/@theme/guards/process.guard';
import { ExportService } from 'app/@theme/services/export.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ProcessService } from 'app/@theme/services/process.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';

import { CommonService } from 'app/@theme/services/common.service';
@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  processList;
  tablestyle : "bootstrap";
  process=[];
  headers=["Name" ];
  module="process";

  flag = false;

  permissions: Number;
  access:Boolean = false;
 

  hiddenDelete:boolean=true;
  hiddenEdit:boolean=true;
  addButtonDisabled:boolean=false;

  constructor(private processService: ProcessService,
    private toastr: ToastrService,
    public processGuard: ProcessGuard,
    private modalService: NgbModal,
    private commonService: CommonService,
    private jwtToken: JwtTokenService,
    private exportService: ExportService) { }

  ngOnInit(): void {
    this.getProcessList();
    this.getAccessPermissions();
  }

  getProcessList(){
    this.processService.getAllProcessList('all',0).subscribe(
      data=>{
        if(data['success'])
          this.processList = data["data"];
           this.process = this.processList.map((element) => ({
            name: element.name
           }))
          // else
          // this.toastr.error(data['msg'])
      },
      error=>{
        // this.toastr.error('Internal server error')
        //error... internal server.
      }
    )
  }
  getAccessPermissions(){
    if(this.processGuard.accessRights('edit')){
      
      this.hiddenEdit=false;
    }
    else{
      this.hiddenEdit=true;
    }

    if(this.processGuard.accessRights('delete')){
      
      this.hiddenDelete=false;
    }
    else{
      this.hiddenDelete=true;
    }

    if(this.processGuard.accessRights('add')){
      
      this.addButtonDisabled=false;
    }
    else{
      this.addButtonDisabled=true;
    }
    
  }
  deleteProcess(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
    this.processService.deleteProcess(id).subscribe(
      (data)=>{
        if(data['success']){
          this.toastr.success(data['msg'])
          this.processList = null;
          this.getProcessList();
          this.toastr.success(errorData.Delete)

        }
          else
          this.toastr.success(data['msg'])
      },
      error=>{
        this.toastr.success('Internal server error')
        this.toastr.error(errorData.Serever_Error)

      }
    );}
  });
  }

  open(){
    this.flag=true;
   
    const modalRef = this.modalService.open(ExportPopupComponent);
     modalRef.componentInstance.headers = this.headers;
     modalRef.componentInstance.list = this.process;
     modalRef.componentInstance.moduleName = this.module;

  }

}
