webpackJsonp([7],{

/***/ 350:
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./src/pages/old/TeamSetting.vue ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-134f0bf4","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector?type=styles&index=0!./TeamSetting.vue */ 539)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 2)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vux-loader/src/script-loader.js!../../../~/vue-loader/lib/selector?type=script&index=0!./TeamSetting.vue */ 464),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-134f0bf4"}!../../../~/vux-loader/src/before-template-compiler-loader.js!../../../~/vux-loader/src/template-loader.js!../../../~/vue-loader/lib/selector?type=template&index=0!./TeamSetting.vue */ 513),
  /* scopeId */
  "data-v-134f0bf4",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/old/TeamSetting.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TeamSetting.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-134f0bf4", Component.options)
  } else {
    hotAPI.reload("data-v-134f0bf4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 464:
/* exports provided: default */
/* all exports used */
/*!***************************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/old/TeamSetting.vue ***!
  \***************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"../utils\"");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      inputModel: '',
      placeHolder: ''
    };
  },
  computed: {
    config() {
      var config = this.$store.state.teamSettingConfig;
      this.inputModel = config.defaultValue ? config.defaultValue : '';
      this.placeHolder = config.placeHolder ? config.placeHolder : config.enable ? '请输入' : '无';
      return config;
    },
    selects() {
      var map = __WEBPACK_IMPORTED_MODULE_0__utils___default.a.teamConfigMap[this.config.updateKey];
      var list = [];
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          list.push({ 'key': key, 'value': map[key] });
        }
      }
      return list;
    }
  },
  mounted() {
    // 立即focus会引起切页时白屏，故增加timeout
    setTimeout(() => {
      this.$refs.input && this.$refs.input.focus();
    }, 500);
  },
  methods: {
    update(value) {
      if (value === undefined && this.inputModel.length < 1) {
        this.$toast('请输入内容后提交');
        return;
      }
      var callback = this.config.confirmCallback;
      if (callback && typeof callback === 'function') {
        callback(this.config.teamId, this.config.updateKey, value ? value : this.inputModel);
        return;
      }
      this.$store.dispatch('showLoading');
      var action = this.config.updateInfoInTeam ? 'updateInfoInTeam' : 'updateTeam';
      this.$store.dispatch('delegateTeamFunction', {
        functionName: action,
        options: {
          teamId: this.config.teamId,
          [this.config.updateKey]: value ? value : this.inputModel,
          done: (error, team) => {
            this.$store.dispatch('hideLoading');
            if (error) {
              this.$toast(error);
            } else {
              this.$toast('更改成功');
              setTimeout(() => {
                history.go(-1);
              }, 200);
            }
          }
        }
      });
    }
  }
});

/***/ }),

/***/ 488:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-134f0bf4","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/old/TeamSetting.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 5)(true);
// imports


// module
exports.push([module.i, "\n.p-setting[data-v-134f0bf4]{\n  background-color: #e6ebf0;\n  padding-top: 4.6rem;\n}\n.weui-cell[data-v-134f0bf4]{\n  background-color: white;\n}\n.select img[data-v-134f0bf4]{\n  position: absolute;\n  right: 0;\n}\n.icon-selected[data-v-134f0bf4]{\n  display: inline-block;\n  width: 1.4rem;\n  height: 1.4rem;\n  background-size: 20rem;\n  background-image: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);\n  background-position: -3.7rem -2.95rem;\n}\n", "", {"version":3,"sources":["/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/old/TeamSetting.vue"],"names":[],"mappings":";AAyFA;EACE,0BAA0B;EAC1B,oBAAoB;CACrB;AACD;EACE,wBAAwB;CACzB;AAEC;EACE,mBAAmB;EACnB,SAAS;CACV;AAEH;EACE,sBAAsB;EACtB,cAAc;EACd,eAAe;EACf,uBAAuB;EACvB,4EAA4E;EAC5E,sCAAsC;CACvC","file":"TeamSetting.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.p-setting{\n  background-color: #e6ebf0;\n  padding-top: 4.6rem;\n}\n.weui-cell{\n  background-color: white;\n}\n.select {\n  img{\n    position: absolute;\n    right: 0;\n  }\n}\n.icon-selected{\n  display: inline-block;\n  width: 1.4rem;\n  height: 1.4rem;\n  background-size: 20rem;\n  background-image: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);\n  background-position: -3.7rem -2.95rem;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 513:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-134f0bf4"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/old/TeamSetting.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "g-inherit m-article p-setting"
  }, [_c('x-header', {
    staticClass: "m-tab",
    attrs: {
      "left-options": {
        backText: ' '
      }
    }
  }, [_c('h1', {
    staticClass: "m-tab-top"
  }, [_vm._v(_vm._s(_vm.config.title))]), _vm._v(" "), _c('a', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  }), _vm._v(" "), (_vm.config.inputType !== "select" && _vm.config.enable) ? _c('a', {
    attrs: {
      "slot": "right"
    },
    on: {
      "click": function () { return _vm.update(); }
    },
    slot: "right"
  }, [_vm._v("确定")]) : _vm._e()]), _vm._v(" "), _c('group', [(_vm.config.inputType === "text") ? _c('x-input', {
    ref: "input",
    attrs: {
      "placeholder": _vm.placeHolder,
      "disabled": !_vm.config.enable,
      "max": 10
    },
    model: {
      value: (_vm.inputModel),
      callback: function($$v) {
        _vm.inputModel = $$v
      },
      expression: "inputModel"
    }
  }) : (_vm.config.inputType === "textarea") ? _c('x-textarea', {
    ref: "input",
    attrs: {
      "placeholder": _vm.placeHolder,
      "readonly": !_vm.config.enable,
      "max": 30
    },
    model: {
      value: (_vm.inputModel),
      callback: function($$v) {
        _vm.inputModel = $$v
      },
      expression: "inputModel"
    }
  }) : (_vm.config.inputType === "select") ? _vm._l((_vm.selects), function(item, index) {
    return _c('cell', {
      key: index,
      attrs: {
        "value-align": "left"
      },
      nativeOn: {
        "click": function($event) {
          return (function () { return _vm.update(item.key); })($event)
        }
      }
    }, [_vm._v("\n      " + _vm._s(item.value) + "\n      "), (_vm.inputModel === item.key) ? _c('span', {
      staticClass: "icon-selected",
      attrs: {
        "slot": "child",
        "width": "25",
        "height": "25"
      },
      slot: "child"
    }) : _vm._e()])
  }) : _vm._e()], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-134f0bf4", module.exports)
  }
}

/***/ }),

/***/ 539:
/* no static exports found */
/* all exports used */
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-134f0bf4","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/old/TeamSetting.vue ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../~/css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler?{"id":"data-v-134f0bf4","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector.js?type=styles&index=0!./TeamSetting.vue */ 488);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../~/vue-style-loader/lib/addStylesClient.js */ 6)("4439be3e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-134f0bf4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamSetting.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-134f0bf4\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamSetting.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=7.js.map