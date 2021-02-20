import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../../@theme/services/color.service';
import { SupplierService } from '../../../@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from "../../../@theme/json/error.json";
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-issue-color-box',
  templateUrl: './issue-color-box.component.html',
  styleUrls: ['./issue-color-box.component.scss']
})
export class IssueColorBoxComponent implements OnInit {

  itemList:any[]=[];
  colorBoxList:any[]=[];
  allBoxList = [];
  allBoxList1 = [];

  loading = false;
  formSubmitted: boolean = false;
  box:any;
  item:any;
  notIssued = false;
  consolidated = false;
  list = [];
  constructor(
    private supplierService :SupplierService,
    private colorService : ColorService,
    private toastr: ToastrService,
    private route: Router,


  ) { }

  ngOnInit(): void {
    this.getSupplierItemWithAvailableStock();
    this.getAllBox();
  }

  getSupplierItemWithAvailableStock(){
    this.supplierService.getItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.itemList = data["data"];
          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        // this.toastr.error(errorData.Serever_Error);
        this.loading = false;
      }
    );


  }
  getAllBox(){
    this.colorService.getAllBoxes().subscribe(
      (data) => {
        if (data["success"]) {
          this.allBoxList = data["data"];
          this.allBoxList1 = this.allBoxList;

          this.loading = false;
        } else {
          // this.toastr.error(data["msg"]);
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;

      }
    )
  }
  itemSelected(event){
    this.allBoxList = this.allBoxList1;

    let list1 = [];
    console.log(event);
    if(event){
      this.box = null;
      this.colorService.getColorBox(event , false).subscribe(
        (data) => {
          if (data["success"]) {
            this.colorBoxList = data["data"];
            this.loading = false;
          } else {
            this.colorBoxList = [];
            // this.toastr.error(data["msg"]);
            this.loading = false;
          }
        },
        (error) => {
          // this.toastr.error(errorData.Serever_Error);
          this.loading = false;
        }
      );

      this.allBoxList.forEach(element => {
        if(element.itemId == event){
          list1.push(element);
        }
      })
      this.allBoxList = list1;
    }else{
      this.allBoxList = this.allBoxList1;

    }
    

    
  }

  issuedSelected(event){
    console.log(event);
    // let list = [];
    if(event){
      this.notIssued = true;
      this.allBoxList.forEach(element => {
        if(!element.issued){
          this.list.push(element);
        }
      })
      this.allBoxList = this.list;

    }else{
      this.notIssued = false;
      this.allBoxList = this.allBoxList1;
    }
  }

  consoSelected(event){
    console.log(event);

    if(event){
      this.consolidated = true;

    }else{
      this.consolidated = false;

    }
  }

issueBox(form){
  this.colorService.issueBox(form.value.boxNo).subscribe(
    (data) => {
      if (data["success"]) {
        this.toastr.success(errorData.Add_Success);
        this.route.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.route.navigate(["/pages/issue-color-box"]);

      }); 
      }
      else {
        this.toastr.error(data['msg']);
      }
    }
  )
}

onCancel(){
  this.box = null;
  this.item = null;
}

}
