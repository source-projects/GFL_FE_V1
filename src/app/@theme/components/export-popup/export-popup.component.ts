import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
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

  fileName = "export";
  startRow: number;
  endRow: number;
  type1 = "";
  list1 = [];

  constructor(
    private _NgbActiveModal: NgbActiveModal,    
    private exportService: ExportService,
    ) { }

  ngOnInit(): void {
    console.log(this.list);
    console.log(this.headers);
  }
    
  get activeModal() {
    return this._NgbActiveModal;
  }

  change(event) {
    console.log(event.target.value);
    this.startRow = event.target.value;
  }
  change1(event) {
    console.log(event.target.value);
    this.endRow = event.target.value;
  }

  onOptionsSelected(type){
    this.type1=type.target.value;
    console.log(type.target.value);
  }

  emailClick() {
    window.open(
      'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=Link address:&bcc=someone.else@example.com&attachment="C:/Users/Arjav/Downloads/export(2).pdf"&tf=1');
  }


  onClick(){
    //this.activeModal.close(type)
    for(let i=this.startRow;i<=this.endRow;i++){
     // for(let j=0;j<=(this.endRow-this.startRow);j++)
          this.list1.push(this.list[i-1]);
    }
    console.log(this.list1);

   // console.log(this.noOfRows);
    if(this.type1=='excel')
      this.exportService.exportExcel(this.list1, this.fileName, this.headers);
    else if(this.type1=='text')
    {
      this.exportService.exportText(this.list1, this.fileName, this.headers);
    }
    else if(this.type1=='pdf'){
      console.log()
      this.exportService.exportPdf(this.list1, this.fileName, this.headers);
    }
    else{
      return;
    }
  
  }
  }
   



