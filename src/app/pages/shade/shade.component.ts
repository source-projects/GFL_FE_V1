import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShadeService } from 'app/@theme/services/shade.service';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';

import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';

@Component({
  selector: 'ngx-shade',
  templateUrl: './shade.component.html',
  styleUrls: ['./shade.component.scss']
})
export class ShadeComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  shadeList=[];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];
  userHeadId;
  userId;
  permissions: Number;
  access:Boolean = false;
  constructor(private shadeService: ShadeService, 
              private route:Router,
              private modalService: NgbModal,
              private toastr:ToastrService,
              public shadeGuard: ShadeGuard,
              private jwtToken: JwtTokenService,
              private commonService: CommonService
              ) { }
  

  ngOnInit(): void {
    this.access = this.shadeGuard.accessRights('add');
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getallShades(this.userId,"own");
  }

  onChange(event){
    this.shadeList=[];
    switch(event){
      case 1: 
              this.getallShades(this.userId,"own");
              break;

      case 2: 
              this.getallShades(this.userHeadId,"group");
              break;

      case 3:
              this.getallShades(0,"all");
              break;
    }
  }

  getallShades(id,getBy){
  this.shadeService.getShadeMastList(id,getBy).subscribe(
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
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete)
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
 


