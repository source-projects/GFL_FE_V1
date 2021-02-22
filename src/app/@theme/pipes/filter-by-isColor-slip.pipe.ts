import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterByIsColor" })
export class FilterByIsColorPipe implements PipeTransform {
  transform(processList: any, isColor, refreshPipe) {
    if (processList && processList.length && isColor) {
      return processList.filter(
        a=> a.isColor == true
      );
    } else {
      return processList;
    }
  }
}
