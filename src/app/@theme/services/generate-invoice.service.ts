import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  getDipatchList(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/'+id);
  }
  getAllDipatch(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getAll');
  }
  getBatchByParty(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getBatchByParty/'+id);
  }
  getFinishedMtrList(batchId,controlId){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dispatch/getFinishMtrList/'+batchId+'/'+controlId);
  }
  
}
