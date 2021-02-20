import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "../../@theme/json/error.json";
import { ProductionPlanning } from "../../@theme/model/production-planning";
import { CommonService } from "../../@theme/services/common.service";
import { PartyService } from "../../@theme/services/party.service";
import { QualityService } from "../../@theme/services/quality.service";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { ProgramService } from "../../@theme/services/program.service";

import { ToastrService } from "ngx-toastr";
import { AddShadeComponent } from "./add-shade/add-shade.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShadeService } from "../../@theme/services/shade.service";
import { ProductionPlanningService } from "../../@theme/services/production-planning.service";

@Component({
  selector: "ngx-production-planning",
  templateUrl: "./production-planning.component.html",
  styleUrls: ["./production-planning.component.scss"],
})
export class ProductionPlanningComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  user: any;
  userHead: any;
  public loading = false;
  formSubmitted: boolean = false;
  batch: any;
  p_id: any;
  partyList: any[];
  qualityList: any[];
  batchListByParty: any[];
  batchListParty: any[];
  allBatchList: any[];
  productionPlanning: ProductionPlanning = new ProductionPlanning();
  batchList = [];
  programValues: any;
  qualityList1: any;
  plannedProductionList: any[];
  index: any;
  editProductionPlanFlag: boolean = false;

  constructor(
    private partyService: PartyService,
    private _route: ActivatedRoute,
    private qualityService: QualityService,
    private route: Router,
    private productionPlanningService: ProductionPlanningService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private programService: ProgramService,
    private modalService: NgbModal,
    private shadeService: ShadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public getAllBatchData() {
    this.stockBatchService.getAllBatch().subscribe(
      (data) => {
        if (data["success"]) {
          this.allBatchList = data["data"];
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
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
      }
    }
    if (event != undefined) {
      this.batchList = [];
      if (this.productionPlanning.partyId) {
        this.programService
          .getBatchByParty(this.productionPlanning.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.allBatchList = data["data"];
                this.allBatchList.forEach((element) => {
                  if (element.productionPlanned == false) {
                    this.batchList.push(element);
                  }
                });
                this.allBatchList = this.batchList;

                this.loading = false;
              } else {
                this.allBatchList = [];
                this.loading = false;
              }
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
      }
    } else {
      this.allBatchList = [];
      this.productionPlanning.partyId = null;
      this.productionPlanning.qualityId = null;

      this.getPartyList();
      this.getQualityList();
      this.getAllBatchData();
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
            this.productionPlanning.partyId = e.partyName;
            this.productionPlanning.qualityEntryId = e.id || e.qualityEntryId;
          }
        });
      }
      if (this.productionPlanning.qualityEntryId) {
        this.batchList = [];
        this.programService
          .getBatchByQuality(this.productionPlanning.qualityEntryId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.allBatchList = data["data"];
                this.allBatchList.forEach((element) => {
                  if (element.productionPlanned == false) {
                    this.batchList.push(element);
                  }
                });
                this.allBatchList = this.batchList;

                this.loading = false;
              } else {
                this.allBatchList = [];
                this.loading = false;
              }
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
      }
    }
  }

  filter(event: any) {
    let filterNumber = event.target.value;
    if (filterNumber == "") {
      this.getAllBatchData();
    } else {
      let displayArray = this.allBatchList.filter((item) => {
        if (item.batchId.indexOf(filterNumber) !== -1 || !filterNumber) {
          return true;
        }
      });
      this.allBatchList = displayArray;
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
    this.allBatchList.forEach((e) => {
      if (e.batchId == batch_id) {
        b_controlId = e.controlId;
        party = e.partyId;
        quality = e.qualityEntryId;
      }
    });

    const modalRef = this.modalService.open(AddShadeComponent);

    if (
      (this.productionPlanning.partyId && this.productionPlanning.qualityId) ==
      undefined
    ) {
      modalRef.componentInstance.party = party;
      modalRef.componentInstance.quality = quality;
    } else {
      modalRef.componentInstance.party = this.p_id;
      modalRef.componentInstance.quality = this.productionPlanning.qualityEntryId;
    }
    modalRef.componentInstance.batch = batch_id;
    modalRef.componentInstance.batchControl = b_controlId;
    modalRef.componentInstance.shadeId = shadeId;
    modalRef.componentInstance.colorTone = colorTone;
    modalRef.result.then((result) => {
      if (result) {
        this.getAllBatchData();
        this.plannedProductionListForDataTable();
      }
    });
    this.editProductionPlanFlag = false;
  }

  public plannedProductionListForDataTable(): any {
    this.productionPlanningService.getAllPlannedProductionList().subscribe(
      (data) => {
        if (data["success"]) {
          this.plannedProductionList = data["data"];
        }
      },
      (error) => {}
    );
  }
  editProductionPlan(id): any {
    this.editProductionPlanFlag = true;
    this.onBatchSelect(id.batchId);
  }
  removeItem(id) {
    //remove row
    let idCount = this.plannedProductionList.length;
    let item = this.plannedProductionList;
    if (idCount == 1) {
      item[0].partyName = null;
      item[0].qualityName = null;
      item[0].colorTone = null;
      item[0].batchId = null;
      let list = item;
      this.plannedProductionList = [...list];
    } else {
      let removed = item.splice(id, 1);
      let list = item;
      this.plannedProductionList = [...list];
    }
  }
  addToJet(data) {
    this.router.navigate(["/pages/jet-planning/" + data.id]);
  }
}
