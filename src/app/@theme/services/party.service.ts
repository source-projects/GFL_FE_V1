import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { 
  }
  
  getAllPartyList(){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/all');
  }
  saveParty(partyData){
    return this.httpClient.post(this.commonService.envUrl()+'api/party',partyData);
  }
  updateParty(partyData){
    return this.httpClient.put(this.commonService.envUrl()+'api/party',partyData);
  }
  deletePartyDetailsById(id){
    return this.httpClient.delete(this.commonService.envUrl()+'api/party/'+id);
  }
  getPartyDetailsById(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/party/'+id);
  }
}
