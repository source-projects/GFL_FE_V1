import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../../@theme/services/registration.service';
import { Registration , EmployeeDocument } from '../../../@theme/model/registration';
import { CommonService } from '../../../@theme/services/common.service';
import * as errorData from "../../../@theme/json/error.json";
import { FileUploader } from 'ng2-file-upload';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'ngx-add-edit-registration',
  templateUrl: './add-edit-registration.component.html',
  styleUrls: ['./add-edit-registration.component.scss']
})
export class AddEditRegistrationComponent implements OnInit {

  registration :Registration = new Registration();
  employeeDocumentArray :EmployeeDocument[] = [];
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
  value64:any
  url;
  qrFlag = false;
  docType;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value;
  document;
  profile;
 
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService : RegistrationService,
    private toastr: ToastrService,
    private route: Router


  ) { }

  ngOnInit(): void {
    let location = window.location;
    this.url = location["href"];
    this.getUserId();
  }

 
  
  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
    //this.url = this.commonService.envUrl();
  }

  fileUpload(){
    this.loading = true;
    const data = new FormData();
    data.append('file',this.fileToUpload);
    data.append('upload_preset','gfl_upload');
    data.append('cloud_name','dpemsdha5');

    this.registrationService.uploadImage(data).subscribe((response) => {
      if(response){
        let obj={
          id : null,
          name : this.fileToUpload.name,
          type : this.docType,
          url : response.secure_url,
          controlId : null
        }
        this.employeeDocumentArray.push(obj)
        this.loading = false;

        console.log(this.employeeDocumentArray)
        // this.addEmployee(form);
        
      }
    })


  }
  handleFileInput(files: FileList , type) {
    this.fileToUpload = files.item(0);
    this.docType = type;
   
    this.fileUpload();
  }


  reset(form){
    form.reset();
    this.formSubmitted = false;
    }

  updateEmployee(form){

  }

  addEmployee(form){
    if(form.valid){

    this.formSubmitted = true;
    this.disableButton = true;
    this.registration.id=0;
    // this.fileUpload();
    this.registration.employeeDocumentList = this.employeeDocumentArray;
    this.registrationService.addEmployee(this.registration).subscribe(
      (data) => {
        if (data["success"]) {
          this.emp_id = data["data"];
          this.formSubmitted = false;
          this.reset(form);
          this.disableButton = false;
          this.toastr.success(data["msg"]);
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
else{
  this.toastr.error("Enter empty fields");

}

  }

  generateQR(empId){
    this.qrFlag = true;

    this.value = this.url + "/attendance/" + empId;
    console.log(this.myAngularxQrCode);
  }

}
