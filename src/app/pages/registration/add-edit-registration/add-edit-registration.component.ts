import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../../@theme/services/registration.service';
import { Registration } from '../../../@theme/model/registration';
import { CommonService } from '../../../@theme/services/common.service';
import * as errorData from "../../../@theme/json/error.json";
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'ngx-add-edit-registration',
  templateUrl: './add-edit-registration.component.html',
  styleUrls: ['./add-edit-registration.component.scss']
})
export class AddEditRegistrationComponent implements OnInit {

  registration :Registration = new Registration();

  fileToUpload: File = null;

  files;

  user: any;
  userHead;
  currentEmpId: any;
  formSubmitted = false;
  disableButton = false;
  value64:any

 
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService : RegistrationService,
    private toastr: ToastrService,


  ) { }

  ngOnInit(): void {

    this.getUserId();
  }

 
  // fileSelect(event){
  //   this.files = event.target.files[0];
  //   console.log(this.files)
  // }
  public getUserId() {
    this.user = this.commonService.getUser();
    this.userHead = this.commonService.getUserHeadId();
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
  }

  fileUpload(){
    
    const data = new FormData();
    data.append('file',this.fileToUpload);
    data.append('upload_preset','gfl_upload');
    data.append('cloud_name','dpemsdha5');

    this.registrationService.uploadImage(data).subscribe((response) => {
      if(response){
        console.log(response);
      }
    })


  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

    // const formData = new FormData();  
    
    
    //     formData.append('file', this.fileToUpload.data);  
    
    

    // const formData: FormData = new FormData();
    // formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    // console.log(formData)
    // this.registration.file = this.fileToUpload;

// }

// handleFileInput(event: any) {
//  // this.fileSize = false;
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     this.value64 = reader.result;
//     console.log(this.value64)

//   };
// }


  reset(form){
    form.reset();
    this.formSubmitted = false;
    }

  updateEmployee(form){

  }

  addEmployee(form){
    this.formSubmitted = true;
    this.disableButton = true;
    this.registration.id=0;
      this.fileUpload();
    this.registrationService.addEmployee(this.registration).subscribe(
      (data) => {
        if (data["success"]) {
          this.formSubmitted = false;
          this.reset(form);
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
