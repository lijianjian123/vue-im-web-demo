webpackJsonp([8],{

/***/ 340:
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./src/pages/TeamManage.vue ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-23aaa392","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector?type=styles&index=0!./TeamManage.vue */ 525)

var Component = __webpack_require__(/*! ../../~/vue-loader/lib/component-normalizer */ 2)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../~/vux-loader/src/script-loader.js!../../~/vue-loader/lib/selector?type=script&index=0!./TeamManage.vue */ 465),
  /* template */
  __webpack_require__(/*! !../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-23aaa392"}!../../~/vux-loader/src/before-template-compiler-loader.js!../../~/vux-loader/src/template-loader.js!../../~/vue-loader/lib/selector?type=template&index=0!./TeamManage.vue */ 501),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/TeamManage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TeamManage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23aaa392", Component.options)
  } else {
    hotAPI.reload("data-v-23aaa392", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 371:
/* exports provided: default */
/* all exports used */
/*!*********************************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/components/TeamMember.vue ***!
  \*********************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
  props: {
    teamId: {
      type: String
    },
    // 是否为高级群
    advanced: {
      type: Boolean,
      default: false
    },
    // 显示全部群成员模式
    showAllMode: {
      type: Boolean,
      default: false
    },
    filterAccount: {
      type: Array
      // [account1, account2]。 若设置了，则只显示该数组中的群成员, 应用场景：群消息回执中, 对已读未读进行了分组。
    }
  },
  data() {
    return {
      removeMode: false,
      hasManagePermission: false,
      hasSearched: false
    };
  },
  mounted() {
    // 防止在此页面直接刷新，此时需要获取群成员
    var teamMembers = this.$store.state.teamMembers[this.teamId];
    if (teamMembers === undefined) {
      this.$store.dispatch('getTeamMembers', this.teamId);
    }
  },
  computed: {
    teamInfo() {
      var teamList = this.$store.state.teamlist;
      var team = teamList && teamList.find(team => {
        return team.teamId === this.teamId;
      });
      if (!team) {
        return undefined;
      }
      return team;
    },
    members() {
      var members = this.$store.state.teamMembers[this.teamId];
      var userInfos = this.$store.state.userInfos;
      var needSearchAccounts = [];
      if (members) {
        members = members.map(item => {
          var member = Object.assign({}, item); //重新创建一个对象，用于存储展示数据，避免对vuex数据源的修改
          member.valid = true; //被管理员移除后，标记为false
          if (member.account === this.$store.state.userUID) {
            member.alias = '我';
            member.avatar = this.$store.state.myInfo.avatar;
            this.isOwner = member.type === 'owner';
            this.hasManagePermission = member.type !== 'normal';
          } else if (userInfos[member.account] === undefined) {
            needSearchAccounts.push(member.account);
            member.avatar = member.avatar || this.avatar;
            member.alias = member.nickInTeam || member.account;
          } else {
            member.avatar = userInfos[member.account].avatar;
            member.alias = member.nickInTeam || userInfos[member.account].nick;
          }
          return member;
        });
        if (needSearchAccounts.length > 0 && !this.hasSearched) {
          this.hasSearched = true;
          while (needSearchAccounts.length > 0) {
            this.searchUsers(needSearchAccounts.splice(0, 150));
          }
        }
        return members;
      }
      return [];
    },
    membersInDisplay() {
      if (this.filterAccount) {
        return this.members.filter(member => {
          return !!this.filterAccount.find(account => account === member.account);
        });
      } else if (this.advanced || this.showAllMode) {
        return this.members;
      } else {
        return this.members.slice(0, this.hasInvitePermission ? 3 : 4);
      }
    },
    hasInvitePermission() {
      return this.advanced && (this.hasManagePermission || this.teamInfo && this.teamInfo.inviteMode === "all");
    }
  },
  methods: {
    searchUsers(Accounts) {
      this.$store.dispatch('searchUsers', {
        accounts: Accounts,
        done: users => {
          this.updateTeamMember(users);
        }
      });
    },
    updateTeamMember(users) {
      users.forEach(user => {
        var member = this.members.find(member => {
          return member.account === user.account;
        });
        if (member) {
          member.avatar = user.avatar;
          member.alias = member.nickInTeam || user.nick;
        }
      });
    },
    triggerRemove(e, show) {
      this.removeMode = !this.removeMode;
    },
    remove(e, member) {
      this.$store.dispatch('showLoading');
      this.$store.dispatch('delegateTeamFunction', {
        functionName: 'removeTeamMembers',
        options: {
          teamId: this.teamId,
          accounts: [member.account],
          done: (error, obj) => {
            this.$toast('移除成功');
            this.$store.dispatch('hideLoading');
          }
        }
      });
      e.cancelBubble = true;
      e.preventDefault();
    },
    onMemberClick(member) {
      location.href = this.advanced ? `#/teammembercard/${member.id}` : `#/namecard/${member.account}`;
    }
  }
});

/***/ }),

