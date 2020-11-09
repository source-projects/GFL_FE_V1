import { HttpInterceptor } from '@angular/common/http';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, HttpInterceptor {

  constructor(private analytics: AnalyticsService, private seoService: SeoService) {
  }

  getToken(){
    return localStorage.getItem('token')
  }

  intercept(req, next)
  {
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer xx.yy.zz`
      }
    })
    return next.handle(tokenizedReq)
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
