import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { StoreTokenService } from '../services/store-token.service';

@Injectable({
  providedIn: 'root'
})
export class QualityGuard implements CanActivate {
  
  constructor(private commonService: CommonService, private jwtToken:JwtTokenService, private storeTokenService: StoreTokenService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //0:v, 1:W, 2:U, 3:D, 4:VG 5:VA, 6:EG, 7:EA, 8:DG, 9:DA
      this.jwtToken.setToken(this.storeTokenService.get('token'));
      var permission = this.jwtToken.getDecodeToken('quality');
      console.log(permission);
      let permis:String = this.commonService.decToBin(permission);
      console.log(permis)
      if(permis[0] == '1')
        return true;
      else
        return false;
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //0:v, 1:W, 2:U, 3:D, 4:VG 5:VA, 6:EG, 7:EA, 8:DG, 9:DA
      this.jwtToken.setToken(this.storeTokenService.get('token'));
      var permission = this.jwtToken.getDecodeToken('quality');
      console.log(permission);
      let permis:String = this.commonService.decToBin(permission);
      console.log(permis)
      if(permis[0] == '1')
        return true;
      else
        return false;
  }
  
}
