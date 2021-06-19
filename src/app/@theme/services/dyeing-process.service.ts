import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class DyeingProcessService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}

  getDyeingSlipData(){
    return this.httpClient.get(
      this.commonService.envUrl()+"api/dyeingSlip/all"
    )
  }

  getDyeingProcessById(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/" + id
    );
  }

  isProcessNameExist(name,id){
    return this.httpClient.get(this.commonService.envUrl() + "api/dyeingProcess/isProcessExistWithName/"+name+'/'+id);
  }

  getAllDyeingProcessList() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/all");
  }

  getAllItemWithSupplier() {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/supplier/getItemWithSupplierName/all"
    );
  }

  saveDyeingProcess(data) {
    return this.httpClient.post(
      this.commonService.envUrl() + "api/dyeingProcess",
      data
    );
  }

  deleteDyeingProcess(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/dyeingProcess/" + id
    );
  }

  updateDyeingProcess(data) {
    return this.httpClient.put(
      this.commonService.envUrl() + "api/dyeingProcess",
      data
    );
  }

  // Tag APIs

  checkUniqTag(id, name){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/exist/tagProcess?id="+id+"&name="+name
    );
  }

  getAllTags(){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/all/tagProcess"
    );
  }

  getTagNameById(id){
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/get/tagProcess?id="+id,
    );
  }

  addTagName(data){
    return this.httpClient.post(
      this.commonService.envUrl() + "api/dyeingProcess/add/tagProcess", data
    );
  }

  updateTagName(data){
    return this.httpClient.put(
      this.commonService.envUrl() + "api/dyeingProcess/update/tagProcess", data
    );
  }

  deleteProcessTag(id) {
    return this.httpClient.delete(
      this.commonService.envUrl() + "api/dyeingProcess/delete/tagProcess?id=" + id
    );
  }
}
