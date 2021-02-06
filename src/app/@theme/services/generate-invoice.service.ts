import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  
  getShortInvoiceReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/filter/forConslidateBill',obj);
  }

  getDetailedInvoiceReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/filter/getBill',obj);
  }

  getAllDipatch(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getAll');
  }
  getBatchByParty(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getBatchByParty/'+id);
  }

  addInvoicedata(invoiceData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/',invoiceData);
  }

  updateInvoice(invoiceData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/dispatch/updateDispatch/', invoiceData);
  }
  getDataByInvoiceNumber(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getDispatch/byInvoiceNumber/'+id);
 
  }
}
