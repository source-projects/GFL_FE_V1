import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
//import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from 'app/@theme/services/export.service';
import { type } from 'os';
import { BehaviorSubject } from 'rxjs';

//import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 
// import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-export-popup',
  templateUrl: './export-popup.component.html',
  styleUrls: ['./export-popup.component.scss']
})
export class ExportPopupComponent implements OnInit {
// @Input() type:string;
 //@Output() exportType = new EventEmitter<string>();

//public exportType: BehaviorSubject<string> = new BehaviorSubject<string>(this.type)
//@Output() exportType = new EventEmitter<string>();
//@Output() exportType: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _NgbActiveModal: NgbActiveModal,    
    private exportService: ExportService,
    ) { }

  ngOnInit(): void {
    //this.onClick();
  }
  get activeModal() {
    return this._NgbActiveModal;
  }

  onClick(type){
    console.log(type);
   // this.type=type;
   // this.exportType.emit(type);
    this.activeModal.close(type)
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
