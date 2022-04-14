let details="";
Page({

  data: {
comF:0,
  },
  onLoad:function(){
wx.setStorageSync('beiz'," data");
  },
  forde(e){
    let that=this;
details=e.detail.value;
if(e.detail.value.length>0){
that.setData({
  comF:1,
})
}else{
  that.setData({
    comF:0,
  })
}
  },
  complet(){
    if(details){
      wx.setStorageSync('beiz',details);
      wx.navigateBack({
        delta: 1
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '您的输入为空',
      })
    }
  }
})