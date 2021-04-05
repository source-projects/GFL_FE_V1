export class AddTask {
  taskName: any;
  detail: any;
  taskPriority: any;
  taskType: any;
  startDate: Date;
  endDate: Date;
  completedDays: any;
  remark: any;
  reportId: any;
  notify: boolean = false;
  isCompleted: boolean;
  departmentId: any;
  assignUserId: any;
  createdBy: any;
  createdDate: Date;
  updatedDate: Date;
  completedDate: Date;
  taskImageList: TaskImageList[];
}
export class TaskImageList {
  controlId: any;
  id: any;
  type: any;
  url: any;
}
