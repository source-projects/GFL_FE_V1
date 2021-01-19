export class Payment {
    partyId: Number;
    createdDate:Date;
    id:Number;
    isSendToParty:boolean;
    invoiceNo:string;
    advancePayment:AdvancePayment;
}

export class AdvancePayment{
    partyId: Number;
    amt:Number;
}