import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditDyeingProcessComponent } from "./add-edit-dyeing-process/add-edit-dyeing-process.component";
import { DyeingProcessGuard } from '../../@theme/guards/dyeing-process.guard';
import { DyeingProcessComponent } from "./dyeing-process.component";
import { AddEditTagNameComponent } from "./add-edit-tag-name/add-edit-tag-name.component";
import { ShowTagNameComponent } from "./show-tag-name/show-tag-name.component";

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
  },
  { 
    path: "tag", 
    component: AddEditTagNameComponent,
    canActivate:[DyeingProcessGuard],
    canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['add']}
  },

  { 
    path: "tag/view", 
    component: ShowTagNameComponent,
    canActivate:[DyeingProcessGuard],
    canLoad:[DyeingProcessGuard],
    data: { PermissionName: ['view','view group','view all']}
  },
 
  {
    path: "tag/edit/:id",
     component: AddEditTagNameComponent,
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
