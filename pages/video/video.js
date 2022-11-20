// pages/video/video.js
import request from '../untils/request'
import showToast from '../untils/showToast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:'',
    navId:'',
    videoList:[],
    videoId:'',
    videoUpdateTime: [],// 记录video播放的时长
    isTriggered:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupListData();
  },
//获取导航数据
async getVideoGroupListData(){
  let videoGroupListData = await request('/video/group/list');
  // console.log(videoGroupListData)
  this.setData({
    videoGroupList:videoGroupListData.data.slice(0,14),
    navId:videoGroupListData.data[0].id
  })
  // 获取视频列表数据
  this.getVideoList(this.data.navId)
},
async getVideoList(navId){
  // console.log('1111')
  if(!navId){
    return;
  }
  // console.log(navId);
  let videoListData = await request('/related/allvideo',{id:navId});
  let i=0;
  // console.log(videoListData.data[i].vid)
  // let videoUrlBackValue=[]//获取视频封面
  let videoListDataMsg=[]
  while(i<5){
    // 获取视频封面及标题
    let videoUrlBack = await request('/video/detail',{id:videoListData.data[i].vid});
    // 获取视频播放地址
    let videoUrl = await request('/video/url',{id:videoListData.data[i].vid});
    let obj={...videoUrlBack.data,...videoUrl.urls[0]};
    // console.log(obj)//输出合并的对象
    videoListDataMsg.push(obj);
    i++
  }
  let flag = this.data.videoList.toString() === videoListDataMsg.toString()
  if(flag){
    this.setData({
      isTriggered:false
    })
    wx.hideLoading();
    showToast('暂无推荐内容');
    return;
  }
  wx.hideLoading();
  this.setData({
    videoList:videoListDataMsg,
    isTriggered:false
  })
},
changeNav(event){
  let navId = event.currentTarget.id;//通过id向event传参的时候如果传的是number会自动转换成string
  // let navId = event.currentTarget.dataset.id

  this.setData({
    navId:navId>>>0,
    videoList:''
  })
  wx.showLoading({
    title: '正在加载',
    mask:true
  })
  //动态获取当前导航对应的视频数据
  this.getVideoList(this.data.navId)
},
// 点击播放/继续播放的回调
handlePlay(event){
  // let vid = event.currentTarget.id;
  // this.vid !== vid && this.videoContext && this.videoContext.stop();
  // this.vid = vid;
  // this.setData({
  //   videoId:vid
  // })
  // 创建控制video标签的实例对象
  // this.videoContext = wx.createVideoContext(vid);
  // this.videoContext.play();
  let vid = event.currentTarget.id;
    this.setData({
      videoId: vid
    })
  // 创建控制video标签的实例对象
  this.videoContext = wx.createVideoContext(vid);
  // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
  let {videoUpdateTime} = this.data;
  let videoItem = videoUpdateTime.find(item => item.vid === vid);
  if(videoItem){
    this.videoContext.seek(videoItem.currentTime);
  }
},
handleTimeUpdate(event){
  let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    /*
    * 思路： 判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    *
    * */
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){ // 之前有
      videoItem.currentTime = event.detail.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })
},
handleEnded(event){
  // 移除记录播放时长数组中当前视频的对象
  let {videoUpdateTime} = this.data;
  videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
  this.setData({
    videoUpdateTime
  })
},
// 下拉刷新
handleRefresher(){
  this.getVideoList(this.data.navId)
},
// 触碰底部加载视频
handleToLower(){
  let newVideoList = this.data.videoList;
  let videoList = this.data.videoList;
  videoList.push(...newVideoList);
 
  this.setData({
    videoList
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
    showToast('不要刷新了，没有了😂')
    // console.log('222')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage({from,target}) {
    console.log(from);
    if(from === 'button'){
      return{
        title:target.dataset.title,
        path:'/pages/video/video',
        imageUrl:target.dataset.shareurl
      }
    }else{
      return{
        title:target.dataset.title,
        path:'/pages/video/video',
        imageUrl:target.dataset.shareurl
      }
    }
  }
})