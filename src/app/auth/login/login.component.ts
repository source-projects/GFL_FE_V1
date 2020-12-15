import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { LoginModal } from "../../@theme/model/login-class";
import { AuthService } from "app/@theme/services/auth.service";
import { JwtTokenService } from "app/@theme/services/jwt-token.service";
import { StoreTokenService } from "app/@theme/services/store-token.service";
import * as errorData from "app/@theme/json/error.json";
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: "nb-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public errorData: any = (errorData as any).default;
  formSubmitted = false;
  userPermission = [];
  loginReq: LoginModal;
  constructor(
    private route: Router,
    private toast: ToastrService,
    private authService: AuthService,
    private jwtToken: JwtTokenService,
    private storeTokenService: StoreTokenService
  ) {
    this.loginReq = new LoginModal();
    let location = window.location;
    if (location["hostname"] == "150.107.188.188")
      window["myValue"] = "http://150.107.188.188:8080/";
    else window["myValue"] = "http://13.235.71.124:8080/";
  }

  // On submit button click
  onSubmit(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      let md5 = new Md5();
      this.loginReq.password = md5.appendStr(this.loginReq.password).end()
      this.authService.checkUserLogin(this.loginReq).subscribe(
        (data) => {
          if (data["success"]) {
            this.storeTokenService.set("token", data["data"].accessToken);
            this.storeTokenService.set(
              "refreshToken",
              data["data"].refreshToken
            );
            this.toast.success(errorData.Login_Success);
            this.route.navigate(["/pages"]);
          } else {
            this.loginReq.password = '';
            this.toast.error(errorData.login_Error);
          }
        },
        (error) => {
          this.loginReq.password = '';
          this.toast.error(errorData.Serever_Error);
        }
      );
    }
  }
}
