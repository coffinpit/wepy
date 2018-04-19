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

var Cart = function (_wepy$page) {
  _inherits(Cart, _wepy$page);

  function Cart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cart.__proto__ || Object.getPrototypeOf(Cart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '购物车'
    }, _this.data = {
      delBtnWidth: 180,
      startX: 0,
      list: [{
        txtStyle: '',
        txt: '指尖快递'
      }, {
        txtStyle: '',
        txt: '指尖快递'
      }]
    }, _this.methods = {
      touchS: function touchS(e) {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
        }
      },
      touchM: function touchM(e) {
        var that = this;
        this.initdata(that);
        if (e.touches.length === 1) {
          var moveX = e.touches[0].clientX;
          var disX = this.startX - moveX;
          var delBtnWidth = this.delBtnWidth;
          var txtStyle = '';
          if (disX === 0 || disX < 0) {
            txtStyle = 'transform:translateX(0px)';
          } else if (disX > 0) {
            setTimeout(function () {
              txtStyle = 'transform:translateX(-' + disX + 'px)';
            }, 500);
            if (disX >= delBtnWidth) {
              setTimeout(function () {
                txtStyle = 'transform:translateX(-' + delBtnWidth + 'px)';
              }, 500);
            }
          }
          var index = e.target.dataset.index;
          this.list[index].txtStyle = txtStyle;
        }
      },
      touchE: function touchE(e) {
        if (e.changedTouches.length === 1) {
          var endX = e.changedTouches[0].clientX;
          var disX = this.startX - endX;
          var delBtnWidth = this.delBtnWidth;
          var txtStyle = disX > delBtnWidth / 2 ? 'transform:translateX(-' + delBtnWidth + 'px)' : 'transform:translateX(0px)';
          var index = e.target.dataset.index;
          var list = this.list;
          list[index].txtStyle = txtStyle;
          this.list = list;
          console.log(this.list[index].txtStyle);
        }
      },
      delItem: function delItem(e) {
        var that = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否删除？',
          success: function success(res) {
            if (res.confirm) {
              var index = e.target.dataset.index;
              var list = that.list;
              list.splice(index, 1);
              that.setData({
                list: list
              });
              console.log(that.list);
            } else {
              that.initdata(that);
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cart, [{
    key: 'initdata',
    value: function initdata(that) {
      var list = that.list;
      for (var i = 0; i < list.length; i++) {
        list[i].txtStyle = '';
      }
      this.setData({
        list: list
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.initEleWidth();
      this.$apply();
    }
  }, {
    key: 'getEleWidth',
    value: function getEleWidth(w) {
      var real = 0;
      try {
        var res = _wepy2.default.getSystemInfoSync().windowWidth;
        var scale = 750 / 2 / (w / 2);
        real = Math.floor(res / scale);
        return real;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'initEleWidth',
    value: function initEleWidth() {
      var delBtnWidth = this.getEleWidth(this.delBtnWidth);
      this.delBtnWidth = delBtnWidth;
      console.log(this.delBtnWidth, delBtnWidth);
    }
  }]);

  return Cart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Cart , 'pages/cart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuanMiXSwibmFtZXMiOlsiQ2FydCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJsaXN0IiwidHh0U3R5bGUiLCJ0eHQiLCJtZXRob2RzIiwidG91Y2hTIiwiZSIsInRvdWNoZXMiLCJsZW5ndGgiLCJjbGllbnRYIiwidG91Y2hNIiwidGhhdCIsImluaXRkYXRhIiwibW92ZVgiLCJkaXNYIiwic2V0VGltZW91dCIsImluZGV4IiwidGFyZ2V0IiwiZGF0YXNldCIsInRvdWNoRSIsImNoYW5nZWRUb3VjaGVzIiwiZW5kWCIsImNvbnNvbGUiLCJsb2ciLCJkZWxJdGVtIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJzcGxpY2UiLCJzZXREYXRhIiwiaSIsImluaXRFbGVXaWR0aCIsIiRhcHBseSIsInciLCJyZWFsIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dXaWR0aCIsInNjYWxlIiwiTWF0aCIsImZsb29yIiwiZ2V0RWxlV2lkdGgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsR0FEUjtBQUVMQyxjQUFRLENBRkg7QUFHTEMsWUFBTSxDQUNKO0FBQ0VDLGtCQUFVLEVBRFo7QUFFRUMsYUFBSztBQUZQLE9BREksRUFLSjtBQUNFRCxrQkFBVSxFQURaO0FBRUVDLGFBQUs7QUFGUCxPQUxJO0FBSEQsSyxRQXVCUEMsTyxHQUFVO0FBQ1JDLFlBRFEsa0JBQ0FDLENBREEsRUFDRztBQUNULFlBQUlBLEVBQUVDLE9BQUYsQ0FBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQixlQUFLUixNQUFMLEdBQWNNLEVBQUVDLE9BQUYsQ0FB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RUFBc0M7QUFDcENoQyxhQUFLZ0MsQ0FBTCxFQUFRL0IsUUFBUixHQUFtQixFQUFuQjtBQUNEO0FBQ0QsV0FBSzhCLE9BQUwsQ0FBYTtBQUNYL0IsY0FBTUE7QUFESyxPQUFiO0FBR0Q7Ozs2QkFpRVM7QUFDUixXQUFLaUMsWUFBTDtBQUNBLFdBQUtDLE1BQUw7QUFDRDs7O2dDQUNZQyxDLEVBQUc7QUFDZCxVQUFJQyxPQUFPLENBQVg7QUFDQSxVQUFJO0FBQ0YsWUFBSVIsTUFBTSxlQUFLUyxpQkFBTCxHQUF5QkMsV0FBbkM7QUFDQSxZQUFJQyxRQUFTLE1BQU0sQ0FBUCxJQUFhSixJQUFJLENBQWpCLENBQVo7QUFDQUMsZUFBT0ksS0FBS0MsS0FBTCxDQUFXYixNQUFNVyxLQUFqQixDQUFQO0FBQ0EsZUFBT0gsSUFBUDtBQUNELE9BTEQsQ0FLRSxPQUFPL0IsQ0FBUCxFQUFVO0FBQ1YsZUFBTyxLQUFQO0FBQ0Q7QUFDRjs7O21DQUNlO0FBQ2QsVUFBSVAsY0FBYyxLQUFLNEMsV0FBTCxDQUFpQixLQUFLNUMsV0FBdEIsQ0FBbEI7QUFDQSxXQUFLQSxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBdUIsY0FBUUMsR0FBUixDQUFZLEtBQUt4QixXQUFqQixFQUE4QkEsV0FBOUI7QUFDRDs7OztFQTlHK0IsZUFBSzZDLEk7O2tCQUFsQmpELEkiLCJmaWxlIjoiY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotK3nianovaYnXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZWxCdG5XaWR0aDogMTgwLFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgdHh0U3R5bGU6ICcnLFxuICAgICAgICAgIHR4dDogJ+aMh+WwluW/q+mAkidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR4dFN0eWxlOiAnJyxcbiAgICAgICAgICB0eHQ6ICfmjIflsJblv6vpgJInXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gICAgaW5pdGRhdGEgKHRoYXQpIHtcbiAgICAgIGxldCBsaXN0ID0gdGhhdC5saXN0XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdFtpXS50eHRTdHlsZSA9ICcnXG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBsaXN0OiBsaXN0XG4gICAgICB9KVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG91Y2hTIChlKSB7XG4gICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG91Y2hNIChlKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB0aGlzLmluaXRkYXRhKHRoYXQpXG4gICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdmFyIG1vdmVYID0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgICAgICB2YXIgZGlzWCA9IHRoaXMuc3RhcnRYIC0gbW92ZVhcbiAgICAgICAgICB2YXIgZGVsQnRuV2lkdGggPSB0aGlzLmRlbEJ0bldpZHRoXG4gICAgICAgICAgdmFyIHR4dFN0eWxlID0gJydcbiAgICAgICAgICBpZiAoZGlzWCA9PT0gMCB8fCBkaXNYIDwgMCkge1xuICAgICAgICAgICAgdHh0U3R5bGUgPSAndHJhbnNmb3JtOnRyYW5zbGF0ZVgoMHB4KSdcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPiAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdHh0U3R5bGUgPSAndHJhbnNmb3JtOnRyYW5zbGF0ZVgoLScgKyBkaXNYICsgJ3B4KSdcbiAgICAgICAgICAgIH0sIDUwMClcbiAgICAgICAgICAgIGlmIChkaXNYID49IGRlbEJ0bldpZHRoKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHR4dFN0eWxlID0gJ3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0nICsgZGVsQnRuV2lkdGggKyAncHgpJ1xuICAgICAgICAgICAgICB9LCA1MDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgICB0aGlzLmxpc3RbaW5kZXhdLnR4dFN0eWxlID0gdHh0U3R5bGVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvdWNoRSAoZSkge1xuICAgICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB2YXIgZW5kWCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICAgIHZhciBkaXNYID0gdGhpcy5zdGFydFggLSBlbmRYXG4gICAgICAgICAgdmFyIGRlbEJ0bldpZHRoID0gdGhpcy5kZWxCdG5XaWR0aFxuICAgICAgICAgIHZhciB0eHRTdHlsZSA9IGRpc1ggPiBkZWxCdG5XaWR0aCAvIDIgPyAndHJhbnNmb3JtOnRyYW5zbGF0ZVgoLScgKyBkZWxCdG5XaWR0aCArICdweCknIDogJ3RyYW5zZm9ybTp0cmFuc2xhdGVYKDBweCknXG4gICAgICAgICAgdmFyIGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5saXN0XG4gICAgICAgICAgbGlzdFtpbmRleF0udHh0U3R5bGUgPSB0eHRTdHlsZVxuICAgICAgICAgIHRoaXMubGlzdCA9IGxpc3RcbiAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RbaW5kZXhdLnR4dFN0eWxlKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsSXRlbSAoZSkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICAgICAgICB2YXIgbGlzdCA9IHRoYXQubGlzdFxuICAgICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBsaXN0OiBsaXN0XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQubGlzdClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoYXQuaW5pdGRhdGEodGhhdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmluaXRFbGVXaWR0aCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIGdldEVsZVdpZHRoICh3KSB7XG4gICAgICB2YXIgcmVhbCA9IDBcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCkud2luZG93V2lkdGhcbiAgICAgICAgdmFyIHNjYWxlID0gKDc1MCAvIDIpIC8gKHcgLyAyKVxuICAgICAgICByZWFsID0gTWF0aC5mbG9vcihyZXMgLyBzY2FsZSlcbiAgICAgICAgcmV0dXJuIHJlYWxcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGluaXRFbGVXaWR0aCAoKSB7XG4gICAgICB2YXIgZGVsQnRuV2lkdGggPSB0aGlzLmdldEVsZVdpZHRoKHRoaXMuZGVsQnRuV2lkdGgpXG4gICAgICB0aGlzLmRlbEJ0bldpZHRoID0gZGVsQnRuV2lkdGhcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGVsQnRuV2lkdGgsIGRlbEJ0bldpZHRoKVxuICAgIH1cbiAgfVxuIl19