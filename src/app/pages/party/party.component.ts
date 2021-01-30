import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
//import { ExportService } from 'app/@theme/services/export.service';
import { ExportPopupComponent } from 'app/@theme/components/export-popup/export-popup.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { JwtTokenService } from 'app/@theme/services/jwt-token.service';
import { PartyService } from "app/@theme/services/party.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-party",
  templateUrl: "./party.component.html",
  styleUrls: ["./party.component.scss"],
})
export class PartyComponent implements OnInit {
  public loading = false;
  public errorData: any = (errorData as any).default;
  permissions: Number;
  tablestyle = "bootstrap";
  disabled = false;
  selectedItem;
  partyList = [];
  copyPartyList = [];
  filteredPartyList = [];
  party = [];
  headers = ["Party Name", "Party Address1", "Contact No", "City", "State"];
  module = "party";
  flag = false;
  radioSelect = 0;
  radioArray = [
    { id: 1, value: "View Own", disabled: false },
    { id: 2, value: "View Group", disabled: false },
    { id: 3, value: "View All", disabled: false }
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


  index:any;
  selectedColumn:any;
  checkedArray = [];
  selectedFilter1 = "Contains";
  partyNameList = [];
  partyAddressList = [];
  partyContactList = [];
  partyCityList = [];
  partyStateList = [];
  distinctPartyNameList = [];
  distinctPartyAddressList = [];
  distinctPartyContactList = [];
  distinctPartyCityList = [];
  distinctPartyStateList = [];
  duplipartylist = [];

  filterListDiv = [];
  copyFilterListDiv = [];

  filterDivFlag: boolean = false;
  filterAndOrFlag: boolean = false;
  stepFlag:boolean = false;


  constructor(
    private partyService: PartyService,
    private route: Router,
    private modalService: NgbModal,
    public partyGuard: PartyGuard,
    public changeRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private commonService: CommonService,
    //private exportService: ExportService,
    private _NgbModal: NgbModal,
    private jwtToken: JwtTokenService,

  ) { }

  ngOnInit(): void {

    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getViewAccess();
    this.getAddAcess();
    // this.getAllParty(this.userId,"own");
    this.getDeleteAccess();
    this.getDeleteAccess1();
    this.getEditAccess();
    this.getEditAccess1();
    if (this.partyGuard.accessRights('view')) {
      this.getAllParty(this.userId, "own");
      this.hidden = this.ownDelete;
      this.hiddenEdit = this.ownEdit;
      this.radioSelect = 1;
    }
    else if (this.partyGuard.accessRights('view group')) {
      this.getAllParty(this.userHeadId, "group");
      this.hidden = this.groupDelete;
      this.hiddenEdit = this.groupEdit;
      this.radioSelect = 2;
    }
    else if (this.partyGuard.accessRights('view all')) {
      this.getAllParty(0, "all");
      this.hidden = this.allDelete;
      this.hiddenEdit = this.allEdit;
      this.radioSelect = 3;

    }
  }


  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const count = this.copyPartyList.length;
    const keys = Object.keys(this.copyPartyList[0]);
    this.partyList = this.copyPartyList.filter(item => {
      for (let i = 0; i < count; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }


  checked(value:any,ind:any){
    console.log("value:",value);
    console.log("index:",ind);

    if (this.stepFlag) {
      const count = this.duplipartylist.length;
      const keys = Object.keys(this.duplipartylist[0]);
      this.partyList = this.duplipartylist.filter(item => {
        for (let i = 0; i < count; i++) {
            if (
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  != value)
            ) {
              return true;
            }
          }
          
      });  
      this.duplipartylist = this.partyList
    }
    else if (!this.stepFlag){
      const count = this.copyPartyList.length;
    const keys = Object.keys(this.copyPartyList[0]);
    this.partyList = this.copyPartyList.filter(item => {
      for (let i = 0; i < count; i++) {
          if (
            (item[keys[this.index]] &&
              item[keys[this.index]]
                .toString()
                != value)
          ) {
            return true;
          }
        }
        
    });
    this.copyPartyList = this.partyList;
    }
    

  }

  outside() {

    // this.checkedArray = [];
    // const vari = document.querySelectorAll(".selector");
    // vari.forEach((ele:HTMLInputElement) =>{
    //   if(ele.checked){
    //     this.checkedArray.push(ele.name)
    //   }

    // })
    // const count = this.copyPartyList.length;
    // const keys = Object.keys(this.copyPartyList[0]);
    // this.partyList = this.copyPartyList.filter(item => {
    //   for (let i = 0; i < count; i++) {
    //     for(let j=0;j<this.checkedArray.length;j++){
    //       if (
    //         (item[keys[j]] &&
    //           item[keys[j]]
    //             .toString()
    //             == this.checkedArray[i])
    //       ) {
    //         return true;
    //       }
    //     }
        
    //   }
    // });
    // this.partyList = this.copyPartyList.filter(ele=>{
    //   for(let i=0;i<this.checkedArray.length;i++){
    //     if (ele.partyName == this.checkedArray[i]) {
    //       return true;
    //     }
    //   }
    // })
    this.filterDivFlag = false;

  }

  filterOpen(value: any,i:any) {
    this.selectedColumn = value;
    this.index = i;
    console.log("Index:",this.index)
    this.partyList = this.copyPartyList;
    this.filterDivFlag = true;
    if (value == "partyName") {
      this.filterListDiv = this.distinctPartyNameList;
      this.copyFilterListDiv = this.distinctPartyNameList;
    }
    else if (value == "partyAddress1") {
      this.filterListDiv = this.distinctPartyAddressList;
      this.copyFilterListDiv = this.distinctPartyAddressList;
    }
    else if (value == "contactNo") {
      this.filterListDiv = this.distinctPartyContactList;
      this.copyFilterListDiv = this.distinctPartyContactList;
    }
    else if (value == "city") {
      this.filterListDiv = this.distinctPartyCityList;
      this.copyFilterListDiv = this.distinctPartyCityList;
    }
    else if (value == "state") {
      this.filterListDiv = this.distinctPartyStateList;
      this.copyFilterListDiv = this.distinctPartyStateList;
    }
  }

  onChangeFilterSettings(value: any) {

    if (value == 1) {
      this.selectedFilter1 = "Contains";
    }
    else if (value == 2) {
      this.selectedFilter1 = "Not Contains";
    }
    else if (value == 3) {
      this.selectedFilter1 = "Equals";
    }
    else if (value == 4) {
      this.selectedFilter1 = "Not Equals";
    }
    else if (value == 5) {
      this.selectedFilter1 = "Starts with";
    }
    else if (value == 6) {
      this.selectedFilter1 = "Ends with";
    }

  }

  keyUpFilter(value: any) {
    this.stepFlag = true;
    const val = value.toString().toLowerCase().trim();
    const count = this.copyPartyList.length;
    const count1 = this.copyFilterListDiv.length;
    // this.filterAndOrFlag = true;
    if (value == "") {
      this.filterAndOrFlag = false;
      this.stepFlag = false;
    }
    if (this.selectedFilter1 == "Contains") {
      this.filterListDiv = this.copyFilterListDiv.filter((item) => {
        for (let i = 0; i < count1; i++) {
          if (
            (item.toString().toLowerCase().indexOf(val) !== -1) || !val) {
            return true;
          }
        }
      })

      const keys = Object.keys(this.copyPartyList[0]);
      this.partyList = this.copyPartyList.filter(item => {
        for (let i = 0; i < count; i++) {
          if (
            (item[keys[this.index]] &&
              item[keys[this.index]]
                .toString()
                .toLowerCase()
                .indexOf(val) !== -1) ||
            !val
          ) {
            return true;
          }
        }
      });
      this.duplipartylist = this.partyList;
    }
    else if (this.selectedFilter1 == "Not Contains") {

      if(val == ""){
        this.partyList = this.copyPartyList;
      }
      else{
        this.filterListDiv = this.copyFilterListDiv.filter((item) => {
          for (let i = 0; i < count1; i++) {
            if (
              (item.toString().toLowerCase().indexOf(val) !== -1) || !val) {
              return false;
            }
            else{
              return true;
            }
          }
        })
  
        const keys = Object.keys(this.copyPartyList[0]);
        this.partyList = this.copyPartyList.filter(item => {
          for (let i = 0; i < count; i++) {
            if (
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  .toLowerCase()
                  .indexOf(val) !== -1) ||
              !val
            ) {
              return false;
            }
            else{
              return true;
            }
          }
        });
        this.duplipartylist = this.partyList;
      }
      
    }
    else if (this.selectedFilter1 == "Equals") {
      if(val == ""){
        this.partyList = this.copyPartyList;
      }
      else{
        this.filterListDiv = this.copyFilterListDiv.filter((item) => {
          for (let i = 0; i < count1; i++) {
            if 
              (item.toString().toLowerCase() == val) {
              return true;
            }
          }
        })
  
        const keys = Object.keys(this.copyPartyList[0]);
        this.partyList = this.copyPartyList.filter(item => {
          for (let i = 0; i < count; i++) {
            if 
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  .toLowerCase()
                  == val
            ) {
              return true;
            }
          }
        });
        this.duplipartylist = this.partyList;
      }
    }
    else if (this.selectedFilter1 == "Not Equals") {
      if(val == ""){
        this.partyList = this.copyPartyList;
      }
      else{
        this.filterListDiv = this.copyFilterListDiv.filter((item) => {
          for (let i = 0; i < count1; i++) {
            if 
              (item.toString().toLowerCase() != val) {
              return true;
            }
          }
        })
  
        const keys = Object.keys(this.copyPartyList[0]);
        this.partyList = this.copyPartyList.filter(item => {
          for (let i = 0; i < count; i++) {
            if 
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  .toLowerCase()
                  != val
            ) {
              return true;
            }
          }
        });
        this.duplipartylist = this.partyList;
      }
    }
    else if (this.selectedFilter1 == "Starts with") {
      if(val == ""){
        this.partyList = this.copyPartyList;
      }
      else{
        this.filterListDiv = this.copyFilterListDiv.filter((item) => {
          for (let i = 0; i < count1; i++) {
            if 
              (item.toString().toLowerCase().charAt(0) == val) {
              return true;
            }
          }
        })
  
        const keys = Object.keys(this.copyPartyList[0]);
        this.partyList = this.copyPartyList.filter(item => {
          for (let i = 0; i < count; i++) {
            if 
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  .toLowerCase().charAt(0)
                  == val
            ) {
              return true;
            }
          }
        });
        this.duplipartylist = this.partyList;
      }
    }
    else if (this.selectedFilter1 == "Ends with") {
      if(val == ""){
        this.partyList = this.copyPartyList;
      }
      else{
        this.filterListDiv = this.copyFilterListDiv.filter((item) => {
          for (let i = 0; i < count1; i++) {
            if 
              (item.toString().toLowerCase().endsWith(val)) {
              return true;
            }
          }
        })
  
        const keys = Object.keys(this.copyPartyList[0]);
        this.partyList = this.copyPartyList.filter(item => {
          for (let i = 0; i < count; i++) {
            if 
              (item[keys[this.index]] &&
                item[keys[this.index]]
                  .toString()
                  .toLowerCase().endsWith(val)
            ) {
              return true;
            }
          }
        });
        this.duplipartylist = this.partyList;
      }
    }

  }

  searchFilterList(value: any) {
    const val = value.toString().toLowerCase().trim();
    const count = this.copyFilterListDiv.length;
    this.filterListDiv = this.copyFilterListDiv.filter((item) => {
      for (let i = 0; i < count; i++) {
        if (
          (item.toString().toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    })
  }


  getAllParty(id, getBy) {
    this.loading = true;
    this.partyNameList = [];
    this.partyAddressList = [];
    this.partyContactList = [];
    this.partyCityList = [];
    this.partyStateList = [];
    this.distinctPartyNameList = [];
    this.distinctPartyAddressList = [];
    this.distinctPartyContactList = [];
    this.distinctPartyCityList = [];
    this.distinctPartyStateList = [];

    this.partyService.getAllPartyList(id, getBy).subscribe(
      (data) => {

        if (data["success"]) {
          this.partyList = data["data"];
          this.party = this.partyList.map((element) => ({
            partyName: element.partyName, partyAddress1: element.partyAddress1, contactNo: element.contactNo,
            city: element.city, state: element.state
          }))

          this.copyPartyList = this.partyList.map((element) => ({
            partyName: element.partyName, partyAddress1: element.partyAddress1, contactNo: element.contactNo,
            city: element.city, state: element.state
          }));

          this.partyNameList = this.partyList.filter(
            (thing, i, arr) => arr.findIndex(t => t.partyName === thing.partyName) === i
          );
          this.partyNameList.map((element) => {
            if (element.partyName == null) {
              this.distinctPartyNameList = this.distinctPartyNameList;
            }
            else{
              this.distinctPartyNameList.push(element.partyName)
            }
          })

          this.partyAddressList = this.partyList.filter(
            (thing, i, arr) => arr.findIndex(t => t.partyAddress1 === thing.partyAddress1) === i
          );
          this.partyAddressList.map((element) => {
            if (element.partyAddress1 == null) {
              this.distinctPartyAddressList = this.distinctPartyAddressList;
            }
            else{
              this.distinctPartyAddressList.push(element.partyAddress1)
            }
          })

          this.partyContactList = this.partyList.filter(
            (thing, i, arr) => arr.findIndex(t => t.contactNo === thing.contactNo) === i
          );
          this.partyContactList.map((element) => {
            if (element.contactNo == null) {
              this.distinctPartyContactList = this.distinctPartyContactList;
            }
            else{
              this.distinctPartyContactList.push(element.contactNo)
            }
          })

          this.partyCityList = this.partyList.filter(
            (thing, i, arr) => arr.findIndex(t => t.city === thing.city) === i
          );
          this.partyCityList.map((element) => {
            if (element.city == null) {
              this.distinctPartyCityList = this.distinctPartyCityList;
            }
            else{
              this.distinctPartyCityList.push(element.city)
            }
          })

          this.partyStateList = this.partyList.filter(
            (thing, i, arr) => arr.findIndex(t => t.state === thing.state) === i
          );
          this.partyStateList.map((element) => {
            if (element.state == null) {
              this.distinctPartyStateList = this.distinctPartyStateList;
            }
            else{
              this.distinctPartyStateList.push(element.state)
            }
          })

        }
        else {
          // this.toastr.error(data['msg'])
        }
        this.loading = false;
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error)
        this.loading = false;
      }
    );
  }

  getViewAccess() {
    if (!this.partyGuard.accessRights('view')) {
      this.radioArray[0].disabled = true;
    }
    else
      this.radioArray[0].disabled = false;

    if (!this.partyGuard.accessRights('view group')) {
      this.radioArray[1].disabled = true;
    }
    else
      this.radioArray[1].disabled = false;

    if (!this.partyGuard.accessRights('view all')) {
      this.radioArray[2].disabled = true;
    }
    else
      this.radioArray[2].disabled = false;

  }

  getDeleteAccess() {
    if (this.partyGuard.accessRights('delete')) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    }

    if (this.partyGuard.accessRights('delete group')) {
      this.groupDelete = false;
      this.hidden = this.groupDelete;
    }
    if (this.partyGuard.accessRights('delete all')) {
      this.allDelete = false;
      this.hidden = this.allDelete;
    }
  }

  getDeleteAccess1() {
    if (this.partyGuard.accessRights('delete')) {
      this.ownDelete = false;
      this.hidden = this.ownDelete;
    } else {
      this.hidden = true;
    }
  }

  getEditAccess() {
    if (this.partyGuard.accessRights('edit')) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    if (this.partyGuard.accessRights('edit group')) {
      this.groupEdit = false;
      this.hiddenEdit = this.groupEdit;

    }
    if (this.partyGuard.accessRights('edit all')) {
      this.allEdit = false;
      this.hiddenEdit = this.allEdit;
    }
  }
  getEditAccess1() {
    if (this.partyGuard.accessRights('edit')) {
      this.ownEdit = false;
      this.hiddenEdit = this.ownEdit;
    }
    else {
      this.hiddenEdit = true;
    }
  }
  getAddAcess() {
    if (this.partyGuard.accessRights('add')) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }
  onChange(event) {
    this.partyList = [];
    switch (event) {
      case 1:
        this.getAllParty(this.userId, "own");
        this.hidden = this.ownDelete;
        this.hiddenEdit = this.ownEdit;
        break;

      case 2:
        this.getAllParty(this.userHeadId, "group");
        this.hidden = this.groupDelete;
        this.hiddenEdit = this.groupEdit;
        break;

      case 3:
        this.getAllParty(0, "all");
        this.hidden = this.allDelete;
        this.hiddenEdit = this.allEdit;
        break;
    }
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.party;
    modalRef.componentInstance.moduleName = this.module;
  }

  deleteParty(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.partyService.deletePartyDetailsById(id).subscribe(
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


}
