webpackJsonp([11],{

/***/ 327:
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./src/pages/sayabc/Session.vue ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-loader/~/vue-style-loader!css-loader?sourceMap!../../../~/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index?{"id":"data-v-a1d9671a","scoped":false,"hasInlineConfig":true}!../../../~/_vux-loader@1.2.9@vux-loader/src/style-loader.js!../../../~/_vue-loader@11.3.4@vue-loader/lib/selector?type=styles&index=0!./Session.vue */ 448)

var Component = __webpack_require__(/*! ../../../~/_vue-loader@11.3.4@vue-loader/lib/component-normalizer */ 2)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/_vux-loader@1.2.9@vux-loader/src/script-loader.js!../../../~/_vue-loader@11.3.4@vue-loader/lib/selector?type=script&index=0!./Session.vue */ 413),
  /* template */
  __webpack_require__(/*! !../../../~/_vue-loader@11.3.4@vue-loader/lib/template-compiler/index?{"id":"data-v-a1d9671a"}!../../../~/_vux-loader@1.2.9@vux-loader/src/before-template-compiler-loader.js!../../../~/_vux-loader@1.2.9@vux-loader/src/template-loader.js!../../../~/_vue-loader@11.3.4@vue-loader/lib/selector?type=template&index=0!./Session.vue */ 437),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/lijianjian/Desktop/workspace/vue-im-web-demo/src/pages/sayabc/Session.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Session.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a1d9671a", Component.options)
  } else {
    hotAPI.reload("data-v-a1d9671a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 413:
/* exports provided: default */
/* all exports used */
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./~/_babel-loader@6.4.1@babel-loader/lib!./~/_vux-loader@1.2.9@vux-loader/src/script-loader.js!./~/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=script&index=0!./src/pages/sayabc/Session.vue ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(/*! @/utils */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs__ = __webpack_require__(/*! @/configs */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__configs__);
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
      delSessionId: null,
      stopBubble: false,
      noticeIcon: __WEBPACK_IMPORTED_MODULE_1__configs___default.a.noticeIcon,
      myPhoneIcon: __WEBPACK_IMPORTED_MODULE_1__configs___default.a.myPhoneIcon,
      myGroupIcon: __WEBPACK_IMPORTED_MODULE_1__configs___default.a.defaultGroupIcon,
      myAdvancedIcon: __WEBPACK_IMPORTED_MODULE_1__configs___default.a.defaultAdvancedIcon
    };
  },
  computed: {
    sysMsgUnread() {
      let temp = this.$store.state.sysMsgUnread;
      let sysMsgUnread = temp.addFriend || 0;
      sysMsgUnread += temp.team || 0;
      let customSysMsgUnread = this.$store.state.customSysMsgUnread;
      return sysMsgUnread + customSysMsgUnread;
    },
    userInfos() {
      return this.$store.state.userInfos;
    },
    myInfo() {
      return this.$store.state.myInfo;
    },
    myPhoneId() {
      return `${this.$store.state.userUID}`;
    },
    sessionlist() {
      let sessionlist = this.$store.state.sessionlist.filter(item => {
        item.name = '';
        item.avatar = '';
        if (item.scene === 'p2p') {
          let userInfo = null;
          if (item.to !== this.myPhoneId) {
            userInfo = this.userInfos[item.to];
          } else {
            // userInfo = this.myInfo
            // userInfo.alias = '我的手机'
            // userInfo.avatar = `${config.myPhoneIcon}`
            return false;
          }
          if (userInfo) {
            item.name = __WEBPACK_IMPORTED_MODULE_0__utils___default.a.getFriendAlias(userInfo);
            item.avatar = userInfo.avatar;
          }
        } else if (item.scene === 'team') {
          let teamInfo = null;
          teamInfo = this.$store.state.teamlist.find(team => {
            return team.teamId === item.to;
          });
          if (teamInfo) {
            item.name = teamInfo.name;
            item.avatar = teamInfo.avatar || (teamInfo.type === 'normal' ? this.myGroupIcon : this.myAdvancedIcon);
          } else {
            item.name = `群${item.to}`;
            item.avatar = item.avatar || this.myGroupIcon;
          }
        }
        let lastMsg = item.lastMsg || {};
        if (lastMsg.type === 'text') {
          item.lastMsgShow = lastMsg.text || '';
        } else if (lastMsg.type === 'custom') {
          item.lastMsgShow = __WEBPACK_IMPORTED_MODULE_0__utils___default.a.parseCustomMsg(lastMsg);
        } else if (lastMsg.scene === 'team' && lastMsg.type === 'notification') {
          item.lastMsgShow = __WEBPACK_IMPORTED_MODULE_0__utils___default.a.generateTeamSysmMsg(lastMsg);
        } else if (__WEBPACK_IMPORTED_MODULE_0__utils___default.a.mapMsgType(lastMsg)) {
          item.lastMsgShow = `[${__WEBPACK_IMPORTED_MODULE_0__utils___default.a.mapMsgType(lastMsg)}]`;
        } else {
          item.lastMsgShow = '';
        }
        if (item.updateTime) {
          item.updateTimeShow = __WEBPACK_IMPORTED_MODULE_0__utils___default.a.formatDate(item.updateTime, true);
        }
        return item;
      });
      return sessionlist;
    }
  },
  methods: {
    enterSysMsgs() {
      if (this.hideDelBtn()) return;
      location.href = '#/sayabc/sysmsgs';
    },
    enterChat(session) {
      if (this.hideDelBtn()) return;
      if (session && session.id)
        // location.href = `#/chat/${session.id}`
        // 通知state 更新sessionId 显示出chatbox
        this.$store.dispatch('setCurrSession', session.id);
      this.$store.commit('isCheckMember', false);
    },
    enterMyChat() {
      // 我的手机页面
      location.href = `#/sayabc/chat/p2p-${this.myPhoneId}`;
    },
    deleteSession() {
      if (this.delSessionId !== null) {
        this.$store.dispatch('deleteSession', this.delSessionId);
      }
    },
    showDelBtn(vNode) {
      if (vNode && vNode.data && vNode.data.attrs) {
        this.delSessionId = vNode.data.attrs.sessionId;
        this.stopBubble = true;
        setTimeout(() => {
          this.stopBubble = false;
        }, 20);
      }
    },
    hideDelBtn() {
      if (this.delSessionId !== null && !this.stopBubble) {
        // 用于判断是否前置状态是显示删除按钮
        this.delSessionId = null;
        return true;
      }
      return false;
    }
  }
});

