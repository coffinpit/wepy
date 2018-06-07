'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '欢迎'
    }, _this.data = {
      isNull: true,
      jscode: null,
      refrenceCode: ''
    }, _this.components = {
      loading: _loading2.default
    }, _this.methods = {
      login: function login(e) {
        var _this2 = this;

        if (e.detail.encryptedData) {
          this.$parent.getUserInfo(e, this.jscode, this.refrenceCode, function () {
            _this2.goIndex();
          });
        } else {
          _wepy2.default.showModal({
            title: '提示',
            content: '拒绝授权将无法正常使用小程序全部功能，请重新登录并开启授权'
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'goIndex',
    value: function goIndex() {
      _wepy2.default.switchTab({
        url: './index'
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      var _this3 = this;

      if (param.refrenceCode) {
        this.refrenceCode = param.refrenceCode;
      } else {
        this.refrenceCode = '';
      }
      // 获取跳转页面来源
      this.$parent.getLogin(function (code) {
        _this3.jscode = code;
      });
      _wepy2.default.getSetting({
        success: function success(res) {
          // res.authSetting['scope.userInfo']
          if (_wepy2.default.getStorageSync('token')) {
            _this3.isNull = true;
            // 已经授权，获取新的token
            var data = {
              phone: _wepy2.default.getStorageSync('phone')
            };
            _this3.$parent.requestToken(data, function () {
              _this3.goIndex();
            }, function () {
              _wepy2.default.showToast({
                title: '加载失败',
                icon: 'none',
                image: '../image/cancel.png'
              });
            });
          } else {
            _this3.isNull = false;
          }
          _this3.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJpc051bGwiLCJqc2NvZGUiLCJyZWZyZW5jZUNvZGUiLCJjb21wb25lbnRzIiwibG9hZGluZyIsIm1ldGhvZHMiLCJsb2dpbiIsImUiLCJkZXRhaWwiLCJlbmNyeXB0ZWREYXRhIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiZ29JbmRleCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN3aXRjaFRhYiIsInVybCIsInBhcmFtIiwiZ2V0TG9naW4iLCJjb2RlIiwiZ2V0U2V0dGluZyIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRTdG9yYWdlU3luYyIsInBob25lIiwicmVxdWVzdFRva2VuIiwic2hvd1RvYXN0IiwiaWNvbiIsImltYWdlIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGNBQVEsSUFGSDtBQUdMQyxvQkFBYztBQUhULEssUUFLUEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUdiQyxPLEdBQVU7QUFDUkMsV0FEUSxpQkFDREMsQ0FEQyxFQUNFO0FBQUE7O0FBQ1IsWUFBSUEsRUFBRUMsTUFBRixDQUFTQyxhQUFiLEVBQTRCO0FBQzFCLGVBQUtDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QkosQ0FBekIsRUFBNEIsS0FBS04sTUFBakMsRUFBeUMsS0FBS0MsWUFBOUMsRUFBNEQsWUFBTTtBQUNoRSxtQkFBS1UsT0FBTDtBQUNELFdBRkQ7QUFHRCxTQUpELE1BSU87QUFDTCx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLElBRE07QUFFYkMscUJBQVM7QUFGSSxXQUFmO0FBSUQ7QUFDRjtBQVpPLEs7Ozs7OzhCQWNDO0FBQ1QscUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxhQUFLO0FBRFEsT0FBZjtBQUdEOzs7MkJBQ09DLEssRUFBTztBQUFBOztBQUNiLFVBQUlBLE1BQU1oQixZQUFWLEVBQXdCO0FBQ3RCLGFBQUtBLFlBQUwsR0FBb0JnQixNQUFNaEIsWUFBMUI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLQSxZQUFMLEdBQW9CLEVBQXBCO0FBQ0Q7QUFDRDtBQUNBLFdBQUtRLE9BQUwsQ0FBYVMsUUFBYixDQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDOUIsZUFBS25CLE1BQUwsR0FBY21CLElBQWQ7QUFDRCxPQUZEO0FBR0EscUJBQUtDLFVBQUwsQ0FBZ0I7QUFDZEMsaUJBQVMsaUJBQUNDLEdBQUQsRUFBUztBQUNoQjtBQUNBLGNBQUksZUFBS0MsY0FBTCxDQUFvQixPQUFwQixDQUFKLEVBQWtDO0FBQ2hDLG1CQUFLeEIsTUFBTCxHQUFjLElBQWQ7QUFDQTtBQUNBLGdCQUFJRCxPQUFPO0FBQ1QwQixxQkFBTyxlQUFLRCxjQUFMLENBQW9CLE9BQXBCO0FBREUsYUFBWDtBQUdBLG1CQUFLZCxPQUFMLENBQWFnQixZQUFiLENBQTBCM0IsSUFBMUIsRUFBZ0MsWUFBTTtBQUNwQyxxQkFBS2EsT0FBTDtBQUNELGFBRkQsRUFFRyxZQUFNO0FBQ1AsNkJBQUtlLFNBQUwsQ0FBZTtBQUNiYix1QkFBTyxNQURNO0FBRWJjLHNCQUFNLE1BRk87QUFHYkMsdUJBQU87QUFITSxlQUFmO0FBS0QsYUFSRDtBQVNELFdBZkQsTUFlTztBQUNMLG1CQUFLN0IsTUFBTCxHQUFjLEtBQWQ7QUFDRDtBQUNELGlCQUFLOEIsTUFBTDtBQUNEO0FBdEJhLE9BQWhCO0FBd0JEOzs7NkJBQ1MsQ0FDVDs7OztFQW5FZ0MsZUFBS0MsSTs7a0JBQW5CbkMsSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTG9hZGluZyBmcm9tICcuLi9jb21wb25lbnRzL2xvYWRpbmcnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmrKLov44nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBpc051bGw6IHRydWUsXG4gICAgICBqc2NvZGU6IG51bGwsXG4gICAgICByZWZyZW5jZUNvZGU6ICcnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgICBsb2FkaW5nOiBMb2FkaW5nXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBsb2dpbiAoZSkge1xuICAgICAgICBpZiAoZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSkge1xuICAgICAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhlLCB0aGlzLmpzY29kZSwgdGhpcy5yZWZyZW5jZUNvZGUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiAn5ouS57ud5o6I5p2D5bCG5peg5rOV5q2j5bi45L2/55So5bCP56iL5bqP5YWo6YOo5Yqf6IO977yM6K+36YeN5paw55m75b2V5bm25byA5ZCv5o6I5p2DJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ29JbmRleCAoKSB7XG4gICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQgKHBhcmFtKSB7XG4gICAgICBpZiAocGFyYW0ucmVmcmVuY2VDb2RlKSB7XG4gICAgICAgIHRoaXMucmVmcmVuY2VDb2RlID0gcGFyYW0ucmVmcmVuY2VDb2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnJlbmNlQ29kZSA9ICcnXG4gICAgICB9XG4gICAgICAvLyDojrflj5bot7PovazpobXpnaLmnaXmupBcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRMb2dpbigoY29kZSkgPT4ge1xuICAgICAgICB0aGlzLmpzY29kZSA9IGNvZGVcbiAgICAgIH0pXG4gICAgICB3ZXB5LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgLy8gcmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddXG4gICAgICAgICAgaWYgKHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gdHJ1ZVxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM6I635Y+W5paw55qEdG9rZW5cbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwaG9uZTogd2VweS5nZXRTdG9yYWdlU3luYygncGhvbmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kcGFyZW50LnJlcXVlc3RUb2tlbihkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ29JbmRleCgpXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veWksei0pScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2UvY2FuY2VsLnBuZydcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNOdWxsID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgIH1cbiAgfVxuIl19