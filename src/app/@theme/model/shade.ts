export class Shade {
  pending: Boolean;
  partyShadeNo: string;
  factoryShadeNo:string;
  processName: string;
  qualityId: string;
  qualityEntryId: number;
  qualityName: string;
  qualityNameId:number;
  qualityType: string;
  colorTone: string;
  labColorNo: string;
  colorName: string;
  category: string;
  remark: string;
  createdBy: number;
  updatedBy: number;
  cuttingId: number;
  partyId: number;
  processId: number;
  userHeadId: number;
  shadeDataList: ShadeDataList[];
  isExtraRate: boolean;
  extraRate: number;
  id:number;

  constructor() {
    this.pending = false;
    this.partyShadeNo = null;
    this.factoryShadeNo = null;
    this.isExtraRate = false;
    this.extraRate = 0;
    this.id = null;
  }
}

export class ShadeDataList {
  amount: number;
  concentration: number;
  itemName: string;
  rate: number;
  supplierName: string;
  supplierId: number;
  supplierItemId: number;
}

export class QualityListEmpty {
  qualityName: null;
  qualityType: null;
}
