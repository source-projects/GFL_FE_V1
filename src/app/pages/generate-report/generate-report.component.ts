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
  partyList: any[];
  qualityList: any[];
  colorTone = "#40f0f0";
  loading: boolean = false;
  partySelected: boolean = false;
  reportData: any[];
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
    this.reportService
      .getPartyQualityReportData(this.partyId, this.qualityControlId)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.reportData = data["data"].batchDetailList;
          }
        },
        (error) => {}
      );
  }

  lotNoEntered(event){
    console.log(event)
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
            // this.qualityList.forEach((e) => {
            //   e.partyName = data["data"].partyName;
            //   if (this.partyId == e.partyId) {
            //     this.partyName = e.partyName;
            //   }
            //   if(this.partySelected){
            //     this.qualityControlId = null;
            //   }
            //   this.getReportData();
            //   this.loading = false;
            // });
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
      console.log(this.qualityList);
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
}
