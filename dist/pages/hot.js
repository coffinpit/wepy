'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _navigator = require('./../components/navigator.js');

var _navigator2 = _interopRequireDefault(_navigator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hot = function (_wepy$page) {
  _inherits(Hot, _wepy$page);

  function Hot() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Hot);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Hot.__proto__ || Object.getPrototypeOf(Hot)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '热门'
    }, _this.$repeat = {}, _this.$props = { "nav": { "navIndex": "1" } }, _this.$events = {}, _this.components = {
      nav: _navigator2.default
    }, _this.data = {
      cross: 'stretch',
      topnavigation: ['首页', '热门', '搜索']
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Hot, [{
    key: 'onload',
    value: function onload() {
      this.$apply();
    }
  }]);

  return Hot;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Hot , 'pages/hot'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdC5qcyJdLCJuYW1lcyI6WyJIb3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2IiwiZGF0YSIsImNyb3NzIiwidG9wbmF2aWdhdGlvbiIsIm1ldGhvZHMiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLE9BQU0sRUFBQyxZQUFXLEdBQVosRUFBUCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNSQztBQURRLEssUUFHVkMsSSxHQUFPO0FBQ0xDLGFBQU8sU0FERjtBQUVMQyxxQkFBZSxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYjtBQUZWLEssUUFJUEMsTyxHQUFVLEU7Ozs7OzZCQUVBO0FBQ1IsV0FBS0MsTUFBTDtBQUNEOzs7O0VBbEI4QixlQUFLQyxJOztrQkFBakJiLEciLCJmaWxlIjoiaG90LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBOYXYgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZpZ2F0b3InXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG90IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn54Ot6ZeoJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2XCI6e1wibmF2SW5kZXhcIjpcIjFcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgbmF2OiBOYXZcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGNyb3NzOiAnc3RyZXRjaCcsXG4gICAgICB0b3BuYXZpZ2F0aW9uOiBbJ+mmlumhtScsICfng63pl6gnLCAn5pCc57SiJ11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9XG4gICAgb25sb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==