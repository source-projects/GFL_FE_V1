import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ShuffleService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  updateBatchMerge(newBatchData){
    return this.httpClient.put(this.commonService.envUrl()+'api/stockBatch/MergeBatch',newBatchData);
  }
}
