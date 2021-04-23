export class Registration {
  id: Number;
  name: string;
  contact: string;
  aadhaar: number;
  departmentId: number;
  remark2: string;
  remark3: string;
  createdBy: Number;
  updatedBy: Number;
  file: File;
  employeeDocumentList: EmployeeDocument[];
}
export class EmployeeDocument {
  id: number;
  name: string;
  url: string;
  type: string;
  controlId: number;

  constructor() {
    this.name = null;
    this.url = "";
    this.id = null;
    this.type = null;
    this.controlId = null;
  }
}
