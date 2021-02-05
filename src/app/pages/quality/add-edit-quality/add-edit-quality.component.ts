import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import { ToastRef, ToastrService } from 'ngx-toastr';

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

  addEditQualityForm: FormGroup;

  //to store party info
  party: any[];
  userHead;
  qulityIdExist:boolean=false;
  unit=[{name:'meter'},{name:'weight'}];
  
  //to store selected QualityId
  currentQualityId: any;
  constructor(
    private _route: ActivatedRoute,
    private partyService: PartyService,
    private commonService: CommonService,
    private qualityService: QualityService,
    private route: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getUpdateData();
    this.getPartyList();
  }
  resetFlag($event){
    this.qulityIdExist=false;
  }
  
  checkQulityId() {
    this.qualityService.getQulityIdExist(this.addEditQualityForm.get("qualityId").value).subscribe(
      data=>{
        this.qulityIdExist=data['data'];
      },
      error=>{
      }
    )
  }

  public getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.addEditQualityForm = new FormGroup({
      qualityId: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
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
      id: new FormControl(null)
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
            rate:this.qualityList.rate,
            qualityType: this.qualityList.qualityType,
            unit: this.qualityList.unit,
            wtPer100m: this.qualityList.wtPer100m,
            partyId: this.qualityList.partyId,
            remark: this.qualityList.remark,
            createdBy: this.qualityList.createdBy,
            id: this.qualityList.id
          });
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
    this.partyService.getAllPartyList(0,"all").subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
          this.loading = false;
        }
        else {
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
  setPartyCode(){
    if(this.addEditQualityForm.get('partyId').value!=null){
      this.party.forEach(element => {
        if(this.addEditQualityForm.get('partyId').value==element.id){
          this.addEditQualityForm.patchValue({
            partyCode:element.partyCode,
          })
        }
      });
    }
  }

  addQuality() {
    this.disableButton=true;

    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.addEditQualityForm.value.createdBy = this.user.userId;
      this.addEditQualityForm.value.userHeadId = this.userHead.userHeadId;
      this.qualityService.addQuality(this.addEditQualityForm.value).subscribe(
        (data) => {
          if (data['success']) {
            this.route.navigate(["/pages/quality"]);
            this.toastr.success(errorData.Add_Success);
          }
          else {
            this.toastr.error(errorData.Add_Error)
            
          }
          this.disableButton=false;

        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
          this.disableButton=false;

        }
      );
    }
    else 
    {
      this.disableButton=false;
      return;
    }
  }

  updateQuality() {
    this.disableButton=true;

    this.loading = true;
    this.formSubmitted = true;
    if (this.addEditQualityForm.valid) {
      this.addEditQualityForm.value.updatedBy = this.user.userId;
      this.qualityService.updateQualityById(this.addEditQualityForm.value).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/quality"]);
            this.toastr.success(errorData.Update_Success)
          }
          else {
            this.toastr.error(errorData.Update_Error)
            
          }
          this.loading = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
          this.loading = false;
          this.disableButton=false;
        }
      );
    }
    this.disableButton=false;

  }
}
