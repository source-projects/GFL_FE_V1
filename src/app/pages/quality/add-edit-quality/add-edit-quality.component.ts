import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "../../../@theme/json/error.json";
import { CommonService } from "../../../@theme/services/common.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ToastRef, ToastrService } from "ngx-toastr";
import { AdminService } from "../../../@theme/services/admin.service";

@Component({
  selector: "ngx-add-edit-quality",
  templateUrl: "./add-edit-quality.component.html",
  styleUrls: ["./add-edit-quality.component.scss"],
})
export class AddEditQualityComponent implements OnInit {
  public loading = false;
  public disableButton = false;
  public errorData: any = (errorData as any).default;

  //form Validation
  formSubmitted: boolean = false;

  //to store UserId
  user: any;

  //to store Quality Data
  qualityList: any;
  qualityNameList: any[];
  addEditQualityForm: FormGroup;

  //to store party info
  party: any[];
  userHead;
  qulityIdExist: boolean = false;
  unit = [{ name: "meter" }, { name: "weight" }];

  //to store selected QualityId
  currentQualityId: any;
  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private adminService: AdminService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.getData();
    this.getPartyList();
    this.getQualityNameList();
    await this.getUpdateData();
  }

  getQualityNameList() {
    this.adminService.getAllQualityData().subscribe(
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
        .getQulityIdExist(this.addEditQualityForm.get("qualityId").value, id)
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
  public getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null),
      qualityNameId: new FormControl(null, Validators.required),
      qualityType: new FormControl("Fabric", Validators.required),
      unit: new FormControl(null, Validators.required),
      wtPer100m: new FormControl(null, Validators.required),
      partyId: new FormControl(null, Validators.required),
      rate: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      partyCode: new FormControl(null),
      createdBy: new FormControl(null),
      updatedBy: new FormControl(null),
      userHeadId: new FormControl(null),
      id: new FormControl(null),
    });
  }

  public getUpdateData() {
    this.loading = true;
    this.currentQualityId = this._route.snapshot.paramMap.get("id");
    if (this.currentQualityId != null) {
      this.qualityService.getQualityById(this.currentQualityId).subscribe(
        (data) => {
          this.qualityList = data["data"];
          this.addEditQualityForm.patchValue({
            qualityId: this.qualityList.qualityId,
            qualityName: this.qualityList.qualityName,
            qualityNameId: this.qualityList.qualityNameId,
            rate: this.qualityList.rate,
            qualityType: this.qualityList.qualityType,
            unit: this.qualityList.unit,
            wtPer100m: this.qualityList.wtPer100m,
            partyId: this.qualityList.partyId,
            remark: this.qualityList.remark,
            createdBy: this.qualityList.createdBy,
            id: this.qualityList.id,
          });
          this.setPartyCode();

          this.loading = false;
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error)
          this.loading = false;
        }
      );
    }
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(data['msg'])
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
        this.loading = false;
      }
    );
  }
  setPartyCode() {
    //setPartyCode...
    let p = this.party.filter(
      (party1) => party1.id === this.addEditQualityForm.get("partyId").value
    );
    this.addEditQualityForm.patchValue({
      partyCode: p[0].partyCode,
    });
  }

  reset() {
    this.addEditQualityForm.reset();
    this.formSubmitted = false;
    this.addEditQualityForm.controls["qualityType"].reset("Fabric");
  }
  setQualityName(id) {
    console.log(id);
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
      this.qualityService.addQuality(this.addEditQualityForm.value).subscribe(
        (data) => {
          if (data["success"]) {
            this.reset();
            this.disableButton = false;
            this.toastr.success(data["msg"]);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
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
}
