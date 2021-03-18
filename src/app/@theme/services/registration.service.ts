import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private httpClient: HttpClient, 
    private commonService: CommonService
  ) { }

  // getallShade(): any {
  //   return this.httpClient.get(this.commonService.envUrl() + 'api/shade/original/all');
  // }
  addEmployee(empData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/employee/add', empData);
  }
}
