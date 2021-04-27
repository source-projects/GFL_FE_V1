import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../@theme/json/error.json";
import { CommonService } from "../../@theme/services/common.service";
import { RegistrationService } from "../../@theme/services/registration.service";

export class Attendance {
  controlId: number;
  date: Date;
  inTime: Date;
  outTime: Date;
  createdBy: number;
  createdDate: Date;
  updatedDate: Date;
  updatedBy: number;
  id: number;
  shift: boolean;

  constructor() {
    this.date = new Date();
    this.shift = false;
  }
}
@Component({
  selector: "ngx-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent implements OnInit {
  user;
  currentEmpId;
  currentData;
  loading = false;
  formSubmitted = false;
  disableButton = false;
  disableIn = false;
  disableOut = false;
  profileUrl;
  date;
  todayDate;
  currentDate = new Date();
  dateForPicker = new Date()
  employeeDetail: any;
  attendance: Attendance = new Attendance();
  selectedDate
  maxDate
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getUserId();
   
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.attendance.createdBy = this.user.userId;
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
    this.getEmployeeById();
    this.date = new Date(
      this.currentDate.getTime() - this.currentDate.getTimezoneOffset() * 60000
    ).toISOString();
    this.maxDate = new Date(
      this.dateForPicker.getFullYear(),
      this.dateForPicker.getMonth(),
      this.dateForPicker.getDate(),
      23,
      59
    );
    this.attendance.date = this.maxDate;
    this.selectedDate=this.maxDate
  }

  shiftChanged() {
    let obj = {
      date: this.selectedDate,
      shift: this.attendance.shift,
      id: this.currentEmpId,
    };
    this.registrationService.getAttendenceByEmpId(obj).subscribe((data) => {
      if (data["success"]) {
        //this.employeeDetail = data['data'].employeeMast;
        this.attendance = data["data"].attendanceLatest;
        this.attendance.shift = obj.shift;
        if (this.attendance.inTime) {
          this.disableIn = true;
        } else {
          this.disableIn = false;
        }
        if (this.attendance.outTime) {
          this.disableOut = true;
        } else {
          this.disableOut = false;
        }

        // this.employeeDetail.employeeDocumentList.forEach(element => {
        //   if(element.type == "profile"){
        //     this.profileUrl = element.url;
        //   }
        // });
      } else {
        this.toastr.error(data["msg"]);
      }
    });
  }

  getEmployeeById() {
    let dateShiftObj={
      date:this.date,
      id:this.currentEmpId,
      shift:false
    }
    this.registrationService.getAttendenceByEmpId(dateShiftObj).subscribe(
      data=>{
        if (data["success"]) {
          this.employeeDetail = data["data"].employeeMast;
          this.attendance = data["data"].attendanceLatest;

          if (this.attendance.inTime) {
            this.disableIn = true;
          } else {
            this.disableIn = false;
          }
          if (this.attendance.outTime) {
            this.disableOut = true;
          } else {
            this.disableOut = false;
          }

          this.employeeDetail.employeeDocumentList.forEach((element) => {
            if (element.type == "profile") {
              this.profileUrl = element.url;
            }
          });
        } else {
          this.toastr.error(data["msg"]);
        }
      }
    )
    // this.registrationService
    //   .getAttendanceByEmployeeId(this.currentEmpId)
    //   .subscribe(
    //     (data) => {
    //       if (data["success"]) {
    //         this.employeeDetail = data["data"].employeeMast;
    //         this.attendance = data["data"].attendanceLatest;

    //         if (this.attendance.inTime) {
    //           this.disableIn = true;
    //         } else {
    //           this.disableIn = false;
    //         }
    //         if (this.attendance.outTime) {
    //           this.disableOut = true;
    //         } else {
    //           this.disableOut = false;
    //         }

    //         this.employeeDetail.employeeDocumentList.forEach((element) => {
    //           if (element.type == "profile") {
    //             this.profileUrl = element.url;
    //           }
    //         });
    //       } else {
    //         this.toastr.error(data["msg"]);
    //       }
    //     },
    //     (error) => {
    //       this.toastr.error(errorData.Serever_Error);
    //     }
    //   );
  }

  setSelectedDate(){
    console.log(this.selectedDate)
    let obj = {
      date: this.selectedDate,
      shift: !this.attendance.shift?false:this.attendance.shift,
      id: this.currentEmpId,
    };
    console.log(obj)
    this.registrationService.getAttendenceByEmpId(obj).subscribe((data) => {
      if (data["success"]) {
        //this.employeeDetail = data['data'].employeeMast;
        this.attendance = data["data"].attendanceLatest;
        this.attendance.shift = obj.shift;
        if (this.attendance.inTime) {
          this.disableIn = true;
        } else {
          this.disableIn = false;
        }
        if (this.attendance.outTime) {
          this.disableOut = true;
        } else {
          this.disableOut = false;
        }

        // this.employeeDetail.employeeDocumentList.forEach(element => {
        //   if(element.type == "profile"){
        //     this.profileUrl = element.url;
        //   }
        // });
      } else {
        this.toastr.error(data["msg"]);
      }
    });
  }

  inClick() {
    let date = new Date();
    this.attendance.date = date;
    this.attendance.inTime = date;
    this.addAttendance();
    this.disableIn = true;
    this.route.navigate(["/pages/attendance/"]);
  }

  outClick() {
    let date = new Date();
    this.attendance.outTime = date;
    this.updateAttendance();
    this.disableOut = true;
    this.route.navigate(["/pages/attendance/"]);
  }

  addAttendance() {
    this.attendance.controlId = this.currentEmpId;
    if (!this.attendance.shift) {
      this.attendance.shift = false;
    }

    this.registrationService.addAttendance(this.attendance).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(data["msg"]);
          this.attendance.id = data["data"];
        }
      },
      (error) => {
        (error) => {
          this.toastr.error(errorData.Serever_Error);
        };
      }
    );
  }

  updateAttendance() {
    this.attendance.controlId = this.currentEmpId;
    this.attendance.updatedBy = this.user.userId;
    this.registrationService.updateAttendance(this.attendance).subscribe(
      (data) => {
        if (data["success"]) {
          this.toastr.success(data["msg"]);
        }
      },
      (error) => {}
    );
  }
}
