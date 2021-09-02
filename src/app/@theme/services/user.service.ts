import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  checkUser(userData): any {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/login",
      userData
    );
  }
  createUser(userData): any {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/user",
      userData
    );
  }
  updateUser(userData): any {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/user",
      userData
    );
  }
  getUserById(id): any {
    return this.httpClient.get(this.commonService.envUrl() + "api/user/" + id);
  }
  deleteUserDetailsById(id): any {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/user/" + id
    );
  }
  getAllHead(): any {
    return this.httpClient.get(this.commonService.envUrl() + "api/userHead");
  }
  getAllUser(id, getBy): any {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/user/AllUsers/" + getBy + "/" + id
    );
  }
  getDesignation(): any {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/user/designation"
    );
  }
  saveDesignation(desiData): any {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/user/designation",
      desiData
    );
  }
  getAllCompanyData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/allCompany"
    );
  }
  getAllDepartmentData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/department"
    );
  }
  getUserHeadDetails(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/user/getUserHeadDetailById/" + id
    );
  }
  checkUserNameExist(name, id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/user/" + name + "/" + id
    );
  }
}
