export class Invoice {
    partyId: Number;
    batchId: string;
    createdBy:Number;
    createdDate:Date;
    id:Number;
    dispatchData:DispatchData[];
    isSendToParty:boolean;
    stockId:Number;
    controlId:Number;
    finishMtr:Number;
    isBillGenrated:boolean;
    isExtra:boolean;
    isFinishMtrSave:boolean;
    isProductionPlanned:boolean;
    mtr:Number;
    sequencedId:Number;
    wt:Number;
    invoiceNo:string;
}

export class InvoiceReportRequest{
  userHeadId: number;
  partyId: number;
  from: Date;
  to: Date;
}

export class DispatchData {
    batchEntryId:Number;
    controlId:Number;
    id:Number;

    constructor(){
      this.batchEntryId=0;
      this.controlId=0;
      this.id=0;
    }
}

export class invoiceobj{
 
  batchId:Number;
  stockId:Number;
}