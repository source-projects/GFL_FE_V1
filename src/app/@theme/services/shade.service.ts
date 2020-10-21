import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ShadeService {

  constructor(private httpClient:HttpClient,private commonService:CommonService) { }

  getallShade(): any{
    console.log(this.commonService.envUrl()+'api/shade/original/all')
    return this.httpClient.get(this.commonService.envUrl()+'api/shade/original/all');
  }
}
