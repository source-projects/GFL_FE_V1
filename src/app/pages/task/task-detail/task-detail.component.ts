import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngx-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  constructor(private activeModel: NgbActiveModal) {}

  ngOnInit(): void {}

  closeTaskDetail() {
    this.activeModel.close();
  }
}
