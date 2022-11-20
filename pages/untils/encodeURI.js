export default ()=>{
  let i =  wx.getStorageSync('cookie').find(item=>{
    return  item.indexOf('MUSIC_U')!=-1
  })
  return encodeURIComponent(i);//对cookie编码
}