import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../@theme/services/common.service';
import { MaterialPhotos, Purchase } from '../../../@theme/model/purchase';
import { PurchaseNewService } from '../../../@theme/services/purchase-new.service';
import { UserService } from '../../../@theme/services/user.service';
import { AdminService } from '../../../@theme/services/admin.service';
import * as errorData from "../../../@theme/json/error.json";

@Component({
  selector: 'ngx-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.scss']
})
export class AddEditPurchaseComponent implements OnInit {

  loading = false;
  formSubmitted = false;
  disableButton = false;
  purchase : Purchase = new Purchase();
  materialPhotoArray : MaterialPhotos[] = [];
  bill;
  material;
  user;
  userHead;
  currentId;
  fileToUpload;
  docType;
  departmentList = [];
  approveByList = [];
  receiveByList = [];
  docList = [];
  constructor(
    private commonService: CommonService,
    private purchseService : PurchaseNewService,
    private userService : UserService,
    private adminService : AdminService,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.getAllDepartment();
    this.getApproveBy();
    this.getReceiveBy();
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentId = this._route.snapshot.paramMap.get("id");
    if(this.currentId){
      this.getCurrentPurchase();
    }
  }

  getCurrentPurchase(){
    this.purchseService.getPurchaseById(this.currentId).subscribe(
      (data) => {
        if (data["success"]) {
          this.purchase = data["data"];
          this.docList = this.purchase.materialPhotosList;
          

        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);

      }
    )
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

  getApproveBy() {
    this.loading = true;

    this.adminService.getAllApproveByData().subscribe((data) => {
      if (data["success"]) {
        this.approveByList = data["data"];
        this.loading = false;
      } else {
        // this.toastr.error(data["msg"]);
        this.loading = false;
      }
    });
  }


  getReceiveBy() {
    this.loading = true;

    this.adminService.getAllReceiveByData().subscribe((data) => {
      if (data["success"]) {
        this.receiveByList = data["data"];
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  fileUpload() {
    this.loading = true;

    const data = new FormData();
    data.append('file', this.fileToUpload);
    data.append('upload_preset', 'gfl_upload');
    data.append('cloud_name', 'dpemsdha5');

    this.purchseService.uploadImage(data).subscribe((response) => {
      if (response) {
        let obj = {
          id: null,
          type: this.docType,
          picUrl: response.secure_url,
          controlId: null
        }
        this.materialPhotoArray.push(obj)
        this.loading = false;
      }
    })


  }
  handleFileInput(files: FileList, type) {

    this.fileToUpload = files.item(0);
    this.docType = type;

    this.fileUpload();

  }

  reset(form){
    form.reset();
    this.formSubmitted = false;

  }

  addPurchase(form){
    this.disableButton = true;
    this.formSubmitted = true;
    if (form.valid) {
      this.purchase.createdBy = this.user.userId;
      this.purchase.materialPhotosList = this.materialPhotoArray;
      this.purchseService.addPurchase(this.purchase).subscribe(
        (data) => {
          if (data["success"]) {
            this.reset(form);
            this.disableButton = false;
            this.toastr.success(data['msg']);
            // this.disableButton=true;
          } else {
            this.toastr.error(data['msg']);
          }
          this.disableButton = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
    else{
      this.toastr.error("Fill empty fields");
 
    }
    this.disableButton = false;

  }

updatePurchase(form){
  this.loading = true;
  this.disableButton = true;
  this.formSubmitted = true;
  if (form.valid || !this.bill || !this.material) {
    if (this.materialPhotoArray.length > 0) {

      this.materialPhotoArray.forEach((ele, i) => {
        if (ele.type == 'bill') {
          this.docList[i] = ele;
        } else
          if (ele.type == 'material') {
            this.docList[i] = ele;
          }
      })
    }

    this.purchase.materialPhotosList = this.docList;



    this.purchseService.updatePurchase(this.purchase).subscribe(
      (data) => {
        if (data["success"]) {
          this.formSubmitted = false;

          this.route.navigate(["/pages/purchase"]);
          this.toastr.success(data['msg']);
        }else{
          this.toastr.error(data['msg']);
        }
        this.loading = false;
        this.disableButton = false;

      },
      (error) => {
        this.toastr.error(errorData.Update_Error);
        this.loading = false;
      }
    );
  } else {
    this.loading = false;
    this.disableButton = false;
  }
}
}


