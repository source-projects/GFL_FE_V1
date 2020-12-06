import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FinishedMeter } from 'app/@theme/model/finished-meter';
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from 'app/@theme/services/party.service';
import { QualityService } from 'app/@theme/services/quality.service';
import { FinishedMeterService } from 'app/@theme/services/finished-meter.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from 'app/@theme/json/error.json';
import { FinishedMeterModule } from '../finished-meter.module';

@Component({
  selector: "ngx-add-edit-finished-meter",
  templateUrl: "./add-edit-finished-meter.component.html",
  styleUrls: ["./add-edit-finished-meter.component.scss"],
})
export class AddEditFinishedMeterComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  currentFinishedMeter;
  user;
  formSubmitted = false;
  userHead;
  masterList;
  partyList;
  qualityList;
  finishedMeterForm: FinishedMeter = new FinishedMeter();
  constructor(
    private commonService: CommonService,
    private route: Router,
    private partyService:PartyService,
    private qualityService:QualityService,
    private _route: ActivatedRoute,
    private toastr:ToastrService,
    private finishedMeterService: FinishedMeterService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getAllParty();
    this.getAllQuality();
    this.getAllMasters();
    if(this.currentFinishedMeter != null)
      this.getUpdateData()
  }

  getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentFinishedMeter = this._route.snapshot.paramMap.get("id");
  }

  getAllParty(){
    this.partyService.getAllPartyWithNameOnly().subscribe(
      data=>{
        if(data['success']){
          this.partyList = data['data'];
        }
        else
          this.toastr.error(data['msg'])
      },
      error=>{
        this.toastr.error(errorData.Internal_Error)
      }
    )
  }

  getAllQuality(){
    this.qualityService.getAllQualityWithNameOnly().subscribe(
      data=>{
        if(data['success']){
          this.qualityList = data['data'];
        }
        else
          this.toastr.error(data['msg'])
      },
      error=>{
        this.toastr.error(errorData.Internal_Error)
      }
    )
  }

  getAllMasters(){
    this.finishedMeterService.getAllUserHeads().subscribe(
      data=>{
        if(data['success']){
          this.masterList = data['data']
        }else
          this.toastr.error(data['msg'])
      },
      error=>{
          this.toastr.error(errorData.Internal_Error)
      }
    )
  }

  getUpdateData(){
    
  }

  enableQuality($event){

  }

  addFinishedMeter() {}

  updateFinishedMeter() {}
}
