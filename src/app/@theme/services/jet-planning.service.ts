import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class JetPlanningService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getAllJetData() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/jet/getAllJetDetail"
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

  getBatchedDetailByProductionId(p_id, b_id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
        "api/productionPlan/getBatchdDetailByProductionAndBatch/" +
        p_id +
        "/" +
        b_id
    );
  }

  
removeProductionFromJet(jetId, prodId){
  return this.httpClient.delete(
    this.commonService.envUrl() + "api/jet/delete/removeProductionFromJet/"+jetId+"/"+prodId
  );
}
}
