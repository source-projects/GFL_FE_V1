import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'disableStockBatchPipe'
})
export class DisableStockBatchPipe implements PipeTransform {
  planned = false
  transform(row: any ) {
    row.batchData.forEach(element => {
      if(element.isProductionPlanned){
        this.planned = true;
      }
    })

    if(this.planned){
      return true;
    }
    else{
      return false;
    }
    // if(row.batchData.forEach(element => {
    //   if(element.isProductionPlanned){
    //     return true;
    //   }
    //   else{

    //     return false;
    //   }
    // })){

    // }
  }
}
