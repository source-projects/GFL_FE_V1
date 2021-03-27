import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GenerateReportRoutingModule } from "./generate-report-routing.module";
import { GenerateReportComponent } from "./generate-report.component";
import { SharedModule } from "../../@theme/shared.module";

@NgModule({
  declarations: [GenerateReportComponent],
  imports: [CommonModule, GenerateReportRoutingModule, SharedModule],
})
export class GenerateReportModule {}
