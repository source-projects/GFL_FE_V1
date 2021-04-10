import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MergeBatchService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  saveMergedBatch(data){
    return this.httpClient.post(this.commonService.envUrl() + 'api/stockBatch/create/mergeBatchList', data);
  }

  getBatchesByPartyQuality(qId, pId) {
    return this.httpClient.get(this.commonService.envUrl() +"api/stockBatch/batch/ByQualityAndPartyWithoutProductionPlan/" +qId +"/" +pId);
  }

  getAllMergeBatch(){
    return this.httpClient.get(this.commonService.envUrl() +"api/stockBatch/get/mergeBatchList" );

  }

  getMergeBatchById(id){
    return this.httpClient.get(this.commonService.envUrl() +"api/stockBatch/get/mergeBatchListBy?mergeBatchId=" + id );

  }

  deleteMergeBatch(id){
    return this.httpClient.delete(this.commonService.envUrl() +"api/stockBatch/delete/mergeBatchListBy?mergeBatchId=" + id );

  }

  updateMergeBatch(data){
    return this.httpClient.put(this.commonService.envUrl() + 'api/stockBatch/update/mergeBatchList', data);

  }

}
