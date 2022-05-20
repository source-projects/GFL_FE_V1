import {
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { NbMenuService } from "@nebular/theme";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import * as errorData from "../../@theme/json/error.json";
import { JetDataList, JetPlanning } from '../../@theme/model/jet-planning';
import {
  ProductionBatchDetail,
  ProductionPlanning,
} from "../../@theme/model/production-planning";
import { CommonService } from "../../@theme/services/common.service";
import { JetPlanningService } from "../../@theme/services/jet-planning.service";
import { PartyService } from "../../@theme/services/party.service";
import { ProductionPlanningService } from "../../@theme/services/production-planning.service";
import { ProgramService } from "../../@theme/services/program.service";
import { QualityService } from "../../@theme/services/quality.service";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { PlanningSlipComponent } from "../jet-planning/planning-slip/planning-slip.component";
import { AddShadeComponent } from "./add-shade/add-shade.component";
import { ChangeJetComponent } from "../production-planning/change-jet/change-jet.component";
import { RequestData } from "../../@theme/model/request-data.model";
import { DataFilter } from "../../@theme/model/datafilter.model";
import { PageData } from "../../@theme/model/page-data.model";
import { FilterParameter } from "../../@theme/model/filterparameter.model";
import { SlipFromJetComponent } from "../jet-planning/slip-from-jet/slip-from-jet.component";
import { NewSlipComponent } from "../jet-planning/new-slip/new-slip.component";
import { size } from "lodash";

@Component({
  selector: "ngx-production-planning",
  templateUrl: "./production-planning.component.html",
  styleUrls: ["./production-planning.component.scss"],
})
export class ProductionPlanningComponent implements OnInit, OnDestroy {
  public errorData: any = (errorData as any).default;
  user: any;
  userHead: any;
  public loading = false;
  formSubmitted: boolean = false;
  batch: any;
  p_id: any;
  partyList: any[];
  qualityList: any[];
  batchList: any[];
  batchListCopy = [];
  deleteIcon: boolean = false;

  productionPlanning: ProductionPlanning = new ProductionPlanning();
  programValues: any;
  qualityList1: any;
  plannedProductionList: any[];
  index: any;
  editProductionPlanFlag: boolean = false;
  public autoScrollDownInterval;
  public autoScrollUpInterval;

  public productionBatchDetail: ProductionBatchDetail;

  public isJetDiv: boolean = false;
  //jet variables..
  public connectedTo: CdkDropList[] = [];
  public jet: any;
  public detailsList: any = [];
  private destroy$: Subject<void> = new Subject<void>();
  public sendBatchId: string;
  public sendSotckId: number;
  public sendControlId: number;
  public changeStatusShow: boolean = false;
  currentProductionId: any;
  count = 0;
  countArr = [];
  jetPlanning: JetPlanning = new JetPlanning();
  jetDataList: JetDataList = new JetDataList();
  JetDataListArray: JetDataList[] = [];
  jetStatus: any;
  detailsFlag = false;
  showMenuFlag = false;
  items: any[] = [
    { title: "Start" },
    { title: "Complete" },
    { title: "Remove" },
    { title: "Print" },
    { title: "Edit And Print" },
    { title: "Change Jet" },
  ];
  color = "red";
  allBatchList: any[] = [];
  jetData1 = {
    controlId: null,
    productionId: null,
    sequence: null,
  };
  selectedJets = [];
  selectedPrintOption = null;
  //Pagination..
  requestData: RequestData = new RequestData();
  prodRequestData: RequestData = new RequestData();
  selectedBatchForPrint = [];
  productionData = {
    productionId: null,
    batchId: null,
    partyId: null,
    qualityEntryId: null,
    shadeId: null,
    stockId: null,
    jetId: 0,
  };
  constructor(
    private partyService: PartyService,
    private qualityService: QualityService,
    private productionPlanningService: ProductionPlanningService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private programService: ProgramService,
    private modalService: NgbModal,
    private jetService: JetPlanningService,
    private menuService: NbMenuService,
    private cdr: ChangeDetectorRef
  ) {
    this.productionBatchDetail = new ProductionBatchDetail();
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.destroy$),
        filter(({ tag }) => tag === "my-context-menu"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === "Print") this.generateSlip(true);
        else if (title === "Edit And Print") this.generateSlip(false);
        else if (title === "Start") this.startJet();
        else if (title === "Complete") this.completeChangeStatus();
        else if (title === "Remove") this.removeBatchFromJet();
        else if (title == "Change Jet") this.changeJet();
        else if (title == "Write") this.writeClick();
        else if (title == "SCO ON") this.SCOClickON();
        else if (title == "Dose Nylon ON") this.doseNylonClickON();
        else if (title == "SCO OFF") this.SCOClickOFF();
        else if (title == "Dose Nylon OFF") this.doseNylonClickOFF();
      });
  }

  ngOnInit(): void {
    this.requestData.getBy = "all";
    this.requestData.data = new DataFilter();
    this.requestData.data.isAnd = true;

    this.prodRequestData.getBy = "all";
    this.prodRequestData.data = new DataFilter();
    this.prodRequestData.data.isAnd = true;

    this.getCurrentId();
    this.getPartyList();
    this.getQualityList();
    this.getAllBatchData();
    this.plannedProductionListForDataTable();
  }

  getCurrentId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }

  getPartyList() {
    this.loading = true;
    this.partyService
      .getAllPartyNameList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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

  public getQualityList() {
    this.loading = true;
    this.qualityService
      .getQualityNameData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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

  public getAllBatchData() {
    this.batchList = [];
    this.productionPlanningService
      .getAllBatchListForProdV1(this.requestData, false)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            const pageData = data.data as PageData;
            this.batchList = pageData.data;
            this.requestData.data.total = pageData.total;
            this.batchListCopy = pageData.data;
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
  }

  public partySelected(event) {
    if (!this.flipped) {
      //get Finish-meter list FilterSelectedBatchPipe...
      if (event) {
        //for !production
        this.requestData.data.parameters =
          this.requestData.data.parameters.filter(
            (f) => f.field[0] != "qualityEntryId"
          );
        const index = this.requestData.data.parameters.findIndex((v) =>
          v.field.find((o) => o == "partyId")
        );
        if (index > -1) {
          this.requestData.data.parameters[index].field = ["partyId"];
          this.requestData.data.parameters[index].operator = "EQUALS";
          this.requestData.data.parameters[index].value = String(
            this.productionPlanning.partyId
          );
        } else {
          let parameter = new FilterParameter();
          parameter.field = ["partyId"];
          parameter.value = String(this.productionPlanning.partyId);
          parameter.operator = "EQUALS";
          this.requestData.data.parameters.push(parameter);
        }
        this.requestData.data.pageIndex = 0;
        this.getAllBatchData();

        //for production
        this.prodRequestData.data.parameters =
          this.prodRequestData.data.parameters.filter(
            (f) => f.field[0] != "qualityEntryId"
          );
        const index1 = this.prodRequestData.data.parameters.findIndex((v) =>
          v.field.find((o) => o == "partyId")
        );
        if (index1 > -1) {
          this.prodRequestData.data.parameters[index1].field = ["partyId"];
          this.prodRequestData.data.parameters[index1].operator = "EQUALS";
          this.prodRequestData.data.parameters[index1].value = String(
            this.productionPlanning.partyId
          );
        } else {
          let parameter = new FilterParameter();
          parameter.field = ["partyId"];
          parameter.value = String(this.productionPlanning.partyId);
          parameter.operator = "EQUALS";
          this.prodRequestData.data.parameters.push(parameter);
        }
        this.prodRequestData.data.pageIndex = 0;
        this.plannedProductionListForDataTable();
      } else {
        this.requestData.data.parameters =
          this.requestData.data.parameters.filter(
            (f) => f.field[0] != "qualityEntryId" && f.field[0] != "partyId"
          );
        this.requestData.data.pageIndex = 0;
        this.getAllBatchData();

        this.prodRequestData.data.parameters =
          this.prodRequestData.data.parameters.filter(
            (f) => f.field[0] != "qualityEntryId" && f.field[0] != "partyId"
          );
        this.prodRequestData.data.pageIndex = 0;
        this.plannedProductionListForDataTable();
      }
    }

    this.loading = true;
    this.productionPlanning.qualityId = null;
    if (event) {
      if (this.productionPlanning.partyId) {
        this.programService
          .getQualityByParty(this.productionPlanning.partyId)
          .pipe(takeUntil(this.destroy$))
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
      }
    }
    if (event) {
      // this.batchList = [];
      // this.batchListCopy = [];
      // if (this.productionPlanning.partyId) {
      //   this.programService
      //     .getBatchByParty(this.productionPlanning.partyId)
      //     .pipe(takeUntil(this.destroy$))
      //     .subscribe(
      //       (data) => {
      //         if (data["success"]) {
      //           this.batchList = data["data"];
      //           this.batchListCopy = data["data"];
      //           if (this.batchList) {
      //             this.batchList = this.batchList.filter(
      //               (v) => !v.productionPlanned
      //             );
      //           }
      //           this.loading = false;
      //         } else {
      //           this.loading = false;
      //         }
      //       },
      //       (error) => {
      //         this.loading = false;
      //       }
      //     );
      // }
    } else {
      this.batchList = [];
      this.batchListCopy = [];
      this.productionPlanning.partyId = null;
      this.productionPlanning.qualityId = null;

      this.getPartyList();
      this.getQualityList();
      // this.getAllBatchData();
      this.loading = false;
    }
  }

  public qualitySelected(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.productionPlanning.qualityId) {
        this.qualityList.forEach((e) => {
          if (e.qualityId == this.productionPlanning.qualityId) {
            this.p_id = e.partyId;
            this.productionPlanning.qualityEntryId = e.id || e.qualityEntryId;
          }
        });

        if (!this.flipped) {
          //get Finish-meter list FilterSelectedBatchPipe...

          //for !production
          const index = this.requestData.data.parameters.findIndex((v) =>
            v.field.find((o) => o == "qualityEntryId")
          );
          if (index > -1) {
            this.requestData.data.parameters[index].field = ["qualityEntryId"];
            this.requestData.data.parameters[index].operator = "EQUALS";
            this.requestData.data.parameters[index].value = String(
              this.productionPlanning.qualityEntryId
            );
          } else {
            let parameter = new FilterParameter();
            parameter.field = ["qualityEntryId"];
            parameter.value = String(this.productionPlanning.qualityEntryId);
            parameter.operator = "EQUALS";
            this.requestData.data.parameters.push(parameter);
          }
          this.requestData.data.pageIndex = 0;
          this.getAllBatchData();

          //for production
          const index1 = this.prodRequestData.data.parameters.findIndex((v) =>
            v.field.find((o) => o == "qualityEntryId")
          );
          if (index1 > -1) {
            this.prodRequestData.data.parameters[index1].field = [
              "qualityEntryId",
            ];
            this.prodRequestData.data.parameters[index1].operator = "EQUALS";
            this.prodRequestData.data.parameters[index1].value = String(
              this.productionPlanning.qualityEntryId
            );
          } else {
            let parameter = new FilterParameter();
            parameter.field = ["qualityEntryId"];
            parameter.value = String(this.productionPlanning.qualityEntryId);
            parameter.operator = "EQUALS";
            this.prodRequestData.data.parameters.push(parameter);
          }
          this.prodRequestData.data.pageIndex = 0;
          this.plannedProductionListForDataTable();
        } else {
          this.requestData.data.parameters =
            this.requestData.data.parameters.filter(
              (f) => f.field[0] != "qualityEntryId"
            );
          this.requestData.data.pageIndex = 0;
          this.getAllBatchData();

          this.prodRequestData.data.parameters =
            this.prodRequestData.data.parameters.filter(
              (f) => f.field[0] != "qualityEntryId"
            );
          this.prodRequestData.data.pageIndex = 0;
          this.plannedProductionListForDataTable();
        }
      }
      if (this.productionPlanning.qualityEntryId) {
        // this.batchList = [];
        // this.batchListCopy = [];
        // this.programService
        //   .getBatchByQuality(this.productionPlanning.qualityEntryId)
        //   .pipe(takeUntil(this.destroy$))
        //   .subscribe(
        //     (data) => {
        //       if (data["success"]) {
        //         this.batchList = data["data"];
        //         this.batchListCopy = data["data"];
        //         if (this.batchList) {
        //           this.batchList = this.batchList.filter(
        //             (v) => !v.productionPlanned
        //           );
        //         }
        //         this.loading = false;
        //       } else {
        //         this.loading = false;
        //       }
        //     },
        //     (error) => {
        //       this.loading = false;
        //     }
        //   );
      }
    } else {
      this.requestData.data.parameters =
        this.requestData.data.parameters.filter(
          (f) => f.field[0] != "qualityEntryId"
        );
      this.requestData.data.pageIndex = 0;
      this.getAllBatchData();

      this.prodRequestData.data.parameters =
        this.prodRequestData.data.parameters.filter(
          (f) => f.field[0] != "qualityEntryId"
        );
      this.prodRequestData.data.pageIndex = 0;
      this.plannedProductionListForDataTable();
    }
  }

  filter(event: any) {
    // let filterNumber = event.target.value;
    // if (filterNumber == "") {
    //   this.batchList = [...this.batchListCopy];
    // } else {
    //   let displayArray = this.batchListCopy.filter((item) => {
    //     if (item.batchId.indexOf(filterNumber) !== -1 || !filterNumber) {
    //       return true;
    //     }
    //   });
    //   this.batchList = displayArray;
    // }
    if (!this.batch) {
      this.requestData.data.parameters =
        this.requestData.data.parameters.filter((f) => f.field[0] != "batchId");
      this.requestData.data.pageIndex = 0;
      this.getAllBatchData();

      this.prodRequestData.data.parameters =
        this.prodRequestData.data.parameters.filter(
          (f) => f.field[0] != "batchId"
        );
      this.prodRequestData.data.pageIndex = 0;
      this.plannedProductionListForDataTable();
    } else {
      //get Finish-meter list FilterSelectedBatchPipe...

      //for !production
      const index = this.requestData.data.parameters.findIndex((v) =>
        v.field.find((o) => o == "batchId")
      );
      if (index > -1) {
        this.requestData.data.parameters[index].field = ["batchId"];
        this.requestData.data.parameters[index].operator = "LIKE";
        this.requestData.data.parameters[index].value = String(this.batch);
      } else {
        let parameter = new FilterParameter();
        parameter.field = ["batchId"];
        parameter.value = String(this.batch);
        parameter.operator = "LIKE";
        this.requestData.data.parameters.push(parameter);
      }
      this.requestData.data.pageIndex = 0;
      this.getAllBatchData();

      //for production
      const index1 = this.prodRequestData.data.parameters.findIndex((v) =>
        v.field.find((o) => o == "batchId")
      );
      if (index1 > -1) {
        this.prodRequestData.data.parameters[index1].field = ["batchId"];
        this.prodRequestData.data.parameters[index1].operator = "LIKE";
        this.prodRequestData.data.parameters[index1].value = String(this.batch);
      } else {
        let parameter = new FilterParameter();
        parameter.field = ["batchId"];
        parameter.value = String(this.batch);
        parameter.operator = "LIKE";
        this.prodRequestData.data.parameters.push(parameter);
      }
      this.prodRequestData.data.pageIndex = 0;
      this.plannedProductionListForDataTable();
    }
  }

  public onBatchSelect(batch_id) {
    let b_controlId;
    let party, quality, shadeId, colorTone;
    if (this.editProductionPlanFlag) {
      this.plannedProductionList.forEach((e) => {
        if (e.batchId == batch_id) {
          b_controlId = e.stockId;
          party = e.partyId;
          quality = e.qualityEntryId;
          shadeId = e.shadeId;
          colorTone = e.colorTone;
        }
      });
    }
    this.batchList.forEach((e) => {
      if (e.batchId == batch_id) {
        b_controlId = e.controlId;
        party = e.partyId;
        quality = e.qualityEntryId;
      }
    });

    const modalRef = this.modalService.open(AddShadeComponent, { size: "lg" });
    if (
      (this.productionPlanning.partyId && this.productionPlanning.qualityId) ==
      undefined
    ) {
      modalRef.componentInstance.party = party;
      modalRef.componentInstance.quality = quality;
    } else {
      modalRef.componentInstance.party = this.p_id;
      modalRef.componentInstance.quality =
        this.productionPlanning.qualityEntryId;
    }
    modalRef.componentInstance.productionBatchDetail =
      this.productionBatchDetail;
    modalRef.componentInstance.batch = batch_id;
    modalRef.componentInstance.batchControl = b_controlId;
    modalRef.componentInstance.shadeId = shadeId;
    modalRef.componentInstance.colorTone = colorTone;
    modalRef.componentInstance.editProductionPlanFlag =
      this.editProductionPlanFlag;
    modalRef.result
      .then((result) => {
        if (result) {
          this.ngOnInit();
          this.productionPlanning.partyId = null;
          this.productionPlanning.qualityId = null;
          this.editProductionPlanFlag = false;
        }
      })
      .catch((err) => { });
  }

  updateProduction(result) {
    this.productionPlanningService
      .updateProductionPlan(result)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(errorData.Update_Success);
          } else {
            this.toastr.error(errorData.Update_Error);
          }
          this.loading = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
  }

  public plannedProductionListForDataTable(): any {
    this.plannedProductionList = [];
    this.productionPlanningService
      .getAllBatchForProd(this.prodRequestData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            const pageData = data.data as PageData;
            this.plannedProductionList = pageData.data;
            this.prodRequestData.data.total = pageData.total;
          }
        },
        (error) => { }
      );
  }
  editProductionPlan(production): any {
    this.editProductionPlanFlag = true;
    this.onBatchSelect(production.batchId);
  }
  removeItem(index) {
    //remove row
    let idCount = this.plannedProductionList.length;
    let item = this.plannedProductionList;
    let deleteId = this.plannedProductionList[index].id;
    this.productionPlanningService
      .deleteProduction(deleteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.ngOnInit();
            this.toastr.success("Deleted Successfully");
          }
        },
        (error) => { }
      );
  }

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
    if (this.flipped) {
      // this.getJetData();
      this.getAllJets();
    } else {
      //clear party and quality on flip
      this.productionPlanning.partyId = null;
      this.productionPlanning.qualityId = null;

      this.requestData.data.pageIndex = 0;
      this.prodRequestData.data.pageIndex = 0;

      this.getAllBatchData();
      this.plannedProductionListForDataTable();
    }
  }

  jetList = [];
  allJetId = [];
  loader = false;
  getAllJets() {
    this.loader = true;
    this.jetList = [];
    this.jetService.getAllJetDataV1().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
          // this.jetList.forEach(ele => {
          //   this.allJetId.push(ele.id);
          // });
          // this.jetsSelected();
        }
      },
      (error) => { }
    );
  }

  //jet functions......

  getJetData() {
    this.jet = [];
    this.loading = true;
    this.jetService
      .getAllJetData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.jet = data["data"];
            this.jet.forEach(element => {
              element["lotNo"] = "";
              element.jetDataList.forEach(item => {
                item["isChecked"] = false;
              });
            });
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }
  sendJetId;
  currentBatchSequence;
  setIndexForSlip(index, j, idx) {
    //on click set batchId stockId to get print-slip data
    this.items = this.items.filter((f) => f.title != "Write");
    this.items = this.items.filter((f) => f.title != "SCO ON");
    this.items = this.items.filter((f) => f.title != "Dose Nylon ON");
    this.items = this.items.filter((f) => f.title != "SCO OFF");
    this.items = this.items.filter((f) => f.title != "Dose Nylon OFF");
    this.sendBatchId = index.batchId;
    this.sendSotckId = index.productionId;
    this.sendControlId = index.controlId;
    this.sendJetId = j.id;
    this.currentBatchSequence = idx;
    if (index.status === "start") {
      this.items = this.items.filter((f) => f.title != "Start");
      this.items.push({ title: "SCO ON" });
      this.items.push({ title: "Dose Nylon ON" });
      this.items.push({ title: "Write" });
    } else {
      let itm = this.items.filter((f) => f.title == "Start");
      if (!itm || !itm.length) {
        this.items.splice(0, 0, { title: "Start" });
      }
    }

    if (index.sco == true) {
      this.items = this.items.filter((f) => f.title != "SCO ON");
      this.items.push({ title: "SCO OFF" });
    }
    if (index.doseNylone == true) {
      this.items = this.items.filter((f) => f.title != "Dose Nylon ON");
      this.items.push({ title: "Dose Nylon OFF" });
    }
  }

  public getBatchDetails() {
    this.jetService
      .getBatchedDetailByProductionId(this.sendSotckId, this.sendBatchId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.detailsList = data["data"];

            this.loading = false;
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    return this.detailsList;
  }
  generateSlip(directPrint) {
    const modalRef = this.modalService.open(PlanningSlipComponent);
    modalRef.componentInstance.isPrintDirect = directPrint;
    modalRef.componentInstance.batchId = this.sendBatchId;
    modalRef.componentInstance.stockId = this.sendSotckId;
    modalRef.componentInstance.additionSlipFlag = false;

    modalRef.result
      .then((result) => {
        if (result) {
        }
      })
      .catch((err) => { });


    // const modalRef = this.modalService.open(NewSlipComponent, { size: 'xl' });
    // modalRef.componentInstance.isPrintDirect = directPrint;
    // modalRef.componentInstance.batchId = this.sendBatchId;
    // modalRef.componentInstance.stockId = this.sendSotckId;
    // modalRef.componentInstance.productionBatchDetail = this.productionBatchDetail;
    // modalRef.componentInstance.additionSlipFlag = false;

    // modalRef.result
    //   .then((result) => {
    //     if (result) {
    //     }
    //   })
    //   .catch((err) => { });



  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.autoScrollDownInterval) {
      clearInterval(this.autoScrollDownInterval);
    }
    if (this.autoScrollUpInterval) {
      clearInterval(this.autoScrollUpInterval);
    }
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

  startJet() {
    this.loading = true;
    let obj = {
      jetNo: this.sendControlId, //control Id
      productionId: this.sendSotckId, //Production Id
      //updatedBy: this.user.userId,
    };
    this.jetService
      .startJetProcess(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (res["success"]) {
            this.toastr.success(res["msg"]);
            // this.getJetData();
            this.jetsSelected();
          } else {
            this.toastr.error(res["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  SCOClickON() {
    let obj = {
      jetId: this.sendControlId, //control Id
      productionId: this.sendSotckId, //Production Id
      sco: true,
      doseNylon: null
    };

    this.jetService
      .updateSCOandDoseNylon(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            // this.getJetData();
            this.jetsSelected();
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }

  doseNylonClickON() {
    let obj = {
      jetId: this.sendControlId, //control Id
      productionId: this.sendSotckId, //Production Id
      sco: null,
      doseNylon: true
    };

    this.jetService
      .updateSCOandDoseNylon(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            // this.getJetData();
            this.jetsSelected();
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }

  SCOClickOFF() {
    let obj = {
      jetId: this.sendControlId, //control Id
      productionId: this.sendSotckId, //Production Id
      sco: false,
      doseNylon: null
    };

    this.jetService
      .updateSCOandDoseNylon(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            // this.getJetData();
            this.jetsSelected();
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }

  doseNylonClickOFF() {
    let obj = {
      jetId: this.sendControlId, //control Id
      productionId: this.sendSotckId, //Production Id
      sco: null,
      doseNylon: false
    };

    this.jetService
      .updateSCOandDoseNylon(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            // this.getJetData();
            this.jetsSelected();
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }

  writeClick() {
    this.loading = true;
    this.productionPlanningService
      .writeModBust(this.sendControlId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          if (res["success"]) {
            this.toastr.success(res["msg"]);
          } else {
            this.toastr.error(res["msg"]);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
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

  changeJet() {
    const modalRef = this.modalService.open(ChangeJetComponent, { size: "lg" });
    modalRef.componentInstance.batchId = this.sendBatchId;
    modalRef.componentInstance.jetId = this.sendJetId;
    modalRef.componentInstance.batchControlId = this.sendControlId;
    modalRef.componentInstance.currentSequence = this.currentBatchSequence;
    modalRef.componentInstance.prodId = this.sendSotckId;
    modalRef.result
      .then((result) => {
        if (result) {
          this.jetService
            .updateJetData(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
              if (data["success"]) {
                this.toastr.success(errorData.Add_Success);
                // this.getJetData();
                this.jetsSelected();
              }
            });
        }
      })
      .catch((err) => { });
  }

  changeJetStatusApiCall(data: any) {
    this.jetService
      .updateStatus(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.toastr.success(data["msg"]);
            // this.getJetData();
            // let temp = [];
            // temp.push(this.productionBatchDetail.jetId);
            this.jetsSelected();
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => { }
      );
  }
  showMenu() {
    this.showMenuFlag = true;
  }

  removeBatchFromJet() {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result
      .then((result) => {
        if (result) {
          this.jetService
            .removeProductionFromJet(this.sendControlId, this.sendSotckId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.toastr.success(errorData.Delete);
                // let temp = [];
                // temp.push(this.productionBatchDetail.jetId);
                // this.getJetData();
                this.jetsSelected();
                this.getAllBatchWithShade();
              },
              (error) => {
                this.toastr.error(errorData.Serever_Error);
              }
            );
        }
      })
      .catch((err) => { });
  }

  getAllBatchWithShade() {
    this.loading = true;
    // let p_id;
    this.productionPlanningService
      .getAllProductionPlan()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.batchList = data["data"];
            this.allBatchList = data["data"];
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  batchSelectedFromProductionList(event) {
    let p_id;
    if (event.target) {
      p_id = Number(event.target.value);
    } else {
      p_id = event;
    }
    let production = this.plannedProductionList.filter(
      (f) => f.id == Number(event.target.value)
    );
    if (production.length) {
      const modalRef = this.modalService.open(AddShadeComponent, {
        size: "lg",
      });
      modalRef.componentInstance.productionId1 = production[0].id;
      modalRef.componentInstance.productionBatchDetail =
        this.productionBatchDetail;
      modalRef.componentInstance.party = production[0].partyId;
      modalRef.componentInstance.quality = production[0].qualityEntryId;
      modalRef.componentInstance.batch = production[0].batchId;
      modalRef.componentInstance.batchControl = production[0].stockId;
      modalRef.componentInstance.shadeId = production[0].shadeId;
      modalRef.componentInstance.colorTone = production[0].colorTone;
      modalRef.componentInstance.editProductionPlanFlag = true;
      modalRef.result
        .then((result) => {
          if (result) {
            this.ngOnInit();
            this.editProductionPlanFlag = false;
          }
        })
        .catch((err) => { });
    }
  }

  getAllDetailsOfBatch(event, batch) {
    this.deleteIcon = true;
    this.productionBatchDetail = { ...batch };
    this.productionBatchDetail.jetId = batch.controlId;

    // this.autoScrollDownInterval = setInterval(() => {
    //   var elem = document.getElementById("scroll-auto");
    //   elem.scrollTop = elem.scrollHeight;
    // }, 2000);

    // this.autoScrollUpInterval = setInterval(() => {
    //   var elem = document.getElementById("scroll-auto");
    //   elem.scrollTop = 0;
    // }, 4000);
  }

  resetDetailsOfBatch($event) {
    this.deleteIcon = false;
    this.productionBatchDetail = new ProductionBatchDetail();
    clearInterval(this.autoScrollDownInterval);
    clearInterval(this.autoScrollUpInterval);
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
      this.jetService
        .updateJetData(obj)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
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
      this.jetService
        .updateJetData(obj)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if (data["success"]) {
            this.toastr.success(errorData.Add_Success);
          }
        });
    }
  }

  remove(batch) {
    const modelRef = this.modalService.open(ConfirmationDialogComponent);
    modelRef.result.then((result) => {
      if (result) {
        this.jetService
          .removeBatchFromList(batch.batchId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.toastr.success(errorData.Delete);
              this.plannedProductionListForDataTable();
              this.getAllBatchData();
            },
            (error) => {
              this.toastr.error(errorData.Serever_Error);
            }
          );
      }
    });
  }

  pageChanged(event) {
    this.requestData.data.pageIndex = event - 1;
    this.getAllBatchData();
  }

  prodPageChanged(event) {
    this.prodRequestData.data.pageIndex = event - 1;
    this.plannedProductionListForDataTable();
  }

  jetsSelected(event?) {

    // this.loader = true;
    // let obj = {};

    // if (ids) {

    //   obj = {
    //     array: ids
    //   }
    // } else {
    //   obj = {
    //     array: this.allJetId
    //   }
    // }


    if (event && event.length) {
      this.selectedJets = event;
    } else {
      this.selectedJets = this.selectedJets;
    }

    let obj = {
      array: this.selectedJets
    }

    this.jetService
      .getJetDataById(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data["success"]) {

          // if (ids) {
          //   let singleJet = data['data'];
          //   this.jet.forEach(element => {
          //     if (element.id == singleJet[0].id) {
          //       element = singleJet[0];
          //     }
          //   });
          //   this.cdr.detach();
          //   setInterval(() => {
          //     this.cdr.detectChanges();
          //   }, 5000);
          // } else {
            this.jet = data['data'];
          // }

          if (this.jet && this.jet.length) {
            this.jet.forEach(element => {
              element["lotNo"] = "";
              if (element.jetDataList && element.jetDataList.length) {
                element.jetDataList.forEach(item => {
                  item["isChecked"] = false;
                });
              }
            });
          } else {
            this.jet = [];
          }
          // this.loader = false;
          this.cdr.detectChanges();
        }
      });
  }

  lotNoEntered(event, jet) {
    if (event.key == "Enter") {

      // let production;
      // this.productionPlanningService.
      // checkBatchExistOrNot.(jet.lotNo)
      //   .pipe(takeUntil(this.destroy$)).subscribe(
      //     (data) => {
      //       if (data["success"]) {
      //         production = data.data; 
      //       } else {
      //         this.toastr.error(data["msg"]);
      //       }
      //     },
      //     (error) => {
      //       this.loading = false;
      //     }
      //   );

      this.productionData.productionId = null;
      this.productionData.batchId = jet.lotNo;
      this.productionData.shadeId = null;
      this.productionData.jetId = jet.id;
      this.productionPlanningService
        .saveProductionPlan(this.productionData)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              // this.productionId = data["data"];
              this.jetsSelected();
              this.toastr.success(data["msg"]);

            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            this.loading = false;
          }
        );
      event.preventDefault();
    }

  }

  openShadeModal(jet, data) {
    if (data) {
      const modalRef = this.modalService.open(AddShadeComponent, {
        size: "lg",
      });
      modalRef.componentInstance.productionId1 = data.productionId;
      modalRef.componentInstance.productionBatchDetail =
        this.productionBatchDetail;
      modalRef.componentInstance.party = data.partyId;
      modalRef.componentInstance.quality = data.qualityEntryId;
      modalRef.componentInstance.batch = data.batchId;
      modalRef.componentInstance.batchControl = data.stockId;
      modalRef.componentInstance.jetid = jet.id;
      // modalRef.componentInstance.shadeId = data.shadeId;
      // modalRef.componentInstance.colorTone = data.colorTone;
      modalRef.componentInstance.editProductionPlanFlag = true;
      modalRef.componentInstance.fromJetComp = true;
      modalRef.result
        .then((result) => {
          if (result) {
            // this.ngOnInit();
            this.editProductionPlanFlag = false;
            this.jetsSelected();
          }
        })
        .catch((err) => { });
    }
  }

  selectedBatches(checked, data, jet) {

    this.selectedBatchForPrint = [];
    data.isChecked = checked;
    let allJetData = this.jet.map(v => v.jetDataList);
    let batches = [];
    allJetData.forEach(element => {
      element.forEach(ele => {
        if (ele.isChecked) {
          batches.push(ele);
        }
      });
    });
    console.log("batched : ", batches);
    if (batches && batches.length) {
      batches.forEach(element => {
        let obj = {
          batchId: element.batchId,
          productionId: element.productionId
        }
        this.selectedBatchForPrint.push(obj)
      });
    }

    console.log(this.selectedBatchForPrint)

  }

  callPrintSlipApi() {

    let obj = {
      type: this.selectedPrintOption,
      list: this.selectedBatchForPrint
    }

    const modalRef = this.modalService.open(SlipFromJetComponent);
    modalRef.componentInstance.arrayForBatchesForPrint = this.selectedBatchForPrint;
    modalRef.componentInstance.additionSlipFlag = false;
    modalRef.componentInstance.directPrintFromJet = true;
    modalRef.componentInstance.objToPassInRequest = obj;

    modalRef.result
      .then((result) => {
        if (result) {
        }
      })
      .catch((err) => { });

  }

  removeBatchFromJetManually(index) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result
      .then((result) => {
        if (result) {
          this.jetService
            .removeProductionFromJet(index.controlId, index.productionId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.toastr.success(errorData.Delete);
                // this.getJetData();
                this.jetsSelected();
              },
              (error) => {
                this.toastr.error(errorData.Serever_Error);
              }
            );
        }
      })
      .catch((err) => { });
  }
}
