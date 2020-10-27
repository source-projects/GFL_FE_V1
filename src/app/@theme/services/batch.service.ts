import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  deletePartyDetailsById(id): any{
    return this.httpClient.delete(this.commonService.envUrl()+'api/batch/'+id);
  }

  getAllBatchList(): any{
    return this.httpClient.get(this.commonService.envUrl()+'api/batch/all');
  }
}
