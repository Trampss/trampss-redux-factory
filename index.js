!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("lodash/at"),require("lodash/omit"),require("lodash/uniq"),require("lodash/without"),require("lodash/keyBy")):"function"==typeof define&&define.amd?define(["lodash/at","lodash/omit","lodash/uniq","lodash/without","lodash/keyBy"],t):n["trampss-redux-data-store"]=t(n._at,n._omit,n._uniq,n._without,n._keyBy)}(this,function(n,t,r,e,u){"use strict";n=n&&"default"in n?n.default:n,t=t&&"default"in t?t.default:t,r=r&&"default"in r?r.default:r,e=e&&"default"in e?e.default:e,u=u&&"default"in u?u.default:u;var i=function(n){return"SET_"+n},a=function(n){return"RESET_"+n},o=function(n){return"ADD_"+n},f=function(n){return"DEL_"+n},c=Object.freeze({SET:i,set:function(n){return function(t){return{type:i(n),payload:t}}},RESET:a,reset:function(n){return function(){return{type:a(n)}}},ADD:o,add:function(n){return function(t){return{type:o(n),payload:t}}},DEL:f,del:function(n){return function(t){return{type:f(n),payload:t}}}}),d=function(t){return function(r){return function(e){var u=e;return void 0!==t&&(u=n(e,t)[0]),u[r]}}},y=function(n){return function(t){return function(r){return function(e){return d(t)(r)(e)[n]}}}},l=y("keys"),s=y("array"),p=y("nb"),h=y("initialized"),b=y("data"),g=Object.freeze({getState:d,getKeys:l,getAsArray:s,getNb:p,isInitialized:h,get:function(n){return function(t){return function(r){return function(e){var u=b(n)(t)(e);return r?Array.isArray(r)?r.map(function(n){return u[n]}):u[r]:u}}}},getBy:function(t){return function(r){return function(e,u){return function(i){var a=s(t)(r)(i);return a?Array.isArray(u)?a.filter(function(t){return u.includes(n(t,e)[0])}):a.filter(function(t){return u===n(t,e)[0]}):[]}}}}}),v=function(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n},k=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}return n},m=function(n){if(Array.isArray(n)){for(var t=0,r=Array(n.length);t<n.length;t++)r[t]=n[t];return r}return Array.from(n)},A=function(n){return function(t){return function(r){return function(e,u){if(!e||0===r.length&&!u)return n;if(Array.isArray(n)){var i=[u];return n.map(function(n){if(!n[t]){var r=k({},n,v({},t,e(i)));return i=[].concat(m(i),[r[t]]),r}return n})}return n[t]?n:k({},n,v({},t,e(r||[u])))}}}},O={data:{},keys:[],array:[],nb:0,initialized:!1},j=function(n,c,d){return function(y){return function(){var l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},p=s.type,h=void 0===p?"UNKONWN":p,b=s.payload;switch(h){case i(y):var g=A(b)(n)(l.keys)(c,d);return{data:u(g,n),keys:g.map(function(t){return t[n]}),array:g,nb:g.length,initialized:!0};case o(y):var j=A(b)(n)(l.keys)(c,d);return k({},l,{data:k({},l.datas,v({},j[n],j)),keys:r([].concat(m(l.keys),[j[n]])),array:[].concat(m(l.array),[j]),nb:l.keys.length+1,initialized:!0});case f(y):return k({},l,{data:t(l.data,[b]),keys:e(l.keys,b),array:l.array?l.array.filter(function(t){return t[n]!==b}):[],nb:l.keys.length-1});case a(y):return O;default:return l}}}};return function(n,t,r){return function(e){return function(u){return Object.assign.apply(Object,[j(n,t,r)(u)].concat(m(Object.keys(c).map(function(n){return v({},n,c[n](u))})),m(Object.keys(g).map(function(n){return v({},n,g[n](e)(u))}))))}}}});
//# sourceMappingURL=index.js.map
