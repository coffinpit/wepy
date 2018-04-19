'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _counter = require('./../store/types/counter.js');

var _actions = require('./../store/actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = (_dec = (0, _wepyRedux.connect)({
  stateNum: function stateNum(state) {
    return state.counter.num;
  },
  asyncNum: function asyncNum(state) {
    return state.counter.asyncNum;
  }
}, {
  incNum: _counter.INCREMENT,
  decNum: _counter.DECREMENT,
  asyncInc: _actions.asyncInc
}), _dec(_class = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Counter;
}(_wepy2.default.component)) || _class);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.props = {
    num: {
      type: [Number, String],
      coerce: function coerce(v) {
        return +v;
      },
      default: 50
    }
  };
  this.data = {};
  this.events = {
    'index-broadcast': function indexBroadcast() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
  this.watch = {
    num: function num(curVal, oldVal) {
      console.log('\u65E7\u503C\uFF1A' + oldVal + '\uFF0C\u65B0\u503C\uFF1A' + curVal);
    }
  };
  this.methods = {
    plus: function plus() {
      this.num = this.num + 1;
      console.log(this.$name + ' plus tap');

      this.$emit('index-emit', 1, 2, 3);
    },
    minus: function minus() {
      this.num = this.num - 1;
      console.log(this.$name + ' minus tap');
    }
  };
};

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInN0YXRlTnVtIiwic3RhdGUiLCJjb3VudGVyIiwibnVtIiwiYXN5bmNOdW0iLCJpbmNOdW0iLCJkZWNOdW0iLCJhc3luY0luYyIsImNvbXBvbmVudCIsInByb3BzIiwidHlwZSIsIk51bWJlciIsIlN0cmluZyIsImNvZXJjZSIsInYiLCJkZWZhdWx0IiwiZGF0YSIsImV2ZW50cyIsIiRldmVudCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCIkbmFtZSIsIm5hbWUiLCJzb3VyY2UiLCJ3YXRjaCIsImN1clZhbCIsIm9sZFZhbCIsIm1ldGhvZHMiLCJwbHVzIiwiJGVtaXQiLCJtaW51cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQWVxQkEsTyxXQWJwQix3QkFBUTtBQUNQQyxVQURPLG9CQUNHQyxLQURILEVBQ1U7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNDLEdBQXJCO0FBQ0QsR0FITTtBQUlQQyxVQUpPLG9CQUlHSCxLQUpILEVBSVU7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNFLFFBQXJCO0FBQ0Q7QUFOTSxDQUFSLEVBT0U7QUFDREMsNEJBREM7QUFFREMsNEJBRkM7QUFHREM7QUFIQyxDQVBGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWFvQyxlQUFLQyxTOzs7OztPQUN4Q0MsSyxHQUFRO0FBQ05OLFNBQUs7QUFDSE8sWUFBTSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsQ0FESDtBQUVIQyxjQUFRLGdCQUFVQyxDQUFWLEVBQWE7QUFDbkIsZUFBTyxDQUFDQSxDQUFSO0FBQ0QsT0FKRTtBQUtIQyxlQUFTO0FBTE47QUFEQyxHO09BVVJDLEksR0FBTyxFO09BRVBDLE0sR0FBUztBQUNQLHVCQUFtQiwwQkFBYTtBQUFBOztBQUM5QixVQUFJQyxrQkFBYyxVQUFLQyxNQUFMLEdBQWMsQ0FBNUIsMkRBQUo7QUFDQUMsY0FBUUMsR0FBUixDQUFlLE9BQUtDLEtBQXBCLGlCQUFxQ0osT0FBT0ssSUFBNUMsY0FBeURMLE9BQU9NLE1BQVAsQ0FBY0YsS0FBdkU7QUFDRDtBQUpNLEc7T0FPVEcsSyxHQUFRO0FBQ050QixPQURNLGVBQ0R1QixNQURDLEVBQ09DLE1BRFAsRUFDZTtBQUNuQlAsY0FBUUMsR0FBUix3QkFBa0JNLE1BQWxCLGdDQUErQkQsTUFBL0I7QUFDRDtBQUhLLEc7T0FNUkUsTyxHQUFVO0FBQ1JDLFFBRFEsa0JBQ0E7QUFDTixXQUFLMUIsR0FBTCxHQUFXLEtBQUtBLEdBQUwsR0FBVyxDQUF0QjtBQUNBaUIsY0FBUUMsR0FBUixDQUFZLEtBQUtDLEtBQUwsR0FBYSxXQUF6Qjs7QUFFQSxXQUFLUSxLQUFMLENBQVcsWUFBWCxFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQjtBQUNELEtBTk87QUFPUkMsU0FQUSxtQkFPQztBQUNQLFdBQUs1QixHQUFMLEdBQVcsS0FBS0EsR0FBTCxHQUFXLENBQXRCO0FBQ0FpQixjQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBTCxHQUFhLFlBQXpCO0FBQ0Q7QUFWTyxHOzs7a0JBMUJTdkIsTyIsImZpbGUiOiJjb3VudGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICd3ZXB5LXJlZHV4J1xuICBpbXBvcnQgeyBJTkNSRU1FTlQsIERFQ1JFTUVOVCB9IGZyb20gJy4uL3N0b3JlL3R5cGVzL2NvdW50ZXInXG4gIGltcG9ydCB7IGFzeW5jSW5jIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcblxuICBAY29ubmVjdCh7XG4gICAgc3RhdGVOdW0gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gc3RhdGUuY291bnRlci5udW1cbiAgICB9LFxuICAgIGFzeW5jTnVtIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIHN0YXRlLmNvdW50ZXIuYXN5bmNOdW1cbiAgICB9XG4gIH0sIHtcbiAgICBpbmNOdW06IElOQ1JFTUVOVCxcbiAgICBkZWNOdW06IERFQ1JFTUVOVCxcbiAgICBhc3luY0luY1xuICB9KVxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdW50ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBudW06IHtcbiAgICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgICAgY29lcmNlOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHJldHVybiArdlxuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0OiA1MFxuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgfVxuICAgIGV2ZW50cyA9IHtcbiAgICAgICdpbmRleC1icm9hZGNhc3QnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3YXRjaCA9IHtcbiAgICAgIG51bSAoY3VyVmFsLCBvbGRWYWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coYOaXp+WAvO+8miR7b2xkVmFsfe+8jOaWsOWAvO+8miR7Y3VyVmFsfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXMgKCkge1xuICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtICsgMVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRuYW1lICsgJyBwbHVzIHRhcCcpXG5cbiAgICAgICAgdGhpcy4kZW1pdCgnaW5kZXgtZW1pdCcsIDEsIDIsIDMpXG4gICAgICB9LFxuICAgICAgbWludXMgKCkge1xuICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtIC0gMVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRuYW1lICsgJyBtaW51cyB0YXAnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19