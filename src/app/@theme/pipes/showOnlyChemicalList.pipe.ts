import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'showOnlyChemicalFilter'
})
export class ShowOnlyChemicalPipe implements PipeTransform {
  transform(list, isColor ) {
    if(isColor){
      return list;
    }else{
      return list.filter(f=>f.itemType != "Color");
    }
    
  }
}
