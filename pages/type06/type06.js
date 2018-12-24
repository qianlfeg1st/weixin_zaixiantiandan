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
      //标的
      noaction: '',
      // 
      noactionreason: '',
      // 判决时间
      year1: '',
      month1: '',
      day1: '',
      year3: '',
      month3: '',
      day3: '',
      // 判决机关
      court: '',
      court2: '',
      // 判决文书
      actionno: '',
      actionno1: '',
      // 案由
      cases: '',
      // 判决类型
      actiontype: 'minshicaijue',
      // 判决结果
      actionresult: '',
      actionresult1: '',
      // 提出异议的时间
      year2: '',
      month2: '',
      day2: '',
      // 原告
      person1: '',
      // 被告
      person2: '',
      // 事实和理由
      details: '',
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
          booktype: '案外人执行异议之诉',
          booktable: 'bk_anwaizhisu',
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
  actiontypeRadio (e) {
    let more = this.data.more;
    more.actiontype = e.detail.value
    this.setData({
      more: more,
    });
  },
  noactionInput (e) {
    let more = this.data.more;
    more.noaction = e.detail.value
    this.setData({
      more: more,
    });
  },
  courtInput (e) {
    let more = this.data.more;
    more.court = e.detail.value
    more.court2 = e.detail.value
    this.setData({
      more: more,
    });
  },
  actionnoInput(e) {
    let more = this.data.more;
    more.actionno = e.detail.value
    more.actionno1 = e.detail.value
    this.setData({
      more: more,
    });
  },
  casesInput(e) {
    let more = this.data.more;
    more.cases = e.detail.value
    this.setData({
      more: more,
    });
  },
  actionresultInput(e) {
    let more = this.data.more;
    more.actionresult = e.detail.value
    more.actionresult1 = e.detail.value
    this.setData({
      more: more,
    });
  },
  noactionreasonInput(e) {
    let more = this.data.more;
    more.noactionreason = e.detail.value
    this.setData({
      more: more,
    });
  },
  detailsInput(e) {
    let more = this.data.more;
    more.details = e.detail.value
    this.setData({
      more: more,
    });
  },

  timeChange1 (e) {
    let arr = e.detail.value.split('-');
    let more = this.data.more;
    more.year1 = more.year3 = arr[0];
    more.month1 = more.month3 = arr[1];
    more.day1 = more.day3 = arr[2];
    this.setData({
      more: more,
    });
  },
  timeChange2 (e) {
    let arr = e.detail.value.split('-');
    let more = this.data.more;
    more.year2 = arr[0];
    more.month2 = arr[1];
    more.day2 = arr[2];
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