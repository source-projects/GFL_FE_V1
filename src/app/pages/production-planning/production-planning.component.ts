import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as errorData from "app/@theme/json/error.json";
import {ProductionPlanning} from "app/@theme/model/production-planning";
import { CommonService } from "app/@theme/services/common.service";
import { PartyService } from "app/@theme/services/party.service";
import { QualityService } from "app/@theme/services/quality.service";
import { StockBatchService } from 'app/@theme/services/stock-batch.service';
import { ProgramService } from "app/@theme/services/program.service";

import { ToastrService } from "ngx-toastr";
import { AddShadeComponent } from './add-shade/add-shade.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-production-planning',
  templateUrl: './production-planning.component.html',
  styleUrls: ['./production-planning.component.scss']
})
export class ProductionPlanningComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  user: any;
  userHead:any;
  public loading = false;
  formSubmitted: boolean = false;
  batch:any;
p_id:any;
  partyList: any[];
  qualityList: any[];
  allBatchList: any[];

  productionPlanning: ProductionPlanning = new ProductionPlanning();
  
  programValues: any;
  qualityList1: any;


  constructor(
    private partyService: PartyService,
    private _route: ActivatedRoute,
    private qualityService: QualityService,
    private route: Router,
    private commonService: CommonService,
    private toastr: ToastrService,
    private stockBatchService: StockBatchService,
    private programService: ProgramService,
    private modalService: NgbModal,


  ) { }

  ngOnInit(): void {
    this.getCurrentId();
    this.getPartyList();
    this.getQualityList();
    this.getAllBatchData();

  }

  getCurrentId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }

  getPartyList() {
    this.loading = true;
    this.partyService.getAllPartyNameList().subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
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

  public getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
          console.log(this.qualityList);
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

  public getAllBatchData(){
    this.stockBatchService.getAllBatch().subscribe(
      (data) => {
        if (data["success"]) {
          this.allBatchList = data["data"];
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
    }

    public partySelected(event){
      this.loading = true;
      if (event != undefined) {
        if (this.productionPlanning.partyId) {
          this.programService
            .getQualityByParty(this.productionPlanning.partyId)
            .subscribe(
              (data) => {
                if (data["success"]) {
                  this.qualityList = data["data"].qualityDataList;
                 
                } else {
                  this.productionPlanning.qualityId = null;
                  this.qualityList = [];
                }
                this.loading = false;
              },
              (error) => {
                this.qualityList = [];
                this.loading = false;
              }
            );
        }
      } else {
        this.productionPlanning.partyId = null;
        this.productionPlanning.qualityId = null;
       
        this.getPartyList();
        this.getQualityList();
        this.getAllBatchData();
        this.loading = false;
      }


  }

  public qualitySelected(event) {
    this.loading = true;
    if (event != undefined) {
      if (this.productionPlanning.qualityId) {
        this.qualityList.forEach((e)=>{
        
          if(e.qualityId==this.productionPlanning.qualityId){
          this.p_id=e.partyId;
          this.productionPlanning.partyId=e.partyName;
          this.productionPlanning.qualityEntryId=e.qualityEntryId;
        }
      });}
    }
    if (event != undefined) {
    this.stockBatchService
    .getBatchById(this.p_id,this.productionPlanning.qualityEntryId)
    .subscribe(
      (data) => {
        if (data["success"]) {
          this.allBatchList = data["data"];
          console.log(this.allBatchList);
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
    else{
      this.getAllBatchData();
    }

  }

public onBatchSelect(event){
  let batch_id = event.target.value;
  let b_controlId;
  this.allBatchList.forEach((e)=>{
    if(e.batchId==batch_id){
      b_controlId=e.controlId;
    }
  });
  const modalRef = this.modalService.open(AddShadeComponent);
     modalRef.componentInstance.party = this.p_id;
     modalRef.componentInstance.quality = this.productionPlanning.qualityEntryId;
     modalRef.componentInstance.batch = batch_id;
     modalRef.componentInstance.batchControl = b_controlId;


}


     




}


