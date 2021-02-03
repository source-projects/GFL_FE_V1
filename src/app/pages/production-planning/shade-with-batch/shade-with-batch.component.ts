import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ProductionPlanningService} from 'app/@theme/services/production-planning.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ShadeService } from 'app/@theme/services/shade.service';
import * as errorData from "app/@theme/json/error.json";
import { ToastrService } from 'ngx-toastr';
import { JetPlanningService } from 'app/@theme/services/jet-planning.service';

@Component({
  selector: 'ngx-shade-with-batch',
  templateUrl: './shade-with-batch.component.html',
  styleUrls: ['./shade-with-batch.component.scss']
})
export class ShadeWithBatchComponent implements OnInit {
allShade:any[];
shade:any[];
loading = false;
public errorData: any = (errorData as any).default;
jet:any;
jetList:any[]=[];
formSubmitted: boolean = false;
jetSelectedFlag = false;
selectedJetData:any[]=[];
//batch:any;
color:any;
  constructor(    
    private productionPlanningService: ProductionPlanningService,
    private shadeService: ShadeService,
    private _NgbActiveModal: NgbActiveModal, 
    private toastr: ToastrService,
    private jetService: JetPlanningService,

    ) { }

  ngOnInit(): void {
    this.getJetData();

    //this.getAllBatchWithShade();
  }

  get activeModal() {
    return this._NgbActiveModal;
  }
  getJetData() {
    this.loading = true;
    this.jetService.getAllJetData().subscribe(
      (data) => {
        if (data["success"]) {
          this.jetList = data["data"];
          console.log(this.jetList);
        
        }

        else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  jetSelected(event){
    console.log(event);
    this.jetSelectedFlag = true;
    this.jetList.forEach(element => {
      if(element.id == event){
        this.selectedJetData = element.jetDataList;
      }
    });
  }
 

    onClick(event){
      console.log(event);
      this.activeModal.close(event.value);
      
    }

}
