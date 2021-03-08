import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
  ViewContainerRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CommonService } from "../../../@theme/services/common.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ShadeService } from "../../../@theme/services/shade.service";
import { SupplierService } from "../../../@theme/services/supplier.service";

@Component({
  selector: "ngx-shade-child",
  templateUrl: "./shade-child.component.html",
  styleUrls: ["./shade-child.component.scss"],
})
export class ShadeChildComponent implements OnInit {
  shadeData = {
    pending: Boolean,
    partyShadeNo: null,
    processName: null,
    qualityId: null,
    qualityEntryId: null,
    qualityName: null,
    qualityType: null,
    colorTone: null,
    labColorNo: null,
    category: null,
    remark: null,
    createdBy: null,
    updatedBy: null,
    cuttingId: null,
    partyId: null,
    processId: null,
    userHeadId: null,
    isExtraRate: Boolean,
    extraRate: null,
  };
  @Output() addShade: EventEmitter<any> = new EventEmitter();
  partyList: any[];
  loading: boolean;
  formSubmitted = false;
  processList: any[];
  qualityList: any[];
  public wt100m: any = 0;
  color: any = "";
  categoryList = [{ name: "light" }, { name: "dark" }];

  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private supplierService: SupplierService,
    private shadeService: ShadeService,
    private route: Router,
    public vcRef: ViewContainerRef,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {
    await this.getQualityList();
    await this.getPartyList();
    await this.getProcessList();
    await this.getSupplierList();
  }

  getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
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

  public getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(errorData.Internal_Error);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }

  getProcessList() {
    this.loading = true;
    this.shadeService.getAllDyeingProcess().subscribe(
      (data) => {
        if (data["success"]) {
          this.processList = data["data"];
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

  getSupplierList() {}

  getQualityFromParty(event) {
    this.loading = true;
    this.shadeData.qualityId = null;
    this.shadeData.qualityName = null;
    this.shadeData.qualityType = null;
    if (event == undefined) {
      this.getPartyList();
      this.getQualityList();
      this.shadeData.qualityId = null;
      this.shadeData.qualityName = null;
      this.shadeData.qualityType = null;
      //  this.shadeData.shadeDataList = [];
      // this.shadeData.shadeDataList.push(new ShadeDataList());
      //this.resetAmount();
      this.loading = false;
    } else {
      this.shadeService.getQualityFromParty(this.shadeData.partyId).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"].qualityDataList;
            this.shadeData.qualityId = this.qualityList[0].qualityId;
            this.shadeData.qualityName = this.qualityList[0].qualityName;
            this.shadeData.qualityType = this.qualityList[0].qualityType;
            this.qualityList.forEach((e) => {
              e.partyName = data["data"].partyName;
              this.loading = false;
            });
            this.loading = false;
            this.qualityList.forEach((element) => {
              if (this.shadeData.qualityId == element.qualityId) {
                this.shadeData.qualityId = element.qualityId;
                this.shadeData.qualityName = element.qualityName;
                this.shadeData.qualityType = element.qualityType;
                this.shadeData.partyId = element.partyId;
                this.shadeData.qualityEntryId = element.id;
                this.wt100m = element.wtPer100m;
              }
            });
            // this.calculateTotalAmount(true);
          } else {
            // this.toastr.error(data["msg"]);
            this.qualityList = null;
            this.loading = false;
          }
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    }
  }

  qualityIdSelected(event) {
    if (event == undefined) {
      this.shadeData.qualityName = null;
      this.shadeData.qualityType = null;
      // this.shadeData.shadeDataList = [];
      //this.shadeData.shadeDataList.push(new ShadeDataList());
      //this.resetAmount();
    } else {
      this.qualityList.forEach((element) => {
        if (this.shadeData.qualityId == element.qualityId) {
          this.shadeData.qualityId = element.qualityId;
          this.shadeData.qualityName = element.qualityName;
          this.shadeData.qualityType = element.qualityType;
          this.shadeData.partyId = element.partyId;
          this.shadeData.qualityEntryId = element.id;
          this.wt100m = element.wtPer100m;
        }
      });
      //  this.calculateTotalAmount(true);
    }
  }

  setProcessName(id) {
    let processIndex =
      this.processList && this.processList.length
        ? this.processList.findIndex((v) => v.id == id)
        : -1;
    if (processIndex > -1) {
      this.shadeData.processName = this.processList[processIndex].name;
    } else {
      this.shadeData.processName = "";
    }
  }
  updateColor() {
    this.shadeData.colorTone = this.color;
  }
  isExtraChanged(event) {
    if (!event) {
      this.shadeData.extraRate = 0;
    }
  }
}
