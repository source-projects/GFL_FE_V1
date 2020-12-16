export class Program {
    id: Number;
    partyId: Number;
    priority: string;
    programGivenBy: string;
    qualityEntryId: number;
    qualityId: number;
    qualityName: string;
    qualityType: string;
    remark: string;
    createdBy: Number;
    updatedBy: Number;
    userHeadId: Number;
    programRecords: ProgramRecords[];
}
export class ProgramRecords {
    batchId: number;
    colourTone: string;
    id: number;
    stockId: number;
    partyShadeNo: number;
    quantity: number;
    remark: string;
    shadeNo: number;

    constructor(){
        this.batchId = null;
        this.colourTone = '';
        this.id = null;
        this.stockId = null;
        this.partyShadeNo = null;
        this.quantity = null;
        this.remark = '';
        this.shadeNo = null;
    }
}