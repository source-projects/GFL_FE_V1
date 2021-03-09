import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterOutSelectedShade" })
export class FilterSelectedShadePipe implements PipeTransform {
  transform(supplierItemList: any, shadeItemList,refreshFlag, isUpdate) {
    if(isUpdate && shadeItemList[shadeItemList.length-1].id && refreshFlag < shadeItemList.length){
      return supplierItemList;
    }
    if (shadeItemList && supplierItemList&& shadeItemList.length) {
      return supplierItemList.filter(
        a => shadeItemList.findIndex(v => v.supplierItemId == a.id) == -1
      );
    } else {
        return supplierItemList;
    }
  }
}