/***/ }),

/***/ 428:
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/_css-loader@0.27.3@css-loader?sourceMap!./~/_vue-loader@11.3.4@vue-loader/lib/style-compiler?{"id":"data-v-a1d9671a","scoped":false,"hasInlineConfig":true}!./~/_vux-loader@1.2.9@vux-loader/src/style-loader.js!./~/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./src/pages/sayabc/Session.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/_css-loader@0.27.3@css-loader/lib/css-base.js */ 5)(true);
// imports


// module
exports.push([module.i, "\n.p-session .vux-cell-primary {\n    max-width: 70%;\n}\n\n", "", {"version":3,"sources":["/Users/lijianjian/Desktop/workspace/vue-im-web-demo/src/pages/sayabc/Session.vue"],"names":[],"mappings":";AAqKE;IACE,eAAe;CAChB","file":"Session.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.p-session {\n  .vux-cell-primary {\n    max-width: 70%;\n  }\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 437:
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/_vue-loader@11.3.4@vue-loader/lib/template-compiler?{"id":"data-v-a1d9671a"}!./~/_vux-loader@1.2.9@vux-loader/src/before-template-compiler-loader.js!./~/_vux-loader@1.2.9@vux-loader/src/template-loader.js!./~/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=template&index=0!./src/pages/sayabc/Session.vue ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('group', {
    staticClass: "u-list"
  }, [_c('cell', {
    staticClass: "u-list-item",
    attrs: {
      "title": "消息中心"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.enterSysMsgs($event)
      }
    }
  }, [_c('img', {
    staticClass: "icon",
    attrs: {
      "slot": "icon",
      "width": "24",
      "src": _vm.noticeIcon
    },
    slot: "icon"
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.sysMsgUnread > 0),
      expression: "sysMsgUnread > 0"
    }],
    staticClass: "u-unread"
  }, [_vm._v(_vm._s(_vm.sysMsgUnread))])]), _vm._v(" "), _vm._l((_vm.sessionlist), function(session) {
    return _c('cell', {
      directives: [{
        name: "touch",
        rawName: "v-touch:swipeleft",
        value: (_vm.showDelBtn),
        expression: "showDelBtn",
        arg: "swipeleft"
      }, {
        name: "touch",
        rawName: "v-touch:swiperight",
        value: (_vm.hideDelBtn),
        expression: "hideDelBtn",
        arg: "swiperight"
      }],
      key: session.id,
      staticClass: "u-list-item",
      attrs: {
        "title": session.name,
        "inline-desc": session.lastMsgShow,
        "sessionId": session.id
      },
      nativeOn: {
        "click": function($event) {
          _vm.enterChat(session)
        }
      }
    }, [_c('img', {
      staticClass: "icon u-circle",
      attrs: {
        "slot": "icon",
        "width": "24",
        "src": session.avatar
      },
      slot: "icon"
    }), _vm._v(" "), _c('span', {
      staticClass: "u-session-time"
    }, [_vm._v("\n        " + _vm._s(session.updateTimeShow) + "\n      ")]), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (session.unread > 0),
        expression: "session.unread > 0"
      }],
      staticClass: "u-unread"
    }, [_vm._v(_vm._s(session.unread))]), _vm._v(" "), _c('span', {
      staticClass: "u-tag-del",
      class: {
        active: _vm.delSessionId === session.id
      },
      on: {
        "click": _vm.deleteSession
      }
    })])
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a1d9671a", module.exports)
  }
}

/***/ }),

/***/ 448:
/* no static exports found */
/* all exports used */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/_vue-style-loader@2.0.5@vue-style-loader!./~/_css-loader@0.27.3@css-loader?sourceMap!./~/_vue-loader@11.3.4@vue-loader/lib/style-compiler?{"id":"data-v-a1d9671a","scoped":false,"hasInlineConfig":true}!./~/_vux-loader@1.2.9@vux-loader/src/style-loader.js!./~/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./src/pages/sayabc/Session.vue ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../~/_css-loader@0.27.3@css-loader?sourceMap!../../../~/_vue-loader@11.3.4@vue-loader/lib/style-compiler?{"id":"data-v-a1d9671a","scoped":false,"hasInlineConfig":true}!../../../~/_vux-loader@1.2.9@vux-loader/src/style-loader.js!../../../~/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./Session.vue */ 428);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../~/_vue-style-loader@2.0.5@vue-style-loader/lib/addStylesClient.js */ 6)("bf46ef8e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.27.3@css-loader/index.js?sourceMap!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a1d9671a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/_vux-loader@1.2.9@vux-loader/src/style-loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./Session.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.27.3@css-loader/index.js?sourceMap!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-a1d9671a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/_vux-loader@1.2.9@vux-loader/src/style-loader.js!../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./Session.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=11.js.map