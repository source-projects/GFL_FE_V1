import { Component, OnInit } from '@angular/core';
import { ColorService } from 'app/@theme/services/color.service';
import { SupplierService } from 'app/@theme/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import * as errorData from "app/@theme/json/error.json";
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-issue-color-box',
  templateUrl: './issue-color-box.component.html',
  styleUrls: ['./issue-color-box.component.scss']
})
export class IssueColorBoxComponent implements OnInit {

  supplierList:any[]=[];
  colorBoxList:any[]=[];
  loading = false;
  formSubmitted: boolean = false;
  box:any;
  item:any;

  constructor(
    private supplierService :SupplierService,
    private colorService : ColorService,
    private toastr: ToastrService,
    private route: Router,


  ) { }

  ngOnInit(): void {
    this.getSupplierWithItem();
  }

  getSupplierWithItem(){
    this.supplierService.getItemWithSupplier().subscribe(
      (data) => {
        if (data["success"]) {
          this.supplierList = data["data"];
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

  itemSelected(event){
    this.colorService.getColorBox(event).subscribe(
      (data) => {
        if (data["success"]) {
          this.colorBoxList = data["data"];
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

issueBox(form){
  this.colorService.issueBox(form.value.boxNo).subscribe(
    (data) => {
      if (data["success"]) {
        this.toastr.success(errorData.Add_Success);
        this.route.navigate(["/pages/issue-color-box"]);

      }
      else {
        this.toastr.error(data['msg']);
       //this.getJetData();
        //this.getshade();
      }

    }
  )
}

}
