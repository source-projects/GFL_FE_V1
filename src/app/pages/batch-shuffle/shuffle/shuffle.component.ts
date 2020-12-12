import { Component, OnInit, ViewChild } from '@angular/core';
import { NbButtonModule, NbCardModule, NbWindowService } from '@nebular/theme';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PartyService } from "app/@theme/services/party.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';
import { QualityService } from 'app/@theme/services/quality.service';
import { BatchByQualityPartyService } from 'app/@theme/services/batch-by-quality-party.service';
import { Router } from '@angular/router';
import { ShuffleService } from "app/@theme/services/shuffle.service";
import { BatchListService } from "app/@theme/services/batch-list.service";

@Component({
  selector: 'ngx-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {


  public flag = 0;
  public rval = 1;
  public btnFlag = 0;
  public setBatchFlag = 0;
  shuffleForm: FormGroup;

  //form Validation
  formSubmitted = false;

  //to store party info
  party: any[];
  private pId: any;

  //to store quality info
  private qId: any;
  quality: any[];

  part1 = [];

  part2 = [];
  updateFlag = 0;
  //to store batch info based on party and quality
  qualityParty: any[];
  qualityParty2 = [];
  qualityPartyLeft = [];
  bId1 = [];
  bId2 = [];
  batches: any[];
  i: number;
  sum = 0;
  batchDataList = [];
  mergeArray = [];
  objectOfBatch1 = {};
  objectOfBatch2 = {};
  cId1: any;
  cId2: any;
  batchId1: any;
  batchId2: any;
  index: number;

  constructor(private partyService: PartyService, private shuffleService: ShuffleService, private qualityService: QualityService, private toastr: ToastrService, private formBuilder: FormBuilder, private route: Router, private batchByQualityPartyService: BatchByQualityPartyService, private batchList: BatchListService) {
    this.shuffleForm = this.formBuilder.group({
      partyName: new FormControl(null, Validators.required),
      qualityName: new FormControl(null, Validators.required),
      batchName1: new FormControl(null, Validators.required),
      batchName2: new FormControl(null, Validators.required),
      totalmtr1: new FormControl(),
      totalmtr2: new FormControl(),
      totalwt1: new FormControl(),
      totalwt2: new FormControl(),
      updatedBy: new FormControl(null),

    });
  }

  ngOnInit(): void {

    this.flag = 1;
    this.getPartyList();
    this.getQualtiyList();
    this.btnFlag = 0;

  }

  //party drop down validation
  hasDropDownError() {

    if (this.shuffleForm.controls['partyName'].invalid && this.shuffleForm.controls['partyName'].touched) {
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

    if (this.shuffleForm.controls['qualityName'].invalid && this.shuffleForm.controls['qualityName'].touched) {
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
    this.formSubmitted = true;
    this.pId = this.shuffleForm.controls['partyName'].value;
    this.qId = this.shuffleForm.controls['qualityName'].value;


    if (this.shuffleForm.controls['partyName'].value == null || this.shuffleForm.controls['qualityName'].value == null) {

      this.shuffleForm.controls['batchName1'].reset();
      this.shuffleForm.controls['batchName2'].reset();

      this.batches = [];
      this.part1 = [];
      this.part2 = [];
      this.qualityParty = [];
      this.qualityParty2 = [];
      this.qualityParty2[0] = [];

    }

    if (this.shuffleForm.controls['partyName'].valid && this.shuffleForm.controls['qualityName'].valid) {
      this.getVal();
    }


  }


  //raido select for split and merge
  onChange(event) {
    this.formSubmitted = true;
    switch (event) {

      case 1:
        this.rval = 1;
        this.flag = 1;
        this.btnFlag = 0;
        this.part2 = [];
        this.qualityParty2 = [];
        break;

      case 2:
        this.rval = 2;
        this.btnFlag = 1;
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

          //to avoid merging of same batches 
          if (this.shuffleForm.controls['batchName1'].valid) {
            this.index = this.qualityParty.findIndex(x => x.batchId === this.bId1['batchId']);
            this.qualityParty2 = [];
            this.qualityParty2.push(this.qualityParty);
            this.qualityParty2[0].splice(this.index, 1);

            //console.log(this.qualityParty2);
          }


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

    if (this.shuffleForm.controls['qualityName'].value == null) {
      this.toastr.error("Please select a Quality");
    }

    else if (this.shuffleForm.controls['partyName'].value == null) {
      this.toastr.error("Please select a Party");
    }
    else {

      this.getQualityParty();

    }
  }
  findmtrsum() {

    this.sum = 0;
    for (this.i = 0; this.i <= this.batches.length - 1; this.i++) {

      this.sum += this.batches[this.i].mtr;
      this.shuffleForm.patchValue({ totalmtr1: this.sum });
    }
    if (this.batches.length == 0) {
      this.shuffleForm.patchValue({ totalmtr1: this.sum });
    }
    this.sum = 0;
    for (this.i = 0; this.i <= this.part2.length - 1; this.i++) {

      this.sum += this.part2[this.i].mtr;
      this.shuffleForm.patchValue({ totalmtr2: this.sum });
    }
    if (this.part2.length == 0) {
      this.shuffleForm.patchValue({ totalmtr2: this.sum });
    }


  }
  findwtsum() {
    this.sum = 0;
    for (this.i = 0; this.i <= this.batches.length - 1; this.i++) {

      this.sum += this.batches[this.i].wt;
      this.shuffleForm.patchValue({ totalwt1: this.sum });
    }
    if (this.batches.length == 0) {
      this.shuffleForm.patchValue({ totalwt1: this.sum });
    }
    this.sum = 0;
    for (this.i = 0; this.i <= this.part2.length - 1; this.i++) {

      this.sum += this.part2[this.i].wt;
      this.shuffleForm.patchValue({ totalwt2: this.sum });
    }
    if (this.part2.length == 0) {
      this.shuffleForm.patchValue({ totalwt2: this.sum });
    }

  }
  // get list of all batches(meter-weight) inside selected batch based on control Id and batch Id
  temp() {
    this.bId1 = this.shuffleForm.controls['batchName1'].value;


    if (this.shuffleForm.controls['batchName1'].value == null) {
      this.shuffleForm.controls['batchName2'].reset();
      this.part2 = [];
      this.qualityParty2 = [];
      this.batches = [];
    }

    this.cId1 = this.bId1["controlId"];
    this.batchId1 = this.bId1["batchId"];


    this.getBatches(this.cId1, this.batchId1);


    // if(this.bId1){
    //  this.findmtrsum();
    //  console.log("www");
    //  this.findwtsum();
    // }
  }
  temp1() {
    this.bId2 = this.shuffleForm.controls['batchName2'].value;

    if (this.shuffleForm.controls['batchName2'].value == null) {
      this.part2 = [];
      //this.qualityParty2 = [];
    }

    this.cId2 = this.bId2["controlId"];
    this.batchId2 = this.bId2["batchId"];
    this.getBatches1(this.cId2, this.batchId2);
    //this.setBatchFlag = 1;
  }


  getBatches(currentCId, currentbId) {

    if (this.shuffleForm.controls['batchName1'].valid && this.rval == 1) {

      this.batchList.getBatchById(currentCId, currentbId).subscribe(
        (data) => {
          if (data["success"]) {
            this.batches = data["data"];
          }
          else {
            this.toastr.error(data['msg'])
          }
          this.setBatchFlag = 1;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }

    else if (this.rval == 2) {

      // if (this.shuffleForm.controls['batchName2'].valid) {
      //   this.batchList.getBatchById(currentCId, currentbId).subscribe(
      //     (data) => {
      //       if (data["success"]) {
      //         this.part2 = data["data"];
      //       }
      //       else {
      //         this.toastr.error(data['msg'])
      //       }

      //     },
      //     (error) => {
      //       this.toastr.error(errorData.Serever_Error)
      //     }
      //   );
      // }
      // if (this.shuffleForm.controls['batchName1'].valid && this.setBatchFlag == 0) {
      if (this.shuffleForm.controls['batchName1'].valid) {

        this.setBatchFlag = 1;
        this.batchList.getBatchById(currentCId, currentbId).subscribe(
          (data) => {
            if (data["success"]) {
              this.batches = data["data"];
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


  getBatches1(currentCId, currentbId) {

    if (this.shuffleForm.controls['batchName1'].valid && this.rval == 1) {

      this.batchList.getBatchById(currentCId, currentbId).subscribe(
        (data) => {
          if (data["success"]) {
            this.batches = data["data"];
          }
          else {
            this.toastr.error(data['msg'])
          }
          this.setBatchFlag = 1;
        },
        (error) => {
          this.toastr.error(errorData.Serever_Error)
        }
      );
    }

    else if (this.rval == 2) {

      if (this.shuffleForm.controls['batchName2'].valid) {
        this.batchList.getBatchById(currentCId, currentbId).subscribe(
          (data) => {
            if (data["success"]) {
              this.part2 = data["data"];
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
      // if (this.shuffleForm.controls['batchName1'].valid && this.setBatchFlag == 0) {
      //   this.setBatchFlag = 1;
      //   this.batchList.getBatchById(currentCId, currentbId).subscribe(
      //     (data) => {
      //       if (data["success"]) {
      //         this.batches = data["data"];
      //       }
      //       else {
      //         this.toastr.error(data['msg'])
      //       }
      //     },
      //     (error) => {
      //       this.toastr.error(errorData.Serever_Error)
      //     }
      //   );
      // }

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
    this.updateFlag = 1;
    this.findmtrsum();

    this.findwtsum();
  }


  splitsubmit() {
    if (this.part2.length == 0 || this.batches.length == 0) {
      alert("No batch was splitted");

    }


    else {
      this.formSubmitted = true;
      //this.shuffleForm.value.updatedBy = this.batches;
      if (this.shuffleForm.controls['partyName'].valid && this.shuffleForm.controls['qualityName'].valid && this.shuffleForm.controls['batchName1'].valid) {

        this.objectOfBatch1 = {
          "batchDataList": this.batches,
          "batchId": this.batchId1,
          "controlId": this.cId1
        };

        this.objectOfBatch2 = {
          "batchDataList": this.part2,
          "batchId": this.batchId1.concat("_Split_Part2"),
          "controlId": this.cId1
        };

        this.mergeArray.push(this.objectOfBatch1);
        this.mergeArray.push(this.objectOfBatch2);
        this.shuffleService.updateBatchMerge(this.mergeArray).subscribe(
          (data) => {

            if (data["success"]) {
              this.route.navigate(["/pages"]);
              this.toastr.success(errorData.Update_Success)
            }
            else {
              this.toastr.error(errorData.Update_Error)
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );

      }

      else {
        alert("Please fill all the required fields");
      }
    }

  }

  mergesubmit() {
    if (this.updateFlag == 0) {
      alert("No batch was choosen to merge");

    }
    else if (this.shuffleForm.controls['batchName1'].value == this.shuffleForm.controls['batchName2'].value) {
      alert("Cannot merge same batch");
    }
    else {
      this.formSubmitted = true;

      // this.shuffleForm.value.updatedBy = this.batches;
      if (this.shuffleForm.controls['partyName'].valid && this.shuffleForm.controls['qualityName'].valid && this.shuffleForm.controls['batchName1'].valid && this.shuffleForm.controls['batchName2'].valid) {


        this.objectOfBatch1 = {
          "batchDataList": this.batches,
          "batchId": this.batchId1,
          "controlId": this.cId1
        };

        this.objectOfBatch2 = {
          "batchDataList": this.part2,
          "batchId": this.batchId2,
          "controlId": this.cId2
        };

        this.mergeArray.push(this.objectOfBatch1);
        this.mergeArray.push(this.objectOfBatch2);
        this.shuffleService.updateBatchMerge(this.mergeArray).subscribe(
          (data) => {

            if (data["success"]) {
              this.route.navigate(["/pages"]);
              this.toastr.success(errorData.Update_Success)
            }
            else {
              this.toastr.error(errorData.Update_Error)
            }
          },
          (error) => {
            this.toastr.error(errorData.Serever_Error)
          }
        );
      }
      else {
        alert("Please fill all the required fields");

      }
    }


  }


}
