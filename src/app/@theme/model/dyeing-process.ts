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
    supplierName: string;
    supplierId: number;
    qty: number;
    _id: string;
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
