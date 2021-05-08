import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ColorGuard } from "../@theme/guards/color.guard";
import { PartyGuard } from "../@theme/guards/party.guard";
import { ProgramGuard } from "../@theme/guards/program.guard";
import { QualityGuard } from "../@theme/guards/quality.guard";
import { ShadeGuard } from "../@theme/guards/shade.guard";
import { StockBatchGuard } from "../@theme/guards/stock-batch.guard";
import { SupplierGuard } from "../@theme/guards/supplier.guard";
import { UserGuard } from "../@theme/guards/user.guard";
import { DyeingProcessGuard } from "../@theme/guards/dyeing-process.guard";
import { JetPlanningGuard } from "../@theme/guards/jet-planning.guard";
import { ProductionPlanningGuard } from "../@theme/guards/production-planning.guard";
import { WaterJetGuard } from "../@theme/guards/water-jet.guard";
import { InvoiceGuard } from "../@theme/guards/invoice.guard";
import { PaymentGuard } from "../@theme/guards/payment.guard";
import { AnyAaaaRecord } from "dns";
import { BehaviorSubject, from } from "rxjs";
import { MENU_ITEMS } from "./pages-menu";
import { FinishedMeterGuard } from "../@theme/guards/finished-meter.guard";
import { InputDataGuard } from "../@theme/guards/input-data.guard";
import { CommonService } from "../@theme/services/common.service";
import { UserService } from "../@theme/services/user.service";
import { AdminGuard } from "../@theme/guards/admin.guard";
import { EmployeeRegistrationGuard } from "../@theme/guards/employee-registration.guard";
import { AttndanceGuard } from "../@theme/guards/attendance.guard";
import { PurchaseGuard } from "../@theme/guards/purchase.guard";
import { JwtTokenService } from "../@theme/services/jwt-token.service";
import { StoreTokenService } from "../@theme/services/store-token.service";
import { MergeBatchGuard } from "../@theme/guards/merge-batch.guard";
import { ReportGuard } from "../@theme/guards/report.guard";
import { TaskGuard } from "../@theme/guards/task.guard";
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
  user: any;
  userHead: any;
  userData: any;
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
    public registrationGuard: EmployeeRegistrationGuard,
    public attendanceGuard: AttndanceGuard,
    public finishedMeterGuard: FinishedMeterGuard,
    public inputDataGuard: InputDataGuard,
    public adminGuard: AdminGuard,
    public purchaseGuard: PurchaseGuard,
    private commonService: CommonService,
    private userService: UserService,
    private mergeGuard: MergeBatchGuard,
    private reportGuard: ReportGuard,
    private taskGuard: TaskGuard
  ) {}
  ngOnInit(): void {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.userService.getUserHeadDetails(this.user.userId).subscribe(
      (data) => {
        if (data["success"]) {
          this.userData = data["data"];

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
                } else {
                  e.hidden = false;
                }
                break;

              case "Merge-batch":
                this.view = this.mergeGuard.accessRights("view");
                this.view_all = this.mergeGuard.accessRights("view all");
                this.view_group = this.mergeGuard.accessRights("view group");
                if (
                  this.view == false
                  // this.view_all == false &&
                  // this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
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
                } else {
                  e.hidden = false;
                }
                break;

              case "User":
                if (
                  this.userData.id &&
                  this.userData.userHeadId &&
                  this.userData.id != this.userData.userHeadId
                ) {
                  e.hidden = true;
                } else {
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
                  } else {
                    e.hidden = false;
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
                } else {
                  e.hidden = false;
                }
                break;
              // case "Program":
              //   this.view = this.programGuard.accessRights("view");
              //   this.view_all = this.programGuard.accessRights("view all");
              //   this.view_group = this.programGuard.accessRights("view group");
              //   if (
              //     this.view == false &&
              //     this.view_all == false &&
              //     this.view_group == false
              //   ) {
              //     e.hidden = true;
              //   }
              //   break;

              case "Stock-batch":
                this.view = this.stockBatchGuard.accessRights("view");
                this.view_all = this.stockBatchGuard.accessRights("view all");
                this.view_group = this.stockBatchGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
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
                } else {
                  e.hidden = false;
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
                } else {
                  e.hidden = false;
                }
                break;
              // case "Water-jet":
              //   this.view = this.waterJetGuard.accessRights("view");
              //   this.view_all = this.waterJetGuard.accessRights("view all");
              //   this.view_group = this.waterJetGuard.accessRights("view group");
              //   if (
              //     this.view == false &&
              //     this.view_all == false &&
              //     this.view_group == false
              //   ) {
              //     e.hidden = true;
              //   }
              //   break;
              case "DyeingProcess":
                this.view = this.dyeingProcessGuard.accessRights("view");
                this.view_all = this.dyeingProcessGuard.accessRights(
                  "view all"
                );
                this.view_group = this.dyeingProcessGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
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
                } else {
                  e.hidden = false;
                }
                break;

              case "Batch-shuffle":
                this.view = this.stockBatchGuard.accessRights("view");
                this.view_all = this.stockBatchGuard.accessRights("view all");
                this.view_group = this.stockBatchGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              case "Finished Meter":
                this.view = this.finishedMeterGuard.accessRights("view");
                this.view_all = this.finishedMeterGuard.accessRights(
                  "view all"
                );
                this.view_group = this.finishedMeterGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              case "Production Planning":
                this.view = this.productionPlanningGuard.accessRights("view");
                this.view_all = this.productionPlanningGuard.accessRights(
                  "view all"
                );
                this.view_group = this.productionPlanningGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              // case "Jet Planning":
              //   this.view = this.jetPlanningGuard.accessRights("view");
              //   this.view_all = this.jetPlanningGuard.accessRights("view all");
              //   this.view_group = this.jetPlanningGuard.accessRights(
              //     "view group"
              //   );
              //   if (
              //     this.view == false &&
              //     this.view_all == false &&
              //     this.view_group == false
              //   ) {
              //     e.hidden = true;
              //   }
              //   break;

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
                } else {
                  e.hidden = false;
                }
                break;

              case "Database":
                if (
                  this.userData.id &&
                  !this.userData.userHeadId &&
                  !this.userData.superUserHeadId
                ) {
                  e.hidden = false;
                } else {
                  e.hidden = true;
                }
                break;

              case "Dashboard":
                if (
                  this.userData.id &&
                  !this.userData.userHeadId &&
                  !this.userData.superUserHeadId
                ) {
                  e.hidden = false;
                } else {
                  e.hidden = true;
                }
                break;
  

              case "Input Data":
                this.view = this.inputDataGuard.accessRights("view");
                this.view_all = this.inputDataGuard.accessRights("view all");
                this.view_group = this.inputDataGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
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
                } else {
                  e.hidden = false;
                }
                break;

              case "Addition Slip":
                this.view = this.paymentGuard.accessRights("view");
                this.view_all = this.paymentGuard.accessRights("view all");
                this.view_group = this.paymentGuard.accessRights("view group");
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              case "Employee-Registration":
                this.view = this.registrationGuard.accessRights("view");
                this.view_all = this.registrationGuard.accessRights("view all");
                this.view_group = this.registrationGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              case "Attendance":
                this.view = this.attendanceGuard.accessRights("view");
                this.view_all = this.attendanceGuard.accessRights("view all");
                this.view_group = this.attendanceGuard.accessRights(
                  "view group"
                );
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;

              case "Purchase":
                this.view = this.purchaseGuard.accessRights("view");
                this.view_all = this.purchaseGuard.accessRights("view all");
                this.view_group = this.purchaseGuard.accessRights("view group");
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;
                
                  case "Report":
                    if (
                      this.userData.id &&
                      !this.userData.userHeadId && 
                      !this.userData.superUserHeadId
                    ) {
                      e.hidden = false;
                    } else {
                      e.hidden = true;
                      this.view = this.reportGuard.accessRights("view");
                      this.view_all = this.reportGuard.accessRights("view all");
                      this.view_group = this.reportGuard.accessRights("view group");
                      if (
                        this.view == false &&
                        this.view_all == false &&
                        this.view_group == false
                      ) {
                        e.hidden = true;
                      }else{
                        e.hidden = false;
                      }
                    }
                  break;

              case "Task":
                this.view = this.taskGuard.accessRights("view");
                this.view_all = this.taskGuard.accessRights("view all");
                this.view_group = this.taskGuard.accessRights("view group");
                if (
                  this.view == false &&
                  this.view_all == false &&
                  this.view_group == false
                ) {
                  e.hidden = true;
                } else {
                  e.hidden = false;
                }
                break;
            }
          });
        }
      },
      (error) => {}
    );
  }
}
