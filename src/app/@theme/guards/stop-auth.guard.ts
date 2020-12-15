import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreTokenService } from '../services/store-token.service';

@Injectable({
  providedIn: 'root'
})
export class StopAuthGuard implements CanActivate {

  constructor(private _router: Router,private store: StoreTokenService) { }
  
  canActivate(): boolean {
    if (this.store.get('token')!=null) {
      this._router.navigate(['pages']);
      return false;
    }
    return true;
  }
}

