let isHide = false;
let  userOpenid="";
const app= getApp();
Page({
  data: {
   // isHide:false,
    nickname:"点击登录",
    userimage:"../../image/boy.png",
  },
  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting) {
          wx.getStorageSync('userInfo');
          wx.getStorage({
            key: 'userInfo',
            success(e) {
              that.data.userInfo = e.data;
              that.setData({
                nickname: e.data.nickName,
                userimage: e.data.avatarUrl,
              })
              isHide = true
            },
            fail() {
              isHide = false
            }
          })
        }
      }
    })
    userOpenid=app.getOpenid();
  },

  dLuH(e) {
    let that = this
    if (!isHide) {
      wx.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: res => {
          that.data.userInfo = res.userInfo;
          that.setData({
            nickname: res.userInfo.nickName,
            userimage: res.userInfo.avatarUrl,
          })
          isHide = true
          wx.setStorageSync('userInfo', that.data.userInfo);
        },
        fail: res => {
          wx.showToast({
            title: '您拒绝了授权',
            icon: 'none'
          })
          return;
        }
      })
    }
  },
  goSw(){
    wx.switchTab({
      url: '../dd/dd',
    })
  },
  goX(){

  },
  goKefu(){

  },
  goFk(){

  },
})