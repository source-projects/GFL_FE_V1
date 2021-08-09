import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from '../../../@theme/services/common.service';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { CommonGuard } from '../../../@theme/guards/common.guard';
import { MergeBatchService } from '../../../@theme/services/merge-batch.service';

@Component({
  selector: 'ngx-view-merge-batch',
  templateUrl: './view-merge-batch.component.html',
  styleUrls: ['./view-merge-batch.component.scss']
})
export class ViewMergeBatchComponent implements OnInit, OnDestroy {

  mergeList = [];
  tableStyle = "bootstrap";
  loading = false;
  mergeListCopy = [];
  hiddenAdd: boolean = true;
  hiddenEdit: boolean = true;
  hiddenDelete: boolean = true;

  public destroy$ : Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private toastr: ToastrService,
    private mergeBatchService: MergeBatchService,
    private modalService : NgbModal,
    private commonGuard : CommonGuard,
    private commonService:CommonService


  ) { }

  ngOnInit(): void {
    this.getAccess();

    this.getAllMergeBatch();
    
  }

  getAccess() {
    if (this.commonService.accessRights("add","mergeBatch")) {
      this.hiddenAdd = false;
    }
    if (this.commonService.accessRights("delete","mergeBatch")) {
      this.hiddenDelete = false;
    }
    if (this.commonService.accessRights("edit","mergeBatch")) {
      this.hiddenEdit = false;
    }
  }

  filter(value: any) {
    const val = value.toString().toLowerCase().trim();
    const keys = Object.keys(this.mergeListCopy[0]);
    this.mergeList = this.mergeListCopy.filter((item) => {
      for (let i = 0; i < keys.length; i++) {
        if (
          (item[keys[i]] &&
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) ||
          !val
        ) {
          return true;
        }
      }
    });
  }

  getAllMergeBatch(){
    this.loading = true;

    this.mergeBatchService.getAllMergeBatch().pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data["success"]){
          this.mergeList = data["data"];
          this.mergeListCopy = this.mergeList.map((element) => ({
            batchId: element.batchId,
            mergeBatchId: element.mergeBatchId,
            partyName: element.partyName,
            qualityName: element.qualityName,
            totalMtr: element.totalMtr,
            totalWt : element.totalWt
          }));
          this.loading = false;

        }
        this.loading=false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }

  

  deleteMergeBatch(id){
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      size: "sm",
    });
    modalRef.result.then((result) => {
    if(result){

    this.mergeBatchService.deleteMergeBatch(id).pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if(data["success"]){
          this.toastr.success(data["msg"]);
          this.getAllMergeBatch();

        }else{
          this.toastr.error(data["msg"]);

        }
      },
      (error) => {

      }
    )
  }

  })

}

}
