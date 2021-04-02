import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { SharedModule } from "../../@theme/shared.module";

@NgModule({
  declarations: [TaskComponent, AddEditTaskComponent],
  imports: [CommonModule, TaskRoutingModule, SharedModule],
})
export class TaskModule {}
