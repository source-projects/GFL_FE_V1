import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from "../../@theme/components/confirmation-dialog/confirmation-dialog.component";
import { CommonGuard } from '../../@theme/guards/common.guard';
import { CommonService } from "../../@theme/services/common.service";
import { TaskService } from "../../@theme/services/task.service";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit, OnDestroy {
  assignFlagForDetails: boolean = false;
  userHeadId;
  user = this.commonService.getUser().userId;
  completedateStatusObj = {
    id: null,
    date: "",
    status: "Completed",
  };

  blockerdateStatusObj = {
    id: null,
    date: "",
    status: "Blocker",
  };

  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

  radioSelect = 1;
  radioArray = [
    { id: 1, value: "All" },
    { id: 2, value: "Assigned by me" },
    { id: 3, value: "Assigned by others" },
  ];

  //card Status Flag
  allFlag: boolean = true;
  assignFlag: boolean = false;
  completedFlag: boolean = false;
  approvedFlag: boolean = false;
  notApprovedFlag: boolean = false;
  blockerFlag: boolean = false;

  //task card detail according to status
  allCardDetail: any[] = [];
  assignCardDetail: any[] = [];
  assignCardDetailCopy: any[] = [];
  completedCardDetail: any[] = [];
  approvedCardDetail: any[] = [];
  notApprovedCardDetail: any[] = [];
  blockerCardDetail: any[] = [];

  //Card Count
  allCardCount = 0;
  assignedCardCount = 0;
  completedCardCount = 0;
  approvedCardCount = 0;
  notApprovedCardCount = 0;
  blockerCardCount = 0;

  //filter Date
  filterDate;
  currentDate;
  datePipeString;
  refreshPipeCount = 0;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private modalService: NgbModal,
    private commonGuard: CommonGuard,
    private taskService: TaskService,
    private commonService: CommonService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.userHeadId = this.commonService.getUserHeadId();
    this.userHeadId = this.userHeadId["userHeadId"];
    this.user = this.commonService.getUser().userId;
    this.getAccess();
    this.recallAllCardDetail();
  }

  //to recall all card details
  recallAllCardDetail() {
    this.getAllCardDetail();
    this.getAssignCardDetail();
    this.getCompletetedList();
    this.getBlockerList();
    this.getApprovedList();
    this.getNotApprovedList();
  }

  getAccess() {
    if (this.commonService.accessRights("add","task")) {
      this.hiddenAdd = false;
    }
    if (this.commonService.accessRights("delete","task")) {
      this.hiddenDelete = false;
    }
    if (this.commonService.accessRights("edit","task")) {
      this.hiddenEdit = false;
    }
  }

  onChange(event) {
    //this.assignCardDetail = [];
    //this.getAssignCardDetail();

    switch (event) {
      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }
  }

  openAddTaskComponent() {
    const modalRef = this.modalService.open(AddEditTaskComponent, {
      size: "lg",
    });
    modalRef.result
      .then((result) => {
        if (result) {
          this.recallAllCardDetail();
        }
      })
      .catch((err) => {});
  }
  openDetail(id, type) {
    this.assignFlagForDetails = false;
    if (type == "assign") {
      this.assignFlagForDetails = true;
    }
    const modelref = this.modalService.open(TaskDetailComponent);
    modelref.componentInstance.taskId = id;
    modelref.componentInstance.assign = this.assignFlagForDetails;

    modelref.result
      .then((result) => {
        if (result) {
          this.recallAllCardDetail();
        }
      })
      .catch((err) => {});
  }

  showCardAccordingToStatus(value) {
    switch (value) {
      case "all":
        this.allFlag = true;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;

        break;
      case "assign":
        // this.assignCardDetail = [];
        this.allFlag = false;
        this.assignFlag = true;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;

        break;
      case "complete":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = true;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = false;

        break;
      case "approved":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = true;
        this.notApprovedFlag = false;
        this.blockerFlag = false;

        break;
      case "notApproved":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = true;
        this.blockerFlag = false;
        break;

      case "blocker":
        this.allFlag = false;
        this.assignFlag = false;
        this.completedFlag = false;
        this.approvedFlag = false;
        this.notApprovedFlag = false;
        this.blockerFlag = true;

        break;
    }
  }

  //clear Filter date
  clearDate(value) {
    this.filterDate = "";
    switch (value) {
      case "all":
        this.getAllCardDetail();
        break;

      case "assign":
        this.getAssignCardDetail();
        break;

      case "complete":
        this.getCompletetedList();
        break;

      case "blocker":
        this.getBlockerList();
        break;

      case "approve":
        this.getApprovedList();
        break;

      case "notApprove":
        this.getNotApprovedList();
        break;
    }
  }

  //filter Data according to date
  filteredCardDetailByDate(event, value) {
    this.refreshPipeCount++;
    if (this.refreshPipeCount > 10) {
      this.refreshPipeCount = 0;
    }
    this.currentDate = event.target.value;
    // switch (value) {
    //   //filter card for assign status
    //   case "assign":
    //     let assignCardDetailWithStatus: any[] = [];
    //     //not Started status task card
    //     let assignDateStatusObj = [
    //       {
    //         date: event.target.value,
    //         status: "NotStarted",
    //         id:null,

    //       },
    //       {
    //         date: event.target.value,
    //         status: "Running",
    //         id:null,

    //       },
    //       {
    //         date: event.target.value,
    //         status: "Hold",
    //         id:null,

    //       },
    //     ];
    //     assignDateStatusObj.forEach((element, index) => {
    //       this.taskService
    //         .getDataAccordingToStatus(element)
    //         .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //           if (assignCardDetailWithStatus) {
    //             assignCardDetailWithStatus = data["data"];
    //           } else {
    //             assignCardDetailWithStatus.concat(data["data"]);
    //           }
    //           this.assignCardDetail = assignCardDetailWithStatus;
    //         });
    //     });

    //     break;

    //   //filter task card for complete status
    //   case "complete":
    //     let completeDateStatusObj = {
    //       date: event.target.value,
    //       status: "",
    //       id:null,

    //     };
    //     this.taskService
    //       .getDataAccordingToStatus(completeDateStatusObj)
    //       .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //         this.completedCardDetail = data["data"];
    //       });
    //     break;

    //   //filter task card for blocker
    //   case "blocker":
    //     let blockerDaeStatusObj = {
    //       date: event.target.value,
    //       status: "Blocker",
    //       id:null,

    //     };
    //     this.taskService
    //       .getDataAccordingToStatus(blockerDaeStatusObj)
    //       .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //         this.blockerCardDetail = data["data"];
    //       });
    //     break;
    //   //filter task card for all
    //   case "all":
    //     let allDateStatusObj = {
    //       date: event.target.value,
    //       status: "",
    //       id:null,
    //     };
    //     this.taskService
    //       .getDataAccordingToStatus(allDateStatusObj)
    //       .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //         this.allCardDetail = data["data"];
    //       });
    //     break;

    //     case "approve":
    //       let approveDateStatusObj = {
    //         date: event.target.value,
    //         status: "Approved",
    //         id:null,
    //       };
    //       this.taskService
    //         .getDataAccordingToStatus(approveDateStatusObj)
    //         .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //           this.approvedCardDetail = data["data"];
    //         });
    //       break;

    //       case "notApprove":
    //       let notApproveDateStatusObj = {
    //         date: event.target.value,
    //         status: "Not Approved",
    //         id:null,
    //       };
    //       this.taskService
    //         .getDataAccordingToStatus(notApproveDateStatusObj)
    //         .pipe(takeUntil(this.destroy$)).subscribe((data) => {
    //           this.approvedCardDetail = data["data"];
    //         });
    //       break;
    // }
  }

  getAllCardDetail() {
    this.allCardCount = 0;
    if (this.userHeadId == 0) {
      this.taskService.getAllTaskCard("").pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.allCardDetail = data["data"];
          if (this.allCardDetail) {
            this.allCardCount = this.allCardDetail.length;
          }
        },
        (error) => {}
      );
    } else {
      this.taskService
        .getAllTaskCard(this.commonService.getUser().userId)
        .pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.allCardDetail = data["data"];
            if (this.allCardDetail) {
              this.allCardCount = this.allCardDetail.length;
            }
          },
          (error) => {}
        );
    }
  }

  getAssignCardDetail() {
    this.assignedCardCount = 0;
    this.taskService
      .getAssignCard(this.commonService.getUser().userId)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.assignCardDetail = data["data"];

          if (this.assignCardDetail) {
            this.assignedCardCount = this.assignCardDetail.length;
          }
        },
        (error) => {}
      );
  }
  getCompletetedList() {
    this.completedCardCount = 0;
    if (this.userHeadId == 0) {
      this.completedateStatusObj.date = "";
      this.completedateStatusObj.status = "Completed";
      this.completedateStatusObj.id = null;
    } else {
      this.completedateStatusObj.date = "";
      this.completedateStatusObj.status = "Completed";
      this.completedateStatusObj.id = this.commonService.getUser().userId;
    }
    this.taskService
      .getDataAccordingToStatus(this.completedateStatusObj)
      .pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.completedCardDetail = data["data"];
        if (this.completedCardDetail) {
          this.completedCardCount = this.completedCardDetail.length;
        }
      });
  }

  getBlockerList() {
    this.blockerCardCount = 0;

    if (this.userHeadId == 0) {
      this.blockerdateStatusObj.id = null;
      this.blockerdateStatusObj.date = "";
      this.blockerdateStatusObj.status = "Blocker";

      this.taskService
        .getDataAccordingToStatus(this.blockerdateStatusObj)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.blockerCardDetail = data["data"];
          if (this.blockerCardCount) {
            this.blockerCardCount = this.blockerCardDetail.length;
          }
        });
    } else {
      this.blockerdateStatusObj.id = this.commonService.getUser().userId;
      this.blockerdateStatusObj.date = "";
      this.blockerdateStatusObj.status = "Blocker";

      this.taskService
        .getDataAccordingToStatus(this.blockerdateStatusObj)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.blockerCardDetail = data["data"];
          if (this.blockerCardCount) {
            this.blockerCardCount = this.blockerCardDetail.length;
          }
        });
    }
  }

  getApprovedList() {
    this.approvedCardCount = 0;
    if (this.userHeadId == 0) {
      this.taskService
        .getApprovedAndNotApprovedList("", true)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.approvedCardDetail = data["data"];
          if (this.approvedCardDetail) {
            this.approvedCardCount = this.approvedCardDetail.length;
          }
        });
    } else {
      this.taskService
        .getApprovedAndNotApprovedList(
          this.commonService.getUser().userId,
          true
        )
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.approvedCardDetail = data["data"];
          if (this.approvedCardDetail) {
            this.approvedCardCount = this.approvedCardDetail.length;
          }
        });
    }
  }

  getNotApprovedList() {
    this.notApprovedCardCount = 0;
    if (this.userHeadId == 0) {
      this.taskService
        .getApprovedAndNotApprovedList("", false)
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.notApprovedCardDetail = data["data"];
          if (this.notApprovedCardDetail) {
            this.notApprovedCardCount = this.notApprovedCardDetail.length;
          }
        });
    } else {
      this.taskService
        .getApprovedAndNotApprovedList(
          this.commonService.getUser().userId,
          false
        )
        .pipe(takeUntil(this.destroy$)).subscribe((data) => {
          this.notApprovedCardDetail = data["data"];
          if (this.notApprovedCardDetail) {
            this.notApprovedCardCount = this.notApprovedCardDetail.length;
          }
        });
    }
  }

  onApprove(id) {
    this.taskService.changeStatus(id, true).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data["success"]) {
        this.toastr.success("Task approved successfully");
        this.getApprovedList();
        this.getNotApprovedList();
      }
    });
  }

  deleteTask(id, type) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
      if (result) {
        this.taskService.deleteTask(id).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            if (data["success"]) {
              this.toastr.success("Task deleted successfully");
              if (type == "all") {
                this.getAllCardDetail();
              } else if (type == "assign") {
                this.getAssignCardDetail();
              } else if (type == "approve") {
                this.getApprovedList();
              } else if (type == "notApprove") {
                this.getNotApprovedList();
              } else if (type == "complete") {
                this.getCompletetedList();
              } else if (type == "block") {
                this.getBlockerList();
              }
            }
          },
          (error) => {}
        );
      }
    });
  }
}
