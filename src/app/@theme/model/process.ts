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
    dosingFunc: Dosing[];
    tempratureControlFunc: TempratureControl[];
    pumpControlFunc: PumpControl[];
    waterControlFunc: WaterControl[];
    operatorMessageFunc: OperatorMessage[];
}
export class Dosing {
    index: any;
    haveDose: any = false;
    doseAtTemp: any;
    fillType: any = 'Pre Fill Machine Water';
    dosingPercentage: any = 'Level 1';
    doseWhileHeating = false;
    doseType: any = '';
    dosingChemical: ChemicalReq[] = [];
}
export class ChemicalReq {
    id: any;
    index: any;
    DynamicProcessRecordId: any;
    itemId: any;
    itemName: any;
    supplierName: any;
    concentration: any;
    lrOrFabricWt: any;
}
export class TempratureControl {
    index: any;
    setValue: any;
    rateOfRise: any;
    holdTime: any;
    pressure: boolean = false;
}
export class PumpControl {
    id: any;
    pumpSpeed: any;
}
export class WaterControl {
    index: any;
    type: any = '';
    waterType: any = '';
    drainType: any = '';
    fabricRatio: any = 0;
    jetLevel: any = false;
}
export class OperatorMessage {
    index: any;
    operatorCode: any;
    operatorMessage: any;
    startAtTemp: any;
}
