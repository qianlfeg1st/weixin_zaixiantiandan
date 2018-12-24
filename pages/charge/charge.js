// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseNum: 300,
    multiArray: [['财产案件', '非财产案件', '行政案件', '知识产权案件', '申请费'], ['一般案件']],
    multiIndex: [0, 0],
    newIndex: [
      '一般案件',
      '离婚案件',
      '侵害姓名权、名称权、肖像权、名誉权、荣誉权以及其他人格权案件',
      '其他案件',
      '商标、专利、海事行政案件',
      '其他行政案件',
      '没有争议金额或价额的案件',
      '有争议金额或价额的案件',
      '执行申请费无需预交(*)',
      '申请保全措施',
      '申请支付令',
      '申请公示催告',
      '申请撤销仲裁裁决或认定仲裁协议效力',
      '申请破产',
    ]
  },
  bindMultiPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  bindMultiPickerColumnChange (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex;
    // console.log('multiIndex', multiIndex)
    if (e.detail.column === 0) {
      switch (e.detail.value) {
        case 0:
          multiArray[1] = ['一般案件']
          break;
        case 1:
          multiArray[1] = ['离婚案件', '侵害姓名权、名称权、肖像权、名誉权、荣誉权以及其他人格权案件', '其他案件']
          break;
        case 2:
          multiArray[1] = ['商标、专利、海事行政案件', '其他行政案件']
          break;
        case 3:
          multiArray[1] = ['没有争议金额或价额的案件', '有争议金额或价额的案件']
          break;
        case 4:
          multiArray[1] = ['执行申请费无需预交(*)', '申请保全措施', '申请支付令', '请公示催告', '申请撤销仲裁裁决或认定仲裁协议效力', '申请破产']
          break;
      }
      multiIndex[0] = e.detail.value
      multiIndex[1] = 0;
    }
    if (e.detail.column === 1) {
      multiIndex[1] = e.detail.value
    }
    console.log('multiArray', multiArray)
    console.log('multiIndex', multiIndex)

    this.setData({
      multiArray: multiArray,
      multiIndex: multiIndex,
    });
  },
  bindinput1 (e) {
    this.setData({
      baseNum: e.detail.value
    });
  },
  bindinput2 (e) {
    this.setData({
      targetNum: e.detail.value
    });
  },
  fordight(dight, how) {
    var l = dight.toString().length - (dight.toString().indexOf('.') + 1); 
    for(var i = l; i >= how; i --) {
      dight = new Number(dight.toFixed(i));
    }
    return dight; 
  },
  calculate () {
    if (!this.data.baseNum) {
      wx.showToast({
        title: '请输入基数',
        image: '../../images/fail.png',
        duration: 1000
      })
      return;
    }
    if (!this.data.targetNum) {
      wx.showToast({
        title: '请输入标的',
        image: '../../images/fail.png',
        duration: 1000
      })
      return;
    }
    const index = this.data.newIndex.indexOf(this.data.multiArray[1][this.data.multiIndex[1]]);
    // console.log(this.runcount(index, this.data.targetNum))
    wx.showModal({
      title: '提示',
      content: `诉讼费用为：${this.runcount(index, this.data.targetNum)}元`,
      showCancel: false,
    })
  },
  runcount (i, t) {
    let riefs;
    let x;
    switch(i) {
        //a11
    case 0:
    riefs = "财产案件 > 一般案件";
    if(t <= 10000) {
      x = 50;
    } else {
      if(t <= 100000) {
        x = t * 0.025 - 200;
      } else {
        if(t <= 200000) {
          x = t * 0.02 + 300;
        } else {
          if(t <= 500000) {
            x = t * 0.015 + 1300;
          } else {
            if(t <= 1000000) {
              x = t * 0.01 + 3800;
            } else {
              if(t <= 2000000) {
                x = t * 0.009 + 4800;
              } else {
                if(t <= 5000000) {
                  x = t * 0.008 + 6800;
                } else {
                  if(t <= 10000000) {
                    x = t * 0.007 + 11800;
                  } else {
                    if(t <= 20000000) {
                      x = t * 0.006 + 21800;
                    } else {
                      if(t > 20000000) {
                        x = t * 0.005 + 41800;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
        break;

    case 1:
    riefs = "非财产案件 > 离婚案件";
    if(t > 200000) {
      x = (t - 200000) * 0.005;
    } else {
      x = 0;
    }
        x = x + 200;
    break;
    //a22
    case 2:
    riefs = "非财产案件 > 侵害姓名权、名称权、肖像权、名誉权、荣誉权以及其他人格权案件";
    if(t == 0) {
      x = 0;
    } else {
      if((t <= 50000) && (t > 0)) {
  x = 0;
} else {
  if (t <= 100000) {
    x = (t - 50000) * 0.01;
  } else {
    x = (t - 100000) * 0.005 + 50000 * 0.01;
  }
}
        }
x = x + 300;
break;
    case 3:
riefs = "非财产案件 > 其他案件";
x = 80;
break;

    case 4:
riefs = "行政案件 > 商标、专利、海事行政案件";
x = 100;
break;

    case 5:
riefs = "行政案件 > 其他行政案件";
x = 50;
break;

    case 6:
riefs = "知识产权案件 > 没有争议金额或价额的案件";
x = 800;
break;

    case 7:
riefs = "知识产权案件 > 有争议金额或价额的案件";
if (t <= 10000) {
  x = 50;
} else {
  if (t <= 100000) {
    x = t * 0.025 - 200;
  } else {
    if (t <= 200000) {
      x = t * 0.02 + 300;
    } else {
      if (t <= 500000) {
        x = t * 0.015 + 1300;
      } else {
        if (t <= 1000000) {
          x = t * 0.01 + 3800;
        } else {
          if (t <= 2000000) {
            x = t * 0.009 + 4800;
          } else {
            if (t <= 5000000) {
              x = t * 0.008 + 6800;
            } else {
              if (t <= 10000000) {
                x = t * 0.007 + 11800;
              } else {
                if (t <= 20000000) {
                  x = t * 0.006 + 21800;
                } else {
                  if (t > 20000000) {
                    x = t * 0.005 + 41800;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
break;

    case 8:
riefs = "申请费 > 执行申请费无需预交(*)";
if (t <= 10000) {
  x = 50;
} else {
  if (t <= 500000) {
    x = t * 0.015 - 100;
  } else {
    if (t <= 5000000) {
      x = t * 0.01 + 2400;
    } else {
      if (t <= 10000000) {
        x = t * 0.005 + 27400;
      } else {
        if (t > 10000000) {
          x = t * 0.001 + 67400;
        }
      }
    }
  }
}
break;
    case 9:
riefs = "申请费 > 申请保全措施";
if (t <= 1000) {
  x = 30;
} else {
  if (t <= 100000) {
    x = t * 0.01 + 20;
  } else {
    if (t <= 896000) {
      x = t * 0.005 + 520;
    } else {
      if (t > 896000) {
        x = 5000;
      }
    }
  }
}

break;
    case 10:
riefs = "申请费 > 申请支付令";
if (t <= 10000) {
  x = 50;
} else {
  if (t <= 100000) {
    x = t * 0.025 - 200;
  } else {
    if (t <= 200000) {
      x = t * 0.02 + 300;
    } else {
      if (t <= 500000) {
        x = t * 0.015 + 1300;
      } else {
        if (t <= 1000000) {
          x = t * 0.01 + 3800;
        } else {
          if (t <= 2000000) {
            x = t * 0.009 + 4800;
          } else {
            if (t <= 5000000) {
              x = t * 0.008 + 6800;
            } else {
              if (t <= 10000000) {
                x = t * 0.007 + 11800;
              } else {
                if (t <= 20000000) {
                  x = t * 0.006 + 21800;
                } else {
                  if (t > 20000000) {
                    x = t * 0.005 + 41800;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
x = x / 3;
break;
        //b11
    case 11:
riefs = "申请费 > 申请公示催告";
x = 100;
break;
        //b11

    case 12:
riefs = "申请费 > 申请撤销仲裁裁决或认定仲裁协议效力";
x = 400;
break;
        //b14
    case 13:
riefs = "申请费 > 申请破产";
if (t <= 10000) {
  x = 50;
} else {
  if (t <= 100000) {
    x = t * 0.025 - 200;
  } else {
    if (t <= 200000) {
      x = t * 0.02 + 300;
    } else {
      if (t <= 500000) {
        x = t * 0.015 + 1300;
      } else {
        if (t <= 1000000) {
          x = t * 0.01 + 3800;
        } else {
          if (t <= 2000000) {
            x = t * 0.009 + 4800;
          } else {
            if (t <= 5000000) {
              x = t * 0.008 + 6800;
            } else {
              if (t <= 10000000) {
                x = t * 0.007 + 11800;
              } else {
                if (t <= 20000000) {
                  x = t * 0.006 + 21800;
                } else {
                  if (t > 20000000) {
                    x = t * 0.005 + 41800;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
x = x / 2;
if (x > 300000) {
  x = 300000;
}
break;

    default:
riefs = "财产案件 > 一般案件";
// ????????? 	var riefs=1; 
if (t <= 10000) {
  x = 50;
} else {
  if (t <= 100000) {
    x = t * 0.025 - 200;
  } else {
    if (t <= 200000) {
      x = t * 0.02 + 300;
    } else {
      if (t <= 500000) {
        x = t * 0.015 + 1300;
      } else {
        if (t <= 1000000) {
          x = t * 0.01 + 3800;
        } else {
          if (t <= 2000000) {
            x = t * 0.009 + 4800;
          } else {
            if (t <= 5000000) {
              x = t * 0.008 + 6800;
            } else {
              if (t <= 10000000) {
                x = t * 0.007 + 11800;
              } else {
                if (t <= 20000000) {
                  x = t * 0.006 + 21800;
                } else {
                  if (t > 20000000) {
                    x = t * 0.005 + 41800;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    }
//取2位小数四舍五入
x = this.fordight(x, 2);

    var jishu = this.data.baseNum;

if (x < jishu)
  x = jishu;

return x;
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