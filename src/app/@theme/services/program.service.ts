import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramService {
    constructor(private httpClient: HttpClient, private commonService: CommonService) { }
    getProgramList() {
        return this.httpClient.get(this.commonService.envUrl() + 'api/program/all');
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

}