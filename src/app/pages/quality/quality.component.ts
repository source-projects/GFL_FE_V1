import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { QualityGuard } from "../../@theme/guards/quality.guard";
import * as errorData from "../../@theme/json/error.json";
import { Page } from "../../@theme/model/page";
import { CommonService } from "../../@theme/services/common.service";
import { JwtTokenService } from "../../@theme/services/jwt-token.service";
import { QualityService } from "../../@theme/services/quality.service";
import { StoreTokenService } from "../../@theme/services/store-token.service";
@Component({
  selector: "ngx-quality",
  templateUrl: "./quality.component.html",
  styleUrls: ["./quality.component.scss"],
})
export class QualityComponent implements OnInit, OnDestroy {
  public loading = false;
  public errorData: any = (errorData as any).default;
  permissions: Number;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];
  qualityList = [];
  copyQualityList = [];
  quality = [];
  headers = ["Quality Id", "Quality Name", "Quality Type", "Party Name"];
  module = "quality";

  flag = false;

  radioSelect = 0;
  userId;
  userHeadId;
  tableStyle = "bootstrap";

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

  public page = new Page();
  public pageSelector = new FormControl("10");
  public limitArray: Array<number> = [10, 30, 50, 100];
  pageSelected: number = 1;
  @ViewChild(DatatableComponent, { static: false })
  DataTable: DatatableComponent;

  public tableHeaders = ["qualityId","qualityName", "partyName", "partyCode","wtPer100m","rate"];
  searchStr = "";
  searchANDCondition = false;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private commonService: CommonService,
    public qualityGuard: QualityGuard,
    private qualityService: QualityService,
    private toastr: ToastrService,
    private jwtToken: JwtTokenService,
    private storeTokenService: StoreTokenService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
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
    if (this.qualityGuard.accessRights("view all")) {
      this.getQualityList(0, "all");
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else if (this.qualityGuard.accessRights("view group")) {
      this.getQualityList(this.userId, "group");
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    } else if (this.qualityGuard.accessRights("view")) {
      this.getQualityList(this.userId, "own");
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  conditionChanged(){
    this.filter();
  }

  filter() {
    const val = this.searchStr.toString().toLowerCase().trim();
    const searchStrings = val.split("+").map(m => ({matched: false, val: m}));
    this.qualityList = this.copyQualityList.filter((f) => 
    {
      let hit = 0;
      for(let v of searchStrings){
        if(
          this.matchString(f, 'qualityId', v.val) ||
          this.matchString(f, 'qualityName', v.val) ||
          this.matchString(f, 'partyName', v.val) ||
          this.matchString(f, 'partyCode', v.val) ||
          this.matchString(f, 'wtPer100m', v.val) ||
          this.matchString(f, 'rate', v.val)
        ){
          v.matched = true;
          hit++;
          if(!this.searchANDCondition){
            return true; 
          }
        }
      }
      if(this.searchANDCondition && hit == searchStrings.length){
        return true;
      }
    }
    );
  }

  matchString(item, key, searchString){
    if(item[key]){
      return item[key].toString().toLowerCase().includes(searchString);
    }else{
      return false;
    }
  }

  getAddAcess() {
    if (this.qualityGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  onChange(event) {
    this.qualityList = [];
    switch (event) {
      case 1:
        this.getQualityList(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getQualityList(this.userId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getQualityList(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.quality;
    modalRef.componentInstance.moduleName = this.module;
  }

  getQualityList(id, getBy) {
    this.loading = true;
    this.qualityService.getallQuality(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.qualityList = data["data"];
          this.quality = this.qualityList.map((element) => ({
            id: element.id,
            qualityId: element.qualityId,
            qualityName: element.qualityName,
            partyName: element.partyName,
            wtPer100m: element.wtPer100m,
            rate: element.rate,
            partyCode: element.partyCode,
          }));
          this.copyQualityList = this.qualityList.map((element) => ({
            id: element.id,
            qualityId: element.qualityId,
            qualityName: element.qualityName,
            partyName: element.partyName,
            wtPer100m: element.wtPer100m,
            rate: element.rate,
            partyCode: element.partyCode,
          }));
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getViewAccess() {
    if (!this.qualityGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;
    if (!this.qualityGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;
    if (!this.qualityGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.qualityGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }
    if (this.qualityGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.qualityGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }
  getDeleteAccess1() {
    if (this.qualityGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.qualityGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.qualityGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    }
    if (this.qualityGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }
  getEditAccess1() {
    if (this.qualityGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }

}
