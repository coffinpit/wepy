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
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initAdd();
          }
        }
        _this.$apply();
      }).catch(function () {
        _this.$parent.hideLoading();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCJtZW1vIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwibWV0aG9kcyIsImVkaXRBZGQiLCJwYXJhbSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29OZXdBZGQiLCJkZWxldGVBZGQiLCJpZCIsIl90aGlzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJiYWNrVG9PcmRlciIsImluZGV4IiwicmVkaXJlY3RUbyIsImVkaXRPcmRlckFkZCIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInNob3dMb2FkaW5nIiwiSHR0cFJlcXVlc3QiLCJHZXRBZGRyZXNzIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJoaWRlTG9hZGluZyIsImVycm9yIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJhcmVhRnVsbE5hbWUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFyZWFGdWxsSWQiLCJwdXNoIiwic29ydCIsImFkZDEiLCJhZGQyIiwibWlzc1Rva2VuIiwiaW5pdEFkZCIsIiRhcHBseSIsImNhdGNoIiwic2hvd0ZhaWwiLCJhZGRyZXNzSWQiLCJEZWxldGVBZGRyZXNzIiwiY2IiLCJFZGl0T3JkZXJBZGQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzJMQUNuQkMsTSxHQUFTO0FBQ1BDLDhC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cHknXG4gIGltcG9ydCBEZWZlY3QgZnJvbSAnLi4vY29tcG9uZW50cy9kZWZlY3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUtui0p+WcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIGFkZHJlc3M6IFtdLFxuICAgICAgaXNOdWxsOiBmYWxzZSxcbiAgICAgIHByZXZQYWdlOiAnJyxcbiAgICAgIHNvdXJjZVR5cGU6ICcnLFxuICAgICAgc291cmNlSWQ6ICcnLFxuICAgICAgY291bnQ6ICcnLFxuICAgICAgb3JkZXJJZDogJycsXG4gICAgICBkZXRhaWw6ICcnLFxuICAgICAgZ2V0VG9rZW5UaW1lOiAwLFxuICAgICAgbWVtbzogJydcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInR5cGVcIjpcIjVcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBZGQgKHBhcmFtKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9lZGl0QWRkP2RldGFpbD0nICsgSlNPTi5zdHJpbmdpZnkocGFyYW0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29OZXdBZGQgKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbmV3QWRkJ1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaQnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICBfdGhpcy5kZWxldGVBZGQoaWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGJhY2tUb09yZGVyIChpbmRleCwgaWQpIHtcbiAgICAgICAgLy8gdmFyIHBhZ2UgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgIC8vIHZhciBwcmUgPSBwYWdlW3BhZ2UubGVuZ3RoIC0gMl0ucm91dGVcbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXljYXJ0Jykge1xuICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL3BheWNhcnQ/dXNlcj0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5hZGRyZXNzW2luZGV4XSkgKyAnJm1lbW89JyArIHRoaXMubWVtb1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudCArICcmbWVtbz0nICsgdGhpcy5tZW1vXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByZXZQYWdlID09PSAnb3JkZXJkZXRhaWwnKSB7XG4gICAgICAgICAgdGhpcy5lZGl0T3JkZXJBZGQoaWQsICgpID0+IHtcbiAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4vb3JkZXJEZXRhaWw/aWQ9JyArIHRoaXMub3JkZXJJZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRBZGQgKCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB0aGlzLiRwYXJlbnQuc2hvd0xvYWRpbmcoKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLmFkZHJlc3MgPSBbXVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuJHBhcmVudC5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5waG9uZSA9IGl0ZW0ucGhvbmVcbiAgICAgICAgICAgIG9iai5hZGQgPSBpdGVtLmFyZWFGdWxsTmFtZSArIGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBvYmoucG9zdENvZGUgPSBpdGVtLnBvc3RDb2RlXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxOYW1lID0gaXRlbS5hcmVhRnVsbE5hbWVcbiAgICAgICAgICAgIG9iai5hcmVhRnVsbElkID0gaXRlbS5hcmVhRnVsbElkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5zb3J0KChhZGQxLCBhZGQyKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBhZGQyLmlkIC0gYWRkMS5pZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmlzTnVsbCA9IHRydWVcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIF90aGlzLiRwYXJlbnQuaGlkZUxvYWRpbmcoKVxuICAgICAgICBfdGhpcy5pc051bGwgPSB0cnVlXG4gICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd0ZhaWwoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZWRpdE9yZGVyQWRkIChpZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBvcmRlcklkOiB0aGlzLm9yZGVySWQsXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5FZGl0T3JkZXJBZGQoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKGRhdGEpIHtcbiAgICAgIHRoaXMucHJldlBhZ2UgPSBkYXRhLnBhZ2VcbiAgICAgIHRoaXMuc291cmNlVHlwZSA9IGRhdGEuc291cmNlVHlwZVxuICAgICAgdGhpcy5zb3VyY2VJZCA9IGRhdGEuc291cmNlSWRcbiAgICAgIHRoaXMuY291bnQgPSBkYXRhLmNvdW50XG4gICAgICB0aGlzLm9yZGVySWQgPSBkYXRhLmlkXG4gICAgICB0aGlzLm1lbW8gPSBkYXRhLm1lbW9cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=