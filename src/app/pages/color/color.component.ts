import { Component, OnInit } from '@angular/core';
import { ColorService } from 'app/@theme/services/color.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {


 public errorData: any = (errorData as any).default;
 
 tableStyle = 'bootstrap';
 colorList=[];
 radioSelect;
  constructor(private colorService: ColorService, 
              private route:Router,
              private modalService: NgbModal,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getColor();
  }
  getColor() {
    this.colorService.getColor().subscribe(
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
            this.getColor();
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


