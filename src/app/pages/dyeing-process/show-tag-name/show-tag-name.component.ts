import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DyeingProcessService } from '../../../@theme/services/dyeing-process.service';
import { TagCRUDObject } from '../../../@theme/model/tagName';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-show-tag-name',
  templateUrl: './show-tag-name.component.html',
  styleUrls: ['./show-tag-name.component.scss']
})
export class ShowTagNameComponent implements OnInit {

  public tagList: TagCRUDObject[] = [];
  public loading: boolean = false;
  constructor(
    private route: Router,
    private tagService: DyeingProcessService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllProcessTags();
  }

  getAllProcessTags(){
    this.tagList = [];
    this.loading = true;
    this.tagService.getAllTags().subscribe(
      result=>{
        if(result['success']){
          this.tagList = result['data'];
        }
        this.loading = false;
      }, error=>{
        this.loading = false;
      }
    )
  }

  deleteTag(index){
    this.loading = true;
    this.tagService.deleteProcessTag(this.tagList[index].id).subscribe(
      result=>{
        if(result['success']){
          this.toastr.success(result['msg']);
          this.getAllProcessTags();
        }else{
          this.toastr.error(result['msg']);
        }
        this.loading = false;
      }, error=>{
        this.loading = false;
      }
    )
  }

  addProcessTag(){
    this.route.navigate(['/pages/dyeing-process/tag/']);
  }

  tableChange(event){
    switch(event){
      case "view table": 
      this.route.navigate(['/pages/dyeing-process/view']);
      break;

      case "add process": 
      this.route.navigate(['/pages/dyeing-process/']);
      break;

      default: break;
    }
  }

}
