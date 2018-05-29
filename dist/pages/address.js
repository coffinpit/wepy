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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiQWRkcmVzcyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwidG9rZW4iLCJhZGRyZXNzIiwiaXNOdWxsIiwicHJldlBhZ2UiLCJzb3VyY2VUeXBlIiwic291cmNlSWQiLCJjb3VudCIsIm9yZGVySWQiLCJkZXRhaWwiLCJnZXRUb2tlblRpbWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJkZWZlY3QiLCJtZXRob2RzIiwiZWRpdEFkZCIsInBhcmFtIiwibmF2aWdhdGVUbyIsInVybCIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb05ld0FkZCIsImRlbGV0ZUFkZCIsImlkIiwiX3RoaXMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsImJhY2tUb09yZGVyIiwiaW5kZXgiLCJyZWRpcmVjdFRvIiwiZWRpdE9yZGVyQWRkIiwiJHBhcmVudCIsImdldFRva2VuIiwic2hvd0xvYWRpbmciLCJIdHRwUmVxdWVzdCIsIkdldEFkZHJlc3MiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJsZW5ndGgiLCJmb3JFYWNoIiwiaXRlbSIsIm9iaiIsIm5hbWUiLCJwaG9uZSIsImFkZCIsImFyZWFGdWxsTmFtZSIsImFyZWFJZCIsInBvc3RDb2RlIiwiYXJlYUZ1bGxJZCIsInB1c2giLCJtaXNzVG9rZW4iLCJpbml0QWRkIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImFkZHJlc3NJZCIsIkRlbGV0ZUFkZHJlc3MiLCJjYiIsIkVkaXRPcmRlckFkZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7MkxBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssU0FHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxlQUFTLEVBRko7QUFHTEMsY0FBUSxLQUhIO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsa0JBQVksRUFMUDtBQU1MQyxnQkFBVSxFQU5MO0FBT0xDLGFBQU8sRUFQRjtBQVFMQyxlQUFTLEVBUko7QUFTTEMsY0FBUSxFQVRIO0FBVUxDLG9CQUFjO0FBVlQsSyxTQVlSQyxPLEdBQVUsRSxTQUNiQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsUUFBTyxHQUFSLEVBQVYsRSxTQUNUQyxPLEdBQVUsRSxTQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFNBR1ZDLE8sR0FBVTtBQUNSQyxhQURRLG1CQUNDQyxLQURELEVBQ1E7QUFDZCx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLLHNCQUFzQkMsS0FBS0MsU0FBTCxDQUFlSixLQUFmO0FBRGIsU0FBaEI7QUFHRCxPQUxPO0FBTVJLLGNBTlEsc0JBTUk7QUFDVix1QkFBS0osVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQVZPO0FBV1JJLGVBWFEscUJBV0dDLEVBWEgsRUFXTztBQUNiLFlBQUlDLFFBQVEsSUFBWjtBQUNBLHVCQUFLQyxTQUFMLENBQWU7QUFDYkMsaUJBQU8sSUFETTtBQUViQyxtQkFBUyxNQUZJO0FBR2JDLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUlBLElBQUlDLE9BQVIsRUFBaUI7QUFDZk4sb0JBQU1GLFNBQU4sQ0FBZ0JDLEVBQWhCO0FBQ0Q7QUFDRjtBQVBZLFNBQWY7QUFTRCxPQXRCTztBQXVCUlEsaUJBdkJRLHVCQXVCS0MsS0F2QkwsRUF1QllULEVBdkJaLEVBdUJnQjtBQUFBOztBQUN0QjtBQUNBO0FBQ0EsWUFBSSxLQUFLckIsUUFBTCxLQUFrQixTQUF0QixFQUFpQztBQUMvQix5QkFBSytCLFVBQUwsQ0FBZ0I7QUFDZGYsaUJBQUssb0JBQW9CQyxLQUFLQyxTQUFMLENBQWUsS0FBS3BCLE9BQUwsQ0FBYWdDLEtBQWIsQ0FBZjtBQURYLFdBQWhCO0FBR0Q7QUFDRCxZQUFJLEtBQUs5QixRQUFMLEtBQWtCLFFBQXRCLEVBQWdDO0FBQzlCLHlCQUFLK0IsVUFBTCxDQUFnQjtBQUNkZixpQkFBSyxtQkFBbUJDLEtBQUtDLFNBQUwsQ0FBZSxLQUFLcEIsT0FBTCxDQUFhZ0MsS0FBYixDQUFmLENBQW5CLEdBQXlELFFBQXpELEdBQW9FLEtBQUs3QixVQUF6RSxHQUFzRixNQUF0RixHQUErRixLQUFLQyxRQUFwRyxHQUErRyxTQUEvRyxHQUEySCxLQUFLQztBQUR2SCxXQUFoQjtBQUdEO0FBQ0QsWUFBSSxLQUFLSCxRQUFMLEtBQWtCLE9BQXRCLEVBQStCO0FBQzdCLGVBQUtnQyxZQUFMLENBQWtCWCxFQUFsQixFQUFzQixZQUFNO0FBQzFCLDJCQUFLTixVQUFMLENBQWdCO0FBQ2RDLG1CQUFLO0FBRFMsYUFBaEI7QUFHRCxXQUpEO0FBS0Q7QUFDRCxZQUFJLEtBQUtoQixRQUFMLEtBQWtCLGFBQXRCLEVBQXFDO0FBQ25DLGVBQUtnQyxZQUFMLENBQWtCWCxFQUFsQixFQUFzQixZQUFNO0FBQzFCLDJCQUFLTixVQUFMLENBQWdCO0FBQ2RDLG1CQUFLLHNCQUFzQixPQUFLWjtBQURsQixhQUFoQjtBQUdELFdBSkQ7QUFLRDtBQUNGO0FBbERPLEs7Ozs7OzhCQW9EQztBQUFBOztBQUNULFdBQUtQLEtBQUwsR0FBYSxLQUFLb0MsT0FBTCxDQUFhQyxRQUFiLEVBQWI7QUFDQSxXQUFLRCxPQUFMLENBQWFFLFdBQWI7QUFDQSxVQUFJYixRQUFRLElBQVo7QUFDQSxVQUFJMUIsT0FBTztBQUNUQyxlQUFPLEtBQUtBO0FBREgsT0FBWDtBQUdBLFdBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0EsV0FBS21DLE9BQUwsQ0FBYUcsV0FBYixDQUF5QkMsVUFBekIsQ0FBb0N6QyxJQUFwQyxFQUEwQzBDLElBQTFDLENBQStDLFVBQUNYLEdBQUQsRUFBUztBQUN0RFksZ0JBQVFDLEdBQVIsQ0FBWWIsR0FBWjtBQUNBLFlBQUlBLElBQUkvQixJQUFKLENBQVM2QyxLQUFULEtBQW1CLENBQXZCLEVBQTBCO0FBQ3hCbkIsZ0JBQU1XLE9BQU4sQ0FBY1MsV0FBZDtBQUNBLGNBQUk5QyxPQUFPK0IsSUFBSS9CLElBQUosQ0FBU0EsSUFBcEI7QUFDQSxjQUFJQSxLQUFLK0MsTUFBTCxLQUFnQixDQUFwQixFQUF1QjtBQUNyQnJCLGtCQUFNdkIsTUFBTixHQUFlLElBQWY7QUFDRCxXQUZELE1BRU87QUFDTHVCLGtCQUFNdkIsTUFBTixHQUFlLEtBQWY7QUFDRDtBQUNESCxlQUFLZ0QsT0FBTCxDQUFhLFVBQUNDLElBQUQsRUFBVTtBQUNyQixnQkFBSUMsTUFBTSxFQUFWO0FBQ0FBLGdCQUFJQyxJQUFKLEdBQVdGLEtBQUtFLElBQWhCO0FBQ0FELGdCQUFJRSxLQUFKLEdBQVlILEtBQUtHLEtBQWpCO0FBQ0FGLGdCQUFJRyxHQUFKLEdBQVVKLEtBQUtLLFlBQUwsR0FBb0JMLEtBQUsvQyxPQUFuQztBQUNBZ0QsZ0JBQUl6QyxNQUFKLEdBQWF3QyxLQUFLL0MsT0FBbEI7QUFDQWdELGdCQUFJekIsRUFBSixHQUFTd0IsS0FBS3hCLEVBQWQ7QUFDQXlCLGdCQUFJSyxNQUFKLEdBQWFOLEtBQUtNLE1BQWxCO0FBQ0FMLGdCQUFJTSxRQUFKLEdBQWVQLEtBQUtPLFFBQXBCO0FBQ0FOLGdCQUFJSSxZQUFKLEdBQW1CTCxLQUFLSyxZQUF4QjtBQUNBSixnQkFBSU8sVUFBSixHQUFpQlIsS0FBS1EsVUFBdEI7QUFDQS9CLGtCQUFNeEIsT0FBTixDQUFjd0QsSUFBZCxDQUFtQlIsR0FBbkI7QUFDRCxXQVpEO0FBYUQsU0FyQkQsTUFxQk87QUFDTHhCLGdCQUFNdkIsTUFBTixHQUFlLElBQWY7QUFDQSxjQUFJdUIsTUFBTVcsT0FBTixDQUFjc0IsU0FBbEIsRUFBNkI7QUFDM0JqQyxrQkFBTXpCLEtBQU4sR0FBYyxPQUFLb0MsT0FBTCxDQUFhQyxRQUFiLENBQXNCUCxJQUFJL0IsSUFBSixDQUFTNkMsS0FBL0IsQ0FBZDtBQUNBbkIsa0JBQU1rQyxPQUFOO0FBQ0Q7QUFDRjtBQUNEbEMsY0FBTW1DLE1BQU47QUFDRCxPQS9CRCxFQStCR0MsS0EvQkgsQ0ErQlMsWUFBTTtBQUNicEMsY0FBTXZCLE1BQU4sR0FBZSxJQUFmO0FBQ0F1QixjQUFNVyxPQUFOLENBQWMwQixRQUFkO0FBQ0QsT0FsQ0Q7QUFtQ0Q7Ozs4QkFDVXRDLEUsRUFBSTtBQUFBOztBQUNiLFdBQUt4QixLQUFMLEdBQWEsS0FBS29DLE9BQUwsQ0FBYUMsUUFBYixFQUFiO0FBQ0EsVUFBSVosUUFBUSxJQUFaO0FBQ0EsVUFBSTFCLE9BQU87QUFDVEMsZUFBTyxLQUFLQSxLQURIO0FBRVQrRCxtQkFBV3ZDO0FBRkYsT0FBWDtBQUlBLFdBQUtZLE9BQUwsQ0FBYUcsV0FBYixDQUF5QnlCLGFBQXpCLENBQXVDakUsSUFBdkMsRUFBNkMwQyxJQUE3QyxDQUFrRCxVQUFDWCxHQUFELEVBQVM7QUFDekQsWUFBSUEsSUFBSS9CLElBQUosQ0FBUzZDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJuQixnQkFBTWtDLE9BQU47QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJbEMsTUFBTVcsT0FBTixDQUFjc0IsU0FBbEIsRUFBNkI7QUFDM0JqQyxrQkFBTXpCLEtBQU4sR0FBYyxPQUFLb0MsT0FBTCxDQUFhQyxRQUFiLENBQXNCUCxJQUFJL0IsSUFBSixDQUFTNkMsS0FBL0IsQ0FBZDtBQUNEO0FBQ0Y7QUFDRG5CLGNBQU1tQyxNQUFOO0FBQ0QsT0FURDtBQVVEOzs7aUNBQ2FwQyxFLEVBQUl5QyxFLEVBQUk7QUFBQTs7QUFDcEIsV0FBS2pFLEtBQUwsR0FBYSxLQUFLb0MsT0FBTCxDQUFhQyxRQUFiLEVBQWI7QUFDQSxVQUFJWixRQUFRLElBQVo7QUFDQSxVQUFJMUIsT0FBTztBQUNUQyxlQUFPLEtBQUtBLEtBREg7QUFFVE8saUJBQVMsS0FBS0EsT0FGTDtBQUdUd0QsbUJBQVd2QztBQUhGLE9BQVg7QUFLQSxXQUFLWSxPQUFMLENBQWFHLFdBQWIsQ0FBeUIyQixZQUF6QixDQUFzQ25FLElBQXRDLEVBQTRDMEMsSUFBNUMsQ0FBaUQsVUFBQ1gsR0FBRCxFQUFTO0FBQ3hEWSxnQkFBUUMsR0FBUixDQUFZYixHQUFaO0FBQ0EsWUFBSUEsSUFBSS9CLElBQUosQ0FBUzZDLEtBQVQsS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJxQixnQkFBTUEsSUFBTjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUl4QyxNQUFNVyxPQUFOLENBQWNzQixTQUFsQixFQUE2QjtBQUMzQmpDLGtCQUFNekIsS0FBTixHQUFjLE9BQUtvQyxPQUFMLENBQWFDLFFBQWIsQ0FBc0JQLElBQUkvQixJQUFKLENBQVM2QyxLQUEvQixDQUFkO0FBQ0Q7QUFDRjtBQUNGLE9BVEQ7QUFVRDs7OzJCQUNPN0MsSSxFQUFNO0FBQ1oyQyxjQUFRQyxHQUFSLENBQVk1QyxJQUFaO0FBQ0EsV0FBS0ksUUFBTCxHQUFnQkosS0FBS29FLElBQXJCO0FBQ0EsV0FBSy9ELFVBQUwsR0FBa0JMLEtBQUtLLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWFQLEtBQUtPLEtBQWxCO0FBQ0EsV0FBS0MsT0FBTCxHQUFlUixLQUFLeUIsRUFBcEI7QUFDQSxXQUFLb0MsTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLRCxPQUFMO0FBQ0Q7Ozs7RUF0S2tDLGVBQUtRLEk7O2tCQUFyQnZFLE8iLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlLbotKflnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBhZGRyZXNzOiBbXSxcbiAgICAgIGlzTnVsbDogZmFsc2UsXG4gICAgICBwcmV2UGFnZTogJycsXG4gICAgICBzb3VyY2VUeXBlOiAnJyxcbiAgICAgIHNvdXJjZUlkOiAnJyxcbiAgICAgIGNvdW50OiAnJyxcbiAgICAgIG9yZGVySWQ6ICcnLFxuICAgICAgZGV0YWlsOiAnJyxcbiAgICAgIGdldFRva2VuVGltZTogMFxuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGVmZWN0XCI6e1widHlwZVwiOlwiNVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgZWRpdEFkZCAocGFyYW0pIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2VkaXRBZGQ/ZGV0YWlsPScgKyBKU09OLnN0cmluZ2lmeShwYXJhbSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBnb05ld0FkZCAoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9uZXdBZGQnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZGVsZXRlQWRkIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpCcsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIF90aGlzLmRlbGV0ZUFkZChpZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYmFja1RvT3JkZXIgKGluZGV4LCBpZCkge1xuICAgICAgICAvLyB2YXIgcGFnZSA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgLy8gdmFyIHByZSA9IHBhZ2VbcGFnZS5sZW5ndGggLSAyXS5yb3V0ZVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ3BheWNhcnQnKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5Y2FydD91c2VyPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmFkZHJlc3NbaW5kZXhdKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdwYXlidXknKSB7XG4gICAgICAgICAgd2VweS5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgIHVybDogJy4vcGF5YnV5P3VzZXI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYWRkcmVzc1tpbmRleF0pICsgJyZ0eXBlPScgKyB0aGlzLnNvdXJjZVR5cGUgKyAnJmlkPScgKyB0aGlzLnNvdXJjZUlkICsgJyZjb3VudD0nICsgdGhpcy5jb3VudFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJldlBhZ2UgPT09ICdvcmRlcicpIHtcbiAgICAgICAgICB0aGlzLmVkaXRPcmRlckFkZChpZCwgKCkgPT4ge1xuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmV2UGFnZSA9PT0gJ29yZGVyZGV0YWlsJykge1xuICAgICAgICAgIHRoaXMuZWRpdE9yZGVyQWRkKGlkLCAoKSA9PiB7XG4gICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsP2lkPScgKyB0aGlzLm9yZGVySWRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0QWRkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy5hZGRyZXNzID0gW11cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc051bGwgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLm5hbWUgPSBpdGVtLm5hbWVcbiAgICAgICAgICAgIG9iai5waG9uZSA9IGl0ZW0ucGhvbmVcbiAgICAgICAgICAgIG9iai5hZGQgPSBpdGVtLmFyZWFGdWxsTmFtZSArIGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmRldGFpbCA9IGl0ZW0uYWRkcmVzc1xuICAgICAgICAgICAgb2JqLmlkID0gaXRlbS5pZFxuICAgICAgICAgICAgb2JqLmFyZWFJZCA9IGl0ZW0uYXJlYUlkXG4gICAgICAgICAgICBvYmoucG9zdENvZGUgPSBpdGVtLnBvc3RDb2RlXG4gICAgICAgICAgICBvYmouYXJlYUZ1bGxOYW1lID0gaXRlbS5hcmVhRnVsbE5hbWVcbiAgICAgICAgICAgIG9iai5hcmVhRnVsbElkID0gaXRlbS5hcmVhRnVsbElkXG4gICAgICAgICAgICBfdGhpcy5hZGRyZXNzLnB1c2gob2JqKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgIGlmIChfdGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgX3RoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICBfdGhpcy5pbml0QWRkKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGRlbGV0ZUFkZCAoaWQpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRGVsZXRlQWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuaW5pdEFkZCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGVkaXRPcmRlckFkZCAoaWQsIGNiKSB7XG4gICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgb3JkZXJJZDogdGhpcy5vcmRlcklkLFxuICAgICAgICBhZGRyZXNzSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuRWRpdE9yZGVyQWRkKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIGNiICYmIGNiKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgdGhpcy5wcmV2UGFnZSA9IGRhdGEucGFnZVxuICAgICAgdGhpcy5zb3VyY2VUeXBlID0gZGF0YS5zb3VyY2VUeXBlXG4gICAgICB0aGlzLnNvdXJjZUlkID0gZGF0YS5zb3VyY2VJZFxuICAgICAgdGhpcy5jb3VudCA9IGRhdGEuY291bnRcbiAgICAgIHRoaXMub3JkZXJJZCA9IGRhdGEuaWRcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdEFkZCgpXG4gICAgfVxuICB9XG4iXX0=