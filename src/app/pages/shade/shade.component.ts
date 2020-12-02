import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShadeService } from 'app/@theme/services/shade.service';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';

@Component({
  selector: 'ngx-shade',
  templateUrl: './shade.component.html',
  styleUrls: ['./shade.component.scss']
})
export class ShadeComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  shadeList=[];
  shade=[];
  headers=["Party Shade No", "Process Name", "Quality Id", "Quality Name", "Party Name", "Color Tone" ];
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];
  userHeadId;
  userId;
  
  constructor(
    private shadeService: ShadeService,
    private route: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonService,
    private exportService: ExportService
  ) { }
  

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getallShades(this.userId,"own");
  }

  onChange(event){
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
        this.shade=this.shadeList.map((element)=>({partyShadeNo:element.partyShadeNo, processName: element.processName,
          qualityId: element.qualityId, qualityName:element.qualityName, partyName:element.partyName, colorTone:element.colorTone }))
          console.log(this.shade);
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
 


