webpackJsonp([41],{219:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{typeName:this.$route.name,typeId:2,infoData:[],token:sessionStorage.token,perPage:10,nowPage:1,lastPage:0,switchShow:!1,loadingData:!1}},methods:{resetIndex:function(){this.$router.push({name:"message"})},moreFn:function(n){var t={token:this.token,typeId:this.typeId,perPage:this.perPage,page:n};this.$http({url:"dealerMessage/detail",method:"GET",params:t}).then(function(n){console.log(n),this.infoData=this.infoData.concat(n.body.data.list),this.lastPage=n.body.data.page.last_page,this.switchShow=!this.switchShow,this.loadingData=!this.loadingData}).catch(function(n){console.log("请求失败了")})},getMore:function(){this.nowPage>=this.lastPage?this.switchShow=this.switchShow:this.loadingData&&(this.switchShow=!this.switchShow,this.nowPage++,this.moreFn(this.nowPage),this.loadingData=!this.loadingData)},init:function(){this.moreFn(this.nowPage)},isActive:function(n){return 204==n.type?"remind-ct remind-green":201==n.type?"remind-ct remind-red":"remind-ct"}},mounted:function(){this.moreFn(this.nowPage)},directives:{scroll:{bind:function(n,t){window.addEventListener("scroll",function(){if(document.body.scrollTop+window.innerHeight>=n.clientHeight){(0,t.value)()}})}}}}},260:function(n,t,e){t=n.exports=e(58)(!0),t.push([n.i,".remind{padding-bottom:.666667rem}.remind-tit{padding-top:.4rem;text-align:center;color:#999;font-size:.346667rem}.remind-ct{background:#fff;width:8.586667rem;padding:0 .133333rem;margin:.4rem auto 0;border-radius:.133333rem;border-left:.053333rem solid #ccc}.remind-tp{color:#2c2c2c;font-size:.426667rem;border-bottom:1px solid #eee}.remind-bt,.remind-tp{padding:.533333rem .2rem}.remind-auto{width:7.333333rem;height:.4rem;line-height:.4rem;font-size:.4rem;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.remind-stat{font-size:.4rem;color:#999;margin-top:.4rem}.remind-stat span{color:#fc3036}.remind-stat i{float:right}.remind-red{border-color:#ff6469}.remind-green{border-color:#70d788}.loading{text-align:center;line-height:1rem;font-size:.266667rem}","",{version:3,sources:["F:/tob-vue/正式/project-taochemao-wap/src/page/message/children/display.vue"],names:[],mappings:"AA2HA,QACC,yBAA2B,CAC3B,AACD,YACC,kBAAmB,AACnB,kBAAkB,AAClB,WAAW,AACX,oBAAsB,CACtB,AACD,WACC,gBAAgB,AAChB,kBAAkB,AAClB,qBAAsB,AACtB,oBAA0B,AAC1B,yBAA0B,AAC1B,iCAAmC,CACnC,AACD,WACC,cAAc,AAEd,qBAAsB,AACtB,4BAA6B,CAC7B,AACD,sBAJC,wBAA2B,CAM3B,AACD,aACC,kBAAkB,AAClB,aAAc,AACd,kBAAmB,AACnB,gBAAiB,AACjB,gBAAgB,AAChB,mBAAoB,AACpB,sBAAwB,CACxB,AACD,aACC,gBAAiB,AACjB,WAAW,AACX,gBAAkB,CAClB,AACD,kBACC,aAAc,CACd,AACD,eACC,WAAY,CACZ,AACD,YACC,oBAAqB,CACrB,AACD,cACC,oBAAqB,CACrB,AACD,SACC,kBAAkB,AAClB,iBAAmB,AACnB,oBAAsB,CACtB",file:"display.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/*订单提醒*/\n.remind{\r\n\tpadding-bottom:0.666667rem;\n}\n.remind-tit{\r\n\tpadding-top:0.4rem;\r\n\ttext-align:center;\r\n\tcolor:#999;\r\n\tfont-size:0.346667rem;\n}\n.remind-ct{\r\n\tbackground:#fff;\r\n\twidth:8.586667rem;\r\n\tpadding:0 0.133333rem;\r\n\tmargin:0.4rem auto 0 auto;\r\n\tborder-radius:0.133333rem;\r\n\tborder-left:0.053333rem solid #ccc;\n}\n.remind-tp{\r\n\tcolor:#2c2c2c;\r\n\tpadding:0.533333rem 0.2rem;\r\n\tfont-size:0.426667rem;\r\n\tborder-bottom:1px solid #eee;\n}\n.remind-bt{\r\n\tpadding:0.533333rem 0.2rem;\n}\n.remind-auto{\r\n\twidth:7.333333rem;\r\n\theight:0.4rem;\r\n\tline-height:0.4rem;\r\n\tfont-size:0.4rem;\r\n\toverflow:hidden;\r\n\twhite-space: nowrap;\r\n\ttext-overflow: ellipsis;\n}\n.remind-stat{\r\n\tfont-size:0.4rem;\r\n\tcolor:#999;\r\n\tmargin-top:0.4rem;\n}\n.remind-stat span{\r\n\tcolor:#fc3036;\n}\n.remind-stat i{\r\n\tfloat:right;\n}\n.remind-red{\r\n\tborder-color:#ff6469;\n}\n.remind-green{\r\n\tborder-color:#70d788;\n}\n.loading{\r\n\ttext-align:center;\r\n\tline-height:1.0rem;\r\n\tfont-size:0.266667rem;\n}\r\n"],sourceRoot:""}])},310:function(n,t,e){var r=e(260);"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);e(59)("3a1d43e7",r,!0)},392:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"rating_page"},[e("header",{staticClass:"user-tit"},[e("a",{staticClass:"white-lt",attrs:{href:"javascript:;"},on:{click:n.resetIndex}}),n._v("展车提醒\n\t\t")]),n._v(" "),e("section",{directives:[{name:"scroll",rawName:"v-scroll",value:n.getMore,expression:"getMore"}],staticClass:"remind"},n._l(n.infoData,function(t,r){return e("div",{staticClass:"remind-item"},[e("router-link",{attrs:{to:"/displayDetail/"+t.order_num}},[e("div",{staticClass:"remind-tit"},[n._v(n._s(t.created_at))]),n._v(" "),e("div",{class:n.isActive(t)},[e("div",{staticClass:"remind-tp"},[n._v(n._s(t.content_header))]),n._v(" "),e("div",{staticClass:"remind-bt"},[e("p",{staticClass:"remind-auto"},[n._v("购买车辆："+n._s(t.content_body))]),n._v(" "),201==t.type?e("p",{staticClass:"remind-stat"},[e("i",{staticClass:"white-rt"}),n._v("\n\t\t                        需支付："+n._s(t.content_footer)+"\n\t\t                    ")]):e("p",{staticClass:"remind-stat"},[e("i",{staticClass:"white-rt"}),n._v("\n\t\t                        "+n._s(t.content_footer)+"\n\t\t                    ")])])])])],1)})),n._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:n.switchShow,expression:"switchShow"}],staticClass:"loading"},[n._v("数据已加载完")])])},staticRenderFns:[]}},80:function(n,t,e){function r(n){e(310)}var i=e(0)(e(219),e(392),r,null,null);n.exports=i.exports}});
//# sourceMappingURL=41.c8642809105d9bb00f47.js.map