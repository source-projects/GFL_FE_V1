import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetToken {
  
  constructor(private httpClient:HttpClient, private commonService:CommonService) { }



}
