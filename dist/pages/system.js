'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var System = function (_wepy$page) {
  _inherits(System, _wepy$page);

  function System() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, System);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = System.__proto__ || Object.getPrototypeOf(System)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '系统消息'
    }, _this2.data = {
      token: '',
      pageSize: 5,
      pageNum: 1,
      totalPageNum: '',
      noticeType: ['系统通知', '订单通知'],
      noticeList: [],
      current: 0,
      systemNotice: null,
      orderNotice: null
    }, _this2.methods = {
      changeType: function changeType(index) {
        this.current = index;
      }
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "type": "6" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.computed = {
      systemIsNull: function systemIsNull() {
        if (this.systemNotice && this.systemNotice.length === 0) {
          return true;
        } else {
          return false;
        }
      },
      orderIsNull: function orderIsNull() {
        if (this.orderNotice && this.orderNotice.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(System, [{
    key: 'initData',
    value: function initData() {
      this.$parent.showLoading();
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetNotice(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          _this.systemNotice = [];
          _this.orderNotice = [];
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          data.notice.forEach(function (item) {
            var obj = {};
            obj.type = item.type;
            obj.content = item.content;
            obj.time = _this.$parent.dateFormat(item.createTime * 1000, 'Y-m-d H:m');
            _this.noticeList.push(obj);
          });
          _this.orderNotice = _this.noticeList.filter(function (item) {
            return item.type === 1;
          });
          _this.systemNotice = _this.noticeList.filter(function (item) {
            return item.type === 2;
          });
        } else {
          if (_this.$parent.missToken) {
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.initData();
      } else {
        if (this.collectList.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.current = 0;
      this.pageNum = 1;
      this.initData();
      this.$apply();
    }
  }]);

  return System;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(System , 'pages/system'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbS5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwibm90aWNlVHlwZSIsIm5vdGljZUxpc3QiLCJjdXJyZW50Iiwic3lzdGVtTm90aWNlIiwib3JkZXJOb3RpY2UiLCJtZXRob2RzIiwiY2hhbmdlVHlwZSIsImluZGV4IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwiY29tcHV0ZWQiLCJzeXN0ZW1Jc051bGwiLCJsZW5ndGgiLCJvcmRlcklzTnVsbCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldE5vdGljZSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiaGlkZUxvYWRpbmciLCJlcnJvciIsIm5vdGljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidHlwZSIsImNvbnRlbnQiLCJ0aW1lIiwiZGF0ZUZvcm1hdCIsImNyZWF0ZVRpbWUiLCJwdXNoIiwiZmlsdGVyIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCIkYXBwbHkiLCJjYXRjaCIsImNvbGxlY3RMaXN0IiwiaXNEb3duIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7Ozt5TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGdCQUFVLENBRkw7QUFHTEMsZUFBUyxDQUhKO0FBSUxDLG9CQUFjLEVBSlQ7QUFLTEMsa0JBQVksQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUxQO0FBTUxDLGtCQUFZLEVBTlA7QUFPTEMsZUFBUyxDQVBKO0FBUUxDLG9CQUFjLElBUlQ7QUFTTEMs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RDs7O29DQUNnQjtBQUNmO0FBQ0EsVUFBSSxLQUFLN0IsT0FBTCxHQUFlLEtBQUtDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0QsT0FBTDtBQUNBLGFBQUsyQyxRQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSSxLQUFLRyxXQUFMLENBQWlCN0IsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBSzhCLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRjtBQUNGOzs7NkJBQ1M7QUFDUixXQUFLSCxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUt4QyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFdBQUtKLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBSzJDLFFBQUw7QUFDQSxXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUF2R2lDLGVBQUtJLEk7O2tCQUFwQnRELE0iLCJmaWxlIjoic3lzdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn57O757uf5raI5oGvJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgcGFnZVNpemU6IDUsXG4gICAgICBwYWdlTnVtOiAxLFxuICAgICAgdG90YWxQYWdlTnVtOiAnJyxcbiAgICAgIG5vdGljZVR5cGU6IFsn57O757uf6YCa55+lJywgJ+iuouWNlemAmuefpSddLFxuICAgICAgbm90aWNlTGlzdDogW10sXG4gICAgICBjdXJyZW50OiAwLFxuICAgICAgc3lzdGVtTm90aWNlOiBudWxsLFxuICAgICAgb3JkZXJOb3RpY2U6IG51bGxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZVR5cGUgKGluZGV4KSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IGluZGV4XG4gICAgICB9XG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCI2XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgc3lzdGVtSXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtTm90aWNlICYmIHRoaXMuc3lzdGVtTm90aWNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvcmRlcklzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9yZGVyTm90aWNlICYmIHRoaXMub3JkZXJOb3RpY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0RGF0YSAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXROb3RpY2UoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLnN5c3RlbU5vdGljZSA9IFtdXG4gICAgICAgICAgX3RoaXMub3JkZXJOb3RpY2UgPSBbXVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5ub3RpY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudHlwZSA9IGl0ZW0udHlwZVxuICAgICAgICAgICAgb2JqLmNvbnRlbnQgPSBpdGVtLmNvbnRlbnRcbiAgICAgICAgICAgIG9iai50aW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGl0ZW0uY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOm0nKVxuICAgICAgICAgICAgX3RoaXMubm90aWNlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLm9yZGVyTm90aWNlID0gX3RoaXMubm90aWNlTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09IDFcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnN5c3RlbU5vdGljZSA9IF90aGlzLm5vdGljZUxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAyXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLmluaXREYXRhKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIC8vIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IDBcbiAgICAgIHRoaXMucGFnZU51bSA9IDFcbiAgICAgIHRoaXMuaW5pdERhdGEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19