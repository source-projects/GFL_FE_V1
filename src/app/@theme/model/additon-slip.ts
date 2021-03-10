export class AdditionSlip {
  id: number;
  batchId: string;
  dyeingSlipData: DyeingSlipData;
  productionId: number;
}

export class DyeingSlipData {
  controlId: number;
  dyeingSlipItemData: DyeingSlipItemDatum[];
  holdTime: number;
  id: number;
  isColor: boolean;
  liquerRation: number;
  processType: string;
  sequence: number;
  temp: number;
}

export class DyeingSlipItemDatum {
  controlId: number;
  id: number;
  itemId: number;
  itemName: string;
  qty: number;
  supplierId: number;
  supplierName: string;
}