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
}
