import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  checkUser(userData): any{
    return this.httpClient.post(this.commonService.envUrl()+'api/login',userData);
  }
  createUser(userData): any{
    return this.httpClient.post(this.commonService.envUrl()+'api/user',userData);
  }
  updateUser(userData): any{
    return this.httpClient.put(this.commonService.envUrl()+'api/user',userData);
  }
  getUserById(id): any{
    return this.httpClient.get(this.commonService.envUrl()+'api/user/'+id);
  }
  deleteUserDetailsById(id): any{
    return this.httpClient.delete(this.commonService.envUrl()+'api/user/'+id);
  }
  getAllHead():any{
    return this.httpClient.get(this.commonService.envUrl()+'api/userHead/');
  }
  getAllUser():any{
    return this.httpClient.get(this.commonService.envUrl()+'api/userAllUsers/');
  }
  getDesignation():any{
    return this.httpClient.get(this.commonService.envUrl()+'api/designation');
  }
  saveDesignation(desiData):any{
    return this.httpClient.post(this.commonService.envUrl()+'api/designation',desiData);
  }
  getDesignationById():any{
    return this.httpClient.get(this.commonService.envUrl()+'api/designation/'+id);
  }

}
