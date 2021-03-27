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

}
