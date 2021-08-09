import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import * as errorData from "../../@theme/json/error.json";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { CommonService } from "../services/common.service";
import { JwtTokenService } from "../services/jwt-token.service";
import { StoreTokenService } from "../services/store-token.service";

@Injectable({
  providedIn: "root",
})
export class CommonGuard implements CanActivate {
  public errorData: any = (errorData as any).default;
  permis: String;
  constructor(
    private commonService: CommonService,
    private jwtToken: JwtTokenService,
    private storeTokenService: StoreTokenService,
    private toastr: ToastrService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //0:v, 1:W, 2:U, 3:D, 4:VG 5:EG, 6:DG, 7:VA, 8:EG, 9:DA
    this.jwtToken.setToken(this.storeTokenService.get("token"));
    var permission = this.jwtToken.getDecodeToken(route.data["compName"]);
    this.permis = this.commonService.decToBin(permission);
    let PermissionName = route.data["PermissionName"];
    if (PermissionName.length == 1) {
      switch (PermissionName[0]) {
        case "view":
          if (this.permis[0] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "add":
          if (this.permis[1] == "1") return true;
          else {
            this._router.navigate(["/pages/color/view"]);
            return false;
          }

        case "edit":
          if (this.permis[2] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "delete":
          if (this.permis[3] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "view group":
          if (this.permis[4] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "edit group":
          if (this.permis[5] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "delete group":
          if (this.permis[6] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "view all":
          if (this.permis[7] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "edit all":
          if (this.permis[8] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }

        case "delete all":
          if (this.permis[9] == "1") return true;
          else {
            this._router.navigate(["/pages"]);
            return false;
          }
      }
    } else if (PermissionName.length == 3) {
      if (
        this.permis[0] == "1" ||
        this.permis[4] == "1" ||
        this.permis[7] == "1"
      )
        return true;
      else {
        this._router.navigate(["/pages"]);
        return false;
      }
    }
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //0:v, 1:W, 2:U, 3:D, 4:VG 5:EG, 6:DG, 7:VA, 8:EG, 9:DA
    this.jwtToken.setToken(this.storeTokenService.get("token"));
    var permission = this.jwtToken.getDecodeToken(route.data["compName"]);
    let permis: String = this.commonService.decToBin(permission);
    if (permis[0] == "1" || permis[4] == "1" || permis[7] == "1") return true;
    else this.toastr.error(errorData.NoPermission);
    return false;
  }

  
}