/***/ 373:
/* no static exports found */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-07c4ffaa","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/components/TeamMember.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../~/css-loader/lib/css-base.js */ 5)(true);
// imports


// module
exports.push([module.i, "\n.m-members[data-v-07c4ffaa] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  margin: 0 auto;\n  text-align: center;\n  width: 100%;\n}\n.m-members img.avatar[data-v-07c4ffaa]{\n  width: 3.8rem;\n  height: 3.8rem;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n     -moz-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n}\n.m-members .u-member[data-v-07c4ffaa] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: 25%;\n  margin: .5rem 0;\n}\n.m-members .u-member .remove[data-v-07c4ffaa], .m-members .u-member .manager[data-v-07c4ffaa], .m-members .u-member .owner[data-v-07c4ffaa]{\n  display: inline-block;\n  position: absolute;\n  bottom: 1.1rem;\n  right: 0;\n  width: 2rem;\n  height: 2rem;\n  background: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);\n  background-position: -10.3rem 0;\n  background-size: 20rem\n}\n.m-members .u-member .owner[data-v-07c4ffaa] {\n  background-position: -10.3rem -2.7rem;\n}\n.m-members .u-member .remove[data-v-07c4ffaa] {\n  top: 0;\n  bottom: auto;\n  right: 0;\n  width: 2.4rem;\n  height: 2.4rem;\n  background-position: -10.1rem -5.1rem;\n}\n.m-members .u-member span[data-v-07c4ffaa] {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.m-members.s-bg-white[data-v-07c4ffaa] {\n  background-color: white;\n}\n\n", "", {"version":3,"sources":["/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/components/TeamMember.vue"],"names":[],"mappings":";AAwKA;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,wBAAgB;MAAhB,oBAAgB;UAAhB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,YAAY;CAmDb;AAjDC;EACE,cAAc;EACd,eAAe;EACf,oBAAe;EAAf,uBAAe;KAAf,iBAAe;MAAf,mBAAe;UAAf,eAAe;CAChB;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,mBAAmB;EACnB,6BAAuB;EAAvB,8BAAuB;EAAvB,+BAAuB;KAAvB,0BAAuB;KAAvB,2BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,0BAAoB;EAApB,4BAAoB;KAApB,uBAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,WAAW;EACX,gBAAgB;CAgCjB;AA9BC;EACE,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,YAAY;EACZ,aAAa;EACb,sEAAsE;EACtE,gCAAgC;EAChC,sBAAsB;CACvB;AACD;EACE,sCAAsC;CACvC;AAED;EACE,OAAO;EACP,aAAa;EACb,SAAS;EACT,cAAc;EACd,eAAe;EACf,sCAAsC;CACvC;AAED;EACE,gBAAgB;EAChB,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB;CACrB;AAGH;EACE,wBAAwB;CACzB","file":"TeamMember.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.m-members {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 auto;\n  text-align: center;\n  width: 100%;\n\n  img.avatar{\n    width: 3.8rem;\n    height: 3.8rem;\n    flex: 0 1 auto;\n  }\n\n  .u-member {\n    display: flex;\n    position: relative;\n    flex-direction: column;\n    align-items: center;\n    width: 25%;\n    margin: .5rem 0;\n\n    .remove, .manager, .owner{\n      display: inline-block;\n      position: absolute;\n      bottom: 1.1rem;\n      right: 0;\n      width: 2rem;\n      height: 2rem;\n      background: url(http://yx-web.nos.netease.com/webdoc/h5/im/icons.png);\n      background-position: -10.3rem 0;\n      background-size: 20rem\n    }\n    .owner {\n      background-position: -10.3rem -2.7rem;\n    }\n\n    .remove {\n      top: 0;\n      bottom: auto;\n      right: 0;\n      width: 2.4rem;\n      height: 2.4rem;\n      background-position: -10.1rem -5.1rem;\n    }\n\n    span {\n      max-width: 100%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  }\n\n  &.s-bg-white{\n    background-color: white;\n  }\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 376:
/* no static exports found */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-07c4ffaa"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/components/TeamMember.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "m-members",
    class: {
      "s-bg-white": _vm.advanced && !_vm.showAllMode
    }
  }, [(_vm.hasInvitePermission && !_vm.showAllMode) ? _c('a', {
    staticClass: "u-member",
    attrs: {
      "href": "#/teaminvite/" + _vm.teamId
    }
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": "http://yx-web.nos.netease.com/webdoc/h5/im/team_member_add.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v("添加")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.membersInDisplay), function(member) {
    return _c('a', {
      key: member.account,
      staticClass: "u-member",
      on: {
        "click": function($event) {
          _vm.onMemberClick(member)
        }
      }
    }, [_c('img', {
      staticClass: "avatar u-circle",
      attrs: {
        "src": member.avatar
      }
    }), _vm._v(" "), (_vm.removeMode && member.type != "owner" && member.account != _vm.$store.state.userUID) ? _c('span', {
      staticClass: "remove",
      on: {
        "click": function($event) {
          _vm.remove($event, member)
        }
      }
    }) : _vm._e(), _vm._v(" "), (member.type !== "normal") ? _c('span', {
      class: member.type === "manager" ? "manager" : "owner"
    }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(member.alias))])])
  }), _vm._v(" "), (!_vm.advanced) ? [_c('a', {
    staticClass: "u-member",
    attrs: {
      "href": "#/teaminvite/" + _vm.teamId
    }
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": "http://yx-web.nos.netease.com/webdoc/h5/im/team_member_add.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v("添加")])]), _vm._v(" "), (_vm.hasManagePermission) ? _c('div', {
    staticClass: "u-member",
    on: {
      "click": function($event) {
        _vm.triggerRemove()
      }
    }
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": "http://yx-web.nos.netease.com/webdoc/h5/im/team_member_delete.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('span', [_vm._v("移除")])]) : _vm._e()] : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-07c4ffaa", module.exports)
  }
}

/***/ }),

