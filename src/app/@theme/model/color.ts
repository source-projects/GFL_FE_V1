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
    userHeadId:Number;
    colorDataList:ColorDataList[];
}
export class ColorDataList{
    id:Number=null;
    itemId:Number;
    noOfBox:Number;
    quantity:Number;
    quantityPerBox:Number;
    quantityUnit:string="kg";
    rate:Number;
    amount:Number;
}

