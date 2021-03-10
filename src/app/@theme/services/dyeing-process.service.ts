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
  ) { }

  getDyeingProcessById(id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/" + id
    );
  }

  isProcessNameExist(name, id) {
    return this.httpClient.get(
      this.commonService.envUrl() + "api/dyeingProcess/isProcessExistWithName/" + name + '/' + id);
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
}
