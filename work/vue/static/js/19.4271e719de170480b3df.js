webpackJsonp([19],{224:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(23),A=n.n(r);t.default={data:function(){return{mesList:{},showRemit:!1,showAlert:!1,alertText:null,url:""}},components:{alertTip:A.a},methods:{resetIndex:function(){this.$router.push({name:this.$store.state.messageFlag})},fillData:function(){var e=sessionStorage.token,t={token:e};this.$http({url:"dealerMessage/messageList",method:"GET",params:t}).then(function(e){var t=e.body.data;this.addUrl(t),this.mesList=t,this.dataLength()}).catch(function(e){this.showAlert=!0,this.alertText=e.body.msg||"请求失败了"})},dataLength:function(){this.mesList.length>0?this.showRemit=!0:this.showRemit=!1},addUrl:function(e){for(var t=0;t<e.length;t++)switch(e[t].typeId){case"2":e[t].url="display";break;case"5":e[t].url="storage";break;case"1":e[t].url="order";break;case"3":e[t].url="coupon";break;case"4":e[t].url="rebate";break;case"6":e[t].url="inform"}}},mounted:function(){this.fillData()},watch:{$route:function(){this.fillData()}},beforeRouteEnter:function(e,t,n){n(function(e){"index"!=t.name&&"profile"!=t.name||e.$store.dispatch("MESSAGE_FLAG",t.name)})}}},283:function(e,t,n){t=e.exports=n(58)(!0),t.push([e.i,".rating_page{position:absolute;top:0;left:0;background-color:#f5f5f5;width:10rem;z-index:203;min-height:120%}.router-slid-enter-active,.router-slid-leave-active{transition:all .4s}.router-slid-enter,.router-slid-leave-active{-webkit-transform:translate3d(2rem,0,0);transform:translate3d(2rem,0,0);opacity:0}.news-wrap{background:#fff;padding:0 .4rem}.news-item{overflow:hidden;padding:.533333rem 0;border-bottom:1px solid #2c2c2c}.news-item:last-child{border-bottom:none}.news-lt{float:left;width:2rem;position:relative}.news-lt .envelope{width:1.066667rem;height:1.066667rem;display:inline-block;background:url("+n(352)+") no-repeat;background-size:contain;margin:.2rem 0 0 .2rem}.news-lt span{color:#fff;font-size:.293333rem;position:absolute;background:#ff0048;border-radius:100%;padding:.04rem .133333rem;left:1rem;top:.133333rem}.news-rt{float:left;width:7rem}.news-remind{font-size:.426667rem;color:#2c2c2c}.news-infos{font-size:.4rem;margin:.266667rem 0}.news-time{color:#999;font-size:.346667rem}.no-auto{padding-top:3.867rem}.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem}.no-auto p{color:#2c2c2c;line-height:.8667rem}.no-auto input,.no-auto p{font-size:.4533rem;text-align:center}.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;line-height:1.1733rem;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem}.server-no-response .reflash{color:#d6ab55}.no-auto p span{color:#d6ab55;border-bottom:1px solid #d6ab55}","",{version:3,sources:["F:/tob-vue/正式/project-taochemao-wap/src/page/message/message.vue"],names:[],mappings:"AACA,aACI,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,yBAA0B,AAC1B,YAAc,AACd,YAAa,AACb,eAAgB,CACnB,AACD,oDACQ,kBAAoB,CAC3B,AACD,6CACI,wCAA2C,AACnC,gCAAmC,AAC3C,SAAW,CACd,AAGD,WACE,gBAAgB,AAChB,eAAiB,CAClB,AACD,WACE,gBAAgB,AAChB,qBAAsB,AACtB,+BAAgC,CACjC,AACD,sBACE,kBAAmB,CACpB,AACD,SACE,WAAW,AACX,WAAa,AACb,iBAAkB,CACnB,AACD,mBACE,kBAAkB,AAClB,mBAAmB,AACnB,qBAAqB,AACrB,mDAAoD,AACpD,wBAAwB,AACxB,sBAAyB,CAC1B,AACD,cACE,WAAW,AACX,qBAAsB,AACtB,kBAAkB,AAClB,mBAAmB,AACnB,mBAAmB,AACnB,0BAA4B,AAC5B,UAAY,AACZ,cAAgB,CACjB,AACD,SACE,WAAW,AACX,UAAY,CACb,AACD,aACE,qBAAsB,AACtB,aAAc,CACf,AACD,YACE,gBAAiB,AACjB,mBAAqB,CACtB,AACD,WACE,WAAW,AACX,oBAAsB,CACvB,AACD,SAAS,oBAAqB,CAC7B,AACD,aAAa,cAAc,gBAAgB,iBAAiB,mBAAoB,CAC/E,AACD,WAAW,cAAc,AAAmB,oBAAqB,CAChE,AACD,0BAFyB,mBAAmB,AAAqB,iBAAkB,CAGlF,AADD,eAAe,cAAc,eAAe,iBAAiB,wBAAwB,cAAc,AAAmB,sBAAsB,AAAkB,6BAA6B,yBAAyB,qBAAsB,CACzO,AACD,6BAA6B,aAAc,CAC1C,AACD,gBAAgB,cAAc,+BAAgC,CAC7D",file:"message.vue",sourcesContent:["\n.rating_page{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: #f5f5f5;\r\n    width:10.0rem;\r\n    z-index: 203;\r\n    min-height:120%;\n}\n.router-slid-enter-active, .router-slid-leave-active {\r\n        transition: all .4s;\n}\n.router-slid-enter, .router-slid-leave-active {\r\n    -webkit-transform: translate3d(2rem, 0, 0);\r\n            transform: translate3d(2rem, 0, 0);\r\n    opacity: 0;\n}\r\n\r\n/*消息*/\n.news-wrap{\r\n  background:#fff;\r\n  padding:0 0.4rem;\n}\n.news-item{\r\n  overflow:hidden;\r\n  padding:0.533333rem 0;\r\n  border-bottom:1px solid #2c2c2c;\n}\n.news-item:last-child{\r\n  border-bottom:none;\n}\n.news-lt{\r\n  float:left;\r\n  width:2.0rem;\r\n  position:relative;\n}\n.news-lt .envelope{\r\n  width:1.066667rem;\r\n  height:1.066667rem;\r\n  display:inline-block;\r\n  background:url(../../assets/envelope.png) no-repeat;\r\n  background-size:contain;\r\n  margin:0.2rem 0 0 0.2rem;\n}\n.news-lt span{\r\n  color:#fff;\r\n  font-size:0.293333rem;\r\n  position:absolute;\r\n  background:#ff0048;\r\n  border-radius:100%;\r\n  padding:0.04rem 0.133333rem;\r\n  left:1.0rem;\r\n  top:0.133333rem;\n}\n.news-rt{\r\n  float:left;\r\n  width: 7rem;\n}\n.news-remind{\r\n  font-size:0.426667rem;\r\n  color:#2c2c2c;\n}\n.news-infos{\r\n  font-size:0.4rem;\r\n  margin:0.266667rem 0;\n}\n.news-time{\r\n  color:#999;\r\n  font-size:0.346667rem;\n}\n.no-auto{padding-top:3.867rem;\n}\n.no-auto img{display:block;width:3.0667rem;height:3.0667rem;margin:0 auto .4rem;\n}\n.no-auto p{color:#2c2c2c;font-size:.4533rem;line-height:.8667rem;text-align:center;\n}\n.no-auto input{display:block;width:3.893rem;height:1.1733rem;margin:2.3467rem auto 0;color:#d6ab55;font-size:.4533rem;line-height:1.1733rem;text-align:center;background-color:transparent;border:1px solid #d6ab55;border-radius:.533rem;\n}\n.server-no-response .reflash{color:#d6ab55;\n}\n.no-auto p span{color:#d6ab55;border-bottom:1px solid #d6ab55;\n}\r\n\r\n"],sourceRoot:""}])},333:function(e,t,n){var r=n(283);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(59)("15859765",r,!0)},352:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NmVlOGUwYi1jNjBhLTRhZmEtYjA4Ny1lODJmNjIzM2I0ZjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEREN0I2QzI1Q0E4MTFFNzhEMEZDQzBEQTRGMzI0OUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEREN0I2QzE1Q0E4MTFFNzhEMEZDQzBEQTRGMzI0OUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVmY2Q4YjAzLTJmYTItNDY0MS1hNjI1LTFkMWY1Y2E0MDllYyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjEzZGJmNjUzLTkwYzEtMTE3YS05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"},361:function(e,t,n){e.exports=n.p+"static/img/no-news.fc5fd8f.png"},418:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("header",{staticClass:"user-tit"},[r("a",{staticClass:"white-lt",attrs:{href:"javascript:;"},on:{click:e.resetIndex}}),e._v("消息\n    ")]),e._v(" "),e.showRemit?r("section",{staticClass:"news-wrap"},e._l(e.mesList,function(t,n){return r("div",{staticClass:"news-item"},[r("router-link",{attrs:{to:"/message/"+t.url}},[r("div",{staticClass:"news-lt"},[r("i",{staticClass:"envelope"}),e._v(" "),t.num?r("span",[e._v(e._s(t.num))]):e._e()]),e._v(" "),r("div",{staticClass:"news-rt"},[r("p",{staticClass:"news-remind"},[e._v(e._s(t.typeName))]),e._v(" "),r("p",{staticClass:"news-infos"},[e._v(e._s(t.content))]),e._v(" "),r("p",{staticClass:"news-time"},[e._v(e._s(t.time))])])])],1)})):r("section",{staticClass:"no-auto server-no-response"},[r("img",{attrs:{src:n(361),alt:""}}),e._v(" "),r("p",[e._v("暂无消息")])]),e._v(" "),r("transition",{attrs:{name:"router-slid"}},[r("router-view")],1),e._v(" "),e.showAlert?r("alert-tip",{attrs:{alertText:e.alertText},on:{closeTip:function(t){e.showAlert=!1}}}):e._e()],1)},staticRenderFns:[]}},85:function(e,t,n){function r(e){n(333)}var A=n(0)(n(224),n(418),r,null,null);e.exports=A.exports}});
//# sourceMappingURL=19.4271e719de170480b3df.js.map