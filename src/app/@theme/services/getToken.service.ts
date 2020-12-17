import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GetToken {
  
  constructor(private httpClient:HttpClient, private commonService:CommonService) { }



}
