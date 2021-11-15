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
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";

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
  public shortReport = [];
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

  options = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  constructor(
    private invoiceService: GenerateInvoiceService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private adminService: AdminService,
    private exportService: ExportService,
    public datepipe: DatePipe,
    private toastr: ToastrService
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
headerArray = []
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
                if(this.shortReport[0].consolidatedBillDataForPDFS && this.shortReport[0].consolidatedBillDataForPDFS.length){
                  let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
                  this.headerArray = Object.keys(this.shortReport[0].consolidatedBillDataForPDFS[0]);
                  let finalHeader = [];
                  this.headerArray.forEach((ele, i) => {
                    finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
                    finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
                  });
                  this.headers = [...finalHeader];
                  this.shortReport.forEach((element) => {
                    element.consolidatedBillDataForPDFS.forEach(billData => {
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
          this.detailedReport = [];
          this.invoiceReportRequest = new InvoiceReportRequest();
          this.formSubmitted = false;
        }, 1000)
      }
    }, 10);
  }

  downLoadExcel(form) {

    if (form.valid) {
      this.invoiceReportRequest.from = moment(this.invoiceReportRequest.from).format();
      this.invoiceReportRequest.to = moment(this.invoiceReportRequest.to).format();
      this.invoiceService
        .getShortInvoiceExcel(this.invoiceReportRequest)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"] && data["data"] && data["data"].length) {
              let excelData = data["data"];
              this.headers = [];
              let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
              let headerArray = Object.keys(excelData[0]);
              let finalHeader = [];
              headerArray.forEach((ele, i) => {
                finalHeader.push(ele.replace(rex, '$1$4 $2$3$5'));
                finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
              });
              this.headers = [...finalHeader];
              let list = [];
              // excelData.forEach(ele => {
              //   ele.consolidatedBillDataList.forEach(col => {
              //     let latest_date = this.datepipe.transform(col.invoiceDate, 'dd/MM/yyyy');
              //     let y = {
              //       Invoice_No: col.invoiceNo,
              //       InvoiceDate: latest_date,
              //       PartyName: col.partyName,
              //       PartyAddress1: col.partyAddress1,
              //       PartyAddress2: col.partyAddress2,
              //       City: col.city,
              //       State: col.state,
              //       GSTIN: col.gstin,
              //       PhoneNumber: col.contactNo,
              //       BatchId: col.batchId,
              //       Total_Meter: col.totalMtr,
              //       Total_Pcs: col.greyPcs,
              //       Total_Finish_Meter: col.totalFinishMtr,
              //       Total_Finish_Pcs: col.pcs,
              //       Rate: col.rate,
              //       Amount: col.amt,
              //       Discount_Percentage: col.percentageDiscount,
              //       Discount_Amt: col.discountAmt,
              //       Taxable_Amt: col.taxAmt,
              //       C_GST: col.cgst,
              //       S_GST: col.sgst,
              //       I_GST: col.igst,
              //       GST_Amt: col.gstAmt,
              //       Total_Amt: col.netAmt,
              //       BillingUnit: col.billingUnit,
              //       InwardUnit: col.inwardUnit,
              //       Master: col.headName,

              //     }
              //     list.push(y);
              //   })


              // })
              this.exportService.exportExcel(excelData, "Invoice Report", this.headers)
            } else {
              this.toastr.error(data['msg'])
            }
          },
          (error) => {
            this.toastr.error("Data Not Found..");
          }
        );
    }


  }
}
