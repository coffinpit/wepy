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
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.$apply();
    }
  }]);

  return OrderItem;
}(_wepy2.default.component);

exports.default = OrderItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyaXRlbS5qcyJdLCJuYW1lcyI6WyJPcmRlckl0ZW0iLCJwcm9wcyIsImNvbGRsaXN0IiwiT2JqZWN0Iiwibm9ybWFsbGlzdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvdW50ZUNvbGQiLCJjb3VudGVOb3JtYWwiLCJkYXRhIiwiZGVsQnRuV2lkdGgiLCJzdGFydFgiLCJhbmltYXRlIiwiY3VycmVudCIsImluZGV4SWQiLCJjYXJ0Y291bnQiLCJpc0VkaXQiLCJlZGl0VHh0IiwiY2hlY2tlZExpc3QiLCJ0ZW1wQ29sZExpc3QiLCJ0ZW1wTm9ybWFsTGlzdCIsIm1ldGhvZHMiLCJ0b3VjaFMiLCJlIiwidG91Y2hlcyIsImxlbmd0aCIsImNsaWVudFgiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCJ0b3VjaE0iLCJkYXRhc2V0IiwiaW5kZXgiLCJtb3ZlWCIsImRpc1giLCJkZWxJdGVtIiwidGhhdCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwibGlzdCIsInNwbGljZSIsIiRhcHBseSIsInBsdXNDb2xkIiwic291cmNlIiwiJGluZGV4IiwiJHBhcmVudCIsImNvbGRMaXN0IiwiY291bnQiLCJwbHVzTm9ybWFsIiwibm9ybWFsTGlzdCIsIm1pbkNvbGQiLCJtaW5Ob3JtYWwiLCJrZXlDb2xkIiwidmFsIiwia2V5Tm9ybWFsIiwiZ29EZXRhaWwiLCJjb25zb2xlIiwibG9nIiwibmF2aWdhdGVUbyIsInVybCIsImVkaXRUYXAiLCJpbml0Q2hlY2tlZCIsImNoZWNrYm94Q2hhbmdlIiwiY2hlY2tlZEFyciIsImRldGFpbCIsInZhbHVlIiwiaSIsImZpbHRlciIsIml0ZW0iLCJmb3JFYWNoIiwiY2hlY2tlZCIsImNoZWNrQWxsIiwiZGVsZXRlVGFwIiwiY2FuY2VsIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7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QUFDRDs7OztFQTVLb0MsZUFBS2lDLFM7O2tCQUF2Qi9FLFMiLCJmaWxlIjoib3JkZXJpdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBDb3VudGUgZnJvbSAnLi9jb3VudGVyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVySXRlbSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGNvbGRsaXN0OiBPYmplY3QsXG4gICAgICBub3JtYWxsaXN0OiBPYmplY3RcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiY29sZGxpc3RcIjp7XCJjb21cIjpcImNvdW50ZUNvbGRcIixcInByb3BzXCI6XCJcIn0sXCJub3JtYWxsaXN0XCI6e1wiY29tXCI6XCJjb3VudGVOb3JtYWxcIixcInByb3BzXCI6XCJcIn19O1xyXG4kcHJvcHMgPSB7XCJjb3VudGVDb2xkXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJjb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOm51bS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW0uY291bnRcIixcImZvclwiOlwiY29sZGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInhtbG5zOnYtb25cIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImNvbGRsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJkYXRhLWluZGV4XCI6e1widmFsdWVcIjpcInt7aW5kZXh9fVwiLFwiZm9yXCI6XCJjb2xkbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImNvdW50ZU5vcm1hbFwiOntcInYtYmluZDpudW0uc3luY1wiOntcInZhbHVlXCI6XCJpdGVtLmNvdW50XCIsXCJmb3JcIjpcIm5vcm1hbGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcImRhdGEtaW5kZXhcIjp7XCJ2YWx1ZVwiOlwie3tpbmRleH19XCIsXCJmb3JcIjpcIm5vcm1hbGxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX19O1xyXG4kZXZlbnRzID0ge1wiY291bnRlQ29sZFwiOntcInYtb246cGx1c0VkaXRcIjpcInBsdXNDb2xkXCIsXCJ2LW9uOm1pbnVzRWRpdFwiOlwibWluQ29sZFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlDb2xkXCJ9LFwiY291bnRlTm9ybWFsXCI6e1widi1vbjpwbHVzRWRpdFwiOlwicGx1c05vcm1hbFwiLFwidi1vbjptaW51c0VkaXRcIjpcIm1pbk5vcm1hbFwiLFwidi1vbjprZXlFZGl0XCI6XCJrZXlOb3JtYWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdW50ZUNvbGQ6IENvdW50ZSxcbiAgICAgIGNvdW50ZU5vcm1hbDogQ291bnRlXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBkZWxCdG5XaWR0aDogMTgwLFxuICAgICAgc3RhcnRYOiAwLFxuICAgICAgYW5pbWF0ZTogJycsXG4gICAgICBjdXJyZW50OiAnJyxcbiAgICAgIGluZGV4SWQ6ICcnLFxuICAgICAgY2FydGNvdW50OiBbXSxcbiAgICAgIGlzRWRpdDogZmFsc2UsXG4gICAgICBlZGl0VHh0OiAn57yW6L6RJyxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICAgIHRlbXBDb2xkTGlzdDogW10sXG4gICAgICB0ZW1wTm9ybWFsTGlzdDogW11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvdWNoUyAoZSkge1xuICAgICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHRoaXMuc3RhcnRYID0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluZGV4SWQgPSBlLmN1cnJlbnRUYXJnZXQuaWRcbiAgICAgIH0sXG4gICAgICB0b3VjaE0gKGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB2YXIgbW92ZVggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgICAgIHZhciBkaXNYID0gdGhpcy5zdGFydFggLSBtb3ZlWFxuICAgICAgICAgIGlmIChkaXNYID09PSAwIHx8IGRpc1ggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSAnJ1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gJydcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUgPSAnaW5uZXItYW5pbWF0ZS1sZWZ0J1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRlbEl0ZW0gKGUpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgY29udGVudDogJ+aYr+WQpuWIoOmZpO+8nycsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICAgIHZhciBsaXN0ID0gdGhhdC5saXN0XG4gICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5hbmltYXRlID0gJydcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9ICcnXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHBsdXNDb2xkIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5jb2xkTGlzdFtpbmRleF0uY291bnQgKytcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDlj5HpgIHotK3nianovabkv67mlLnmlbDmja5cbiAgICAgIH0sXG4gICAgICBwbHVzTm9ybWFsIChlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5ub3JtYWxMaXN0W2luZGV4XS5jb3VudCArK1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgbWluQ29sZCAoZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgdGhpcy4kcGFyZW50LmRhdGEuY29sZExpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBtaW5Ob3JtYWwgKGUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gZS5zb3VyY2UuJGluZGV4XG4gICAgICAgIHRoaXMuJHBhcmVudC5kYXRhLm5vcm1hbExpc3RbaW5kZXhdLmNvdW50IC0tXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8g5Y+R6YCB6LSt54mp6L2m5L+u5pS55pWw5o2uXG4gICAgICB9LFxuICAgICAga2V5Q29sZCAodmFsLCBlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGUuc291cmNlLiRpbmRleFxuICAgICAgICB0aGlzLiRwYXJlbnQuZGF0YS5jb2xkTGlzdFtpbmRleF0uY291bnQgPSB2YWxcbiAgICAgIH0sXG4gICAgICBrZXlOb3JtYWwgKHZhbCwgZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBlLnNvdXJjZS4kaW5kZXhcbiAgICAgICAgdGhpcy4kcGFyZW50LmRhdGEubm9ybWFsTGlzdFtpbmRleF0uY291bnQgPSB2YWxcbiAgICAgIH0sXG4gICAgICBnb0RldGFpbCAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9kZXRhaWw/aWQ9JyArIGlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZWRpdFRhcCAoKSB7XG4gICAgICAgIHRoaXMuaXNFZGl0ID0gIXRoaXMuaXNFZGl0XG4gICAgICAgIGlmICh0aGlzLmlzRWRpdCkge1xuICAgICAgICAgIHRoaXMuZWRpdFR4dCA9ICflj5bmtognXG4gICAgICAgICAgdGhpcy5pbml0Q2hlY2tlZCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lZGl0VHh0ID0gJ+e8lui+kSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrYm94Q2hhbmdlIChlKSB7XG4gICAgICAgIHZhciBjaGVja2VkQXJyID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgdGhpcy50ZW1wQ29sZExpc3QgPSB0aGlzLmNvbGRsaXN0XG4gICAgICAgIHRoaXMudGVtcE5vcm1hbExpc3QgPSB0aGlzLm5vcm1hbGxpc3RcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGVja2VkQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy50ZW1wQ29sZExpc3QgPSB0aGlzLnRlbXBDb2xkTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlkICE9PSBjaGVja2VkQXJyW2ldXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnRlbXBOb3JtYWxMaXN0ID0gdGhpcy50ZW1wTm9ybWFsTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmlkICE9PSBjaGVja2VkQXJyW2ldXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLmNvbGRsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBjaGVja2VkQXJyW2ldKSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMubm9ybWFsbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gY2hlY2tlZEFycltpXSkge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoZWNrQWxsICgpIHtcbiAgICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLm5vcm1hbGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50ZW1wQ29sZExpc3QgPSBbXVxuICAgICAgICB0aGlzLnRlbXBOb3JtYWxMaXN0ID0gW11cbiAgICAgIH0sXG4gICAgICBkZWxldGVUYXAgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBjb250ZW50OiAn5piv5ZCm5Yig6Zmk77yfJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdGhhdC5jb2xkbGlzdCA9IHRoYXQudGVtcENvbGRMaXN0XG4gICAgICAgICAgICAgIHRoYXQubm9ybWFsbGlzdCA9IHRoYXQudGVtcE5vcm1hbExpc3RcbiAgICAgICAgICAgICAgdGhhdC5pc0VkaXQgPSBmYWxzZVxuICAgICAgICAgICAgICB0aGF0LmVkaXRUeHQgPSAn57yW6L6RJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgIHRoYXQuaW5pdENoZWNrZWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5pdENoZWNrZWQgKCkge1xuICAgICAgdGhpcy5jb2xkbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICB9KVxuICAgICAgdGhpcy5ub3JtYWxsaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hvdyAoKSB7XG4gICAgfVxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=