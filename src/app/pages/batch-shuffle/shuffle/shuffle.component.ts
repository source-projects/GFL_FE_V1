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
  public btnFlag=0;
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
  i: number;
  sum=0;



  constructor(private partyService: PartyService, private qualityService: QualityService, private toastr: ToastrService, private formBuilder: FormBuilder, private batchByQualityPartyService: BatchByQualityPartyService) {
    this.shuffleForm = this.formBuilder.group({
      partyName: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      batchName1: new FormControl(null, Validators.required),
      batchName2: new FormControl(null, Validators.required),
      totalmtr1:new FormControl(),
      totalmtr2:new FormControl(),
      totalwt1:new FormControl(),
      totalwt2:new FormControl(),

    });
  }

  ngOnInit(): void {

    this.flag = 1;
    this.getPartyList();
    this.getQualtiyList();
    this.btnFlag=0;

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
        this.btnFlag=0;
        break;

      case 2:
        this.rval = 2;
        this.btnFlag=1;
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
  findmtrsum(){
    console.log("ssss"+this.batches.length);
    this.sum=0;
    for(this.i=0;this.i<=this.batches.length-1;this.i++){

      this.sum+=this.batches[this.i].mtr;
      console.log(this.sum);
      this.shuffleForm.patchValue({totalmtr1:this.sum});
     }
     this.sum=0;
     for(this.i=0;this.i<=this.part2.length-1;this.i++){

      this.sum+=this.part2[this.i].mtr;
      console.log(this.sum);
      this.shuffleForm.patchValue({totalmtr2:this.sum});
     }


     
  }
  findwtsum(){
    console.log("weight"+this.batches.length);
    this.sum=0;
    for(this.i=0;this.i<=this.batches.length-1;this.i++){

      this.sum+=this.batches[this.i].wt;
      console.log(this.sum);
      this.shuffleForm.patchValue({totalwt1:this.sum});
     }
     this.sum=0;
     console.log("rrr"+this.part2.values);
     for(this.i=0;this.i<=this.part2.length-1;this.i++){

      this.sum+=this.part2[this.i].wt;
      console.log(this.sum);
      this.shuffleForm.patchValue({totalwt2:this.sum});
     }
    
     
  }
  // get list of all batches(meter-weight) inside selected batch
  temp() {
    this.bId1 = this.shuffleForm.controls['batchName1'].value;
    this.getBatches(this.bId1);
    //this.findmtrsum();
    // if(this.batches.length>0){
    //  this.findmtrsum();
    // }
  }
  temp1() {
    this.bId2 = this.shuffleForm.controls['batchName2'].value;
    this.getBatches(this.bId2);
    // this.findmtrsum();
  }


  getBatches(currentbId) {

    if(this.shuffleForm.controls['batchName1'].valid && this.rval==1){

        this.batchByQualityPartyService.getBatchesById(currentbId).subscribe(
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

    this.findmtrsum();
    console.log("vapsi");
    this.findwtsum();
  }

  
  splitsubmit(){
    if (this.part2.length==0){
      alert("No batch was splitted");
        //console.log("e");
    }
    
  }

  mergesubmit(){
    if (this.part2.length==0){
      alert("No batch was choosen to merge");
        //console.log("e");
    }
  }

}
