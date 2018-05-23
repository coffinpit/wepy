'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _goods = require('./../components/goods.js');

var _goods2 = _interopRequireDefault(_goods);

var _defect = require('./../components/defect.js');

var _defect2 = _interopRequireDefault(_defect);

var _reachdown = require('./../components/reachdown.js');

var _reachdown2 = _interopRequireDefault(_reachdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collect = function (_wepy$page) {
  _inherits(Collect, _wepy$page);

  function Collect() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, Collect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = Collect.__proto__ || Object.getPrototypeOf(Collect)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
      navigationBarTitleText: '我的收藏'
    }, _this2.$repeat = {}, _this2.$props = { "collectGood": { "xmlns:v-bind": "", "v-bind:goodsItem.sync": "collectList", "xmlns:v-on": "" }, "isDown": {}, "defect": { "type": "4" } }, _this2.$events = { "collectGood": { "v-on:goodsTap": "goDetail" } }, _this2.components = {
      collectGood: _goods2.default,
      isDown: _reachdown2.default,
      defect: _defect2.default
    }, _this2.computed = {
      isNull: function isNull() {
        if (this.collectList.length === 0) {
          return true;
        } else {
          return false;
        }
      }
    }, _this2.data = {
      token: '',
      pageSize: 5,
      pageNum: 1,
      totalPageNum: '',
      collectList: [],
      isEdit: false,
      checkResult: '',
      isDown: false,
      dataLength: 0,
      isLoading: true
    }, _this2.methods = {
      editAll: function editAll() {
        this.isEdit = !this.isEdit;
      },
      goCategory: function goCategory() {
        _wepy2.default.switchTab({
          url: './category'
        });
      },
      checked: function checked(index) {
        var _this3 = this;

        this.checkResult = this.collectList[index].markId;
        _wepy2.default.showModal({
          title: '提示',
          content: '确认取消收藏',
          success: function success(res) {
            if (res.confirm) {
              _this3.CancelMark(_this3.checkResult, function () {
                _this3.pageNum = 1;
                _this3.dataLength = 0;
                _this3.collectList = [];
                _this3.initCollect();
              });
            }
          }
        });
      },
      goDetail: function goDetail(id, type) {
        console.log(type);
        if (!type) {
          _wepy2.default.navigateTo({
            url: './detail?id=' + id
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(Collect, [{
    key: 'initCollect',
    value: function initCollect() {
      this.$parent.showLoading();
      var _this = this;
      this.isEdit = false;
      this.isDown = false;
      this.isLoading = true;
      var data = {
        token: this.token,
        markType: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$parent.HttpRequest.GetMarkSpu(data).then(function (res) {
        console.log(res);
        _this.isLoading = false;
        if (res.data.error === 0) {
          _this.$parent.showSuccess();
          var data = res.data.data;
          _this.totalPageNum = data.totalPageNum;
          _this.dataLength += data.spus.length;
          if (data.totalCount <= _this.pageSize) {
            _this.isDown = true;
          } else {
            _this.isDown = false;
          }
          data.spus.forEach(function (item) {
            var good = {};
            good.path = item.cover;
            good.title = item.title;
            good.price = item.memberPrice;
            good.oldprice = item.price;
            good.reduction = item.reduction;
            good.id = item.sourceId;
            good.descript = item.desc;
            good.markId = item.markId;
            if (!item.isAllowSale) {
              good.noSales = true;
            } else {
              good.noSales = false;
            }
            _this.collectList.push(good);
          });
        } else {
          _this.$parent.showFail();
        }
        _this.$apply();
      }).catch(function () {
        _this.isLoading = false;
        _this.$parent.showFail();
      });
    }
  }, {
    key: 'CancelMark',
    value: function CancelMark(markId, cb) {
      var _this = this;
      var data = {
        markId: markId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        console.log(res);
        cb && cb();
        _this.$apply();
      });
    }
  }, {
    key: 'onReachBottom',
    value: function onReachBottom() {
      // 显示加载状态
      if (this.pageNum < this.totalPageNum) {
        // 显示下一页数据
        this.pageNum++;
        this.initCollect();
      } else {
        if (this.collectList.length !== 0) {
          this.isDown = true;
        }
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.token = this.$parent.getToken();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.initCollect();
    }
  }]);

  return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0Q29sbGVjdCIsImdvRGV0YWlsIiwiaWQiLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCIkcGFyZW50Iiwic2hvd0xvYWRpbmciLCJfdGhpcyIsIm1hcmtUeXBlIiwiSHR0cFJlcXVlc3QiLCJHZXRNYXJrU3B1IiwidGhlbiIsImVycm9yIiwic2hvd1N1Y2Nlc3MiLCJzcHVzIiwidG90YWxDb3VudCIsImZvckVhY2giLCJpdGVtIiwiZ29vZCIsInBhdGgiLCJjb3ZlciIsInByaWNlIiwibWVtYmVyUHJpY2UiLCJvbGRwcmljZSIsInJlZHVjdGlvbiIsInNvdXJjZUlkIiwiZGVzY3JpcHQiLCJkZXNjIiwiaXNBbGxvd1NhbGUiLCJub1NhbGVzIiwicHVzaCIsInNob3dGYWlsIiwiJGFwcGx5IiwiY2F0Y2giLCJjYiIsIkNhbmNlbE1hcmtIdHRwIiwiZ2V0VG9rZW4iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QixRQUFkO0FBQ0Q7QUFDRHhCLGNBQU15QixNQUFOO0FBQ0QsT0FsQ0QsRUFrQ0dDLEtBbENILENBa0NTLFlBQU07QUFDYjFCLGNBQU16QixTQUFOLEdBQWtCLEtBQWxCO0FBQ0F5QixjQUFNRixPQUFOLENBQWMwQixRQUFkO0FBQ0QsT0FyQ0Q7QUFzQ0Q7OzsrQkFDV3pDLE0sRUFBUTRDLEUsRUFBSTtBQUN0QixVQUFJM0IsUUFBUSxJQUFaO0FBQ0EsVUFBSWpDLE9BQU87QUFDVGdCLGdCQUFRQSxNQURDO0FBRVRmLGVBQU8sS0FBS0E7QUFGSCxPQUFYO0FBSUEsV0FBSzhCLE9BQUwsQ0FBYUksV0FBYixDQUF5QjBCLGNBQXpCLENBQXdDN0QsSUFBeEMsRUFBOENxQyxJQUE5QyxDQUFtRCxVQUFDaEIsR0FBRCxFQUFTO0FBQzFETyxnQkFBUUMsR0FBUixDQUFZUixHQUFaO0FBQ0F1QyxjQUFNQSxJQUFOO0FBQ0EzQixjQUFNeUIsTUFBTjtBQUNELE9BSkQ7QUFLRDs7O29DQUNnQjtBQUNmO0FBQ0EsVUFBSSxLQUFLdkQsT0FBTCxHQUFlLEtBQUtDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0QsT0FBTDtBQUNBLGFBQUtxQixXQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSSxLQUFLMUIsV0FBTCxDQUFpQkMsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtPLEtBQUwsR0FBYSxLQUFLOEIsT0FBTCxDQUFhK0IsUUFBYixFQUFiO0FBQ0EsV0FBS0osTUFBTDtBQUNEOzs7NkJBQ1M7QUFDUixXQUFLbEMsV0FBTDtBQUNEOzs7O0VBckprQyxlQUFLdUMsSTs7a0JBQXJCN0UsTyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImNvbGxlY3RMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJpc0Rvd25cIjp7fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjRcIn19O1xyXG4kZXZlbnRzID0ge1wiY29sbGVjdEdvb2RcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY29sbGVjdEdvb2Q6IEdvb2RzLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd24sXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBjb2xsZWN0TGlzdDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgY2hlY2tSZXN1bHQ6ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGRhdGFMZW5ndGg6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBbGwgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaGVja2VkIChpbmRleCkge1xuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0ID0gdGhpcy5jb2xsZWN0TGlzdFtpbmRleF0ubWFya0lkXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOaUtuiXjycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyayh0aGlzLmNoZWNrUmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IDBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkLCB0eXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGUpXG4gICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDb2xsZWN0ICgpIHtcbiAgICAgIHRoaXMuJHBhcmVudC5zaG93TG9hZGluZygpXG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB0aGlzLmlzRWRpdCA9IGZhbHNlXG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcbiAgICAgICAgbWFya1R5cGU6IDEsXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLFxuICAgICAgICBwYWdlTnVtOiB0aGlzLnBhZ2VOdW1cbiAgICAgIH1cbiAgICAgIHRoaXMuJHBhcmVudC5IdHRwUmVxdWVzdC5HZXRNYXJrU3B1KGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIF90aGlzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgIGlmIChyZXMuZGF0YS5lcnJvciA9PT0gMCkge1xuICAgICAgICAgIF90aGlzLiRwYXJlbnQuc2hvd1N1Y2Nlc3MoKVxuICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgIF90aGlzLnRvdGFsUGFnZU51bSA9IGRhdGEudG90YWxQYWdlTnVtXG4gICAgICAgICAgX3RoaXMuZGF0YUxlbmd0aCArPSBkYXRhLnNwdXMubGVuZ3RoXG4gICAgICAgICAgaWYgKGRhdGEudG90YWxDb3VudCA8PSBfdGhpcy5wYWdlU2l6ZSkge1xuICAgICAgICAgICAgX3RoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLnNwdXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIGdvb2QgPSB7fVxuICAgICAgICAgICAgZ29vZC5wYXRoID0gaXRlbS5jb3ZlclxuICAgICAgICAgICAgZ29vZC50aXRsZSA9IGl0ZW0udGl0bGVcbiAgICAgICAgICAgIGdvb2QucHJpY2UgPSBpdGVtLm1lbWJlclByaWNlXG4gICAgICAgICAgICBnb29kLm9sZHByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgICAgZ29vZC5yZWR1Y3Rpb24gPSBpdGVtLnJlZHVjdGlvblxuICAgICAgICAgICAgZ29vZC5pZCA9IGl0ZW0uc291cmNlSWRcbiAgICAgICAgICAgIGdvb2QuZGVzY3JpcHQgPSBpdGVtLmRlc2NcbiAgICAgICAgICAgIGdvb2QubWFya0lkID0gaXRlbS5tYXJrSWRcbiAgICAgICAgICAgIGlmICghaXRlbS5pc0FsbG93U2FsZSkge1xuICAgICAgICAgICAgICBnb29kLm5vU2FsZXMgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBnb29kLm5vU2FsZXMgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY29sbGVjdExpc3QucHVzaChnb29kKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93RmFpbCgpXG4gICAgICB9KVxuICAgIH1cbiAgICBDYW5jZWxNYXJrIChtYXJrSWQsIGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzXG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgbWFya0lkOiBtYXJrSWQsXG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuXG4gICAgICB9XG4gICAgICB0aGlzLiRwYXJlbnQuSHR0cFJlcXVlc3QuQ2FuY2VsTWFya0h0dHAoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgY2IgJiYgY2IoKVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgb25SZWFjaEJvdHRvbSAoKSB7XG4gICAgICAvLyDmmL7npLrliqDovb3nirbmgIFcbiAgICAgIGlmICh0aGlzLnBhZ2VOdW0gPCB0aGlzLnRvdGFsUGFnZU51bSkge1xuICAgICAgICAvLyDmmL7npLrkuIvkuIDpobXmlbDmja5cbiAgICAgICAgdGhpcy5wYWdlTnVtICsrXG4gICAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGVjdExpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgICBvblNob3cgKCkge1xuICAgICAgdGhpcy5pbml0Q29sbGVjdCgpXG4gICAgfVxuICB9XG4iXX0=