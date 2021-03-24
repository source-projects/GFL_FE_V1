import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../@theme/services/registration.service';
import * as errorData from "../../@theme/json/error.json";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../../@theme/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  empData=[];
  profileData = [];
  loading = false;
  tablestyle = "bootstrap";

  constructor(
    private registrationService : RegistrationService,
    private toastr: ToastrService,
    private route: Router,
    private modalService: NgbModal,


  ) { }

  ngOnInit(): void {

    this.getAllEmployee();
  }

  getAllEmployee(){
    this.registrationService.getAllEmployee().subscribe(
      (data) => {
        if(data["success"]){
          this.empData = data["data"];
          
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);

      }
    )
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

}
