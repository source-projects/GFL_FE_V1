import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { RegistrationService } from '../../../@theme/services/registration.service';
// import {QrScannerComponent} from 'angular2-qrscanner';
// import { ZXingScannerComponent } from '@zxing/ngx-scanner';
// import { Result } from '@zxing/library';

@Component({
  selector: 'ngx-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQRComponent implements OnInit {

  // @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  // ngVersion = VERSION.full;

  // @ViewChild('scanner')
  // scanner: ZXingScannerComponent;

  // hasDevices: boolean;
  // hasPermission: boolean;
  // qrResultString: string;
  // qrResult: Result;

  // availableDevices: MediaDeviceInfo[];
  // currentDevice: MediaDeviceInfo = null;

  loading = false;
  formSubmitted = false;
  empId : any;
  constructor(
    private registrationService : RegistrationService,

  ) { }

  ngOnInit(): void {

    // this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
    //   this.hasDevices = true;
    //   this.availableDevices = devices;

      //selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.currentDevice = device;
      //         break;
      //     }
      // }
  //   });

  //   this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
  //    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
  //   this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  // }

  // handleQrCodeResult(resultString: string) {
  //   console.debug('Result: ', resultString);
  //   const final_value = JSON.parse(resultString)
  //   this.qrResultString = 'name: ' + final_value.name + ' age: ' + final_value.age;
  // }

//     this.qrScannerComponent.getMediaDevices().then(devices => {
//       console.log(devices);
//       const videoDevices: MediaDeviceInfo[] = [];
//       for (const device of devices) {
//           if (device.kind.toString() === 'videoinput') {
//               videoDevices.push(device);
//           }
//       }
//       if (videoDevices.length > 0){
//           let choosenDev;
//           for (const dev of videoDevices){
//               if (dev.label.includes('front')){
//                   choosenDev = dev;
//                   break;
//               }
//           }
//           if (choosenDev) {
//               this.qrScannerComponent.chooseCamera.next(choosenDev);
//           } else {
//               this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
//           }
//       }
//   });

//   this.qrScannerComponent.capturedQr.subscribe(result => {
//       console.log(result);
//   });


}




}
