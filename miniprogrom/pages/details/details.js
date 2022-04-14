const db = wx.cloud.database();
let xuanItem = String;
let beiCart = {};
let ksig = Number;
let idxc = Number;
Page({
  data: {
    details: {},
    xcurrentIndex: 0,
    num: 0,
    cartgoods: [],
    flagcart: true,
  },
  onLoad: function (options) {
    console.log(options);
    this.forDetails(options);

  },
  onHide: function () {
    this.kqT();
  },
  onUnload: function () {
    this.kqT();
  },
  onShow: function () {
    this.showT();
  },
  kqT() {
    let that = this;
    // console.log(!that.data.flagcart,ksig !== that.data.num)
    if (!that.data.flagcart && ksig !== that.data.num) {
      beiCart.foodnum = that.data.num;
      if (beiCart.beizhu) {
        //beiCart.beizhu.push(xuanItem);
      }
      beiCart.idxc = idxc;
      wx.setStorageSync('cartNew', beiCart);
      console.log(beiCart);
    }
  },
  forDetails(res) {
    let that = this;
    let list = wx.getStorageSync('left');
    let cart = wx.getStorageSync('cart')||[];
    let ik = [];
    let op = [];
    list.forEach(element => {
      ik.push(element._id);
    });
    let nji = ik.indexOf(res.res);
    that.data.details = list[nji];
    cart.forEach(element => {//购物车为空时可以不执行，试一下
      op.push(element.foodid);
    });
    let qaz = op.indexOf(res.res);
    idxc = qaz;
    //  console.log(cart)
    if (qaz > -1) {
      that.data.num = cart[qaz].foodnum;
      that.setData({
        flagcart: false
      })
      ksig = cart[qaz].foodnum
    }
    that.setData({
      details: that.data.details,
      num: that.data.num,
    })
    beiCart = {
      foodname: that.data.details.name,
      price: that.data.details.price,
      foodnum: 1,
      // beizhu:[],
      foodid: that.data.details._id,
      picurl: that.data.details.icon,
      // beizhu:cart[qaz].beizhu
    }
    if (that.data.details.menuguige) {
      xuanItem = that.data.details.menuguige[0];
      beiCart.beizhu = [];
      if (qaz > -1) {
        cart[qaz].beizhu.forEach(item => {
          beiCart.beizhu.push(item);
        })
      }
    }
  },
  //从这里开始
  xaddNumber(e) {
    let calculate = e.currentTarget.dataset.calcu;
    let that = this;
    if (calculate === 1) {
      that.setData({
        num: that.data.num + calculate,
      });
      if (that.data.details.menuguige) {
        //  console.log(beiCart);
        beiCart.beizhu.push(xuanItem);

      }
    } else if (calculate === -1) {
      if (calculate === -1 && that.data.num === 0) {} else {
        that.setData({
          num: that.data.num + calculate,
        })
        if (that.data.details.menuguige) {
          beiCart.beizhu.pop();
        }

      }
    }
    beiCart.foodnum = that.data.num;
  },

  newtocart(e) {
    let that = this;
    if (that.data.num > 0) {
      beiCart.idxc = idxc;
      console.log(beiCart);
      wx.setStorageSync('cartNew', beiCart);
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '请添加菜品数量哦',
      })
    }
  },
  xuanItems(e) {
    let that = this;
    let idu = e.target.dataset.idx;
    // console.log(e);
    that.setData({
      xcurrentIndex: idu
    })
    xuanItem = that.data.details.menuguige[that.data.xcurrentIndex];
  },
  showT() {
    let that = this;
    if (that.data.num === 0) {
      wx.showToast({
        icon: 'none',
        title: '添加菜品数量后点击加入购物车哦！',
        duration: 2000
      })
    }
  }
})