import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getUserList(id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/user/getByDepartmentId?departmentId=" +
        id
    );
  }
  getReportList() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/reportType"
    );
  }

  addTask(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/task/add",
      data
    );
  }
  getAllTaskCard() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/task/all/all/0"
    );
  }
  getAssignCard() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/task/all/assign/0"
    );
  }
}
