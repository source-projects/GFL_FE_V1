import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningSlipService {

  constructor(
    private httpClient: HttpClient, 
    private commonService: CommonService
  ) { }

  getSlipDataByBatch(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dyeingSlip/'+id);
  }

  updateSlipData(obj){
    return this.httpClient.put(this.commonService.envUrl() + 'api/dyeingSlip',obj);
  }
}
