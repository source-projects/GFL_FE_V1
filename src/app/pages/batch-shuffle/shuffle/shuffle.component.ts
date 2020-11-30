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
  private pId:any;
  private qId:any;

  part1 = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  part2 = [];
  quality: any[];
  qualityParty: any[];
  bId: any;
  batches: any[];
  ngOnInit(): void {

    this.flag = 1;




    this.getPartyList();
    this.getQualtiyList();
    

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

  dropSelect1(event){
    this.pId=this.shuffleForm.controls['partyName'].value;
    this.qId=this.shuffleForm.controls['qualityName'].value;
   
    // console.log(this.pId);
    // console.log(this.qId);
  }
  getVal1(){
    this.getQualityParty();
    
    this.bId=this.shuffleForm.controls['batchName2'].value;
    console.log(this.bId);
    this.getBatches();
  }
  getVal(){
    this.getQualityParty();
    
    this.bId=this.shuffleForm.controls['batchName1'].value;
    console.log(this.bId);
    this.getBatches();
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
  hasDropDownError1() {

    if (this.shuffleForm.controls['qualityName'].invalid) {
      this.flag = 1;
      return true;
    }
    else if (this.shuffleForm.controls['qualityName'].valid && this.rval == 2) {
      this.flag = 0;
      return false;
    }
    else {

    }
  }


  getQualityParty() {
    
    this.batchByQualityPartyService.getBatchById(this.qId, this.pId).subscribe(
      
      (data) => {
        if (data["success"]) {
         
          this.qualityParty = data["data"];
          console.log(this.qualityParty);

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

  getBatches(){
    this.batchByQualityPartyService.getBatchesById(this.bId).subscribe(
      (data) => {
        if (data["success"]) {
         
          this.batches = data["data"];
          console.log(this.batches);

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
  constructor(private partyService: PartyService, private qualityService: QualityService, private toastr: ToastrService, private formBuilder: FormBuilder, private batchByQualityPartyService: BatchByQualityPartyService) {
    this.shuffleForm = this.formBuilder.group({
      partyName: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      batchName1: new FormControl(null, Validators.required),
      batchName2: new FormControl(null, Validators.required),
    });
  }


}
