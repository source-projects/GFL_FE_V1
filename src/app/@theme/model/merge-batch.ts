export class MergeBatch{
    partyId: number;
    qualityId: number;
    qualityList: any;
    batchId: any;
    batchList: any;
    grList: any;

    constructor(){
        this.grList = [
            { mtr: 10,wt:10 },
            { mtr: 20,wt:20 },
            { mtr: 30,wt:30 },
            { mtr: 40,wt:40 }
        ]
    }
}