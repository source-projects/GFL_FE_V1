import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StockDetailedReport, StockReportRequest, StockShortReport } from '../../../@theme/model/stock-batch';
import { AdminService } from '../../../@theme/services/admin.service';
import { ExportService } from '../../../@theme/services/export.service';
import { PartyService } from '../../../@theme/services/party.service';
import { QualityService } from '../../../@theme/services/quality.service';
import { ShadeService } from '../../../@theme/services/shade.service';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: 'ngx-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit,OnDestroy {

  public stockReportRequest: StockReportRequest;
  public maxDate: any;
  public currentDate = new Date();
  public disableButton: boolean = false;
  public shortReport: StockShortReport[] = [];
  public detailedReport: StockDetailedReport[] = [];
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
  totalGrayWt:number;
  radioArray = [
    {id:1,name:'Bill Generated'},
    {id:2,name:'Finish Meter Save'},
    {id:3,name:'Is Production Planned'}
  ]
  constructor(private stockService: StockBatchService,
    private partyService: PartyService,
    private qualityService: QualityService,
    private shadeService: ShadeService,
    private adminService: AdminService,
    private exportService: ExportService,
    public datepipe: DatePipe) { 
      this.stockReportRequest = new StockReportRequest();
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
  
      this.shadeService.getQualityFromParty(this.stockReportRequest.partyId).pipe(takeUntil(this.destroy$)).subscribe(
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
      // this.totalGrayWt = 0;
      // this.totalGrayMeter = 0;
      this.shortReport = [];
      this.formSubmitted = true;
  
      if (form.valid) {
        this.stockReportRequest.from = moment(this.stockReportRequest.from).format();
        this.stockReportRequest.to = moment(this.stockReportRequest.to).format();
        this.stockService
          .getShortStockReport(this.stockReportRequest)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                this.shortReport = data["data"];
                // if(this.shortReport){
                //   this.shortReport.forEach((element) => {
                //     element.consolidatedBillDataList.forEach(billData => {
                //       this.totalGrayMeter += billData.greyMtr;
                //       this.totalGrayWt += billData.greyWt;
                //     });
                //   });
                // }
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
            this.stockReportRequest = new StockReportRequest();
            this.formSubmitted = false;
          }, 1000)
        }
      }, 10);
    }
  
    downLoadExcel(form) {
  
      if (form.valid) {
        this.stockReportRequest.from = moment(this.stockReportRequest.from).format();
        this.stockReportRequest.to = moment(this.stockReportRequest.to).format();
        this.stockService
          .getShortStockReport(this.stockReportRequest)
          .pipe(takeUntil(this.destroy$)).subscribe(
            (data) => {
              if (data["success"]) {
                let excelData = data["data"];
                this.headers = ["Invoice_No","Invoice Date","Party Name","Party Address1","Party Address2","City","State","GSTIN","Phone No",
                "BatchId","Total_Meter","Total_Pcs","Total_Finish_Meter","Total_Finish_Pcs",
                "Rate","Amount","Discount_Percentage","Discount_Amt","Taxable_Amt",
              "C_GST","S_GST","GST_Amt","Total_Amt"]
                let list = [];
                excelData.forEach(ele => {
                  ele.consolidatedBillDataList.forEach(col => {
                    let latest_date =this.datepipe.transform(col.invoiceDate, 'dd/MM/yyyy');
                    let y = {
                      Invoice_No:col.invoiceNo,
                      InvoiceDate:latest_date,
                      PartyName:col.partyName,
                      PartyAddress1:col.partyAddress1,
                      PartyAddress2:col.partyAddress2,
                      City:col.city,
                      State:col.state,
                      GSTIN:col.gstin,
                      PhoneNumber:col.contactNo,
                      BatchId: col.batchId,
                      Total_Meter: col.totalMtr,
                      Total_Pcs: col.greyPcs,
                      Total_Finish_Meter: col.totalFinishMtr,
                      Total_Finish_Pcs:col.pcs,
                      Rate: col.rate,
                      Amount: col.amt,
                      Discount_Percentage: col.percentageDiscount,
                      Discount_Amt: col.discountAmt,
                      Taxable_Amt: col.taxAmt,
                      C_GST: col.cgst,
                      S_GST: col.sgst,
                      GST_Amt: col.gstAmt,
                      Total_Amt: col.netAmt
                    }
                    list.push(y);
                  })
  
  
                })
                this.exportService.exportExcel(list, "Invoice Report", this.headers)
              }
            },
            (error) => { }
          );
      }
  
  
    }

    onChange(value){

      if(value == 1){
        this.stockReportRequest.isBillGenerated = true;
        this.stockReportRequest.isFinishMeterSaved = false;
        this.stockReportRequest.isProductionPlanned = false;
      }
      else if(value == 2){
        this.stockReportRequest.isBillGenerated = false;
        this.stockReportRequest.isFinishMeterSaved = true;
        this.stockReportRequest.isProductionPlanned = false;
      }
      else if(value == 3){
        this.stockReportRequest.isBillGenerated = false;
        this.stockReportRequest.isFinishMeterSaved = false;
        this.stockReportRequest.isProductionPlanned = true;
      }

    }

}
function _sortBy(shortReport: StockShortReport[], arg1: string): StockShortReport[] {
  throw new Error('Function not implemented.');
}

