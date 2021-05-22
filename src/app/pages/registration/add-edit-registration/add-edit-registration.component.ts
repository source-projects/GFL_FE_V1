import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from "@techiediaries/ngx-qrcode";
import { NgxImageCompressService } from "ngx-image-compress";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../@theme/services/user.service";
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
export class AddEditRegistrationComponent implements OnInit, OnDestroy {
  docAdd = [];
  docUpdate = [];
  imageIndexFordocAdd = 0;
  imageIndexFordocUpdate = 0;
  imagePreviewFordocAdd: boolean = false;
  imagePreviewFordocUpdate: boolean = false;

  imgLoading = false;
  processValue: number = 0;
  uploadFlag: boolean = false;
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
  departmentList: any[];

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private route: Router,
    private imageCompress: NgxImageCompressService,
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let location = window.location;
    let urls = location["href"].split("registration");
    this.url = urls[0];
    this.uploadFlag = false;
    this.getUserId();
    this.getAllDepartment();
    if (this.currentEmpId) {
      this.getCurrentEmpData();
    }
    this.imagePreviewFordocAdd = false;
  }

  getAllDepartment() {
    this.userService.getAllDepartmentData().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          this.departmentList = data["data"];
          (this.departmentList);
        }
      },
      (error) => {}
    );
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
  }

  getCurrentEmpData() {
    this.docUpdate = [];
    this.registrationService
      .getEmployeeById(this.currentEmpId)
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        if (data["success"]) {
          this.registration = data["data"];
          this.docList = this.registration.employeeDocumentList;
          this.registration.employeeDocumentList.forEach((element) => {
            if (element.type == "profile") {
              this.imageUrl = element.url;
            } else {
              this.docUpdate.push(element.url);
            }
          });

          this.imagePreviewFordocUpdate = true;
        }
      }),
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      };
  }

  compressFile(type): any {
    if (type == "profile") {
      this.imageCompress
        .compressFile(this.imageUrl, -1, 50, 50)
        .then((result) => {
          this.imgResultAfterCompress = result;

          const imageBlob = this.dataURItoBlob(
            this.imgResultAfterCompress.split(",")[1]
          );

          this.imageFile = new File([result], this.fileToUpload.name, {
            type: "image/jpeg",
          });
          //return imageFile;
          this.fileUpload();
        });
    } else {
      this.imageCompress
        .compressFile(this.docUrl, -1, 50, 50)
        .then((result) => {
          this.imgResultAfterCompress = result;

          const imageBlob = this.dataURItoBlob(
            this.imgResultAfterCompress.split(",")[1]
          );

          this.imageFile = new File([result], this.fileToUpload.name, {
            type: "image/jpeg",
          });
          //return imageFile;
          this.fileUpload();
        });
    }
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
    // this.loading = true;

    this.docAdd = [];
    this.docUpdate = [];

    if (this.imageFile) {
      this.fileToUpload = this.imageFile;

      const data = new FormData();
      data.append("file", this.fileToUpload);
      data.append("upload_preset", "gfl_upload");
      data.append("cloud_name", "dpemsdha5");

      if (this.uploadFlag) {
        this.processValue = 0;
        this.httpClient
          .post(
            "https://api.cloudinary.com/v1_1/dpemsdha5/image/upload",
            data,
            {
              reportProgress: true,
              observe: "events",
            }
          )
          .pipe(takeUntil(this.destroy$)).subscribe(
            (event) => {
              //send success response
              if (event) {
                if (event.type === HttpEventType.UploadProgress) {
                  this.processValue = Math.round(
                    (100 * event.loaded) / event.total
                  );
                } else if (event.type == HttpEventType.Response) {
                }
              }
            },
            (err) => {
              //send error response
            }
          );
      }

      this.registrationService.uploadImage(data).pipe(takeUntil(this.destroy$)).subscribe((response) => {
        if (response) {
          let obj = {
            id: null,
            name: this.fileToUpload.name,
            type: this.docType,
            url: response.secure_url,
            controlId: null,
          };
          this.employeeDocumentArray.push(obj);
          this.docList.push(obj);

          this.docList.forEach((ele) => {
            if (!this.currentEmpId) {
              if (ele.type == "document") {
                if (this.docAdd.indexOf(ele.url) == -1) {
                  this.docAdd.push(ele.url);
                }

                this.imageIndexFordocAdd = 0;
              }
              this.imagePreviewFordocAdd = true;
            } else {
              if (ele.type == "document") {
                if (this.docUpdate.indexOf(ele.url) == -1) {
                  this.docUpdate.push(ele.url);
                }

                this.imageIndexFordocUpdate = 0;
              }
            }
          });
          // this.imgLoading = false;
        }
      });
    }

    // this.loading = false;

    // this.loading = false;
  }
  handleFileInput(files: FileList, type) {
    this.uploadFlag = false;
    if (type == "document") {
      this.uploadFlag = true;
    }
    this.fileToUpload = files.item(0);
    if (this.uploadFlag) {
      this.document = this.fileToUpload.name;
    }
    this.docType = type;
    this.document = this.fileToUpload.name;
    if (type == "profile") {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.compressFile(type);
      };
      reader.readAsDataURL(this.fileToUpload);
    } else {
      for (let i = 0; i < files.length; i++) {
        this.fileToUpload = files.item(i);
        const reader = new FileReader();
        reader.onload = () => {
          this.docUrl = reader.result as string;
          this.compressFile(type);
        };
        reader.readAsDataURL(this.fileToUpload);
      }
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
    if (this.docUpdate.length) {
      if (this.registration.name) {
        this.registration.id = this.currentEmpId;
        if (this.docList.length > 0) {
          this.docList.forEach((ele, i) => {
            if (ele.type == "profile") {
              this.docList[i] = ele;
            } else if (ele.type == "document") {
              this.docList[i] = ele;
            }
          });
        }

        this.registration.employeeDocumentList = this.docList;

        this.registrationService.updateEmployee(this.registration).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.formSubmitted = false;
              this.toastr.success(data["msg"]);
              this.route.navigate(["/pages/registration"]);
              // this.reset(form);
            } else {
              this.toastr.error(data["msg"]);
            }
            this.disableButton = false;
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      } else {
        this.disableButton = false;
      }
    } else {
      this.disableButton = false;
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

    this.registrationService.uploadImage(formData).pipe(takeUntil(this.destroy$)).subscribe((response) => {
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
    this.uploadFlag = false;
    this.formSubmitted = true;

    if (form.valid) {
      this.loading = true;

      this.disableButton = true;
      this.registration.id = 0;
      this.registration.employeeDocumentList = this.employeeDocumentArray;
      this.registrationService.addEmployee(this.registration).pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          if (data["success"]) {
            this.emp_id = data["data"];
            this.formSubmitted = false;
            this.disableButton = false;
            this.toastr.success(data["msg"]);
            this.docAdd = [];
            this.generateQR(this.emp_id);
            this.processValue = 0;
            this.loading = false;
            this.qrFlag = true;
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
    this.value = this.url + "attendance/" + empId;
    this.addQR(this.value);
    this.fileUpload();
  }

  addQR(finalurl) {
    let obj = {
      id: null,
      name: this.emp_id,
      type: "qr",
      url: finalurl,
      controlId: null,
    };
    let qrData = {
      url: finalurl,
      type: "qr",
      controlId: this.emp_id,
    };
    this.employeeDocumentArray.push(obj);
    this.registrationService.addQr(qrData).pipe(takeUntil(this.destroy$)).subscribe(
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

  removeImage(type, index) {
    if (type == "docAdd") {
      let rem = this.docAdd.splice(index, 1);
      this.docList.forEach((ele, index) => {
        if (ele.url == rem) {
          this.docList.splice(index, 1);
        }
      });
      if (this.docAdd.length == index) {
        this.imageIndexFordocAdd--;
      }
      this.docAdd = [...this.docAdd];
    } else if (type == "docUpdate") {
      let rem = this.docUpdate.splice(index, 1);
      this.docList.forEach((ele, index) => {
        if (ele.url == rem) {
          this.docList.splice(index, 1);
        }
      });

      if (this.docUpdate.length == index) {
        this.imageIndexFordocUpdate--;
      }
      this.docUpdate = [...this.docUpdate];
    }
  }

  previous(type) {
    if (type == "docAdd") {
      if (this.imageIndexFordocAdd) {
        this.imageIndexFordocAdd--;
      } else {
        this.imageIndexFordocAdd = this.docAdd.length - 1;
      }
    } else if (type == "docUpdate") {
      if (this.imageIndexFordocUpdate) {
        this.imageIndexFordocUpdate--;
      } else {
        this.imageIndexFordocUpdate = this.docUpdate.length - 1;
      }
    }
  }

  next(type) {
    if (type == "docAdd") {
      if (this.imageIndexFordocAdd < this.docAdd.length - 1) {
        this.imageIndexFordocAdd++;
      } else {
        this.imageIndexFordocAdd = 0;
      }
    } else if (type == "docUpdate") {
      if (this.imageIndexFordocUpdate < this.docUpdate.length - 1) {
        this.imageIndexFordocUpdate++;
      } else {
        this.imageIndexFordocUpdate = 0;
      }
    }
  }

  tableChange(event){
    if (event === "view table") {
      this.route.navigate(['/pages/registration/view']);
    }
  }
}
