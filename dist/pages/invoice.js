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
        if (_wepy2.default.chooseInvoiceTitle) {
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
        } else {
          this.$parent.disableApi();
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludm9pY2UuanMiXSwibmFtZXMiOlsiSW52b2ljZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW52b2ljZUxpc3QiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiYWRkSW52b2ljZSIsIl90aGlzIiwiY2hvb3NlSW52b2ljZVRpdGxlIiwic3VjY2VzcyIsInJlcyIsInR5cGUiLCJ0aXRsZSIsInRheE51bWJlciIsImNvbXBhbnlBZGRyZXNzIiwidGVsZXBob25lIiwiYmFua05hbWUiLCJiYW5rQWNjb3VudCIsIiRhcHBseSIsIiRwYXJlbnQiLCJkaXNhYmxlQXBpIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxTQUdUQyxJLEdBQU87QUFDTEMsbUJBQWE7QUFEUixLLFNBR1JDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxRQUFPLEdBQVIsRUFBVixFLFNBQ1RDLE8sR0FBVSxFLFNBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssU0FHVkMsTyxHQUFVO0FBQ1JDLGdCQURRLHdCQUNNO0FBQ1osWUFBSUMsUUFBUSxJQUFaO0FBQ0EsWUFBSSxlQUFLQyxrQkFBVCxFQUE2QjtBQUMzQix5QkFBS0Esa0JBQUwsQ0FBd0I7QUFDdEJDLG1CQURzQixtQkFDZEMsR0FEYyxFQUNUO0FBQ1hILG9CQUFNUixXQUFOLEdBQW9CLEVBQXBCO0FBQ0Esa0JBQUlXLElBQUlDLElBQUosS0FBYSxHQUFqQixFQUFzQjtBQUNwQkosc0JBQU1SLFdBQU4sQ0FBa0JZLElBQWxCLEdBQXlCLElBQXpCO0FBQ0QsZUFGRCxNQUVPLElBQUlELElBQUlDLElBQUosS0FBYSxHQUFqQixFQUFzQjtBQUMzQkosc0JBQU1SLFdBQU4sQ0FBa0JZLElBQWxCLEdBQXlCLElBQXpCO0FBQ0Q7QUFDREosb0JBQU1SLFdBQU4sQ0FBa0JhLEtBQWxCLEdBQTBCRixJQUFJRSxLQUE5QjtBQUNBTCxvQkFBTVIsV0FBTixDQUFrQmMsU0FBbEIsR0FBOEJILElBQUlHLFNBQWxDO0FBQ0FOLG9CQUFNUixXQUFOLENBQWtCZSxjQUFsQixHQUFtQ0osSUFBSUksY0FBdkM7QUFDQVAsb0JBQU1SLFdBQU4sQ0FBa0JnQixTQUFsQixHQUE4QkwsSUFBSUssU0FBbEM7QUFDQVIsb0JBQU1SLFdBQU4sQ0FBa0JpQixRQUFsQixHQUE2Qk4sSUFBSU0sUUFBakM7QUFDQVQsb0JBQU1SLFdBQU4sQ0FBa0JrQixXQUFsQixHQUFnQ1AsSUFBSU8sV0FBcEM7QUFDQVYsb0JBQU1XLE1BQU47QUFDRDtBQWZxQixXQUF4QjtBQWlCRCxTQWxCRCxNQWtCTztBQUNMLGVBQUtDLE9BQUwsQ0FBYUMsVUFBYjtBQUNEO0FBQ0Y7QUF4Qk8sSzs7Ozs7NkJBMEJBO0FBQ1IsV0FBS0YsTUFBTDtBQUNEOzs7O0VBekNrQyxlQUFLRyxJOztrQkFBckIxQixPIiwiZmlsZSI6Imludm9pY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZvaWNlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R56Wo5Lit5b+DJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgaW52b2ljZUxpc3Q6IG51bGxcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInR5cGVcIjpcIjdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGFkZEludm9pY2UgKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIGlmICh3ZXB5LmNob29zZUludm9pY2VUaXRsZSkge1xuICAgICAgICAgIHdlcHkuY2hvb3NlSW52b2ljZVRpdGxlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0ID0ge31cbiAgICAgICAgICAgICAgaWYgKHJlcy50eXBlID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnZvaWNlTGlzdC50eXBlID0gJ+WNleS9jSdcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMudHlwZSA9PT0gJzEnKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW52b2ljZUxpc3QudHlwZSA9ICfkuKrkuronXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3RoaXMuaW52b2ljZUxpc3QudGl0bGUgPSByZXMudGl0bGVcbiAgICAgICAgICAgICAgX3RoaXMuaW52b2ljZUxpc3QudGF4TnVtYmVyID0gcmVzLnRheE51bWJlclxuICAgICAgICAgICAgICBfdGhpcy5pbnZvaWNlTGlzdC5jb21wYW55QWRkcmVzcyA9IHJlcy5jb21wYW55QWRkcmVzc1xuICAgICAgICAgICAgICBfdGhpcy5pbnZvaWNlTGlzdC50ZWxlcGhvbmUgPSByZXMudGVsZXBob25lXG4gICAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LmJhbmtOYW1lID0gcmVzLmJhbmtOYW1lXG4gICAgICAgICAgICAgIF90aGlzLmludm9pY2VMaXN0LmJhbmtBY2NvdW50ID0gcmVzLmJhbmtBY2NvdW50XG4gICAgICAgICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRwYXJlbnQuZGlzYWJsZUFwaSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25sb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==