/***/ 379:
/* no static exports found */
/* all exports used */
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-07c4ffaa","scoped":true,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/components/TeamMember.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../~/css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler?{"id":"data-v-07c4ffaa","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector.js?type=styles&index=0!./TeamMember.vue */ 373);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../~/vue-style-loader/lib/addStylesClient.js */ 6)("c03ff526", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-07c4ffaa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamMember.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-07c4ffaa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../node_modules/vux-loader/src/style-loader.js!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamMember.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 383:
/* no static exports found */
/* exports used: default */
/*!*********************************************!*\
  !*** ./src/pages/components/TeamMember.vue ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../../~/vue-loader/lib/style-compiler/index?{"id":"data-v-07c4ffaa","scoped":true,"hasInlineConfig":true}!../../../~/vux-loader/src/style-loader.js!../../../~/vue-loader/lib/selector?type=styles&index=0!./TeamMember.vue */ 379)

var Component = __webpack_require__(/*! ../../../~/vue-loader/lib/component-normalizer */ 2)(
  /* script */
  __webpack_require__(/*! !babel-loader!../../../~/vux-loader/src/script-loader.js!../../../~/vue-loader/lib/selector?type=script&index=0!./TeamMember.vue */ 371),
  /* template */
  __webpack_require__(/*! !../../../~/vue-loader/lib/template-compiler/index?{"id":"data-v-07c4ffaa"}!../../../~/vux-loader/src/before-template-compiler-loader.js!../../../~/vux-loader/src/template-loader.js!../../../~/vue-loader/lib/selector?type=template&index=0!./TeamMember.vue */ 376),
  /* scopeId */
  "data-v-07c4ffaa",
  /* cssModules */
  null
)
Component.options.__file = "/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/components/TeamMember.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TeamMember.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07c4ffaa", Component.options)
  } else {
    hotAPI.reload("data-v-07c4ffaa", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 465:
/* exports provided: default */
/* all exports used */
/*!**********************************************************************************************************************************************!*\
  !*** ./~/babel-loader/lib!./~/vux-loader/src/script-loader.js!./~/vue-loader/lib/selector.js?type=script&index=0!./src/pages/TeamManage.vue ***!
  \**********************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__(/*! ../configs */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__configs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(/*! ../utils */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TeamMember_vue__ = __webpack_require__(/*! ./components/TeamMember.vue */ 383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_TeamMember_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_TeamMember_vue__);
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
      avatar: __WEBPACK_IMPORTED_MODULE_0__configs___default.a.defaultUserIcon,
      isOwner: false,
      hasSearched: false
    };
  },
  computed: {
    teamId() {
      return this.$route.params.teamId;
    },
    teamInfo() {
      var teamList = this.$store.state.teamlist;
      var team = teamList && teamList.find(team => {
        return team.teamId === this.teamId;
      });
      if (!team) {
        return undefined;
      }
      return team;
    },
    teamMembers() {
      return this.$store.state.teamMembers[this.teamId];
    },
    teamMemberNum() {
      return this.teamMembers && this.teamMembers.length;
    },
    teamAvatar() {
      return this.teamInfo.avatar || this.avatar;
    },
    teamName() {
      return this.teamInfo && this.teamInfo.name || '未设置';
    },
    nickName() {
      if (!this.teamMembers) return '未设置';
      var selfInfo = this.teamMembers.find(item => {
        return item.account === this.$store.state.userUID;
      });
      return selfInfo && selfInfo.nickInTeam || '未设置';
    },
    hasManagePermission() {
      if (!this.teamMembers) return false;
      var self = this.teamMembers.find(member => member.account === this.$store.state.userUID);
      this.isOwner = self.type === 'owner';
      return self.type !== 'normal';
    },
    hasEditPermission() {
      return this.teamInfo.type === 'normal' || this.teamInfo.updateTeamMode === 'all' || this.hasManagePermission;
    }
  },
  methods: {
    onTeamAvatarClick() {
      if (this.hasEditPermission) {
        this.$refs.input.click();
      }
    },
    onFileSelected(event) {
      this.$store.dispatch('showLoading');
      var fileInput = event.target;
      if (fileInput.files.length === 0) {
        return;
      }
      this.$store.dispatch('delegateTeamFunction', {
        functionName: 'previewFile',
        options: {
          fileInput,
          done: (err, data) => {
            this.$store.dispatch('hideLoading');
            if (err) {
              this.$toast(err);
            } else {
              if (data.w < 300 || data.h < 300) {
                this.$toast("图片长宽不能小于300");
                return;
              }
              this.updateTeamAvatar(data.url);
            }
          }
        }
      });
    },
    updateTeamAvatar(url) {
      this.$store.dispatch('delegateTeamFunction', {
        functionName: 'updateTeam',
        options: {
          teamId: this.teamId,
          avatar: url,
          done: (err, data) => {
            this.$toast(err ? err : '修改群头像成功');
          }
        }
      });
    },
    dismissTeam() {
      var that = this;
      this.$vux.confirm.show({
        title: '确定要解散群？',
        onConfirm() {
          that.$store.dispatch('showLoading');
          that.$store.dispatch('delegateTeamFunction', {
            functionName: 'dismissTeam',
            options: {
              teamId: that.teamId,
              done: (error, obj) => {
                that.$store.dispatch('hideLoading');
                that.$toast(error ? error : '已解散群');
                window.history.go(-1);
              }
            }
          });
        }
      });
    },
    leaveTeam() {
      var that = this;
      this.$vux.confirm.show({
        title: '确定要退出群？',
        onConfirm() {
          that.$store.dispatch('showLoading');
          that.$store.dispatch('delegateTeamFunction', {
            functionName: 'leaveTeam',
            options: {
              teamId: that.teamId,
              done: (error, obj) => {
                that.$store.dispatch('hideLoading');
                that.$toast(error ? error : '已退出群');
                window.history.go(-2);
              }
            }
          });
        }
      });
    },
    onEditItemClick(title, inputType, updateKey, updateInfoInTeam) {
      this.$store.dispatch('enterSettingPage', {
        title: title,
        inputType: inputType,
        updateKey: updateKey,
        teamId: this.teamId,
        defaultValue: this.teamInfo[updateKey],
        updateInfoInTeam: updateInfoInTeam,
        enable: updateInfoInTeam ? true : this.hasEditPermission
      });
    },
    getTeamInfo(key) {
      return __WEBPACK_IMPORTED_MODULE_1__utils___default.a.teamConfigMap[key][this.teamInfo[key]];
    },
    formateDate: function (timeMill) {
      var date = new Date(timeMill);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  },
  components: {
    TeamMember: __WEBPACK_IMPORTED_MODULE_2__components_TeamMember_vue___default.a
  }
});

