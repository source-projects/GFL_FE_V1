import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {
    constructor(private httpClient: HttpClient, private commonService: CommonService) { }
    getProgramList(id,getBy) {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/all/'+getBy+'/'+id);
    }

    getAllMasters(){
        return this.httpClient.get(this.commonService.envUrl()+'api/userHead');
    }

    deleteProgramDetailsById(id) {
        return this.httpClient.delete(this.commonService.envUrl() + 'api/program/' + id);
    }
    saveProgram(programData) {
        return this.httpClient.post(this.commonService.envUrl() + 'api/program', programData);
    }
    updateProgram(programData) {
        return this.httpClient.put(this.commonService.envUrl() + 'api/program', programData);
    }
    getProgramDetailsById(id) {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/' + id);
    }
    getShadeDetail() {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/PartyShadeDetailPartyWise');
    }
    getBatchDetailByQualityId(id) {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/BatchData/' + id);
    }
    getStockQualityList(id) {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/StockQuality/' + id);
    }
    getQualityByParty(id): any{
        return this.httpClient.get(this.commonService.envUrl() + 'api/Quality/ByParty/' + id);
    }
    getPartyByQuality(id): any{
        return this.httpClient.get(this.commonService.envUrl() + 'api/party/ByQuality/' + id);
    }
    
    getAllStock(){
        return this.httpClient.get(this.commonService.envUrl() + 'api/stockBatch/all/all/0');
    }

    getAllBatch(){
        return this.httpClient.get(this.commonService.envUrl() + 'api/stockBatch/batch/all');
    }
}