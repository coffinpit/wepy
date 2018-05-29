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

var NewAddress = function (_wepy$page) {
  _inherits(NewAddress, _wepy$page);

  function NewAddress() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NewAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NewAddress.__proto__ || Object.getPrototypeOf(NewAddress)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '新增地址'
    }, _this.data = {
      token: '',
      multiArray: [],
      multiIndex: [0, 0, 0],
      multiValue: '',
      multiAreaId: [],
      userName: '',
      userPhone: '',
      postcode: '',
      myreg: /^[1][3,4,5,7,8][0-9]{9}$/,
      userAdd: ''
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
      topArea: function topArea(e) {
        this.multiIndex = e.detail.value;
        // var temp = []
        // temp = this.multiValue.map((item, index) => {
        //   return this.multiAreaId[index][this.multiIndex[index]]
        // })
        // this.multiValue = temp
        // console.log(this.multiValue)
      },
      childArea: function childArea(e) {
        var _this2 = this;

        this.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
          case 0:
            // 选择省
            this.getCity(this.multiAreaId[0][e.detail.value], function () {
              _this2.getArea(_this2.multiAreaId[1][0]);
            });
            break;
          case 1:
            // 选择市
            console.log(this.multiAreaId[1][e.detail.value]);
            this.getArea(this.multiAreaId[1][e.detail.value]);
            break;
          case 2:
            this.multiIndex[2] = e.detail.value;
            this.multiValue = this.multiAreaId[2][e.detail.value];
            break;
        }
      },
      cancel: function cancel() {
        this.initTopArea();
      },
      confirm: function confirm() {
        var _this3 = this;

        console.log(this.multiValue);
        this.token = this.$parent.getToken();
        if (this.userName && this.userPhone && this.userAdd) {
          if (this.myreg.test(this.userPhone)) {
            var data = {
              token: this.token,
              name: this.userName,
              phone: this.userPhone,
              areaId: this.multiValue,
              detail: this.userAdd,
              postCode: this.postcode
            };
            this.$parent.HttpRequest.AddAddress(data).then(function (res) {
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

  _createClass(NewAddress, [{
    key: 'initTopArea',
    value: function initTopArea() {
      var _this4 = this;

      this.multiArray[0] = [];
      this.multiAreaId[0] = [];
      this.getAreaData(0, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.multiArray[0].push(item.area_name);
          _this4.multiAreaId[0].push(item.area_id);
          _this4.multiIndex = [0, 0, 0];
        });
        _this4.getCity(_this4.multiAreaId[0][0], function () {
          _this4.getArea(_this4.multiAreaId[1][0]);
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
    key: 'getChildData',
    value: function getChildData(id, cb) {
      var _this6 = this;

      var data = {
        areaId: id
      };
      this.$parent.HttpRequest.GetDetailArea(data).then(function (res) {
        console.log(res);
        if (res.data.error === 0) {
          cb && cb(res);
        }
        _this6.$apply();
      });
    }
  }, {
    key: 'getCity',
    value: function getCity(id, cb) {
      var _this7 = this;

      this.multiArray[1] = [];
      this.multiAreaId[1] = [];
      this.getAreaData(id, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this7.multiArray[1].push(item.area_name);
          _this7.multiAreaId[1].push(item.area_id);
        });
        _this7.multiIndex[1] = 0;
        cb && cb();
      });
    }
  }, {
    key: 'getArea',
    value: function getArea(id) {
      var _this8 = this;

      this.multiArray[2] = [];
      this.multiAreaId[2] = [];
      this.getAreaData(id, function (res) {
        var data = res.data.data;
        data.forEach(function (item) {
          _this8.multiArray[2].push(item.area_name);
          _this8.multiAreaId[2].push(item.area_id);
        });
        _this8.multiIndex[2] = 0;
        _this8.multiValue = _this8.multiAreaId[2][0];
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initTopArea();
      this.$apply();
    }
  }]);

  return NewAddress;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(NewAddress , 'pages/newAdd'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJOZXdBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsIm11bHRpQXJyYXkiLCJtdWx0aUluZGV4IiwibXVsdGlWYWx1ZSIsIm11bHRpQXJlYUlkIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJwb3N0Y29kZSIsIm15cmVnIiwidXNlckFkZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hbWVUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJwaG9uZVRhcCIsInBvc3RUYXAiLCJ1c2VyQWRkVGFwIiwidG9wQXJlYSIsImNoaWxkQXJlYSIsImNvbHVtbiIsImdldENpdHkiLCJnZXRBcmVhIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsIkh0dHBSZXF1ZXN0IiwiQWRkQWRkcmVzcyIsInRoZW4iLCJyZXMiLCJlcnJvciIsIm5hdmlnYXRlQmFjayIsIm1pc3NUb2tlbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImdldEFyZWFEYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiYXJlYV9uYW1lIiwiYXJlYV9pZCIsImlkIiwiY2IiLCJwYXJlbnRJZCIsIkdldFRvcEFyZWEiLCIkYXBwbHkiLCJHZXREZXRhaWxBcmVhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGFBQU8sRUFERjtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGtCQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBSFA7QUFJTEMsa0JBQVksRUFKUDtBQUtM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QUFLQyxXQUFMLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLENBQWxCO0FBQ0QsT0FSRDtBQVNEOzs7NkJBQ1M7QUFDUixXQUFLdUIsV0FBTDtBQUNBLFdBQUs2QixNQUFMO0FBQ0Q7Ozs7RUFsTHFDLGVBQUtFLEk7O2tCQUF4QjlELFUiLCJmaWxlIjoibmV3QWRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3QWRkcmVzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aWsOWinuWcsOWdgCdcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIG11bHRpQXJyYXk6IFtdLFxuICAgICAgbXVsdGlJbmRleDogWzAsIDAsIDBdLFxuICAgICAgbXVsdGlWYWx1ZTogJycsXG4gICAgICBtdWx0aUFyZWFJZDogW10sXG4gICAgICB1c2VyTmFtZTogJycsXG4gICAgICB1c2VyUGhvbmU6ICcnLFxuICAgICAgcG9zdGNvZGU6ICcnLFxuICAgICAgbXlyZWc6IC9eWzFdWzMsNCw1LDcsOF1bMC05XXs5fSQvLFxuICAgICAgdXNlckFkZDogJydcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICAvLyBtdWx0aVZhbHVlICgpIHtcbiAgICAgIC8vICAgdmFyIHRlbXBBcnIgPSBbXVxuICAgICAgLy8gICB0aGlzLm11bHRpQXJlYUlkLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAvLyAgICAgdGVtcEFyci5wdXNoKGl0ZW1bMF0pXG4gICAgICAvLyAgIH0pXG4gICAgICAvLyAgIHJldHVybiB0ZW1wQXJyXG4gICAgICAvLyB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYW1lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgdG9wQXJlYSAoZSkge1xuICAgICAgICB0aGlzLm11bHRpSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAvLyB2YXIgdGVtcCA9IFtdXG4gICAgICAgIC8vIHRlbXAgPSB0aGlzLm11bHRpVmFsdWUubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyAgIHJldHVybiB0aGlzLm11bHRpQXJlYUlkW2luZGV4XVt0aGlzLm11bHRpSW5kZXhbaW5kZXhdXVxuICAgICAgICAvLyB9KVxuICAgICAgICAvLyB0aGlzLm11bHRpVmFsdWUgPSB0ZW1wXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubXVsdGlWYWx1ZSlcbiAgICAgIH0sXG4gICAgICBjaGlsZEFyZWEgKGUpIHtcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICBzd2l0Y2ggKGUuZGV0YWlsLmNvbHVtbikge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIOmAieaLqeecgVxuICAgICAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMubXVsdGlBcmVhSWRbMF1bZS5kZXRhaWwudmFsdWVdLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLm11bHRpQXJlYUlkWzFdWzBdKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8g6YCJ5oup5biCXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpQXJlYUlkWzFdW2UuZGV0YWlsLnZhbHVlXSlcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLm11bHRpQXJlYUlkWzFdW2UuZGV0YWlsLnZhbHVlXSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMubXVsdGlBcmVhSWRbMl1bZS5kZXRhaWwudmFsdWVdXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2FuY2VsICgpIHtcbiAgICAgICAgdGhpcy5pbml0VG9wQXJlYSgpXG4gICAgICB9LFxuICAgICAgY29uZmlybSAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXVsdGlWYWx1ZSlcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICh0aGlzLnVzZXJOYW1lICYmIHRoaXMudXNlclBob25lICYmIHRoaXMudXNlckFkZCkge1xuICAgICAgICAgIGlmICh0aGlzLm15cmVnLnRlc3QodGhpcy51c2VyUGhvbmUpKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMudXNlck5hbWUsXG4gICAgICAgICAgICAgIHBob25lOiB0aGlzLnVzZXJQaG9uZSxcbiAgICAgICAgICAgICAgYXJlYUlkOiB0aGlzLm11bHRpVmFsdWUsXG4gICAgICAgICAgICAgIGRldGFpbDogdGhpcy51c2VyQWRkLFxuICAgICAgICAgICAgICBwb3N0Q29kZTogdGhpcy5wb3N0Y29kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnlrozmlbTmlLbotKfkv6Hmga8nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXlbMF0gPSBbXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFswXSA9IFtdXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKDAsIChyZXMpID0+IHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMubXVsdGlBcnJheVswXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMF0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4ID0gWzAsIDAsIDBdXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJlYUlkWzBdWzBdLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcmVhSWRbMV1bMF0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhRGF0YSAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFyZW50SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYihyZXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2hpbGREYXRhIChpZCwgY2IpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhcmVhSWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0RGV0YWlsQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYihyZXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2l0eSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXlbMV0gPSBbXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsxXSA9IFtdXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQXJyYXlbMV0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLm11bHRpQXJlYUlkWzFdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSAwXG4gICAgICAgIGNiICYmIGNiKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldEFyZWEgKGlkKSB7XG4gICAgICB0aGlzLm11bHRpQXJyYXlbMl0gPSBbXVxuICAgICAgdGhpcy5tdWx0aUFyZWFJZFsyXSA9IFtdXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQXJyYXlbMl0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLm11bHRpQXJlYUlkWzJdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSAwXG4gICAgICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMubXVsdGlBcmVhSWRbMl1bMF1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==