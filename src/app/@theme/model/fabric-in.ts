export class FabricIn {
    stockInType:string= "Fabric";
    partyId:number;
    batch:boolean;
    billNo:string;
    billDate:Date;
    chlNo:string;
    chlDate:Date;
    lotNo:number;
    remark:string;
    userId:string;
    userHeadId:string;
    fabStockData:QualityListEmpty[];
}
export class QualityListEmpty{
    gr: number;
    qualityId: number;
    qualityName: string;
    qualityType: string;
    mtr: number;
    wt:number;
    noOfCones: number;
    noOfBox: number;
}
