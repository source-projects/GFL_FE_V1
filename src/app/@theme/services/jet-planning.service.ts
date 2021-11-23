import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestData } from "../model/request-data.model";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class JetPlanningService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  getAllJetData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/jet/getAllJetDetail"
    );
  }

  getAllJetDataV1() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/jet/getAllJetMast"
    );
  }

  getAllStatuses() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/jet/getJet/allStatusList"
    );
  }

  updateStatus(obj) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/jet/updateJetData/productionStatus/",
      obj
    );
  }

  saveJetData(jetData) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/jet/addJetData",
      jetData
    );
  }

  updateJetData(obj) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/jet/updateJetData",
      obj
    );
  }

  getAllProductionWithoutJetPlan() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/productionPlan/all"
    );
  }

  getProductionNonProdBatchList(data: RequestData, productionPlanned: boolean){
    return this.httpClient.post(
      this.commonService.envUrl() + "api/stockBatch/batch/allPaginated/"+productionPlanned, data
    );
  }

  getBatchedDetailByProductionId(p_id, b_id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
      "api/productionPlan/getBatchdDetailByProductionAndBatch/" +
      p_id +
      "/" +
      b_id
    );
  }

  startJetProcess(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/jet/start", data
    );
  }


  removeProductionFromJet(jetId, prodId) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/jet/delete/removeProductionFromJet/" + jetId + "/" + prodId
    );
  }

  removeBatchFromList(batchId) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/productionPlan/removeBy?batchId=" + batchId
    );
  }

  getJetDataById(jetIds){
    return this.httpClient.post(
      this.commonService.envUrl() + "api/jet/getAllJetMastDetailByIds",jetIds
    );
  }


}
