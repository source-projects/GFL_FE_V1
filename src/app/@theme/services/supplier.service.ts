import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/observable';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  constructor(private httpClient:HttpClient, private commonService:CommonService) { }
  private handleError(err:HttpErrorResponse){
    console.log("Handle Error Http call");
    console.log(err.message);
  }
  addSupplierInSystem(supplierData){
    return this.httpClient.post(this.commonService.envUrl()+'/api/supplier',supplierData);
  }
}
