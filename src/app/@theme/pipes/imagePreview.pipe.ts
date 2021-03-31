import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "imagePreviewPipe" })
export class ImagePreviewPipe implements PipeTransform {
  transform(list , index) {
    if(list && list.length && index > -1){
      return [list[index]];
    }
  }
}
