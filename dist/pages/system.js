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
          _this.$parent.showFail();
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
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initData();
    }
  }]);

  return System;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(System , 'pages/system'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbS5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwibm90aWNlVHlwZSIsIm5vdGljZUxpc3QiLCJjdXJyZW50Iiwic3lzdGVtTm90aWNlIiwib3JkZXJOb3RpY2UiLCJtZXRob2RzIiwiY2hhbmdlVHlwZSIsImluZGV4IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwiY29tcHV0ZWQiLCJzeXN0ZW1Jc051bGwiLCJsZW5ndGgiLCJvcmRlcklzTnVsbCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsIl90aGlzIiwiSHR0cFJlcXVlc3QiLCJHZXROb3RpY2UiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJub3RpY2UiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsInR5cGUiLCJjb250ZW50IiwidGltZSIsImRhdGVGb3JtYXQiLCJjcmVhdGVUaW1lIiwicHVzaCIsImZpbHRlciIsInNob3dGYWlsIiwiJGFwcGx5IiwiY2F0Y2giLCJpbml0RGF0YSIsImNvbGxlY3RMaXN0IiwiaXNEb3duIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZ0JBQVUsQ0FGTDtBQUdMQyxlQUFTLENBSEo7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxrQkFBWSxDQUFDLE1BQUQsRUFBUyxNQUFULENBTFA7QUFNTEMsa0JBQVksRUFOUDtBQU9MQyxlQUFTLENBUEo7QUFRTEMsb0JBQWMsSUFSVDtBQVNMQyxt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LFFBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUtDLFdBQUwsQ0FBaUI1QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLNkIsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtoRCxLQUFMLEdBQWEsS0FBS3FCLE9BQUwsQ0FBYTRCLFFBQWIsRUFBYjtBQUNBLFdBQUtMLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0UsUUFBTDtBQUNEOzs7O0VBakdpQyxlQUFLSSxJOztrQkFBcEJ0RCxNIiwiZmlsZSI6InN5c3RlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ezu+e7n+a2iOaBrydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBub3RpY2VUeXBlOiBbJ+ezu+e7n+mAmuefpScsICforqLljZXpgJrnn6UnXSxcbiAgICAgIG5vdGljZUxpc3Q6IFtdLFxuICAgICAgY3VycmVudDogMCxcbiAgICAgIHN5c3RlbU5vdGljZTogbnVsbCxcbiAgICAgIG9yZGVyTm90aWNlOiBudWxsXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBjaGFuZ2VUeXBlIChpbmRleCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleFxuICAgICAgfVxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1widHlwZVwiOlwiNlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHN5c3RlbUlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN5c3RlbU5vdGljZSAmJiB0aGlzLnN5c3RlbU5vdGljZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3JkZXJJc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5vcmRlck5vdGljZSAmJiB0aGlzLm9yZGVyTm90aWNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdERhdGEgKCkge1xuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE5vdGljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICBfdGhpcy5zeXN0ZW1Ob3RpY2UgPSBbXVxuICAgICAgICAgIF90aGlzLm9yZGVyTm90aWNlID0gW11cbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBfdGhpcy50b3RhbFBhZ2VOdW0gPSBkYXRhLnRvdGFsUGFnZU51bVxuICAgICAgICAgIGRhdGEubm90aWNlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnR5cGUgPSBpdGVtLnR5cGVcbiAgICAgICAgICAgIG9iai5jb250ZW50ID0gaXRlbS5jb250ZW50XG4gICAgICAgICAgICBvYmoudGltZSA9IF90aGlzLiRwYXJlbnQuZGF0ZUZvcm1hdChpdGVtLmNyZWF0ZVRpbWUgKiAxMDAwLCAnWS1tLWQgSDptJylcbiAgICAgICAgICAgIF90aGlzLm5vdGljZUxpc3QucHVzaChvYmopXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5vcmRlck5vdGljZSA9IF90aGlzLm5vdGljZUxpc3QuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS50eXBlID09PSAxXG4gICAgICAgICAgfSlcbiAgICAgICAgICBfdGhpcy5zeXN0ZW1Ob3RpY2UgPSBfdGhpcy5ub3RpY2VMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gMlxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblJlYWNoQm90dG9tICgpIHtcbiAgICAgIC8vIOaYvuekuuWKoOi9veeKtuaAgVxuICAgICAgaWYgKHRoaXMucGFnZU51bSA8IHRoaXMudG90YWxQYWdlTnVtKSB7XG4gICAgICAgIC8vIOaYvuekuuS4i+S4gOmhteaVsOaNrlxuICAgICAgICB0aGlzLnBhZ2VOdW0gKytcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0TGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICB0aGlzLmlzRG93biA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICB9XG4gIH1cbiJdfQ==