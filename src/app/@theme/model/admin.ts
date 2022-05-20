export class AddJet {
  id: number;
  capacity: number;
  liquorRatio: number;
  name: string;

  constructor() {
    this.id = null;
    this.capacity = null;
    this.liquorRatio = null;
    this.name = null;
  }
}

export class AddCompany {
  id: number;
  name: string;
  constructor() {
    this.id = 0;
    this.name = null;
  }
}
export class AddDepartment {
  id: number;
  name: string;
  isMaster: boolean;
  constructor() {
    this.id = 0;
    this.name = null;
    this.isMaster = false;
  }
}
export class AddQuality {
  id: number;
  qualityName: string;
  rate:number;
  value:number;
  supplierList;
  constructor() {
    this.id = 0;
    this.qualityName = null;
    this.rate = null;
    this.value = null;
    this.supplierList = [];
  }
}
export class AddDesignation {
  id: number;
  designation: string;
  constructor() {
    this.id = null;
    this.designation = null;
  }
}

export class ApproveBy {
  id: number;
  name: string;
  contact: string;
  email: string;
  constructor() {
    this.id = null;
    this.name = null;
    this.contact = null;
    this.email = null;
  }
}

export class ReceiveBy {
  id: number;
  name: string;
  contact: string;
  email: string;
  constructor() {
    this.id = null;
    this.name = null;
    this.contact = null;
    this.email = null;
  }
}

export class AddApproveReceive {
  id: number;
  name: string;
  contact: string;
  email: string;
  type: string;
  departmentId;
  constructor() {
    this.id = null;
    this.name = null;
    this.contact = null;
    this.email = null;
    this.type = null;
    this.departmentId = null;
  }
}

export class AddMachine {
  controlId: number;
  machineName: string;
  id: number;
  constructor() {
    this.controlId = null;
    this.machineName = null;
    this.id = null;
  }
}

export class AddMachineCategory {
  id: number;
  name: string;
  constructor() {
    this.id = null;
    this.name = null;
  }
}

export class AddInvoiceSequence {
  id: number;
  sequence: number;
  constructor() {
    this.id = null;
    this.sequence = null;
  }
}

export class AddBatchSequence {
  id: number;
  sequence: number;
  constructor() {
    this.id = null;
    this.sequence = null;
  }
}
