import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  addQuality(qualityData){
    return this.httpClient.post(this.commonService.envUrl()+'/api/quality', qualityData);
  }

  getallQuality(): any{
    return this.httpClient.get(this.commonService.envUrl()+'/api/quality/all');
  }

  getQualityById(id): any{
    return this.httpClient.get(this.commonService.envUrl()+'/api/quality/'+id);
  }

  updateQualityById(qualityData):any{
    return this.httpClient.put(this.commonService.envUrl()+'/api/quality',qualityData);
  }
}