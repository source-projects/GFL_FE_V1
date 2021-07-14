import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { ShadeGuard } from "../../@theme/guards/shade.guard";
import * as errorData from "../../@theme/json/error.json";
import { CommonService } from "../../@theme/services/common.service";
import { ShadeService } from "../../@theme/services/shade.service";
import { ToastrService } from "ngx-toastr";
import { CdkRow } from '@angular/cdk/table';

@Component({
  selector: "ngx-shade",
  templateUrl: "./shade.component.html",
  styleUrls: ["./shade.component.scss"],
})
export class ShadeComponent implements OnInit, OnDestroy {
  public loading = false;
  public errorData: any = (errorData as any).default;
  searchStr = "";
  searchANDCondition = false;
  public tableHeaders = ["partyShadeNo", "colorName", "processName", "qualityId", "partyName", "costPerWeight", "costPerMeter", "colorTone"];
  tableStyle = "bootstrap";
  shadeList = [];
  copyShadeList = [];
  shade = [];
  headers = [
    "Party Shade No",
    "Process Name",
    "Quality Id",
    "Quality Name",
    "Party Name",
    "Color Tone",
  ];
  module = "shade";
  avgCostPerWeight;
  avgCostPerMeter;


  radioSelect = 0;
  flag = false;

  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },

    { id: 3, value: "View All", disabled: false },
  ];
  userHeadId;
  userId;
  permissions: Number;

  hidden: boolean = true;
  delete: Boolean = false;
  delete_group: Boolean = false;
  delete_all: Boolean = false;

  hiddenEdit: boolean = true;
  edit: Boolean = false;
  edit_group: Boolean = false;
  edit_all: Boolean = false;

  hiddenView: boolean = true;
  view: Boolean = false;
  view_group: Boolean = false;
  view_all: Boolean = false;

  hiddenCol: boolean = true;

  ownDelete = true;
  allDelete = true;
  groupDelete = true;

  ownEdit = true;
  allEdit = true;
  groupEdit = true;
  disabled = false;

  averageFlag: boolean = false;
  totalAmount;

  public destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private shadeService: ShadeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public shadeGuard: ShadeGuard,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getViewAccess();
    this.getAddAcess();
    // this.getallShades(this.userId, "own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if (this.shadeGuard.accessRights("view all")) {
      this.getallShades(0, "all");
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else if (this.shadeGuard.accessRights("view group")) {
      this.getallShades(this.userId, "group");
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    } else if (this.shadeGuard.accessRights("view")) {
      this.getallShades(this.userId, "own");
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
  }
  getAddAcess() {
    if (this.shadeGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.shadeList = [];
    switch (event) {
      case 1:
        this.getallShades(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getallShades(this.userId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getallShades(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.shade;
    modalRef.componentInstance.moduleName = this.module;
  }

  getallShades(id, getBy) {
    this.loading = true;
    this.shadeService.getShadeMastList(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"].length > 0) {
            this.shadeList = data["data"];
            this.totalAmount = 0;
            this.shadeList.forEach(ele => {
              if (ele.shadeDataList && ele.shadeDataList.length) {
                ele.shadeDataList.forEach((e) => {
                  if (e.amount) this.totalAmount += e.amount;
                });
                let costKg = null;
                let costMtr = null;
                // this.totalAmount = this.totalAmount.toFixed(2);
                if (ele.wtPer100m) {
                  if (ele.qualityId) {
                    costKg = (this.totalAmount / 100).toFixed(2);
                    let A = 100 / ele.wtPer100m;
                    costMtr = (costKg / A).toFixed(2);
                    ele["costPerWeight"] = costKg;
                    ele["costPerMeter"] = costMtr;
                  }
                }
              }
            })

            this.shade = this.shadeList.map((element) => ({
              id: element.id,
              partyShadeNo: element.partyShadeNo,
              processName: element.processName,
              qualityId: element.qualityId,
              qualityName: element.qualityName,
              partyName: element.partyName,
              colorTone: element.colorTone,
              colorName: element.colorName,
              costPerWeight: element.costPerWeight,
              costPerMeter: element.costPerMeter
            }));
            this.copyShadeList = this.shadeList.map((element) => ({
              id: element.id,
              partyShadeNo: element.partyShadeNo,
              processName: element.processName,
              qualityId: element.qualityId,
              qualityName: element.qualityName,
              partyId: element.partyId,
              colorTone: element.colorTone,
              partyName: element.partyName,
              colorName: element.colorName,
              costPerWeight: element.costPerWeight,
              costPerMeter: element.costPerMeter
            }));
          }
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  filter() {

    const val = this.searchStr.toString().toLowerCase().trim();
    const searchStrings = val.split("+").map(m => ({ matched: false, val: m }));
    this.shadeList = this.copyShadeList.filter((f) => {
      let hit = 0;
      for (let v of searchStrings) {
        if (
          this.tableHeaders.filter(m => this.matchString(f, m, v.val)).length
        ) {
          v.matched = true;
          hit++;
          if (!this.searchANDCondition) {
            return true;
          }
        }
      }
      if (this.searchANDCondition && hit == searchStrings.length) {
        return true;
      }
    });
    if (this.searchStr) {
      let sumWeight = 0;
      let sumMeter = 0;
      let count = 0;
      if (this.shadeList && this.shadeList.length) {
        this.shadeList.forEach((ele, i) => {
          sumWeight = sumWeight + Number(ele.costPerWeight);
          sumMeter = sumMeter + Number(ele.costPerMeter);
          count = i;

        });
        if(count == 0){
          this.avgCostPerWeight = sumWeight.toFixed(2);
          this.avgCostPerMeter = sumMeter.toFixed(2); 
        }
        else{
          this.avgCostPerWeight = (sumWeight / count).toFixed(2);
          this.avgCostPerMeter = (sumMeter / count).toFixed(2);  
        }
        this.averageFlag = true;
      }
    }
    else {
      this.avgCostPerMeter = 0;
      this.avgCostPerWeight = 0;
      this.averageFlag = false;
    }

    this.cdr.detectChanges();
    
  }

  matchString(item, key, searchString) {
    if (item[key]) {
      return item[key].toString().toLowerCase().includes(searchString);
    } else {
      return false;
    }
  }

  deleteShade(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.shadeService.deleteShadeData(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.onChange(this.radioSelect);
              this.toastr.success(data["msg"]);
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            //this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  getViewAccess() {
    if (!this.shadeGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;
    if (!this.shadeGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;
    if (!this.shadeGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.shadeGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }
    if (this.shadeGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.shadeGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }
  getDeleteAccess1() {
    if (this.shadeGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.shadeGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.shadeGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    }
    if (this.shadeGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }

  getEditAccess1() {
    if (this.shadeGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }

  toggleChange(){
    this.filter();
  }
}
