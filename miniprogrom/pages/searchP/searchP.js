//let menJs=require('../../utils/modul');
//总价格暂未计入
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
//
let cartgoods = [];
let foodNumA = [];
let seart = [];
Page({
  data: {
    total: 0,
    searchArr: [],
    currentIndex: 0,
    xcurrentIndex: 0,
    scroll: {},
    guigeFlag: true,
    forjian: false,
    bmask: false,
    animationData: {},
    mXuan: false,
    mask: false,
    kexuan: {},
    xNumber: 1,
    history:[],
  },

  onLoad: function (options) {
    this.Bao(options);

  },
  onShow: function (options) {
    let that = this;
    stor = wx.getStorageSync('cartNew') || {};
    if ('foodnum' in stor && !!stor) {
      that.sangT(stor.idxc);
    }

  },
  onHide: function () {

  },
  onUnload: function () {
    let that=this;
   // console.log(cartgoods);
 //   console.log(searchArr,foodNumA);
 that.tuiT();
  },
  tuiT(){
    let that= this;
    let searchArr=that.data.searchArr;
    for (let y = 0; y < searchArr.length; y++) {
      for (let u in foodNumA) {
        if (foodNumA[u]!== searchArr[y].foodNumber) {
          app.globalData.upDaF = 2;
      wx.setStorageSync('cart', cartgoods);
          return
        }
      }
    }

  },
  Bao(options) {
    let searchArr = wx.getStorageSync('searchArr');
let searchHis=wx.getStorageSync('searchHisor');
    this.setData({
      inty: options.res,
      history :searchHis,
    })
    this.forFood(searchArr);
    seart = options.res;
    foodNumA=[]
    for(let u in searchArr){
      foodNumA.push(searchArr[u].foodNumber);
    }
  },
  forFood(res) {
    let that = this;
    res.forEach((item, index) => {
      item.jian = false;
      item.foodNumber = 0;
    });
    that.upDatacart(res);
    that.getHeight();
  },
  getRight(e) {
    this.setData({
      Tab: e.currentTarget.dataset.idx,
      currentIndex: e.currentTarget.dataset.idx
    })
  },

  upDatacart(res) {
    let that = this;
    cartgoods = wx.getStorageSync('cart');
    if (cartgoods) {
      let ui = []
      for (let y = 0; y < cartgoods.length; y++) {
        for (let u = 0; u < res.length; u++) {
          if (res[u]._id === cartgoods[y].foodid) {
            res[u].foodNumber = cartgoods[y].foodnum;
            res[u].jian = true;
          }
        }
        //    that.data.total += that.data.cartgoods[y].price * that.data.cartgoods[y].foodnum;
        /**    if (that.data.cartgoods[y].beizhu) {
           }*/
      }

    }
    that.setData({
      searchArr: res,
    })

  },
  getHeight() {
    // let that = this;
    //  let heightrpx = Number;
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

  addNumber(e) {
    let calculate = e.currentTarget.dataset.calcu;
    let that = this;
    let temp = e.currentTarget.dataset.idx3;
    let j = that.data.searchArr[temp];
    let gu = "searchArr[" + temp + "].jian";
    let nums = "searchArr[" + temp + "].foodNumber";
    let bk = [];
    // console.log(calculate,temp,j,that.data.searchArr);
    cartgoods.forEach(item => {
      bk.push(item.foodid);
    })
    let bkindex = bk.indexOf(j._id);
    if (bkindex === -1) {
      that.setData({
        [gu]: true,
        [nums]: 1,
      })
      that.newgoods(temp);
    } else {
      cartgoods[bkindex].foodnum += calculate;
      if (cartgoods[bkindex].foodnum > 0) {
        //   cartgoods[bkindex].price*=cartgoods[bkindex].foodnum;

        that.setData({
          [nums]: cartgoods[bkindex].foodnum,
          //   total: that.data.total + j.price * calculate,
          //
        })
      } else {
        that.setData({
          [gu]: false,
          //    total: that.data.total + j.price * calculate
        })
        cartgoods.splice(bkindex, 1)
      }
      if (calculate < 0 && that.data.searchArr[temp].beizhu > 0) {
        //   console.log('zdl')
        cartgoods[bkindex].beizhu.pop();
      }
    }
  },
  newgoods(temp) {
    let that = this;
    let j = that.data.searchArr[temp];
    //   let gu = "searchArr[" + temp + "].jian";
    //   let nums = "searchArr[" + temp + "].foodNumber";
    cartgoods.push({
      foodname: j.name,
      price: j.price,
      foodnum: 1,
      beizhu: [],
      foodid: j._id,
      picurl: j.icon,
    })
    /** that.setData({
       total: that.data.total + j.price,

     }) */
  },
  turn() {
    this.setData({
      mXuan: false,
      mask: false,
    })
  },
  forxuan(e) {
    let that = this;
    xtemp = e.currentTarget.dataset.idx3;
    let dqItem = that.data.searchArr[xtemp];
    that.setData({
      mask: true,
      mXuan: true,
      zindex: 666,
      kexuan: that.data.searchArr[xtemp],
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
    cartgoods.forEach(item => {
      bk.push(item.foodid);
    })
    let bkindex = bk.indexOf(beiCart.foodid);
    beiCart.beizhu.push(xuanItem);
    if (bkindex === -1) {
      cartgoods.push(beiCart);
      //  console.log(bkindex,that.data.cartgoods)
      cartgoods[cartgoods.length - 1].foodnum = that.data.xNumber;
      // let gu = "searchArr[" + temp + "].jian";
      for (let u = 0; u < that.data.searchArr.length; u++) {
        if (that.data.searchArr[u]._id === beiCart.foodid) {
          that.data.searchArr[u].foodNumber = beiCart.foodnum;
          isx = u;
          //  console.log(u);
          //      u = that.data.left[i].list.length;
        }
        if (stop) break;
      }
      let nums = "searchArr[" + isx + "].foodNumber";
      let jian = "searchArr[" + isx + "].jian";
      //   console.log(that.data.left[infex2].list[isx])
      that.setData({
        //   total: that.data.total + beiCart.price * beiCart.beizhu.length,
        mask: false,
        mXuan: false,
        [nums]: that.data.xNumber,
        [jian]: true,
      })
    } else {
      cartgoods[bkindex].foodnum = cartgoods[bkindex].foodnum + beiCart.beizhu.length
      beiCart.beizhu.forEach(item => {
        cartgoods[bkindex].beizhu.push(item);
      })
      that.setData({
        //    total: that.data.total + beiCart.price * beiCart.beizhu.length,
        mask: false,
        mXuan: false,
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
  sangT(bkindex) {
    let that = this;
    // let bk = [];
    let isx = Number;
    //   let infex2 = Number;
    //    let stop = false;
    for (let u = 0; u < that.data.searchArr.length; u++) {
      if (that.data.searchArr[u]._id === stor.foodid) {
        that.data.searchArr[u].foodNumber = stor.foodnum;
        isx = u;
        //  u = that.data.left[i].list.length;
        //   infex2 = i;
      }
    }
    let nums = "searchArr[" + isx + "].foodNumber";
    let jian = "searchArr[" + isx + "].jian";
    if (bkindex === -1) {
      cartgoods.push(stor);
      cartgoods[cartgoods.length - 1].foodnum = stor.foodnum;
      that.setData({
        //    total: that.data.total + stor.price * stor.foodnum,
        [nums]: stor.foodnum,
        [jian]: true,

      })
    } else {
      if (stor.foodnum === 0) {
        let jianp = cartgoods[bkindex].price * cartgoods[bkindex].foodnum
        cartgoods.splice(bkindex, 1);

        that.setData({
          //   cartgoods:cartgoods,
          //  total: that.data.total - jianp,
          [jian]: false
        })
      } else {
        let bes = wx.getStorageSync('cart');
        cartgoods[bkindex].foodnum = stor.foodnum;
        that.setData({
          [nums]: stor.foodnum,
          //  total: that.data.total + (stor.foodnum - bes[bkindex].foodnum) * stor.price,
        })
        let iuo = "cartgoods[" + bkindex + "].beizhu"
        that.setData({
          [iuo]: stor.beizhu
        });
      };
    }
    stor = {}
    wx.setStorageSync('cartNew', {})
  },
  getTurn(e) {
let that=this;
that.tuiT();
that.Bao(e.detail);

  },
  sangT(bkindex) {
    let that = this;
    let isx = Number;
    let infex2 = Number;
    let stop = false;
    for (let u = 0; u < that.data.searchArr.length; u++) {
      if (that.data.searchArr[u]._id === stor.foodid) {
        that.data.searchArr[u].foodNumber = stor.foodnum;
        isx = u;
        //  u = that.data.left[i].list.length;
        //  infex2 = i;
        stop = true;
      }
      if (stop) break;
    }
    let nums = "searchArr[" + isx + "].foodNumber";
    let jian = "searchArr[" + isx + "].jian";
    if (bkindex === -1) {
      cartgoods.push(stor);
      cartgoods[cartgoods.length - 1].foodnum = stor.foodnum;
      that.setData({
        //    total: that.data.total + stor.price * stor.foodnum,
        [nums]: stor.foodnum,
        [jian]: true,

      })
    } else {
      if (stor.foodnum === 0) {
        let jianp = cartgoods[bkindex].price * cartgoods[bkindex].foodnum
        cartgoods.splice(bkindex, 1);
        that.setData({
          //   cartgoods: that.data.cartgoods,
          //   total: that.data.total - jianp,
          [jian]: false
        })
      } else {
        let bes = wx.getStorageSync('cart');
        cartgoods[bkindex].foodnum = stor.foodnum;
        that.setData({
          [nums]: stor.foodnum,
        })
        let iuo = "cartgoods[" + bkindex + "].beizhu"
        that.setData({
          [iuo]: stor.beizhu
        })
      }
    }
    stor = {};
    wx.setStorageSync('cartNew', {})
  },
  delet(){
    this.setData({
      history :[],
    })
    wx.setStorageSync('searchHisor',[]);
    this.selectComponent("#search",).upDataS();
  },
  fuZ(e){
 this.selectComponent("#search",). forSearch(e.target.dataset.index);
  }
})
/**
 *  

 */