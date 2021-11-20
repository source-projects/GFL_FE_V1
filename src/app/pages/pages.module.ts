import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { SharedModule } from '../@theme/shared.module';
import { ThemeModule } from '../@theme/theme.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PartyModule } from './party/party.module';
import { QualityModule } from './quality/quality.module';
import { SupplierModule } from './supplier/supplier.module';
import { UserModule } from './user/user.module';

//import { InputDataModule } from './input-data/input-data.module';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ECommerceModule,
    PartyModule,
    QualityModule,
    SupplierModule,
    MiscellaneousModule,
    UserModule,
    SharedModule
  ],
  declarations: [
    PagesComponent,
  ],
 
 
  providers: [],
})
export class PagesModule {
}
