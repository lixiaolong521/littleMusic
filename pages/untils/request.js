import config from './config'
export default (url,data={},method='get')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookis')? wx.getStorageSync('cookis').find(item=>{item.indexOf('MUSIC_U')!=-1}):''
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorage({
            key:'cookie',
            data:res.cookies
          })
        }
          resolve(res.data);

        
      },
      fail:(error=>{
        console.log(error);
        reject(error);
      })
    })
  })
}