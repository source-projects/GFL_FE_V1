import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@theme/guards/auth.guard";
import { ColorGuard } from "./@theme/guards/color.guard";
import { PartyGuard } from "./@theme/guards/party.guard";
import { ProgramGuard } from "./@theme/guards/program.guard";
import { QualityGuard } from "./@theme/guards/quality.guard";
import { ShadeGuard } from "./@theme/guards/shade.guard";
import { StockBatchGuard } from "./@theme/guards/stock-batch.guard";
import { StopAuthGuard } from "./@theme/guards/stop-auth.guard";
import { SupplierGuard } from "./@theme/guards/supplier.guard";
import { UserGuard } from "./@theme/guards/user.guard";
import { DyeingProcessGuard } from "./@theme/guards/dyeing-process.guard";
import { JetPlanningGuard } from "./@theme/guards/jet-planning.guard";
import { ProductionPlanningGuard } from "./@theme/guards/production-planning.guard";
import { WaterJetGuard } from "./@theme/guards/water-jet.guard";
import { InvoiceGuard } from "./@theme/guards/invoice.guard";
import { PaymentGuard } from "./@theme/guards/payment.guard";

import { ECommerceComponent } from "./pages/e-commerce/e-commerce.component";
import { InputDataComponent } from "./pages/input-data/input-data/input-data.component";
import { NotFoundComponent } from "./pages/miscellaneous/not-found/not-found.component";
import { PagesComponent } from "./pages/pages.component";
import { FinishedMeterGuard } from "./@theme/guards/finished-meter.guard";
import { InputDataGuard } from "./@theme/guards/input-data.guard";
import { DyeingSlipGuard } from "./@theme/guards/dyeing-slip.guard";
import { AdminGuard } from "./@theme/guards/admin.guard";
import { EmployeeRegistrationGuard } from "./@theme/guards/employee-registration.guard";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { AttndanceGuard } from "./@theme/guards/attendance.guard";

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [StopAuthGuard],
  },
  {
    path: "pages",
    component: PagesComponent,
    // loadChildren: () => import('./pages/pages.module')
    //   .then(m => m.PagesModule),
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "party",
        loadChildren: () =>
          import("./pages/party/party.module").then((m) => m.PartyModule),
        canActivate: [PartyGuard],
        canLoad: [PartyGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "quality",
        loadChildren: () =>
          import("./pages/quality/quality.module").then((m) => m.QualityModule),
        canActivate: [QualityGuard],
        canLoad: [QualityGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "user",
        loadChildren: () =>
          import("./pages/user/user.module").then((m) => m.UserModule),
        canActivate: [UserGuard],
        canLoad: [UserGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "color",
        loadChildren: () =>
          import("./pages/color/color.module").then((m) => m.ColorModule),
        canActivate: [ColorGuard],
        canLoad: [ColorGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      // {
      //   path: 'program',
      //   loadChildren: () => import('./pages/program/program.module')
      //     .then(m => m.ProgramModule),
      //   canActivate: [ProgramGuard],
      //   canLoad: [ProgramGuard],
      //   data: { PermissionName: ['view','view group','view all']}
      // },
      {
        path: "dyeing-process",
        loadChildren: () =>
          import("./pages/dyeing-process/dyeing-process.module").then(
            (m) => m.DyeingProcessModule
          ),
        canActivate: [DyeingProcessGuard],
        canLoad: [DyeingProcessGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "process",
        loadChildren: () =>
          import("./pages/process/process.module").then((m) => m.ProcessModule),
        canActivate: [ProgramGuard],
        canLoad: [ProgramGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "shade",
        loadChildren: () =>
          import("./pages/shade/shade.module").then((m) => m.ShadeModule),
        canActivate: [ShadeGuard],
        canLoad: [ShadeGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },

      {
        path: "generate_invoice",
        loadChildren: () =>
          import("./pages/generate-invoice/generate-invoice.module").then(
            (m) => m.GenerateInvoiceModule
          ),
        canActivate: [InvoiceGuard],
        canLoad: [InvoiceGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      // {
      //   path: 'waterJet',
      //   loadChildren: () => import('./pages/water-jet/water-jet.module')
      //     .then(m => m.WaterJetModule),
      //     canActivate: [WaterJetGuard],
      //     canLoad: [WaterJetGuard],
      //     data: { PermissionName: ['view','view group','view all']}

      // },
      {
        path: "waterJet",
        loadChildren: () =>
          import("./pages/water-jet/water-jet.module").then(
            (m) => m.WaterJetModule
          ),
        canActivate: [WaterJetGuard],
        canLoad: [WaterJetGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "supplier",
        loadChildren: () =>
          import("./pages/supplier/supplier.module").then(
            (m) => m.SupplierModule
          ),
        canActivate: [SupplierGuard],
        canLoad: [SupplierGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "purchaseItem",
        loadChildren: () =>
          import("./pages/purchase-item/purchase-item.module").then(
            (m) => m.PurchaseItemModule
          ),
        // canActivate: [PurchaseGuard],
        // canLoad: [PurchaseGuard],
        // data: { PermissionName: ['view']}
      },
      {
        path: "finishedMeter",
        loadChildren: () =>
          import("./pages/finished-meter/finished-meter.module").then(
            (m) => m.FinishedMeterModule
          ),
        canActivate: [FinishedMeterGuard],
        canLoad: [FinishedMeterGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "batch-shuffle",
        loadChildren: () =>
          import("./pages/batch-shuffle/batch-shuffle.module").then(
            (m) => m.BatchShuffleModule
          ),
        canActivate: [StockBatchGuard],
        canLoad: [StockBatchGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "stock-batch",
        loadChildren: () =>
          import("./pages/stock-batch/stock-batch.module").then(
            (m) => m.StockBatchModule
          ),
        canActivate: [StockBatchGuard],
        canLoad: [StockBatchGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "report",
        loadChildren: () =>
          import("./pages/generate-report/generate-report.module").then(
            (m) => m.GenerateReportModule
          ),
      },
      {
        path: "issue-color-box",
        loadChildren: () =>
          import("./pages/color/issue-color-box/issue-color-box.module").then(
            (m) => m.IssueColorBoxModule
          ),
        canActivate: [ColorGuard],
        canLoad: [ColorGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      // {
      //   path: 'pending-apc',
      //   loadChildren: () => import('./pages/shade/pending-apc/pending-apc.module')
      //     .then(m => m.IssueColorBoxModule),
      //     canActivate: [ColorGuard],
      //     canLoad: [ColorGuard],
      //     data: { PermissionName: ['view','view group','view all']}
      // },
      {
        path: "production-planning",
        loadChildren: () =>
          import("./pages/production-planning/production-planning.module").then(
            (m) => m.ProductionPlanningModule
          ),
        canActivate: [ProductionPlanningGuard],
        canLoad: [ProductionPlanningGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "jet-planning",
        loadChildren: () =>
          import("./pages/jet-planning/jet-planning.module").then(
            (m) => m.JetPlanningModule
          ),
        canActivate: [JetPlanningGuard],
        canLoad: [JetPlanningGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "input-data",
        component: InputDataComponent,
        canActivate: [InputDataGuard],
        canLoad: [InputDataGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "payment",
        loadChildren: () =>
          import("./pages/payment/payment.module").then((m) => m.PaymentModule),
        canActivate: [PaymentGuard],
        canLoad: [PaymentGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./pages/admin/admin.module").then((m) => m.AdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },

      {
        path: "addition-slip",
        loadChildren: () =>
          import("./pages/addition-slip/addition-slip.module").then(
            (m) => m.AdditionSlipModule
          ),
        canActivate: [DyeingSlipGuard],
        canLoad: [DyeingSlipGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },

      {
        path: "registration",
        loadChildren: () =>
          import("./pages/registration/registration.module").then(
            (m) => m.RegistrationModule
          ),
        canActivate: [EmployeeRegistrationGuard],
        canLoad: [EmployeeRegistrationGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "attendance",
        loadChildren: () =>
        import("./pages/attendance/attendance.module").then(
          (m) => m.AttendanceModule
        ),
        canActivate: [AttndanceGuard],
        canLoad: [AttndanceGuard],
        data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "purchase",
        loadChildren: () =>
        import("./pages/purchase/purchase.module").then(
          (m) => m.PurchaseModule
        ),
        // canActivate: [AttndanceGuard],
        // canLoad: [AttndanceGuard],
        // data: { PermissionName: ["view", "view group", "view all"] },
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./pages/miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },

  // {
  //   path: "generate-report",
  //   loadChildren: () =>
  //     import("./pages/generate-report/generate-report.module").then(
  //       (m) => m.GenerateReportModule
  //     ),
  // },

  // { path: 'dyeing-process', loadChildren: () => import('./pages/dyeing-process/dyeing-process.module').then(m => m.DyeingProcessModule) },

  { path: "**", redirectTo: "auth" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
