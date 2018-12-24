const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: app,
    background1: 'https://ss.readit.top/images/background1.jpg',
    background2: 'https://ss.readit.top/images/background2.jpg',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      courtname: wx.getStorageSync('courtname')
    });
    
  },
  toList () {
    wx.navigateTo({
      url: `../list/list`
    });
  },
  toCharge () {
    wx.navigateTo({
      url: `../charge/charge`
    });
  },
  toOrders () {
    wx.navigateTo({
      url: `../orders/orders`
    });
  },
  toQuery() {
    wx.navigateTo({
      url: `../query/query`
    });
  },
  toDemo() {
    wx.navigateTo({
      url: `../demo/demo`
    });
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