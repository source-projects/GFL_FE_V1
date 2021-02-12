import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }

  getAllJetData(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/allPartyWithName');
  }
  
  getAllDesignation(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/all/');
  }

  getAllCompanyData(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/allPartyWithName');
  }

  getAllApproveByData(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/allPartyWithName');
  }

  saveJetData(jetData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/party', jetData);
  }

  saveDesignationData(jetData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/party', jetData);
  }

  saveCompanyData(jetData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/party', jetData);
  }

  saveApproveByData(jetData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/party', jetData);
  }

  deleteJetById(id) {
    return this.httpClient.delete(this.commonService.envUrl() + 'api/party/' + id);
  }
 
}
