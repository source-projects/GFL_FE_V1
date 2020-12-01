import { Component, OnInit, ViewChild } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PartyService } from "app/@theme/services/party.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { QualityService } from 'app/@theme/services/quality.service';
import { BatchByQualityPartyService } from 'app/@theme/services/batch-by-quality-party.service';


@Component({
  selector: 'ngx-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {


  public flag = 0;
  public rval = 1;

  shuffleForm: FormGroup;

  //form Validation
  formSubmitted = false;

  //to store party info
  party: any[];
  private pId: any;

  //to store quality info
  private qId: any;
  quality: any[];

  part1 = [
    
  ];

  part2 = [];

  //to store batch info based on party and quality
  qualityParty: any[];
  bId1: any;
  bId2: any;
  batches: any[];



  constructor(private partyService: PartyService, private qualityService: QualityService, private toastr: ToastrService, private formBuilder: FormBuilder, private batchByQualityPartyService: BatchByQualityPartyService) {
    this.shuffleForm = this.formBuilder.group({
      partyName: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      batchName1: new FormControl(null, Validators.required),
      batchName2: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {

    this.flag = 1;
    this.getPartyList();
    this.getQualtiyList();

  }

  //party drop down validation
  hasDropDownError() {

    if (this.shuffleForm.controls['partyName'].invalid) {
      this.flag = 1;
      return true;
    }
    else if (this.shuffleForm.controls['partyName'].valid && this.rval == 2) {
      this.flag = 0;
      return false;
    }


  }

  //quality drop down validation
  hasDropDownError1() {

    if (this.shuffleForm.controls['qualityName'].invalid) {
      this.flag = 1;
      return true;
    }
    else if (this.shuffleForm.controls['qualityName'].valid && this.rval == 2) {
      this.flag = 0;
      return false;
    }

  }

  getPartyList() {
    this.partyService.getAllPartyList(0, "all").subscribe(
      (data) => {
        if (data["success"]) {
          this.party = data["data"];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }

  getQualtiyList() {
    this.qualityService.getallQuality(0, "all").subscribe(
      (data) => {
        if (data["success"]) {
          this.quality = data["data"];

        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }




  //get party and qulaity Id
  dropSelect(event) {

    this.pId = this.shuffleForm.controls['partyName'].value;
    this.qId = this.shuffleForm.controls['qualityName'].value;
  }


  //raido select for split and merge
  onChange(event) {
    this.formSubmitted = true;
    switch (event) {

      case 1:
        this.rval = 1;
        this.flag = 1;
        break;

      case 2:
        this.rval = 2;
        if (this.shuffleForm.controls['partyName'].invalid && this.shuffleForm.controls['qualityName'].invalid) {
          this.flag = 1;
        }

        else {
          this.flag = 0;
        }
        break;
    }
  }

  getQualityParty() {

    this.batchByQualityPartyService.getBatchById(this.qId, this.pId).subscribe(

      (data) => {
        if (data["success"]) {
          this.qualityParty = data["data"];
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
  }


  //get list of batches based on partId and batchId
  getVal() {
    this.getQualityParty();   
  }

  // get list of all batches(meter-weight) inside selected batch
  temp() {
    this.bId1 = this.shuffleForm.controls['batchName1'].value;
    this.getBatches(this.bId1);
  }
  temp1() {
    this.bId2 = this.shuffleForm.controls['batchName2'].value;
    this.getBatches(this.bId2);
  }


  getBatches(currentbId) {

    if(this.shuffleForm.controls['batchName1'].valid && this.rval==1){

        this.batchByQualityPartyService.getBatchesById(currentbId).subscribe(
      (data) => {
        if (data["success"]) {
          this.batches = data["data"];
          //console.log(this.batches);
        }
        else {
          this.toastr.error(data['msg'])
        }
      },
      (error) => {
        this.toastr.error(errorData.Serever_Error)
      }
    );
    }

    else if( this.rval==2){
      
      if(this.shuffleForm.controls['batchName2'].valid){
      this.batchByQualityPartyService.getBatchesById(currentbId).subscribe(
        (data) => {
          if (data["success"]) {
            this.part2 = data["data"];
            //console.log(this.part2);
          }
          else {
            this.toastr.error(data['msg'])
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }
    if(this.shuffleForm.controls['batchName1'].valid){
      this.batchByQualityPartyService.getBatchesById(currentbId).subscribe(
        (data) => {
          if (data["success"]) {
            this.batches = data["data"];
            //console.log(this.batches);
          }
          else {
            this.toastr.error(data['msg'])
          }
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }

    }
  }


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

}
