let openid=wx.getStorageInfoSync('openid');
if(openid){

}else{
  wx.cloud.callFunction({
    name: 'openid',
  }).then(res => { 
    let uio=res.result.data;
wx.setStorageSync('openid',uio)
   })
}