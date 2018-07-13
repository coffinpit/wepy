'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _menu = require('./../components/menu.js');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Custom = function (_wepy$page) {
  _inherits(Custom, _wepy$page);

  function Custom() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Custom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Custom.__proto__ || Object.getPrototypeOf(Custom)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '正善客服'
    }, _this.components = {
      menuList: _menu2.default
    }, _this.data = {
      token: '',
      nick_name: '',
      avatar: '',
      customer_info_str: '',
      note_info_str: ''
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Custom, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: '正善客服',
        path: '/pages/custom'
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.token = this.$parent.getToken();
      this.nick_name = this.$parent.getUserName() ? this.$parent.getUserName() : '';
      this.avatar = this.$parent.getUserAvatar() ? this.$parent.getUserAvatar() : '';
      this.customer_info_str = this.$parent.getMessage();
      this.note_info_str = this.$parent.getBusiness('正善客服', null, null);
    }
  }]);

  return Custom;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Custom , 'pages/custom'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbS5qcyJdLCJuYW1lcyI6WyJDdXN0b20iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1lbnVMaXN0IiwiZGF0YSIsInRva2VuIiwibmlja19uYW1lIiwiYXZhdGFyIiwiY3VzdG9tZXJfaW5mb19zdHIiLCJub3RlX2luZm9fc3RyIiwibWV0aG9kcyIsInJlcyIsInRpdGxlIiwicGF0aCIsIiRhcHBseSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsImdldFVzZXJOYW1lIiwiZ2V0VXNlckF2YXRhciIsImdldE1lc3NhZ2UiLCJnZXRCdXNpbmVzcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxJLEdBQU87QUFDTEMsYUFBTyxFQURGO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsY0FBUSxFQUhIO0FBSUxDLHlCQUFtQixFQUpkO0FBS0xDLHFCQUFlO0FBTFYsSyxRQU9QQyxPLEdBQVUsRTs7Ozs7c0NBRVNDLEcsRUFBSztBQUN0QixhQUFPO0FBQ0xDLGVBQU8sTUFERjtBQUVMQyxjQUFNO0FBRkQsT0FBUDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtULEtBQUwsR0FBYSxLQUFLVSxPQUFMLENBQWFDLFFBQWIsRUFBYjtBQUNBLFdBQUtWLFNBQUwsR0FBaUIsS0FBS1MsT0FBTCxDQUFhRSxXQUFiLEtBQTZCLEtBQUtGLE9BQUwsQ0FBYUUsV0FBYixFQUE3QixHQUEwRCxFQUEzRTtBQUNBLFdBQUtWLE1BQUwsR0FBYyxLQUFLUSxPQUFMLENBQWFHLGFBQWIsS0FBK0IsS0FBS0gsT0FBTCxDQUFhRyxhQUFiLEVBQS9CLEdBQThELEVBQTVFO0FBQ0EsV0FBS1YsaUJBQUwsR0FBeUIsS0FBS08sT0FBTCxDQUFhSSxVQUFiLEVBQXpCO0FBQ0EsV0FBS1YsYUFBTCxHQUFxQixLQUFLTSxPQUFMLENBQWFLLFdBQWIsQ0FBeUIsTUFBekIsRUFBaUMsSUFBakMsRUFBdUMsSUFBdkMsQ0FBckI7QUFDRDs7OztFQS9CaUMsZUFBS0MsSTs7a0JBQXBCdEIsTSIsImZpbGUiOiJjdXN0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IE1lbnUgZnJvbSAnLi4vY29tcG9uZW50cy9tZW51J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ato+WWhOWuouacjSdcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIG1lbnVMaXN0OiBNZW51XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBuaWNrX25hbWU6ICcnLFxuICAgICAgYXZhdGFyOiAnJyxcbiAgICAgIGN1c3RvbWVyX2luZm9fc3RyOiAnJyxcbiAgICAgIG5vdGVfaW5mb19zdHI6ICcnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlIChyZXMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAn5q2j5ZaE5a6i5pyNJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9jdXN0b20nXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMubmlja19uYW1lID0gdGhpcy4kcGFyZW50LmdldFVzZXJOYW1lKCkgPyB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKSA6ICcnXG4gICAgICB0aGlzLmF2YXRhciA9IHRoaXMuJHBhcmVudC5nZXRVc2VyQXZhdGFyKCkgPyB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpIDogJydcbiAgICAgIHRoaXMuY3VzdG9tZXJfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0TWVzc2FnZSgpXG4gICAgICB0aGlzLm5vdGVfaW5mb19zdHIgPSB0aGlzLiRwYXJlbnQuZ2V0QnVzaW5lc3MoJ+ato+WWhOWuouacjScsIG51bGwsIG51bGwpXG4gICAgfVxuICB9XG4iXX0=