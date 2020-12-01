export class Shade {
  partyShadeNo: String;
  processName: String;
  qualityId: String;
  qualityName: String;
  qualityType: String;
  colorTone: String;
  labColorNo: String;
  category: String;
  remark: String;
  createdBy: Number;
  updatedBy: Number;
  cuttingId: Number;
  partyId: Number;
  processId: Number;
  userHeadId: Number;
  shadeDataList: ShadeDataList[];
}

export class ShadeDataList {
  amount: Number;
  concentration: Number;
  itemName: String;
  rate: Number;
  supplierName: String;
  supplierId: Number;
  supplierItemId: Number;
}

export class QualityListEmpty {
  qualityName: null
  qualityType: null

}