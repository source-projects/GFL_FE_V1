import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ShadeService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  getallShade(): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/shade/original/all');
  }
  addShadeData(shadeData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/shade', shadeData);
  }
  updateShadeData(shadeData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/shade', shadeData);
  }
  deleteShadeData(id): any {
    return this.httpClient.delete(this.commonService.envUrl() + 'api/shade/' + id);
  }
  getQualityProcessList(getBy, id): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/qualityprocess/all/' + getBy + '/' + id);
  }
  getCurrentShadeData(id): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/shade/' + id);
  }
  /* getAllCurrentShadeData():any{
     return this.httpClient.get(this.commonService.envUrl()+'api/shade/current/all');
   }*/
  getShadeMastList(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/shade/all/' + getBy + '/' + id);
  }
  getQualityFromParty(id): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/Quality/ByParty/' + id);
  }
  getPartyFromQuality(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/party/ByQuality/' + id);
  }
  getShadesByQualityAndPartyId(p_id,q_id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/shade/'+ q_id+'/'+p_id);

  }
}
