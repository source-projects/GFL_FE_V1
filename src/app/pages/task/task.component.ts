import { Component, NgModule, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";

@Component({
  selector: "ngx-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  openAddTaskComponent() {
    this.modalService.open(AddEditTaskComponent, { size: "lg" });
  }
}
