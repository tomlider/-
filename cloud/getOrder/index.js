// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: "dayiwan-wne73"
})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
return await cloud.database().collection('orderN').where({
  _openid: wxContext.OPENID,
}).get({
  
})
}