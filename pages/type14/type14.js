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
      // 实现行为
      actiontype: '拍卖',
      // 被申请人
      person1: '',
      // 担保财产
      property: '',
      // 申请人
      person2: '',
      // 受偿金额
      moneytotal: '',
      // 事实和理由
      reasons: '',
    },
  },
  toLine(e) {
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../${type}/${type}`
    });
  },
  postData() {
    let more = this.data.more;
    let person1;
    let person2;
    person1 = this.data.personAData.map(item => {
      return item.name
    });
    person2 = this.data.personBData.map(item => {
      return item.name
    });
    console.log('more.person2', more.person2)
    // console.log('more', more)
    more.person2 = person1.join('|')
    more.person1 = person2.join('|')

    wx.request({
      method: 'POST',
      data: {
        personA: this.data.personAData,
        personB: this.data.personBData,
        more: more,
        info: {
          booktype: '实现担保物权',
          booktable: 'bk_danbaowuquan',
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
  propertyInput(e) {
    let more = this.data.more;
    more.property = e.detail.value
    this.setData({
      more: more,
    });
  },
  moneytotalInput(e) {
    let more = this.data.more;
    more.moneytotal = e.detail.value
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
  actiontypeRadio(e) {
    let more = this.data.more;
    more.actiontype = e.detail.value
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