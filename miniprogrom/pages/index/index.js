const db = wx.cloud.database();
let foodllist = [];
let tuijian = [];
const app=getApp();
Page({
  data: {
    lunbo: [],
    btuij: [],
    flag: false,
    linA: [],
  },
  onLoad: function (options) {
    
    this.forSwiper();
    this.forFoodlisr();
    this.forCloud();
    app.getOpenid();
  },
  forSwiper() {
    let that = this;
    let youhui = [];
    db.collection('lunbotu').get({
      success: function (res) {
        that.setData({
          lunbo: res.data,
        });
      }
    })
    db.collection('youhui').get({
      success: function (res) {
        // console.log(res);
        youhui = res.data;
        for (let i in youhui) {
          that.data.linA.push(youhui[i].discount);
        }
        that.setData({
          linA: that.data.linA,
        })
      }
    })
  },
  cancelimg() {
    this.setData({
      flag: false,
    })
  },
  forFoodlisr() {
    let that = this;
    db.collection('food').where({
      status: "上推荐"
    }).orderBy('tuijian', 'desc').get({
      success: function (res) {
        that.tuijian = res.data
        that.setData({
          btuij: that.tuijian,
        })
      }
    });
  },
  godetails(res) {
    console.log(res)
    wx.navigateTo({
      url: '../details/details?res=' + res.currentTarget.dataset.index,
      success: (result) => {

      },
      fail: (res) => {},

    })
  },
  toMene(e) {
    wx.navigateTo({
      url: '../../pages/mune/mune',
    })
  },
  forCloud() {
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
  },
  toCall() {
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
  goMap() {
    wx.navigateTo({
      url: '../mapn/mapn',
    })
  },
})