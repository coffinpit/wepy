'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hot = function (_wepy$page) {
  _inherits(Hot, _wepy$page);

  function Hot() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Hot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Hot.__proto__ || Object.getPrototypeOf(Hot)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '欢迎'
    }, _this.data = {}, _this.methods = {
      getLoad: function getLoad() {
        var _this2 = this;

        setTimeout(function () {
          if (_wepy2.default.getStorageSync('token')) {
            _this2.methods.goIndex();
            _this2.$parent.getUserInfo();
          } else {
            _this2.methods.goLogin();
          }
        }, 3000);
      },
      goIndex: function goIndex() {
        _wepy2.default.switchTab({
          url: './index'
        });
      },
      goLogin: function goLogin() {
        _wepy2.default.navigateTo({
          url: './login'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hot, [{
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }]);

  return Hot;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Hot , 'pages/start'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIkhvdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibWV0aG9kcyIsImdldExvYWQiLCJzZXRUaW1lb3V0IiwiZ2V0U3RvcmFnZVN5bmMiLCJnb0luZGV4IiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ29Mb2dpbiIsInN3aXRjaFRhYiIsInVybCIsIm5hdmlnYXRlVG8iLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU8sRSxRQUdQQyxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRztBQUFBOztBQUNUQyxtQkFBVyxZQUFNO0FBQ2YsY0FBSSxlQUFLQyxjQUFMLENBQW9CLE9BQXBCLENBQUosRUFBa0M7QUFDaEMsbUJBQUtILE9BQUwsQ0FBYUksT0FBYjtBQUNBLG1CQUFLQyxPQUFMLENBQWFDLFdBQWI7QUFDRCxXQUhELE1BR087QUFDTCxtQkFBS04sT0FBTCxDQUFhTyxPQUFiO0FBQ0Q7QUFDRixTQVBELEVBT0csSUFQSDtBQVFELE9BVk87QUFXUkgsYUFYUSxxQkFXRztBQUNULHVCQUFLSSxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRCxPQWZPO0FBZ0JSRixhQWhCUSxxQkFnQkc7QUFDVCx1QkFBS0csVUFBTCxDQUFnQjtBQUNkRCxlQUFLO0FBRFMsU0FBaEI7QUFHRDtBQXBCTyxLOzs7Ozs2QkFzQkE7QUFDUixXQUFLRSxNQUFMO0FBQ0Q7Ozs7RUEvQjhCLGVBQUtDLEk7O2tCQUFqQmhCLEciLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG5cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldExvYWQgKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvSW5kZXgoKVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvTG9naW4oKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwMClcbiAgICAgIH0sXG4gICAgICBnb0luZGV4ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpbiAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpbidcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25sb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==