import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { ExportPopupComponent } from "../../@theme/components/export-popup/export-popup.component";
import { DyeingProcessService } from "../../@theme/services/dyeing-process.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "ngx-dyeing-process",
  templateUrl: "./dyeing-process.component.html",
  styleUrls: ["./dyeing-process.component.scss"],
})
export class DyeingProcessComponent implements OnInit, OnDestroy {
  public dyeingProcessList: any[];
  flag:boolean = false;
  process=[];
  headers=["Name" ];
  module="dyeing process";

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private toastr: ToastrService,
    private dyeingProcessService: DyeingProcessService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllDyeingProcesses();
  }

  getAllDyeingProcesses() {
    this.dyeingProcessService.getAllDyeingProcessList().pipe(takeUntil(this.destroy$)).subscribe(
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
        this.dyeingProcessService.deleteDyeingProcess(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success(data["msg"]);
              this.dyeingProcessList = [];
              this.getAllDyeingProcesses();
            } else this.toastr.error(data["msg"]);
          },
          (error) => {
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
