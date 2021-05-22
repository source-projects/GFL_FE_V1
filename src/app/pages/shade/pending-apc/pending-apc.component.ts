import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationDialogComponent } from "../../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { CommonService } from "../../../@theme/services/common.service";
import { ShadeService } from "../../../@theme/services/shade.service";
import { ToastrService } from "ngx-toastr";
import * as errorData from "../../../@theme/json/error.json";
import { ShadeGuard } from '../../../@theme/guards/shade.guard';

@Component({
  selector: "ngx-pending-apc",
  templateUrl: "./pending-apc.component.html",
  styleUrls: ["./pending-apc.component.scss"],
})
export class PendingApcComponent implements OnInit, OnDestroy {
  apcList = [];
  copyApcList = [];
  tableStyle = "bootstrap";
  loading = false;
  userId: any;
  userHeadId: any;
  apcFlag = true;
  disabled = false;
  hiddenEdit = false;
  hiddenDelete = false;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  constructor(
    private shadeService: ShadeService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public shadeGuard: ShadeGuard,

  ) {}

  ngOnInit(): void {
    this.userId = this.commonService.getUser();
    this.userId = this.userId["userId"];
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.getallShades(this.userId, "all");
    this.getAddAcess();
    this.getDeleteAccess();
    this.getEditAccess();
  }

  getAddAcess() {
    if (this.shadeGuard.accessRights('add')) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }
  }

  getDeleteAccess() {
    if (this.shadeGuard.accessRights('delete')) {
      this.hiddenDelete = false;
    }
    else
    {
      this.hiddenDelete = true;
    }
  }


  getEditAccess() {
    if (this.shadeGuard.accessRights('edit')) {
      this.hiddenEdit = false;
    }
    else
    {
      this.hiddenEdit = true;
    }
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.copyApcList[0]);
    this.apcList = this.copyApcList.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }

  getallShades(id, getBy) {
    let shadeList1 = [];
    this.loading = true;
    this.shadeService.getAllPendingShade().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data["success"]) {
          if (data["data"].length > 0) {
            this.apcList = data["data"];

            this.copyApcList = this.apcList.map((element) => ({
              id: element.id,
              apcNo: element.apcNo,
              partyShadeNo: element.partyShadeNo,
              processName: element.processName,
              pending: element.pending,
              qualityId: element.qualityId,
              qualityName: element.qualityName,
              partyId: element.partyId,
              partyName: element.partyName,
              colorTone: element.colorTone,
            }));
          }
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  deletePendingAPC(id) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.shadeService.deleteShadeData(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.getallShades(this.userId, "all");
              this.toastr.success(errorData.Delete);
            } else {
              this.toastr.error(data["msg"]);
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error);
          }
        );
      }
    });
  }
}
