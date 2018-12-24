const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prototype0: {
      name: '',
      sex: '',
      nation: '',
      idno: '',
      birthday: '',
      phone: '',
      address: '',
      type: '自然人',
    },
    prototype1: {
      // 负责人
      head: '',
      // 公司名称
      name: '',
      // 公司地址
      address: '',
      // 联系电话
      phone: '',
      // 组织机构代码
      orgcode: '',
      type: '法人',
    },
    personAData: [],
    personBData: [],
    more: {
      // 上诉人
      person1: '',
      // 被上诉人
      person2: '',
      // 案由
      case1: '',
      // 判决机关
      court: '',
      // 判决时间
      year: '',
      month: '',
      day: '',
      // 法律文书
      caseno: '',
      // 判决裁定
      actiontype: '民事判决',
      // 上诉请求
      requests: '',
      // 事实和理由
      reasons: '',
    }
  },
  toLine(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../${type}/${type}`
    });
  },
  postData() {
    let more = this.data.more;
    more.person1 = this.data.personAData.map(item => {
      return item.name
    });
    more.person2 = this.data.personBData.map(item => {
      return item.name
    });
    more.person1 = more.person1.join('|')
    more.person2 = more.person2.join('|')

    wx.request({
      method: 'POST',
      data: {
        personA: this.data.personAData,
        personB: this.data.personBData,
        more: more,
        info: {
          booktype: '民事上诉状',
          booktable: 'bk_minshishangsu',
          datasource: 'wx',
          openid: wx.getStorageSync('openid'),
          cityname: wx.getStorageSync('cityname'),
          courtcode: wx.getStorageSync('courtcode'),
          courtname: wx.getStorageSync('courtname'),
        },
      },
      url: `${app.data.baseUrl}submit`,
      success: res => {
        if (res.data.success) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2500,
            success: res => {
              setTimeout(() => {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 2500);
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
            image: '../../images/fail.png',
            duration: 1500,
            success: res => {

            }
          })
        }
      }

    })
  },
  actiontypeRadio(e) {
    let more = this.data.more;
    more.casetype1 = e.detail.value
    more.casetype2 = e.detail.value
    this.setData({
      more: more,
    });
  },
  case1Input(e) {
    let more = this.data.more;
    more.case1 = e.detail.value
    this.setData({
      more: more,
    });
  },
  courtInput(e) {
    let more = this.data.more;
    more.court = e.detail.value
    this.setData({
      more: more,
    });
  },
  timeChange (e) {
    let arr = e.detail.value.split('-');
    let more = this.data.more;
    more.year = arr[0];
    more.month = arr[1];
    more.day = arr[2];
    this.setData({
      more: more,
    });
  },
  casenoInput(e) {
    let more = this.data.more;
    more.caseno = e.detail.value
    this.setData({
      more: more,
    });
  },
  requestsInput(e) {
    let more = this.data.more;
    more.requests = e.detail.value
    this.setData({
      more: more,
    });
  },
  reasonsInput(e) {
    let more = this.data.more;
    more.reasons = e.detail.value
    this.setData({
      more: more,
    });
  },


  inputPerson(e) {
    if (e.currentTarget.dataset.mode === 'persona') {
      let personAData = this.data.personAData;
      personAData.forEach((item, index) => {
        if (index === e.currentTarget.dataset.index) {
          item[e.currentTarget.dataset.type] = e.detail.value
        }
      });
      this.setData({
        personAData: personAData
      });
    } else {
      let personBData = this.data.personBData;
      personBData.forEach((item, index) => {
        if (index === e.currentTarget.dataset.index) {
          item[e.currentTarget.dataset.type] = e.detail.value
        }
      });
      this.setData({
        personBData: personBData
      });
    }
  },
  addPerson(e) {
    wx.showActionSheet({
      itemList: app.data.conf ? ['自然人', '法人'] : ['自然人'],
      success: res => {
        if (e.currentTarget.dataset.mode === 'persona') {
          let personAData = this.data.personAData;
          personAData.push(this.data[`prototype${res.tapIndex}`]);
          console.log('personAData', personAData)
          this.setData({
            personAData: personAData
          })
        } else {
          let personBData = this.data.personBData;
          personBData.push(this.data[`prototype${res.tapIndex}`]);
          this.setData({
            personBData: personBData
          })
        }
      },
    })
  },
  deletePerson(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: res => {
        if (res.confirm) {
          if (e.currentTarget.dataset.mode === 'persona') {
            let personAData = this.data.personAData;
            personAData.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              personAData: personAData
            });
          } else {
            let personBData = this.data.personBData;
            personBData.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              personBData: personBData
            });
          }
        }
      }
    });
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