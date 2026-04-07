(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var zu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D=function(n,e){if(!n)throw li(e)},li=function(n){return new Error("Firebase Database ("+jd.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Xm=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],l=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},yl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,l=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,f=r>>2,p=(r&3)<<4|l>>4;let m=(l&15)<<2|h>>6,w=h&63;c||(w=64,o||(m=64)),i.push(t[f],t[p],t[m],t[w])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray($d(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Xm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||l==null||h==null||p==null)throw new Zm;const m=r<<2|l>>4;if(i.push(m),h!==64){const w=l<<4&240|h>>2;if(i.push(w),p!==64){const S=h<<6&192|p;i.push(S)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Zm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hd=function(n){const e=$d(n);return yl.encodeByteArray(e,!0)},wr=function(n){return Hd(n).replace(/\./g,"")},Cr=function(n){try{return yl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(n){return zd(void 0,n)}function zd(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!tg(t)||(n[t]=zd(n[t],e[t]));return n}function tg(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig=()=>ng().__FIREBASE_DEFAULTS__,sg=()=>{if(typeof process>"u"||typeof zu>"u")return;const n=zu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},rg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Cr(n[1]);return e&&JSON.parse(e)},to=()=>{try{return ig()||sg()||rg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Gd=n=>{var e,t;return(t=(e=to())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Kd=n=>{const e=Gd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Qd=()=>{var n;return(n=to())===null||n===void 0?void 0:n.config},Yd=n=>{var e;return(e=to())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[wr(JSON.stringify(t)),wr(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Le())}function og(){var n;const e=(n=to())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ag(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function lg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Xd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function cg(){const n=Le();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ug(){return jd.NODE_ADMIN===!0}function hg(){return!og()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function dg(){try{return typeof indexedDB=="object"}catch{return!1}}function fg(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg="FirebaseError";class Nt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=pg,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cs.prototype.create)}}class Cs{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?_g(r,i):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Nt(s,l,i)}}function _g(n,e){return n.replace(mg,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const mg=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(n){return JSON.parse(n)}function Te(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=os(Cr(r[0])||""),t=os(Cr(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},gg=function(n){const e=Zd(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},yg=function(n){const e=Zd(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Kn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function ba(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ar(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Rr(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Gu(r)&&Gu(o)){if(!Rr(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Gu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function qi(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(r)}}),e}function Wi(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)i[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)i[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=i[p-3]^i[p-8]^i[p-14]^i[p-16];i[p]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],c=this.chain_[4],h,f;for(let p=0;p<80;p++){p<40?p<20?(h=l^r&(o^l),f=1518500249):(h=r^o^l,f=1859775393):p<60?(h=r&o|l&(r|o),f=2400959708):(h=r^o^l,f=3395469782);const m=(s<<5|s>>>27)+h+c+f+i[p]&4294967295;c=l,l=o,o=(r<<30|r>>>2)&4294967295,r=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Eg(n,e){const t=new Ig(n,e);return t.subscribe.bind(t)}class Ig{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Tg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ua),s.error===void 0&&(s.error=ua),s.complete===void 0&&(s.complete=ua);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Tg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ua(){}function no(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,D(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},io=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(n){return n&&n._delegate?n._delegate:n}class Qt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ws;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rg(e))try{this.getOrInitializeService({instanceIdentifier:cn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=cn){return this.instances.has(e)}getOptions(e=cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ag(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=cn){return this.component?this.component.multipleInstances?e:cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ag(n){return n===cn?void 0:n}function Rg(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Cg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));const Pg={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},bg=G.INFO,kg={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},Ng=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=kg[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class so{constructor(e){this.name=e,this._logLevel=bg,this._logHandler=Ng,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Pg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const Dg=(n,e)=>e.some(t=>n instanceof t);let Ku,Qu;function Og(){return Ku||(Ku=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mg(){return Qu||(Qu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ef=new WeakMap,ka=new WeakMap,tf=new WeakMap,ha=new WeakMap,El=new WeakMap;function Vg(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t($t(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ef.set(t,n)}).catch(()=>{}),El.set(e,n),e}function Lg(n){if(ka.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ka.set(n,e)}let Na={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ka.get(n);if(e==="objectStoreNames")return n.objectStoreNames||tf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $t(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function xg(n){Na=n(Na)}function Fg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(da(this),e,...t);return tf.set(i,e.sort?e.sort():[e]),$t(i)}:Mg().includes(n)?function(...e){return n.apply(da(this),e),$t(ef.get(this))}:function(...e){return $t(n.apply(da(this),e))}}function Ug(n){return typeof n=="function"?Fg(n):(n instanceof IDBTransaction&&Lg(n),Dg(n,Og())?new Proxy(n,Na):n)}function $t(n){if(n instanceof IDBRequest)return Vg(n);if(ha.has(n))return ha.get(n);const e=Ug(n);return e!==n&&(ha.set(n,e),El.set(e,n)),e}const da=n=>El.get(n);function Bg(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),l=$t(o);return i&&o.addEventListener("upgradeneeded",c=>{i($t(o.result),c.oldVersion,c.newVersion,$t(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const qg=["get","getKey","getAll","getAllKeys","count"],Wg=["put","add","delete","clear"],fa=new Map;function Yu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(fa.get(e))return fa.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Wg.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||qg.includes(t)))return;const r=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return i&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return fa.set(e,r),r}xg(n=>({...n,get:(e,t,i)=>Yu(e,t)||n.get(e,t,i),has:(e,t)=>!!Yu(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if($g(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function $g(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Da="@firebase/app",Ju="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt=new so("@firebase/app"),Hg="@firebase/app-compat",zg="@firebase/analytics-compat",Gg="@firebase/analytics",Kg="@firebase/app-check-compat",Qg="@firebase/app-check",Yg="@firebase/auth",Jg="@firebase/auth-compat",Xg="@firebase/database",Zg="@firebase/data-connect",ey="@firebase/database-compat",ty="@firebase/functions",ny="@firebase/functions-compat",iy="@firebase/installations",sy="@firebase/installations-compat",ry="@firebase/messaging",oy="@firebase/messaging-compat",ay="@firebase/performance",ly="@firebase/performance-compat",cy="@firebase/remote-config",uy="@firebase/remote-config-compat",hy="@firebase/storage",dy="@firebase/storage-compat",fy="@firebase/firestore",py="@firebase/vertexai-preview",_y="@firebase/firestore-compat",my="firebase",gy="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa="[DEFAULT]",yy={[Da]:"fire-core",[Hg]:"fire-core-compat",[Gg]:"fire-analytics",[zg]:"fire-analytics-compat",[Qg]:"fire-app-check",[Kg]:"fire-app-check-compat",[Yg]:"fire-auth",[Jg]:"fire-auth-compat",[Xg]:"fire-rtdb",[Zg]:"fire-data-connect",[ey]:"fire-rtdb-compat",[ty]:"fire-fn",[ny]:"fire-fn-compat",[iy]:"fire-iid",[sy]:"fire-iid-compat",[ry]:"fire-fcm",[oy]:"fire-fcm-compat",[ay]:"fire-perf",[ly]:"fire-perf-compat",[cy]:"fire-rc",[uy]:"fire-rc-compat",[hy]:"fire-gcs",[dy]:"fire-gcs-compat",[fy]:"fire-fst",[_y]:"fire-fst-compat",[py]:"fire-vertex","fire-js":"fire-js",[my]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr=new Map,vy=new Map,Ma=new Map;function Xu(n,e){try{n.container.addComponent(e)}catch(t){Rt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function pn(n){const e=n.name;if(Ma.has(e))return Rt.debug(`There were multiple attempts to register component ${e}.`),!1;Ma.set(e,n);for(const t of Sr.values())Xu(t,n);for(const t of vy.values())Xu(t,n);return!0}function ro(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function nt(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ht=new Cs("app","Firebase",Ey);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ht.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An=gy;function nf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Oa,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Ht.create("bad-app-name",{appName:String(s)});if(t||(t=Qd()),!t)throw Ht.create("no-options");const r=Sr.get(s);if(r){if(Rr(t,r.options)&&Rr(i,r.config))return r;throw Ht.create("duplicate-app",{appName:s})}const o=new Sg(s);for(const c of Ma.values())o.addComponent(c);const l=new Iy(t,i,o);return Sr.set(s,l),l}function Il(n=Oa){const e=Sr.get(n);if(!e&&n===Oa&&Qd())return nf();if(!e)throw Ht.create("no-app",{appName:n});return e}function it(n,e,t){var i;let s=(i=yy[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${s}" with version "${e}":`];r&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rt.warn(l.join(" "));return}pn(new Qt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty="firebase-heartbeat-database",wy=1,as="firebase-heartbeat-store";let pa=null;function sf(){return pa||(pa=Bg(Ty,wy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(as)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ht.create("idb-open",{originalErrorMessage:n.message})})),pa}async function Cy(n){try{const t=(await sf()).transaction(as),i=await t.objectStore(as).get(rf(n));return await t.done,i}catch(e){if(e instanceof Nt)Rt.warn(e.message);else{const t=Ht.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rt.warn(t.message)}}}async function Zu(n,e){try{const i=(await sf()).transaction(as,"readwrite");await i.objectStore(as).put(e,rf(n)),await i.done}catch(t){if(t instanceof Nt)Rt.warn(t.message);else{const i=Ht.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Rt.warn(i.message)}}}function rf(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=1024,Ry=30*24*60*60*1e3;class Sy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new by(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=eh();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Ry}),this._storage.overwrite(this._heartbeatsCache))}catch(i){Rt.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=eh(),{heartbeatsToSend:i,unsentEntries:s}=Py(this._heartbeatsCache.heartbeats),r=wr(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Rt.warn(t),""}}}function eh(){return new Date().toISOString().substring(0,10)}function Py(n,e=Ay){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),th(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),th(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class by{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dg()?fg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Cy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Zu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Zu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function th(n){return wr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(n){pn(new Qt("platform-logger",e=>new jg(e),"PRIVATE")),pn(new Qt("heartbeat",e=>new Sy(e),"PRIVATE")),it(Da,Ju,n),it(Da,Ju,"esm2017"),it("fire-js","")}ky("");function Tl(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function of(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ny=of,af=new Cs("auth","Firebase",of());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr=new so("@firebase/auth");function Dy(n,...e){Pr.logLevel<=G.WARN&&Pr.warn(`Auth (${An}): ${n}`,...e)}function fr(n,...e){Pr.logLevel<=G.ERROR&&Pr.error(`Auth (${An}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(n,...e){throw wl(n,...e)}function st(n,...e){return wl(n,...e)}function lf(n,e,t){const i=Object.assign(Object.assign({},Ny()),{[e]:t});return new Cs("auth","Firebase",i).create(e,{appName:n.name})}function wt(n){return lf(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function wl(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return af.create(n,...e)}function x(n,e,...t){if(!n)throw wl(e,...t)}function vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw fr(e),new Error(e)}function St(n,e){n||vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Va(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Oy(){return nh()==="http:"||nh()==="https:"}function nh(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Oy()||lg()||"connection"in navigator)?navigator.onLine:!0}function Vy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,t){this.shortDelay=e,this.longDelay=t,St(t>e,"Short delay should be less than long delay!"),this.isMobile=vl()||Xd()}get(){return My()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n,e){St(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ly={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy=new As(3e4,6e4);function tn(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Dt(n,e,t,i,s={}){return uf(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const l=ci(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},r);return ag()||(h.referrerPolicy="no-referrer"),cf.fetch()(hf(n,n.config.apiHost,t,l),h)})}async function uf(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},Ly),e);try{const s=new Uy(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw or(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const l=r.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw or(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw or(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw or(n,"user-disabled",o);const f=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw lf(n,f,h);Ze(n,f)}}catch(s){if(s instanceof Nt)throw s;Ze(n,"network-request-failed",{message:String(s)})}}async function Rs(n,e,t,i,s={}){const r=await Dt(n,e,t,i,s);return"mfaPendingCredential"in r&&Ze(n,"multi-factor-auth-required",{_serverResponse:r}),r}function hf(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?Cl(n.config,s):`${n.config.apiScheme}://${s}`}function Fy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Uy{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(st(this.auth,"network-request-failed")),xy.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function or(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=st(n,e,i);return s.customData._tokenResponse=t,s}function ih(n){return n!==void 0&&n.enterprise!==void 0}class By{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Fy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function qy(n,e){return Dt(n,"GET","/v2/recaptchaConfig",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wy(n,e){return Dt(n,"POST","/v1/accounts:delete",e)}async function df(n,e){return Dt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function jy(n,e=!1){const t=oe(n),i=await t.getIdToken(e),s=Al(i);x(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:Gi(_a(s.auth_time)),issuedAtTime:Gi(_a(s.iat)),expirationTime:Gi(_a(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function _a(n){return Number(n)*1e3}function Al(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return fr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Cr(t);return s?JSON.parse(s):(fr("Failed to decode base64 JWT payload"),null)}catch(s){return fr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function sh(n){const e=Al(n);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Nt&&$y(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function $y({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Gi(this.lastLoginAt),this.creationTime=Gi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function br(n){var e;const t=n.auth,i=await n.getIdToken(),s=await Qn(n,df(t,{idToken:i}));x(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?ff(r.providerUserInfo):[],l=Gy(n.providerData,o),c=n.isAnonymous,h=!(n.email&&r.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,p={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:l,metadata:new La(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function zy(n){const e=oe(n);await br(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Gy(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function ff(n){return n.map(e=>{var{providerId:t}=e,i=Tl(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ky(n,e){const t=await uf(n,{},async()=>{const i=ci({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=hf(n,s,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",cf.fetch()(o,{method:"POST",headers:l,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qy(n,e){return Dt(n,"POST","/v2/accounts:revokeToken",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):sh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");const t=sh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Ky(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new qn;return i&&(x(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(x(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(x(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qn,this.toJSON())}_performRefresh(){return vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(n,e){x(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Et{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=Tl(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Hy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new La(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Qn(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return jy(this,e)}reload(){return zy(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Et(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await br(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nt(this.auth.app))return Promise.reject(wt(this.auth));const e=await this.getIdToken();return await Qn(this,Wy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,l,c,h,f;const p=(i=t.displayName)!==null&&i!==void 0?i:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,w=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,S=(o=t.photoURL)!==null&&o!==void 0?o:void 0,N=(l=t.tenantId)!==null&&l!==void 0?l:void 0,k=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,W=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:Q,emailVerified:le,isAnonymous:ze,providerData:de,stsTokenManager:I}=t;x(Q&&I,e,"internal-error");const g=qn.fromJSON(this.name,I);x(typeof Q=="string",e,"internal-error"),xt(p,e.name),xt(m,e.name),x(typeof le=="boolean",e,"internal-error"),x(typeof ze=="boolean",e,"internal-error"),xt(w,e.name),xt(S,e.name),xt(N,e.name),xt(k,e.name),xt(W,e.name),xt(z,e.name);const v=new Et({uid:Q,auth:e,email:m,emailVerified:le,displayName:p,isAnonymous:ze,photoURL:S,phoneNumber:w,tenantId:N,stsTokenManager:g,createdAt:W,lastLoginAt:z});return de&&Array.isArray(de)&&(v.providerData=de.map(E=>Object.assign({},E))),k&&(v._redirectEventId=k),v}static async _fromIdTokenResponse(e,t,i=!1){const s=new qn;s.updateFromServerResponse(t);const r=new Et({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await br(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];x(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?ff(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),l=new qn;l.updateFromIdToken(i);const c=new Et({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new La(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=new Map;function It(n){St(n instanceof Function,"Expected a class definition");let e=rh.get(n);return e?(St(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,rh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}pf.type="NONE";const oh=pf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n,e,t){return`firebase:${n}:${e}:${t}`}class Wn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=pr(this.userKey,s.apiKey,r),this.fullPersistenceKey=pr("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Et._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Wn(It(oh),e,i);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let r=s[0]||It(oh);const o=pr(i,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(o);if(f){const p=Et._fromJSON(e,f);h!==r&&(l=p),r=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Wn(r,e,i):(r=c[0],l&&await r._set(o,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==r)try{await h._remove(o)}catch{}})),new Wn(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(yf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_f(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ef(e))return"Blackberry";if(If(e))return"Webos";if(mf(e))return"Safari";if((e.includes("chrome/")||gf(e))&&!e.includes("edge/"))return"Chrome";if(vf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function _f(n=Le()){return/firefox\//i.test(n)}function mf(n=Le()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function gf(n=Le()){return/crios\//i.test(n)}function yf(n=Le()){return/iemobile/i.test(n)}function vf(n=Le()){return/android/i.test(n)}function Ef(n=Le()){return/blackberry/i.test(n)}function If(n=Le()){return/webos/i.test(n)}function Rl(n=Le()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Yy(n=Le()){var e;return Rl(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Jy(){return cg()&&document.documentMode===10}function Tf(n=Le()){return Rl(n)||vf(n)||If(n)||Ef(n)||/windows phone/i.test(n)||yf(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wf(n,e=[]){let t;switch(n){case"Browser":t=ah(Le());break;case"Worker":t=`${ah(Le())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${An}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,l)=>{try{const c=e(r);o(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zy(n,e={}){return Dt(n,"GET","/v2/passwordPolicy",tn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ev=6;class tv{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:ev,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsUppercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nv{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new lh(this),this.idTokenSubscription=new lh(this),this.beforeStateQueue=new Xy(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=af,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=It(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await Wn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await df(this,{idToken:e}),i=await Et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(nt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await br(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nt(this.app))return Promise.reject(wt(this));const t=e?oe(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nt(this.app)?Promise.reject(wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nt(this.app)?Promise.reject(wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(It(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zy(this),t=new tv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Cs("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Qy(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&It(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await Wn.create(this,[It(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(l,this,"internal-error"),l.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Dy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Rn(n){return oe(n)}class lh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Eg(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let oo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function iv(n){oo=n}function Cf(n){return oo.loadJS(n)}function sv(){return oo.recaptchaEnterpriseScript}function rv(){return oo.gapiScript}function ov(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const av="recaptcha-enterprise",lv="NO_RECAPTCHA";class cv{constructor(e){this.type=av,this.auth=Rn(e)}async verify(e="verify",t=!1){async function i(r){if(!t){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,l)=>{qy(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new By(c);return r.tenantId==null?r._agentRecaptchaConfig=h:r._tenantRecaptchaConfigs[r.tenantId]=h,o(h.siteKey)}}).catch(c=>{l(c)})})}function s(r,o,l){const c=window.grecaptcha;ih(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:e}).then(h=>{o(h)}).catch(()=>{o(lv)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((r,o)=>{i(this.auth).then(l=>{if(!t&&ih(window.grecaptcha))s(l,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=sv();c.length!==0&&(c+=l),Cf(c).then(()=>{s(l,r,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function ch(n,e,t,i=!1){const s=new cv(n);let r;try{r=await s.verify(t)}catch{r=await s.verify(t,!0)}const o=Object.assign({},e);return i?Object.assign(o,{captchaResp:r}):Object.assign(o,{captchaResponse:r}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function xa(n,e,t,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const r=await ch(n,e,t,t==="getOobCode");return i(n,r)}else return i(n,e).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await ch(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(r)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(n,e){const t=ro(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Rr(r,e??{}))return s;Ze(s,"already-initialized")}return t.initialize({options:e})}function hv(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(It);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function dv(n,e,t){const i=Rn(n);x(i._canInitEmulator,i,"emulator-config-failed"),x(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Af(e),{host:o,port:l}=fv(e),c=l===null?"":`:${l}`;i.config.emulator={url:`${r}//${o}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})}),pv()}function Af(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function fv(n){const e=Af(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:uh(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:uh(o)}}}function uh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function pv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return vt("not implemented")}_getIdTokenResponse(e){return vt("not implemented")}_linkToIdToken(e,t){return vt("not implemented")}_getReauthenticationResolver(e){return vt("not implemented")}}async function _v(n,e){return Dt(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mv(n,e){return Rs(n,"POST","/v1/accounts:signInWithPassword",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gv(n,e){return Rs(n,"POST","/v1/accounts:signInWithEmailLink",tn(n,e))}async function yv(n,e){return Rs(n,"POST","/v1/accounts:signInWithEmailLink",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls extends Sl{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new ls(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new ls(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return xa(e,t,"signInWithPassword",mv);case"emailLink":return gv(e,{email:this._email,oobCode:this._password});default:Ze(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return xa(e,i,"signUpPassword",_v);case"emailLink":return yv(e,{idToken:t,email:this._email,oobCode:this._password});default:Ze(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jn(n,e){return Rs(n,"POST","/v1/accounts:signInWithIdp",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vv="http://localhost";class _n extends Sl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ze("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=Tl(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new _n(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return jn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,jn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,jn(e,t)}buildRequest(){const e={requestUri:vv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ci(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ev(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Iv(n){const e=qi(Wi(n)).link,t=e?qi(Wi(e)).deep_link_id:null,i=qi(Wi(n)).deep_link_id;return(i?qi(Wi(i)).link:null)||i||t||e||n}class Pl{constructor(e){var t,i,s,r,o,l;const c=qi(Wi(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(i=c.oobCode)!==null&&i!==void 0?i:null,p=Ev((s=c.mode)!==null&&s!==void 0?s:null);x(h&&f&&p,"argument-error"),this.apiKey=h,this.operation=p,this.code=f,this.continueUrl=(r=c.continueUrl)!==null&&r!==void 0?r:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=Iv(e);try{return new Pl(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(){this.providerId=ui.PROVIDER_ID}static credential(e,t){return ls._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=Pl.parseLink(t);return x(i,"argument-error"),ls._fromEmailAndCode(e,i.code,i.tenantId)}}ui.PROVIDER_ID="password";ui.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ui.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss extends Rf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends Ss{constructor(){super("facebook.com")}static credential(e){return _n._fromParams({providerId:Ft.PROVIDER_ID,signInMethod:Ft.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ft.credentialFromTaggedObject(e)}static credentialFromError(e){return Ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ft.credential(e.oauthAccessToken)}catch{return null}}}Ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ft.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends Ss{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _n._fromParams({providerId:Ut.PROVIDER_ID,signInMethod:Ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ut.credentialFromTaggedObject(e)}static credentialFromError(e){return Ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ut.credential(t,i)}catch{return null}}}Ut.GOOGLE_SIGN_IN_METHOD="google.com";Ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Ss{constructor(){super("github.com")}static credential(e){return _n._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Bt.credential(e.oauthAccessToken)}catch{return null}}}Bt.GITHUB_SIGN_IN_METHOD="github.com";Bt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Ss{constructor(){super("twitter.com")}static credential(e,t){return _n._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return qt.credential(t,i)}catch{return null}}}qt.TWITTER_SIGN_IN_METHOD="twitter.com";qt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tv(n,e){return Rs(n,"POST","/v1/accounts:signUp",tn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Et._fromIdTokenResponse(e,i,s),o=hh(i);return new mn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=hh(i);return new mn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function hh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr extends Nt{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,kr.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new kr(e,t,i,s)}}function Sf(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?kr._fromErrorAndOperation(n,r,e,i):r})}async function wv(n,e,t=!1){const i=await Qn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return mn._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cv(n,e,t=!1){const{auth:i}=n;if(nt(i.app))return Promise.reject(wt(i));const s="reauthenticate";try{const r=await Qn(n,Sf(i,s,e,n),t);x(r.idToken,i,"internal-error");const o=Al(r.idToken);x(o,i,"internal-error");const{sub:l}=o;return x(n.uid===l,i,"user-mismatch"),mn._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Ze(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pf(n,e,t=!1){if(nt(n.app))return Promise.reject(wt(n));const i="signIn",s=await Sf(n,i,e),r=await mn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}async function Av(n,e){return Pf(Rn(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bf(n){const e=Rn(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Rv(n,e,t){if(nt(n.app))return Promise.reject(wt(n));const i=Rn(n),o=await xa(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Tv).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&bf(n),c}),l=await mn._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(l.user),l}function Sv(n,e,t){return nt(n.app)?Promise.reject(wt(n)):Av(oe(n),ui.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&bf(n),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pv(n,e){return Dt(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dh(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=oe(n),r={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Qn(i,Pv(i.auth,r));i.displayName=o.displayName||null,i.photoURL=o.photoUrl||null;const l=i.providerData.find(({providerId:c})=>c==="password");l&&(l.displayName=i.displayName,l.photoURL=i.photoURL),await i._updateTokensIfNecessary(o)}function bv(n,e,t,i){return oe(n).onIdTokenChanged(e,t,i)}function kv(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function fh(n,e,t,i){return oe(n).onAuthStateChanged(e,t,i)}function Nv(n){return oe(n).signOut()}const Nr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Nr,"1"),this.storage.removeItem(Nr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dv=1e3,Ov=10;class Nf extends kf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Tf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Jy()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ov):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Dv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Nf.type="LOCAL";const Mv=Nf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df extends kf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Df.type="SESSION";const Of=Df;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ao(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(o).map(async h=>h(t.origin,r)),c=await Vv(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ao.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((l,c)=>{const h=bl("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(m.data.response);break;default:clearTimeout(f),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(){return window}function xv(n){rt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mf(){return typeof rt().WorkerGlobalScope<"u"&&typeof rt().importScripts=="function"}async function Fv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Uv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Bv(){return Mf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vf="firebaseLocalStorageDb",qv=1,Dr="firebaseLocalStorage",Lf="fbase_key";class Ps{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function lo(n,e){return n.transaction([Dr],e?"readwrite":"readonly").objectStore(Dr)}function Wv(){const n=indexedDB.deleteDatabase(Vf);return new Ps(n).toPromise()}function Fa(){const n=indexedDB.open(Vf,qv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Dr,{keyPath:Lf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Dr)?e(i):(i.close(),await Wv(),e(await Fa()))})})}async function ph(n,e,t){const i=lo(n,!0).put({[Lf]:e,value:t});return new Ps(i).toPromise()}async function jv(n,e){const t=lo(n,!1).get(e),i=await new Ps(t).toPromise();return i===void 0?null:i.value}function _h(n,e){const t=lo(n,!0).delete(e);return new Ps(t).toPromise()}const $v=800,Hv=3;class xf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Fa(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Hv)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ao._getInstance(Bv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Fv(),!this.activeServiceWorker)return;this.sender=new Lv(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Uv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Fa();return await ph(e,Nr,"1"),await _h(e,Nr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>ph(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>jv(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>_h(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=lo(s,!1).getAll();return new Ps(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$v)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}xf.type="LOCAL";const zv=xf;new As(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gv(n,e){return e?It(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl extends Sl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Kv(n){return Pf(n.auth,new kl(n),n.bypassAuthState)}function Qv(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),Cv(t,new kl(n),n.bypassAuthState)}async function Yv(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),wv(t,new kl(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Kv;case"linkViaPopup":case"linkViaRedirect":return Yv;case"reauthViaPopup":case"reauthViaRedirect":return Qv;default:Ze(this.auth,"internal-error")}}resolve(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jv=new As(2e3,1e4);class Un extends Ff{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Un.currentPopupAction&&Un.currentPopupAction.cancel(),Un.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){St(this.filter.length===1,"Popup operations only handle one event");const e=bl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(st(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(st(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Un.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(st(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Jv.get())};e()}}Un.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xv="pendingRedirect",_r=new Map;class Zv extends Ff{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=_r.get(this.auth._key());if(!e){try{const i=await eE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}_r.set(this.auth._key(),e)}return this.bypassAuthState||_r.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function eE(n,e){const t=iE(e),i=nE(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function tE(n,e){_r.set(n._key(),e)}function nE(n){return It(n._redirectPersistence)}function iE(n){return pr(Xv,n.config.apiKey,n.name)}async function sE(n,e,t=!1){if(nt(n.app))return Promise.reject(wt(n));const i=Rn(n),s=Gv(i,e),o=await new Zv(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE=10*60*1e3;class oE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!aE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Uf(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(st(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=rE&&this.cachedEventUids.clear(),this.cachedEventUids.has(mh(e))}saveEventToCache(e){this.cachedEventUids.add(mh(e)),this.lastProcessedEventTime=Date.now()}}function mh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Uf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function aE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Uf(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lE(n,e={}){return Dt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,uE=/^https?/;async function hE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await lE(n);for(const t of e)try{if(dE(t))return}catch{}Ze(n,"unauthorized-domain")}function dE(n){const e=Va(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!uE.test(t))return!1;if(cE.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fE=new As(3e4,6e4);function gh(){const n=rt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pE(n){return new Promise((e,t)=>{var i,s,r;function o(){gh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gh(),t(st(n,"network-request-failed"))},timeout:fE.get()})}if(!((s=(i=rt().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=rt().gapi)===null||r===void 0)&&r.load)o();else{const l=ov("iframefcb");return rt()[l]=()=>{gapi.load?o():t(st(n,"network-request-failed"))},Cf(`${rv()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw mr=null,e})}let mr=null;function _E(n){return mr=mr||pE(n),mr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mE=new As(5e3,15e3),gE="__/auth/iframe",yE="emulator/auth/iframe",vE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},EE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function IE(n){const e=n.config;x(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Cl(e,yE):`https://${n.config.authDomain}/${gE}`,i={apiKey:e.apiKey,appName:n.name,v:An},s=EE.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${ci(i).slice(1)}`}async function TE(n){const e=await _E(n),t=rt().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:IE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vE,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=st(n,"network-request-failed"),l=rt().setTimeout(()=>{r(o)},mE.get());function c(){rt().clearTimeout(l),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CE=500,AE=600,RE="_blank",SE="http://localhost";class yh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function PE(n,e,t,i=CE,s=AE){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c=Object.assign(Object.assign({},wE),{width:i.toString(),height:s.toString(),top:r,left:o}),h=Le().toLowerCase();t&&(l=gf(h)?RE:t),_f(h)&&(e=e||SE,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[w,S])=>`${m}${w}=${S},`,"");if(Yy(h)&&l!=="_self")return bE(e||"",l),new yh(null);const p=window.open(e||"",l,f);x(p,n,"popup-blocked");try{p.focus()}catch{}return new yh(p)}function bE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE="__/auth/handler",NE="emulator/auth/handler",DE=encodeURIComponent("fac");async function vh(n,e,t,i,s,r){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:An,eventId:s};if(e instanceof Rf){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",ba(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Ss){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${DE}=${encodeURIComponent(c)}`:"";return`${OE(n)}?${ci(l).slice(1)}${h}`}function OE({config:n}){return n.emulator?Cl(n,NE):`https://${n.authDomain}/${kE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma="webStorageSupport";class ME{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Of,this._completeRedirectFn=sE,this._overrideRedirectResult=tE}async _openPopup(e,t,i,s){var r;St((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await vh(e,t,i,Va(),s);return PE(e,o,bl())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await vh(e,t,i,Va(),s);return xv(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(St(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await TE(e),i=new oE(e);return t.register("authEvent",s=>(x(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ma,{type:ma},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[ma];o!==void 0&&t(!!o),Ze(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Tf()||mf()||Rl()}}const VE=ME;var Eh="@firebase/auth",Ih="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function FE(n){pn(new Qt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;x(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wf(n)},h=new nv(i,s,r,c);return hv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),pn(new Qt("auth-internal",e=>{const t=Rn(e.getProvider("auth").getImmediate());return(i=>new LE(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),it(Eh,Ih,xE(n)),it(Eh,Ih,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UE=5*60,BE=Yd("authIdTokenMaxAge")||UE;let Th=null;const qE=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>BE)return;const s=t==null?void 0:t.token;Th!==s&&(Th=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function WE(n=Il()){const e=ro(n,"auth");if(e.isInitialized())return e.getImmediate();const t=uv(n,{popupRedirectResolver:VE,persistence:[zv,Mv,Of]}),i=Yd("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=qE(r.toString());kv(t,o,()=>o(t.currentUser)),bv(t,l=>o(l))}}const s=Gd("auth");return s&&dv(t,`http://${s}`),t}function jE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}iv({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=st("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",jE().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});FE("Browser");var wh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fn,Bf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function v(){}v.prototype=g.prototype,I.D=g.prototype,I.prototype=new v,I.prototype.constructor=I,I.C=function(E,T,A){for(var y=Array(arguments.length-2),dt=2;dt<arguments.length;dt++)y[dt-2]=arguments[dt];return g.prototype[T].apply(E,y)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,g,v){v||(v=0);var E=Array(16);if(typeof g=="string")for(var T=0;16>T;++T)E[T]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(T=0;16>T;++T)E[T]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=I.g[0],v=I.g[1],T=I.g[2];var A=I.g[3],y=g+(A^v&(T^A))+E[0]+3614090360&4294967295;g=v+(y<<7&4294967295|y>>>25),y=A+(T^g&(v^T))+E[1]+3905402710&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(v^A&(g^v))+E[2]+606105819&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(g^T&(A^g))+E[3]+3250441966&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(A^v&(T^A))+E[4]+4118548399&4294967295,g=v+(y<<7&4294967295|y>>>25),y=A+(T^g&(v^T))+E[5]+1200080426&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(v^A&(g^v))+E[6]+2821735955&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(g^T&(A^g))+E[7]+4249261313&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(A^v&(T^A))+E[8]+1770035416&4294967295,g=v+(y<<7&4294967295|y>>>25),y=A+(T^g&(v^T))+E[9]+2336552879&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(v^A&(g^v))+E[10]+4294925233&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(g^T&(A^g))+E[11]+2304563134&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(A^v&(T^A))+E[12]+1804603682&4294967295,g=v+(y<<7&4294967295|y>>>25),y=A+(T^g&(v^T))+E[13]+4254626195&4294967295,A=g+(y<<12&4294967295|y>>>20),y=T+(v^A&(g^v))+E[14]+2792965006&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(g^T&(A^g))+E[15]+1236535329&4294967295,v=T+(y<<22&4294967295|y>>>10),y=g+(T^A&(v^T))+E[1]+4129170786&4294967295,g=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(g^v))+E[6]+3225465664&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(A^g))+E[11]+643717713&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^g&(T^A))+E[0]+3921069994&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(v^T))+E[5]+3593408605&4294967295,g=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(g^v))+E[10]+38016083&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(A^g))+E[15]+3634488961&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^g&(T^A))+E[4]+3889429448&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(v^T))+E[9]+568446438&4294967295,g=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(g^v))+E[14]+3275163606&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(A^g))+E[3]+4107603335&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^g&(T^A))+E[8]+1163531501&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(T^A&(v^T))+E[13]+2850285829&4294967295,g=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(g^v))+E[2]+4243563512&4294967295,A=g+(y<<9&4294967295|y>>>23),y=T+(g^v&(A^g))+E[7]+1735328473&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^g&(T^A))+E[12]+2368359562&4294967295,v=T+(y<<20&4294967295|y>>>12),y=g+(v^T^A)+E[5]+4294588738&4294967295,g=v+(y<<4&4294967295|y>>>28),y=A+(g^v^T)+E[8]+2272392833&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^v)+E[11]+1839030562&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^g)+E[14]+4259657740&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^A)+E[1]+2763975236&4294967295,g=v+(y<<4&4294967295|y>>>28),y=A+(g^v^T)+E[4]+1272893353&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^v)+E[7]+4139469664&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^g)+E[10]+3200236656&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^A)+E[13]+681279174&4294967295,g=v+(y<<4&4294967295|y>>>28),y=A+(g^v^T)+E[0]+3936430074&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^v)+E[3]+3572445317&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^g)+E[6]+76029189&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(v^T^A)+E[9]+3654602809&4294967295,g=v+(y<<4&4294967295|y>>>28),y=A+(g^v^T)+E[12]+3873151461&4294967295,A=g+(y<<11&4294967295|y>>>21),y=T+(A^g^v)+E[15]+530742520&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^g)+E[2]+3299628645&4294967295,v=T+(y<<23&4294967295|y>>>9),y=g+(T^(v|~A))+E[0]+4096336452&4294967295,g=v+(y<<6&4294967295|y>>>26),y=A+(v^(g|~T))+E[7]+1126891415&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~v))+E[14]+2878612391&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~g))+E[5]+4237533241&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~A))+E[12]+1700485571&4294967295,g=v+(y<<6&4294967295|y>>>26),y=A+(v^(g|~T))+E[3]+2399980690&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~v))+E[10]+4293915773&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~g))+E[1]+2240044497&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~A))+E[8]+1873313359&4294967295,g=v+(y<<6&4294967295|y>>>26),y=A+(v^(g|~T))+E[15]+4264355552&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~v))+E[6]+2734768916&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~g))+E[13]+1309151649&4294967295,v=T+(y<<21&4294967295|y>>>11),y=g+(T^(v|~A))+E[4]+4149444226&4294967295,g=v+(y<<6&4294967295|y>>>26),y=A+(v^(g|~T))+E[11]+3174756917&4294967295,A=g+(y<<10&4294967295|y>>>22),y=T+(g^(A|~v))+E[2]+718787259&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~g))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+A&4294967295}i.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var v=g-this.blockSize,E=this.B,T=this.h,A=0;A<g;){if(T==0)for(;A<=v;)s(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<g;)if(E[T++]=I.charCodeAt(A++),T==this.blockSize){s(this,E),T=0;break}}else for(;A<g;)if(E[T++]=I[A++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=g},i.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var v=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=v&255,v/=256;for(this.u(I),I=Array(16),g=v=0;4>g;++g)for(var E=0;32>E;E+=8)I[v++]=this.g[g]>>>E&255;return I};function r(I,g){var v=l;return Object.prototype.hasOwnProperty.call(v,I)?v[I]:v[I]=g(I)}function o(I,g){this.h=g;for(var v=[],E=!0,T=I.length-1;0<=T;T--){var A=I[T]|0;E&&A==g||(v[T]=A,E=!1)}this.g=v}var l={};function c(I){return-128<=I&&128>I?r(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return k(h(-I));for(var g=[],v=1,E=0;I>=v;E++)g[E]=I/v|0,v*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return k(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),E=p,T=0;T<I.length;T+=8){var A=Math.min(8,I.length-T),y=parseInt(I.substring(T,T+A),g);8>A?(A=h(Math.pow(g,A)),E=E.j(A).add(h(y))):(E=E.j(v),E=E.add(h(y)))}return E}var p=c(0),m=c(1),w=c(16777216);n=o.prototype,n.m=function(){if(N(this))return-k(this).m();for(var I=0,g=1,v=0;v<this.g.length;v++){var E=this.i(v);I+=(0<=E?E:4294967296+E)*g,g*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(S(this))return"0";if(N(this))return"-"+k(this).toString(I);for(var g=h(Math.pow(I,6)),v=this,E="";;){var T=le(v,g).g;v=W(v,T.j(g));var A=((0<v.g.length?v.g[0]:v.h)>>>0).toString(I);if(v=T,S(v))return A+E;for(;6>A.length;)A="0"+A;E=A+E}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function S(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function N(I){return I.h==-1}n.l=function(I){return I=W(this,I),N(I)?-1:S(I)?0:1};function k(I){for(var g=I.g.length,v=[],E=0;E<g;E++)v[E]=~I.g[E];return new o(v,~I.h).add(m)}n.abs=function(){return N(this)?k(this):this},n.add=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0,T=0;T<=g;T++){var A=E+(this.i(T)&65535)+(I.i(T)&65535),y=(A>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);E=y>>>16,A&=65535,y&=65535,v[T]=y<<16|A}return new o(v,v[v.length-1]&-2147483648?-1:0)};function W(I,g){return I.add(k(g))}n.j=function(I){if(S(this)||S(I))return p;if(N(this))return N(I)?k(this).j(k(I)):k(k(this).j(I));if(N(I))return k(this.j(k(I)));if(0>this.l(w)&&0>I.l(w))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,v=[],E=0;E<2*g;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<I.g.length;T++){var A=this.i(E)>>>16,y=this.i(E)&65535,dt=I.i(T)>>>16,gi=I.i(T)&65535;v[2*E+2*T]+=y*gi,z(v,2*E+2*T),v[2*E+2*T+1]+=A*gi,z(v,2*E+2*T+1),v[2*E+2*T+1]+=y*dt,z(v,2*E+2*T+1),v[2*E+2*T+2]+=A*dt,z(v,2*E+2*T+2)}for(E=0;E<g;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=g;E<2*g;E++)v[E]=0;return new o(v,0)};function z(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function Q(I,g){this.g=I,this.h=g}function le(I,g){if(S(g))throw Error("division by zero");if(S(I))return new Q(p,p);if(N(I))return g=le(k(I),g),new Q(k(g.g),k(g.h));if(N(g))return g=le(I,k(g)),new Q(k(g.g),g.h);if(30<I.g.length){if(N(I)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var v=m,E=g;0>=E.l(I);)v=ze(v),E=ze(E);var T=de(v,1),A=de(E,1);for(E=de(E,2),v=de(v,2);!S(E);){var y=A.add(E);0>=y.l(I)&&(T=T.add(v),A=y),E=de(E,1),v=de(v,1)}return g=W(I,T.j(g)),new Q(T,g)}for(T=p;0<=I.l(g);){for(v=Math.max(1,Math.floor(I.m()/g.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),A=h(v),y=A.j(g);N(y)||0<y.l(I);)v-=E,A=h(v),y=A.j(g);S(A)&&(A=m),T=T.add(A),I=W(I,y)}return new Q(T,I)}n.A=function(I){return le(this,I).h},n.and=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)&I.i(E);return new o(v,this.h&I.h)},n.or=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)|I.i(E);return new o(v,this.h|I.h)},n.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)^I.i(E);return new o(v,this.h^I.h)};function ze(I){for(var g=I.g.length+1,v=[],E=0;E<g;E++)v[E]=I.i(E)<<1|I.i(E-1)>>>31;return new o(v,I.h)}function de(I,g){var v=g>>5;g%=32;for(var E=I.g.length-v,T=[],A=0;A<E;A++)T[A]=0<g?I.i(A+v)>>>g|I.i(A+v+1)<<32-g:I.i(A+v);return new o(T,I.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,Bf=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,fn=o}).apply(typeof wh<"u"?wh:typeof self<"u"?self:typeof window<"u"?window:{});var ar=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qf,ji,Wf,gr,Ua,jf,$f,Hf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ar=="object"&&ar];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var i=t(this);function s(a,u){if(u)e:{var d=i;a=a.split(".");for(var _=0;_<a.length-1;_++){var C=a[_];if(!(C in d))break e;d=d[C]}a=a[a.length-1],_=d[a],u=u(_),u!=_&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function r(a,u){a instanceof String&&(a+="");var d=0,_=!1,C={next:function(){if(!_&&d<a.length){var R=d++;return{value:u(R,a[R]),done:!1}}return _=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(a){return a||function(){return r(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function f(a,u,d){return a.call.apply(a.bind,arguments)}function p(a,u,d){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,_),a.apply(u,C)}}return function(){return a.apply(u,arguments)}}function m(a,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function w(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function S(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(_,C,R){for(var O=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)O[ne-2]=arguments[ne];return u.prototype[C].apply(_,O)}}function N(a){const u=a.length;if(0<u){const d=Array(u);for(let _=0;_<u;_++)d[_]=a[_];return d}return[]}function k(a,u){for(let d=1;d<arguments.length;d++){const _=arguments[d];if(c(_)){const C=a.length||0,R=_.length||0;a.length=C+R;for(let O=0;O<R;O++)a[C+O]=_[O]}else a.push(_)}}class W{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function z(a){return/^[\s\xa0]*$/.test(a)}function Q(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function le(a){return le[" "](a),a}le[" "]=function(){};var ze=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function de(a,u,d){for(const _ in a)u.call(d,a[_],_,a)}function I(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function g(a){const u={};for(const d in a)u[d]=a[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,u){let d,_;for(let C=1;C<arguments.length;C++){_=arguments[C];for(d in _)a[d]=_[d];for(let R=0;R<v.length;R++)d=v[R],Object.prototype.hasOwnProperty.call(_,d)&&(a[d]=_[d])}}function T(a){var u=1;a=a.split(":");const d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function A(a){l.setTimeout(()=>{throw a},0)}function y(){var a=Bo;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class dt{constructor(){this.h=this.g=null}add(u,d){const _=gi.get();_.set(u,d),this.h?this.h.next=_:this.g=_,this.h=_}}var gi=new W(()=>new gm,a=>a.reset());class gm{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let yi,vi=!1,Bo=new dt,zc=()=>{const a=l.Promise.resolve(void 0);yi=()=>{a.then(ym)}};var ym=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){A(d)}var u=gi;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}vi=!1};function Ot(){this.s=this.s,this.C=this.C}Ot.prototype.s=!1,Ot.prototype.ma=function(){this.s||(this.s=!0,this.N())},Ot.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function be(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}be.prototype.h=function(){this.defaultPrevented=!0};var vm=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return a}();function Ei(a,u){if(be.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(ze){e:{try{le(u.nodeName);var C=!0;break e}catch{}C=!1}C||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Em[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ei.aa.h.call(this)}}S(Ei,be);var Em={2:"touch",3:"pen",4:"mouse"};Ei.prototype.h=function(){Ei.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var qs="closure_listenable_"+(1e6*Math.random()|0),Im=0;function Tm(a,u,d,_,C){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!_,this.ha=C,this.key=++Im,this.da=this.fa=!1}function Ws(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function js(a){this.src=a,this.g={},this.h=0}js.prototype.add=function(a,u,d,_,C){var R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);var O=Wo(a,u,_,C);return-1<O?(u=a[O],d||(u.fa=!1)):(u=new Tm(u,this.src,R,!!_,C),u.fa=d,a.push(u)),u};function qo(a,u){var d=u.type;if(d in a.g){var _=a.g[d],C=Array.prototype.indexOf.call(_,u,void 0),R;(R=0<=C)&&Array.prototype.splice.call(_,C,1),R&&(Ws(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Wo(a,u,d,_){for(var C=0;C<a.length;++C){var R=a[C];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==_)return C}return-1}var jo="closure_lm_"+(1e6*Math.random()|0),$o={};function Gc(a,u,d,_,C){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Gc(a,u[R],d,_,C);return null}return d=Yc(d),a&&a[qs]?a.K(u,d,h(_)?!!_.capture:!1,C):wm(a,u,d,!1,_,C)}function wm(a,u,d,_,C,R){if(!u)throw Error("Invalid event type");var O=h(C)?!!C.capture:!!C,ne=zo(a);if(ne||(a[jo]=ne=new js(a)),d=ne.add(u,d,_,O,R),d.proxy)return d;if(_=Cm(),d.proxy=_,_.src=a,_.listener=d,a.addEventListener)vm||(C=O),C===void 0&&(C=!1),a.addEventListener(u.toString(),_,C);else if(a.attachEvent)a.attachEvent(Qc(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Cm(){function a(d){return u.call(a.src,a.listener,d)}const u=Am;return a}function Kc(a,u,d,_,C){if(Array.isArray(u))for(var R=0;R<u.length;R++)Kc(a,u[R],d,_,C);else _=h(_)?!!_.capture:!!_,d=Yc(d),a&&a[qs]?(a=a.i,u=String(u).toString(),u in a.g&&(R=a.g[u],d=Wo(R,d,_,C),-1<d&&(Ws(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete a.g[u],a.h--)))):a&&(a=zo(a))&&(u=a.g[u.toString()],a=-1,u&&(a=Wo(u,d,_,C)),(d=-1<a?u[a]:null)&&Ho(d))}function Ho(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[qs])qo(u.i,a);else{var d=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(d,_,a.capture):u.detachEvent?u.detachEvent(Qc(d),_):u.addListener&&u.removeListener&&u.removeListener(_),(d=zo(u))?(qo(d,a),d.h==0&&(d.src=null,u[jo]=null)):Ws(a)}}}function Qc(a){return a in $o?$o[a]:$o[a]="on"+a}function Am(a,u){if(a.da)a=!0;else{u=new Ei(u,this);var d=a.listener,_=a.ha||a.src;a.fa&&Ho(a),a=d.call(_,u)}return a}function zo(a){return a=a[jo],a instanceof js?a:null}var Go="__closure_events_fn_"+(1e9*Math.random()>>>0);function Yc(a){return typeof a=="function"?a:(a[Go]||(a[Go]=function(u){return a.handleEvent(u)}),a[Go])}function ke(){Ot.call(this),this.i=new js(this),this.M=this,this.F=null}S(ke,Ot),ke.prototype[qs]=!0,ke.prototype.removeEventListener=function(a,u,d,_){Kc(this,a,u,d,_)};function xe(a,u){var d,_=a.F;if(_)for(d=[];_;_=_.F)d.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new be(u,a);else if(u instanceof be)u.target=u.target||a;else{var C=u;u=new be(_,a),E(u,C)}if(C=!0,d)for(var R=d.length-1;0<=R;R--){var O=u.g=d[R];C=$s(O,_,!0,u)&&C}if(O=u.g=a,C=$s(O,_,!0,u)&&C,C=$s(O,_,!1,u)&&C,d)for(R=0;R<d.length;R++)O=u.g=d[R],C=$s(O,_,!1,u)&&C}ke.prototype.N=function(){if(ke.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],_=0;_<d.length;_++)Ws(d[_]);delete a.g[u],a.h--}}this.F=null},ke.prototype.K=function(a,u,d,_){return this.i.add(String(a),u,!1,d,_)},ke.prototype.L=function(a,u,d,_){return this.i.add(String(a),u,!0,d,_)};function $s(a,u,d,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var C=!0,R=0;R<u.length;++R){var O=u[R];if(O&&!O.da&&O.capture==d){var ne=O.listener,we=O.ha||O.src;O.fa&&qo(a.i,O),C=ne.call(we,_)!==!1&&C}}return C&&!_.defaultPrevented}function Jc(a,u,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function Xc(a){a.g=Jc(()=>{a.g=null,a.i&&(a.i=!1,Xc(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Rm extends Ot{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Xc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ii(a){Ot.call(this),this.h=a,this.g={}}S(Ii,Ot);var Zc=[];function eu(a){de(a.g,function(u,d){this.g.hasOwnProperty(d)&&Ho(u)},a),a.g={}}Ii.prototype.N=function(){Ii.aa.N.call(this),eu(this)},Ii.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ko=l.JSON.stringify,Sm=l.JSON.parse,Pm=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Qo(){}Qo.prototype.h=null;function tu(a){return a.h||(a.h=a.i())}function nu(){}var Ti={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Yo(){be.call(this,"d")}S(Yo,be);function Jo(){be.call(this,"c")}S(Jo,be);var rn={},iu=null;function Hs(){return iu=iu||new ke}rn.La="serverreachability";function su(a){be.call(this,rn.La,a)}S(su,be);function wi(a){const u=Hs();xe(u,new su(u))}rn.STAT_EVENT="statevent";function ru(a,u){be.call(this,rn.STAT_EVENT,a),this.stat=u}S(ru,be);function Fe(a){const u=Hs();xe(u,new ru(u,a))}rn.Ma="timingevent";function ou(a,u){be.call(this,rn.Ma,a),this.size=u}S(ou,be);function Ci(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function Ai(){this.g=!0}Ai.prototype.xa=function(){this.g=!1};function bm(a,u,d,_,C,R){a.info(function(){if(a.g)if(R)for(var O="",ne=R.split("&"),we=0;we<ne.length;we++){var J=ne[we].split("=");if(1<J.length){var Ne=J[0];J=J[1];var De=Ne.split("_");O=2<=De.length&&De[1]=="type"?O+(Ne+"="+J+"&"):O+(Ne+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+_+") [attempt "+C+"]: "+u+`
`+d+`
`+O})}function km(a,u,d,_,C,R,O){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+C+"]: "+u+`
`+d+`
`+R+" "+O})}function Nn(a,u,d,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Dm(a,d)+(_?" "+_:"")})}function Nm(a,u){a.info(function(){return"TIMEOUT: "+u})}Ai.prototype.info=function(){};function Dm(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var _=d[a];if(!(2>_.length)){var C=_[1];if(Array.isArray(C)&&!(1>C.length)){var R=C[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<C.length;O++)C[O]=""}}}}return Ko(d)}catch{return u}}var zs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},au={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Xo;function Gs(){}S(Gs,Qo),Gs.prototype.g=function(){return new XMLHttpRequest},Gs.prototype.i=function(){return{}},Xo=new Gs;function Mt(a,u,d,_){this.j=a,this.i=u,this.l=d,this.R=_||1,this.U=new Ii(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new lu}function lu(){this.i=null,this.g="",this.h=!1}var cu={},Zo={};function ea(a,u,d){a.L=1,a.v=Js(ft(u)),a.m=d,a.P=!0,uu(a,null)}function uu(a,u){a.F=Date.now(),Ks(a),a.A=ft(a.v);var d=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Cu(d.i,"t",_),a.C=0,d=a.j.J,a.h=new lu,a.g=Wu(a.j,d?u:null,!a.m),0<a.O&&(a.M=new Rm(m(a.Y,a,a.g),a.O)),u=a.U,d=a.g,_=a.ca;var C="readystatechange";Array.isArray(C)||(C&&(Zc[0]=C.toString()),C=Zc);for(var R=0;R<C.length;R++){var O=Gc(d,C[R],_||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),wi(),bm(a.i,a.u,a.A,a.l,a.R,a.m)}Mt.prototype.ca=function(a){a=a.target;const u=this.M;u&&pt(a)==3?u.j():this.Y(a)},Mt.prototype.Y=function(a){try{if(a==this.g)e:{const De=pt(this.g);var u=this.g.Ba();const Mn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||Nu(this.g)))){this.J||De!=4||u==7||(u==8||0>=Mn?wi(3):wi(2)),ta(this);var d=this.g.Z();this.X=d;t:if(hu(this)){var _=Nu(this.g);a="";var C=_.length,R=pt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){on(this),Ri(this);var O="";break t}this.h.i=new l.TextDecoder}for(u=0;u<C;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(R&&u==C-1)});_.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,km(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,we=this.g;if((ne=we.g?we.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(ne)){var J=ne;break t}}J=null}if(d=J)Nn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,na(this,d);else{this.o=!1,this.s=3,Fe(12),on(this),Ri(this);break e}}if(this.P){d=!0;let Qe;for(;!this.J&&this.C<O.length;)if(Qe=Om(this,O),Qe==Zo){De==4&&(this.s=4,Fe(14),d=!1),Nn(this.i,this.l,null,"[Incomplete Response]");break}else if(Qe==cu){this.s=4,Fe(15),Nn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Nn(this.i,this.l,Qe,null),na(this,Qe);if(hu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||O.length!=0||this.h.h||(this.s=1,Fe(16),d=!1),this.o=this.o&&d,!d)Nn(this.i,this.l,O,"[Invalid Chunked Response]"),on(this),Ri(this);else if(0<O.length&&!this.W){this.W=!0;var Ne=this.j;Ne.g==this&&Ne.ba&&!Ne.M&&(Ne.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),la(Ne),Ne.M=!0,Fe(11))}}else Nn(this.i,this.l,O,null),na(this,O);De==4&&on(this),this.o&&!this.J&&(De==4?Fu(this.j,this):(this.o=!1,Ks(this)))}else Ym(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),on(this),Ri(this)}}}catch{}finally{}};function hu(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Om(a,u){var d=a.C,_=u.indexOf(`
`,d);return _==-1?Zo:(d=Number(u.substring(d,_)),isNaN(d)?cu:(_+=1,_+d>u.length?Zo:(u=u.slice(_,_+d),a.C=_+d,u)))}Mt.prototype.cancel=function(){this.J=!0,on(this)};function Ks(a){a.S=Date.now()+a.I,du(a,a.I)}function du(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ci(m(a.ba,a),u)}function ta(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Mt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Nm(this.i,this.A),this.L!=2&&(wi(),Fe(17)),on(this),this.s=2,Ri(this)):du(this,this.S-a)};function Ri(a){a.j.G==0||a.J||Fu(a.j,a)}function on(a){ta(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,eu(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function na(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||ia(d.h,a))){if(!a.K&&ia(d.h,a)&&d.G==3){try{var _=d.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var C=_;if(C[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)ir(d),tr(d);else break e;aa(d),Fe(18)}}else d.za=C[1],0<d.za-d.T&&37500>C[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ci(m(d.Za,d),6e3));if(1>=_u(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else ln(d,11)}else if((a.K||d.g==a)&&ir(d),!z(u))for(C=d.Da.g.parse(u),u=0;u<C.length;u++){let J=C[u];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const Ne=J[3];Ne!=null&&(d.la=Ne,d.j.info("VER="+d.la));const De=J[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const Mn=J[5];Mn!=null&&typeof Mn=="number"&&0<Mn&&(_=1.5*Mn,d.L=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const Qe=a.g;if(Qe){const rr=Qe.g?Qe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(rr){var R=_.h;R.g||rr.indexOf("spdy")==-1&&rr.indexOf("quic")==-1&&rr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(sa(R,R.h),R.h=null))}if(_.D){const ca=Qe.g?Qe.g.getResponseHeader("X-HTTP-Session-Id"):null;ca&&(_.ya=ca,re(_.I,_.D,ca))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),_=d;var O=a;if(_.qa=qu(_,_.J?_.ia:null,_.W),O.K){mu(_.h,O);var ne=O,we=_.L;we&&(ne.I=we),ne.B&&(ta(ne),Ks(ne)),_.g=O}else Lu(_);0<d.i.length&&nr(d)}else J[0]!="stop"&&J[0]!="close"||ln(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?ln(d,7):oa(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}wi(4)}catch{}}var Mm=class{constructor(a,u){this.g=a,this.map=u}};function fu(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function pu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function _u(a){return a.h?1:a.g?a.g.size:0}function ia(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function sa(a,u){a.g?a.g.add(u):a.h=u}function mu(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}fu.prototype.cancel=function(){if(this.i=gu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function gu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.D);return u}return N(a.i)}function Vm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],d=a.length,_=0;_<d;_++)u.push(a[_]);return u}u=[],d=0;for(_ in a)u[d++]=a[_];return u}function Lm(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(const _ in a)u[d++]=_;return u}}}function yu(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=Lm(a),_=Vm(a),C=_.length,R=0;R<C;R++)u.call(void 0,_[R],d&&d[R],a)}var vu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function xm(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var _=a[d].indexOf("="),C=null;if(0<=_){var R=a[d].substring(0,_);C=a[d].substring(_+1)}else R=a[d];u(R,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function an(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof an){this.h=a.h,Qs(this,a.j),this.o=a.o,this.g=a.g,Ys(this,a.s),this.l=a.l;var u=a.i,d=new bi;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),Eu(this,d),this.m=a.m}else a&&(u=String(a).match(vu))?(this.h=!1,Qs(this,u[1]||"",!0),this.o=Si(u[2]||""),this.g=Si(u[3]||"",!0),Ys(this,u[4]),this.l=Si(u[5]||"",!0),Eu(this,u[6]||"",!0),this.m=Si(u[7]||"")):(this.h=!1,this.i=new bi(null,this.h))}an.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Pi(u,Iu,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Pi(u,Iu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Pi(d,d.charAt(0)=="/"?Bm:Um,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Pi(d,Wm)),a.join("")};function ft(a){return new an(a)}function Qs(a,u,d){a.j=d?Si(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Ys(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function Eu(a,u,d){u instanceof bi?(a.i=u,jm(a.i,a.h)):(d||(u=Pi(u,qm)),a.i=new bi(u,a.h))}function re(a,u,d){a.i.set(u,d)}function Js(a){return re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Si(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Pi(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,Fm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Fm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Iu=/[#\/\?@]/g,Um=/[#\?:]/g,Bm=/[#\?]/g,qm=/[#\?@]/g,Wm=/#/g;function bi(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Vt(a){a.g||(a.g=new Map,a.h=0,a.i&&xm(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=bi.prototype,n.add=function(a,u){Vt(this),this.i=null,a=Dn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function Tu(a,u){Vt(a),u=Dn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function wu(a,u){return Vt(a),u=Dn(a,u),a.g.has(u)}n.forEach=function(a,u){Vt(this),this.g.forEach(function(d,_){d.forEach(function(C){a.call(u,C,_,this)},this)},this)},n.na=function(){Vt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let _=0;_<u.length;_++){const C=a[_];for(let R=0;R<C.length;R++)d.push(u[_])}return d},n.V=function(a){Vt(this);let u=[];if(typeof a=="string")wu(this,a)&&(u=u.concat(this.g.get(Dn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return Vt(this),this.i=null,a=Dn(this,a),wu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function Cu(a,u,d){Tu(a,u),0<d.length&&(a.i=null,a.g.set(Dn(a,u),N(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var _=u[d];const R=encodeURIComponent(String(_)),O=this.V(_);for(_=0;_<O.length;_++){var C=R;O[_]!==""&&(C+="="+encodeURIComponent(String(O[_]))),a.push(C)}}return this.i=a.join("&")};function Dn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function jm(a,u){u&&!a.j&&(Vt(a),a.i=null,a.g.forEach(function(d,_){var C=_.toLowerCase();_!=C&&(Tu(this,_),Cu(this,C,d))},a)),a.j=u}function $m(a,u){const d=new Ai;if(l.Image){const _=new Image;_.onload=w(Lt,d,"TestLoadImage: loaded",!0,u,_),_.onerror=w(Lt,d,"TestLoadImage: error",!1,u,_),_.onabort=w(Lt,d,"TestLoadImage: abort",!1,u,_),_.ontimeout=w(Lt,d,"TestLoadImage: timeout",!1,u,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function Hm(a,u){const d=new Ai,_=new AbortController,C=setTimeout(()=>{_.abort(),Lt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(R=>{clearTimeout(C),R.ok?Lt(d,"TestPingServer: ok",!0,u):Lt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(C),Lt(d,"TestPingServer: error",!1,u)})}function Lt(a,u,d,_,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),_(d)}catch{}}function zm(){this.g=new Pm}function Gm(a,u,d){const _=d||"";try{yu(a,function(C,R){let O=C;h(C)&&(O=Ko(C)),u.push(_+R+"="+encodeURIComponent(O))})}catch(C){throw u.push(_+"type="+encodeURIComponent("_badmap")),C}}function Xs(a){this.l=a.Ub||null,this.j=a.eb||!1}S(Xs,Qo),Xs.prototype.g=function(){return new Zs(this.l,this.j)},Xs.prototype.i=function(a){return function(){return a}}({});function Zs(a,u){ke.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Zs,ke),n=Zs.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Ni(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ki(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ni(this)),this.g&&(this.readyState=3,Ni(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Au(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Au(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?ki(this):Ni(this),this.readyState==3&&Au(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,ki(this))},n.Qa=function(a){this.g&&(this.response=a,ki(this))},n.ga=function(){this.g&&ki(this)};function ki(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ni(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function Ni(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Zs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Ru(a){let u="";return de(a,function(d,_){u+=_,u+=":",u+=d,u+=`\r
`}),u}function ra(a,u,d){e:{for(_ in d){var _=!1;break e}_=!0}_||(d=Ru(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):re(a,u,d))}function ce(a){ke.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(ce,ke);var Km=/^https?$/i,Qm=["POST","PUT"];n=ce.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Xo.g(),this.v=this.o?tu(this.o):tu(Xo),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(R){Su(this,R);return}if(a=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var C in _)d.set(C,_[C]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const R of _.keys())d.set(R,_.get(R));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),C=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Qm,u,void 0))||_||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ku(this),this.u=!0,this.g.send(a),this.u=!1}catch(R){Su(this,R)}};function Su(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Pu(a),er(a)}function Pu(a){a.A||(a.A=!0,xe(a,"complete"),xe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,xe(this,"complete"),xe(this,"abort"),er(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),er(this,!0)),ce.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?bu(this):this.bb())},n.bb=function(){bu(this)};function bu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||pt(a)!=4||a.Z()!=2)){if(a.u&&pt(a)==4)Jc(a.Ea,0,a);else if(xe(a,"readystatechange"),pt(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var _;if(_=O===0){var C=String(a.D).match(vu)[1]||null;!C&&l.self&&l.self.location&&(C=l.self.location.protocol.slice(0,-1)),_=!Km.test(C?C.toLowerCase():"")}d=_}if(d)xe(a,"complete"),xe(a,"success");else{a.m=6;try{var R=2<pt(a)?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.Z()+"]",Pu(a)}}finally{er(a)}}}}function er(a,u){if(a.g){ku(a);const d=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||xe(a,"ready");try{d.onreadystatechange=_}catch{}}}function ku(a){a.I&&(l.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function pt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<pt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Sm(u)}};function Nu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Ym(a){const u={};a=(a.g&&2<=pt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(z(a[_]))continue;var d=T(a[_]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[C]||[];u[C]=R,R.push(d)}I(u,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Di(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function Du(a){this.Aa=0,this.i=[],this.j=new Ai,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Di("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Di("baseRetryDelayMs",5e3,a),this.cb=Di("retryDelaySeedMs",1e4,a),this.Wa=Di("forwardChannelMaxRetries",2,a),this.wa=Di("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new fu(a&&a.concurrentRequestLimit),this.Da=new zm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Du.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,_){Fe(0),this.W=a,this.H=u||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.I=qu(this,null,this.W),nr(this)};function oa(a){if(Ou(a),a.G==3){var u=a.U++,d=ft(a.I);if(re(d,"SID",a.K),re(d,"RID",u),re(d,"TYPE","terminate"),Oi(a,d),u=new Mt(a,a.j,u),u.L=2,u.v=Js(ft(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=Wu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ks(u)}Bu(a)}function tr(a){a.g&&(la(a),a.g.cancel(),a.g=null)}function Ou(a){tr(a),a.u&&(l.clearTimeout(a.u),a.u=null),ir(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function nr(a){if(!pu(a.h)&&!a.s){a.s=!0;var u=a.Ga;yi||zc(),vi||(yi(),vi=!0),Bo.add(u,a),a.B=0}}function Jm(a,u){return _u(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ci(m(a.Ga,a,u),Uu(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const C=new Mt(this,this.j,a);let R=this.o;if(this.S&&(R?(R=g(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(C.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Vu(this,C,u),d=ft(this.I),re(d,"RID",a),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),Oi(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(Ru(R)))+"&"+u:this.m&&ra(d,this.m,R)),sa(this.h,C),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",u),re(d,"SID","null"),C.T=!0,ea(C,d,null)):ea(C,d,u),this.G=2}}else this.G==3&&(a?Mu(this,a):this.i.length==0||pu(this.h)||Mu(this))};function Mu(a,u){var d;u?d=u.l:d=a.U++;const _=ft(a.I);re(_,"SID",a.K),re(_,"RID",d),re(_,"AID",a.T),Oi(a,_),a.m&&a.o&&ra(_,a.m,a.o),d=new Mt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Vu(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),sa(a.h,d),ea(d,_,u)}function Oi(a,u){a.H&&de(a.H,function(d,_){re(u,_,d)}),a.l&&yu({},function(d,_){re(u,_,d)})}function Vu(a,u,d){d=Math.min(a.i.length,d);var _=a.l?m(a.l.Na,a.l,a):null;e:{var C=a.i;let R=-1;for(;;){const O=["count="+d];R==-1?0<d?(R=C[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ne=!0;for(let we=0;we<d;we++){let J=C[we].g;const Ne=C[we].map;if(J-=R,0>J)R=Math.max(0,C[we].g-100),ne=!1;else try{Gm(Ne,O,"req"+J+"_")}catch{_&&_(Ne)}}if(ne){_=O.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,_}function Lu(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;yi||zc(),vi||(yi(),vi=!0),Bo.add(u,a),a.v=0}}function aa(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ci(m(a.Fa,a),Uu(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,xu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ci(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),tr(this),xu(this))};function la(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function xu(a){a.g=new Mt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=ft(a.qa);re(u,"RID","rpc"),re(u,"SID",a.K),re(u,"AID",a.T),re(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&re(u,"TO",a.ja),re(u,"TYPE","xmlhttp"),Oi(a,u),a.m&&a.o&&ra(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Js(ft(u)),d.m=null,d.P=!0,uu(d,a)}n.Za=function(){this.C!=null&&(this.C=null,tr(this),aa(this),Fe(19))};function ir(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Fu(a,u){var d=null;if(a.g==u){ir(a),la(a),a.g=null;var _=2}else if(ia(a.h,u))d=u.D,mu(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var C=a.B;_=Hs(),xe(_,new ou(_,d)),nr(a)}else Lu(a);else if(C=u.s,C==3||C==0&&0<u.X||!(_==1&&Jm(a,u)||_==2&&aa(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),C){case 1:ln(a,5);break;case 4:ln(a,10);break;case 3:ln(a,6);break;default:ln(a,2)}}}function Uu(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function ln(a,u){if(a.j.info("Error code "+u),u==2){var d=m(a.fb,a),_=a.Xa;const C=!_;_=new an(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Qs(_,"https"),Js(_),C?$m(_.toString(),d):Hm(_.toString(),d)}else Fe(2);a.G=0,a.l&&a.l.sa(u),Bu(a),Ou(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function Bu(a){if(a.G=0,a.ka=[],a.l){const u=gu(a.h);(u.length!=0||a.i.length!=0)&&(k(a.ka,u),k(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function qu(a,u,d){var _=d instanceof an?ft(d):new an(d);if(_.g!="")u&&(_.g=u+"."+_.g),Ys(_,_.s);else{var C=l.location;_=C.protocol,u=u?u+"."+C.hostname:C.hostname,C=+C.port;var R=new an(null);_&&Qs(R,_),u&&(R.g=u),C&&Ys(R,C),d&&(R.l=d),_=R}return d=a.D,u=a.ya,d&&u&&re(_,d,u),re(_,"VER",a.la),Oi(a,_),_}function Wu(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new ce(new Xs({eb:d})):new ce(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ju(){}n=ju.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function sr(){}sr.prototype.g=function(a,u){return new $e(a,u)};function $e(a,u){ke.call(this),this.g=new Du(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!z(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!z(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new On(this)}S($e,ke),$e.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},$e.prototype.close=function(){oa(this.g)},$e.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ko(a),a=d);u.i.push(new Mm(u.Ya++,a)),u.G==3&&nr(u)},$e.prototype.N=function(){this.g.l=null,delete this.j,oa(this.g),delete this.g,$e.aa.N.call(this)};function $u(a){Yo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}S($u,Yo);function Hu(){Jo.call(this),this.status=1}S(Hu,Jo);function On(a){this.g=a}S(On,ju),On.prototype.ua=function(){xe(this.g,"a")},On.prototype.ta=function(a){xe(this.g,new $u(a))},On.prototype.sa=function(a){xe(this.g,new Hu)},On.prototype.ra=function(){xe(this.g,"b")},sr.prototype.createWebChannel=sr.prototype.g,$e.prototype.send=$e.prototype.o,$e.prototype.open=$e.prototype.m,$e.prototype.close=$e.prototype.close,Hf=function(){return new sr},$f=function(){return Hs()},jf=rn,Ua={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},zs.NO_ERROR=0,zs.TIMEOUT=8,zs.HTTP_ERROR=6,gr=zs,au.COMPLETE="complete",Wf=au,nu.EventType=Ti,Ti.OPEN="a",Ti.CLOSE="b",Ti.ERROR="c",Ti.MESSAGE="d",ke.prototype.listen=ke.prototype.K,ji=nu,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,qf=ce}).apply(typeof ar<"u"?ar:typeof self<"u"?self:typeof window<"u"?window:{});const Ch="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Me.UNAUTHENTICATED=new Me(null),Me.GOOGLE_CREDENTIALS=new Me("google-credentials-uid"),Me.FIRST_PARTY=new Me("first-party-uid"),Me.MOCK_USER=new Me("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new so("@firebase/firestore");function Mi(){return gn.logLevel}function M(n,...e){if(gn.logLevel<=G.DEBUG){const t=e.map(Nl);gn.debug(`Firestore (${hi}): ${n}`,...t)}}function Pt(n,...e){if(gn.logLevel<=G.ERROR){const t=e.map(Nl);gn.error(`Firestore (${hi}): ${n}`,...t)}}function Yn(n,...e){if(gn.logLevel<=G.WARN){const t=e.map(Nl);gn.warn(`Firestore (${hi}): ${n}`,...t)}}function Nl(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(n="Unexpected state"){const e=`FIRESTORE (${hi}) INTERNAL ASSERTION FAILED: `+n;throw Pt(e),new Error(e)}function ee(n,e){n||U()}function q(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class $E{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Me.UNAUTHENTICATED))}shutdown(){}}class HE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class zE{constructor(e){this.t=e,this.currentUser=Me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ee(this.o===void 0);let i=this.i;const s=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let r=new Ct;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Ct,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=r;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{M("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(M("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Ct)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(M("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ee(typeof i.accessToken=="string"),new zf(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ee(e===null||typeof e=="string"),new Me(e)}}class GE{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=Me.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class KE{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new GE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Me.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class QE{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class YE{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ee(this.o===void 0);const i=r=>{r.error!=null&&M("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.R;return this.R=r.token,M("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>i(r))};const s=r=>{M("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?s(r):M("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ee(typeof t.token=="string"),this.R=t.token,new QE(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let i="";for(;i.length<20;){const s=JE(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%e.length))}return i}}function X(n,e){return n<e?-1:n>e?1:0}function Jn(n,e,t){return n.length===e.length&&n.every((i,s)=>t(i,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor(1e6*(e-1e3*t));return new ge(t,i)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?X(this.nanoseconds,e.nanoseconds):X(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e){this.timestamp=e}static fromTimestamp(e){return new B(e)}static min(){return new B(new ge(0,0))}static max(){return new B(new ge(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e,t,i){t===void 0?t=0:t>e.length&&U(),i===void 0?i=e.length-t:i>e.length-t&&U(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return cs.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof cs?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const r=e.get(s),o=t.get(s);if(r<o)return-1;if(r>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ae extends cs{construct(e,t,i){return new ae(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new V(P.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new ae(t)}static emptyPath(){return new ae([])}}const XE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ae extends cs{construct(e,t,i){return new Ae(e,t,i)}static isValidIdentifier(e){return XE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ae.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ae(["__name__"])}static fromServerFormat(e){const t=[];let i="",s=0;const r=()=>{if(i.length===0)throw new V(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new V(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new V(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(i+=l,s++):(r(),s++)}if(r(),o)throw new V(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ae(t)}static emptyPath(){return new Ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(ae.fromString(e))}static fromName(e){return new L(ae.fromString(e).popFirst(5))}static empty(){return new L(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new ae(e.slice()))}}function ZE(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=B.fromTimestamp(i===1e9?new ge(t+1,0):new ge(t,i));return new Yt(s,L.empty(),e)}function eI(n){return new Yt(n.readTime,n.key,-1)}class Yt{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Yt(B.min(),L.empty(),-1)}static max(){return new Yt(B.max(),L.empty(),-1)}}function tI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:X(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class iI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==nI)throw n;M("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&U(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):b.reject(t)}static resolve(e){return new b((t,i)=>{t(e)})}static reject(e){return new b((t,i)=>{i(e)})}static waitFor(e){return new b((t,i)=>{let s=0,r=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++r,o&&r===s&&t()},c=>i(c))}),o=!0,r===s&&t()})}static or(e){let t=b.resolve(!1);for(const i of e)t=t.next(s=>s?b.resolve(s):i());return t}static forEach(e,t){const i=[];return e.forEach((s,r)=>{i.push(t.call(this,s,r))}),this.waitFor(i)}static mapArray(e,t){return new b((i,s)=>{const r=e.length,o=new Array(r);let l=0;for(let c=0;c<r;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++l,l===r&&i(o)},f=>s(f))}})}static doWhile(e,t){return new b((i,s)=>{const r=()=>{e()===!0?t().next(()=>{r()},s):i()};r()})}}function sI(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ks(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.ie(i),this.se=i=>t.writeSequenceNumber(i))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Dl.oe=-1;function co(n){return n==null}function Or(n){return n===0&&1/n==-1/0}function rI(n){return typeof n=="number"&&Number.isInteger(n)&&!Or(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Sn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Kf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _e=class Ba{constructor(e,t){this.comparator=e,this.root=t||zt.EMPTY}insert(e,t){return new Ba(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,zt.BLACK,null,null))}remove(e){return new Ba(this.comparator,this.root.remove(e,this.comparator).copy(null,null,zt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new lr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new lr(this.root,e,this.comparator,!1)}getReverseIterator(){return new lr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new lr(this.root,e,this.comparator,!0)}},lr=class{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},zt=class mt{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??mt.RED,this.left=s??mt.EMPTY,this.right=r??mt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new mt(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return mt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return mt.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,mt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,mt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw U();const e=this.left.check();if(e!==this.right.check())throw U();return e+(this.isRed()?0:1)}};zt.EMPTY=null,zt.RED=!0,zt.BLACK=!1;zt.EMPTY=new class{constructor(){this.size=0}get key(){throw U()}get value(){throw U()}get color(){throw U()}get left(){throw U()}get right(){throw U()}copy(e,t,i,s,r){return this}insert(e,t,i){return new zt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Rh(this.data.getIterator())}getIteratorFrom(e){return new Rh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof Re)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Re(this.comparator);return t.data=e,t}}class Rh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.fields=e,e.sort(Ae.comparator)}static empty(){return new He([])}unionWith(e){let t=new Re(Ae.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new He(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jn(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Qf("Invalid base64 string: "+r):r}}(e);return new Se(t)}static fromUint8Array(e){const t=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return X(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const oI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Jt(n){if(ee(!!n),typeof n=="string"){let e=0;const t=oI.exec(n);if(ee(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function yn(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ml(n){const e=n.mapValue.fields.__previous_value__;return Ol(e)?Ml(e):e}function us(n){const e=Jt(n.mapValue.fields.__local_write_time__.timestampValue);return new ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,t,i,s,r,o,l,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}class hs{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new hs("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof hs&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr={mapValue:{}};function vn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ol(n)?4:cI(n)?9007199254740991:lI(n)?10:11:U()}function ct(n,e){if(n===e)return!0;const t=vn(n);if(t!==vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return us(n).isEqual(us(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const o=Jt(s.timestampValue),l=Jt(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,r){return yn(s.bytesValue).isEqual(yn(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,r){return fe(s.geoPointValue.latitude)===fe(r.geoPointValue.latitude)&&fe(s.geoPointValue.longitude)===fe(r.geoPointValue.longitude)}(n,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return fe(s.integerValue)===fe(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const o=fe(s.doubleValue),l=fe(r.doubleValue);return o===l?Or(o)===Or(l):isNaN(o)&&isNaN(l)}return!1}(n,e);case 9:return Jn(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(s,r){const o=s.mapValue.fields||{},l=r.mapValue.fields||{};if(Ah(o)!==Ah(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!ct(o[c],l[c])))return!1;return!0}(n,e);default:return U()}}function ds(n,e){return(n.values||[]).find(t=>ct(t,e))!==void 0}function Xn(n,e){if(n===e)return 0;const t=vn(n),i=vn(e);if(t!==i)return X(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return X(n.booleanValue,e.booleanValue);case 2:return function(r,o){const l=fe(r.integerValue||r.doubleValue),c=fe(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return Sh(n.timestampValue,e.timestampValue);case 4:return Sh(us(n),us(e));case 5:return X(n.stringValue,e.stringValue);case 6:return function(r,o){const l=yn(r),c=yn(o);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=X(l[h],c[h]);if(f!==0)return f}return X(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const l=X(fe(r.latitude),fe(o.latitude));return l!==0?l:X(fe(r.longitude),fe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ph(n.arrayValue,e.arrayValue);case 10:return function(r,o){var l,c,h,f;const p=r.fields||{},m=o.fields||{},w=(l=p.value)===null||l===void 0?void 0:l.arrayValue,S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,N=X(((h=w==null?void 0:w.values)===null||h===void 0?void 0:h.length)||0,((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Ph(w,S)}(n.mapValue,e.mapValue);case 11:return function(r,o){if(r===cr.mapValue&&o===cr.mapValue)return 0;if(r===cr.mapValue)return 1;if(o===cr.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const m=X(c[p],f[p]);if(m!==0)return m;const w=Xn(l[c[p]],h[f[p]]);if(w!==0)return w}return X(c.length,f.length)}(n.mapValue,e.mapValue);default:throw U()}}function Sh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return X(n,e);const t=Jt(n),i=Jt(e),s=X(t.seconds,i.seconds);return s!==0?s:X(t.nanos,i.nanos)}function Ph(n,e){const t=n.values||[],i=e.values||[];for(let s=0;s<t.length&&s<i.length;++s){const r=Xn(t[s],i[s]);if(r)return r}return X(t.length,i.length)}function Zn(n){return qa(n)}function qa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=Jt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return yn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",s=!0;for(const r of t.values||[])s?s=!1:i+=",",i+=qa(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const o of i)r?r=!1:s+=",",s+=`${o}:${qa(t.fields[o])}`;return s+"}"}(n.mapValue):U()}function Wa(n){return!!n&&"integerValue"in n}function Vl(n){return!!n&&"arrayValue"in n}function bh(n){return!!n&&"nullValue"in n}function kh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function yr(n){return!!n&&"mapValue"in n}function lI(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Ki(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Sn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=Ki(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ki(n.arrayValue.values[t]);return e}return Object.assign({},n)}function cI(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!yr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ki(t)}setAll(e){let t=Ae.emptyPath(),i={},s=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,s),i={},s=[],t=l.popLast()}o?i[l.lastSegment()]=Ki(o):s.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){const t=this.field(e.popLast());yr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];yr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){Sn(t,(s,r)=>e[s]=r);for(const s of i)delete e[s]}clone(){return new qe(Ki(this.value))}}function Yf(n){const e=[];return Sn(n.fields,(t,i)=>{const s=new Ae([t]);if(yr(i)){const r=Yf(i.mapValue).fields;if(r.length===0)e.push(s);else for(const o of r)e.push(s.child(o))}else e.push(s)}),new He(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,t,i,s,r,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Ve(e,0,B.min(),B.min(),B.min(),qe.empty(),0)}static newFoundDocument(e,t,i,s){return new Ve(e,1,t,B.min(),i,s,0)}static newNoDocument(e,t){return new Ve(e,2,t,B.min(),B.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Ve(e,3,t,B.min(),B.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,t){this.position=e,this.inclusive=t}}function Nh(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){const r=e[s],o=n.position[s];if(r.field.isKeyField()?i=L.comparator(L.fromName(o.referenceValue),t.key):i=Xn(o,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function Dh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t="asc"){this.field=e,this.dir=t}}function uI(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jf{}class me extends Jf{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new dI(e,t,i):t==="array-contains"?new _I(e,i):t==="in"?new mI(e,i):t==="not-in"?new gI(e,i):t==="array-contains-any"?new yI(e,i):new me(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new fI(e,i):new pI(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Xn(t,this.value)):t!==null&&vn(this.value)===vn(t)&&this.matchesComparison(Xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return U()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ut extends Jf{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ut(e,t)}matches(e){return Xf(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Xf(n){return n.op==="and"}function Zf(n){return hI(n)&&Xf(n)}function hI(n){for(const e of n.filters)if(e instanceof ut)return!1;return!0}function ja(n){if(n instanceof me)return n.field.canonicalString()+n.op.toString()+Zn(n.value);if(Zf(n))return n.filters.map(e=>ja(e)).join(",");{const e=n.filters.map(t=>ja(t)).join(",");return`${n.op}(${e})`}}function ep(n,e){return n instanceof me?function(i,s){return s instanceof me&&i.op===s.op&&i.field.isEqual(s.field)&&ct(i.value,s.value)}(n,e):n instanceof ut?function(i,s){return s instanceof ut&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,o,l)=>r&&ep(o,s.filters[l]),!0):!1}(n,e):void U()}function tp(n){return n instanceof me?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(n):n instanceof ut?function(t){return t.op.toString()+" {"+t.getFilters().map(tp).join(" ,")+"}"}(n):"Filter"}class dI extends me{constructor(e,t,i){super(e,t,i),this.key=L.fromName(i.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class fI extends me{constructor(e,t){super(e,"in",t),this.keys=np("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class pI extends me{constructor(e,t){super(e,"not-in",t),this.keys=np("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function np(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>L.fromName(i.referenceValue))}class _I extends me{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Vl(t)&&ds(t.arrayValue,this.value)}}class mI extends me{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ds(this.value.arrayValue,t)}}class gI extends me{constructor(e,t){super(e,"not-in",t)}matches(e){if(ds(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ds(this.value.arrayValue,t)}}class yI extends me{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Vl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>ds(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e,t=null,i=[],s=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=l,this.ue=null}}function Oh(n,e=null,t=[],i=[],s=null,r=null,o=null){return new vI(n,e,t,i,s,r,o)}function Ll(n){const e=q(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>ja(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),co(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>Zn(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>Zn(i)).join(",")),e.ue=t}return e.ue}function xl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!uI(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ep(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Dh(n.startAt,e.startAt)&&Dh(n.endAt,e.endAt)}function $a(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t=null,i=[],s=[],r=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function EI(n,e,t,i,s,r,o,l){return new uo(n,e,t,i,s,r,o,l)}function ho(n){return new uo(n)}function Mh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function II(n){return n.collectionGroup!==null}function Qi(n){const e=q(n);if(e.ce===null){e.ce=[];const t=new Set;for(const r of e.explicitOrderBy)e.ce.push(r),t.add(r.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Re(Ae.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.ce.push(new Vr(r,i))}),t.has(Ae.keyField().canonicalString())||e.ce.push(new Vr(Ae.keyField(),i))}return e.ce}function ot(n){const e=q(n);return e.le||(e.le=TI(e,Qi(n))),e.le}function TI(n,e){if(n.limitType==="F")return Oh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new Vr(s.field,r)});const t=n.endAt?new Mr(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Mr(n.startAt.position,n.startAt.inclusive):null;return Oh(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function Ha(n,e,t){return new uo(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function fo(n,e){return xl(ot(n),ot(e))&&n.limitType===e.limitType}function ip(n){return`${Ll(ot(n))}|lt:${n.limitType}`}function Ln(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(s=>tp(s)).join(", ")}]`),co(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(s=>Zn(s)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(s=>Zn(s)).join(",")),`Target(${i})`}(ot(n))}; limitType=${n.limitType})`}function po(n,e){return e.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):L.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,e)&&function(i,s){for(const r of Qi(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,e)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,e)&&function(i,s){return!(i.startAt&&!function(o,l,c){const h=Nh(o,l,c);return o.inclusive?h<=0:h<0}(i.startAt,Qi(i),s)||i.endAt&&!function(o,l,c){const h=Nh(o,l,c);return o.inclusive?h>=0:h>0}(i.endAt,Qi(i),s))}(n,e)}function wI(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function sp(n){return(e,t)=>{let i=!1;for(const s of Qi(n)){const r=CI(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function CI(n,e,t){const i=n.field.isKeyField()?L.comparator(e.key,t.key):function(r,o,l){const c=o.data.field(r),h=l.data.field(r);return c!==null&&h!==null?Xn(c,h):U()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return U()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Sn(this.inner,(t,i)=>{for(const[s,r]of i)e(s,r)})}isEmpty(){return Kf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AI=new _e(L.comparator);function bt(){return AI}const rp=new _e(L.comparator);function $i(...n){let e=rp;for(const t of n)e=e.insert(t.key,t);return e}function op(n){let e=rp;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function hn(){return Yi()}function ap(){return Yi()}function Yi(){return new di(n=>n.toString(),(n,e)=>n.isEqual(e))}const RI=new _e(L.comparator),SI=new Re(L.comparator);function K(...n){let e=SI;for(const t of n)e=e.add(t);return e}const PI=new Re(X);function bI(){return PI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Or(e)?"-0":e}}function lp(n){return{integerValue:""+n}}function kI(n,e){return rI(e)?lp(e):Fl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(){this._=void 0}}function NI(n,e,t){return n instanceof fs?function(s,r){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Ol(r)&&(r=Ml(r)),r&&(o.fields.__previous_value__=r),{mapValue:o}}(t,e):n instanceof ps?up(n,e):n instanceof _s?hp(n,e):function(s,r){const o=cp(s,r),l=Vh(o)+Vh(s.Pe);return Wa(o)&&Wa(s.Pe)?lp(l):Fl(s.serializer,l)}(n,e)}function DI(n,e,t){return n instanceof ps?up(n,e):n instanceof _s?hp(n,e):t}function cp(n,e){return n instanceof Lr?function(i){return Wa(i)||function(r){return!!r&&"doubleValue"in r}(i)}(e)?e:{integerValue:0}:null}class fs extends _o{}class ps extends _o{constructor(e){super(),this.elements=e}}function up(n,e){const t=dp(e);for(const i of n.elements)t.some(s=>ct(s,i))||t.push(i);return{arrayValue:{values:t}}}class _s extends _o{constructor(e){super(),this.elements=e}}function hp(n,e){let t=dp(e);for(const i of n.elements)t=t.filter(s=>!ct(s,i));return{arrayValue:{values:t}}}class Lr extends _o{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Vh(n){return fe(n.integerValue||n.doubleValue)}function dp(n){return Vl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e,t){this.field=e,this.transform=t}}function MI(n,e){return n.field.isEqual(e.field)&&function(i,s){return i instanceof ps&&s instanceof ps||i instanceof _s&&s instanceof _s?Jn(i.elements,s.elements,ct):i instanceof Lr&&s instanceof Lr?ct(i.Pe,s.Pe):i instanceof fs&&s instanceof fs}(n.transform,e.transform)}class VI{constructor(e,t){this.version=e,this.transformResults=t}}class at{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new at}static exists(e){return new at(void 0,e)}static updateTime(e){return new at(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function vr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class mo{}function fp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _p(n.key,at.none()):new Ns(n.key,n.data,at.none());{const t=n.data,i=qe.empty();let s=new Re(Ae.comparator);for(let r of e.fields)if(!s.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new nn(n.key,i,new He(s.toArray()),at.none())}}function LI(n,e,t){n instanceof Ns?function(s,r,o){const l=s.value.clone(),c=xh(s.fieldTransforms,r,o.transformResults);l.setAll(c),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):n instanceof nn?function(s,r,o){if(!vr(s.precondition,r))return void r.convertToUnknownDocument(o.version);const l=xh(s.fieldTransforms,r,o.transformResults),c=r.data;c.setAll(pp(s)),c.setAll(l),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(s,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Ji(n,e,t,i){return n instanceof Ns?function(r,o,l,c){if(!vr(r.precondition,o))return l;const h=r.value.clone(),f=Fh(r.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,i):n instanceof nn?function(r,o,l,c){if(!vr(r.precondition,o))return l;const h=Fh(r.fieldTransforms,c,o),f=o.data;return f.setAll(pp(r)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(n,e,t,i):function(r,o,l){return vr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(n,e,t)}function xI(n,e){let t=null;for(const i of n.fieldTransforms){const s=e.data.field(i.field),r=cp(i.transform,s||null);r!=null&&(t===null&&(t=qe.empty()),t.set(i.field,r))}return t||null}function Lh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&Jn(i,s,(r,o)=>MI(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Ns extends mo{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class nn extends mo{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function pp(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function xh(n,e,t){const i=new Map;ee(n.length===t.length);for(let s=0;s<t.length;s++){const r=n[s],o=r.transform,l=e.data.field(r.field);i.set(r.field,DI(o,l,t[s]))}return i}function Fh(n,e,t){const i=new Map;for(const s of n){const r=s.transform,o=t.data.field(s.field);i.set(s.field,NI(r,o,e))}return i}class _p extends mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class FI extends mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&LI(r,e,i[s])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=Ji(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=Ji(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=ap();return this.mutations.forEach(s=>{const r=e.get(s.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(s.key)?null:l;const c=fp(o,l);c!==null&&i.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(B.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),K())}isEqual(e){return this.batchId===e.batchId&&Jn(this.mutations,e.mutations,(t,i)=>Lh(t,i))&&Jn(this.baseMutations,e.baseMutations,(t,i)=>Lh(t,i))}}class Ul{constructor(e,t,i,s){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=s}static from(e,t,i){ee(e.mutations.length===i.length);let s=function(){return RI}();const r=e.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new Ul(e,t,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe,Y;function WI(n){switch(n){default:return U();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function mp(n){if(n===void 0)return Pt("GRPC error has no .code"),P.UNKNOWN;switch(n){case pe.OK:return P.OK;case pe.CANCELLED:return P.CANCELLED;case pe.UNKNOWN:return P.UNKNOWN;case pe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case pe.INTERNAL:return P.INTERNAL;case pe.UNAVAILABLE:return P.UNAVAILABLE;case pe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case pe.NOT_FOUND:return P.NOT_FOUND;case pe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case pe.ABORTED:return P.ABORTED;case pe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case pe.DATA_LOSS:return P.DATA_LOSS;default:return U()}}(Y=pe||(pe={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=new fn([4294967295,4294967295],0);function Uh(n){const e=jI().encode(n),t=new Bf;return t.update(e),new Uint8Array(t.digest())}function Bh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new fn([t,i],0),new fn([s,r],0)]}class Bl{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new Hi(`Invalid padding: ${t}`);if(i<0)throw new Hi(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new Hi(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new Hi(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=fn.fromNumber(this.Ie)}Ee(e,t,i){let s=e.add(t.multiply(fn.fromNumber(i)));return s.compare($I)===1&&(s=new fn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Uh(e),[i,s]=Bh(t);for(let r=0;r<this.hashCount;r++){const o=this.Ee(i,s,r);if(!this.de(o))return!1}return!0}static create(e,t,i){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Bl(r,s,t);return i.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const t=Uh(e),[i,s]=Bh(t);for(let r=0;r<this.hashCount;r++){const o=this.Ee(i,s,r);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class Hi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const s=new Map;return s.set(e,Ds.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new go(B.min(),s,new _e(X),bt(),K())}}class Ds{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new Ds(i,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e,t,i,s){this.Re=e,this.removedTargetIds=t,this.key=i,this.Ve=s}}class gp{constructor(e,t){this.targetId=e,this.me=t}}class yp{constructor(e,t,i=Se.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}}class qh{constructor(){this.fe=0,this.ge=jh(),this.pe=Se.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=K(),t=K(),i=K();return this.ge.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:U()}}),new Ds(this.pe,this.ye,e,t,i)}Ce(){this.we=!1,this.ge=jh()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ee(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class HI{constructor(e){this.Le=e,this.Be=new Map,this.ke=bt(),this.qe=Wh(),this.Qe=new _e(X)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const i=this.Ge(t);switch(e.state){case 0:this.ze(t)&&i.De(e.resumeToken);break;case 1:i.Oe(),i.Se||i.Ce(),i.De(e.resumeToken);break;case 2:i.Oe(),i.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(i.Ne(),i.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),i.De(e.resumeToken));break;default:U()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((i,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,i=e.me.count,s=this.Je(t);if(s){const r=s.target;if($a(r))if(i===0){const o=new L(r.path);this.Ue(t,o,Ve.newNoDocument(o,B.min()))}else ee(i===1);else{const o=this.Ye(t);if(o!==i){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=t;let o,l;try{o=yn(i).toUint8Array()}catch(c){if(c instanceof Qf)return Yn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Bl(o,s,r)}catch(c){return Yn(c instanceof Hi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,t,i){return t.me.count===i-this.nt(e,t.targetId)?0:2}nt(e,t){const i=this.Le.getRemoteKeysForTarget(t);let s=0;return i.forEach(r=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Ue(t,r,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((r,o)=>{const l=this.Je(o);if(l){if(r.current&&$a(l.target)){const c=new L(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Ve.newNoDocument(c,e))}r.be&&(t.set(o,r.ve()),r.Ce())}});let i=K();this.qe.forEach((r,o)=>{let l=!0;o.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(r))}),this.ke.forEach((r,o)=>o.setReadTime(e));const s=new go(e,t,this.Qe,this.ke,i);return this.ke=bt(),this.qe=Wh(),this.Qe=new _e(X),s}$e(e,t){if(!this.ze(e))return;const i=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,i),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,i){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),i&&(this.ke=this.ke.insert(t,i))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new qh,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Re(X),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||M("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new qh),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Wh(){return new _e(L.comparator)}function jh(){return new _e(L.comparator)}const zI={asc:"ASCENDING",desc:"DESCENDING"},GI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},KI={and:"AND",or:"OR"};class QI{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function za(n,e){return n.useProto3Json||co(e)?e:{value:e}}function xr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function YI(n,e){return xr(n,e.toTimestamp())}function lt(n){return ee(!!n),B.fromTimestamp(function(t){const i=Jt(t);return new ge(i.seconds,i.nanos)}(n))}function ql(n,e){return Ga(n,e).canonicalString()}function Ga(n,e){const t=function(s){return new ae(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Ep(n){const e=ae.fromString(n);return ee(Ap(e)),e}function Ka(n,e){return ql(n.databaseId,e.path)}function ga(n,e){const t=Ep(e);if(t.get(1)!==n.databaseId.projectId)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Tp(t))}function Ip(n,e){return ql(n.databaseId,e)}function JI(n){const e=Ep(n);return e.length===4?ae.emptyPath():Tp(e)}function Qa(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Tp(n){return ee(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function $h(n,e,t){return{name:Ka(n,e),fields:t.value.mapValue.fields}}function XI(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:U()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(ee(f===void 0||typeof f=="string"),Se.fromBase64String(f||"")):(ee(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Se.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?P.UNKNOWN:mp(h.code);return new V(f,h.message||"")}(o);t=new yp(i,s,r,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=ga(n,i.document.name),r=lt(i.document.updateTime),o=i.document.createTime?lt(i.document.createTime):B.min(),l=new qe({mapValue:{fields:i.document.fields}}),c=Ve.newFoundDocument(s,r,o,l),h=i.targetIds||[],f=i.removedTargetIds||[];t=new Er(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=ga(n,i.document),r=i.readTime?lt(i.readTime):B.min(),o=Ve.newNoDocument(s,r),l=i.removedTargetIds||[];t=new Er([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=ga(n,i.document),r=i.removedTargetIds||[];t=new Er([],r,s,null)}else{if(!("filter"in e))return U();{e.filter;const i=e.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,o=new qI(s,r),l=i.targetId;t=new gp(l,o)}}return t}function ZI(n,e){let t;if(e instanceof Ns)t={update:$h(n,e.key,e.value)};else if(e instanceof _p)t={delete:Ka(n,e.key)};else if(e instanceof nn)t={update:$h(n,e.key,e.data),updateMask:lT(e.fieldMask)};else{if(!(e instanceof FI))return U();t={verify:Ka(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(r,o){const l=o.transform;if(l instanceof fs)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ps)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof _s)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Lr)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw U()}(0,i))),e.precondition.isNone||(t.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:YI(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:U()}(n,e.precondition)),t}function eT(n,e){return n&&n.length>0?(ee(e!==void 0),n.map(t=>function(s,r){let o=s.updateTime?lt(s.updateTime):lt(r);return o.isEqual(B.min())&&(o=lt(r)),new VI(o,s.transformResults||[])}(t,e))):[]}function tT(n,e){return{documents:[Ip(n,e.path)]}}function nT(n,e){const t={structuredQuery:{}},i=e.path;let s;e.collectionGroup!==null?(s=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=Ip(n,s);const r=function(h){if(h.length!==0)return Cp(ut.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:xn(m.field),direction:rT(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=za(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function iT(n){let e=JI(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let s=null;if(i>0){ee(i===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(p){const m=wp(p);return m instanceof ut&&Zf(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(S){return new Vr(Fn(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,co(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(p){const m=!!p.before,w=p.values||[];return new Mr(w,m)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const m=!p.before,w=p.values||[];return new Mr(w,m)}(t.endAt)),EI(e,s,o,r,l,"F",c,h)}function sT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return U()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function wp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Fn(t.unaryFilter.field);return me.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=Fn(t.unaryFilter.field);return me.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Fn(t.unaryFilter.field);return me.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Fn(t.unaryFilter.field);return me.create(o,"!=",{nullValue:"NULL_VALUE"});default:return U()}}(n):n.fieldFilter!==void 0?function(t){return me.create(Fn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return U()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ut.create(t.compositeFilter.filters.map(i=>wp(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return U()}}(t.compositeFilter.op))}(n):U()}function rT(n){return zI[n]}function oT(n){return GI[n]}function aT(n){return KI[n]}function xn(n){return{fieldPath:n.canonicalString()}}function Fn(n){return Ae.fromServerFormat(n.fieldPath)}function Cp(n){return n instanceof me?function(t){if(t.op==="=="){if(kh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NAN"}};if(bh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(kh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NAN"}};if(bh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xn(t.field),op:oT(t.op),value:t.value}}}(n):n instanceof ut?function(t){const i=t.getFilters().map(s=>Cp(s));return i.length===1?i[0]:{compositeFilter:{op:aT(t.op),filters:i}}}(n):U()}function lT(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ap(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t,i,s,r=B.min(),o=B.min(),l=Se.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cT{constructor(e){this.ct=e}}function uT(n){const e=iT({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ha(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(){this.un=new dT}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(Yt.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(Yt.min())}updateCollectionGroup(e,t,i){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class dT{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new Re(ae.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new Re(ae.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ei(0)}static kn(){return new ei(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(){this.changes=new di(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?b.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(i!==null&&Ji(i.mutation,s,He.empty(),ge.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,K()).next(()=>i))}getLocalViewOfDocuments(e,t,i=K()){const s=hn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,i).next(r=>{let o=$i();return r.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const i=hn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,K()))}populateOverlays(e,t,i){const s=[];return i.forEach(r=>{t.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(e,s).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,i,s){let r=bt();const o=Yi(),l=function(){return Yi()}();return t.forEach((c,h)=>{const f=i.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof nn)?r=r.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Ji(f.mutation,h,f.mutation.getFieldMask(),ge.now())):o.set(h.key,He.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new pT(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const i=Yi();let s=new _e((o,l)=>o-l),r=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=i.get(c)||He.empty();f=l.applyToLocalView(h,f),i.set(c,f);const p=(s.get(l.batchId)||K()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,p=ap();f.forEach(m=>{if(!r.has(m)){const w=fp(t.get(m),i.get(m));w!==null&&p.set(m,w),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return b.waitFor(o)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,s){return function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):II(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,s):this.getDocumentsMatchingCollectionQuery(e,t,i,s)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next(r=>{const o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):b.resolve(hn());let l=-1,c=r;return o.next(h=>b.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),r.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,c,h,K())).next(f=>({batchId:l,changes:op(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(i=>{let s=$i();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,i,s){const r=t.collectionGroup;let o=$i();return this.indexManager.getCollectionParents(e,r).next(l=>b.forEach(l,c=>{const h=function(p,m){return new uo(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,i,s).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,r,s))).next(o=>{r.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Ve.newInvalidDocument(f)))});let l=$i();return o.forEach((c,h)=>{const f=r.get(c);f!==void 0&&Ji(f.mutation,h,He.empty(),ge.now()),po(t,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:lt(s.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:uT(s.bundledQuery),readTime:lt(s.readTime)}}(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(){this.overlays=new _e(L.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const i=hn();return b.forEach(t,s=>this.getOverlay(e,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((s,r)=>{this.ht(e,t,r)}),b.resolve()}removeOverlaysForBatchId(e,t,i){const s=this.Ir.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.Ir.delete(i)),b.resolve()}getOverlaysForCollection(e,t,i){const s=hn(),r=t.length+1,o=new L(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return b.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new _e((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>i){let f=r.get(h.largestBatchId);f===null&&(f=hn(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=hn(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return b.resolve(l)}ht(e,t,i){const s=this.overlays.get(i.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(i.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new BI(t,i));let r=this.Ir.get(t);r===void 0&&(r=K(),this.Ir.set(t,r)),this.Ir.set(t,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yT{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(){this.Tr=new Re(ve.Er),this.dr=new Re(ve.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const i=new ve(e,t);this.Tr=this.Tr.add(i),this.dr=this.dr.add(i)}Rr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.Vr(new ve(e,t))}mr(e,t){e.forEach(i=>this.removeReference(i,t))}gr(e){const t=new L(new ae([])),i=new ve(t,e),s=new ve(t,e+1),r=[];return this.dr.forEachInRange([i,s],o=>{this.Vr(o),r.push(o.key)}),r}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new L(new ae([])),i=new ve(t,e),s=new ve(t,e+1);let r=K();return this.dr.forEachInRange([i,s],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new ve(e,0),i=this.Tr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class ve{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return L.comparator(e.key,t.key)||X(e.wr,t.wr)}static Ar(e,t){return X(e.wr,t.wr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Re(ve.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){const r=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new UI(r,t,i,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new ve(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,s=this.vr(i),r=s<0?0:s;return b.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new ve(t,0),s=new ve(t,Number.POSITIVE_INFINITY),r=[];return this.br.forEachInRange([i,s],o=>{const l=this.Dr(o.wr);r.push(l)}),b.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new Re(X);return t.forEach(s=>{const r=new ve(s,0),o=new ve(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([r,o],l=>{i=i.add(l.wr)})}),b.resolve(this.Cr(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,s=i.length+1;let r=i;L.isDocumentKey(r)||(r=r.child(""));const o=new ve(new L(r),0);let l=new Re(X);return this.br.forEachWhile(c=>{const h=c.key.path;return!!i.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.wr)),!0)},o),b.resolve(this.Cr(l))}Cr(e){const t=[];return e.forEach(i=>{const s=this.Dr(i);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ee(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.br;return b.forEach(t.mutations,s=>{const r=new ve(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=i})}On(e){}containsKey(e,t){const i=new ve(t,0),s=this.br.firstAfterOrEqual(i);return b.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(e){this.Mr=e,this.docs=function(){return new _e(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,s=this.docs.get(i),r=s?s.size:0,o=this.Mr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return b.resolve(i?i.document.mutableCopy():Ve.newInvalidDocument(t))}getEntries(e,t){let i=bt();return t.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Ve.newInvalidDocument(s))}),b.resolve(i)}getDocumentsMatchingQuery(e,t,i,s){let r=bt();const o=t.path,l=new L(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||tI(eI(f),i)<=0||(s.has(f.key)||po(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return b.resolve(r)}getAllFromCollectionGroup(e,t,i,s){U()}Or(e,t){return b.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new IT(this)}getSize(e){return b.resolve(this.size)}}class IT extends fT{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(i)}),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e){this.persistence=e,this.Nr=new di(t=>Ll(t),xl),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Wl,this.targetCount=0,this.kr=ei.Bn()}forEachTarget(e,t){return this.Nr.forEach((i,s)=>t(s)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new ei(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,i){let s=0;const r=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.Nr.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),b.waitFor(r).next(()=>s)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const i=this.Nr.get(t)||null;return b.resolve(i)}addMatchingKeys(e,t,i){return this.Br.Rr(t,i),b.resolve()}removeMatchingKeys(e,t,i){this.Br.mr(t,i);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(o=>{r.push(s.markPotentiallyOrphaned(e,o))}),b.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Br.yr(t);return b.resolve(i)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Dl(0),this.Kr=!1,this.Kr=!0,this.$r=new yT,this.referenceDelegate=e(this),this.Ur=new TT(this),this.indexManager=new hT,this.remoteDocumentCache=function(s){return new ET(s)}(i=>this.referenceDelegate.Wr(i)),this.serializer=new cT(t),this.Gr=new mT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new gT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.qr[e.toKey()];return i||(i=new vT(t,this.referenceDelegate),this.qr[e.toKey()]=i),i}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,i){M("MemoryPersistence","Starting transaction:",e);const s=new CT(this.Qr.next());return this.referenceDelegate.zr(),i(s).next(r=>this.referenceDelegate.jr(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Hr(e,t){return b.or(Object.values(this.qr).map(i=>()=>i.containsKey(e,t)))}}class CT extends iI{constructor(e){super(),this.currentSequenceNumber=e}}class jl{constructor(e){this.persistence=e,this.Jr=new Wl,this.Yr=null}static Zr(e){return new jl(e)}get Xr(){if(this.Yr)return this.Yr;throw U()}addReference(e,t,i){return this.Jr.addReference(i,t),this.Xr.delete(i.toString()),b.resolve()}removeReference(e,t,i){return this.Jr.removeReference(i,t),this.Xr.add(i.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(r=>this.Xr.add(r.toString()))}).next(()=>i.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,i=>{const s=L.fromPath(i);return this.ei(e,s).next(r=>{r||t.removeEntry(s,B.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(i=>{i?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.$i=i,this.Ui=s}static Wi(e,t){let i=K(),s=K();for(const r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new $l(e,t.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return hg()?8:sI(Le())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,i,s){const r={result:null};return this.Yi(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.Zi(e,t,s,i).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new AT;return this.Xi(e,t,o).next(l=>{if(r.result=l,this.zi)return this.es(e,t,o,l.size)})}).next(()=>r.result)}es(e,t,i,s){return i.documentReadCount<this.ji?(Mi()<=G.DEBUG&&M("QueryEngine","SDK will not create cache indexes for query:",Ln(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(Mi()<=G.DEBUG&&M("QueryEngine","Query:",Ln(t),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.Hi*s?(Mi()<=G.DEBUG&&M("QueryEngine","The SDK decides to create cache indexes for query:",Ln(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ot(t))):b.resolve())}Yi(e,t){if(Mh(t))return b.resolve(null);let i=ot(t);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Ha(t,null,"F"),i=ot(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(r=>{const o=K(...r);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,i).next(c=>{const h=this.ts(t,l);return this.ns(t,h,o,c.readTime)?this.Yi(e,Ha(t,null,"F")):this.rs(e,h,t,c)}))})))}Zi(e,t,i,s){return Mh(t)||s.isEqual(B.min())?b.resolve(null):this.Ji.getDocuments(e,i).next(r=>{const o=this.ts(t,r);return this.ns(t,o,i,s)?b.resolve(null):(Mi()<=G.DEBUG&&M("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ln(t)),this.rs(e,o,t,ZE(s,-1)).next(l=>l))})}ts(e,t){let i=new Re(sp(e));return t.forEach((s,r)=>{po(e,r)&&(i=i.add(r))}),i}ns(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Xi(e,t,i){return Mi()<=G.DEBUG&&M("QueryEngine","Using full collection scan to execute query:",Ln(t)),this.Ji.getDocumentsMatchingQuery(e,t,Yt.min(),i)}rs(e,t,i,s){return this.Ji.getDocumentsMatchingQuery(e,i,s).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(e,t,i,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new _e(X),this._s=new di(r=>Ll(r),xl),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(i)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new _T(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function PT(n,e,t,i){return new ST(n,e,t,i)}async function Rp(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,t.ls(e),t.mutationQueue.getAllMutationBatches(i))).next(r=>{const o=[],l=[];let c=K();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of r){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(i,c).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function bT(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=e.batch.keys(),r=t.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,h,f){const p=h.batch,m=p.keys();let w=b.resolve();return m.forEach(S=>{w=w.next(()=>f.getEntry(c,S)).next(N=>{const k=h.docVersions.get(S);ee(k!==null),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),w.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(t,i,e,r).next(()=>r.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let c=K();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(i,s))})}function Sp(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function kT(n,e){const t=q(n),i=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const l=[];e.targetChanges.forEach((f,p)=>{const m=s.get(p);if(!m)return;l.push(t.Ur.removeMatchingKeys(r,f.removedDocuments,p).next(()=>t.Ur.addMatchingKeys(r,f.addedDocuments,p)));let w=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(Se.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(f.resumeToken,i)),s=s.insert(p,w),function(N,k,W){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:W.addedDocuments.size+W.modifiedDocuments.size+W.removedDocuments.size>0}(m,w,f)&&l.push(t.Ur.updateTargetData(r,w))});let c=bt(),h=K();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(NT(r,o,e.documentUpdates).next(f=>{c=f.Ps,h=f.Is})),!i.isEqual(B.min())){const f=t.Ur.getLastRemoteSnapshotVersion(r).next(p=>t.Ur.setTargetsMetadata(r,r.currentSequenceNumber,i));l.push(f)}return b.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,h)).next(()=>c)}).then(r=>(t.os=s,r))}function NT(n,e,t){let i=K(),s=K();return t.forEach(r=>i=i.add(r)),e.getEntries(n,i).next(r=>{let o=bt();return t.forEach((l,c)=>{const h=r.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(B.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):M("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function DT(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function OT(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return t.Ur.getTargetData(i,e).next(r=>r?(s=r,b.resolve(s)):t.Ur.allocateTargetId(i).next(o=>(s=new Wt(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.Ur.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=t.os.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(i.targetId,i),t._s.set(e,i.targetId)),i})}async function Ya(n,e,t){const i=q(n),s=i.os.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,o=>i.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!ks(o))throw o;M("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}i.os=i.os.remove(e),i._s.delete(s.target)}function Hh(n,e,t){const i=q(n);let s=B.min(),r=K();return i.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=q(c),m=p._s.get(f);return m!==void 0?b.resolve(p.os.get(m)):p.Ur.getTargetData(h,f)}(i,o,ot(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{r=c})}).next(()=>i.ss.getDocumentsMatchingQuery(o,e,t?s:B.min(),t?r:K())).next(l=>(MT(i,wI(e),l),{documents:l,Ts:r})))}function MT(n,e,t){let i=n.us.get(e)||B.min();t.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.us.set(e,i)}class zh{constructor(){this.activeTargetIds=bI()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class VT{constructor(){this.so=new zh,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,i){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new zh,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){M("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){M("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ur=null;function ya(){return ur===null?ur=function(){return 268435456+Math.round(2147483648*Math.random())}():ur++,"0x"+ur.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FT{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe="WebChannelConnection";class UT extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const i=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Do=i+"://"+t.host,this.vo=`projects/${s}/databases/${r}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${r}`}get Fo(){return!1}Mo(t,i,s,r,o){const l=ya(),c=this.xo(t,i.toUriEncodedString());M("RestConnection",`Sending RPC '${t}' ${l}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,r,o),this.No(t,c,h,s).then(f=>(M("RestConnection",`Received RPC '${t}' ${l}: `,f),f),f=>{throw Yn("RestConnection",`RPC '${t}' ${l} failed with error: `,f,"url: ",c,"request:",s),f})}Lo(t,i,s,r,o,l){return this.Mo(t,i,s,r,o)}Oo(t,i,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+hi}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),i&&i.headers.forEach((r,o)=>t[o]=r),s&&s.headers.forEach((r,o)=>t[o]=r)}xo(t,i){const s=xT[t];return`${this.Do}/v1/${i}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,i,s){const r=ya();return new Promise((o,l)=>{const c=new qf;c.setWithCredentials(!0),c.listenOnce(Wf.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case gr.NO_ERROR:const f=c.getResponseJson();M(Oe,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(f)),o(f);break;case gr.TIMEOUT:M(Oe,`RPC '${e}' ${r} timed out`),l(new V(P.DEADLINE_EXCEEDED,"Request time out"));break;case gr.HTTP_ERROR:const p=c.getStatus();if(M(Oe,`RPC '${e}' ${r} failed with status:`,p,"response text:",c.getResponseText()),p>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const w=m==null?void 0:m.error;if(w&&w.status&&w.message){const S=function(k){const W=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(W)>=0?W:P.UNKNOWN}(w.status);l(new V(S,w.message))}else l(new V(P.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new V(P.UNAVAILABLE,"Connection failed."));break;default:U()}}finally{M(Oe,`RPC '${e}' ${r} completed.`)}});const h=JSON.stringify(s);M(Oe,`RPC '${e}' ${r} sending request:`,s),c.send(t,"POST",h,i,15)})}Bo(e,t,i){const s=ya(),r=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Hf(),l=$f(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,i),c.encodeInitMessageHeaders=!0;const f=r.join("");M(Oe,`Creating RPC '${e}' stream ${s}: ${f}`,c);const p=o.createWebChannel(f,c);let m=!1,w=!1;const S=new FT({Io:k=>{w?M(Oe,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(m||(M(Oe,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),M(Oe,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},To:()=>p.close()}),N=(k,W,z)=>{k.listen(W,Q=>{try{z(Q)}catch(le){setTimeout(()=>{throw le},0)}})};return N(p,ji.EventType.OPEN,()=>{w||(M(Oe,`RPC '${e}' stream ${s} transport opened.`),S.yo())}),N(p,ji.EventType.CLOSE,()=>{w||(w=!0,M(Oe,`RPC '${e}' stream ${s} transport closed`),S.So())}),N(p,ji.EventType.ERROR,k=>{w||(w=!0,Yn(Oe,`RPC '${e}' stream ${s} transport errored:`,k),S.So(new V(P.UNAVAILABLE,"The operation could not be completed")))}),N(p,ji.EventType.MESSAGE,k=>{var W;if(!w){const z=k.data[0];ee(!!z);const Q=z,le=Q.error||((W=Q[0])===null||W===void 0?void 0:W.error);if(le){M(Oe,`RPC '${e}' stream ${s} received error:`,le);const ze=le.status;let de=function(v){const E=pe[v];if(E!==void 0)return mp(E)}(ze),I=le.message;de===void 0&&(de=P.INTERNAL,I="Unknown error status: "+ze+" with message "+le.message),w=!0,S.So(new V(de,I)),p.close()}else M(Oe,`RPC '${e}' stream ${s} received:`,z),S.bo(z)}}),N(l,jf.STAT_EVENT,k=>{k.stat===Ua.PROXY?M(Oe,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===Ua.NOPROXY&&M(Oe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function va(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(n){return new QI(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e,t,i=1e3,s=1.5,r=6e4){this.ui=e,this.timerId=t,this.ko=i,this.qo=s,this.Qo=r,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),i=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-i);s>0&&M("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,t,i,s,r,o,l,c){this.ui=e,this.Ho=i,this.Jo=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Pp(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Pt(t.toString()),Pt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.Yo===t&&this.P_(i,s)},i=>{e(()=>{const s=new V(P.UNKNOWN,"Fetching auth token failed: "+i.message);return this.I_(s)})})}P_(e,t){const i=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{i(()=>this.listener.Eo())}),this.stream.Ro(()=>{i(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{i(()=>this.I_(s))}),this.stream.onMessage(s=>{i(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return M("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(M("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class BT extends bp{constructor(e,t,i,s,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=XI(this.serializer,e),i=function(r){if(!("targetChange"in r))return B.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?lt(o.readTime):B.min()}(e);return this.listener.d_(t,i)}A_(e){const t={};t.database=Qa(this.serializer),t.addTarget=function(r,o){let l;const c=o.target;if(l=$a(c)?{documents:tT(r,c)}:{query:nT(r,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=vp(r,o.resumeToken);const h=za(r,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){l.readTime=xr(r,o.snapshotVersion.toTimestamp());const h=za(r,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const i=sT(this.serializer,e);i&&(t.labels=i),this.a_(t)}R_(e){const t={};t.database=Qa(this.serializer),t.removeTarget=e,this.a_(t)}}class qT extends bp{constructor(e,t,i,s,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return ee(!!e.streamToken),this.lastStreamToken=e.streamToken,ee(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ee(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=eT(e.writeResults,e.commitTime),i=lt(e.commitTime);return this.listener.g_(i,t)}p_(){const e={};e.database=Qa(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>ZI(this.serializer,i))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT extends class{}{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Mo(e,Ga(t,i),s,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new V(P.UNKNOWN,r.toString())})}Lo(e,t,i,s,r){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Ga(t,i),s,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(P.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class jT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Pt(t),this.D_=!1):M("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=r,this.k_._o(o=>{i.enqueueAndForget(async()=>{Pn(this)&&(M("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=q(c);h.L_.add(4),await Os(h),h.q_.set("Unknown"),h.L_.delete(4),await vo(h)}(this))})}),this.q_=new jT(i,s)}}async function vo(n){if(Pn(n))for(const e of n.B_)await e(!0)}async function Os(n){for(const e of n.B_)await e(!1)}function kp(n,e){const t=q(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Kl(t)?Gl(t):fi(t).r_()&&zl(t,e))}function Hl(n,e){const t=q(n),i=fi(t);t.N_.delete(e),i.r_()&&Np(t,e),t.N_.size===0&&(i.r_()?i.o_():Pn(t)&&t.q_.set("Unknown"))}function zl(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}fi(n).A_(e)}function Np(n,e){n.Q_.xe(e),fi(n).R_(e)}function Gl(n){n.Q_=new HI({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),fi(n).start(),n.q_.v_()}function Kl(n){return Pn(n)&&!fi(n).n_()&&n.N_.size>0}function Pn(n){return q(n).L_.size===0}function Dp(n){n.Q_=void 0}async function HT(n){n.q_.set("Online")}async function zT(n){n.N_.forEach((e,t)=>{zl(n,e)})}async function GT(n,e){Dp(n),Kl(n)?(n.q_.M_(e),Gl(n)):n.q_.set("Unknown")}async function KT(n,e,t){if(n.q_.set("Online"),e instanceof yp&&e.state===2&&e.cause)try{await async function(s,r){const o=r.cause;for(const l of r.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(n,e)}catch(i){M("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Fr(n,i)}else if(e instanceof Er?n.Q_.Ke(e):e instanceof gp?n.Q_.He(e):n.Q_.We(e),!t.isEqual(B.min()))try{const i=await Sp(n.localStore);t.compareTo(i)>=0&&await function(r,o){const l=r.Q_.rt(o);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=r.N_.get(h);f&&r.N_.set(h,f.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,h)=>{const f=r.N_.get(c);if(!f)return;r.N_.set(c,f.withResumeToken(Se.EMPTY_BYTE_STRING,f.snapshotVersion)),Np(r,c);const p=new Wt(f.target,c,h,f.sequenceNumber);zl(r,p)}),r.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(i){M("RemoteStore","Failed to raise snapshot:",i),await Fr(n,i)}}async function Fr(n,e,t){if(!ks(e))throw e;n.L_.add(1),await Os(n),n.q_.set("Offline"),t||(t=()=>Sp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{M("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await vo(n)})}function Op(n,e){return e().catch(t=>Fr(n,t,e))}async function Eo(n){const e=q(n),t=Xt(e);let i=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;QT(e);)try{const s=await DT(e.localStore,i);if(s===null){e.O_.length===0&&t.o_();break}i=s.batchId,YT(e,s)}catch(s){await Fr(e,s)}Mp(e)&&Vp(e)}function QT(n){return Pn(n)&&n.O_.length<10}function YT(n,e){n.O_.push(e);const t=Xt(n);t.r_()&&t.V_&&t.m_(e.mutations)}function Mp(n){return Pn(n)&&!Xt(n).n_()&&n.O_.length>0}function Vp(n){Xt(n).start()}async function JT(n){Xt(n).p_()}async function XT(n){const e=Xt(n);for(const t of n.O_)e.m_(t.mutations)}async function ZT(n,e,t){const i=n.O_.shift(),s=Ul.from(i,e,t);await Op(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Eo(n)}async function ew(n,e){e&&Xt(n).V_&&await async function(i,s){if(function(o){return WI(o)&&o!==P.ABORTED}(s.code)){const r=i.O_.shift();Xt(i).s_(),await Op(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await Eo(i)}}(n,e),Mp(n)&&Vp(n)}async function Kh(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),M("RemoteStore","RemoteStore received new credentials");const i=Pn(t);t.L_.add(3),await Os(t),i&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await vo(t)}async function tw(n,e){const t=q(n);e?(t.L_.delete(2),await vo(t)):e||(t.L_.add(2),await Os(t),t.q_.set("Unknown"))}function fi(n){return n.K_||(n.K_=function(t,i,s){const r=q(t);return r.w_(),new BT(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:HT.bind(null,n),Ro:zT.bind(null,n),mo:GT.bind(null,n),d_:KT.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Kl(n)?Gl(n):n.q_.set("Unknown")):(await n.K_.stop(),Dp(n))})),n.K_}function Xt(n){return n.U_||(n.U_=function(t,i,s){const r=q(t);return r.w_(),new qT(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:JT.bind(null,n),mo:ew.bind(null,n),f_:XT.bind(null,n),g_:ZT.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Eo(n)):(await n.U_.stop(),n.O_.length>0&&(M("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new Ct,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,r){const o=Date.now()+i,l=new Ql(e,t,o,s,r);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Yl(n,e){if(Pt("AsyncQueue",`${e}: ${n}`),ks(n))return new V(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.comparator=e?(t,i)=>e(t,i)||L.comparator(t.key,i.key):(t,i)=>L.comparator(t.key,i.key),this.keyedMap=$i(),this.sortedSet=new _e(this.comparator)}static emptySet(e){return new $n(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $n)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new $n;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qh{constructor(){this.W_=new _e(L.comparator)}track(e){const t=e.doc.key,i=this.W_.get(t);i?e.type!==0&&i.type===3?this.W_=this.W_.insert(t,e):e.type===3&&i.type!==1?this.W_=this.W_.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.W_=this.W_.remove(t):e.type===1&&i.type===2?this.W_=this.W_.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):U():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,i)=>{e.push(i)}),e}}class ti{constructor(e,t,i,s,r,o,l,c,h){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,i,s,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new ti(e,t,$n.emptySet(t),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class iw{constructor(){this.queries=Yh(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,i){const s=q(t),r=s.queries;s.queries=Yh(),r.forEach((o,l)=>{for(const c of l.j_)c.onError(i)})})(this,new V(P.ABORTED,"Firestore shutting down"))}}function Yh(){return new di(n=>ip(n),fo)}async function Jl(n,e){const t=q(n);let i=3;const s=e.query;let r=t.queries.get(s);r?!r.H_()&&e.J_()&&(i=2):(r=new nw,i=e.J_()?0:1);try{switch(i){case 0:r.z_=await t.onListen(s,!0);break;case 1:r.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const l=Yl(o,`Initialization of query '${Ln(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,r),r.j_.push(e),e.Z_(t.onlineState),r.z_&&e.X_(r.z_)&&Zl(t)}async function Xl(n,e){const t=q(n),i=e.query;let s=3;const r=t.queries.get(i);if(r){const o=r.j_.indexOf(e);o>=0&&(r.j_.splice(o,1),r.j_.length===0?s=e.J_()?0:1:!r.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function sw(n,e){const t=q(n);let i=!1;for(const s of e){const r=s.query,o=t.queries.get(r);if(o){for(const l of o.j_)l.X_(s)&&(i=!0);o.z_=s}}i&&Zl(t)}function rw(n,e,t){const i=q(n),s=i.queries.get(e);if(s)for(const r of s.j_)r.onError(t);i.queries.delete(e)}function Zl(n){n.Y_.forEach(e=>{e.next()})}var Ja,Jh;(Jh=Ja||(Ja={})).ea="default",Jh.Cache="cache";class ec{constructor(e,t,i){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=i||{}}X_(e){if(!this.options.includeMetadataChanges){const i=[];for(const s of e.docChanges)s.type!==3&&i.push(s);e=new ti(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const i=t!=="Offline";return(!this.options._a||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=ti.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Ja.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e){this.key=e}}class xp{constructor(e){this.key=e}}class ow{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=K(),this.mutatedKeys=K(),this.Aa=sp(e),this.Ra=new $n(this.Aa)}get Va(){return this.Ta}ma(e,t){const i=t?t.fa:new Qh,s=t?t.Ra:this.Ra;let r=t?t.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const m=s.get(f),w=po(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),N=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let k=!1;m&&w?m.data.isEqual(w.data)?S!==N&&(i.track({type:3,doc:w}),k=!0):this.ga(m,w)||(i.track({type:2,doc:w}),k=!0,(c&&this.Aa(w,c)>0||h&&this.Aa(w,h)<0)&&(l=!0)):!m&&w?(i.track({type:0,doc:w}),k=!0):m&&!w&&(i.track({type:1,doc:m}),k=!0,(c||h)&&(l=!0)),k&&(w?(o=o.add(w),r=N?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),i.track({type:1,doc:f})}return{Ra:o,fa:i,ns:l,mutatedKeys:r}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,s){const r=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,p)=>function(w,S){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return U()}};return N(w)-N(S)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(i),s=s!=null&&s;const l=t&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new ti(this.query,e.Ra,r,o,e.mutatedKeys,c===0,h,!1,!!i&&i.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Qh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=K(),this.Ra.forEach(i=>{this.Sa(i.key)&&(this.da=this.da.add(i.key))});const t=[];return e.forEach(i=>{this.da.has(i)||t.push(new xp(i))}),this.da.forEach(i=>{e.has(i)||t.push(new Lp(i))}),t}ba(e){this.Ta=e.Ts,this.da=K();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return ti.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class aw{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class lw{constructor(e){this.key=e,this.va=!1}}class cw{constructor(e,t,i,s,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new di(l=>ip(l),fo),this.Ma=new Map,this.xa=new Set,this.Oa=new _e(L.comparator),this.Na=new Map,this.La=new Wl,this.Ba={},this.ka=new Map,this.qa=ei.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function uw(n,e,t=!0){const i=jp(n);let s;const r=i.Fa.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Da()):s=await Fp(i,e,t,!0),s}async function hw(n,e){const t=jp(n);await Fp(t,e,!0,!1)}async function Fp(n,e,t,i){const s=await OT(n.localStore,ot(e)),r=s.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let l;return i&&(l=await dw(n,e,r,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&kp(n.remoteStore,s),l}async function dw(n,e,t,i,s){n.Ka=(p,m,w)=>async function(N,k,W,z){let Q=k.view.ma(W);Q.ns&&(Q=await Hh(N.localStore,k.query,!1).then(({documents:I})=>k.view.ma(I,Q)));const le=z&&z.targetChanges.get(k.targetId),ze=z&&z.targetMismatches.get(k.targetId)!=null,de=k.view.applyChanges(Q,N.isPrimaryClient,le,ze);return Zh(N,k.targetId,de.wa),de.snapshot}(n,p,m,w);const r=await Hh(n.localStore,e,!0),o=new ow(e,r.Ts),l=o.ma(r.documents),c=Ds.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),h=o.applyChanges(l,n.isPrimaryClient,c);Zh(n,t,h.wa);const f=new aw(e,t,o);return n.Fa.set(e,f),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function fw(n,e,t){const i=q(n),s=i.Fa.get(e),r=i.Ma.get(s.targetId);if(r.length>1)return i.Ma.set(s.targetId,r.filter(o=>!fo(o,e))),void i.Fa.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Ya(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),t&&Hl(i.remoteStore,s.targetId),Xa(i,s.targetId)}).catch(bs)):(Xa(i,s.targetId),await Ya(i.localStore,s.targetId,!0))}async function pw(n,e){const t=q(n),i=t.Fa.get(e),s=t.Ma.get(i.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Hl(t.remoteStore,i.targetId))}async function _w(n,e,t){const i=Tw(n);try{const s=await function(o,l){const c=q(o),h=ge.now(),f=l.reduce((w,S)=>w.add(S.key),K());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",w=>{let S=bt(),N=K();return c.cs.getEntries(w,f).next(k=>{S=k,S.forEach((W,z)=>{z.isValidDocument()||(N=N.add(W))})}).next(()=>c.localDocuments.getOverlayedDocuments(w,S)).next(k=>{p=k;const W=[];for(const z of l){const Q=xI(z,p.get(z.key).overlayedDocument);Q!=null&&W.push(new nn(z.key,Q,Yf(Q.value.mapValue),at.exists(!0)))}return c.mutationQueue.addMutationBatch(w,h,W,l)}).next(k=>{m=k;const W=k.applyToLocalDocumentSet(p,N);return c.documentOverlayCache.saveOverlays(w,k.batchId,W)})}).then(()=>({batchId:m.batchId,changes:op(p)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new _e(X)),h=h.insert(l,c),o.Ba[o.currentUser.toKey()]=h}(i,s.batchId,t),await Ms(i,s.changes),await Eo(i.remoteStore)}catch(s){const r=Yl(s,"Failed to persist write");t.reject(r)}}async function Up(n,e){const t=q(n);try{const i=await kT(t.localStore,e);e.targetChanges.forEach((s,r)=>{const o=t.Na.get(r);o&&(ee(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?ee(o.va):s.removedDocuments.size>0&&(ee(o.va),o.va=!1))}),await Ms(t,i,e)}catch(i){await bs(i)}}function Xh(n,e,t){const i=q(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const s=[];i.Fa.forEach((r,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=q(o);c.onlineState=l;let h=!1;c.queries.forEach((f,p)=>{for(const m of p.j_)m.Z_(l)&&(h=!0)}),h&&Zl(c)}(i.eventManager,e),s.length&&i.Ca.d_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function mw(n,e,t){const i=q(n);i.sharedClientState.updateQueryState(e,"rejected",t);const s=i.Na.get(e),r=s&&s.key;if(r){let o=new _e(L.comparator);o=o.insert(r,Ve.newNoDocument(r,B.min()));const l=K().add(r),c=new go(B.min(),new Map,new _e(X),o,l);await Up(i,c),i.Oa=i.Oa.remove(r),i.Na.delete(e),tc(i)}else await Ya(i.localStore,e,!1).then(()=>Xa(i,e,t)).catch(bs)}async function gw(n,e){const t=q(n),i=e.batch.batchId;try{const s=await bT(t.localStore,e);qp(t,i,null),Bp(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await Ms(t,s)}catch(s){await bs(s)}}async function yw(n,e,t){const i=q(n);try{const s=await function(o,l){const c=q(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(ee(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(i.localStore,e);qp(i,e,t),Bp(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await Ms(i,s)}catch(s){await bs(s)}}function Bp(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function qp(n,e,t){const i=q(n);let s=i.Ba[i.currentUser.toKey()];if(s){const r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),i.Ba[i.currentUser.toKey()]=s}}function Xa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.Ma.get(e))n.Fa.delete(i),t&&n.Ca.$a(i,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(i=>{n.La.containsKey(i)||Wp(n,i)})}function Wp(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Hl(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),tc(n))}function Zh(n,e,t){for(const i of t)i instanceof Lp?(n.La.addReference(i.key,e),vw(n,i)):i instanceof xp?(M("SyncEngine","Document no longer in limbo: "+i.key),n.La.removeReference(i.key,e),n.La.containsKey(i.key)||Wp(n,i.key)):U()}function vw(n,e){const t=e.key,i=t.path.canonicalString();n.Oa.get(t)||n.xa.has(i)||(M("SyncEngine","New document in limbo: "+t),n.xa.add(i),tc(n))}function tc(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new L(ae.fromString(e)),i=n.qa.next();n.Na.set(i,new lw(t)),n.Oa=n.Oa.insert(t,i),kp(n.remoteStore,new Wt(ot(ho(t.path)),i,"TargetPurposeLimboResolution",Dl.oe))}}async function Ms(n,e,t){const i=q(n),s=[],r=[],o=[];i.Fa.isEmpty()||(i.Fa.forEach((l,c)=>{o.push(i.Ka(c,e,t).then(h=>{var f;if((h||t)&&i.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;i.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=$l.Wi(c.targetId,h);r.push(p)}}))}),await Promise.all(o),i.Ca.d_(s),await async function(c,h){const f=q(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>b.forEach(h,m=>b.forEach(m.$i,w=>f.persistence.referenceDelegate.addReference(p,m.targetId,w)).next(()=>b.forEach(m.Ui,w=>f.persistence.referenceDelegate.removeReference(p,m.targetId,w)))))}catch(p){if(!ks(p))throw p;M("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const w=f.os.get(m),S=w.snapshotVersion,N=w.withLastLimboFreeSnapshotVersion(S);f.os=f.os.insert(m,N)}}}(i.localStore,r))}async function Ew(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){M("SyncEngine","User change. New user:",e.toKey());const i=await Rp(t.localStore,e);t.currentUser=e,function(r,o){r.ka.forEach(l=>{l.forEach(c=>{c.reject(new V(P.CANCELLED,o))})}),r.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await Ms(t,i.hs)}}function Iw(n,e){const t=q(n),i=t.Na.get(e);if(i&&i.va)return K().add(i.key);{let s=K();const r=t.Ma.get(e);if(!r)return s;for(const o of r){const l=t.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function jp(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Up.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Iw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=mw.bind(null,e),e.Ca.d_=sw.bind(null,e.eventManager),e.Ca.$a=rw.bind(null,e.eventManager),e}function Tw(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=gw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yw.bind(null,e),e}class Ur{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=yo(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return PT(this.persistence,new RT,e.initialUser,this.serializer)}Ga(e){return new wT(jl.Zr,this.serializer)}Wa(e){return new VT}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ur.provider={build:()=>new Ur};class Za{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Xh(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ew.bind(null,this.syncEngine),await tw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new iw}()}createDatastore(e){const t=yo(e.databaseInfo.databaseId),i=function(r){return new UT(r)}(e.databaseInfo);return function(r,o,l,c){return new WT(r,o,l,c)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,s,r,o,l){return new $T(i,s,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Xh(this.syncEngine,t,0),function(){return Gh.D()?new Gh:new LT}())}createSyncEngine(e,t){return function(s,r,o,l,c,h,f){const p=new cw(s,r,o,l,c,h);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const r=q(s);M("RemoteStore","RemoteStore shutting down."),r.L_.add(5),await Os(r),r.k_.shutdown(),r.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Za.provider={build:()=>new Za};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Pt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(e,t,i,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=s,this.user=Me.UNAUTHENTICATED,this.clientId=Gf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async o=>{M("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(i,o=>(M("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ct;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Yl(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function Ea(n,e){n.asyncQueue.verifyOperationInProgress(),M("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await Rp(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function ed(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Cw(n);M("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>Kh(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>Kh(e.remoteStore,s)),n._onlineComponents=e}async function Cw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){M("FirestoreClient","Using user provided OfflineComponentProvider");try{await Ea(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Yn("Error using user provided cache. Falling back to memory cache: "+t),await Ea(n,new Ur)}}else M("FirestoreClient","Using default OfflineComponentProvider"),await Ea(n,new Ur);return n._offlineComponents}async function $p(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(M("FirestoreClient","Using user provided OnlineComponentProvider"),await ed(n,n._uninitializedComponentsProvider._online)):(M("FirestoreClient","Using default OnlineComponentProvider"),await ed(n,new Za))),n._onlineComponents}function Aw(n){return $p(n).then(e=>e.syncEngine)}async function Br(n){const e=await $p(n),t=e.eventManager;return t.onListen=uw.bind(null,e.syncEngine),t.onUnlisten=fw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=hw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=pw.bind(null,e.syncEngine),t}function Rw(n,e,t={}){const i=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,h){const f=new nc({next:m=>{f.Za(),o.enqueueAndForget(()=>Xl(r,p));const w=m.docs.has(l);!w&&m.fromCache?h.reject(new V(P.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&m.fromCache&&c&&c.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new ec(ho(l.path),f,{includeMetadataChanges:!0,_a:!0});return Jl(r,p)}(await Br(n),n.asyncQueue,e,t,i)),i.promise}function Sw(n,e,t={}){const i=new Ct;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,h){const f=new nc({next:m=>{f.Za(),o.enqueueAndForget(()=>Xl(r,p)),m.fromCache&&c.source==="server"?h.reject(new V(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new ec(l,f,{includeMetadataChanges:!0,_a:!0});return Jl(r,p)}(await Br(n),n.asyncQueue,e,t,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zp(n,e,t){if(!t)throw new V(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Pw(n,e,t,i){if(e===!0&&i===!0)throw new V(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function nd(n){if(!L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function id(n){if(L.isDocumentKey(n))throw new V(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function ic(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":U()}function Ke(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ic(n);throw new V(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new V(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new V(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Pw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hp((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Io{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sd({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sd(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new $E;switch(i.type){case"firstParty":return new KE(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new V(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=td.get(t);i&&(M("ComponentProvider","Removing Datastore"),td.delete(t),i.terminate())}(this),Promise.resolve()}}function bw(n,e,t,i={}){var s;const r=(n=Ke(n,Io))._getSettings(),o=`${e}:${t}`;if(r.host!=="firestore.googleapis.com"&&r.host!==o&&Yn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:o,ssl:!1})),i.mockUserToken){let l,c;if(typeof i.mockUserToken=="string")l=i.mockUserToken,c=Me.MOCK_USER;else{l=Jd(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=i.mockUserToken.sub||i.mockUserToken.user_id;if(!h)throw new V(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Me(h)}n._authCredentials=new HE(new zf(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Vs(this.firestore,e,this._query)}}class Ue{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Gt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}}class Gt extends Vs{constructor(e,t,i){super(e,t,ho(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new L(e))}withConverter(e){return new Gt(this.firestore,e,this._path)}}function hS(n,e,...t){if(n=oe(n),zp("collection","path",e),n instanceof Io){const i=ae.fromString(e,...t);return id(i),new Gt(n,null,i)}{if(!(n instanceof Ue||n instanceof Gt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(ae.fromString(e,...t));return id(i),new Gt(n.firestore,null,i)}}function gt(n,e,...t){if(n=oe(n),arguments.length===1&&(e=Gf.newId()),zp("doc","path",e),n instanceof Io){const i=ae.fromString(e,...t);return nd(i),new Ue(n,null,new L(i))}{if(!(n instanceof Ue||n instanceof Gt))throw new V(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(ae.fromString(e,...t));return nd(i),new Ue(n.firestore,n instanceof Gt?n.converter:null,new L(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Pp(this,"async_queue_retry"),this.Vu=()=>{const i=va();i&&M("AsyncQueue","Visibility state changed to "+i.visibilityState),this.t_.jo()},this.mu=e;const t=va();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=va();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Ct;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ks(e))throw e;M("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(i=>{this.Eu=i,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(i);throw Pt("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.du=!1,i))));return this.mu=t,t}enqueueAfterDelay(e,t,i){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=Ql.createAndSchedule(this,e,t,i,r=>this.yu(r));return this.Tu.push(s),s}fu(){this.Eu&&U()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function od(n){return function(t,i){if(typeof t!="object"||t===null)return!1;const s=t;for(const r of i)if(r in s&&typeof s[r]=="function")return!0;return!1}(n,["next","error","complete"])}class En extends Io{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new rd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rd(e),this._firestoreClient=void 0,await e}}}function kw(n,e){const t=typeof n=="object"?n:Il(),i=typeof n=="string"?n:"(default)",s=ro(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=Kd("firestore");r&&bw(s,...r)}return s}function To(n){if(n._terminated)throw new V(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Nw(n),n._firestoreClient}function Nw(n){var e,t,i;const s=n._freezeSettings(),r=function(l,c,h,f){return new aI(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Hp(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new ww(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ni(Se.fromBase64String(e))}catch(t){throw new V(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ni(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return X(this._lat,e._lat)||X(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dw=/^__.*__$/;class Ow{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new nn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ns(e,this.data,t,this.fieldTransforms)}}class Gp{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new nn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Kp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw U()}}class oc{constructor(e,t,i,s,r,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.vu(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new oc(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:i,xu:!1});return s.Ou(e),s}Nu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:i,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return qr(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Kp(this.Cu)&&Dw.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Mw{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||yo(e)}Qu(e,t,i,s=!1){return new oc({Cu:e,methodName:t,qu:i,path:Ae.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qp(n){const e=n._freezeSettings(),t=yo(n._databaseId);return new Mw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Vw(n,e,t,i,s,r={}){const o=n.Qu(r.merge||r.mergeFields?2:0,e,t,s);lc("Data must be an object, but it was:",o,i);const l=Yp(i,o);let c,h;if(r.merge)c=new He(o.fieldMask),h=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const m=el(e,p,t);if(!o.contains(m))throw new V(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Xp(f,m)||f.push(m)}c=new He(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new Ow(new qe(l),c,h)}class Ao extends Co{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ao}}class ac extends Co{_toFieldTransform(e){return new OI(e.path,new fs)}isEqual(e){return e instanceof ac}}function Lw(n,e,t,i){const s=n.Qu(1,e,t);lc("Data must be an object, but it was:",s,i);const r=[],o=qe.empty();Sn(i,(c,h)=>{const f=cc(e,c,t);h=oe(h);const p=s.Nu(f);if(h instanceof Ao)r.push(f);else{const m=Ro(h,p);m!=null&&(r.push(f),o.set(f,m))}});const l=new He(r);return new Gp(o,l,s.fieldTransforms)}function xw(n,e,t,i,s,r){const o=n.Qu(1,e,t),l=[el(e,i,t)],c=[s];if(r.length%2!=0)throw new V(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(el(e,r[m])),c.push(r[m+1]);const h=[],f=qe.empty();for(let m=l.length-1;m>=0;--m)if(!Xp(h,l[m])){const w=l[m];let S=c[m];S=oe(S);const N=o.Nu(w);if(S instanceof Ao)h.push(w);else{const k=Ro(S,N);k!=null&&(h.push(w),f.set(w,k))}}const p=new He(h);return new Gp(f,p,o.fieldTransforms)}function Ro(n,e){if(Jp(n=oe(n)))return lc("Unsupported field value:",e,n),Yp(n,e);if(n instanceof Co)return function(i,s){if(!Kp(s.Cu))throw s.Bu(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(i,s){const r=[];let o=0;for(const l of i){let c=Ro(l,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),o++}return{arrayValue:{values:r}}}(n,e)}return function(i,s){if((i=oe(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return kI(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=ge.fromDate(i);return{timestampValue:xr(s.serializer,r)}}if(i instanceof ge){const r=new ge(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:xr(s.serializer,r)}}if(i instanceof sc)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof ni)return{bytesValue:vp(s.serializer,i._byteString)};if(i instanceof Ue){const r=s.databaseId,o=i.firestore._databaseId;if(!o.isEqual(r))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:ql(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof rc)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return Fl(l.serializer,c)})}}}}}}(i,s);throw s.Bu(`Unsupported field value: ${ic(i)}`)}(n,e)}function Yp(n,e){const t={};return Kf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Sn(n,(i,s)=>{const r=Ro(s,e.Mu(i));r!=null&&(t[i]=r)}),{mapValue:{fields:t}}}function Jp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof sc||n instanceof ni||n instanceof Ue||n instanceof Co||n instanceof rc)}function lc(n,e,t){if(!Jp(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const i=ic(t);throw i==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+i)}}function el(n,e,t){if((e=oe(e))instanceof wo)return e._internalPath;if(typeof e=="string")return cc(n,e);throw qr("Field path arguments must be of type string or ",n,!1,void 0,t)}const Fw=new RegExp("[~\\*/\\[\\]]");function cc(n,e,t){if(e.search(Fw)>=0)throw qr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new wo(...e.split("."))._internalPath}catch{throw qr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function qr(n,e,t,i,s){const r=i&&!i.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${i}`),o&&(c+=` in document ${s}`),c+=")"),new V(P.INVALID_ARGUMENT,l+n+c)}function Xp(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Uw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(e_("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Uw extends Zp{data(){return super.data()}}function e_(n,e){return typeof e=="string"?cc(n,e):e instanceof wo?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Bw{convertValue(e,t="none"){switch(vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(yn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw U()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return Sn(e,(s,r)=>{i[s]=this.convertValue(r,t)}),i}convertVectorValue(e){var t,i,s;const r=(s=(i=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(o=>fe(o.doubleValue));return new rc(r)}convertGeoPoint(e){return new sc(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=Ml(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(us(e));default:return null}}convertTimestamp(e){const t=Jt(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=ae.fromString(e);ee(Ap(i));const s=new hs(i.get(1),i.get(3)),r=new L(i.popFirst(5));return s.isEqual(t)||Pt(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qw(n,e,t){let i;return i=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class n_ extends Zp{constructor(e,t,i,s,r,o){super(e,t,i,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ir(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(e_("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}}class Ir extends n_{data(e={}){return super.data(e)}}class i_{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new zi(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new Ir(this._firestore,this._userDataWriter,i.key,i,new zi(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new Ir(s._firestore,s._userDataWriter,l.doc.key,l.doc,new zi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const c=new Ir(s._firestore,s._userDataWriter,l.doc.key,l.doc,new zi(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:Ww(l.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Ww(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return U()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tl(n){n=Ke(n,Ue);const e=Ke(n.firestore,En);return Rw(To(e),n._key).then(t=>r_(e,n,t))}class uc extends Bw{constructor(e){super(),this.firestore=e}convertBytes(e){return new ni(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ue(this.firestore,null,t)}}function dS(n){n=Ke(n,Vs);const e=Ke(n.firestore,En),t=To(e),i=new uc(e);return t_(n._query),Sw(t,n._query).then(s=>new i_(e,i,n,s))}function Xi(n,e,t){n=Ke(n,Ue);const i=Ke(n.firestore,En),s=qw(n.converter,e,t);return s_(i,[Vw(Qp(i),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,at.none())])}function jw(n,e,t,...i){n=Ke(n,Ue);const s=Ke(n.firestore,En),r=Qp(s);let o;return o=typeof(e=oe(e))=="string"||e instanceof wo?xw(r,"updateDoc",n._key,e,t,i):Lw(r,"updateDoc",n._key,e),s_(s,[o.toMutation(n._key,at.exists(!0))])}function $w(n,...e){var t,i,s;n=oe(n);let r={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||od(e[o])||(r=e[o],o++);const l={includeMetadataChanges:r.includeMetadataChanges,source:r.source};if(od(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(i=p.error)===null||i===void 0?void 0:i.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let c,h,f;if(n instanceof Ue)h=Ke(n.firestore,En),f=ho(n._key.path),c={next:p=>{e[o]&&e[o](r_(h,n,p))},error:e[o+1],complete:e[o+2]};else{const p=Ke(n,Vs);h=Ke(p.firestore,En),f=p._query;const m=new uc(h);c={next:w=>{e[o]&&e[o](new i_(h,m,p,w))},error:e[o+1],complete:e[o+2]},t_(n._query)}return function(m,w,S,N){const k=new nc(N),W=new ec(w,k,S);return m.asyncQueue.enqueueAndForget(async()=>Jl(await Br(m),W)),()=>{k.Za(),m.asyncQueue.enqueueAndForget(async()=>Xl(await Br(m),W))}}(To(h),f,l,c)}function s_(n,e){return function(i,s){const r=new Ct;return i.asyncQueue.enqueueAndForget(async()=>_w(await Aw(i),s,r)),r.promise}(To(n),e)}function r_(n,e,t){const i=t.docs.get(e._key),s=new uc(n);return new n_(n,s,e._key,i,new zi(t.hasPendingWrites,t.fromCache),e.converter)}function Zi(){return new ac("serverTimestamp")}(function(e,t=!0){(function(s){hi=s})(An),pn(new Qt("firestore",(i,{instanceIdentifier:s,options:r})=>{const o=i.getProvider("app").getImmediate(),l=new En(new zE(i.getProvider("auth-internal")),new YE(i.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new V(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new hs(h.options.projectId,f)}(o,s),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),it(Ch,"4.7.3",e),it(Ch,"4.7.3","esm2017")})();var Hw="firebase",zw="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */it(Hw,zw,"app");var ad={};const ld="@firebase/database",cd="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let o_="";function Gw(n){o_=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kw{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Te(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:os(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ht(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Kw(e)}}catch{}return new Qw},dn=a_("localStorage"),Yw=a_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn=new so("@firebase/database"),Jw=function(){let n=1;return function(){return n++}}(),l_=function(n){const e=wg(n),t=new vg;t.update(e);const i=t.digest();return yl.encodeByteArray(i)},Ls=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Ls.apply(null,i):typeof i=="object"?e+=Te(i):e+=i,e+=" "}return e};let es=null,ud=!0;const Xw=function(n,e){D(!0,"Can't turn on custom loggers persistently."),Hn.logLevel=G.VERBOSE,es=Hn.log.bind(Hn)},Ce=function(...n){if(ud===!0&&(ud=!1,es===null&&Yw.get("logging_enabled")===!0&&Xw()),es){const e=Ls.apply(null,n);es(e)}},xs=function(n){return function(...e){Ce(n,...e)}},nl=function(...n){const e="FIREBASE INTERNAL ERROR: "+Ls(...n);Hn.error(e)},kt=function(...n){const e=`FIREBASE FATAL ERROR: ${Ls(...n)}`;throw Hn.error(e),new Error(e)},Be=function(...n){const e="FIREBASE WARNING: "+Ls(...n);Hn.warn(e)},Zw=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Be("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},hc=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},eC=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ii="[MIN_NAME]",In="[MAX_NAME]",bn=function(n,e){if(n===e)return 0;if(n===ii||e===In)return-1;if(e===ii||n===In)return 1;{const t=hd(n),i=hd(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},tC=function(n,e){return n===e?0:n<e?-1:1},Vi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Te(e))},dc=function(n){if(typeof n!="object"||n===null)return Te(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=Te(e[i]),t+=":",t+=dc(n[e[i]]);return t+="}",t},c_=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Pe(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const u_=function(n){D(!hc(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,l,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,o=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const h=[];for(c=t;c;c-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(s?1:0),h.reverse();const f=h.join("");let p="";for(c=0;c<64;c+=8){let m=parseInt(f.substr(c,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},nC=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},iC=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function sC(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const rC=new RegExp("^-?(0*)\\d{1,10}$"),oC=-2147483648,aC=2147483647,hd=function(n){if(rC.test(n)){const e=Number(n);if(e>=oC&&e<=aC)return e}return null},pi=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Be("Exception was thrown by user callback.",t),e},Math.floor(0))}},lC=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ts=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cC{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){Be(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uC{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Ce("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Be(e)}}class Tr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Tr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="5",h_="v",d_="s",f_="r",p_="f",__=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,m_="ls",g_="p",il="ac",y_="websocket",v_="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E_{constructor(e,t,i,s,r=!1,o="",l=!1,c=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=dn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&dn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function hC(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function I_(n,e,t){D(typeof e=="string","typeof type must == string"),D(typeof t=="object","typeof params must == object");let i;if(e===y_)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===v_)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);hC(n)&&(t.ns=n.namespace);const s=[];return Pe(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dC{constructor(){this.counters_={}}incrementCounter(e,t=1){ht(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return eg(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia={},Ta={};function pc(n){const e=n.toString();return Ia[e]||(Ia[e]=new dC),Ia[e]}function fC(n,e){const t=n.toString();return Ta[t]||(Ta[t]=e()),Ta[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&pi(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd="start",_C="close",mC="pLPCommand",gC="pRTLPCB",T_="id",w_="pw",C_="ser",yC="cb",vC="seg",EC="ts",IC="d",TC="dframe",A_=1870,R_=30,wC=A_-R_,CC=25e3,AC=3e4;class Bn{constructor(e,t,i,s,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=xs(e),this.stats_=pc(t),this.urlFn=c=>(this.appCheckToken&&(c[il]=this.appCheckToken),I_(t,v_,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new pC(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(AC)),eC(()=>{if(this.isClosed_)return;this.scriptTagHolder=new _c((...r)=>{const[o,l,c,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===dd)this.id=l,this.password=c;else if(o===_C)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[dd]="t",i[C_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[yC]=this.scriptTagHolder.uniqueCallbackIdentifier),i[h_]=fc,this.transportSessionId&&(i[d_]=this.transportSessionId),this.lastSessionId&&(i[m_]=this.lastSessionId),this.applicationId&&(i[g_]=this.applicationId),this.appCheckToken&&(i[il]=this.appCheckToken),typeof location<"u"&&location.hostname&&__.test(location.hostname)&&(i[f_]=p_);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Bn.forceAllow_=!0}static forceDisallow(){Bn.forceDisallow_=!0}static isAvailable(){return Bn.forceAllow_?!0:!Bn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!nC()&&!iC()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Hd(t),s=c_(i,wC);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[TC]="t",i[T_]=e,i[w_]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Te(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class _c{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Jw(),window[mC+this.uniqueCallbackIdentifier]=e,window[gC+this.uniqueCallbackIdentifier]=t,this.myIFrame=_c.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ce("frame writing exception"),l.stack&&Ce(l.stack),Ce(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ce("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[T_]=this.myID,e[w_]=this.myPW,e[C_]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+R_+i.length<=A_;){const o=this.pendingSegs.shift();i=i+"&"+vC+s+"="+o.seg+"&"+EC+s+"="+o.ts+"&"+IC+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(CC)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Ce("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RC=16384,SC=45e3;let Wr=null;typeof MozWebSocket<"u"?Wr=MozWebSocket:typeof WebSocket<"u"&&(Wr=WebSocket);class Ye{constructor(e,t,i,s,r,o,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=xs(this.connId),this.stats_=pc(t),this.connURL=Ye.connectionURL_(t,o,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[h_]=fc,typeof location<"u"&&location.hostname&&__.test(location.hostname)&&(o[f_]=p_),t&&(o[d_]=t),i&&(o[m_]=i),s&&(o[il]=s),r&&(o[g_]=r),I_(e,y_,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,dn.set("previous_websocket_failure",!0);try{let i;ug(),this.mySock=new Wr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Ye.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Wr!==null&&!Ye.forceDisallow_}static previouslyFailed(){return dn.isInMemoryStorage||dn.get("previous_websocket_failure")===!0}markConnectionHealthy(){dn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=os(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=Te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=c_(t,RC);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(SC))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ye.responsesRequiredToBeHealthy=2;Ye.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Bn,Ye]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Ye&&Ye.isAvailable();let i=t&&!Ye.previouslyFailed();if(e.webSocketOnly&&(t||Be("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Ye];else{const s=this.transports_=[];for(const r of ms.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ms.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ms.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PC=6e4,bC=5e3,kC=10*1024,NC=100*1024,wa="t",fd="d",DC="s",pd="r",OC="e",_d="o",md="a",gd="n",yd="p",MC="h";class VC{constructor(e,t,i,s,r,o,l,c,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=xs("c:"+this.id+":"),this.transportManager_=new ms(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ts(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>NC?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>kC?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(wa in e){const t=e[wa];t===md?this.upgradeIfSecondaryHealthy_():t===pd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===_d&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Vi("t",e),i=Vi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:yd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:md,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:gd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Vi("t",e),i=Vi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Vi(wa,e);if(fd in e){const i=e[fd];if(t===MC){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===gd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===DC?this.onConnectionShutdown_(i):t===pd?this.onReset_(i):t===OC?nl("Server Error: "+i):t===_d?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):nl("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),fc!==i&&Be("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),ts(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(PC))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ts(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(bC))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:yd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(dn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P_{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){D(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr extends P_{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!vl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new jr}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd=32,Ed=768;class te{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function Z(){return new te("")}function j(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Zt(n){return n.pieces_.length-n.pieceNum_}function se(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new te(n.pieces_,e)}function mc(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function LC(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function gs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function b_(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new te(e,0)}function ue(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof te)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new te(t,0)}function H(n){return n.pieceNum_>=n.pieces_.length}function We(n,e){const t=j(n),i=j(e);if(t===null)return e;if(t===i)return We(se(n),se(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function xC(n,e){const t=gs(n,0),i=gs(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=bn(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function gc(n,e){if(Zt(n)!==Zt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Ge(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Zt(n)>Zt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class FC{constructor(e,t){this.errorPrefix_=t,this.parts_=gs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=io(this.parts_[i]);k_(this)}}function UC(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=io(e),k_(n)}function BC(n){const e=n.parts_.pop();n.byteLength_-=io(e),n.parts_.length>0&&(n.byteLength_-=1)}function k_(n){if(n.byteLength_>Ed)throw new Error(n.errorPrefix_+"has a key path longer than "+Ed+" bytes ("+n.byteLength_+").");if(n.parts_.length>vd)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+vd+") or object contains a cycle "+un(n))}function un(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc extends P_{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new yc}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li=1e3,qC=60*5*1e3,Id=30*1e3,WC=1.3,jC=3e4,$C="server_kill",Td=3;class At extends S_{constructor(e,t,i,s,r,o,l,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=At.nextPersistentConnectionId_++,this.log_=xs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Li,this.maxReconnectDelay_=qC,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");yc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&jr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(Te(r)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ws,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const c=l.d,h=l.s;At.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ht(e,"w")){const i=Kn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Be(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yg(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Id)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=gg(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Te(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):nl("Unrecognized action received from server: "+Te(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Li,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Li,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>jC&&(this.reconnectDelay_=Li),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*WC)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+At.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const c=function(){l?l.close():(o=!0,i())},h=function(p){D(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:c,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Ce("getToken() completed but was canceled"):(Ce("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,l=new VC(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,w=>{Be(w+" ("+this.repoInfo_.toString()+")"),this.interrupt($C)},r))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Be(p),c())}}}interrupt(e){Ce("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ce("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ba(this.interruptReasons_)&&(this.reconnectDelay_=Li,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>dc(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new te(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Ce("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Td&&(this.reconnectDelay_=Id,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Ce("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Td&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+o_.replace(/\./g,"-")]=1,vl()?e["framework.cordova"]=1:Xd()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=jr.getInstance().currentlyOnline();return ba(this.interruptReasons_)&&e}}At.nextPersistentConnectionId_=0;At.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new $(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new $(ii,e),s=new $(ii,t);return this.compare(i,s)!==0}minPost(){return $.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hr;class N_ extends So{static get __EMPTY_NODE(){return hr}static set __EMPTY_NODE(e){hr=e}compare(e,t){return bn(e.name,t.name)}isDefinedOn(e){throw li("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(In,hr)}makePost(e,t){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,hr)}toString(){return".key"}}const zn=new N_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ee{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Ee.RED,this.left=s??je.EMPTY_NODE,this.right=r??je.EMPTY_NODE}copy(e,t,i,s,r){return new Ee(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return je.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ee.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ee.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ee.RED=!0;Ee.BLACK=!1;class HC{copy(e,t,i,s,r){return this}insert(e,t,i){return new Ee(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class je{constructor(e,t=je.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new je(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Ee.BLACK,null,null))}remove(e){return new je(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ee.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new dr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new dr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new dr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new dr(this.root_,null,this.comparator_,!0,e)}}je.EMPTY_NODE=new HC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zC(n,e){return bn(n.name,e.name)}function vc(n,e){return bn(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sl;function GC(n){sl=n}const D_=function(n){return typeof n=="number"?"number:"+u_(n):"string:"+n},O_=function(n){if(n.isLeafNode()){const e=n.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ht(e,".sv"),"Priority must be a string or number.")}else D(n===sl||n.isEmpty(),"priority of unexpected type.");D(n===sl||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wd;class ye{constructor(e,t=ye.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),O_(this.priorityNode_)}static set __childrenNodeConstructor(e){wd=e}static get __childrenNodeConstructor(){return wd}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ye(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:j(e)===".priority"?this.priorityNode_:ye.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ye.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=j(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(D(i!==".priority"||Zt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ye.__childrenNodeConstructor.EMPTY_NODE.updateChild(se(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+D_(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=u_(this.value_):e+=this.value_,this.lazyHash_=l_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ye.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ye.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=ye.VALUE_TYPE_ORDER.indexOf(t),r=ye.VALUE_TYPE_ORDER.indexOf(i);return D(s>=0,"Unknown leaf type: "+t),D(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ye.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let M_,V_;function KC(n){M_=n}function QC(n){V_=n}class YC extends So{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?bn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(In,new ye("[PRIORITY-POST]",V_))}makePost(e,t){const i=M_(e);return new $(t,new ye("[PRIORITY-POST]",i))}toString(){return".priority"}}const he=new YC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JC=Math.log(2);class XC{constructor(e){const t=r=>parseInt(Math.log(r)/JC,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $r=function(n,e,t,i){n.sort(e);const s=function(c,h){const f=h-c;let p,m;if(f===0)return null;if(f===1)return p=n[c],m=t?t(p):p,new Ee(m,p.node,Ee.BLACK,null,null);{const w=parseInt(f/2,10)+c,S=s(c,w),N=s(w+1,h);return p=n[w],m=t?t(p):p,new Ee(m,p.node,Ee.BLACK,S,N)}},r=function(c){let h=null,f=null,p=n.length;const m=function(S,N){const k=p-S,W=p;p-=S;const z=s(k+1,W),Q=n[k],le=t?t(Q):Q;w(new Ee(le,Q.node,N,null,z))},w=function(S){h?(h.left=S,h=S):(f=S,h=S)};for(let S=0;S<c.count;++S){const N=c.nextBitIsOne(),k=Math.pow(2,c.count-(S+1));N?m(k,Ee.BLACK):(m(k,Ee.BLACK),m(k,Ee.RED))}return f},o=new XC(n.length),l=r(o);return new je(i||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ca;const Vn={};class Tt{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return D(Vn&&he,"ChildrenNode.ts has not been loaded"),Ca=Ca||new Tt({".priority":Vn},{".priority":he}),Ca}get(e){const t=Kn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof je?t:null}hasIndex(e){return ht(this.indexSet_,e.toString())}addIndex(e,t){D(e!==zn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let l;s?l=$r(i,e.getCompare()):l=Vn;const c=e.toString(),h=Object.assign({},this.indexSet_);h[c]=e;const f=Object.assign({},this.indexes_);return f[c]=l,new Tt(f,h)}addToIndexes(e,t){const i=Ar(this.indexes_,(s,r)=>{const o=Kn(this.indexSet_,r);if(D(o,"Missing index implementation for "+r),s===Vn)if(o.isDefinedOn(e.node)){const l=[],c=t.getIterator($.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&l.push(h),h=c.getNext();return l.push(e),$r(l,o.getCompare())}else return Vn;else{const l=t.get(e.name);let c=s;return l&&(c=c.remove(new $(e.name,l))),c.insert(e,e.node)}});return new Tt(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ar(this.indexes_,s=>{if(s===Vn)return s;{const r=t.get(e.name);return r?s.remove(new $(e.name,r)):s}});return new Tt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;class F{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&O_(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return xi||(xi=new F(new je(vc),null,Tt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||xi}updatePriority(e){return this.children_.isEmpty()?this:new F(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?xi:t}}getChild(e){const t=j(e);return t===null?this:this.getImmediateChild(t).getChild(se(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(D(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new $(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?xi:this.priorityNode_;return new F(s,o,r)}}updateChild(e,t){const i=j(e);if(i===null)return t;{D(j(e)!==".priority"||Zt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(se(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(he,(o,l)=>{t[o]=l.val(e),i++,r&&F.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+D_(this.getPriority().val())+":"),this.forEachChild(he,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":l_(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,$.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Fs?-1:0}withIndex(e){if(e===zn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new F(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===zn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(he),s=t.getIterator(he);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===zn?null:this.indexMap_.get(e.toString())}}F.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ZC extends F{constructor(){super(new je(vc),F.EMPTY_NODE,Tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return F.EMPTY_NODE}isEmpty(){return!1}}const Fs=new ZC;Object.defineProperties($,{MIN:{value:new $(ii,F.EMPTY_NODE)},MAX:{value:new $(In,Fs)}});N_.__EMPTY_NODE=F.EMPTY_NODE;ye.__childrenNodeConstructor=F;GC(Fs);QC(Fs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eA=!0;function Ie(n,e=null){if(n===null)return F.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ye(t,Ie(e))}if(!(n instanceof Array)&&eA){const t=[];let i=!1;if(Pe(n,(o,l)=>{if(o.substring(0,1)!=="."){const c=Ie(l);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new $(o,c)))}}),t.length===0)return F.EMPTY_NODE;const r=$r(t,zC,o=>o.name,vc);if(i){const o=$r(t,he.getCompare());return new F(r,Ie(e),new Tt({".priority":o},{".priority":he}))}else return new F(r,Ie(e),Tt.Default)}else{let t=F.EMPTY_NODE;return Pe(n,(i,s)=>{if(ht(n,i)&&i.substring(0,1)!=="."){const r=Ie(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ie(e))}}KC(Ie);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA extends So{constructor(e){super(),this.indexPath_=e,D(!H(e)&&j(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?bn(e.name,t.name):r}makePost(e,t){const i=Ie(e),s=F.EMPTY_NODE.updateChild(this.indexPath_,i);return new $(t,s)}maxPost(){const e=F.EMPTY_NODE.updateChild(this.indexPath_,Fs);return new $(In,e)}toString(){return gs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nA extends So{compare(e,t){const i=e.node.compareTo(t.node);return i===0?bn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const i=Ie(e);return new $(t,i)}toString(){return".value"}}const iA=new nA;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(n){return{type:"value",snapshotNode:n}}function si(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ys(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function vs(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function sA(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(ys(t,l)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(si(t,i)):o.trackChildChange(vs(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(he,(s,r)=>{t.hasChild(s)||i.trackChildChange(ys(s,r))}),t.isLeafNode()||t.forEachChild(he,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(vs(s,r,o))}else i.trackChildChange(si(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?F.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es{constructor(e){this.indexedFilter_=new Ec(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Es.getStartPost_(e),this.endPost_=Es.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new $(t,i))||(i=F.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=F.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(F.EMPTY_NODE);const r=this;return t.forEachChild(he,(o,l)=>{r.matches(new $(o,l))||(s=s.updateImmediateChild(o,F.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Es(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new $(t,i))||(i=F.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=F.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=F.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(F.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,F.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,w)=>p(w,m)}else o=this.index_.getCompare();const l=e;D(l.numChildren()===this.limit_,"");const c=new $(t,i),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(c);if(l.hasChild(t)){const p=l.getImmediateChild(t);let m=s.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const w=m==null?1:o(m,c);if(f&&!i.isEmpty()&&w>=0)return r!=null&&r.trackChildChange(vs(t,i,p)),l.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(ys(t,p));const N=l.updateImmediateChild(t,F.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(si(m.name,m.node)),N.updateImmediateChild(m.name,m.node)):N}}else return i.isEmpty()?e:f&&o(h,c)>=0?(r!=null&&(r.trackChildChange(ys(h.name,h.node)),r.trackChildChange(si(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(h.name,F.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=he}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ii}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:In}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===he}copy(){const e=new Ic;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function oA(n){return n.loadsAllData()?new Ec(n.getIndex()):n.hasLimit()?new rA(n):new Es(n)}function Cd(n){const e={};if(n.isDefault())return e;let t;if(n.index_===he?t="$priority":n.index_===iA?t="$value":n.index_===zn?t="$key":(D(n.index_ instanceof tA,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Te(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=Te(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+Te(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=Te(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+Te(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ad(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==he&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr extends S_{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=xs("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Hr.getListenId_(e,i),l={};this.listens_[o]=l;const c=Cd(e._queryParams);this.restRequest_(r+".json",c,(h,f)=>{let p=f;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(r,p,!1,i),Kn(this.listens_,o)===l){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",s(m,null)}})}unlisten(e,t){const i=Hr.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Cd(e._queryParams),i=e._path.toString(),s=new ws;return this.restRequest_(i+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ci(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=os(l.responseText)}catch{Be("Failed to parse JSON response for "+o+": "+l.responseText)}i(null,c)}else l.status!==401&&l.status!==404&&Be("Got unsuccessful REST response for "+o+" Status: "+l.status),i(l.status);i=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(){this.rootNode_=F.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(){return{value:null,children:new Map}}function x_(n,e,t){if(H(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=j(e);n.children.has(i)||n.children.set(i,zr());const s=n.children.get(i);e=se(e),x_(s,e,t)}}function rl(n,e,t){n.value!==null?t(e,n.value):lA(n,(i,s)=>{const r=new te(e.toString()+"/"+i);rl(s,r,t)})}function lA(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Pe(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rd=10*1e3,uA=30*1e3,hA=5*60*1e3;class dA{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new cA(e);const i=Rd+(uA-Rd)*Math.random();ts(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Pe(e,(s,r)=>{r>0&&ht(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),ts(this.reportStats_.bind(this),Math.floor(Math.random()*2*hA))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function Tc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function wc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Cc(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Je.ACK_USER_WRITE,this.source=Tc()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new te(e));return new Gr(Z(),t,this.revert)}}else return D(j(this.path)===e,"operationForChild called for unrelated child."),new Gr(se(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,t){this.source=e,this.path=t,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new Is(this.source,Z()):new Is(this.source,se(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Je.OVERWRITE}operationForChild(e){return H(this.path)?new Tn(this.source,Z(),this.snap.getImmediateChild(e)):new Tn(this.source,se(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Je.MERGE}operationForChild(e){if(H(this.path)){const t=this.children.subtree(new te(e));return t.isEmpty()?null:t.value?new Tn(this.source,Z(),t.value):new ri(this.source,Z(),t)}else return D(j(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ri(this.source,se(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const t=j(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function pA(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(sA(o.childName,o.snapshotNode))}),Fi(n,s,"child_removed",e,i,t),Fi(n,s,"child_added",e,i,t),Fi(n,s,"child_moved",r,i,t),Fi(n,s,"child_changed",e,i,t),Fi(n,s,"value",e,i,t),s}function Fi(n,e,t,i,s,r){const o=i.filter(l=>l.type===t);o.sort((l,c)=>mA(n,l,c)),o.forEach(l=>{const c=_A(n,l,r);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(c,n.query_))})})}function _A(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function mA(n,e,t){if(e.childName==null||t.childName==null)throw li("Should only compare child_ events.");const i=new $(e.childName,e.snapshotNode),s=new $(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n,e){return{eventCache:n,serverCache:e}}function ns(n,e,t,i){return Po(new wn(e,t,i),n.serverCache)}function F_(n,e,t,i){return Po(n.eventCache,new wn(e,t,i))}function ol(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Cn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Aa;const gA=()=>(Aa||(Aa=new je(tC)),Aa);class ie{constructor(e,t=gA()){this.value=e,this.children=t}static fromObject(e){let t=new ie(null);return Pe(e,(i,s)=>{t=t.set(new te(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Z(),value:this.value};if(H(e))return null;{const i=j(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(se(e),t);return r!=null?{path:ue(new te(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const t=j(e),i=this.children.get(t);return i!==null?i.subtree(se(e)):new ie(null)}}set(e,t){if(H(e))return new ie(t,this.children);{const i=j(e),r=(this.children.get(i)||new ie(null)).set(se(e),t),o=this.children.insert(i,r);return new ie(this.value,o)}}remove(e){if(H(e))return this.children.isEmpty()?new ie(null):new ie(null,this.children);{const t=j(e),i=this.children.get(t);if(i){const s=i.remove(se(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new ie(null):new ie(this.value,r)}else return this}}get(e){if(H(e))return this.value;{const t=j(e),i=this.children.get(t);return i?i.get(se(e)):null}}setTree(e,t){if(H(e))return t;{const i=j(e),r=(this.children.get(i)||new ie(null)).setTree(se(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new ie(this.value,o)}}fold(e){return this.fold_(Z(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ue(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,Z(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(H(e))return null;{const r=j(e),o=this.children.get(r);return o?o.findOnPath_(se(e),ue(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Z(),t)}foreachOnPath_(e,t,i){if(H(e))return this;{this.value&&i(t,this.value);const s=j(e),r=this.children.get(s);return r?r.foreachOnPath_(se(e),ue(t,s),i):new ie(null)}}foreach(e){this.foreach_(Z(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ue(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.writeTree_=e}static empty(){return new Xe(new ie(null))}}function is(n,e,t){if(H(e))return new Xe(new ie(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=We(s,e);return r=r.updateChild(o,t),new Xe(n.writeTree_.set(s,r))}else{const s=new ie(t),r=n.writeTree_.setTree(e,s);return new Xe(r)}}}function al(n,e,t){let i=n;return Pe(t,(s,r)=>{i=is(i,ue(e,s),r)}),i}function Sd(n,e){if(H(e))return Xe.empty();{const t=n.writeTree_.setTree(e,new ie(null));return new Xe(t)}}function ll(n,e){return kn(n,e)!=null}function kn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(We(t.path,e)):null}function Pd(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(he,(i,s)=>{e.push(new $(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new $(i,s.value))}),e}function Kt(n,e){if(H(e))return n;{const t=kn(n,e);return t!=null?new Xe(new ie(t)):new Xe(n.writeTree_.subtree(e))}}function cl(n){return n.writeTree_.isEmpty()}function oi(n,e){return U_(Z(),n.writeTree_,e)}function U_(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(D(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=U_(ue(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ue(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ac(n,e){return j_(e,n)}function yA(n,e,t,i,s){D(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=is(n.visibleWrites,e,t)),n.lastWriteId=i}function vA(n,e,t,i){D(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=al(n.visibleWrites,e,t),n.lastWriteId=i}function EA(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function IA(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);D(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const l=n.allWrites[o];l.visible&&(o>=t&&TA(l,i.path)?s=!1:Ge(i.path,l.path)&&(r=!0)),o--}if(s){if(r)return wA(n),!0;if(i.snap)n.visibleWrites=Sd(n.visibleWrites,i.path);else{const l=i.children;Pe(l,c=>{n.visibleWrites=Sd(n.visibleWrites,ue(i.path,c))})}return!0}else return!1}function TA(n,e){if(n.snap)return Ge(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ge(ue(n.path,t),e))return!0;return!1}function wA(n){n.visibleWrites=B_(n.allWrites,CA,Z()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function CA(n){return n.visible}function B_(n,e,t){let i=Xe.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let l;if(r.snap)Ge(t,o)?(l=We(t,o),i=is(i,l,r.snap)):Ge(o,t)&&(l=We(o,t),i=is(i,Z(),r.snap.getChild(l)));else if(r.children){if(Ge(t,o))l=We(t,o),i=al(i,l,r.children);else if(Ge(o,t))if(l=We(o,t),H(l))i=al(i,Z(),r.children);else{const c=Kn(r.children,j(l));if(c){const h=c.getChild(se(l));i=is(i,Z(),h)}}}else throw li("WriteRecord should have .snap or .children")}}return i}function q_(n,e,t,i,s){if(!i&&!s){const r=kn(n.visibleWrites,e);if(r!=null)return r;{const o=Kt(n.visibleWrites,e);if(cl(o))return t;if(t==null&&!ll(o,Z()))return null;{const l=t||F.EMPTY_NODE;return oi(o,l)}}}else{const r=Kt(n.visibleWrites,e);if(!s&&cl(r))return t;if(!s&&t==null&&!ll(r,Z()))return null;{const o=function(h){return(h.visible||s)&&(!i||!~i.indexOf(h.writeId))&&(Ge(h.path,e)||Ge(e,h.path))},l=B_(n.allWrites,o,e),c=t||F.EMPTY_NODE;return oi(l,c)}}}function AA(n,e,t){let i=F.EMPTY_NODE;const s=kn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(he,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Kt(n.visibleWrites,e);return t.forEachChild(he,(o,l)=>{const c=oi(Kt(r,new te(o)),l);i=i.updateImmediateChild(o,c)}),Pd(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Kt(n.visibleWrites,e);return Pd(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function RA(n,e,t,i,s){D(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ue(e,t);if(ll(n.visibleWrites,r))return null;{const o=Kt(n.visibleWrites,r);return cl(o)?s.getChild(t):oi(o,s.getChild(t))}}function SA(n,e,t,i){const s=ue(e,t),r=kn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Kt(n.visibleWrites,s);return oi(o,i.getNode().getImmediateChild(t))}else return null}function PA(n,e){return kn(n.visibleWrites,e)}function bA(n,e,t,i,s,r,o){let l;const c=Kt(n.visibleWrites,e),h=kn(c,Z());if(h!=null)l=h;else if(t!=null)l=oi(c,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],p=o.getCompare(),m=r?l.getReverseIteratorFrom(i,o):l.getIteratorFrom(i,o);let w=m.getNext();for(;w&&f.length<s;)p(w,i)!==0&&f.push(w),w=m.getNext();return f}else return[]}function kA(){return{visibleWrites:Xe.empty(),allWrites:[],lastWriteId:-1}}function Kr(n,e,t,i){return q_(n.writeTree,n.treePath,e,t,i)}function Rc(n,e){return AA(n.writeTree,n.treePath,e)}function bd(n,e,t,i){return RA(n.writeTree,n.treePath,e,t,i)}function Qr(n,e){return PA(n.writeTree,ue(n.treePath,e))}function NA(n,e,t,i,s,r){return bA(n.writeTree,n.treePath,e,t,i,s,r)}function Sc(n,e,t){return SA(n.writeTree,n.treePath,e,t)}function W_(n,e){return j_(ue(n.treePath,e),n.writeTree)}function j_(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;D(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),D(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,vs(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,ys(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,si(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,vs(i,e.snapshotNode,s.oldSnap));else throw li("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const $_=new OA;class Pc{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new wn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Sc(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Cn(this.viewCache_),r=NA(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MA(n){return{filter:n}}function VA(n,e){D(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function LA(n,e,t,i,s){const r=new DA;let o,l;if(t.type===Je.OVERWRITE){const h=t;h.source.fromUser?o=ul(n,e,h.path,h.snap,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!H(h.path),o=Yr(n,e,h.path,h.snap,i,s,l,r))}else if(t.type===Je.MERGE){const h=t;h.source.fromUser?o=FA(n,e,h.path,h.children,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=hl(n,e,h.path,h.children,i,s,l,r))}else if(t.type===Je.ACK_USER_WRITE){const h=t;h.revert?o=qA(n,e,h.path,i,s,r):o=UA(n,e,h.path,h.affectedTree,i,s,r)}else if(t.type===Je.LISTEN_COMPLETE)o=BA(n,e,t.path,i,r);else throw li("Unknown operation type: "+t.type);const c=r.getChanges();return xA(e,o,c),{viewCache:o,changes:c}}function xA(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=ol(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(L_(ol(e)))}}function H_(n,e,t,i,s,r){const o=e.eventCache;if(Qr(i,t)!=null)return e;{let l,c;if(H(t))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Cn(e),f=h instanceof F?h:F.EMPTY_NODE,p=Rc(i,f);l=n.filter.updateFullNode(e.eventCache.getNode(),p,r)}else{const h=Kr(i,Cn(e));l=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=j(t);if(h===".priority"){D(Zt(t)===1,"Can't have a priority with additional path components");const f=o.getNode();c=e.serverCache.getNode();const p=bd(i,t,f,c);p!=null?l=n.filter.updatePriority(f,p):l=o.getNode()}else{const f=se(t);let p;if(o.isCompleteForChild(h)){c=e.serverCache.getNode();const m=bd(i,t,o.getNode(),c);m!=null?p=o.getNode().getImmediateChild(h).updateChild(f,m):p=o.getNode().getImmediateChild(h)}else p=Sc(i,h,e.serverCache);p!=null?l=n.filter.updateChild(o.getNode(),h,p,f,s,r):l=o.getNode()}}return ns(e,l,o.isFullyInitialized()||H(t),n.filter.filtersNodes())}}function Yr(n,e,t,i,s,r,o,l){const c=e.serverCache;let h;const f=o?n.filter:n.filter.getIndexedFilter();if(H(t))h=f.updateFullNode(c.getNode(),i,null);else if(f.filtersNodes()&&!c.isFiltered()){const w=c.getNode().updateChild(t,i);h=f.updateFullNode(c.getNode(),w,null)}else{const w=j(t);if(!c.isCompleteForPath(t)&&Zt(t)>1)return e;const S=se(t),k=c.getNode().getImmediateChild(w).updateChild(S,i);w===".priority"?h=f.updatePriority(c.getNode(),k):h=f.updateChild(c.getNode(),w,k,S,$_,null)}const p=F_(e,h,c.isFullyInitialized()||H(t),f.filtersNodes()),m=new Pc(s,p,r);return H_(n,p,t,s,m,l)}function ul(n,e,t,i,s,r,o){const l=e.eventCache;let c,h;const f=new Pc(s,e,r);if(H(t))h=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=ns(e,h,!0,n.filter.filtersNodes());else{const p=j(t);if(p===".priority")h=n.filter.updatePriority(e.eventCache.getNode(),i),c=ns(e,h,l.isFullyInitialized(),l.isFiltered());else{const m=se(t),w=l.getNode().getImmediateChild(p);let S;if(H(m))S=i;else{const N=f.getCompleteChild(p);N!=null?mc(m)===".priority"&&N.getChild(b_(m)).isEmpty()?S=N:S=N.updateChild(m,i):S=F.EMPTY_NODE}if(w.equals(S))c=e;else{const N=n.filter.updateChild(l.getNode(),p,S,m,f,o);c=ns(e,N,l.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function kd(n,e){return n.eventCache.isCompleteForChild(e)}function FA(n,e,t,i,s,r,o){let l=e;return i.foreach((c,h)=>{const f=ue(t,c);kd(e,j(f))&&(l=ul(n,l,f,h,s,r,o))}),i.foreach((c,h)=>{const f=ue(t,c);kd(e,j(f))||(l=ul(n,l,f,h,s,r,o))}),l}function Nd(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function hl(n,e,t,i,s,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;H(t)?h=i:h=new ie(null).setTree(t,i);const f=e.serverCache.getNode();return h.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){const w=e.serverCache.getNode().getImmediateChild(p),S=Nd(n,w,m);c=Yr(n,c,new te(p),S,s,r,o,l)}}),h.children.inorderTraversal((p,m)=>{const w=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!w){const S=e.serverCache.getNode().getImmediateChild(p),N=Nd(n,S,m);c=Yr(n,c,new te(p),N,s,r,o,l)}}),c}function UA(n,e,t,i,s,r,o){if(Qr(s,t)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(H(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Yr(n,e,t,c.getNode().getChild(t),s,r,l,o);if(H(t)){let h=new ie(null);return c.getNode().forEachChild(zn,(f,p)=>{h=h.set(new te(f),p)}),hl(n,e,t,h,s,r,l,o)}else return e}else{let h=new ie(null);return i.foreach((f,p)=>{const m=ue(t,f);c.isCompleteForPath(m)&&(h=h.set(f,c.getNode().getChild(m)))}),hl(n,e,t,h,s,r,l,o)}}function BA(n,e,t,i,s){const r=e.serverCache,o=F_(e,r.getNode(),r.isFullyInitialized()||H(t),r.isFiltered());return H_(n,o,t,i,$_,s)}function qA(n,e,t,i,s,r){let o;if(Qr(i,t)!=null)return e;{const l=new Pc(i,e,s),c=e.eventCache.getNode();let h;if(H(t)||j(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Kr(i,Cn(e));else{const p=e.serverCache.getNode();D(p instanceof F,"serverChildren would be complete if leaf node"),f=Rc(i,p)}f=f,h=n.filter.updateFullNode(c,f,r)}else{const f=j(t);let p=Sc(i,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=c.getImmediateChild(f)),p!=null?h=n.filter.updateChild(c,f,p,se(t),l,r):e.eventCache.getNode().hasChild(f)?h=n.filter.updateChild(c,f,F.EMPTY_NODE,se(t),l,r):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Kr(i,Cn(e)),o.isLeafNode()&&(h=n.filter.updateFullNode(h,o,r)))}return o=e.serverCache.isFullyInitialized()||Qr(i,Z())!=null,ns(e,h,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ec(i.getIndex()),r=oA(i);this.processor_=MA(r);const o=t.serverCache,l=t.eventCache,c=s.updateFullNode(F.EMPTY_NODE,o.getNode(),null),h=r.updateFullNode(F.EMPTY_NODE,l.getNode(),null),f=new wn(c,o.isFullyInitialized(),s.filtersNodes()),p=new wn(h,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Po(p,f),this.eventGenerator_=new fA(this.query_)}get query(){return this.query_}}function jA(n){return n.viewCache_.serverCache.getNode()}function $A(n,e){const t=Cn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!H(e)&&!t.getImmediateChild(j(e)).isEmpty())?t.getChild(e):null}function Dd(n){return n.eventRegistrations_.length===0}function HA(n,e){n.eventRegistrations_.push(e)}function Od(n,e,t){const i=[];if(t){D(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Md(n,e,t,i){e.type===Je.MERGE&&e.source.queryId!==null&&(D(Cn(n.viewCache_),"We should always have a full cache before handling merges"),D(ol(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=LA(n.processor_,s,e,t,i);return VA(n.processor_,r.viewCache),D(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,z_(n,r.changes,r.viewCache.eventCache.getNode(),null)}function zA(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(he,(r,o)=>{i.push(si(r,o))}),t.isFullyInitialized()&&i.push(L_(t.getNode())),z_(n,i,t.getNode(),e)}function z_(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return pA(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jr;class GA{constructor(){this.views=new Map}}function KA(n){D(!Jr,"__referenceConstructor has already been defined"),Jr=n}function QA(){return D(Jr,"Reference.ts has not been loaded"),Jr}function YA(n){return n.views.size===0}function bc(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return D(r!=null,"SyncTree gave us an op for an invalid query."),Md(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Md(o,e,t,i));return r}}function JA(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let l=Kr(t,s?i:null),c=!1;l?c=!0:i instanceof F?(l=Rc(t,i),c=!1):(l=F.EMPTY_NODE,c=!1);const h=Po(new wn(l,c,!1),new wn(i,s,!1));return new WA(e,h)}return o}function XA(n,e,t,i,s,r){const o=JA(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),HA(o,t),zA(o,t)}function ZA(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const l=en(n);if(s==="default")for(const[c,h]of n.views.entries())o=o.concat(Od(h,t,i)),Dd(h)&&(n.views.delete(c),h.query._queryParams.loadsAllData()||r.push(h.query));else{const c=n.views.get(s);c&&(o=o.concat(Od(c,t,i)),Dd(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return l&&!en(n)&&r.push(new(QA())(e._repo,e._path)),{removed:r,events:o}}function G_(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Gn(n,e){let t=null;for(const i of n.views.values())t=t||$A(i,e);return t}function K_(n,e){if(e._queryParams.loadsAllData())return bo(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Q_(n,e){return K_(n,e)!=null}function en(n){return bo(n)!=null}function bo(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xr;function eR(n){D(!Xr,"__referenceConstructor has already been defined"),Xr=n}function tR(){return D(Xr,"Reference.ts has not been loaded"),Xr}let nR=1;class Vd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ie(null),this.pendingWriteTree_=kA(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Y_(n,e,t,i,s){return yA(n.pendingWriteTree_,e,t,i,s),s?_i(n,new Tn(Tc(),e,t)):[]}function iR(n,e,t,i){vA(n.pendingWriteTree_,e,t,i);const s=ie.fromObject(t);return _i(n,new ri(Tc(),e,s))}function jt(n,e,t=!1){const i=EA(n.pendingWriteTree_,e);if(IA(n.pendingWriteTree_,e)){let r=new ie(null);return i.snap!=null?r=r.set(Z(),!0):Pe(i.children,o=>{r=r.set(new te(o),!0)}),_i(n,new Gr(i.path,r,t))}else return[]}function ko(n,e,t){return _i(n,new Tn(wc(),e,t))}function sR(n,e,t){const i=ie.fromObject(t);return _i(n,new ri(wc(),e,i))}function rR(n,e){return _i(n,new Is(wc(),e))}function oR(n,e,t){const i=Nc(n,t);if(i){const s=Dc(i),r=s.path,o=s.queryId,l=We(r,e),c=new Is(Cc(o),l);return Oc(n,r,c)}else return[]}function dl(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Q_(o,e))){const c=ZA(o,e,t,i);YA(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const h=c.removed;if(l=c.events,!s){const f=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(r,(m,w)=>en(w));if(f&&!p){const m=n.syncPointTree_.subtree(r);if(!m.isEmpty()){const w=cR(m);for(let S=0;S<w.length;++S){const N=w[S],k=N.query,W=Z_(n,N);n.listenProvider_.startListening(ss(k),Zr(n,k),W.hashFn,W.onComplete)}}}!p&&h.length>0&&!i&&(f?n.listenProvider_.stopListening(ss(e),null):h.forEach(m=>{const w=n.queryToTagMap.get(No(m));n.listenProvider_.stopListening(ss(m),w)}))}uR(n,h)}return l}function aR(n,e,t,i){const s=Nc(n,i);if(s!=null){const r=Dc(s),o=r.path,l=r.queryId,c=We(o,e),h=new Tn(Cc(l),c,t);return Oc(n,o,h)}else return[]}function lR(n,e,t,i){const s=Nc(n,i);if(s){const r=Dc(s),o=r.path,l=r.queryId,c=We(o,e),h=ie.fromObject(t),f=new ri(Cc(l),c,h);return Oc(n,o,f)}else return[]}function Ld(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(m,w)=>{const S=We(m,s);r=r||Gn(w,S),o=o||en(w)});let l=n.syncPointTree_.get(s);l?(o=o||en(l),r=r||Gn(l,Z())):(l=new GA,n.syncPointTree_=n.syncPointTree_.set(s,l));let c;r!=null?c=!0:(c=!1,r=F.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((w,S)=>{const N=Gn(S,Z());N&&(r=r.updateImmediateChild(w,N))}));const h=Q_(l,e);if(!h&&!e._queryParams.loadsAllData()){const m=No(e);D(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const w=hR();n.queryToTagMap.set(m,w),n.tagToQueryMap.set(w,m)}const f=Ac(n.pendingWriteTree_,s);let p=XA(l,e,t,f,r,c);if(!h&&!o&&!i){const m=K_(l,e);p=p.concat(dR(n,e,m))}return p}function kc(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,l)=>{const c=We(o,e),h=Gn(l,c);if(h)return h});return q_(s,e,r,t,!0)}function _i(n,e){return J_(e,n.syncPointTree_,null,Ac(n.pendingWriteTree_,Z()))}function J_(n,e,t,i){if(H(n.path))return X_(n,e,t,i);{const s=e.get(Z());t==null&&s!=null&&(t=Gn(s,Z()));let r=[];const o=j(n.path),l=n.operationForChild(o),c=e.children.get(o);if(c&&l){const h=t?t.getImmediateChild(o):null,f=W_(i,o);r=r.concat(J_(l,c,h,f))}return s&&(r=r.concat(bc(s,n,i,t))),r}}function X_(n,e,t,i){const s=e.get(Z());t==null&&s!=null&&(t=Gn(s,Z()));let r=[];return e.children.inorderTraversal((o,l)=>{const c=t?t.getImmediateChild(o):null,h=W_(i,o),f=n.operationForChild(o);f&&(r=r.concat(X_(f,l,c,h)))}),s&&(r=r.concat(bc(s,n,i,t))),r}function Z_(n,e){const t=e.query,i=Zr(n,t);return{hashFn:()=>(jA(e)||F.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?oR(n,t._path,i):rR(n,t._path);{const r=sC(s,t);return dl(n,t,null,r)}}}}function Zr(n,e){const t=No(e);return n.queryToTagMap.get(t)}function No(n){return n._path.toString()+"$"+n._queryIdentifier}function Nc(n,e){return n.tagToQueryMap.get(e)}function Dc(n){const e=n.indexOf("$");return D(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new te(n.substr(0,e))}}function Oc(n,e,t){const i=n.syncPointTree_.get(e);D(i,"Missing sync point for query tag that we're tracking");const s=Ac(n.pendingWriteTree_,e);return bc(i,t,s,null)}function cR(n){return n.fold((e,t,i)=>{if(t&&en(t))return[bo(t)];{let s=[];return t&&(s=G_(t)),Pe(i,(r,o)=>{s=s.concat(o)}),s}})}function ss(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(tR())(n._repo,n._path):n}function uR(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=No(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function hR(){return nR++}function dR(n,e,t){const i=e._path,s=Zr(n,e),r=Z_(n,t),o=n.listenProvider_.startListening(ss(e),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)D(!en(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((h,f,p)=>{if(!H(h)&&f&&en(f))return[bo(f).query];{let m=[];return f&&(m=m.concat(G_(f).map(w=>w.query))),Pe(p,(w,S)=>{m=m.concat(S)}),m}});for(let h=0;h<c.length;++h){const f=c[h];n.listenProvider_.stopListening(ss(f),Zr(n,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Mc(t)}node(){return this.node_}}class Vc{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ue(this.path_,e);return new Vc(this.syncTree_,t)}node(){return kc(this.syncTree_,this.path_)}}const fR=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},xd=function(n,e,t){if(!n||typeof n!="object")return n;if(D(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return pR(n[".sv"],e,t);if(typeof n[".sv"]=="object")return _R(n[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},pR=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:D(!1,"Unexpected server value: "+n)}},_R=function(n,e,t){n.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&D(!1,"Unexpected increment value: "+i);const s=e.node();if(D(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},em=function(n,e,t,i){return Lc(e,new Vc(t,n),i)},tm=function(n,e,t){return Lc(n,new Mc(e),t)};function Lc(n,e,t){const i=n.getPriority().val(),s=xd(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,l=xd(o.getValue(),e,t);return l!==o.getValue()||s!==o.getPriority().val()?new ye(l,Ie(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new ye(s))),o.forEachChild(he,(l,c)=>{const h=Lc(c,e.getImmediateChild(l),t);h!==c&&(r=r.updateImmediateChild(l,h))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Fc(n,e){let t=e instanceof te?e:new te(e),i=n,s=j(t);for(;s!==null;){const r=Kn(i.node.children,s)||{children:{},childCount:0};i=new xc(s,i,r),t=se(t),s=j(t)}return i}function mi(n){return n.node.value}function nm(n,e){n.node.value=e,fl(n)}function im(n){return n.node.childCount>0}function mR(n){return mi(n)===void 0&&!im(n)}function Do(n,e){Pe(n.node.children,(t,i)=>{e(new xc(t,n,i))})}function sm(n,e,t,i){t&&e(n),Do(n,s=>{sm(s,e,!0)})}function gR(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Us(n){return new te(n.parent===null?n.name:Us(n.parent)+"/"+n.name)}function fl(n){n.parent!==null&&yR(n.parent,n.name,n)}function yR(n,e,t){const i=mR(t),s=ht(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,fl(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,fl(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=/[\[\].#$\/\u0000-\u001F\u007F]/,ER=/[\[\].#$\u0000-\u001F\u007F]/,Ra=10*1024*1024,Uc=function(n){return typeof n=="string"&&n.length!==0&&!vR.test(n)},rm=function(n){return typeof n=="string"&&n.length!==0&&!ER.test(n)},IR=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),rm(n)},TR=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!hc(n)||n&&typeof n=="object"&&ht(n,".sv")},om=function(n,e,t,i){i&&e===void 0||Oo(no(n,"value"),e,t)},Oo=function(n,e,t){const i=t instanceof te?new FC(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+un(i));if(typeof e=="function")throw new Error(n+"contains a function "+un(i)+" with contents = "+e.toString());if(hc(e))throw new Error(n+"contains "+e.toString()+" "+un(i));if(typeof e=="string"&&e.length>Ra/3&&io(e)>Ra)throw new Error(n+"contains a string greater than "+Ra+" utf8 bytes "+un(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Pe(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Uc(o)))throw new Error(n+" contains an invalid key ("+o+") "+un(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);UC(i,o),Oo(n,l,i),BC(i)}),s&&r)throw new Error(n+' contains ".value" child '+un(i)+" in addition to actual children.")}},wR=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=gs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Uc(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(xC);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Ge(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},CR=function(n,e,t,i){const s=no(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Pe(e,(o,l)=>{const c=new te(o);if(Oo(s,l,ue(t,c)),mc(c)===".priority"&&!TR(l))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),wR(s,r)},am=function(n,e,t,i){if(!rm(t))throw new Error(no(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},AR=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),am(n,e,t)},Bc=function(n,e){if(j(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},RR=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Uc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!IR(t))throw new Error(no(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Mo(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!gc(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function lm(n,e,t){Mo(n,t),cm(n,i=>gc(i,e))}function et(n,e,t){Mo(n,t),cm(n,i=>Ge(i,e)||Ge(e,i))}function cm(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(PR(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function PR(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();es&&Ce("event: "+t.toString()),pi(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bR="repo_interrupt",kR=25;class NR{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new SR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=zr(),this.transactionQueueTree_=new xc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function DR(n,e,t){if(n.stats_=pc(n.repoInfo_),n.forceRestClient_||lC())n.server_=new Hr(n.repoInfo_,(i,s,r,o)=>{Fd(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ud(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Te(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new At(n.repoInfo_,e,(i,s,r,o)=>{Fd(n,i,s,r,o)},i=>{Ud(n,i)},i=>{OR(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=fC(n.repoInfo_,()=>new dA(n.stats_,n.server_)),n.infoData_=new aA,n.infoSyncTree_=new Vd({startListening:(i,s,r,o)=>{let l=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(l=ko(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),qc(n,"connected",!1),n.serverSyncTree_=new Vd({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(l,c)=>{const h=o(l,c);et(n.eventQueue_,i._path,h)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function um(n){const t=n.infoData_.getNode(new te(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Vo(n){return fR({timestamp:um(n)})}function Fd(n,e,t,i,s){n.dataUpdateCount++;const r=new te(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Ar(t,h=>Ie(h));o=lR(n.serverSyncTree_,r,c,s)}else{const c=Ie(t);o=aR(n.serverSyncTree_,r,c,s)}else if(i){const c=Ar(t,h=>Ie(h));o=sR(n.serverSyncTree_,r,c)}else{const c=Ie(t);o=ko(n.serverSyncTree_,r,c)}let l=r;o.length>0&&(l=ai(n,r)),et(n.eventQueue_,l,o)}function Ud(n,e){qc(n,"connected",e),e===!1&&LR(n)}function OR(n,e){Pe(e,(t,i)=>{qc(n,t,i)})}function qc(n,e,t){const i=new te("/.info/"+e),s=Ie(t);n.infoData_.updateSnapshot(i,s);const r=ko(n.infoSyncTree_,i,s);et(n.eventQueue_,i,r)}function Wc(n){return n.nextWriteId_++}function MR(n,e,t,i,s){Lo(n,"set",{path:e.toString(),value:t,priority:i});const r=Vo(n),o=Ie(t,i),l=kc(n.serverSyncTree_,e),c=tm(o,l,r),h=Wc(n),f=Y_(n.serverSyncTree_,e,c,h,!0);Mo(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(m,w)=>{const S=m==="ok";S||Be("set at "+e+" failed: "+m);const N=jt(n.serverSyncTree_,h,!S);et(n.eventQueue_,e,N),_l(n,s,m,w)});const p=$c(n,e);ai(n,p),et(n.eventQueue_,p,[])}function VR(n,e,t,i){Lo(n,"update",{path:e.toString(),value:t});let s=!0;const r=Vo(n),o={};if(Pe(t,(l,c)=>{s=!1,o[l]=em(ue(e,l),Ie(c),n.serverSyncTree_,r)}),s)Ce("update() called with empty data.  Don't do anything."),_l(n,i,"ok",void 0);else{const l=Wc(n),c=iR(n.serverSyncTree_,e,o,l);Mo(n.eventQueue_,c),n.server_.merge(e.toString(),t,(h,f)=>{const p=h==="ok";p||Be("update at "+e+" failed: "+h);const m=jt(n.serverSyncTree_,l,!p),w=m.length>0?ai(n,e):e;et(n.eventQueue_,w,m),_l(n,i,h,f)}),Pe(t,h=>{const f=$c(n,ue(e,h));ai(n,f)}),et(n.eventQueue_,e,[])}}function LR(n){Lo(n,"onDisconnectEvents");const e=Vo(n),t=zr();rl(n.onDisconnect_,Z(),(s,r)=>{const o=em(s,r,n.serverSyncTree_,e);x_(t,s,o)});let i=[];rl(t,Z(),(s,r)=>{i=i.concat(ko(n.serverSyncTree_,s,r));const o=$c(n,s);ai(n,o)}),n.onDisconnect_=zr(),et(n.eventQueue_,Z(),i)}function xR(n,e,t){let i;j(e._path)===".info"?i=Ld(n.infoSyncTree_,e,t):i=Ld(n.serverSyncTree_,e,t),lm(n.eventQueue_,e._path,i)}function pl(n,e,t){let i;j(e._path)===".info"?i=dl(n.infoSyncTree_,e,t):i=dl(n.serverSyncTree_,e,t),lm(n.eventQueue_,e._path,i)}function FR(n){n.persistentConnection_&&n.persistentConnection_.interrupt(bR)}function Lo(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Ce(t,...e)}function _l(n,e,t,i){e&&pi(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function hm(n,e,t){return kc(n.serverSyncTree_,e,t)||F.EMPTY_NODE}function jc(n,e=n.transactionQueueTree_){if(e||xo(n,e),mi(e)){const t=fm(n,e);D(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&UR(n,Us(e),t)}else im(e)&&Do(e,t=>{jc(n,t)})}function UR(n,e,t){const i=t.map(h=>h.currentWriteId),s=hm(n,e,i);let r=s;const o=s.hash();for(let h=0;h<t.length;h++){const f=t[h];D(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=We(e,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const l=r.val(!0),c=e;n.server_.put(c.toString(),l,h=>{Lo(n,"transaction put response",{path:c.toString(),status:h});let f=[];if(h==="ok"){const p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(jt(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();xo(n,Fc(n.transactionQueueTree_,e)),jc(n,n.transactionQueueTree_),et(n.eventQueue_,e,f);for(let m=0;m<p.length;m++)pi(p[m])}else{if(h==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{Be("transaction at "+c.toString()+" failed: "+h);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=h}ai(n,e)}},o)}function ai(n,e){const t=dm(n,e),i=Us(t),s=fm(n,t);return BR(n,s,i),i}function BR(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],h=We(t,c.path);let f=!1,p;if(D(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)f=!0,p=c.abortReason,s=s.concat(jt(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=kR)f=!0,p="maxretry",s=s.concat(jt(n.serverSyncTree_,c.currentWriteId,!0));else{const m=hm(n,c.path,o);c.currentInputSnapshot=m;const w=e[l].update(m.val());if(w!==void 0){Oo("transaction failed: Data returned ",w,c.path);let S=Ie(w);typeof w=="object"&&w!=null&&ht(w,".priority")||(S=S.updatePriority(m.getPriority()));const k=c.currentWriteId,W=Vo(n),z=tm(S,m,W);c.currentOutputSnapshotRaw=S,c.currentOutputSnapshotResolved=z,c.currentWriteId=Wc(n),o.splice(o.indexOf(k),1),s=s.concat(Y_(n.serverSyncTree_,c.path,z,c.currentWriteId,c.applyLocally)),s=s.concat(jt(n.serverSyncTree_,k,!0))}else f=!0,p="nodata",s=s.concat(jt(n.serverSyncTree_,c.currentWriteId,!0))}et(n.eventQueue_,t,s),s=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(p),!1,null))))}xo(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)pi(i[l]);jc(n,n.transactionQueueTree_)}function dm(n,e){let t,i=n.transactionQueueTree_;for(t=j(e);t!==null&&mi(i)===void 0;)i=Fc(i,t),e=se(e),t=j(e);return i}function fm(n,e){const t=[];return pm(n,e,t),t.sort((i,s)=>i.order-s.order),t}function pm(n,e,t){const i=mi(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Do(e,s=>{pm(n,s,t)})}function xo(n,e){const t=mi(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,nm(e,t.length>0?t:void 0)}Do(e,i=>{xo(n,i)})}function $c(n,e){const t=Us(dm(n,e)),i=Fc(n.transactionQueueTree_,e);return gR(i,s=>{Sa(n,s)}),Sa(n,i),sm(i,s=>{Sa(n,s)}),t}function Sa(n,e){const t=mi(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(D(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(D(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(jt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?nm(e,void 0):t.length=r+1,et(n.eventQueue_,Us(e),s);for(let o=0;o<i.length;o++)pi(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qR(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function WR(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Be(`Invalid query segment '${t}' in query '${n}'`)}return e}const Bd=function(n,e){const t=jR(n),i=t.namespace;t.domain==="firebase.com"&&kt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&kt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Zw();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new E_(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new te(t.pathString)}},jR=function(n){let e="",t="",i="",s="",r="",o=!0,l="https",c=443;if(typeof n=="string"){let h=n.indexOf("//");h>=0&&(l=n.substring(0,h-1),n=n.substring(h+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(s=qR(n.substring(f,p)));const m=WR(n.substring(Math.min(n.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const w=e.slice(0,h);if(w.toLowerCase()==="localhost")t="localhost";else if(w.split(".").length<=2)t=w;else{const S=e.indexOf(".");i=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=i}"ns"in m&&(r=m.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:l,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",$R=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=qd.charAt(t%64),t=Math.floor(t/64);D(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=qd.charAt(e[s]);return D(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HR{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Te(this.snapshot.exportVal())}}class zR{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return H(this._path)?null:mc(this._path)}get ref(){return new sn(this._repo,this._path)}get _queryIdentifier(){const e=Ad(this._queryParams),t=dc(e);return t==="{}"?"default":t}get _queryObject(){return Ad(this._queryParams)}isEqual(e){if(e=oe(e),!(e instanceof Hc))return!1;const t=this._repo===e._repo,i=gc(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+LC(this._path)}}class sn extends Hc{constructor(e,t){super(e,t,new Ic,!1)}get parent(){const e=b_(this._path);return e===null?null:new sn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class eo{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new te(e),i=Ts(this.ref,e);return new eo(this._node.getChild(t),i,he)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new eo(s,Ts(this.ref,i),he)))}hasChild(e){const t=new te(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ui(n,e){return n=oe(n),n._checkNotDeleted("ref"),e!==void 0?Ts(n._root,e):n._root}function Ts(n,e){return n=oe(n),j(n._path)===null?AR("child","path",e):am("child","path",e),new sn(n._repo,ue(n._path,e))}function fS(n,e){n=oe(n),Bc("push",n._path),om("push",e,n._path,!0);const t=um(n._repo),i=$R(t),s=Ts(n,i),r=Ts(n,i);let o;return e!=null?o=rs(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function GR(n){return Bc("remove",n._path),rs(n,null)}function rs(n,e){n=oe(n),Bc("set",n._path),om("set",e,n._path,!1);const t=new ws;return MR(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function pS(n,e){CR("update",e,n._path);const t=new ws;return VR(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}class Fo{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new HR("value",this,new eo(e.snapshotNode,new sn(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new zR(this,e,t):null}matches(e){return e instanceof Fo?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function KR(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const c=t,h=(f,p)=>{pl(n._repo,n,l),c(f,p)};h.userCallback=t.userCallback,h.context=t.context,t=h}const o=new _m(t,r||void 0),l=new Fo(o);return xR(n._repo,n,l),()=>pl(n._repo,n,l)}function QR(n,e,t,i){return KR(n,"value",e,t,i)}function _S(n,e,t){let i=null;const s=t?new _m(t):null;i=new Fo(s),pl(n._repo,n,i)}KA(sn);eR(sn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YR="FIREBASE_DATABASE_EMULATOR_HOST",ml={};let JR=!1;function XR(n,e,t,i){n.repoInfo_=new E_(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function ZR(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||kt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ce("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Bd(r,s),l=o.repoInfo,c;typeof process<"u"&&ad&&(c=ad[YR]),c?(r=`http://${c}?ns=${l.namespace}`,o=Bd(r,s),l=o.repoInfo):o.repoInfo.secure;const h=new uC(n.name,n.options,e);RR("Invalid Firebase Database URL",o),H(o.path)||kt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=tS(l,n,h,new cC(n.name,t));return new nS(f,n)}function eS(n,e){const t=ml[e];(!t||t[n.key]!==n)&&kt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),FR(n),delete t[n.key]}function tS(n,e,t,i){let s=ml[e.name];s||(s={},ml[e.name]=s);let r=s[n.toURLString()];return r&&kt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new NR(n,JR,t,i),s[n.toURLString()]=r,r}class nS{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(DR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new sn(this._repo,Z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(eS(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&kt("Cannot call "+e+" on a deleted database.")}}function iS(n=Il(),e){const t=ro(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Kd("database");i&&sS(t,...i)}return t}function sS(n,e,t,i={}){n=oe(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&kt("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&kt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Tr(Tr.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Jd(i.mockUserToken,n.app.options.projectId);r=new Tr(o)}XR(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rS(n){Gw(An),pn(new Qt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return ZR(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),it(ld,cd,n),it(ld,cd,"esm2017")}At.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};At.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};rS();const oS={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_INTERNAL_DOMAIN:"rpgapp.internal",VITE_APP_NAME:"RPG Platform",VITE_FIREBASE_API_KEY:"AIzaSyA7UF2DYJY0gJP86cwlET9MpNwIRtgy5wc",VITE_FIREBASE_APP_ID:"1:668267146541:web:02b6285a4f0891d4d437a4",VITE_FIREBASE_AUTH_DOMAIN:"rpg-plataform-2b832.firebaseapp.com",VITE_FIREBASE_DATABASE_URL:"https://rpg-plataform-2b832-default-rtdb.firebaseio.com",VITE_FIREBASE_MESSAGING_SENDER_ID:"668267146541",VITE_FIREBASE_PROJECT_ID:"rpg-plataform-2b832",VITE_IMGBB_API_KEY:"00e4e8b63e8248b4e584774dad7cff00"};console.log("ENV CHECK:",{apiKey:"AIzaSyA7UF2DYJY0gJP86cwlET9MpNwIRtgy5wc",projectId:"rpg-plataform-2b832",allEnv:oS});const gl={apiKey:"AIzaSyA7UF2DYJY0gJP86cwlET9MpNwIRtgy5wc",authDomain:"rpg-plataform-2b832.firebaseapp.com",databaseURL:"https://rpg-plataform-2b832-default-rtdb.firebaseio.com",projectId:"rpg-plataform-2b832",messagingSenderId:"668267146541",appId:"1:668267146541:web:02b6285a4f0891d4d437a4"},Bs=gl.apiKey&&gl.apiKey.length>10;let Uo;try{Bs?Uo=nf(gl):console.warn("Firebase: API Key ausente ou inválida no .env. Algumas funcionalidades não estarão disponíveis.")}catch(n){console.error("Firebase Initialization Error:",n)}const _t=Bs?WE(Uo):null,yt=Bs?kw(Uo):null,Bi=Bs?iS(Uo):null,mm=Bs,Pa=()=>{if(!mm)throw new Error("Configuração do Firebase ausente no arquivo .env. Por favor, siga as instruções em FIREBASE_SETUP.md.")},tt={currentUser:null,currentNick:null,currentRoomCode:null,waitForInitialization(){return new Promise(n=>{const e=fh(_t,t=>{this.currentUser=t,this.currentNick=(t==null?void 0:t.displayName)||null,e(),n(t)})})},generateFakeEmail(n){return`${n.toLowerCase().trim()}@mesarpg.com`},async saveProfile(){var s;const n=this.currentUser||_t.currentUser;if(!n)return!1;const e=gt(yt,"users",n.uid),t=await tl(e),i={nick:this.currentNick||n.displayName||((s=n.email)==null?void 0:s.split("@")[0])||"Jogador",updatedAt:Zi()};return t.exists()||(i.createdAt=Zi()),await Xi(e,i,{merge:!0}),!0},async register(n,e){Pa();const t=this.generateFakeEmail(n),i=await Rv(_t,t,e);await dh(i.user,{displayName:n}),this.currentUser=i.user,this.currentNick=n;try{await this.saveProfile()}catch(s){console.warn("Firebase: Erro ao salvar perfil durante registro:",s.message)}return i.user},async login(n,e){Pa();const t=this.generateFakeEmail(n);try{const i=await Sv(_t,t,e);console.log("Logado com sucesso:",i.user),this.currentUser=i.user,this.currentNick=i.user.displayName||n;try{await this.saveProfile()}catch(s){console.warn("Firebase: Erro ao garantir perfil no login:",s.message)}return i.user}catch(i){throw console.error("Erro ao logar:",i.code,i.message),i.code==="auth/user-not-found"||i.code==="auth/invalid-credential"?console.warn("Usuário não encontrado ou credenciais inválidas."):i.code==="auth/wrong-password"?alert("Senha incorreta!"):alert("Erro ao entrar: "+(i.message||"Tente outro apelido ou senha")),i}},async logout(){await Nv(_t),this.currentUser=null,this.currentNick=null,this.currentRoomCode=null},onAuthChange(n){return fh(_t,e=>{this.currentUser=e,this.currentNick=(e==null?void 0:e.displayName)||null,n(e)})},async updateUserProfile(n){const e=this.currentUser||_t.currentUser;if(!e)throw new Error("Usuário não autenticado");if(n.nick){try{await dh(e,{displayName:n.nick})}catch(i){console.warn("AuthProfile update failed (non-critical):",i.message)}this.currentNick=n.nick}const t=gt(yt,"users",e.uid);return await Xi(t,{...n,updatedAt:Zi()},{merge:!0}),!0},async getUserProfile(){Pa();const n=this.currentUser||_t.currentUser;if(!n)return null;const e=await tl(gt(yt,"users",n.uid));return e.exists()?e.data():null},isAuthenticated(){return _t.currentUser!==null}},Wd=()=>{if(!mm)throw new Error("Configuração do Firebase ausente no arquivo .env.")},mS={currentRoom:null,currentRoomCode:null,isMaster:!1,unsubscribers:[],generateRoomCode(){const n="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let e="";for(let t=0;t<5;t++)e+=n.charAt(Math.floor(Math.random()*n.length));return e},async createRoom(n){Wd();const e=this.generateRoomCode(),t=tt.currentUser;if(!t)throw new Error("Usuário não autenticado");const i={name:n,masterId:t.uid,masterNick:tt.currentNick,code:e,createdAt:Zi(),status:"waiting",battleMode:!1};return await Xi(gt(yt,"rooms",e),i),await rs(Ui(Bi,`rooms/${e}`),{masterId:t.uid}),await rs(Ui(Bi,`rooms/${e}/presence/${t.uid}`),{online:!0,lastSeen:Date.now(),nick:tt.currentNick,role:"master"}),this.currentRoom=i,this.currentRoomCode=e,this.isMaster=!0,tt.currentRoomCode=e,e},async joinRoom(n){if(Wd(),!n||typeof n!="string")throw new Error("Código da sala inválido ou ausente.");const e=n.toUpperCase(),t=await tl(gt(yt,"rooms",e));if(!t.exists())throw new Error("Sala não encontrada. Verifique o código e tente novamente.");const i=t.data(),s=tt.currentUser;if(!s)throw new Error("Usuário não autenticado");if(i.status==="closed")throw new Error("Esta sala foi encerrada");const r=await tt.getUserProfile(),o=(r==null?void 0:r.avatarUrl)||"",l=(r==null?void 0:r.nick)||tt.currentNick||s.displayName||"Jogador";return console.group(`[RoomSystem] Entrando na sala: ${e}`),console.log("User UID:",s.uid),console.log("Room Master ID:",i.masterId),console.log("Coincidem?",i.masterId===s.uid),console.groupEnd(),this.currentRoom=i,this.currentRoomCode=e,this.isMaster=i.masterId===s.uid,tt.currentRoomCode=e,await Xi(gt(yt,"rooms",e,"players",s.uid),{nick:l,role:"player",online:!0,joinedAt:Zi()},{merge:!0}),await rs(Ui(Bi,`rooms/${e}/presence/${s.uid}`),{online:!0,lastSeen:Date.now(),nick:l,avatarUrl:o,role:this.isMaster?"master":"player"}),this.currentRoom=i,this.currentRoomCode=e,this.isMaster=i.masterId===s.uid,i},async leaveRoom(n){const e=tt.currentUser;e&&(this.isMaster?await Xi(gt(yt,"rooms",n),{status:"closed"},{merge:!0}):await GR(Ui(Bi,`rooms/${n}/presence/${e.uid}`)),this.cleanup())},subscribeToRoom(n,e){const t=gt(yt,"rooms",n),i=$w(t,o=>{var l;o.exists()&&(this.currentRoom=o.data(),(l=e.onRoomUpdate)==null||l.call(e,o.data()))}),s=Ui(Bi,`rooms/${n}/presence`),r=QR(s,o=>{var c;const l=[];o.forEach(h=>{l.push({id:h.key,...h.val()})}),(c=e.onPlayersUpdate)==null||c.call(e,l)});this.unsubscribers.push(i,()=>r())},async updateRoomStatus(n,e){await jw(gt(yt,"rooms",n),{status:e})},async startSession(){if(!this.isMaster)throw new Error("Apenas o mestre pode iniciar");await this.updateRoomStatus(this.currentRoomCode,"playing")},cleanup(){this.unsubscribers.forEach(n=>n()),this.unsubscribers=[],this.currentRoom=null,this.currentRoomCode=null,this.isMaster=!1,tt.currentRoomCode=null}},gS={sounds:{},muted:!1,volume:.7,SPELL_SOUNDS:{fire:"/sounds/combat/magic_cast.wav",ice:"/sounds/combat/magic_cast.wav",heal:"/sounds/combat/magic_cast.wav",thunder:"/sounds/combat/magic_cast.wav"},DEATH_SOUNDS:{player:"/sounds/combat/death_hero.wav",enemy:"/sounds/combat/death_enemy.wav",monster:"/sounds/combat/death_monster.wav"},async preload(){},play(n,e={}){if(this.muted)return;const{volume:t=this.volume,loop:i=!1,fadeIn:s=!1,extensions:r=[".wav",".ogg",".mp3"]}=e;let o=this.sounds[n];if(!o)if(!n.match(/\.(wav|mp3|ogg|aiff?|flac)$/i)){const c=f=>{if(f>=r.length)return null;const p=n+r[f],m=new Audio(p);return m.load(),m.play().then(()=>m).catch(()=>c(f+1))},h=c(0);h&&h.then(f=>{if(f)if(s){const p=t/20;f.volume=0,f.loop=i,this.sounds[n]=f;const m=setInterval(()=>{f.volume<t?f.volume=Math.min(f.volume+p,t):clearInterval(m)},50)}else f.volume=t,f.loop=i,this.sounds[n]=f}).catch(()=>{});return}else o=new Audio(n),o.preload="auto";if(o.volume=0,o.loop=i,o.play().catch(()=>{}),s){const l=t/20,c=setInterval(()=>{o.volume<t?o.volume=Math.min(o.volume+l,t):clearInterval(c)},50)}else o.volume=t},playDiceRoll(){this.play("/sounds/dice/roll.wav")},playDiceLand(){this.play("/sounds/dice/land.wav")},playSpellCast(n){const e=this.SPELL_SOUNDS[n]||"/sounds/combat/magic_cast.wav";this.play(e)},playDeath(n){const e=this.DEATH_SOUNDS[n]||"/sounds/combat/death_enemy.wav";this.play(e,{volume:1})},playButtonClick(){this.play("/sounds/ui/button_click")},playNotification(){this.play("/sounds/ui/notification")},playBattleStart(){this.play("/sounds/ui/battle_start",{volume:1})},toggleMute(){return this.muted=!this.muted,this.muted},setVolume(n){this.volume=Math.max(0,Math.min(1,n))}};export{tt as A,mS as R,gS as S,yt as a,QR as b,hS as c,gt as d,Bi as e,mm as f,pS as g,Zi as h,tl as i,Xi as j,_S as k,dS as l,$w as o,fS as p,Ui as r,rs as s,jw as u};
