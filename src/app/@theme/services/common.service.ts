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
  permis;
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

    if (hostName == "192.168.1.103") {
      url = "http://192.168.1.103:8080/";
    } else if (hostName.includes("dyeingerp.gloryautotech.com")) {
      url = "https://api.dyeingerp.gloryautotech.com/";
    } else if (hostName == "15.206.179.225" || hostName == "localhost") {
      url = "https://api.dyeingerp.gloryautotech.com/";
    }
    else {
      url = "http://103.137.194.167:8080/";
    }


    return url;

  }

  decToBin(n): any {
    var bin = (+n).toString(2);
    let count = 10 - bin.length;
    let zero = "0";
    bin = zero.repeat(count) + bin;
    return bin;
  }

  accessRights(PermissionName, compName): Boolean {
    this.jwt.setToken(this.token.get("token"));
    var permission = this.jwt.getDecodeToken(compName);
    this.permis = this.decToBin(permission);
    switch (PermissionName) {
      case "view":
        if (this.permis[0] == "1") return true;
        else return false;

      case "add":
        if (this.permis[1] == "1") return true;
        else return false;

      case "edit":
        if (this.permis[2] == "1") return true;
        else return false;

      case "delete":
        if (this.permis[3] == "1") return true;
        else return false;

      case "view group":
        if (this.permis[4] == "1") return true;
        else return false;

      case "edit group":
        if (this.permis[5] == "1") return true;
        else return false;

      case "delete group":
        if (this.permis[6] == "1") return true;
        else return false;

      case "view all":
        if (this.permis[7] == "1") return true;
        else return false;

      case "edit all":
        if (this.permis[8] == "1") return true;
        else return false;

      case "delete all":
        if (this.permis[9] == "1") return true;
        else return false;
    }
  }
}
