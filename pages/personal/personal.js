import request from '../untils/request'

// pages/personal/personal.js
let startY;
let moveY;
let moveDistance;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:'translateY(0)',
    coveTransition:'',
    userInfo:'',
    recentPlayList:''
  },
  toLogin(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
      // console.log(userInfo)
      this.getUserRecentPlayList(this.data.userInfo.userId)
    };
  },
  async getUserRecentPlayList(userid){
    let recentPlayListData = await request('/playlist/video/recent',{uid:userid,type:1});
    console.log(recentPlayListData);
    if(recentPlayListData.code === 200){
      let index = 0;
      let recentPlayList = recentPlayListData.data.videos.splice(0,10).map(item =>{
        item.id = index++;
        return item;
      })
      this.setData({
        recentPlayList
      })
    }else if(recentPlayListData.code === -2){
      wx.showToast({
        title: '无权限访问',
      })
    }


  }
  ,
  handleTouchStart(event){
    this.setData({
      coveTransition:''
    })
    startY = event.touches[0].clientY;
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY;
    if(moveDistance<=0){
      return;
    }
    if(moveDistance>80){
      moveDistance=80;
    }
    // console.log(moveDistance)
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform:`translateY(0rpx)`,
      coveTransition:`transform .5s linear`
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