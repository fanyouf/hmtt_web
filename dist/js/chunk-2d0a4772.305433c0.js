(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a4772"],{"070e":function(n,r,t){"use strict";t.r(r);var e=function(){var n=this,r=n.$createElement,t=n._self._c||r;return t("div",[n._v(" question/index.vue "),t("son",{attrs:{arr:n.arr,msg:n.msg}})],1)},s=[],a=function(){var n=this,r=n.$createElement,t=n._self._c||r;return t("div",[t("h1",[n._v("子组件")]),t("p",[n._v("msg:"+n._s(n.msg))]),n._v(" "),t("button",{on:{click:n.hClickMsg}},[n._v("修改属性msg")]),t("div",[n._v("arr: "+n._s(n.arr))]),n._v(" "),t("button",{on:{click:n.hClickArr}},[n._v("修改属性arr")])])},i=[],u={name:"son",props:{msg:{type:String,validator:function(n){return!(n.length<=3)},default:"hi,vue123"},arr:{type:Array}},methods:{hClickMsg:function(){this.msg="new msg"},hClickArr:function(){this.arr=[1,2,3,"arr"]}}},o=u,c=t("2877"),l=Object(c["a"])(o,a,i,!1,null,null,null),v=l.exports,m={name:"parent",data:function(){return{arr:[1,2,3],msg:"ok,vue"}},components:{Son:v}},h=m,p=Object(c["a"])(h,e,s,!1,null,null,null);r["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0a4772.305433c0.js.map