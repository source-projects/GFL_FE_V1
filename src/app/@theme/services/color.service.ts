import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  getColor(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/color/all/' + getBy + '/' + id);
  }
  addColor(colorData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/color', colorData);
  }
  updateColor(colorData) {
    return this.httpClient.put(this.commonService.envUrl() + 'api/color', colorData);
  }
  deleteColorById(colorId) {
    return this.httpClient.delete(this.commonService.envUrl() + 'api/color/' + colorId);
  }
  getColorDataById(colorId) {
    return this.httpClient.get(this.commonService.envUrl() + 'api/color/' + colorId);
  }

}
