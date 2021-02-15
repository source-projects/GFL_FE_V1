import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ColorGuard } from "app/@theme/guards/color.guard";
import { PartyGuard } from "app/@theme/guards/party.guard";
import { ProgramGuard } from "app/@theme/guards/program.guard";
import { QualityGuard } from "app/@theme/guards/quality.guard";
import { ShadeGuard } from "app/@theme/guards/shade.guard";
import { StockBatchGuard } from "app/@theme/guards/stock-batch.guard";
import { SupplierGuard } from "app/@theme/guards/supplier.guard";
import { UserGuard } from "app/@theme/guards/user.guard";
import { DyeingProcessGuard } from "app/@theme/guards/dyeing-process.guard";
import { JetPlanningGuard } from "app/@theme/guards/jet-planning.guard";
import { ProductionPlanningGuard } from "app/@theme/guards/production-planning.guard";
import { WaterJetGuard } from "app/@theme/guards/water-jet.guard";
import { InvoiceGuard } from "app/@theme/guards/invoice.guard";
import { PaymentGuard } from "app/@theme/guards/payment.guard";
import { AnyAaaaRecord } from "dns";
import { BehaviorSubject } from "rxjs";
import { MENU_ITEMS } from "./pages-menu";
import { FinishedMeterGuard } from "app/@theme/guards/finished-meter.guard";
import { InputDataGuard } from "app/@theme/guards/input-data.guard";
import { CommonService } from 'app/@theme/services/common.service';
@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;
  view: Boolean = true;
  view_all: Boolean = true;
  view_group: Boolean = true;
  user:any;
  userHead:any;

  constructor(
    public partyGuard: PartyGuard,
    public qualityGuard: QualityGuard,
    public userGuard: UserGuard,
    public supplierGuard: SupplierGuard,
    public colorGuard: ColorGuard,
    public shadeGuard: ShadeGuard,
    public stockBatchGuard: StockBatchGuard,
    public programGuard: ProgramGuard,
    public dyeingProcessGuard: DyeingProcessGuard,
    public jetPlanningGuard: JetPlanningGuard,
    public productionPlanningGuard: ProductionPlanningGuard,
    public waterJetGuard: WaterJetGuard,
    public invoiceGuard: InvoiceGuard,
    public paymentGuard: PaymentGuard,
    public finishedMeterGuard: FinishedMeterGuard,
    public inputDataGuard: InputDataGuard,
    private commonService: CommonService,

  ) {}
  ngOnInit(): void {

    this.getData();


    this.menu.forEach((e) => {
      switch (e.title) {
        case "Party":
          this.view = this.partyGuard.accessRights("view");
          this.view_all = this.partyGuard.accessRights("view all");
          this.view_group = this.partyGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Quality":
          this.view = this.qualityGuard.accessRights("view");
          this.view_all = this.qualityGuard.accessRights("view all");
          this.view_group = this.qualityGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "User":
          if(this.userHead.userHeadId != 0){
            e.hidden = true;
          }else{
            e.hidden = false;
            this.view = this.userGuard.accessRights("view");
            this.view_all = this.userGuard.accessRights("view all");
            this.view_group = this.userGuard.accessRights("view group");
            if (
              this.view == false &&
              this.view_all == false &&
              this.view_group == false
            ) {
              e.hidden = true;
            }
          }
        
          break;

        case "Color":
          this.view = this.colorGuard.accessRights("view");
          this.view_all = this.colorGuard.accessRights("view all");
          this.view_group = this.colorGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Program":
          this.view = this.programGuard.accessRights("view");
          this.view_all = this.programGuard.accessRights("view all");
          this.view_group = this.programGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Stock-batch":
          this.view = this.stockBatchGuard.accessRights("view");
          this.view_all = this.stockBatchGuard.accessRights("view all");
          this.view_group = this.stockBatchGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Shade":
          this.view = this.shadeGuard.accessRights("view");
          this.view_all = this.shadeGuard.accessRights("view all");
          this.view_group = this.shadeGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Supplier":
          this.view = this.supplierGuard.accessRights("view");
          this.view_all = this.supplierGuard.accessRights("view all");
          this.view_group = this.supplierGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Water-jet":
          this.view = this.waterJetGuard.accessRights("view");
          this.view_all = this.waterJetGuard.accessRights("view all");
          this.view_group = this.waterJetGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;
        case "DyeingProcess":
          this.view = this.dyeingProcessGuard.accessRights("view");
          this.view_all = this.dyeingProcessGuard.accessRights("view all");
          this.view_group = this.dyeingProcessGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Issue-Color-Box":
          this.view = this.colorGuard.accessRights("view");
          this.view_all = this.colorGuard.accessRights("view all");
          this.view_group = this.colorGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Batch-shuffle":
          this.view = this.stockBatchGuard.accessRights("view");
          this.view_all = this.stockBatchGuard.accessRights("view all");
          this.view_group = this.stockBatchGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Finished Meter":
          this.view = this.finishedMeterGuard.accessRights("view");
          this.view_all = this.finishedMeterGuard.accessRights("view all");
          this.view_group = this.finishedMeterGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Production Planning":
          this.view = this.productionPlanningGuard.accessRights("view");
          this.view_all = this.productionPlanningGuard.accessRights("view all");
          this.view_group = this.productionPlanningGuard.accessRights(
            "view group"
          );
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Jet Planning":
          this.view = this.jetPlanningGuard.accessRights("view");
          this.view_all = this.jetPlanningGuard.accessRights("view all");
          this.view_group = this.jetPlanningGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Generate Invoice":
          this.view = this.invoiceGuard.accessRights("view");
          this.view_all = this.invoiceGuard.accessRights("view all");
          this.view_group = this.invoiceGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Input Data":
          this.view = this.inputDataGuard.accessRights("view");
          this.view_all = this.inputDataGuard.accessRights("view all");
          this.view_group = this.inputDataGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;

        case "Payment":
          this.view = this.paymentGuard.accessRights("view");
          this.view_all = this.paymentGuard.accessRights("view all");
          this.view_group = this.paymentGuard.accessRights("view group");
          if (
            this.view == false &&
            this.view_all == false &&
            this.view_group == false
          ) {
            e.hidden = true;
          }
          break;
      }
    });
  }

  public getData() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
  }
}
