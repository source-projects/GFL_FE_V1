import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CommonService } from './common.service';
import { StoreTokenService } from './store-token.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private httpClient: HttpClient, private commonService: CommonService, private token:StoreTokenService) { }

  public isAuthenticated(): boolean {
    const token = this.token.get('token');
    return !!token ? true : false;
  }

  checkUserLogin(data): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/login', data);
  }


}
