import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestData } from '../model/request-data.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  private handleError(err: HttpErrorResponse) {
    
  }

  isSupplierExists(name, id){
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/isSupplierNameExists/'+name+'/'+id);
  }

  addSupplierInSystem(supplierData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/supplier', supplierData);
  }
  getAllSupplier(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/all/' + getBy + '/' + id);
  }
  getAllSupplierV1(data: RequestData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/supplier/allPaginated', data);
  }
  editSupplierInfo(supplierData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/supplier', supplierData);
  }
  getAllSupplierById(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/rate/' + id);
  }

  updateSupplierById(supplierData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/supplier', supplierData);
  }

  addSupplierRateInSystem(supplierData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/supplier/rates', supplierData);
  }

  updateSupplierRateInSystem(supplierData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/supplier/rates', supplierData)
  }

  getAllSupplierRates() {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/rates/all');
  }

  getSupplierName(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/all/' + getBy + '/' + id);
  }

  getSupplierNameV1(): Observable<any>{
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/all');
  }

  getSupplierItemWithRateById(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/GetItemWithRateBy/' + id);
  }

  getItemWithSupplier(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/color/supplierList/getSupplierItemWithAvailableStock');
  }

  getDuplicateCheck(id,name){
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/rates/exist?id=' + id + '&name=' + name);
  }
}
