/*
@license

dhtmlxGantt v.6.3.5 Standard

This version of dhtmlxGantt is distributed under GPL 2.0 license and can be legally used in GPL projects.

To use dhtmlxGantt in non-GPL projects (and get Pro version of the product), please obtain Commercial/Enterprise or Ultimate license on our site https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing or contact us at sales@dhtmlx.com

(c) XB Software Ltd.

*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("ext/dhtmlxgantt_multiselect",[],e):"object"==typeof exports?exports["ext/dhtmlxgantt_multiselect"]=e():t["ext/dhtmlxgantt_multiselect"]=e()}(window,function(){return function(t){var e={};function n(s){if(e[s])return e[s].exports;var l=e[s]={i:s,l:!1,exports:{}};return t[s].call(l.exports,l,l.exports,n),l.l=!0,l.exports}return n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var l in t)n.d(s,l,function(e){return t[e]}.bind(null,l));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/codebase/",n(n.s=228)}({228:function(t,e){gantt.config.multiselect=!0,gantt.config.multiselect_one_level=!1,gantt._multiselect={_selected:{},_one_level:!1,_active:!0,_first_selected_when_shift:null,getDefaultSelected:function(){var t=this.getSelected();return t.length?t[t.length-1]:null},setFirstSelected:function(t){this._first_selected_when_shift=t},getFirstSelected:function(){return this._first_selected_when_shift},isActive:function(){return this.updateState(),this._active},updateState:function(){this._one_level=gantt.config.multiselect_one_level;var t=this._active;this._active=gantt.config.multiselect,this._active!=t&&this.reset()},reset:function(){this._selected={}},setLastSelected:function(t){gantt.$data.tasksStore.silent(function(){var e=gantt.$data.tasksStore;t?e.select(t+""):e.unselect(null)})},getLastSelected:function(){var t=gantt.$data.tasksStore.getSelectedId();return t&&gantt.isTaskExists(t)?t:null},select:function(t,e){return!!(t&&gantt.callEvent("onBeforeTaskMultiSelect",[t,!0,e])&&gantt.callEvent("onBeforeTaskSelected",[t]))&&(this._selected[t]=!0,this.setLastSelected(t),this.afterSelect(t),gantt.callEvent("onTaskMultiSelect",[t,!0,e]),gantt.callEvent("onTaskSelected",[t]),!0)},toggle:function(t,e){this._selected[t]?this.unselect(t,e):this.select(t,e)},unselect:function(t,e){t&&gantt.callEvent("onBeforeTaskMultiSelect",[t,!1,e])&&(this._selected[t]=!1,this.getLastSelected()==t&&this.setLastSelected(this.getDefaultSelected()),this.afterSelect(t),gantt.callEvent("onTaskMultiSelect",[t,!1,e]),gantt.callEvent("onTaskUnselected",[t]))},isSelected:function(t){return!(!gantt.isTaskExists(t)||!this._selected[t])},getSelected:function(){var t=[];for(var e in this._selected)this._selected[e]&&gantt.isTaskExists(e)?t.push(e):this._selected[e]=!1;return t.sort(function(t,e){return gantt.getGlobalTaskIndex(t)>gantt.getGlobalTaskIndex(e)?1:-1}),t},forSelected:function(t){for(var e=this.getSelected(),n=0;n<e.length;n++)t(e[n])},isSameLevel:function(t){if(!this._one_level)return!0;var e=this.getLastSelected();return!e||(!gantt.isTaskExists(e)||!gantt.isTaskExists(t)||!(gantt.calculateTaskLevel(gantt.getTask(e))!=gantt.calculateTaskLevel(gantt.getTask(t))))},afterSelect:function(t){gantt.isTaskExists(t)&&gantt.refreshTask(t)},doSelection:function(t){if(!this.isActive())return!1;if(gantt._is_icon_open_click(t))return!1;var e=gantt.locate(t);if(!e)return!1;if(!gantt.callEvent("onBeforeMultiSelect",[t]))return!1;var n=this.getSelected(),s=this.getFirstSelected(),l=!1,i=this.getLastSelected();if(t.shiftKey?gantt.isTaskExists(this.getFirstSelected())&&null!==this.getFirstSelected()||this.setFirstSelected(e):(t.ctrlKey||t.metaKey)&&this.isSelected(e)||this.setFirstSelected(e),t.ctrlKey||t.metaKey)e&&this.toggle(e,t);else if(t.shiftKey&&n.length)if(i){if(e){for(var a=gantt.getGlobalTaskIndex(this.getFirstSelected()),c=gantt.getGlobalTaskIndex(e),r=gantt.getGlobalTaskIndex(i),u=i;gantt.getGlobalTaskIndex(u)!==a;)this.unselect(u,t),u=a>r?gantt.getNext(u):gantt.getPrev(u);for(u=e;gantt.getGlobalTaskIndex(u)!==a;)this.select(u,t)&&!l&&(l=!0,s=u),u=a>c?gantt.getNext(u):gantt.getPrev(u)}}else i=e;else{this.isSelected(e)||this.select(e,t),n=this.getSelected();for(var o=0;o<n.length;o++)n[o]!==e&&this.unselect(n[o],t)}return this.isSelected(e)?this.setLastSelected(e):s?e==i&&this.setLastSelected(t.shiftKey?s:this.getDefaultSelected()):this.setLastSelected(null),this.getSelected().length||this.setLastSelected(null),this.getLastSelected()&&this.isSelected(this.getFirstSelected())||this.setFirstSelected(this.getLastSelected()),!0}},function(){var t=gantt.selectTask;gantt.selectTask=function(e){if(!e)return!1;var n=gantt._multiselect,s=e;return n.isActive()?(n.select(e,null)&&n.setLastSelected(e),n.setFirstSelected(n.getLastSelected())):s=t.call(this,e),s};var e=gantt.unselectTask;gantt.unselectTask=function(t){var n=gantt._multiselect,s=n.isActive();(t=t||n.getLastSelected())&&s&&(n.unselect(t,null),t==n.getLastSelected()&&n.setLastSelected(null),gantt.refreshTask(t),n.setFirstSelected(n.getLastSelected()));var l=t;return s||(l=e.call(this,t)),l},gantt.toggleTaskSelection=function(t){var e=gantt._multiselect;t&&e.isActive()&&(e.toggle(t),e.setFirstSelected(e.getLastSelected()))},gantt.getSelectedTasks=function(){var t=gantt._multiselect;return t.isActive(),t.getSelected()},gantt.eachSelectedTask=function(t){return this._multiselect.forSelected(t)},gantt.isSelectedTask=function(t){return this._multiselect.isSelected(t)},gantt.getLastSelectedTask=function(){return this._multiselect.getLastSelected()},gantt.attachEvent("onGanttReady",function(){gantt.$data.tasksStore.isSelected=function(t){return gantt._multiselect.isSelected(t)}})}(),gantt.attachEvent("onTaskIdChange",function(t,e){var n=gantt._multiselect;if(!n.isActive())return!0;gantt.isSelectedTask(t)&&(n.unselect(t,null),n.select(e,null))}),gantt.attachEvent("onAfterTaskDelete",function(t,e){var n=gantt._multiselect;if(!n.isActive())return!0;n._selected[t]&&(n.unselect(t,null),n._selected[t]=!1,n.setLastSelected(n.getDefaultSelected())),n.forSelected(function(t){gantt.isTaskExists(t)||n.unselect(t,null)})}),gantt.attachEvent("onBeforeTaskMultiSelect",function(t,e,n){var s=gantt._multiselect;return!(e&&s.isActive()&&s._one_level)||s.isSameLevel(t)}),gantt.attachEvent("onTaskClick",function(t,e){return gantt._multiselect.doSelection(e)&&gantt.callEvent("onMultiSelect",[e]),!0})}})});
//# sourceMappingURL=dhtmlxgantt_multiselect.js.map