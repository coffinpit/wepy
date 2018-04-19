'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testMixin = function (_wepy$mixin) {
  _inherits(testMixin, _wepy$mixin);

  function testMixin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, testMixin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = testMixin.__proto__ || Object.getPrototypeOf(testMixin)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      topnavigation: [{
        title: '首页',
        url: './index'
      }, {
        title: '热门',
        url: './hot'
      }, {
        title: '搜索',
        url: './search'
      }]
    }, _this.methods = {
      tap: function tap() {
        this.mixin = 'mixin data was changed';
        console.log('mixin method tap');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(testMixin, [{
    key: 'onShow',
    value: function onShow() {
      console.log('mixin onShow');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('mixin onLoad');
    }
  }]);

  return testMixin;
}(_wepy2.default.mixin);

exports.default = testMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsidGVzdE1peGluIiwiZGF0YSIsInRvcG5hdmlnYXRpb24iLCJ0aXRsZSIsInVybCIsIm1ldGhvZHMiLCJ0YXAiLCJtaXhpbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsSSxHQUFPO0FBQ0xDLHFCQUFlLENBQUM7QUFDWkMsZUFBTyxJQURLO0FBRVpDLGFBQUs7QUFGTyxPQUFELEVBR1Y7QUFDREQsZUFBTyxJQUROO0FBRURDLGFBQUs7QUFGSixPQUhVLEVBTVY7QUFDREQsZUFBTyxJQUROO0FBRURDLGFBQUs7QUFGSixPQU5VO0FBRFYsSyxRQVlQQyxPLEdBQVU7QUFDUkMsU0FEUSxpQkFDRDtBQUNMLGFBQUtDLEtBQUwsR0FBYSx3QkFBYjtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLGtCQUFaO0FBQ0Q7QUFKTyxLOzs7Ozs2QkFPRDtBQUNQRCxjQUFRQyxHQUFSLENBQVksY0FBWjtBQUNEOzs7NkJBRVE7QUFDUEQsY0FBUUMsR0FBUixDQUFZLGNBQVo7QUFDRDs7OztFQTFCb0MsZUFBS0YsSzs7a0JBQXZCUCxTIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgZGF0YSA9IHtcbiAgICB0b3BuYXZpZ2F0aW9uOiBbe1xuICAgICAgICB0aXRsZTogJ+mmlumhtScsXG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn54Ot6ZeoJyxcbiAgICAgICAgdXJsOiAnLi9ob3QnXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5pCc57SiJyxcbiAgICAgICAgdXJsOiAnLi9zZWFyY2gnXG4gICAgICB9XVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgdGFwICgpIHtcbiAgICAgIHRoaXMubWl4aW4gPSAnbWl4aW4gZGF0YSB3YXMgY2hhbmdlZCdcbiAgICAgIGNvbnNvbGUubG9nKCdtaXhpbiBtZXRob2QgdGFwJylcbiAgICB9XG4gIH1cblxuICBvblNob3coKSB7XG4gICAgY29uc29sZS5sb2coJ21peGluIG9uU2hvdycpXG4gIH1cblxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coJ21peGluIG9uTG9hZCcpXG4gIH1cbn1cbiJdfQ==