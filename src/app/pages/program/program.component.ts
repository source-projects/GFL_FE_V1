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
  radioSelect: any;

  constructor(private commonService: CommonService, private programService: ProgramService, private router: Router, private toastr: ToastrService, private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.getProgramList();
  }
  public getProgramList() {
    this.programService.getProgramList().subscribe(
      data => {
        if (data['success']) {
          this.programList = data['data']
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
            this.getProgramList();
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
