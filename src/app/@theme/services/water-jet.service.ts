import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class WaterJetService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  addWaterJet(myForm){
    return this.httpClient.post(this.commonService.envUrl()+'api/waterJet',myForm);
  }
  getWaterJetList(){
    return this.httpClient.get(this.commonService.envUrl()+'api/waterJet/all');
  }

}
