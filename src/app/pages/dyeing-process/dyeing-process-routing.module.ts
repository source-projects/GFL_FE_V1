import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditDyeingProcessComponent } from "./add-edit-dyeing-process/add-edit-dyeing-process.component";

import { DyeingProcessComponent } from "./dyeing-process.component";

const routes: Routes = [
  { 
    path: "", 
    component: DyeingProcessComponent 
  },
  {
    path: "add",
    component: AddEditDyeingProcessComponent
  },
  {
    path: "edit/:id",
    component: AddEditDyeingProcessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DyeingProcessRoutingModule {}
