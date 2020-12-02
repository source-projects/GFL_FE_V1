import { Component, OnInit } from '@angular/core';
//import { NbDialogService } from '@nebular/theme';
import {NgbModal, ModalDismissReasons}  from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'ngx-export-popup',
  templateUrl: './export-popup.component.html',
  styleUrls: ['./export-popup.component.scss']
})
export class ExportPopupComponent implements OnInit {

  closeResult = ''; 

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) { 
    this.modalService.open(content, 
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => { 
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
  } 

  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  } 

}
