(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bcdca9c"],{"141b":function(t,e,n){"use strict";var a=n("745d"),r=n.n(a);r.a},1925:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return i}));var a=n("b775"),r=function(t){return Object(a["a"])({method:"GET",url:"/app/v1_0/suggestion",params:{q:t}})},i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Object(a["a"])({method:"GET",url:"/app/v1_0/search",params:{q:t,page:e}})}},"745d":function(t,e,n){},f799:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"serach-result"},[n("van-nav-bar",{attrs:{title:"xxx 的搜索结果","left-arrow":"",fixed:""},on:{"click-left":function(e){return t.$router.back()}}}),n("van-list",{staticClass:"article-list",attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e){return n("van-cell",{key:e.art_id,attrs:{title:e.title},on:{click:function(n){t.$router.push("/article/"+e.art_id.toString())}}})})),1)],1)},r=[],i=n("2909"),c=(n("96cf"),n("1da1")),s=n("1925"),u={name:"SearchResult",data:function(){return{list:[],page:1,loading:!1,finished:!1}},methods:{onLoad:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["a"])(t.$route.query.keyword,t.page);case 2:a=e.sent,r=a.data.data.results,(n=t.list).push.apply(n,Object(i["a"])(r)),t.page++,t.loading=!1,0===r.length&&(t.finished=!0);case 9:case"end":return e.stop()}}),e)})))()}}},o=u,l=(n("141b"),n("2877")),d=Object(l["a"])(o,a,r,!1,null,"7021b6a0",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-3bcdca9c.a5f3cb77.js.map