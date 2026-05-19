import{a3 as _,a4 as q,a5 as O}from"./iframe-CAKmp4rk.js";var m={exports:{}},d={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S;function x(){if(S)return d;S=1;var f=_(),W=q();function j(r,u){return r===u&&(r!==0||1/r===1/u)||r!==r&&u!==u}var p=typeof Object.is=="function"?Object.is:j,w=W.useSyncExternalStore,y=f.useRef,z=f.useEffect,D=f.useMemo,M=f.useDebugValue;return d.useSyncExternalStoreWithSelector=function(r,u,s,v,a){var t=y(null);if(t.current===null){var o={hasValue:!1,value:null};t.current=o}else o=t.current;t=D(function(){function h(e){if(!R){if(R=!0,l=e,e=v(e),a!==void 0&&o.hasValue){var i=o.value;if(a(i,e))return n=i}return n=e}if(i=n,p(l,e))return i;var E=v(e);return a!==void 0&&a(i,E)?(l=e,i):(l=e,n=E)}var R=!1,l,n,b=s===void 0?null:s;return[function(){return h(u())},b===null?void 0:function(){return h(b())}]},[u,s,v,a]);var c=w(r,t[0],t[1]);return z(function(){o.hasValue=!0,o.value=c},[c]),M(c),c},d}var V;function C(){return V||(V=1,m.exports=x()),m.exports}var F=C();const I=O(F);export{I as u,F as w};
