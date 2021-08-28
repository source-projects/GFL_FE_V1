import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../../../@theme/services/export.service';
@Component({
  selector: 'ngx-export-popup',
  templateUrl: './export-popup.component.html',
  styleUrls: ['./export-popup.component.scss']
})
export class ExportPopupComponent implements OnInit {

@Input('list') list: any[];

@Input('headers') headers: any[];

@Input('moduleName') moduleName: any;

  fileName = "export";
  exportType = "";
  toEmail = "";
  subjectEmail = "";
  email=false;
  list1 = [];

  constructor(
    private _NgbActiveModal: NgbActiveModal,    
    private exportService: ExportService,
    ) { }

  ngOnInit(): void {
  }
    
  get activeModal() {
    return this._NgbActiveModal;
  }

  emailClick() {
    this.email=true;
  }

  emailSendClick(){
    let modalData={
      exportType:"",
      moduleName:"",
      sendText:"",
      subjectEmail:"",
      toEmail:"",
    }
      modalData.exportType = this.exportType;
      modalData.moduleName = this.moduleName,
      //modalData.sendText = 
      modalData.subjectEmail = this.subjectEmail;
      modalData.toEmail = this.toEmail;
      this.exportService.sendMail(modalData);

    }
  
  onDownloadClick(){
   
    if(this.exportType=='excel')
    {
      this.exportService.exportExcel(this.list, this.fileName, this.headers);
    }
    else if(this.exportType=='text')
    {
      this.exportService.exportText(this.list, this.fileName, this.headers);
    }
    else if(this.exportType=='pdf'){
      this.exportService.exportPdf(this.list, this.fileName, this.headers);
      this.list1 = [];
    }
    else{
      return;
    }
  
  }
  }
   



