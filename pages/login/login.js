// pages/login/login.js
import request from '../untils/request';
import showToast from '../untils/showToast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
  },
  handleInput(event){
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]:event.detail.value
    })
  },
  // 发送的回调
 async sendCaptch(){
  let {phone} = this.data;
  if(!phone){
    //封装wx.showToast方法在showToast.js中
    showToast('手机号不能为空');
    return;
  }
  // 定义正则表达式
  let phoneReg  = /^1(3|4|5|6|7|8|9)\d{9}$/
  if(!phoneReg.test(phone)){
    showToast('手机号格式有误','error')
    return;
  }
  //后端验证
  //发送验证码
    let result = await request('/captcha/sent',{phone});
    // if(result.code === 200){
    //   console.log(result)
    //   if(!this.data.captcha){
    //     showToast('验证码不能为空','error')
    //     return
    //   }
    //   this.login();
    // }else if(result.code == 400){
    //   showToast('手机号错误')
    // }else if(result.code === 502){
    //   showToast('密码错误')
    // }else{
    //   showToast('登录失败，请重新登录')
    // }
  },
  // 登录的回调
 async login(){
    //收集表单数据
    if(!this.data.password){
          showToast('密码不能为空','error')
          return
    }
    let {phone,password} = this.data;
    let result = await request('/login/cellphone',{phone,password,isLogin:true});
    if(result.code === 200){
      wx.setStorageSync('userInfo',JSON.stringify(result.profile));
    }else if(result.code === 503){
      showToast('验证码错误','error');
      return;
    }
    showToast('登录成功','success');
       // 跳转至个人中心personal页面
    wx.reLaunch({
      url: '/pages/personal/personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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