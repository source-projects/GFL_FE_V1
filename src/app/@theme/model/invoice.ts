export class Invoice {
  partyId: Number;
  batchId: string;
  createdBy: Number;
  createdDate: Date;
  id: Number;
  dispatchData: DispatchData[];
  isSendToParty: boolean;
  stockId: Number;
  controlId: Number;
  finishMtr: Number;
  isBillGenrated: boolean;
  isExtra: boolean;
  isFinishMtrSave: boolean;
  isProductionPlanned: boolean;
  mtr: Number;
  sequencedId: Number;
  wt: Number;
  invoiceNo: string;
}

export class InvoiceReportRequest {
  from: any;
  to: any;

  constructor() {
    this.from = "";
    this.to = "";
  }
}
export class DispatchData {
  batchEntryId: Number;
  controlId: Number;
  id: Number;

  constructor() {
    this.batchEntryId = 0;
    this.controlId = 0;
    this.id = 0;
  }
}

export class invoiceobj{
 
  batchId:Number;
  stockId:Number;
  rate:number;
}


//Detailed report invoice
export class InvoiceDetailedReport {
  headName: string;
  invoiceNo: string;
  partyId: number;
  partyName: string;
  qualityList: QualityList[];
  userHeadId: number;
}

export class QualityList {
  amt: number;
  batchId: string;
  qualityEntryId: number;
  qulityId: string;
  rate: number;
  totalFinishMtr: number;
  totalMtr: number;
}


//short invoice report
export class InvoiceShortReport {
  invoiceNo: string;
  createdDate: string;
  consolidatedBillDataList: ConsolidatedBillDataList[]
}

export class ConsolidatedBillDataList {
  batchId: string;
  invoiceDate: string;
  partyName: string;
  qualityName: string
  pcs: number;
  totalMtr: number;
  totalFinishMtr: number;
  rate: number;
  amt: number;
}