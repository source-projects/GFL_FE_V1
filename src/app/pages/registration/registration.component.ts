import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { EmployeeRegistrationGuard } from '../../@theme/guards/employee-registration.guard';
import * as errorData from "../../@theme/json/error.json";
import { RegistrationService } from '../../@theme/services/registration.service';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  empData=[];
  copyEmpData = [];
  profileData = [];
  loading = false;
  url;
  emp_id;
  contact;
  href: string;
  value;
  qrFlag = false;
  tablestyle = "bootstrap";
  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;



  constructor(
    private registrationService : RegistrationService,
    private toastr: ToastrService,
    private route: Router,
    private modalService: NgbModal,
    public registrationGuard: EmployeeRegistrationGuard,


  ) { }

  ngOnInit(): void {

    this.getAccess();
    this.getAllEmployee();
    let location = window.location;
    let urls = location["href"].split("registration");
    this.url = urls[0];


  }
  getAccess() {
    if (this.registrationGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.registrationGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.registrationGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    }
  }

  
  getAllEmployee(){
    this.loading = true;
    this.registrationService.getAllEmployee().subscribe(
      (data) => {
        if(data["success"]){
          this.empData = data["data"];
          this.copyEmpData = this.empData.map((element) => ({
            id: element.id,
            name: element.name,
            contact: element.contact,
            aadhaar: element.aadhaar,
            employeeDocumentList: element.employeeDocumentList,
          }));
        }
        this.loading = false;
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);

      }
    )
  }


  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyEmpData[0]);
    this.empData = this.copyEmpData.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }


  deleteEmp(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.registrationService.deleteEmployee(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.getAllEmployee();

            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
          }
        );
      }
    });
  }

  generateQR(element,index){

    this.emp_id = index.empId;
    // this.contact = index.contact;
    // this.generateQRcode(this.emp_id);
    let doc = [];
    doc = index.employeeDocumentList;
    doc.forEach(ele=>{
      if(ele.type == "qr"){
        this.value = ele.url;
      }
    })
    this.qrFlag = true;
  }

  // generateQRcode(empId) {

  //   this.qrFlag = false;
  //   this.value = this.url + "attendance/" + empId;
  //   this.qrFlag = true;

  // }

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
        let url = response.secure_url;
        if (window.innerWidth >= 1024) {
          window.location.href =
            "https://web.whatsapp.com/send?phone=+91" +
            this.contact +
            "&text=" +
            url;
        } else {
          window.location.href =
            "whatsapp://send?phone=+91" +
            this.contact +
            "&text=" +
            url;
        }
      }
    });
  }




}
