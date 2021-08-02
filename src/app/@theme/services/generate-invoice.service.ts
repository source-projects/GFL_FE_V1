import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  
  getShortInvoiceReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/report/forConslidateBill',obj);
  }

  getDetailedInvoiceReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/filter/getBill',obj);
  }

  saveNewSignedInvoice(data){
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/signByParty',data);
  }

  getAllDipatch(by?: string){
    let getBy = '';
    if(by == "signed"){
      getBy = 'true';
    }else if(by == "unsigned"){
      getBy = 'false';
    }
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getAll?signByParty='+getBy);
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

  checkPassword(password){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/get/passwordExist?password=' + password);
  }

  deleteByInvoiceNo(invoiceNo):any{
    return this.httpClient.delete(this.commonService.envUrl() + 'api/dispatch/delete?invoiceNo=' + invoiceNo);
 
  }
 
}
