import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateInvoiceService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  getDipatchList(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/dipatch/'+id);
  }
  getAllDipatch(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dipatch/getAll');
  }
  getBatchByParty(id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/dipatch/getBatchByParty/'+id);
  }
  
}
