import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { CommonGuard } from "../@theme/guards/common.guard";
import { CommonService } from "../@theme/services/common.service";
import { UserService } from "../@theme/services/user.service";
import { MENU_ITEMS } from "./pages-menu";
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
export class PagesComponent implements OnInit, OnDestroy {
  menu = MENU_ITEMS;
  view: Boolean = true;
  view_all: Boolean = true;
  view_group: Boolean = true;
  user: any;
  userHead: any;
  userData: any;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    
    private commonService: CommonService,
    private userService: UserService,
    private commonGuard : CommonGuard
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
                this.view = this.commonService.accessRights("view","party");
                this.view_all = this.commonService.accessRights("view all","party");
                this.view_group = this.commonService.accessRights("view group","party");
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
                this.view = this.commonService.accessRights("view","mergeBatch");
                this.view_all = this.commonService.accessRights("view all","mergeBatch");
                this.view_group = this.commonService.accessRights("view group","mergeBatch");
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
                this.view = this.commonService.accessRights("view","quality");
                this.view_all = this.commonService.accessRights("view all","quality");
                this.view_group = this.commonService.accessRights("view group","quality");
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
                  this.view = this.commonService.accessRights("view","user");
                  this.view_all = this.commonService.accessRights("view all","user");
                  this.view_group = this.commonService.accessRights("view group","user");
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
                this.view = this.commonService.accessRights("view","color");
                this.view_all = this.commonService.accessRights("view all","color");
                this.view_group = this.commonService.accessRights("view group","color");
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
                this.view = this.commonService.accessRights("view","stockBatch");
                this.view_all = this.commonService.accessRights("view all","stockBatch");
                this.view_group = this.commonService.accessRights(
                  "view group","stockBatch"
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
                this.view = this.commonService.accessRights("view","shade");
                this.view_all = this.commonService.accessRights("view all","shade");
                this.view_group = this.commonService.accessRights("view group","shade");
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
                this.view = this.commonService.accessRights("view","supplier");
                this.view_all = this.commonService.accessRights("view all","supplier");
                this.view_group = this.commonService.accessRights("view group","supplier");
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
                this.view = this.commonService.accessRights("view","process");
                this.view_all = this.commonService.accessRights(
                  "view all","process"
                );
                this.view_group = this.commonService.accessRights(
                  "view group","process"
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
                this.view = this.commonService.accessRights("view","color");
                this.view_all = this.commonService.accessRights("view all","color");
                this.view_group = this.commonService.accessRights("view group","color");
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
                this.view = this.commonService.accessRights("view","stockBatch");
                this.view_all = this.commonService.accessRights("view all","stockBatch");
                this.view_group = this.commonService.accessRights(
                  "view group","stockBatch"
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
                this.view = this.commonService.accessRights("view","batch");
                this.view_all = this.commonService.accessRights(
                  "view all","batch"
                );
                this.view_group = this.commonService.accessRights(
                  "view group","batch"
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
                this.view = this.commonService.accessRights("view","productionPlanning");
                this.view_all = this.commonService.accessRights(
                  "view all","productionPlanning"
                );
                this.view_group = this.commonService.accessRights(
                  "view group","productionPlanning"
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
                this.view = this.commonService.accessRights("view","dispatch");
                this.view_all = this.commonService.accessRights("view all","dispatch");
                this.view_group = this.commonService.accessRights("view group","dispatch");
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
                this.view = this.commonService.accessRights("view","machine");
                this.view_all = this.commonService.accessRights("view all","machine");
                this.view_group = this.commonService.accessRights(
                  "view group","machine"
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
                this.view = this.commonService.accessRights("view","payment");
                this.view_all = this.commonService.accessRights("view all","payment");
                this.view_group = this.commonService.accessRights("view group","payment");
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
                this.view = this.commonService.accessRights("view","dyeingSlip");
                this.view_all = this.commonService.accessRights("view all","dyeingSlip");
                this.view_group = this.commonService.accessRights("view group","dyeingSlip");
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
                this.view = this.commonService.accessRights("view","employee");
                this.view_all = this.commonService.accessRights("view all","employee");
                this.view_group = this.commonService.accessRights(
                  "view group","employee"
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
                this.view = this.commonService.accessRights("view","attendence");
                this.view_all = this.commonService.accessRights("view all","attendence");
                this.view_group = this.commonService.accessRights(
                  "view group","attendence"
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
                this.view = this.commonService.accessRights("view","purchase");
                this.view_all = this.commonService.accessRights("view all","purchase");
                this.view_group = this.commonService.accessRights("view group","purchase");
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
                      this.view = this.commonService.accessRights("view","report");
                      this.view_all = this.commonService.accessRights("view all","report");
                      this.view_group = this.commonService.accessRights("view group","report");
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
                this.view = this.commonService.accessRights("view","task");
                this.view_all = this.commonService.accessRights("view all","task");
                this.view_group = this.commonService.accessRights("view group","task");
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
