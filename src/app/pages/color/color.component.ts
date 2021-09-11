import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { ColorGuard } from "../../@theme/guards/color.guard";
import * as errorData from "../../@theme/json/error.json";
import { ColorService } from "../../@theme/services/color.service";
import { CommonService } from "../../@theme/services/common.service";
import { ToastrService } from "ngx-toastr";
import { NbPopoverDirective } from '@nebular/theme';
import { RequestData } from '../../@theme/model/request-data.model';
import { FilterParameter } from '../../@theme/model/filterparameter.model';
import { DataFilter } from '../../@theme/model/datafilter.model';
import { PageData } from '../../@theme/model/page-data.model';
import { ResponseData } from '../../@theme/model/response-data.model';

@Component({
  selector: "ngx-color",
  templateUrl: "./color.component.html",
  styleUrls: ["./color.component.scss"],
})
export class ColorComponent implements OnInit, OnDestroy {
  public loading = false;

  public errorData: any = (errorData as any).default;
  public tableHeaders = ["supplierName", "billNo", "billDate", "chlNo", "chlDate", "billAmount"];
  tableStyle = "bootstrap";
  colorList = [];
  copyColorList = [];
  color = [];
  headers = [
    "Supplier Name",
    "Bill No",
    "Bill Date",
    "Challan No",
    "Challan Date",
  ];
  module = "color";

  @ViewChild('searchfilter', { static: true }) filterTextBox!: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  radioSelect = 0;
  flag = false;

  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  userId;
  userHeadId;
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
  disabled = false;

  searchStr = "";
  searchANDCondition = false;

  selectedColumnForFilter:string = '';
  requestData: RequestData = new RequestData();
  filterWord: string = '';
  operatorSelected = null;
  numberFlag: boolean = false;
  stringFlag: boolean = false;
  pageSizes: number[] = [10, 20, 50, 100];
  selectedPageSize: number = 20;
  
  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  constructor(
    private colorService: ColorService,

    private modalService: NgbModal,

    public colorGuard: ColorGuard,
    private toastr: ToastrService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.requestData.data = new DataFilter();
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];

    this.getViewAccess();
    this.getAddAcess();
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if (this.colorGuard.accessRights("view all")) {
      this.requestData.getBy = "all";
      this.getColor();
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else if (this.colorGuard.accessRights("view group")) {
      this.requestData.getBy = "group";
      this.getColor();
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    } else if (this.colorGuard.accessRights("view")) {
      this.requestData.getBy = "own";
      this.getColor();
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
  }
  getAddAcess() {
    if (this.colorGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.colorList = [];
    switch (event) {
      case 1:
        this.requestData.getBy = "own";
        this.getColor();
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.requestData.getBy = "group";
        this.getColor();
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.requestData.getBy = "all";
        this.getColor();
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.color;
    modalRef.componentInstance.moduleName = this.module;
  }

  closeFilterPopover() {
    this.popover.hide();
  }

  onClear(column?) {

    let index;
    if(column){
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    } else{
      index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    }
    
    if (index > -1) {
      this.filterWord = '';
      this.operatorSelected = null;
      this.requestData.data.parameters.splice(index, 1);
      this.requestData.data.pageIndex = 0;
      this.getColor();
    }

  }

  onOpenFilter(column) {

    if (column != "billAmount") {
      this.stringFlag = true;
      this.numberFlag = false;
    } else {
      if (column) {
        this.numberFlag = true;
        this.stringFlag = false;
      }
    }

    const indexForOpen = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == column));
    if (indexForOpen > -1) {
      this.filterWord = this.requestData.data.parameters[indexForOpen].value;
      this.operatorSelected = this.requestData.data.parameters[indexForOpen].operator;
    }
    else {
      this.filterWord = '';
      this.operatorSelected = null;
    }
    this.selectedColumnForFilter = column;
    this.popover.show();
  }

  onClearFilter() {
    this.popover.hide();
    if (this.requestData.data.parameters.length > 0) {
      this.requestData.data.parameters = [];
      this.getColor();
    }
  }

  onApplyFilter() {
    this.popover.hide();
    const index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
    if (index > -1) {
      this.requestData.data.parameters[index].operator = this.operatorSelected;
      this.requestData.data.parameters[index].value = this.filterWord;
    } else {
      let parameter = new FilterParameter();
      parameter.field = [this.selectedColumnForFilter];
      parameter.value = this.filterWord;
      parameter.operator = this.operatorSelected;
      this.requestData.data.parameters.push(parameter);
    }
    this.requestData.data.pageIndex = 0;
    this.getColor()
  }

  setPage(pageInfo) {
    this.requestData.data.pageIndex = pageInfo.offset;
    this.getColor()
  }

  // filter() {
  //   const val = this.searchStr.toString().toLowerCase().trim();
  //   const searchStrings = val.split("+").map(m => ({matched: false, val: m})); 
  //   this.colorList = this.copyColorList.filter((f) => 
  //   {
  //     let hit = 0;
  //     for(let v of searchStrings){
  //       if(
  //         this.tableHeaders.filter(m => this.matchString(f, m, v.val)).length
  //       ){
  //         v.matched = true;
  //         hit++;
  //         if(!this.searchANDCondition){
  //           return true; 
  //         }
  //       }
  //     }
  //     if(this.searchANDCondition && hit == searchStrings.length){
  //       return true;
  //     }
  //   });
  // }

  // matchString(item, key, searchString){
  //   if(item[key]){
  //     return item[key].toString().toLowerCase().includes(searchString);
  //   }else{
  //     return false;
  //   }
  // }
  pageSizeChanged(){
    this.requestData.data.pageSize = Number(this.selectedPageSize);
    this.getColor();
  }

  getColor() {
    this.loading = true;
    this.colorService.getColorPaginated(this.requestData).pipe(takeUntil(this.destroy$)).subscribe(
      (data: ResponseData) => {
        if (data["success"]) {
          const pageData = data.data as PageData;
          this.colorList = pageData.data;
          this.requestData.data.total = pageData.total;

          this.color = this.colorList.map((element) => ({
            id: element.id,
            supplierName: element.supplierName,
            billNo: element.billNo,
            billDate: element.billDate,
            chlNo: element.chlNo,
            chlDate: element.chlDate,
            billAmount: element.billAmount,
          }));

          // this.colorList = data["data"];
          let index = 0;
          this.colorList.forEach((element) => {
            this.colorList[index].billDate = new Date(
              element.billDate
            ).toDateString();
            this.colorList[index].chlDate = new Date(
              element.chlDate
            ).toDateString();
            index++;
          });

          this.copyColorList = this.colorList.map((element) => ({
            id: element.id,
            supplierName: element.supplierName,
            billNo: element.billNo,
            billDate: element.billDate,
            chlNo: element.chlNo,
            chlDate: element.chlDate,
            billAmount: element.billAmount,
          }));
        }
        
        this.loading = false;
      },
      (error) => {
        const index = this.requestData.data.parameters.findIndex(v => v.field.find(o => o == this.selectedColumnForFilter));
          if (index > -1) {
            this.filterWord = '';
            this.operatorSelected = null;
            this.requestData.data.parameters.splice(index, 1);
          }
        this.loading = false;
      }
    );
  }

  deleteColor(rowId) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.colorService.deleteColorById(rowId).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  getViewAccess() {
    if (!this.colorGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;
    if (!this.colorGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;
    if (!this.colorGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.colorGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }
    if (this.colorGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.colorGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }
  getDeleteAccess1() {
    if (this.colorGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.colorGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.colorGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    }
    if (this.colorGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }
  getEditAccess1() {
    if (this.colorGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }
}
