(window.webpackJsonp=window.webpackJsonp||[]).push([[6,11],{430:function(t,e,n){t.exports=function(){var t="undefined"!=typeof window,e="undefined"!=typeof navigator,n=t&&("ontouchstart"in window||e&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"];function i(t){var e=t.event,n=t.handler;(0,t.middleware)(e)&&n(e)}function s(t,e){var s=function(t){var e="function"==typeof t;if(!e&&"object"!=typeof t)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:e?t:t.handler,middleware:t.middleware||function(t){return t},events:t.events||n,isActive:!(!1===t.isActive),detectIframe:!(!1===t.detectIframe)}}(e.value),o=s.handler,a=s.middleware,r=s.detectIframe;if(s.isActive){if(t["__v-click-outside"]=s.events.map((function(e){return{event:e,srcTarget:document.documentElement,handler:function(e){return function(t){var e=t.el,n=t.event,s=t.handler,o=t.middleware,a=n.path||n.composedPath&&n.composedPath();(a?a.indexOf(e)<0:!e.contains(n.target))&&i({event:n,handler:s,middleware:o})}({el:t,event:e,handler:o,middleware:a})}}})),r){var c={event:"blur",srcTarget:window,handler:function(e){return function(t){var e=t.el,n=t.event,s=t.handler,o=t.middleware;setTimeout((function(){var t=document.activeElement;t&&"IFRAME"===t.tagName&&!e.contains(t)&&i({event:n,handler:s,middleware:o})}),0)}({el:t,event:e,handler:o,middleware:a})}};t["__v-click-outside"]=[].concat(t["__v-click-outside"],[c])}t["__v-click-outside"].forEach((function(e){var n=e.event,i=e.srcTarget,s=e.handler;return setTimeout((function(){t["__v-click-outside"]&&i.addEventListener(n,s,!1)}),0)}))}}function o(t){(t["__v-click-outside"]||[]).forEach((function(t){return t.srcTarget.removeEventListener(t.event,t.handler,!1)})),delete t["__v-click-outside"]}var a=t?{bind:s,update:function(t,e){var n=e.value,i=e.oldValue;JSON.stringify(n)!==JSON.stringify(i)&&(o(t),s(t,{value:n}))},unbind:o}:{};return{install:function(t){t.directive("click-outside",a)},directive:a}}()},435:function(t,e,n){},436:function(t,e,n){},452:function(t,e,n){"use strict";var i=n(1),s=n(233).trim;i({target:"String",proto:!0,forced:n(453)("trim")},{trim:function(){return s(this)}})},453:function(t,e,n){var i=n(2),s=n(234);t.exports=function(t){return i((function(){return!!s[t]()||"​᠎"!="​᠎"[t]()||s[t].name!==t}))}},454:function(t,e,n){"use strict";n(435)},455:function(t,e,n){"use strict";n(436)},502:function(t,e,n){},512:function(t,e,n){"use strict";n.r(e);n(47),n(235),n(39),n(131),n(237),n(24),n(236),n(231),n(452),n(68);var i=n(232),s=n(0),o=n(430),a=n.n(o);s.a.use(a.a);var r={name:"SearchBox2",data:function(){return{v:s.a.version,query:localStorage.getItem("search_query")||"",scrollY:localStorage.getItem("scrollY"),focused:!1,focusIndex:0,suggestionsCnt:0,cntLimit:void 0,path:void 0,basePaths:i.basePaths}},computed:{showSuggestions:function(){return this.focused&&this.suggestions&&this.suggestions.length},suggestions:function(){var t=this;this.path;var e=this.query.trim().toLowerCase();if(this.path||this.setPath(),!(e.length<3)){localStorage.setItem("search_query",e);var n=this.$site.pages;n.sort(this.sortByPath);var i=this.$site.themeConfig.searchMaxSuggestions||250,s=[],o=e.split(" "),a={header:{title:void 0,cnt:void 0,position:void 0}};this.cntLimit=void 0,this.suggestionsCnt=0;for(var r=void 0,c=0,u=this.path,h=function(e){if(s.length>=i)return t.cntLimit=!0,"break";var h=n[e];if("/"===h.path)return"continue";if("/"===t.path&&t.basePaths[h.frontmatter.basePath]);else if(t.path!==h.frontmatter.basePath)return"continue";if("/"===t.path){var l=h.frontmatter.docSetName||"Unknown";a.header.title!=l&&(a={header:{title:l,cnt:0,position:s.length}},s.push(a),r=a)}o.some((function(t){if(h.title.toLowerCase().indexOf(t.toLowerCase())>-1)return"/"===u&&s[r.header.position].header.cnt++,c++,s.push({level:0,page:h,folder:h.frontmatter.folder,pageTitle:h.title,path:h.path,docSetName:h.frontmatter.docSetName||"Unknown",basePath:h.frontmatter.basePath||"basePath unknown"}),1;return 0})),o.some((function(t){h.headers&&h.headers.forEach((function(e){if(e.title.toLowerCase().indexOf(t.toLowerCase())>-1)return"/"===u&&s[r.header.position].header.cnt++,c++,s.push({p_path:h.path,level:e.level,path:h.path+"#"+e.slug,folder:h.frontmatter.folder,headerTitle:e.title,pageTitle:h.title,docSetName:h.frontmatter.docSetName||"Unknown",basePath:h.frontmatter.basePath||"basePath unknown"}),1}));return 0}))},l=0;l<n.length;l++){var d=h(l);if("break"===d)break}return this.suggestionsCnt=c,s}localStorage.setItem("search_query","")}},mounted:function(){this.setPath(),this.basePaths[this.path]||(this.basePaths[this.path]=this.path),this.placeholder=this.$site.themeConfig.searchPlaceholder||"",document.addEventListener("keydown",this.onHotkey)},beforeDestroy:function(){document.removeEventListener("keydown",this.onHotkey)},methods:{onClickOutside:function(t,e){this.$emit("clicked")},updatePathFromChild:function(t){this.path=t},sortByPath:function(t,e){return e.path>t.path?-1:e.path<t.path?1:0},setPath:function(){var t=this.$route.path.split("/");["airnode","ois"].includes(t[1])?this.path="/"+t[1]+"/"+t[2]:this.path="/"+t[1]},onHotkey:function(t){t.srcElement===document.body&&["s","/"].includes(t.key)&&(this.$refs.input.focus(),t.preventDefault())},onUp:function(){this.showSuggestions&&(this.focusIndex>0?this.focusIndex--:this.focusIndex=this.suggestions.length-1)},onDown:function(){this.showSuggestions&&(this.focusIndex<this.suggestions.length-1?this.focusIndex++:this.focusIndex=0)}}},c=(n(454),n(455),n(9)),u=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.onClickOutside,expression:"onClickOutside"}],staticClass:"sb-search2-modal",staticStyle:{"user-select":"none"}},[n("div",{staticClass:"sb-search-input-box"},[n("input",{ref:"input",class:{focused:t.focused},attrs:{"aria-label":"Search",placeholder:"minimum 3 characters",autocomplete:"off",spellcheck:"false"},domProps:{value:t.query},on:{input:function(e){t.query=e.target.value},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1},keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.onUp(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.onDown(e)}]}}),t._v("  "),t.suggestions?n("span",[t._v("("+t._s(t.suggestionsCnt)+")")]):t._e(),t._v(" "),t.suggestions&&t.cntLimit?n("div",{staticStyle:{"margin-top":"-11px",float:"right","font-size":"x-small",color:"red"}},[t._v("\n      result set limit reached\n    ")]):t._e()]),t._v(" "),t.basePaths?n("search-SearchBoxSelect2",{attrs:{pathParam:t.path,basePathsParam:t.basePaths}}):t._e(),t._v(" "),n("search-SearchBoxList2",{attrs:{suggestions:t.suggestions,suggestionsCnt:t.suggestionsCnt,basePath:t.path}})],1)}),[],!1,null,"2f2bdfcc",null);e.default=u.exports},786:function(t,e,n){t.exports=n.p+"assets/img/search.83621669.svg"},787:function(t,e,n){"use strict";n(502)},828:function(t,e,n){"use strict";n.r(e);var i={name:"SearchBoxBtn2",components:{SearchBox2:n(512).default},data:function(){return{showModal:!1}},methods:{openModal:function(){this.showModal=!this.showModal},onChildClick:function(){this.showModal=!1}},watch:{$route:function(t){}},mounted:function(){this.$nextTick((function(){}))}},s=(n(787),n(9)),o=Object(s.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("span",[e("button",{staticClass:"search2-btn",staticStyle:{"margin-top":"3px","user-select":"none"},on:{click:this.openModal}},[e("img",{staticStyle:{filter:"brightness(0) invert(1)"},attrs:{src:n(786),width:"24px"}})]),this._v(" "),this.showModal?e("SearchBox2",{on:{clicked:this.onChildClick}}):this._e()],1)}),[],!1,null,"a14d0f22",null);e.default=o.exports}}]);