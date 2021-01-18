import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService

  ) { }

  
getPendingBillByPartyId(partyId){
  return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getPendingBillByPartyId/"+partyId);
}

getAdvancePayment(partyId){
  return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getAdvancePayment/"+partyId);
}
}
