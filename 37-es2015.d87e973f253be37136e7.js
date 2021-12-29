(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{Aavh:function(e,t,i){"use strict";i.r(t),i.d(t,"PurchaseItemModule",(function(){return w}));var c=i("ofXK"),s=i("tyNb"),r=i("1G5W"),n=i("XNiG");class u{constructor(){this.status=0}}var d=i("4/8P"),p=i("Iu6P"),a=i("2V/h"),o=i("fXoL"),l=i("5eHb"),h=i("aceb"),m=i("3Pt+"),b=i("ZOsW");function g(e,t){if(1&e&&(o.jc(0,"ng-option",18),o.jd(1),o.ic()),2&e){const e=t.$implicit;o.Hc("value",e.supplierId),o.Pb(1),o.ld(" ",e.supplierName,"")}}function f(e,t){1&e&&(o.jc(0,"div",19),o.jc(1,"span"),o.jd(2,"Supplier is required"),o.ic(),o.ic())}function j(e,t){if(1&e&&(o.jc(0,"ng-option",18),o.jd(1),o.ic()),2&e){const e=t.$implicit;o.Hc("value",e.itemId),o.Pb(1),o.ld(" ",e.itemName,"")}}function v(e,t){1&e&&(o.jc(0,"div",19),o.jc(1,"span"),o.jd(2,"Item is required"),o.ic(),o.ic())}const I=function(e){return{"is-invalid":e}};let q=(()=>{class e{constructor(e,t,i,c){this.toastr=e,this.commonService=t,this.purchaseService=i,this.supplierService=c,this.purchaseRequest=new u,this.formSubmitted=!1,this.destroy$=new n.a}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngOnInit(){this.getSupplierList()}getSupplierList(){this.supplierService.getItemWithSupplier().pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success&&(this.supplierList=e.data)},e=>{})}supplierSelected(e){this.supplierList.forEach(e=>{e.supplierId==this.purchaseRequest.supplierId&&(this.purchaseRequest.itemId=e.itemId,this.purchaseRequest.supplierName=e.supplierName,this.purchaseRequest.itemName=e.itemName)})}itemSelected(e){this.supplierList.forEach(e=>{e.itemId==this.purchaseRequest.itemId&&(this.purchaseRequest.supplierId=e.supplierId,this.purchaseRequest.supplierName=e.supplierName,this.purchaseRequest.itemName=e.itemName)})}makeRequest(e){if(this.formSubmitted=!0,e.valid){let e=this.commonService.getUser(),t=this.commonService.getUserHeadId();this.purchaseRequest.createdBy=e.userId,this.purchaseRequest.userHeadId=t.userHeadId,this.purchaseService.addPurchaseRequest(this.purchaseRequest).pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success&&this.toastr.success("Item requested"),this.formSubmitted=!1,this.purchaseRequest=new u},e=>{this.toastr.error("Error Requesting item")})}}}return e.\u0275fac=function(t){return new(t||e)(o.dc(l.b),o.dc(d.a),o.dc(p.a),o.dc(a.a))},e.\u0275cmp=o.Xb({type:e,selectors:[["ngx-purchase-request"]],decls:33,vars:12,consts:[[1,"nb-style"],[1,"nb-header"],[1,"nb-text"],["myForm","ngForm"],[1,"row"],[1,"col-md-4"],[1,"form-group"],[1,"required"],["name","supplierId","required","","placeholder","Select Supplier",3,"ngModel","ngClass","ngModelChange","change"],["supplierId1","ngModel"],[3,"value",4,"ngFor","ngForOf"],["class","input-required display-inlineblock",4,"ngIf"],["name","itemId","required","","placeholder","Select Item",3,"ngModel","ngClass","ngModelChange","change"],["itemId1","ngModel"],[1,"col-md-12","mobile-btn-center","text-btn-right"],[1,"padding-bt-tp"],["type","button","routerLink","/pages/program",1,"btn","btn-primary","btn-sm","btn-design"],["type","button",1,"btn","btn-primary","btn-sm","btn-design",3,"click"],[3,"value"],[1,"input-required","display-inlineblock"]],template:function(e,t){if(1&e){const e=o.kc();o.jc(0,"nb-card",0),o.jc(1,"nb-card-header",1),o.jc(2,"div"),o.jc(3,"h2",2),o.jd(4,"Request Item"),o.ic(),o.ic(),o.ic(),o.jc(5,"nb-card-body"),o.jc(6,"div"),o.jc(7,"form",null,3),o.jc(9,"div",4),o.jc(10,"div",5),o.jc(11,"div",6),o.jc(12,"label",7),o.jd(13,"Supplier"),o.ic(),o.jc(14,"ng-select",8,9),o.uc("ngModelChange",(function(e){return t.purchaseRequest.supplierId=e}))("change",(function(e){return t.supplierSelected(e)})),o.hd(16,g,2,2,"ng-option",10),o.ic(),o.hd(17,f,3,0,"div",11),o.ic(),o.ic(),o.jc(18,"div",5),o.jc(19,"div",6),o.jc(20,"label",7),o.jd(21,"Item"),o.ic(),o.jc(22,"ng-select",12,13),o.uc("ngModelChange",(function(e){return t.purchaseRequest.itemId=e}))("change",(function(e){return t.itemSelected(e)})),o.hd(24,j,2,2,"ng-option",10),o.ic(),o.hd(25,v,3,0,"div",11),o.ic(),o.ic(),o.ic(),o.jc(26,"div",4),o.jc(27,"div",14),o.jc(28,"div",15),o.jc(29,"button",16),o.jd(30,"CANCEL"),o.ic(),o.jc(31,"button",17),o.uc("click",(function(){o.Xc(e);const i=o.Uc(8);return t.makeRequest(i)})),o.jd(32,"SAVE"),o.ic(),o.ic(),o.ic(),o.ic(),o.ic(),o.ic(),o.ic(),o.ic()}if(2&e){const e=o.Uc(15),i=o.Uc(23);o.Pb(14),o.Hc("ngModel",t.purchaseRequest.supplierId)("ngClass",o.Nc(8,I,e&&e.invalid)),o.Pb(2),o.Hc("ngForOf",t.supplierList),o.Pb(1),o.Hc("ngIf",t.formSubmitted&&e.invalid),o.Pb(5),o.Hc("ngModel",t.purchaseRequest.itemId)("ngClass",o.Nc(10,I,i&&i.invalid)),o.Pb(2),o.Hc("ngForOf",t.supplierList),o.Pb(1),o.Hc("ngIf",t.formSubmitted&&i.invalid)}},directives:[h.u,h.x,h.t,m.x,m.m,m.n,b.a,m.t,m.l,m.o,c.l,c.m,c.n,s.d,b.c],styles:[""]}),e})();const S=[{path:"",component:q},{path:"purchaseRequest",component:q}];let y=(()=>{class e{}return e.\u0275mod=o.bc({type:e}),e.\u0275inj=o.ac({factory:function(t){return new(t||e)},imports:[[s.g.forChild(S)],s.g]}),e})();var R=i("yzeJ"),N=i("vTDv");let w=(()=>{class e{}return e.\u0275mod=o.bc({type:e}),e.\u0275inj=o.ac({factory:function(t){return new(t||e)},imports:[[R.a,N.a,c.c,y]]}),e})()}}]);