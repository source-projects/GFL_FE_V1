import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-stock-batch',
  templateUrl: './stock-batch.component.html',
  styleUrls: ['./stock-batch.component.scss']
})
export class StockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  stockList = [];

  tablestyle = "bootstrap";
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own" },
    { id: 2, value: "View Group" },
    { id: 3, value: "View All" }
  ];
  userHeadId;
  userId;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getStockBatchList(this.userId, "own");
  }

  onChange(event) {
    this.stockList = [];
    switch (event) {
      case 1:
        this.getStockBatchList(this.userId, "own");
        break;

      case 2:
        this.getStockBatchList(this.userHeadId, "group");
        break;

      case 3:
        this.getStockBatchList(0, "all");
        break;
    }
  }

  getStockBatchList(id, getBy) {
    this.stockBatchService.getAllStockBatchList(id, getBy).subscribe(
      data => {
        if (data["success"]) {
          this.stockList = data["data"];
          let index = 0
          this.stockList.forEach(element => {
            this.stockList[index].billDate = new Date(element.billDate).toDateString();
            this.stockList[index].chlDate = new Date(element.chlDate).toDateString();
            index++;
          });
        } else
          this.toastr.error(data["msg"]);
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  deleteStockBatch(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.stockBatchService.deleteStockBatchById(id).subscribe(
          data => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.onChange(this.radioSelect);
            }

            else
              this.toastr.error(data["msg"])
          },
          error => {
            this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    });
  }

}
