import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { PlanningSlipComponent } from "../jet-planning/planning-slip/planning-slip.component";
import { PlanningSlipService } from "../../@theme/services/planning-slip.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../@theme/json/error.json";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
// import { AdditionSlip } from 'src/app/@theme/model/additon-slip';

export class AdditionSlip {
  batchId: string;
  dyeingSlipData: DyeingSlipData;
  productionId: number;
}

export class DyeingSlipData {
  controlId: number;
  dyeingSlipItemData: DyeingSlipItemDatum[];
  holdTime: number;
  id: number;
  isColor: boolean;
  liquerRation: number;
  processType: string;
  sequence: number;
  temp: number;
}

export class DyeingSlipItemDatum {
  controlId: number;
  id: number;
  itemId: number;
  itemName: string;
  qty: number;
  supplierId: number;
  supplierName: string;
}
@Component({
  selector: "ngx-addition-slip",
  templateUrl: "./addition-slip.component.html",
  styleUrls: ["./addition-slip.component.scss"],
})
export class AdditionSlipComponent implements OnInit {
  batchNo: any;
  formSubmitted = false;
  batchList = [];
  additionSlipList = [];
  additionList = [
    {
      batchId: null,
      holdTime: null,
      liquorRatio: null,
      temperature: null,
    },
  ];
  additionSlipData: any;
  // additionListArray:additionList[] = [] ;

  loading = true;
  tableStyle = "bootstrap";

  additionSlipArray: AdditionSlip[] = [];
  additionSlip: AdditionSlip = new AdditionSlip();
  dyeingSlipData: DyeingSlipData = new DyeingSlipData();
  constructor(
    private modalService: NgbModal,
    private batchService: StockBatchService,
    private planningService: PlanningSlipService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllBatch();
    this.getAllAdditionSlip();
  }
  getAllBatch() {
    this.batchService.getAllBatchForAdditionSlip().subscribe(
      (data) => {
        if (data["success"]) {
          this.batchList = data["data"];
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
    );
  }
  batchSelected(event) {
    // let batch = event.target.value;
    this.additionSlip.batchId = event.batchId;
    this.additionSlip.productionId = event.productionId;

    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = false;
    modalRef.componentInstance.batchId = event.batchId;
    modalRef.componentInstance.additionSlipFlag = true;

    modalRef.componentInstance.stockId = event.productionId;
    modalRef.result.then((result) => {
      if (result) {
        this.saveAdditionSlip(result);
      }
    });
  }

  editSlip(id) {
    let prodId;
    this.additionSlipList.forEach((element) => {
      if (element.id == id) {
        prodId = element.productionId;
      }
    });
    this.getAdditionSlipDataById(id);

    let interval = setInterval(() => {
      if (this.additionSlipData) {
        const modalRef = this.modalService.open(PlanningSlipComponent);
        modalRef.componentInstance.isPrintDirect = false;
        modalRef.componentInstance.batchId = id;
        modalRef.componentInstance.editAdditionFlag = true;
        modalRef.componentInstance.additionSlipFlag = true;

        modalRef.componentInstance.stockId = prodId;
        modalRef.componentInstance.additionSlipData = this.additionSlipData;

        modalRef.result.then((result) => {
          if (result) {
            this.updateAdditionSlip(result);
          }
        });
        clearInterval(interval);
      }
    }, 10);
  }

  getAdditionSlipDataById(id) {
    this.planningService.getAlladditionSlipById(id).subscribe(
      (data) => {
        if (data["success"]) {
          this.additionSlipData = data["data"];
        } else {
          this.toastr.error(errorData.Serever_Error);
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

  deleteSlip(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.planningService.deleteAdditionSlip(id).subscribe(
          (data) => {
            this.getAllAdditionSlip();
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  updateAdditionSlip(result) {
    this.additionSlip.dyeingSlipData.holdTime = result.holdTime;
    this.additionSlip.dyeingSlipData.temp = result.temp;
    this.additionSlip.dyeingSlipData.isColor = result.isColor;
    this.additionSlip.dyeingSlipData.liquerRation = result.liquorRatio;
    this.additionSlip.dyeingSlipData.processType = "addition";
    this.additionSlip.dyeingSlipData.dyeingSlipItemData = result.items;

    this.planningService.updateAdditionDyeingSlip(this.additionSlip).subscribe(
      (data) => {
        if (data["success"]) {
          this.route.navigate(["/pages/addition-slip"]);
          this.toastr.success(errorData.Add_Success);
          // this.disableButton=true;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }
  saveAdditionSlip(result) {
    console.log(this.additionSlip);
    this.dyeingSlipData.holdTime = result.holdTime;
    this.dyeingSlipData.temp = result.temp;
    this.dyeingSlipData.isColor = result.isColor;
    this.dyeingSlipData.liquerRation = result.liquorRatio;
    this.dyeingSlipData.processType = "addition";
    this.dyeingSlipData.dyeingSlipItemData = result.items;

    this.additionSlip.dyeingSlipData = this.dyeingSlipData;

    this.planningService.saveadditionSlip(this.additionSlip).subscribe(
      (data) => {
        if (data["success"]) {
          this.route.navigate(["/pages/addition-slip"]);
          this.toastr.success(errorData.Add_Success);
          this.getAllAdditionSlip();
          // this.disableButton=true;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  getAllAdditionSlip() {
    this.planningService.getAlladditionSlip().subscribe(
      (data) => {
        if (data["success"]) {
          this.additionSlipList = data["data"];
        } else {
          this.toastr.error(errorData.Serever_Error);
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }
}
