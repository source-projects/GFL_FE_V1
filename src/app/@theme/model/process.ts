export class ProcessValue {
    processName: string;
    time: number;
    steps: StepsRecordData[];
}
export class StepsRecordData {
    dosingPercentage: string;
    drainType: string;
    fabricRatio: string;
    fillType: string;
    functionName: string;
    functionPosotion: number;
    functionValue: string;
    haveDose: true;
    holdTime: string;
    isDosingControl: true;
    isOperatorMessage: true;
    isPumpControl: true;
    isTempControl: true;
    isWaterControl: true;
    jetLevel: true;
    doseWhileHeating: string;
    operatorCode: string;
    operatorMessage: string;
    pressure: string;
    pumpSpeed: number;
    rateOfRise: string;
    setValue: string;
    startAtTemp: string;
    stepName: string;
    stepPosotion: number;
    waterType: string;
    doesAtTemp: string;
    doesType: string;
    dosingChemical: DosingChemical[];
}
export class NewRecordData {
    dosingPercentage: string;
    drainType: string;
    fabricRatio: string;
    fillType: string;
    functionName: string;
    functionPosotion: number;
    functionValue: string;
    haveDose: true;
    holdTime: string;
    isDosingControl: true;
    isOperatorMessage: true;
    isPumpControl: true;
    isTempControl: true;
    isWaterControl: true;
    jetLevel: true;
    doseWhileHeating: string;
    operatorCode: string;
    operatorMessage: string;
    pressure: string;
    pumpSpeed: number;
    rateOfRise: string;
    setValue: string;
    startAtTemp: string;
    stepName: string;
    stepPosotion: number;
    waterType: string;
    doesAtTemp: string;
    doesType: string;
    dosingChemical: DosingChemical[];
}
export class DosingChemical {
    concentration: null;
    dynamicProcessRecordId: null;
    itemId: null;
    itemName: null;
    lrOrFabricWt: null;
    supplierId: null;
}
export class Step {
    id: any;
    stepName: string;
    stepNo: number;
    functionList: FunctionObj[];
}
export class FunctionObj {
    funcName: any;
    funcValue: string = '';
    funcPosition: any;
    dosingFunc: Dosing;
    tempratureControlFunc: TempratureControl;
    pumpControlFunc: PumpControl;
    waterControlFunc: WaterControl;
    operatorMessageFunc: OperatorMessage;
}
export class Dosing {
    haveDose: any = false;
    doseAtTemp: any;
    fillType: any = 'Pre Fill Machine Water';
    dosingPercentage: any = 'Level 1';
    doseWhileHeating: any = false;
    doseType: any = '';
    dosingChemical: ChemicalReq[] = [];
}
export class ChemicalReq {
    id: any;
    dynamicProcessRecordId: any;
    itemId: any;
    itemName: any;
    supplierName: any;
    concentration: any;
    lrOrFabricWt: any;
}
export class TempratureControl {

    setValue: any;
    rateOfRise: any;
    holdTime: any;
    pressure: any = false;
}
export class PumpControl {

    pumpSpeed: any;
}
export class WaterControl {

    type: any = '';
    waterType: any = '';
    drainType: any = '';
    fabricRatio: any = 0;
    jetLevel: any = false;
}
export class OperatorMessage {
    operatorCode: any;
    operatorMessage: any;
    startAtTemp: any;
}
