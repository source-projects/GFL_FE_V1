import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FinishedMeterService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { 
  }

  getAllQualityByParty(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/Quality/ByParty/'+id);
  }
  
  getAllUserHeads(){
    return this.httpClient.get(this.commonService.envUrl()+'api/userHead');
  }

  getPartyQualityByMaster(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/QualityAndParty/ByMaster/'+id);
  }

  getBatchByMasterId(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/batch/ByMaster/'+id);
  }

  getBatchDataBybatchNo(batchId, ctrlId){
    return this.httpClient.get(this.commonService.envUrl()+'api/batch/'+ctrlId+'/'+batchId);
  }

  addFinishedMeter(data){
    return this.httpClient.put(this.commonService.envUrl()+'api/batch/finishMtr', data);
  }

  getBatchesByPartyQuality(qId,pId){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/ByQualityAndParty/'+qId+'/'+pId);
  }
  
}
