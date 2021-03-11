import { ContentObserver } from "@angular/cdk/observers";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ShadeDataList } from "../../../@theme/model/shade";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ShadeService } from "../../../@theme/services/shade.service";

@Component({
  selector: "ngx-shade-child",
  templateUrl: "./shade-child.component.html",
  styleUrls: ["./shade-child.component.scss"],
})
export class ShadeChildComponent implements OnInit, OnChanges {
  @Input() shadeData;
  @Input() formSubmitted;
  @Output() selectedQualityId: EventEmitter<any> = new EventEmitter();
  @Input() addedBy: any;
  @Input() createdBy: any;
  partyList: any[];
  loading: boolean;
  processList: any[];
  qualityList: any[];
  public wt100m: any = 0;
  color: any = "";
  categoryList = [{ name: "light" }, { name: "dark" }];
  disableFlag: boolean = false;
  qualityFlag: boolean = false;

  constructor(
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService
  ) {}

  async ngOnInit() {
    await this.getQualityList();
    await this.getPartyList();
    await this.getProcessList();
    await this.getSupplierList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["addedBy"] &&
      changes["addedBy"].previousValue != changes["addedBy"].currentValue
    ) {
      this.disableFlag = false;
      if (
        changes.addedBy.currentValue === "admin" ||
        changes.addedBy.currentValue === "Admin"
      ) {
        this.disableFlag = true;
      }
    }
    if (
      changes["createdBy"] &&
      changes["createdBy"].previousValue != changes["createdBy"].currentValue
    ) {
      this.qualityFlag = false;
      if (changes.createdBy.currentValue) {
        this.qualityFlag = true;
      }
    }
  }

  getQualityList() {
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

  public getPartyList() {
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

  getProcessList() {
    this.loading = true;
    this.shadeService.getAllDyeingProcess().subscribe(
      (data) => {
        if (data["success"]) {
          this.processList = data["data"];
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
      console.log(this.shadeData);
      this.shadeData.shadeDataList = [];
      this.shadeData.shadeDataList.push(new ShadeDataList());
      console.log(this.shadeData);
      this.selectedQualityId.emit((this.shadeData.qualityId = null));
      this.shadeData.qualityName = null;
      this.shadeData.qualityType = null;
      this.loading = false;
    } else {
      this.shadeService.getQualityFromParty(this.shadeData.partyId).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"].qualityDataList;
            this.shadeData.qualityId = this.qualityList[0].qualityId;
            this.shadeData.qualityName = this.qualityList[0].qualityName;
            this.shadeData.qualityType = this.qualityList[0].qualityType;
            this.selectedQualityId.emit(this.shadeData.qualityId);
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
          } else {
            this.selectedQualityId.emit((this.shadeData.qualityId = null));
            this.qualityList = null;
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  qualityIdSelected(event) {
    if (event == undefined) {
      this.shadeData.qualityName = null;
      this.shadeData.qualityType = null;
      this.shadeData.shadeDataList = [];
      this.shadeData.shadeDataList.push(new ShadeDataList());
      this.selectedQualityId.emit((this.shadeData.qualityId = null));
    } else {
      this.qualityList.forEach((element) => {
        if (this.shadeData.qualityId == element.qualityId) {
          this.selectedQualityId.emit(this.shadeData.qualityId);
          this.shadeData.qualityId = element.qualityId;
          this.shadeData.qualityName = element.qualityName;
          this.shadeData.qualityType = element.qualityType;
          this.shadeData.partyId = element.partyId;
          this.shadeData.qualityEntryId = element.id;
          this.wt100m = element.wtPer100m;
        }
      });
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
