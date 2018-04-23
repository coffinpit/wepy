'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _counter = require('./counter.js');

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderItem = function (_wepy$component) {
  _inherits(OrderItem, _wepy$component);

  function OrderItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderItem.__proto__ || Object.getPrototypeOf(OrderItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      list: Object
    }, _this.$repeat = { "list": { "com": "counte", "props": "" } }, _this.$props = { "counte": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "list", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "list", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "counte": { "v-on:plusEdit": "plusCart", "v-on:minusEdit": "minCart", "v-on:keyEdit": "keyCart" } }, _this.components = {
      counte: _counter2.default
    }, _this.data = {
      delBtnWidth: 180,
      startX: 0,
      animate: '',
      current: '',
      cartcount: []
    }, _this.methods = {
      touchS: function touchS(e) {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
        }
      },
      touchM: function touchM(e) {
        this.current = e.currentTarget.dataset.index;
        if (e.touches.length === 1) {
          var moveX = e.touches[0].clientX;
          var disX = this.startX - moveX;
          if (disX === 0 || disX < 0) {
            this.animate = '';
            this.current = '';
          } else if (disX > 0) {
            this.animate = 'inner-animate-left';
          }
        }
      },
      delItem: function delItem(e) {
        var that = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否删除？',
          success: function success(res) {
            if (res.confirm) {
              var index = e.currentTarget.dataset.index;
              var list = that.list;
              list.splice(index, 1);
            }
            that.animate = '';
            this.current = '';
            that.$apply();
          }
        });
      },
      plusCart: function plusCart(e) {
        var index = e.source.$index;
        this.$parent.data.list[index].count++;
        this.$apply();
        // 发送购物车修改数据
      },
      minCart: function minCart(e) {
        var index = e.source.$index;
        this.$parent.data.list[index].count--;
        this.$apply();
        // 发送购物车修改数据
      },
      keyCart: function keyCart(val, e) {
        var index = e.source.$index;
        this.$parent.data.list[index].count = val;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderItem, [{
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return OrderItem;
}(_wepy2.default.component);

exports.default = OrderItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyaXRlbS5qcyJdLCJuYW1lcyI6WyJPcmRlckl0ZW0iLCJwcm9wcyIsImxpc3QiLCJPYmplY3QiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGUiLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJhbmltYXRlIiwiY3VycmVudCIsImNhcnRjb3VudCIsIm1ldGhvZHMiLCJ0b3VjaFMiLCJlIiwidG91Y2hlcyIsImxlbmd0aCIsImNsaWVudFgiLCJ0b3VjaE0iLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwibW92ZVgiLCJkaXNYIiwiZGVsSXRlbSIsInRoYXQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsInNwbGljZSIsIiRhcHBseSIsInBsdXNDYXJ0Iiwic291cmNlIiwiJGluZGV4IiwiJHBhcmVudCIsImNvdW50IiwibWluQ2FydCIsImtleUNhcnQiLCJ2YWwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxLLEdBQVE7QUFDTkMsWUFBTUM7QUFEQSxLLFFBR1RDLE8sR0FBVSxFQUFDLFFBQU8sRUFBQyxPQUFNLFFBQVAsRUFBZ0IsU0FBUSxFQUF4QixFQUFSLEUsUUFDYkMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxNQUFsQixFQUF5QixRQUFPLE1BQWhDLEVBQXVDLFNBQVEsT0FBL0MsRUFBdUQsT0FBTSxPQUE3RCxFQUFoQixFQUFzRixtQkFBa0IsRUFBQyxTQUFRLFlBQVQsRUFBc0IsT0FBTSxNQUE1QixFQUFtQyxRQUFPLE1BQTFDLEVBQWlELFNBQVEsT0FBekQsRUFBaUUsT0FBTSxPQUF2RSxFQUF4RyxFQUF3TCxjQUFhLEVBQUMsU0FBUSxFQUFULEVB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TUFBckI7QUFDQSxhQUFLQyxPQUFMLENBQWEvQixJQUFiLENBQWtCUCxJQUFsQixDQUF1QnNCLEtBQXZCLEVBQThCaUIsS0FBOUIsR0FBc0NHLEdBQXRDO0FBQ0Q7QUFuRE8sSzs7Ozs7NkJBcURBO0FBQ1IsV0FBS1IsTUFBTDtBQUNEOzs7O0VBeEVvQyxlQUFLUyxTOztrQkFBdkI3QyxTIiwiZmlsZSI6Im9yZGVyaXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgQ291bnRlIGZyb20gJy4vY291bnRlcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckl0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBsaXN0OiBPYmplY3RcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwiY291bnRlXCIsXCJwcm9wc1wiOlwiXCJ9fTtcclxuJHByb3BzID0ge1wiY291bnRlXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ4bWxuczp2LW9uXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJkYXRhLWluZGV4XCI6e1widmFsdWVcIjpcInt7aW5kZXh9fVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZVwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDYXJ0XCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ2FydFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDYXJ0XCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBjb3VudGU6IENvdW50ZVxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgZGVsQnRuV2lkdGg6IDE4MCxcbiAgICAgIHN0YXJ0WDogMCxcbiAgICAgIGFuaW1hdGU6ICcnLFxuICAgICAgY3VycmVudDogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b3VjaFMgKGUpIHtcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0WCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3VjaE0gKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB2YXIgbW92ZVggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICAgIHZhciBkaXNYID0gdGhpcy5zdGFydFggLSBtb3ZlWFxuICAgICAgICAgIGlmIChkaXNYID09PSAwIHx8IGRpc1ggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSAnJ1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gJydcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSAnaW5uZXItYW5pbWF0ZS1sZWZ0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbEl0ZW0gKGUpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICAgIHZhciBsaXN0ID0gdGhhdC5saXN0XG4gICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5hbmltYXRlID0gJydcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9ICcnXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsdXNDYXJ0IChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5saXN0W2luZGV4XS5jb3VudCArK1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgfSxcbiAgICAgIG1pbkNhcnQgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuJHBhcmVudC5kYXRhLmxpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICB9LFxuICAgICAga2V5Q2FydCAodmFsLCBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5saXN0W2luZGV4XS5jb3VudCA9IHZhbFxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19