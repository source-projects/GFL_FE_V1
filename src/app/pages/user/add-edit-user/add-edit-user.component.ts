import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { User, Permissions } from "app/@theme/model/user";
import { CommonService } from "app/@theme/services/common.service";
import { UserService } from "app/@theme/services/user.service";
import * as errorData from "app/@theme/json/error.json";
import { ToastrService } from "ngx-toastr";
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
} from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-add-edit-user",
  templateUrl: "./add-edit-user.component.html",
  styleUrls: ["./add-edit-user.component.scss"],
})
export class AddEditUserComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  //toaster config
  config: NbToastrConfig;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status;
  //allUserPermissionFlag=0;
  user: User = new User();

  permissions: Permissions = new Permissions();
  permissionArray: any[] = [];

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
    "Process",
    "Process Planning",
    "Jet Planning",
  ];
  
  userHradIdList;

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

  constructor(
    private route: Router,
    private _route: ActivatedRoute,
    private userService: UserService,
    public vcRef: ViewContainerRef,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getDesignation();
    this.getAllUserHrads();
    this.getUserId();
    if (this.currentUserId){
      this.getCurrentUser();
    } 
    else
      this.user.isUserHead = false;
    this.createPermission();
  }

  getAllUserHrads(){
    this.userService.getAllHead().subscribe(
      data=>{
        if(data["success"]){
          this.userHradIdList = data["data"]
        }
        else
          this.toastr.error(data["msg"])
      },
      error=>{
        this.toastr.error(errorData.Internal_Error)
      }
    )
  }

  public getUserId() {
    this.userId = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentUserId = this._route.snapshot.paramMap.get("id");
  }

  getUserHrads(event){
    if(this.user.isUserHead){
      if(!this.userHradIdList){
        this.userService.getAllHead().subscribe(
          data=>{
            if(data["success"]){
              this.userHradIdList = data["data"]
              this.user.isUserHead = true;
            }
            else
              this.toastr.error(data["msg"])
          },
          error=>{
            this.toastr.error(errorData.Internal_Error)
          }
        )
      }
    }else{
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
  }

  //select all user permissions
  selectAllPermissions(e){
      
    if(e.target.checked==true)
    {
      for(var i=0;i<this.permissionArray.length;i++)
      {
        this.setPermissionTrue(i);
        this.checkIfAllSelected(i);
      }
      
    }
    else{
      for(var i=0;i<this.permissionArray.length;i++)
      {
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
      case "Process": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Process"
        );
        if (e.target.checked == true) this.setPermissionTrue(index);
        else this.setPermissionFalse(index);
        break;
      }
      case "Process Planning": {
        let index = this.permissionArray.findIndex(
          (v) => v.module == "Process Planning"
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
    }
  }

  checkUncheckSelectAll(value,i){
    if(value == false){
      this.permissionArray[i].selectAll = false;
    }

    this.checkIfAllSelected(i);
  }

  checkIfAllSelected(i){
    if(this.permissionArray[i].view)
      if(this.permissionArray[i].add)
        if(this.permissionArray[i].edit)
          if(this.permissionArray[i].delete)
            if(this.permissionArray[i].viewAll)
              if(this.permissionArray[i].viewGroup)
                if(this.permissionArray[i].editGroup)
                  if(this.permissionArray[i].editAll)
                    if(this.permissionArray[i].deleteGroup)
                      if(this.permissionArray[i].deleteAll)
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
          if (array1[i1][j] == "1"){
            this.permissionArray[i1][element] = true;
            perString += "1";
          } 
          else{
            perString += "0";
            this.permissionArray[i1][element] = false;
          }
          j++;
        }
      });
      if(perString == "1111111111")
        this.permissionArray[i1].selectAll = true;
      else
        this.permissionArray[i1].selectAll = false;
      perString = "";
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
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  getCurrentUser() {
    if (this.currentUserId != null) {
      this.userService.getUserById(this.currentUserId).subscribe(
        (data) => {
          if (data["success"]) {
            this.user = data["data"];
            this.user.designationId = data["data"].designationId.id
            if(this.user.userHeadId != 0)
              this.user.isUserHead = true;
            else
              this.user.isUserHead = false;
            this.getCurrentCheckValue(this.user);

          } else {
            this.toastr.error(errorData.Internal_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
  }

  updateUser(userForm) {
    this.formSubmitted = true;
    if (userForm.valid) {
      this.user.updatedBy = this.userId.userId;
      this.getCheckedItem();
      //this.user.designationId = this.user.designationId.id;
      if(!this.user.isUserHead) 
        this.user.userHeadId = 0;
      this.userService.updateUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Update_Success);
          } else {
            this.toastr.error(data["msg"]);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
  }

  addUser(myForm) {
    this.getCheckedItem();
    //this.user.userPermissionData=this.userPermissionData;
    this.formSubmitted = true;
    if (myForm.valid) {
      this.user.createdBy = this.userId.userId;
      if (!this.user.isUserHead) this.user.userHeadId = 0;
      this.userService.createUser(this.user).subscribe(
        (data) => {
          if (data["success"]) {
            this.route.navigate(["/pages/user"]);
            this.toastr.success(errorData.Add_Success);
          } else {
            this.toastr.error(errorData.Add_Error);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
  }

  getDesignation() {
    this.userService.getDesignation().subscribe(
      (data) => {
        if (data["success"]) {
          this.desiList = data["data"];
        } else {
          this.toastr.error(errorData.Internal_Error);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }
}
