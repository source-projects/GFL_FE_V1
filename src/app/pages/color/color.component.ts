import { Component, OnInit } from '@angular/core';
import { ColorService } from 'app/@theme/services/color.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'app/@theme/services/common.service';

@Component({
  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {


 public errorData: any = (errorData as any).default;
 
 tableStyle = 'bootstrap';
 colorList=[];
 radioSelect=1;
 radioArray = [
  {id:1, value:"View Own"},
  {id:2, value:"View Group"},
  {id:3, value:"View All"}
];
 userId;
 userHeadId;

  constructor(private colorService: ColorService, 
              private route:Router,
              private modalService: NgbModal,
              private toastr:ToastrService,
              private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['']
    this.getColor(this.userId,"own");
  }

  onChange(event){
    switch(event){
      case 1: 
              this.getColor(this.userId,"own");
              break;

      case 2: 
              this.getColor(this.userHeadId,"group");
              break;

      case 3:
              this.getColor(0,"all");
              break;
    }
  }

  getColor(id,getBy) {
    this.colorService.getColor(id,getBy).subscribe(
      data => {
        if (data["success"]) {
          this.colorList = data['data']
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  deleteColor(rowId) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.colorService.deleteColorById(rowId).subscribe(
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


