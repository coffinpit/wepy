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
      address: []
    }, _this2.$repeat = {}, _this2.$props = { "defect": { "xmlns:wx": "" } }, _this2.$events = {}, _this2.components = {
      defect: _defect2.default
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.address.length === 0) {
          return true;
        } else {
          return false;
        }
      }
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
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Address, [{
    key: 'initAdd',
    value: function initAdd() {
      var _this = this;
      var data = {
        token: this.token
      };
      this.$parent.HttpRequest.GetAddress(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          var data = res.data.data;
          data.forEach(function (item) {
            var obj = {};
            obj.name = item.name;
            obj.phone = item.phone;
            obj.add = item.address;
            obj.id = item.id;
            _this.address.push(obj);
          });
        }
        _this.$apply();
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
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken('address');
      this.initAdd();
      this.$apply();
    }
  }]);

  return Address;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Address , 'pages/address'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGVmZWN0IiwiY29tcHV0ZWQiLCJpc051bGwiLCJsZW5ndGgiLCJtZXRob2RzIiwiZWRpdEFkZCIsImdvTmV3QWRkIiwibmF2aWdhdGVUbyIsInVybCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIiRwYXJlbnQiLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZm9yRWFjaCIsIml0ZW0iLCJvYmoiLCJuYW1lIiwicGhvbmUiLCJhZGQiLCJwdXNoIiwiJGFwcGx5IiwiYWRkcmVzc0lkIiwiRGVsZXRlQWRkcmVzcyIsImluaXRBZGQiLCJnZXRUb2tlbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTO0FBRkosSyxTQUlSQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsWUFBVyxFQUFaLEVBQVYsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLFEsR0FBVztBQUNUQyxZQURTLG9CQUNDO0FBQ1IsWUFBSSxLQUFLUCxPQUFMLENBQWFRLE1BQWIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsaUJBQU8sSUFBUDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBUFEsSyxTQVNYQyxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRyxDQUNWLENBRk87QUFHUkMsY0FIUSxzQkFHSTtBQUNWLHVCQUFLQyxVQUFMLENBQWdCO0FBQ2RDLGVBQUs7QUFEUyxTQUFoQjtBQUdELE9BUE87QUFRUkMsZUFSUSxxQkFRR0MsRUFSSCxFQVFPO0FBQ2IsWUFBSUMsUUFBUSxJQUFaO0FBQ0EsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxJQURNO0FBRWJDLG1CQUFTLE1BRkk7QUFHYkMsbUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQixnQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmTixvQkFBTUYsU0FBTixDQUFnQkMsRUFBaEI7QUFDRDtBQUNGO0FBUFksU0FBZjtBQVNEO0FBbkJPLEs7Ozs7OzhCQXFCQztBQUNULFVBQUlDLFFBQVEsSUFBWjtBQUNBLFVBQUlsQixPQUFPO0FBQ1RDLGVBQU8sS0FBS0E7QUFESCxPQUFYO0FBR0EsV0FBS3dCLE9BQUwsQ0FBYUMsV0FBYixDQUF5QkMsVUFBekIsQ0FBb0MzQixJQUFwQyxFQUEwQzRCLElBQTFDLENBQStDLFVBQUNMLEdBQUQsRUFBUztBQUN0RE0sZ0JBQVFDLEdBQVIsQ0FBWVAsR0FBWjtBQUNBLFlBQUlBLElBQUl2QixJQUFKLENBQVMrQixLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGNBQUkvQixPQUFPdUIsSUFBSXZCLElBQUosQ0FBU0EsSUFBcEI7QUFDQUEsZUFBS2dDLE9BQUwsQ0FBYSxVQUFDQyxJQUFELEVBQVU7QUFDckIsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBQSxnQkFBSUMsSUFBSixHQUFXRixLQUFLRSxJQUFoQjtBQUNBRCxnQkFBSUUsS0FBSixHQUFZSCxLQUFLRyxLQUFqQjtBQUNBRixnQkFBSUcsR0FBSixHQUFVSixLQUFLL0IsT0FBZjtBQUNBZ0MsZ0JBQUlqQixFQUFKLEdBQVNnQixLQUFLaEIsRUFBZDtBQUNBQyxrQkFBTWhCLE9BQU4sQ0FBY29DLElBQWQsQ0FBbUJKLEdBQW5CO0FBQ0QsV0FQRDtBQVFEO0FBQ0RoQixjQUFNcUIsTUFBTjtBQUNELE9BZEQ7QUFlRDs7OzhCQUNVdEIsRSxFQUFJO0FBQ2IsVUFBSUMsUUFBUSxJQUFaO0FBQ0EsVUFBSWxCLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVR1QyxtQkFBV3ZCO0FBRkYsT0FBWDtBQUlBLFdBQUtRLE9BQUwsQ0FBYUMsV0FBYixDQUF5QmUsYUFBekIsQ0FBdUN6QyxJQUF2QyxFQUE2QzRCLElBQTdDLENBQWtELFVBQUNMLEdBQUQsRUFBUztBQUN6REwsY0FBTXdCLE9BQU47QUFDQXhCLGNBQU1xQixNQUFOO0FBQ0QsT0FIRDtBQUlEOzs7NkJBQ1M7QUFDUixXQUFLdEMsS0FBTCxHQUFhLEtBQUt3QixPQUFMLENBQWFrQixRQUFiLENBQXNCLFNBQXRCLENBQWI7QUFDQSxXQUFLRCxPQUFMO0FBQ0EsV0FBS0gsTUFBTDtBQUNEOzs7O0VBaEZrQyxlQUFLSyxJOztrQkFBckIvQyxPIiwiZmlsZSI6ImFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IERlZmVjdCBmcm9tICcuLi9jb21wb25lbnRzL2RlZmVjdCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pS26LSn5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgYWRkcmVzczogW11cbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImRlZmVjdFwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgZGVmZWN0OiBEZWZlY3RcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpc051bGwgKCkge1xuICAgICAgICBpZiAodGhpcy5hZGRyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBZGQgKCkge1xuICAgICAgfSxcbiAgICAgIGdvTmV3QWRkICgpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL25ld0FkZCdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6ZmkJyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlQWRkKGlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdEFkZCAoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW5cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoubmFtZSA9IGl0ZW0ubmFtZVxuICAgICAgICAgICAgb2JqLnBob25lID0gaXRlbS5waG9uZVxuICAgICAgICAgICAgb2JqLmFkZCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgX3RoaXMuYWRkcmVzcy5wdXNoKG9iailcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIF90aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWxldGVBZGQgKGlkKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgIGFkZHJlc3NJZDogaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5EZWxldGVBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKCdhZGRyZXNzJylcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=