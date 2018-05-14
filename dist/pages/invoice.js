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

var Invoice = function (_wepy$page) {
  _inherits(Invoice, _wepy$page);

  function Invoice() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Invoice);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Invoice.__proto__ || Object.getPrototypeOf(Invoice)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '发票中心'
    }, _this2.data = {
      invoiceList: null
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "type": "7" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.methods = {
      addInvoice: function addInvoice() {
        var _this = this;
        _wepy2.default.chooseInvoiceTitle({
          success: function success(res) {
            _this.invoiceList = {};
            if (res.type === '0') {
              _this.invoiceList.type = '单位';
            } else if (res.type === '1') {
              _this.invoiceList.type = '个人';
            }
            _this.invoiceList.title = res.title;
            _this.invoiceList.taxNumber = res.taxNumber;
            _this.invoiceList.companyAddress = res.companyAddress;
            _this.invoiceList.telephone = res.telephone;
            _this.invoiceList.bankName = res.bankName;
            _this.invoiceList.bankAccount = res.bankAccount;
            _this.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Invoice, [{
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }]);

  return Invoice;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Invoice , 'pages/invoice'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludm9pY2UuanMiXSwibmFtZXMiOlsiSW52b2ljZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW52b2ljZUxpc3QiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiYWRkSW52b2ljZSIsIl90aGlzIiwiY2hvb3NlSW52b2ljZVRpdGxlIiwic3VjY2VzcyIsInJlcyIsInR5cGUiLCJ0aXRsZSIsInRheE51bWJlciIsImNvbXBhbnlBZGRyZXNzIiwidGVsZXBob25lIiwiYmFua05hbWUiLCJiYW5rQWNjb3VudCIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLG1CQUFhO0FBRFIsSyxTQUdSQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQVYsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLE8sR0FBVTtBQUNSQyxnQkFEUSx3QkFDTTtBQUNaLFlBQUlDLFFBQVEsSUFBWjtBQUNBLHVCQUFLQyxrQkFBTCxDQUF3QjtBQUN0QkMsaUJBRHNCLG1CQUNkQyxHQURjLEVBQ1Q7QUFDWEgsa0JBQU1SLFdBQU4sR0FBb0IsRUFBcEI7QUFDQSxnQkFBSVcsSUFBSUMsSUFBSixLQUFhLEdBQWpCLEVBQXNCO0FBQ3BCSixvQkFBTVIsV0FBTixDQUFrQlksSUFBbEIsR0FBeUIsSUFBekI7QUFDRCxhQUZELE1BRU8sSUFBSUQsSUFBSUMsSUFBSixLQUFhLEdBQWpCLEVBQXNCO0FBQzNCSixvQkFBTVIsV0FBTixDQUFrQlksSUFBbEIsR0FBeUIsSUFBekI7QUFDRDtBQUNESixrQkFBTVIsV0FBTixDQUFrQmEsS0FBbEIsR0FBMEJGLElBQUlFLEtBQTlCO0FBQ0FMLGtCQUFNUixXQUFOLENBQWtCYyxTQUFsQixHQUE4QkgsSUFBSUcsU0FBbEM7QUFDQU4sa0JBQU1SLFdBQU4sQ0FBa0JlLGNBQWxCLEdBQW1DSixJQUFJSSxjQUF2QztBQUNBUCxrQkFBTVIsV0FBTixDQUFrQmdCLFNBQWxCLEdBQThCTCxJQUFJSyxTQUFsQztBQUNBUixrQkFBTVIsV0FBTixDQUFrQmlCLFFBQWxCLEdBQTZCTixJQUFJTSxRQUFqQztBQUNBVCxrQkFBTVIsV0FBTixDQUFrQmtCLFdBQWxCLEdBQWdDUCxJQUFJTyxXQUFwQztBQUNBVixrQkFBTVcsTUFBTjtBQUNEO0FBZnFCLFNBQXhCO0FBaUJEO0FBcEJPLEs7Ozs7OzZCQXNCQTtBQUNSLFdBQUtBLE1BQUw7QUFDRDs7OztFQXJDa0MsZUFBS0MsSTs7a0JBQXJCeEIsTyIsImZpbGUiOiJpbnZvaWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW52b2ljZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WPkeelqOS4reW/gydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGludm9pY2VMaXN0OiBudWxsXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCI3XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBhZGRJbnZvaWNlICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB3ZXB5LmNob29zZUludm9pY2VUaXRsZSh7XG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0ID0ge31cbiAgICAgICAgICAgIGlmIChyZXMudHlwZSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LnR5cGUgPSAn5Y2V5L2NJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMudHlwZSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LnR5cGUgPSAn5Liq5Lq6J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuaW52b2ljZUxpc3QudGl0bGUgPSByZXMudGl0bGVcbiAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LnRheE51bWJlciA9IHJlcy50YXhOdW1iZXJcbiAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LmNvbXBhbnlBZGRyZXNzID0gcmVzLmNvbXBhbnlBZGRyZXNzXG4gICAgICAgICAgICBfdGhpcy5pbnZvaWNlTGlzdC50ZWxlcGhvbmUgPSByZXMudGVsZXBob25lXG4gICAgICAgICAgICBfdGhpcy5pbnZvaWNlTGlzdC5iYW5rTmFtZSA9IHJlcy5iYW5rTmFtZVxuICAgICAgICAgICAgX3RoaXMuaW52b2ljZUxpc3QuYmFua0FjY291bnQgPSByZXMuYmFua0FjY291bnRcbiAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvbmxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19