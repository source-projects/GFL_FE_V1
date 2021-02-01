export class AdvancePayment{
    partyId: Number;
    amt:Number;
    payTypeId:Number;
    paymentBunchId:Number;
    remark:String;
    no:Number;
    bank:String;
    createdBy:Number;
    creditId:Number;

    constructor() {
        this.amt = null;
        this.payTypeId = null;
        this.remark = null;
        this.no = null;
        this.bank = null;
        this.partyId = null;
        this.paymentBunchId = null;
        this.createdBy = null;
        this.creditId = null;
    }
}