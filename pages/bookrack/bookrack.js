// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: wx.getSystemInfoSync().windowHeight,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    islogin: false,
    userInfo: null,
    chapterId:'',
    desc:'',
    collectList:[]
  },
  wxLoginTap(e) {
    console.log("onshow触发");
    let _this = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.getUserInfo({
            success: function ({ userInfo }) {
            //   console.log(res.userInfo);
              _this.setData({ 
                userInfo,
                islogin:true
              });
              wx.setStorageSync('userInfo', userInfo);
              wx.setStorageSync('collectList', []);
            },
          });
        } else {
          console.log("登录失败");
        }
      },
    });
    console.log(this.data.userInfo);
  },
  clearArray(arr){
    var newArr = [] ;
    arr.forEach(item=>{
      if(newArr.indexOf(item)){
        newArr.push(item);
      }
    })
    return newArr;
  },
  goRead(options){
    var index = options.currentTarget.dataset.id;
    var bookId = this.data.collectList[index].bookId;
    console.log(bookId);
    this.data.collectList.forEach(item=>{
      if(item.bookId == bookId){
        this.setData({
          chapterId:item.chapterId,
          desc:item.desc
        })
      }
    });
    console.log(this.data.chapterId);
    console.log(this.data.desc);
    wx.navigateTo({
      url: '../read/read?bookId=' + bookId + "&chapterId=" + this.data.chapterId + "&num=0&desc=" + this.data.desc,
  })
  },
  stick(options){
    var index = options.currentTarget.dataset.id;
    this.data.collectList.unshift(this.data.collectList[index]);
    this.setData({
      collectList:this.clearArray(this.data.collectList)
    })
    console.log(this.data.collectList);
    wx.setStorageSync('collectList', this.data.collectList);
  },
  delete(options){
    var index = options.currentTarget.dataset.id;
    this.data.collectList.splice(index,1);
    this.setData({
      collectList:this.clearArray(this.data.collectList)
    })
    console.log(this.data.collectList);
    wx.setStorageSync('collectList', this.data.collectList);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.userInfo = wx.getStorageSync('userInfo');
    this.data.collectList = wx.getStorageSync('collectList');
    this.setData({
      userInfo:this.data.userInfo,
      collectList:this.clearArray(this.data.collectList)
    });
    console.log("onshow----------",this.data.userInfo);
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
