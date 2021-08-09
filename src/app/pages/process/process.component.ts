import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ExportPopupComponent } from '../../@theme/components/export-popup/export-popup.component';
import { CommonGuard } from '../../@theme/guards/common.guard';
import * as errorData from '../../@theme/json/error.json';
import { CommonService } from '../../@theme/services/common.service';
import { ExportService } from '../../@theme/services/export.service';
import { JwtTokenService } from '../../@theme/services/jwt-token.service';
import { ProcessService } from '../../@theme/services/process.service';

@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {
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
  private destroy$ = new Subject<void>();

  constructor(private processService: ProcessService,
    private toastr: ToastrService,
    public commonGuard: CommonGuard,
    private modalService: NgbModal,
    private commonService: CommonService,
    private jwtToken: JwtTokenService,
    private exportService: ExportService) { }
    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getProcessList();
    this.getAccessPermissions();
  }

  getProcessList(){
    this.processService.getAllProcessList('all',0).pipe(takeUntil(this.destroy$)).subscribe(
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
    if(this.commonService.accessRights('edit',"process")){
      
      this.hiddenEdit=false;
    }
    else{
      this.hiddenEdit=true;
    }

    if(this.commonService.accessRights('delete',"process")){
      
      this.hiddenDelete=false;
    }
    else{
      this.hiddenDelete=true;
    }

    if(this.commonService.accessRights('add',"process")){
      
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
    this.processService.deleteProcess(id).pipe(takeUntil(this.destroy$)).subscribe(
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
