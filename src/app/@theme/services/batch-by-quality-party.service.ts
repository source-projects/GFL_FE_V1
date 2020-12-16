import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class BatchByQualityPartyService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  getBatchById(qid,pid): any{
    return this.httpClient.get(this.commonService.envUrl()+'api/stockBatch/batchWithoutExtra/ByQualityAndParty/'+qid+'/'+pid);
    
  }


}
