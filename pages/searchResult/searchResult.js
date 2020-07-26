// pages/searchResult/searchResult.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookstoreList: [],
        keyword: ""
    },
    goSearch(e) {
        wx.navigateTo({
            url: '../search/search?keyword=' + this.keyword
        })
    },
    onCancel(){
        wx.switchTab({
            url: '../bookstore/bookstore'
          })
    },
    goDetails(options){
        var index = options.target.dataset.id;
        // console.log(index);
        var bookId = this.data.bookstoreList[index].bid;
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
                url: '/pages/details/details?bookId=' + bookId + "&chapterId=" + chapterId + "&desc=" + that.data.bookstoreList[index].desc + "&imgUrl=" + that.data.bookstoreList[index].imgUrl
            })
          }
        })
    },
    // 关键字高亮
    lightWord(key, word) {
        let idx = word.indexOf(key),
            t = [];

        if (idx > -1) {
            if (idx == 0) {
                t = this.lightWord(key, word.substr(key.length));
                t.unshift({
                    key: true,
                    str: key
                });
                return t;
            }

            if (idx > 0) {
                t = this.lightWord(key, word.substr(idx));
                t.unshift({
                    key: false,
                    str: word.substring(0, idx)
                });
                return t;
            }
        }
        return [{
            key: false,
            str: word
        }];
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            keyword: options.keyword
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
        var that = this;
        wx.request({
            // https://wxapp.qidian.com/ajax/search/list?kw=%E5%AE%8C%E7%BE%8E%E4%B8%96%E7%95%8C&pageNum=1
            url: 'https://wxapp.qidian.com/ajax/search/list?kw='+this.data.keyword+'&pageNum=1',
            success: (res) => {
                console.log(res);
                var arr = []
                res.data.data.bookInfo.records.forEach(item => {
                    arr.push({
                        cbid: item.cbid,
                        bid: item.bid,
                        bName: item.bName,
                        desc: item.desc,
                        catId: item.catId,
                        cat: item.cat,
                        subCateId: item.subCateId,
                        subCateName: item.subCateName,
                        subCateUrl: item.subCateUrl,
                        cid: item.cid,
                        bAuth: item.bAuth,
                        state: item.state,
                        signStatus: item.signStatus,
                        imgUrl: "https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150",
                        isVip: item.isVip,
                        lastChapterName: item.lastChapterName,
                        lastUpdateTime: item.lastUpdateTime,
                        bookType: item.bookType,
                        isPub: item.isPub,
                        updateTime: item.updateTime,
                        algInfo: item.algInfo,
                        clickCnt: item.clickCnt,
                        recomendCnt: item.recomendCnt,
                        cnt: item.cnt,
                        isInShelf: item.isInShelf
                    });
                });
                this.setData({
                    bookstoreList: arr
                });
                for (let i = 0; i < this.data.bookstoreList.length; i++) {
                    // console.log(this.data.bookstoreList[i].bName);
                    this.data.bookstoreList[i].bName = this.lightWord(this.data.keyword, this.data.bookstoreList[i].bName);
                }
                this.setData({
                    bookstoreList: this.data.bookstoreList
                });
                // console.log(this.data.bookstoreList);
            }
        })
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