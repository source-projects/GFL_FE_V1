import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "./common.service";
import { RequestData } from "../model/request-data.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductionPlanningService {
  addToJetClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {
    this.addToJetClicked.subscribe((ele) => {
    });
  }

  saveProductionPlan(productionData): any {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/productionPlan/productionPlanWithJet/",
      productionData
    );
  }
  getAllProductionPlan(): any {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/productionPlan/all"
    );
  }
  getAllPlannedProductionList(): any {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/productionPlan/allProductionWithoutFilter"
    );
  }

  getAllBatchListForProdV1(data: RequestData, isProd): Observable<any>{
    return this.httpClient.post(
      this.commonService.envUrl() +
        "api/stockBatch/batch/allPaginated/"+isProd, data
    );
  }
  getWeightByStockIdAndBatchId(id, id1): any {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/stockBatch/getWtByStockIdAndBatchId/" +
        id +
        "/" +
        id1
    );
  }

  deleteProduction(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/productionPlan/deleteBy/" + id
    );
  }

  updateProductionPlan(productionData){
    return this.httpClient.put(
      this.commonService.envUrl() + "api/updateProductionPlan/", productionData
    );
  }
}
