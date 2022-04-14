let cj = Number;
let nameI = "";
let aj = "";
let address = "";
let idx = -1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiTai: "",
    falgQ: false,
    vA: "",
    vC: Number,
    vN: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.quStor(e);
  },
  quStor(e) {
    let that = this;
    console.log(e);
    let aR = Object.keys(e);
    if (aR.length > 0) {
      idx = parseInt(e.idx);
      let arr = wx.getStorageSync('address');
      that.setData({
        falgQ: true,
        qiTai: arr[idx].address,
        vA: arr[idx].aj,
        vC: arr[idx].cj,
        vN: arr[idx].nameI,
      });
      address = arr[idx].address;
      aj = arr[idx].aj;
      cj = arr[idx].cj;
      nameI = arr[idx].nameI;
    }
  },
  callinput(e) {
    console.log(e.detail.value, 12);
    cj = e.detail.value;
    if (e.detail.value.length > 11) {
      wx.showModal({
        title: '提示',
        content: '请输入11位电话号码',
      })
    }
  },
  nameInp(e) {
    nameI = e.detail.value;
  },
  addinput() {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
    let ditant=that.distant(res.latitude,res.longitude);
    console.log(ditant);
if(parseInt(ditant)<=5){
  address = res.address;
  that.setData({
    falgQ: true,
    qiTai: address,
  })
}else{
  wx.showModal({
      title: '提示',
      content: '超过5千米本店不予配送',
  })
}
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  addDetInp(e) {
    aj = e.detail.value;
  },
  toaD() {
    if (idx == -1 && cj && nameI && aj && address) {
      let addressD = {
        cj,
        nameI,
        aj,
        address
      }
      let arr = wx.getStorageSync('address') || [];
      arr.push(addressD);
      wx.setStorageSync('address', arr);
      wx.navigateBack({
        delta: -1,
      })
    } else if (idx !== -1 && cj && nameI && aj && address) {
      let arr = wx.getStorageSync('address');
      arr[idx].address = address;
      arr[idx].aj = aj;
      arr[idx].cj = cj;
      arr[idx].nameI = nameI;
      console.log(arr);
      wx.setStorageSync('address', arr);
      wx.navigateBack({
        delta: -1,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填入完整的信息！',
      })
    }
  },
  delete() {
    console.log(idx);
    let arr = wx.getStorageSync('address');
    arr.splice(idx, 1);
    wx.setStorageSync('address', arr);
    wx.showModal({
      title: '提示',
      content: '确认删除此地址！',
      success(res){
        wx.navigateBack({
          delta: -1,
        })
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
    s = Math.round(s * 10000) / 10000;
    return s;
  },

})