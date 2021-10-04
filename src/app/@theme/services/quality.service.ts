import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestData } from '../model/request-data.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  addQuality(qualityData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/quality', qualityData);
  }

  getallQuality(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/quality/all/' + getBy + '/' + id);
  }

  getallQualityPaginated(data: RequestData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/quality/allPaginated', data);
  }

  getAllQualityWithNameOnly(){
    return this.httpClient.get(this.commonService.envUrl()+'api/quality/allQuality');
  }

  getQualityById(id): any{
    return this.httpClient.get(this.commonService.envUrl()+'api/quality/'+id);
  }

  updateQualityById(qualityData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/quality', qualityData);
  }
  getQualityNameData() {
    return this.httpClient.get(this.commonService.envUrl() + 'api/quality/allQuality');
  }
  getQualityByParty(id): any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/Quality/ByParty/' + id);
  }
  getQulityIdExist(qId, pId, id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/quality/qualityIdExist?qualityId='+qId+'&partyId='+pId+'&id='+id);
  }
}