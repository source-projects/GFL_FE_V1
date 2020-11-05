export class FabricIn {
    stockInType: "Fabric"
    partyId:number
    batch:string
    billNo:number
    billDate:Date
    chlNo:number
    chlDate:Date
    lot:number
    remark:string
    qualityListEmpty:QualityListEmpty[]
}
export class QualityListEmpty{
    id: number
    gr: number
    qualityId: number
    qualityName: string
    qualityType: string
    meter: string
    weight:string
    noOfCones: number
    noOfBox: number
}
