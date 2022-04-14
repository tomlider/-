// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "dayiwan-wne73"
})
const db=cloud.database();
const _ = db.command;
exports.main = async (event, context) => {

  if(event.action== 'search'&&event.searchKey){
    return await db.collection('food'). where({
      name: db.RegExp({
        regexp: event.searchKey,
        options: 'i'
      }),
    }).get({});
  }else if(event.action== 'tuijian'){
    return await db.collection('food'). where({
    status:"上推荐"
    }).orderBy('tuijian','desc').get({});
  }
  else if(event.action== 'all'){
    return await db.collection('food').where(_.or([{
        status:"上推荐"
      },
      {
        status:"上架"
      }
    ])
    ).get({})

  }
}
