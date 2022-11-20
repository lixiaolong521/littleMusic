// pages/index/index.js
import request from '../untils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    bannerData:[],
    personalized:[],
    toListItem:[]
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true
        })
        wx.vibrateShort({
          type: 'light',
          success:()=>{
            console.log('成功震动');
          },
          fail:(errMsg)=>{
            console.log(errMsg);
          }
        });
        wx.showToast({
          title: '您同意了授权',
          icon:'success'
        })
      },
      fail:(res)=>{
        console.log(res);
        wx.showToast({
          title: '您拒绝了授权',
          icon:'error'
        })
      }
    })
  },
  // 跳转到logs页面
toLogs(){
  wx.navigateTo({
    url: '/pages/logs/logs',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 轮播图
    let result =await request('/banner',{type:2});
    // console.log(result);
    this.setData({
      bannerData:result.banners
    })
    //推荐歌单
    result = await request('/personalized',{limit:5});
    // console.log('推荐歌单：',result)
    this.setData({
      personalized:result.result
    })
    //排行榜
    let index = 0;
    let toListArr = []
    while(index<5){
      let result =  await request('/toplist');
      // console.log('排行榜',result)
      let id = result.list[index].id;
      // console.log('index',id)
        let resultContent = await request('/playlist/detail',{id})
        // console.log("resultContent",resultContent)
      let toListObj = {name:resultContent.playlist.name,tracks:resultContent.playlist.tracks.slice(0,3)}
      ++index;
      toListArr.push(toListObj);
      this.setData({
        toListItem:toListArr
      })
    }
    // console.log('排行榜',toListArr)


  },
  // 跳转至recommendSong页面的回调
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})