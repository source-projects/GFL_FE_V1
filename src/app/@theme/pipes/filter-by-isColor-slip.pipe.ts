import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterByIsColor",pure:true })
export class FilterByIsColorPipe implements PipeTransform {
  transform(processList: any, isColor, itemListArr) {
    if (processList && processList.length && isColor==true) {
      return processList = itemListArr.filter(
        a=> a.itemType == "Color"
      );
    } else {
      return processList;
    }
  }
}
