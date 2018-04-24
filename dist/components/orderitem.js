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
      coldlist: Object,
      normallist: Object
    }, _this.$repeat = { "coldlist": { "com": "counteCold", "props": "" }, "normallist": { "com": "counteNormal", "props": "" } }, _this.$props = { "counteCold": { "xmlns:v-bind": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "v-bind:num.sync": { "value": "item.count", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "xmlns:v-on": { "value": "", "for": "coldlist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "coldlist", "item": "item", "index": "index", "key": "index" } }, "counteNormal": { "v-bind:num.sync": { "value": "item.count", "for": "normallist", "item": "item", "index": "index", "key": "index" }, "data-index": { "value": "{{index}}", "for": "normallist", "item": "item", "index": "index", "key": "index" } } }, _this.$events = { "counteCold": { "v-on:plusEdit": "plusCold", "v-on:minusEdit": "minCold", "v-on:keyEdit": "keyCold" }, "counteNormal": { "v-on:plusEdit": "plusNormal", "v-on:minusEdit": "minNormal", "v-on:keyEdit": "keyNormal" } }, _this.components = {
      counteCold: _counter2.default,
      counteNormal: _counter2.default
    }, _this.data = {
      delBtnWidth: 180,
      startX: 0,
      animate: '',
      current: '',
      indexId: '',
      cartcount: [],
      isEdit: false,
      editTxt: '编辑',
      checkedList: [],
      tempColdList: [],
      tempNormalList: []
    }, _this.methods = {
      touchS: function touchS(e) {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
        }
        this.indexId = e.currentTarget.id;
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
      plusCold: function plusCold(e) {
        var index = e.source.$index;
        this.$parent.data.coldList[index].count++;
        this.$apply();
        // 发送购物车修改数据
      },
      plusNormal: function plusNormal(e) {
        var index = e.source.$index;
        this.$parent.data.normalList[index].count++;
        this.$apply();
      },
      minCold: function minCold(e) {
        var index = e.source.$index;
        this.$parent.data.coldList[index].count--;
        this.$apply();
      },
      minNormal: function minNormal(e) {
        var index = e.source.$index;
        this.$parent.data.normalList[index].count--;
        this.$apply();
        // 发送购物车修改数据
      },
      keyCold: function keyCold(val, e) {
        var index = e.source.$index;
        this.$parent.data.coldList[index].count = val;
      },
      keyNormal: function keyNormal(val, e) {
        var index = e.source.$index;
        this.$parent.data.normalList[index].count = val;
      },
      goDetail: function goDetail(id) {
        console.log(id);
        _wepy2.default.navigateTo({
          url: './detail?id=' + id
        });
      },
      editTap: function editTap() {
        this.isEdit = !this.isEdit;
        if (this.isEdit) {
          this.editTxt = '取消';
          this.initChecked();
        } else {
          this.editTxt = '编辑';
        }
      },
      checkboxChange: function checkboxChange(e) {
        var checkedArr = e.detail.value;
        console.log(e);
        this.tempColdList = this.coldlist;
        this.tempNormalList = this.normallist;
        for (var i = 0; i < checkedArr.length; i++) {
          this.tempColdList = this.tempColdList.filter(function (item) {
            return item.id !== checkedArr[i];
          });
          this.tempNormalList = this.tempNormalList.filter(function (item) {
            return item.id !== checkedArr[i];
          });
          this.coldlist.forEach(function (item) {
            if (item.id === checkedArr[i]) {
              item.checked = true;
            }
          });
          this.normallist.forEach(function (item) {
            if (item.id === checkedArr[i]) {
              item.checked = true;
            }
          });
        }
      },
      checkAll: function checkAll() {
        this.coldlist.forEach(function (item) {
          item.checked = true;
        });
        this.normallist.forEach(function (item) {
          item.checked = true;
        });
        this.tempColdList = [];
        this.tempNormalList = [];
      },
      deleteTap: function deleteTap() {
        var that = this;
        _wepy2.default.showModal({
          title: '提示',
          content: '是否删除？',
          success: function success(res) {
            if (res.confirm) {
              that.coldlist = that.tempColdList;
              that.normallist = that.tempNormalList;
              that.isEdit = false;
              that.editTxt = '编辑';
            } else if (res.cancel) {
              that.initChecked();
            }
            that.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderItem, [{
    key: 'initChecked',
    value: function initChecked() {
      this.coldlist.forEach(function (item) {
        item.checked = false;
      });
      this.normallist.forEach(function (item) {
        item.checked = false;
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return OrderItem;
}(_wepy2.default.component);

exports.default = OrderItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyaXRlbS5qcyJdLCJuYW1lcyI6WyJPcmRlckl0ZW0iLCJwcm9wcyIsImNvbGRsaXN0IiwiT2JqZWN0Iiwibm9ybWFsbGlzdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvdW50ZUNvbGQiLCJjb3VudGVOb3JtYWwiLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJhbmltYXRlIiwiY3VycmVudCIsImluZGV4SWQiLCJjYXJ0Y291bnQiLCJpc0VkaXQiLCJlZGl0VHh0IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsIm1ldGhvZHMiLCJ0b3VjaFMiLCJlIiwidG91Y2hlcyIsImxlbmd0aCIsImNsaWVudFgiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJ0b3VjaE0iLCJkYXRhc2V0IiwiaW5kZXgiLCJtb3ZlWCIsImRpc1giLCJkZWxJdGVtIiwidGhhdCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwibGlzdCIsInNwbGljZSIsIiRhcHBseSIsInBsdXNDb2xkIiwic291cmNlIiwiJGluZGV4IiwiJHBhcmVudCIsImNvbGRMaXN0IiwiY291bnQiLCJwbHVzTm9ybWFsIiwibm9ybWFsTGlzdCIsIm1pbkNvbGQiLCJtaW5Ob3JtYWwiLCJrZXlDb2xkIiwidmFsIiwia2V5Tm9ybWFsIiwiZ29EZXRhaWwiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVUbyIsInVybCIsImVkaXRUYXAiLCJpbml0Q2hlY2tlZCIsImNoZWNrYm94Q2hhbmdlIiwiY2hlY2tlZEFyciIsImRldGFpbCIsInZhbHVlIiwiaSIsImZpbHRlciIsIml0ZW0iLCJmb3JFYWNoIiwiY2hlY2tlZCIsImNoZWNrQWxsIiwiZGVsZXRlVGFwIiwiY2FuY2VsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7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QyxlQUFLaUMsUzs7a0JBQXZCL0UsUyIsImZpbGUiOiJvcmRlcml0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IENvdW50ZSBmcm9tICcuL2NvdW50ZXInXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgY29sZGxpc3Q6IE9iamVjdCxcbiAgICAgIG5vcm1hbGxpc3Q6IE9iamVjdFxuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJjb2xkbGlzdFwiOntcImNvbVwiOlwiY291bnRlQ29sZFwiLFwicHJvcHNcIjpcIlwifSxcIm5vcm1hbGxpc3RcIjp7XCJjb21cIjpcImNvdW50ZU5vcm1hbFwiLFwicHJvcHNcIjpcIlwifX07XHJcbiRwcm9wcyA9IHtcImNvdW50ZUNvbGRcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6bnVtLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbS5jb3VudFwiLFwiZm9yXCI6XCJjb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwieG1sbnM6di1vblwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcImRhdGEtaW5kZXhcIjp7XCJ2YWx1ZVwiOlwie3tpbmRleH19XCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiY291bnRlTm9ybWFsXCI6e1widi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwibm9ybWFsbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwiZGF0YS1pbmRleFwiOntcInZhbHVlXCI6XCJ7e2luZGV4fX1cIixcImZvclwiOlwibm9ybWFsbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7XCJjb3VudGVDb2xkXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c0NvbGRcIixcInYtb246bWludXNFZGl0XCI6XCJtaW5Db2xkXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleUNvbGRcIn0sXCJjb3VudGVOb3JtYWxcIjp7XCJ2LW9uOnBsdXNFZGl0XCI6XCJwbHVzTm9ybWFsXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluTm9ybWFsXCIsXCJ2LW9uOmtleUVkaXRcIjpcImtleU5vcm1hbFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgY291bnRlQ29sZDogQ291bnRlLFxuICAgICAgY291bnRlTm9ybWFsOiBDb3VudGVcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIGRlbEJ0bldpZHRoOiAxODAsXG4gICAgICBzdGFydFg6IDAsXG4gICAgICBhbmltYXRlOiAnJyxcbiAgICAgIGN1cnJlbnQ6ICcnLFxuICAgICAgaW5kZXhJZDogJycsXG4gICAgICBjYXJ0Y291bnQ6IFtdLFxuICAgICAgaXNFZGl0OiBmYWxzZSxcbiAgICAgIGVkaXRUeHQ6ICfnvJbovpEnLFxuICAgICAgY2hlY2tlZExpc3Q6IFtdLFxuICAgICAgdGVtcENvbGRMaXN0OiBbXSxcbiAgICAgIHRlbXBOb3JtYWxMaXN0OiBbXVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG91Y2hTIChlKSB7XG4gICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zdGFydFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5kZXhJZCA9IGUuY3VycmVudFRhcmdldC5pZFxuICAgICAgfSxcbiAgICAgIHRvdWNoTSAoZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHZhciBtb3ZlWCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgICAgdmFyIGRpc1ggPSB0aGlzLnN0YXJ0WCAtIG1vdmVYXG4gICAgICAgICAgaWYgKGRpc1ggPT09IDAgfHwgZGlzWCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9ICcnXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzWCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZSA9ICdpbm5lci1hbmltYXRlLWxlZnQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVsSXRlbSAoZSkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGF0Lmxpc3RcbiAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LmFuaW1hdGUgPSAnJ1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gJydcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcGx1c0NvbGQgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuJHBhcmVudC5kYXRhLmNvbGRMaXN0W2luZGV4XS5jb3VudCArK1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIC8vIOWPkemAgei0reeJqei9puS/ruaUueaVsOaNrlxuICAgICAgfSxcbiAgICAgIHBsdXNOb3JtYWwgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuJHBhcmVudC5kYXRhLm5vcm1hbExpc3RbaW5kZXhdLmNvdW50ICsrXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Db2xkIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5jb2xkTGlzdFtpbmRleF0uY291bnQgLS1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIG1pbk5vcm1hbCAoZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgdGhpcy4kcGFyZW50LmRhdGEubm9ybWFsTGlzdFtpbmRleF0uY291bnQgLS1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgIH0sXG4gICAgICBrZXlDb2xkICh2YWwsIGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuJHBhcmVudC5kYXRhLmNvbGRMaXN0W2luZGV4XS5jb3VudCA9IHZhbFxuICAgICAgfSxcbiAgICAgIGtleU5vcm1hbCAodmFsLCBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5ub3JtYWxMaXN0W2luZGV4XS5jb3VudCA9IHZhbFxuICAgICAgfSxcbiAgICAgIGdvRGV0YWlsIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2RldGFpbD9pZD0nICsgaWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBlZGl0VGFwICgpIHtcbiAgICAgICAgdGhpcy5pc0VkaXQgPSAhdGhpcy5pc0VkaXRcbiAgICAgICAgaWYgKHRoaXMuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5lZGl0VHh0ID0gJ+WPlua2iCdcbiAgICAgICAgICB0aGlzLmluaXRDaGVja2VkKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVkaXRUeHQgPSAn57yW6L6RJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UgKGUpIHtcbiAgICAgICAgdmFyIGNoZWNrZWRBcnIgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB0aGlzLnRlbXBDb2xkTGlzdCA9IHRoaXMuY29sZGxpc3RcbiAgICAgICAgdGhpcy50ZW1wTm9ybWFsTGlzdCA9IHRoaXMubm9ybWFsbGlzdFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoZWNrZWRBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnRlbXBDb2xkTGlzdCA9IHRoaXMudGVtcENvbGRMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT09IGNoZWNrZWRBcnJbaV1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMudGVtcE5vcm1hbExpc3QgPSB0aGlzLnRlbXBOb3JtYWxMaXN0LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT09IGNoZWNrZWRBcnJbaV1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuY29sZGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGNoZWNrZWRBcnJbaV0pIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBjaGVja2VkQXJyW2ldKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hlY2tBbGwgKCkge1xuICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRlbXBDb2xkTGlzdCA9IFtdXG4gICAgICAgIHRoaXMudGVtcE5vcm1hbExpc3QgPSBbXVxuICAgICAgfSxcbiAgICAgIGRlbGV0ZVRhcCAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmmK/lkKbliKDpmaTvvJ8nLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICB0aGF0LmNvbGRsaXN0ID0gdGhhdC50ZW1wQ29sZExpc3RcbiAgICAgICAgICAgICAgdGhhdC5ub3JtYWxsaXN0ID0gdGhhdC50ZW1wTm9ybWFsTGlzdFxuICAgICAgICAgICAgICB0aGF0LmlzRWRpdCA9IGZhbHNlXG4gICAgICAgICAgICAgIHRoYXQuZWRpdFR4dCA9ICfnvJbovpEnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgdGhhdC5pbml0Q2hlY2tlZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBpbml0Q2hlY2tlZCAoKSB7XG4gICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0pXG4gICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==