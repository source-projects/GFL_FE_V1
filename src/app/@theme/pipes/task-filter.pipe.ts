import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'taskFilterPipe'
})
export class TaskFilterPipe implements PipeTransform {
   datePipeString;
    datePipe: DatePipe;
     transform(
    cardDetail , date: string, refreshCount , radioSelect , radioArray
  ) {
    this.datePipe = new DatePipe('en-IN');
    if(cardDetail && cardDetail.length){
  
    cardDetail = cardDetail.filter( ele => {
      if(date){
        this.datePipeString = this.datePipe.transform(ele.taskDate, 'yyyy-MM-dd');
        if(this.datePipeString == date){
          if(radioSelect){
            switch(radioSelect){
              case 1:
                return true;

              case 2:
                if(ele.assignBySameUser){
                  return true;
                }
                return false;

              case 3:
                if(!ele.assignBySameUser){
                  return true;
                }
                return false;
            }
          }
        }
      }
      else{

      if(radioSelect){
        switch(radioSelect){
          case 1:
            return true;

          case 2:
            if(ele.assignBySameUser){
              return true;
            }
            return false;

          case 3:
            if(!ele.assignBySameUser){
              return true;
            }
            return false;
        }
      }
    }

    
      
    })
  
    }
    if(cardDetail)
      return cardDetail; 
     else {
       return [];
     }    
  }
}