import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { AddEditPurchaseComponent } from './add-edit-purchase/add-edit-purchase.component';
import { SharedModule } from '../../@theme/shared.module';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [PurchaseComponent, AddEditPurchaseComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    SharedModule,
    FormsModule,
    ThemeModule
  ]
})
export class PurchaseModule { }
