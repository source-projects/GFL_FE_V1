import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import * as errorData from "../../@theme/json/error.json";
import { PartyService } from "../../@theme/services/party.service";
import { PlanningSlipService } from "../../@theme/services/planning-slip.service";
import { ProgramService } from "../../@theme/services/program.service";
import { QualityService } from "../../@theme/services/quality.service";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { PlanningSlipComponent } from "../jet-planning/planning-slip/planning-slip.component";

export class AdditionSlip {
  id: number;
  batchId: string;
  dyeingSlipData: DyeingSlipData;
  productionId: number;
}

export class DirectSlip {
  partyId: number;
  qualityEntryId: number;
  shadeId: number;
  batchId: string;
  stockId: number;
  jetId: number;
  dyeingSlipData: DyeingSlipData;
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
  p_id: any;
  q_id: any;
  directSlipFlag = false;
  formSubmitted = false;
  directBatchList = [];
  batchList = [];
  partyList = [];
  qualityList = [];
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

  loading = true;
  tableStyle = "bootstrap";

  additionSlipArray: AdditionSlip[] = [];
  additionSlip: AdditionSlip = new AdditionSlip();
  dyeingSlipData: DyeingSlipData = new DyeingSlipData();

  directSlip: DirectSlip = new DirectSlip();
  dyeingSlipItemData: DyeingSlipItemDatum = new DyeingSlipItemDatum();
  directSlipBatchId = null;
  directSlipStockId = null;
  directSlipPartyId = null;
  directSlipQualityId = null;
  printNow = false;

  constructor(
    private modalService: NgbModal,
    private batchService: StockBatchService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private planningService: PlanningSlipService,
    private programService: ProgramService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllParty();
    this.getAllQuality();
    this.getAllBatch();
    this.getAllBatchData();
    this.getAllAdditionSlip();
  }

