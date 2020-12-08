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
