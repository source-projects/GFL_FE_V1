export class Program{

    constructor(
   public id: Number,
   public partyId: Number,
   public priority: string,
   public programGivenBy:string ,
   public quality_entry_id: number,
   public qualityId: number,
   public qualityName: string,
   public qualityType: string,
   public remark: string,
   public programRecord:[{
        batch: string
        colour_tone: string
        id: string
        lot_no: string
        partyShadeNo: string
        programControlId:string
        quantity: string
        remark: string
        shade_no: string
    }]
    ){}
}
