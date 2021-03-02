import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShadeService } from "../../../@theme/services/shade.service";
import { ProductionPlanningService } from "../../../@theme/services/production-planning.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { ShadeWithBatchComponent } from "../shade-with-batch/shade-with-batch.component";
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
  @Input("party") party: any;
  @Input("quality") quality: any;
  @Input("batch") batch: any;
  @Input("batchControl") batchControl: any;
  @Input("shadeId") shadeIdReceived: any;
  @Input("colorTone") colorToneReceviced: any;
  @Input("editDyeingSlipFlag") editDyeingSlipFlag: boolean;
  @Input("editProductionPlanFlag") editProductionPlanFlag: boolean;
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

  productionData = {
    batchId: null,
    partyId: null,
    qualityEntryId: null,
    shadeId: null,
    stockId: null,
    // id:null
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
    if(this.editProductionPlanFlag){
      this.activeModal.close(this.productionData);
    }else{
      this.productionPlanningService
      .saveProductionPlan(this.productionData)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.productionId = data["data"];
            if (this.addToJetFlag) {
              this.router.navigate([
                "/pages/jet-planning/" + this.productionId,
              ]);
              this.activeModal.close(true);
            } else {
              this.activeModal.close(true);
              this.toastr.success(errorData.Add_Success);
            }
          }
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    }
   
  }

  addToJetClick() {
    this.addToJetFlag = true;
    this.onOkClick();
  }
}
