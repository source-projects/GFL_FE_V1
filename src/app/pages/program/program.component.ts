import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from 'app/@theme/services/common.service';
import { ProgramService } from 'app/@theme/services/program.service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from 'app/@theme/services/export.service';


@Component({
  selector: 'ngx-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {

  public errorData: any = (errorData as any).default;
  programList: any[];
  program=[];
  headers=["Party Name", "Program By", "Quality Id", "Quality Name", "Quality Type", "Priority" ];
  tableStyle = "bootstrap";
  userId;
  userHeadId;
  radioSelect = 1;
  radioArray = [
    {id:1, value:"View Own"},
    {id:2, value:"View Group"},
    {id:3, value:"View All"}
  ];

  constructor(
    private commonService: CommonService, 
    private programService: ProgramService, 
    private router: Router, 
    private toastr: ToastrService, 
    private modalService: NgbModal,
    private exportService: ExportService
    ) { }

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId['userId'];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId['userHeadId'];
    this.getProgramList(this.userId,"own");
  }

  onChange(event){
    this.programList = [];
    switch(event){
      case 1: 
              this.getProgramList(this.userId,"own");
              break;

      case 2: 
              this.getProgramList(this.userHeadId,"group");
              break;

      case 3:
              this.getProgramList(0,"all");
              break;
    }
  }

  public getProgramList(id,getBy) {
    this.programService.getProgramList(id,getBy).subscribe(
      data => {
        if (data['success']) {
          this.programList = data['data']
          this.program=this.programList.map((element)=>({partyName:element.partyName, programBy: element.programBy,
            qualityId: element.qualityId, qualityName:element.qualityName, qualityType:element.qualityType, priority:element.priority }))
            console.log(this.program);
        }
        else {
          this.toastr.error(errorData.Internal_Error);
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
