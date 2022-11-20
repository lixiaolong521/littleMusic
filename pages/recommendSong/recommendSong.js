// pages/recommendSong/recommendSong.js
// type 代表的是要获取日期还是时间；separate代表的是按什么符号分割
import dateTime from '../untils/dataTime';
import request from '../untils/request';
import showToast from '../untils/showToast'
// 封装的cookie
import encodeURI from '../untils/encodeURI'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTime:'',
    resource:[],
    cookie:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
      showToast('请先登录！','',true,'/pages/login/login');
    }
    this.setData({
      // type 代表的是要获取日期还是时间；separate代表的是按什么符号分割
      dateTime:dateTime('date','-')
    })
    this.getSource();
  },
  async getSource(){
    let commonSourece = await request('/recommend/songs',{cookie:encodeURI()})
    // console.log(commonSourece)
    this.setData({
      resource:commonSourece.data.dailySongs
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  toSongDetail(event){
    let song = event.currentTarget.dataset.id;
    // console.log(song)
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?musicId='+song,
    })
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