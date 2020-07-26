// pages/copyright/copyright.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookId: '',
        chapter: '',
        bookCopyright:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            bookId:options.bookId,
            chapterId:options.chapterId
        });
        wx.request({
            url:
              "https://m.qidian.com/majax/chapter/getChapterInfo?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" +
              this.data.bookId +
              "&chapterId=" +
              this.data.chapterId,
            success:res=>{
              console.log(res);
              var arr = [];
              res.data.data.bookInfo.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+this.data.bookId+"/150";
              arr.push(res.data.data.bookInfo);
              this.setData({
                bookCopyright: arr
              });
              console.log(this.data.bookCopyright);
            },
        });
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