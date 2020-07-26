// pages/read/read.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    chapterId: "",
    next: "",
    prev: "",
    content: "",
    chapterName: "",
    num: 0,
    catalogueshow: false,
    cataloguelist: [],
    bookInfoList: [],
    desc: "",
    contentCss: {
      titleSize: 20,
      contentSize: 16,
      color: "#333", //夜间 #808080 日间 #333
      lineHeight: 22,
      backgroundColor: "#fff", //#C7EDCC 护眼色  #262626 黑夜  #fff 日间
      borderColor: "#fff", // #808080 黑夜 #fff 日间
    },
    cataloguesCss: {
      catalogueColor: "#F2F2F2", // #333 黑夜 #F2F2F2 日间
      contentColor: "#fff", // #3E3E3E 黑夜 #fff 日间
      color: "#333", // #808080 黑夜 #333 日间
    },
    isnight: false, // 是否黑夜
    isnext: true, // 是否下一页
    currentValue: 0,
    fontshow: false,
    fontValue: 12,
  },
  // 上一章
  prevChapter() {
    var n = Number(this.data.num);
    if (n == 0) {
      n = n;
      this.setData({
        isnext: false,
      });
    } else {
      n--;
    }
    this.setData({
      chapterId: this.data.prev,
      num: n,
    });
    // wx.setStorageSync('currentValue', this.data.currentValue)
    if (this.data.isnext) {
      wx.redirectTo({
        url:
          "../read/read?bookId=" +
          this.data.bookId +
          "&chapterId=" +
          this.data.chapterId +
          "&num=" +
          this.data.num,
      });
    }
    // console.log('prev',n);
    // console.log('prev',this.data.num);
  },
  // 下一章
  nextChapter() {
    var length = this.data.cataloguelist.length;
    var n = Number(this.data.num);
    n += 1;
    this.setData({
      chapterId: this.data.next,
      num: n,
    });
    // wx.setStorageSync('currentValue', this.data.currentValue)
    if (n == length) {
      this.setData({
        isnext: false,
      });
    }
    if (this.data.isnext) {
      wx.redirectTo({
        url:
          "../read/read?bookId=" +
          this.data.bookId +
          "&chapterId=" +
          this.data.chapterId +
          "&num=" +
          this.data.num,
      });
    }
    // console.log(this.data.num);
  },
  // 目录展示
  showCatalogue() {
    this.setData({
      catalogueshow: true,
      setshow: false,
      fontshow: false,
    });
  },
  // 关闭目录
  catalogueClose() {
    this.setData({
      catalogueshow: false,
    });
  },
  // 点击目录到达指定章节
  goChapter(options) {
    var index = options.target.dataset.id;
    // console.log(index);
    this.setData({
      chapterId: this.data.cataloguelist[index].id,
    });
    var length = this.data.cataloguelist.length;
    console.log(this.data.currentValue);
    this.setData({
      currentValue: (100 / length) * (index + 1),
    });
    wx.setStorageSync('currentValue', this.data.currentValue);
    wx.redirectTo({
      url:
        "../read/read?bookId=" +
        this.data.bookId +
        "&chapterId=" +
        this.data.chapterId +
        "&num=" +
        (this.data.cataloguelist[index].uuid - 1),
    });
  },
  // 到达小说详情
  goDetails() {
    wx.navigateTo({
      url:
        "/pages/details/details?bookId=" +
        this.data.bookId +
        "&chapterId=" +
        this.data.chapterId +
        "&desc=" +
        this.data.desc +
        "&imgUrl=" +
        this.data.bookInfoList[0].imgUrl,
    });
  },
  // 到达小说版权信息
  goCopyright() {
    wx.navigateTo({
      url:
        "/pages/copyright/copyright?bookId=" +
        this.data.bookId +
        "&chapterId=" +
        this.data.chapterId,
    });
  },
  // 点击设置弹窗显示
  setting() {
    this.setData({
      setshow: true,
      fontshow: false,
    });
    // console.log(this.data.setshow);
  },
  // 关闭弹窗设置
  closesetting() {
    this.setData({
      setshow: false,
      fontshow: false,
    });
    // console.log(this.data.setshow);
  },
  // 切换夜间
  changenight() {
    console.log(1111);
    this.setData({
      contentCss: {
        titleSize: 20,
        contentSize: 16,
        color: "#808080", //夜间 #808080 #333
        lineHeight: 22,
        backgroundColor: "#262626", //#C7EDCC 护眼色 #262626 黑夜 #fff
        borderColor: "#808080", // #808080 黑夜 #fff 日间
      },
      isnight: true,
      cataloguesCss: {
        catalogueColor: "#333", // #333 黑夜 #F2F2F2 日间
        contentColor: "#3E3E3E", // #3E3E3E 黑夜 #fff 日间
        color: " #808080", // #808080 黑夜 #333 日间
      },
    });
    wx.setStorageSync("contentCss", this.data.contentCss);
    wx.setStorageSync("cataloguesCss", this.data.cataloguesCss);
    wx.setStorageSync("isnight", this.data.isnight);
  },
  // 切换白天
  changeday() {
    this.setData({
      contentCss: {
        titleSize: 20,
        contentSize: 16,
        color: "#333", //夜间 #808080 #333
        lineHeight: 22,
        backgroundColor: "#fff", //#C7EDCC 护眼色 #262626 黑夜 #fff
        borderColor: "#fff", // #3E3E3E 黑夜 #fff 日间
      },
      isnight: false,
      cataloguesCss: {
        catalogueColor: "#F2F2F2", // #333 黑夜 #F2F2F2 日间
        contentColor: "#fff", // #3E3E3E 黑夜 #fff 日间
        color: "#333", // #808080 黑夜 #333 日间
      },
    });
    wx.setStorageSync("contentCss", this.data.contentCss);
    wx.setStorageSync("cataloguesCss", this.data.cataloguesCss);
    wx.setStorageSync("isnight", this.data.isnight);
  },
  // 拖动进度条跳转章节
  onchange(e) {
    var length = this.data.cataloguelist.length;
    // console.log(length);
    // console.log(e.detail.value);
    wx.setStorageSync('currentValue', e.detail);
    var index = Math.floor((e.detail * length) / 100);
    // console.log(index);
    var chapterId = this.data.cataloguelist[index].id;
    this.setData({
      chapterId: chapterId,
    });
    wx.setStorageSync('currentValue', e.detail)
  },
  skip() {
    var length = this.data.cataloguelist.length;
    var currentValue = wx.getStorageSync('currentValue');
    this.data.num = currentValue * length / 100;
    this.setData({
      num:this.data.num
    })
    wx.redirectTo({
      url:
        "../read/read?bookId=" +
        this.data.bookId +
        "&chapterId=" +
        this.data.chapterId +
        "&num=" +
        this.data.num,
    });
  },
  // 切换为字体设置
  fontsetting() {
    this.setData({
      fontshow: true,
      setshow: false,
    });
  },
  fontadd() {
    if(this.data.contentCss.contentSize < 19){
      this.data.fontValue = wx.getStorageSync('fontValue');
      this.setData({
        fontValue:this.data.fontValue + 1
      })
      this.data.contentCss.contentSize = this.data.fontValue;
      this.setData({
        contentCss:this.data.contentCss
      })
      wx.setStorageSync('fontValue', this.data.fontValue);
      wx.setStorageSync("contentCss", this.data.contentCss);
    }
  },
    // console.log(this.data.contentCss);
  fontsub() {
    if(this.data.contentCss.contentSize > 12){
      this.data.fontValue = wx.getStorageSync('fontValue');
      this.setData({
        fontValue:this.data.fontValue - 1
      })
      this.data.contentCss.contentSize = this.data.fontValue;
      this.setData({
        contentCss:this.data.contentCss
      })
      wx.setStorageSync('fontValue', this.data.fontValue);
      wx.setStorageSync("contentCss", this.data.contentCss);
    }
  },
  fontChange(event){
    this.data.contentCss.contentSize = event.detail;
    this.setData({
      contentCss: this.data.contentCss
    })
    wx.setStorageSync('fontValue', event.detail);
    wx.setStorageSync("contentCss", this.data.contentCss);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId: options.bookId,
      chapterId: options.chapterId,
      num: options.num,
      desc: options.desc,
    });
    var that = this;
    wx.request({
      url:
        "https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" +
        that.data.bookId +
        "&chapterId=" +
        that.data.chapterId,
      success: (res) => {
        // console.log(res);
        var length = this.data.content.length;
        var arr = [];
        arr.push({
          bookName: res.data.data.bookInfo.bookName,
          authorName: res.data.data.bookInfo.authorName,
          imgUrl:
            "https://bookcover.yuewen.com/qdbimg/349573/" +
            res.data.data.bookInfo.bookId +
            "/150",
          desc: this.desc,
        });

        this.setData({
          content: res.data.data.chapterInfo.content
            .replace(/\s+/gi, "")
            .replace(/<p>/gi, "</p><p class='p_class'>")
            .slice(4),
          next: res.data.data.chapterInfo.next,
          prev: res.data.data.chapterInfo.prev,
          chapterName: res.data.data.chapterInfo.chapterName,
          bookInfoList: arr,
        });
        // console.log(this.data.content);
        this.setData({
          content: this.data.content.slice(0, length - 19),
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.contentCss);
    // console.log(this.data.cataloguesCss);
    // console.log('myOptions',myOptions.num);
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let myOptions = currentPage.options;
    this.setData({
      fontValue: wx.getStorageSync('fontValue'),
      contentCss: wx.getStorageSync('contentCss'),
      cataloguesCss: wx.getStorageSync('cataloguesCss'),
      isnight: wx.getStorageSync('isnight'),
    })

    wx.request({
      url:
        "https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" +
        this.data.bookId +
        "&chapterId=" +
        this.data.chapterId,
      success: (res) => {
        // console.log(res);
        res.data.data.vs.forEach((item) => {
          if (item.vS == 0) {
            for (let i = 0; i < item.cs.length; i++) {
              this.data.cataloguelist.push(item.cs[i]);
            }
          }
        });
        this.setData({
          cataloguelist: this.data.cataloguelist,
        });
        var length = this.data.cataloguelist.length;
        this.setData({
          currentValue: (100 / length) * myOptions.num,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
