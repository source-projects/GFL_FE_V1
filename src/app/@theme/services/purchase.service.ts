import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient:HttpClient, private commonService:CommonService){}

  addPurchaseRequest(data){
    return this.httpClient.post(this.commonService.envUrl()+'api/purchaseOrder/',data)
  }

  updateRequestStatus(data){
    return this.httpClient.put(this.commonService.envUrl()+'api/purchaseOrder/update/',data)
  }

  getAllRequests(){
    return this.httpClient.get(this.commonService.envUrl()+'api/purchaseOrder/all')
  }
}
