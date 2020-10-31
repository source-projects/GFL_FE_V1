import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShadeService } from 'app/@theme/services/shade.service';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 

import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-shade',
  templateUrl: './shade.component.html',
  styleUrls: ['./shade.component.scss']
})
export class ShadeComponent implements OnInit {
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';
  
  tableStyle = 'bootstrap';
  shadeList=[];
  
  constructor(private shadeService: ShadeService, 
              private route:Router,
              private modalService: NgbModal,
              private toastrService: NbToastrService
              ) { }
  

  ngOnInit(): void {
    this.getallShades();
   // this.getShadeList();
    
  }
  getallShades(){
    //getShadeList(){
  this.shadeService.getShadeMastList().subscribe(
    data =>{
      console.log(data['data']);
      this.shadeList = data['data'];
    //  this.shadeList.shadeD
      console.log(this.shadeList);
    },
    error=>{
      //toaster
      this.status = "danger"
      const config = {
       status: this.status,
       destroyByClick: this.destroyByClick,
       duration: this.duration,
       hasIcon: this.hasIcon,
       position: this.position,
       preventDuplicates: this.preventDuplicates,
      };
      this.toastrService.show(
        "No internet access or Server failuer",
        "Shade",
        config);
    }
  );
  }
  deleteShade(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.shadeService.deleteShadeData(id).subscribe(
          (data) => {
            this.getallShades();
          },
          (error) => {
            //toaster
          this.status = "danger"
          const config = {
           status: this.status,
           destroyByClick: this.destroyByClick,
           duration: this.duration,
           hasIcon: this.hasIcon,
           position: this.position,
           preventDuplicates: this.preventDuplicates,
         };
         this.toastrService.show(
           "No internet access or Server failuer",
           "Shade",
           config);
          }
        );
      }
    });
  }
}
 


