import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filterselectedBatches" })
export class FilterSelectedBatchPipe implements PipeTransform {
  transform(batchList: any, batchList2, i, refreshCount) {
    if(batchList && batchList.length && batchList2 && batchList2.length ){
      let list = [];
      let isFiltered = false;
      batchList2.forEach((element, index) => {
        if(index != i && element.batchId){
          list = list.concat(batchList.filter(a=> a.batchId == element.batchId));
          isFiltered = true;
        }
      });
      if(list.length && isFiltered){
        return batchList.filter(a=> list.findIndex(f=> a.batchId == f.batchId) == -1);
      }
    }
    return batchList;  
    }
    
}
