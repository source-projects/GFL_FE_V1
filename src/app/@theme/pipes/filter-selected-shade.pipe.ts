import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterOutSelectedShade" })
export class FilterSelectedShadePipe implements PipeTransform {
  transform(supplierItemList: any, shadeItemList,refreshFlag, recordIndex) {
    if (shadeItemList && supplierItemList&& shadeItemList.length) {
      return supplierItemList.filter(
        a => shadeItemList.findIndex(v => v.supplierItemId == a.id) == -1 || shadeItemList[recordIndex].supplierItemId == a.id
      );
    } else {
        return supplierItemList;
    }
  }
}
