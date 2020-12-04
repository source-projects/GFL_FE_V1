import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
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
  NbAccordionModule
} from "@nebular/theme";
import { NbSecurityModule } from "@nebular/security";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { FormsModule, FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ColorPickerModule } from 'ngx-color-picker';
import { ToastrModule } from 'ngx-toastr/toastr/toastr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

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
  NbAccordionModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...NB_MODULES],
  exports: [...NB_MODULES],
  providers: []
})
export class SharedModule { }
