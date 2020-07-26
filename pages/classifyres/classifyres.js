// pages/classifyres/classifyres.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active:0,
        catId:'',
        subCatId:'',
        orderBy:'',
        gender:'',
        pageNum:1,
        classifyresList:[],
        windowWidth:'',
        floorstatus:false,
        loadstatus:true
    },
    onChange(event) {
        console.log(event.detail.name);
        switch (event.detail.name) {
            case 0:
                this.setData({
                    orderBy:''
                });
                break;
            case 1:
                this.setData({
                    orderBy:'4'
                });
                break;
            case 2:
                this.setData({
                    orderBy:'3'
                });
                break;
            case 3:
                this.setData({
                    orderBy:'11'
                });
                break;
            case 4:
                this.setData({
                    orderBy:'9'
                });
                break;
            case 5:
                this.setData({
                    orderBy:'1'
                });
                break;
        }
        console.log('onChange-----------',this.data.orderBy);
        wx.request({
            url: 'https://m.qidian.com/majax/category/list',
            data: {
                _csrfToken:'h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa',
                gender:this.data.gender,
                pageNum:this.data.pageNum,
                orderBy:this.data.orderBy,
                catId:this.data.catId,
                subCatId:this.data.subCatId
            },
            success: res=>{
                this.setData({
                    classifyresList:[],
                    pageNum:1,
                    loadstatus:true
                });
                // console.log('onChange-----------',res.data.data.records);
                res.data.data.records.forEach(item=>{
                    this.data.classifyresList.push({
                        bookId:item.bid,
                        chapterId:item.cid,
                        bookAuth:item.bAuth,
                        bookName:item.bName,
                        cat:item.cat,
                        cnt:item.cnt,
                        desc:item.desc,
                        state:item.state,
                        imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150"
                    });
                });
                this.setData({
                    classifyresList:this.data.classifyresList
                });
                console.log('onChange-----------',this.data.classifyresList);
            }
        })
    },
    // 获取设备宽高
    getSize(){
        wx.getSystemInfo({
            success: res=>{
                this.setData({
                    windowWidth:res.windowWidth
                })
            }
        })
    },
    goDetails(options){
        var index = options.target.dataset.id;
        // console.log(index);
        var bookId = this.data.classifyresList[index].bookId;
        var desc = this.data.classifyresList[index].desc;
        var imgUrl = this.data.classifyresList[index].imgUrl;
        console.log(bookId);
        console.log(chapterId);
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
                url: '/pages/details/details?bookId=' + bookId + "&chapterId=" + chapterId + "&desc=" + desc + "&imgUrl=" + imgUrl
            })
          }
        })
    },
    onPageScroll(e){
        if (e.scrollTop > 100) {
        this.setData({
            floorstatus: true
        });
        } else {
        this.setData({
            floorstatus: false
        });
        }
    },
    //回到顶部
    goTop(e) {  // 一键回到顶部
        if (wx.pageScrollTo) {
        wx.pageScrollTo({
            scrollTop: 0
        })
        } else {
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSize();
        console.log(options);
        this.setData({
            catId:options.catId,
            subCatId:options.subCatId,
            gender:options.gender
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
        console.log('onshow-----------orderBy',this.data.orderBy);
        wx.request({
            url: 'https://m.qidian.com/majax/category/list',
            data: {
                _csrfToken:'h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa',
                gender:this.data.gender,
                pageNum:this.data.pageNum,
                orderBy:this.data.orderBy,
                catId:this.data.catId,
                subCatId:this.data.subCatId
            },
            success: res=>{
                this.setData({
                    classifyresList:[],
                    pageNum:1
                });
                // console.log('onChange-----------',res.data.data.records);
                res.data.data.records.forEach(item=>{
                    this.data.classifyresList.push({
                        bookId:item.bid,
                        chapterId:item.cid,
                        bookAuth:item.bAuth,
                        bookName:item.bName,
                        cat:item.cat,
                        cnt:item.cnt,
                        desc:item.desc,
                        state:item.state,
                        imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150"
                    });
                });
                this.setData({
                    classifyresList:this.data.classifyresList
                });
                console.log('onShow-----------',this.data.classifyresList);
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
        this.setData({
            pageNum:this.data.pageNum + 1
        });
        wx.request({
            url: 'https://m.qidian.com/majax/category/list',
            data: {
                _csrfToken:'h0Znvo9JVsFVtjre2axjjKRbiGW0HUzogJJu57Xa',
                gender:this.data.gender,
                pageNum:this.data.pageNum,
                orderBy:this.data.orderBy,
                catId:this.data.catId,
                subCatId:this.data.subCatId
            },
            success: res=>{
                if(res.data.data.records==[]){
                    Toast.fail('没有更多数据了');
                    this.setData({
                        loadstatus:false
                    })
                    return;

                }
                this.setData({
                    loadstatus:false
                })
                // console.log('onChange-----------',res.data.data.records);
                res.data.data.records.forEach(item=>{
                    this.data.classifyresList.push({
                        bookId:item.bid,
                        chapterId:item.cid,
                        bookAuth:item.bAuth,
                        bookName:item.bName,
                        cat:item.cat,
                        cnt:item.cnt,
                        desc:item.desc,
                        state:item.state,
                        imgUrl:"https://bookcover.yuewen.com/qdbimg/349573/"+item.bid+"/150"
                    });
                });
                this.setData({
                    classifyresList:this.data.classifyresList
                });
                console.log('onShow-----------',this.data.classifyresList);
            }
        })
        this.setData({
            loadstatus:true
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})