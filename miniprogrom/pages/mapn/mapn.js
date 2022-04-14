/** https://blog.csdn.net/qq_28471389/article/details/110469446?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163454053816780366575354%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=163454053816780366575354&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-110469446.pc_search_result_hbase_insert&utm_term=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%9C%B0%E5%9B%BE%E6%B5%8B%E8%B7%9D%E7%A6%BB&spm=1018.2226.3001.4187
 * 获取位置取得定位权限，不定位不开启，用距离算配送费
 */
Page({
  data: {
    markers: [{
      id: 1,
      latitude: 38.873068,
      longitude: 121.542058,
      name: '大连尚易餐饮',
      callout: {
        // color:'#ffffff',
        content: '大连尚易餐饮',
        fontSize: 16,
        borderRadius: 5,
        bgColor: 'white',
        padding: 5,
        textAlign: 'center',
        display: "ALWAYS"
      }
    }]
  },
  onLoad: function (e) {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //  that.distant(res.latitude, res.longitude)
      }
    })
    /**  if(e.res==="1"){
      that.fanL();
    }
 */
  },
})