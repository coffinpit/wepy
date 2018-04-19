import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    topnavigation: [{
        title: '首页',
        url: './index'
      }, {
        title: '热门',
        url: './hot'
      }, {
        title: '搜索',
        url: './search'
      }]
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
