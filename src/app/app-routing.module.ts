import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@theme/guards/auth.guard";
import { CommonGuard } from "./@theme/guards/common.guard";
import { StopAuthGuard } from "./@theme/guards/stop-auth.guard";
import { ECommerceComponent } from "./pages/e-commerce/e-commerce.component";
import { InputDataComponent } from "./pages/input-data/input-data/input-data.component";
import { NotFoundComponent } from "./pages/miscellaneous/not-found/not-found.component";
import { PagesComponent } from "./pages/pages.component";


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
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"party"},
      },
      {
        path: "quality",
        loadChildren: () =>
          import("./pages/quality/quality.module").then((m) => m.QualityModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"quality"},
      },
      {
        path: "user",
        loadChildren: () =>
          import("./pages/user/user.module").then((m) => m.UserModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"user"},
      },
      {
        path: "color",
        loadChildren: () =>
          import("./pages/color/color.module").then((m) => m.ColorModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"color"},
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
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"process"},
      },
      // {
      //   path: "process",
      //   loadChildren: () =>
      //     import("./pages/process/process.module").then((m) => m.ProcessModule),
      //   canActivate: [ProgramGuard],
      //   canLoad: [ProgramGuard],
      //   data: { PermissionName: ["view", "view group", "view all"] , compName:"quality"},
      // },
      {
        path: "shade",
        loadChildren: () =>
          import("./pages/shade/shade.module").then((m) => m.ShadeModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"shade"},
      },

      {
        path: "generate_invoice",
        loadChildren: () =>
          import("./pages/generate-invoice/generate-invoice.module").then(
            (m) => m.GenerateInvoiceModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"dispatch"},
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
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"waterJet"},
      },
      {
        path: "supplier",
        loadChildren: () =>
          import("./pages/supplier/supplier.module").then(
            (m) => m.SupplierModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"supplier"},
      },
      {
        path: "purchaseItem",
        loadChildren: () =>
          import("./pages/purchase-item/purchase-item.module").then(
            (m) => m.PurchaseItemModule
          ),
        // canActivate: [PurchaseGuard],
        // canLoad: [PurchaseGuard],
        data: { compName: "purchase"}
      },
      {
        path: "finishedMeter",
        loadChildren: () =>
          import("./pages/finished-meter/finished-meter.module").then(
            (m) => m.FinishedMeterModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"batch"},
      },
      {
        path: "batch-shuffle",
        loadChildren: () =>
          import("./pages/batch-shuffle/batch-shuffle.module").then(
            (m) => m.BatchShuffleModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"stockBatch"},
      },
      {
        path: "stock-batch",
        loadChildren: () =>
          import("./pages/stock-batch/stock-batch.module").then(
            (m) => m.StockBatchModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"stockBatch"},
      },
      {
        path: "merge-batch",
        loadChildren: () =>
          import("./pages/merge-batch/merge-batch.module").then(
            (m) => m.MergeBatchModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"mergeBatch"},
      },
      {
        path: "report",
        loadChildren: () =>
          import("./pages/generate-report/generate-report.module").then(
            (m) => m.GenerateReportModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"report"},
      },
      {
        path: "issue-color-box",
        loadChildren: () =>
          import("./pages/color/issue-color-box/issue-color-box.module").then(
            (m) => m.IssueColorBoxModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"color"},
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
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"productionPlanning"},
      },
      {
        path: "jet-planning",
        loadChildren: () =>
          import("./pages/jet-planning/jet-planning.module").then(
            (m) => m.JetPlanningModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"jetPlanning"},
      },
      {
        path: "input-data",
        component: InputDataComponent,
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"machine"},
      },
      {
        path: "payment",
        loadChildren: () =>
          import("./pages/payment/payment.module").then((m) => m.PaymentModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"payment"},
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./pages/admin/admin.module").then((m) => m.AdminModule),
        // canActivate: [AdminGuard],
        // canLoad: [AdminGuard],
        data: {compName:"admin"},
      },
      {
        path: "task",
        loadChildren: () =>
          import("./pages/task/task.module").then((m) => m.TaskModule),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"task"},
      },

      {
        path: "addition-slip",
        loadChildren: () =>
          import("./pages/addition-slip/addition-slip.module").then(
            (m) => m.AdditionSlipModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"dyeingSlip"},
      },

      {
        path: "registration",
        loadChildren: () =>
          import("./pages/registration/registration.module").then(
            (m) => m.RegistrationModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"employee"},
      },
      {
        path: "attendance",
        loadChildren: () =>
          import("./pages/attendance/attendance.module").then(
            (m) => m.AttendanceModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"attendance"},
      },
      {
        path: "purchase",
        loadChildren: () =>
          import("./pages/purchase/purchase.module").then(
            (m) => m.PurchaseModule
          ),
        canActivate: [CommonGuard],
        canLoad: [CommonGuard],
        data: { PermissionName: ["view", "view group", "view all"] , compName:"purchase"},
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
        redirectTo: "task",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "task",
    loadChildren: () =>
      import("./pages/task/task.module").then((m) => m.TaskModule),
  },

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
export class AppRoutingModule { }
