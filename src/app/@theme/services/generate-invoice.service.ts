import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { RequestData } from '../model/request-data.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  
  getShortInvoiceExcel(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/report/forConslidateExcelBill',obj);
  }

  getShortInvoiceReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/report/forConslidateReportBill',obj);
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

  getAllDipatchV1(data: RequestData, by?: string){
    let getBy = '';
    if(by == "signed"){
      getBy = 'true';
    }else if(by == "unsigned"){
      getBy = 'false';
    }
    data['signByParty']=getBy;
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/allPaginated', data);
  }
  getBatchByParty(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getBatchByParty/'+id);
  }
  // GET PCHALLAN BY PARTY ID
  getPChallanByParty(obj){
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/getPChallanByParty' ,obj);
  }

  addInvoicedata(invoiceData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/',invoiceData);
  }

  // addInvoice with pchaalan No
  addInvoicedataWithPchallan(invoiceData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/add',invoiceData);
  }

  updateInvoice(invoiceData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/dispatch/updateDispatch/', invoiceData);
  }

  // update with pchallan no
  updateInvoiceWithPchallan(invoiceData): any {
    return this.httpClient.put(this.commonService.envUrl() + 'api/dispatch/update', invoiceData);
  }
  getDataByInvoiceNumber(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getDispatch/byInvoiceNumber/'+id);
 
  }

  //get updated data by invoice number for pchallan no
  getDataByInvoiceNumberByChallan(id):any{
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getDispatchWithPChallan/byInvoiceNumber/'+id);
 
  }

  checkPassword(password){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/get/passwordExist?password=' + password);
  }

  deleteByInvoiceNo(invoiceNo):any{
    return this.httpClient.delete(this.commonService.envUrl() + 'api/dispatch/delete?invoiceNo=' + invoiceNo);
 
  }
 
}
