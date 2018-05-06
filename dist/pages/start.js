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

var Start = function (_wepy$page) {
  _inherits(Start, _wepy$page);

  function Start() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Start);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Start.__proto__ || Object.getPrototypeOf(Start)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '欢迎'
    }, _this.data = {}, _this.methods = {
      getLoad: function getLoad() {
        var _this2 = this;

        setTimeout(function () {
          if (_wepy2.default.getStorageSync('token')) {
            _this2.$parent.getUserInfo('start', function () {
              _this2.methods.goIndex();
            });
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

  _createClass(Start, [{
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }]);

  return Start;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Start , 'pages/start'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LmpzIl0sIm5hbWVzIjpbIlN0YXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJtZXRob2RzIiwiZ2V0TG9hZCIsInNldFRpbWVvdXQiLCJnZXRTdG9yYWdlU3luYyIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsImdvSW5kZXgiLCJnb0xvZ2luIiwic3dpdGNoVGFiIiwidXJsIiwibmF2aWdhdGVUbyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTyxFLFFBR1BDLE8sR0FBVTtBQUNSQyxhQURRLHFCQUNHO0FBQUE7O0FBQ1RDLG1CQUFXLFlBQU07QUFDZixjQUFJLGVBQUtDLGNBQUwsQ0FBb0IsT0FBcEIsQ0FBSixFQUFrQztBQUNoQyxtQkFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCLE9BQXpCLEVBQWtDLFlBQU07QUFDdEMscUJBQUtMLE9BQUwsQ0FBYU0sT0FBYjtBQUNELGFBRkQ7QUFHRCxXQUpELE1BSU87QUFDTCxtQkFBS04sT0FBTCxDQUFhTyxPQUFiO0FBQ0Q7QUFDRixTQVJELEVBUUcsSUFSSDtBQVNELE9BWE87QUFZUkQsYUFaUSxxQkFZRztBQUNULHVCQUFLRSxTQUFMLENBQWU7QUFDYkMsZUFBSztBQURRLFNBQWY7QUFHRCxPQWhCTztBQWlCUkYsYUFqQlEscUJBaUJHO0FBQ1QsdUJBQUtHLFVBQUwsQ0FBZ0I7QUFDZEQsZUFBSztBQURTLFNBQWhCO0FBR0Q7QUFyQk8sSzs7Ozs7NkJBdUJBO0FBQ1IsV0FBS0UsTUFBTDtBQUNEOzs7O0VBaENnQyxlQUFLQyxJOztrQkFBbkJoQixLIiwiZmlsZSI6InN0YXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG5cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldExvYWQgKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKSkge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKCdzdGFydCcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvSW5kZXgoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLmdvTG9naW4oKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwMClcbiAgICAgIH0sXG4gICAgICBnb0luZGV4ICgpIHtcbiAgICAgICAgd2VweS5zd2l0Y2hUYWIoe1xuICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpbiAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9sb2dpbidcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgb25sb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==