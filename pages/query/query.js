const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBody: false,
    phone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*
    wx.showToast({
      title: '加载数据中',
      icon: 'loading',
      duration: 20000,
      mask: true,
    })
    this.getData(); 
    */
  },
  inputPhone (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getData () {
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        image: '../../images/fail.png',
        duration: 1500,
      })
      return;
    }
    wx.showToast({
      title: '查询中',
      icon: 'loading',
      duration: 20000,
      mask: true,
    })
    wx.request({
      // url: `${app.data.baseUrl}list/${wx.getStorageSync('openid')}/${+new Date()}`,
      url: `${app.data.baseUrl}submit/search/${this.data.phone}/${+new Date()}`,
      success: res=> {
        if (res.data.length) {
          res.data.forEach(item => {
            item.createtime = item.createtime.split('T')[0]
          })
          this.setData({
            data: res.data,
            // showBody: true
          });
          wx.hideToast();
        } else {
          wx.hideToast();
          wx.showToast({
            title: '没有案件数据',
            image: '../../images/fail.png',
            duration: 2000,
            success: ()=> {
              setTimeout(()=> {
                wx.navigateBack();
              }, 2000);
            }
          })
        }

        
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})