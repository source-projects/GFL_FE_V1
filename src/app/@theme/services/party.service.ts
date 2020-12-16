import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) {
  }

  getAllPartyWithNameOnly(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/allPartyWithName');
  }
  
  getAllPartyList(id,getBy){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/all/'+getBy+'/'+id);
  }

  saveParty(partyData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/party', partyData);
  }
  updateParty(partyData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/party', partyData);
  }
  deletePartyDetailsById(id) {
    return this.httpClient.delete(this.commonService.envUrl() + 'api/party/' + id);
  }
  getPartyDetailsById(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/party/' + id);
  }
  getAllMaster() {
    return this.httpClient.get(this.commonService.envUrl() + 'api/userHead');
  }
  getAllPartyNameList() {
    return this.httpClient.get(this.commonService.envUrl() + 'api/party/allPartyWithName');
  }
  getPartyCode(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/partyCodeExist/'+id);
  }
}
