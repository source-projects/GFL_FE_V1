export class Shade {
  pending: Boolean;
  partyShadeNo: string;
  processName: string;
  qualityId: string;
  qualityName: string;
  qualityType: string;
  qualityEntryId: number;
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

  constructor() {
    this.pending = false;
    this.partyShadeNo = null;
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
