export class TagCRUDObject {
  id: number;
  userHeadId: number;
  createdBy: number;
  updatedBy: number;
  createdDate: string;
  updatedDate: string;
  tagProcessName: string;
  temp: number;
  holdTime: number;
  liquerRation: number;
  dyeingTagDataList: TagDyeingProcessData[];

  constructor() {
    this.dyeingTagDataList = [];
    this.dyeingTagDataList.push(new TagDyeingProcessData());
  }
}

export class TagDyeingProcessData {
  id: number;
  controlId: number;
  itemId: number;
  itemName: string;
  byChemical: string = "L";
  concentration: number;
  shadeType: string = "DEFAULT";
  supplierName: string;
  duplicateError: boolean;
  _id: string;

  supplierId: number;
  qty: number;
  itemType: string;
  constructor() {
    this._id = this.uuidv4();
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
