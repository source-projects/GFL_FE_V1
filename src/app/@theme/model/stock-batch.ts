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
  partyName: string;
  qualityName: string;
  // rf:boolean;

  constructor() {
    this.stockInType = "Fabric";
    // this.rf = false;
  }
}
export class BatchData {
  [x: string]: any;
  mtr: number;
  wt: number;
  totalWt: number;
  totalMt: number;
  batchId: number;
  pchallanRef: number;
  isProductionPlanned: boolean;
}

export class BatchMrtWt {
  id: number;
  mtr: number;
  wt: number;
  isProductionPlanned: boolean;
  controlId: number;
  batchId: number;
  color: string;
  sequence: number;

  constructor(m?, w?, d?, id?, controlId?) {
    controlId ? (this.controlId = controlId) : this.controlId = null;
    id ? (this.id = id) : (this.id = null);
    m ? (this.mtr = m) : null;
    w ? (this.wt = w) : null;
    d ? (this.isProductionPlanned = d) : this.isProductionPlanned = false;
    this.batchId = null;
    this.color = '';
    this.sequence = null;
  }
}

export class BatchCard {
  pchallanRef: number;
  batchId: number;
  totalWt: number;
  totalMt: number;
  isNotUnique: boolean;
  batchMW: BatchMrtWt[];
  isProductionPlanned: boolean;
  backColor: string

  constructor(batchId?) {
    this.isNotUnique = false;
    batchId ? (this.batchId = batchId) : (this.batchId = null);
    this.batchMW = [];
    this.backColor = '';
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

export class BatchFilterRequest {
  from: string;
  to: string;
  partyId: number;
  qualityEntryId: number;
  qualityNameId: number;
}