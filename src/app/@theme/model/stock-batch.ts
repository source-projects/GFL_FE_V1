export class StockBatch {
  id: number;
  stockInType: string = "Fabric";
  partyId: number;
  qualityId: number;
  //billNo: string;
  receiveDate: Date;
  chlNo: string;
  unit: string;
  wtPer100m: number;
  chlDate: Date;
  remark: string;
  createdBy: Number;
  createdDate: Date;
  updatedBy: Number;
  userHeadId: Number;
  batchData: BatchData[];
  isProductionPlanned: boolean;

  constructor() {
    this.stockInType = "Fabric";
  }
}
export class BatchData {
  [x: string]: any;
  mtr: number;
  wt: number;
  totalWt: number;
  totalMt: number;
  batchId: number;
  isProductionPlanned: boolean;
}

export class BatchMrtWt {
  id: number;
  mtr: number;
  wt: number;
  isProductionPlanned: boolean;
  controlId: number;

  constructor(m?, w?, d?, id?, controlId?) {
    controlId ? (this.controlId = controlId) : this.controlId = null;
    id ? (this.id = id) : (this.id = null);
    m ? (this.mtr = m) : null;
    w ? (this.wt = w) : null;
    d ? (this.isProductionPlanned = d) : this.isProductionPlanned = false;
  }
}

export class BatchCard {

  batchId: number;
  totalWt: number;
  totalMt: number;
  isNotUnique: boolean;
  batchMW: BatchMrtWt[];
  isProductionPlanned: boolean;

  constructor(batchId?) {
    this.isNotUnique = false;
    batchId ? (this.batchId = batchId) : (this.batchId = null);
    this.batchMW = [];
  }
}


export class StockReportRequest {
  from: any;
  to: any;
  userHeadId: any;
  partyId: any;
  qualityNameId: any;
  qualityEntryId: any;
  isProductionPlanned: any;
  isFinishMeterSaved: any;
  isBillGenerated: any;

  constructor() {
    this.from = null;
    this.to = null;
    this.isProductionPlanned = false;
    this.isFinishMeterSaved = false;
    this.isBillGenerated = false;
  }
}

export class StockShortReport {
  partyName: string;
  partyCode: String;
  consolidatedBillDataList: ConsolidatedBillDataList[]
}

export class StockDetailedReport {
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


export class ConsolidatedBillDataList {
  pchallanRef: string;
  batchId: string
  qualityName: string;
  pcs: number;
  greyMtr: number;
  greyWt: number;
  receiveDate: string;
}