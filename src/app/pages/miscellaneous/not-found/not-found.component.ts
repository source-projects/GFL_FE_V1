import { NbMenuService } from '@nebular/theme';
import { Component, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'ngx-not-found', 
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  todo = [
    
  ];

  done = [
   
  ];
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
  constructor(private menuService: NbMenuService) {
  }
  
   //array varibales to store csv data
   lines = []; //for headings
   linesR = []; // for rows
   //File upload function
   changeListener(files: FileList){
     console.log(files);
     if(files && files.length > 0) {
        let file : File = files.item(0); 
          // console.log(file.name);
          // console.log(file.size);
          // console.log(file.type);
          //File reader method
          let reader: FileReader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
           let csv: any = reader.result;
           let allTextLines = [];
           allTextLines = csv.split(/\r|\n|\r/);
          
          //Table Headings
           let headers = allTextLines[0].split(',');
           let data = headers;
           let tarr = [];
           for (let j = 0; j < headers.length; j++) {
             tarr.push(data[j]);
           }
           //Pusd headings to array variable
          //  this.lines.push(tarr);
           for (let k=0;k<data.length;k++)
           {
             this.todo.push(data[k]);
           }
           console.log(this.todo);
       }
     }
    
   }
 
  goToHome() {
    this.menuService.navigateHome();
  }
}
