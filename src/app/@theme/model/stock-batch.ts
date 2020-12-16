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
    mtr: number;
    wt: number;
    batchId: number;
}

export class BatchMrtWt {
    mtr: number;
    wt: number;
    constructor(){
        this.mtr = null;
        this.wt = null;
    }
}

export class BatchCard{
    batchId: number;
    batchMW: BatchMrtWt[];
    constructor(){
        this.batchId = null;
        this.batchMW = [];
    }
}
