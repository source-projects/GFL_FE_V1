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
  }
  
  export class BatchWithGrList {
    batchDataList: BatchDataList[]
    batchId: string
    controlId: number
    totalMtr:any = 0
    totalFMtr:any = 0
    shrinkage:any = 0
    lotDataLength:any = 0
  }
  
  export class BatchDataList {
    batchId: string
    controlId: number
    finishMtr: number
    id: number
    isBillGenrated: boolean
    isExtra: boolean
    isFinishMtrSave: boolean
    isProductionPlanned: boolean
    mtr: number
    sequenceId: number
    wt: number
  }
  
  export class QualityList {
    amt: number
    batchId: string
    finishMtr: number
    hsn: string
    pcs: number
    qualityId: string
    qualityName: string
    rate: number
    totalMtr: number
    pchalNo: string
  }
  