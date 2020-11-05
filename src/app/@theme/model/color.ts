export class Color {
    billAmount:Number
    billDate:String
    billNo:String
    chlDate:String
    chlNo:String
    ddate:String
    id:Number
    lotNo:Number
    remark:String
    supplierId:Number
    supplierName:String
    userId:Number
    colorDataList:ColorDataList[]
}
export class ColorDataList{
    id:Number
    itemId:Number
    noOfBox:Number
    purchaseId:Number
    quantity:Number
    quantityPerBox:Number
    quantityUnit:String
    rate:Number
}

