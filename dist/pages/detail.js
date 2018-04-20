'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _bottombar = require('./../components/bottombar.js');

var _bottombar2 = _interopRequireDefault(_bottombar);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_wepy$page) {
  _inherits(Detail, _wepy$page);

  function Detail() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '商品详情'
    }, _this2.$repeat = {}, _this2.$props = { "bottom": { "xmlns:v-on": "" }, "counter": { "class": "calculate", "xmlns:v-bind": "", "v-bind:num.once": "chooseNum" } }, _this2.$events = { "bottom": { "v-on:buy": "buy" }, "counter": { "v-on:plusEdit": "plusTap", "v-on:minusEdit": "minusTap" } }, _this2.components = {
      bottom: _bottombar2.default,
      counter: _counter2.default
    }, _this2.computed = {
      total: function total() {
        return (this.detail.price * this.chooseNum).toFixed(1);
      }
    }, _this2.data = {
      detail: {
        path: '../image/login-bg.jpg',
        price: '100.0',
        oldprice: '140.0',
        express: '38.0',
        title: '美国自然牛USDA PRIMA极佳级肉眼牛排',
        goodList: [{
          name: '自然牛肉500g',
          price: 69,
          num: 0
        }, {
          name: '自然牛肉500g',
          price: 120,
          num: 0
        }] },
      collect: false,
      overflow: false,
      winHeight: 0,
      collectTxt: '收藏',
      collectednum: '4',
      collectedUser: [{
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }, {
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }, {
        path: '../image/login-bg.jpg',
        name: 'xxx'
      }],
      goodsDetail: [{
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }, {
        title: '商品名称',
        detail: '美国自然牛USDA PRIMA极佳级肉眼牛排'
      }],
      transportDetail: [{
        title: '配送范围',
        detail: '购满2公斤全国包邮'
      }, {
        title: '配送快递',
        detail: '顺丰冷运'
      }, {
        title: '配送方案',
        detail: '配送规则',
        isLink: true
      }],
      chooseNum: 1
    }, _this2.methods = {
      collectTap: function collectTap() {
        if (!this.collect) {
          this.collect = true;
          this.collectTxt = '已收藏';
        }
      },
      buy: function buy() {
        this.overflow = true;
      },
      closeBuy: function closeBuy() {
        this.overflow = false;
      },
      plusTap: function plusTap() {
        console.log('fa plus');
      },
      minusTap: function minusTap() {
        console.log('fa minus');
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Detail, [{
    key: 'onload',
    value: function onload(id) {
      console.log(id);
      var _this = this;
      _wepy2.default.getSystemInfo({
        success: function success(res) {
          _this.winHeight = res.windowHeight;
        }
      });
      this.$apply();
    }
  }]);

  return Detail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Detail , 'pages/detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYm90dG9tIiwiY291bnRlciIsImNvbXB1dGVkIiwidG90YWwiLCJkZXRhaWwiLCJwcmljZSIsImNob29zZU51bSIsInRvRml4ZWQiLCJkYXRhIiwicGF0aCIsIm9sZHByaWNlIiwiZXhwcmVzcyIsInRpdGxlIiwiZ29vZExpc3QiLCJuYW1lIiwibnVtIiwiY29sbGVjdCIsIm92ZXJmbG93Iiwid2luSGVpZ2h0IiwiY29sbGVjdFR4dCIsImNvbGxlY3RlZG51bSIsImNvbGxlY3RlZFVzZXIiLCJnb29kc0RldGFpbCIsInRyYW5zcG9ydERldGFpbCIsImlzTGluayIsIm1ldGhvZHMiLCJjb2xsZWN0VGFwIiwiYnV5IiwiY2xvc2VCdXkiLCJwbHVzVGFwIiwiY29uc29sZSIsImxvZyIsIm1pbnVzVGFwIiwiaWQiLCJfdGhpcyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93SGVpZ2h0IiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7Ozs7O3lMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFNBR1ZDLE8sR0FBVSxFLFNBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBVixFQUE0QixXQUFVLEVBQUMsU0FBUSxXQUFULEVBQXFCLGdCQUFlLEVBQXBDLEVBQXVDLG1CQUFrQixXQUF6RCxFQUF0QyxFLFNBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxZQUFXLEtBQVosRUFBVixFQUE2QixXQUFVLEVBQUMsaUJBQWdCLFNBQWpCLEVBQTJCLGtCQUFpQixVQUE1QyxFQUF2QyxFLFNBQ1RDLFUsR0FBYTtBQUNSQyxpQ0FEUTtBQUVSQztBQUZRLEssU0FJVkMsUSxHQUFXO0FBQ1RDLFdBRFMsbUJBQ0E7QUFDUCxlQUFPLENBQUMsS0FBS0MsTUFBTCxDQUFZQyxLQUFaLEdBQW9CLEtBQUtDLFNBQTFCLEVBQXFDQyxPQUFyQyxDQUE2QyxDQUE3QyxDQUFQO0FBQ0Q7QUFIUSxLLFNBS1hDLEksR0FBTztBQUNMSixjQUFRO0FBQ05LLGNBQU0sdUJBREE7QUFFTkosZUFBTyxPQUZEO0FBR05LLGtCQUFVLE9BSEo7QUFJTkMsaUJBQVMsTUFKSDtBQUtOQyxlQUFPLHdCQUxEO0FBTU5DLGtCQUFVLENBQUM7QUFDVEMsZ0JBQU0sVUFERztBQUVUVCxpQkFBTyxFQUZFO0FBR1RVLGVBQUs7QUFISSxTQUFELEVBSVA7QUFDREQsZ0JBQU0sVUFETDtBQUVEVCxpQkFBTyxHQUZOO0FBR0RVLGVBQUs7QUFISixTQUpPLENBTkosRUFESDtBQWdCTEMsZUFBUyxLQWhCSjtBQWlCTEMsZ0JBQVUsS0FqQkw7QUFrQkxDLGlCQUFXLENBbEJOO0FBbUJMQyxrQkFBWSxJQW5CUDtBQW9CTEMsb0JBQWMsR0FwQlQ7QUFxQkxDLHFCQUFlLENBQUM7QUFDZFosY0FBTSx1QkFEUTtBQUVkSyxjQUFNO0FBRlEsT0FBRCxFQUdaO0FBQ0RMLGNBQU0sdUJBREw7QUFFREssY0FBTTtBQUZMLE9BSFksRUFNWjtBQUNETCxjQUFNLHVCQURMO0FBRURLLGNBQU07QUFGTCxPQU5ZLENBckJWO0FBK0JMUSxtQkFBYSxDQUFDO0FBQ1pWLGVBQU8sTUFESztBQUVaUixnQkFBUTtBQUZJLE9BQUQsRUFHVjtBQUNEUSxlQUFPLE1BRE47QUFFRFIsZ0JBQVE7QUFGUCxPQUhVLEVBTVY7QUFDRFEsZUFBTyxNQUROO0FBRURSLGdCQUFRO0FBRlAsT0FOVSxFQVNWO0FBQ0RRLGVBQU8sTUFETjtBQUVEUixnQkFBUTtBQUZQLE9BVFUsQ0EvQlI7QUE0Q0xtQix1QkFBaUIsQ0FBQztBQUNoQlgsZUFBTyxNQURTO0FBRWhCUixnQkFBUTtBQUZRLE9BQUQsRUFHZDtBQUNEUSxlQUFPLE1BRE47QUFFRFIsZ0JBQVE7QUFGUCxPQUhjLEVBTWQ7QUFDRFEsZUFBTyxNQUROO0FBRURSLGdCQUFRLE1BRlA7QUFHRG9CLGdCQUFRO0FBSFAsT0FOYyxDQTVDWjtBQXVETGxCLGlCQUFXO0FBdkROLEssU0F5RFBtQixPLEdBQVU7QUFDUkMsZ0JBRFEsd0JBQ007QUFDWixZQUFJLENBQUMsS0FBS1YsT0FBVixFQUFtQjtBQUNqQixlQUFLQSxPQUFMLEdBQWUsSUFBZjtBQUNBLGVBQUtHLFVBQUwsR0FBa0IsS0FBbEI7QUFDRDtBQUNGLE9BTk87QUFPUlEsU0FQUSxpQkFPRDtBQUNMLGFBQUtWLFFBQUwsR0FBZ0IsSUFBaEI7QUFDRCxPQVRPO0FBVVJXLGNBVlEsc0JBVUk7QUFDVixhQUFLWCxRQUFMLEdBQWdCLEtBQWhCO0FBQ0QsT0FaTztBQWFSWSxhQWJRLHFCQWFHO0FBQ1RDLGdCQUFRQyxHQUFSLENBQVksU0FBWjtBQUNELE9BZk87QUFnQlJDLGNBaEJRLHNCQWdCSTtBQUNWRixnQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDRDtBQWxCTyxLOzs7OzsyQkFvQkZFLEUsRUFBSTtBQUNWSCxjQUFRQyxHQUFSLENBQVlFLEVBQVo7QUFDQSxVQUFJQyxRQUFRLElBQVo7QUFDQSxxQkFBS0MsYUFBTCxDQUFtQjtBQUNqQkMsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QkgsZ0JBQU1oQixTQUFOLEdBQWtCbUIsSUFBSUMsWUFBdEI7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFdBQUtDLE1BQUw7QUFDRDs7OztFQXRHaUMsZUFBS0MsSTs7a0JBQXBCL0MsTSIsImZpbGUiOiJkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IEJvdHRvbSBmcm9tICcuLi9jb21wb25lbnRzL2JvdHRvbWJhcidcbiAgaW1wb3J0IENvdW50IGZyb20gJy4uL2NvbXBvbmVudHMvY291bnRlcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYblk4Hor6bmg4UnXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJib3R0b21cIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJjb3VudGVyXCI6e1wiY2xhc3NcIjpcImNhbGN1bGF0ZVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpudW0ub25jZVwiOlwiY2hvb3NlTnVtXCJ9fTtcclxuJGV2ZW50cyA9IHtcImJvdHRvbVwiOntcInYtb246YnV5XCI6XCJidXlcIn0sXCJjb3VudGVyXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c1RhcFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbnVzVGFwXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBib3R0b206IEJvdHRvbSxcbiAgICAgIGNvdW50ZXI6IENvdW50XG4gICAgfVxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdG90YWwgKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGV0YWlsLnByaWNlICogdGhpcy5jaG9vc2VOdW0pLnRvRml4ZWQoMSlcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRldGFpbDoge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgcHJpY2U6ICcxMDAuMCcsXG4gICAgICAgIG9sZHByaWNlOiAnMTQwLjAnLFxuICAgICAgICBleHByZXNzOiAnMzguMCcsXG4gICAgICAgIHRpdGxlOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkicsXG4gICAgICAgIGdvb2RMaXN0OiBbe1xuICAgICAgICAgIG5hbWU6ICfoh6rnhLbniZvogok1MDBnJyxcbiAgICAgICAgICBwcmljZTogNjksXG4gICAgICAgICAgbnVtOiAwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICBuYW1lOiAn6Ieq54S254mb6IKJNTAwZycsXG4gICAgICAgICAgcHJpY2U6IDEyMCxcbiAgICAgICAgICBudW06IDBcbiAgICAgICAgfV19LFxuICAgICAgY29sbGVjdDogZmFsc2UsXG4gICAgICBvdmVyZmxvdzogZmFsc2UsXG4gICAgICB3aW5IZWlnaHQ6IDAsXG4gICAgICBjb2xsZWN0VHh0OiAn5pS26JePJyxcbiAgICAgIGNvbGxlY3RlZG51bTogJzQnLFxuICAgICAgY29sbGVjdGVkVXNlcjogW3tcbiAgICAgICAgcGF0aDogJy4uL2ltYWdlL2xvZ2luLWJnLmpwZycsXG4gICAgICAgIG5hbWU6ICd4eHgnXG4gICAgICB9LCB7XG4gICAgICAgIHBhdGg6ICcuLi9pbWFnZS9sb2dpbi1iZy5qcGcnLFxuICAgICAgICBuYW1lOiAneHh4J1xuICAgICAgfSwge1xuICAgICAgICBwYXRoOiAnLi4vaW1hZ2UvbG9naW4tYmcuanBnJyxcbiAgICAgICAgbmFtZTogJ3h4eCdcbiAgICAgIH1dLFxuICAgICAgZ29vZHNEZXRhaWw6IFt7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH0sIHtcbiAgICAgICAgdGl0bGU6ICfllYblk4HlkI3np7AnLFxuICAgICAgICBkZXRhaWw6ICfnvo7lm73oh6rnhLbniZtVU0RBIFBSSU1B5p6B5L2z57qn6IKJ55y854mb5o6SJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+WVhuWTgeWQjeensCcsXG4gICAgICAgIGRldGFpbDogJ+e+juWbveiHqueEtueJm1VTREEgUFJJTUHmnoHkvbPnuqfogonnnLzniZvmjpInXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn5ZWG5ZOB5ZCN56ewJyxcbiAgICAgICAgZGV0YWlsOiAn576O5Zu96Ieq54S254mbVVNEQSBQUklNQeaegeS9s+e6p+iCieecvOeJm+aOkidcbiAgICAgIH1dLFxuICAgICAgdHJhbnNwb3J0RGV0YWlsOiBbe1xuICAgICAgICB0aXRsZTogJ+mFjemAgeiMg+WbtCcsXG4gICAgICAgIGRldGFpbDogJ+i0rea7oTLlhazmlqTlhajlm73ljIXpgq4nXG4gICAgICB9LCB7XG4gICAgICAgIHRpdGxlOiAn6YWN6YCB5b+r6YCSJyxcbiAgICAgICAgZGV0YWlsOiAn6aG65Liw5Ya36L+QJ1xuICAgICAgfSwge1xuICAgICAgICB0aXRsZTogJ+mFjemAgeaWueahiCcsXG4gICAgICAgIGRldGFpbDogJ+mFjemAgeinhOWImScsXG4gICAgICAgIGlzTGluazogdHJ1ZVxuICAgICAgfV0sXG4gICAgICBjaG9vc2VOdW06IDFcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNvbGxlY3RUYXAgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29sbGVjdCkge1xuICAgICAgICAgIHRoaXMuY29sbGVjdCA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvbGxlY3RUeHQgPSAn5bey5pS26JePJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnV5ICgpIHtcbiAgICAgICAgdGhpcy5vdmVyZmxvdyA9IHRydWVcbiAgICAgIH0sXG4gICAgICBjbG9zZUJ1eSAoKSB7XG4gICAgICAgIHRoaXMub3ZlcmZsb3cgPSBmYWxzZVxuICAgICAgfSxcbiAgICAgIHBsdXNUYXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmEgcGx1cycpXG4gICAgICB9LFxuICAgICAgbWludXNUYXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmEgbWludXMnKVxuICAgICAgfVxuICAgIH1cbiAgICBvbmxvYWQgKGlkKSB7XG4gICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICBfdGhpcy53aW5IZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=