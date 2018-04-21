'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_wepy$page) {
  _inherits(Main, _wepy$page);

  function Main() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Main);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Main.__proto__ || Object.getPrototypeOf(Main)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '推荐',
      usingComponents: {
        'wxc-toast': '../../packages/@minui/wxc-toast/dist/index',
        'wxc-flex': '../../packages/@minui/wxc-flex/dist/index'
      }
    }, _this2.$repeat = {}, _this2.$props = { "goods": { "xmlns:v-bind": "", "v-bind:goodsItem.once": "goods", "xmlns:v-on": "" }, "load": { "xmlns:wx": "" } }, _this2.$events = { "goods": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      goods: _goods2.default,
      load: _loading2.default
    }, _this2.data = {
      winWidth: 0,
      winHeight: 0,
      bannerLink: [{ path: '../image/bg-bannerA@2x.png', id: 'png1' }, { path: '../image/bg-bannerB@2x.png', id: 'png2' }, { path: '../image/bg-bannerC@2x.png', id: 'png3' }, { path: '../image/bg-bannerD@2x.png', id: 'png4' }],
      topnavigation: ['推荐', '热门', '搜索'],
      currentPage: 0,
      pageauto: false,
      swiperOpt: {
        autoplay: true,
        interval: 2000,
        duration: 1000,
        currentTab: 0,
        indicatorDots: true,
        indicatorColor: '#cccccc',
        indicatorActive: '#ff6600'
      },
      pageTab: {
        currentPage: 1
      },
      catogary: [{ path: '../image/login-bg.jpg', title: '肉禽' }, { path: '../image/login-bg.jpg', title: '水产' }, { path: '../image/login-bg.jpg', title: '厨具' }, { path: '../image/login-bg.jpg', title: '酒饮' }],
      scrollTop: 0,
      cross: 'stretch',
      baseHeight: 101,
      goods: [{
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1231123'
      }, {
        path: '../image/login-bg.jpg',
        title: '美国自然牛精选后腿小方',
        price: '99.0',
        oldprice: '160.0',
        id: '1234321'
      }],
      loaded: false
    }, _this2.methods = {
      navTab: function navTab(index) {
        this.currentPage = index;
      },
      changeTab: function changeTab(e) {
        this.currentPage = e.detail.current;
      },
      changeBanner: function changeBanner(e) {
        this.swiperOpt.currentTab = e.detail.current;
      },
      bindDownLoad: function bindDownLoad() {
        console.log('到底了');
        // 显示加载状态
        _wepy2.default.showLoading({
          title: '加载中',
          icon: 'loading'
        });
        // 发送请求并显示新数据
        // 请求成功后隐藏loading
        setTimeout(function () {
          _wepy2.default.hideLoading();
        }, 1000);
      },
      bindtop: function bindtop() {
        var _this3 = this;

        this.loaded = true;
        // 页面初始为第一页 并发送请求
        setTimeout(function () {
          _this3.loaded = false;
        }, 3000);
      },
      goDetail: function goDetail(id) {
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Main, [{
    key: 'onShow',
    value: function onShow() {
      var token = _wepy2.default.getStorageSync('token');
      console.log(token);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winWidth = res.windowWidth;
          _this.winHeight = res.windowHeight;
          console.log(res.windowHeight, res.screenHeight);
        }
      });
      this.$apply();
    }
  }]);

  return Main;
}(_wepy2.default.page);

