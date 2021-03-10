import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
    selector: 'btn-cell-renderer',
    template: `
      <nb-icon status="primary" [options]="{animation:{type:'zoom'}}" icon="edit" [routerLink]="['/pages/party/edit',this.rowId]"></nb-icon>&nbsp;&nbsp;
      <nb-icon status="danger" [options]="{animation:{type:'zoom'}}" icon="trash"  (click)="onClick($event)"></nb-icon>
    `
  })
  export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    params: any;
    label: string;
    rowId:any;

    agInit(params: any): void {
      this.params = params;
      this.label = this.params.label || null;
      this.rowId = this.params.node.data.id;
    }

    onClick($event) {
      if (this.params.onClick instanceof Function) {
        // put anything into params u want pass into parents component
        const params = {
          event: $event,
          rowData: this.params.node.data,
          label:this.label
          // ...something
        }
        this.params.onClick(params);
  
      }
    }
  
    ngOnDestroy() {
    }
    
    refresh(params?: any): boolean {
      return false;
    }
  }