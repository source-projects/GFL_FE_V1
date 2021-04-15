export class Payment {
    partyId: Number;
    id:Number;
    isSendToParty:boolean;
    gstAmt:number;
    cdAmt:number;
    rdAmt:number;
    otherDiff:number;
    rdDetail:string;
    cdDetail:string;
    diffDetail:string;
    amtToPay:number;
    amtPaid:number;
    totalBill:number;
    invoices:Invoices[];
    paymentData:PaymentData[];
    advancePayList:AdvancePayList[];

    constructor(){
        this.totalBill = 0;
        this.amtPaid = 0;
        this.amtToPay = 0;
        this.cdAmt = 0;
        this.rdAmt = 0;
        this.otherDiff = 0;
        this.gstAmt = 0;
    }
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
    payTypeId:number;
    remark:string;
    bank:string;
}