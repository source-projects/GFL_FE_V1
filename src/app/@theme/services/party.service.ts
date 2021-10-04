import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestData } from "../model/request-data.model";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class PartyService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getAllPartyWithNameOnly() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/party/allPartyWithName"
    );
  }

  checkPartyNameExist(name,id){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/party/isPartyNameIsExist/" + name+"/"+id
    );
  }

  getAllPartyList(id, getBy) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/party/all/" + getBy + "/" + id
    );
  }

  getAllPartyListPaginated(data: RequestData) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/party/allPaginated", data
    );
  }

  saveParty(partyData) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/party",
      partyData
    );
  }
  updateParty(partyData) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/party",
      partyData
    );
  }
  deletePartyDetailsById(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/party/" + id
    );
  }
  getPartyDetailsById(id) {
    return this.httpClient.get(this.commonService.envUrl() + "api/party/" + id);
  }
  getAllMaster() {
    return this.httpClient.get(this.commonService.envUrl() + "api/userHead");
  }
  getAllPartyNameList() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/party/allPartyWithName"
    );
  }
  getPartyCode(code,id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/party/partyCodeExist/" + code + "/" + id
    );
  }

  getRecords() {
    return this.httpClient.get(this.commonService.envUrl() + "api/testing");
  }
}
