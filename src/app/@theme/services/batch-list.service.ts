import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BatchListService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  getBatchById(cId,bId){
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batch/'+ cId + '/' + bId);
  }
}
