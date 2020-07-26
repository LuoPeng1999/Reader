// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keywordList:[],
        inputValue: '绍宋'
    },
    goback() {
        wx.switchTab({
            url: '../bookstore/bookstore'
        })
    },
    searchStart(event){
        if(event.detail != null){
            this.data.keywordList.unshift(event.detail);
            wx.navigateTo({
              url: '../searchResult/searchResult?keyword=' + event.detail
            })
        }
        console.log(this.data.keywordList);
        this.setData({
            'keywordList':this.data.keywordList
        })
        wx.setStorageSync('keywordList', this.data.keywordList)
    },
    deleteList(){
        this.setData({
            'keywordList':[]
        });
        wx.clearStorageSync('keywordList');
    },
    histrorySearch(options){
        var index = options.target.dataset.id;
        console.log(index);
        wx.navigateTo({
          url: '../searchResult/searchResult?keyword=' + this.data.keywordList[index]
        })
        this.data.keywordList.unshift(this.data.keywordList[index]);
        this.setData({
            keywordList:this.clearArray(this.data.keywordList)
        })
        wx.setStorageSync('keywordList', this.data.keywordList)
    },
    // 数组去重
    clearArray(arr){
        var newArr = [];
        arr.forEach(item=>{
            if(newArr.indexOf(item) <= -1){
                newArr.push(item);
            }
        })
        return newArr;
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
        if(wx.getStorageSync('keywordList').length != 0){
            var getKeyWordList = wx.getStorageSync('keywordList');
            this.setData({
                'keywordList':getKeyWordList
            });
        }
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