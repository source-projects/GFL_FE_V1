import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../../@theme/services/registration.service';
import { Registration, EmployeeDocument } from '../../../@theme/model/registration';
import { CommonService } from '../../../@theme/services/common.service';
import * as errorData from "../../../@theme/json/error.json";
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'ngx-add-edit-registration',
  templateUrl: './add-edit-registration.component.html',
  styleUrls: ['./add-edit-registration.component.scss']
})
export class AddEditRegistrationComponent implements OnInit {

  registration: Registration = new Registration();
  employeeDocumentArray: EmployeeDocument[] = [];
  loading = false;
  fileToUpload: File = null;
  emp_id;
  files;
  myAngularxQrCode;
  user: any;
  userHead;
  currentEmpId: any;
  formSubmitted = false;
  disableButton = false;
  disableForm = false;
  value64: any
  url;
  qrFlag = false;
  docType;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value;
  document;
  profile;
  imageUrl = "../../../../assets/scan/user-new.png";
  docUrl;
  currentEmpData = [];
  docList = [];
  href: string;
  wLink;
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private route: Router,


  ) { }

  ngOnInit(): void {
    let location = window.location;
    let urls = location["href"].split("registration");
    this.url = urls[0];
    
    this.getUserId();
    if (this.currentEmpId) {
      this.getCurrentEmpData();
    }
  }



  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
  }

  getCurrentEmpData() {
    this.registrationService.getEmployeeById(this.currentEmpId).subscribe(
      (data) => {
        if (data["success"]) {
          this.registration = data["data"];
          this.docList = this.registration.employeeDocumentList;
          this.registration.employeeDocumentList.forEach(element => {
            if (element.type == "profile") {
              this.imageUrl = element.url;
            }
          })

        }
      }
    ), (error) => {
      this.toastr.error(errorData.Serever_Error);

    }
  }

  fileUpload() {
    this.loading = true;


    const data = new FormData();
    data.append('file', this.fileToUpload);
    data.append('upload_preset', 'gfl_upload');
    data.append('cloud_name', 'dpemsdha5');

    this.registrationService.uploadImage(data).subscribe((response) => {
      if (response) {
        let obj = {
          id: null,
          name: this.fileToUpload.name,
          type: this.docType,
          url: response.secure_url,
          controlId: null
        }
        this.employeeDocumentArray.push(obj)
        this.loading = false;

        // this.addEmployee(form);

      }
    })


  }
  handleFileInput(files: FileList, type) {

    this.fileToUpload = files.item(0);
    this.docType = type;
    if (this.docType == 'profile') {
      const reader = new FileReader();
      reader.onload = () => {

        this.imageUrl = reader.result as string;
      }
      reader.readAsDataURL(this.fileToUpload)

    }


    this.fileUpload();

  }



  reset(form) {
    form.reset();
    this.formSubmitted = false;
  }

  updateEmployee(form) {
    if (form.value.name) {
      this.formSubmitted = true;
      this.disableButton = true;
      this.registration.id = this.currentEmpId;
      if (this.employeeDocumentArray.length > 0) {

        this.employeeDocumentArray.forEach((ele, i) => {
          if (ele.type == 'profile') {
            this.docList[i] = ele;
          } else
            if (ele.type == 'document') {
              this.docList[i] = ele;
            }
        })
      }

      this.registration.employeeDocumentList = this.docList;


      this.registrationService.updateEmployee(this.registration).subscribe(
        (data) => {
          if (data["success"]) {
            this.formSubmitted = false;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
            this.route.navigate(["/pages/registration"]);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
          this.disableButton = false;
        }
      );
    }
    else{
      this.toastr.error("Enter empty fields");

    }


  }
  downloadImage() {
    this.href = document.getElementsByTagName('img')[0].src;
  }

  shareClick(){

   // let b64toBlob = require('b64-to-blob');
    this.href = document.getElementsByTagName('img')[0].src;
    
    // let parts = Base64Image.split(';base64,');
    // // HOLD THE CONTENT TYPE
    // const imageType = parts[0].split(':')[1];
    // // DECODE BASE64 STRING
    // const decodedData = window.atob(parts[1]);
    // // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    // const uInt8Array = new Uint8Array(decodedData.length);
    // // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    // for (let i = 0; i < decodedData.length; ++i) {
    //   uInt8Array[i] = decodedData.charCodeAt(i);
    // }
    // RETURN BLOB IMAGE AFTER CONVERSION
  //  return new Blob([uInt8Array], { type: imageType });
    // let block = this.href.split(";");
    // // let contentType = block[0].split(":")[1];
    // let contentType = "image/png"
    // let realData = block[1].split(",")[1];
    
    // let blob = b64toBlob(realData, contentType);
    // let blobUrl = URL.createObjectURL(blob);
    // console.log(blobUrl);
    // let formDataToUpload = new FormData();
    // formDataToUpload.append("image", blob);



    //const contentType = 'image/png';
    // let converted_image= "data:image/jpeg;base64,"+this.href;
    var fakeLink = document.createElement('a');
    fakeLink.setAttribute('href', 'whatsapp://send?text='+this.href);
    fakeLink.setAttribute('data-action', 'share/whatsapp/share');
    fakeLink.click();

   // window.location = 'whatsapp://send?text='+encodeURIComponent(this.href);
    // let arr = this.href.split(" ");
    // let link=arr[1];
    //this.wLink = "whatsapp://send?"+link;
  }

  addEmployee(form) {
    this.formSubmitted = true;

    if (form.valid) {
      this.loading = true;

      this.disableButton = true;
      this.registration.id = 0;
      // this.fileUpload();
      this.registration.employeeDocumentList = this.employeeDocumentArray;
      this.registrationService.addEmployee(this.registration).subscribe(
        (data) => {
          if (data["success"]) {
            this.emp_id = data["data"];
            this.formSubmitted = false;
            //this.disableForm = true;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
            this.loading = false;

            this.generateQR(this.emp_id);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
          this.disableButton = false;
        }
      );
    }


  }

  generateQR(empId) {
    this.qrFlag = true;

    this.value = this.url +"attendance/" + empId;
    this.fileUpload();
  }

  addQR(form) {
    this.href = document.getElementsByTagName('img')[1].src;

    let qrData = {
      url : this.href,
      type : "qr",
      controlId : this.emp_id
    }
    this.registrationService.addQr(qrData).subscribe(
     
        (data) => {
          if (data["success"]) {
          
            this.formSubmitted = false;
            //this.disableForm = true;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
          } else {
            this.toastr.error(data["msg"]);
          }
          this.disableButton = false;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
          this.disableButton = false;
        }
      );
    
  }

}

