export class Supplier {
    id:Number;
    supplierName:string;
    gstPercentage:Number;
    discountPercentage:Number;
    remark: string;
    createdBy: string;
    createdDate: string;
    updatedDate: string;
    paymentTerms: Number;
    updatedBy: string;
    userId: string;
    supplierRates:SupplierRates[];
}
export class SupplierRates{
    supplierId:Number;
    userId:1;
    createdBy:string;
    itemName: string;
    rate: Number;
    discountedRate:Number;
    gstRate:Number;
    id:Number;
    createdDate: String;
    updatedBy: String;
    updatedDate: String;
}
