import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http:HttpClient) { }

  getAllMachinesCategory(){
    let response = this._http.get("http://150.107.188.188:8080/api/machine/allCategory");
    return response;
  }

  getMachineDataByCategoryId(id:any){
    let response = this._http.get("http://150.107.188.188:8080/api/machine/getMachine/ByCategory?id=" + id);
    return response;
  }

  getMachineDataByMachineIdAPI(id:any){
    let response = this._http.get("http://150.107.188.188:8080/api/machine/" + id);
    return response;
  }

  getobjdata(data:any){
    let response = this._http.post("http://150.107.188.188:8080/api/machineWithFilter",data);
    return response;
  }
}
