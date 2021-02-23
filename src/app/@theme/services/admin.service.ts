import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getAllJetData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/allJet"
    );
  }

  getAllDesignation() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/user/designation"
    );
  }

  getAllCompanyData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/allCompany"
    );
  }

  getAllApproveByData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/approvedBy"
    );
  }

  getAllMachine() {
    return this.httpClient.get(this.commonService.envUrl() + "api/machine/all");
  }

  getAllMachineCategory() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/machine/allCategory"
    );
  }

  getMachineDateById(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/machine/" + id
    );
  }

  saveMachine(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/machine",
      data
    );
  }

  saveMachineCategory(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/machine/addCategory",
      data
    );
  }

  deleteMachine(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/machine/" + id
    );
  }

  saveJetData(jetData) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/admin/jet/addJet",
      jetData
    );
  }

  saveDesignationData(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/user/designation",
      data
    );
  }

  saveCompanyData(name) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/admin/add/company/",
      name
    );
  }

  saveApproveByData(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/admin/add/approvedBy/",
      data
    );
  }

  deleteJetById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/admin/delete/jet/" + id
    );
  }
  deleteDesignationById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/user/designation/" + id
    );
  }
  deleteCompanyById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/admin/delete/companyBy/" + id
    );
  }
  deleteApproveById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/admin/delete/approved/" + id
    );
  }

  addDepartment(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/admin/add/department",
      data
    );
  }

  deleteDepartmentById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/admin/delete/department/" + id
    );
  }
  getAllDepartmentData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/department"
    );
  }

  updateJetData(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/admin/jet/updateJet",
      data
    );
  }

  updateApproveByData(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/admin/update/approvedBy/",
      data
    );
  }
  updateCompanyData(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/admin/update/company/",
      data
    );
  }
  updateDepartmentData(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/admin/update/department/",
      data
    );
  }
  updateDesigntationData(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/user/update/designation/",
      data
    );
  }
}
