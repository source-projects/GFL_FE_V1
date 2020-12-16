import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseItemRoutingModule } from './purchase-item-routing.module';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { SharedModule } from 'app/@theme/shared.module';
import { ThemeModule } from 'app/@theme/theme.module';


@NgModule({
  declarations: [PurchaseRequestComponent],
  imports: [
    SharedModule,
    ThemeModule,
    CommonModule,
    PurchaseItemRoutingModule
  ]
})
export class PurchaseItemModule { }
