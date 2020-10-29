import { Component, OnInit } from '@angular/core';
import {ColorService} from 'app/@theme/services/color.service';
import { Router } from '@angular/router';
import {NgbModal}  from '@ng-bootstrap/ng-bootstrap'; 

import { ConfirmationDialogComponent } from 'app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
 //toaster config
 config: NbToastrConfig;
 destroyByClick = true;
 duration = 2000;
 hasIcon = true;
 position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
 preventDuplicates = false;
 status: NbComponentStatus = 'primary';
 
 tableStyle = 'bootstrap';
 colorList=[];
  constructor(private colorService: ColorService, 
              private route:Router,
              private modalService: NgbModal,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getColor();
  }
  getColor(){
    this.colorService.getColor().subscribe(
      data =>{
        this.colorList = data['data']
        console.log(this.colorList);
      },
      error=>{
        //toaster
        this.status = "danger"
        const config = {
         status: this.status,
         destroyByClick: this.destroyByClick,
         duration: this.duration,
         hasIcon: this.hasIcon,
         position: this.position,
         preventDuplicates: this.preventDuplicates,
        };
        this.toastrService.show(
          "No internet access or Server failuer",
          "Color",
          config);
      }
    );
    }

    
  }


