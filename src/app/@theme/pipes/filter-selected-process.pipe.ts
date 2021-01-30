import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterOutSelected" })
export class FilterSelectedProcessPipe implements PipeTransform {
  transform(inputStepList: any, processList) {
    if (processList && processList.length) {
      return inputStepList.filter(
        a => processList.findIndex(v => v.processType == a) == -1
      );
    } else {
      return inputStepList;
    }
  }
}
