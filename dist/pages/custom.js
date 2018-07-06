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
      this.nick_name = this.$parent.getUserName();
      this.avatar = this.$parent.getUserAvatar();
      this.customer_info_str = this.$parent.getMessage();
      this.note_info_str = this.$parent.getBusiness('正善客服', null, null);
    }
  }]);

  return Custom;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Custom , 'pages/custom'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbS5qcyJdLCJuYW1lcyI6WyJDdXN0b20iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1lbnVMaXN0IiwiZGF0YSIsIm5pY2tfbmFtZSIsImF2YXRhciIsImN1c3RvbWVyX2luZm9fc3RyIiwibm90ZV9pbmZvX3N0ciIsIm1ldGhvZHMiLCJyZXMiLCJ0aXRsZSIsInBhdGgiLCIkYXBwbHkiLCIkcGFyZW50IiwiZ2V0VXNlck5hbWUiLCJnZXRVc2VyQXZhdGFyIiwiZ2V0TWVzc2FnZSIsImdldEJ1c2luZXNzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLEksR0FBTztBQUNMQyxpQkFBVyxFQUROO0FBRUxDLGNBQVEsRUFGSDtBQUdMQyx5QkFBbUIsRUFIZDtBQUlMQyxxQkFBZTtBQUpWLEssUUFNUEMsTyxHQUFVLEU7Ozs7O3NDQUVTQyxHLEVBQUs7QUFDdEIsYUFBTztBQUNMQyxlQUFPLE1BREY7QUFFTEMsY0FBTTtBQUZELE9BQVA7QUFJRDs7OzZCQUNTO0FBQ1IsV0FBS0MsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLUixTQUFMLEdBQWlCLEtBQUtTLE9BQUwsQ0FBYUMsV0FBYixFQUFqQjtBQUNBLFdBQUtULE1BQUwsR0FBYyxLQUFLUSxPQUFMLENBQWFFLGFBQWIsRUFBZDtBQUNBLFdBQUtULGlCQUFMLEdBQXlCLEtBQUtPLE9BQUwsQ0FBYUcsVUFBYixFQUF6QjtBQUNBLFdBQUtULGFBQUwsR0FBcUIsS0FBS00sT0FBTCxDQUFhSSxXQUFiLENBQXlCLE1BQXpCLEVBQWlDLElBQWpDLEVBQXVDLElBQXZDLENBQXJCO0FBQ0Q7Ozs7RUE3QmlDLGVBQUtDLEk7O2tCQUFwQnBCLE0iLCJmaWxlIjoiY3VzdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvbWVudSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b20gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmraPlloTlrqLmnI0nXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBtZW51TGlzdDogTWVudVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgbmlja19uYW1lOiAnJyxcbiAgICAgIGF2YXRhcjogJycsXG4gICAgICBjdXN0b21lcl9pbmZvX3N0cjogJycsXG4gICAgICBub3RlX2luZm9fc3RyOiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgIH1cbiAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogJ+ato+WWhOWuouacjScsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvY3VzdG9tJ1xuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5uaWNrX25hbWUgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlck5hbWUoKVxuICAgICAgdGhpcy5hdmF0YXIgPSB0aGlzLiRwYXJlbnQuZ2V0VXNlckF2YXRhcigpXG4gICAgICB0aGlzLmN1c3RvbWVyX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldE1lc3NhZ2UoKVxuICAgICAgdGhpcy5ub3RlX2luZm9fc3RyID0gdGhpcy4kcGFyZW50LmdldEJ1c2luZXNzKCfmraPlloTlrqLmnI0nLCBudWxsLCBudWxsKVxuICAgIH1cbiAgfVxuIl19