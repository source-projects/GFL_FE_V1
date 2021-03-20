import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../@theme/services/common.service';
import { RegistrationService } from '../../../@theme/services/registration.service';
import * as errorData from "../../../@theme/json/error.json";


export class Attendance{
  date : Date;
  inTime : Date;
  outTime : Date;
  createdBy : number;
  createdDate : Date;

  
}
@Component({
  selector: 'ngx-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  user;
  currentEmpId;
  currentData;
  loading = false;
  formSubmitted = false;
  disableButton = false;
  profileUrl;
  attendance : Attendance = new Attendance();
  constructor(
    private commonService: CommonService,
    private _route: ActivatedRoute,
    private registrationService : RegistrationService,
    private toastr: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getUserId();
  }

  public getUserId() {
    this.user = this.commonService.getUser();
    this.currentEmpId = this._route.snapshot.paramMap.get("id");
    this.getEmployeeById();
  }

  getEmployeeById(){

    
    this.registrationService.getEmployeeById(this.currentEmpId).subscribe(
      (data) => {
        if (data["success"]) {
          this.currentData = data["data"];
          this.currentData.employeeDocumentList.forEach(element => {
            if(element.type == "profile"){
              this.profileUrl = element.url;
            }
          });
          
        } else {
          this.toastr.error(data["msg"]);
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    );
  }

  inClick(){
    let date = new Date();
    this.attendance.date = date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(date)
    console.log(strTime)



  }

  outClick(){
        let date = new Date();

  }

  addAttendance(form){

  }

  reset(form){

  }


}
