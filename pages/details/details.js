// pages/details/details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    chapterId: "",
    desc: "",
    imgUrl: "",
    bookInfoList: [],
    bookchapterList: [],
    show: false,
    turnup: true,
    showDesc: false,
    posterImg:''
  },
  clearArray(arr){
    var hash = [];
    hash.push(arr[0]);
    return hash;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  open: function () {
    this.setData({
      show: true,
    });
  },
  buttontap(e) {
    // console.log(e.detail);
  },
  tryRead() {
    this.setData({
      turnup: !this.data.turnup,
    });
    // console.log(this.data.turnup);
  },
  showDesc() {
    this.setData({
      showDesc: !this.data.showDesc,
    });
    // console.log(this.data.showDesc);
  },
  poster() {
    this.setData({
      show: true,
      posterImg:'https://wxapp.qidian.com/ajax/share/getSharePicture?bookId='+this.data.bookId+'&templateId=book'
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  getRead(){
      wx.navigateTo({
        url: '../read/read?bookId=' + this.data.bookId + "&chapterId=" + this.data.chapterId + "&num=0&desc=" + this.data.desc ,
      })
  },
  gochapter(){
    wx.navigateTo({
      url: '../read/read?bookId=' + this.data.bookId + "&chapterId=" + this.data.bookInfoList[0].updChapterId + "&num=0&desc=" + this.data.desc ,
    })
  },
  saveposterImg(){
    var that = this;
    wx.getSetting({
      success: (result) => {
        console.log(result);
        wx.showLoading({
          title: "正在保存图片...",
          mask: true
        });
        wx.downloadFile({
          url: 'https://wxapp.qidian.com/ajax/share/getSharePicture?bookId='+that.data.bookId+'&templateId=book',
          success:res=>{
            res.statusCode == 200 ? wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success:res=>{
                wx.hideLoading(),wx.showToast({
                  title: "保存成功",
                  icon: "success"
                })
              },
              fail: function() {
                wx.showToast({
                    title: "图片保存失败，请重试。",
                    icon: "none"
                });
              }
            }):(wx.hideLoading(), wx.showToast({
                title: "图片下载失败，请重试",
                icon: "none"
            }));
          },
        })
      }
    });
      
  },
  addcollect(){
    var collectList = wx.getStorageSync('collectList');
    var userInfo = wx.getStorageSync('userInfo');
    console.log(this.data.bookInfoList);
    if(userInfo != "" && this.data.bookInfoList != ""){
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
      collectList.push({
        imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+this.data.bookInfoList[0].bookId+"/150",
        bookName:this.data.bookInfoList[0].bookName,
        updTime:this.data.bookInfoList[0].updTime,
        bookId:this.data.bookInfoList[0].bookId,
        chapterId:this.data.chapterId,
        desc:this.data.desc,
      });
      wx.setStorageSync('collectList', collectList);
    }else{
      wx.showToast({
        title: '添加失败',
        icon: 'none',
        duration: 2000
      })
    }
    console.log(this.data.bookInfoList);
    
    console.log(userInfo);
    // userInfo.collectList.unshift();
    // "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150"
  },
  // 文字字数处理
  formateWords(num) {
    var newNum = 0;
    if(num >10000 && num < 100000000){
      newNum = (num/10000).toFixed(0);
    }
    return newNum
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let myOptions = currentPage.options;

    this.setData({
      bookId: myOptions.bookId,
      chapterId: myOptions.chapterId,
      desc: myOptions.desc,
      imgUrl: myOptions.imgUrl,
    });
    // console.log(this.data.bookId);
    // console.log(this.data.chapterId);
    var that = this;
    wx.request({
      url:
        "https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" +
        that.data.bookId +
        "&chapterId=" +
        that.data.chapterId,
      success(res) {
        // console.log(res);
        // res.data.data.bookInfo.desc = that.data.desc;
        // res.data.data.bookInfo.imgUrl = that.data.imgUrl;
        // that.data.bookInfoList.push(res.data.data.bookInfo);
        that.data.bookchapterList.push(res.data.data.chapterInfo);
        that.data.bookchapterList[0].content = that.data.bookchapterList[0].content
          .replace(/<p>/gi, "")
          .replace(/\s+/gi, "");
        that.setData({
          // bookInfoList: that.clearArray(that.data.bookInfoList),
          bookchapterList: that.clearArray(that.data.bookchapterList),
        });
        
      },
      
    });
    wx.request({
      url: "https://wxapp.qidian.com/ajax/book/info?bookId=" + that.data.bookId,
      success(res) {
        // console.log(res);
        // res.data.data.bookInfo.desc = that.data.desc;
        res.data.data.bookInfo.imgUrl = that.data.imgUrl;
        res.data.data.bookInfo.rateInfo = res.data.data.rateInfo;
        res.data.data.bookInfo.wordsCnt = that.formateWords(res.data.data.bookInfo.wordsCnt);
        res.data.data.bookInfo.desc = res.data.data.bookInfo.desc.replace(/<br>/gi, "").replace(/\s+/gi, "");
        that.data.bookInfoList.push(res.data.data.bookInfo);
        console.log(that.data.bookInfoList);
        // that.data.bookchapterList.push(res.data.data.chapterInfo);
        that.setData({
          bookInfoList: that.clearArray(that.data.bookInfoList)
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
  onUnload: function () {},

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res);
    }
    return {
        title: this.data.bookInfoList[0].bookName,
        path:'/pages/details/details?bookId=' + this.data.bookId + "&chapterId=" + this.data.chapterId + "&desc=" + this.data.desc + "&imgUrl=" + this.data.imgUrl,
        imageUrl: this.data.imgUrl
    }
  },
});
