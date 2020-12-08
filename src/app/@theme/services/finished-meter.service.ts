import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FinishedMeterService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { 
  }

  getAllQualityByParty(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/Quality/ByParty'+id);
  }
  
  getAllUserHeads(){
    return this.httpClient.get(this.commonService.envUrl()+'api/userHead');
  }
}
