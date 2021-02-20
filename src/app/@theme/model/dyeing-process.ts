export class DyeingProcess {
    id: number;
    processName: string;
    createdBy: number;
    createdDate: string;
    updatedBy: number;
    updatedDate: string;
    userHeadId: number;
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
  }
  
  export class DyeingChemicalData {
    byChemical: string = "L";
    concentration: number;
    controlId: number;
    id: number;
    itemId: number;
    itemName: string;
    supplierName: string
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
