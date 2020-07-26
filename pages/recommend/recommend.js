// pages/recommend/recommend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendList:[],
        value:"绍宋"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    toSearch(){
        wx.navigateTo({
            url:"../search/search"
        });
    },
    goRead(options){
        var index = options.target.dataset.id;
        // console.log(index);
        var bookId = this.data.recommendList[index].bookId;
        console.log(bookId);
        
        var chapterId = "";
        var url = "https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" + bookId;
        // console.log(url);
        var that = this;
        wx.request({
          url: url,
          success: (res)=>{
            // console.log(res);
            chapterId = res.data.data.vs[0].cs[0].id;
            console.log(chapterId);
            wx.navigateTo({
                url: '../read/read?bookId=' + bookId + "&chapterId=" + chapterId + "&num=0&desc=" + this.data.recommendList[index].desc,
            })
          }
        })
    },
    goDetails(options){
        var index = options.target.dataset.id;
        console.log(index);
        var bookId = this.data.recommendList[index].bookId;
        console.log(bookId);
        var chapterId = "";
        var url = "https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" + bookId;
        // console.log(url);
        var that = this;
        wx.request({
          url: url,
          success (res) {
            console.log();
            chapterId = res.data.data.vs[0].cs[0].id;
            console.log(chapterId);
            wx.navigateTo({
                url: '/pages/details/details?bookId=' + bookId + "&chapterId=" + chapterId + "&desc=" + that.data.recommendList[index].desc + "&imgUrl=" + that.data.recommendList[index].imgUrl
            })
          }
        })
    },
    addcollect(options){
        var index = options.target.dataset.id;
        console.log(index);
        var collectList = wx.getStorageSync('collectList');
        console.log('recommend--------',collectList);
        var userInfo = wx.getStorageSync('userInfo');
        var chapterId = ''
        wx.request({
          url: "https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" + this.data.recommendList[index].bookId,
          success: (res)=>{
            chapterId=res.data.data.vs[0].cs[0].id;
            if(userInfo != "" && this.data.bookInfoList != ""){
                wx.showToast({
                  title: '添加成功',
                  icon: 'success',
                  duration: 2000
                })
                collectList.push({
                  imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+this.data.recommendList[index].bookId+"/150",
                  bookName:this.data.recommendList[index].bookName,
                  updTime:this.data.recommendList[index].updTime,
                  bookId:this.data.recommendList[index].bookId,
                  chapterId:chapterId,
                  desc:this.data.recommendList[index].desc
                });
                wx.setStorageSync('collectList', collectList);
              }else{
                wx.showToast({
                  title: '添加失败',
                  icon: 'none',
                  duration: 2000
                })
              }
          }
        })
        
      },
    // 
    onLoad: function (options) {
      wx.showShareMenu({
        // 要求小程序返回分享目标信息
        withShareTicket: true
      });
        var that = this;
        wx.request({
            url: 'https://wxapp.qidian.com/ajax/index/recommend',
            success(res){
                console.log(res.data.data.list);
                var arr = []
                res.data.data.list.forEach(item=>{
                    arr.push({
                        bookId:item.bookId,
                        bookName:item.bookName,
                        authorName:item.authorName,
                        imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+item.bookId+"/150",
                        desc:item.description.replace(/<br>/gi, "").replace(/\s+/gi, ""),
                        categoryName:item.categoryName,
                        wordsCount:item.wordsCount,
                        rate:item.rateInfo.rate.toFixed(1),
                        actionStatus:item.actionStatus,
                        honor:item.tagInfo.honor,
                        updTime: ''
                    });
                });
                that.setData({
                    'recommendList':arr
                });
                // https://bookcover.yuewen.com/qdbimg/349573/1015183946/150 图片
            }
        })
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
    onShareAppMessage: function(res) {
      var index = res.target.dataset.id;
      var bookId = this.data.recommendList[index].bookId;
      var imgUrl = this.data.recommendList[index].imgUrl;
      var bookName = this.data.recommendList[index].bookName;
      var desc = this.data.recommendList[index].desc;
      var chapterId = "";
      wx.request({
        url: "https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=" + this.data.recommendList[index].bookId,
        success: (res)=>{
          chapterId=res.data.data.vs[0].cs[0].id;
        }
      });
      if(res.from === "button"){
        return {
          title:bookName,
          imageUrl:imgUrl,
          path:'/pages/details/details?bookId=' + bookId + "&chapterId=" + chapterId + "&desc=" + desc + "&imgUrl=" + imgUrl
        }
      }
    },
})