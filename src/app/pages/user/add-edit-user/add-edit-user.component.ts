import { Component, OnInit, Renderer2, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
} from "@nebular/theme";
import * as errorData from "../../../@theme/json/error.json";
import { Permissions, User } from "../../../@theme/model/user";
import { CommonService } from "../../../@theme/services/common.service";
import { UserService } from "../../../@theme/services/user.service";
import { ToastrService } from "ngx-toastr";
import { Md5 } from "ts-md5/dist/md5";
import { PartyService } from "../../../@theme/services/party.service";

@Component({
  selector: "ngx-add-edit-user",
  templateUrl: "./add-edit-user.component.html",
  styleUrls: ["./add-edit-user.component.scss"],
})
export class AddEditUserComponent implements OnInit {
  public errorData: any = (errorData as any).default;
  public loading = false;
  public disableButton = false;
  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  isMasterFlag = false;
  adminFlag = false;
  masterFlag = false;
  operatorFlag = false;
  status;
  allRightsFlag;
  user: User = new User();
  desi_list = [];
  permissions: Permissions = new Permissions();
  permissionArray: any[] = [];
  companyList = [];
  departmentList = [];
  master: any[] = [];
  currentUserData: any;
  desiList;

  //designation = ['Manager', 'Master', 'Accountant', 'Staff', 'Helper'];

  formSubmitted: boolean = false;

  forms = [
    "Party",
    "Quality",
    "User",
    "Stock-Batch",
    "Program",
    "Shade",
    "Supplier",
    "Supplier Rate",
    "Color Stock",
    "Dyeing Process",
    "Production Planning",
    "Jet Planning",
    "Payment",
    "Invoice",
    "Finished Meter",
    "Input Data",
    "Water Jet",
  ];

  userHradIdList: any[] = [];

  perName = [
    "View",
    "Add",
    "Edit",
    "Delete",
    "View Group",
    "View All",
    "Edit Group",
    "Edit All",
    "Delete Group",
    "Delete All",
  ];

  perName1 = [
    "view",
    "add",
    "edit",
    "delete",
    "viewGroup",
    "viewAll",
    "editGroup",
    "editAll",
    "deleteGroup",
    "deleteAll",
  ];

  checkArray: any[] = [];

