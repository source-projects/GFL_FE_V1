import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterByIsColor",pure:true })
export class FilterByIsColorPipe implements PipeTransform {
  transform(processList: any, color, flag:any) {
    if (processList && processList.length && color==true) {
      if(flag == false){
        return processList = processList.filter(
          a=> {
            if(a.isColor == true){
              return true;
            }
          });
      }
      else{
        return processList = processList.filter(
          a=> {
            if(a.isColor == false){
              return true;
            }
          });
      }
    } else {
      return processList;
    }
  }
}
