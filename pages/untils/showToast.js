export default (title='格式错误！',type='none',isSuccess=false,url = '/pages/index/index')=>{
  // 是否调用成功的回调函数
  if(isSuccess){
    return wx.showToast({
      title: title,
      icon:type,
      success:()=>{
        wx.reLaunch({
          url: url,
        })
      }
    })
  }

}
