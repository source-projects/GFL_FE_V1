import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../@theme/services/admin.service";
import { TaskService } from "../../../@theme/services/task.service";

@Component({
  selector: "ngx-add-edit-task",
  templateUrl: "./add-edit-task.component.html",
  styleUrls: ["./add-edit-task.component.scss"],
})
export class AddEditTaskComponent implements OnInit {
  files: File[] = [];
  departmentList: any[];
  userList: any[];
  reportList: any[] = [];
  typeList: any = [
    { name: "Once" },
    { name: "Daily" },
    { name: "Weekly" },
    { name: "Monthly" },
  ];
  constructor(
    private adminService: AdminService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getDeviceList();
    this.getReportList();
    console.log(this.typeList);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  setPriority(value: string) {
    switch (value) {
      case "p1":
        break;
      case "p2":
        break;
      case "p3":
        break;
      case "p4":
        break;
    }
  }
  getDeviceList() {
    this.adminService.getAllDepartmentData().subscribe((data) => {
      console.log(data["data"]);
      this.departmentList = data["data"];
    });
  }

  getReportList() {
    this.taskService.getReportList().subscribe((data) => {
      console.log(data["data"]);
      this.reportList = data["data"];
    });
  }
  getUserList(event) {
    console.log(event);
    this.taskService.getUserList(event).subscribe(
      (data) => {
        console.log(data["data"]);
        this.userList = data["data"];
      },
      (error) => {}
    );
  }
}
