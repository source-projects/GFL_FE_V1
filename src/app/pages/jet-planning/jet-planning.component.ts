import { Component, OnInit, ViewChild } from "@angular/core";
import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShadeWithBatchComponent } from "../production-planning/shade-with-batch/shade-with-batch.component";
import { JetPlanningService } from "../../@theme/services/jet-planning.service";
import { JetPlanning, JetDataList } from "../../@theme/model/jet-planning";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../@theme/json/error.json";
import { ProductionPlanningService } from "../../@theme/services/production-planning.service";
import { WarningPopupComponent } from "../../@theme/components/warning-popup/warning-popup.component";
import { ProductionPlanning } from "../../@theme/model/production-planning";
import { PartyService } from "../../@theme/services/party.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QualityService } from "../../@theme/services/quality.service";
import { CommonService } from "../../@theme/services/common.service";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { ProgramService } from "../../@theme/services/program.service";
import { ShadeService } from "../../@theme/services/shade.service";

import { PlanningSlipComponent } from "./planning-slip/planning-slip.component";
import { NbMenuService } from "@nebular/theme";
import { filter, map } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: "ngx-jet-planning",
  templateUrl: "./jet-planning.component.html",
  styleUrls: ["./jet-planning.component.scss"],
})
export class JetPlanningComponent implements OnInit {
  public sendBatchId: string;
  public sendSotckId: number;
  public sendControlId: number;
  public changeStatusShow: boolean = false;
  finalobj = [];
  public connectedTo: CdkDropList[] = [];

  allShade: any;
  productionPlanning: ProductionPlanning = new ProductionPlanning();
  public errorData: any = (errorData as any).default;
  user: any;
  userHead: any;
  public loading = false;
  formSubmitted: boolean = false;
  batch: any;
  p_id: any;
  partyList: any[];
  detailsList: any;
  qualityList: any[];
  batchListByParty: any[];
  batchListParty: any[];
  batchList: any[] = [];
  allBatchList: any[] = [];
  // batchList = [];
  programValues: any;
  qualityList1: any;
  jetData1 = {
    controlId: null,
    productionId: null,
    sequence: null,
  };
  array = [];
  array1 = [];
  index: any;
  productionList = [];
  production: any[];
  jet: any[];
  jetData: any[];
  currentProductionId: any;
  count = 0;
  countArr = [];
  jetPlanning: JetPlanning = new JetPlanning();
  jetDataList: JetDataList = new JetDataList();
  JetDataListArray: JetDataList[] = [];
  jetStatus: any;
  detailsFlag = false;
  showMenuFlag = false;
  items: any[] = [];
  color = "red";
  constructor(
    private modalService: NgbModal,
    private jetService: JetPlanningService,
    private toastr: ToastrService,
    private productionPlanningService: ProductionPlanningService,
    private partyService: PartyService,
    private _route: ActivatedRoute,
    private qualityService: QualityService,
    private route: Router,
    private commonService: CommonService,
    private stockBatchService: StockBatchService,
    private programService: ProgramService,
    private shadeService: ShadeService,
    private menuService: NbMenuService
  ) {}

