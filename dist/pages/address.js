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

var Address = function (_wepy$page) {
  _inherits(Address, _wepy$page);

  function Address() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Address);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Address.__proto__ || Object.getPrototypeOf(Address)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '收货地址'
    }, _this2.data = {
      token: '',
      address: [],
      isNull: false,
      prevPage: '',
      sourceType: '',
      sourceId: '',
      count: '',
      orderId: '',
      detail: '',
      getTokenTime: 0,
      memo: ''
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "type": "5" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.methods = {
      editAdd: function editAdd(param) {
        _wepy2.default.navigateTo({
          url: './editAdd?detail=' + JSON.stringify(param)
        });
      },
      goNewAdd: function goNewAdd() {
        _wepy2.default.navigateTo({
          url: './newAdd'
        });
      },
      deleteAdd: function deleteAdd(id) {
        var _this = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否删除',
          success: function success(res) {
            if (res.confirm) {
              _this.deleteAdd(id);
            }
          }
        });
      },
      backToOrder: function backToOrder(index, id) {
        var _this3 = this;

        // var page = this.getCurrentPages()
        // var pre = page[page.length - 2].route
        if (this.prevPage === 'paycart') {
          _wepy2.default.redirectTo({
            url: './paycart?user=' + JSON.stringify(this.address[index]) + '&memo=' + this.memo
          });
        }
        if (this.prevPage === 'paybuy') {
          _wepy2.default.redirectTo({
            url: './paybuy?user=' + JSON.stringify(this.address[index]) + '&type=' + this.sourceType + '&id=' + this.sourceId + '&count=' + this.count + '&memo=' + this.memo
          });
        }
        if (this.prevPage === 'order') {
          this.editOrderAdd(id, function () {
            _wepy2.default.redirectTo({
              url: './order'
            });
          });
        }
        if (this.prevPage === 'orderdetail') {
          this.editOrderAdd(id, function () {
            _wepy2.default.redirectTo({
              url: './orderDetail?id=' + _this3.orderId
            });
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Address, [{
    key: 'initAdd',
    value: function initAdd() {
      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.address = [];
      this.$parent.HttpRequest.GetAddress(data).then(function (res) {
        console.log(res);
        _this.$parent.hideLoading();
        if (res.data.error === 0) {
          var data = res.data.data;
          if (data.length === 0) {
            _this.isNull = true;
          } else {
            _this.isNull = false;
          }
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.phone = item.phone;
            obj.add = item.areaFullName + item.address;
            obj.detail = item.address;
            obj.id = item.id;
            obj.areaId = item.areaId;
            obj.postCode = item.postCode;
            obj.areaFullName = item.areaFullName;
            obj.areaFullId = item.areaFullId;
            _this.address.push(obj);
            _this.address.sort(function (add1, add2) {
              return add2.id - add1.id;
            });
          });
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.initAdd();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
        _this.isNull = true;
        // _this.$parent.showFail()
      });
    }
  }, {
    key: 'deleteAdd',
    value: function deleteAdd(id) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        addressId: id
      };
      this.$parent.HttpRequest.DeleteAddress(data).then(function (res) {
        if (res.data.error === 0) {
          _this.initAdd();
        } else {
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'editOrderAdd',
    value: function editOrderAdd(id, cb) {
      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        token: this.token,
        orderId: this.orderId,
        addressId: id
      };
      this.$parent.HttpRequest.EditOrderAdd(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            // _this.token = this.$parent.getToken(res.data.error)
          }
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(data) {
      this.prevPage = data.page;
      this.sourceType = data.sourceType;
      this.sourceId = data.sourceId;
      this.count = data.count;
      this.orderId = data.id;
      this.memo = data.memo;
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initAdd();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCJtZW1vIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwibWV0aG9kcyIsImVkaXRBZGQiLCJwYXJhbSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29OZXdBZGQiLCJkZWxldGVBZGQiLCJpZCIsIl90aGlzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJiYWNrVG9PcmRlciIsImluZGV4IiwicmVkaXJlY3RUbyIsImVkaXRPcmRlckFkZCIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhcmVhRnVsbE5hbWUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFyZWFGdWxsSWQiLCJwdXNoIiwic29ydCIsImFkZDEiLCJhZGQyIiwibWlzc1Rva2VuIiwiaW5pdEFkZCIsIiRhcHBseSIsImNhdGNoIiwiYWRkcmVzc0lkIiwiRGVsZXRlQWRkcmVzcyIsImNiIiwiRWRpdE9yZGVyQWRkIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7OzsyTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIs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QyxFQUE0QzJDLElBQTVDLENBQWlELFVBQUNYLEdBQUQsRUFBUztBQUN4RFksZ0JBQVFDLEdBQVIsQ0FBWWIsR0FBWjtBQUNBLFlBQUlBLElBQUloQyxJQUFKLENBQVMrQyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCc0IsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJMUMsTUFBTVcsT0FBTixDQUFjeUIsU0FBbEIsRUFBNkI7QUFDM0I7QUFDRDtBQUNGO0FBQ0YsT0FURDtBQVVEOzs7MkJBQ08vRCxJLEVBQU07QUFDWixXQUFLSSxRQUFMLEdBQWdCSixLQUFLdUUsSUFBckI7QUFDQSxXQUFLbEUsVUFBTCxHQUFrQkwsS0FBS0ssVUFBdkI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCTixLQUFLTSxRQUFyQjtBQUNBLFdBQUtDLEtBQUwsR0FBYVAsS0FBS08sS0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVSLEtBQUswQixFQUFwQjtBQUNBLFdBQUtmLElBQUwsR0FBWVgsS0FBS1csSUFBakI7QUFDQSxXQUFLc0QsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxPQUFMO0FBQ0Q7Ozs7RUExS2tDLGVBQUtPLEk7O2tCQUFyQjFFLE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgZGV0YWlsOiAnJyxcbiAgICAgIGdldFRva2VuVGltZTogMCxcbiAgICAgIG1lbW86ICcnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkZWZlY3RcIjp7XCJ0eXBlXCI6XCI1XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGRlZmVjdDogRGVmZWN0XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBlZGl0QWRkIChwYXJhbSkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vZWRpdEFkZD9kZXRhaWw9JyArIEpTT04uc3RyaW5naWZ5KHBhcmFtKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTmV3QWRkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL25ld0FkZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6ZmkJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlQWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBiYWNrVG9PcmRlciAoaW5kZXgsIGlkKSB7XG4gICAgICAgIC8vIHZhciBwYWdlID0gdGhpcy5nZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAvLyB2YXIgcHJlID0gcGFnZVtwYWdlLmxlbmd0aCAtIDJdLnJvdXRlXG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5Y2FydCcpIHtcbiAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgdXJsOiAnLi9wYXljYXJ0P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZtZW1vPScgKyB0aGlzLm1lbW9cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5YnV5Jykge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKSArICcmdHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZpZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnQgKyAnJm1lbW89JyArIHRoaXMubWVtb1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyZGV0YWlsJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyB0aGlzLm9yZGVySWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5hZGRyZXNzID0gW11cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLnBob25lXG4gICAgICAgICAgICBvYmouYWRkID0gaXRlbS5hcmVhRnVsbE5hbWUgKyBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5hcmVhSWQgPSBpdGVtLmFyZWFJZFxuICAgICAgICAgICAgb2JqLnBvc3RDb2RlID0gaXRlbS5wb3N0Q29kZVxuICAgICAgICAgICAgb2JqLmFyZWFGdWxsTmFtZSA9IGl0ZW0uYXJlYUZ1bGxOYW1lXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxJZCA9IGl0ZW0uYXJlYUZ1bGxJZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICAgIF90aGlzLmFkZHJlc3Muc29ydCgoYWRkMSwgYWRkMikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gYWRkMi5pZCAtIGFkZDEuaWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgLy8gX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmluaXRBZGQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgLy8gX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBlZGl0T3JkZXJBZGQgKGlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRPcmRlckFkZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAvLyBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgdGhpcy5wcmV2UGFnZSA9IGRhdGEucGFnZVxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICB0aGlzLnNvdXJjZUlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnRcbiAgICAgIHRoaXMub3JkZXJJZCA9IGRhdGEuaWRcbiAgICAgIHRoaXMubWVtbyA9IGRhdGEubWVtb1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0QWRkKClcbiAgICB9XG4gIH1cbiJdfQ==