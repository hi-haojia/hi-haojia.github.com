webpackJsonp([44],{207:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e(23),A=e.n(r);t.default={data:function(){return{orderNum:this.$route.params.id,Token:sessionStorage.getItem("token"),maskShow:!1,orderInfo:{},bankInfo:{},capitalInfo:{},record:[],address:{},statusText:null,timeShow:!1,countNum:0,payment:"已支付",paymentActive:!1,vinActive:"待发货",btmBtn:!1,btnText:"提交汇款凭证",process:!1,carCancel:!1,receiptShow:!1,receiptData:{},vanShow:!1,vanMask:!1,vanInfo:{},sendText:"发送到手机",showAlert:!1,alertText:null}},components:{alertTip:A.a},methods:{resetIndex:function(){this.$router.go(-1)},paymentSubmit:function(){this.$router.push({name:"paymentSubmit"}),this.$store.dispatch("RETURN_DATA",{orderNum:this.orderInfo.orderNum,orderId:this.orderInfo.id})},balanceConfrim:function(){this.$router.push({name:"balanceConfrim"}),this.$store.dispatch("SPARE_DATA",{orderNum:this.orderInfo.orderNum,deposit:this.capitalInfo.deposit})},fullData:function(){var n={token:this.Token,order_num:this.orderNum};this.$http({url:"order/show/detail",method:"GET",params:n}).then(function(n){this.address=n.body.data.address,this.bankInfo=n.body.data.bankInfo;for(var t in n.body.data.capitalInfo){n.body.data.capitalInfo[t]=Number(n.body.data.capitalInfo[t]).toLocaleString();var e=n.body.data.capitalInfo[t].split(".");e[1]?2==e[1].length?e[1]=e[1]:1==e[1].length?e[1]=e[1]+"0":e[1]=e[1].substring(0,2):e[1]="00",n.body.data.capitalInfo[t]=e.join(".")}this.capitalInfo=n.body.data.capitalInfo,this.record=n.body.data.record,this.statusAactive=n.body.data.orderInfo,this.statusAdd(this.statusAactive),this.orderInfo=n.body.data.orderInfo}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})},statusAdd:function(n){28==n.status?(this.statusText="补款中",this.vinActive="审核中",this.process=!this.process):7==n.status?""==n.remainingTime||"0"==n.remainingTime?(this.statusText="已取消",this.payment="未支付",this.paymentActive=!this.paymentActive,this.timeShow=!1,this.btmBtn=!1,this.carCancel=!1):(this.statusText="等待支付保证金",this.countNum=n.remainingTime,n.remaining=this.remaining,this.remainingTime(n),this.payment="未支付",this.paymentActive=!this.paymentActive,this.timeShow=!this.timeShow,this.btmBtn=!this.btmBtn,this.carCancel=!this.carCancel):27==n.status?(this.statusText="请重新提交",this.countNum=n.remainingTime,n.remaining=this.remaining,this.remainingTime(n),this.payment="未支付",this.paymentActive=!this.paymentActive,this.timeShow=!this.timeShow,this.btmBtn=!this.btmBtn,this.carCancel=!this.carCancel):8==n.status?(this.statusText="待付款审核中,请耐心等候",this.payment="等待审核",this.btmBtn=!this.btmBtn):3==n.status?this.statusText="车辆出库中":4==n.status?(this.statusText="车辆在途",this.countNum=n.remainingTime,n.remaining=this.remaining,this.remainingTime(n),this.vinActive="已发货",this.payment="已支付",this.paymentActive=!this.paymentActive,this.timeShow=!this.timeShow,this.btmBtn=!this.btmBtn,this.btnText="确认收货"):5==n.status?(this.statusText="展车在展",this.vinActive="在展",this.btnText="补余款",this.btmBtn=!this.btmBtn,this.process=!this.process,this.vanShow=!this.vanShow):6==n.status?(this.statusText="已取消",this.payment="未支付",this.paymentActive=!this.paymentActive,this.timeShow=!1,this.btmBtn=!1,this.carCancel=!1):9==n.status?(this.statusText="已购买",this.vinActive="已购买"):10==n.status?(this.statusText="展车退订已受理，等待接车",this.payment="正在退款",this.vinActive="退订受理",this.process=!this.process):11==n.status&&(this.statusText="已完成退车",this.payment="已退款",this.vinActive="已退车")},remainingTime:function(n){var t=this;clearInterval(this.timers),n.timer=setInterval(function(){0!=n.remainingTime&&(n.remainingTime=parseInt(n.remainingTime)-60,n.remainingTime<=0&&(clearInterval(n.timer),n.status=6,n.waitActive="已取消",n.btnActive=""),t.countNum=n.remainingTime,n.remaining=t.remaining)},6e4)},cancelTime:function(n){var t=this,e=new Date(1e3*parseInt(n.time));return Date.prototype.toLocaleString=function(){return this.getFullYear()+"-"+(this.getMonth()+1)+"-"+this.getDate()+" "+t.toDouble(this.getHours())+":"+t.toDouble(this.getMinutes())},e.toLocaleString()},toDouble:function(n){return n>9?n:"0"+n},cancelOrder:function(){this.orderInfo.status=6,this.maskShow=!this.maskShow;var n={token:this.Token,order_num:this.orderInfo.orderNum};this.$http.post("order/show/cancel",n).then(function(n){this.fullData()}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})},confirmCar:function(){this.receiptShow=!this.receiptShow;var n={token:this.Token,orderNum:this.orderInfo.orderNum};this.$http({url:"order/full/receiptDetail",method:"GET",params:n}).then(function(n){this.receiptData=n.body.data}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})},receiptStatus:function(){this.receiptShow=!this.receiptShow;var n={token:this.Token,goods_stock_id:this.receiptData.id};this.$http.post("order/full/receipt",n).then(function(n){this.fullData()}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})},vanLayer:function(){this.vanMask=!this.vanMask;var n={token:this.Token,orderNum:this.orderNum};this.$http({url:"order/show/unsubscribeContact",method:"GET",params:n}).then(function(n){console.log(n),this.vanInfo=n.body.data}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})},sendMes:function(){this.$http.post("message/send",{token:sessionStorage.token,content:"汇款信息：\n汇款银行："+this.bankInfo.bankName+"\n公司名称:"+this.bankInfo.companyName+"\n汇款账户:"+this.bankInfo.account,phone:""}).then(function(n){var t=this,e=60,r=setInterval(function(){if(e--,t.sendText=e+"s后重新获取",!e)return t.sendText="发送到手机",clearInterval(r),!1},1e3)}).catch(function(n){this.showAlert=!0,this.alertText=n.body.msg})}},mounted:function(){this.fullData()},computed:{remaining:function(){var n=parseInt(this.countNum/60/60),t=parseInt((this.countNum-3600*n)/60);return n<10&&(n="0"+n),t<10&&(t="0"+t),n+"小时"+t+"分钟"}},watch:{$route:function(){this.showData()}}}},249:function(n,t,e){t=n.exports=e(58)(!0),t.push([n.i,".pending p{text-align:center;font-size:.453333rem;color:#999;margin-top:6.666667rem}.receipt-title{font-size:.453333rem;color:#2c2c2c;border-bottom:1px solid #eee;padding-bottom:.533333rem;margin-bottom:.533333rem}.details-tit{padding:.533333rem .4rem;background:#d5aa5c}.details-tit h4{font-size:.506667rem;color:#fff;line-height:.533333rem}.details-tit h4 span{float:right;font-size:.346667rem}.details-tit p{font-size:.346667rem;color:#fff;margin-top:.533333rem}.details-addres{padding:0 .4rem .533333rem;background:#fff;margin-bottom:.4rem;font-size:.4rem;color:#2c2c2c;position:relative}.details-user span{float:right}.details-addres p{margin-top:.533333rem;color:#999}.details-addres .white-rt{position:absolute;right:.4rem;top:1.306667rem}.order-ct{padding:.533333rem .4rem;background:#fff}.order-number{font-size:.373333rem;color:#999;overflow:hidden;padding-bottom:.533333rem;border-bottom:1px solid #e0e0e0}.order-number span{float:right}.leave{border-bottom:1px solid #e0e0e0;overflow:hidden;padding:.533333rem 0}.order-full h3{font-size:.426667rem}.order-full .interior{color:#999;font-size:.346667rem;margin-top:.133rem}.order-full .payment{border-bottom:1px solid #e0e0e0;color:#2c2c2c;font-size:.373333rem;padding:.533333rem 0}.order-full .payment span{color:#fc3036}.order-full .payment em{float:right}.order-full .car-vin,.order-full .payment{border-bottom:1px solid #e0e0e0;color:#2c2c2c;overflow:hidden;font-size:.373333rem;padding:.533333rem 0}.order-full .car-vin span{color:#999;float:right}.leave{font-size:.32rem;color:#999}.leave span{color:#2c2c2c}.request-ct{padding:0 .4rem;background:#fff;margin-top:.4rem;overflow:hidden}.remit-tit{font-size:.453333rem;padding:.533333rem 0;border-bottom:1px solid #e0e0e0}.bond{font-size:.373333rem;color:#999;margin-top:.533333rem}.bond span{float:right}.bond.active{color:#2c2c2c}.bond.active span{color:#fc3036}.settlement p:last-child{color:#2c2c2c}.settlement p:last-child span{color:#fc3036}.send-to{border:1px solid #d5aa5c;margin:.533333rem auto}.send-to p{overflow:hidden;font-size:.4rem;color:#2c2c2c;margin-top:.533333rem}.send-to p label,.send-to span{display:block;float:left}.send-to p label{color:#999;width:2.266667rem;text-align:right}.send-to span{width:6.333333rem}.nstructions{color:#999;font-size:.32rem;padding-bottom:.4rem;border-bottom:1px solid #e0e0e0;line-height:.6rem}.nstructions em,.nstructions span{display:block}.nstructions em{padding-left:.266667rem}.cancel{text-align:center;padding:.4rem 0;font-size:.453333rem;color:#2c2c2c;text-decoration:underline;background:#fff}.mask{width:100%;height:100%;background:rgba(0,0,0,.8);position:fixed;left:0;top:0}.cancel-car{position:fixed;width:7.2rem;height:3.733333rem;background:#fff;border-radius:.133333rem;overflow:hidden;left:50%;top:50%;margin-top:-1.866667rem;margin-left:-3.6rem}.prompt-tit{text-align:center;font-size:.453333rem;color:#2c2c2c;margin:.986667rem 0}.prompt-btn{background:#f5f5f5;overflow:hidden;height:1.173333rem;line-height:1.173333rem}.prompt-btn span{display:block;width:50%;float:left;text-align:center;font-size:.453333rem}.prompt-btn span.confirm{background:#d6ab55;color:#fff}.record{background:#fff;padding-bottom:.4rem;margin-top:.4rem}.record span{display:block;padding:.533333rem .4rem;font-size:.453333rem;color:#2c2c2c;border-bottom:1px solid #e0e0e0}.record span em{float:right;color:#999}.record span.record-time{font-size:.373333rem}.ayment-info{border:1px solid #d5aa5c;margin:.533333rem 0}.ayment-info p{color:#2c2c2c;font-size:.4rem;margin-top:.533333rem;overflow:hidden}.ayment-info p label,.ayment-info span{display:block;float:left}.ayment-info p label{color:#999;text-align:right;width:2.26667rem}.ayment-info span{width:6.33333rem}.ayment-details{background:#f5f5f5;font-size:.453333rem;height:1.17333rem;line-height:1.17333rem;text-align:center}.ayment-info p.send-phone,.send-to p.send-phone{font-size:.453333rem;color:#fff;text-align:center;height:1.173333rem;line-height:1.173333rem;background:#d5aa5c}.website{background:#fff;margin-top:.4rem;padding-bottom:.533333rem}.website span{display:block;padding:.533333rem .4rem;font-size:.453333rem;color:#2c2c2c;border-bottom:1px solid #e0e0e0}.website span.website-info{font-size:.373333rem;color:#999;border:none;padding:.533333rem .4rem 0}.replen{margin-top:.4rem;padding:.533333rem .4rem;font-size:.373333rem;color:#d5aa5c;background:#fff;overflow:hidden}.replen i{float:right;position:static}.mask-receipt{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,.8)}.receipt{width:7.2rem;position:fixed;left:50%;margin-left:-3.6rem;top:25%;background:#fff;border-radius:.133333rem;overflow:hidden}.receipt-tit{width:5.026667rem;height:2.053333rem;border-bottom:1px solid #2c2c2c;margin:.533333rem auto;text-align:center}.receipt-tit b{display:block;font-size:.453333rem;color:#2c2c2c}.receipt-tit span{display:block;font-size:.32rem;color:#999;padding:.133333rem 0}.receipt-code{font-size:.453333rem;color:#d6ab55;text-align:center;margin-bottom:.533333rem}.options{padding:0 .533333rem;font-size:.346667rem;color:#2c2c2c;padding-bottom:.533333rem}.options b{display:block}.receipt-btn{font-size:.453333rem;color:#fff;text-align:center;line-height:1.173333rem}.receipt-btn span{display:inline-block;width:50%;height:1.173333rem;background:#d6ab55;cursor:pointer}.receipt-btn span.receipt-close{background:#f5f5f5;color:#000}.unsub-mask{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.8)}.unsub-ct{position:fixed;left:50%;top:50%;margin-left:-3.6rem;margin-top:-2.866667rem;width:7.2rem;background:#fff;overflow:hidden;border-radius:.133333rem}.unsub-tp{width:4.133333rem;height:1.733333rem;margin:.866667rem auto .533333rem;border-bottom:1px solid #2c2c2c;font-size:.453333rem;line-height:.6rem;text-align:center}.unsub-adviser,.unsub-tp{color:#2c2c2c;padding:0 .533333rem}.unsub-adviser{font-size:.346667rem;margin-bottom:1.066667rem}.unsub-adviser em{color:#999;margin-left:.266667rem}.unsub-adviser span{float:right}.unsub-btn{background:#f5f5f5;height:1.173333rem}.unsub-btn span{display:block;float:left;width:50%;text-align:center;font-size:.453333rem;line-height:1.173333rem}.unsub-btn span.active{color:#fff;background:#d6ab55}.remits-fixed a{color:#fff}","",{version:3,sources:["F:/tob-vue/正式/project-taochemao-wap/src/page/displayDetail/displayDetail.vue"],names:[],mappings:"AAweA,WACC,kBAAkB,AAClB,qBAAsB,AACtB,WAAW,AACX,sBAAuB,CACvB,AACD,eACC,qBAAsB,AACtB,cAAc,AACd,6BAA6B,AAC7B,0BAA2B,AAC3B,wBAA0B,CAC1B,AACD,aACC,yBAA2B,AAC3B,kBAAmB,CACnB,AACD,gBACC,qBAAsB,AACtB,WAAW,AACX,sBAAwB,CACxB,AACD,qBACC,YAAY,AACZ,oBAAsB,CACtB,AACD,eACC,qBAAsB,AACtB,WAAW,AACX,qBAAuB,CACvB,AACD,gBACC,2BAAoC,AACpC,gBAAgB,AAChB,oBAAqB,AACrB,gBAAiB,AACjB,cAAc,AACd,iBAAkB,CAClB,AACD,mBACC,WAAY,CACZ,AACD,kBACC,sBAAuB,AACvB,UAAW,CACX,AACD,0BACC,kBAAkB,AAClB,YAAa,AACb,eAAgB,CAChB,AACD,UACC,yBAA2B,AAC3B,eAAgB,CAChB,AACD,cACC,qBAAsB,AACtB,WAAW,AACX,gBAAgB,AAChB,0BAA2B,AAC3B,+BAAgC,CAChC,AACD,mBACC,WAAY,CACZ,AACD,OACI,gCAAiC,AACjC,gBAAiB,AACjB,oBAAuB,CAC1B,AACD,eACI,oBAAuB,CAC1B,AACD,sBACI,WAAY,AACZ,qBAAuB,AACvB,kBAAoB,CACvB,AACD,qBACI,gCAAiC,AACjC,cAAe,AACf,qBAAuB,AACvB,oBAAuB,CAC1B,AACD,0BACI,aAAe,CAClB,AACD,wBACC,WAAY,CACZ,AACD,0CACI,gCAAiC,AACjC,cAAe,AACf,gBAAgB,AAChB,qBAAsB,AACtB,oBAAuB,CAC1B,AACD,0BACC,WAAW,AACX,WAAY,CACZ,AACD,OACC,iBAAkB,AAClB,UAAW,CACX,AACD,YACC,aAAc,CACd,AACD,YACC,gBAAiB,AACjB,gBAAgB,AAChB,iBAAkB,AAClB,eAAgB,CAChB,AACD,WACC,qBAAsB,AACtB,qBAAsB,AACtB,+BAAgC,CAChC,AACD,MACC,qBAAsB,AACtB,WAAW,AACX,qBAAuB,CACvB,AACD,WACC,WAAY,CACZ,AACD,aACC,aAAc,CACd,AACD,kBACC,aAAc,CACd,AACD,yBACC,aAAc,CACd,AACD,8BACC,aAAc,CACd,AACD,SACC,yBAAyB,AACzB,sBAAwB,CACxB,AACD,WACC,gBAAgB,AAChB,gBAAiB,AACjB,cAAc,AACd,qBAAuB,CACvB,AACD,+BACC,cAAc,AACd,UAAW,CACX,AACD,iBACC,WAAW,AACX,kBAAkB,AAClB,gBAAiB,CACjB,AACD,cACC,iBAAkB,CAClB,AACD,aACC,WAAW,AACX,iBAAkB,AAClB,qBAAsB,AACtB,gCAAgC,AAChC,iBAAmB,CACnB,AACD,kCACC,aAAc,CACd,AACD,gBACC,uBAAyB,CACzB,AACD,QACC,kBAAkB,AAClB,gBAAiB,AACjB,qBAAsB,AACtB,cAAc,AACd,0BAA0B,AAC1B,eAAgB,CAChB,AACD,MACC,WAAW,AACX,YAAY,AACZ,0BAA2B,AAC3B,eAAe,AACf,OAAO,AACP,KAAM,CACN,AACD,YACC,eAAe,AACf,aAAa,AACb,mBAAmB,AACnB,gBAAgB,AAChB,yBAA0B,AAC1B,gBAAgB,AAChB,SAAS,AACT,QAAQ,AACR,wBAAwB,AACxB,mBAAoB,CACpB,AACD,YACC,kBAAkB,AAClB,qBAAsB,AACtB,cAAc,AACd,mBAAqB,CACrB,AACD,YACC,mBAAmB,AACnB,gBAAgB,AAChB,mBAAmB,AACnB,uBAAwB,CACxB,AACD,iBACC,cAAc,AACd,UAAU,AACV,WAAW,AACX,kBAAkB,AAClB,oBAAsB,CACtB,AACD,yBACC,mBAAmB,AACnB,UAAW,CACX,AACD,QACC,gBAAgB,AAChB,qBAAsB,AACtB,gBAAkB,CAClB,AACD,aACC,cAAc,AACd,yBAA2B,AAC3B,qBAAsB,AACtB,cAAc,AACd,+BAAgC,CAChC,AACD,gBACC,YAAY,AACZ,UAAW,CACX,AACD,yBACC,oBAAsB,CACtB,AAGD,aACC,yBAAyB,AACzB,mBAAqB,CACrB,AACD,eACI,cAAe,AACf,gBAAkB,AAClB,sBAAwB,AACxB,eAAiB,CACpB,AACD,uCACI,cAAe,AACf,UAAY,CACf,AACD,qBACI,WAAY,AACZ,iBAAkB,AAClB,gBAAkB,CACrB,AACD,kBACI,gBAAkB,CACrB,AACD,gBACI,mBAAoB,AACpB,qBAAuB,AACvB,kBAAmB,AACnB,uBAAwB,AACxB,iBAAmB,CACtB,AACD,gDACC,qBAAsB,AACtB,WAAW,AACX,kBAAkB,AAClB,mBAAmB,AACnB,wBAAwB,AACxB,kBAAmB,CACnB,AAED,SACC,gBAAgB,AAChB,iBAAkB,AAClB,yBAA2B,CAC3B,AACD,cACC,cAAc,AACd,yBAA2B,AAC3B,qBAAsB,AACtB,cAAc,AACd,+BAAgC,CAChC,AACD,2BACC,qBAAsB,AACtB,WAAW,AACX,YAAY,AACZ,0BAAoC,CACpC,AAGD,QACC,iBAAkB,AAClB,yBAA2B,AAC3B,qBAAsB,AACtB,cAAc,AACd,gBAAgB,AAChB,eAAgB,CAChB,AACD,UACC,YAAY,AACZ,eAAgB,CAChB,AAED,cACC,WAAW,AACX,YAAY,AACZ,eAAe,AACf,OAAO,AACP,MAAM,AACN,yBAA2B,CAC3B,AACD,SACC,aAAa,AACb,eAAe,AACf,SAAS,AACT,oBAAoB,AACpB,QAAQ,AACR,gBAAgB,AAChB,yBAA0B,AAC1B,eAAgB,CAChB,AACD,aACC,kBAAkB,AAClB,mBAAmB,AACnB,gCAAgC,AAChC,uBAAwB,AACxB,iBAAkB,CAClB,AACD,eACC,cAAc,AACd,qBAAsB,AACtB,aAAc,CACd,AACD,kBACC,cAAc,AACd,iBAAkB,AAClB,WAAW,AACX,oBAAsB,CACtB,AACD,cACC,qBAAsB,AACtB,cAAc,AACd,kBAAkB,AAClB,wBAA0B,CAC1B,AACD,SACC,qBAAsB,AACtB,qBAAsB,AACtB,cAAc,AACd,yBAA2B,CAC3B,AACD,WACC,aAAc,CACd,AACD,aACC,qBAAsB,AACtB,WAAW,AACX,kBAAkB,AAClB,uBAAwB,CACxB,AACD,kBACC,qBAAqB,AACrB,UAAU,AACV,mBAAmB,AACnB,mBAAmB,AACnB,cAAe,CACf,AACD,gCACC,mBAAmB,AACnB,UAAW,CACX,AAGD,YACC,eAAe,AACf,OAAO,AACP,MAAM,AACN,WAAW,AACX,YAAY,AACZ,yBAA2B,CAC3B,AACD,UACC,eAAe,AACf,SAAS,AACT,QAAQ,AACR,oBAAoB,AACpB,wBAAwB,AACxB,aAAa,AACb,gBAAgB,AAChB,gBAAgB,AAChB,wBAA0B,CAC1B,AACD,UACC,kBAAkB,AAClB,mBAAmB,AACnB,kCAAyC,AACzC,gCAAgC,AAChC,qBAAsB,AAEtB,kBAAmB,AAEnB,iBAAkB,CAClB,AACD,yBALC,cAAc,AAEd,oBAAsB,CAQtB,AALD,eAEC,qBAAsB,AAEtB,yBAA0B,CAC1B,AACD,kBACC,WAAW,AACX,sBAAwB,CACxB,AACD,oBACC,WAAY,CACZ,AACD,WACC,mBAAmB,AACnB,kBAAmB,CACnB,AACD,gBACC,cAAc,AACd,WAAW,AACX,UAAU,AACV,kBAAkB,AAClB,qBAAsB,AACtB,uBAAwB,CACxB,AACD,uBACC,WAAW,AACX,kBAAmB,CACnB,AACD,gBACC,UAAW,CACX",file:"displayDetail.vue",sourcesContent:["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/*展车详情*/\n.pending p{\r\n\ttext-align:center;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#999;\r\n\tmargin-top:6.666667rem;\n}\n.receipt-title{\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\tborder-bottom:1px solid #eee;\r\n\tpadding-bottom:0.533333rem;\r\n\tmargin-bottom:0.533333rem;\n}\n.details-tit{\r\n\tpadding:0.533333rem 0.4rem;\r\n\tbackground:#d5aa5c;\n}\n.details-tit h4{\r\n\tfont-size:0.506667rem;\r\n\tcolor:#fff;\r\n\tline-height:0.533333rem;\n}\n.details-tit h4 span{\r\n\tfloat:right;\r\n\tfont-size:0.346667rem;\n}\n.details-tit p{\r\n\tfont-size:0.346667rem;\r\n\tcolor:#fff;\r\n\tmargin-top:0.533333rem;\n}\n.details-addres{\r\n\tpadding:0 0.4rem 0.533333rem 0.4rem;\r\n\tbackground:#fff;\r\n\tmargin-bottom:0.4rem;\r\n\tfont-size:0.4rem;\r\n\tcolor:#2c2c2c;\r\n\tposition:relative;\n}\n.details-user span{\r\n\tfloat:right;\n}\n.details-addres p{\r\n\tmargin-top:0.533333rem;\r\n\tcolor:#999;\n}\n.details-addres .white-rt{\r\n\tposition:absolute;\r\n\tright:0.4rem;\r\n\ttop:1.306667rem;\n}\n.order-ct{\r\n\tpadding:0.533333rem 0.4rem;\r\n\tbackground:#fff;\n}\n.order-number{\r\n\tfont-size:0.373333rem;\r\n\tcolor:#999;\r\n\toverflow:hidden;\r\n\tpadding-bottom:0.533333rem;\r\n\tborder-bottom:1px solid #e0e0e0;\n}\n.order-number span{\r\n\tfloat:right;\n}\n.leave{\r\n    border-bottom: 1px solid #e0e0e0;\r\n    overflow: hidden;\r\n    padding: 0.533333rem 0;\n}\n.order-full h3 {\r\n    font-size: 0.426667rem;\n}\n.order-full .interior {\r\n    color: #999;\r\n    font-size: 0.346667rem;\r\n    margin-top:0.133rem;\n}\n.order-full .payment {\r\n    border-bottom: 1px solid #e0e0e0;\r\n    color: #2c2c2c;\r\n    font-size: 0.373333rem;\r\n    padding: 0.533333rem 0;\n}\n.order-full .payment span{\r\n    color: #fc3036;\n}\n.order-full .payment em{\r\n\tfloat:right;\n}\n.order-full .payment,.order-full .car-vin{\r\n    border-bottom: 1px solid #e0e0e0;\r\n    color: #2c2c2c;\r\n    overflow:hidden;\r\n    font-size:0.373333rem;\r\n    padding: 0.533333rem 0;\n}\n.order-full .car-vin span{\r\n\tcolor:#999;\r\n\tfloat:right;\n}\n.leave{\r\n\tfont-size:0.32rem;\r\n\tcolor:#999;\n}\n.leave span{\r\n\tcolor:#2c2c2c;\n}\n.request-ct{\r\n\tpadding:0 0.4rem;\r\n\tbackground:#fff;\r\n\tmargin-top:0.4rem;\r\n\toverflow:hidden;\n}\n.remit-tit{\r\n\tfont-size:0.453333rem;\r\n\tpadding:0.533333rem 0;\r\n\tborder-bottom:1px solid #e0e0e0;\n}\n.bond{\r\n\tfont-size:0.373333rem;\r\n\tcolor:#999;\r\n\tmargin-top:0.533333rem;\n}\n.bond span{\r\n\tfloat:right;\n}\n.bond.active{\r\n\tcolor:#2c2c2c;\n}\n.bond.active span{\r\n\tcolor:#fc3036;\n}\n.settlement p:last-child{\r\n\tcolor:#2c2c2c;\n}\n.settlement p:last-child span{\r\n\tcolor:#fc3036;\n}\n.send-to{\r\n\tborder:1px solid #d5aa5c;\r\n\tmargin:0.533333rem auto;\n}\n.send-to p{\r\n\toverflow:hidden;\r\n\tfont-size:0.4rem;\r\n\tcolor:#2c2c2c;\r\n\tmargin-top:0.533333rem;\n}\n.send-to p label,.send-to span{\r\n\tdisplay:block;\r\n\tfloat:left;\n}\n.send-to p label{\r\n\tcolor:#999;\r\n\twidth:2.266667rem;\r\n\ttext-align:right;\n}\n.send-to span{\r\n\twidth:6.333333rem;\n}\n.nstructions{\r\n\tcolor:#999;\r\n\tfont-size:0.32rem;\r\n\tpadding-bottom:0.4rem;\r\n\tborder-bottom:1px solid #e0e0e0;\r\n\tline-height:0.6rem;\n}\n.nstructions span,.nstructions em{\r\n\tdisplay:block;\n}\n.nstructions em{\r\n\tpadding-left:0.266667rem;\n}\n.cancel{\r\n\ttext-align:center;\r\n\tpadding:0.4rem 0;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\ttext-decoration:underline;\r\n\tbackground:#fff;\n}\n.mask{\r\n\twidth:100%;\r\n\theight:100%;\r\n\tbackground:rgba(0,0,0,0.8);\r\n\tposition:fixed;\r\n\tleft:0;\r\n\ttop:0;\n}\n.cancel-car{\r\n\tposition:fixed;\r\n\twidth:7.2rem;\r\n\theight:3.733333rem;\r\n\tbackground:#fff;\r\n\tborder-radius:0.133333rem;\r\n\toverflow:hidden;\r\n\tleft:50%;\r\n\ttop:50%;\r\n\tmargin-top:-1.866667rem;\r\n\tmargin-left:-3.6rem;\n}\n.prompt-tit{\r\n\ttext-align:center;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\tmargin:0.986667rem 0;\n}\n.prompt-btn{\r\n\tbackground:#f5f5f5;\r\n\toverflow:hidden;\r\n\theight:1.173333rem;\r\n\tline-height:1.173333rem;\n}\n.prompt-btn span{\r\n\tdisplay:block;\r\n\twidth:50%;\r\n\tfloat:left;\r\n\ttext-align:center;\r\n\tfont-size:0.453333rem;\n}\n.prompt-btn span.confirm{\r\n\tbackground:#d6ab55;\r\n\tcolor:#fff;\n}\n.record{\r\n\tbackground:#fff;\r\n\tpadding-bottom:0.4rem;\r\n\tmargin-top:0.4rem;\n}\n.record span{\r\n\tdisplay:block;\r\n\tpadding:0.533333rem 0.4rem;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\tborder-bottom:1px solid #e0e0e0;\n}\n.record span em{\r\n\tfloat:right;\r\n\tcolor:#999;\n}\n.record span.record-time{\r\n\tfont-size:0.373333rem;\n}\r\n\r\n/*第二种状态*/\n.ayment-info{\r\n\tborder:1px solid #d5aa5c;\r\n\tmargin:0.533333rem 0;\n}\n.ayment-info p {\r\n    color: #2c2c2c;\r\n    font-size: 0.4rem;\r\n    margin-top: 0.533333rem;\r\n    overflow: hidden;\n}\n.ayment-info p label, .ayment-info span {\r\n    display: block;\r\n    float: left;\n}\n.ayment-info p label {\r\n    color: #999;\r\n    text-align: right;\r\n    width: 2.26667rem;\n}\n.ayment-info span {\r\n    width: 6.33333rem;\n}\n.ayment-details {\r\n    background: #f5f5f5;\r\n    font-size: 0.453333rem;\r\n    height: 1.17333rem;\r\n    line-height: 1.17333rem;\r\n    text-align: center;\n}\n.send-to p.send-phone ,.ayment-info p.send-phone{\r\n\tfont-size:0.453333rem;\r\n\tcolor:#fff;\r\n\ttext-align:center;\r\n\theight:1.173333rem;\r\n\tline-height:1.173333rem;\r\n\tbackground:#d5aa5c;\n}\r\n/*退订展车*/\n.website{\r\n\tbackground:#fff;\r\n\tmargin-top:0.4rem;\r\n\tpadding-bottom:0.533333rem;\n}\n.website span{\r\n\tdisplay:block;\r\n\tpadding:0.533333rem 0.4rem;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\tborder-bottom:1px solid #e0e0e0;\n}\n.website span.website-info{\r\n\tfont-size:0.373333rem;\r\n\tcolor:#999;\r\n\tborder:none;\r\n\tpadding:0.533333rem 0.4rem 0 0.4rem;\n}\r\n\r\n/*补款订单*/\n.replen{\r\n\tmargin-top:0.4rem;\r\n\tpadding:0.533333rem 0.4rem;\r\n\tfont-size:0.373333rem;\r\n\tcolor:#d5aa5c;\r\n\tbackground:#fff;\r\n\toverflow:hidden;\n}\n.replen i{\r\n\tfloat:right;\r\n\tposition:static;\n}\r\n/*待收货弹框*/\n.mask-receipt{\r\n\twidth:100%;\r\n\theight:100%;\r\n\tposition:fixed;\r\n\tleft:0;\r\n\ttop:0;\r\n\tbackground:rgba(0,0,0,0.8);\n}\n.receipt{\r\n\twidth:7.2rem;\r\n\tposition:fixed;\r\n\tleft:50%;\r\n\tmargin-left:-3.6rem;\r\n\ttop:25%;\r\n\tbackground:#fff;\r\n\tborder-radius:0.133333rem;\r\n\toverflow:hidden;\n}\n.receipt-tit{\r\n\twidth:5.026667rem;\r\n\theight:2.053333rem;\r\n\tborder-bottom:1px solid #2c2c2c;\r\n\tmargin:0.533333rem auto;\r\n\ttext-align:center;\n}\n.receipt-tit b{\r\n\tdisplay:block;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\n}\n.receipt-tit span{\r\n\tdisplay:block;\r\n\tfont-size:0.32rem;\r\n\tcolor:#999;\r\n\tpadding:0.133333rem 0;\n}\n.receipt-code{\r\n\tfont-size:0.453333rem;\r\n\tcolor:#d6ab55;\r\n\ttext-align:center;\r\n\tmargin-bottom:0.533333rem;\n}\n.options{\r\n\tpadding:0 0.533333rem;\r\n\tfont-size:0.346667rem;\r\n\tcolor:#2c2c2c;\r\n\tpadding-bottom:0.533333rem;\n}\n.options b{\r\n\tdisplay:block;\n}\n.receipt-btn{\r\n\tfont-size:0.453333rem;\r\n\tcolor:#fff;\r\n\ttext-align:center;\r\n\tline-height:1.173333rem;\n}\n.receipt-btn span{\r\n\tdisplay:inline-block;\r\n\twidth:50%;\r\n\theight:1.173333rem;\r\n\tbackground:#d6ab55;\r\n\tcursor:pointer;\n}\n.receipt-btn span.receipt-close{\r\n\tbackground:#f5f5f5;\r\n\tcolor:#000;\n}\r\n\r\n/*退订弹框*/\n.unsub-mask{\r\n\tposition:fixed;\r\n\tleft:0;\r\n\ttop:0;\r\n\twidth:100%;\r\n\theight:100%;\r\n\tbackground:rgba(0,0,0,0.8);\n}\n.unsub-ct{\r\n\tposition:fixed;\r\n\tleft:50%;\r\n\ttop:50%;\r\n\tmargin-left:-3.6rem;\r\n\tmargin-top:-2.866667rem;\r\n\twidth:7.2rem;\r\n\tbackground:#fff;\r\n\toverflow:hidden;\r\n\tborder-radius:0.133333rem;\n}\n.unsub-tp{\r\n\twidth:4.133333rem;\r\n\theight:1.733333rem;\r\n\tmargin:0.866667rem auto 0.533333rem auto;\r\n\tborder-bottom:1px solid #2c2c2c;\r\n\tfont-size:0.453333rem;\r\n\tcolor:#2c2c2c;\r\n\tline-height:0.6rem;\r\n\tpadding:0 0.533333rem;\r\n\ttext-align:center;\n}\n.unsub-adviser{\r\n\tpadding:0 0.533333rem;\r\n\tfont-size:0.346667rem;\r\n\tcolor:#2c2c2c;\r\n\tmargin-bottom:1.066667rem;\n}\n.unsub-adviser em{\r\n\tcolor:#999;\r\n\tmargin-left:0.266667rem;\n}\n.unsub-adviser span{\r\n\tfloat:right;\n}\n.unsub-btn{\r\n\tbackground:#f5f5f5;\r\n\theight:1.173333rem;\n}\n.unsub-btn span{\r\n\tdisplay:block;\r\n\tfloat:left;\r\n\twidth:50%;\r\n\ttext-align:center;\r\n\tfont-size:0.453333rem;\r\n\tline-height:1.173333rem;\n}\n.unsub-btn span.active{\r\n\tcolor:#fff;\r\n\tbackground:#d6ab55;\n}\n.remits-fixed a{\r\n\tcolor:#fff;\n}\r\n"],sourceRoot:""}])},299:function(n,t,e){var r=e(249);"string"==typeof r&&(r=[[n.i,r,""]]),r.locals&&(n.exports=r.locals);e(59)("66b317de",r,!0)},381:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"rating_page"},[e("header",{staticClass:"user-tit"},[e("a",{staticClass:"white-lt",attrs:{href:"javascript:;"},on:{click:n.resetIndex}}),n._v("展车详情\n\t\t")]),n._v(" "),e("section",{staticClass:"details-wrap"},[e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:n.timeShow,expression:"timeShow"}],staticClass:"details-tit"},["4"==n.orderInfo.status?e("h4",[e("span",[n._v("剩余："+n._s(n.orderInfo.remaining)+"自动确认收货")]),n._v(n._s(n.statusText))]):e("h4",[e("span",[n._v("剩余："+n._s(n.orderInfo.remaining))]),n._v(n._s(n.statusText))]),n._v(" "),"27"==n.orderInfo.status?e("p",[n._v("原因："+n._s(n.orderInfo.auditInstructions))]):n._e()]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!n.timeShow,expression:"!timeShow"}],staticClass:"details-tit"},[e("h4",[n._v(n._s(n.statusText))])]),n._v(" "),e("div",{staticClass:"order-ct"},[e("div",{staticClass:"order-full"},[e("h3",[n._v(n._s(n.orderInfo.name))]),n._v(" "),e("p",{staticClass:"interior"},[n._v(n._s(n.orderInfo.color))]),n._v(" "),e("p",{staticClass:"payment"},[e("em",[n._v(" ×"+n._s(n.orderInfo.num))]),n._v("指导价："),e("span",[n._v(n._s(n.orderInfo.price)+"元")])]),n._v(" "),n.orderInfo.vinNumber?e("p",{staticClass:"car-vin"},[e("span",[n._v(n._s(n.vinActive))]),n._v("车辆VIN码："+n._s(n.orderInfo.vinNumber))]):n._e()]),n._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:n.orderInfo.remark,expression:"orderInfo.remark"}],staticClass:"leave"},[e("span",[n._v("买家留言：")]),n._v(n._s(n.orderInfo.remark)+"\n\t\t            ")])])]),n._v(" "),e("div",{staticClass:"details-addres"},[e("div",{staticClass:"receipt-title"},[n._v("收货信息")]),n._v(" "),e("div",{staticClass:"details-user"},[e("span",[n._v(n._s(n.address.phone))]),n._v("收货人："+n._s(n.address.name)+"\n\t            ")]),n._v(" "),e("p",[n._v("收货地址："+n._s(n.address.address))])]),n._v(" "),e("div",{staticClass:"request-ct"},[e("p",{staticClass:"remit-tit"},[n._v("保证金")]),n._v(" "),e("p",{class:n.paymentActive?"bond active":"bond"},[e("span",[n._v(n._s(n.payment))]),n._v("支付状态：")]),n._v(" "),e("p",{staticClass:"bond"},[e("span",[n._v("￥"+n._s(n.capitalInfo.totalPrice))]),n._v("金额：")]),n._v(" "),e("p",{staticClass:"bond"},[e("span",[n._v("-￥"+n._s(n.capitalInfo.coupon))]),n._v("优惠券抵扣(不可开票)：")]),n._v(" "),e("p",{staticClass:"bond active"},[e("span",[n._v("￥"+n._s(n.capitalInfo.deduction))]),n._v("需付款：")]),n._v(" "),6!=n.orderInfo.status&&11!=n.orderInfo.status&&10!=n.orderInfo.status?e("div",[1==n.bankInfo.accountType?e("div",{staticClass:"ayment-info"},[e("p",[e("label",[n._v("付款人：")]),n._v(" "),e("span",[n._v(n._s(n.bankInfo.companyName))])]),n._v(" "),e("p",[e("label",[n._v("银行：")]),n._v(" "),e("span",[n._v(n._s(n.bankInfo.bankName))])]),n._v(" "),"7"==n.orderInfo.status||"27"==n.orderInfo.status?e("p",{staticClass:"send-phone",on:{click:n.sendMes}},[n._v(n._s(n.sendText))]):n._e(),n._v(" "),"8"==n.orderInfo.status||"3"==n.orderInfo.status||"4"==n.orderInfo.status||"5"==n.orderInfo.status||"28"==n.orderInfo.status?e("router-link",{attrs:{to:{name:"payment",params:{id:n.orderInfo.orderNum}}}},[e("p",{staticClass:"ayment-details"},[n._v("查看详情")])]):n._e()],1):e("div",[e("div",{staticClass:"send-to"},[e("p",[e("label",[n._v("汇款银行：")]),n._v(" "),e("span",[n._v(n._s(n.bankInfo.bankName))])]),n._v(" "),e("p",[e("label",[n._v("公司名称：")]),n._v(" "),e("span",[n._v(n._s(n.bankInfo.companyName))])]),n._v(" "),e("p",[e("label",[n._v("账号：")]),n._v(" "),e("span",[n._v(n._s(n.bankInfo.account))])]),n._v(" "),"7"==n.orderInfo.status||"27"==n.orderInfo.status?e("p",{staticClass:"send-phone",on:{click:n.sendMes}},[n._v(n._s(n.sendText))]):n._e(),n._v(" "),"8"==n.orderInfo.status||"3"==n.orderInfo.status||"4"==n.orderInfo.status||"5"==n.orderInfo.status?e("router-link",{attrs:{to:{name:"payment",params:{id:n.orderInfo.orderNum}}}},[e("p",{staticClass:"ayment-details"},[n._v("查看详情")])]):n._e()],1),n._v(" "),"8"!=n.orderInfo.status&&"3"!=n.orderInfo.status&&"4"!=n.orderInfo.status&&"5"!=n.orderInfo.status?e("div",{staticClass:"nstructions"},[e("span",[n._v("汇款说明：")]),n._v(" "),e("em",[n._v("1.汇款后请上传汇款凭证")]),n._v(" "),e("em",[n._v("2.未按时间付款的订单系统将自动取消")])]):n._e()])]):n._e()]),n._v(" "),e("router-link",{attrs:{to:{name:"orderDetail",params:{id:n.orderInfo.balanceOrderNumber}}}},[n.orderInfo.balanceOrderNumber?e("div",{staticClass:"replen"},[e("i",{staticClass:"white-rt"}),n._v("补款订单："+n._s(n.orderInfo.balanceOrderNumber))]):n._e()]),n._v(" "),n.record.length?e("div",{staticClass:"record"},[e("span",[n._v("展车记录")]),n._v(" "),n._l(n.record,function(t,r){return e("span",{staticClass:"record-time"},[e("em",[n._v(n._s(n.cancelTime(t)))]),n._v(n._s(t.des)+"：")])})],2):n._e(),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.process,expression:"process"}],staticClass:"website"},[e("span",[n._v("退订展车")]),n._v(" "),e("span",{staticClass:"website-info"},[n._v("退订展车流程")]),n._v(" "),e("span",{staticClass:"website-info"},[n._v("1.联退车事宜系服务顾问沟通")]),n._v(" "),e("span",{staticClass:"website-info"},[n._v("2.办理接车及退款手续")])]),n._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:n.carCancel,expression:"carCancel"}],staticClass:"cancel",on:{click:function(t){n.maskShow=!n.maskShow}}},[n._v("取消申请")]),n._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:n.vanShow,expression:"vanShow"}],staticClass:"cancel",on:{click:n.vanLayer}},[n._v("退订展车")]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.btmBtn,expression:"btmBtn"}]},[e("p",{staticClass:"visib-98"}),n._v(" "),"8"==n.orderInfo.status?e("div",{staticClass:"remits-fixed active"},[n._v(n._s(n.btnText))]):n._e(),n._v(" "),"5"==n.orderInfo.status?e("div",{staticClass:"remits-fixed",on:{click:n.balanceConfrim}},[n._v("\n\t\t        \t"+n._s(n.btnText)+"\n\t\t        ")]):n._e(),n._v(" "),"4"==n.orderInfo.status?e("div",{staticClass:"remits-fixed",on:{click:n.confirmCar}},[n._v(n._s(n.btnText))]):n._e(),n._v(" "),"7"==n.orderInfo.status||"27"==n.orderInfo.status?e("div",{staticClass:"remits-fixed",on:{click:n.paymentSubmit}},[n._v("\n\t              \t提交汇款凭证\n\t          \t")]):n._e()])],1),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.maskShow,expression:"maskShow"}],staticClass:"mask"},[e("div",{staticClass:"cancel-car"},[e("p",{staticClass:"prompt-tit"},[n._v("确认取消申请展车吗？")]),n._v(" "),e("p",{staticClass:"prompt-btn"},[e("span",{on:{click:function(t){n.maskShow=!n.maskShow}}},[n._v("点错了")]),n._v(" "),e("span",{staticClass:"confirm",on:{click:n.cancelOrder}},[n._v("确认取消")])])])]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.receiptShow,expression:"receiptShow"}],staticClass:"mask-receipt"},[e("div",{staticClass:"receipt"},[e("div",{staticClass:"receipt-tit"},[e("b",[n._v(n._s(n.receiptData.name))]),n._v(" "),e("span",[n._v(n._s(n.receiptData.color))])]),n._v(" "),e("p",{staticClass:"receipt-code"},[n._v(n._s(n.receiptData.vinNumber))]),n._v(" "),n.receiptData.attachment?e("div",{staticClass:"options"},[e("b",[n._v("请确认随车附件：")]),n._v(" "),e("p",[n._v(n._s(n.receiptData.attachment))])]):n._e(),n._v(" "),e("div",{staticClass:"receipt-btn"},[e("span",{staticClass:"receipt-close",on:{click:function(t){n.receiptShow=!n.receiptShow}}},[n._v("取消")]),e("span",{on:{click:n.receiptStatus}},[n._v("确认收货")])])])]),n._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:n.vanMask,expression:"vanMask"}],staticClass:"unsub-mask"},[e("div",{staticClass:"unsub-ct"},[e("div",{staticClass:"unsub-tp"},[n._v(n._s(n.vanInfo.title))]),n._v(" "),e("div",{staticClass:"unsub-adviser"},[e("span",[n._v(n._s(n.vanInfo.phone))]),n._v(n._s(n.vanInfo.name)),e("em",[n._v(n._s(n.vanInfo.position))])]),n._v(" "),e("p",{staticClass:"unsub-btn"},[e("span",{on:{click:function(t){n.vanMask=!n.vanMask}}},[n._v("取消")]),n._v(" "),e("span",{staticClass:"active"},[e("a",{attrs:{href:"tel:"+n.vanInfo.phone}},[n._v("拨打电话")])])])])]),n._v(" "),n.showAlert?e("alert-tip",{attrs:{alertText:n.alertText},on:{closeTip:function(t){n.showAlert=!1}}}):n._e()],1)},staticRenderFns:[]}},71:function(n,t,e){function r(n){e(299)}var A=e(0)(e(207),e(381),r,null,null);n.exports=A.exports}});
//# sourceMappingURL=44.bb6f5abc8a5348a4c259.js.map