import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterOutSelectedShade" })
export class FilterSelectedShadePipe implements PipeTransform {
  transform(inputItemList: any, itemList) {
    if (itemList && inputItemList&& itemList.length && itemList[0].id != undefined) {
      return inputItemList.filter(
        a => itemList.findIndex(v => v.itemName == a.itemName) == -1
      );
    } else {
      return inputItemList;
    }
  }
}
