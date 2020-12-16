export class Color {
  billAmount: Number;
  billDate: Date;
  billNo: String;
  chlDate: Date;
  chlNo: String;
  id: Number = null;
  remark: String;
  supplierId: Number;
  createdBy: Number;
  updatedBy: Number;
  userHeadId: Number;
  colorDataList: ColorDataList[];
}
export class ColorDataList {
  itemName: string;
  quantityPerBox: number;
  noOfBox: number;
  quantity: number;
  id: number;
  quantityUnit: string;
  itemId: number;
  rate: number;
  controlId: number;
  amount: number;
  
  constructor(){
    this.itemName= null;
    this.quantityPerBox= null;
    this.noOfBox= null;
    this.quantity= null;
    this.id= null;
    this.quantityUnit= 'kg';
    this.itemId= null;
    this.rate= null;
    this.controlId= null;
    this.amount= null;
  }
}
