import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpClient:HttpClient, private commonService:CommonService) { }

  checkUserLogin(data): any{
    return this.httpClient.post(this.commonService.envUrl()+'api/login',data);
  }

}
