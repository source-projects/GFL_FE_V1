export class StockBatch {
    id: number;
    stockInType:string= "Fabric";
    partyId:number;
    qualityId:number;  
    billNo:string;
    billDate:Date;
    chlNo:string;
    unit:string;
    chlDate:Date;
    remark:string;
    userId:string;
    userHeadId:string;
    batchData:BatchData[];
    isProductionPlanned: boolean;
}
export class BatchData{
    mtr: number;
    wt:number;
    batchId:number;
}
