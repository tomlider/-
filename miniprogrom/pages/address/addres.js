let addressStor = {};
let app=getApp();
Page({
  data: {
    adfalg: false,
  },
  onLoad: function (options) {
  //  this.jugeStor();
  },
  onShow: function (options) {
    this.jugeStor();
  },
  onUnload: function (options) {
let  idx=app.globalData.currentIdx;
let addressStor= wx.getStorageSync('address');
if(idx===-1&&addressStor.length>0){
  app.globalData.currentIdx=0;
  wx.setStorageSync('currentIdx',0);
}
  },
  toChooselocation() {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  toaD() {
    wx.navigateTo({
      url: '../adddeta/adddeta',
    })
  },
  jugeStor() {
    let that = this;
    let addressStor = wx.getStorageSync('address');
    let Arr = Object.keys(addressStor);
    if (Arr.length > 0) {
      that.setData({
        adfalg: true,
        addressStor: addressStor,
      })
    }else{
      that.setData({
        adfalg:false ,
   //     addressStor: addressStor,
      })
    }
  },
  bianJi(e) {
    let idx=e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: '../adddeta/adddeta?idx='+idx,
 
    })
  },
  yuB(e){
    let idx=e.currentTarget.dataset.idx;
    wx.setStorageSync('currentIdx', idx);
    wx.navigateBack({
      delta: -1,
    })
  }
})