exports.default = Main;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LWJhY2t1cC5qcyJdLCJuYW1lcyI6WyJNYWluIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsInVzaW5nQ29tcG9uZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImdvb2RzIiwibG9hZCIsImRhdGEiLCJ3aW5XaWR0aCIsIndpbkhlaWdodCIsImJhbm5lckxpbmsiLCJwYXRoIiwiaWQiLCJ0b3BuYXZpZ2F0aW9uIiwiY3VycmVudFBhZ2UiLCJwYWdlYXV0byIsInN3aXBlck9wdCIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsImN1cnJlbnRUYWIiLCJpbmRpY2F0b3JEb3RzIiwiaW5kaWNhdG9yQ29sb3IiLCJpbmRpY2F0b3JBY3RpdmUiLCJwYWdlVGFiIiwiY2F0b2dhcnkiLCJ0aXRsZSIsInNjcm9sbFRvcCIsImNyb3NzIiwiYmFzZUhlaWdodCIsInByaWNlIiwib2xkcHJpY2UiLCJsb2FkZWQiLCJtZXRob2RzIiwibmF2VGFiIiwiaW5kZXgiLCJjaGFuZ2VUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImNoYW5nZUJhbm5lciIsImJpbmREb3duTG9hZCIsImNvbnNvbGUiLCJsb2ciLCJzaG93TG9hZGluZyIsImljb24iLCJzZXRUaW1lb3V0IiwiaGlkZUxvYWRpbmciLCJiaW5kdG9wIiwiZ29EZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsIl90aGlzIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsInNjcmVlbkhlaWdodCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztxTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsSUFEakI7QUFFUEMsdUJBQWlCO0FBQ2YscUJBQWEsNENBREU7QUFFZixvQkFBWTtBQUZHO0FBRlYsSyxTQU9WQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxTQUFRLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLE9BQTNDLEVBQW1ELGNBQWEsRUFBaEUsRUFBVCxFQUE2RSxRQUFPLEVBQUMsWUFBVyxFQUFaLEVBQXBGLEUsU0FDVEMsTyxHQUFVLEVBQUMsU0FBUSxFQUFDLGlCQUFnQixVQUFqQixFQUFULEUsU0FDVEMsVSxHQUFhO0FBQ1JDLDRCQURRO0FBRVJDO0FBRlEsSyxTQUlWQyxJLEdBQU87QUFDTEMsZ0JBQVUsQ0FETDtBQUVMQyxpQkFBVyxDQUZOO0FBR0xDLGtCQUFZLENBQUMsRUFBQ0MsTUFBTSw0QkFBUCxFQUFxQ0MsSUFBSSxNQUF6QyxFQUFELEVBQW1ELEVBQUNELE1BQU0sNEJBQVAsRUFBcUNDLElBQUksTUFBekMsRUFBbkQsRUFBcUcsRUFBQ0QsTUFBTSw0QkFBUCxFQUFxQ0MsSUFBSSxNQUF6QyxFQUFyRyxFQUF1SixFQUFDRCxNQUFNLDRCQUFQLEVBQXFDQyxJQUFJLE1BQXpDLEVBQXZKLENBSFA7QUFJTEMscUJBQWUsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FKVjtBQUtMQyxtQkFBYSxDQUxSO0FBTUxDLGdCQUFVLEtBTkw7QUFPTEMsaUJBQVc7QUFDVEMsa0JBQVUsSUFERDtBQUVUQyxrQkFBVSxJQUZEO0FBR1RDLGtCQUFVLElBSEQ7QUFJVEMsb0JBQVksQ0FKSDtBQUtUQyx1QkFBZSxJQUxOO0FBTVRDLHdCQUFnQixTQU5QO0FBT1RDLHlCQUFpQjtBQVBSLE9BUE47QUFnQkxDLGVBQVM7QUFDUFYscUJBQWE7QUFETixPQWhCSjtBQW1CTFcsZ0JBQVUsQ0FBQyxFQUFDZCxNQUFNLHVCQUFQLEVBQWdDZSxPQUFPLElBQXZDLEVBQUQsRUFBK0MsRUFBQ2YsTUFBTSx1QkFBUCxFQUFnQ2UsT0FBTyxJQUF2QyxFQUEvQyxFQUE2RixFQUFDZixNQUFNLHVCQUFQLEVBQWdDZSxPQUFPLElBQXZDLEVBQTdGLEVBQTJJLEVBQUNmLE1BQU0sdUJBQVAsRUFBZ0NlLE9BQU8sSUFBdkMsRUFBM0ksQ0FuQkw7QUFvQkxDLGlCQUFXLENBcEJOO0FBcUJMQyxhQUFPLFNBckJGO0FBc0JMQyxrQkFBWSxHQXRCUDtBQXVCTHhCLGFBQU8sQ0FBQztBQUNOTSxjQUFNLHVCQURBO0FBRU5lLGVBQU8sYUFGRDtBQUdOSSxlQUFPLE1BSEQ7QUFJTkMsa0JBQVUsT0FKSjtBQUtObkIsWUFBSTtBQUxFLE9BQUQsRUFNSjtBQUNERCxjQUFNLHVCQURMO0FBRURlLGVBQU8sYUFGTjtBQUdESSxlQUFPLE1BSE47QUFJREMsa0JBQVUsT0FKVDtBQUtEbkIsWUFBSTtBQUxILE9BTkksQ0F2QkY7QUFvQ0xvQixjQUFRO0FBcENILEssU0F1Q1BDLE8sR0FBVTtBQUNSQyxZQURRLGtCQUNBQyxLQURBLEVBQ087QUFDYixhQUFLckIsV0FBTCxHQUFtQnFCLEtBQW5CO0FBQ0QsT0FITztBQUlSQyxlQUpRLHFCQUlHQyxDQUpILEVBSU07QUFDWixhQUFLdkIsV0FBTCxHQUFtQnVCLEVBQUVDLE1BQUYsQ0FBU0MsT0FBNUI7QUFDRCxPQU5PO0FBT1JDLGtCQVBRLHdCQU9NSCxDQVBOLEVBT1M7QUFDZixhQUFLckIsU0FBTCxDQUFlSSxVQUFmLEdBQTRCaUIsRUFBRUMsTUFBRixDQUFTQyxPQUFyQztBQUNELE9BVE87QUFVUkUsa0JBVlEsMEJBVVE7QUFDZEMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0E7QUFDQSx1QkFBS0MsV0FBTCxDQUFpQjtBQUNmbEIsaUJBQU8sS0FEUTtBQUVmbUIsZ0JBQU07QUFGUyxTQUFqQjtBQUlBO0FBQ0E7QUFDQUMsbUJBQVcsWUFBTTtBQUNmLHlCQUFLQyxXQUFMO0FBQ0QsU0FGRCxFQUVHLElBRkg7QUFHRCxPQXRCTztBQXVCUkMsYUF2QlEscUJBdUJHO0FBQUE7O0FBQ1QsYUFBS2hCLE1BQUwsR0FBYyxJQUFkO0FBQ0E7QUFDQWMsbUJBQVcsWUFBTTtBQUNmLGlCQUFLZCxNQUFMLEdBQWMsS0FBZDtBQUNELFNBRkQsRUFFRyxJQUZIO0FBR0QsT0E3Qk87QUE4QlJpQixjQTlCUSxvQkE4QkVyQyxFQTlCRixFQThCTTtBQUNaLHVCQUFLc0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLGlCQUFpQnZDO0FBRFIsU0FBaEI7QUFHRDtBQWxDTyxLOzs7Ozs2QkFvQ0E7QUFDUixVQUFNd0MsUUFBUSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQWQ7QUFDQVgsY0FBUUMsR0FBUixDQUFZUyxLQUFaO0FBQ0Q7Ozs2QkFDUztBQUNSLFVBQUlFLFFBQVEsSUFBWjtBQUNBLHFCQUFLQyxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCSCxnQkFBTTlDLFFBQU4sR0FBaUJpRCxJQUFJQyxXQUFyQjtBQUNBSixnQkFBTTdDLFNBQU4sR0FBa0JnRCxJQUFJRSxZQUF0QjtBQUNBakIsa0JBQVFDLEdBQVIsQ0FBWWMsSUFBSUUsWUFBaEIsRUFBOEJGLElBQUlHLFlBQWxDO0FBQ0Q7QUFMZ0IsT0FBbkI7QUFPQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUF4RytCLGVBQUtDLEk7O2tCQUFsQmpFLEkiLCJmaWxlIjoiaW5kZXgtYmFja3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aOqOiNkCcsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy10b2FzdCc6ICcuLi8uLi9wYWNrYWdlcy9AbWludWkvd3hjLXRvYXN0L2Rpc3QvaW5kZXgnLFxuICAgICAgICAnd3hjLWZsZXgnOiAnLi4vLi4vcGFja2FnZXMvQG1pbnVpL3d4Yy1mbGV4L2Rpc3QvaW5kZXgnXG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJnb29kc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLm9uY2VcIjpcImdvb2RzXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJsb2FkXCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7XCJnb29kc1wiOntcInYtb246Z29vZHNUYXBcIjpcImdvRGV0YWlsXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBnb29kczogR29vZHMsXG4gICAgICBsb2FkOiBMb2FkaW5nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB3aW5XaWR0aDogMCxcbiAgICAgIHdpbkhlaWdodDogMCxcbiAgICAgIGJhbm5lckxpbms6IFt7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckFAMngucG5nJywgaWQ6ICdwbmcxJ30sIHtwYXRoOiAnLi4vaW1hZ2UvYmctYmFubmVyQkAyeC5wbmcnLCBpZDogJ3BuZzInfSwge3BhdGg6ICcuLi9pbWFnZS9iZy1iYW5uZXJDQDJ4LnBuZycsIGlkOiAncG5nMyd9LCB7cGF0aDogJy4uL2ltYWdlL2JnLWJhbm5lckRAMngucG5nJywgaWQ6ICdwbmc0J31dLFxuICAgICAgdG9wbmF2aWdhdGlvbjogWyfmjqjojZAnLCAn54Ot6ZeoJywgJ+aQnOe0oiddLFxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICBwYWdlYXV0bzogZmFsc2UsXG4gICAgICBzd2lwZXJPcHQ6IHtcbiAgICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICAgIGludGVydmFsOiAyMDAwLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgaW5kaWNhdG9yRG90czogdHJ1ZSxcbiAgICAgICAgaW5kaWNhdG9yQ29sb3I6ICcjY2NjY2NjJyxcbiAgICAgICAgaW5kaWNhdG9yQWN0aXZlOiAnI2ZmNjYwMCdcbiAgICAgIH0sXG4gICAgICBwYWdlVGFiOiB7XG4gICAgICAgIGN1cnJlbnRQYWdlOiAxXG4gICAgICB9LFxuICAgICAgY2F0b2dhcnk6IFt7cGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsIHRpdGxlOiAn6IKJ56a9J30sIHtwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJywgdGl0bGU6ICfmsLTkuqcnfSwge3BhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLCB0aXRsZTogJ+WOqOWFtyd9LCB7cGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsIHRpdGxlOiAn6YWS6aWuJ31dLFxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgY3Jvc3M6ICdzdHJldGNoJyxcbiAgICAgIGJhc2VIZWlnaHQ6IDEwMSxcbiAgICAgIGdvb2RzOiBbe1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjMxMTIzJ1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgdGl0bGU6ICfnvo7lm73oh6rnhLbniZvnsr7pgInlkI7ohb/lsI/mlrknLFxuICAgICAgICBwcmljZTogJzk5LjAnLFxuICAgICAgICBvbGRwcmljZTogJzE2MC4wJyxcbiAgICAgICAgaWQ6ICcxMjM0MzIxJ1xuICAgICAgfV0sXG4gICAgICBsb2FkZWQ6IGZhbHNlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIG5hdlRhYiAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IGluZGV4XG4gICAgICB9LFxuICAgICAgY2hhbmdlVGFiIChlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgY2hhbmdlQmFubmVyIChlKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyT3B0LmN1cnJlbnRUYWIgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICB9LFxuICAgICAgYmluZERvd25Mb2FkICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+WIsOW6leS6hicpXG4gICAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnXG4gICAgICAgIH0pXG4gICAgICAgIC8vIOWPkemAgeivt+axguW5tuaYvuekuuaWsOaVsOaNrlxuICAgICAgICAvLyDor7fmsYLmiJDlip/lkI7pmpDol49sb2FkaW5nXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICB9LCAxMDAwKVxuICAgICAgfSxcbiAgICAgIGJpbmR0b3AgKCkge1xuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWVcbiAgICAgICAgLy8g6aG16Z2i5Yid5aeL5Li656ys5LiA6aG1IOW5tuWPkemAgeivt+axglxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlXG4gICAgICAgIH0sIDMwMDApXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgIGNvbnNvbGUubG9nKHRva2VuKVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgd2VweS5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIF90aGlzLndpbldpZHRoID0gcmVzLndpbmRvd1dpZHRoXG4gICAgICAgICAgX3RoaXMud2luSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aW5kb3dIZWlnaHQsIHJlcy5zY3JlZW5IZWlnaHQpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=