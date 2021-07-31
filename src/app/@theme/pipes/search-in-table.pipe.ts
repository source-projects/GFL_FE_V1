import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchInTable' })
export class SearchInTablePipe implements PipeTransform {

  transform(actualList: Array<any>, valaue: string, andCondition: boolean, columnArray: Array<any>): Array<any> {
      const val = valaue.toString().toLowerCase().trim();
      const searchStrings = val.split("+").map(m => ({matched: false, val: m})); 
      if(actualList && actualList.length){
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
      
  }

  matchString(item, key, searchString){
    if(key == "batchList" && item[key]){
      return item[key].filter(f => f.batchId?f.batchId.toString().toLowerCase().includes(searchString) : ''.toString().toLowerCase().includes(searchString)).length > 0
    }
    else if(key == "batchId"){
      return item["batchData"].filter(f => f.batchId?f.batchId.toString().toLowerCase().includes(searchString) : ''.toString().toLowerCase().includes(searchString)).length > 0
    }else{
      if(item[key]){
        return item[key].toString().toLowerCase().includes(searchString);
      }else{
        return false;
      }
    }
  }
}
