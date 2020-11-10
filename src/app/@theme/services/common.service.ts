import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getUser(){
    return ({'userId':1});
  }

  envUrl(){
    return environment.apiUrl;
  }

  decToBin(n): any{
    var bin = (+n).toString(2);
    return bin;
  }
}
