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

var Logistica = function (_wepy$page) {
  _inherits(Logistica, _wepy$page);

  function Logistica() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Logistica);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Logistica.__proto__ || Object.getPrototypeOf(Logistica)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的物流'
    }, _this.data = {
      package: ['我的包裹1', '我的包裹2', '我的包裹3', '我的包裹4', '我的包裹5', '我的包裹6'],
      current: 0
    }, _this.methods = {
      checkPackage: function checkPackage(index) {
        this.current = index;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Logistica, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return Logistica;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Logistica , 'pages/logistica'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljYS5qcyJdLCJuYW1lcyI6WyJMb2dpc3RpY2EiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInBhY2thZ2UiLCJjdXJyZW50IiwibWV0aG9kcyIsImNoZWNrUGFja2FnZSIsImluZGV4IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixPQUFuQixFQUE0QixPQUE1QixFQUFxQyxPQUFyQyxFQUE4QyxPQUE5QyxDQURKO0FBRUxDLGVBQVM7QUFGSixLLFFBSVBDLE8sR0FBVTtBQUNSQyxrQkFEUSx3QkFDTUMsS0FETixFQUNhO0FBQ25CLGFBQUtILE9BQUwsR0FBZUcsS0FBZjtBQUNEO0FBSE8sSzs7Ozs7NkJBS0E7QUFDUixXQUFLQyxNQUFMO0FBQ0Q7Ozs7RUFmb0MsZUFBS0MsSTs7a0JBQXZCVixTIiwiZmlsZSI6ImxvZ2lzdGljYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2lzdGljYSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOeJqea1gSdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHBhY2thZ2U6IFsn5oiR55qE5YyF6KO5MScsICfmiJHnmoTljIXoo7kyJywgJ+aIkeeahOWMheijuTMnLCAn5oiR55qE5YyF6KO5NCcsICfmiJHnmoTljIXoo7k1JywgJ+aIkeeahOWMheijuTYnXSxcbiAgICAgIGN1cnJlbnQ6IDBcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoZWNrUGFja2FnZSAoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gaW5kZXhcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==