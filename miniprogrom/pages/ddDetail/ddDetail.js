let aRR = {};
const db = wx.cloud.database();

Page({
  data: {
    aRR: {},
    a: "打包",
    b: "外卖",
    c: "堂食",
  },
  onLoad: function (e) {
    console.log(e)
 
if(e.idx==="-1"){
  this.toFu();
}else{
 this.getorderN();
}
  },
  getorderN() {
    let that = this;
    aRR = wx.getStorageSync('ddDetail');
    that.setData({
      aRR: aRR,
      a: "打包",
      b: "外卖",
    });
  },
  toFu(){
    let that=this;
 let  openId = wx.getStorageSync('openid');
 wx.cloud.callFunction({
  name: 'getOrder',
  data: {
    openId: openId 
  }
}).then(res => {
console.log(res)  ;   
  that.setData({
    aRR:  that.data.aRR=res.result.data[res.result.data.length-1 ],
    a: "打包",
    b: "外卖",
  });
}).catch(e=>{
  console.log(e);
  wx.showToast({
    title: '请保持数据连接',
    icon:"error"
  })
})
  },
  toCall(){
    wx.makePhoneCall({
      phoneNumber: '19818931277',
      success: res => {
        console.log(res)
      },
      fail: fail => {
        console.log(fail)
      }
    })
  },

})