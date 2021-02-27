import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditDyeingProcessComponent } from "./add-edit-dyeing-process/add-edit-dyeing-process.component";
import { DyeingProcessGuard } from 'app/@theme/guards/dyeing-process.guard';

import { DyeingProcessComponent } from "./dyeing-process.component";

const routes: Routes = [
  { 
    path: "", 
    component: AddEditDyeingProcessComponent,
    canActivate:[DyeingProcessGuard],
    canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['add']}
  },
  { 
    path: "view", 
    component: DyeingProcessComponent,
    canActivate:[DyeingProcessGuard],
    canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
 
  {
    path: "edit/:id",
     component: AddEditDyeingProcessComponent,
    canActivate:[DyeingProcessGuard],
    canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['edit','edit group','edit all']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DyeingProcessRoutingModule {}
