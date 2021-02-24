import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { JwtTokenService } from "../services/jwt-token.service";
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  userId;
  constructor(private router: Router, private injector: Injector) {
    // this.commonService.getUser();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      let service = this.injector.get(JwtTokenService);
      this.userId = service.getDecodeToken("userId");
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          id: `${this.userId}`
        }
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
