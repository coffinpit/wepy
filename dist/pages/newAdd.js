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
      userName: '',
      userPhone: '',
      postcode: '',
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

      // topArea (e) {
      //   this.multiIndex = e.detail.value
      //   this.multiArray.forEach((item, index) => {
      //     this.result[index] = item[this.multiIndex[index]]
      //   })
      //   // var temp = []
      //   // temp = this.multiValue.map((item, index) => {
      //   //   return this.multiAreaId[index][this.multiIndex[index]]
      //   // })
      //   // this.multiValue = temp
      //   // console.log(this.multiValue)
      // },
      // childArea (e) {
      //   this.multiIndex[e.detail.column] = e.detail.value
      //   switch (e.detail.column) {
      //     case 0:
      //       // 选择省
      //       this.getCity(this.multiAreaId[0][e.detail.value], () => {
      //         this.getArea(this.multiAreaId[1][0])
      //       })
      //       break
      //     case 1:
      //       // 选择市
      //       console.log(this.multiAreaId[1][e.detail.value])
      //       this.getArea(this.multiAreaId[1][e.detail.value])
      //       break
      //     case 2:
      //       this.multiIndex[2] = e.detail.value
      //       this.multiValue = this.multiAreaId[2][e.detail.value]
      //       break
      //   }
      // },
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

    // initTopArea () {
    //   this.multiArray[0] = []
    //   this.multiAreaId[0] = []
    //   this.getAreaData(0, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[0].push(item.area_name)
    //       this.multiAreaId[0].push(item.area_id)
    //       this.multiIndex = [0, 0, 0]
    //     })
    //     this.getCity(this.multiAreaId[0][0], () => {
    //       this.getArea(this.multiAreaId[1][0])
    //     })
    //   })
    // }
    value: function initTopArea() {
      var _this4 = this;

      this.topArray = [];
      this.topAreaId = [];
      this.topIndex = 0;
      this.getAreaData(0, function (res) {
        _this4.topDisable = false;
        var data = res.data.data;
        data.forEach(function (item) {
          _this4.topArray.push(item.area_name);
          _this4.topAreaId.push(item.area_id);
        });
        _this4.getCity(_this4.topAreaId[0], function () {
          _this4.getArea(_this4.cityAreaId[0], function () {});
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
    // getCity (id, cb) {
    //   this.multiArray[1] = []
    //   this.multiAreaId[1] = []
    //   this.getAreaData(id, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[1].push(item.area_name)
    //       this.multiAreaId[1].push(item.area_id)
    //     })
    //     this.multiIndex[1] = 0
    //     cb && cb()
    //   })
    // }
    // getArea (id) {
    //   this.multiArray[2] = []
    //   this.multiAreaId[2] = []
    //   this.getAreaData(id, (res) => {
    //     var data = res.data.data
    //     data.forEach((item) => {
    //       this.multiArray[2].push(item.area_name)
    //       this.multiAreaId[2].push(item.area_id)
    //     })
    //     this.multiIndex[2] = 0
    //     this.multiValue = this.multiAreaId[2][0]
    //   })
    // }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJOZXdBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsInVzZXJOYW1lIiwidXNlclBob25lIiwicG9zdGNvZGUiLCJteXJlZyIsInVzZXJBZGQiLCJ0b3BBcnJheSIsInRvcEluZGV4IiwidG9wQXJlYUlkIiwiY2l0eUFycmF5IiwiY2l0eUluZGV4IiwiY2l0eUFyZWFJZCIsImRpc0FycmF5IiwiZGlzSW5kZXgiLCJkaXNBcmVhSWQiLCJwaWNrZXJWYWx1ZSIsInJlc3VsdCIsInRvcERpc2FibGUiLCJjaXR5RGlzYWJsZSIsImRpc0Rpc2FibGUiLCJtZXRob2RzIiwibmFtZVRhcCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInBob25lVGFwIiwicG9zdFRhcCIsInVzZXJBZGRUYXAiLCJwaWNrVG9wQXJlYSIsImdldENpdHkiLCJnZXRBcmVhIiwicGlja0NpdHkiLCJwaWNrRGlzdHJpY3QiLCJjYW5jZWwiLCJpbml0VG9wQXJlYSIsImNvbmZpcm0iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJ0ZXN0IiwibmFtZSIsInBob25lIiwiYXJlYUlkIiwicG9zdENvZGUiLCJIdHRwUmVxdWVzdCIsIkFkZEFkZHJlc3MiLCJ0aGVuIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwibmF2aWdhdGVCYWNrIiwibWlzc1Rva2VuIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZ2V0QXJlYURhdGEiLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJhcmVhX25hbWUiLCJhcmVhX2lkIiwiaWQiLCJjYiIsInBhcmVudElkIiwiR2V0VG9wQXJlYSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNM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eEI7QUFDQSxpQkFBSzdDLFNBQUwsQ0FBZTRDLElBQWYsQ0FBb0JELEtBQUtHLE9BQXpCO0FBQ0QsU0FIRDtBQUlBRSxjQUFNQSxJQUFOO0FBQ0QsT0FSRDtBQVNEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDVTtBQUNSLFdBQUs1QixXQUFMO0FBQ0EsV0FBSytCLE1BQUw7QUFDRDs7OztFQTVPcUMsZUFBS0MsSTs7a0JBQXhCdEUsVSIsImZpbGUiOiJuZXdBZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdBZGRyZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5paw5aKe5Zyw5Z2AJ1xuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46ICcnLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHBvc3Rjb2RlOiAnJyxcbiAgICAgIG15cmVnOiAvXlsxXVszLDQsNSw3LDhdWzAtOV17OX0kLyxcbiAgICAgIHVzZXJBZGQ6ICcnLFxuICAgICAgdG9wQXJyYXk6IFtdLFxuICAgICAgdG9wSW5kZXg6IDAsXG4gICAgICB0b3BBcmVhSWQ6IFtdLFxuICAgICAgY2l0eUFycmF5OiBbXSxcbiAgICAgIGNpdHlJbmRleDogMCxcbiAgICAgIGNpdHlBcmVhSWQ6IFtdLFxuICAgICAgZGlzQXJyYXk6IFtdLFxuICAgICAgZGlzSW5kZXg6IDAsXG4gICAgICBkaXNBcmVhSWQ6IFtdLFxuICAgICAgcGlja2VyVmFsdWU6ICcnLFxuICAgICAgcmVzdWx0OiBbJ+ivt+mAieaLqeecgScsICfor7fpgInmi6nluIInLCAn6K+36YCJ5oup5Yy6J10sXG4gICAgICB0b3BEaXNhYmxlOiB0cnVlLFxuICAgICAgY2l0eURpc2FibGU6IHRydWUsXG4gICAgICBkaXNEaXNhYmxlOiB0cnVlXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBuYW1lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlck5hbWUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIHBob25lVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlclBob25lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclBob25lXG4gICAgICB9LFxuICAgICAgcG9zdFRhcCAoZSkge1xuICAgICAgICB0aGlzLnBvc3Rjb2RlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdGNvZGVcbiAgICAgIH0sXG4gICAgICB1c2VyQWRkVGFwIChlKSB7XG4gICAgICAgIHRoaXMudXNlckFkZCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgcGlja1RvcEFyZWEgKGUpIHtcbiAgICAgICAgdGhpcy50b3BJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMucmVzdWx0WzBdID0gdGhpcy50b3BBcnJheVt0aGlzLnRvcEluZGV4XVxuICAgICAgICB0aGlzLnJlc3VsdFsxXSA9ICfor7fpgInmi6nluIInXG4gICAgICAgIHRoaXMucmVzdWx0WzJdID0gJ+ivt+mAieaLqeWMuidcbiAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMudG9wQXJlYUlkW3RoaXMudG9wSW5kZXhdLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMuY2l0eUFyZWFJZFswXSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwaWNrQ2l0eSAoZSkge1xuICAgICAgICB0aGlzLmNpdHlJbmRleCA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMucmVzdWx0WzFdID0gdGhpcy5jaXR5QXJyYXlbdGhpcy5jaXR5SW5kZXhdXG4gICAgICAgIHRoaXMucmVzdWx0WzJdID0gJ+ivt+mAieaLqeWMuidcbiAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMuY2l0eUFyZWFJZFt0aGlzLmNpdHlJbmRleF0pXG4gICAgICB9LFxuICAgICAgcGlja0Rpc3RyaWN0IChlKSB7XG4gICAgICAgIHRoaXMuZGlzSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLnJlc3VsdFsyXSA9IHRoaXMuZGlzQXJyYXlbdGhpcy5kaXNJbmRleF1cbiAgICAgICAgdGhpcy5waWNrZXJWYWx1ZSA9IHRoaXMuZGlzQXJlYUlkW3RoaXMuZGlzSW5kZXhdXG4gICAgICB9LFxuICAgICAgLy8gdG9wQXJlYSAoZSkge1xuICAgICAgLy8gICB0aGlzLm11bHRpSW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgLy8gICB0aGlzLm11bHRpQXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIC8vICAgICB0aGlzLnJlc3VsdFtpbmRleF0gPSBpdGVtW3RoaXMubXVsdGlJbmRleFtpbmRleF1dXG4gICAgICAvLyAgIH0pXG4gICAgICAvLyAgIC8vIHZhciB0ZW1wID0gW11cbiAgICAgIC8vICAgLy8gdGVtcCA9IHRoaXMubXVsdGlWYWx1ZS5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAvLyAgIC8vICAgcmV0dXJuIHRoaXMubXVsdGlBcmVhSWRbaW5kZXhdW3RoaXMubXVsdGlJbmRleFtpbmRleF1dXG4gICAgICAvLyAgIC8vIH0pXG4gICAgICAvLyAgIC8vIHRoaXMubXVsdGlWYWx1ZSA9IHRlbXBcbiAgICAgIC8vICAgLy8gY29uc29sZS5sb2codGhpcy5tdWx0aVZhbHVlKVxuICAgICAgLy8gfSxcbiAgICAgIC8vIGNoaWxkQXJlYSAoZSkge1xuICAgICAgLy8gICB0aGlzLm11bHRpSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAvLyAgIHN3aXRjaCAoZS5kZXRhaWwuY29sdW1uKSB7XG4gICAgICAvLyAgICAgY2FzZSAwOlxuICAgICAgLy8gICAgICAgLy8g6YCJ5oup55yBXG4gICAgICAvLyAgICAgICB0aGlzLmdldENpdHkodGhpcy5tdWx0aUFyZWFJZFswXVtlLmRldGFpbC52YWx1ZV0sICgpID0+IHtcbiAgICAgIC8vICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcmVhSWRbMV1bMF0pXG4gICAgICAvLyAgICAgICB9KVxuICAgICAgLy8gICAgICAgYnJlYWtcbiAgICAgIC8vICAgICBjYXNlIDE6XG4gICAgICAvLyAgICAgICAvLyDpgInmi6nluIJcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHRoaXMubXVsdGlBcmVhSWRbMV1bZS5kZXRhaWwudmFsdWVdKVxuICAgICAgLy8gICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcmVhSWRbMV1bZS5kZXRhaWwudmFsdWVdKVxuICAgICAgLy8gICAgICAgYnJlYWtcbiAgICAgIC8vICAgICBjYXNlIDI6XG4gICAgICAvLyAgICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgLy8gICAgICAgdGhpcy5tdWx0aVZhbHVlID0gdGhpcy5tdWx0aUFyZWFJZFsyXVtlLmRldGFpbC52YWx1ZV1cbiAgICAgIC8vICAgICAgIGJyZWFrXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sXG4gICAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIH0sXG4gICAgICBjb25maXJtICgpIHtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbigpXG4gICAgICAgIGlmICh0aGlzLnVzZXJOYW1lICYmIHRoaXMudXNlclBob25lICYmIHRoaXMudXNlckFkZCAmJiB0aGlzLnBpY2tlclZhbHVlKSB7XG4gICAgICAgICAgaWYgKHRoaXMubXlyZWcudGVzdCh0aGlzLnVzZXJQaG9uZSkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy51c2VyTmFtZSxcbiAgICAgICAgICAgICAgcGhvbmU6IHRoaXMudXNlclBob25lLFxuICAgICAgICAgICAgICBhcmVhSWQ6IHRoaXMucGlja2VyVmFsdWUsXG4gICAgICAgICAgICAgIGRldGFpbDogdGhpcy51c2VyQWRkLFxuICAgICAgICAgICAgICBwb3N0Q29kZTogdGhpcy5wb3N0Y29kZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkFkZEFkZHJlc3MoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeato+ehrueahOaJi+acuuWPtycsXG4gICAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnlrozmlbTmlLbotKfkv6Hmga8nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBpbml0VG9wQXJlYSAoKSB7XG4gICAgLy8gICB0aGlzLm11bHRpQXJyYXlbMF0gPSBbXVxuICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZFswXSA9IFtdXG4gICAgLy8gICB0aGlzLmdldEFyZWFEYXRhKDAsIChyZXMpID0+IHtcbiAgICAvLyAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgLy8gICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcnJheVswXS5wdXNoKGl0ZW0uYXJlYV9uYW1lKVxuICAgIC8vICAgICAgIHRoaXMubXVsdGlBcmVhSWRbMF0ucHVzaChpdGVtLmFyZWFfaWQpXG4gICAgLy8gICAgICAgdGhpcy5tdWx0aUluZGV4ID0gWzAsIDAsIDBdXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJlYUlkWzBdWzBdLCAoKSA9PiB7XG4gICAgLy8gICAgICAgdGhpcy5nZXRBcmVhKHRoaXMubXVsdGlBcmVhSWRbMV1bMF0pXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICB9KVxuICAgIC8vIH1cbiAgICBpbml0VG9wQXJlYSAoKSB7XG4gICAgICB0aGlzLnRvcEFycmF5ID0gW11cbiAgICAgIHRoaXMudG9wQXJlYUlkID0gW11cbiAgICAgIHRoaXMudG9wSW5kZXggPSAwXG4gICAgICB0aGlzLmdldEFyZWFEYXRhKDAsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy50b3BEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMudG9wQXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLnRvcEFyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5nZXRDaXR5KHRoaXMudG9wQXJlYUlkWzBdLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5nZXRBcmVhKHRoaXMuY2l0eUFyZWFJZFswXSwgKCkgPT4ge1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhRGF0YSAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcGFyZW50SWQ6IGlkXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuR2V0VG9wQXJlYShkYXRhKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYihyZXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0Q2l0eSAoaWQsIGNiKSB7XG4gICAgICB0aGlzLmNpdHlEaXNhYmxlID0gdHJ1ZVxuICAgICAgdGhpcy5jaXR5QXJyYXkgPSBbXVxuICAgICAgdGhpcy5jaXR5QXJlYUlkID0gW11cbiAgICAgIHRoaXMuY2l0eUluZGV4ID0gMFxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB0aGlzLmNpdHlEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuY2l0eUFycmF5LnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5jaXR5QXJlYUlkLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICB9KVxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhIChpZCwgY2IpIHtcbiAgICAgIHRoaXMuZGlzRGlzYWJsZSA9IHRydWVcbiAgICAgIHRoaXMuZGlzQXJyYXkgPSBbXVxuICAgICAgdGhpcy5kaXNBcmVhSWQgPSBbXVxuICAgICAgdGhpcy5kaXNJbmRleCA9IDBcbiAgICAgIHRoaXMuZ2V0QXJlYURhdGEoaWQsIChyZXMpID0+IHtcbiAgICAgICAgdGhpcy5kaXNEaXNhYmxlID0gZmFsc2VcbiAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIHRoaXMuZGlzQXJyYXkucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLmRpc0FyZWFJZC5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8gZ2V0Q2l0eSAoaWQsIGNiKSB7XG4gICAgLy8gICB0aGlzLm11bHRpQXJyYXlbMV0gPSBbXVxuICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZFsxXSA9IFtdXG4gICAgLy8gICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgLy8gICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgIC8vICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAvLyAgICAgICB0aGlzLm11bHRpQXJyYXlbMV0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAvLyAgICAgICB0aGlzLm11bHRpQXJlYUlkWzFdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICB0aGlzLm11bHRpSW5kZXhbMV0gPSAwXG4gICAgLy8gICAgIGNiICYmIGNiKClcbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICAgIC8vIGdldEFyZWEgKGlkKSB7XG4gICAgLy8gICB0aGlzLm11bHRpQXJyYXlbMl0gPSBbXVxuICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZFsyXSA9IFtdXG4gICAgLy8gICB0aGlzLmdldEFyZWFEYXRhKGlkLCAocmVzKSA9PiB7XG4gICAgLy8gICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgIC8vICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAvLyAgICAgICB0aGlzLm11bHRpQXJyYXlbMl0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAvLyAgICAgICB0aGlzLm11bHRpQXJlYUlkWzJdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICB0aGlzLm11bHRpSW5kZXhbMl0gPSAwXG4gICAgLy8gICAgIHRoaXMubXVsdGlWYWx1ZSA9IHRoaXMubXVsdGlBcmVhSWRbMl1bMF1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmluaXRUb3BBcmVhKClcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==