import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class StockBatchService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

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

  

}
