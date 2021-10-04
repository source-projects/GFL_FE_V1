import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  BatchFilterRequest,
  StockShortReport,
} from "../../../@theme/model/stock-batch";
import { AdminService } from "../../../@theme/services/admin.service";
import { ExportService } from "../../../@theme/services/export.service";
import { PartyService } from "../../../@theme/services/party.service";
import { QualityService } from "../../../@theme/services/quality.service";
import { ShadeService } from "../../../@theme/services/shade.service";
import { StockBatchService } from "../../../@theme/services/stock-batch.service";
import * as wijmo from "@grapecity/wijmo";
import { sortBy as _sortBy } from "lodash";

@Component({
  selector: "ngx-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, OnDestroy {
  public stockReportRequest: BatchFilterRequest;
  public maxDate: any;
  public currentDate = new Date();
  public disableButton: boolean = false;
  public shortReport: StockShortReport[] = [];
  public masterList = [];
  userHeadId;
  qualityList: any[];
  qualityEntryId;
  public partyList = [];
  qualityNameList = [];
  partyId;
  qualityName;
  headers;
  private destroy$ = new Subject<void>();
  public formSubmitted: boolean = false;
  totalGrayMeter: number;
  totalGrayWt: number;
  radioArray = [
    { id: 1, name: "Bill Generated" },
    { id: 2, name: "Finish Meter Save" },
    { id: 3, name: "Is Production Planned" },
  ];
  constructor(
    private stockService: StockBatchService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private adminService: AdminService,
    private exportService: ExportService,
    public datepipe: DatePipe
  ) {
    this.stockReportRequest = new BatchFilterRequest();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.maxDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      23,
      59
    );
    this.getAllMasters();
    this.getAllParties();
    this.getQualityList();
    this.getQualityNameList();
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

  getAllMasters() {
    this.partyService
      .getAllMaster()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.masterList = data["data"];
          }
        },
        (error) => {}
      );
  }

  getAllParties() {
    this.partyService
      .getAllPartyList(0, "all")
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.partyList = data["data"];
          }
        },
        (error) => {}
      );
  }

  async getQualityList() {
    return await new Promise((resolve, reject) => {
      this.qualityService
        .getQualityNameData()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"]) {
              this.qualityList = data["data"] || [];
              if (this.qualityList && this.qualityList.length) {
                this.qualityList.forEach((ele) => {
                  ele["qualityEntryId"] = ele.id;
                });
              }
            } else {
            }
          },
          (error) => {}
        );
    });
  }

  getQualityFromParty(event) {
    this.shadeService
      .getQualityFromParty(this.stockReportRequest.partyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"].qualityDataList;
            this.qualityList.forEach((e) => {
              e.partyName = data["data"].partyName;
            });
          } else {
            this.qualityList = null;
          }
        },
        (error) => {}
      );
  }

  getShortReport(form) {
    this.shortReport = [];
    this.formSubmitted = true;

    if (form.valid) {
      this.stockReportRequest.from = moment(
        this.stockReportRequest.from
      ).format();
      this.stockReportRequest.to = moment(this.stockReportRequest.to).format();
      this.stockService
        .getConslidateBatchResponse(this.stockReportRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"] && data["data"]) {
              this.shortReport = data["data"];
              this.shortReport = _sortBy(this.shortReport, "invoiceNo");
              this.printReport(form);
            }
          },
          (error) => {}
        );
    }
  }

  printReport(form) {
    let doc = new wijmo.PrintDocument({
      title: "",
    });
    doc.append(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css">'
    );
    doc.append(
      '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'
    );
    doc.append(
      '<link href="https://cdn.grapecity.com/wijmo/5.latest/styles/wijmo.min.css" rel="stylesheet">'
    );
    let inter1 = setInterval(() => {
      let data1 = <HTMLElement>document.getElementById("shortReport");
      if (data1 != null) {
        doc.append(data1);
        clearInterval(inter1);
        setTimeout(() => {
          doc.print();
          this.shortReport = [];
          this.stockReportRequest = new BatchFilterRequest();
          this.formSubmitted = false;
        }, 1000);
      }
    }, 10);
  }

  downLoadExcel(form) {
    if (form.valid) {
      this.stockReportRequest.from = moment(
        this.stockReportRequest.from
      ).format();
      this.stockReportRequest.to = moment(this.stockReportRequest.to).format();
      this.stockService
        .getConslidateBatchResponse(this.stockReportRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            if (data["success"] && data["data"]) {
              const excelData = data["data"];
              let data1 = [];
              for (let item of excelData) {
                if (
                  item &&
                  item.pendingBatchDataList &&
                  item.pendingBatchDataList.length
                ) {
                  let list = item.pendingBatchDataList.map((m) => ({
                    ...m,
                    partyName: item.partyName,
                    partyCode: item.partyCode,
                  }));
                  data1.push(...list);
                }
              }

              this.headers = [];
              let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
              let headerArray = Object.keys(data1[0]);
              headerArray.forEach((ele, i) => {
                this.headers.push(ele.replace(rex, "$1$4 $2$3$5"));
                this.headers[i] =
                  this.headers[i].charAt(0).toUpperCase() +
                  this.headers[i].slice(1);
              });

              this.exportService.exportExcel(
                data1,
                "Pending Stock Report_" + moment(new Date()).format("ll"),
                this.headers
              );
              this.stockReportRequest = new BatchFilterRequest();
              this.formSubmitted = false;
            }
          },
          (error) => {}
        );
    }
  }
}
