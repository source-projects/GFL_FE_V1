import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterOutSelectedSupplier" })
export class FilterSelectedSupplierPipe implements PipeTransform {
  transform(supplierItemList: any, seelectedItemList) {
    if (supplierItemList && supplierItemList.length && seelectedItemList && seelectedItemList.length) {
      return supplierItemList.filter(
        a => seelectedItemList.findIndex(v => v.itemId == a.itemId) == -1 
      );
    } else {
      return supplierItemList;
    }
  }
}
