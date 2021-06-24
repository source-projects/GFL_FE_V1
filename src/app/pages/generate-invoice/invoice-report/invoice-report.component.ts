import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  InvoiceDetailedReport,
  InvoiceReportRequest,
  InvoiceShortReport,
} from "../../../@theme/model/invoice";
import { GenerateInvoiceService } from "../../../@theme/services/generate-invoice.service";
import { PartyService } from "../../../@theme/services/party.service";
import * as wijmo from "@grapecity/wijmo";
import { Subject } from 'rxjs';
import { QualityService } from '../../../@theme/services/quality.service';
import { ShadeService } from '../../../@theme/services/shade.service';
import { AdminService } from '../../../@theme/services/admin.service';
import { ExportService } from '../../../@theme/services/export.service';
import { sortBy as _sortBy } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: "ngx-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.scss"],
})
export class InvoiceReportComponent implements OnInit, OnDestroy {
  public invoiceReportRequest: InvoiceReportRequest;
  public maxDate: any;
  public currentDate = new Date();
  public disableButton: boolean = false;
  public shortReport: InvoiceShortReport[] = [];
  public detailedReport: InvoiceDetailedReport[] = [];
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
  totalFinishedMeter: number;
  totalGrayMeter: number;
  totalAmount: number;

  constructor(
    private invoiceService: GenerateInvoiceService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private adminService: AdminService,
    private exportService : ExportService
  ) {
    this.invoiceReportRequest = new InvoiceReportRequest();
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
    this.partyService.getAllMaster().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.masterList = data["data"];
        }
      },
      (error) => { }
    );
  }

  getAllParties() {
    this.partyService.getAllPartyList(0, "all").pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
      },
      (error) => { }
    );
  }

  async getQualityList() {
    return await new Promise((resolve, reject) => {
      this.qualityService.getQualityNameData().pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.qualityList = data["data"] || [];
            if (this.qualityList && this.qualityList.length) {
              this.qualityList.forEach(ele => {
                ele['qualityEntryId'] = ele.id;
              })
            }
          } else {
          }
        },
        (error) => {
        }
      );
    });

  }


  getQualityFromParty(event) {

    this.shadeService.getQualityFromParty(this.invoiceReportRequest.partyId).pipe(takeUntil(this.destroy$)).subscribe(
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
      (error) => {
      }
    );
  }

  getShortReport(form) {
    this.totalAmount = 0;
    this.totalFinishedMeter = 0;
    this.totalGrayMeter = 0;
    this.shortReport = [];
    this.formSubmitted = true;

    if (form.valid) {
      this.invoiceReportRequest.from = moment(this.invoiceReportRequest.from).format(); 
      this.invoiceReportRequest.to = moment(this.invoiceReportRequest.to).format(); 
      this.invoiceService
        .getShortInvoiceReport(this.invoiceReportRequest)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.shortReport = data["data"];
              this.shortReport.forEach((element) => {
                element.consolidatedBillDataList.forEach(billData => {
                  this.totalFinishedMeter += billData.totalFinishMtr;
                  this.totalGrayMeter += billData.totalMtr;
                  this.totalAmount += billData.amt
                });
              });
              this.shortReport = _sortBy(this.shortReport, 'invoiceNo');
              this.printReport(form);
            }
          },
          (error) => { }
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
          this.detailedReport = [];
          this.invoiceReportRequest = new InvoiceReportRequest();
          this.formSubmitted = false;
        }, 1000)
      }
    }, 10);
  }

  downLoadExcel(form){

    if (form.valid) {
      this.invoiceService
        .getShortInvoiceReport(this.invoiceReportRequest)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              let excelData = data["data"];
              this.headers = Object.keys(excelData[0].consolidatedBillDataList[0]);
              let list = [];
              excelData.forEach(ele=>{
                list.push(ele.consolidatedBillDataList[0])
              })
              this.exportService.exportExcel(list,"Invoice Report",this.headers)
            }
          },
          (error) => { }
        );
    }


  }
}
