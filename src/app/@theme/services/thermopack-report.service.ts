import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class ThermopackReportService{

    constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  private handleError(err: HttpErrorResponse) {
  }

  getAllParameter(){

    let response = this.httpClient.get(this.commonService.envUrl() + "");
    return response;

  }

  getobjdata(data:any){
    let response = this.httpClient.post(this.commonService.envUrl() + "api/thermopack/filter/",data);
    return response;
      
  }
}