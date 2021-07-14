import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from './party-routing.module';
import { SharedModule } from '../../@theme/shared.module';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';
//import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCheckboxModule} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ThemeModule } from '../../@theme/theme.module';
import { AgGridModule } from 'ag-grid-angular';
import { BtnCellRenderer } from '../../@theme/renderer/button-cell-renderer.component';

//import {ExportService} from '../../@theme/services/export.service';
@NgModule({
  declarations: [PartyComponent, AddEditPartyComponent, BtnCellRenderer ],
  imports: [
    CommonModule,
    SharedModule,
    ThemeModule,
    PartyRoutingModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NgxDatatableModule,
    AgGridModule.withComponents([BtnCellRenderer])
  ],

})
export class PartyModule { }
