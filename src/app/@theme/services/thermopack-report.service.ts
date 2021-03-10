import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class ThermopackReportService {

  constructor(private httpClient: HttpClient,
    private commonService: CommonService) { }

  getAllParameter() {
    return this.httpClient.get(
      this.commonService.envUrl() + "");
  }

  getobjdata(data: any) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/thermopack/filter/", data);
  }
}