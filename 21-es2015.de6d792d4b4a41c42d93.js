(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"TM+G":function(e,t,i){"use strict";i.r(t),i.d(t,"PurchaseModule",(function(){return me}));var c=i("ofXK"),n=i("tyNb"),a=i("APWn"),r=i("1G5W"),d=i("XNiG"),s=i("4/8P");class o{constructor(){this.checked=!1}}var l=i("1Z9c"),h=i("+TCe"),p=i("bidh"),u=i("O1SP"),m=i("tk/3"),g=i("fXoL"),v=i("5eHb"),b=i("X9o6"),f=i("qC+V"),j=i("aceb"),y=i("ZOsW"),U=i("3Pt+"),I=i("K1R0"),S=i("Vwsh");function C(e,t){1&e&&(g.jc(0,"div"),g.jc(1,"h2",43),g.jd(2,"Add Purchase"),g.ic(),g.ic())}function P(e,t){1&e&&(g.jc(0,"h2",43),g.jd(1,"Update Purchase"),g.ic())}function A(e,t){if(1&e&&(g.jc(0,"ng-option",44),g.jc(1,"div",4),g.jc(2,"div",18),g.jc(3,"div",19),g.jd(4),g.ic(),g.ic(),g.ic(),g.ic()),2&e){const e=t.$implicit;g.Hc("value",e.id),g.Pb(4),g.ld(" ",e.name,"")}}function F(e,t){1&e&&(g.jc(0,"div",45),g.jc(1,"span"),g.jd(2,"Department is required."),g.ic(),g.ic())}function x(e,t){1&e&&(g.jc(0,"div",45),g.jc(1,"span"),g.jd(2,"Amount is required"),g.ic(),g.ic())}function w(e,t){if(1&e&&(g.jc(0,"ng-option",44),g.jc(1,"div",4),g.jc(2,"div",18),g.jc(3,"div",19),g.jd(4),g.ic(),g.ic(),g.jc(5,"div",18),g.jc(6,"div",28),g.jd(7),g.ic(),g.ic(),g.ic(),g.ic()),2&e){const e=t.$implicit;g.Hc("value",e.id),g.Pb(4),g.ld(" ",e.name,""),g.Pb(3),g.ld(" ",e.contact,"")}}function k(e,t){1&e&&(g.jc(0,"div",45),g.jc(1,"span"),g.jd(2,"Approve by is required"),g.ic(),g.ic())}function B(e,t){if(1&e&&(g.jc(0,"ng-option",44),g.jc(1,"div",4),g.jc(2,"div",18),g.jc(3,"div",19),g.jd(4),g.ic(),g.ic(),g.jc(5,"div",18),g.jc(6,"div",28),g.jd(7),g.ic(),g.ic(),g.ic(),g.ic()),2&e){const e=t.$implicit;g.Hc("value",e.id),g.Pb(4),g.ld(" ",e.name,""),g.Pb(3),g.ld(" ",e.contact,"")}}function H(e,t){1&e&&(g.jc(0,"div",45),g.jc(1,"span"),g.jd(2,"Receive by is required"),g.ic(),g.ic())}function D(e,t){if(1&e&&(g.hc(0,46),g.ec(1,"circle-progress",47,48),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("showInnerStroke",!1)("percent",e.processValue)("outerStrokeColor","#005ec2")("innerStrokeColor","#C7E596")("animation",!0)("animationDuration",300)("radius",10)("titleFontSize",6)("unitsFontSize",6)("outerStrokeWidth",2)("titleFontWeight",900)("unitsFontWeight",900)("showSubtitle",!1)}}function M(e,t){1&e&&(g.jc(0,"div",45),g.jc(1,"span"),g.jd(2,"Invoice is required"),g.ic(),g.ic())}function L(e,t){if(1&e){const e=g.kc();g.jc(0,"div",59),g.ec(1,"img",60),g.jc(2,"nb-icon",61),g.uc("click",(function(){g.Xc(e);const t=g.yc(3);return t.removeImage("invAdd",t.imageIndexForinvAdd)})),g.ic(),g.ic()}if(2&e){const e=t.$implicit;g.Pb(1),g.Hc("src",e,g.Zc)}}function N(e,t){if(1&e){const e=g.kc();g.hc(0),g.jc(1,"div",49),g.hd(2,L,3,1,"div",50),g.zc(3,"imagePreviewPipe"),g.jc(4,"div",51),g.jc(5,"div",52),g.jc(6,"nb-icon",53),g.uc("click",(function(){return g.Xc(e),g.yc(2).previous("invAdd")})),g.ic(),g.ic(),g.jc(7,"div",54),g.jc(8,"nb-icon",55),g.uc("click",(function(){return g.Xc(e),g.yc(2).next("invAdd")})),g.ic(),g.ic(),g.ic(),g.ic(),g.jc(9,"div"),g.jc(10,"div",56),g.jc(11,"div",57),g.jc(12,"span",58),g.jd(13),g.ic(),g.ic(),g.ic(),g.ic(),g.gc()}if(2&e){const e=g.yc(2);g.Pb(2),g.Hc("ngForOf",g.Bc(3,3,e.invurl,e.imageIndexForinvAdd)),g.Pb(11),g.md(" ",e.imageIndexForinvAdd+1," / ",e.invurl.length," ")}}function q(e,t){if(1&e&&(g.hc(0),g.hd(1,N,14,6,"ng-container",36),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("ngIf",e.imgPreviewForinvAdd&&e.invurl.length)}}function O(e,t){if(1&e){const e=g.kc();g.jc(0,"div",59),g.ec(1,"img",60),g.jc(2,"nb-icon",61),g.uc("click",(function(){g.Xc(e);const t=g.yc(3);return t.removeImage("invUpdate",t.imageIndexForinvUpdate)})),g.ic(),g.ic()}if(2&e){const e=t.$implicit;g.Pb(1),g.Hc("src",e,g.Zc)}}function R(e,t){if(1&e){const e=g.kc();g.hc(0),g.jc(1,"div",49),g.hd(2,O,3,1,"div",50),g.zc(3,"imagePreviewPipe"),g.jc(4,"div",51),g.jc(5,"div",52),g.jc(6,"nb-icon",53),g.uc("click",(function(){return g.Xc(e),g.yc(2).previous("invUpdate")})),g.ic(),g.ic(),g.jc(7,"div",54),g.jc(8,"nb-icon",55),g.uc("click",(function(){return g.Xc(e),g.yc(2).next("invUpdate")})),g.ic(),g.ic(),g.ic(),g.ic(),g.jc(9,"div"),g.jc(10,"div",56),g.jc(11,"div",57),g.jc(12,"span",58),g.jd(13),g.ic(),g.ic(),g.ic(),g.ic(),g.gc()}if(2&e){const e=g.yc(2);g.Pb(2),g.Hc("ngForOf",g.Bc(3,3,e.invUpdateurl,e.imageIndexForinvUpdate)),g.Pb(11),g.md(" ",e.imageIndexForinvUpdate+1," / ",e.invUpdateurl.length," ")}}function z(e,t){if(1&e&&(g.hc(0),g.hd(1,R,14,6,"ng-container",36),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("ngIf",e.imgPreviewForinvUpdate&&e.invUpdateurl.length)}}function X(e,t){if(1&e&&(g.hc(0,46),g.ec(1,"circle-progress",47,62),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("showInnerStroke",!1)("percent",e.processValue2)("outerStrokeColor","#005ec2")("innerStrokeColor","#C7E596")("animation",!0)("animationDuration",300)("radius",10)("titleFontSize",6)("unitsFontSize",6)("outerStrokeWidth",2)("titleFontWeight",900)("unitsFontWeight",900)("showSubtitle",!1)}}function $(e,t){if(1&e){const e=g.kc();g.jc(0,"div",59),g.ec(1,"img",60),g.jc(2,"nb-icon",61),g.uc("click",(function(){g.Xc(e);const t=g.yc(3);return t.removeImage("matAdd",t.imageIndexFormatAdd)})),g.ic(),g.ic()}if(2&e){const e=t.$implicit;g.Pb(1),g.Hc("src",e,g.Zc)}}function E(e,t){if(1&e){const e=g.kc();g.hc(0),g.jc(1,"div",49),g.hd(2,$,3,1,"div",50),g.zc(3,"imagePreviewPipe"),g.jc(4,"div",51),g.jc(5,"div",52),g.jc(6,"nb-icon",53),g.uc("click",(function(){return g.Xc(e),g.yc(2).previous("matAdd")})),g.ic(),g.ic(),g.jc(7,"div",54),g.jc(8,"nb-icon",55),g.uc("click",(function(){return g.Xc(e),g.yc(2).next("matAdd")})),g.ic(),g.ic(),g.ic(),g.ic(),g.jc(9,"div"),g.jc(10,"div",56),g.jc(11,"div",57),g.jc(12,"span",58),g.jd(13),g.ic(),g.ic(),g.ic(),g.ic(),g.gc()}if(2&e){const e=g.yc(2);g.Pb(2),g.Hc("ngForOf",g.Bc(3,3,e.maturl,e.imageIndexFormatAdd)),g.Pb(11),g.md(" ",e.imageIndexFormatAdd+1," / ",e.maturl.length," ")}}function W(e,t){if(1&e&&(g.hc(0),g.hd(1,E,14,6,"ng-container",36),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("ngIf",e.imgPreviewFormatAdd&&e.maturl.length)}}function T(e,t){if(1&e){const e=g.kc();g.jc(0,"div",49),g.jc(1,"div",59),g.ec(2,"img",60),g.jc(3,"nb-icon",61),g.uc("click",(function(){g.Xc(e);const t=g.yc(3);return t.removeImage("matUpdate",t.imageIndexFormatUpdate)})),g.ic(),g.ic(),g.jc(4,"div",51),g.jc(5,"div",52),g.jc(6,"nb-icon",53),g.uc("click",(function(){return g.Xc(e),g.yc(3).previous("matUpdate")})),g.ic(),g.ic(),g.jc(7,"div",54),g.jc(8,"nb-icon",55),g.uc("click",(function(){return g.Xc(e),g.yc(3).next("matUpdate")})),g.ic(),g.ic(),g.ic(),g.ic()}if(2&e){const e=t.$implicit;g.Pb(2),g.Hc("src",e,g.Zc)}}function V(e,t){if(1&e&&(g.hc(0),g.hd(1,T,9,1,"div",63),g.zc(2,"imagePreviewPipe"),g.jc(3,"div"),g.jc(4,"div",56),g.jc(5,"div",57),g.jc(6,"span",58),g.jd(7),g.ic(),g.ic(),g.ic(),g.ic(),g.gc()),2&e){const e=g.yc(2);g.Pb(1),g.Hc("ngForOf",g.Bc(2,3,e.matUpdateurl,e.imageIndexFormatUpdate)),g.Pb(6),g.md(" ",e.imageIndexFormatUpdate+1," / ",e.matUpdateurl.length," ")}}function J(e,t){if(1&e&&(g.hc(0),g.hd(1,V,8,6,"ng-container",36),g.gc()),2&e){const e=g.yc();g.Pb(1),g.Hc("ngIf",e.imgPreviewFormatUpdate&&e.matUpdateurl.length)}}function _(e,t){if(1&e){const e=g.kc();g.jc(0,"button",64),g.uc("click",(function(){g.Xc(e);const t=g.yc(),i=g.Uc(16);return t.reset(i)})),g.jd(1,"CANCEL"),g.ic()}}const G=function(){return["/pages/purchase/view"]};function Z(e,t){1&e&&(g.jc(0,"button",65),g.jd(1,"CANCEL"),g.ic()),2&e&&g.Hc("routerLink",g.Mc(1,G))}function Q(e,t){if(1&e){const e=g.kc();g.jc(0,"button",66),g.uc("click",(function(){g.Xc(e);const t=g.yc(),i=g.Uc(16);return t.updatePurchase(i)})),g.jd(1,"UPDATE"),g.ic()}if(2&e){const e=g.yc();g.Hc("disabled",e.disableButton)}}function K(e,t){if(1&e){const e=g.kc();g.jc(0,"button",66),g.uc("click",(function(){g.Xc(e);const t=g.yc(),i=g.Uc(16);return t.addPurchase(i)})),g.jd(1,"SAVE"),g.ic()}if(2&e){const e=g.yc();g.Hc("disabled",e.disableButton)}}const Y=function(e){return{"is-invalid":e}};let ee=(()=>{class e{constructor(e,t,i,c,n,a,r,s,l){this.commonService=e,this.purchseService=t,this.userService=i,this.adminService=c,this._route=n,this.toastr=a,this.route=r,this.imageCompress=s,this.httpClient=l,this.invurl=[],this.maturl=[],this.invUpdateurl=[],this.matUpdateurl=[],this.imgPreviewForinvAdd=!1,this.imgPreviewForinvUpdate=!1,this.imgPreviewFormatAdd=!1,this.imgPreviewFormatUpdate=!1,this.imageIndexForinvAdd=0,this.imageIndexForinvUpdate=0,this.imageIndexFormatAdd=0,this.imageIndexFormatUpdate=0,this.invUploadFlag=!1,this.matUploadFlag=!1,this.processValue=0,this.processValue2=0,this.loading=!1,this.formSubmitted=!1,this.disableButton=!1,this.purchase=new o,this.materialPhotoArray=[],this.departmentList=[],this.approveByList=[],this.receiveByList=[],this.docList=[],this.destroy$=new d.a}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngOnInit(){this.getUserId(),this.getAllDepartment(),this.getApproveBy(),this.getReceiveBy(),this.imgPreviewForinvAdd=!1,this.imgPreviewFormatAdd=!1}getUserId(){this.user=this.commonService.getUser(),this.userHead=this.commonService.getUserHeadId(),this.currentId=this._route.snapshot.paramMap.get("id"),this.currentId&&this.getCurrentPurchase()}getCurrentPurchase(){this.invUpdateurl=[],this.matUpdateurl=[],this.purchseService.getPurchaseById(this.currentId).pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success&&(this.purchase=e.data,this.docList=this.purchase.materialPhotosList,this.docList.forEach(e=>{"bill"==e.type?this.invUpdateurl.push(e.picUrl):this.matUpdateurl.push(e.picUrl)}),this.imgPreviewForinvUpdate=!0,this.imgPreviewFormatUpdate=!0)},e=>{this.toastr.error(u.Serever_Error)})}getAllDepartment(){this.userService.getAllDepartmentData().pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success&&(this.departmentList=e.data)},e=>{})}getApproveBy(){this.loading=!0,this.adminService.getAllApproveByData().pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success?(this.approveByList=e.data,this.loading=!1):this.loading=!1})}getReceiveBy(){this.loading=!0,this.adminService.getAllReceiveByData().pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success?(this.receiveByList=e.data,this.loading=!1):this.loading=!1})}compressFile(e){this.imageCompress.compressFile(this.imageUrl,-1,50,50).then(t=>{this.imgResultAfterCompress=t,this.dataURItoBlob(this.imgResultAfterCompress.split(",")[1]),this.imageFile=new File([t],this.fileToUpload.name,{type:"image/jpeg"}),this.fileUpload(e)})}dataURItoBlob(e){const t=window.atob(e),i=new ArrayBuffer(t.length),c=new Uint8Array(i);for(let n=0;n<t.length;n++)c[n]=t.charCodeAt(n);return new Blob([c],{type:"image/jpeg"})}fileUpload(e){if(this.matUpdateurl=[],this.invUpdateurl=[],this.invurl=[],this.maturl=[],this.imageFile){this.fileToUpload=this.imageFile;const t=new FormData;t.append("file",this.fileToUpload),t.append("upload_preset","gfl_upload"),t.append("cloud_name","dpemsdha5"),this.httpClient.post("https://api.cloudinary.com/v1_1/dpemsdha5/image/upload",t,{reportProgress:!0,observe:"events"}).pipe(Object(r.a)(this.destroy$)).subscribe(t=>{t&&t.type===m.e.UploadProgress&&("bill"==e?this.processValue=Math.round(100*t.loaded/t.total):"material"==e&&(this.processValue2=Math.round(100*t.loaded/t.total)))},e=>{}),this.purchseService.uploadImage(t).pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e&&(this.docList.push({id:null,type:this.docType,name:this.fileToUpload.name,picUrl:e.secure_url,controlId:null}),this.docList.forEach(e=>{this.currentId?"bill"==e.type?(-1==this.invUpdateurl.indexOf(e.picUrl)&&this.invUpdateurl.push(e.picUrl),this.imageIndexForinvUpdate=0):(-1==this.matUpdateurl.indexOf(e.picUrl)&&this.matUpdateurl.push(e.picUrl),this.imageIndexFormatUpdate=0):("bill"==e.type?(-1==this.invurl.indexOf(e.picUrl)&&this.invurl.push(e.picUrl),this.imageIndexForinvAdd=0):(-1==this.maturl.indexOf(e.picUrl)&&this.maturl.push(e.picUrl),this.imageIndexFormatAdd=0),this.imgPreviewForinvAdd=!0,this.imgPreviewFormatAdd=!0)}))})}else this.loading=!1}handleFileInput(e,t){"bill"==t?this.invUploadFlag=!0:"material"==t?this.matUploadFlag=!0:(this.invUploadFlag=!1,this.matUploadFlag=!1);for(let i=0;i<e.length;i++){this.fileToUpload=e.item(i),this.matUploadFlag?this.material=this.fileToUpload.name:this.bill=this.fileToUpload.name,this.docType=t;const c=new FileReader;c.onload=()=>{this.imageUrl=c.result,this.compressFile(t)},c.readAsDataURL(this.fileToUpload)}}reset(e){e.reset(),this.formSubmitted=!1}addPurchase(e){this.disableButton=!0,this.formSubmitted=!0,this.invurl.length?this.purchase.departmentId&&this.purchase.amt&&this.purchase.approvedById&&this.purchase.receiverById?(this.purchase.createdBy=this.user.userId,this.purchase.materialPhotosList=this.docList,this.purchseService.addPurchase(this.purchase).pipe(Object(r.a)(this.destroy$)).subscribe(t=>{t.success?(this.formSubmitted=!1,this.reset(e),this.disableButton=!1,this.toastr.success(t.msg),this.invurl=[],this.maturl=[],this.invUploadFlag=!1,this.matUploadFlag=!1,this.processValue=0,this.processValue2=0):this.toastr.error(t.msg),this.disableButton=!1},e=>{this.toastr.error(u.Serever_Error)})):this.toastr.error("Fill empty fields"):this.toastr.error("Invoice empty"),this.disableButton=!1,this.invurl=[...this.invurl]}updatePurchase(e){this.loading=!0,this.disableButton=!0,this.formSubmitted=!0,this.invUpdateurl.length?this.purchase.departmentId&&this.purchase.amt&&this.purchase.approvedById&&this.purchase.receiverById?(this.docList.length>0&&this.docList.forEach((e,t)=>{("bill"==e.type||"material"==e.type)&&(this.docList[t]=e,this.docList[t].id=e.id,this.docList[t].controlId=e.controlId)}),this.purchase.materialPhotosList=this.docList,this.purchseService.updatePurchase(this.purchase).pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success?(this.formSubmitted=!1,this.route.navigate(["/pages/purchase"]),this.toastr.success(e.msg)):this.toastr.error(e.msg),this.loading=!1,this.disableButton=!1},e=>{this.toastr.error(u.Update_Error),this.loading=!1})):(this.loading=!1,this.disableButton=!1):(this.loading=!1,this.disableButton=!1,this.invUpdateurl=[...this.invUpdateurl])}removeImage(e,t){if("invAdd"==e){let e=this.invurl.splice(t,1);this.docList.forEach((t,i)=>{t.picUrl==e&&this.docList.splice(i,1)}),this.invurl.length==t&&this.imageIndexForinvAdd--,this.invurl=[...this.invurl]}else if("invUpdate"==e){let e=this.invUpdateurl.splice(t,1);this.docList.forEach((t,i)=>{t.picUrl==e&&this.docList.splice(i,1)}),this.invUpdateurl.length==t&&this.imageIndexForinvUpdate--,this.invUpdateurl=[...this.invUpdateurl]}else if("matAdd"==e){let e=this.maturl.splice(t,1);this.docList.forEach((t,i)=>{t.picUrl==e&&this.docList.splice(i,1)}),this.maturl.length==t&&this.imageIndexFormatAdd--,this.maturl=[...this.maturl]}else if("matUpdate"==e){let e=this.matUpdateurl.splice(t,1);this.docList.forEach((t,i)=>{t.picUrl==e&&this.docList.splice(i,1)}),this.matUpdateurl.length==t&&this.imageIndexFormatUpdate--,this.matUpdateurl=[...this.matUpdateurl]}}previous(e){"invAdd"==e?this.imageIndexForinvAdd?this.imageIndexForinvAdd--:this.imageIndexForinvAdd=this.invurl.length-1:"invUpdate"==e?this.imageIndexForinvUpdate?this.imageIndexForinvUpdate--:this.imageIndexForinvUpdate=this.invUpdateurl.length-1:"matAdd"==e?this.imageIndexFormatAdd?this.imageIndexFormatAdd--:this.imageIndexFormatAdd=this.maturl.length-1:"matUpdate"==e&&(this.imageIndexFormatUpdate?this.imageIndexFormatUpdate--:this.imageIndexFormatUpdate=this.matUpdateurl.length-1)}next(e){"invAdd"==e?this.imageIndexForinvAdd<this.invurl.length-1?this.imageIndexForinvAdd++:this.imageIndexForinvAdd=0:"invUpdate"==e?this.imageIndexForinvUpdate<this.invUpdateurl.length-1?this.imageIndexForinvUpdate++:this.imageIndexForinvUpdate=0:"matAdd"==e?this.imageIndexFormatAdd<this.maturl.length-1?this.imageIndexFormatAdd++:this.imageIndexFormatAdd=0:"matUpdate"==e&&(this.imageIndexFormatUpdate<this.matUpdateurl.length-1?this.imageIndexFormatUpdate++:this.imageIndexFormatUpdate=0)}tableChange(e){"view table"===e&&this.route.navigate(["/pages/purchase/view"])}}return e.\u0275fac=function(t){return new(t||e)(g.dc(s.a),g.dc(l.a),g.dc(h.a),g.dc(p.a),g.dc(n.a),g.dc(v.b),g.dc(n.c),g.dc(b.a),g.dc(m.b))},e.\u0275cmp=g.Xb({type:e,selectors:[["ngx-add-edit-purchase"]],decls:105,vars:46,consts:[[3,"show"],["id","target"],[1,"nb-style"],[1,"nb-header"],[1,"row"],[1,"col-md-5","col-6","display-flex-start","max-width-device"],["placeholder","Select",1,"btn","btn-md",3,"change"],["value","view table"],[1,"col-md-7","col-5"],[4,"ngIf","ngIfElse"],["updateS",""],["purchaseForm","ngForm"],[1,"col-md-4","col-12"],[1,"form-group"],[1,"required"],["name","department","appendTo","body","placeholder","Select Department","required","",1,"required-error-dropdown","dropdown-name",3,"ngModel","ngClass","ngModelChange"],["department1","ngModel"],["disabled","true"],[1,"col-md-4","col-4"],[1,"text-left","txt-ov-elips"],[3,"value",4,"ngFor","ngForOf"],["class","input-required",4,"ngIf"],["type","number","name","amount","fieldsize","small","nbinput","","placeholder","Enter Amount","required","",1,"form-control","size-small",3,"ngModel","ngClass","ngModelChange"],["amount1","ngModel"],["type","text","fieldsize","small","nbinput","","name","remark","placeholder","Remark",1,"form-control","size-small",3,"ngModel","ngModelChange"],["remark1","ngModel"],["name","approveBy","appendTo","body","required","","placeholder","Select approve by",1,"required-error-dropdown","dropdown-name",3,"ngModel","ngClass","ngModelChange"],["approveBy1","ngModel"],[1,"text-center","txt-ov-elips"],["name","receiveBy","appendTo","body","required","","placeholder","Select receive by",1,"required-error-dropdown","dropdown-name",3,"ngModel","ngClass","ngModelChange"],["receiveBy1","ngModel"],[1,"col-md-6","col-12"],["class","mar-left-for-prog",4,"ngIf"],[1,""],["type","file","accept","image/x-png,image/gif,image/jpeg","name","bill","multiple","","id","bill","placeholder","Upload invoice","required","",1,"form-control","size-small","registration-document","filepicker","width-100",2,"color","transparent",3,"ngModel","ngClass","ngModelChange","change"],["bill1","ngModel"],[4,"ngIf"],["type","file","multiple","","accept","image/x-png,image/gif,image/jpeg","name","material","id","material","placeholder","Upload material",1,"form-control","size-small","registration-document","filepicker","width-100",2,"color","transparent",3,"ngModel","ngClass","ngModelChange","change"],["material1","ngModel"],[1,"col-md-12","mobile-btn-center","text-btn-right"],["class","btn btn-primary btn-sm btn-design-cancel","type","button",3,"click",4,"ngIf"],["class","btn btn-primary btn-sm btn-design-cancel","type","button",3,"routerLink",4,"ngIf"],["type","button","class","btn btn-primary btn-sm btn-design-save button-base ripple",3,"disabled","click",4,"ngIf"],[1,"nb-text","txt-ov-elips","mob-font-13"],[3,"value"],[1,"input-required"],[1,"mar-left-for-prog"],[3,"showInnerStroke","percent","outerStrokeColor","innerStrokeColor","animation","animationDuration","radius","titleFontSize","unitsFontSize","outerStrokeWidth","titleFontWeight","unitsFontWeight","showSubtitle"],["invbar",""],[1,"max-popup-purchase","mobile-width-100"],["class","text-center mobile-100 display-flex-purchase-view",4,"ngFor","ngForOf"],[1,"next-previous-btn"],[1,"back-btn"],["icon","arrow-back-outline",3,"click"],[1,"next-btn"],["icon","arrow-forward-outline",3,"click"],[1,"row","text-center","mt-3"],[1,"col-md-12"],[1,"bottom-count-img"],[1,"text-center","mobile-100","display-flex-purchase-view"],[3,"src"],["icon","close-circle-outline",1,"purchase-close-img",3,"click"],["matbar",""],["class","max-popup-purchase mobile-width-100",4,"ngFor","ngForOf"],["type","button",1,"btn","btn-primary","btn-sm","btn-design-cancel",3,"click"],["type","button",1,"btn","btn-primary","btn-sm","btn-design-cancel",3,"routerLink"],["type","button",1,"btn","btn-primary","btn-sm","btn-design-save","button-base","ripple",3,"disabled","click"]],template:function(e,t){if(1&e&&(g.ec(0,"ngx-loading",0),g.ec(1,"div",1),g.jc(2,"nb-card",2),g.jc(3,"nb-card-header",3),g.jc(4,"div",4),g.jc(5,"div",5),g.jc(6,"ng-select",6),g.uc("change",(function(e){return t.tableChange(e)})),g.jc(7,"ng-option",7),g.jd(8,"View Table"),g.ic(),g.ic(),g.ic(),g.jc(9,"div",8),g.hd(10,C,3,0,"div",9),g.hd(11,P,2,0,"ng-template",null,10,g.id),g.ic(),g.ic(),g.ic(),g.jc(13,"nb-card-body"),g.jc(14,"div"),g.jc(15,"form",null,11),g.jc(17,"div",4),g.jc(18,"div",12),g.jc(19,"div",13),g.jc(20,"label",14),g.jd(21,"Department"),g.ic(),g.jc(22,"ng-select",15,16),g.uc("ngModelChange",(function(e){return t.purchase.departmentId=e})),g.jc(24,"ng-option",17),g.jc(25,"div",4),g.jc(26,"div",18),g.jc(27,"div",19),g.jd(28,"Department Name"),g.ic(),g.ic(),g.ic(),g.ic(),g.hd(29,A,5,2,"ng-option",20),g.ic(),g.hd(30,F,3,0,"div",21),g.ic(),g.ic(),g.jc(31,"div",12),g.jc(32,"div",13),g.jc(33,"label",14),g.jd(34,"Amount"),g.ic(),g.jc(35,"input",22,23),g.uc("ngModelChange",(function(e){return t.purchase.amt=e})),g.ic(),g.hd(37,x,3,0,"div",21),g.ic(),g.ic(),g.jc(38,"div",12),g.jc(39,"div",13),g.jc(40,"label"),g.jd(41,"Remark"),g.ic(),g.jc(42,"input",24,25),g.uc("ngModelChange",(function(e){return t.purchase.remark=e})),g.ic(),g.ic(),g.ic(),g.ic(),g.jc(44,"div",4),g.jc(45,"div",12),g.jc(46,"div",13),g.jc(47,"label",14),g.jd(48,"Approve By"),g.ic(),g.jc(49,"ng-select",26,27),g.uc("ngModelChange",(function(e){return t.purchase.approvedById=e})),g.jc(51,"ng-option",17),g.jc(52,"div",4),g.jc(53,"div",18),g.jc(54,"div",19),g.jd(55,"Name"),g.ic(),g.ic(),g.jc(56,"div",18),g.jc(57,"div",28),g.jd(58,"Contact"),g.ic(),g.ic(),g.ic(),g.ic(),g.hd(59,w,8,3,"ng-option",20),g.ic(),g.hd(60,k,3,0,"div",21),g.ic(),g.ic(),g.jc(61,"div",12),g.jc(62,"div",13),g.jc(63,"label",14),g.jd(64,"Receive By"),g.ic(),g.jc(65,"ng-select",29,30),g.uc("ngModelChange",(function(e){return t.purchase.receiverById=e})),g.jc(67,"ng-option",17),g.jc(68,"div",4),g.jc(69,"div",18),g.jc(70,"div",19),g.jd(71,"Name"),g.ic(),g.ic(),g.jc(72,"div",18),g.jc(73,"div",28),g.jd(74,"Contact"),g.ic(),g.ic(),g.ic(),g.ic(),g.hd(75,B,8,3,"ng-option",20),g.ic(),g.hd(76,H,3,0,"div",21),g.ic(),g.ic(),g.ic(),g.jc(77,"div",4),g.jc(78,"div",31),g.jc(79,"div",13),g.jc(80,"label",14),g.jd(81,"Invoice"),g.ic(),g.hd(82,D,3,13,"ng-container",32),g.jc(83,"div",33),g.jc(84,"input",34,35),g.uc("ngModelChange",(function(e){return t.bill=e}))("change",(function(e){return t.handleFileInput(e.target.files,"bill")})),g.ic(),g.hd(86,M,3,0,"div",21),g.ic(),g.ic(),g.hd(87,q,2,1,"ng-container",36),g.hd(88,z,2,1,"ng-container",36),g.ic(),g.jc(89,"div",31),g.jc(90,"div",13),g.jc(91,"label"),g.jd(92,"Material"),g.ic(),g.hd(93,X,3,13,"ng-container",32),g.jc(94,"div",33),g.jc(95,"input",37,38),g.uc("ngModelChange",(function(e){return t.material=e}))("change",(function(e){return t.handleFileInput(e.target.files,"material")})),g.ic(),g.ic(),g.ic(),g.hd(97,W,2,1,"ng-container",36),g.hd(98,J,2,1,"ng-container",36),g.ic(),g.ic(),g.jc(99,"div",4),g.jc(100,"div",39),g.hd(101,_,2,0,"button",40),g.hd(102,Z,2,2,"button",41),g.hd(103,Q,2,1,"button",42),g.hd(104,K,2,1,"button",42),g.ic(),g.ic(),g.ic(),g.ic(),g.ic(),g.ic()),2&e){const e=g.Uc(12),i=g.Uc(23),c=g.Uc(36),n=g.Uc(50),a=g.Uc(66),r=g.Uc(85),d=g.Uc(96);g.Hc("show",t.loading),g.Pb(10),g.Hc("ngIf",null==t.currentId)("ngIfElse",e),g.Pb(12),g.Hc("ngModel",t.purchase.departmentId)("ngClass",g.Nc(34,Y,i.invalid&&(t.formSubmitted||i.touched))),g.Pb(7),g.Hc("ngForOf",t.departmentList),g.Pb(1),g.Hc("ngIf",i.invalid&&(t.formSubmitted||i.touched)),g.Pb(5),g.Hc("ngModel",t.purchase.amt)("ngClass",g.Nc(36,Y,c.invalid&&(t.formSubmitted||c.touched))),g.Pb(2),g.Hc("ngIf",c.invalid&&(t.formSubmitted||c.touched)),g.Pb(5),g.Hc("ngModel",t.purchase.remark),g.Pb(7),g.Hc("ngModel",t.purchase.approvedById)("ngClass",g.Nc(38,Y,n.invalid&&(t.formSubmitted||n.touched))),g.Pb(10),g.Hc("ngForOf",t.approveByList),g.Pb(1),g.Hc("ngIf",n.invalid&&(t.formSubmitted||n.touched)),g.Pb(5),g.Hc("ngModel",t.purchase.receiverById)("ngClass",g.Nc(40,Y,a.invalid&&(t.formSubmitted||a.touched))),g.Pb(10),g.Hc("ngForOf",t.receiveByList),g.Pb(1),g.Hc("ngIf",a.invalid&&(t.formSubmitted||a.touched)),g.Pb(6),g.Hc("ngIf",t.invUploadFlag),g.Pb(2),g.Hc("ngModel",t.bill)("ngClass",g.Nc(42,Y,r.invalid&&(t.formSubmitted||r.touched))),g.Pb(2),g.Hc("ngIf",r.invalid&&(t.formSubmitted||r.touched)),g.Pb(1),g.Hc("ngIf",!t.currentId),g.Pb(1),g.Hc("ngIf",t.currentId),g.Pb(5),g.Hc("ngIf",t.matUploadFlag),g.Pb(2),g.Hc("ngModel",t.material)("ngClass",g.Nc(44,Y,d.invalid&&(t.formSubmitted||d.touched))),g.Pb(2),g.Hc("ngIf",!t.currentId),g.Pb(1),g.Hc("ngIf",t.currentId),g.Pb(3),g.Hc("ngIf",!t.currentId),g.Pb(1),g.Hc("ngIf",t.currentId),g.Pb(1),g.Hc("ngIf",t.currentId),g.Pb(1),g.Hc("ngIf",!t.currentId)}},directives:[f.a,j.u,j.x,y.a,y.c,c.n,j.t,U.x,U.m,U.n,U.t,U.l,U.o,c.l,c.m,U.q,U.a,I.a,j.I,n.d],pipes:[S.a],styles:[""]}),e})();var te=i("kF6S"),ie=i("1kSV"),ce=i("lDzL"),ne=i("+lss");const ae=function(){return{type:"zoom"}},re=function(e){return{animation:e}},de=function(e){return["/pages/purchase/edit",e]};function se(e,t){if(1&e){const e=g.kc();g.ec(0,"nb-icon",22),g.jd(1,"\xa0\xa0 "),g.jc(2,"nb-icon",23),g.uc("click",(function(){g.Xc(e);const i=t.row;return g.yc().deletePurchase(i.id)})),g.ic()}if(2&e){const e=t.row,i=g.yc();g.Hc("options",g.Nc(6,re,g.Mc(5,ae)))("routerLink",g.Nc(8,de,e.id))("hidden",e.checked||i.hiddenEdit),g.Pb(2),g.Hc("options",g.Nc(11,re,g.Mc(10,ae)))("hidden",e.checked||i.hiddenDelete)}}const oe=function(){return["/pages/purchase"]},le=[{path:"",component:ee,canActivate:[a.a],canLoad:[a.a],data:{PermissionName:["add"]}},{path:"view",component:(()=>{class e{constructor(e,t,i,c,n){this.purchseService=e,this.purchaseGuard=t,this.toastr=i,this.modalService=c,this.route=n,this.loading=!1,this.tableStyle="bootstrap",this.hiddenAdd=!0,this.hiddenEdit=!0,this.hiddenDelete=!0,this.purchaseArray=[],this.copyPurchaseArray=[],this.destroy$=new d.a,this.tableHeaders=["amt","approvedName","departmentName","receiverName"],this.searchStr="",this.searchANDCondition=!1}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}ngOnInit(){this.getAccess(),this.getAllPurchase()}getAccess(){this.purchaseGuard.accessRights("add")&&(this.hiddenAdd=!1),this.purchaseGuard.accessRights("delete")&&(this.hiddenDelete=!1),this.purchaseGuard.accessRights("edit")&&(this.hiddenEdit=!1)}getAllPurchase(){this.loading=!0,this.purchseService.getPurchase().pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success?(this.purchaseArray=e.data,this.copyPurchaseArray=this.purchaseArray.map(e=>({id:e.id,amt:e.amt,approvedName:e.approvedName,departmentName:e.departmentName,receiverName:e.receiverName,checked:e.checked})),this.loading=!1):this.loading=!1},e=>{})}filter(e){const t=e.toString().toLowerCase().trim(),i=Object.keys(this.copyPurchaseArray[0]);this.purchaseArray=this.copyPurchaseArray.filter(e=>{for(let c=0;c<i.length;c++)if(e[i[c]]&&-1!==e[i[c]].toString().toLowerCase().indexOf(t)||!t)return!0})}deletePurchase(e){this.modalService.open(te.a,{size:"sm"}).result.then(t=>{t&&this.purchseService.deletePurchase(e).pipe(Object(r.a)(this.destroy$)).subscribe(e=>{e.success?(this.toastr.success(e.msg),this.getAllPurchase()):this.toastr.error(e.msg)},e=>{})})}}return e.\u0275fac=function(t){return new(t||e)(g.dc(l.a),g.dc(a.a),g.dc(v.b),g.dc(ie.e),g.dc(n.c))},e.\u0275cmp=g.Xb({type:e,selectors:[["ngx-purchase"]],decls:29,vars:20,consts:[[3,"show"],[1,"nb-style"],[1,"nb-header"],[1,"row"],[1,"col-md-1","col-3","display-flex-start"],[1,"btn","btn-primary","btn-md","btn-design",3,"disabled","routerLink"],[1,"col-md-9","col-7"],[1,"nb-text"],[1,"col-md-4"],[2,"display","flex"],[2,"margin-top","4px","margin-right","2px"],["status","primary","labelPosition","start","name","shift",3,"ngModel","ngModelChange"],[2,"margin-top","4px","margin-left","2px"],[1,"col-md-8"],["type","text","placeholder","Search","aria-label","Search","aria-describedby","basic-addon1",1,"form-control",3,"ngModel","ngModelChange"],[1,"material",3,"rows","ngClass","headerHeight","footerHeight"],["name","Action","sortable","false","prop","id",3,"maxWidth"],["ngx-datatable-cell-template",""],["name","Amount","prop","amt",3,"maxWidth"],["name","Approve By","prop","approvedName",3,"maxWidth"],["name","Department","prop","departmentName",3,"maxWidth"],["name","Received By","prop","receiverName",3,"maxWidth"],["icon","edit","status","primary",3,"options","routerLink","hidden"],["icon","trash","status","danger",3,"options","hidden","click"]],template:function(e,t){1&e&&(g.ec(0,"ngx-loading",0),g.jc(1,"nb-card",1),g.jc(2,"nb-card-header",2),g.jc(3,"div",3),g.jc(4,"div",4),g.jc(5,"button",5),g.jd(6,"ADD"),g.ic(),g.ic(),g.jc(7,"div",6),g.jc(8,"h2",7),g.jd(9,"Purchase"),g.ic(),g.ic(),g.ic(),g.ic(),g.jc(10,"nb-card-body"),g.jc(11,"div",3),g.jc(12,"div",8),g.jc(13,"div",9),g.jc(14,"p",10),g.jd(15,"OR"),g.ic(),g.jc(16,"nb-toggle",11),g.uc("ngModelChange",(function(e){return t.searchANDCondition=e})),g.ic(),g.jc(17,"p",12),g.jd(18,"AND"),g.ic(),g.ic(),g.ic(),g.jc(19,"div",13),g.jc(20,"input",14),g.uc("ngModelChange",(function(e){return t.searchStr=e})),g.ic(),g.ic(),g.ic(),g.jc(21,"ngx-datatable",15),g.zc(22,"searchInTable"),g.jc(23,"ngx-datatable-column",16),g.hd(24,se,3,13,"ng-template",17),g.ic(),g.ec(25,"ngx-datatable-column",18),g.ec(26,"ngx-datatable-column",19),g.ec(27,"ngx-datatable-column",20),g.ec(28,"ngx-datatable-column",21),g.ic(),g.ic(),g.ic()),2&e&&(g.Hc("show",t.loading),g.Pb(5),g.Hc("disabled",t.hiddenAdd)("routerLink",g.Mc(19,oe)),g.Pb(11),g.Hc("ngModel",t.searchANDCondition),g.Pb(4),g.Hc("ngModel",t.searchStr),g.Pb(1),g.Hc("rows",g.Dc(22,14,t.purchaseArray,t.searchStr,t.searchANDCondition,t.tableHeaders))("ngClass",t.tableStyle)("headerHeight",31)("footerHeight",40),g.Pb(2),g.Hc("maxWidth",90),g.Pb(2),g.Hc("maxWidth",120),g.Pb(1),g.Hc("maxWidth",310),g.Pb(1),g.Hc("maxWidth",210),g.Pb(1),g.Hc("maxWidth",120))},directives:[f.a,j.u,j.x,n.d,j.t,j.wb,U.l,U.o,U.a,ce.e,c.l,ce.b,ce.a,j.I],pipes:[ne.a],styles:[""]}),e})(),canActivate:[a.a],canLoad:[a.a],data:{PermissionName:["view","view group","view all"]}},{path:"edit/:id",component:ee,canActivate:[a.a],canLoad:[a.a],data:{PermissionName:["edit","edit group","edit all"]}}];let he=(()=>{class e{}return e.\u0275mod=g.bc({type:e}),e.\u0275inj=g.ac({factory:function(t){return new(t||e)},imports:[[n.g.forChild(le)],n.g]}),e})();var pe=i("yzeJ"),ue=i("vTDv");let me=(()=>{class e{}return e.\u0275mod=g.bc({type:e}),e.\u0275inj=g.ac({factory:function(t){return new(t||e)},imports:[[c.c,he,pe.a,U.g,ue.a]]}),e})()},bidh:function(e,t,i){"use strict";i.d(t,"a",(function(){return r}));var c=i("4/8P"),n=i("fXoL"),a=i("tk/3");let r=(()=>{class e{constructor(e,t){this.httpClient=e,this.commonService=t}getAllJetData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/allJet")}getAllDesignation(){return this.httpClient.get(this.commonService.envUrl()+"api/user/designation")}getAllCompanyData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/allCompany")}getAllQualityData(){return this.httpClient.get(this.commonService.envUrl()+"api/quality/qualityName/get/all")}getAllApproveByData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/approvedBy")}getAllReceiveByData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/receiver")}getAllApproveReceiveData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/authorize/all")}getAllMachine(){return this.httpClient.get(this.commonService.envUrl()+"api/machine/all")}getAllMachineCategory(){return this.httpClient.get(this.commonService.envUrl()+"api/machine/allCategory")}getAllDepartmentData(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/department")}getAllInvoiceSequence(){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/invoiceSequence/")}getAllBatchSequence(e){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/batchSequence?update="+e)}getMachineDateById(e){return this.httpClient.get(this.commonService.envUrl()+"api/machine/"+e)}getApproveRecieveDataById(e){return this.httpClient.get(this.commonService.envUrl()+"api/admin/get/authorize?id="+e)}saveMachine(e){return this.httpClient.post(this.commonService.envUrl()+"api/machine",e)}saveMachineCategory(e){return this.httpClient.post(this.commonService.envUrl()+"api/machine/addCategory",e)}addDepartment(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/department/",e)}saveQuality(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/quality/add/qualityName/",e)}saveJetData(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/jet/addJet",e)}saveDesignationData(e){return this.httpClient.post(this.commonService.envUrl()+"api/user/designation",e)}saveCompanyData(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/company/",e)}saveApproveByData(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/approvedBy/",e)}saveReceiveByData(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/receiver/",e)}saveApproveReceiveByData(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/authorize",e)}saveInvoiceSequence(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/invoiceSequence/",e)}saveBatchSequence(e){return this.httpClient.post(this.commonService.envUrl()+"api/admin/add/batchSequence/",e)}deleteJetById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/jet/"+e)}deleteQualityById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/quality/delete/qualityName/"+e)}deleteDesignationById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/user/designation/"+e)}deleteCompanyById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/companyBy/"+e)}deleteApproveById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/approved/"+e)}deleteReceiveById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/receiver/"+e)}deleteApproveReceiveById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/authorize?id="+e)}deleteDepartmentById(e){return this.httpClient.delete(this.commonService.envUrl()+"api/admin/delete/department/"+e)}deleteMachine(e){return this.httpClient.delete(this.commonService.envUrl()+"api/machine/delete/"+e)}deleteMachineCategory(e){return this.httpClient.delete(this.commonService.envUrl()+"api/machine/delete/category/"+e)}updateMachine(e){return this.httpClient.put(this.commonService.envUrl()+"api/machine/update/",e)}updateMachineCategory(e){return this.httpClient.put(this.commonService.envUrl()+"api/machine/update/category/",e)}updateJetData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/jet/updateJet",e)}updateQuality(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/quality/update/qualityName/",e)}updateApproveByData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/approvedBy/",e)}updateReceiveByData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/receiver/",e)}updateApproveReceiveByData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/authorize",e)}updateCompanyData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/company/",e)}updateDepartmentData(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/department/",e)}updateDesigntationData(e){return this.httpClient.put(this.commonService.envUrl()+"api/user/update/designation/",e)}updateInvoiceSequence(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/invoiceSequence/",e)}updateBatchSequence(e){return this.httpClient.put(this.commonService.envUrl()+"api/admin/update/batchSequence/",e)}}return e.\u0275fac=function(t){return new(t||e)(n.rc(a.b),n.rc(c.a))},e.\u0275prov=n.Zb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);