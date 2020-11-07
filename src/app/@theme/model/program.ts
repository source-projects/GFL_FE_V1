export class Program{
    id: Number;
    partyId: Number;
    priority: string;
    programGivenBy:string;
    quality_entry_id: number;
    qualityId: number;
    qualityName: string;
    qualityType: string;
    remark: string;
    programRecord:ProgramRecord[];
}
export class ProgramRecord{
    batch: number;
    colour_tone: string;
    id: number;
    lot_no: number;
    partyShadeNo: number;
    programControlId:number;
    quantity: number;
    remark: string;
    shade_no: number;
}

