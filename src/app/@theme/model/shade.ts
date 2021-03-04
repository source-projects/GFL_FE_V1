export class Shade {
  pending: Boolean;
  partyShadeNo: string;
  processName: string;
  qualityId: string;
  qualityEntryId: number;
  qualityName: string;
  qualityType: string;
  colorTone: string;
  labColorNo: string;
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

  constructor() {
    this.pending = false;
    this.partyShadeNo = null;
    this.isExtraRate = false;
    this.extraRate = 0;
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
