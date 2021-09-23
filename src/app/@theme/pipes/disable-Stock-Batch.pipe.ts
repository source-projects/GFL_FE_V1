import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'disableStockBatchPipe'
})
export class DisableStockBatchPipe implements PipeTransform {
  planned = false
  transform(row: any) {
    if (row.batchData) {
      row.batchData.forEach(element => {
        if (element.isProductionPlanned) {
          this.planned = true;
        }
      });
    }

    if (this.planned) {
      return true;
    }
    else {
      return false;
    }
  }
}
