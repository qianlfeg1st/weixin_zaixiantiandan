// pages/model20/model20.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E4%BA%BA%E8%BA%AB%E4%BF%9D%E6%8A%A4%E4%BB%A4%E6%A1%88%E4%BB%B6.jpg',
        name: '人身保护令案件'
      },
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E5%85%AC%E7%A4%BA%E5%82%AC%E5%91%8A%E6%A1%88%E4%BB%B6.jpg',
        name: '公示催告案件'
      },
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E5%A2%9E%E5%8A%A0%E8%AF%89%E8%AE%BC%E8%AF%B7%E6%B1%82%E6%A1%88%E4%BB%B6.jpg',
        name: '增加诉讼请求案件'
      },
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E5%AE%A3%E5%91%8A%E5%A4%B1%E8%B8%AA%E6%A1%88%E4%BB%B6.jpg',
        name: '宣告失踪案件'
      },
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E5%AE%A3%E5%91%8A%E6%AD%BB%E4%BA%A1%E6%A1%88%E4%BB%B6.jpg',
        name: '宣告死亡案件'
      },
      {
        image: 'https://ss.readit.top/images/bk_minshishenqingshu/%E6%92%A4%E5%9B%9E%E8%B5%B7%E8%AF%89%E6%A1%88%E4%BB%B6.jpg',
        name: '撤回起诉案件'
      },
    ]
  },
  previewImage(e) {
    getApp().previewImage(e, this)
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