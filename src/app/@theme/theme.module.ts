import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { NbSecurityModule } from "@nebular/security";

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
} from "./components";
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  CounterPipe,
  FilterSelectedProcessPipe,
  FilterProcessNamePipe,
  FilterItemPipe,
} from "./pipes";
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from "./layouts";
import { DEFAULT_THEME } from "./styles/theme.default";
import { COSMIC_THEME } from "./styles/theme.cosmic";
import { CORPORATE_THEME } from "./styles/theme.corporate";
import { DARK_THEME } from "./styles/theme.dark";
import { FilterSelectedShadePipe } from "./pipes/filter-selected-shade.pipe";
import { FilterByIsColorPipe } from "./pipes/filter-by-isColor-slip.pipe";
import { DisableStockBatchPipe } from "./pipes/disable-Stock-Batch.pipe";
import { ShowOnlyChemicalPipe } from "./pipes/showOnlyChemicalList.pipe";
import { FilterSelectedItemPipe } from "./pipes/dyingProcess.pipe";
import { FilterSelectedBatchPipe } from "./pipes/filter-selected-batch.pipe";
import { ImagePreviewPipe } from "./pipes/imagePreview.pipe";
import { FilterSelectedSupplierPipe } from "./pipes/filter-selected-supplier.pipe";
import { DesignationFilterPipe } from "./pipes/designation.pipe";
import { TaskFilterPipe } from "./pipes/task-filter.pipe";

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
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
  DesignationFilterPipe,
  CounterPipe,
  FilterSelectedBatchPipe,
  FilterSelectedProcessPipe,
  FilterSelectedShadePipe,
  FilterProcessNamePipe,
  FilterSelectedSupplierPipe,
  FilterItemPipe,
  FilterByIsColorPipe,
  ShowOnlyChemicalPipe,
  TaskFilterPipe,
  DisableStockBatchPipe,
  FilterSelectedItemPipe,
  ImagePreviewPipe
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: "default",
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]
        ).providers,
      ],
    };
  }
}
