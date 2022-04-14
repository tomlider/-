// pages/beiyong2/beiyong2.js
Page({
  data:{
    text: '时间：01月25日13时25分-01月25日13时50分',
    marqueePace: 3,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 14,
    orientation: 'left',//滚动方向
    interval: 60 // 时间间隔    
},
onShow: function () {
    var tm = this;
    var length = tm.data.text.length * tm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    tm.setData({
        length: length,
        windowWidth: windowWidth,
        marquee2_margin: length < windowWidth ? windowWidth - length : tm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    tm.run1();// 水平一行字滚动完了再按照原来的方向滚动
 
},
run1: function () {
  var tm = this;
  var interval = setInterval(function () {
    if (-tm.data.marqueeDistance < tm.data.length) {
      tm.setData({
        marqueeDistance: tm.data.marqueeDistance - tm.data.marqueePace,
      });
    } else {
      clearInterval(interval);
      tm.setData({
        marqueeDistance: tm.data.windowWidth
      });
      tm.run1();
    }
  }, tm.data.interval);
},
})