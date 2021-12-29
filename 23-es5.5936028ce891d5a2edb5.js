!function(){function t(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||e(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){if(t){if("string"==typeof t)return i(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,e,i){return e&&r(t.prototype,e),i&&r(t,i),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{ENVk:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var r=i("4/8P"),c=i("fXoL"),s=i("tk/3"),o=function(){var t=function(){function t(e,i){a(this,t),this.httpClient=e,this.commonService=i}return n(t,[{key:"getAllQualityByParty",value:function(t){return this.httpClient.get(this.commonService.envUrl()+"api/Quality/ByParty/"+t)}},{key:"getAllUserHeads",value:function(){return this.httpClient.get(this.commonService.envUrl()+"api/userHead")}},{key:"getPartyQualityByMaster",value:function(t){return this.httpClient.get(this.commonService.envUrl()+"api/QualityAndParty/ByMaster/"+t)}},{key:"getBatchByMasterId",value:function(t){return this.httpClient.get(this.commonService.envUrl()+"api/batch/ByMaster/"+t)}},{key:"getBatchDataBybatchNo",value:function(t,e){return this.httpClient.get(this.commonService.envUrl()+"api/batch/"+e+"/"+t)}},{key:"addFinishedMeter",value:function(t){return this.httpClient.put(this.commonService.envUrl()+"api/batch/finishMtr",t)}},{key:"getBatchesByPartyQuality",value:function(t,e){return this.httpClient.get(this.commonService.envUrl()+"api/stockBatch/batch/ByQualityAndPartyWithProductionPlan/"+t+"/"+e)}},{key:"getAllBatchForFinishMeter",value:function(){return this.httpClient.get(this.commonService.envUrl()+"api/stockBatch/getAllBatchForFinishMtr")}},{key:"getAllBatchForFinishMeterPaginated",value:function(t){return this.httpClient.post(this.commonService.envUrl()+"api/stockBatch/getAllBatchForFinishMtr/allPaginated",t)}},{key:"removeBatch",value:function(t){return this.httpClient.delete(this.commonService.envUrl()+"api/batch/removeBy?productionId="+t)}}]),t}();return t.\u0275fac=function(e){return new(e||t)(c.rc(s.b),c.rc(r.a))},t.\u0275prov=c.Zb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},xcYi:function(i,r,c){"use strict";c.r(r),c.d(r,"FinishedMeterModule",(function(){return Y}));var s=c("ofXK"),o=c("tyNb"),d=c("Fp+y"),l=c("1G5W"),h=c("XNiG"),u=c("O1SP"),f=function t(){a(this,t),this.batchId=null},m=function t(){a(this,t),this.isProductionPlanned=!1,this.isExtra=!1,this.mergeBatchId="",this.isBillGenrated=!1,this.seqNo=0,this.id=0,this.mtr=null,this.wt=null,this.batchId="",this.controlId=0,this.isProductionPlanned=!1,this.isExtra=!1,this.sequenceId=0,this.finishMtr="0",this.isBillGenrated=!1},b=c("4/8P"),p=c("ENVk"),y=c("8k+d"),v=c("RNo3"),g=c("kF6S"),M=c("dfbw"),I=c("3jao"),q=c("qZsz"),F=c("fXoL"),j=c("5eHb"),S=c("1kSV"),D=c("aceb"),k=c("3Pt+"),B=c("ZOsW"),w=c("lDzL");function A(t,e){if(1&t&&(F.jc(0,"ng-option",30),F.jc(1,"div",4),F.jc(2,"div",12),F.jc(3,"div",13),F.jd(4),F.ic(),F.ic(),F.jc(5,"div",12),F.jc(6,"div",14),F.jd(7),F.ic(),F.ic(),F.ic(),F.ic()),2&t){var i=e.$implicit;F.Hc("value",i.id),F.Pb(4),F.ld(" ",i.partyName,""),F.Pb(3),F.ld(" ",i.partyCode,"")}}function C(t,e){if(1&t&&(F.jc(0,"ng-option",30),F.jd(1),F.ic()),2&t){var i=e.$implicit;F.Hc("value",i.id?i.id:i.qualityEntryId),F.Pb(1),F.ld(" ",i.qualityId," ")}}function x(t,e){if(1&t&&(F.jc(0,"ng-option",30),F.jd(1),F.ic()),2&t){var i=e.$implicit;F.Hc("value",i.id),F.Pb(1),F.ld(" ",i.userName," ")}}var P=function(t,e){return{"active-button":t,"inactive-button":e}};function E(t,e){if(1&t){var i=F.kc();F.jc(0,"button",31),F.uc("click",(function(t){return F.Xc(i),F.yc().batchSelected(t)})),F.jd(1),F.jc(2,"nb-icon",32),F.uc("click",(function(t){F.Xc(i);var a=e.$implicit;return F.yc().remove(a),t.stopPropagation()})),F.ic(),F.ic()}if(2&t){var a=e.$implicit,r=F.yc();F.Hc("ngClass",F.Oc(4,P,a.batchId==r.finishedMeterForm.batchId,a.batchId!=r.finishedMeterForm.batchId))("disabled",!a.productionPlanned)("value",a.batchId),F.Pb(1),F.ld(" ",a.batchId," ")}}var L=function(){return{type:"zoom"}},H=function(t){return{animation:t}};function O(t,e){if(1&t){var i=F.kc();F.jc(0,"nb-icon",50),F.uc("click",(function(t){F.Xc(i);var a=e.rowIndex;return F.yc(2).removeMeter(t,a)})),F.ic()}2&t&&F.Hc("options",F.Nc(2,H,F.Mc(1,L)))}function N(t,e){1&t&&F.ec(0,"ngx-datatable-column",51),2&t&&F.Hc("sortable",!1)("width",200)}function U(t,e){1&t&&(F.jc(0,"div",55),F.jc(1,"span"),F.jd(2,"Required"),F.ic(),F.ic())}var Q=function(t){return{"is-invalid":t}};function T(t,e){if(1&t){var i=F.kc();F.jc(0,"input",52,53),F.uc("ngModelChange",(function(t){return F.Xc(i),e.row.mtr=t}))("keypress",(function(t){return F.Xc(i),F.yc(2).numberOnly(t)}))("keyup",(function(t){F.Xc(i);var a=e.rowIndex;return F.yc(2).onKeyUpMeter(t,a,2,"Meter")})),F.ic(),F.hd(2,U,3,0,"div",54)}if(2&t){var a=e.row,r=e.rowIndex,n=F.Uc(1),c=F.yc(2);F.Jc("name","tableMeter",r,""),F.Hc("min",1)("ngModel",a.mtr)("id","batchData"+r+"-2")("ngClass",F.Nc(6,Q,c.formSubmitted&&n.invalid)),F.Pb(2),F.Hc("ngIf",c.formSubmitted&&n.invalid)}}function G(t,e){1&t&&(F.jc(0,"div",55),F.jc(1,"span"),F.jd(2,"Required"),F.ic(),F.ic())}function z(t,e){if(1&t){var i=F.kc();F.jc(0,"input",56,57),F.uc("ngModelChange",(function(t){return F.Xc(i),e.row.finishMtr=t}))("keyup",(function(t){F.Xc(i);var a=e.rowIndex;return F.yc(2).onKeyUp(t,a,3,"fMeter")})),F.ic(),F.hd(2,G,3,0,"div",54)}if(2&t){var a=e.row,r=e.rowIndex,n=F.Uc(1),c=F.yc(2);F.Jc("name","tableFinishMeter",r,""),F.Hc("disabled",c.finishedMeterForm.batchData[r].isBillGenrated)("ngModel",a.finishMtr)("id","batchData"+r+"-3")("ngClass",F.Nc(6,Q,c.formSubmitted&&n.invalid)),F.Pb(2),F.Hc("ngIf",c.formSubmitted&&n.invalid)}}function X(t,e){1&t&&(F.jc(0,"div",55),F.jc(1,"span"),F.jd(2,"Required"),F.ic(),F.ic())}function $(t,e){if(1&t){var i=F.kc();F.jc(0,"input",58,59),F.uc("ngModelChange",(function(t){return F.Xc(i),e.row.sequenceId=t}))("keyup",(function(t){F.Xc(i);var a=e.rowIndex;return F.yc(2).onKeyUp(t,a,4,"sequence")})),F.ic(),F.hd(2,X,3,0,"div",54)}if(2&t){var a=e.row,r=e.rowIndex,n=F.Uc(1),c=F.yc(2);F.Jc("name","tableSequence",r,""),F.Hc("disabled",c.finishedMeterForm.batchData[r].isBillGenrated)("ngModel",a.sequenceId)("id","batchData"+r+"-4")("ngClass",F.Nc(6,Q,c.formSubmitted&&n.invalid)),F.Pb(2),F.Hc("ngIf",c.formSubmitted&&n.invalid)}}function W(t,e){if(1&t&&(F.jc(0,"div",4),F.jc(1,"nb-card-header",33),F.jc(2,"div",34),F.jc(3,"div",35),F.jc(4,"span"),F.jd(5),F.zc(6,"number"),F.ic(),F.ic(),F.jc(7,"div",36),F.jc(8,"span"),F.jd(9),F.zc(10,"number"),F.ic(),F.ic(),F.jc(11,"div",36),F.jc(12,"span"),F.jd(13),F.zc(14,"number"),F.ic(),F.ic(),F.jc(15,"div",37),F.jc(16,"span"),F.jd(17),F.zc(18,"number"),F.ic(),F.ic(),F.ic(),F.ic(),F.jc(19,"div",38),F.jc(20,"ngx-datatable",39,40),F.jc(22,"ngx-datatable-column",41),F.hd(23,O,1,4,"ng-template",42),F.ic(),F.hd(24,N,1,2,"ngx-datatable-column",43),F.ec(25,"ngx-datatable-column",44),F.ec(26,"ngx-datatable-column",45),F.ec(27,"ngx-datatable-column",46),F.jc(28,"ngx-datatable-column",47),F.hd(29,T,3,8,"ng-template",42),F.ic(),F.jc(30,"ngx-datatable-column",48),F.hd(31,z,3,8,"ng-template",42),F.ic(),F.jc(32,"ngx-datatable-column",49),F.hd(33,$,3,8,"ng-template",42),F.ic(),F.ic(),F.ic(),F.ic()),2&t){var i=F.yc();F.Pb(5),F.ld("Total Grs: ",i.finishedMeterForm.batchData?i.finishedMeterForm.batchData[i.finishedMeterForm.batchData.length-1].seqNo:F.Bc(6,20,0,"1.2-2"),""),F.Pb(4),F.ld("Total Weight: ",F.Bc(10,23,i.totalWeight,"1.2-2"),""),F.Pb(4),F.ld("Total Gr Meter: ",F.Bc(14,26,i.totalGrMeter,"1.2-2"),""),F.Pb(4),F.ld("Total Finish Meter: ",F.Bc(18,29,i.totalFinishMeter,"1.2-2"),""),F.Pb(3),F.Hc("rows",i.finishedMeterForm.batchData)("headerHeight",31)("scrollbarV",!0),F.Pb(4),F.Hc("ngIf",i.isMergeBatch),F.Pb(1),F.Hc("sortable",!1)("width",200),F.Pb(1),F.Hc("sortable",!1)("width",200),F.Pb(1),F.Hc("sortable",!1)("width",200),F.Pb(1),F.Hc("sortable",!1)("width",200),F.Pb(2),F.Hc("sortable",!1)("width",200),F.Pb(2),F.Hc("sortable",!1)("width",200)}}var K,R,V,J=[{path:"",component:(K=function(){function i(t,e,r,n,c,s){a(this,i),this.commonService=t,this.partyService=e,this.qualityService=r,this.toastr=n,this.finishedMeterService=c,this.modalService=s,this.errorData=u,this.formSubmitted=!1,this.isAddButtonClicked=!1,this.isMergeBatch=!1,this.indexOfBatchData=1,this.sequenceArray=[],this.totalFinishMeter=0,this.totalGrMeter=0,this.totalWeight=0,this.selectedBatch="",this.searchBatchString="",this.batchListCopy=[],this.requestData=new M.a,this.currentPage=0,this.finishedMeterForm=new f,this.destroy$=new h.a}return n(i,[{key:"ngOnDestroy",value:function(){this.destroy$.next(),this.destroy$.complete()}},{key:"ngOnInit",value:function(){this.requestData.getBy="all",this.requestData.data=new I.a,this.requestData.data.isAnd=!0,this.getData(),this.getAllParty(),this.getAllQuality(),this.getAllMasters(),this.getAllBatchForFinishMtr()}},{key:"resetAll",value:function(t){this.batchList=[],this.batchListCopy=[],this.getAllBatchForFinishMtr(),this.finishedMeterForm.batchId=null,t.reset()}},{key:"pageChanged",value:function(t){this.requestData.data.pageIndex=t-1,this.getAllBatchForFinishMtr()}},{key:"getData",value:function(){this.user=this.commonService.getUser(),this.userHead=this.commonService.getUserHeadId()}},{key:"getAllParty",value:function(){var t=this;this.partyService.getAllPartyWithNameOnly().pipe(Object(l.a)(this.destroy$)).subscribe((function(e){e.success&&(t.partyList=e.data)}),(function(t){}))}},{key:"getAllQuality",value:function(){var t=this;this.qualityService.getAllQualityWithNameOnly().pipe(Object(l.a)(this.destroy$)).subscribe((function(e){e.success&&(t.qualityList=e.data)}),(function(t){}))}},{key:"getAllMasters",value:function(){var t=this;this.finishedMeterService.getAllUserHeads().pipe(Object(l.a)(this.destroy$)).subscribe((function(e){e.success&&(t.masterList=e.data)}),(function(t){}))}},{key:"getAllBatchForFinishMtr",value:function(){var t=this;this.batchList=[],this.batchListCopy=[],this.finishedMeterService.getAllBatchForFinishMeterPaginated(this.requestData).pipe(Object(l.a)(this.destroy$)).subscribe((function(e){if(e.success){var i=e.data;t.batchList=i.data,t.requestData.data.total=i.total,t.batchListCopy=i.data}}),(function(t){}))}},{key:"enableQuality",value:function(t){var e=this;if(this.qualityList=null,this.finishedMeterForm.qualityId=null,null!=t){this.finishedMeterService.getAllQualityByParty(this.finishedMeterForm.partyId).pipe(Object(l.a)(this.destroy$)).subscribe((function(t){t.success?(e.qualityList=t.data.qualityDataList,e.qualityList.forEach((function(e){e.partyName=t.data.partyName,e.partyId=t.data.partyId}))):e.toastr.error(t.msg)}),(function(t){e.toastr.error(u.Internal_Error)})),this.finishedMeterForm.masterId=null,this.requestData.data.parameters=this.requestData.data.parameters.filter((function(t){return"userHeadId"!=t.field[0]&&"qualityEntryId"!=t.field[0]}));var i=this.requestData.data.parameters.findIndex((function(t){return t.field.find((function(t){return"partyId"==t}))}));if(i>-1)this.requestData.data.parameters[i].field=["partyId"],this.requestData.data.parameters[i].operator="EQUALS",this.requestData.data.parameters[i].value=String(this.finishedMeterForm.partyId);else{var a=new q.a;a.field=["partyId"],a.value=String(this.finishedMeterForm.partyId),a.operator="EQUALS",this.requestData.data.parameters.push(a)}this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}else this.batchList=[],this.batchListCopy=[],this.getAllParty(),this.getAllQuality(),this.requestData.data.parameters=this.requestData.data.parameters.filter((function(t){return"userHeadId"!=t.field[0]&&"qualityEntryId"!=t.field[0]&&"partyId"!=t.field[0]})),this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}},{key:"filterBySearchBatches",value:function(){if(this.finishedMeterForm.batchId=null,this.searchBatchString){var t=this.requestData.data.parameters.findIndex((function(t){return t.field.find((function(t){return"batchId"==t}))}));if(t>-1)this.requestData.data.parameters[t].field=["batchId"],this.requestData.data.parameters[t].operator="LIKE",this.requestData.data.parameters[t].value=this.searchBatchString;else{var e=new q.a;e.field=["batchId"],e.value=this.searchBatchString,e.operator="LIKE",this.requestData.data.parameters.push(e)}this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}else this.requestData.data.pageIndex=0,this.requestData.data.parameters=this.requestData.data.parameters.filter((function(t){return"batchId"!=t.field[0]})),this.getAllBatchForFinishMtr()}},{key:"batchSelected",value:function(t){var e,i=this;t&&(this.isMergeBatch=t.target.value.toString().indexOf("-")>-1,this.finishedMeterForm.batchId=t.target.value,this.batchList.forEach((function(t){i.finishedMeterForm.batchId==t.batchId&&(e=t.controlId,i.finishedMeterForm.masterId&&(i.finishedMeterForm.partyId=t.partyId,i.finishedMeterForm.qualityId=t.qualityEntryId))})),this.finishedMeterService.getBatchDataBybatchNo(this.finishedMeterForm.batchId,e).pipe(Object(l.a)(this.destroy$)).subscribe((function(t){t.success&&(i.finishedMeterForm.batchData=t.data,i.totalFinishMeter=0,i.finishedMeterForm.batchData.forEach((function(t){i.totalFinishMeter+=Number(t.finishMtr),t.mtr&&(t.sequenceId=t.id)})),i.CalculateTotalGrMtr(),i.setSequenceNo(!1),i.setArrayOfSequence(),i.setfinishedSequenceAccordingToIdReverse(),i.setSequenceNo(!1))}),(function(t){})))}},{key:"qualitySelected",value:function(t){var e=this;if(null!=t){if(this.finishedMeterForm.batchId=null,this.batchList=null,this.batchListCopy=null,!this.finishedMeterForm.partyId){var i=this.qualityList.find((function(t){return t.id===e.finishedMeterForm.qualityId}));this.finishedMeterForm.partyId=i.partyId}this.qualityList.forEach((function(t){var i=t.id?t.id:t.qualityEntryId;i==e.finishedMeterForm.qualityId&&t.partyId})),this.finishedMeterForm.masterId=null;var a=this.requestData.data.parameters.findIndex((function(t){return t.field.find((function(t){return"qualityEntryId"==t}))}));if(a>-1)this.requestData.data.parameters[a].field=["qualityEntryId"],this.requestData.data.parameters[a].operator="EQUALS",this.requestData.data.parameters[a].value=String(this.finishedMeterForm.qualityId);else{var r=new q.a;r.field=["qualityEntryId"],r.value=String(this.finishedMeterForm.qualityId),r.operator="EQUALS",this.requestData.data.parameters.push(r)}this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}else{this.finishedMeterForm.batchId=null,this.batchList=[],this.batchListCopy=[],this.getAllQuality();var n=this.requestData.data.parameters.findIndex((function(t){return t.field.find((function(t){return"qualityEntryId"==t}))}));n>-1&&this.requestData.data.parameters.splice(n,1),this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}}},{key:"masterSelected",value:function(t){var e=this;if(this.batchList=null,this.batchListCopy=null,this.finishedMeterForm.batchId=null,null!=t){this.qualityList.forEach((function(t){(t.id?t.id:t.qualityEntryId)==e.finishedMeterForm.qualityId&&(e.finishedMeterForm.partyId=t.partyId)})),this.finishedMeterForm.qualityId=null,this.finishedMeterForm.partyId=null,this.requestData.data.parameters=this.requestData.data.parameters.filter((function(t){return"partyId"!=t.field[0]&&"qualityEntryId"!=t.field[0]}));var i=this.requestData.data.parameters.findIndex((function(t){return t.field.find((function(t){return"userHeadId"==t}))}));if(i>-1)this.requestData.data.parameters[i].field=["userHeadId"],this.requestData.data.parameters[i].operator="EQUALS",this.requestData.data.parameters[i].value=String(this.finishedMeterForm.masterId);else{var a=new q.a;a.field=["userHeadId"],a.value=String(this.finishedMeterForm.masterId),a.operator="EQUALS",this.requestData.data.parameters.push(a)}this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}else this.getAllParty(),this.requestData.data.parameters=this.requestData.data.parameters.filter((function(t){return"partyId"!=t.field[0]&&"qualityEntryId"!=t.field[0]&&"userHeadId"!=t.field[0]})),this.requestData.data.pageIndex=0,this.getAllBatchForFinishMtr()}},{key:"numberOnly",value:function(t){var e=t.which?t.which:t.keyCode;return 46==e||!(e>31&&(e<48||e>57)||69==e)}},{key:"CalculateTotalGrMtr",value:function(){var t=this;this.totalGrMeter=0,this.totalWeight=0,this.finishedMeterForm.batchData.forEach((function(e){t.totalGrMeter+=Number(e.mtr?e.mtr:0),t.totalWeight+=Number(e.wt?e.wt:0)}))}},{key:"onKeyUpMeter",value:function(t,e,i,a){var r=this;if(this.CalculateTotalGrMtr(),13==(t.keyCode?t.keyCode:t.which)&&2==i&&this.finishedMeterForm.batchData.length>e+1){this.index="batchData"+(e+1)+"-"+i;var n=setInterval((function(){var t=document.getElementById(r.index);if(null!=t){t.focus(),t.select(),clearInterval(n);var e=document.getElementById(r.index);e&&e.scrollIntoView(!0)}else{var i=document.querySelector("datatable-scroller");i&&i.scrollBy(0,10)}}),10)}}},{key:"onKeyUp",value:function(t,i,a,r){var n=this;if(this.totalFinishMeter=0,this.finishedMeterForm.batchData.forEach((function(t){var i=0,a=t.finishMtr.toString();if(a.indexOf("+")>-1){var r,c=function(t,i){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=e(t))||i&&t&&"number"==typeof t.length){a&&(t=a);var r=0,n=function(){};return{s:n,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,s=!0,o=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return s=t.done,t},e:function(t){o=!0,c=t},f:function(){try{s||null==a.return||a.return()}finally{if(o)throw c}}}}(a.split("+"));try{for(c.s();!(r=c.n()).done;){var s=r.value;i+=Number(s)}}catch(o){c.e(o)}finally{c.f()}}n.totalFinishMeter+=Number(i||a)})),t&&i>-1&&a>-1&&r&&13==(t.keyCode?t.keyCode:t.which)&&(3==a||4==a)){this.index="batchData"+(i+1)+"-"+a;var c=setInterval((function(){var t=document.getElementById(n.index);if(null!=t){t.focus(),t.select(),clearInterval(c);var e=document.getElementById(n.index);e&&e.scrollIntoView(!0)}else{var i=document.querySelector("datatable-scroller");i&&i.scrollBy(0,10)}}),10)}}},{key:"removeMeter",value:function(e,i){var a=this.finishedMeterForm.batchData;if(1==this.finishedMeterForm.batchData.length){var r=new m;r.batchId=this.finishedMeterForm.batchData[0].batchId,r.controlId=this.finishedMeterForm.batchData[0].controlId;var n=[Object.assign({},r)];this.finishedMeterForm.batchData=[].concat(n)}else a.splice(i,1),this.finishedMeterForm.batchData=t(a);this.onKeyUp(),this.CalculateTotalGrMtr()}},{key:"arrangeAllSequenceNo",value:function(){this.finishedMeterForm.batchData.forEach((function(t){t.sequenceId!=t.seqNo&&(t.sequenceId=t.seqNo)}))}},{key:"splitExtraMeters",value:function(){var e=this;this.finishedMeterForm.batchData.forEach((function(i){if(i.finishMtr.toString().indexOf("+")>-1)for(var a=i.finishMtr.split("+"),r=0;r<a.length;r++)if(0==r)i.finishMtr=a[r];else{var n=new m;n.sequenceId=i.sequenceId,n.batchId=i.batchId,n.controlId=i.controlId,n.finishMtr=a[r],n.isExtra=!0,n.mtr=i.mtr,n.mergeBatchId=i.mergeBatchId;var c=t(e.finishedMeterForm.batchData);c.push(n),e.finishedMeterForm.batchData=t(c)}}))}},{key:"addFinishedMeter",value:function(t){var e=this;this.isAddButtonClicked=!0;var i=!1;if(this.finishedMeterForm.batchData.forEach((function(t){null==t.finishMtr&&(i=!0)})),0==i){var a=!1;if(this.finishedMeterForm.batchData.forEach((function(t){t.mtr&&!t.mtr||(!t.finishMtr||t.finishMtr<="0")&&t.sequenceId&&(a=!0)})),a)this.isAddButtonClicked=!1,this.toastr.error("Please fill sequence id and finish meter both.");else{var r=0;this.finishedMeterForm.batchData.forEach((function(t){0!=t.id||null!=t.mtr&&0!=t.mtr||!("0"==t.finishMtr||null==t.finishMtr||Number(t.finishMtr)<=0)||e.finishedMeterForm.batchData.splice(r,1),r++}));var n=!0;this.setfinishedSequenceAccordingToId(),this.finishedMeterForm.batchData.forEach((function(t){e.finishedMeterForm.batchData.some((function(e){return e.id===t.sequenceId}))||(n=!1)})),n?(this.splitExtraMeters(),this.finishedMeterService.addFinishedMeter(this.finishedMeterForm.batchData).pipe(Object(l.a)(this.destroy$)).subscribe((function(i){i.success?(e.toastr.success(i.msg),t.reset(),e.batchList=null,e.batchListCopy=null,e.isAddButtonClicked=!1,e.finishedMeterForm=new f,e.finishedMeterForm.batchData=null,e.totalFinishMeter=0,e.getAllBatchForFinishMtr()):(e.isAddButtonClicked=!1,e.toastr.error(i.msg),e.setSequenceNo(!1))}),(function(t){e.isAddButtonClicked=!1,e.toastr.error(u.Internal_Error),e.setSequenceNo(!1)}))):(this.isAddButtonClicked=!1,this.toastr.error("Invalid sequence-id entered"),this.setfinishedSequenceAccordingToIdReverse())}}else this.isAddButtonClicked=!1,this.toastr.error("Enter all data")}},{key:"setArrayOfSequence",value:function(){for(var t=0;t<this.indexOfBatchData-1;t++)this.finishedMeterForm.batchData[t].mtr&&(this.sequenceArray[t]=this.finishedMeterForm.batchData[t].id)}},{key:"setfinishedSequenceAccordingToId",value:function(){var t=this;this.finishedMeterForm.batchData.forEach((function(e){e.sequenceId=t.sequenceArray[e.sequenceId-1]}))}},{key:"setfinishedSequenceAccordingToIdReverse",value:function(){var t=this;this.finishedMeterForm.batchData.forEach((function(e){e.sequenceId=t.sequenceArray.indexOf(e.sequenceId)+1}))}},{key:"setSequenceNo",value:function(t){var e=this;this.indexOfBatchData=1,this.finishedMeterForm.batchData.forEach((function(i){i.seqNo=e.indexOfBatchData,e.indexOfBatchData++,t&&(i.sequenceId=i.id)}))}},{key:"remove",value:function(t){var e=this;this.modalService.open(g.a).result.then((function(i){i&&e.finishedMeterService.removeBatch(t.productionId).pipe(Object(l.a)(e.destroy$)).subscribe((function(t){e.finishedMeterForm.batchId=null,e.toastr.success(u.Delete),e.getAllBatchForFinishMtr()}),(function(t){e.toastr.error(u.Serever_Error)}))}))}}]),i}(),K.\u0275fac=function(t){return new(t||K)(F.dc(b.a),F.dc(y.a),F.dc(v.a),F.dc(j.b),F.dc(p.a),F.dc(S.e))},K.\u0275cmp=F.Xb({type:K,selectors:[["ngx-add-edit-finished-meter"]],decls:69,vars:17,consts:[[1,"nb-style"],[1,"nb-header"],[1,"nb-text"],["myForm","ngForm"],[1,"row"],[1,"col-md-6"],[1,"form-group","mb-1"],[1,"col-md-2","col-12","display-flex-start","label-0"],[1,"col-md-10","col-12"],["name","partyId","appendTo","body","placeholder","Select Party",3,"ngModel","ngModelChange","change"],["partyId1","ngModel"],["disabled","true"],[1,"col-md-6","col-6"],[1,"text-left","txt-ov-elips"],[1,"text-right","txt-ov-elips"],[3,"value",4,"ngFor","ngForOf"],[1,"form-group"],["name","qualityId","appendTo","body","placeholder","Select Quality",3,"ngModel","ngModelChange","change"],["qualityId1","ngModel"],["name","masterId","appendTo","body","required","","placeholder","Select Master",1,"required-error-dropdown",3,"ngModel","ngClass","ngModelChange","change"],["type","text","name","searchBatch","placeholder","Search By Batch-Id",1,"form-control",3,"ngModel","ngModelChange","keyup"],[1,"col-md-12"],[1,"batch-list-3line"],["type","button","nbButton","","size","small","class","p-badge-design",3,"ngClass","disabled","value","click",4,"ngFor","ngForOf"],[1,"d-flex","justify-content-end",3,"pageSize","maxSize","collectionSize","page","pageChange"],["class","row",4,"ngIf"],[1,"col-md-12","mobile-btn-center","text-btn-right"],[1,"mobile-pad-top-15"],["type","button","type","button","routerLink","/pages/finishedMeter",1,"btn","btn-primary","btn-sm","btn-design-cancel",3,"click"],["type","button",1,"btn","btn-primary","btn-sm","btn-design-save","button-base","ripple",3,"disabled","click"],[3,"value"],["type","button","nbButton","","size","small",1,"p-badge-design",3,"ngClass","disabled","value","click"],["icon","close-circle-outline",1,"icon-pposition",3,"click"],[1,"nb-header","w-100"],[1,"row","nb-text"],[1,"col-md-2"],[1,"col-md-3"],[1,"col-md-4"],["id","fmtr-table",1,"col-md-12"],[1,"material","common-table","datatable-auto-height","fm-table-body-height",2,"height","200px",3,"rows","headerHeight","scrollbarV"],["table",""],["name","Action","sortable","false","prop","mtr"],["ngx-datatable-cell-template",""],["name","Batch ID","prop","batchId",3,"sortable","width",4,"ngIf"],["name","Gr Meter Sequence","prop","seqNo",3,"sortable","width"],["name","Pchallan Ref","prop","pchallanRef",3,"sortable","width"],["name","Weight","prop","wt",3,"sortable","width"],["name","Gr Meter","prop","mtr",3,"sortable","width"],["name","Finish Meter","prop","finishMtr",3,"sortable","width"],["name","Finish Meter Sequence","prop","sequenceId",3,"sortable","width"],["icon","trash","status","danger",3,"options","click"],["name","Batch ID","prop","batchId",3,"sortable","width"],["type","number","required","",1,"tableForm",3,"min","name","ngModel","id","ngClass","ngModelChange","keypress","keyup"],["tableMeter12","ngModel"],["class","input-required display-inlineblock",4,"ngIf"],[1,"input-required","display-inlineblock"],["type","text","required","",1,"tableForm",3,"disabled","name","ngModel","id","ngClass","ngModelChange","keyup"],["tableMeter1","ngModel"],["type","number","disabled","true","required","",1,"tableForm",3,"name","disabled","ngModel","id","ngClass","ngModelChange","keyup"],["tableWeight1","ngModel"]],template:function(t,e){if(1&t){var i=F.kc();F.jc(0,"nb-card",0),F.jc(1,"nb-card-header",1),F.jc(2,"div"),F.jc(3,"h2",2),F.jd(4,"Finished Meter"),F.ic(),F.ic(),F.ic(),F.jc(5,"nb-card-body"),F.jc(6,"div"),F.jc(7,"form",null,3),F.jc(9,"div",4),F.jc(10,"div",5),F.jc(11,"div",6),F.jc(12,"div",4),F.jc(13,"div",7),F.jc(14,"label"),F.jd(15,"Party"),F.ic(),F.ic(),F.jc(16,"div",8),F.jc(17,"ng-select",9,10),F.uc("ngModelChange",(function(t){return e.finishedMeterForm.partyId=t}))("change",(function(t){return e.enableQuality(t)})),F.jc(19,"ng-option",11),F.jc(20,"div",4),F.jc(21,"div",12),F.jc(22,"div",13),F.jd(23,"Party Name "),F.ic(),F.ic(),F.jc(24,"div",12),F.jc(25,"div",14),F.jd(26," Party Code"),F.ic(),F.ic(),F.ic(),F.ic(),F.hd(27,A,8,3,"ng-option",15),F.ic(),F.ic(),F.ic(),F.ic(),F.jc(28,"div",16),F.jc(29,"div",4),F.jc(30,"div",7),F.jc(31,"label"),F.jd(32,"Quality"),F.ic(),F.ic(),F.jc(33,"div",8),F.jc(34,"ng-select",17,18),F.uc("ngModelChange",(function(t){return e.finishedMeterForm.qualityId=t}))("change",(function(t){return e.qualitySelected(t)})),F.hd(36,C,2,2,"ng-option",15),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.jc(37,"div",5),F.jc(38,"div",6),F.jc(39,"div",4),F.jc(40,"div",7),F.jc(41,"label"),F.jd(42,"Master"),F.ic(),F.ic(),F.jc(43,"div",8),F.jc(44,"ng-select",19,10),F.uc("ngModelChange",(function(t){return e.finishedMeterForm.masterId=t}))("change",(function(t){return e.masterSelected(t)})),F.hd(46,x,2,2,"ng-option",15),F.ic(),F.ic(),F.ic(),F.ic(),F.jc(47,"div",16),F.jc(48,"div",4),F.jc(49,"div",7),F.jc(50,"label"),F.jd(51,"Batch Filter"),F.ic(),F.ic(),F.jc(52,"div",8),F.jc(53,"input",20),F.uc("ngModelChange",(function(t){return e.searchBatchString=t}))("keyup",(function(){return e.filterBySearchBatches()})),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.jc(54,"div",21),F.jc(55,"div",6),F.jc(56,"div",4),F.jc(57,"div",21),F.jc(58,"div",22),F.hd(59,E,3,7,"button",23),F.ic(),F.jc(60,"ngb-pagination",24),F.uc("pageChange",(function(t){return e.pageChanged(t)})),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.hd(61,W,34,32,"div",25),F.jc(62,"div",4),F.jc(63,"div",26),F.jc(64,"div",27),F.jc(65,"button",28),F.uc("click",(function(){F.Xc(i);var t=F.Uc(8);return e.resetAll(t)})),F.jd(66,"CANCEL"),F.ic(),F.jc(67,"button",29),F.uc("click",(function(){F.Xc(i);var t=F.Uc(8);return e.addFinishedMeter(t)})),F.jd(68,"SAVE"),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.ic(),F.ic()}if(2&t){var a=F.Uc(18);F.Pb(17),F.Hc("ngModel",e.finishedMeterForm.partyId),F.Pb(10),F.Hc("ngForOf",e.partyList),F.Pb(7),F.Hc("ngModel",e.finishedMeterForm.qualityId),F.Pb(2),F.Hc("ngForOf",e.qualityList),F.Pb(8),F.Hc("ngModel",e.finishedMeterForm.masterId)("ngClass",F.Nc(15,Q,e.formSubmitted&&a.invalid)),F.Pb(2),F.Hc("ngForOf",e.masterList),F.Pb(7),F.Hc("ngModel",e.searchBatchString),F.Pb(6),F.Hc("ngForOf",e.batchList),F.Pb(1),F.Hc("pageSize",e.requestData.data.pageSize)("maxSize",5)("collectionSize",e.requestData.data.total)("page",e.requestData.data.pageIndex),F.Pb(1),F.Hc("ngIf",e.finishedMeterForm.batchId),F.Pb(6),F.Hc("disabled",e.isAddButtonClicked)}},directives:[D.u,D.x,D.t,k.x,k.m,k.n,B.a,k.l,k.o,B.c,s.m,k.t,s.l,k.a,S.g,s.n,o.d,D.q,D.I,w.e,w.b,w.a,k.q],pipes:[s.f],styles:[".active-button[_ngcontent-%COMP%]{background-color:#274fc4!important}.inactive-button[_ngcontent-%COMP%]{background-color:#5e5b5e!important}"]}),K),canActivate:[d.a],canLoad:[d.a],data:{PermissionName:["view","view group","view all"]}}],_=((R=function t(){a(this,t)}).\u0275mod=F.bc({type:R}),R.\u0275inj=F.ac({factory:function(t){return new(t||R)},imports:[[o.g.forChild(J)],o.g]}),R),Z=c("yzeJ"),Y=((V=function t(){a(this,t)}).\u0275mod=F.bc({type:V}),V.\u0275inj=F.ac({factory:function(t){return new(t||V)},imports:[[s.c,Z.a,k.s,D.B,w.g,_]]}),V)}}])}();