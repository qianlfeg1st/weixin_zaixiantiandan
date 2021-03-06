const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: '',
    selectorCity: '',
    cityData: null,
    cityArray: [
      ['A', '阿拉善盟', '鞍山市', '安庆市', '安阳市', '阿坝藏族芜族自治州', '安顺市', '阿里地区', '安康市', '阿克苏地区', '阿勒泰地区'],
      ['B', '北京市', '保定市', '包头市', '巴彦淖市', '本溪市', '白山市', '白城市', '蚌埠市', '滨州市', '北海市', '百色市', '巴中市', '毕节地区', '保山市', '宝鸡市', '白银市', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州'],
      ['C', '承德市', '沧州市', '长治市', '赤峰市', '朝阳市', '长春市', '常州市', '滁州市', '巢湖市', '池州市', '长沙市', '常德市', '郴州市', '潮州市', '崇座市', '成都市', '楚雄黎族自治州', '昌吉回族自治州'],
      ['D', '大同市', '大连市', '丹东市', '大庆市', '大兴安岭地区', '东营市', '德州市', '东莞市', '德阳市', '达州市', '大理白族自治州', '德宏傣族景颇族自治州', '迪庆藏族自治州', '定西市'],
      ['E', '鄂尔多斯市', '鄂州市', '施恩土家苗族直至州'],
      ['F', '抚顺市', '阜新市', '阜阳市', '福州市', '抚顺市', '佛山市', '防城港市'],
      ['G', '赣州市', '广州市', '桂林市', '贵港市', '广元市', '广安市', '甘木藏族自治州', '贵阳市', '甘南藏族自治州', '果洛藏族自治州', '固原市'],
      ['H', '邯郸市', '衡水市', '呼和浩特市', '呼伦贝尔市', '葫芦岛市', '哈尔滨市', '鹤岗市', '黑河市', '淮安市', '杭州市', '湖州市', '合肥市', '淮南市', '淮北市', '黄山市', '豪州市', '菏泽市', '鹤壁市', '黄石市', '黄冈市', '衡阳市', '怀化市', '惠州市', '河源市', '贺州市', '河池市', '海口市', '红河哈尼族彝族自治州', '汉中市', '东海地区', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '海西蒙古族藏族自治州', '哈密地区', '和田地区'],
      ['J', '晋城市', '晋中市', '锦州市', '吉林市', '鸡西市', '佳木斯市', '嘉兴市', '金华市', '景德镇市', '九江市', '吉安市', '济南市', '济宁市', '焦作市', '荆门市', '荆州市', '江门市', '揭阳市', '嘉峪关市', '金昌市', '酒泉市'],
      ['K', '开封市', '昆明市', '克拉玛依市', '新疆克孜勒苏柯尔克孜自治州', '喀什地区'],
      ['L', '廊坊市', '临汾市', '吕梁市', '辽阳市', '辽源市', '连云港市', '丽水市', '六安市', '龙岩市', '莱芜市', '临沂市', '聊城市', '洛阳市', '漯河市', '娄底市', '柳州市', '来宾市', '泸州市', '乐山市', '凉山彝族自治州', '六盘水市', '丽江市', '临沧市', '拉萨市', '林芝地区', '兰州市', '陇南市', '临夏回族自治州'],
      ['M', '杜丹江市', '马鞍山市', '茂名市', '梅州市', '绵阳市', '眉山市'],
      ['N', '南京市', '南通市', '宁波市', '南平市', '宁德市', '南昌市', '南阳市', '南宁市', '内江市', '南充市', '怒江傈僳族自治州', '那曲地区'],
      ['P', '盘锦市', '莆田市', '萍乡市', '平顶山市', '濮阳市', '攀枝花市', '平凉市'],
      ['Q', '秦皇岛市', '齐齐哈尔市', '七台河市', '衢州市', '泉州市', '青岛市', '清远市', '钦州市', '黔西南布衣族苗族自治州', '黔东南苗族侗族自治州', '曲靖市', '庆阳市'],
      ['R', '日州市', '日喀则地区'],
      ['S', '石家庄市', '朔州市', '沈阳市', '四平市', '松原市', '双鸭山市', '绥化市', '苏州市', '宿迁市', '绍兴市', '宿州市', '三明市', '上饶市', '三门峡市', '商丘市', '十堰市', '随州市', '邵阳市', '韶关市', '深圳市', '汕头市', '汕尾市', '三亚市', '遂宁市', '思茅市', '山南地区', '商洛市', '石嘴山市'],
      ['T', '唐山市', '太原市', '通辽市', '铁岭市', '通化市', '泰州市', '台州市', '铜陵市', '泰安市', '铜仁地区', '铜川市', '天水市', '吐鲁番市', '塔城地区', '天津市'],
      ['W', '乌海市', '乌兰察布市', '无锡市', '温州市', '芜湖市', '潍坊市', '威海市', '武汉市', '梧州市', '文山壮族苗族自治州', '渭南市', '武威市', '吴忠市', '乌鲁木齐市'],
      ['X', '邢台市', '伒州市', '兴安盟', '锡林郭勒盟', '徐州市', '宣城市', '厦门市', '新余市', '新乡市', '许昌市', '信阳市', '襄樊市', '孝感市', '咸宁市', '湘潭市', '湘西土家族苗族自治州', '西双版纳傣族自治州', '西安市', '咸阳市', '西宁市'],
      ['Y', '阳泉市', '运城市', '营口市', '延边朝鲜族自治州', '伊春市', '盐城市', '扬州市', '鹰潭市', '宜春市', '烟台市', '宜昌市', '岳阳市', '益阳市', '永州市', '阳江市', '云浮市', '玉林市', '宜宾市', '雅安市', '玉溪市', '延安市', '榆林市', '玉树藏族自治州', '银川市', '伊犁哈萨克自治州'],
      ['Z', '张家口市', '镇江市', '舟山市', '漳州市', '淄博市', '枣庄市', '郑州市', '周口市', '驻马店市', '株洲市', '张家界市', '珠海市', '湛江市', '肇庆市', '中山市', '自贡市', '资阳市', '遵义市', '昭通市', '张掖市', '中卫市']
    ],
    scrollIntoView: 'A'
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
    wx.showToast({
      title: '加载数据中',
      icon: 'loading',
      duration: 20000,
      mask: true,
    })
    this.setData({
      city: wx.getStorageSync('cityname'),
      stemInfo: wx.getSystemInfoSync(),
    });
    this.getData();
  },
  getData () {
    wx.request({
      url: `${app.data.baseUrl}court/list/${encodeURI(wx.getStorageSync('cityname'))}/${+new Date()}`,
      success: res => {
        console.log('res', res.data)
        this.setData({
          cityData: res.data
        });
        wx.hideToast();
      }
    })
  },
  getLocation () {
    app.getLocation();
  },
  setCity (e) {
    // console.log('eee', e.currentTarget.dataset.city)
    
    wx.request({
      url: `${app.data.baseUrl}court/list/${encodeURI(e.currentTarget.dataset.city)}/${+new Date()}`,
      success: res=> {
        this.setData({
          cityData: res.data,
          selectorCity: e.currentTarget.dataset.city,
        });
      }
    })
  },
  setCourt (e) {
    wx.setStorageSync('courtcode', e.currentTarget.dataset.courtcode)
    wx.setStorageSync('courtname', e.currentTarget.dataset.courtname)
    wx.switchTab({
      url: `../index/index`
    });
  },
  changScroll (e) {
    console.log('eee', e)
    wx.showToast({
      title: e.currentTarget.dataset.name,
      icon: 'none',
      duration: 400
    })
    this.setData({
      scrollIntoView: e.currentTarget.dataset.name
    });
  },
  showCity () {
    this.setData({
      cityData: null
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