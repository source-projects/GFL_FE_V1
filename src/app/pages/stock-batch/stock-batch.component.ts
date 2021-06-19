import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { StockBatchGuard } from "../../@theme/guards/stock-batch.guard";
import * as errorData from "../../@theme/json/error.json";
import { CommonService } from "../../@theme/services/common.service";
import { ExportService } from "../../@theme/services/export.service";
import { JwtTokenService } from "../../@theme/services/jwt-token.service";
import { StockBatchService } from "../../@theme/services/stock-batch.service";
import { JobCardComponent } from "./job-card/job-card.component";
import { cloneDeep } from 'lodash';

@Component({
  selector: "ngx-stock-batch",
  templateUrl: "./stock-batch.component.html",
  styleUrls: ["./stock-batch.component.scss"],
})
export class StockBatchComponent implements OnInit, OnDestroy {
  public errorData: any = (errorData as any).default;
  public loading = false;
  stockList;
  copyStockList = [];
  stock = [];
  headers = [
    "Stock In Type",
    "Party Name",
    "Bill No",
    "Bill Date",
    "Chl No",
    "Chl Date",
  ];
  module = "stock-batch";

  flag = false;
  disabled = false;

  tablestyle = "bootstrap";
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  userHeadId;
  userId;
  permissions: Number;

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  ownDelete = true;
  allDelete = true;
  groupDelete = true;

  ownEdit = true;
  allEdit = true;
  groupEdit = true;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    public stockBatchGuard: StockBatchGuard,
    private stockBatchService: StockBatchService,
    private commonService: CommonService,
    private exportService: ExportService,
    private jwtToken: JwtTokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getAddAcess();
    this.getViewAccess();
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if (this.stockBatchGuard.accessRights("view all")) {
      this.getStockBatchList(0, "all");
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else if (this.stockBatchGuard.accessRights("view group")) {
      this.getStockBatchList(this.userId, "group");
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    } else if (this.stockBatchGuard.accessRights("view")) {
      this.getStockBatchList(this.userId, "own");
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
  }
  getAddAcess() {
    if (this.stockBatchGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.stockList = [];
    switch (event) {
      case 1:
        this.getStockBatchList(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getStockBatchList(this.userId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getStockBatchList(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.stock;
    modalRef.componentInstance.moduleName = this.module;
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    if(val){
      this.stockList = this.copyStockList.filter( f=>
        this.matchString(f, 'partyName', val) ||
        this.matchString(f, 'qualityName', val) ||
        this.matchString(f, 'chlNo', val) ||
        this.matchString(f, 'batchId', val) ||
        this.matchString(f, 'stockInType', val)
      );
    }else{
      this.stockList = cloneDeep(this.copyStockList); 
    }
  }

  matchString(item, key, searchString){
    if(key == 'batchId'){
      return item['batchData'].filter(f => f.batchId.toLowerCase().includes(searchString)).length > 0
    }else{
      return item[key].toLowerCase().includes(searchString);
    }
  }

  getStockBatchList(id, getBy) {
    this.loading = true;
    this.stockBatchService.getAllStockBatchList(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.stockList = data["data"];
          let index = 0;
          this.stockList.forEach((element) => {
            this.stockList[index].billDate = new Date(
              element.billDate
            ).toDateString();
            this.stockList[index].chlDate = new Date(
              element.chlDate
            ).toDateString();
            index++;
          });
          this.copyStockList = cloneDeep(this.stockList);
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  deleteStockBatch(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.stockBatchService.deleteStockBatchById(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(errorData.Delete);
              this.onChange(this.radioSelect);
            }
          },
          (error) => {
            this.toastr.error(errorData.Internal_Error);
          }
        );
      }
    });
  }

  getViewAccess() {
    if (!this.stockBatchGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;
    if (!this.stockBatchGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;
    if (!this.stockBatchGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.stockBatchGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }
    if (this.stockBatchGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.stockBatchGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }

  getDeleteAccess1() {
    if (this.stockBatchGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.stockBatchGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.stockBatchGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    }
    if (this.stockBatchGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }

  getEditAccess1() {
    if (this.stockBatchGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }

  printJobCard(data){
    const modalRef = this.modalService.open(JobCardComponent);
    modalRef.componentInstance.isDirectPrintFlag=true
    modalRef.componentInstance.stockBatchData = data;
    modalRef.componentInstance.stockId = Number(data.id);
    modalRef.result
      .then((result) => {
      })
  }
}
