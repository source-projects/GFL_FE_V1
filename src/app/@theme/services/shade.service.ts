import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ShadeService {

  constructor(private httpClient: HttpClient,
    private commonService: CommonService) { }

  getallShade(): any {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/shade/original/all');
  }

  addShadeData(shadeData): any {
    return this.httpClient.post(
      this.commonService.envUrl() + 'api/shade',
      shadeData);
  }

  updateShadeData(shadeData) {
    return this.httpClient.put(
      this.commonService.envUrl() + 'api/shade',
      shadeData);
  }

  deleteShadeData(id): any {
    return this.httpClient.delete(
      this.commonService.envUrl() + 'api/shade/' + id);
  }

  getCurrentShadeData(id): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/shade/' + id);
  }

  getShadeMastList(id, getBy): any {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/shade/all/' + getBy + '/' + id);
  }

  getQualityFromParty(id): any {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/Quality/ByParty/' + id);
  }

  getShadesByQualityAndPartyId(p_id, q_id) {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/shade/' + q_id + '/' + p_id);
  }

  getAllPendingShade() {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/shade/allPendingAPC');
  }

  getAllDyeingProcess() {
    return this.httpClient.get(
      this.commonService.envUrl() + 'api/dyeingProcess/all');

  }
}
