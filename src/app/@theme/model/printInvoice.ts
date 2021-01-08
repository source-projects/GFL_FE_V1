export class PrintInvoiceData {
    address: string
    batchWithGrList: BatchWithGrList[]
    gst: string
    partyName: string
    qualityList: QualityList[]
  }
  
  export class BatchWithGrList {
    batchDataList: BatchDataList[]
    batchId: string
    controlId: number
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
  }
  