import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  DyeingProcess,
  DyeingProcessData,
} from "app/@theme/model/dyeing-process";
import { CommonService } from "app/@theme/services/common.service";
import { DyeingProcessService } from "app/@theme/services/dyeing-process.service";
import { ToastrService } from "ngx-toastr";
import { AddDyeingProcessStepComponent } from "../add-dyeing-process-step/add-dyeing-process-step.component";

@Component({
  selector: "ngx-add-edit-dyeing-process",
  templateUrl: "./add-edit-dyeing-process.component.html",
  styleUrls: ["./add-edit-dyeing-process.component.scss"],
})
export class AddEditDyeingProcessComponent implements OnInit {
  public dyeingProcess: DyeingProcess;
  public dyeingProcessSteps: DyeingProcessData[] = [];
  public formSubmitted: boolean = false;
  public addFlag: boolean = true;
  public updateFlag: boolean = false;
  public selectedStep: any;
  public currentDyeingProcessId: any;
  public itemList:any[];

  constructor(
    private _modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonService,
    private dyeingProcessService: DyeingProcessService,
    private route: Router,
    private currentRoute: ActivatedRoute
  ) {
    this.dyeingProcess = new DyeingProcess();
    this.getItemList();
  }

  ngOnInit(): void {
    this.currentDyeingProcessId = this.currentRoute.snapshot.paramMap.get('id');
    if(this.currentDyeingProcessId){
      this.getDyeingProcessById(this.currentDyeingProcessId);
      this.addFlag = false;
      this.updateFlag = true;
    }
  }

  getItemList(){
    this.dyeingProcessService.getAllItemWithSupplier().subscribe(
      data=>{
        if(data['success']){
          this.itemList = data['data'];
        }
      },error=>{

      }
    );
  }

  getDyeingProcessById(id) {
    this.dyeingProcessService.getDyeingProcessById(id).subscribe(
      data=>{
        if(data['success']){
          this.dyeingProcess = data['data'];
          this.dyeingProcessSteps = this.dyeingProcess.dyeingProcessData;
          this.setChemicalData();
        }else{
          this.toastr.error(data['msg']);
        }
      },error=>{
        this.toastr.error("Internal server error");
      }
    )
  }

  setChemicalData(){
    let inter = setInterval(()=>{
      if(this.itemList){
        this.dyeingProcessSteps.forEach(step=>{
          step.dyeingChemicalData.forEach(item=>{
            this.itemList.forEach(element => {
              if(item.itemId == element.itemId){
                item.supplierName = element.supplierName;
              }
            });
          });
        });
        clearInterval(inter);
      }
    },10); 
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.dyeingProcessSteps,
      event.previousIndex,
      event.currentIndex
    );
  }

  onStepClick(step) {
    this.selectedStep = step.sequence;
  }

  onEditStep(step) {
    const modalRef = this._modalService.open(AddDyeingProcessStepComponent);
    modalRef.componentInstance.position = step.sequence;
    modalRef.componentInstance.stepList = this.dyeingProcessSteps;
    modalRef.componentInstance.editStep = true;
    modalRef.result.then((result) => {
      if (result) {
        this.dyeingProcessSteps[step.sequence - 1].processType = result.name;
      }
    });
  }

  onDeleteStep(step) {
    let i = this.dyeingProcessSteps.findIndex(
      (v) => v.sequence == step.stepPosition
    );
    this.dyeingProcessSteps.splice(i, 1);
  }

  addProcessStep() {
    if(this.dyeingProcessSteps.length == 4){
      this.toastr.warning("You are done with all the steps!");
    }
    else{
      const modalRef = this._modalService.open(AddDyeingProcessStepComponent);
    modalRef.componentInstance.position = this.dyeingProcessSteps.length + 1;
    modalRef.componentInstance.stepList = this.dyeingProcessSteps;
    modalRef.componentInstance.editStep = false;
    modalRef.result.then((result) => {
      if (result) {
        let step = new DyeingProcessData();
        step.processType = result.name;
        step.sequence = result.position;
        step.dyeingChemicalData = result.chemicalList;
        step.temp = result.temp;
        step.holdTime = result.holdTime;
        // step.functionList = [];
        if (
          !this.dyeingProcessSteps.length ||
          result.position == this.dyeingProcessSteps.length + 1
        ) {
          this.dyeingProcessSteps.push(step);
        } else {
          this.dyeingProcessSteps.splice(result.position - 1, 0, step);
        }
      }
    });
    }
    
  }

  addUpdateDyeingProcess(myForm) {
    this.formSubmitted = true;
    if (myForm.valid) {
      if (this.addFlag) {
        if (this.dyeingProcessSteps.length != 0) {
          this.dyeingProcess.userHeadId = this.commonService.getUserHeadId().userHeadId;
          this.dyeingProcess.createdBy = this.commonService.getUser().userId;
          this.dyeingProcess.dyeingProcessData = this.dyeingProcessSteps;
          this.dyeingProcessService.saveDyeingProcess(this.dyeingProcess).subscribe(
            (data) => {
              if (data["success"]) {
                this.route.navigate(["/pages/dyeing-process"]);
                this.toastr.success(data["msg"]);
              }
              else this.toastr.error(data["msg"]);
            },
            (error) => {
              this.toastr.error("Internal server error");
            }
          );
        } else {
          this.toastr.error("Please enter steps");
          return;
        }
      } else if (this.updateFlag) {
        if (this.dyeingProcessSteps.length != 0) {
          this.dyeingProcess.updatedBy = this.commonService.getUser().userId;
          this.dyeingProcess.dyeingProcessData = this.dyeingProcessSteps;
          this.dyeingProcessService.updateDyeingProcess(this.dyeingProcess).subscribe(
            (data) => {
              if (data["success"]) {
                this.route.navigate(["/pages/dyeing-process"]);
                this.toastr.success(data["msg"]);
              }
              else this.toastr.error(data["msg"]);
            },
            (error) => {
              this.toastr.error("Internal server error");
            }
          );
        } else {
          this.toastr.error("Please enter steps");
          return;
        }
      }
    }
  }
}