  async ngOnInit() {
    this.currentProductionId = this._route.snapshot.paramMap.get("id");
    this.getCurrentId();
    this.getPartyList();
    this.getQualityList();
    //this.getAllBatchData();
    this.getJetData();
    this.getAllBatchWithShade();

    //this.getBatchDetails();

    this.menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "my-context-menu"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Print") this.generateSlip(true);
        else if (title === "Edit And Print") this.generateSlip(false);
        else if (title === "Complete") this.completeChangeStatus();
        else if (title === "Pause") this.pauseChangeStatus();
        else if (title === "Remove") this.removeBatchFromJet();
        else if (title === "Details") this.getBatchDetails();
      });
  }
  pauseChangeStatus() {
    this.jetStatus = "pause";
    let obj = {
      controlId: this.sendControlId, //control Id
      prodcutionId: this.sendSotckId, //Production Id
      status: this.jetStatus,
    };
    this.changeJetStatusApiCall(obj);
  }
  completeChangeStatus() {
    this.jetStatus = "success";
    let obj = {
      controlId: this.sendControlId, //control Id
      prodcutionId: this.sendSotckId, //Production Id
      status: this.jetStatus,
    };
    this.changeJetStatusApiCall(obj);
    
  }

  changeJetStatusApiCall(data: any) {
    this.jetService.updateStatus(data).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(data["msg"]);
          this.route
          .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
          .then(() => {
          this.route.navigate(["/pages/jet-planning"]);
    });
        } else {
          this.toastr.error(data["msg"]);
        }
      },
      (error) => {
        this.toastr.error("Internal Server Error");
      }
    );
  }
  showMenu() {
    this.showMenuFlag = true;
  }

  

  setIndexForSlip(index) {
    console.log(index);
    //on click set batchId stockId to get print-slip data
    this.sendBatchId = index.batchId;
    this.sendSotckId = index.productionId;
    this.sendControlId = index.controlId;
    var detail = this.getBatchDetails();
    this.items = [
      { title: "Complete" },
      { title: "Pause" },
      {
        title: "Remove",
      },
      { title: "Print" },
      { title: "Edit And Print" },
      {
        title: "Details",
        children: [
          {
            title: detail,
          },
        ],
      },
    ];
  }

  removeBatchFromJet() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.jetService
          .removeProductionFromJet(this.sendControlId, this.sendSotckId)
          .subscribe(
            (data) => {
              this.toastr.success(errorData.Delete);
              this.getJetData();
              this.getAllBatchWithShade();
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
      }
    }).catch((err)=> {});
  }

  getCurrentId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

  public getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
          this.batchListByParty = data["data"];
          if (this.allBatchList != null || this.allBatchList != undefined) {
            this.allBatchList.forEach((element) => {
              if (element.productionPlanned == false) {
                this.batchListParty.push(element);
              }
            });
          }
          this.batchListByParty = this.batchListParty;

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

  public getBatchDetails() {
    this.jetService
      .getBatchedDetailByProductionId(this.sendSotckId, this.sendBatchId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.detailsList =
              "Party Name : " +
              data["data"].partyName +
              " Batch No: " +
              data["data"].batchId +
              " Party Shade No: " +
              data["data"].partyShadeNo +
              " Batch Weight: " +
              data["data"].totalWt;
            this.items = [
              { title: "Complete" },
              { title: "Pause" },
              {
                title: "Remove",
              },
              { title: "Print" },
              { title: "Edit And Print" },
              {
                title: "Details",
                children: [
                  {
                    title: this.detailsList,
                  },
                ],
              },
            ];
            // this.batchListByParty = data["data"];
            // if (this.allBatchList != null || this.allBatchList != undefined) {
            //   this.allBatchList.forEach(element => {
            //     if (element.productionPlanned == false) {
            //       this.batchListParty.push(element);
            //     }
            //   });
            // }
            // this.batchListByParty = this.batchListParty;

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
    return this.detailsList;
  }

  public partySelected(event) {
    this.loading = true;
    this.productionPlanning.qualityId = null;
    if (event != undefined) {
      if (this.productionPlanning.partyId) {
        this.programService
          .getQualityByParty(this.productionPlanning.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.qualityList = data["data"].qualityDataList;
              } else {
                this.productionPlanning.qualityId = null;
                this.qualityList = [];
              }
              this.loading = false;
            },
            (error) => {
              this.qualityList = [];
              this.loading = false;
            }
          );

        this.allBatchList = [];

        this.batchList.forEach((element) => {
          if (this.productionPlanning.partyId == element.partyId) {
            this.allBatchList.push(element);
          }
        });
        //this.getAllBatchWithShade();
      }
    } else {
      this.productionPlanning.partyId = null;
      this.getAllBatchWithShade();
    }
  }

  public qualitySelected(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.productionPlanning.qualityId) {
        this.qualityList.forEach((e) => {
          if (e.qualityId == this.productionPlanning.qualityId) {
            this.p_id = e.partyId;
            //this.productionPlanning.partyId = e.partyName;
            this.productionPlanning.qualityEntryId = e.id || e.qualityEntryId;
          }
        });
      }
      this.allBatchList = [];

      if (this.productionPlanning.qualityEntryId) {
        this.batchList.forEach((element) => {
          if (
            this.productionPlanning.qualityEntryId == element.qualityEntryId
          ) {
            this.allBatchList.push(element);
          }
        });
        //this.getAllBatchWithShade();
      }
    } else {
      this.productionPlanning.qualityId = null;
      this.getAllBatchWithShade();
    }
  }
  getAllBatchWithShade() {
    this.loading = true;
    // let p_id;
    this.productionPlanningService.getAllProductionPlan().subscribe(
      (data) => {
        if (data["success"]) {
          this.batchList = data["data"];
          this.allBatchList = data["data"];
          if (this.currentProductionId != null) {
            this.batchSelected(this.currentProductionId);
          }
        } else {
          // this.toastr.error(data["msg"]);
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
    let p_id, selectedBatchID, selectedStockId;
    if (event.target) {
      p_id = Number(event.target.value);
    } else {
      p_id = event;
    }
    this.batchList.forEach((element) => {
      if (p_id == element.id) {
        selectedBatchID = element.batchId;
        selectedStockId = element.stockId;
      }
    });
    const modalRef = this.modalService.open(ShadeWithBatchComponent);
    modalRef.componentInstance.batchId = selectedBatchID;
    modalRef.componentInstance.stockId = selectedStockId;
    modalRef.result.then((result) => {
      this.currentProductionId = null;
      if (result) {
        this.jetData1.controlId = result.jet;
        this.jetData1.productionId = p_id;
        this.jetData1.sequence = 1;
        let jetData2 = this.jetData1;
        let arr = [];
        //  jetData2.productionId = Number(jetData2.productionId);
        arr.push(jetData2);
        this.addJetData(arr);
      }
    }).catch((err)=> {});
  }

  addJetData(arr) {
    let index;
    this.jetService.saveJetData(arr).subscribe((data) => {
      if (data["success"]) {
        this.toastr.success(errorData.Add_Success);
        this.route.navigate(["/pages/jet-planning"]);
        this.getJetData();
        this.allBatchList = [];
        this.getAllBatchWithShade();
      } else {
        this.toastr.error(data["msg"]);
        this.getJetData();
        //this.getshade();
      }
    });
  }

  drop(event: CdkDragDrop<any[]>, i) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.jet[i].jetDataList,
        event.previousIndex,
        event.currentIndex
      );
      let fromobj = {
        jetId: this.jet[i].id,
        productionId: event.container.data[event.currentIndex].productionId,
        sequence: event.previousIndex + 1,
      };
      let toobj = {
        jetId: this.jet[i].id,
        productionId: event.container.data[event.currentIndex].productionId,
        sequence: event.currentIndex + 1,
      };
      let obj = {
        from: fromobj,
        to: toobj,
      };
      this.jetService.updateJetData(obj).subscribe((data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Add_Success);
        }
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let fromobj = {
        jetId: this.jet[i].id,
        productionId: event.container.data[event.currentIndex].productionId,
        sequence: event.previousIndex + 1,
      };
      let toobj = {
        jetId: this.jet[i].id,
        productionId: event.container.data[event.currentIndex].productionId,
        sequence: event.currentIndex + 1,
      };
      let obj = {
        from: fromobj,
        to: toobj,
      };
      this.jetService.updateJetData(obj).subscribe((data) => {
        if (data["success"]) {
          this.toastr.success(errorData.Add_Success);
        }
      });
    }
  }

  getJetData() {
    this.jet = [];
    this.loading = true;
    this.jetService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jet = data["data"];
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  generateSlip(directPrint) {
    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = directPrint;
    modalRef.componentInstance.batchId = this.sendBatchId;
    modalRef.componentInstance.stockId = this.sendSotckId;
    modalRef.componentInstance.additionSlipFlag = false;

    modalRef.result.then((result) => {
      if (result) {
      }
    }).catch((err)=> {});
  }
}
