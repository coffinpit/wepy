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
      var _this4 = this;

      this.token = this.$parent.getToken();
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
          if (_this.$parent.missToken) {
            _this.token = _this4.$parent.getToken(res.data.error);
            _this.initCollect();
          }
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
      var _this5 = this;

      this.token = this.$parent.getToken();
      var _this = this;
      var data = {
        markId: markId,
        token: this.token
      };
      this.$parent.HttpRequest.CancelMarkHttp(data).then(function (res) {
        if (res.data.error === 0) {
          cb && cb();
        } else {
          if (_this.$parent.missToken) {
            _this.token = _this5.$parent.getToken(res.data.error);
          }
        }
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
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.getTokenTime = 0;
      this.initCollect();
    }
  }]);

  return Collect;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collect , 'pages/collect'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3QuanMiXSwibmFtZXMiOlsiQ29sbGVjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb2xsZWN0R29vZCIsImlzRG93biIsImRlZmVjdCIsImNvbXB1dGVkIiwiaXNOdWxsIiwiY29sbGVjdExpc3QiLCJsZW5ndGgiLCJkYXRhIiwidG9rZW4iLCJwYWdlU2l6ZSIsInBhZ2VOdW0iLCJ0b3RhbFBhZ2VOdW0iLCJpc0VkaXQiLCJjaGVja1Jlc3VsdCIsImRhdGFMZW5ndGgiLCJpc0xvYWRpbmciLCJtZXRob2RzIiwiZWRpdEFsbCIsImdvQ2F0ZWdvcnkiLCJzd2l0Y2hUYWIiLCJ1cmwiLCJjaGVja2VkIiwiaW5kZXgiLCJtYXJrSWQiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWNjZXNzIiwicmVzIiwiY29uZmlybSIsIkNhbmNlbE1hcmsiLCJpbml0Q29sbGVjdCIsImdvRGV0YWlsIiwiaWQiLCJ0eXBlIiwiY29uc29sZSIsImxvZyIsIm5hdmlnYXRlVG8iLCIkcGFyZW50IiwiZ2V0VG9rZW4iLCJzaG93TG9hZGluZyIsIl90aGlzIiwibWFya1R5cGUiLCJIdHRwUmVxdWVzdCIsIkdldE1hcmtTcHUiLCJ0aGVuIiwiZXJyb3IiLCJzaG93U3VjY2VzcyIsInNwdXMiLCJ0b3RhbENvdW50IiwiZm9yRWFjaCIsIml0ZW0iLCJnb29kIiwicGF0aCIsImNvdmVyIiwicHJpY2UiLCJtZW1iZXJQcmljZSIsIm9sZHByaWNlIiwicmVkdWN0aW9uIiwic291cmNlSWQiLCJkZXNjcmlwdCIsImRlc2MiLCJpc0FsbG93U2FsZSIsIm5vU2FsZXMiLCJwdXNoIiwibWlzc1Rva2VuIiwiJGFwcGx5IiwiY2F0Y2giLCJzaG93RmFpbCIsImNiIiwiQ2FuY2VsTWFya0h0dHAiLCJnZXRUb2tlblRpbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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TCxHQUFlLEtBQUtDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsYUFBS0QsT0FBTDtBQUNBLGFBQUtxQixXQUFMO0FBQ0QsT0FKRCxNQUlPO0FBQ0wsWUFBSSxLQUFLMUIsV0FBTCxDQUFpQkMsTUFBakIsS0FBNEIsQ0FBaEMsRUFBbUM7QUFDakMsZUFBS0wsTUFBTCxHQUFjLElBQWQ7QUFDRDtBQUNGO0FBQ0Y7Ozs2QkFDUztBQUNSLFdBQUtpRSxNQUFMO0FBQ0Q7Ozs2QkFDUztBQUNSLFdBQUtLLFlBQUwsR0FBb0IsQ0FBcEI7QUFDQSxXQUFLeEMsV0FBTDtBQUNEOzs7O0VBL0prQyxlQUFLeUMsSTs7a0JBQXJCL0UsTyIsImZpbGUiOiJjb2xsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL2dvb2RzJ1xuICBpbXBvcnQgRGVmZWN0IGZyb20gJy4uL2NvbXBvbmVudHMvZGVmZWN0J1xuICBpbXBvcnQgUmVhY2hkb3duIGZyb20gJy4uL2NvbXBvbmVudHMvcmVhY2hkb3duJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgfVxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb2xsZWN0R29vZFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Z29vZHNJdGVtLnN5bmNcIjpcImNvbGxlY3RMaXN0XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJpc0Rvd25cIjp7fSxcImRlZmVjdFwiOntcInR5cGVcIjpcIjRcIn19O1xyXG4kZXZlbnRzID0ge1wiY29sbGVjdEdvb2RcIjp7XCJ2LW9uOmdvb2RzVGFwXCI6XCJnb0RldGFpbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY29sbGVjdEdvb2Q6IEdvb2RzLFxuICAgICAgaXNEb3duOiBSZWFjaGRvd24sXG4gICAgICBkZWZlY3Q6IERlZmVjdFxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGlzTnVsbCAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHRva2VuOiAnJyxcbiAgICAgIHBhZ2VTaXplOiA1LFxuICAgICAgcGFnZU51bTogMSxcbiAgICAgIHRvdGFsUGFnZU51bTogJycsXG4gICAgICBjb2xsZWN0TGlzdDogW10sXG4gICAgICBpc0VkaXQ6IGZhbHNlLFxuICAgICAgY2hlY2tSZXN1bHQ6ICcnLFxuICAgICAgaXNEb3duOiBmYWxzZSxcbiAgICAgIGRhdGFMZW5ndGg6IDAsXG4gICAgICBpc0xvYWRpbmc6IHRydWVcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGVkaXRBbGwgKCkge1xuICAgICAgICB0aGlzLmlzRWRpdCA9ICF0aGlzLmlzRWRpdFxuICAgICAgfSxcbiAgICAgIGdvQ2F0ZWdvcnkgKCkge1xuICAgICAgICB3ZXB5LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9jYXRlZ29yeSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaGVja2VkIChpbmRleCkge1xuICAgICAgICB0aGlzLmNoZWNrUmVzdWx0ID0gdGhpcy5jb2xsZWN0TGlzdFtpbmRleF0ubWFya0lkXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+ehruiupOWPlua2iOaUtuiXjycsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuQ2FuY2VsTWFyayh0aGlzLmNoZWNrUmVzdWx0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlTnVtID0gMVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxlbmd0aCA9IDBcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RMaXN0ID0gW11cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ29EZXRhaWwgKGlkLCB0eXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGUpXG4gICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGluaXRDb2xsZWN0ICgpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdGhpcy4kcGFyZW50LnNob3dMb2FkaW5nKClcbiAgICAgIHZhciBfdGhpcyA9IHRoaXNcbiAgICAgIHRoaXMuaXNFZGl0ID0gZmFsc2VcbiAgICAgIHRoaXMuaXNEb3duID0gZmFsc2VcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgICBtYXJrVHlwZTogMSxcbiAgICAgICAgcGFnZVNpemU6IHRoaXMucGFnZVNpemUsXG4gICAgICAgIHBhZ2VOdW06IHRoaXMucGFnZU51bVxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkdldE1hcmtTcHUoZGF0YSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgX3RoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgaWYgKHJlcy5kYXRhLmVycm9yID09PSAwKSB7XG4gICAgICAgICAgX3RoaXMuJHBhcmVudC5zaG93U3VjY2VzcygpXG4gICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgX3RoaXMudG90YWxQYWdlTnVtID0gZGF0YS50b3RhbFBhZ2VOdW1cbiAgICAgICAgICBfdGhpcy5kYXRhTGVuZ3RoICs9IGRhdGEuc3B1cy5sZW5ndGhcbiAgICAgICAgICBpZiAoZGF0YS50b3RhbENvdW50IDw9IF90aGlzLnBhZ2VTaXplKSB7XG4gICAgICAgICAgICBfdGhpcy5pc0Rvd24gPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmlzRG93biA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuc3B1cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgZ29vZCA9IHt9XG4gICAgICAgICAgICBnb29kLnBhdGggPSBpdGVtLmNvdmVyXG4gICAgICAgICAgICBnb29kLnRpdGxlID0gaXRlbS50aXRsZVxuICAgICAgICAgICAgZ29vZC5wcmljZSA9IGl0ZW0ubWVtYmVyUHJpY2VcbiAgICAgICAgICAgIGdvb2Qub2xkcHJpY2UgPSBpdGVtLnByaWNlXG4gICAgICAgICAgICBnb29kLnJlZHVjdGlvbiA9IGl0ZW0ucmVkdWN0aW9uXG4gICAgICAgICAgICBnb29kLmlkID0gaXRlbS5zb3VyY2VJZFxuICAgICAgICAgICAgZ29vZC5kZXNjcmlwdCA9IGl0ZW0uZGVzY1xuICAgICAgICAgICAgZ29vZC5tYXJrSWQgPSBpdGVtLm1hcmtJZFxuICAgICAgICAgICAgaWYgKCFpdGVtLmlzQWxsb3dTYWxlKSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGdvb2Qubm9TYWxlcyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5jb2xsZWN0TGlzdC5wdXNoKGdvb2QpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoX3RoaXMuJHBhcmVudC5taXNzVG9rZW4pIHtcbiAgICAgICAgICAgIF90aGlzLnRva2VuID0gdGhpcy4kcGFyZW50LmdldFRva2VuKHJlcy5kYXRhLmVycm9yKVxuICAgICAgICAgICAgX3RoaXMuaW5pdENvbGxlY3QoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfdGhpcy4kYXBwbHkoKVxuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICBfdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy4kcGFyZW50LnNob3dGYWlsKClcbiAgICAgIH0pXG4gICAgfVxuICAgIENhbmNlbE1hcmsgKG1hcmtJZCwgY2IpIHtcbiAgICAgIHRoaXMudG9rZW4gPSB0aGlzLiRwYXJlbnQuZ2V0VG9rZW4oKVxuICAgICAgdmFyIF90aGlzID0gdGhpc1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIG1hcmtJZDogbWFya0lkLFxuICAgICAgICB0b2tlbjogdGhpcy50b2tlblxuICAgICAgfVxuICAgICAgdGhpcy4kcGFyZW50Lkh0dHBSZXF1ZXN0LkNhbmNlbE1hcmtIdHRwKGRhdGEpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZiAocmVzLmRhdGEuZXJyb3IgPT09IDApIHtcbiAgICAgICAgICBjYiAmJiBjYigpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKF90aGlzLiRwYXJlbnQubWlzc1Rva2VuKSB7XG4gICAgICAgICAgICBfdGhpcy50b2tlbiA9IHRoaXMuJHBhcmVudC5nZXRUb2tlbihyZXMuZGF0YS5lcnJvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20gKCkge1xuICAgICAgLy8g5pi+56S65Yqg6L2954q25oCBXG4gICAgICBpZiAodGhpcy5wYWdlTnVtIDwgdGhpcy50b3RhbFBhZ2VOdW0pIHtcbiAgICAgICAgLy8g5pi+56S65LiL5LiA6aG15pWw5o2uXG4gICAgICAgIHRoaXMucGFnZU51bSArK1xuICAgICAgICB0aGlzLmluaXRDb2xsZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxlY3RMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgICB0aGlzLmdldFRva2VuVGltZSA9IDBcbiAgICAgIHRoaXMuaW5pdENvbGxlY3QoKVxuICAgIH1cbiAgfVxuIl19