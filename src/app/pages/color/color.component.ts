import { Component, OnInit } from '@angular/core';
import {ColorService} from 'app/@theme/services/color.service';
import { Router } from '@angular/router';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

 public errorData: any = (errorData as any).default;
 
 tableStyle = 'bootstrap';
 colorList=[];
  constructor(private colorService: ColorService, 
              private route:Router,
              private modalService: NgbModal,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getColor();
  }
  getColor(){
    this.colorService.getColor().subscribe(
      data =>{
        if(data["success"]){
          this.colorList = data['data'] 
        }
        else{
          this.toastr.error(errorData.Internal_Error)
        }
      },
      error=>{
        this.toastr.error(errorData.Serever_Error)
      }
    );
    }

    
  }


