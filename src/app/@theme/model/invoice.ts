export class Invoice {
    partyId: Number;
    batchId: string;
    createdBy:Number;
    createdDate:Date;
    id:Number;
    dispatchData:DispatchData[];
    isSendToParty:boolean;
    stockId:Number;
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