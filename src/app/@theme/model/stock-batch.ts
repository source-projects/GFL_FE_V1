export class StockBatch {
    id: number;
<<<<<<< HEAD
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
=======
    stockInType:string= "Fabric";
    partyId:number;
    qualityId:number;  
    billNo:string;
    billDate:Date;
    chlNo:string;
    unit:string;
    chlDate:Date;
    remark:string;
    createdBy:Number;
    createdDate: Date;
    updatedBy:Number;
    userHeadId:Number;
    batchData:BatchData[];
>>>>>>> 21f01d9ef45838d2cd92ee3a56fc5ef03288d2af
    isProductionPlanned: boolean;
}
export class BatchData {
    mtr: number;
    wt: number;
    batchId: number;
}
