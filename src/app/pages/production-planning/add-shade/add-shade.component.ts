import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { AdminService } from "../../../@theme/services/admin.service";
import { JetPlanningService } from "../../../@theme/services/jet-planning.service";
import { ProductionPlanningService } from "../../../@theme/services/production-planning.service";
import { ShadeService } from "../../../@theme/services/shade.service";

@Component({
  selector: "ngx-add-shade",
  templateUrl: "./add-shade.component.html",
  styleUrls: ["./add-shade.component.scss"],
})
export class AddShadeComponent implements OnInit, OnDestroy {
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
  @Input("productionId1") productionId1: number;
  @Input("fromJetComp") fromJetComp: boolean = false;
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
  uniqueShadeNo: any;
  uniqueShadeColor: any;
  uniqueShadeName: any;
  uniqueShadeFlag: boolean = false;
  addToJetFlag: boolean = false;
  public errorData: any = (errorData as any).default;
  public showJetListFlag: boolean = false;
  public weight: number = 0;
  public jetCapacity: boolean = false;
  public jetSelectedFlag: boolean = false;
  public selectedJetData: any = [];

  productionData = {
    productionId: null,
    batchId: null,
    partyId: null,
    qualityEntryId: null,
    shadeId: null,
    stockId: null,
    jetId: 0,
  };

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private _NgbActiveModal: NgbActiveModal,
    private adminService: AdminService,
    private shadeService: ShadeService,
    private productionPlanningService: ProductionPlanningService,
    private toastr: ToastrService,
    private jetPlanningService: JetPlanningService,
  ) { }

  ngOnInit(): void {
    if (this.editDyeingSlipFlag) {
      this.getApproveBy();
    } else {
      this.getShadeList();
      this.getAllJets();
      if (this.editProductionPlanFlag) {
        this.showJetListFlag = true;
      }
    }
  }

  get activeModal() {
    return this._NgbActiveModal;
  }

  validateUniqueShadeNo() {
    this.loading = true;
    if (this.uniqueShadeNo) {
      this.productionPlanningService.validateUniqueShadeNo(this.uniqueShadeNo).subscribe(
        data => {
          if (data['data']) {
            this.uniqueShadeColor = data['data']['colorTone'];
            this.uniqueShadeName = data['data']['colorName'];
            this.uniqueShadeFlag = true;
            this.loading = false;
          } else {
            this.uniqueShadeColor = '';
            this.uniqueShadeNo = ''
            this.uniqueShadeFlag = false;
            this.toastr.error(data['msg']);
            this.loading = false;

          }
        }, error => {
          this.toastr.error(error.error.msg);
          this.loading = false;
        }
      )
    } else {
      this.uniqueShadeFlag = false;
      this.uniqueShadeColor = '';
    }
  }

  public getShadeList() {
    this.loading = true;

    this.shadeService
      .getShadesByQualityAndPartyId(this.party, this.quality)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.shadeList = data["data"];
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

  getApproveBy() {
    this.loading = true;

    this.adminService.getAllApproveByData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data["success"]) {
        this.approveByList = data["data"];
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }
  onApproveClick() {
    this.activeModal.close(this.approveBy);
  }
  onOkClick() {
    if (this.productionId1)
      this.productionData.productionId = this.productionId1;

    this.productionData.batchId = this.batch;
    this.productionData.partyId = this.party;
    this.productionData.qualityEntryId = this.quality;
    this.productionData.shadeId = this.uniqueShadeNo ? this.uniqueShadeNo : this.shadeId;
    this.productionData.stockId = this.batchControl;
    if (this.jetid) this.productionData.jetId = this.jetid;
    if (this.shadeId || this.uniqueShadeNo) {
      this.productionPlanningService
        .saveProductionPlan(this.productionData)
        .pipe(takeUntil(this.destroy$)).subscribe(
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
      this.jetid = null;
    }
  }

  getAllJets() {
    this.jetList = [];
    this.jetPlanningService.getAllJetDataV1().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
        }
      },
      (error) => { }
    );
  }

  getWeightByStockAndBatch() {
    if (this.batch && this.batchControl) {
      this.productionPlanningService
        .getWeightByStockIdAndBatchId(this.batch, this.batchControl)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
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
