import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { UserGuard } from "../../@theme/guards/user.guard";
import * as errorData from "../../@theme/json/error.json";
import { CommonService } from "../../@theme/services/common.service";
import { UserService } from "../../@theme/services/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit, OnDestroy {
  public errorData: any = (errorData as any).default;

  public loading = false;
  tableStyle = "bootstrap";
  userList = [];
  copyUserList = [];
  user = [];
  headers = ["User Name", "First Name", "Last Name", "Company", "Designation"];
  module = "user";

  flag = false;

  userId;
  userHeadId;
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false },
  ];

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

  public tableHeaders = ["userName","firstName", "lastName", "company","designation","department"];
  searchStr = "";
  searchANDCondition = false;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService,
    private commonService: CommonService,
    public userGuard: UserGuard,
  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];

    this.getViewAccess();
    this.getAddAcess();
    // this.getAllUser(this.userId,"own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if (this.userGuard.accessRights("view all")) {
      this.getAllUser(0, "all");
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;
    } else if (this.userGuard.accessRights("view group")) {
      this.getAllUser(this.userId, "group");
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    } else if (this.userGuard.accessRights("view")) {
      this.getAllUser(this.userId, "own");
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
  }
  getAddAcess() {
    if (this.userGuard.accessRights("add")) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.userList = [];
    switch (event) {
      case 1:
        this.getAllUser(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getAllUser(this.userId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getAllUser(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.user;
    modalRef.componentInstance.moduleName = this.module;
  }

  conditionChanged(){
    this.filter();
  }

  filter() {
    const val = this.searchStr.toString().toLowerCase().trim();
    const searchStrings = val.split("+").map(m => ({matched: false, val: m})); 
    this.userList = this.copyUserList.filter((f) => 
    {
      let hit = 0;
      for(let v of searchStrings){
        if(
          this.matchString(f, 'partyName', v.val) ||
          this.matchString(f, 'partyCode', v.val) ||
          this.matchString(f, 'partyAddress1', v.val) ||
          this.matchString(f, 'contactNo', v.val) ||
          this.matchString(f, 'city', v.val) ||
          this.matchString(f, 'masterName', v.val) 
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
    });
  }

  matchString(item, key, searchString){
    if(item[key]){
      return item[key].toLowerCase().includes(searchString);
    }else{
      return false;
    }
  }

  getAllUser(id, getBy) {
    this.loading = true;
    this.userService.getAllUser(id, getBy).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.userList = data["data"];
          this.user = this.userList.map((element) => ({
            id: element.id,
            userName: element.userName,
            firstName: element.firstName,
            lastName: element.lastName,
            company: element.company,
            designation: element.designation,
            department: element.department,
          }));
          this.copyUserList = this.userList.map((element) => ({
            id: element.id,
            userName: element.userName,
            firstName: element.firstName,
            lastName: element.lastName,
            company: element.company,
            designation: element.designation,
            department: element.department,
          }));
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  deleteUser(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.userService.deleteUserDetailsById(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }

  getViewAccess() {
    if (!this.userGuard.accessRights("view")) {
      this.radioArray[0].disabled = true;
    } else this.radioArray[0].disabled = false;
    if (!this.userGuard.accessRights("view group")) {
      this.radioArray[1].disabled = true;
    } else this.radioArray[1].disabled = false;
    if (!this.userGuard.accessRights("view all")) {
      this.radioArray[2].disabled = true;
    } else this.radioArray[2].disabled = false;
  }

  getDeleteAccess() {
    if (this.userGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }
    if (this.userGuard.accessRights("delete group")) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.userGuard.accessRights("delete all")) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }
  getDeleteAccess1() {
    if (this.userGuard.accessRights("delete")) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.userGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.userGuard.accessRights("edit group")) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;
    }
    if (this.userGuard.accessRights("edit all")) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }

  getEditAccess1() {
    if (this.userGuard.accessRights("edit")) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    } else {
      this.hiddenEdit = true;
    }
  }
}
