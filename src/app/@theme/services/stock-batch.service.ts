import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class StockBatchService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  isBatchIdExists(name, id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
      "api/stockBatch/isBatchExists/" +
      name +
      "/" +
      id
    );
  }

  deleteStockBatchById(id): any {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/stockBatch/" + id
    );
  }

  getAllStockBatchList(id, getBy): any {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/all/" + getBy + "/" + id
    );
  }

  getAvailableStockBatchList(id, getBy): any {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/pending/all/" + getBy + "/" + id
    );
  }

  getShortStockReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/report/forConslidateBill',obj);
  }

  getDetailedStockReport(obj):any{
    return this.httpClient.post(this.commonService.envUrl() + 'api/dispatch/filter/getBill',obj);
  }


  addStockBatch(myForm) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/stockBatch",
      myForm
    );
  }

  updateStockBatch(myForm) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/stockBatch",
      myForm
    );
  }

  getStockBatchById(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/" + id
    );
  }

  getAllBatch() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/batch/all"
    );
  }

  getBatchById(p_id, q_id) {
    return this.httpClient.get(
      this.commonService.envUrl() +
      "api/stockBatch/batch/ByQualityAndParty/" +
      q_id +
      "/" +
      p_id
    );
  }
  getAllBatchForAdditionSlip() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/batch/forAdditionalSlip"
    );
  }

  getJobCardData(batchId) {
    return this.httpClient.get(
      `${this.commonService.envUrl()}api/stockBatch/get/getJobCardBy?batchId=${batchId}`
    );
  }

  getBatchSequence(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/admin/get/batchSequence?update=" + id
    );
  }

  updateBatchSequence(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/admin/update/batchSequence/",
      data
    );
  }

  getBatchesByPartyQuality(qId, pId) {
    return this.httpClient.get(
      this.commonService.envUrl() +
      "api/stockBatch/batch/ByQualityAndPartyWithProductionPlan/" +
      qId +
      "/" +
      pId
    );
  }

  getBatchGRById(bId) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/batch/" + bId + "/" + bId
    );
  }

  //lot return...
  returnLotPost(body){
    return this.httpClient.post(
      this.commonService.envUrl() + "api/stockBatch/add/returnBatch", body
    );
  }

  returnLotgetById(id){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/get/returnBatch?chlNo="+id
    );
  }

  returnLotgetAll(){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/stockBatch/all/returnBatch"
    );
  }
  
}
