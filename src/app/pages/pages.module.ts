import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PartyModule } from './party/party.module';
import { QualityModule } from './quality/quality.module';
import { SupplierModule } from './supplier/supplier.module';
import {UserModule} from './user/user.module';
import { InputDataComponent } from './input-data/input-data/input-data.component';
import { InputDataModule } from './input-data/input-data.module';


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
  ],
  declarations: [
    PagesComponent,
  ],
 
 
  providers: [],
})
export class PagesModule {
}
