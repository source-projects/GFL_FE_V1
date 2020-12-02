import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
  jwtToken: string;
  decodedToken: any;
  tokens;

  constructor() { }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
    this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getDecodeToken(moduleName) {
    this.tokens = jwt_decode(this.jwtToken);
    switch(moduleName){
      case 'quality':
        return this.tokens.permissions.qu;

      case 'party':
        return this.tokens.permissions.pa;

      case 'stockBatch':
        return this.tokens.permissions.sb;

      case 'process':
        return this.tokens.permissions.pr;

      case 'user':
        return this.tokens.permissions.u;

      case 'color':
        return this.tokens.permissions.cs;

      case 'program':
        return this.tokens.permissions.prg;

      case 'shade':
        return this.tokens.permissions.sh;

      case 'supplier':
        return this.tokens.permissions.su;

      case 'jetPlanning':
        return this.tokens.permissions.jp;

      case 'processPlanning':
        return this.tokens.permissions.pp;

      case 'supplierRate':
        return this.tokens.permissions.sr;

      case 'userId':
        return this.tokens.sub;

      case 'userHeadId':
        return this.tokens.userHeadId;

      case 'userName':
          return this.tokens.userName;
      
      default:
        return null;
    }
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.displayname : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime());
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
