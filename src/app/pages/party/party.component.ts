import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { PartyGuard } from "../../@theme/guards/party.guard";
import * as errorData from "../../@theme/json/error.json";
import { BtnCellRenderer } from "../../@theme/renderer/button-cell-renderer.component";
import { CommonService } from "../../@theme/services/common.service";
import { PartyService } from "../../@theme/services/party.service";
import { RequestData } from '../../@theme/model/request-data.model';
import { NbPopoverDirective } from '@nebular/theme';
import { FilterParameter } from '../../@theme/model/filterparameter.model';
import { DataFilter } from '../../@theme/model/datafilter.model';
import { PageData } from '../../@theme/model/page-data.model';
import { ResponseData } from '../../@theme/model/response-data.model';
import { cloneDeep } from 'lodash';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit, OnDestroy {

  @ViewChild('searchfilter', { static: true }) filterTextBox!: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  public loading = false;
  public errorData: any = (errorData as any).default;
  permissions: Number;
  tablestyle = "bootstrap";
  disabled = false;
  partyList = [];
  copyPartyList = [];
  filteredPartyList = [];
  party = [];
  testingData = [];
  headers = [];
  module = "party";
  flag = false;
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  userHeadId;
  userId;

  hidden: boolean = true;
  hiddenEdit: boolean = true;
  hiddenView: boolean = true;

  ownDelete = true;
  allDelete = true;
  groupDelete = true;

  ownEdit = true;
  allEdit = true;
  groupEdit = true;

  gridApi;
  gridColumnApi;
  gridOptions;
  context;
  columnDefs;
  defaultColDef;
  frameworkComponents;
  rowData;
  paginationPageSize;
  rowModelType;
  serverSideStoreType;
  rowSelection;

  public destroy$: Subject<void> = new Subject<void>();

  public tableHeaders = ["partyName", "partyCode", "partyAddress1", "contactNo", "city", "masterName"];
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private partyService: PartyService,
    private modalService: NgbModal,
    public partyGuard: PartyGuard,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private commonService: CommonService,
  ) {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }

  async ngOnInit() {
    this.requestData.data = new DataFilter();
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    await this.getViewAccess();
    await this.getAddAcess();
    // this.getAllParty(this.userId,"own");
    await this.getDeleteAccess();
    await this.getDeleteAccess1();
    await this.getEditAccess();
    await this.getEditAccess1();
    if (this.partyGuard.accessRights("view all")) {
      this.requestData.getBy = "all";
      this.getAllParty();
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else
      if (this.partyGuard.accessRights("view group")) {
        this.requestData.getBy = "group";
        this.getAllParty();
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        this.radioSelect = 2;
      } else
        if (this.partyGuard.accessRights("view")) {
          this.requestData.getBy = "own";
          this.getAllParty();
          this.hidden = this.ownDelete;
          this.hiddenEdit = this.ownEdit;
          this.radioSelect = 1;
        }
  }

  conditionChanged() {
    this.filter();
  }

  filter() {
    const val = this.searchStr.toString().toLowerCase().trim();
    const searchStrings = val.split("+").map(m => ({ matched: false, val: m }));
    this.partyList = this.copyPartyList.filter((f) => {
      let hit = 0;
      for (let v of searchStrings) {
        if (
          this.matchString(f, 'partyName', v.val) ||
          this.matchString(f, 'partyCode', v.val) ||
          this.matchString(f, 'partyAddress1', v.val) ||
          this.matchString(f, 'contactNo', v.val) ||
          this.matchString(f, 'city', v.val) ||
          this.matchString(f, 'masterName', v.val)
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
  }

  matchString(item, key, searchString) {
    if (item[key]) {
      return item[key].toLowerCase().includes(searchString);
    } else {
      return false;
    }
  }

  getAllParty() {
    this.loading = true;
    this.partyList = [];
    this.copyPartyList = [];
    this.rowData = [];
    this.partyService.getAllPartyListPaginated(this.requestData).pipe(takeUntil(this.destroy$)).subscribe(
      (data: ResponseData) => {
        if (data["success"]) {
          const pageData = data.data as PageData;
          this.partyList = cloneDeep(pageData.data);
          this.requestData.data.total = pageData.total;
          this.rowData = this.partyList;
          this.copyPartyList = data["data"];
          this.party = this.partyList.map((element) => ({
            id: element.id,
            partyName: element.partyName,
            partyAddress1: element.partyAddress1,
            contactNo: element.contactNo,
            city: element.city,
            partyCode: element.partyCode,
            masterName: element.masterName,
          }));
          this.copyPartyList = this.partyList.map((element) => ({
            id: element.id,
            partyName: element.partyName,
            partyAddress1: element.partyAddress1,
            contactNo: element.contactNo,
            city: element.city,
            partyCode: element.partyCode,
            masterName: element.masterName,
          }));
        } else {
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

  getViewAccess() {
    if (!this.partyGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;

    if (!this.partyGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;

    if (!this.partyGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.partyGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.ownDelete = this.hidden = true;
    }

    if (this.partyGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    } else {
      this.groupDelete = this.hidden = true;
    }
    if (this.partyGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    } else {
      this.allDelete = this.hidden = true
    }
  }

  getDeleteAccess1() {
    if (this.partyGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.partyGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.ownEdit = this.hiddenEdit = true
    }
    if (this.partyGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    } else {
      this.groupEdit = this.hiddenEdit = true
    }
    if (this.partyGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    } else {
      this.allEdit = this.hiddenEdit = true;
    }
  }
  getEditAccess1() {
    if (this.partyGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }
  getAddAcess() {
    if (this.partyGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.partyList = [];
    switch (event) {
      case 1:
        this.requestData.getBy = "own";
        this.getAllParty();
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.requestData.getBy = "group";
        this.getAllParty();
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.requestData.getBy = "all";
        this.getAllParty();
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;
    let headerArray = Object.keys(this.party[0]);
    headerArray.forEach(ele => {
      ele.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
    });
    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = headerArray;
    modalRef.componentInstance.list = this.party;
    modalRef.componentInstance.moduleName = this.module;
  }

  deleteParty(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.partyService.deletePartyDetailsById(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.onChange(this.radioSelect);
              this.toastr.success(errorData.Delete);
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  pageSizeChanged(){
    this.requestData.data.pageSize = Number(this.selectedPageSize);
    this.getAllParty();
  }

  setPage(pageInfo) {
    this.requestData.data.pageIndex = pageInfo.offset;
    this.getAllParty();
  }

  onOpenFilter(column) {

    if (column) {
      this.stringFlag = true;
      this.numberFlag = false;
    } 
    // else {
    //   if (column == "batchList") {
    //     this.numberFlag = true;
    //     this.stringFlag = false;
    //   }
    // }

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
    this.getAllParty();
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
      this.getAllParty();
    }

  }

  closeFilterPopover() {
    this.popover.hide();
  }

  onClearFilter() {
    this.popover.hide();
    if (this.requestData.data.parameters.length > 0) {
      this.requestData.data.parameters = [];
      this.getAllParty();
    }
  }
}
