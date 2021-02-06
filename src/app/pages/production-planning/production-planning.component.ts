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
import { ShadeService } from 'app/@theme/services/shade.service';


@Component({
  selector: 'ngx-production-planning',
  templateUrl: './production-planning.component.html',
  styleUrls: ['./production-planning.component.scss']
})
export class ProductionPlanningComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  user: any;
  userHead: any;
  public loading = false;
  formSubmitted: boolean = false;
  batch: any;
  p_id: any;
  partyList: any[];
  qualityList: any[];
  batchListByParty: any[];
  batchListParty: any[];
  allBatchList: any[];
  productionPlanning: ProductionPlanning = new ProductionPlanning();
  batchList = [];
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
    private shadeService: ShadeService


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
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  public getQualityList() {
    this.loading = true;
    this.qualityService.getQualityNameData().subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"]
          this.batchListByParty = data["data"];
          if (this.allBatchList != null || this.allBatchList != undefined) {
            this.allBatchList.forEach(element => {
              if (element.productionPlanned == false) {
                this.batchListParty.push(element);
              }
            });
          }
          this.batchListByParty = this.batchListParty;
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

  public getAllBatchData() {
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

  public partySelected(event) {
    this.loading = true;
    this.productionPlanning.qualityId = null;
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
    }
    if (event != undefined) {
      this.batchList = [];
      if (this.productionPlanning.partyId) {
        this.programService
          .getBatchByParty(this.productionPlanning.partyId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.allBatchList = data["data"];
                this.allBatchList.forEach(element => {
                  if (element.productionPlanned == false) {
                    this.batchList.push(element);
                  }
                });
                this.allBatchList = this.batchList;

                this.loading = false;
              } else {
                this.allBatchList = [];
                this.loading = false;
              }
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
      }
    }

    else {
      this.allBatchList = [];
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
        this.qualityList.forEach((e) => {

          if (e.qualityId == this.productionPlanning.qualityId) {
            this.p_id = e.partyId;
            this.productionPlanning.partyId = e.partyName;
            this.productionPlanning.qualityEntryId = e.id || e.qualityEntryId;
          }
        });
      }
      if (this.productionPlanning.qualityEntryId) {
        this.batchList = [];
        this.programService
          .getBatchByQuality(this.productionPlanning.qualityEntryId)
          .subscribe(
            (data) => {
              if (data["success"]) {
                this.allBatchList = data["data"];
                this.allBatchList.forEach(element => {
                  if (element.productionPlanned == false) {
                    this.batchList.push(element);
                  }
                });
                this.allBatchList = this.batchList;

                this.loading = false;
              } else {
                this.allBatchList = [];
                this.loading = false;
              }
              this.loading = false;
            },
            (error) => {
              this.loading = false;
            }
          );
      }
     
    }
  }

  filter(event:any){
    
    let filterNumber = event.target.value;
    if(filterNumber == ""){
      this.getAllBatchData();
    }
    else
    {
      let data = this.allBatchList.filter(ele=>{
        return ele.batchId == filterNumber;
      });
      this.allBatchList = data; 
    }
   
  }


  public onBatchSelect(batch_id) {
    let b_controlId;
    let party, quality;
    this.allBatchList.forEach((e) => {
      if (e.batchId == batch_id) {
        b_controlId = e.controlId;
        party = e.partyId;
        quality = e.qualityEntryId;
      }
    });

    const modalRef = this.modalService.open(AddShadeComponent);

    if ((this.productionPlanning.partyId && this.productionPlanning.qualityId) == undefined) {
      modalRef.componentInstance.party = party;
      modalRef.componentInstance.quality = quality;
    }
    else {
      modalRef.componentInstance.party = this.p_id;
      modalRef.componentInstance.quality = this.productionPlanning.qualityEntryId;
    }
    modalRef.componentInstance.batch = batch_id;
    modalRef.componentInstance.batchControl = b_controlId;
    // modalRef.result.then(
    //   (result) => {
    //     this.route.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //       //this.route.navigate(['/pages/production-planning']);
    //     });
    //   }
    // )
  }
}


