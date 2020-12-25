import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class ProductionPlanningService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  saveProductionPlan(productionData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/productionPlan/', productionData);
  }
  getAllProductionPlan(): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/productionPlan/all');
  }
  
}
