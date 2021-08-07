import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router"; 
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { AdminService } from "../../../@theme/services/admin.service";
import { CommonService } from "../../../@theme/services/common.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ShadeService } from "../../../@theme/services/shade.service";

@Component({
  selector: "ngx-add-edit-quality",
  templateUrl: "./add-edit-quality.component.html",
  styleUrls: ["./add-edit-quality.component.scss"],
})
export class AddEditQualityComponent implements OnInit, OnDestroy {
  public loading = false;
  public disableButton = false;
  public disableQualityId = true;
  public errorData: any = (errorData as any).default;

  //form Validation
  formSubmitted: boolean = false;

  //to store UserId
  user: any;

  //to store Quality Data
  qualityList: any;
  qualityNameList: any[];
  processList = [];
  addEditQualityForm: FormGroup;

  //to store party info
  party: any[];
  userHead;
  qulityIdExist: boolean = false;
  unit = [{ name: "meter" }, { name: "weight" }];

  //to store selected QualityId
  currentQualityId: any;

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private adminService: AdminService,
    private route: Router,
    private toastr: ToastrService,
    private shadeService: ShadeService,
  ) {}

  async ngOnInit() {
    this.getData();
    this.getPartyList();
    this.getQualityNameList();
    this.getProcessList();
    await this.getUpdateData();
  }

  getProcessList() {
    this.loading = true;
    this.shadeService.getAllDyeingProcess().pipe(takeUntil(this.destroy$)).subscribe(
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

  getQualityNameList() {
    this.adminService
      .getAllQualityData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityNameList = data["data"];
          }
        },
        (error) => {}
      );
  }
  checkQulityId() {
    this.qulityIdExist = false;
    if (this.addEditQualityForm.get("qualityId").value) {
      let id = 0;
      if (this.addEditQualityForm.get("id").value)
        id = this.addEditQualityForm.get("id").value;
      this.qualityService
        .getQulityIdExist(
          this.addEditQualityForm.get("qualityId").value,
          this.addEditQualityForm.get("partyId").value,
          id
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.qulityIdExist = data["data"];
          },
          (error) => {}
        );
    }
  }
  numberOnly(event) {
    return event.charCode == 8 || event.charCode == 0 || event.charCode == 13
      ? null
      : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46;
  }

  calculateMtrPerKg(event) {
    let value = event.target.value;
    this.addEditQualityForm.patchValue({
      mtrPerKg: (100 / value).toFixed(3),
    });
  }

  calculateWtPerMtr(event) {
    let value = event.target.value;
    this.addEditQualityForm.patchValue({
      wtPer100m: (100 / value).toFixed(3),
    });
  }

  public getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null),
      qualityNameId: new FormControl(null, Validators.required),
      qualityType: new FormControl("Fabric", Validators.required),
      unit: new FormControl(null, Validators.required),
      billingUnit: new FormControl(null, Validators.required),
      wtPer100m: new FormControl(null, Validators.required),
      mtrPerKg: new FormControl(null, Validators.required),
      hsn: new FormControl(998821, Validators.required),
      partyId: new FormControl(null, Validators.required),
      rate: new FormControl(null, Validators.required),
      processId:new FormControl(null,Validators.required),
      remark: new FormControl(null),
      partyCode: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      createdDate: new FormControl(null),
      updatedDate: new FormControl(null),
      userHeadId: new FormControl(null),
      id: new FormControl(null),
    });
  }

  public getUpdateData() {
    this.loading = true;
    this.currentQualityId = this._route.snapshot.paramMap.get("id");
    if (this.currentQualityId != null) {
      this.qualityService
        .getQualityById(this.currentQualityId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.qualityList = data["data"];
            this.addEditQualityForm.patchValue({
              qualityId: this.qualityList.qualityId,
              qualityName: this.qualityList.qualityName,
              qualityNameId: this.qualityList.qualityNameId,
              rate: this.qualityList.rate,
              processId:this.qualityList.processId,
              qualityType: this.qualityList.qualityType,
              unit: this.qualityList.unit,
              hsn: this.qualityList.hsn,
              billingUnit: this.qualityList.billingUnit,
              wtPer100m: this.qualityList.wtPer100m.toFixed(3),
              mtrPerKg: this.qualityList.mtrPerKg.toFixed(3),
              partyCode: this.qualityList.partyCode,
              partyId: this.qualityList.partyId,
              remark: this.qualityList.remark,
              createdBy: this.qualityList.createdBy,
              createdDate: this.qualityList.createdDate,
              updatedDate: this.qualityList.updatedDate,
              updatedBy: this.qualityList.updatedBy,
              id: this.qualityList.id,
            });
            this.setPartyCode(this.qualityList.partyId);

            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
    }
  }

  getPartyList() {
    this.loading = true;
    this.partyService
      .getAllPartyNameList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.party = data["data"];
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
  setPartyCode(event) {
    if (event) {
      this.disableQualityId = false;
      this.checkQulityId();
      let list = this.party.filter(f => f.id == this.addEditQualityForm.get('partyId').value);
      if(list && list.length){
        this.addEditQualityForm.get('partyCode').setValue(list[0].partyCode)
      }
    } else {
      this.disableQualityId = true;
      this.addEditQualityForm.get('partyCode').setValue("");
      // this.addEditQualityForm.get("qualityId").setValue("");
    }
  }

  reset() {
    this.addEditQualityForm.reset();
    this.formSubmitted = false;
    this.addEditQualityForm.controls["qualityType"].reset("Fabric");
  }
  setQualityName(id) {
    this.qualityNameList.forEach((element) => {
      if (element.id == id) {
        this.addEditQualityForm.value.qualityName = element.qualityName;
      }
    });
  }
  addQuality() {
    this.disableButton = true;

    this.formSubmitted = true;
    if (this.addEditQualityForm.valid && !this.qulityIdExist) {
      this.addEditQualityForm.value.createdBy = this.user.userId;
      this.addEditQualityForm.value.userHeadId = this.userHead.userHeadId;
      this.addEditQualityForm.value.rate = Number(
        this.addEditQualityForm.value.rate
      );
      this.setQualityName(this.addEditQualityForm.value.qualityNameId);
      this.qualityService
        .addQuality(this.addEditQualityForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.reset();
              this.disableButton = false;
              this.toastr.success(data["msg"]);
              this.getData();
            } else {
              this.toastr.error(data["msg"]);
            }
            this.disableButton = false;
          },
          (error) => {
            this.disableButton = false;
          }
        );
    } else {
      this.disableButton = false;
      return;
    }
  }

  updateQuality() {
    this.disableButton = true;

    this.loading = true;
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid && !this.qulityIdExist) {
      this.addEditQualityForm.value.updatedBy = this.user.userId;
      this.setQualityName(this.addEditQualityForm.value.qualityNameId);
      this.qualityService
        .updateQualityById(this.addEditQualityForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.route.navigate(["/pages/quality"]);
            } else {
              this.toastr.error(data["msg"]);
            }
            this.disableButton = false;
            this.loading = false;
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
            this.loading = false;
            this.disableButton = false;
          }
        );
    }
    this.disableButton = false;
  }

  tableChange(event) {
    if (event === "view table") {
      this.route.navigate(["/pages/quality/view"]);
    }
  }
}
