export class FinishedMeter {
    id:Number;
    createdBy:Number;
    updatedBy:Number;
    userHeadId:Number;
    partyId:Number;
    qualityId:Number;
    masterId:Number;
    batchId:Number = null;
    batchData: BatchData[];
}

export class BatchData{
    seqNo: number;
    id:number;
    mtr:number;
    wt:number;
    batchId:string;
    controlId:number;
    isProductionPlanned:Boolean = false;
    isExtra:Boolean = false;
    sequenceId:number;
    finishMtr:number;
    isBillGenrated:Boolean = false;
}
