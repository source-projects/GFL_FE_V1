import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';
import { StoreTokenService } from './store-token.service';

@Injectable({ 
  providedIn: 'root'
})
export class CommonService {
  // private broadCastMesaage=new BehaviorSubject<string>("Demo");
  // broadCast=this.broadCastMesaage.asObservable();

  constructor(private token: StoreTokenService, private jwt:JwtTokenService) { }
  
  // updateBrodCast(newMassge:string){
  //   this.broadCastMesaage.next(newMassge);
  // }
  getUser(){
    this.jwt.setToken(this.token.get('token'));
    this.jwt.decodeToken();
    return ({'userId': this.jwt.getDecodeToken('userId')});
  }

  getUserHeadId(){
    this.jwt.setToken(this.token.get('token'));
    this.jwt.decodeToken();
    return ({'userHeadId': this.jwt.getDecodeToken('userHeadId')});
  }

  getUserName(){
    this.jwt.setToken(this.token.get('token'));
    this.jwt.decodeToken();
    return ({'name': this.jwt.getDecodeToken('userName')});
  }

  envUrl(){
    let url = "";
    let location = window.location;
    if(location["hostname"] == "103.137.194.167"){
      url = "http://localhost:8080/";
    }else if(location['hostname'] == "13.235.71.124" || location['hostname'] == "localhost")
      url = "http://13.235.71.124:8080/";
    else url = "http://103.137.194.167:8080/";
    return url;
    //return url "http://13.235.71.124:8080/";
  }

  decToBin(n): any{
    var bin = (+n).toString(2);
    let count = 10 - bin.length
    let zero = '0';
    bin = zero.repeat(count) +bin
    return bin;
  }
}
