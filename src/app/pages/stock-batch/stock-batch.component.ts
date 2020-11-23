import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-stock-batch',
  templateUrl: './stock-batch.component.html',
  styleUrls: ['./stock-batch.component.scss']
})
export class StockBatchComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  stockList;
  radioSelect;
  tablestyle = "bootstrap";

  constructor(
    private modalService: NgbModal,
    private toastr:ToastrService,
    private stockBatchService: StockBatchService
  ) { }

  ngOnInit(): void {
    this.getStockBatchList();
  }

  getStockBatchList(){
    this.stockBatchService.getAllStockBatchList().subscribe(
      data=>{
        if(data["success"]){
          this.stockList = data["data"];
          console.log(this.stockList)
        }else
          this.toastr.error(data["msg"]);
      },
      error=>{
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  deleteStockBatch(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.stockBatchService.deleteStockBatchById(id).subscribe(
          data=>{
            if(data["success"]){
              this.toastr.success(errorData.Delete);
              this.getStockBatchList();
            }
              
            else
              this.toastr.error(data["msg"])
          },
          error=>{
            this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    });
  }

}
