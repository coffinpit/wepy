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
                _wepy2.default.redirectTo({
                  url: './address'
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld0FkZC5qcyJdLCJuYW1lcyI6WyJOZXdBZGRyZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ0b2tlbiIsIm11bHRpQXJyYXkiLCJtdWx0aUluZGV4IiwibXVsdGlWYWx1ZSIsIm11bHRpQXJlYUlkIiwidXNlck5hbWUiLCJ1c2VyUGhvbmUiLCJwb3N0Y29kZSIsIm15cmVnIiwidXNlckFkZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsIm5hbWVUYXAiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJwaG9uZVRhcCIsInBvc3RUYXAiLCJ1c2VyQWRkVGFwIiwidG9wQXJlYSIsImNoaWxkQXJlYSIsImNvbHVtbiIsImdldENpdHkiLCJnZXRBcmVhIiwiY29uc29sZSIsImxvZyIsImNhbmNlbCIsImluaXRUb3BBcmVhIiwiY29uZmlybSIsIiRwYXJlbnQiLCJnZXRUb2tlbiIsInRlc3QiLCJuYW1lIiwicGhvbmUiLCJhcmVhSWQiLCJwb3N0Q29kZSIsIkh0dHBSZXF1ZXN0IiwiQWRkQWRkcmVzcyIsInRoZW4iLCJyZXMiLCJlcnJvciIsInJlZGlyZWN0VG8iLCJ1cmwiLCJtaXNzVG9rZW4iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJnZXRBcmVhRGF0YSIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImFyZWFfbmFtZSIsImFyZWFfaWQiLCJpZCIsImNiIiwicGFyZW50SWQiLCJHZXRUb3BBcmVhIiwiJGFwcGx5IiwiR2V0RGV0YWlsQXJlYSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLEVBREY7QUFFTEMsa0JBQVksRUFGUDtBQUdMQyxrQkFBWSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUhQO0FBSUxDLGtCQUFZLEVBSlA7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QUFxQixDQUFyQjtBQUNBLGVBQUtDLFVBQUwsR0FBa0IsT0FBS0MsV0FBTCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUFsQjtBQUNELE9BUkQ7QUFTRDs7OzZCQUNTO0FBQ1IsV0FBS3VCLFdBQUw7QUFDQSxXQUFLOEIsTUFBTDtBQUNEOzs7O0VBcExxQyxlQUFLRSxJOztrQkFBeEIvRCxVIiwiZmlsZSI6Im5ld0FkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ld0FkZHJlc3MgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlrDlop7lnLDlnYAnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjogJycsXG4gICAgICBtdWx0aUFycmF5OiBbXSxcbiAgICAgIG11bHRpSW5kZXg6IFswLCAwLCAwXSxcbiAgICAgIG11bHRpVmFsdWU6ICcnLFxuICAgICAgbXVsdGlBcmVhSWQ6IFtdLFxuICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgdXNlclBob25lOiAnJyxcbiAgICAgIHBvc3Rjb2RlOiAnJyxcbiAgICAgIG15cmVnOiAvXlsxXVszLDQsNSw3LDhdWzAtOV17OX0kLyxcbiAgICAgIHVzZXJBZGQ6ICcnXG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgLy8gbXVsdGlWYWx1ZSAoKSB7XG4gICAgICAvLyAgIHZhciB0ZW1wQXJyID0gW11cbiAgICAgIC8vICAgdGhpcy5tdWx0aUFyZWFJZC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgLy8gICAgIHRlbXBBcnIucHVzaChpdGVtWzBdKVxuICAgICAgLy8gICB9KVxuICAgICAgLy8gICByZXR1cm4gdGVtcEFyclxuICAgICAgLy8gfVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgbmFtZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJOYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlck5hbWVcbiAgICAgIH0sXG4gICAgICBwaG9uZVRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJQaG9uZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJQaG9uZVxuICAgICAgfSxcbiAgICAgIHBvc3RUYXAgKGUpIHtcbiAgICAgICAgdGhpcy5wb3N0Y29kZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHJldHVybiB0aGlzLnBvc3Rjb2RlXG4gICAgICB9LFxuICAgICAgdXNlckFkZFRhcCAoZSkge1xuICAgICAgICB0aGlzLnVzZXJBZGQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgfSxcbiAgICAgIHRvcEFyZWEgKGUpIHtcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4ID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgLy8gdmFyIHRlbXAgPSBbXVxuICAgICAgICAvLyB0ZW1wID0gdGhpcy5tdWx0aVZhbHVlLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgLy8gICByZXR1cm4gdGhpcy5tdWx0aUFyZWFJZFtpbmRleF1bdGhpcy5tdWx0aUluZGV4W2luZGV4XV1cbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gdGhpcy5tdWx0aVZhbHVlID0gdGVtcFxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICB9LFxuICAgICAgY2hpbGRBcmVhIChlKSB7XG4gICAgICAgIHRoaXMubXVsdGlJbmRleFtlLmRldGFpbC5jb2x1bW5dID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgc3dpdGNoIChlLmRldGFpbC5jb2x1bW4pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAvLyDpgInmi6nnnIFcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2l0eSh0aGlzLm11bHRpQXJlYUlkWzBdW2UuZGV0YWlsLnZhbHVlXSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVswXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIC8vIOmAieaLqeW4glxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAgICAgICB0aGlzLmdldEFyZWEodGhpcy5tdWx0aUFyZWFJZFsxXVtlLmRldGFpbC52YWx1ZV0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHRoaXMubXVsdGlJbmRleFsyXSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0aGlzLm11bHRpQXJlYUlkWzJdW2UuZGV0YWlsLnZhbHVlXVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRvcEFyZWEoKVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm0gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11bHRpVmFsdWUpXG4gICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgICBpZiAodGhpcy51c2VyTmFtZSAmJiB0aGlzLnVzZXJQaG9uZSAmJiB0aGlzLnVzZXJBZGQpIHtcbiAgICAgICAgICBpZiAodGhpcy5teXJlZy50ZXN0KHRoaXMudXNlclBob25lKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICAgICAgICBuYW1lOiB0aGlzLnVzZXJOYW1lLFxuICAgICAgICAgICAgICBwaG9uZTogdGhpcy51c2VyUGhvbmUsXG4gICAgICAgICAgICAgIGFyZWFJZDogdGhpcy5tdWx0aVZhbHVlLFxuICAgICAgICAgICAgICBkZXRhaWw6IHRoaXMudXNlckFkZCxcbiAgICAgICAgICAgICAgcG9zdENvZGU6IHRoaXMucG9zdGNvZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5BZGRBZGRyZXNzKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHdlcHkucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICcuL2FkZHJlc3MnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kcGFyZW50Lm1pc3NUb2tlbikge1xuICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ5a6M5pW05pS26LSn5L+h5oGvJyxcbiAgICAgICAgICAgIGljb246ICdub25lJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdFRvcEFyZWEgKCkge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzBdID0gW11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMF0gPSBbXVxuICAgICAgdGhpcy5nZXRBcmVhRGF0YSgwLCAocmVzKSA9PiB7XG4gICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICB0aGlzLm11bHRpQXJyYXlbMF0ucHVzaChpdGVtLmFyZWFfbmFtZSlcbiAgICAgICAgICB0aGlzLm11bHRpQXJlYUlkWzBdLnB1c2goaXRlbS5hcmVhX2lkKVxuICAgICAgICAgIHRoaXMubXVsdGlJbmRleCA9IFswLCAwLCAwXVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmdldENpdHkodGhpcy5tdWx0aUFyZWFJZFswXVswXSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2V0QXJlYSh0aGlzLm11bHRpQXJlYUlkWzFdWzBdKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gICAgZ2V0QXJlYURhdGEgKGlkLCBjYikge1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHBhcmVudElkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldFRvcEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IocmVzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENoaWxkRGF0YSAoaWQsIGNiKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYXJlYUlkOiBpZFxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldERldGFpbEFyZWEoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgY2IgJiYgY2IocmVzKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldENpdHkgKGlkLCBjYikge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzFdID0gW11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMV0gPSBbXVxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzFdLnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5tdWx0aUFyZWFJZFsxXS5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4WzFdID0gMFxuICAgICAgICBjYiAmJiBjYigpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRBcmVhIChpZCkge1xuICAgICAgdGhpcy5tdWx0aUFycmF5WzJdID0gW11cbiAgICAgIHRoaXMubXVsdGlBcmVhSWRbMl0gPSBbXVxuICAgICAgdGhpcy5nZXRBcmVhRGF0YShpZCwgKHJlcykgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUFycmF5WzJdLnB1c2goaXRlbS5hcmVhX25hbWUpXG4gICAgICAgICAgdGhpcy5tdWx0aUFyZWFJZFsyXS5wdXNoKGl0ZW0uYXJlYV9pZClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4WzJdID0gMFxuICAgICAgICB0aGlzLm11bHRpVmFsdWUgPSB0aGlzLm11bHRpQXJlYUlkWzJdWzBdXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5pbml0VG9wQXJlYSgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=