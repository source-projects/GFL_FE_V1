import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import * as errorData from "../../../@theme/json/error.json";
import { RegistrationService } from '../../../@theme/services/registration.service';

@Component({
  selector: 'ngx-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ScanQRComponent implements OnInit {


  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  
  loading = false;
  formSubmitted = false;
  empId : any;
  constructor(
    private registrationService : RegistrationService,
   private renderer: Renderer2,
   private route: Router,
   private toastr: ToastrService,

  ) { }

  ngOnInit(): void {}


// clearResult(): void {
//   this.qrResultString = null;
  
// }

// onHasPermission(has: boolean) {
//   this.hasPermission = has;
// }

// onCamerasFound(devices: MediaDeviceInfo[]): void {
//   this.availableDevices = devices;
//   console.log(this.availableDevices)
//   this.hasDevices = Boolean(devices && devices.length);
//   console.log(this.hasDevices)
// }

// onDeviceSelectChange(selected: string) {
//   const device = this.availableDevices.find(x => x.deviceId === selected);
//   this.currentDevice = device || null;
// }

// onCodeResult(resultString: string) {
//   this.qrResultString = resultString;
//   window.location.href = this.qrResultString;
// }

clearResult(): void {
  this.qrResultString = null;
}

onCamerasFound(devices: MediaDeviceInfo[]): void {
  this.availableDevices = devices;
  this.hasDevices = Boolean(devices && devices.length);
  alert(this.availableDevices[0].label)
}

onCodeResult(resultString: string) {
  this.qrResultString = resultString;
}

onDeviceSelectChange(selected: string) {
  const device = this.availableDevices.find(x => x.deviceId === selected);
  this.currentDevice = device || null;
}

onHasPermission(has: boolean) {
  this.hasPermission = has;
}

onTorchCompatible(isCompatible: boolean): void {
  this.torchAvailable$.next(isCompatible || false);
}

toggleTorch(): void {
  this.torchEnabled = !this.torchEnabled;
}

toggleTryHarder(): void {
  this.tryHarder = !this.tryHarder;
}


onSave(){
  this.registrationService.empIdExistOrNot(this.empId).subscribe(
    (data) => {
      if(data["success"]){
        if(data["data"]){
          this.route.navigate(['/pages/attendance/',this.empId]);
        }
        else{
          this.toastr.error(data["msg"]);

        }
      }
    },
    (error)=>{
      (error) => {
        this.toastr.error(errorData.Serever_Error);
      }
    }
  )
}

}



