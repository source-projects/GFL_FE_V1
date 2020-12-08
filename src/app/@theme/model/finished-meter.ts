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
    id:number;
    mtr:number;
    wt:number;
    batchId:number;
    controlId:number;
    isProductionPlanned:Boolean = false;
    isExtra:Boolean = false;
    sequenceId:number;
    finishMtr:number;
    isBillGenrated:Boolean = false;
}
