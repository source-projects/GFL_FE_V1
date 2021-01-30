export class Payment {
    partyId: Number;
    id:Number;
    isSendToParty:boolean;
    gstAmt:Number;
    cdAmt:number;
    rdAmt:number;
    otherDiff:number;
    rdDetail:string;
    cdDetail:string;
    diffDetail:string;
    amtToPay:number;
    amtPaid:Number;
    totalBill:Number;
    invoices:Invoices[];
    paymentData:PaymentData[];
    advancePayList:AdvancePayList[];
}
export class Invoices{
    invoiceNo:string;
}

export class AdvancePayList{
    id:Number;
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