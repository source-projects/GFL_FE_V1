import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { JwtTokenService } from "../services/jwt-token.service";
import { ToastrService } from "ngx-toastr";
import { StoreTokenService } from "../services/store-token.service";
@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  userId;
  errorMessage: string;
  constructor(
    private router: Router,
    private injector: Injector,
    private toastr: ToastrService,
    private tokenService: StoreTokenService
  ) {
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
      if (!request.url.includes("cloudinary")) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            id: `${this.userId}`,
          },
        });
      }
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
            this.toastr.error(err.error["msg"])
            // if (err.status === 401) {
            //   //this.authService.logout();
            //   // this.toasterService.error('Token Expired!');
            //   this.router.navigate(["./auth"]);
            // }

          //   switch (err.status) {
          //     case 400:
                
          //       console.log(err.error["msg"])
          //       this.errorMessage = "Bad Request.";
          //       break;
          //     case 401:
          //       this.errorMessage = "token expired";
          //       this.tokenService.remove("token");
          //       this.tokenService.remove("refreshToken");
          //       this.router.navigate(["auth"]);
          //       break;
          //     case 402:
          //       this.errorMessage =
          //         "You don't have permission to access the requested resource.";
          //       break;
          //     case 404:
          //       this.errorMessage = "The requested resource does not exist.";
          //       break;
          //     case 412:
          //       this.errorMessage = "Precondition Failed.";
          //       break;
          //     case 500:
          //       this.errorMessage = "Internal Server Error.";
          //       break;
          //     case 503:
          //       this.errorMessage = "The requested service is not available.";
          //       break;
          //     case 422:
          //       this.errorMessage = "Validation Error!";
          //       break;
          //     default:
          //       this.errorMessage = "Something went wrong!";
          //   }
          // }
          // if (this.errorMessage) {
          //   this.toastr.error(this.errorMessage);
          }
        }
      )
    );
  }
}
