(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3202f98"],{"0ac2":function(t,e,n){"use strict";var a=n("bf66"),r=n.n(a);r.a},"230c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-container"},[n("van-nav-bar",{attrs:{fixed:"","left-arrow":"",title:t.article.title},on:{"click-left":function(e){return t.$router.back()}}}),t.loading?n("van-loading",{staticClass:"article-loading"}):t._e(),t.is404?n("div",{staticClass:"error"},[n("p",[t._v("文章被外星人吃掉了")]),n("van-button",{on:{click:function(e){return t.$router.back()}}},[t._v("后退")]),n("van-button",{on:{click:function(e){return t.$router.push("/")}}},[t._v("回主页")])],1):n("div",[n("div",{staticClass:"detail"},[n("h3",{staticClass:"title"},[t._v(t._s(t.article.title))]),n("author",{attrs:{author:t.article}},[n("van-button",{directives:[{name:"show",rawName:"v-show",value:!t.isYourself,expression:"!isYourself"}],attrs:{round:"",size:"small",type:"info"},on:{click:t.hSwitchFollow}},[t._v(t._s(t.article.is_followed?"取关":"+ 关注"))])],1),n("div",{staticClass:"content"},[n("div",{domProps:{innerHTML:t._s(t.article.content)}})]),n("van-divider",[t._v("END")]),n("div",{staticClass:"zan"},[n("van-button",{attrs:{round:"",size:"small",hairline:"",type:"primary",plain:"",icon:"good-job-o"}},[t._v("点赞")]),t._v(" "),n("van-button",{attrs:{round:"",size:"small",hairline:"",type:"danger",plain:"",icon:"delete"}},[t._v("不喜欢")])],1)],1),n("article-comment",{attrs:{article_id:t.$route.params.id}})],1)],1)},r=[],i=(n("96cf"),n("1da1")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-comments"},[n("van-list",{attrs:{finished:t.finished,"finished-text":0===t.list.length?"没有评论":"以上所有的评论"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e){return n("van-cell",{key:e.com_id.toString()},[n("van-image",{staticStyle:{"margin-right":"10px"},attrs:{slot:"icon",round:"",width:"30",height:"30",src:e.aut_photo},slot:"icon"}),n("span",{staticStyle:{color:"#466b9d"},attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.aut_name))]),n("div",{attrs:{slot:"label"},slot:"label"},[n("p",{staticStyle:{color:"#363636"}},[t._v(t._s(e.content))]),n("p",[n("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t._f("relativeTime")(e.pubdate)))]),n("van-button",{attrs:{size:"mini",type:"default"},on:{click:function(n){return t.hShowReplay(e)}}},[t._v("回复"+t._s(e.reply_count))])],1)]),n("van-icon",{attrs:{slot:"right-icon",name:"like-o"},slot:"right-icon"})],1)})),1),n("van-cell-group",{staticClass:"publish-wrap"},[n("van-field",{attrs:{clearable:"",placeholder:"请输入评论内容"},model:{value:t.content,callback:function(e){t.content="string"===typeof e?e.trim():e},expression:"content"}},[n("van-button",{attrs:{slot:"button",size:"mini",type:"info"},on:{click:t.hAddComment},slot:"button"},[t._v("发布")])],1)],1),n("van-popup",{style:{height:"85%"},attrs:{round:"",position:"bottom"},model:{value:t.isReplyShow,callback:function(e){t.isReplyShow=e},expression:"isReplyShow"}},[t.isReplyShow?n("comment-reply",{attrs:{comment:t.currentComment,article_id:t.article_id},on:{close:function(e){t.isReplyShow=!1}}}):t._e()],1)],1)},s=[],c=n("2909"),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-comments"},[n("van-nav-bar",{attrs:{title:t.comment.reply_count+"条回复"}},[n("van-icon",{attrs:{slot:"left",name:"cross"},on:{click:function(e){return t.$emit("close")}},slot:"left"})],1),n("van-cell",{attrs:{title:"当前评论"}},[n("van-image",{staticStyle:{"margin-right":"10px"},attrs:{slot:"icon",round:"",width:"30",height:"30",src:t.comment.aut_photo},slot:"icon"}),n("span",{staticStyle:{color:"#466b9d"},attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.comment.aut_name))]),n("div",{attrs:{slot:"label"},slot:"label"},[n("p",{staticStyle:{color:"#363636"}},[t._v(t._s(t.comment.content))]),n("p",[n("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t._f("relativeTime")(t.comment.pubdate)))]),n("van-button",{attrs:{size:"mini",type:"default"}},[t._v("回复 "+t._s(t.comment.reply_count))])],1)]),n("van-icon",{attrs:{slot:"right-icon"},slot:"right-icon"})],1),n("van-divider",[t._v("全部回复")]),n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.list,(function(e,a){return n("van-cell",{key:a},[n("van-image",{staticStyle:{"margin-right":"10px"},attrs:{slot:"icon",round:"",width:"30",height:"30",src:e.aut_photo},slot:"icon"}),n("span",{staticStyle:{color:"#466b9d"},attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.aut_name))]),n("div",{attrs:{slot:"label"},slot:"label"},[n("p",{staticStyle:{color:"#363636"}},[t._v(t._s(e.content))]),n("p",[n("span",{staticStyle:{"margin-right":"10px"}},[t._v(t._s(t._f("relativeTime")(e.pubdate)))])])])],1)})),1),n("van-cell-group",{staticClass:"publish-wrap"},[n("van-field",{attrs:{clearable:"",placeholder:"请输入回复内容"},model:{value:t.content,callback:function(e){t.content="string"===typeof e?e.trim():e},expression:"content"}},[n("van-button",{attrs:{slot:"button",size:"mini",type:"info"},on:{click:t.hAddReply},slot:"button"},[t._v("发布")])],1)],1)],1)},u=[],d=(n("d3b7"),n("25f0"),n("b775")),p=function(t,e){return Object(d["a"])({method:"POST",url:"/app/v1_0/comments",data:{target:t,content:e}})},m=function(t,e,n){return Object(d["a"])({method:"POST",url:"/app/v1_0/comments",data:{target:t,content:n,art_id:e}})},f=function(t,e){return Object(d["a"])({method:"GET",url:"/app/v1_0/comments",params:{type:"a",source:t,offset:e}})},h=function(t,e){return Object(d["a"])({method:"GET",url:"/app/v1_0/comments",params:{type:"c",source:t,offset:e}})},v={name:"CommentReply",props:{comment:{type:Object,required:!0},article_id:{type:String,required:!0}},data:function(){return{content:"",offset:null,list:[],loading:!1,finished:!1}},created:function(){},methods:{hAddReply:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.content){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,m(t.comment.com_id.toString(),t.article_id,t.content);case 5:n=e.sent,t.list.unshift(n.data.data.new_obj),t.content="",t.$toast.success("发布回复成功"),t.comment.reply_count++,e.next=16;break;case 12:e.prev=12,e.t0=e["catch"](2),t.$toast.fail("回复失败");case 16:case"end":return e.stop()}}),e,null,[[2,12]])})))()},onLoad:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h(t.comment.com_id.toString(),t.offset);case 2:a=e.sent,t.offset=a.data.data.last_id,r=a.data.data.results,(n=t.list).push.apply(n,Object(c["a"])(r)),t.loading=!1,t.finished=0===r.length;case 9:case"end":return e.stop()}}),e)})))()}}},_=v,b=(n("0ac2"),n("2877")),g=Object(b["a"])(_,l,u,!1,null,"00b6a71f",null),w=g.exports,y={name:"ArticleComment",props:{article_id:{type:String,required:!0}},components:{CommentReply:w},data:function(){return{currentComment:{},isReplyShow:!1,offset:null,content:"",list:[],loading:!1,finished:!1}},methods:{hShowReplay:function(t){this.isReplyShow=!0,this.currentComment=t},hAddComment:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(""!==t.content){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,p(t.article_id,t.content);case 5:n=e.sent,t.list.unshift(n.data.data.new_obj),t.content="",t.$toast.success("发布评论成功"),e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](2),t.$toast.fail("评论失败");case 15:case"end":return e.stop()}}),e,null,[[2,11]])})))()},onLoad:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f(t.article_id,t.offset);case 2:a=e.sent,t.offset=a.data.data.last_id,r=a.data.data.results,(n=t.list).push.apply(n,Object(c["a"])(r)),t.loading=!1,t.finished=0===r.length;case 8:case"end":return e.stop()}}),e)})))()}}},x=y,k=(n("6187"),Object(b["a"])(x,o,s,!1,null,"3533ae4f",null)),S=k.exports,R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"author"},[n("van-image",{attrs:{round:"",width:"1rem",height:"1rem",fit:"fill",src:t.author.aut_photo}}),n("div",{staticClass:"text"},[n("p",{staticClass:"name"},[t._v(t._s(t.author.aut_name))]),n("p",{staticClass:"time"},[t._v(t._s(t._f("relativeTime")(t.author.pubdate)))])]),t._t("default")],2)},j=[],C={name:"Author",props:{author:{type:Object,required:!0}}},O=C,$=(n("fe39"),Object(b["a"])(O,R,j,!1,null,"1e9c58c5",null)),A=$.exports,T=n("c24f"),z=n("2423"),E={name:"ArticleIndex",data:function(){return{is404:!1,loading:!0,article:{}}},computed:{isYourself:function(){return!!this.article.aut_id&&this.article.aut_id==this.$store.state.userInfo.id}},created:function(){this.loadArticle()},components:{Author:A,ArticleComment:S},methods:{loadArticle:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=t.$route.params.id,e.next=4,Object(z["getArticle"])(n);case 4:a=e.sent,t.article=a.data.data,t.loading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](0),t.loading=!1,e.t0.response&&404===e.t0.response.status?t.is404=!0:t.$toast.fail("文章加载失败");case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()},hSwitchFollow:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.article.is_followed,a=t.article.aut_id,!n){e.next=10;break}return e.next=6,Object(T["e"])(a);case 6:e.sent,e.next=14;break;case 10:return e.next=12,Object(T["a"])(a);case 12:e.sent;case 14:t.article.is_followed=!n,t.$toast.success("操作成功"),e.next=22;break;case 18:e.prev=18,e.t0=e["catch"](0),t.$toast.fail("操作失败");case 22:case"end":return e.stop()}}),e,null,[[0,18]])})))()}},beforeRouteLeave:function(t,e,n){"/login"===t.path&&this.$store.state.tokenInfo.token?n({path:"/"}):n()},destroyed:function(){}},L=E,q=(n("f4bc"),Object(b["a"])(L,a,r,!1,null,"1af4989e",null));e["default"]=q.exports},"490a":function(t,e,n){},"599e":function(t,e,n){},6187:function(t,e,n){"use strict";var a=n("490a"),r=n.n(a);r.a},"9d92":function(t,e,n){},bf66:function(t,e,n){},f4bc:function(t,e,n){"use strict";var a=n("9d92"),r=n.n(a);r.a},fe39:function(t,e,n){"use strict";var a=n("599e"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-a3202f98.76a7c01e.js.map