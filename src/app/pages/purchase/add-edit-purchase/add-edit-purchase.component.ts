import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../@theme/services/common.service';
import { MaterialPhotos, Purchase } from '../../../@theme/model/purchase';
import { PurchaseNewService } from '../../../@theme/services/purchase-new.service';
import { UserService } from '../../../@theme/services/user.service';
import { AdminService } from '../../../@theme/services/admin.service';
import * as errorData from "../../../@theme/json/error.json";
import { NgxImageCompressService } from 'ngx-image-compress';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'ngx-add-edit-purchase',
  templateUrl: './add-edit-purchase.component.html',
  styleUrls: ['./add-edit-purchase.component.scss']
})
export class AddEditPurchaseComponent implements OnInit {

  invUploadFlag:boolean = false;
  matUploadFlag:boolean = false;
  processValue = 0;
  processValue2=0;
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
imageUrl;
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  imageFile:File;
 
  constructor(
    private commonService: CommonService,
    private purchseService : PurchaseNewService,
    private userService : UserService,
    private adminService : AdminService,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private route: Router,
    private imageCompress: NgxImageCompressService,
    private httpClient: HttpClient,

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
          this.docList.forEach(element => {
            if(element.type == "bill"){
              this.bill = element.name;
            }else{
              this.material = element.name;
            }
          })

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

  compressFile(type){
  
    this.imageCompress.compressFile(this.imageUrl, -1, 50, 50).then(
      result => {
        this.imgResultAfterCompress = result;
        //console.log('Size in bytes is now:', this.imageCompress.byteCount(result)/(1024*1024));

        const imageBlob = this.dataURItoBlob(this.imgResultAfterCompress.split(',')[1]);

        this.imageFile = new File([result], this.fileToUpload.name, { type: 'image/jpeg' });
        //console.log(this.imageFile);
        //return imageFile;
        this.fileUpload(type);
      }
    );
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
    }


  fileUpload(type) {
    // this.loading = true;
    if(this.imageFile){
      this.fileToUpload = this.imageFile;
    const data = new FormData();
    data.append('file', this.fileToUpload);
    data.append('upload_preset', 'gfl_upload');
    data.append('cloud_name', 'dpemsdha5');

    this.httpClient.post('https://api.cloudinary.com/v1_1/dpemsdha5/image/upload', data,{
      reportProgress:true,
      observe:'events'
    })
      .subscribe(event => {
      //send success response
        if(event){
          if (event.type === HttpEventType.UploadProgress) {
            if(type == "bill"){
              this.processValue = Math.round(100 * event.loaded / event.total);
            }
            else if(type == "material"){
              this.processValue2 = Math.round(100 * event.loaded / event.total);
            }
          }else if(event.type==HttpEventType.Response){
          }
        }

      }, (err) => {
      //send error response
    });


    this.purchseService.uploadImage(data).subscribe((response) => {
      if (response) {
        let obj = {
          id: null,
          type: this.docType,
          name: this.fileToUpload.name,
          picUrl: response.secure_url,
          controlId: null
        }
        this.materialPhotoArray.push(obj)
        // this.loading = false;
      }
    })
  }else{
    this.loading = false;
  }

  }
  handleFileInput(files: FileList, type) {

    if(type == "bill"){
      this.invUploadFlag = true;
    }
    else if(type == "material"){
      this.matUploadFlag = true;
    }
    else{
      this.invUploadFlag = false;
      this.matUploadFlag = false;
    }

    this.fileToUpload = files.item(0);
    if(this.matUploadFlag){
      this.material = this.fileToUpload.name;
    }else{
      this.bill = this.fileToUpload.name;
    }
    this.docType = type;
    const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.compressFile(type);
      } 
      reader.readAsDataURL(this.fileToUpload)


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


