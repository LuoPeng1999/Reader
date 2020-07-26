// pages/bookstore/bookstore.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ismale: true,
        ismaleText: '',
        popularIndex: 0,
        timerId: null,
        finNovelList:[],
        fyRankList:[],
        hotRankList:[],
        limitFreeList:[],
        freeTime:[],
        freeTimeLeft:0
    },
    toSearch(){
        wx.navigateTo({
            url:"../search/search"
        });
    },
    clearArray(arr){
        var newArr = [];
        arr.forEach(item=>{
            if(newArr.indexOf(item) <= -1){
                newArr.push(item);
            }
        })
        return newArr;
    },
    changemale(){
        this.setData({
            ismale:!this.data.ismale
        });
        if(this.data.ismale){
            this.setData({
                finNovelList:[],
                fyRankList:[],
                hotRankList:[],
                limitFreeList:[],
                ismaleText: 'male'
            });
        }else{
            this.setData({
                finNovelList:[],
                fyRankList:[],
                hotRankList:[],
                limitFreeList:[],
                ismaleText: 'female'
            });
        }
        wx.request({
            url: 'https://wxapp.qidian.com/ajax/index/index?gender=' + this.data.ismaleText,
            success: (res)=>{
                // console.log(res.data.data.finNovel);
                res.data.data.finNovel.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.finNovelList.push(item);
                });
                res.data.data.fyRank.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.fyRankList.push(item);
                })
                res.data.data.hotRank.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.hotRankList.push(item);
                })
                res.data.data.limitFree.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.limitFreeList.push(item);
                })
                // console.log(this.data.finNovelList);
                // console.log(this.data.fyRankList);
                // console.log(this.data.hotRankList);
                // console.log(this.data.limitFreeList);
                this.setData({
                    finNovelList:this.clearArray(this.data.finNovelList),
                    fyRankList:this.clearArray(this.data.fyRankList),
                    hotRankList:this.clearArray(this.data.hotRankList),
                    limitFreeList:this.clearArray(this.data.limitFreeList)
                });
            }
        })
    },
    startPopularTime(){
        var that = this;
        this.data.timerId && clearInterval(this.data.timerId), this.data.timerId = setInterval(function() {
            that.setData({
                popularIndex: that.data.popularIndex < 2 ? that.data.popularIndex + 1 : 0
            });
        }, 3e3);
    },
    
    freeTimeStart(){
        var that = this;
        var timer = setInterval(function(){
            that.data.freeTimeLeft > 0 ? (that.setData({
                freeTime: that.TimeFormat(that.data.freeTimeLeft)
            }), that.data.freeTimeLeft--) : that.setData({
                freeTime: [ "00", "00", "00" ]
            });
        }, 1e3);
    },
    TimeFormat(time){
        return [this.zero(Math.floor(time / 3600 )) , this.zero(Math.floor(time % 3600 / 60)) , this.zero(Math.floor(time % 60))]
    },
    zero(time){
        return  time<=9 ? "0" + time : "" +time
    },
    getFreeTimeLeft(){
        wx.request({
            url: 'https://wxapp.qidian.com/ajax/free/getFreeLeftTime?gender=' + this.data.ismaleText,
            success: (res)=>{
                // success
                this.setData({
                    freeTimeLeft:res.data.data
                })
            }
        })
    },
    goDetails(options){
        var bookId = options.currentTarget.dataset.bookId;
        var imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+bookId+"/150";
        wx.request({
          url: 'https://m.qidian.com/majax/book/category?_csrfToken=h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa&bookId=' + bookId,
          success:(res)=>{
            var chapterId = res.data.data.vs[0].cs[0].id;
            wx.navigateTo({
                url: '/pages/details/details?bookId=' + bookId + "&chapterId=" + chapterId + "&imgUrl=" + imgUrl
            })
          }
        })
    },
    goMore(){
        console.log(1111);
        wx.navigateTo({
            url: '../classify/classify'
        })
    },
    // endPopularTime: function() {
    //     clearInterval(this.data.timerId);
    // },

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
        this.setData({
            finNovelList:[],
            fyRankList:[],
            hotRankList:[],
            limitFreeList:[]
        });
        this.startPopularTime();
        this.getFreeTimeLeft();
        this.freeTimeStart();
        wx.request({
            url: 'https://wxapp.qidian.com/ajax/index/index?gender=male',
            success: (res)=>{
                // console.log(res.data.data.finNovel);
                res.data.data.finNovel.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.finNovelList.push(item);
                });
                res.data.data.fyRank.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.fyRankList.push(item);
                })
                res.data.data.hotRank.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.hotRankList.push(item);
                })
                res.data.data.limitFree.forEach(item=>{
                    item.imgUrl = "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150";
                    this.data.limitFreeList.push(item);
                })
                // console.log(this.data.finNovelList);
                // console.log(this.data.fyRankList);
                // console.log(this.data.hotRankList);
                // console.log(this.data.limitFreeList);
                this.setData({
                    finNovelList:this.clearArray(this.data.finNovelList),
                    fyRankList:this.clearArray(this.data.fyRankList),
                    hotRankList:this.clearArray(this.data.hotRankList),
                    limitFreeList:this.clearArray(this.data.limitFreeList)
                });
            }
        })
        // console.log('男finNovelList',this.data.finNovelList);
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