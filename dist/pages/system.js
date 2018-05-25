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
      var _this3 = this;

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
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
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
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
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
    }
  }]);

  return System;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(System , 'pages/system'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbS5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwibm90aWNlVHlwZSIsIm5vdGljZUxpc3QiLCJjdXJyZW50Iiwic3lzdGVtTm90aWNlIiwib3JkZXJOb3RpY2UiLCJtZXRob2RzIiwiY2hhbmdlVHlwZSIsImluZGV4IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwiY29tcHV0ZWQiLCJzeXN0ZW1Jc051bGwiLCJsZW5ndGgiLCJvcmRlcklzTnVsbCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldE5vdGljZSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsIm5vdGljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidHlwZSIsImNvbnRlbnQiLCJ0aW1lIiwiZGF0ZUZvcm1hdCIsImNyZWF0ZVRpbWUiLCJwdXNoIiwiZmlsdGVyIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwiY29sbGVjdExpc3QiLCJpc0Rvd24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZ0JBQVUsQ0FGTDtBQUdMQyxlQUFTLENBSEo7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxrQkFBWSxDQUFDLE1BQUQsRUFBUyxNQUFULENBTFA7QUFNTEMsa0JBQVksRUFOUDtBQU9MQyxlQUFTLENBUEo7QUFRTEMsb0JBQWMs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QUNEckIsY0FBTXNCLE1BQU47QUFDRCxPQTVCRCxFQTRCR0MsS0E1QkgsQ0E0QlMsWUFBTTtBQUNidkIsY0FBTUgsT0FBTixDQUFjMkIsUUFBZDtBQUNELE9BOUJEO0FBK0JEOzs7b0NBQ2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUs5QyxPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBSzJDLFFBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUtJLFdBQUwsQ0FBaUI5QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLK0IsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtKLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS3hDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0osT0FBTCxHQUFlLENBQWY7QUFDQSxXQUFLMkMsUUFBTDtBQUNEOzs7O0VBdEdpQyxlQUFLTSxJOztrQkFBcEJ2RCxNIiwiZmlsZSI6InN5c3RlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ezu+e7n+a2iOaBrydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBub3RpY2VUeXBlOiBbJ+ezu+e7n+mAmuefpScsICforqLljZXpgJrnn6UnXSxcbiAgICAgIG5vdGljZUxpc3Q6IFtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHN5c3RlbU5vdGljZTogbnVsbCxcbiAgICAgIG9yZGVyTm90aWNlOiBudWxsXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUeXBlIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1widHlwZVwiOlwiNlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHN5c3RlbUlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbU5vdGljZSAmJiB0aGlzLnN5c3RlbU5vdGljZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3JkZXJJc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlck5vdGljZSAmJiB0aGlzLm9yZGVyTm90aWNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBwYWdlU2l6ZTogdGhpcy5wYWdlU2l6ZSxcbiAgICAgICAgcGFnZU51bTogdGhpcy5wYWdlTnVtXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0Tm90aWNlKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIF90aGlzLnN5c3RlbU5vdGljZSA9IFtdXG4gICAgICAgICAgX3RoaXMub3JkZXJOb3RpY2UgPSBbXVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgZGF0YS5ub3RpY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudHlwZSA9IGl0ZW0udHlwZVxuICAgICAgICAgICAgb2JqLmNvbnRlbnQgPSBpdGVtLmNvbnRlbnRcbiAgICAgICAgICAgIG9iai50aW1lID0gX3RoaXMuJHBhcmVudC5kYXRlRm9ybWF0KGl0ZW0uY3JlYXRlVGltZSAqIDEwMDAsICdZLW0tZCBIOm0nKVxuICAgICAgICAgICAgX3RoaXMubm90aWNlTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLm9yZGVyTm90aWNlID0gX3RoaXMubm90aWNlTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09IDFcbiAgICAgICAgICB9KVxuICAgICAgICAgIF90aGlzLnN5c3RlbU5vdGljZSA9IF90aGlzLm5vdGljZUxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAyXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdERhdGEoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==