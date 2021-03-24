import { Component, ElementRef, OnInit, Renderer2, VERSION, ViewChild } from '@angular/core';
import { RegistrationService } from '../../../@theme/services/registration.service';
// import {QrScannerComponent} from 'angular2-qrscanner';
// import { ZXingScannerComponent } from '@zxing/ngx-scanner';
// import { Result } from '@zxing/library';
// import {QrScannerComponent} from 'angular2-qrscanner';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
@Component({
  selector: 'ngx-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss']
})
export class ScanQRComponent implements OnInit {

  //elementType = 'url';
//value = 'https://assets.econsultancy.com/images/resized/0002/4236/qr_code-blog-third.png';
// @ViewChild('result') resultElement: ElementRef;
// showQRCode : boolean = true;
//   availableDevices: MediaDeviceInfo[];
//   currentDevice: MediaDeviceInfo = null;
//   hasDevices: boolean;
//   hasPermission: boolean;
//  qrResult: Result;
//   guestExist: boolean;

  // @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  //  ngVersion = VERSION.full;

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
   // private qrScanner: QRScanner
   private renderer: Renderer2
  ) { }

  ngOnInit(): void {}

//   render(e){
//     console.log(e.result);
//     let element :Element = this.renderer.createElement('p');
//     element.innerHTML = e.result;
//     this.renderElement(element);    
// }

// renderElement(element){
//     for (let node of this.resultElement.nativeElement.childNodes) {
//             this.renderer.removeChild(this.resultElement.nativeElement, node);
//     }            
//     this.renderer.appendChild(this.resultElement.nativeElement, element);
// }  
  // clearResult(): void {
  //   this.qrResult = null;
  // }

  // //Scans the QR code
  // onCodeResult(resultString: string): void {
  //   this.guestExist = null;
  //   if (this.checkQRJSON(resultString)) {
  //     this.qrResult = JSON.parse(resultString);
  //     //this.checkInGuest(this.qrResult);
  //     this.clearMessage();
  //   } else {
  //     this.guestExist = false;
  //     this.clearMessage();
  //   }
  // }

  // //Permission for the app to use the device camera
  // onHasPermission(has: boolean): void {
  //   this.hasPermission = has;
  // }

  //Checks if the QR code belongs to a valid guest
  // checkInGuest(guestQR: Guest): void {
  //   this.guestService.guests$
  //     .pipe(
  //       map(guests =>
  //         guests.find((guest: Guest) => guest.id === guestQR.id)
  //       )
  //     )
  //     .subscribe(guest => {
  //       if (guest !== null && guest !== undefined) {
  //         this.guestExist = true;
  //       } else {
  //         this.guestExist = false;
  //       }
  //       this.clearResult();
  //       this.clearMessage();
  //     });
  // }

  // clearMessage() {
  //   setTimeout(() => {
  //     this.guestExist = null;
  //   }, 3000);
  // }

  // //This function check if the QR code has a valid JSON as data
  // checkQRJSON(qrString: string): boolean {
  //   if (
  //     /^[\],:{}\s]*$/.test(
  //       qrString
  //         .replace(/\\["\\\/bfnrtu]/g, "@")
  //         .replace(
  //           /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
  //           "]"
  //         )
  //         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  //     )
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  //   this.qrScanner.prepare()
  // .then((status: QRScannerStatus) => {
  //    if (status.authorized) {
  //      // camera permission was granted


  //      // start scanning
  //      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //        console.log('Scanned something', text);

  //        this.qrScanner.hide(); // hide camera preview
  //        scanSub.unsubscribe(); // stop scanning
  //      });

  //    } else if (status.denied) {
  //      // camera permission was permanently denied
  //      // you must use QRScanner.openSettings() method to guide the user to the settings page
  //      // then they can grant the permission from there
  //    } else {
  //      // permission was denied, but not permanently. You can ask for permission again at a later time.
  //    }
  // })
  // .catch((e: any) => console.log('Error is', e));


  //   this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
  //     this.hasDevices = true;
  //     this.availableDevices = devices;

  //     // selects the devices's back camera by default
  //     for (const device of devices) {
  //         if (/back|rear|environment/gi.test(device.label)) {
  //             this.scanner.changeDevice(device);
  //             this.currentDevice = device;
  //             break;
  //         }
  //     }
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



  // ---------------------------------------------------------

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


// }

}



