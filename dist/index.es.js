import{omit as n,at as t}from"lodash";var r,e,u=function(n){return"@@krf/"+n.toUpperCase()},i=function(n){return function(t){return(n?">":"")+n+">"+t}},o=function(n){return function(t){return u("SET"+i(n)(t))}},c=function(n){return function(t){return function(r){return{type:o(n)(t),payload:r}}}},a=function(n){return function(t){return u("RESET"+i(n)(t))}},f=function(n){return function(t){return function(){return{type:a(n)(t)}}}},s=function(n){return function(t){return u("ADD"+i(n)(t))}},d=function(n){return function(t){return u("UPDATE"+i(n)(t))}},y=function(n){return function(t){return function(r){return{type:d(n)(t),payload:r}}}},p=function(n){return function(t){return u("REMOVE"+i(n)(t))}},l=function(n){return function(t){return u("ADD_OR_UPDATE"+i(n)(t))}},v={set:c,SET:o,add:function(n){return function(t){return function(r){return{type:s(n)(t),payload:r}}}},ADD:s,reset:f,RESET:a,remove:function(n){return function(t){return function(r){return{type:p(n)(t),payload:r}}}},REMOVE:p,update:y,UPDATE:d,addOrUpdate:function(n){return function(t){return function(r){return{type:l(n)(t),payload:r}}}},ADD_OR_UPDATE:l},g={data:{},keys:[],array:[],initialized:!1},O=function(n,t){var r={};return function(n){return Array.isArray(n)?n:[n]}(t).forEach(function(t){r[t[n]]=t}),r},b=function(n){return function(t){return Object.assign({},n,{data:t,keys:Object.keys(t),array:Object.values(t),initialized:!0})}},j=function(n,t,r){return b(t)(O(n,r))},E=function(n,t,r){var u=r[n];return b(t)(Object.assign({},t.data,((e={})[u]=Object.assign({},t.data[u],r),e)))},m=function(n,t){return void 0!==t?j(n,{},t):g},A=function(t){return function(e){return function(u){return function(i){return function(c,f){void 0===c&&(c=m(t,i)),void 0===f&&(f={});var y=f.payload;switch(f.type){case o(e)(u):return j(t,c,y);case s(e)(u):return function(n,t,e){var u=e[n];return b(t)(Object.assign({},t.data,((r={})[u]=e,r)))}(t,c,y);case l(e)(u):return E(t,c,y);case p(e)(u):return function(t,r,e){return b(r)(n(r.data,[].concat(e)))}(0,c,y);case a(e)(u):return m(t,i);case d(e)(u):return function(n){return function(t){return void 0!==n.data[t]}}(c)(y[t])?E(t,c,y):c;default:return c}}}}}};var D=function(n){return function(r){var e=r,u=n.name,i=n.path;void 0!==i&&i.length>0&&(e=t(r,i)[0]);return e[u]}},k=function(n){return function(t){return function(r){return D(t)(r)[n]}}},T=k("keys"),h=k("array"),U=k("initialized"),w={},R=function(n){return void 0!==n?n:w},S=function(){return function(n){return function(t){return function(r){return function(e,u){void 0===e&&(e=R(r)),void 0===u&&(u={});var i=u.payload;switch(u.type){case o(n)(t):return i;case d(n)(t):return Object.assign({},e,i);case a(n)(t):return R(r);default:return e}}}}}};var z,P,V=function(n){return function(){return function(t){return D(n)(t)}}},x={keyValue:{middlewares:[function(n){return function(t){return function(r){return function(e){return function(u){return void 0===u&&(u={}),Object.assign({},u,{state:A(n)(t)(r)(e)(u.state,u.action)})}}}}}],actions:v,selectors:{getState:D,getKeys:T,getAsArray:h,getLength:function(n){return function(t){return T(n)(t).length}},isInitialized:U,get:function(n){return function(t){return function(r){var e=function(n){return k("data")(n)}(n)(r);return null==t?e:Array.isArray(t)?t.map(function(n){return e[n]}):e[t]}}},getBy:function(n){return function(r,e){return function(u){var i=h(n)(u);return Array.isArray(e)?i.filter(function(n){return e.includes(t(n,r)[0])}):i.filter(function(n){return e===t(n,r)[0]})}}},hasKey:function(n){return function(t){return function(r){return T(n)(r).includes(t)}}}}},simpleObject:{middlewares:[function(n){return function(t){return function(r){return function(e){return function(u){return void 0===u&&(u={}),Object.assign({},u,{state:S(n)(t)(r)(e)(u.state,u.action)})}}}}}],actions:{set:c,SET:o,reset:f,RESET:a,update:y,UPDATE:d},selectors:{get:V,isInitialized:function(n){return function(t){return void 0!==n.defaultData?D(n)(t)!==n.defaultData:V(n)()(t)!==w}}}}};var _={key:"id",type:"keyValue",prefix:""},K=function(n){return void 0===n&&(n={}),function(t){void 0===t&&(t={});var r=Object.assign({},_,t),e=r.key,u=r.type,i=r.prefix,o=r.name,c=r.defaultData,a=x[u];return Object.assign.apply(Object,[function(n){return function(t){return function(r){return function(e){return function(u){return function(i,o){void 0===o&&(o={});var c=o.type;void 0===c&&(c="UNKNOWN");var a={state:i,action:{type:c,payload:o.payload}};return(n.pre||[].concat(n.engine||[],n.post||[])).map(function(n){return n(t)(r)(e)(u)}).forEach(function(n){a=n(a)}),a.state}}}}}}(Object.assign({},n,{engine:a.middlewares}))(e)(i)(o)(c),{krfType:u}].concat(Object.keys(a.actions).map(function(n){return(z={})[n]=a.actions[n](i)(o),z}),Object.keys(a.selectors).map(function(n){return(P={})[n]=a.selectors[n](r),P})))}},N=function(){throw Error("parameter is not a middleware configuration, nor a factory option object.")},I=function(n){return void 0===n&&(n={}),function(t){return null==t&&N(),function(n){return n.engine||n.pre||n.post}(t)?function(r){return K(t)(Object.assign({},r,n))}:function(n){return!!n.name||"string"==typeof n}(t)?"string"==typeof t?K()(Object.assign({},{name:t},n)):K()(Object.assign({},t,n)):void N()}},M=I({type:"simpleObject"}),B=I({type:"keyValue"});export default I();export{M as simpleObject,B as keyValue};