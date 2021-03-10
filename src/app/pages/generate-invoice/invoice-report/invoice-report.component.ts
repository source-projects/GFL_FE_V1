import { Component, OnInit } from "@angular/core";
import {
  InvoiceDetailedReport,
  InvoiceReportRequest,
  InvoiceShortReport,
} from "app/@theme/model/invoice";
import { GenerateInvoiceService } from "app/@theme/services/generate-invoice.service";
import { PartyService } from "app/@theme/services/party.service";
import * as wijmo from "@grapecity/wijmo";

@Component({
  selector: "ngx-invoice-report",
  templateUrl: "./invoice-report.component.html",
  styleUrls: ["./invoice-report.component.scss"],
})
export class InvoiceReportComponent implements OnInit {
  public invoiceReportRequest: InvoiceReportRequest;
  public maxDate: any;
  public currentDate = new Date();
  public disableButton: boolean = false;
  public shortReport: InvoiceShortReport[] = [];
  public detailedReport: InvoiceDetailedReport[] = [];
  public masterList = [];
  public partyList = [];

  constructor(
    private invoiceService: GenerateInvoiceService,
    private partyService: PartyService,
  ) {
    this.invoiceReportRequest = new InvoiceReportRequest();
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
  }

  getAllMasters() {
    this.partyService.getAllMaster().subscribe(
      (data) => {
        if (data["success"]) {
          this.masterList = data["data"];
        }
      },
      (error) => {}
    );
  }

  getAllParties() {
    this.partyService.getAllPartyList(0, "all").subscribe(
      (data) => {
        if (data["success"]) {
          this.partyList = data["data"];
        }
      },
      (error) => {}
    );
  }

  getShortReport() {
    this.shortReport = [];
    this.detailedReport = [];
    this.invoiceService
      .getShortInvoiceReport(this.invoiceReportRequest)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.shortReport = data["data"];
            this.printReport("short");
          }
        },
        (error) => {}
      );
  }

  getDetailedReport() {
    this.shortReport = [];
    this.detailedReport = [];
    this.invoiceService
      .getDetailedInvoiceReport(this.invoiceReportRequest)
      .subscribe(
        (data) => {
          if (data["success"]) {
            this.detailedReport = data["data"];
            this.printReport("detailed");
          }
        },
        (error) => {}
      );
  }

  printReport(type) {
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
      let data1;
      if (type == "detailed") {
        data1 = <HTMLElement>document.getElementById("detailedReport");
      } else {
        data1 = <HTMLElement>document.getElementById("shortReport");
      }
      if (data1 != null) {
        doc.append(data1);
        doc.print();
        clearInterval(inter1);
        this.shortReport = [];
        this.detailedReport = [];
        this.invoiceReportRequest = new InvoiceReportRequest();
      }
    }, 10);
  }
}
