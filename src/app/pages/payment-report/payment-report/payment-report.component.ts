import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
import { sortBy as _sortBy } from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '../../../@theme/services/report.service';

import { SalesReportRequest } from '../../../@theme/model/invoice';
import { AdminService } from '../../../@theme/services/admin.service';
import { ExportService } from '../../../@theme/services/export.service';
import { GenerateInvoiceService } from '../../../@theme/services/generate-invoice.service';
import { PartyService } from '../../../@theme/services/party.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ShadeService } from '../../../@theme/services/shade.service';

@Component({
  selector: 'ngx-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent implements OnInit {

  public invoiceReportRequest: SalesReportRequest;
  public maxDate: any;
  public currentDate = new Date();
  public disableButton: boolean = false;
  public masterList = [];
  userHeadId;
  qualityList: any[];
  qualityEntryId;
  public partyList = [];
  qualityNameList = [];
  shortReport = [];
  partyId;
  qualityName;
  headers;
  reportType = null;
  private destroy$ = new Subject<void>();
  public formSubmitted: boolean = false;
  totalFinishedMeter: number;
  totalGrayMeter: number;
  totalAmount: number;

  reportList = [
    { name: "Sales Report", value: "salesReport" },
    { name: "Sales Pending Report", value: "salesPendingReport" },
  ];

  constructor(
    private invoiceService: GenerateInvoiceService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private adminService: AdminService,
    private exportService: ExportService,
    private reportService: ReportService,
    public datepipe: DatePipe,
    public toaster: ToastrService
  ) {
    this.invoiceReportRequest = new SalesReportRequest();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {

    this.getReportList()
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


  getReportList() {
    this.reportService
      .getAllReportType("paymentTerm")
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.reportList = data["data"];
          }
        },
        (error) => { }
      );
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
        (error) => { }
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

  headerArray = [];
  headerKeys = [];
  copyHeaderKeys = [];
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
              if (this.shortReport && this.shortReport.length) {
                let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
                  this.copyHeaderKeys = Object.keys(this.shortReport[0].consolidatedBillDataForPDFS[0]);
                  let finalHeader = [];
                  this.copyHeaderKeys.forEach((ele, i) => {
                    finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
                    finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
                  });
                  this.copyHeaderKeys = this.copyHeaderKeys.filter(v => v !== "List");
                  this.headerKeys = [...this.copyHeaderKeys];
                if (this.shortReport[0].consolidatedBillDataList && this.shortReport[0].consolidatedBillDataList.length) {
                  let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
                  this.headerArray = Object.keys(this.shortReport[0].consolidatedBillDataForPDFS[0]);
                  let finalHeader = [];
                  this.headerArray.forEach((ele, i) => {
                    finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
                    finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
                  });
                  this.headers = [...finalHeader];
                  this.shortReport.forEach((element) => {
                    element.consolidatedBillDataList.forEach(billData => {
                      this.totalFinishedMeter += billData.totalFinishMtr;
                      this.totalGrayMeter += billData.totalMtr;
                      this.totalAmount += billData.taxAmt;
                    });
                  });

                }

                this.shortReport = _sortBy(this.shortReport, 'invoiceNo');
                this.printReport(form);
              }
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
          this.invoiceReportRequest = new SalesReportRequest();
          this.formSubmitted = false;
        }, 1000)
      }
    }, 10);
  }

  downLoadExcel(form) {

    this.formSubmitted = true;
    if (this.reportType) {

      if (form.valid) {
        if (this.invoiceReportRequest.from)
          this.invoiceReportRequest.from = moment(this.invoiceReportRequest.from).format();

        if (this.invoiceReportRequest.to)
          this.invoiceReportRequest.to = moment(this.invoiceReportRequest.to).format();


        this.invoiceService
          .getShortInvoiceReport(this.invoiceReportRequest)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                let excelData = data["data"];
                this.headers = Object.keys(excelData);
                this.formSubmitted = false;
                this.headers.forEach(ele => {
                  ele.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
                });
                this.exportService.exportExcel(excelData, "Sales Report", this.headers)
              }
            },
            (error) => { }
          );
      }
    }
    else {
      this.toaster.error("Select Report Type");
      this.formSubmitted = false;
    }


  }

  apiObject = {
    reportId: '',
    apiForExcel: '',
    apiForReport: ''
  }
  reportName;
  selectedReport(value) {
    this.reportName = value.name;

    this.apiObject = {
      reportId: '',
      apiForExcel: '',
      apiForReport: ''
    }
    this.apiObject.reportId = value.id;
    this.apiObject.apiForExcel = value.urlForExcel;
    this.apiObject.apiForReport = value.urlForReport;
    this.invoiceReportRequest.reportType = value.id;
  }

}
