'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditAddress = function (_wepy$page) {
  _inherits(EditAddress, _wepy$page);

  function EditAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditAddress.__proto__ || Object.getPrototypeOf(EditAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '编辑地址'
    }, _this.data = {
      token: '',
      userName: '',
      userPhone: '',
      postcode: '',
      fullarea: '',
      areaFullName: '',
      id: '',
      myreg: /^[1][3,4,5,7,8][0-9]{9}$/,
      userAdd: '',
      topArray: [],
      topIndex: 0,
      topAreaId: [],
      cityArray: [],
      cityIndex: 0,
      cityAreaId: [],
      disArray: [],
      disIndex: 0,
      disAreaId: [],
      pickerValue: '',
      result: ['请选择省', '请选择市', '请选择区'],
      topDisable: true,
      cityDisable: true,
      disDisable: true
    }, _this.computed = {
      // multiValue () {
      //   var tempArr = []
      //   this.multiAreaId.forEach((item, index) => {
      //     tempArr.push(item[0])
      //   })
      //   return tempArr
      // }
    }, _this.methods = {
      nameTap: function nameTap(e) {
        this.userName = e.detail.value;
        return this.userName;
      },
      phoneTap: function phoneTap(e) {
        this.userPhone = e.detail.value;
        return this.userPhone;
      },
      postTap: function postTap(e) {
        this.postcode = e.detail.value;
        return this.postcode;
      },
      userAddTap: function userAddTap(e) {
        this.userAdd = e.detail.value;
      },
      pickTopArea: function pickTopArea(e) {
        var _this2 = this;

        this.topIndex = e.detail.value;
        this.result[0] = this.topArray[this.topIndex];
        this.result[1] = '请选择市';
        this.result[2] = '请选择区';
        this.getCity(this.topAreaId[this.topIndex], function () {
          _this2.getArea(_this2.cityAreaId[0]);
        });
      },
      pickCity: function pickCity(e) {
        this.cityIndex = e.detail.value;
        this.result[1] = this.cityArray[this.cityIndex];
        this.result[2] = '请选择区';
        this.getArea(this.cityAreaId[this.cityIndex]);
      },
      pickDistrict: function pickDistrict(e) {
        this.disIndex = e.detail.value;
        this.result[2] = this.disArray[this.disIndex];
        this.pickerValue = this.disAreaId[this.disIndex];
      },
      cancel: function cancel() {
        this.initTopArea();
      },
      confirm: function confirm() {
        var _this3 = this;

        this.token = this.$parent.getToken();
        if (this.userName && this.userPhone && this.userAdd && this.pickerValue) {
          if (this.myreg.test(this.userPhone)) {
            var data = {
              token: this.token,
              name: this.userName,
              phone: this.userPhone,
              areaId: this.pickerValue,
              detail: this.userAdd,
              postCode: this.postcode,
              addressId: this.id
            };
            this.$parent.HttpRequest.EditAddress(data).then(function (res) {
              console.log(res);
              if (res.data.error === 0) {
                _wepy2.default.navigateBack();
              } else {
                if (_this3.$parent.missToken) {
                  _this3.token = _this3.$parent.getToken(res.data.error);
                }
              }
            });
          } else {
            _wepy2.default.showToast({
              title: '请输入正确的手机号',
              icon: 'none'
            });
          }
        } else {
          _wepy2.default.showToast({
            title: '请填写完整收货信息',
            icon: 'none'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditAddress, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var _this4 = this;

      this.result = this.areaFullName;
      this.topArray = [];
      this.topAreaId = [];
      this.topIndex = 0;
      this.getAreaData(0, function (res) {
        _this4.topDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.topArray.push(item.area_name);
          _this4.topAreaId.push(item.area_id);
          _this4.topIndex = _this4.topAreaId.indexOf(parseInt(_this4.fullarea[0]));
        });
        _this4.getCity(_this4.fullarea[0], function () {
          _this4.cityIndex = _this4.cityAreaId.indexOf(parseInt(_this4.fullarea[1]));
          _this4.getArea(_this4.fullarea[1], function () {
            _this4.disIndex = _this4.disAreaId.indexOf(parseInt(_this4.fullarea[2]));
          });
        });
      });
    }
  }, {
    key: 'getAreaData',
    value: function getAreaData(id, cb) {
      var _this5 = this;

      var data = {
        parentId: id
      };
      this.$parent.HttpRequest.GetTopArea(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb(res);
        }
        _this5.$apply();
      });
    }
  }, {
    key: 'getCity',
    value: function getCity(id, cb) {
      var _this6 = this;

      this.cityDisable = true;
      this.cityArray = [];
      this.cityAreaId = [];
      this.cityIndex = 0;
      this.getAreaData(id, function (res) {
        _this6.cityDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this6.cityArray.push(item.area_name);
          _this6.cityAreaId.push(item.area_id);
        });
        cb && cb();
      });
    }
  }, {
    key: 'getArea',
    value: function getArea(id, cb) {
      var _this7 = this;

      this.disDisable = true;
      this.disArray = [];
      this.disAreaId = [];
      this.disIndex = 0;
      this.getAreaData(id, function (res) {
        _this7.disDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this7.disArray.push(item.area_name);
          _this7.disAreaId.push(item.area_id);
        });
        cb && cb();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      if (param) {
        var address = JSON.parse(param.detail);
        this.userName = address.name;
        this.userPhone = address.phone;
        this.userAdd = address.detail;
        this.postcode = address.postCode;
        this.fullarea = address.areaFullId.split(',');
        this.areaFullName = address.areaFullName.split(',');
        this.id = address.id;
      }
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initTopArea();
      this.$apply();
    }
  }]);

  return EditAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditAddress , 'pages/editAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGQuanMiXSwibmFtZXMiOlsiRWRpdEFkZHJlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInRva2VuIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJwb3N0Y29kZSIsImZ1bGxhcmVhIiwiYXJlYUZ1bGxOYW1lIiwiaWQiLCJteXJlZyIsInVzZXJBZGQiLCJ0b3BBcnJheSIsInRvcEluZGV4IiwidG9wQXJlYUlkIiwiY2l0eUFycmF5IiwiY2l0eUluZGV4IiwiY2l0eUFyZWFJZCIsImRpc0FycmF5IiwiZGlzSW5kZXgiLCJkaXNBcmVhSWQiLCJwaWNrZXJWYWx1ZSIsInJlc3VsdCIsInRvcERpc2FibGUiLCJjaXR5RGlzYWJsZSIsImRpc0Rpc2FibGUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJuYW1lVGFwIiwiZSIsImRldGFpbCIsInZhbHVlIiwicGhvbmVUYXAiLCJwb3N0VGFwIiwidXNlckFkZFRhcCIsInBpY2tUb3BBcmVhIiwiZ2V0Q2l0eSIsImdldEFyZWEiLCJwaWNrQ2l0eSIsInBpY2tEaXN0cmljdCIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsImFkZHJlc3NJZCIsIkh0dHBSZXF1ZXN0IiwidGhlbiIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIm5hdmlnYXRlQmFjayIsIm1pc3NUb2tlbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdldEFyZWFEYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiYXJlYV9uYW1lIiwiYXJlYV9pZCIsImluZGV4T2YiLCJwYXJzZUludCIsImNiIiwicGFyZW50SWQiLCJHZXRUb3BBcmVhIiwiJGFwcGx5IiwicGFyYW0iLCJhZGRyZXNzIiwiSlNPTiIsInBhcnNlIiwiYXJlYUZ1bGxJZCIsInNwbGl0IiwicGFnZSJd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QyxXQUFMO0FBQ0EsV0FBS2dDLE1BQUw7QUFDRDs7OztFQWpNc0MsZUFBS08sSTs7a0JBQXpCakYsVyIsImZpbGUiOiJlZGl0QWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRpdEFkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvJbovpHlnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnLFxuICAgICAgcG9zdGNvZGU6ICcnLFxuICAgICAgZnVsbGFyZWE6ICcnLFxuICAgICAgYXJlYUZ1bGxOYW1lOiAnJyxcbiAgICAgIGlkOiAnJyxcbiAgICAgIG15cmVnOiAvXlsxXVszLDQsNSw3LDhdWzAtOV17OX0kLyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9wQXJyYXk6IFtdLFxuICAgICAgdG9wSW5kZXg6IDAsXG4gICAgICB0b3BBcmVhSWQ6IFtdLFxuICAgICAgY2l0eUFycmF5OiBbXSxcbiAgICAgIGNpdHlJbmRleDogMCxcbiAgICAgIGNpdHlBcmVhSWQ6IFtdLFxuICAgICAgZGlzQXJyYXk6IFtdLFxuICAgICAgZGlzSW5kZXg6IDAsXG4gICAgICBkaXNBcmVhSWQ6IFtdLFxuICAgICAgcGlja2VyVmFsdWU6ICcnLFxuICAgICAgcmVzdWx0OiBbJ+ivt+mAieaLqeecgScsICfor7fpgInmi6nluIInLCAn6K+36YCJ5oup5Yy6J10sXG4gICAgICB0b3BEaXNhYmxlOiB0cnVlLFxuICAgICAgY2l0eURpc2FibGU6IHRydWUsXG4gICAgICBkaXNEaXNhYmxlOiB0cnVlXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgLy8gbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAvLyAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gICByZXR1cm4gdGVtcEFyclxuICAgICAgLy8gfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmFtZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWVcbiAgICAgIH0sXG4gICAgICBwaG9uZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJQaG9uZVxuICAgICAgfSxcbiAgICAgIHBvc3RUYXAgKGUpIHtcbiAgICAgICAgdGhpcy5wb3N0Y29kZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3Rjb2RlXG4gICAgICB9LFxuICAgICAgdXNlckFkZFRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJBZGQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcbiAgICAgIHBpY2tUb3BBcmVhIChlKSB7XG4gICAgICAgIHRoaXMudG9wSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLnJlc3VsdFswXSA9IHRoaXMudG9wQXJyYXlbdGhpcy50b3BJbmRleF1cbiAgICAgICAgdGhpcy5yZXN1bHRbMV0gPSAn6K+36YCJ5oup5biCJ1xuICAgICAgICB0aGlzLnJlc3VsdFsyXSA9ICfor7fpgInmi6nljLonXG4gICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLnRvcEFyZWFJZFt0aGlzLnRvcEluZGV4XSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLmNpdHlBcmVhSWRbMF0pXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcGlja0NpdHkgKGUpIHtcbiAgICAgICAgdGhpcy5jaXR5SW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLnJlc3VsdFsxXSA9IHRoaXMuY2l0eUFycmF5W3RoaXMuY2l0eUluZGV4XVxuICAgICAgICB0aGlzLnJlc3VsdFsyXSA9ICfor7fpgInmi6nljLonXG4gICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLmNpdHlBcmVhSWRbdGhpcy5jaXR5SW5kZXhdKVxuICAgICAgfSxcbiAgICAgIHBpY2tEaXN0cmljdCAoZSkge1xuICAgICAgICB0aGlzLmRpc0luZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5yZXN1bHRbMl0gPSB0aGlzLmRpc0FycmF5W3RoaXMuZGlzSW5kZXhdXG4gICAgICAgIHRoaXMucGlja2VyVmFsdWUgPSB0aGlzLmRpc0FyZWFJZFt0aGlzLmRpc0luZGV4XVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm0gKCkge1xuICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKClcbiAgICAgICAgaWYgKHRoaXMudXNlck5hbWUgJiYgdGhpcy51c2VyUGhvbmUgJiYgdGhpcy51c2VyQWRkICYmIHRoaXMucGlja2VyVmFsdWUpIHtcbiAgICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMudXNlclBob25lKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgIGFyZWFJZDogdGhpcy5waWNrZXJWYWx1ZSxcbiAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLnVzZXJBZGQsXG4gICAgICAgICAgICAgIHBvc3RDb2RlOiB0aGlzLnBvc3Rjb2RlLFxuICAgICAgICAgICAgICBhZGRyZXNzSWQ6IHRoaXMuaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5FZGl0QWRkcmVzcyhkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4ocmVzLmRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5q2j56Gu55qE5omL5py65Y+3JyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+Whq+WGmeWujOaVtOaUtui0p+S/oeaBrycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRUb3BBcmVhICgpIHtcbiAgICAgIHRoaXMucmVzdWx0ID0gdGhpcy5hcmVhRnVsbE5hbWVcbiAgICAgIHRoaXMudG9wQXJyYXkgPSBbXVxuICAgICAgdGhpcy50b3BBcmVhSWQgPSBbXVxuICAgICAgdGhpcy50b3BJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoMCwgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLnRvcERpc2FibGUgPSBmYWxzZVxuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy50b3BBcnJheS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMudG9wQXJlYUlkLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICAgIHRoaXMudG9wSW5kZXggPSB0aGlzLnRvcEFyZWFJZC5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMF0pKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmdldENpdHkodGhpcy5mdWxsYXJlYVswXSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2l0eUluZGV4ID0gdGhpcy5jaXR5QXJlYUlkLmluZGV4T2YocGFyc2VJbnQodGhpcy5mdWxsYXJlYVsxXSkpXG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMuZnVsbGFyZWFbMV0sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzSW5kZXggPSB0aGlzLmRpc0FyZWFJZC5pbmRleE9mKHBhcnNlSW50KHRoaXMuZnVsbGFyZWFbMl0pKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhRGF0YSAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFyZW50SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYihyZXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2l0eSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLmNpdHlEaXNhYmxlID0gdHJ1ZVxuICAgICAgdGhpcy5jaXR5QXJyYXkgPSBbXVxuICAgICAgdGhpcy5jaXR5QXJlYUlkID0gW11cbiAgICAgIHRoaXMuY2l0eUluZGV4ID0gMFxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmNpdHlEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2l0eUFycmF5LnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5jaXR5QXJlYUlkLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhIChpZCwgY2IpIHtcbiAgICAgIHRoaXMuZGlzRGlzYWJsZSA9IHRydWVcbiAgICAgIHRoaXMuZGlzQXJyYXkgPSBbXVxuICAgICAgdGhpcy5kaXNBcmVhSWQgPSBbXVxuICAgICAgdGhpcy5kaXNJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5kaXNEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzQXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLmRpc0FyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkIChwYXJhbSkge1xuICAgICAgaWYgKHBhcmFtKSB7XG4gICAgICAgIHZhciBhZGRyZXNzID0gSlNPTi5wYXJzZShwYXJhbS5kZXRhaWwpXG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBhZGRyZXNzLm5hbWVcbiAgICAgICAgdGhpcy51c2VyUGhvbmUgPSBhZGRyZXNzLnBob25lXG4gICAgICAgIHRoaXMudXNlckFkZCA9IGFkZHJlc3MuZGV0YWlsXG4gICAgICAgIHRoaXMucG9zdGNvZGUgPSBhZGRyZXNzLnBvc3RDb2RlXG4gICAgICAgIHRoaXMuZnVsbGFyZWEgPSBhZGRyZXNzLmFyZWFGdWxsSWQuc3BsaXQoJywnKVxuICAgICAgICB0aGlzLmFyZWFGdWxsTmFtZSA9IGFkZHJlc3MuYXJlYUZ1bGxOYW1lLnNwbGl0KCcsJylcbiAgICAgICAgdGhpcy5pZCA9IGFkZHJlc3MuaWRcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgb25TaG93ICgpIHtcbiAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19