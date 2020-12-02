import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "app/@theme/services/user.service";
import { CommonService } from 'app/@theme/services/common.service';
import { ExportService } from 'app/@theme/services/export.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  userList=[];
  user=[];
  headers=["User Name", "First Name", "Last Name", "Company", "Designation" ];
  userId;
  userHeadId;
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];

  constructor(
    private route:Router,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private userService:UserService,
    private commonService: CommonService,
    private exportService: ExportService

  ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getAllUser(this.userId,"own");
  }

  onChange(event){
    switch(event){
      case 1: 
              this.getAllUser(this.userId,"own");
              break;

      case 2: 
              this.getAllUser(this.userHeadId,"group");
              break;

      case 3:
              this.getAllUser(0,"all");
              break;
    }
  }

  getAllUser(id,getBy){
    this.userService.getAllUser(id,getBy).subscribe(
      data =>{
        if(data["success"]){
          this.userList = data['data'];
          this.user=this.userList.map((element)=>({userName:element.userName, firstName: element.firstName,
            lastName: element.lastName, company:element.company, designation:element.designation }))
            console.log(this.user);
          }
        else
          this.toastr.error(data["msg"])
      },
      error=>{
        this.toastr.error(errorData.Serever_Error)
      }
    );
    
  }

  deleteUser(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.userService.deleteUserDetailsById(id).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