/***/ }),

/***/ 478:
/* no static exports found */
/* all exports used */
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-23aaa392","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/TeamManage.vue ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ 5)(true);
// imports


// module
exports.push([module.i, "\n.g-window .m-article.p-teammanager {\n  display:-webkit-box;\n  display:-webkit-flex;\n  display:-moz-box;\n  display:-ms-flexbox;\n  display:flex;\n  background-color: #e6ebf0;\n}\n.g-window .m-article.p-teammanager .m-body {\n  overflow-y: scroll;\n  width: 100%;\n}\n.g-window .m-article.p-teammanager img.avatar{\n  width: 3.8rem;\n  height: 3.8rem;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n     -moz-box-flex: 0;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n}\n.g-window .m-article.p-teammanager .m-group {\n  background-color: white;\n}\n.g-window .m-article.p-teammanager .m-group .weui-cells:after {\n  border-bottom-style: none;\n}\n.g-window .m-article.p-teammanager .m-group .weui-cell:before {\n  border: none;\n}\n.g-window .m-article.p-teammanager .m-group .weui-cell:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 100%;\n     -moz-transform-origin: 0 100%;\n          transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n     -moz-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n  left: 15px;\n  right: 15px;\n}\n.g-window .m-article.p-teammanager .m-group .weui-btn {\n  margin: 1rem 5%;\n}\n.g-window .m-article.p-teammanager .m-group .weui-cell__ft{\n  max-width: 70%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color:#aaa;\n}\n.g-window .m-article.p-teammanager .m-group + .m-group {\n  margin-top:1rem;\n}\n.g-window .m-article.p-teammanager .m-teaminfo {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n     -moz-box-orient: horizontal;\n     -moz-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.g-window .m-article.p-teammanager .m-teaminfo .u-info{\n  margin-left: 1rem;\n}\n.g-window .m-article.p-teammanager .m-teaminfo .u-info span{\n  color: #999;\n  font-size: 0.9rem;\n}\n", "", {"version":3,"sources":["/Users/wangxudong/me/sayabc/vue-im-web-demo/src/pages/TeamManage.vue"],"names":[],"mappings":";AAyNA;EACE,oBAAa;EAAb,qBAAa;EAAb,iBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,0BAA0B;CA6D3B;AA3DC;EACE,mBAAmB;EACnB,YAAY;CACb;AAED;EACE,cAAc;EACd,eAAe;EACf,oBAAe;EAAf,uBAAe;KAAf,iBAAe;MAAf,mBAAe;UAAf,eAAe;CAChB;AAED;EACE,wBAAwB;CAkCzB;AA9BC;EACE,0BAA0B;CAC3B;AACD;EACE,aAAa;CACd;AACD;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,UAAU;EACV,SAAS;EACT,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,iCAAyB;KAAzB,8BAAyB;UAAzB,yBAAyB;EACzB,+BAAuB;KAAvB,4BAAuB;UAAvB,uBAAuB;EACvB,WAAW;EACX,YAAY;CACb;AACD;EACE,gBAAgB;CACjB;AACD;EACE,eAAe;EACf,iBAAiB;EACjB,wBAAwB;EACxB,oBAAoB;EACpB,WAAW;CACZ;AAhCD;EACE,gBAAiB;CAClB;AAgCH;EACE,qBAAc;EAAd,sBAAc;EAAd,kBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,+BAAoB;EAApB,8BAAoB;EAApB,4BAAoB;KAApB,4BAAoB;KAApB,2BAAoB;MAApB,wBAAoB;UAApB,oBAAoB;EACpB,0BAAoB;EAApB,4BAAoB;KAApB,uBAAoB;MAApB,uBAAoB;UAApB,oBAAoB;CAQrB;AAPC;EACE,kBAAkB;CAKnB;AAJC;EACE,YAAY;EACZ,kBAAkB;CACnB","file":"TeamManage.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.g-window .m-article.p-teammanager {\n  display:flex;\n  background-color: #e6ebf0;\n  \n  .m-body {\n    overflow-y: scroll;\n    width: 100%;\n  }\n\n  img.avatar{\n    width: 3.8rem;\n    height: 3.8rem;\n    flex: 0 1 auto;\n  }\n\n  .m-group {\n    background-color: white;\n    & + .m-group {\n      margin-top: 1rem;\n    }\n    .weui-cells:after {\n      border-bottom-style: none;\n    }\n    .weui-cell:before {\n      border: none;\n    }\n    .weui-cell:after {\n      content: \" \";\n      position: absolute;\n      left: 0;\n      bottom: 0;\n      right: 0;\n      height: 1px;\n      border-bottom: 1px solid #D9D9D9;\n      color: #D9D9D9;\n      transform-origin: 0 100%;\n      transform: scaleY(0.5);\n      left: 15px;\n      right: 15px;\n    }\n    .weui-btn {\n      margin: 1rem 5%;\n    }\n    .weui-cell__ft{\n      max-width: 70%;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      color:#aaa;\n    }\n  }\n  .m-teaminfo {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    .u-info{\n      margin-left: 1rem;\n      span{\n        color: #999;\n        font-size: 0.9rem;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 501:
/* no static exports found */
/* all exports used */
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-loader/lib/template-compiler?{"id":"data-v-23aaa392"}!./~/vux-loader/src/before-template-compiler-loader.js!./~/vux-loader/src/template-loader.js!./~/vue-loader/lib/selector.js?type=template&index=0!./src/pages/TeamManage.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "g-inherit m-article p-teammanager"
  }, [_c('x-header', {
    staticClass: "m-tab",
    attrs: {
      "left-options": {
        backText: ' '
      }
    }
  }, [_c('h1', {
    staticClass: "m-tab-top"
  }, [_vm._v("群设置")]), _vm._v(" "), _c('a', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  })]), _vm._v(" "), _c('div', {
    staticClass: "m-body"
  }, [(_vm.teamInfo && _vm.teamInfo.type === 'normal') ? [_c('team-member', {
    attrs: {
      "teamId": _vm.teamId
    }
  }), _vm._v(" "), _c('group', {
    staticClass: "m-group"
  }, [_c('cell', {
    attrs: {
      "title": "讨论组名称",
      "value": _vm.teamName,
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('修改讨论组名称', 'text', 'name'); })($event)
      }
    }
  }), _vm._v(" "), _c('x-button', {
    attrs: {
      "mini": "",
      "type": "warn"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.leaveTeam($event)
      }
    }
  }, [_vm._v("退出讨论组")])], 1)] : _vm._e(), _vm._v(" "), (_vm.teamInfo && _vm.teamInfo.type === 'advanced') ? [_c('cell', {
    attrs: {
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return _vm.onTeamAvatarClick($event)
      }
    }
  }, [_c('div', {
    staticClass: "m-teaminfo",
    attrs: {
      "slot": "icon"
    },
    slot: "icon"
  }, [_c('img', {
    staticClass: "avatar u-circle",
    attrs: {
      "src": _vm.teamAvatar
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "u-info"
  }, [_c('p', [_vm._v(_vm._s(_vm.teamInfo.name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(((_vm.teamInfo.teamId) + " 于" + (_vm.formateDate(_vm.teamInfo.createTime)) + "创建")))])])]), _vm._v(" "), _c('form', [_c('input', {
    ref: "input",
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "type": "file",
      "accept": "image/*"
    },
    on: {
      "change": _vm.onFileSelected
    }
  })])]), _vm._v(" "), _c('group', {
    staticClass: "m-group"
  }, [_c('cell', {
    attrs: {
      "title": "群成员",
      "value": ("共" + _vm.teamMemberNum + "人"),
      "is-link": "",
      "link": ("/teammembers/" + _vm.teamId)
    }
  }), _vm._v(" "), _c('team-member', {
    attrs: {
      "teamId": _vm.teamId,
      "advanced": true
    }
  })], 1), _vm._v(" "), _c('group', {
    staticClass: "m-group"
  }, [_c('cell', {
    attrs: {
      "title": "群名称",
      "value": _vm.teamName,
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick(_vm.hasEditPermission ? '修改群名称' : '群名称', 'text', 'name'); })($event)
      }
    }
  }), _vm._v(" "), _c('cell', {
    attrs: {
      "title": "群昵称",
      "value": _vm.nickName,
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('修改群昵称', 'text', 'nickInTeam', true); })($event)
      }
    }
  }), _vm._v(" "), _c('cell', {
    attrs: {
      "title": "群介绍",
      "value": _vm.teamInfo.intro || '未设置',
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick(_vm.hasEditPermission ? '修改群介绍' : '群介绍', 'textarea', 'intro'); })($event)
      }
    }
  })], 1), _vm._v(" "), (_vm.hasManagePermission) ? _c('group', {
    staticClass: "m-group"
  }, [_c('cell', {
    attrs: {
      "title": "身份验证",
      "value": _vm.getTeamInfo('joinMode'),
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('身份验证', 'select', 'joinMode'); })($event)
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('group', {
    staticClass: "m-group"
  }, [(_vm.hasManagePermission) ? [_c('cell', {
    attrs: {
      "title": "邀请他人权限",
      "value": _vm.getTeamInfo('inviteMode'),
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('邀请他人权限', 'select', 'inviteMode'); })($event)
      }
    }
  }), _vm._v(" "), _c('cell', {
    attrs: {
      "title": "群资料修改权限",
      "value": _vm.getTeamInfo('updateTeamMode'),
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('群资料修改权限', 'select', 'updateTeamMode'); })($event)
      }
    }
  }), _vm._v(" "), _c('cell', {
    attrs: {
      "title": "被邀请人身份验证",
      "value": _vm.getTeamInfo('beInviteMode'),
      "is-link": ""
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.onEditItemClick('被邀请人身份验证', 'select', 'beInviteMode'); })($event)
      }
    }
  })] : _vm._e(), _vm._v(" "), _c('x-button', {
    attrs: {
      "mini": "",
      "type": "warn"
    },
    nativeOn: {
      "click": function($event) {
        return (function () { return _vm.isOwner ? _vm.dismissTeam() : _vm.leaveTeam(); })($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.isOwner ? '解散群聊' : '退出高级群'))])], 2)] : _vm._e()], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-23aaa392", module.exports)
  }
}

/***/ }),

/***/ 525:
/* no static exports found */
/* all exports used */
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./~/vue-style-loader!./~/css-loader?sourceMap!./~/vue-loader/lib/style-compiler?{"id":"data-v-23aaa392","scoped":false,"hasInlineConfig":true}!./~/vux-loader/src/style-loader.js!./~/vue-loader/lib/selector.js?type=styles&index=0!./src/pages/TeamManage.vue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../~/css-loader?sourceMap!../../~/vue-loader/lib/style-compiler?{"id":"data-v-23aaa392","scoped":false,"hasInlineConfig":true}!../../~/vux-loader/src/style-loader.js!../../~/vue-loader/lib/selector.js?type=styles&index=0!./TeamManage.vue */ 478);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(/*! ../../~/vue-style-loader/lib/addStylesClient.js */ 6)("68518ca3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-23aaa392\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamManage.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-23aaa392\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/vux-loader/src/style-loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TeamManage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});
//# sourceMappingURL=8.js.map