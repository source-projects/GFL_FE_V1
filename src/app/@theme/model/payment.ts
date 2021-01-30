export class Payment {
    partyId: Number;
    id:Number;
    isSendToParty:boolean;
    gstAmt:Number;
    cdAmt:Number;
    rdAmt:Number;
    otherDiff:Number;
    rdDetail:string;
    cdDetail:string;
    diffDetail:string;
    amtToPay:Number;
    amtPaid:Number;
    totalBill:Number;
    invoices:Invoices[];
    paymentData:PaymentData[];
    advancePayment:AdvancePayment[];
   // paymentDetails:PaymentDetails[];
}
export class Invoices{
    invoiceNo:string;

}

export class AdvancePayment{
    partyId: Number;
    amt:Number;
    payTypeId:Number;
    paymentBunchId:Number;
    remark:String;
    no:Number;
    bank:String;
}

export class PaymentData{
    chequeDate:string;
    chequeNo:string;
    chequeStatus:string;
    controlId:Number;
    id:Number;
    payAmt:Number;
    payType:string;
    remark:string;
    bank:string;
}

// export class PaymentDetails{
//     type:String;
//     amount:Number;
//     date:String;
//     remark:String;
//   }