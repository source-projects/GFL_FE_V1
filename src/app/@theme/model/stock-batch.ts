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
}
export class BatchData {
  [x: string]: any;
  mtr: number;
  wt: number;
  totalWt: number;
  totalMt: number;
  batchId: number;
  isProductionPlanned:boolean;
}

export class BatchMrtWt {
  mtr: number;
  wt: number;
  disable: boolean;

  constructor(m?, w?, d?) {
    m ? (this.mtr = m) : null;
    w ? (this.wt = w) : null;
    d? (this.disable = d) : this.disable = false;
  }
}

export class BatchCard {
  batchId: number;
  totalWt: number;
  totalMt: number;
  isNotUnique: boolean;
  batchMW: BatchMrtWt[];
  isProductionPlanned:boolean;

  constructor(batchId?) {
    this.isNotUnique = false;
    batchId ? (this.batchId = batchId) : (this.batchId = null);
    this.batchMW = [];
  }
}
