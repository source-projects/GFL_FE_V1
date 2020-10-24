import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { PartyService } from 'app/@theme/services/party.service';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
 tablestyle='bootstrap';
  partyList=[]; 
  constructor(private partyService: PartyService, private route:Router, private modalService: NgbModal, public changeRef: ChangeDetectorRef) { }
  
  public confirm() {
    const modalRef =this.modalService.open(ConfirmationDialogComponent,{ size: 'sm' });
    modalRef.componentInstance.changeRef.markForCheck();
    return modalRef.result;
  }
  ngOnInit(): void {
  this.getAllParty();
    
  }

  getAllParty(){
    this.partyService.getAllPartyList().subscribe(
      data =>{
        this.partyList=data["data"];
        console.log(data);
  
      },
      error=>{
        console.log('Error occured');
        console.log(error.errorMessage);           
      }
    )   
  }
  deleteParty(id){
    //confirm();
    const modalRef =this.modalService.open(ConfirmationDialogComponent,{ size: 'sm' });
    modalRef.result.then((result)=>{
    console.log(result);
    if(result){
  this.partyService.deletePartyDetailsById(id).subscribe(
    data =>{       
      this.getAllParty();
    
    },
    error=>{
      console.log('Error occured');
      console.log(error.errorMessage);           
    }   
  )}
    })
  }
}
