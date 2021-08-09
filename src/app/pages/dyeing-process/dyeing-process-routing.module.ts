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
    },
  { 
    path: "view", 
    component: DyeingProcessComponent,
    },
  {
    path: "edit/:id",
     component: AddEditDyeingProcessComponent,
     },
  { 
    path: "tag", 
    component: AddEditTagNameComponent,
   },

  { 
    path: "tag/view", 
    component: ShowTagNameComponent,
   },
 
  {
    path: "tag/edit/:id",
     component: AddEditTagNameComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DyeingProcessRoutingModule {}
