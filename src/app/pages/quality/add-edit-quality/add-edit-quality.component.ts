import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-add-edit-quality",
  templateUrl: "./add-edit-quality.component.html",
  styleUrls: ["./add-edit-quality.component.scss"],
})
export class AddEditQualityComponent implements OnInit {

  public errorData: any = (errorData as any).default;

  //form Validation
  formSubmitted: boolean = false;

  //to store UserId
  user: any;

  //to store Quality Data
  qualityList:any;

  addEditQualityForm: FormGroup;

  //to store party info
  party: any[];

  //to store selected QualityId
  currentQualityId:any;
  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private route: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getUpdateData();
    this.getPartyList();
  }

  public getData(){
    this.user = this.commonService.getUser();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      qualityType: new FormControl(null, Validators.required),
      wtPer100m: new FormControl(null, Validators.required),
      qualitySubType: new FormControl(null, Validators.required),
      partyId: new FormControl(null, Validators.required),
      remark: new FormControl(null),
      createdBy: new FormControl(this.user.userId.toString()),
      id: new FormControl(null)
    });
  }

  public getUpdateData(){
    this.currentQualityId = this._route.snapshot.paramMap.get("id");
    if (this.currentQualityId != null) {
      this.qualityService.getQualityById(this.currentQualityId).subscribe(
        (data) => {
          this.qualityList = data["data"];
          this.addEditQualityForm.patchValue({
            qualityId: this.qualityList.qualityId,
            qualityName: this.qualityList.qualityName,
            qualityType: this.qualityList.qualityType,
            wtPer100m: this.qualityList.wtPer100m,
            qualitySubType: this.qualityList.qualitySubType,
            partyId: this.qualityList.partyId,
            remark: this.qualityList.remark,
            createdBy: this.qualityList.createdBy,
            id: this.qualityList.id
          });
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }
  }

  getPartyList() {
    this.partyService.getAllPartyList().subscribe(
      (data) => {
        if(data["success"]){
          if (data["data"] && data["data"].length > 0) {
            this.party = data["data"];
          } else {
            this.toastr.error(errorData.Internal_Error)
          }
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  addQuality() {
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.qualityService.addQuality(this.addEditQualityForm.value).subscribe(
        (data) => {
          if(data['success']){
            this.route.navigate(["/pages/quality"]);
            this.toastr.success(errorData.Add_Success)
          }
          else{
            this.toastr.error(errorData.Add_Error)
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    } 
    else return;
  }

  updateQuality() {
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.qualityService.updateQualityById(this.addEditQualityForm.value).subscribe(
        (data) => {
          if(data["success"]){
            this.route.navigate(["/pages/quality"]);
            this.toastr.success(errorData.Update_Success)
          }
          else{
            this.toastr.error(errorData.Update_Error)
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }
  }
}
