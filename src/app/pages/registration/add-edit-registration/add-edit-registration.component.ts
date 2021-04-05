import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from "@techiediaries/ngx-qrcode";
import { NgxImageCompressService } from "ngx-image-compress";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import {
  EmployeeDocument,
  Registration,
} from "../../../@theme/model/registration";
import { CommonService } from "../../../@theme/services/common.service";
import { RegistrationService } from "../../../@theme/services/registration.service";
@Component({
  selector: "ngx-add-edit-registration",
  templateUrl: "./add-edit-registration.component.html",
  styleUrls: ["./add-edit-registration.component.scss"],
})
export class AddEditRegistrationComponent implements OnInit {
  imgLoading = false;
  progress = 0;
  image;
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
  value64: any;
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
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  localUrl;
  imageFile: File = null;
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private route: Router,
    private imageCompress: NgxImageCompressService
  ) {}

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
    this.registrationService
      .getEmployeeById(this.currentEmpId)
      .subscribe((data) => {
        if (data["success"]) {
          this.registration = data["data"];
          this.docList = this.registration.employeeDocumentList;
          this.registration.employeeDocumentList.forEach((element) => {
            if (element.type == "profile") {
              this.imageUrl = element.url;
            }
          });
        }
      }),
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      };
  }

  compressFile(): any {
    this.imageCompress
      .compressFile(this.imageUrl, -1, 50, 50)
      .then((result) => {
        this.imgResultAfterCompress = result;
        //console.log('Size in bytes is now:', this.imageCompress.byteCount(result)/(1024*1024));

        const imageBlob = this.dataURItoBlob(
          this.imgResultAfterCompress.split(",")[1]
        );

        this.imageFile = new File([result], this.fileToUpload.name, {
          type: "image/jpeg",
        });
        //console.log(this.imageFile);
        //return imageFile;
        this.fileUpload();
      });
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }

  fileUpload() {
    this.loading = true;

    // this.imageFile =  this.compressFile();
    console.log(this.imageFile);
    if (this.imageFile) {
      this.fileToUpload = this.imageFile;

      const data = new FormData();
      data.append("file", this.fileToUpload);
      data.append("upload_preset", "gfl_upload");
      data.append("cloud_name", "dpemsdha5");

      this.registrationService.uploadImage(data).subscribe((response) => {
        if (response) {
          let obj = {
            id: null,
            name: this.fileToUpload.name,
            type: this.docType,
            url: response.secure_url,
            controlId: null,
          };
          this.employeeDocumentArray.push(obj);
          this.imgLoading = false;
        }
      });
    }
    this.loading = false;
  }
  handleFileInput(files: FileList, type) {
    this.fileToUpload = files.item(0);
    this.docType = type;
    if (this.docType == "profile") {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.compressFile();
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      this.compressFile();
    }
  }

  reset(form) {
    form.reset();
    this.formSubmitted = false;
    this.imageUrl = "../../../../assets/scan/user-new.png";
  }

  updateEmployee(form) {
    this.formSubmitted = true;
    this.disableButton = true;
    if (form.valid || !this.document) {
      this.registration.id = this.currentEmpId;
      if (this.employeeDocumentArray.length > 0) {
        this.employeeDocumentArray.forEach((ele, i) => {
          if (ele.type == "profile") {
            this.docList[i] = ele;
          } else if (ele.type == "document") {
            this.docList[i] = ele;
          }
        });
      }

      this.registration.employeeDocumentList = this.docList;

      this.registrationService.updateEmployee(this.registration).subscribe(
        (data) => {
          if (data["success"]) {
            this.formSubmitted = false;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
            this.reset(form);
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
  downloadImage() {
    this.href = document.getElementsByTagName("img")[0].src;
  }

  shareImage() {
    this.href = document.getElementsByTagName("img")[0].src;
    const formData: FormData = new FormData();
    formData.append("upload_preset", "gfl_upload");
    formData.append("cloud_name", "dpemsdha5");
    formData.append("file", this.href);

    this.registrationService.uploadImage(formData).subscribe((response) => {
      if (response) {
        let obj = {
          id: null,
          name: this.emp_id,
          type: "qr",
          url: response.secure_url,
          controlId: null,
        };
        this.employeeDocumentArray.push(obj);
        let url = response.secure_url;
        this.addQR(url);
        if (window.innerWidth >= 1024) {
          window.location.href =
            "https://web.whatsapp.com/send?phone=+91" +
            this.registration.contact +
            "&text=" +
            url;
        } else {
          window.location.href =
            "whatsapp://send?phone=+91" +
            this.registration.contact +
            "&text=" +
            url;
        }
      }
    });
  }

  addEmployee(form) {
    this.formSubmitted = true;

    if (form.valid) {
      this.loading = true;

      this.disableButton = true;
      this.registration.id = 0;
      this.registration.employeeDocumentList = this.employeeDocumentArray;
      this.registrationService.addEmployee(this.registration).subscribe(
        (data) => {
          if (data["success"]) {
            this.emp_id = data["data"];
            this.formSubmitted = false;
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

    this.value = this.url + "attendance/" + empId;
    this.fileUpload();
  }

  addQR(finalurl) {
    let qrData = {
      url: finalurl,
      type: "qr",
      controlId: this.emp_id,
    };
    this.registrationService.addQr(qrData).subscribe(
      (data) => {
        if (data["success"]) {
          this.formSubmitted = false;
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
