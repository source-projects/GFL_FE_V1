import { Component, OnInit } from "@angular/core";
import { ShadeService } from "../../@theme/services/shade.service";
import { PartyService } from "../../@theme/services/party.service";
import { QualityService } from "../../@theme/services/quality.service";
import { ReportService } from "../../@theme/services/report.service";

@Component({
  selector: "ngx-generate-report",
  templateUrl: "./generate-report.component.html",
  styleUrls: ["./generate-report.component.scss"],
})
export class GenerateReportComponent implements OnInit {
  partyName: any;
  partyId: any;
  qualityControlId: any;
  qualityId: any;
  qualityName: any;
  batchId;
  partyList: any[];
  qualityList: any[];
  colorTone = "#40f0f0";
  loading: boolean = false;
  partySelected: boolean = false;
  reportData: any[];
  planned = [];
  notPlanned = [];
  finishedMeter = [];
  Production = true;
  notProduction = true;
  finished = true;
  constructor(
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.getQualityList();
    this.getPartyList();
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

  checkPartySelected() {
    if (this.partyId) {
      this.partySelected = true;
    } else {
      this.partySelected = false;
    }
  }

  getReportData() {
    this.planned = [];
    this.finishedMeter = [];
    this.notPlanned = [];
    this.reportService
      .getPartyQualityReportData(this.partyId, this.qualityControlId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.reportData = data["data"].batchDetailList;
            if(this.batchId){
              let data = [];
              this.reportData.forEach((ele) => {
                if(this.batchId == ele.batchId){
                  data.push(ele);
                }
              })
              this.reportData = data;
            }
            this.reportData.forEach(ele => {
              if(ele.isFinishMtrSave){
                this.finishedMeter.push(ele);
              }
              else if(ele.isProductionPlanned){
                this.planned.push(ele);
              }else {
                this.notPlanned.push(ele);
              }
            })
          }
        },
        (error) => {}
      );
  }

  getQualityFromParty(event) {
    this.loading = true;
    this.qualityId = null;
    this.checkPartySelected();
    if (event == undefined) {
      this.getPartyList();
      this.getQualityList();
      this.qualityId = null;
      this.qualityControlId = null;
      this.partyId = null;
      this.partyName = null;
      this.getReportData();
      this.loading = false;
    } else {
      this.shadeService.getQualityFromParty(this.partyId).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"].qualityDataList;
            
            if(this.partySelected){
              this.qualityControlId = "";
            }
            this.getReportData();
            this.loading = false;
          } else {
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
      this.qualityName = null;
      this.qualityId = null;
      this.qualityControlId = null;
      this.partyName = null;
      this.getQualityList();
      this.getReportData();
      this.checkPartySelected();
    } else {
      this.qualityList.forEach((element) => {
        if (this.qualityId == element.qualityId) {
          this.qualityId = element.qualityId;
          this.qualityControlId = element.qualityEntryId;
          this.qualityName = element.qualityName;
          this.partyId = element.partyId;
        }
      });
      this.getReportData();
      this.checkPartySelected();
    }
  }

  batchIdSelected(event){
    if (event == undefined) {
      this.batchId = null;
     
    } 

      this.getReportData();
      this.checkPartySelected();
      
      this.Production = true;
      this.notProduction = true;
      this.finished = true;

  }
}
