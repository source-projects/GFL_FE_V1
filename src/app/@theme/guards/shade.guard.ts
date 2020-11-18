import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as errorData from 'app/@theme/json/error.json';
import { CommonService } from '../services/common.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { StoreTokenService } from '../services/store-token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShadeGuard implements CanActivate {

  public errorData: any = (errorData as any).default;

  constructor(private commonService: CommonService, private jwtToken: JwtTokenService, private storeTokenService: StoreTokenService, private toastr:ToastrService,private _router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('token')){
      return true;
    }
    this._router.navigate(['auth']);
    return true;
  }
  
  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //0:v, 1:W, 2:U, 3:D, 4:VG 5:VA, 6:EG, 7:EA, 8:DG, 9:DA
    this.jwtToken.setToken(this.storeTokenService.get('token'));
    var permission = this.jwtToken.getDecodeToken('shade');
    let permis: String = this.commonService.decToBin(permission);
    if (permis[0] == '1')
      return true;
    else
    this.toastr.error(errorData.NoPermission);
      return false;
  }
}
