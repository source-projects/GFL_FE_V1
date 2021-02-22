import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "processFilterPipe" })
export class FilterProcessNamePipe implements PipeTransform {
  transform(processList: any, slipProcessData) {
    if (processList && processList.length && slipProcessData && slipProcessData.length ) {
      return processList.filter(
        a => slipProcessData.findIndex(v => v.processType == a) == -1
      );
    } else {
      return processList;
    }
  }
}
