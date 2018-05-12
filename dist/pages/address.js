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
      orderId: ''
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "", "type": "5" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.methods = {
      editAdd: function editAdd() {},
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
            _this4.isNull = true;
          } else {
            _this4.isNull = false;
          }
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.phone = item.phone;
            obj.add = item.address;
            obj.id = item.id;
            obj.areaId = item.areaId;
            _this.address.push(obj);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'deleteAdd',
    value: function deleteAdd(id) {
      var _this = this;
      var data = {
        token: this.token,
        addressId: id
      };
      this.$parent.HttpRequest.DeleteAddress(data).then(function (res) {
        _this.initAdd();
        _this.$apply();
      });
    }
  }, {
    key: 'editOrderAdd',
    value: function editOrderAdd(id, cb) {
      var data = {
        token: this.token,
        orderId: this.orderId,
        addressId: id
      };
      this.$parent.HttpRequest.EditOrderAdd(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb();
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
      this.token = this.$parent.getToken();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsImdvTmV3QWRkIiwibmF2aWdhdGVUbyIsInVybCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJKU09OIiwic3RyaW5naWZ5IiwiZWRpdE9yZGVyQWRkIiwiJHBhcmVudCIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInNob3dTdWNjZXNzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhcmVhSWQiLCJwdXNoIiwic2hvd0ZhaWwiLCIkYXBwbHkiLCJjYXRjaCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJpbml0QWRkIiwiY2IiLCJFZGl0T3JkZXJBZGQiLCJwYWdlIiwiZ2V0VG9rZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsa0JBQVksRUFMUDtBQU1MQyxnQkFBVSxFQU5M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Q0FBU3dDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJpQixnQkFBTUEsSUFBTjtBQUNEO0FBQ0YsT0FMRDtBQU1EOzs7MkJBQ096RCxJLEVBQU07QUFDWnNDLGNBQVFDLEdBQVIsQ0FBWXZDLElBQVo7QUFDQSxXQUFLSSxRQUFMLEdBQWdCSixLQUFLMkQsSUFBckI7QUFDQSxXQUFLdEQsVUFBTCxHQUFrQkwsS0FBS0ssVUFBdkI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCTixLQUFLTSxRQUFyQjtBQUNBLFdBQUtDLEtBQUwsR0FBYVAsS0FBS08sS0FBbEI7QUFDQSxXQUFLQyxPQUFMLEdBQWVSLEtBQUtvQixFQUFwQjtBQUNBLFdBQUtuQixLQUFMLEdBQWEsS0FBS2dDLE9BQUwsQ0FBYTJCLFFBQWIsRUFBYjtBQUNBLFdBQUtSLE1BQUw7QUFDRDs7OzZCQUNTO0FBQ1IsV0FBS0ksT0FBTDtBQUNEOzs7O0VBeklrQyxlQUFLRyxJOztrQkFBckI5RCxPIiwiZmlsZSI6ImFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS26LSn5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgYWRkcmVzczogW10sXG4gICAgICBpc051bGw6IGZhbHNlLFxuICAgICAgcHJldlBhZ2U6ICcnLFxuICAgICAgc291cmNlVHlwZTogJycsXG4gICAgICBzb3VyY2VJZDogJycsXG4gICAgICBjb3VudDogJycsXG4gICAgICBvcmRlcklkOiAnJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1wieG1sbnM6d3hcIjpcIlwiLFwidHlwZVwiOlwiNVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFkZCAoKSB7XG4gICAgICB9LFxuICAgICAgZ29OZXdBZGQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbmV3QWRkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBfdGhpcy5kZWxldGVBZGQoaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJhY2tUb09yZGVyIChpbmRleCwgaWQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXljYXJ0Jykge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQ/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAncGF5YnV5Jykge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWJ1eT91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKSArICcmdHlwZT0nICsgdGhpcy5zb3VyY2VUeXBlICsgJyZpZD0nICsgdGhpcy5zb3VyY2VJZCArICcmY291bnQ9JyArIHRoaXMuY291bnRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAnb3JkZXInKSB7XG4gICAgICAgICAgdGhpcy5lZGl0T3JkZXJBZGQoaWQsICgpID0+IHtcbiAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcmRldGFpbCcpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlckRldGFpbD9pZD0nICsgdGhpcy5vcmRlcklkXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdEFkZCAoKSB7XG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmFkZHJlc3MgPSBbXVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5waG9uZSA9IGl0ZW0ucGhvbmVcbiAgICAgICAgICAgIG9iai5hZGQgPSBpdGVtLmFkZHJlc3NcbiAgICAgICAgICAgIG9iai5pZCA9IGl0ZW0uaWRcbiAgICAgICAgICAgIG9iai5hcmVhSWQgPSBpdGVtLmFyZWFJZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBlZGl0T3JkZXJBZGQgKGlkLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5FZGl0T3JkZXJBZGQoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICB0aGlzLnByZXZQYWdlID0gZGF0YS5wYWdlXG4gICAgICB0aGlzLnNvdXJjZVR5cGUgPSBkYXRhLnNvdXJjZVR5cGVcbiAgICAgIHRoaXMuc291cmNlSWQgPSBkYXRhLnNvdXJjZUlkXG4gICAgICB0aGlzLmNvdW50ID0gZGF0YS5jb3VudFxuICAgICAgdGhpcy5vcmRlcklkID0gZGF0YS5pZFxuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmluaXRBZGQoKVxuICAgIH1cbiAgfVxuIl19