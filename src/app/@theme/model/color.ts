export class Color {
    constructor(
        public billAmount:Number,
        public billDate:String,
        public billNo:String,
        public chlDate:String,
        public chlNo:String,
        
        public colorDataList:[{
          id:Number,
          itemId:Number,
          noOfBox:Number,
          purchaseId:Number,
          quantity:Number,
          quantityPerBox:Number
          quantityUnit:String,
          rate:Number,

         }],
         public ddate:String,
         public id:Number,
         public lotNo:Number,
         public remark:String,
         public supplierId:Number,
         public supplierName:String,
         public userId:Number
    ){}
   

}

