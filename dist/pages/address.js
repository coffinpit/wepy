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
      getTokenTime: 0
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "", "type": "5" } }, _this2.$events = {}, _this2.components = {
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

        if (this.prevPage === 'paycart') {
          _wepy2.default.navigateTo({
            url: './paycart?user=' + JSON.stringify(this.address[index])
          });
        }
        if (this.prevPage === 'paybuy') {
          _wepy2.default.navigateTo({
            url: './paybuy?user=' + JSON.stringify(this.address[index]) + '&type=' + this.sourceType + '&id=' + this.sourceId + '&count=' + this.count
          });
        }
        if (this.prevPage === 'order') {
          this.editOrderAdd(id, function () {
            _wepy2.default.navigateTo({
              url: './order'
            });
          });
        }
        if (this.prevPage === 'orderdetail') {
          this.editOrderAdd(id, function () {
            _wepy2.default.navigateTo({
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
      var _this4 = this;

      this.token = this.$parent.getToken();
      this.$parent.showLoading();
      var _this = this;
      var data = {
        token: this.token
      };
      this.address = [];
      this.$parent.HttpRequest.GetAddress(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
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
            obj.areaFullName = item.areaFullName;
            obj.areaFullId = item.areaFullId;
            _this.address.push(obj);
          });
        } else {
          _this.isNull = true;
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initAdd();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.isNull = true;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'deleteAdd',
    value: function deleteAdd(id) {
      var _this5 = this;

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
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
        _this.$apply();
      });
    }
  }, {
    key: 'editOrderAdd',
    value: function editOrderAdd(id, cb) {
      var _this6 = this;

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
            _this.token = _this6.$parent.getToken(res.data.error);
          }
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(data) {
      console.log(data);
      this.prevPage = data.page;
      this.sourceType = data.sourceType;
      this.sourceId = data.sourceId;
      this.count = data.count;
      this.orderId = data.id;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJlZGl0T3JkZXJBZGQiLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIkh0dHBSZXF1ZXN0IiwiR2V0QWRkcmVzcyIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsImxlbmd0aCIsImZvckVhY2giLCJpdGVtIiwib2JqIiwibmFtZSIsInBob25lIiwiYWRkIiwiYXJlYUZ1bGxOYW1lIiwiYXJlYUlkIiwiYXJlYUZ1bGxJZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0QWRkIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJjYiIsIkVkaXRPcmRlckFkZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFT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LENBQVM0QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCb0IsZ0JBQU1BLElBQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJdEMsTUFBTVUsT0FBTixDQUFjcUIsU0FBbEIsRUFBNkI7QUFDM0IvQixrQkFBTXpCLEtBQU4sR0FBYyxPQUFLbUMsT0FBTCxDQUFhQyxRQUFiLENBQXNCTixJQUFJL0IsSUFBSixDQUFTNEMsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRixPQVREO0FBVUQ7OzsyQkFDTzVDLEksRUFBTTtBQUNaMEMsY0FBUUMsR0FBUixDQUFZM0MsSUFBWjtBQUNBLFdBQUtJLFFBQUwsR0FBZ0JKLEtBQUtrRSxJQUFyQjtBQUNBLFdBQUs3RCxVQUFMLEdBQWtCTCxLQUFLSyxVQUF2QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JOLEtBQUtNLFFBQXJCO0FBQ0EsV0FBS0MsS0FBTCxHQUFhUCxLQUFLTyxLQUFsQjtBQUNBLFdBQUtDLE9BQUwsR0FBZVIsS0FBS3lCLEVBQXBCO0FBQ0EsV0FBS2tDLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0QsT0FBTDtBQUNEOzs7O0VBbktrQyxlQUFLUSxJOztrQkFBckJyRSxPIiwiZmlsZSI6ImFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS26LSn5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgYWRkcmVzczogW10sXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgcHJldlBhZ2U6ICcnLFxuICAgICAgc291cmNlVHlwZTogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBjb3VudDogJycsXG4gICAgICBvcmRlcklkOiAnJyxcbiAgICAgIGRldGFpbDogJycsXG4gICAgICBnZXRUb2tlblRpbWU6IDBcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInhtbG5zOnd4XCI6XCJcIixcInR5cGVcIjpcIjVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBZGQgKHBhcmFtKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9lZGl0QWRkP2RldGFpbD0nICsgSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29OZXdBZGQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbmV3QWRkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBfdGhpcy5kZWxldGVBZGQoaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJhY2tUb09yZGVyIChpbmRleCwgaWQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXljYXJ0Jykge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQ/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5YnV5Jykge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKSArICcmdHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZpZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAnb3JkZXInKSB7XG4gICAgICAgICAgdGhpcy5lZGl0T3JkZXJBZGQoaWQsICgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcmRldGFpbCcpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlckRldGFpbD9pZD0nICsgdGhpcy5vcmRlcklkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdEFkZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuYWRkcmVzcyA9IFtdXG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dTdWNjZXNzKClcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLnBob25lXG4gICAgICAgICAgICBvYmouYWRkID0gaXRlbS5hcmVhRnVsbE5hbWUgKyBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5hcmVhSWQgPSBpdGVtLmFyZWFJZFxuICAgICAgICAgICAgb2JqLmFyZWFGdWxsTmFtZSA9IGl0ZW0uYXJlYUZ1bGxOYW1lXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxJZCA9IGl0ZW0uYXJlYUZ1bGxJZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkRlbGV0ZUFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLmluaXRBZGQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBlZGl0T3JkZXJBZGQgKGlkLCBjYikge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIG9yZGVySWQ6IHRoaXMub3JkZXJJZCxcbiAgICAgICAgYWRkcmVzc0lkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkVkaXRPcmRlckFkZChkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLm9yZGVySWQgPSBkYXRhLmlkXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRBZGQoKVxuICAgIH1cbiAgfVxuIl19