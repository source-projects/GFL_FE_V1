import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StockBatchService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  isBatchIdExists(name, id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/stockBatch/isBatchExists/'+name+'/'+id);
  }

   deleteStockBatchById(id): any{
     return this.httpClient.delete(this.commonService.envUrl()+'api/stockBatch/'+id);
   }

   getAllStockBatchList(id,getBy): any{
     return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/all/'+getBy+'/'+id);
   }

  addStockBatch(myForm){
    return this.httpClient.post(this.commonService.envUrl()+'api/stockBatch',myForm);
  }

  updateStockBatch(myForm){
    return this.httpClient.put(this.commonService.envUrl()+'api/stockBatch',myForm);
  }

  getStockBatchById(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/'+id);
  }

  getAllBatch(){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/all');
  }

  getBatchById(p_id,q_id){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/ByQualityAndParty/'+q_id+'/'+p_id);
  }
  getAllBatchForAdditionSlip(){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/forAdditionalSlip');
  }

  getJobCardData(stockId, batchId){
    return this.httpClient.get(`${this.commonService.envUrl()}api/stockBatch/get/getJobCardBy?batchId=${batchId}&stockId=${stockId}`);
  }
  
  getBatchSequence(){
    return this.httpClient.get(this.commonService.envUrl()+'api/admin/get/batchSequence/');
  }

  updateBatchSequence(data){
    return this.httpClient.put(this.commonService.envUrl()+'api/admin/update/batchSequence/',data);
  }

  getBatchesByPartyQuality(qId, pId) {
    return this.httpClient.get(this.commonService.envUrl() +"api/stockBatch/batch/ByQualityAndPartyWithProductionPlan/" +qId +"/" +pId);
  }

  getBatchGRById(cId,bId){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/'+ cId + '/' + bId);
  }
}
