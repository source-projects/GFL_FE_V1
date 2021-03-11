import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: "filterItemSelected", pure: true })
export class FilterSelectedItemPipe implements PipeTransform {
  transform(itemListArray: any, dyeingChemicalItemList, rowIndex) {
    if (
      dyeingChemicalItemList &&
      itemListArray &&
      dyeingChemicalItemList.length
    ) {
      return itemListArray.filter(
        (a) =>
          dyeingChemicalItemList.findIndex((v) => v.itemId == a.itemId) == -1 ||
          dyeingChemicalItemList[rowIndex].itemId == a.itemId
      );
    } else {
      return itemListArray;
    }
  }
}
