import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShadeService } from "../../../@theme/services/shade.service";
import { ProductionPlanningService } from "../../../@theme/services/production-planning.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { ShadeWithBatchComponent } from "../shade-with-batch/shade-with-batch.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { JetPlanningService } from "../../../@theme/services/jet-planning.service";
import { Router } from "@angular/router";
import { AdminService } from "../../../@theme/services/admin.service";
// import { AdminService } from '../../../@theme/services/admin.service';

@Component({
  selector: "ngx-add-shade",
  templateUrl: "./add-shade.component.html",
  styleUrls: ["./add-shade.component.scss"],
})
export class AddShadeComponent implements OnInit {
  @Input("productionBatchDetail") productionBatchDetail: any;
  @Input("party") party: any;
  @Input("quality") quality: any;
  @Input("batch") batch: any;
  @Input("batchControl") batchControl: any;
  @Input("shadeId") shadeIdReceived: any;
  @Input("colorTone") colorToneReceviced: any;
  @Input("editDyeingSlipFlag") editDyeingSlipFlag: boolean;
  @Input("editProductionPlanFlag") editProductionPlanFlag: boolean;
  @Input("jetid") jetid: number;
  @Output() action = new EventEmitter();
  @Output() addToJetClicked = new EventEmitter();
  shadeList: any[];
  approveBy: any;
  approveByList: any[];
  public loading = false;
  shadeId: Number;
  formSubmitted: boolean = false;
  productionList: any[] = [];
  jetList: any[] = [];
  productionId: any;
  addToJetFlag: boolean = false;
  public errorData: any = (errorData as any).default;
  public showJetListFlag: boolean = false;
  public weight: number = 0;
  public jetCapacity: boolean = false;
  public jetSelectedFlag: boolean = false;
  public selectedJetData: any = [];

  productionData = {
    batchId: null,
    partyId: null,
    qualityEntryId: null,
    shadeId: null,
    stockId: null,
    jetId: 0,
  };
  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private adminService: AdminService,
    private shadeService: ShadeService,
    private productionPlanningService: ProductionPlanningService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private jetPlanningService: JetPlanningService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.editDyeingSlipFlag) {
      this.getApproveBy();
    } else {
      this.getShadeList();
      this.getAllJets();
      if(this.editProductionPlanFlag){
        this.showJetListFlag = true;
      }
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  public getShadeList() {
    this.loading = true;

    this.shadeService
      .getShadesByQualityAndPartyId(this.party, this.quality)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.shadeList = data["data"];
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

  getApproveBy() {
    this.loading = true;

    this.adminService.getAllApproveByData().subscribe((data) => {
      if (data["success"]) {
        this.approveByList = data["data"];
        this.loading = false;
      } else {
        // this.toastr.error(data["msg"]);
        this.loading = false;
      }
    });
  }
  onApproveClick() {
    this.activeModal.close(this.approveBy);
  }
  onOkClick() {
    this.productionData.batchId = this.batch;
    this.productionData.partyId = this.party;
    this.productionData.qualityEntryId = this.quality;
    this.productionData.shadeId = this.shadeId;
    this.productionData.stockId = this.batchControl;
    if (this.jetid) this.productionData.jetId = this.jetid;
    if (this.shadeId) {
      this.productionPlanningService
        .saveProductionPlan(this.productionData)
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.productionId = data["data"];
              this.toastr.success(data["msg"]);
              this.activeModal.close(true);
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            // this.toastr.error(errorData.Serever_Error);
            this.loading = false;
          }
        );
    }
  }

  showJetList(event) {
    if (event) {
      this.getWeightByStockAndBatch();
      this.showJetListFlag = true;
    } else {
      this.showJetListFlag = false;
      this.jetid = 0;
    }
  }

  getAllJets() {
    this.jetList = [];
    this.jetPlanningService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
        }
      },
      (error) => {}
    );
  }

  getWeightByStockAndBatch() {
    if (this.batch && this.batchControl) {
      this.productionPlanningService
        .getWeightByStockIdAndBatchId(this.batch, this.batchControl)
        .subscribe((data) => {
          if (data["success"]) {
            this.weight = data["data"].totalwt;
          }
        });
    }
  }

  jetSelected(event) {
    this.jetCapacity = false;
    let jet = this.jetList.filter((f) => f.id == event);
    if (jet.length) {
      if (jet[0].capacity > this.weight) {
        this.selectedJetData = jet[0].jetDataList;
        if (!this.selectedJetData) {
          this.jetSelectedFlag = false;
        } else {
          this.jetSelectedFlag = true;
        }
      } else {
        this.jetCapacity = true;
        this.jetSelectedFlag = false;
      }
    }
  }
}
