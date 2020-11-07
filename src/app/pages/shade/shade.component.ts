import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShadeService } from 'app/@theme/services/shade.service';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-shade',
  templateUrl: './shade.component.html',
  styleUrls: ['./shade.component.scss']
})
export class ShadeComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  
  shadeList=[];
  
  constructor(private shadeService: ShadeService, 
              private route:Router,
              private modalService: NgbModal,
              private toastr:ToastrService
              ) { }
  

  ngOnInit(): void {
    this.getallShades();
  }

  getallShades(){
  this.shadeService.getShadeMastList().subscribe(
      data =>{
        this.shadeList = data['data'];
      },
      error=>{
        this.toastr.error(errorData.Serever_Error)
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
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
 


