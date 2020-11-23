import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "app/@theme/services/user.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public errorData: any = (errorData as any).default;

  tableStyle = 'bootstrap';
  userList=[];
  radioSelect;

  constructor(
    private route:Router,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(){
    this.userService.getAllUser().subscribe(
      data =>{
        if(data["success"])
          this.userList = data['data'];
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
            this.getAllUser();
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
