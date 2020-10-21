import { Component, OnInit } from '@angular/core';
import { ShadeService } from 'app/@theme/services/shade.service';

@Component({
  selector: 'ngx-shade',
  templateUrl: './shade.component.html',
  styleUrls: ['./shade.component.scss']
})
export class ShadeComponent implements OnInit {
  shadeList;
  tableStyle = 'bootstrap';
  constructor(private shadeService: ShadeService) { }

  ngOnInit(): void {
    this.shadeService.getallShade().subscribe(
      data =>{
        this.shadeList = data['data']
      },
      error=>{
        console.log(error)
      }
    )
  }

}
