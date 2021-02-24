import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { CommonService } from "../services/common.service";
import { JwtTokenService } from "../services/jwt-token.service";
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  userId;
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwt: JwtTokenService
  ) {
    this.userId = this.jwt.getDecodeToken("userId");
    // this.commonService.getUser();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          id: `${this.userId.userId}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              //this.authService.logout();
              // this.toasterService.error('Token Expired!');
              this.router.navigate(["./auth"]);
            }
          }
        }
      )
    );
  }
}
