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

  invurl = [];
  maturl = [];
  invUpdateurl = []
  matUpdateurl = [];

  imgPreviewForinvAdd:boolean = false;
  imgPreviewForinvUpdate:boolean = false;
  imgPreviewFormatAdd:boolean = false;
  imgPreviewFormatUpdate:boolean = false;

  imageIndexForinvAdd = 0;
  imageIndexForinvUpdate = 0;
  imageIndexFormatAdd = 0;
  imageIndexFormatUpdate = 0;
  invUploadFlag: boolean = false;
  matUploadFlag: boolean = false;
  processValue = 0;
  processValue2 = 0;
  loading = false;
  formSubmitted = false;
  disableButton = false;
  purchase: Purchase = new Purchase();
  materialPhotoArray: MaterialPhotos[] = [];
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
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  imageFile: File;

  constructor(
    private commonService: CommonService,
    private purchseService: PurchaseNewService,
    private userService: UserService,
    private adminService: AdminService,
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
    this.imgPreviewForinvAdd = false;
    this.imgPreviewFormatAdd = false;
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentId = this._route.snapshot.paramMap.get("id");
    if (this.currentId) {
      this.getCurrentPurchase();
    }
  }

  getCurrentPurchase() {
    this.invUpdateurl = [];
    this.matUpdateurl = []
    this.purchseService.getPurchaseById(this.currentId).subscribe(
      (data) => {
        if (data["success"]) {
          this.purchase = data["data"];
          this.docList = this.purchase.materialPhotosList;
          this.docList.forEach(element => {
            if (element.type == "bill") {
              this.invUpdateurl.push(element.picUrl);
            } else {
              this.matUpdateurl.push(element.picUrl);
            }
          })

          this.imgPreviewForinvUpdate = true;
          this.imgPreviewFormatUpdate = true;
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
      (error) => { }
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

  compressFile(type) {

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
    this.matUpdateurl = [];
    this.invUpdateurl = [];
    this.invurl = [];
    this.maturl = [];
    if (this.imageFile) {
      this.fileToUpload = this.imageFile;
      const data = new FormData();
      data.append('file', this.fileToUpload);
      data.append('upload_preset', 'gfl_upload');
      data.append('cloud_name', 'dpemsdha5');

      this.httpClient.post('https://api.cloudinary.com/v1_1/dpemsdha5/image/upload', data, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe(event => {
          //send success response
          if (event) {
            if (event.type === HttpEventType.UploadProgress) {
              if (type == "bill") {
                this.processValue = Math.round(100 * event.loaded / event.total);
              }
              else if (type == "material") {
                this.processValue2 = Math.round(100 * event.loaded / event.total);
              }
            } else if (event.type == HttpEventType.Response) {
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
          this.docList.push(obj);
          this.docList
            .forEach(ele => {
              if (!this.currentId) {
                if (ele.type == "bill") {
                  this.invurl.push(ele.picUrl);
                }
                else {
                  this.maturl.push(ele.picUrl);
                }

                this.imgPreviewForinvAdd = true;
                this.imgPreviewFormatAdd = true;
              }
              else {
                if (ele.type == "bill") {
                  this.invUpdateurl.push(ele.picUrl);
                  this.imageIndexForinvUpdate = 0;
                }
                else {
                  this.matUpdateurl.push(ele.picUrl);
                  this.imageIndexFormatUpdate = 0;
                }
              }
            })
        }
      })
      
    } else {
      this.loading = false;
    }

  }
  handleFileInput(files: FileList, type) {

    if (type == "bill") {
      this.invUploadFlag = true;
    }
    else if (type == "material") {
      this.matUploadFlag = true;
    }
    else {
      this.invUploadFlag = false;
      this.matUploadFlag = false;
    }

    this.fileToUpload = files.item(0);
    if (this.matUploadFlag) {
      this.material = this.fileToUpload.name;
    } else {
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

  reset(form) {
    form.reset();
    this.formSubmitted = false;

  }

  addPurchase(form) {
    this.disableButton = true;
    this.formSubmitted = true;
    if (form.valid) {
      this.purchase.createdBy = this.user.userId;
      this.purchase.materialPhotosList = this.docList;
      this.purchseService.addPurchase(this.purchase).subscribe(
        (data) => {
          if (data["success"]) {
            this.reset(form);
            this.disableButton = false;
            this.toastr.success(data['msg']);
            this.invurl = [];
            this.maturl = [];
            this.invUploadFlag = false;
            this.matUploadFlag = false;
            this.processValue = 0;
            this.processValue2 = 0;
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
    else {
      this.toastr.error("Fill empty fields");

    }
    this.disableButton = false;

  }

  updatePurchase(form) {
    this.loading = true;
    this.disableButton = true;
    this.formSubmitted = true;
    
    if(this.invUpdateurl.length){
      if (this.purchase.departmentId && this.purchase.amt && this.purchase.approvedById && this.purchase.receiverById) {
        if (this.docList.length > 0) {
  
          this.docList.forEach((ele, i) => {
            if (ele.type == 'bill') {
              this.docList[i] = ele;
              this.docList[i].id = ele.id;
              this.docList[i].controlId = ele.controlId;
            } else
              if (ele.type == 'material') {
                this.docList[i] = ele;
                this.docList[i].id = ele.id;
                this.docList[i].controlId = ele.controlId;
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
            } else {
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
    else {
      this.loading = false;
      this.disableButton = false;
      this.invUpdateurl = [...this.invUpdateurl]
    } 
  }


  removeImage(type, index) {
    if (type == "invAdd") {
      let rem = this.invurl.splice(index,1);
      this.docList.forEach((ele,index)=>{
        if(ele.picUrl == rem){
          this.docList.splice(index,1)
        }
      })
      if(this.invurl.length == index){
        this.imageIndexForinvAdd--;    
      }
      this.invurl = [...this.invurl];
    }
    else if(type == "invUpdate"){
      let rem = this.invUpdateurl.splice(index,1);
      this.docList.forEach((ele,index)=>{
        if(ele.picUrl == rem){
          this.docList.splice(index,1)
        }
      })
      
      if(this.invUpdateurl.length == index){
        this.imageIndexForinvUpdate--;    
      }
      this.invUpdateurl = [...this.invUpdateurl];
    }
    else if(type == "matAdd"){
      let rem = this.maturl.splice(index,1);
      this.docList.forEach((ele,index)=>{
        if(ele.picUrl == rem){
          this.docList.splice(index,1)
        }
      })
      if(this.maturl.length == index){
        this.imageIndexFormatAdd--;    
      }
      this.maturl = [...this.maturl];    
    }
    else if(type == "matUpdate"){
      let rem = this.matUpdateurl.splice(index,1);
      this.docList.forEach((ele,index)=>{
        if(ele.picUrl == rem){
          this.docList.splice(index,1)
        }
      })
      if(this.matUpdateurl.length == index){
        this.imageIndexFormatUpdate--;    
      }
      this.matUpdateurl = [...this.matUpdateurl];

    }
  }

  previous(type){

    if(type == "invAdd"){
      if(this.imageIndexForinvAdd){
        this.imageIndexForinvAdd--;
      }
      else{
        this.imageIndexForinvAdd = this.invurl.length - 1;
      }
    }
    else if(type == "invUpdate"){
      if(this.imageIndexForinvUpdate){
        this.imageIndexForinvUpdate--;
      }
      else{
        this.imageIndexForinvUpdate = this.invUpdateurl.length - 1;
      }
    }
    else if(type == "matAdd"){
      if(this.imageIndexFormatAdd){
        this.imageIndexFormatAdd--;
      }
      else{
        this.imageIndexFormatAdd = this.maturl.length - 1;
      }
    }
    else if(type == "matUpdate"){
      if(this.imageIndexFormatUpdate){
        this.imageIndexFormatUpdate--;
      }
      else{
        this.imageIndexFormatUpdate = this.matUpdateurl.length - 1;
      }
    }
  }

  next(type){

    if(type == "invAdd"){
      if(this.imageIndexForinvAdd < (this.invurl.length - 1)){
        this.imageIndexForinvAdd++;
      }
      else{
        this.imageIndexForinvAdd = 0;
      }
    }
    else if(type == "invUpdate"){
      if(this.imageIndexForinvUpdate < (this.invUpdateurl.length - 1)){
        this.imageIndexForinvUpdate++;
      }
      else{
        this.imageIndexForinvUpdate = 0;
      }
    }
    else if(type == "matAdd"){
      if(this.imageIndexFormatAdd < (this.maturl.length - 1)){
        this.imageIndexFormatAdd++;
      }
      else{
        this.imageIndexFormatAdd = 0;
      }
    }
    else if(type == "matUpdate"){
      if(this.imageIndexFormatUpdate < (this.matUpdateurl.length - 1)){
        this.imageIndexFormatUpdate++;
      }
      else{
        this.imageIndexFormatUpdate = 0;
      }
    }
  }
}


