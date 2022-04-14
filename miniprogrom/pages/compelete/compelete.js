
Page({
  data: {

  },
  onLoad: function (options) {

  },
  goOrderD(){

wx.reLaunch({
  url: '../ddDetail/ddDetail?idx='+-1,
})
  },
  goIndex(){

wx.switchTab({
  url: '../index/index',
})
 wx.setStorageSync('cart',[]);

  }
})