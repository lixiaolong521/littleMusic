// pages/songDetail/songDetail.js
import request from '../untils/request'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, // 音乐是否播放
    song:{},//歌曲详情
    musicId:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {musicId} = options;
    this.setData({
      musicId
    });
    // 获取音乐详情
    this.getMusicInfo(musicId);
    // 判断当前页面音乐是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      this.setData({
        isPlay:true
      })
    }
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.onPlay(()=>{
      // 修改音乐是否播放的状态
      this.changePlayState(true)
      appInstance.globalData.musicId = musicId
    });
    this.backgroundAudioManager.onPause(()=>{
      // 修改音乐是否播放的状态
      this.changePlayState(false)
    });
    this.backgroundAudioManager.onStop(()=>{
      // 修改音乐是否播放的状态
      this.changePlayState(false)
    })
  },
async getMusicInfo(musicId){
  let songData = await request('/song/detail',{ids:musicId});
  // console.log(songData)
  this.setData({
    song:songData.songs
  })
  
  let chn = 'tns' in songData.songs[0]
  if(!chn){
    this.setData({
      name:this.data.song[0].name
    })
    wx.setNavigationBarTitle({
      title: this.data.song[0].name
    })
    return
  }
  this.setData({
    name:this.data.song[0].name + '('+ this.data.song[0].tns[0]+')'
  })
  wx.setNavigationBarTitle({
    title: this.data.song[0].name + '('+ this.data.song[0].tns[0]+')'
  })
},
  // 修改播放状态的功能函数
  changePlayState(isPlay){
    // 修改音乐是否的状态
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay;
    // 修改全局音乐播放的状态
    // appInstance.globalData.isMusicPlay = isPlay;
  },
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    // // 修改是否播放的状态
    // this.setData({
    //   isPlay
    // })
    this.musicControl(isPlay,this.data.musicId);
    // let {musicId, musicLink} = this.data;
    // this.musicControl(isPlay, musicId, musicLink);
  },
  // 控制音乐播放/暂停的功能函数
  async musicControl(isPlay,musicId){
    if(isPlay){
      let musicLinkData = await request('/song/url',{id:musicId});
      // console.log(musicLinkData)
      let musicLink = musicLinkData.data[0].url;
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.name;
    }else{
      this.backgroundAudioManager.pause();
    }
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