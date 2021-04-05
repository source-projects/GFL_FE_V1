import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { NgxLoadingModule } from "ngx-loading";
import { NgxCheckboxModule } from "ngx-checkbox";
// import { NgQrScannerModule } from 'angular2-qrscanner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import {
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbCardModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbTooltipModule,
  NbAccordionModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbPopoverModule,
  NbToggleModule,
} from "@nebular/theme";

import { NbSecurityModule } from "@nebular/security";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import {
  FormsModule,
  FormsModule as ngFormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ColorPickerModule } from "ngx-color-picker";
import { ToastrModule } from "ngx-toastr/toastr/toastr.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbDatepickerModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
//import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ExportService } from "./services/export.service";
import { ExportPopupComponent } from "./components/export-popup/export-popup.component";

import { WarningPopupComponent } from "./components/warning-popup/warning-popup.component";
import { BtnCellRenderer } from "./renderer/button-cell-renderer.component";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
import { SliderModule } from "angular-image-slider";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxImageCompressService } from "ngx-image-compress";
//  import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { NgQrScannerModule } from 'angular2-qrscanner';
//import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from "ngx-dropzone";
const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbInputModule,
  NbCardModule,
  NbActionsModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  ngFormsModule,
  FormsModule,
  ReactiveFormsModule,
  NgxDatatableModule,
  NbTooltipModule,
  ColorPickerModule,
  NgSelectModule,
  NgbDatepickerModule,
  NgxLoadingModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  //NgbModal
  NbAccordionModule,
  NbToggleModule,
];

@NgModule({
  declarations: [ExportPopupComponent, WarningPopupComponent],
  imports: [
    NgxLoadingModule.forRoot({}),
    CommonModule,
    ...NB_MODULES,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ZXingScannerModule,
    NgbModule,
    NgxCheckboxModule,
    NgxQRCodeModule,
    SliderModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      showBackground: false,
      startFromZero: false,
    }),
    NgxDropzoneModule,
  ],

  exports: [
    ...NB_MODULES,
    NgxLoadingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ZXingScannerModule,
    NgxCheckboxModule,
    NgxQRCodeModule,
    SliderModule,
    NgCircleProgressModule,
    NgxDropzoneModule,
    // NgQrScannerModule,
    //  NgQRCodeReaderModule,
    //   ZXingScannerModule,
    //   NgQrScannerModule,
  ],
  providers: [ExportService, DatePipe, NgxImageCompressService],
  entryComponents: [ExportPopupComponent, WarningPopupComponent],
})
export class SharedModule {}
