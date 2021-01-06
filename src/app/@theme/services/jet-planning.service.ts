import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class JetPlanningService {

  constructor(
    private httpClient: HttpClient, 
    private commonService: CommonService
  ) { }

  getAllJetData(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/jet/getAllJetDetail');
  }
  saveJetData(jetData){
    return this.httpClient.post(this.commonService.envUrl() + 'api/jet/addJetData',jetData);
  }

  updateJetData(obj){
    return this.httpClient.put(this.commonService.envUrl() + 'api/jet/updateJetData',obj);
  }
}
