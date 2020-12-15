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

    constructor(){
        this.seqNo= 0;
        this.id=0;
        this.mtr=null;
        this.wt=null;
        this.batchId='';
        this.controlId=0;
        this.isProductionPlanned= false;
        this.isExtra= false;
        this.sequenceId=0;
        this.finishMtr=0;
        this.isBillGenrated= false;   
    }
}