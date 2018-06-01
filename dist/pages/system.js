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
        _this.$parent.showSuccess();
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
            _this.token = _this3.$parent.getToken(res.data.error);
            _this.initData();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showSuccess();
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
      this.$apply();
    }
  }]);

  return System;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(System , 'pages/system'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbS5qcyJdLCJuYW1lcyI6WyJTeXN0ZW0iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwicGFnZVNpemUiLCJwYWdlTnVtIiwidG90YWxQYWdlTnVtIiwibm90aWNlVHlwZSIsIm5vdGljZUxpc3QiLCJjdXJyZW50Iiwic3lzdGVtTm90aWNlIiwib3JkZXJOb3RpY2UiLCJtZXRob2RzIiwiY2hhbmdlVHlwZSIsImluZGV4IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwiY29tcHV0ZWQiLCJzeXN0ZW1Jc051bGwiLCJsZW5ndGgiLCJvcmRlcklzTnVsbCIsIiRwYXJlbnQiLCJzaG93TG9hZGluZyIsImdldFRva2VuIiwiX3RoaXMiLCJIdHRwUmVxdWVzdCIsIkdldE5vdGljZSIsInRoZW4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwic2hvd1N1Y2Nlc3MiLCJlcnJvciIsIm5vdGljZSIsImZvckVhY2giLCJpdGVtIiwib2JqIiwidHlwZSIsImNvbnRlbnQiLCJ0aW1lIiwiZGF0ZUZvcm1hdCIsImNyZWF0ZVRpbWUiLCJwdXNoIiwiZmlsdGVyIiwibWlzc1Rva2VuIiwiaW5pdERhdGEiLCIkYXBwbHkiLCJjYXRjaCIsInNob3dGYWlsIiwiY29sbGVjdExpc3QiLCJpc0Rvd24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsZ0JBQVUsQ0FGTDtBQUdMQyxlQUFTLENBSEo7QUFJTEMsb0JBQWMsRUFKVDtBQUtMQyxrQkFBWSxDQUFDLE1BQUQsRUFBUyxNQUFULENBTFA7QUFNTEMsa0JBQVksRUFOUDtBQU9MQyxlQUFTLENBUEo7QUFRTEMsb0JBQWMs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Q0RyQixjQUFNc0IsTUFBTjtBQUNELE9BNUJELEVBNEJHQyxLQTVCSCxDQTRCUyxZQUFNO0FBQ2J2QixjQUFNSCxPQUFOLENBQWNVLFdBQWQ7QUFDQVAsY0FBTUgsT0FBTixDQUFjMkIsUUFBZDtBQUNELE9BL0JEO0FBZ0NEOzs7b0NBQ2dCO0FBQ2Y7QUFDQSxVQUFJLEtBQUs5QyxPQUFMLEdBQWUsS0FBS0MsWUFBeEIsRUFBc0M7QUFDcEM7QUFDQSxhQUFLRCxPQUFMO0FBQ0EsYUFBSzJDLFFBQUw7QUFDRCxPQUpELE1BSU87QUFDTCxZQUFJLEtBQUtJLFdBQUwsQ0FBaUI5QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQztBQUNqQyxlQUFLK0IsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtKLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS3hDLE9BQUwsR0FBZSxDQUFmO0FBQ0EsV0FBS0osT0FBTCxHQUFlLENBQWY7QUFDQSxXQUFLMkMsUUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7OztFQXhHaUMsZUFBS0ssSTs7a0JBQXBCdkQsTSIsImZpbGUiOiJzeXN0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW0gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfns7vnu5/mtojmga8nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBwYWdlU2l6ZTogNSxcbiAgICAgIHBhZ2VOdW06IDEsXG4gICAgICB0b3RhbFBhZ2VOdW06ICcnLFxuICAgICAgbm90aWNlVHlwZTogWyfns7vnu5/pgJrnn6UnLCAn6K6i5Y2V6YCa55+lJ10sXG4gICAgICBub3RpY2VMaXN0OiBbXSxcbiAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICBzeXN0ZW1Ob3RpY2U6IG51bGwsXG4gICAgICBvcmRlck5vdGljZTogbnVsbFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgY2hhbmdlVHlwZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgIH1cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInR5cGVcIjpcIjZcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBzeXN0ZW1Jc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5zeXN0ZW1Ob3RpY2UgJiYgdGhpcy5zeXN0ZW1Ob3RpY2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9yZGVySXNOdWxsICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJOb3RpY2UgJiYgdGhpcy5vcmRlck5vdGljZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXREYXRhICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE5vdGljZShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuc3lzdGVtTm90aWNlID0gW11cbiAgICAgICAgICBfdGhpcy5vcmRlck5vdGljZSA9IFtdXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBkYXRhLm5vdGljZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai50eXBlID0gaXRlbS50eXBlXG4gICAgICAgICAgICBvYmouY29udGVudCA9IGl0ZW0uY29udGVudFxuICAgICAgICAgICAgb2JqLnRpbWUgPSBfdGhpcy4kcGFyZW50LmRhdGVGb3JtYXQoaXRlbS5jcmVhdGVUaW1lICogMTAwMCwgJ1ktbS1kIEg6bScpXG4gICAgICAgICAgICBfdGhpcy5ub3RpY2VMaXN0LnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMub3JkZXJOb3RpY2UgPSBfdGhpcy5ub3RpY2VMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZSA9PT0gMVxuICAgICAgICAgIH0pXG4gICAgICAgICAgX3RoaXMuc3lzdGVtTm90aWNlID0gX3RoaXMubm90aWNlTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09IDJcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0RGF0YSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSAwXG4gICAgICB0aGlzLnBhZ2VOdW0gPSAxXG4gICAgICB0aGlzLmluaXREYXRhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==