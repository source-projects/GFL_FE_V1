import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class LogSheetService{

    constructor(private _http:HttpClient,private commonService:CommonService) { }

    getAllMaster(){
      return  this._http.get(
        this.commonService.envUrl() +  "api/userHead");
      }
    
    getBoilerMachines(){
      return this._http.get(
        this.commonService.envUrl() +  "api/machine/getMachine/ByCategory?id=11624");
    }

    getThermopackMachines(){
      return this._http.get(
        this.commonService.envUrl() +  "api/machine/getMachine/ByCategory?id=11625");
    }

    saveBoilerData(data){
      return this._http.post(
        this.commonService.envUrl() +  "api/boilerRecord",
        data);
    }

    saveThermoData(data){
      return this._http.post(
        this.commonService.envUrl() +  "api/thermopack/",
        data);
    }

    fetchBoilerData(data){
      return this._http.post(
        this.commonService.envUrl() +  "api/boilerRecord/basedOnFilter/",
        data);
    }

    fetchThermoData(data){
      return this._http.post(
        this.commonService.envUrl() +  "api/thermopack/filter/basedOnShift/",
        data);
    }
    
}