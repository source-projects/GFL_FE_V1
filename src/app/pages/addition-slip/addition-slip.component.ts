import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { PlanningSlipComponent } from '../jet-planning/planning-slip/planning-slip.component';

@Component({
  selector: 'ngx-addition-slip',
  templateUrl: './addition-slip.component.html',
  styleUrls: ['./addition-slip.component.scss']
})
export class AdditionSlipComponent implements OnInit {

  batchNo:any;
  formSubmitted = false;
  batchList = [];
  loading = true;
  constructor(
    private modalService: NgbModal,
    private batchService: StockBatchService
    

  ) { }

  ngOnInit(): void {
    this.getAllBatch();
  }
  getAllBatch(){
    this.batchService.getAllBatchForAdditionSlip().subscribe(
      (data) => {
        if (data["success"]) {
          this.batchList = data["data"]
          this.loading = false;
        } else {
          //this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);

        this.loading = false;
      }
    )

  }
  batchSelected(event){
    // let batch = event.target.value;
    console.log(event);
    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = false;
    modalRef.componentInstance.batchId = event.batchId;
    modalRef.componentInstance.additionSlipFlag = true;

    //modalRef.componentInstance.stockId = this.sendSotckId;
    modalRef.result.then((result) => {
      if (result) {
        console.log("Done");
      }
    });

  }

}
