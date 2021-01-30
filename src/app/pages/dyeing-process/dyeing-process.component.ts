import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "app/@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "app/@theme/components/export-popup/export-popup.component";
import { DyeingProcessService } from "app/@theme/services/dyeing-process.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-dyeing-process",
  templateUrl: "./dyeing-process.component.html",
  styleUrls: ["./dyeing-process.component.scss"],
})
export class DyeingProcessComponent implements OnInit {
  public dyeingProcessList: any[];
  flag:boolean = false;
  process=[];
  headers=["Name" ];
  module="dyeing process";

  constructor(
    private toastr: ToastrService,
    private dyeingProcessService: DyeingProcessService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllDyeingProcesses();
  }

  getAllDyeingProcesses() {
    this.dyeingProcessService.getAllDyeingProcessList().subscribe(
      (data) => {
        if (data["success"]) {
          this.dyeingProcessList = data["data"];
        }
      },
      (error) => {}
    );
  }

  deleteDyeingProcess(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.dyeingProcessService.deleteDyeingProcess(id).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.dyeingProcessList = [];
              this.getAllDyeingProcesses();
              this.toastr.success("Process deleted successfully");
            } else this.toastr.success(data["msg"]);
          },
          (error) => {
            this.toastr.error("Internal server error");
          }
        );
      }
    });
  }

  open() {
    this.flag = true;

    const modalRef = this.modalService.open(ExportPopupComponent);
    modalRef.componentInstance.headers = this.headers;
    modalRef.componentInstance.list = this.process;
    modalRef.componentInstance.moduleName = this.module;
  }
}
