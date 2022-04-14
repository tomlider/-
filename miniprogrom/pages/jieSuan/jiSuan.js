//2 2w开头皆为外卖特设
//handleLoacationy与getlocao函数定位重复
let zh = "";
let cj = "";
let call = "";
let totalint = 0;
let mj = 0;
let app = getApp();
let nameI = "";
const db = wx.cloud.database();
let userinfo = {};
let openId = "";
Page({
  data: {
    cartgoods: [],
    srca: 'tsl',
    srcb: 'db',
    total: Number,
    mjq: 0,
    bzfq: 0,
    fSfalg: 0,
    paFalg: Number,
    kM: 0,
    falgA: true,
  },
  onLoad: function (options) {
    let that = this;
    //  that.data.paFalg=parseInt(app.globalData.pagefalge);
    this.readyG(options);
    this.handleLoacation();
    this.forUserinfo()
  },
  onShow: function (options) {
    let that = this;
    // that.handleLoacation();
    let arr = wx.getStorageSync('address');
    if (arr.length > 0) {
      let currentIdx = wx.getStorageSync('currentIdx') || app.globalData.currentIdx;
      //  console.log(arr.length, arr[currentIdx], currentIdx);
      if (arr.length > 0) {
        if (currentIdx === -1) {
          that.setData({
            falgA: false,
            addressStor: arr[0],
          })
        } else {
          that.setData({
            falgA: false,
            addressStor: arr[currentIdx],
          })
        }
      } else {
        that.setData({
          fSfalg: 0,
          falgA: true,
        })

      }
    } else {
      that.setData({
        falgA: true,
      })
    }
  },
  readyG(e) {
    let that = this;
    let bzf = 0;
    let numA = 0;
    totalint = parseInt(e.res);
    that.manJ();
    that.data.cartgoods = wx.getStorageSync('cart');
    for (let i in that.data.cartgoods) {
      numA = numA + that.data.cartgoods[i].foodnum
    }
    bzf = numA * 0.5;
    let arr = wx.getStorageSync('address');
    let currentIdx = wx.getStorageSync('currentIdx') || app.globalData.currentIdx;
    console.log(parseInt(app.globalData.pagefalge));
    if (arr.length > 0 && parseInt(app.globalData.pagefalge) === 0) {
      if (currentIdx === -1) {
        that.setData({
          cartgoods: that.data.cartgoods,
          total: totalint - mj,
          mjq: mj,
          bzq: bzf,
          paFalg: parseInt(app.globalData.pagefalge),
          fSfalg: 0,
          falgA: false,
          addressStor: arr[0],
        })
      } else {
        that.setData({
          cartgoods: that.data.cartgoods,
          total: totalint - mj,
          mjq: mj,
          bzq: bzf,
          paFalg: parseInt(app.globalData.pagefalge),
          fSfalg: 0,
          falgA: false,
          addressStor: arr[currentIdx],
        })
      }
    } else {
      that.setData({
        cartgoods: that.data.cartgoods,
        total: totalint - mj,
        mjq: mj,
        bzq: bzf,
        paFalg: parseInt(app.globalData.pagefalge),
        fSfalg: 0,
        falgA: true,
      })
    }
    if (parseInt(app.globalData.pagefalge) === 0) {
      that.setData({
        total: that.data.total + 5 + bzf
      })
    }
    //paFalg fSfalg
    //  console.log(that.data.paFalg);
  },
  goMap() {
    wx.navigateTo({
      url: '../mapn/mapn',
    })
  },
  goBei() {
    wx.navigateTo({
      url: '../beiz/beiz',
    })
  },
  turnImag() {
    let that = this;
    if (that.data.srca === "tsx") {
      that.setData({
        srca: 'tsl',
        srcb: 'db',
        fSfalg: 0,
        total: that.data.total - that.data.bzq,
      })
    }
  },
  turnImage() {
    let that = this;
    if (that.data.srcb === 'db') {
      that.setData({
        srca: 'tsx',
        srcb: 'dbb',
        fSfalg: 1,
        total: that.data.total + that.data.bzq
      })
    }

  },
  callinput(e) {
    call = e.detail.value;
    if (e.detail.value.length > 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位电话号码',
      })
    }
  },
  zhinput(e) {
    zh = e.detail.value;
  },
  cjinput(e) {
    cj = e.detail.value;

  },
  manJ() {
    if (totalint > 100 && totalint < 200) {
      mj = 5;
    } else if (totalint > 200 && totalint < 300) {
      mj = 8;
    } else if (totalint > 300 && totalint < 400) {
      mj = 18;
    } else if (totalint > 400 && totalint < 500) {
      mj = 28;
    } else if (totalint > 500) {
      mj = 48;
    }
  },
  //以下外卖设想函数
  handleLoacation(toast) { //2w
    let that = this;
    if (that.data.paFalg === 0) {
      wx.getLocation({
        type: 'gcj02',
        success: asd => {
          that.distant(asd.latitude, asd.longitude);
        },
        fail: res => {
          //  wx.hideLoading();
          wx.getSetting({
            success: function (qw) {
              if (!qw.authSetting['scope.userLocation']) {
                wx.showModal({
                  title: '',
                  content: '请允许获取您的定位',
                  confirmText: '授权',
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        withSubscriptions: true,
                        success(ui) {
                          wx.getLocation({
                            type: 'gcj02',
                            success: asd => {
                              that.distant(asd.latitude, asd.longitude);
                            }
                          });
                        },
                        fail(ui) {
                          console.log(ui)
                        }
                      })
                      // then(  console.log('1'),that.distant(res.latitude, res.longitude));
                      //异步未解决
                    } else {

                    }
                  }
                })
              } else {
                //用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
                wx.showModal({
                  title: '',
                  content: '请在系统设置中打开定位服务',
                  confirmText: '确定',
                  success: function (res) {
                    that.distant(res.latitude, res.longitude)
                  }
                })
              }
            }
          })

        }
      })
    }
  },
  getlocao() {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.distant(res.latitude, res.longitude)
      }
    })
  },
  distant(la2, lo2) {
    let La1 = 38.873068 * Math.PI / 180.0;
    let La2 = la2 * Math.PI / 180.0;
    let La3 = La1 - La2;
    let Lb3 = 121.542058 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10;
    console.log("计算结果", s);
    this.setData({
      kM: s
    })
    return s;
  },
  nameInp(e) {
    nameI = e.detail.value;
  },
  toEdit() {
    wx.navigateTo({
      url: '../address/addres',
    })
  },
  pay() { //支付设想
    let that = this;
    //  let zong = [];
    let currentTime = app.getTime();
    // let newData = new Date().getTime();
    if (that.data.paFalg === 1) {
      if (that.data.fSfalg === 0) {
        if (cj != "" && zh != "" && call != "") {
          db.collection('orderN').add({
            data: {
              zhuangtai: "堂食",
              foodArr: that.data.cartgoods,
              cj: cj,
              zh: zh,
              mjq: that.data.mjq,
              beiz: wx.getStorageSync('beiz') || "",
              total: that.data.total,
              call: call,
              bzq: that.data.bzq,
              _createTime: new Date().getTime(),
              currentTime: currentTime,
              userinfo: userinfo.nickName,
              openid: openId,
            }
          }).then(res=>{console.log('上传成功'),that.payCompelet()}).catch(res=>{console.log('上传失败',res)})
        } else {
          wx.showModal({
            title: '提示',
            content: '请填入完整的信息！',
          })
        }
      } else {
        //dab
        if (cj != "" && nameI != "" && call != "") {
          db.collection('orderN').add({
            data: {
              zhuangtai: "打包",
              foodArr: that.data.cartgoods,
              cj: cj,
              mjq: that.data.mjq,
              beiz: wx.getStorageSync('beiz') || "",
              total: that.data.total,
              call: call,
              bzq: that.data.bzq,
              nameI: nameI,
              _createTime: new Date().getTime(),
              currentTime: currentTime,
              userinfo: userinfo.nickName,
              openid: openId,
            }
          }).then(res=>{console.log('上传成功',res),that.payCompelet(res)}).catch(res=>{console.log('上传失败',res)})
        } else {
          wx.showModal({
            title: '提示',
            content: '请填入完整的信息！',
          })
        }
      }
    } else {
      //waimai
      //  console.log(!!that.data.addressStor)
      if (cj != "" && that.data.falgA === false) {
        db.collection('orderN').add({
          data: {
            zhuangtai: "外卖",
            foodArr: that.data.cartgoods,
            addressStor: that.data.addressStor,
            cj: cj,
            mjq: that.data.mjq,
            beiz: wx.getStorageSync('beiz') || "",
            total: that.data.total,
            bzq: that.data.bzq,
            _createTime: new Date().getTime(),
            currentTime: currentTime,
            userinfo: userinfo.nickName,
            openid: openId,
          }
        }).then(res=>{console.log('上传成功'),that.payCompelet()}).catch(res=>{console.log('上传失败',res)})
      } else {
        wx.showModal({
          title: '提示',
          content: '请填入完整的信息！',
        })
      }
    }

  },
  forUserinfo() {
    let that = this;
    userinfo = wx.getStorageSync('userInfo');
    openId = wx.getStorageSync('openid');
    let u = Object.keys(userinfo);
    if (u.length === 0) {
      wx.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: res => {
          userinfo = res.userInfo;
          wx.setStorageSync('userInfo', res.userInfo);
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
  payCompelet(res) {
if(true){
  wx.reLaunch({
    url: '../compelete/compelete',
  })
  wx.setStorageSync('cart',[]);
 // wx.setStorageSync('left',[]);
}else{
  wx.navigateTo({
    url: '../compelete/compelete.wxml',
  })
}
  }
})