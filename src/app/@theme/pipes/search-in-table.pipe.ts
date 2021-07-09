import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchInTable' })
export class SearchInTablePipe implements PipeTransform {

  transform(actualList: Array<any>, valaue: string, andCondition: boolean, columnArray: Array<any>): Array<any> {
      const val = valaue.toString().toLowerCase().trim();
      const searchStrings = val.split("+").map(m => ({matched: false, val: m})); 
      return actualList.filter((f) => 
      {
        let hit = 0;
        for(let v of searchStrings){
          if(
            columnArray.filter(m => this.matchString(f, m, v.val)).length
          ){
            v.matched = true;
            hit++;
            if(!andCondition){
              return true; 
            }
          }
        }
        if(andCondition && hit == searchStrings.length){
          return true;
        }
      });
  }

  matchString(item, key, searchString){
    if(key == "batchId"){

    }else{
      if(item[key]){
        return item[key].toString().toLowerCase().includes(searchString);
      }else{
        return false;
      }
    }
  }
}
