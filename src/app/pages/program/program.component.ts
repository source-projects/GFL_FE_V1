import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { ProgramService } from 'app/@theme/services/program.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  programList: any[];
  tableStyle = "bootstrap";
  userId;
  userHeadId;
  radioSelect = 1;
  radioArray = [
    { id: 1, value: "View Own" },
    { id: 2, value: "View Group" },
    { id: 3, value: "View All" }
  ];

  constructor(private commonService: CommonService, private programService: ProgramService, private router: Router, private toastr: ToastrService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getProgramList(this.userId, "own");
  }

<<<<<<< HEAD
  onChange(event) {
    switch (event) {
      case 1:
        this.getProgramList(this.userId, "own");
        break;
=======
  onChange(event){
    this.programList = [];
    switch(event){
      case 1: 
              this.getProgramList(this.userId,"own");
              break;
>>>>>>> 3fa51e65ee724ca5772107ae53d04861d199b304

      case 2:
        this.getProgramList(this.userHeadId, "group");
        break;

      case 3:
        this.getProgramList(0, "all");
        break;
    }
  }

  public getProgramList(id, getBy) {
    this.programService.getProgramList(id, getBy).subscribe(
      data => {
        if (data['success']) {
          this.programList = data['data']
        }
        else {
          this.toastr.error(data['msg']);
        }
      },
      error => {
        this.toastr.error(errorData.Serever_Error);
      }
    )
  }

  deleteProgram(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.programService.deleteProgramDetailsById(id).subscribe(
          (data) => {
            this.onChange(this.radioSelect);
            this.toastr.success(errorData.Delete)
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
    });
  }
}
