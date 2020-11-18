import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FabricInService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  getallFabric(): any{
    return this.httpClient.get(this.commonService.envUrl()+'api/fabrics/all');
  }

  saveFabricIn(fabricInDate): any{
    return this.httpClient.post(this.commonService.envUrl()+'api/fabric',fabricInDate);
  }

  deleteById(fabricId): any{
    return this.httpClient.delete(this.commonService.envUrl()+'api/fabric/'+fabricId);
  }

  editFabricData(fabricData):any{
    return this.httpClient.put(this.commonService.envUrl()+'api/fabric',fabricData);
  }

  getFabStockDataById(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/fabric/'+id);
  }
}
