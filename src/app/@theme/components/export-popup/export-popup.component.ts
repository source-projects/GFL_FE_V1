import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from 'app/@theme/services/export.service';
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
  startRow: number;
  endRow: number;
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
      fromRow:null,
      moduleName:"",
      sendText:"",
      subjectEmail:"",
      toEmail:"",
      toRow:null
    }
      modalData.exportType = this.exportType;
      modalData.fromRow = this.startRow,
      modalData.moduleName = this.moduleName,
      //modalData.sendText = 
      modalData.subjectEmail = this.subjectEmail;
      modalData.toEmail = this.toEmail;
      modalData.toRow = this.endRow;
      console.log(modalData);
      this.exportService.sendMail(modalData);

    }
  
  onDownloadClick(){
   
    for( let i = this.startRow ; i <= this.endRow; i++){
      this.list1.push(this.list[i-1]);
    }
    if(this.exportType=='excel')
    {
      this.exportService.exportExcel(this.list1, this.fileName, this.headers);
    }
    else if(this.exportType=='text')
    {
      this.exportService.exportText(this.list1, this.fileName, this.headers);
    }
    else if(this.exportType=='pdf'){
      this.exportService.exportPdf(this.list1, this.fileName, this.headers);
    }
    else{
      return;
    }
  
  }
  }
   



