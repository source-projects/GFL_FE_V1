export class StockBatch {
    stockInType:string= "Fabric";
    partyId:number; 
    billNo:string;
    billDate:Date;
    chlNo:string;
    chlDate:Date;
    lotNo:number;
    remark:string;
    userId:string;
    userHeadId:string;
    stockBatchData:StockBatchData[];
}
export class StockBatchData{
   
    mtr: number;
    wt:number;
   
}
