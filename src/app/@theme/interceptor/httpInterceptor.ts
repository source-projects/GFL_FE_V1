import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('token');
    // if (token) {
    //     currentUser.token = token;
    // }
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next.handle(request)
        .do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    //this.authService.logout();
                    // this.toasterService.error('Token Expired!');
                    this.router.navigate(['./auth']);
                }
            }
        });
}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return Observable.fromPromise(this.handleAccess(request, next));
  // }

  // private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
  //     Promise<HttpEvent<any>> {
  //   const token = localStorage.getItem('token');
  //   let changedRequest = request;
  //   // HttpHeader object immutable - copy values
  //   const headerSettings: {[name: string]: string | string[]; } = {};

  //   for (const key of request.headers.keys()) {
  //     headerSettings[key] = request.headers.getAll(key);
  //   }
  //   if (token) {
  //     headerSettings['Authorization'] = 'Bearer ' + token;
  //   }
  //   headerSettings['Content-Type'] = 'application/json';
  //   const newHeader = new HttpHeaders(headerSettings);

  //   changedRequest = request.clone({
  //     headers: newHeader});
  //   return next.handle(changedRequest).toPromise();
  // }

}