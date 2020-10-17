import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartyRoutingModule } from './party-routing.module';
import { SharedModule } from '../../@theme/shared.module';
import { PartyComponent } from './party.component';
import { AddEditPartyComponent } from './add-edit-party/add-edit-party.component';


@NgModule({
  declarations: [PartyComponent, AddEditPartyComponent],
  imports: [
    CommonModule,
    SharedModule,
    PartyRoutingModule
  ]
})
export class PartyModule { }
