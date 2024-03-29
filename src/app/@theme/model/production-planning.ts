import { StockDetailedReport } from './stock-batch';
export class ProductionPlanning{
    partyId:Number;
    qualityId:Number;
    qualityEntryId:Number;
    batchId:Number;

}

export class ProductionBatchDetail {
    partyName: string;
    partyId:any;
    qualityName: string;
    qualityId: string;
    qualityEntryId:any;
    processName: string;
    partyShadeNo: string;
    productionId:string;
    factoryShadeNo:string;
    colorName:string;
    colorTone:string;
    totalWt: string;
    totalMtr: string;
    batchId: string;
    jetId:any;
    shadeId:any;
    stockId:string;
  
    constructor() {
      this.partyName = "-";
      this.qualityName = "-";
      this.qualityId = "-";
      this.processName = "-";
      this.partyShadeNo = "-";
      this.totalWt = "-";
      this.totalMtr = "-";
      this.batchId= "-";
      this.factoryShadeNo = "-"
      this.colorName = "-";
      this.colorTone = "-";
      this.shadeId = null;
      this.partyId = null;
      this.productionId = null;
      this.stockId = null;
      this.qualityEntryId = null;
    }
  }