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

  getSlipDataByBatchStockId(bId, sId){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dyeingSlip/'+bId+'/'+sId);
  }

  updateSlipData(obj){
    return this.httpClient.put(this.commonService.envUrl() + 'api/dyeingSlip',obj);
  }
}
