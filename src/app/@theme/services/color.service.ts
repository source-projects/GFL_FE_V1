import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) {}
  getColor():any{
    return this.httpClient.get(this.commonService.envUrl()+'api/color/all');
  }
  addColor(colorData):any{
    return this.httpClient.get(this.commonService.envUrl()+'api/color');
  }
   
}
