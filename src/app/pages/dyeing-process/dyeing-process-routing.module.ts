import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEditDyeingProcessComponent } from "./add-edit-dyeing-process/add-edit-dyeing-process.component";
import { AddEditTagNameComponent } from "./add-edit-tag-name/add-edit-tag-name.component";
import { DyeingProcessComponent } from "./dyeing-process.component";
import { ShowTagNameComponent } from "./show-tag-name/show-tag-name.component";

const routes: Routes = [
  { 
    path: "", 
    component: AddEditDyeingProcessComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['add'],compName:"dyeingProcess"}
  },
  { 
    path: "view", 
    component: DyeingProcessComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"dyeingProcess"}
  },
  {
    path: "edit/:id",
     component: AddEditDyeingProcessComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"dyeingProcess"}
  },
  { 
    path: "tag", 
    component: AddEditTagNameComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['add'],compName:"dyeingProcess"}
  },

  { 
    path: "tag/view", 
    component: ShowTagNameComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['view','view group','view all'],compName:"dyeingProcess"}
  },
 
  {
    path: "tag/edit/:id",
     component: AddEditTagNameComponent,
    // canActivate:[DyeingProcessGuard],
    // canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['edit','edit group','edit all'],compName:"dyeingProcess"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DyeingProcessRoutingModule {}
