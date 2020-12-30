import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  // getDipatchList() {
  //   return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/');
  // }
  getAllDipatch(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getAll');
  }
  getBatchByParty(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getBatchByParty/'+id);
  }

  addInvoicedata(invoiceData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch',invoiceData);
  }

  updateInvoice(invoiceData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/updateDispatch', invoiceData);
  }
  getDataByInvoiceNumber(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/getDispatch/byInvoiceNumber/'+id);
 
  }
}
