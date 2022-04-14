let switch2 = false;
let windowHeight = 0;
let heightArr = [];
let app = getApp();
let xuanItem = String;
let beiCart = {};
let xindex = Number;
let xtemp = Number;
let addordelt = Number;
let stor = {};
const db = wx.cloud.database();
let zhixingfalg = false;
Page({
  data: {
    cartgoods: [],
    total: 0,
    currentIndex: 0,
    xcurrentIndex: 0,
    left: [],
    //  right: [],
    scroll: {},
    guigeFlag: true,
    forjian: false,
    bmask: false,
    animationData: {},
    mXuan: false,
    mask: false,
    kexuan: {},
    xNumber: 1,
    gGbanner: "",
  },
  onLoad: function (options) {
    let that = this;

    app.globalData.pagefalge = options.index;
    stor = wx.getStorageSync('cartNew') || {};
    let u = wx.getStorageSync('left') || [];
    if (u.length === 0) {
      wx.cloud.callFunction({
        name: 'forfoodlist',
        data: {
          action: "all"
        }
      }).then(res => {
        let uio = res.result.data;
        wx.setStorageSync('left', uio);
        that.forFood(u);
      }).catch(e => {
        wx.showToast({
          title: '请保持数据连接',
          icon: "error"
        })
      })
    } else {
      // let  p= new Promise()
      that.forFood(u);

    }

  },
  onShow: function (e) {
    let that = this;
    console.log(zhixingfalg)
    if (zhixingfalg) {
      stor = wx.getStorageSync('cartNew') || {};
      console.log('showle');
      if (app.globalData.upDaF === 2) {
        that.upDatacart();
      } else {
        that.forShow();
      }
    }
  },
  forShow() {
    let that = this;
    let storA = Object.keys(stor);
    zhixingfalg = true;
    if (storA.length > 0) {
      console.log('that.stang');
      that.sangT(stor.idxc);
      //  zhixingfalg = true;
    }
  },
  onHide: function () {
    wx.setStorageSync('cart', this.data.cartgoods);

  },
  onUnload: function () {
    wx.setStorageSync('cart', this.data.cartgoods);
    zhixingfalg = false;
  },
  forFood(res) {
    let that = this;
    let tempArr = [];
    res.forEach((item, index) => {
      item.jian = false;
      item.foodNumber = 0;
      if (tempArr.indexOf(item.fenlei) === -1) {
        that.data.left.push({
          title: item.fenlei,
          list: [item]
        });
        tempArr.push(item.fenlei);
      } else {
        for (let j = 0; j < that.data.left.length; j++) {
          if (that.data.left[j].title == item.fenlei) {
            that.data.left[j].list.push(item);
            break;
          }
        }
      }
    });
    let gGbres = "";
    db.collection('gGbanner').get({
      success: function (res) {
        gGbres = res.data[0].gGbanneritem;
        that.upDatacart(gGbres);
        that.getHeight();
      },
      fail: function (e) {
        that.upDatacart();
        that.getHeight();
        wx.showToast({
          title: '请保持数据连接',
          icon: "error"
        })
      }
    });

  },
  getRight(e) {
    this.setData({
      Tab: e.currentTarget.dataset.idx,
      currentIndex: e.currentTarget.dataset.idx
    })
  },
  upDatacart(gGbres) {
    let that = this;
    let stop = false;
    that.data.cartgoods = wx.getStorageSync('cart');
    if (that.data.cartgoods) {
      for (let y = 0; y < that.data.cartgoods.length; y++) {
        for (let i = 0; i < that.data.left.length; i++) {
          stop = false;
          for (let u = 0; u < that.data.left[i].list.length; u++) {
            if (that.data.left[i].list[u]._id === that.data.cartgoods[y].foodid) {
              that.data.left[i].list[u].foodNumber = that.data.cartgoods[y].foodnum;
              that.data.left[i].list[u].jian = true;
              stop = true;
              if (stop) break;
            }
          }
          if (stop) break;
        }
        that.data.total += that.data.cartgoods[y].price * that.data.cartgoods[y].foodnum;
        //   if (that.data.cartgoods[y].beizhu) {}
      }
      that.setData({
        left: that.data.left,
        cartgoods: that.data.cartgoods,
        total: that.data.total,
        gGbanner: gGbres,
      })
      that.forShow();
    } else {
      that.data.cartgoods = [];
      that.setData({
        gGbanner: gGbres,
        left: that.data.left,
      })
      that.forShow();
    }


  },
  getHeight() {
    wx.getSystemInfo({
      success: (res) => {
        windowHeight = res.windowHeight * (750 / res.windowWidth)
      },
    })
    let h = 0;
    const query = wx.createSelectorQuery();
    query.selectAll('.rightCates').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      res[0].forEach((item) => {
        h += item.height;
        heightArr.push(h);
      })
    })
  },
  forLeft(e) {
    let wucha = 15;
    let st = e.detail.scrollTop;
    let myArr = heightArr;
    for (let i = 0; i < myArr.length; i++) {
      if (st >= myArr[i] && st < myArr[i + 1] - wucha) {
        this.setData({
          currentIndex: i + 1
        });
        return;
      } else if (st < myArr[0] - wucha) {
        this.setData({
          currentIndex: 0
        });
      }

    }
  },
  addNumber(e) {
    let calculate = e.currentTarget.dataset.calcu;
    let that = this;
    let infex2 = e.currentTarget.dataset.index2;
    let temp = e.currentTarget.dataset.idx3;
    let j = that.data.left[infex2].list[temp];
    let gu = "left[" + infex2 + "].list[" + temp + "].jian";
    let nums = "left[" + infex2 + "].list[" + temp + "].foodNumber";
    let bk = [];
    that.data.cartgoods.forEach(item => {
      bk.push(item.foodid);
    })
    let bkindex = bk.indexOf(j._id);
    if (bkindex === -1) {
      that.setData({
        [gu]: true,
        [nums]: 1,
      })
      that.newgoods(infex2, temp);
    } else {
      that.data.cartgoods[bkindex].foodnum += calculate;
      if (that.data.cartgoods[bkindex].foodnum > 0) {
        //   cartgoods[bkindex].price*=cartgoods[bkindex].foodnum;

        that.setData({
          [nums]: that.data.cartgoods[bkindex].foodnum,
          total: that.data.total + j.price * calculate,
          //
        })
      } else {
        that.setData({
          [gu]: false,
          total: that.data.total + j.price * calculate
        })
        that.data.cartgoods.splice(bkindex, 1)
      }
      if (calculate < 0 && that.data.left[infex2].list[temp].beizhu > 0) {
        //   console.log('zdl')
        that.data.cartgoods[bkindex].beizhu.pop();
      }
    }
  },
  newgoods(infex2, temp) {
    let that = this;
    let j = that.data.left[infex2].list[temp];
    let gu = "left[" + infex2 + "].list[" + temp + "].jian";
    let nums = "left[" + infex2 + "].list[" + temp + "].foodNumber";
    that.data.cartgoods.push({
      foodname: j.name,
      price: j.price,
      foodnum: 1,
      beizhu: [],
      foodid: j._id,
      picurl: j.icon,
    })
    that.setData({
      total: that.data.total + j.price,

    })
  },
  falgRais() {
    let that = this;
    if (that.data.total > 0) {
      that.setData({
        bmask: true,
        mask: true,
        zindex: 777,
        cartgoods: that.data.cartgoods,
      })
    }
  },
  clear() {
    let that = this;
    that.setData({
      bmask: false,
      mask: false,
      mXuan: false,
    })
  },
  turn() {
    this.setData({
      mXuan: false,
      mask: false,
    })
  },
  caddNumber(e) {
    let that = this;
    let calculate = e.currentTarget.dataset.calcu;
    let temp = e.currentTarget.dataset.idx3;
    let cgu = "cartgoods[" + temp + "].foodnum";
    let j = that.data.cartgoods[temp];
    let isx = Number;
    let infex2 = Number;
    let stop = false;
    for (let i = 0; i < that.data.left.length; i++) {
      stop = false;
      for (let u = 0; u < that.data.left[i].list.length; u++) {
        if (that.data.left[i].list[u]._id === that.data.cartgoods[temp].foodid) {
          that.data.left[i].list[u].foodNumber = that.data.cartgoods[temp].foodnum;
          isx = u;
          //  console.log(u);
          u = that.data.left[i].list.length;
          infex2 = i;
          stop = true;
        }
        if (stop) break;
      }
      if (stop) break;
    }
    let nums = "left[" + infex2 + "].list[" + isx + "].foodNumber";
    let jian = "left[" + infex2 + "].list[" + isx + "].jian";
    if (that.data.cartgoods[temp].beizhu.length > 0) {
      /**  that.setData({
          [cgu]: that.data.cartgoods[temp].foodnum + calculate,
          total: that.data.total + j.price * calculate,
          [nums]: that.data.cartgoods[temp].foodnum + calculate
        }) */
      let iuo = "cartgoods[" + temp + "].beizhu"
      if (calculate === -1) {
        that.data.cartgoods[temp].beizhu.pop()
        that.setData({
          [iuo]: that.data.cartgoods[temp].beizhu
        })
      } else {
        that.data.cartgoods[temp].beizhu.push(that.data.cartgoods[temp].beizhu[that.data.cartgoods[temp].beizhu.length - 1])
        that.setData({
          [iuo]: that.data.cartgoods[temp].beizhu
        })
      }

    }
    if (calculate === -1 && j.foodnum === 1) {
      that.data.cartgoods.splice(temp, 1);
      that.setData({
        cartgoods: that.data.cartgoods,
        total: that.data.total + j.price * calculate,
        [jian]: false
      })
    } else {
      that.setData({
        [cgu]: that.data.cartgoods[temp].foodnum + calculate,
        total: that.data.total + j.price * calculate,
        [nums]: that.data.cartgoods[temp].foodnum + calculate
      })
    }
  },
  clearcart() {
    let that = this;
    //  let isx = Number;
    //  let infex2 = Number;
    let stop = false;
    if (that.data.cartgoods.length !== 0) {
      wx.showModal({
        title: '提示',
        content: '您确定要清空购物车吗',
        success(res) {
          if (res.confirm) {
            if (that.data.cartgoods) {
              for (let y = 0; y < that.data.cartgoods.length; y++) {
                for (let i = 0; i < that.data.left.length; i++) {
                  stop = false;
                  for (let u = 0; u < that.data.left[i].list.length; u++) {
                    if (that.data.left[i].list[u]._id === that.data.cartgoods[y].foodid) {
                      that.data.left[i].list[u].foodNumber = 0;
                      that.data.left[i].list[u].jian = false;
                      stop = true;
                      if (stop) break;
                    }
                  }
                  if (stop) break;
                }
                if (that.data.cartgoods[y].beizhu) {
                  //    console.log("有备注");此处备注清空
                }
              }
            }
            that.setData({
              cartgoods: [],
              left: that.data.left,
              total: 0,
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  forxuan(e) {
    let that = this;

    xindex = e.currentTarget.dataset.index2;
    xtemp = e.currentTarget.dataset.idx3;
    let dqItem = that.data.left[xindex].list[xtemp];
    //  console.log( xindex ,  xtemp);
    that.setData({
      mask: true,
      mXuan: true,
      zindex: 666,
      kexuan: that.data.left[xindex].list[xtemp],
      xNumber: 1,
    })
    // console.log(that.data.kexuan);
    xuanItem = that.data.kexuan.menuguige[0]
    beiCart = {
      foodname: dqItem.name,
      price: dqItem.price,
      foodnum: 1,
      beizhu: [],
      foodid: dqItem._id,
      picurl: dqItem.icon,
    }

  },
  xuanItems(e) {
    let that = this;
    //  console.log();
    let idu = e.target.dataset.idu;
    that.setData({
      xcurrentIndex: idu
    })
    xuanItem = that.data.kexuan.menuguige[that.data.xcurrentIndex];
    //  console.log(xuanItem);
  },
  xaddNumber(e) {
    let calculate = e.currentTarget.dataset.calcu;
    let that = this;
    addordelt = e.currentTarget.dataset.calcu;
    //  let xNum = "kexuan.foodNumber";
    if (calculate === 1) {
      that.setData({
        xNumber: that.data.xNumber + calculate,
      });

      beiCart.beizhu.push(xuanItem);
    } else if (calculate === -1) {
      if (calculate === -1 && that.data.xNumber === 1) {} else {
        that.setData({
          xNumber: that.data.xNumber + calculate,
        })
        beiCart.beizhu.pop();
      }
    }

  },
  newtocart(e) {
    let that = this;
    let bk = [];
    let isx = Number;
    let infex2 = Number;
    let stop = false;
    //  let nums={};
    that.data.cartgoods.forEach(item => {
      bk.push(item.foodid);
    })
    let bkindex = bk.indexOf(beiCart.foodid);
    beiCart.beizhu.push(xuanItem);
    if (bkindex === -1) {
      that.data.cartgoods.push(beiCart);
      //  console.log(bkindex,that.data.cartgoods)
      that.data.cartgoods[that.data.cartgoods.length - 1].foodnum = that.data.xNumber;
      //     let gu = "left[" + infex2 + "].list[" + temp + "].jian";
      for (let i = 0; i < that.data.left.length; i++) {
        stop = false;
        for (let u = 0; u < that.data.left[i].list.length; u++) {
          if (that.data.left[i].list[u]._id === beiCart.foodid) {
            that.data.left[i].list[u].foodNumber = beiCart.foodnum;
            isx = u;
            //  console.log(u);
            u = that.data.left[i].list.length;
            infex2 = i;
            stop = true;
          }
          if (stop) break;
        }
        if (stop) break;
      }
      let nums = "left[" + infex2 + "].list[" + isx + "].foodNumber";
      let jian = "left[" + infex2 + "].list[" + isx + "].jian";
      //   console.log(that.data.left[infex2].list[isx])
      that.setData({
        total: that.data.total + beiCart.price * beiCart.beizhu.length,
        mask: false,
        mXuan: false,
        [nums]: that.data.xNumber,
        [jian]: true,
      })
    } else {
      that.data.cartgoods[bkindex].foodnum = that.data.cartgoods[bkindex].foodnum + beiCart.beizhu.length;
      for (let i = 0; i < that.data.left.length; i++) {
        stop = false;
        for (let u = 0; u < that.data.left[i].list.length; u++) {
          if (that.data.left[i].list[u]._id === beiCart.foodid) {
            that.data.left[i].list[u].foodNumber = beiCart.foodnum;
            isx = u;
            //  console.log(u);
            u = that.data.left[i].list.length;
            infex2 = i;
            stop = true;
          }
          if (stop) break;
        }
        if (stop) break;
      }
      let nums = "left[" + infex2 + "].list[" + isx + "].foodNumber";
      beiCart.beizhu.forEach(item => {
        that.data.cartgoods[bkindex].beizhu.push(item);
      })
      that.setData({
        total: that.data.total + beiCart.price * beiCart.beizhu.length,
        mask: false,
        mXuan: false,
        [nums]: that.data.cartgoods[bkindex].foodnum,
      })
    }
    beiCart = {}
  },
  godetails(res) {
    wx.navigateTo({
      url: '../details/details?res=' + res.currentTarget.dataset.index,
      success: (result) => {

      },
      fail: (res) => {},

    })
  },
  sangT(bkindex) { //
    let that = this;
    let isx = Number;
    let infex2 = Number;
    let stop = false;
    console.log(stor,'stangT')
    for (let i = 0; i < that.data.left.length; i++) {
      stop = false;
      for (let u = 0; u < that.data.left[i].list.length; u++) {
        if (that.data.left[i].list[u]._id === stor.foodid) {
          that.data.left[i].list[u].foodNumber = stor.foodnum;
          isx = u;
          u = that.data.left[i].list.length;
          infex2 = i;
          stop = true;
        }
        if (stop) break;
      }
      if (stop) break;
    }
    let nums = "left[" + infex2 + "].list[" + isx + "].foodNumber";
    let jian = "left[" + infex2 + "].list[" + isx + "].jian";

    if (bkindex === -1) { //购物车里没有
      console.log(that.data.cartgoods);
      that.data.cartgoods.push(stor);
      that.setData({
        total: that.data.total + stor.price * stor.foodnum,
        [nums]: stor.foodnum,
        [jian]: true,
        cartgoods: that.data.cartgoods,
      })
    } else {
      if (stor.foodnum === 0) {
        let jianp = that.data.cartgoods[bkindex].price * that.data.cartgoods[bkindex].foodnum
        that.data.cartgoods.splice(bkindex, 1);
        that.setData({
          cartgoods: that.data.cartgoods,
          total: that.data.total - jianp,
          [jian]: false
        })
      } else {
        let bes = wx.getStorageSync('cart');
        that.data.cartgoods[bkindex].foodnum = stor.foodnum;
        that.setData({
          [nums]: stor.foodnum,
          total: that.data.total + (stor.foodnum - bes[bkindex].foodnum) * stor.price,
        })
        let iuo = "cartgoods[" + bkindex + "].beizhu"
        that.setData({
          [iuo]: stor.beizhu
        })
        /**       if(that.data.left[infex2].list[isx].menuguige){   
              if (stor.foodnum -  bes[bkindex].foodnum > 0) {
                stor.beizhu.forEach(item => {
                  that.data.cartgoods[bkindex].beizhu.push(item);
                })
              
              } else {
                let ads = stor.foodnum -bes[bkindex].foodnum > 0;
                let jio = Math.abs(ads);
                that.data.cartgoods[bkindex].beizhu.splice(that.data.cartgoods[bkindex].beizhu.length - 1, jio);
              }
            }*/
      }
    }

    //stor = {}
    wx.setStorageSync('cartNew', {})
  },
  jieSuan() {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo') || {};
    let u = Object.keys(userInfo);
    if (that.data.total !== 0) {
      if (u.length === 0) {
        wx.getUserProfile({
          desc: "获取你的昵称、头像、地区及性别",
          success: res => {
            wx.setStorageSync('userInfo', res.userInfo);
            that.zhunB();
          },
          fail: res => {
            wx.showToast({
              title: '您拒绝了授权',
              icon: 'none'
            })
            return;
          }
        })
      } else {
        that.zhunB();
      }
    }
  },
  zhunB() {
    let that = this;
    wx.setStorageSync('cart', this.data.cartgoods);
    wx.navigateTo({
      url: '../jieSuan/jiSuan?res=' + that.data.total,
    })
  }
})
/**
 *  

 */