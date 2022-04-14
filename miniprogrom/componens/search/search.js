let indexText = '';
let idNum = [];
let namen = [];
let cart = [];
let app = getApp();
let searchArr = [];
let searchHis = [];
Component({
  lifetimes: {
    attached: function () {

      cart = wx.getStorageSync('cart');
      searchHis = wx.getStorageSync('searchHisor') || [];
      //console.log( searchHis );
    },
    detached: function () {
      indexText = '';
    },
  },
  properties: {
    aaa: {
      type: String,
      value: ""
    }
  },
  data: {
    value: '',
  },

  methods: {
    forRes(res) {
      indexText = res.detail.value;
    },
    forSearch(e) {
      let that = this;
      let pagePa = getCurrentPages();
      if (typeof (e) == 'string') {
        indexText = e;
      }
      searchArr = [];
      if (indexText) {
        wx.showLoading({
          title: '正在加载',
        })
        wx.cloud.callFunction({
            name: 'forfoodlist',
            data: {
              action: "search",
              searchKey: indexText
            }
          }).then(res => {
            let uio = res.result.data;
            wx.setStorageSync('searchArr', uio);
            if (searchHis.length > 8) {
              searchHis.splice(0, 1);
            }
            searchHis.push(indexText);
            wx.setStorageSync('searchHisor', searchHis);
            wx.hideLoading({
              success: (res) => {},
            })

            if (pagePa[pagePa.length - 1].route === "pages/mune/mune") {
              wx.navigateTo({
                url: '/pages/searchP/searchP?res=' + indexText,
              });
              that.setData({
                aaa: ''
              });
            } else {
              that.triggerEvent("turn", {
                indexText
              });
              //        pagePa[1].route.    
              //console.log(pagePa);
            };
          })
          .catch(e => {
            wx.showToast({
              title: '请保持数据连接',
              icon: "error"
            })
          })
      } else {
        wx.showModal({
          title: '提示',
          content: '搜索关键词为空哦！',
        })
      }
    },
    upDataS() {
      searchHis = [];
    }
  }
})