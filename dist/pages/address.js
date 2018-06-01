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
            url: './paycart?user=' + JSON.stringify(this.address[index])
          });
        }
        if (this.prevPage === 'paybuy') {
          _wepy2.default.redirectTo({
            url: './paybuy?user=' + JSON.stringify(this.address[index]) + '&type=' + this.sourceType + '&id=' + this.sourceId + '&count=' + this.count
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
        _this.$parent.showSuccess();
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
        _this.$parent.showSuccess();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJyZWRpcmVjdFRvIiwiZWRpdE9yZGVyQWRkIiwiJHBhcmVudCIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInNob3dTdWNjZXNzIiwiZXJyb3IiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm5hbWUiLCJwaG9uZSIsImFkZCIsImFyZWFGdWxsTmFtZSIsImFyZWFJZCIsInBvc3RDb2RlIiwiYXJlYUZ1bGxJZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0QWRkIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJjYiIsIkVkaXRPcmRlckFkZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FB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MEMsSUFBNUMsQ0FBaUQsVUFBQ1gsR0FBRCxFQUFTO0FBQ3hEWSxnQkFBUUMsR0FBUixDQUFZYixHQUFaO0FBQ0EsWUFBSUEsSUFBSS9CLElBQUosQ0FBUzhDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJvQixnQkFBTUEsSUFBTjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl4QyxNQUFNVyxPQUFOLENBQWNzQixTQUFsQixFQUE2QjtBQUMzQmpDLGtCQUFNekIsS0FBTixHQUFjLE9BQUtvQyxPQUFMLENBQWFDLFFBQWIsQ0FBc0JQLElBQUkvQixJQUFKLENBQVM4QyxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BVEQ7QUFVRDs7OzJCQUNPOUMsSSxFQUFNO0FBQ1oyQyxjQUFRQyxHQUFSLENBQVk1QyxJQUFaO0FBQ0EsV0FBS0ksUUFBTCxHQUFnQkosS0FBS29FLElBQXJCO0FBQ0EsV0FBSy9ELFVBQUwsR0FBa0JMLEtBQUtLLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWFQLEtBQUtPLEtBQWxCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlUixLQUFLeUIsRUFBcEI7QUFDQSxXQUFLb0MsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxPQUFMO0FBQ0Q7Ozs7RUF2S2tDLGVBQUtRLEk7O2tCQUFyQnZFLE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgZGV0YWlsOiAnJyxcbiAgICAgIGdldFRva2VuVGltZTogMFxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1widHlwZVwiOlwiNVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFkZCAocGFyYW0pIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2VkaXRBZGQ/ZGV0YWlsPScgKyBKU09OLnN0cmluZ2lmeShwYXJhbSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb05ld0FkZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9uZXdBZGQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpCcsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIF90aGlzLmRlbGV0ZUFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmFja1RvT3JkZXIgKGluZGV4LCBpZCkge1xuICAgICAgICAvLyB2YXIgcGFnZSA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgLy8gdmFyIHByZSA9IHBhZ2VbcGFnZS5sZW5ndGggLSAyXS5yb3V0ZVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWNhcnQnKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydD91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyZGV0YWlsJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyB0aGlzLm9yZGVySWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5hZGRyZXNzID0gW11cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge31cbiAgICAgICAgICAgIG9iai5uYW1lID0gaXRlbS5uYW1lXG4gICAgICAgICAgICBvYmoucGhvbmUgPSBpdGVtLnBob25lXG4gICAgICAgICAgICBvYmouYWRkID0gaXRlbS5hcmVhRnVsbE5hbWUgKyBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5kZXRhaWwgPSBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5hcmVhSWQgPSBpdGVtLmFyZWFJZFxuICAgICAgICAgICAgb2JqLnBvc3RDb2RlID0gaXRlbS5wb3N0Q29kZVxuICAgICAgICAgICAgb2JqLmFyZWFGdWxsTmFtZSA9IGl0ZW0uYXJlYUZ1bGxOYW1lXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxJZCA9IGl0ZW0uYXJlYUZ1bGxJZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZWRpdE9yZGVyQWRkIChpZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5FZGl0T3JkZXJBZGQoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLnByZXZQYWdlID0gZGF0YS5wYWdlXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgIHRoaXMuc291cmNlSWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudFxuICAgICAgdGhpcy5vcmRlcklkID0gZGF0YS5pZFxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0QWRkKClcbiAgICB9XG4gIH1cbiJdfQ==