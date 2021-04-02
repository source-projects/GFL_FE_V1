import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-add-edit-task",
  templateUrl: "./add-edit-task.component.html",
  styleUrls: ["./add-edit-task.component.scss"],
})
export class AddEditTaskComponent implements OnInit {
  files: File[] = [];
  constructor() {}

  ngOnInit(): void {}

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
