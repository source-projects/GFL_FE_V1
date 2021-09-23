import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestData } from '../model/request-data.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }
  getColor(id, getBy): any {
    return this.httpClient.get(this.commonService.envUrl() + 'api/color/all/' + getBy + '/' + id);
  }
  getColorPaginated(data: RequestData): any {
    return this.httpClient.post(this.commonService.envUrl() + 'api/color/allPaginated', data);
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

  
getColorBox(itemId , issued){
  return this.httpClient.get(this.commonService.envUrl() + 'api/color/box/'+issued+'/' + itemId);

}
issueBox(boxNo){
  return this.httpClient.post(this.commonService.envUrl() + 'api/color/box/issue',boxNo);
}

getAllBoxes(){
  return this.httpClient.get(this.commonService.envUrl() + 'api/color/box/all');

}

issueColorBoxWithList(data){
  return this.httpClient.post(this.commonService.envUrl()+'api/color/box/issueWithList',data);
}

}
