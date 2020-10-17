import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { 
  }
  
  getAllPartyList(){
    return this.httpClient.get(this.commonService.envUrl()+'/api/party/all');
  }
}
