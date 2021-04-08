import { Component, NgModule, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../../@theme/services/task.service";
import { TaskGuard } from "../../@theme/guards/task.guard";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { CommonService } from "../../@theme/services/common.service";
import { result } from "lodash";
import { CardComponent } from "@swimlane/ngx-charts";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {

  assignFlagForDetails:boolean = false;

  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

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

  constructor(
    private modalService: NgbModal,
    private taskGuard: TaskGuard,
    private taskService: TaskService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
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
    if (this.taskGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.taskGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.taskGuard.accessRights("edit")) {
      this.hiddenEdit = false;
    }
  }

  openAddTaskComponent() {
    const modalRef = this.modalService.open(AddEditTaskComponent, {
      size: "lg",
    });
    modalRef.result.then((result) => {
      this.recallAllCardDetail();
    });
  }
  openDetail(id,type) {
    this.assignFlagForDetails = false;
  if(type == "assign")
  {
    this.assignFlagForDetails = true
  }
    const modelref = this.modalService.open(TaskDetailComponent);
    modelref.componentInstance.taskId = id;
    modelref.componentInstance.assign = this.assignFlagForDetails;
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
    console.log(event.target.value);
    switch (value) {
      //filter card for assign status
      case "assign":
        let assignCardDetailWithStatus: any[] = [];
        //not Started status task card
        let assignDateStatusObj = [
          {
            date: event.target.value,
            status: "NotStarted",
          },
          {
            date: event.target.value,
            status: "Running",
          },
          {
            date: event.target.value,
            status: "Hold",
          },
        ];
        assignDateStatusObj.forEach((element, index) => {
          this.taskService
            .getDataAccordingToStatus(element)
            .subscribe((data) => {
              if (assignCardDetailWithStatus) {
                assignCardDetailWithStatus = data["data"];
              } else {
                assignCardDetailWithStatus.concat(data["data"]);
              }
              console.log(element.status, data["data"]);
              console.log(index, assignCardDetailWithStatus);
              this.assignCardDetail = assignCardDetailWithStatus;
              console.log("filter assign", this.assignCardDetail);
            });
        });

        break;

      //filter task card for complete status
      case "complete":
        let completeDateStatusObj = {
          date: event.target.value,
          status: "Completed",
        };
        this.taskService
          .getDataAccordingToStatus(completeDateStatusObj)
          .subscribe((data) => {
            console.log("complete filter", data["data"]);
            this.completedCardDetail = data["data"];
          });
        break;

      //filter task card for blocker
      case "blocker":
        let blockerDaeStatusObj = {
          date: event.target.value,
          status: "Blocker",
        };
        this.taskService
          .getDataAccordingToStatus(blockerDaeStatusObj)
          .subscribe((data) => {
            console.log("blocker filter", data["data"]);
            this.blockerCardDetail = data["data"];
          });
        break;
      //filter task card for all
      case "all":
        let allDateStatusObj = {
          data: event.target.value,
          status: "",
        };
        this.taskService
          .getDataAccordingToStatus(allDateStatusObj)
          .subscribe((data) => {
            console.log("all filter", data["data"]);
            this.allCardDetail = data["data"];
          });
        break;
    }
  }

  getAllCardDetail() {
    this.allCardCount = 0;
    this.taskService
      .getAllTaskCard(this.commonService.getUser().userId)
      .subscribe(
        (data) => {
          console.log(data["data"]);
          this.allCardDetail = data["data"];
          if (this.allCardDetail && this.allCardDetail.length > 0) {
            this.allCardDetail.forEach((element) => {
              this.allCardCount++;
            });
          }
        },
        (error) => {}
      );
  }

  getAssignCardDetail() {
    this.assignedCardCount = 0;
    this.taskService
      .getAssignCard(this.commonService.getUser().userId)
      .subscribe(
        (data) => {
          console.log("Assign ", data["data"]);
          this.assignCardDetail = data["data"];
          if (this.assignCardDetail && this.assignCardDetail.length > 0) {
            this.assignCardDetail.forEach((element) => {
              this.assignedCardCount++;
            });
          }
        },
        (error) => {}
      );
  }
  getCompletetedList() {
    this.completedCardCount = 0;
    let completedateStatusObj = {
      data: "",
      status: "Completed",
    };
    this.taskService
      .getDataAccordingToStatus(completedateStatusObj)
      .subscribe((data) => {
        console.log("complete", data["data"]);
        this.completedCardDetail = data["data"];
        if (this.completedCardDetail && this.completedCardDetail.length > 0) {
          this.completedCardDetail.forEach((element) => {
            this.completedCardCount++;
          });
        }
      });
  }

  getBlockerList() {
    this.blockerCardCount = 0;
    let blockerDateStatusObj = {
      date: "",
      status: "Blocker",
    };
    this.taskService
      .getDataAccordingToStatus(blockerDateStatusObj)
      .subscribe((data) => {
        console.log("Blocker", data["data"]);
        this.blockerCardDetail = data["data"];
        if (this.blockerCardDetail && this.blockerCardDetail.length > 0) {
          this.blockerCardDetail.forEach((element) => {
            this.blockerCardCount++;
          });
        }
      });
  }

  getApprovedList() {
    this.approvedCardCount = 0;
    this.taskService
      .getApprovedAndNotApprovedList(this.commonService.getUser().userId, true)
      .subscribe((data) => {
        console.log("Approved", data["data"]);
        this.approvedCardDetail = data["data"];
        if (this.approvedCardDetail && this.approvedCardDetail.length > 0) {
          this.approvedCardDetail.forEach((element) => {
            this.approvedCardCount++;
          });
        }
      });
  }

  getNotApprovedList() {
    this.notApprovedCardCount = 0;
    this.taskService
      .getApprovedAndNotApprovedList(this.commonService.getUser().userId, false)
      .subscribe((data) => {
        console.log("Not Approved", data["data"]);
        this.notApprovedCardDetail = data["data"];
        if (
          this.notApprovedCardDetail &&
          this.notApprovedCardDetail.length > 0
        ) {
          this.notApprovedCardDetail.forEach((element) => {
            this.notApprovedCardCount++;
          });
        }
      });
  }
}
