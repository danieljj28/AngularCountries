import{L as l,M as d,N as f,P as u,S as a,V as h,W as M,g as r,i as c,j as i,r as s,s as m,t as p}from"./chunk-P6OAIBLH.js";var b=[{path:"countries",loadChildren:()=>import("./chunk-BYHVUZRJ.js").then(o=>o.CountriesModule)},{path:"**",redirectTo:"countries"}],y=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t}),t.\u0275inj=r({imports:[a.forRoot(b,{useHash:!0}),a]});let o=t;return o})();var g=(()=>{let t=class t{constructor(){this.title="countryApp"}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c({type:t,selectors:[["app-root"]],decls:5,vars:0,consts:[[1,"row","mt-4"],[1,"col-3"],[1,"col"]],template:function(e,w){e&1&&(s(0,"div",0)(1,"div",1),p(2,"shared-sidebar"),m(),s(3,"div",2),p(4,"router-outlet"),m()())},dependencies:[u,h]});let o=t;return o})();var v=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=i({type:t,bootstrap:[g]}),t.\u0275inj=r({imports:[f,y,l,M]});let o=t;return o})();d().bootstrapModule(v).catch(o=>console.error(o));