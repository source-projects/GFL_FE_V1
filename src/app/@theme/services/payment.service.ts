import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestData } from '../model/request-data.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService

  ) { }


  getAllAdvancePaymentBanks() {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/advancePayment/getAllBank");
  }

  getAllBillBank() {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getAllBank");
  }

  getPendingBillByPartyId(partyId) {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getPendingBillByPartyId/" + partyId);
  }

  getAdvancePayment(partyId) {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getAdvancePayment/" + partyId);
  }

  addAdvancePayment(paymentData) {
    return this.httpClient.post(this.commonService.envUrl() + "api/paymentTerm/addAdvancePayment", paymentData);
  }

  getAllPaymentType() {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getAllPaymentType");
  }


  getPaymentDetailById(paymentId) {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getPaymentDetailById?paymentBunchId=" + paymentId);

  }
  savePayment(paymentData) {
    return this.httpClient.post(this.commonService.envUrl() + "api/paymentTerm/", paymentData);

  }

  getAllPayment() {
    return this.httpClient.get(this.commonService.envUrl() + "api/paymentTerm/getAllPayment");
  }

  getAllPaymentPaginated(data: RequestData){
    return this.httpClient.post(this.commonService.envUrl() + "api/paymentTerm/getAllPayment/allPaginated",data);
  }
}
