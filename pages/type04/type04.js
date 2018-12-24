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
      // 被委托人
      person1: '',
      // 案件名
      case1: '',
      // 其他委托事项
      others: '',
      model: false,
      proxy1_shangsu: false,
      proxy1_hejie: false,
      proxy1_shoujizhengju: false,
      proxy1_lingqu: false,
      proxy2_banlishenqing: false,
      proxy2_chengren: false,
      proxy2_hejie: false,
      proxy2_lingqu: false,
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
    more.person1 = this.data.personBData.map(item => {
      return item.name
    });
    more.person1 = more.person1.join('|')

    wx.request({
      method: 'POST',
      data: {
        personA: this.data.personAData,
        personB: this.data.personBData,
        more: more,
        info: {
          booktype: '个人委托',
          booktable: 'bk_gerenweituo',
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
  case1Input(e) {
    let more = this.data.more;
    more.case1 = e.detail.value
    this.setData({
      more: more,
    });
  },
  othersInput(e) {
    let more = this.data.more;
    more.others = e.detail.value
    this.setData({
      more: more,
    });
  },
  checkboxChange (e) {
    console.log('eee', e)
    let more = this.data.more;
    // 初始化
    if (e.currentTarget.dataset.proxy === 'proxy1') {
      more.model = false;
      more.proxy1_shangsu = false;
      more.proxy1_hejie = false;
      more.proxy1_shoujizhengju = false;
      more.proxy1_lingqu = false;
    } else {
      more.proxy2_banlishenqing = false;
      more.proxy2_chengren = false;
      more.proxy2_hejie = false;
      more.proxy2_lingqu = false;
    }

    e.detail.value.forEach(item=> {
      switch (+item) {
        case 0:
          more.model = true;
          break;
        case 1:
          more.proxy1_shangsu = true;
          break;
        case 2:
          more.proxy1_hejie = true;
          break;
        case 3:
          more.proxy1_shoujizhengju = true;
          break;
        case 4:
          more.proxy1_lingqu = true;
          break;
        case 5:
          more.proxy2_banlishenqing = true;
          break;
        case 6:
          more.proxy2_chengren = true;
          break;
        case 7:
          more.proxy2_hejie = true;
          break;
        case 8:
          more.proxy2_lingqu = true;
          break;
      }
    });
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