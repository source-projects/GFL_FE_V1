import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { CommonService } from 'app/@theme/services/common.service';
import { ShadeService } from 'app/@theme/services/shade.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";

@Component({
  selector: 'ngx-pending-apc',
  templateUrl: './pending-apc.component.html',
  styleUrls: ['./pending-apc.component.scss']
})
export class PendingApcComponent implements OnInit {
  apcList = [];
  tableStyle = "bootstrap";
  loading = false;
  userId:any;
  userHeadId:any;
  constructor(
    private shadeService: ShadeService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getallShades(this.userId , 'all')
   
  }

  getallShades(id, getBy) {
    let shadeList1 = [];
    this.loading = true;
    this.shadeService.getAllPendingShade().subscribe(
      data => {
        if (data['success']) {
          if (data['data'].length > 0) {
            this.apcList = data['data'];
          }
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  deletePendingAPC(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.shadeService.deleteShadeData(id).subscribe(
          (data) => {
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });  }

}
