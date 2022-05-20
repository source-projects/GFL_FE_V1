import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { JwtTokenService } from "./jwt-token.service";
import { StoreTokenService } from "./store-token.service";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  // private broadCastMesaage=new BehaviorSubject<string>("Demo");
  // broadCast=this.broadCastMesaage.asObservable();

  constructor(private token: StoreTokenService, private jwt: JwtTokenService) { }

  // updateBrodCast(newMassge:string){
  //   this.broadCastMesaage.next(newMassge);
  // }
  getUser() {
    this.jwt.setToken(this.token.get("token"));
    this.jwt.decodeToken();
    return { userId: this.jwt.getDecodeToken("userId") };
  }

  getUserHeadId() {
    this.jwt.setToken(this.token.get("token"));
    this.jwt.decodeToken();
    return { userHeadId: this.jwt.getDecodeToken("userHeadId") };
  }

  getUserName() {
    this.jwt.setToken(this.token.get("token"));
    this.jwt.decodeToken();
    return { name: this.jwt.getDecodeToken("userName") };
  }

  envUrl() {
    let url = "";
    let location = window.location;
    const hostName = location["hostname"];
    console.log(hostName)
    if (hostName == "192.168.1.103") {
      url = "http://192.168.1.103:8080/";
    }
    else if (hostName.includes("192.168.1.112")) {
      url = "http://192.168.1.112:8080/";
    } else if (hostName.includes("192.168.1.102")) {
      url = "http://192.168.1.102:8080/";
    }
    else if (hostName.includes("192.168.29.229")) {
      url = "http://192.168.29.229:8080/";
    }
    else if (hostName.includes("localhost")) {
      url = "http://localhost:8080/";
    }
    else if (hostName.includes("dyeingerp.gloryautotech.com")) {
      url = "https://api.dyeingerp.gloryautotech.com/";
    } else if (hostName == "15.206.179.225") {
      url = "https://api.dyeingerp.gloryautotech.com/";
    }
    else {
      url = "http://103.137.194.167:8080/";
    }


    return url;

  }

  plcUrl() {
    let url = "";
    let location = window.location;
    const hostName = location["hostname"];

    if (hostName == "192.168.1.103") {
      url = "http://192.168.1.103:9000/";
    } else if (hostName.includes("dyeingerp.gloryautotech.com")) {
      url = "https://api.dyeingerp.gloryautotech.com/";
    } else if (hostName == "15.206.179.225" || hostName == "localhost") {
      url = "https://api.dyeingerp.gloryautotech.com/";
    }
    else {
      url = "http://103.137.194.167:9000/";
    }
    return "http://192.168.29.228:9000/";
  }

  decToBin(n): any {
    var bin = (+n).toString(2);
    let count = 10 - bin.length;
    let zero = "0";
    bin = zero.repeat(count) + bin;
    return bin;
  }
}
