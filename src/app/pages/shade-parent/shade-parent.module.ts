import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShadeParentRoutingModule } from "./shade-parent-routing.module";
import { ShadeParentComponent } from "./shade-parent.component";
import { ShadeChildComponent } from "./shade-child/shade-child.component";
import { ShadeDataTableComponent } from "./shade-data-table/shade-data-table.component";
import { SharedModule } from "../../@theme/shared.module";
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  declarations: [
    ShadeParentComponent,
    ShadeChildComponent,
    ShadeDataTableComponent,
  ],
  imports: [CommonModule, ShadeParentRoutingModule, SharedModule, ThemeModule],
})
export class ShadeParentModule {}
