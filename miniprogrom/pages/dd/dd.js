const db = wx.cloud.database();
const app = getApp();
let openId = openId;
let detail=[];
Page({
  data: {
    orderN: [],
    orderFlag:Boolean,
  },
  onLoad: function (options) {
    //  this.onReady();
  },
  onShow: function (options) {
    this.oneady();
  },
  oneady() {
    let that = this;
    openId = wx.getStorageSync('openid');
    let i = Object.keys(openId);
    if (i.length === 0) {
      app.getOpenid();
      //有问题
    }
    //改
    /** 
    wx.cloud.callFunction({
      name: 'forfoodlist',
      data: {
        action: "all"
      }
    }).then(res => {
      let uio = res.result.data;
      wx.setStorageSync('left', uio)
    }).catch(e=>{
wx.showToast({
  title: '请保持数据连接',
  icon:"error"
})
    })
     */
    //改
    wx.cloud.callFunction({
      name: 'getOrder',
      data: {
        openId: i
      }
    }).then(res => {
      console.log(res);
      detail=res.result.data;
      if(detail.length===0){
        that.setData({
          orderFlag:true,
        })
      }else{
        that.setData({
          orderFlag:false,
          orderN:res.result.data,
        })
      }
    
    }).catch(e=>{
      console.log(e);
      wx.showToast({
        title: '请保持数据连接',
        icon:"error"
      })
    })
  
  },
goddDtail(e){

  let detailA= detail[e.currentTarget.dataset.idx];
  wx.setStorageSync('ddDetail',detailA);
wx.navigateTo({
  url: '../ddDetail/ddDetail?idx='+e.currentTarget.dataset.idx,
})
}
})