  data: any[] = [];
  decimal: any[] = [];
  userData: any;
  userId: any;
  userHead;
  currentUserId: any;
  disableViewDependentPermission: boolean = false;
  disableViewGroupDependentPermission: boolean = false;
  disableViewAllDependentPermission: boolean = false;
  userNameExist = false;
  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private userService: UserService,
    public vcRef: ViewContainerRef,
    private toastr: ToastrService,
    private commonService: CommonService,
    private renderer: Renderer2,
    private partyService: PartyService
  ) {}

  async ngOnInit() {
    this.getDesignation();
    this.getAllCompany();
    this.getAllDepartment();
    await this.getUserId();
    if (this.currentUserId) {
      this.getCurrentUser();
    } else this.user.isUserHead = false;
    this.createPermission();
  }

  public getMaster(logInUserDetail) {
    let masterId;
    if (this.masterFlag) {
      this.master.push(logInUserDetail.name);
    } else if (this.operatorFlag) {
      this.master.push(logInUserDetail.userHeadName);
    } else {
      this.loading = true;
      this.partyService.getAllMaster().subscribe(
        (data) => {
          if (data["success"]) {
            this.master = data["data"];
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
  }
  checkUserName() {
    this.userNameExist = false;
    let id: Number = 0;
    if (this.user.id) id = this.user.id;
    this.userService.checkUserNameExist(this.user.userName, id).subscribe(
      (data) => {
        this.userNameExist = data["data"];
      },
      (error) => {}
    );
  }
  checkUser(logInUserDetail) {
    if (
      logInUserDetail.superUserHeadId == null &&
      logInUserDetail.userHeadId == null
    ) {
      this.adminFlag = true;
    } else if (
      logInUserDetail.userHeadId &&
      logInUserDetail.superUserHeadId == null
    ) {
      this.masterFlag = true;
    } else if (logInUserDetail.superUserHeadId && logInUserDetail.userHeadId) {
      this.operatorFlag = true;
    }
  }

  getAllUserHrads() {
    this.loading = true;
    if (this.masterFlag) {
      let obj = {
        id: this.currentUserData.id,
        name: this.currentUserData.name,
      };
      this.userHradIdList.push(obj);
      console.log(this.userHradIdList);
    } else {
      this.userService.getAllHead().subscribe(
        (data) => {
          if (data["success"]) {
            this.userHradIdList = data["data"];
            this.loading = false;
          }
          // this.toastr.error(data["msg"])
          else this.loading = false;
        },
        (error) => {
          // this.toastr.error(errorData.Internal_Error)
          this.loading = false;
        }
      );
    }
  }

  public getUserId() {
    this.userId = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    if (this.userHead.userHeadId == 0) {
      this.adminFlag = true;
    }
    this.currentUserId = this._route.snapshot.paramMap.get("id");
    this.userService.getUserHeadDetails(this.userId.userId).subscribe(
      (data) => {
        if (data["success"]) {
          this.currentUserData = data["data"];
          this.checkUser(this.currentUserData);
          if (this.masterFlag) {
            this.user.isUserHead = true;
          }
          this.getAllUserHrads();
        }
      },
      (error) => {}
    );
  }

  designationSelected(event) {
    if (event == undefined) {
      this.isMasterFlag = false;

      this.user.isUserHead = false;
    } else {
      const found = this.desi_list.find((element) => element.id == event);
      if ("Master" == found.designation) {
        //hide userHeadId fields.
        this.isMasterFlag = true;
        this.user.isUserHead = false;
        this.user.userHeadId = Number(this.commonService.getUser().userId);
      } else {
        this.isMasterFlag = false;
      }
    }
  }

  getAllCompany() {
    this.userService.getAllCompanyData().subscribe(
      (data) => {
        if (data["success"]) {
          this.companyList = data["data"];
        }
      },
      (error) => {}
    );
  }

  getAllDepartment() {
    this.userService.getAllDepartmentData().subscribe(
      (data) => {
        if (data["success"]) {
          this.departmentList = data["data"];
        }
      },
      (error) => {}
    );
  }

  getUserHrads(event) {
    this.loading = true;
    if (this.user.isUserHead) {
      if (!this.userHradIdList) {
        this.userService.getAllHead().subscribe(
          (data) => {
            if (data["success"]) {
              this.userHradIdList = data["data"];
              this.user.isUserHead = true;
            }
            // else
            //   this.toastr.error(data["msg"])
            this.loading = false;
          },
          (error) => {
            // this.toastr.error(errorData.Internal_Error)
            this.loading = false;
          }
        );
        this.loading = false;
      }
    } else {
      this.user.userHeadId = null;
    }
  }

  createPermission() {
    for (let i = 0; i < this.forms.length; i++) {
      this.permissionArray.push(new Permissions());
      this.permissionArray[i].module = this.forms[i];
      this.permissionArray[i].add = false;
      this.permissionArray[i].edit = false;
      this.permissionArray[i].delete = false;
      this.permissionArray[i].view = false;
      this.permissionArray[i].editAll = false;
      this.permissionArray[i].editGroup = false;
      this.permissionArray[i].deleteAll = false;
      this.permissionArray[i].deleteGroup = false;
      this.permissionArray[i].viewAll = false;
      this.permissionArray[i].viewGroup = false;
    }
  }

  setPermissionTrue(i) {
    this.permissionArray[i].add = true;
    this.permissionArray[i].edit = true;
    this.permissionArray[i].delete = true;
    this.permissionArray[i].view = true;
    this.permissionArray[i].editAll = true;
    this.permissionArray[i].editGroup = true;
    this.permissionArray[i].deleteAll = true;
    this.permissionArray[i].deleteGroup = true;
    this.permissionArray[i].viewAll = true;
    this.permissionArray[i].viewGroup = true;

    for (let j = 0; j < this.forms.length; j++) {
      this.checkIfAllSelected(j);
      if (!this.permissionArray[j].selectAll) {
        this.allRightsFlag = false;
        break;
      } else {
        this.allRightsFlag = true;
      }
    }
  }

  setPermissionFalse(i) {
    this.permissionArray[i].add = false;
    this.permissionArray[i].edit = false;
    this.permissionArray[i].delete = false;
    this.permissionArray[i].view = false;
    this.permissionArray[i].editAll = false;
    this.permissionArray[i].editGroup = false;
    this.permissionArray[i].deleteAll = false;
    this.permissionArray[i].deleteGroup = false;
    this.permissionArray[i].viewAll = false;
    this.permissionArray[i].viewGroup = false;
    this.allRightsFlag = false;
  }

  //select all user permissions
  selectAllPermissions(e) {
    if (e.target.checked == true) {
      for (var i = 0; i < this.permissionArray.length; i++) {
        this.setPermissionTrue(i);
        this.checkIfAllSelected(i);
      }
    } else {
      for (var i = 0; i < this.permissionArray.length; i++) {
        this.setPermissionFalse(i);
        this.permissionArray[i].selectAll = false;
      }
    }
  }
  checkUncheckAll(module, e) {
    switch (module) {
      case "Party": {
        let index = this.permissionArray.findIndex((v) => v.module == "Party");
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Quality": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Quality"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "User": {
        let index = this.permissionArray.findIndex((v) => v.module == "User");
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);

        break;
      }
      case "Stock-Batch": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Stock-Batch"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Program": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Program"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Shade": {
        let index = this.permissionArray.findIndex((v) => v.module == "Shade");
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Supplier": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Supplier"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Supplier Rate": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Supplier Rate"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Color Stock": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Color Stock"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Dyeing Process": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Dyeing Process"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Production Planning": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Production Planning"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Jet Planning": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Jet Planning"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Input Data": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Input Data"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Payment": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Payment"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Invoice": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Invoice"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Finished Meter": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Finished Meter"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Water Jet": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Water Jet"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
    }

    for (let j = 0; j < this.forms.length; j++) {
      if (!this.permissionArray[j].selectAll) {
        this.allRightsFlag = false;
        break;
      } else {
        this.allRightsFlag = true;
      }
    }
  }

  checkUncheckSelectAll(value, i, accessName) {
    switch (accessName) {
      case "view": {
        if (value) {
          this.disableViewDependentPermission = false;
        } else {
          this.disableViewDependentPermission = true;
          this.permissionArray[i].edit = !this.disableViewDependentPermission;
          this.permissionArray[i].add = !this.disableViewDependentPermission;
          this.permissionArray[i].delete = !this.disableViewDependentPermission;
        }
        break;
      }
      case "viewGroup": {
        if (value) {
          this.disableViewGroupDependentPermission = false;
        } else {
          this.disableViewGroupDependentPermission = true;
          this.permissionArray[i].editGroup = !this
            .disableViewGroupDependentPermission;
          this.permissionArray[i].deleteGroup = !this
            .disableViewGroupDependentPermission;
        }
        break;
      }
      case "viewAll": {
        if (value) {
          this.disableViewAllDependentPermission = false;
        } else {
          this.disableViewAllDependentPermission = true;
          this.permissionArray[i].editAll = !this
            .disableViewAllDependentPermission;
          this.permissionArray[i].deleteAll = !this
            .disableViewAllDependentPermission;
        }
        break;
      }
    }
    if (value == false) {
      this.permissionArray[i].selectAll = false;
    }

    this.checkIfAllSelected(i);

    for (let j = 0; j < this.forms.length; j++) {
      if (!this.permissionArray[j].selectAll) {
        this.allRightsFlag = false;
        break;
      } else {
        this.allRightsFlag = true;
      }
    }
  }

  checkIfAllSelected(i) {
    if (this.permissionArray[i].view)
      if (this.permissionArray[i].add)
        if (this.permissionArray[i].edit)
          if (this.permissionArray[i].delete)
            if (this.permissionArray[i].viewAll)
              if (this.permissionArray[i].viewGroup)
                if (this.permissionArray[i].editGroup)
                  if (this.permissionArray[i].editAll)
                    if (this.permissionArray[i].deleteGroup)
                      if (this.permissionArray[i].deleteAll)
                        this.permissionArray[i].selectAll = true;
  }

  getCheckedItem() {
    let binArray1 = {
      pa: "",
      qu: "",
      u: "",
      sb: "",
      prg: "",
      sh: "",
      su: "",
      sr: "",
      cs: "",
      pr: "",
      pp: "",
      jp: "",
      pt: "",
      d: "",
      bf: "",
      ip: "",
      wt: "",
    };
    Object.keys(binArray1).map((key, i) => {
      if (this.permissionArray[i].view == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].add == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].edit == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].delete == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].viewGroup == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].viewAll == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].editGroup == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].editAll == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].deleteGroup == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
      if (this.permissionArray[i].deleteAll == true) {
        binArray1[key] += "1";
      } else binArray1[key] += "0";
    });

    // get decimal
    let val;

    let temp = Object.keys(binArray1).map((key) => {
      val = binArray1[key];

      return { [key]: parseInt(this.bin2dec(val)) };
    });

    let t2 = temp.reduce((r, c) => Object.assign(r, c), {});

    // this.userPermissionData
    Object.keys(t2).forEach((key, i) => {
      this.user.userPermissionData = t2;
    });
  }

  bin2dec(val) {
    return parseInt(val, 2).toString(10);
  }

  getCurrentCheckValue(user) {
    let i = 0;
    let val;
    let arr = [];
    let array1 = [];
    let sliceArray = [];
    let temp = Object.keys(user.userPermissionData).map((key) => {
      val = user.userPermissionData[key];
      arr[i] = val;
      i++;
    });
    sliceArray = arr.slice(1, arr.length);
    for (let i = 0; i < sliceArray.length; i++) {
      array1[i] = this.dec2bin(sliceArray[i]);
      array1[i] = this.pad(array1[i], this.perName.length);
    }

    let index = [];
    let len = array1.length;
    let perString = "";
    for (let i1 = 0; i1 < this.forms.length; i1++) {
      let j = 0;
      this.perName1.forEach((element) => {
        if (element != "module") {
          if (array1[i1][j] == "1") {
            this.permissionArray[i1][element] = true;
            perString += "1";
          } else {
            perString += "0";
            this.permissionArray[i1][element] = false;
          }
          j++;
        }
      });
      if (perString == "1111111111") this.permissionArray[i1].selectAll = true;
      else this.permissionArray[i1].selectAll = false;
      perString = "";
    }

    for (let i = 0; i < this.forms.length; i++) {
      if (!this.permissionArray[i].selectAll) {
        this.allRightsFlag = false;
      } else {
        this.allRightsFlag = true;
      }
    }

    for (let j = 0; j < this.forms.length; j++) {
      if (!this.permissionArray[j].selectAll) {
        this.allRightsFlag = false;
        break;
      } else {
        this.allRightsFlag = true;
      }
    }
  }

  dec2bin(val: any) {
    return (val >>> 0).toString(2);
  }
  pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  checkIsDigit(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getCurrentUser() {
    this.loading = true;
    if (this.currentUserId != null) {
      this.userService.getUserById(this.currentUserId).subscribe(
        (data) => {
          if (data["success"]) {
            this.user = data["data"];
            if (data["data"].designationId.designation != "Master") {
              this.user.isUserHead = true;
              this.isMasterFlag = false;
            } else {
              this.user.isUserHead = false;
              this.isMasterFlag = true;
            }
            this.user.designationId = data["data"].designationId.id;

            this.getCurrentCheckValue(this.user);
          } else {
            // this.toastr.error(errorData.Internal_Error);
          }
          this.loading = false;
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );
    }
  }

  updateUser(userForm) {
    this.disableButton = true;

    this.loading = true;
    this.formSubmitted = true;
    if (userForm.valid) {
      this.user.updatedBy = this.userId.userId;
      this.getCheckedItem();
      //this.user.designationId = this.user.designationId.id;
      if (!this.user.isUserHead)
        this.user.userHeadId = this.commonService.getUser().userId;
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Update_Success);
          }
          // else {
          //   this.toastr.error(data["msg"]);
          // }
          this.disableButton = false;
          this.loading = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
          this.loading = false;
          this.disableButton = false;
        }
      );
    } else {
      this.disableButton = false;

      const errorField = this.renderer.selectRootElement("#target");
      errorField.scrollIntoView();
    }
  }

  reset(myForm) {
    myForm.reset();

    this.formSubmitted = false;
    for (var i = 0; i < this.permissionArray.length; i++) {
      this.setPermissionFalse(i);
      this.permissionArray[i].selectAll = false;
    }
  }

  addUser(myForm) {
    this.getCheckedItem();
    //this.user.userPermissionData=this.userPermissionData;
    this.disableButton = true;

    this.formSubmitted = true;
    if (myForm.valid) {
      let md5 = new Md5();
      this.user.password = String(md5.appendStr(this.user.password).end());
      this.user.createdBy = this.userId.userId;
      if (!this.user.isUserHead)
        this.user.userHeadId = this.commonService.getUser().userId;
      this.userService.createUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.reset(myForm);
            this.allRightsFlag = false;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.disableButton = false;
          this.toastr.error(errorData.Serever_Error);
        }
      );
    } else {
      this.disableButton = false;
      const errorField = this.renderer.selectRootElement("#target");
      errorField.scrollIntoView();
    }
  }

  getDesignation() {
    this.loading = true;
    this.userService.getDesignation().subscribe(
      (data) => {
        if (data["success"]) {
          this.desiList = data["data"];
          if (this.userHead.userHeadId > 0) {
            this.desiList.forEach((element) => {
              if (element.designation != "Master") this.desi_list.push(element);
            });
          } else {
            this.desi_list = this.desiList;
          }

          this.loading = false;
        } else {
          // this.toastr.error(errorData.Internal_Error);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );
  }
}
