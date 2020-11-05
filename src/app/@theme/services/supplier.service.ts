import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  getAllSupplier():any{
    return this.httpClient.get(this.commonService.envUrl()+'/api/supplier/all');
  }
  editSupplierInfo(supplierData){
    return this.httpClient.put(this.commonService.envUrl()+'/api/supplier',supplierData);
  }
  getAllSupplierById(id){
    return this.httpClient.get(this.commonService.envUrl()+'api/supplier/rate/'+id);
  }

  updateSupplierById(supplierData){
    return this.httpClient.put(this.commonService.envUrl()+'api/supplier',supplierData);
  }
  getAllSupplierRates(){
    return this.httpClient.get(this.commonService.envUrl()+'api/supplier/rates/all'); 
  }
}
