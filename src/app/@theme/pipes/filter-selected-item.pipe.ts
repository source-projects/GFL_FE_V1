import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "itemFilterPipe" })
export class FilterItemPipe implements PipeTransform {
  transform(itemList: any, slipProcessItemData) {
    if (itemList && itemList.length && slipProcessItemData && slipProcessItemData.length ) {
      return itemList.filter(
        a => slipProcessItemData.findIndex(v => v.itemId == a.itemId) == -1
      );
    } else {
      return itemList;
    }
  }
}
