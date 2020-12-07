export class FinishedMeter {
    id:Number;
    createdBy:Number;
    updatedBy:Number;
    userHeadId:Number;
    partyId:Number;
    qualityId:Number;
    masterId:Number;
    batchData: BatchData[];
}

export class BatchData{
    id:Number;
    mtr:Number;
    wt:Number;
    batchId:Number;
    controlId:Number;
    isProductionPlanned:Boolean = false;
    isExtra:Boolean = false;
    sequenceId:Number;
    finishMtr:Number;
    isBillGenrated:Boolean = false;
}
