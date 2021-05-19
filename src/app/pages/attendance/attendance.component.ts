import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../@theme/json/error.json";
import { CommonService } from "../../@theme/services/common.service";
import { RegistrationService } from "../../@theme/services/registration.service";
import { Subject } from "rxjs";

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
export class AttendanceComponent implements OnInit, OnDestroy {
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
  modifiedToday: string;
  destroy$ :Subject<void> = new Subject<void>();


  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getUserId();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.attendance.createdBy = this.user.userId;
    this.currentEmpId = this._route.snapshot.paramMap.get("id");

    // this.date = new Date(
    //   this.currentDate.getTime() - this.currentDate.getTimezoneOffset() * 60000
    // ).toISOString();
    this.maxDate = new Date();
    var dd = String(this.maxDate.getDate()).padStart(2, "0");
    var mm = String(this.maxDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = this.maxDate.getFullYear();
    this.maxDate = dd + "-" + mm + "-" + yyyy;
    this.modifiedToday = mm + "-" + dd + "-" + yyyy;
    this.attendance.date = new Date(this.modifiedToday);
    this.selectedDate = this.modifiedToday
    this.getEmployeeById();
  }

  // shiftChanged() {
  //   let obj = {
  //     date: this.setTimeAndDateForInAndOut(),
  //     shift: this.attendance.shift,
  //     id: this.currentEmpId,
  //   };
  //   this.registrationService.getAttendenceByEmpId(obj).subscribe((data) => {
  //     if (data["success"]) {
  //       //this.employeeDetail = data['data'].employeeMast;
  //       this.attendance = data["data"].attendanceLatest;
  //       this.attendance.shift = obj.shift;
  //       if (this.attendance.inTime) {
  //         this.disableIn = true;
  //       } else {
  //         this.disableIn = false;
  //       }
  //       if (this.attendance.outTime) {
  //         this.disableOut = true;
  //       } else {
  //         this.disableOut = false;
  //       }

  //       // this.employeeDetail.employeeDocumentList.forEach(element => {
  //       //   if(element.type == "profile"){
  //       //     this.profileUrl = element.url;
  //       //   }
  //       // });
  //     } else {
  //       this.toastr.error(data["msg"]);
  //     }
  //   });
  // }

  // setSelectedDate(){
  //   let obj = {
  //     date: this.setTimeAndDateForInAndOut(),
  //     shift: !this.attendance.shift?false:this.attendance.shift,
  //     id: this.currentEmpId,
  //   };
  //   this.registrationService.getAttendenceByEmpId(obj).subscribe((data) => {
  //     if (data["success"]) {
  //       //this.employeeDetail = data['data'].employeeMast;
  //       this.attendance = data["data"].attendanceLatest;
  //       this.attendance.shift = obj.shift;
  //       if (this.attendance.inTime) {
  //         this.disableIn = true;
  //       } else {
  //         this.disableIn = false;
  //       }
  //       if (this.attendance.outTime) {
  //         this.disableOut = true;
  //       } else {
  //         this.disableOut = false;
  //       }

  //       // this.employeeDetail.employeeDocumentList.forEach(element => {
  //       //   if(element.type == "profile"){
  //       //     this.profileUrl = element.url;
  //       //   }
  //       // });
  //     } else {
  //       this.toastr.error(data["msg"]);
  //     }
  //   });
  // }

  getEmployeeById() {
    let dateShiftObj = {
      date: this.setTimeAndDateForInAndOut(),
      empId: this.currentEmpId,
      saveFlag: false
    }
    this.registrationService.getAttendanceByDateAndSaveeFlag(dateShiftObj).subscribe(
      data => {
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


  setTimeAndDateForInAndOut() {
    let date = new Date();
    date.setDate((new Date(this.selectedDate)).getDate());
    date.setMonth((new Date(this.selectedDate)).getMonth());
    date.setFullYear((new Date(this.selectedDate)).getFullYear());
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    date.setSeconds(date.getSeconds());
    return date
  }

  inClick() {
    this.attendance.date = new Date(this.selectedDate)
    this.attendance.inTime = this.setTimeAndDateForInAndOut()
    this.addAttendance();
    this.disableIn = true;
    this.route.navigate(["/pages/attendance/"]);
  }

  outClick() {
    this.attendance.outTime = this.setTimeAndDateForInAndOut();
    this.addAttendance();
    this.disableOut = true;
    this.route.navigate(["/pages/attendance/"]);
  }

  addAttendance() {
    // this.attendance.controlId = this.currentEmpId;
    // if (!this.attendance.shift) {
    //   this.attendance.shift = false;
    // }
    let dateShiftObj = {
      date: this.setTimeAndDateForInAndOut(),
      empId: this.currentEmpId,
      saveFlag: true,
      url: "photoUrl"
    }
    this.registrationService.getAttendanceByDateAndSaveeFlag(dateShiftObj).subscribe(
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

  // updateAttendance() {
  //   // this.attendance.controlId = this.currentEmpId;
  //   // this.attendance.updatedBy = this.user.userId;
  //   let dateShiftObj={
  //     date:this.setTimeAndDateForInAndOut(),
  //     empId:this.currentEmpId,
  //     saveFlag:true,
  //     url:"photoUrl"
  //   }
  //   this.registrationService.getAttendanceByDateAndSaveeFlag(dateShiftObj).subscribe(
  //     (data) => {
  //       if (data["success"]) {
  //         this.toastr.success(data["msg"]);
  //       }
  //     },
  //     (error) => {}
  //   );
  // }
}
