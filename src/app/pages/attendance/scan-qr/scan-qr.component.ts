import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { RegistrationService } from "../../../@theme/services/registration.service";

@Component({
  selector: "ngx-scan-qr",
  templateUrl: "./scan-qr.component.html",
  styleUrls: ["./scan-qr.component.scss"],
})
export class ScanQRComponent implements OnInit {
  loading = false;
  formSubmitted = false;
  empId: any;
  list = [];
  employee;
  permissionDenied:boolean=false
  constructor(
    private registrationService: RegistrationService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
//     navigator.permissions.query({name: 'microphone'})
//  .then((permissionObj) => {
//  })
//  .catch((error) => {
//  })

 navigator.permissions.query({name: 'camera'})
 .then((permissionObj) => {
  if(permissionObj.state === 'denied'){
    this.permissionDenied=true
  }else{
    this.permissionDenied=false
  }
 })
 .catch((error) => {
 })
  }

  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    window.location.href = this.qrResultString;
  }

  // onSave() {
  //   this.registrationService.getEmployeeById(this.employee).subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         if (data["data"]) {
  //           this.route.navigate(['/pages/attendance/', this.employee]);
  //         }
  //         else {
  //           this.toastr.error(data["msg"]);

  //         }
  //       } else {
  //           this.toastr.error(data["msg"]);

  //       }
  //     },
  //     (error) => {

  //       this.toastr.error(errorData.Serever_Error);

  //     }
  //   )
  // }

  searchSelected(ele) {
    if (Number(ele.value.empid)) {
      this.registrationService.empIdExistOrNot(ele.value.empid).subscribe(
        (data) => {
          if (data["success"]) {
            if (data["data"][0]) {
              this.route.navigate(["/pages/attendance/", this.employee]);
            } else {
              this.employee=""
              this.toastr.error("Employee does not exist");
            }
          } else {
            
            this.toastr.error(data["msg"]);
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        }
      );
    }
    else{
    }
  }

}
