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
  designationList;
  public isChangePass: boolean = false;
  public dataEntryFlag: boolean = false;
  //designation = ['Manager', 'Master', 'Accountant', 'Staff', 'Helper'];

  formSubmitted: boolean = false;

  forms = [
    "Party",
    "Quality",
    "User",
    "Stock-Batch",
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
    "Database",
    "Dyeing Slip",
    "Employee Registration",
    "Attendance",
    "Purchase",
    "Merge-Batch",
    "Report",
    "Task",
  ];

  userHeadList: any[] = [];

  perName = [
    "View",
    "Add",
    "Edit",
    "Delete",
    "View Group",
    "Edit Group",
    "Delete Group",
    "View All",
    "Edit All",
    "Delete All",
  ];

  perName1 = [
    "view",
    "add",
    "edit",
    "delete",
    "viewGroup",
    "editGroup",
    "deleteGroup",
    "viewAll",
    "editAll",
    "deleteAll",
  ];

  checkArray: any[] = [];

  data: any[] = [];
  decimal: any[] = [];
  userData: any;
  userId: any;
  userHead;
  isLoggedInAsMaster = false;
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
    this.user = new User();
    this.currentUserId = this._route.snapshot.paramMap.get("id");
    this.userId = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    if (this.userId.userId == this.userHead.userHeadId) {
      this.isLoggedInAsMaster = true;
    }
    this.getDesignation();
    this.getAllCompany();
    this.getAllDepartment();
    this.getUserHeadList();
    this.createPermission();
    if (this.currentUserId) {
      this.getCurrentUser();
    } else {
      this.user.isUserHead = false;
    }
  }

  getDesignation() {
    this.loading = true;
    this.userService.getDesignation().subscribe(
      (data) => {
        if (data["success"]) {
          this.designationList = data["data"];
          if (this.userHead.userHeadId) {
            this.designationList = this.designationList.filter(
              (v) => v.designation && v.designation.toLowerCase() != "team head"
            );
          }
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

  getUserHeadList() {
    this.userHeadList = [];
    this.userService.getAllHead().subscribe(
      (data) => {
        if (data["success"]) {
          this.userHeadList = data["data"] ? data["data"] : [];
          this.loading = false;
        } else this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
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

  designationSelected(event) {
    // const found = this.designationList.find((element) => element.id == event);
    // if (
    //   found &&
    //   found.designation &&
    //   found.designation.toLowerCase() == "team head"
    // ) {
    //   //hide userHeadId fields.
    //   this.user.isUserHead = false;
    //   this.user.userHeadId = Number(this.commonService.getUser().userId);
    // } else if (
    //   found &&
    //   found.designation &&
    //   found.designation.toLowerCase() == "team member"
    // ) {
    //   this.user.isUserHead = true;
    // } else {
    //   this.user.isUserHead = true;
    // }
  }

  createPermission() {
    this.permissionArray = [];
    for (let i = 0; i < this.forms.length; i++) {
      this.permissionArray.push(new Permissions());

      this.permissionArray[i].module = this.forms[i];
    }
  }

  setPermissionTrue(i) {
    let keys = Object.keys(this.permissionArray[i]);
    if (keys && keys.length) {
      keys.forEach((e) => {
        if (e != "module") {
          this.permissionArray[i][e] = true;
        }
      });
    }

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
    let keys = Object.keys(this.permissionArray[i]);
    if (keys && keys.length) {
      keys.forEach((e) => {
        if (e != "module") {
          this.permissionArray[i][e] = false;
        }
      });
    }
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
      case "Database": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Database"
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

      case "Input Data": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Input Data"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Dyeing Slip": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Dyeing Slip"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Employee Registration": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Employee Registration"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Attendance": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Attendance"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Purchase": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Purchase"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Merge-Batch": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Merge-Batch"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Report": {
        let index = this.permissionArray.findIndex((v) => v.module == "Report");
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }

      case "Task": {
        let index = this.permissionArray.findIndex((v) => v.module == "Task");
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
      ad: "",
      ds: "",
      emp: "",
      attnds: "",
      po: "",
      mg: "",
      rpt: "",
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
            let designationObj: any =
              this.user && this.user.designationId && this.user.designationId
                ? this.user.designationId
                : "";
            if (designationObj.designation.toLowerCase() != "team head") {
              this.user.isUserHead = true;
            } else {
              this.user.isUserHead = false;
            }
            this.user.designationId = data["data"].designationId.id;
            this.getCurrentCheckValue(this.user);
          }
          this.loading = false;
        },
        (error) => {
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
      if (this.user.password) {
        let md5 = new Md5();
        this.user.password = String(md5.appendStr(this.user.password).end());
      } else {
        this.user.password = "";
      }
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Update_Success);
          }
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

  departmentSelected(event) {
    if (event.userId) {
      this.user.userHeadId = event.userId;
      this.user.isUserHead = true;
    }else{
      this.user.userHeadId = Number(this.userId.userId);
      this.user.isUserHead = false;
    }
    this.user.isMaster = event.isMaster;
  }

  reset(myForm) {
    myForm.reset(myForm.value);
    this.user = new User();
    this.formSubmitted = false;
    for (var i = 0; i < this.permissionArray.length; i++) {
      this.setPermissionFalse(i);
      this.permissionArray[i].selectAll = false;
    }
    this.user.isMaster = true;
  }

  addUser(myForm) {
    this.getCheckedItem();

    this.disableButton = true;
    this.formSubmitted = true;

    if (myForm.valid) {
      let md5 = new Md5();
      this.user.password = String(md5.appendStr(this.user.password).end());
      this.user.createdBy = this.userId.userId;
      if (!this.user.isUserHead) {
        this.user.userHeadId = this.commonService.getUser().userId;
      }
      this.userService.createUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.reset(myForm);
            this.allRightsFlag = false;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
            this.getUserHeadList();
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
}