  getAllParty() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllQuality() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getAllBatch() {
    this.batchService.getAllBatchForAdditionSlip().subscribe(
      (data) => {
        if (data["success"]) {
          this.batchList = data["data"];
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public getAllBatchData() {
    this.directBatchList = [];
    this.batchService.getAllBatch().subscribe(
      (data) => {
        if (data["success"]) {
          this.directBatchList = data["data"];
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  public partySelected(event) {
    this.loading = true;
    this.directSlip.qualityEntryId = null;
    if (event) {
      if (this.directSlip.partyId) {
        this.programService
          .getQualityByParty(this.directSlip.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.qualityList = data["data"].qualityDataList;
              } else {
                this.directSlip.qualityEntryId = null;
                this.qualityList = [];
              }
              this.loading = false;
            },
            (error) => {
              this.qualityList = [];
              this.loading = false;
            }
          );
      }
    }
    if (event) {
      this.directBatchList = [];
      if (this.directSlip.partyId) {
        this.programService.getBatchByParty(this.directSlip.partyId).subscribe(
          (data) => {
            if (data["success"]) {
              this.directBatchList = data["data"];
              if (this.directBatchList) {
                this.directBatchList = this.directBatchList.filter(
                  (v) => !v.productionPlanned
                );
              }
              this.loading = false;
            } else {
              this.loading = false;
            }
          },
          (error) => {
            this.loading = false;
          }
        );
      }
    } else {
      this.directBatchList = [];
      this.directSlip.partyId = null;
      this.directSlip.qualityEntryId = null;

      this.getAllParty();
      this.getAllQuality();
      this.getAllBatchData();
      this.loading = false;
    }
  }

  public qualitySelected(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.directSlip.qualityEntryId) {
        this.qualityList.forEach((e) => {
          if (e.id == this.directSlip.qualityEntryId) {
            this.p_id = e.partyId;
            this.q_id = e.qualityId;
            this.directSlip.qualityEntryId = e.id;
          }
        });
      }
      if (this.directSlip.qualityEntryId) {
        this.batchList = [];
        this.programService
          .getBatchByQuality(this.directSlip.qualityEntryId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.directBatchList = data["data"];
                if (this.batchList) {
                  this.directBatchList = this.directBatchList.filter(
                    (v) => !v.productionPlanned
                  );
                }
                this.loading = false;
              } else {
                this.loading = false;
              }
            },
            (error) => {
              this.loading = false;
            }
          );
      }
    }
  }

  onBatchSelect(batch) {
    if (batch) {
      this.directSlipFlag = true;
    }

    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = false;
    if (this.directSlipFlag) {
      this.directSlipBatchId = batch.batchId;
      this.directSlipStockId = batch.controlId;
      this.directSlipPartyId = batch.partyId;
      this.directSlipQualityId = batch.qualityEntryId;

      modalRef.componentInstance.partyId = batch.partyId;
      modalRef.componentInstance.qualityId = batch.qualityEntryId;

      modalRef.componentInstance.directSlipFlag = true;
      modalRef.componentInstance.batchId = batch.batchId;
      modalRef.componentInstance.stockId = batch?.controlId;
    }

    modalRef.result.then((result) => {
      if (result) {
        this.dyeingSlipData = new DyeingSlipData();
        this.dyeingSlipData.dyeingSlipItemData = [];
        this.dyeingSlipData.processType = "directDyeing";
        this.directSlip.jetId = result.jetId;
        this.dyeingSlipData.holdTime = result.holdTime;
        this.dyeingSlipData.liquerRation = result.liquorRatio;
        this.dyeingSlipData.temp = result.temp;
        result.items.forEach((ele, i) => {
          if (!this.dyeingSlipData.dyeingSlipItemData[i]) {
            this.dyeingSlipData.dyeingSlipItemData.push(
              new DyeingSlipItemDatum()
            );
          }
          this.dyeingSlipData.dyeingSlipItemData[i].itemId = ele.itemId;
          this.dyeingSlipData.dyeingSlipItemData[i].itemName = ele.itemName;
          this.dyeingSlipData.dyeingSlipItemData[i].qty = ele.qty;
          this.dyeingSlipData.dyeingSlipItemData[i].supplierId = ele.supplierId;
          this.dyeingSlipData.dyeingSlipItemData[i].supplierName =
            ele.supplierName;
        });
        this.directSlip.dyeingSlipData = this.dyeingSlipData;
        this.directSlip.batchId = this.directSlipBatchId;
        this.directSlip.stockId = this.directSlipStockId;
        this.directSlip.partyId = this.directSlipPartyId;
        this.directSlip.qualityEntryId = this.directSlipQualityId;
        this.printNow = result.print;
        if (result.shadeId) this.directSlip.shadeId = result.shadeId;

        this.saveDirectSlip();
      }
    });
  }

  batchSelected(event) {
    this.additionSlip.batchId = event.batchId;
    this.additionSlip.productionId = event.productionId;

    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = false;

    modalRef.componentInstance.additionSlipFlag = true;
    modalRef.componentInstance.batchId = event.batchId;

    modalRef.componentInstance.stockId = event.productionId;
    modalRef.result.then((result) => {
      if (result) {
        this.saveAdditionSlip(result);
      }
    });
  }

  saveDirectSlip() {
    this.planningService.saveDirectSlip(this.directSlip).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Add_Success);
          this.directSlip.shadeId = null;
          if (this.printNow) {
            //open Print slip popup...
            const modalRef = this.modalService.open(PlanningSlipComponent);
            modalRef.componentInstance.isPrintDirect = true;
            modalRef.componentInstance.batchId = this.directSlipBatchId;
            modalRef.componentInstance.stockId = data['data'];
            modalRef.componentInstance.additionSlipFlag = false;

            modalRef.result
              .then((result) => {
                if (result) {
                }
              })
              .catch((err) => {});
          }
          this.ngOnInit();
        } else {
          this.toastr.error(data['msg']);
        }
      },
      (error) => {}
    );
  }

  editSlip(id) {
    let prodId, batchId;
    this.additionSlipList.forEach((element) => {
      if (element.id == id) {
        prodId = element.productionId;
        batchId = element.batchId;
        this.additionSlip.batchId = batchId;
        this.additionSlip.productionId = prodId;
      }
    });
    this.getAdditionSlipDataById(id, batchId, prodId);
  }

  getAdditionSlipDataById(id, batchId, prodId) {
    this.planningService.getAlladditionSlipById(id).subscribe(
      (data) => {
        if (data["success"]) {
          this.additionSlipData = data["data"];
          if (this.additionSlipData) {
            const modalRef = this.modalService.open(PlanningSlipComponent);
            modalRef.componentInstance.isPrintDirect = false;
            modalRef.componentInstance.batchId = batchId;
            modalRef.componentInstance.editAdditionFlag = true;
            modalRef.componentInstance.additionSlipFlag = true;

            modalRef.componentInstance.stockId = prodId;
            modalRef.componentInstance.additionSlipData = this.additionSlipData;

            modalRef.result.then((result) => {
              if (result) {
                this.updateAdditionSlip(result, id);
              }
            });
          }
        } else {
        }
        this.loading = false;
      },
      (error) => {
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
          (error) => {}
        );
      }
    });
  }

  updateAdditionSlip(result, id) {
    this.dyeingSlipData = new DyeingSlipData();
    this.additionSlip.id = id;
    this.additionSlip.dyeingSlipData = this.dyeingSlipData;
    this.additionSlip.dyeingSlipData.holdTime = result.holdTime;
    this.additionSlip.dyeingSlipData.temp = result.temp;
    this.additionSlip.dyeingSlipData.isColor = result.isColor;
    this.additionSlip.dyeingSlipData.liquerRation = result.liquorRatio;
    this.additionSlip.dyeingSlipData.processType = "addition";
    this.additionSlip.dyeingSlipData.id = result.id;
    this.additionSlip.dyeingSlipData.dyeingSlipItemData = result.items;

    this.planningService.updateAdditionDyeingSlip(this.additionSlip).subscribe(
      (data) => {
        if (data["success"]) {
          this.getAllAdditionSlip();
          this.toastr.success(errorData.Update_Success);
          // this.disableButton=true;
        } else {
          this.toastr.error(errorData.Update_Error);
        }
      },
      (error) => {}
    );
  }
  saveAdditionSlip(result) {
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
          this.getAllBatch();
          // this.disableButton=true;
        } else {
          this.toastr.error(errorData.Add_Error);
        }
      },
      (error) => {}
    );
  }

  getAllAdditionSlip() {
    this.additionSlipList = [];
    this.planningService.getAlladditionSlip().subscribe(
      (data) => {
        if (data["success"]) {
          this.additionSlipList = data["data"];
        } else {
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
