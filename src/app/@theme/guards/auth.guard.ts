import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private auth: AuthService) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log("bye")
      this._router.navigate(['auth']);
      return false;
    }
    console.log("welcome")
    return true;
  }
}
