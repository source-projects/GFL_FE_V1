import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'designationFilter'
})
export class DesignationFilterPipe implements PipeTransform {
  transform(
    list: any, isMaster:boolean
  ) {
    if(list && list.length){
      if(!isMaster){
        return list.filter(f=> f.designation.toLowerCase() == "team head")
      }else{
        return list.filter(f=> f.designation.toLowerCase() == "team member")
      }
    }
  }
}