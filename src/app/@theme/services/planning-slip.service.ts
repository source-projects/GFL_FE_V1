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

  saveadditionSlip(obj){
    return this.httpClient.post(this.commonService.envUrl() + 'api/dyeingSlip/add/additionalDyeingSlip/',obj);

  }

  getAlladditionSlip(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dyeingSlip/additionalDyeingslip/all');

  }

  getAlladditionSlipById(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dyeingSlip/getAdditionalDyeingSlipBy/'+id);

  }

  updateAdditionDyeingSlip(slipData){
    return this.httpClient.put(this.commonService.envUrl() + 'api/dyeingSlip/update/additionalDyeingSlip/',slipData);

  }

  deleteAdditionSlip(id){
    return this.httpClient.delete(this.commonService.envUrl() + 'api/dyeingSlip/deleteAdditionalDyeingSlipBy/'+id);

  }

  saveDirectSlip(data){
    return this.httpClient.post(this.commonService.envUrl() + 'api/productionPlan/directDyeingSlip',data);

  }
}
