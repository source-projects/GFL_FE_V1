import { Component, NgModule, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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

  constructor(
    private modalService: NgbModal,
    private taskGuard : TaskGuard
    ) {}

  ngOnInit(): void {
    this.getAccess();

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
  openDetail(){
    this.modalService.open(TaskDetailComponent)
  }
}
