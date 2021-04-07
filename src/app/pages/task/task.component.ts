import { Component, NgModule, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TaskService } from "../../@theme/services/task.service";
import { TaskGuard } from "../../@theme/guards/task.guard";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
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
  allCardDetail: [];
  assignCardDetail: [];
  completedCardDetail: [];
  approvedCardDetail: [];
  notApprovedCardDetail: [];
  blockerCardDetail: [];

  constructor(
    private modalService: NgbModal,
    private taskGuard: TaskGuard,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getAccess();
    this.getAllCardDetail();
    this.getAssignCardDetail();
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
    this.modalService.open(AddEditTaskComponent, { size: "lg" });
  }
  openDetail() {
    this.modalService.open(TaskDetailComponent);
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
  getAllCardDetail() {
    this.taskService.getAllTaskCard().subscribe(
      (data) => {
        console.log(data["data"]);
        this.allCardDetail = data["data"];
      },
      (error) => {}
    );
  }

  getAssignCardDetail() {
    this.taskService.getAssignCard().subscribe(
      (data) => {
        console.log(data["data"]);
        this.assignFlag = data["data"];
      },
      (error) => {}
    );
  }
}
