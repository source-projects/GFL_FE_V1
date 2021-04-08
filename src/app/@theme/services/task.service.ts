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
  getAllTaskCard(id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/task/all?getBy=assignAndCreated&id=" +
        id
    );
  }
  getAssignCard(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/task/all?getBy=assign&id=" + id
    );
  }

  getDataAccordingToStatus(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/task/getByDateAndStatus",
      data
    );
  }

  getApprovedAndNotApprovedList(id, status) {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/task/get/approved?id=" +
        id +
        "&approved=" +
        status
    );
  }

  changeStatus(id, status) {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/task/update/approved?id=" +
        id +
        "&approved=" +
        status
    );
  }

  getTaskMasterDatabyId(data) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/task/taskMast/getBy?taskDataId=" + data);
  }

  getTaskDataDatabyId(data) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/task/taskData/getBy?id=" + data);
  }

  updateTask(data){
    return this.httpClient.put(
      this.commonService.envUrl() + "api/task/taskData/update",data);
  }

}
