export class PrintInvoiceData {
    address: string
    batchWithGrList: BatchWithGrList[]
    gst: string
    partyName: string
    qualityList: QualityList[]
    invoiceNo: string
    totalMtr: number
    totalAmt: number
    totalFinishMtr: number
    totalPcs: number
    discount: number
    taxAmt: number
    cgst: number
    sgst: number
    netAmt: number
    percentageDiscount:number
  }
  
  export class BatchWithGrList {
    batchDataList: BatchDataList[]
    pchallanRef: string //changed batchId with pchallanRef
    controlId: number
    totalMtr:any = 0
    totalFMtr:any = 0
    shrinkage:any = 0
    lotDataLength:any = 0
    calculationDone: boolean = false;
  }
  
  export class BatchDataList {
    pchallanRef: string //changed batchId with pchallanRef
    controlId: number
    finishMtr: number
    id: number
    isBillGenrated: boolean
    isExtra: boolean
    isFinishMtrSave: boolean
    isProductionPlanned: boolean
    mtr: string
    sequenceId: number
    wt: number
    srNo:number = 0;
  }
  
  export class QualityList {
    amt: number
    pchallanRef: string //changed batchId with pchallanRef
    finishMtr: number
    hsn: string
    pcs: number
    qualityId: string
    qualityName: string
    rate: number
    totalMtr: number
    pchalNo: string
  }
  