import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { CommonService } from "./common.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProcessService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getAllProcessList(getBy, id){
    return this.httpClient.get(this.commonService.envUrl() + "api/qualityprocess/all/"+getBy+"/"+id);
  }

  getAllItemWithSupplier(){
    return this.httpClient.get(this.commonService.envUrl() + "api/supplier/getItemWithSupplierName/all");
  }

  saveProcess(data){
    return this.httpClient.post(this.commonService.envUrl() + "api/qualityprocess",data);
  }

  deleteProcess(id){
    return this.httpClient.delete(this.commonService.envUrl() + "api/qualityProcess/"+id);
  }
}
