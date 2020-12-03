import { Component, OnInit, TemplateRef } from '@angular/core';
//import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from 'app/@theme/services/export.service';

//import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 
// import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-export-popup',
  templateUrl: './export-popup.component.html',
  styleUrls: ['./export-popup.component.scss']
})
export class ExportPopupComponent implements OnInit {

 //id='false';
 type="";
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
    this.type=type;
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
