export class User {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  contact: string;
  password: string;
  companyId: number;
  departmentId: number = null;
  designationId: number;
  createdBy: Number;
  updatedBy: Number;
  id: Number;
  userHeadId: Number = 0;
  isUserHead: boolean;
  isMaster: boolean = true;
  userPermissionData: {};
}

export class Permissions {
  module: string;
  view: boolean;
  add: boolean;
  edit: boolean;
  delete: boolean;
  viewGroup: boolean;
  editGroup: boolean;
  deleteGroup: boolean;
  viewAll: boolean;
  editAll: boolean;
  deleteAll: boolean;
  selectAll: boolean;

  constructor() {
    this.module = null;
    this.view = false;
    this.add = false;
    this.edit = false;
    this.delete = false;
    this.viewGroup = false;
    this.editGroup = false;
    this.deleteGroup = false;
    this.viewAll = false;
    this.editAll = false;
    this.deleteAll = false;
    this.selectAll = false;
  }
}
