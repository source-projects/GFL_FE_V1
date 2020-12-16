import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  private handleError(err: HttpErrorResponse) {
    console.log("Handle Error Http call");
    console.log(err.message);
  }
  addSupplierInSystem(supplierData) {
    return this.httpClient.post(this.commonService.envUrl() + 'api/supplier', supplierData);
  }
  getAllSupplier(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/all/' + getBy + '/' + id);
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

  getSupplierItemWithRateById(id) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/GetItemWithRateBy/' + id);
  }

  getItemWithSupplier(){
    return this.httpClient.get(this.commonService.envUrl() + 'api/supplier/getItemWithSupplierName/all');
  }
}
