export class PurchaseRequest {
    id:number;
    createdBy:number;
    itemId:string;
    itemName:string;
    status:number = 0;
    supplierName:string;
    supplierId:number;
    userHeadId:number;
}