import { Component, OnInit } from '@angular/core';
import { ColorGuard } from 'app/@theme/guards/color.guard';
import { PartyGuard } from 'app/@theme/guards/party.guard';
import { ProgramGuard } from 'app/@theme/guards/program.guard';
import { QualityGuard } from 'app/@theme/guards/quality.guard';
import { ShadeGuard } from 'app/@theme/guards/shade.guard';
import { StockBatchGuard } from 'app/@theme/guards/stock-batch.guard';
import { SupplierGuard } from 'app/@theme/guards/supplier.guard';
import { UserGuard } from 'app/@theme/guards/user.guard';
import { MENU_ITEMS } from './pages-menu';
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{
  menu = MENU_ITEMS;
  view:Boolean=true;
  view_all:Boolean=true;
  view_group:Boolean=true;
  constructor(
    public partyGuard: PartyGuard , 
    public qualityGuard: QualityGuard,
    public userGuard: UserGuard,
    public supplierGuard: SupplierGuard , 
    public colorGuard: ColorGuard,
    public shadeGuard: ShadeGuard,
    public stockBatchGuard: StockBatchGuard,
    public programGuard: ProgramGuard,
    
    ){}
  ngOnInit(): void {


    this.menu.forEach(e=>{
      switch (e.title) {
        case 'Party':
        this.view=this.partyGuard.accessRights('view');
        this.view_all=this.partyGuard.accessRights('view all');
        this.view_group=this.partyGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

        case 'Quality':
        this.view=this.qualityGuard.accessRights('view');
        this.view_all=this.qualityGuard.accessRights('view all');
        this.view_group=this.qualityGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

        case 'User':
        this.view=this.userGuard.accessRights('view');
        this.view_all=this.userGuard.accessRights('view all');
        this.view_group=this.userGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

        case 'Color':
        this.view=this.colorGuard.accessRights('view');
        this.view_all=this.colorGuard.accessRights('view all');
        this.view_group=this.colorGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

        case 'Program':
        this.view=this.programGuard.accessRights('view');
        this.view_all=this.programGuard.accessRights('view all');
        this.view_group=this.programGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

         case 'Stock-batch':
        this.view=this.stockBatchGuard.accessRights('view');
        this.view_all=this.stockBatchGuard.accessRights('view all');
        this.view_group=this.stockBatchGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

            case 'Shade':
        this.view=this.shadeGuard.accessRights('view');
        this.view_all=this.shadeGuard.accessRights('view all');
        this.view_group=this.shadeGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;

            case 'Supplier':
        this.view=this.supplierGuard.accessRights('view');
        this.view_all=this.supplierGuard.accessRights('view all');
        this.view_group=this.supplierGuard.accessRights('view group');
            if(this.view == false && this.view_all==false && this.view_group==false){
              e.hidden=true;
            }
            break;   
    }
    })
  }
}
