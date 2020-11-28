import { Component, OnInit, ViewChild } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartyService } from "app/@theme/services/party.service";
import * as errorData from 'app/@theme/json/error.json';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'ngx-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.scss']
})
export class ShuffleComponent implements OnInit {

//public errorData: any = (this.errorData as any).default;

public flag=0;
  shuffleForm: FormGroup;
  //form Validation
  formSubmitted = false;
//to store party info
party: any[];


  part1 = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  part2 = [

  ];
  ngOnInit(): void {
    this.shuffleForm = new FormGroup({
      partyName: new FormControl(null, [Validators.pattern(/^[a-zA-Z ]*$/), Validators.required]),
      qualityName: new FormControl(null, Validators.required),
      batchName1: new FormControl(null, Validators.required),
      batchName2: new FormControl(null, Validators.required),
    });
    this.shuffleForm.controls['batchName2'].disable();
    this.flag=1;

   this.getPartyList();

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


    switch (event) {

      case 1:
        console.log("1");
        this.flag=1;
        this.shuffleForm.controls['batchName2'].disable();
        break;

      case 2:
        console.log("2");
        this.flag=0;

        this.shuffleForm.controls['batchName2'].enable();
        break;


    }
  }

  getPartyList() {
    this.partyService.getAllPartyList(0,"all").subscribe(
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
  constructor(private partyService: PartyService,private toastr: ToastrService) { }

  
}
