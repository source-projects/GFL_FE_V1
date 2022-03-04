import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as wijmo from '@grapecity/wijmo';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SalesReportRequest } from '../../../@theme/model/invoice';
import { AdminService } from '../../../@theme/services/admin.service';
import { ExportService } from '../../../@theme/services/export.service';
import { GenerateInvoiceService } from '../../../@theme/services/generate-invoice.service';
import { PartyService } from '../../../@theme/services/party.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ReportService } from '../../../@theme/services/report.service';
import { ShadeService } from '../../../@theme/services/shade.service';


@Component({
  selector: 'ngx-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss']
})
export class AllReportsComponent implements OnInit {

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
  allReports = [];
  moduleType = null;
  allModules = [];
  private destroy$ = new Subject<void>();
  public formSubmitted: boolean = false;
  totalFinishedMeter: number;
  totalGrayMeter: number;
  totalAmount: number;

  options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

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
    this.getAllModules();

  }

  getAllModules() {
    this.reportService
      .getAllModules()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.allModules = data["data"];
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
  greigrFlag = false;
  getShortReport(form) {
    this.greigrFlag = true;
    this.totalAmount = 0;
    this.totalFinishedMeter = 0;
    this.totalGrayMeter = 0;
    this.shortReport = [];
    this.formSubmitted = true;

    if (form.valid) {
      this.invoiceReportRequest.from = moment(this.invoiceReportRequest.from).format();
      this.invoiceReportRequest.to = moment(this.invoiceReportRequest.to).format();
      this.reportService
        .getReportForPdf(this.apiObject, this.invoiceReportRequest)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.shortReport = data["data"];

              if (this.reportName == 'Fabric In Detailed downloadBase64') {
                this.onClickDownloadPdf(this.shortReport, 'Fabric In Detailed')
              }

              // if (this.shortReport && this.shortReport.length) {
              //   let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
              //     this.copyHeaderKeys = Object.keys(this.shortReport[0]);
              //     let finalHeader = [];
              //     this.copyHeaderKeys.forEach((ele, i) => {
              //       finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
              //       finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
              //     });
              //     finalHeader = finalHeader.filter(v => v !== "List");
              //     this.copyHeaderKeys = this.copyHeaderKeys.filter(v => v !== "list");
              //     this.headerKeys = [...finalHeader];
              //   if (this.shortReport[0].list && this.shortReport[0].list.length) {
              //     let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
              //     this.headerArray = Object.keys(this.shortReport[0].list[0]);
              //     let finalHeader = [];
              //     this.headerArray.forEach((ele, i) => {
              //       finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
              //       finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
              //     });
              //     this.headers = [...finalHeader];
              //   }
              // }
            }
          },
          (error) => { }
        );
    }

  }

  downloadPdf(base64String, fileName) {
    // const source = `data:application/pdf;base64,${base64String}`;
    // const link = document.createElement("a");
    // link.href = source;
    // link.download = `${fileName}.pdf`
    // link.click();

    // var winparams = 'dependent=yes,locationbar=no,scrollbars=yes,menubar=yes,' +
    //   'resizable,screenX=50,screenY=50,width=850,height=1050';
    

    var htmlPop = '<embed width=100% height=100%'
      + ' type="application/pdf"'
      + ' src="data:application/pdf;base64,'
      + `${base64String}`
      + '"></embed>';

    // var printWindow = window.open("", "PDF",winparams);
    var printWindow = window.open("", "PDF");
    printWindow.document.write(htmlPop);
    // printWindow.print();
  }
  onClickDownloadPdf(string, fileName) {
    let base64String = string;
    this.downloadPdf(base64String, fileName);
  }

  downloadXLS(base64String, fileName) {
    const source = `data:application/xlsx;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.xlsx`
    link.click();
  }
  onClickDownloadXLS(string, fileName) {
    let base64String = string;
    this.downloadXLS(base64String, fileName);
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


        this.reportService
          .getReportForExcel(this.apiObject, this.invoiceReportRequest)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                let excelData = data["data"];

                if (this.reportName == "Payment OutStanding MasterWise") {
                  this.onClickDownloadXLS(excelData, "Payment OutStanding MasterWise");
                } else if (this.reportName == "Payment OutStanding Bill Wise") {
                  this.onClickDownloadXLS(excelData, "Payment OutStanding Bill Wise");
                } else {
                  this.headers = Object.keys(excelData[0]);
                  this.formSubmitted = false;
                  this.headers.forEach(ele => {
                    ele.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
                  });
                  this.exportService.exportExcel(excelData, this.reportName, this.headers)
                }

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
    this.shortReport = [];
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

  selectedModule(value) {
    this.shortReport = [];
    this.reportType = null;
    this.reportService
      .getAllReportType(value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.allReports = data["data"];
          }
        },
        (error) => { }
      );
  }

}
function _sortBy(shortReport: any[], arg1: string): any[] {
  throw new Error('Function not implemented.');
}

