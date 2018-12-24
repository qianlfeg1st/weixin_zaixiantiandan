App({
  data: {
    baseUrl: 'https://ss.readit.top/api/',
    conf: true,
    version: '1.0.7'
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },
  onShow () {
    console.log('~~~~~~~~APPonShow~~~~~~~')
    // 获取所在城市
    // if (!wx.getStorageSync('cityname')) this.getLocation();
    // 获取openid
    if (!wx.getStorageSync('openid')) this.login();
  },
  onLaunch (options) {
    // 获取所在城市
    this.getLocation();
    this.getConf();
  },
  login () {
    // 获取 登录凭证(code)
    wx.login({
      success: e => {
        if (e.code) {
          wx.request({
            url: `${this.data.baseUrl}openid/get/${e.code}/${+new Date()}`,
            success: res=> {
              wx.setStorageSync('openid', res.data.openid);
              // wx.setStorageSync('token', res.data.session_key);
            }
          })
        }
      }
    }); 
  },
  // 获取所在城市
  getLocation () {
    wx.getLocation({
      success: res => {
        wx.request({
          url: `${this.data.baseUrl}city/confirm/${res.longitude}/${res.latitude}/${+new Date()}`,
          success: e => {
            wx.setStorageSync('cityname', e.data.data.name)
          }
        })
      }
    });
  },
  previewImage (e, _this) {
    _this.setData({ closeImg: true });
    wx.previewImage({
      current: e.target.dataset.src,
      urls: _this.data.data.map(item=> {
        return item.image;
      })
    })
  },
  getConf () {
    wx.request({
      url: `${this.data.baseUrl}options/get/supportcompany/${+new Date()}`,
      success: res => {
        if (res.data === 'false') {
          this.data.conf = false;
        } else {
          this.data.conf = true
        }
      }
    })
  }
})
