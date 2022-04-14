// app.js
App({
      globalData: {
            //leftGoods:[],
            pagefalge: Number, //Number
            currentIdx: -1,
      },
      onLaunch: function () {
            wx.cloud.init({
                  env: 'dayiwan-wne73',
                  traceUser: true,
            })
      },
      getOpenid(e) {
            let that = this
          let   userOpenid= wx.getStorageSync('openid')
            if (!userOpenid) {
              let p = new Promise(resolve => {
                wx.cloud.callFunction({
                  name: 'openid',
                  success(e) {
                    userOpenid = e.result.openid
                    resolve(userOpenid)
                  }
                })
              }).then((res) => {
                wx.setStorageSync('openid',res);
              })
            }
            return userOpenid
          },

      getTime() {
            let date = new Date(); //"12/31/2011 0:00:00"估计有问题要试
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();


            let currentDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            if (month >= 1 && month <= 9) {
                  month = "0" + month;
            }
            if (day >= 0 && day <= 9) {
                  day = "0" + day;
            }
            if (hours >= 0 && hours <= 9) {
                  hours = "0" + hours;
            }
            if (minutes >= 0 && minutes <= 9) {
                  minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                  seconds = "0" + seconds;
            }
            let currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            return currentFormatDate

      }
})