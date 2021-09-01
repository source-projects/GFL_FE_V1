import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { StockBatchGuard } from '../../../@theme/guards/stock-batch.guard';
import { CommonService } from '../../../@theme/services/common.service';
import { StockBatchService } from '../../../@theme/services/stock-batch.service';
import * as errorData from "../../../@theme/json/error.json";
import {cloneDeep} from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { JobCardComponent } from '../job-card/job-card.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { InputBatchComponent } from '../input-batch/input-batch.component';
import { ExportPopupComponent } from '../../../@theme/components/export-popup/export-popup.component';

@Component({
  selector: 'ngx-available-batches',
  templateUrl: './available-batches.component.html',
  styleUrls: ['./available-batches.component.scss']
})
export class AvailableBatchesComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  public loading = false;
  stockList;
  copyStockList = [];
  selectedTableChange;
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
    private route: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public stockBatchGuard: StockBatchGuard,
    private stockBatchService: StockBatchService,
    private commonService: CommonService,
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

  open() {
    let rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
    this.flag = true;
    let headerArray = Object.keys(this.stockList[0]);
    let finalHeader = [];
    headerArray.forEach((ele,i) => {
      finalHeader.push(ele.replace(rex,'$1$4 $2$3$5'));
      finalHeader[i] = finalHeader[i].charAt(0).toUpperCase() + finalHeader[i].slice(1);
    });
    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = finalHeader;
    modalRef.componentInstance.list = this.stockList;
    modalRef.componentInstance.moduleName = this.module;
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
    this.stockBatchService.getAvailableStockBatchList(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.stockList = data["data"];
          this.stockList = this.stockList.map((element) => ({
            id: element.id,
            stockInType: element.stockInType,
            partyName: element.partyName,
            qualityName: element.qualityName,
            batchList: element.batchList,
            chlNo: element.chlNo,
          }));
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

  setViewJobValue(event) {
    if (event === "view table") {
      this.route.navigate(['/pages/stock-batch/view'])
    } else if (event === "add") {
      this.route.navigate(['/pages/stock-batch'])
    }
  }
}
