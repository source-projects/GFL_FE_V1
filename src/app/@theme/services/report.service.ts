import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http: HttpClient, private commonService: CommonService) { }

  getAllMachinesCategory() {
    return this._http.get(
      this.commonService.envUrl() + "api/machine/allCategory");
  }

  getMachineDataByCategoryId(id: any) {
    return this._http.get(
      this.commonService.envUrl() + "api/machine/getMachine/ByCategory?id=" + id);
  }

  getobjdata(data: any) {
    return this._http.post(
      this.commonService.envUrl() + "api/machineWithFilter",
      data);
  }
}
