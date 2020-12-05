import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
//import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { type } from 'os';
import { BehaviorSubject } from 'rxjs';
import { ExportService } from 'app/@theme/services/export.service';

//import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 
// import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-export-popup',
  templateUrl: './export-popup.component.html',
  styleUrls: ['./export-popup.component.scss']
})
export class ExportPopupComponent implements OnInit {
// @Input() type:string;
@Input('list') list: any[];

@Input('headers') headers: any[];

fileName="export";
// @Input() fileType;
// @Input() fileName;
// @Input() headers;
// @Input() party;

 //@Output() exportType = new EventEmitter();
//public exportType: BehaviorSubject<string> = new BehaviorSubject<string>(this.type)
//@Output() exportType = new EventEmitter<string>();
//@Output() exportType: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _NgbActiveModal: NgbActiveModal,    
    private exportService: ExportService,
    ) { }

  ngOnInit(): void {
    //this.onClick();
    console.log(this.list);
    console.log(this.headers);

  }

  // ngOnChanges(changes: SimpleChanges) {
  //     for (const propName in changes) {
  //       const chng = changes[propName];
  //        let current  = JSON.stringify(chng.currentValue);
  //       console.log(current);
  //       //this.fileType=current;
  //       //console.log(prev);
  //     }
  //   }
    
  get activeModal() {
    return this._NgbActiveModal;
  }

  onClick(type){
    this.activeModal.close(type)
    console.log(type);
    if(type=='excel')
      this.exportService.exportExcel(this.list, this.fileName, this.headers);
    else if(type=='text')
    {
      this.exportService.exportText(this.list, this.fileName, this.headers);

    }
    else if(type=='pdf'){
      this.exportService.exportPdf(this.list, this.fileName, this.headers);

    }
   
    else{
      return;
    }
   // this.exportType.next({type});
    //console.log(type);
   // this.type=type;
   // this.exportType.emit(type);
   // this.type=type;
   //this.id=true;
  }

  // open(content) { 
  //   this.modalService.open(content, 
  //  {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => { 
  //     this.closeResult = `Closed with: ${result}`; 
  //   }, (reason) => { 
  //     this.closeResult =  
  //        `Dismissed ${this.getDismissReason(reason)}`; 
  //   }); 
  // } 

  // private getDismissReason(reason: any): string { 
  //   if (reason === ModalDismissReasons.ESC) { 
  //     return 'by pressing ESC'; 
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
  //     return 'by clicking on a backdrop'; 
  //   } else { 
  //     return `with: ${reason}`; 
  //   } 
  // } 

}
