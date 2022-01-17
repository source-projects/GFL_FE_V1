export class DyeingProcess {
    id: number;
    processName: string;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    userHeadId: number;
    scb:boolean = false;
    dyeingProcessData: DyeingProcessData[];
  }
  
  export class DyeingProcessData {
    controlId: number;
    dyeingChemicalData: DyeingChemicalData[];
    holdTime: number;
    id: number;
    processType: string;
    liquerRation: number;
    sequence: number;
    temp: number;
    dyeingplcMast?:DyeingplcMastClass
  }

  export class DyeingplcMastClass{
    id:number;
    dyeingProcessMastId:number;
    dyeingplcDataList:dyeingplcDataListClass[];

    constructor(){
      this.id = null;
      this.dyeingProcessMastId = null;
      this.dyeingplcDataList = [];
    }
  }

  export class dyeingplcDataListClass{
    id:number;
    controlId:number;
    plcName:string;
    l:number;
    m:number;
    d:number;
    s:number;

    constructor(){
      this.l = null;
      this.m = null;
      this.d = null;
      this.s = null;
    }
  }
  
  export class DyeingChemicalData {
    byChemical: string = "L";
    concentration: number;
    controlId: number;
    id: number;
    itemId: number;
    itemName: string;
    supplierName: string;
    supplierId: number;
    qty: number;
    _id: string;
    itemType:string;
    duplicateError;
    shadeType:string = "DEFAULT";
    constructor() {
      this._id = uuidv4();
    }
  }

  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

// export class DyeingProcess1 {
//     processName: any;
//     time: number;
//     steps: StepsRecordData[];
//     createdDate: Date;
//     updatedDate: Date;
//     createdBy: number;
//     updatedBy: number;
//     userHeadId: number;
// }
// export class StepsRecordData {
//     id: number;
//     controlId: number;
//     functionName: any;
//     functionPosotion: number;
//     functionValue: any;
//     dosingPercentage: any;
//     drainType: any;
//     fabricRatio: any;
//     fillType: any;
//     haveDose: any = false;
//     holdTime: any;
//     isDosingControl: any = false;
//     isOperatorMessage: any = false;
//     isPumpControl: any = false;
//     isTempControl: any = false;
//     isWaterControl: any = false;
//     jetLevel: any = false;
//     doseWhileHeating: any;
//     operatorCode: any;
//     operatorMessage: any;
//     pressure: any;
//     pumpSpeed: number;
//     rateOfRise: any;
//     setValue: any;
//     startAtTemp: any;
//     stepName: any;
//     stepPosotion: number;
//     waterType: any;
//     doseAtTemp: any;
//     doseType: any;
//     dosingChemical: ChemicalReq[];
// }
// export class ChemicalList {
//     id: null;
//     concentration: null;
//     itemId: null;
//     itemName: null;
//     supplierId: null;
// }
// export class Step {
//     id: any;
//     stepName: any;
//     stepNo: number;
//     functionList: FunctionObj[];
// }
// export class FunctionObj {
//     funcName: any;
//     funcValue: any = '';
//     funcPosition: any;
//     dosingFunc: Dosing;
  
//     tempratureControlFunc: TempratureControl;
//     pumpControlFunc: PumpControl;
//     waterControlFunc: WaterControl;
//     operatorMessageFunc: OperatorMessage;
// }
// export class Dosing {
//     haveDose: any = false;
//     doseAtTemp: any;
//     fillType: any = 'Pre Fill Machine Water';
//     dosingPercentage: any = 'Level 1';
//     doseWhileHeating: any = false;
//     doseType: any = '';
//     dosingChemical: ChemicalReq[] = [];
// }
// export class ChemicalReq {
//     id: any;
//     dynamicProcessRecordId: any;
//     itemId: any;
//     itemName: any;
//     supplierId: any;
//     supplierName: any;
//     concentration: any;
//     lrOrFabricWt: any;
// }
// export class TempratureControl {

//     setValue: any;
//     rateOfRise: any;
//     holdTime: any;
//     pressure: any = false;
// }
// export class PumpControl {

//     pumpSpeed: any;
// }
// export class WaterControl {

//     type: any = '';
//     waterType: any = '';
//     drainType: any = '';
//     fabricRatio: any = 0;
//     jetLevel: any = false;
// }
// export class OperatorMessage {
//     operatorCode: any;
//     operatorMessage: any;
//     startAtTemp: any;
// }
