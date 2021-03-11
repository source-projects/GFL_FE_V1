import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: "filterItemSelected" })
export class FilterSelectedItemPipe implements PipeTransform {
  transform(itemListArray: any, dyeingChemicalItemList) {
    if (
      dyeingChemicalItemList &&
      itemListArray &&
      dyeingChemicalItemList.length
    ) {
      return itemListArray.filter(
        (a) =>
          dyeingChemicalItemList.findIndex((v) => v.itemId == a.itemId) == -1
      );
    } else {
      return itemListArray;
    }
  }
}
