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

  getAllItemWithSupplier(){
    return this.httpClient.get(this.commonService.envUrl() + "api/supplier/getItemWithSupplierName/all");
  }
}
