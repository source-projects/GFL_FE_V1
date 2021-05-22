import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../@theme/services/common.service';
import { ConfirmationDialogComponent } from '../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { MergeBatchService } from '../../../@theme/services/merge-batch.service';
import { MergeBatchGuard } from '../../../@theme/guards/merge-batch.guard';

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
    private mergeBatchGuard : MergeBatchGuard,


  ) { }

  ngOnInit(): void {
    this.getAccess();

    this.getAllMergeBatch();
    
  }

  getAccess() {
    if (this.mergeBatchGuard.accessRights("add")) {
      this.hiddenAdd = false;
    }
    if (this.mergeBatchGuard.accessRights("delete")) {
      this.hiddenDelete = false;
    }
    if (this.mergeBatchGuard.accessRights("edit")) {
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
