export class Color {
    billAmount:Number;
    billDate:Date;
    billNo:String;
    chlDate:Date;
    chlNo:String;
    id:Number=null;
    remark:String;
    supplierId:Number;
    userId:Number;
    colorDataList:ColorDataList[];
}
export class ColorDataList{
    id:Number=null;
    itemId:Number;
    noOfBox:Number;
    quantity:Number;
    quantityPerBox:Number;
    quantityUnit:String="kg";
    rate:Number;
}

