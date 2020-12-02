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
//import { ExportDirective } from '../../@theme/directives/export.directive';

@NgModule({
  declarations: [PartyComponent, AddEditPartyComponent ],
  imports: [
    CommonModule,
    SharedModule,
    PartyRoutingModule,
    ReactiveFormsModule,
    NbCheckboxModule,
    NgxDatatableModule
  ],
 
})
export class PartyModule { }
