import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { StoreTokenService } from '../services/store-token.service';
import * as errorData from 'app/@theme/json/error.json';

@Injectable({
  providedIn: 'root'
})
export class StockBatchGuard implements CanActivate {

  public errorData: any = (errorData as any).default;
  permis: String
  constructor(private commonService: CommonService, private jwtToken: JwtTokenService, private storeTokenService: StoreTokenService, private toastr: ToastrService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //0:v, 1:W, 2:U, 3:D, 4:VG 5:VA, 6:EG, 7:EA, 8:DG, 9:DA
    this.jwtToken.setToken(this.storeTokenService.get('token'));
    var permission = this.jwtToken.getDecodeToken('stockBatch');
    this.permis = this.commonService.decToBin(permission);
    let PermissionName = route.data["PermissionName"];
    console.log(PermissionName);  
   switch (PermissionName[0]) {
     case 'view':
       if (this.permis[0] == '1')
         return true;
       else
         return false;

     case 'add':
       if (this.permis[1] == '1')
         return true;
       else
         return false;

     case 'edit':
       if (this.permis[2] == '1')
         return true;
       else
         return false;

     case 'delete':
       if (this.permis[3] == '1')
         return true;
       else
         return false;

     case 'view group':
       if (this.permis[4] == '1')
         return true;
       else
         return false;

     case 'view all':
       if (this.permis[5] == '1')
         return true;
       else
         return false;

     case 'edit group':
       if (this.permis[6] == '1')
         return true;
       else
         return false;

     case 'edit all':
       if (this.permis[7] == '1')
         return true;
       else
         return false;

     case 'delete group':
       if (this.permis[8] == '1')
         return true;
       else
         return false;

     case 'delete all':
       if (this.permis[9] == '1')
         return true;
       else
         return false;

   }
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //0:v, 1:W, 2:U, 3:D, 4:VG 5:VA, 6:EG, 7:EA, 8:DG, 9:DA
    this.jwtToken.setToken(this.storeTokenService.get('token'));
    var permission = this.jwtToken.getDecodeToken('stockBatch');
    let permis: String = this.commonService.decToBin(permission);
    if (permis[0] == '1')
      return true;
    else
      this.toastr.error(errorData.NoPermission);
    return false;
  }
  accessRights(PermissionName):Boolean{
    this.jwtToken.setToken(this.storeTokenService.get('token'));
    var permission = this.jwtToken.getDecodeToken('stockBatch');
    this.permis = this.commonService.decToBin(permission);
    
    //console.log(PermissionName)
    switch (PermissionName) {
      case 'view':
        if (this.permis[0] == '1')
          return true;
        else
          return false;

      case 'add':
        if (this.permis[1] == '1')
          return true;
        else
          return false;

      case 'edit':
        if (this.permis[2] == '1')
          return true;
        else
          return false;

      case 'delete':
        if (this.permis[3] == '1')
          return true;
        else
          return false;

      case 'view group':
        if (this.permis[4] == '1')
          return true;
        else
          return false;

      case 'view all':
        if (this.permis[5] == '1')
          return true;
        else
          return false;

      case 'edit group':
        if (this.permis[6] == '1')
          return true;
        else
          return false;

      case 'edit all':
        if (this.permis[7] == '1')
          return true;
        else
          return false;

      case 'delete group':
        if (this.permis[8] == '1')
          return true;
        else
          return false;

      case 'delete all':
        if (this.permis[9] == '1')
          return true;
        else
          return false;

    }
  }
}
