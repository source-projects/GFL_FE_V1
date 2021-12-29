!function(){function e(e,i){for(var t=0;t<i.length;t++){var c=i[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function i(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{Aavh:function(t,c,n){"use strict";n.r(c),n.d(c,"PurchaseItemModule",(function(){return M}));var r=n("ofXK"),s=n("tyNb"),u=n("1G5W"),a=n("XNiG"),o=function e(){i(this,e),this.status=0},d=n("4/8P"),p=n("Iu6P"),l=n("2V/h"),h=n("fXoL"),m=n("5eHb"),f=n("aceb"),b=n("3Pt+"),v=n("ZOsW");function g(e,i){if(1&e&&(h.jc(0,"ng-option",18),h.jd(1),h.ic()),2&e){var t=i.$implicit;h.Hc("value",t.supplierId),h.Pb(1),h.ld(" ",t.supplierName,"")}}function j(e,i){1&e&&(h.jc(0,"div",19),h.jc(1,"span"),h.jd(2,"Supplier is required"),h.ic(),h.ic())}function y(e,i){if(1&e&&(h.jc(0,"ng-option",18),h.jd(1),h.ic()),2&e){var t=i.$implicit;h.Hc("value",t.itemId),h.Pb(1),h.ld(" ",t.itemName,"")}}function I(e,i){1&e&&(h.jc(0,"div",19),h.jc(1,"span"),h.jd(2,"Item is required"),h.ic(),h.ic())}var q,S,R,k=function(e){return{"is-invalid":e}},w=((q=function(){function t(e,c,n,r){i(this,t),this.toastr=e,this.commonService=c,this.purchaseService=n,this.supplierService=r,this.purchaseRequest=new o,this.formSubmitted=!1,this.destroy$=new a.a}var c,n,r;return c=t,(n=[{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}},{key:"ngOnInit",value:function(){this.getSupplierList()}},{key:"getSupplierList",value:function(){var e=this;this.supplierService.getItemWithSupplier().pipe(Object(u.a)(this.destroy$)).subscribe((function(i){i.success&&(e.supplierList=i.data)}),(function(e){}))}},{key:"supplierSelected",value:function(e){var i=this;this.supplierList.forEach((function(e){e.supplierId==i.purchaseRequest.supplierId&&(i.purchaseRequest.itemId=e.itemId,i.purchaseRequest.supplierName=e.supplierName,i.purchaseRequest.itemName=e.itemName)}))}},{key:"itemSelected",value:function(e){var i=this;this.supplierList.forEach((function(e){e.itemId==i.purchaseRequest.itemId&&(i.purchaseRequest.supplierId=e.supplierId,i.purchaseRequest.supplierName=e.supplierName,i.purchaseRequest.itemName=e.itemName)}))}},{key:"makeRequest",value:function(e){var i=this;if(this.formSubmitted=!0,e.valid){var t=this.commonService.getUser(),c=this.commonService.getUserHeadId();this.purchaseRequest.createdBy=t.userId,this.purchaseRequest.userHeadId=c.userHeadId,this.purchaseService.addPurchaseRequest(this.purchaseRequest).pipe(Object(u.a)(this.destroy$)).subscribe((function(e){e.success&&i.toastr.success("Item requested"),i.formSubmitted=!1,i.purchaseRequest=new o}),(function(e){i.toastr.error("Error Requesting item")}))}}}])&&e(c.prototype,n),r&&e(c,r),t}()).\u0275fac=function(e){return new(e||q)(h.dc(m.b),h.dc(d.a),h.dc(p.a),h.dc(l.a))},q.\u0275cmp=h.Xb({type:q,selectors:[["ngx-purchase-request"]],decls:33,vars:12,consts:[[1,"nb-style"],[1,"nb-header"],[1,"nb-text"],["myForm","ngForm"],[1,"row"],[1,"col-md-4"],[1,"form-group"],[1,"required"],["name","supplierId","required","","placeholder","Select Supplier",3,"ngModel","ngClass","ngModelChange","change"],["supplierId1","ngModel"],[3,"value",4,"ngFor","ngForOf"],["class","input-required display-inlineblock",4,"ngIf"],["name","itemId","required","","placeholder","Select Item",3,"ngModel","ngClass","ngModelChange","change"],["itemId1","ngModel"],[1,"col-md-12","mobile-btn-center","text-btn-right"],[1,"padding-bt-tp"],["type","button","routerLink","/pages/program",1,"btn","btn-primary","btn-sm","btn-design"],["type","button",1,"btn","btn-primary","btn-sm","btn-design",3,"click"],[3,"value"],[1,"input-required","display-inlineblock"]],template:function(e,i){if(1&e){var t=h.kc();h.jc(0,"nb-card",0),h.jc(1,"nb-card-header",1),h.jc(2,"div"),h.jc(3,"h2",2),h.jd(4,"Request Item"),h.ic(),h.ic(),h.ic(),h.jc(5,"nb-card-body"),h.jc(6,"div"),h.jc(7,"form",null,3),h.jc(9,"div",4),h.jc(10,"div",5),h.jc(11,"div",6),h.jc(12,"label",7),h.jd(13,"Supplier"),h.ic(),h.jc(14,"ng-select",8,9),h.uc("ngModelChange",(function(e){return i.purchaseRequest.supplierId=e}))("change",(function(e){return i.supplierSelected(e)})),h.hd(16,g,2,2,"ng-option",10),h.ic(),h.hd(17,j,3,0,"div",11),h.ic(),h.ic(),h.jc(18,"div",5),h.jc(19,"div",6),h.jc(20,"label",7),h.jd(21,"Item"),h.ic(),h.jc(22,"ng-select",12,13),h.uc("ngModelChange",(function(e){return i.purchaseRequest.itemId=e}))("change",(function(e){return i.itemSelected(e)})),h.hd(24,y,2,2,"ng-option",10),h.ic(),h.hd(25,I,3,0,"div",11),h.ic(),h.ic(),h.ic(),h.jc(26,"div",4),h.jc(27,"div",14),h.jc(28,"div",15),h.jc(29,"button",16),h.jd(30,"CANCEL"),h.ic(),h.jc(31,"button",17),h.uc("click",(function(){h.Xc(t);var e=h.Uc(8);return i.makeRequest(e)})),h.jd(32,"SAVE"),h.ic(),h.ic(),h.ic(),h.ic(),h.ic(),h.ic(),h.ic(),h.ic()}if(2&e){var c=h.Uc(15),n=h.Uc(23);h.Pb(14),h.Hc("ngModel",i.purchaseRequest.supplierId)("ngClass",h.Nc(8,k,c&&c.invalid)),h.Pb(2),h.Hc("ngForOf",i.supplierList),h.Pb(1),h.Hc("ngIf",i.formSubmitted&&c.invalid),h.Pb(5),h.Hc("ngModel",i.purchaseRequest.itemId)("ngClass",h.Nc(10,k,n&&n.invalid)),h.Pb(2),h.Hc("ngForOf",i.supplierList),h.Pb(1),h.Hc("ngIf",i.formSubmitted&&n.invalid)}},directives:[f.u,f.x,f.t,b.x,b.m,b.n,v.a,b.t,b.l,b.o,r.l,r.m,r.n,s.d,v.c],styles:[""]}),q),N=[{path:"",component:w},{path:"purchaseRequest",component:w}],P=((S=function e(){i(this,e)}).\u0275mod=h.bc({type:S}),S.\u0275inj=h.ac({factory:function(e){return new(e||S)},imports:[[s.g.forChild(N)],s.g]}),S),C=n("yzeJ"),H=n("vTDv"),M=((R=function e(){i(this,e)}).\u0275mod=h.bc({type:R}),R.\u0275inj=h.ac({factory:function(e){return new(e||R)},imports:[[C.a,H.a,r.c,P]]}),R)}}])}();