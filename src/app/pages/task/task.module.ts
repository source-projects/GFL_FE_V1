import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";
import { AddEditTaskComponent } from "./add-edit-task/add-edit-task.component";
import { SharedModule } from "../../@theme/shared.module";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";

@NgModule({
  declarations: [TaskComponent, AddEditTaskComponent, TaskDetailComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule
  ],
})
export class TaskModule {}
