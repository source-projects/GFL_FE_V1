export class StockBatch {
  id: number;
  stockInType: string = "Fabric";
  partyId: number;
  qualityId: number;
  billNo: string;
  billDate: Date;
  chlNo: string;
  unit: string;
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
}

export class BatchMrtWt {
  mtr: number;
  wt: number;

  constructor(m?, w?) {
    m ? (this.mtr = m) : null;
    w ? (this.wt = w) : null;
  }
}

export class BatchCard {
  batchId: number;
  totalWt: number;
  totalMt: number;
  batchMW: BatchMrtWt[];
  constructor(batchId?) {
    batchId ? (this.batchId = batchId) : (this.batchId = null);
    this.batchMW = [];
  }
}
