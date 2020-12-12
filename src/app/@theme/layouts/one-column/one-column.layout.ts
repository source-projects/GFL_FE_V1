import { Component } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { LayoutService } from 'app/@core/utils';
import { threadId } from 'worker_threads';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <!-- <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer> -->
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  expandPanel: boolean;
  isTablet: boolean;
  isMobile: boolean;
  constructor(menu: NbMenuService, private layoutService: LayoutService, private sidebarService: NbSidebarService) {
    this.formatDevice();
    if (this.isMobile == true) {
      menu.onItemClick().subscribe(() => {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();
        return false;
      });
    }
  }
  formatDevice() {
    this.expandPanel = this.isTablet = this.isMobile = false;
    if (window.innerWidth >= 1024) {
      this.expandPanel = true;
    } else if (window.innerWidth >= 767) {
      this.isTablet = true;
    } else {
      this.isMobile = true;
    }
    if (window.innerWidth > window.innerHeight && window.innerWidth >= 640 && (this.isMobile || this.isTablet)) {
      this.isMobile = this.isTablet = false;
      this.expandPanel = true;
    }
  }
}

