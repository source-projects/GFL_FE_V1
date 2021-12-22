import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestData } from '../model/request-data.model';
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

  getAllMergeBatchV1(data: RequestData){
    return this.httpClient.post(this.commonService.envUrl() + 'api/stockBatch/get/mergeBatchList/allPaginated', data);
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
