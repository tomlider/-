// componens/cartcom/cartcom.js
Component({

  properties: {


  },
  data: {
    cartgoods:[],
    bmask: false,
    animationData: {},
    mXuan: false,
    mask: false,
    total: 0,
  },
  lifetimes:{
    
    attached: function() {
     
      let that=this;
    let totel=0;
    this.data.cartgoods = wx.getStorageSync('cart');
    this.data.total= this.data.cartgoods.forEach(item=>{
      totel+=item.foodnum*item.price;
  //    console.log(totel);
    });
   // console.log('q',that.data.total);
    that.setData({
      total:totel
    })
    },
    detached: function() {
  wx.setStorageSync('cart',this.data.cartgoods);
    },
  },
  methods:{
    forUpdata(e){
  //以下复制的
  let beiCart=e;
        let that = this;
        let bk = [];
        that.data.cartgoods.forEach(item => {
          bk.push(item.foodid);
        })
        let bkindex = bk.indexOf(beiCart.foodid);
        that.setData({
          total: that.data.total + beiCart.price * beiCart.beizhu.length,
        })
        if (bkindex === -1) {
          that.data.cartgoods.push(beiCart);
          //  console.log(bkindex,that.data.cartgoods)
          that.data.cartgoods[that.data.cartgoods.length - 1].foodnum = beiCart.  foodnum;
        } else {
          that.data.cartgoods[bkindex].foodnum = that.data.cartgoods[bkindex].foodnum + beiCart.beizhu.length
          beiCart.beizhu.forEach(item => {
            that.data.cartgoods[bkindex].beizhu.push(item);
          })

        }
 
    },
    falgRais() {
   //   console.log('2')
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
      if (that.data.cartgoods[temp].beizhu.length > 0) {
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
        
        })
      } else {
        that.setData({
          [cgu]: that.data.cartgoods[temp].foodnum + calculate,
          total: that.data.total + j.price * calculate,  
        })
      }
    },
    clearcart() {
      let that = this;
      if (that.data.cartgoods.length !== 0) {
        wx.showModal({
          title: '提示',
          content: '您确定要清空购物车吗',
          success(res) {
            if (res.confirm) {
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
  },
})
