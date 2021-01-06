import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class LogSheetService{

    constructor(private _http:HttpClient,private commonService:CommonService) { }

    getAllMaster(){
        let response = this._http.get(this.commonService.envUrl() +  "api/userHead");
        return response;
      }
    
    getBoilerMachines(){
      let response = this._http.get(this.commonService.envUrl() +  "api/machine/getMachine/ByCategory?id=11624");
      return response;
    }

    getThermopackMachines(){
      let response = this._http.get(this.commonService.envUrl() +  "api/machine/getMachine/ByCategory?id=11625");
      return response;
    }

    saveBoilerData(data){
      let response = this._http.post(this.commonService.envUrl() +  "api/boilerRecord",data);
      return response;
    }

    saveThermoData(data){
      let response = this._http.post(this.commonService.envUrl() +  "api/thermoPackRecord",data);
      return response;
    }

    fetchBoilerData(data){
      let response = this._http.post(this.commonService.envUrl() +  "api/boilerRecord/basedOnFilter/",data);
      return response;
    }
    
}