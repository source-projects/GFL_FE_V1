export class ProductionPlanning{
    partyId:Number;
    qualityId:Number;
    qualityEntryId:Number;
    batchId:Number;

}

export class ProductionBatchDetail {
    partyName: string;
    qualityName: string;
    qualityId: string;
    processName: string;
    partyShadeNo: string;
    totalWt: string;
    totalMtr: string;
    batchId: string;
  
    constructor() {
      this.partyName = "-";
      this.qualityName = "-";
      this.qualityId = "-";
      this.processName = "-";
      this.partyShadeNo = "-";
      this.totalWt = "-";
      this.totalMtr = "-";
      this.batchId= "-";
    }
  }