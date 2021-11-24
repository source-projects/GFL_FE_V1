import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(
    private _http: HttpClient,
    private commonService: CommonService
  ) {}

  getAllMachinesCategory() {
    let response = this._http.get(
      this.commonService.envUrl() + "api/machine/allCategory"
    );
    return response;
  }

  getMachineDataByCategoryId(id: any) {
    let response = this._http.get(
      this.commonService.envUrl() + "api/machine/getMachine/ByCategory?id=" + id
    );
    return response;
  }

  getMachineDataById(id: any) {
    let response = this._http.get(
      this.commonService.envUrl() + "api/machine/" + id
    );
    return response;
  }

  getMachineDataByMachineIdAPI(id: any) {
    let response = this._http.get(
      this.commonService.envUrl() + "api/machine/" + id
    );
    return response;
  }

  getobjdata(data: any) {
    let response = this._http.post(
      this.commonService.envUrl() + "api/machineWithFilter",
      data
    );
    return response;
  }

  getPartyQualityReportData(id, quality) {
    return this._http.get(
      this.commonService.envUrl() +
        "api/party/all/report?id=" +
        id +
        "&qualityId=" +
        quality
    );
  }

  getAllModules(){
    let response = this._http.get(
      this.commonService.envUrl() + "api/report/all/type"
    );
    return response;
  }

  getAllReportType(type){
    let response = this._http.get(
      this.commonService.envUrl() + "api/report/all/byType?name=" + type
    );
    return response;
  }

  getReportForExcel(obj,data){
    let response = this._http.post(
      this.commonService.envUrl() + "api" + obj.apiForExcel,data
    );
    return response;
  }

  getReportForPdf(obj,data){
    let response = this._http.post(
      this.commonService.envUrl() + "api" + obj.apiForReport,data
    );
    return response;
  }
}


