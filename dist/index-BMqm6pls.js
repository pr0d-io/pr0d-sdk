"use strict";const l=require("./core-B0kRibtD.js"),f={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:r,truncate:o}){return t.length<=e+r?t:o==="end"?`${t.substring(0,e)}...`:o==="start"?`...${t.substring(t.length-r)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(r))}`},generateAvatarColors(t){const r=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),o=this.hexToRgb(r),s=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),n=100-3*Number(s==null?void 0:s.replace("px","")),a=`${n}% ${n}% at 65% 40%`,u=[];for(let v=0;v<5;v+=1){const p=this.tintColor(o,.15*v);u.push(`rgb(${p[0]}, ${p[1]}, ${p[2]})`)}return`
    --local-color-1: ${u[0]};
    --local-color-2: ${u[1]};
    --local-color-3: ${u[2]};
    --local-color-4: ${u[3]};
    --local-color-5: ${u[4]};
    --local-radial-circle: ${a}
   `},hexToRgb(t){const e=parseInt(t,16),r=e>>16&255,o=e>>8&255,s=e&255;return[r,o,s]},tintColor(t,e){const[r,o,s]=t,i=Math.round(r+(255-r)*e),n=Math.round(o+(255-o)*e),a=Math.round(s+(255-s)*e);return[i,n,a]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){var e;return t||(typeof window<"u"&&window.matchMedia?(e=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&e.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,r){return t.toString().length>=e?Number(t).toFixed(r):t},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}};function W(t,e){const{kind:r,elements:o}=e;return{kind:r,elements:o,finisher(s){customElements.get(t)||customElements.define(t,s)}}}function H(t,e){return customElements.get(t)||customElements.define(t,e),e}function m(t){return function(r){return typeof r=="function"?H(t,r):W(t,r)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F={attribute:!0,type:String,converter:l.u,reflect:!1,hasChanged:l.f},G=(t=F,e,r)=>{const{kind:o,metadata:s}=r;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){const{name:n}=r;return{set(a){const u=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,u,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){const{name:n}=r;return function(a){const u=this[n];e.call(this,a),this.requestUpdate(n,u,t)}}throw Error("Unsupported decorator location: "+o)};function c(t){return(e,r)=>typeof r=="object"?G(t,e,r):((o,s,i)=>{const n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function N(t){return c({...t,state:!0,attribute:!1})}const V=l.i`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var d=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let h=class extends l.i$1{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&f.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&f.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&f.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&f.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&f.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&f.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&f.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&f.getSpacingStyles(this.margin,3)};
    `,l.x`<slot></slot>`}};h.styles=[l.resetStyles,V];d([c()],h.prototype,"flexDirection",void 0);d([c()],h.prototype,"flexWrap",void 0);d([c()],h.prototype,"flexBasis",void 0);d([c()],h.prototype,"flexGrow",void 0);d([c()],h.prototype,"flexShrink",void 0);d([c()],h.prototype,"alignItems",void 0);d([c()],h.prototype,"justifyContent",void 0);d([c()],h.prototype,"columnGap",void 0);d([c()],h.prototype,"rowGap",void 0);d([c()],h.prototype,"gap",void 0);d([c()],h.prototype,"padding",void 0);d([c()],h.prototype,"margin",void 0);h=d([m("wui-flex")],h);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=t=>t??l.E;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=t=>t===null||typeof t!="object"&&typeof t!="function",K=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M={ATTRIBUTE:1,CHILD:2},T=t=>(...e)=>({_$litDirective$:t,values:e});let L=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=(t,e)=>{var o;const r=t._$AN;if(r===void 0)return!1;for(const s of r)(o=s._$AO)==null||o.call(s,e,!1),S(s,e);return!0},_=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while((r==null?void 0:r.size)===0)},D=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),J(e)}};function Z(t){this._$AN!==void 0?(_(this),this._$AM=t,D(this)):this._$AM=t}function Q(t,e=!1,r=0){const o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(o))for(let i=r;i<o.length;i++)S(o[i],!1),_(o[i]);else o!=null&&(S(o,!1),_(o));else S(this,t)}const J=t=>{t.type==M.CHILD&&(t._$AP??(t._$AP=Q),t._$AQ??(t._$AQ=Z))};class U extends L{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,o){super._$AT(e,r,o),D(this),this.isConnected=e._$AU}_$AO(e,r=!0){var o,s;e!==this.isConnected&&(this.isConnected=e,e?(o=this.reconnected)==null||o.call(this):(s=this.disconnected)==null||s.call(this)),r&&(S(this,e),_(this))}setValue(e){if(K(this._$Ct))this._$Ct._$AI(e,this);else{const r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ee{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class te{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(e=>this.Z=e))}resume(){var e;(e=this.Z)==null||e.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=t=>!X(t)&&typeof t.then=="function",B=1073741823;class re extends U{constructor(){super(...arguments),this._$Cwt=B,this._$Cbt=[],this._$CK=new ee(this),this._$CX=new te}render(...e){return e.find(r=>!O(r))??l.T}update(e,r){const o=this._$Cbt;let s=o.length;this._$Cbt=r;const i=this._$CK,n=this._$CX;this.isConnected||this.disconnected();for(let a=0;a<r.length&&!(a>this._$Cwt);a++){const u=r[a];if(!O(u))return this._$Cwt=a,u;a<s&&u===o[a]||(this._$Cwt=B,s=0,Promise.resolve(u).then(async v=>{for(;n.get();)await n.get();const p=i.deref();if(p!==void 0){const k=p._$Cbt.indexOf(u);k>-1&&k<p._$Cwt&&(p._$Cwt=k,p.setValue(v))}}))}return l.T}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const ie=T(re);class oe{constructor(){this.cache=new Map}set(e,r){this.cache.set(e,r)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}const j=new oe,se=l.i`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var C=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};const I={add:async()=>(await Promise.resolve().then(()=>require("./add-D9mKI9a8.js"))).addSvg,allWallets:async()=>(await Promise.resolve().then(()=>require("./all-wallets-wwmRepyW.js"))).allWalletsSvg,arrowBottomCircle:async()=>(await Promise.resolve().then(()=>require("./arrow-bottom-circle-Bq0pNN8s.js"))).arrowBottomCircleSvg,appStore:async()=>(await Promise.resolve().then(()=>require("./app-store-DmEpx0WV.js"))).appStoreSvg,apple:async()=>(await Promise.resolve().then(()=>require("./apple-Dz7xZqTo.js"))).appleSvg,arrowBottom:async()=>(await Promise.resolve().then(()=>require("./arrow-bottom-QvzN2fhP.js"))).arrowBottomSvg,arrowLeft:async()=>(await Promise.resolve().then(()=>require("./arrow-left-4qx0fVHm.js"))).arrowLeftSvg,arrowRight:async()=>(await Promise.resolve().then(()=>require("./arrow-right-C6ux5lFD.js"))).arrowRightSvg,arrowTop:async()=>(await Promise.resolve().then(()=>require("./arrow-top-Cm6jCpKe.js"))).arrowTopSvg,bank:async()=>(await Promise.resolve().then(()=>require("./bank-Bl5-1891.js"))).bankSvg,browser:async()=>(await Promise.resolve().then(()=>require("./browser-DJs-Uj17.js"))).browserSvg,card:async()=>(await Promise.resolve().then(()=>require("./card-BPvXBptG.js"))).cardSvg,checkmark:async()=>(await Promise.resolve().then(()=>require("./checkmark-CTwyjwnO.js"))).checkmarkSvg,checkmarkBold:async()=>(await Promise.resolve().then(()=>require("./checkmark-bold-bBtUGdR4.js"))).checkmarkBoldSvg,chevronBottom:async()=>(await Promise.resolve().then(()=>require("./chevron-bottom-Yplrv6Te.js"))).chevronBottomSvg,chevronLeft:async()=>(await Promise.resolve().then(()=>require("./chevron-left-DTrzJJDq.js"))).chevronLeftSvg,chevronRight:async()=>(await Promise.resolve().then(()=>require("./chevron-right-DU2SZXem.js"))).chevronRightSvg,chevronTop:async()=>(await Promise.resolve().then(()=>require("./chevron-top-cUnfNOVe.js"))).chevronTopSvg,chromeStore:async()=>(await Promise.resolve().then(()=>require("./chrome-store-71TxQgLa.js"))).chromeStoreSvg,clock:async()=>(await Promise.resolve().then(()=>require("./clock-Cy9BTpgH.js"))).clockSvg,close:async()=>(await Promise.resolve().then(()=>require("./close-ClzVlKF3.js"))).closeSvg,compass:async()=>(await Promise.resolve().then(()=>require("./compass-Dl8w7aIr.js"))).compassSvg,coinPlaceholder:async()=>(await Promise.resolve().then(()=>require("./coinPlaceholder-BbEby7jQ.js"))).coinPlaceholderSvg,copy:async()=>(await Promise.resolve().then(()=>require("./copy-CuxUAXNI.js"))).copySvg,cursor:async()=>(await Promise.resolve().then(()=>require("./cursor-jQq42L8k.js"))).cursorSvg,cursorTransparent:async()=>(await Promise.resolve().then(()=>require("./cursor-transparent-BKoOD2Du.js"))).cursorTransparentSvg,desktop:async()=>(await Promise.resolve().then(()=>require("./desktop-BVate7lr.js"))).desktopSvg,disconnect:async()=>(await Promise.resolve().then(()=>require("./disconnect-C81FUmp7.js"))).disconnectSvg,discord:async()=>(await Promise.resolve().then(()=>require("./discord-5-7HT1qT.js"))).discordSvg,etherscan:async()=>(await Promise.resolve().then(()=>require("./etherscan-fIWv0FV2.js"))).etherscanSvg,extension:async()=>(await Promise.resolve().then(()=>require("./extension-DZrnWU38.js"))).extensionSvg,externalLink:async()=>(await Promise.resolve().then(()=>require("./external-link-CxiWoa2y.js"))).externalLinkSvg,facebook:async()=>(await Promise.resolve().then(()=>require("./facebook-BRLDc67-.js"))).facebookSvg,farcaster:async()=>(await Promise.resolve().then(()=>require("./farcaster-ChzFi1Qu.js"))).farcasterSvg,filters:async()=>(await Promise.resolve().then(()=>require("./filters-DilK6FFE.js"))).filtersSvg,github:async()=>(await Promise.resolve().then(()=>require("./github-DLnqWFIF.js"))).githubSvg,google:async()=>(await Promise.resolve().then(()=>require("./google-CHlVkQd6.js"))).googleSvg,helpCircle:async()=>(await Promise.resolve().then(()=>require("./help-circle-CS0N6QHh.js"))).helpCircleSvg,image:async()=>(await Promise.resolve().then(()=>require("./image-RJt7JXyQ.js"))).imageSvg,id:async()=>(await Promise.resolve().then(()=>require("./id-BhqJazfv.js"))).idSvg,infoCircle:async()=>(await Promise.resolve().then(()=>require("./info-circle-BR1Y93Qi.js"))).infoCircleSvg,lightbulb:async()=>(await Promise.resolve().then(()=>require("./lightbulb-CxN_udRE.js"))).lightbulbSvg,mail:async()=>(await Promise.resolve().then(()=>require("./mail-CykiAr5H.js"))).mailSvg,mobile:async()=>(await Promise.resolve().then(()=>require("./mobile-FGJ72BsU.js"))).mobileSvg,more:async()=>(await Promise.resolve().then(()=>require("./more-CD0it0aF.js"))).moreSvg,networkPlaceholder:async()=>(await Promise.resolve().then(()=>require("./network-placeholder-DpzQ5MSM.js"))).networkPlaceholderSvg,nftPlaceholder:async()=>(await Promise.resolve().then(()=>require("./nftPlaceholder-CDMYc1QM.js"))).nftPlaceholderSvg,off:async()=>(await Promise.resolve().then(()=>require("./off-Cp89WNTY.js"))).offSvg,playStore:async()=>(await Promise.resolve().then(()=>require("./play-store-BAOWEA0v.js"))).playStoreSvg,plus:async()=>(await Promise.resolve().then(()=>require("./plus-DaTBeUya.js"))).plusSvg,qrCode:async()=>(await Promise.resolve().then(()=>require("./qr-code-XQBQsqAN.js"))).qrCodeIcon,recycleHorizontal:async()=>(await Promise.resolve().then(()=>require("./recycle-horizontal-BgzpZmQw.js"))).recycleHorizontalSvg,refresh:async()=>(await Promise.resolve().then(()=>require("./refresh-CcuCh9zC.js"))).refreshSvg,search:async()=>(await Promise.resolve().then(()=>require("./search-CQBUkbyX.js"))).searchSvg,send:async()=>(await Promise.resolve().then(()=>require("./send-IGE-ora9.js"))).sendSvg,swapHorizontal:async()=>(await Promise.resolve().then(()=>require("./swapHorizontal-au2EOYr-.js"))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await Promise.resolve().then(()=>require("./swapHorizontalMedium-45OLtyA1.js"))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await Promise.resolve().then(()=>require("./swapHorizontalBold-DCW76nmt.js"))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await Promise.resolve().then(()=>require("./swapHorizontalRoundedBold-DO7o-7LW.js"))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await Promise.resolve().then(()=>require("./swapVertical-B_YA5d00.js"))).swapVerticalSvg,telegram:async()=>(await Promise.resolve().then(()=>require("./telegram-Dksl8IVH.js"))).telegramSvg,threeDots:async()=>(await Promise.resolve().then(()=>require("./three-dots-DTQW4EsB.js"))).threeDotsSvg,twitch:async()=>(await Promise.resolve().then(()=>require("./twitch-VctgOd9U.js"))).twitchSvg,twitter:async()=>(await Promise.resolve().then(()=>require("./x-B5u4KtwS.js"))).xSvg,twitterIcon:async()=>(await Promise.resolve().then(()=>require("./twitterIcon-D1H1YnR9.js"))).twitterIconSvg,verify:async()=>(await Promise.resolve().then(()=>require("./verify-B8qdoXde.js"))).verifySvg,verifyFilled:async()=>(await Promise.resolve().then(()=>require("./verify-filled-Bdjal3XF.js"))).verifyFilledSvg,wallet:async()=>(await Promise.resolve().then(()=>require("./wallet-DH0uDbTJ.js"))).walletSvg,walletConnect:async()=>(await Promise.resolve().then(()=>require("./walletconnect-CEe_D9Jh.js"))).walletConnectSvg,walletConnectLightBrown:async()=>(await Promise.resolve().then(()=>require("./walletconnect-CEe_D9Jh.js"))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await Promise.resolve().then(()=>require("./walletconnect-CEe_D9Jh.js"))).walletConnectBrownSvg,walletPlaceholder:async()=>(await Promise.resolve().then(()=>require("./wallet-placeholder-C0mGdXIo.js"))).walletPlaceholderSvg,warningCircle:async()=>(await Promise.resolve().then(()=>require("./warning-circle-B3Q90-Z6.js"))).warningCircleSvg,x:async()=>(await Promise.resolve().then(()=>require("./x-B5u4KtwS.js"))).xSvg,info:async()=>(await Promise.resolve().then(()=>require("./info-BtKlWgFP.js"))).infoSvg,exclamationTriangle:async()=>(await Promise.resolve().then(()=>require("./exclamation-triangle-Btq0GE54.js"))).exclamationTriangleSvg,reown:async()=>(await Promise.resolve().then(()=>require("./reown-logo-BDfsoQEW.js"))).reownSvg};async function ne(t){if(j.has(t))return j.get(t);const r=(I[t]??I.copy)();return j.set(t,r),r}let y=class extends l.i$1{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,l.x`${ie(ne(this.name),l.x`<div class="fallback"></div>`)}`}};y.styles=[l.resetStyles,l.colorStyles,se];C([c()],y.prototype,"size",void 0);C([c()],y.prototype,"name",void 0);C([c()],y.prototype,"color",void 0);C([c()],y.prototype,"aspectRatio",void 0);y=C([m("wui-icon")],y);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=T(class extends L{constructor(t){var e;if(super(t),t.type!==M.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var o,s;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!((o=this.nt)!=null&&o.has(i))&&this.st.add(i);return this.render(e)}const r=t.element.classList;for(const i of this.st)i in e||(r.remove(i),this.st.delete(i));for(const i in e){const n=!!e[i];n===this.st.has(i)||(s=this.nt)!=null&&s.has(i)||(n?(r.add(i),this.st.add(i)):(r.remove(i),this.st.delete(i)))}return l.T}}),ae=l.i`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var q=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let b=class extends l.i$1{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const e={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,l.x`<slot class=${E(e)}></slot>`}};b.styles=[l.resetStyles,ae];q([c()],b.prototype,"variant",void 0);q([c()],b.prototype,"color",void 0);q([c()],b.prototype,"align",void 0);q([c()],b.prototype,"lineClamp",void 0);b=q([m("wui-text")],b);const le=l.i`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var w=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let g=class extends l.i$1{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const e=this.iconSize||this.size,r=this.size==="lg",o=this.size==="xl",s=r?"12%":"16%",i=r?"xxs":o?"s":"3xl",n=this.background==="gray",a=this.background==="opaque",u=this.backgroundColor==="accent-100"&&a||this.backgroundColor==="success-100"&&a||this.backgroundColor==="error-100"&&a||this.backgroundColor==="inverse-100"&&a;let v=`var(--wui-color-${this.backgroundColor})`;return u?v=`var(--wui-icon-box-bg-${this.backgroundColor})`:n&&(v=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${v};
       --local-bg-mix: ${u||n?"100%":s};
       --local-border-radius: var(--wui-border-radius-${i});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor==="wui-color-bg-125"?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,l.x` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};g.styles=[l.resetStyles,l.elementStyles,le];w([c()],g.prototype,"size",void 0);w([c()],g.prototype,"backgroundColor",void 0);w([c()],g.prototype,"iconColor",void 0);w([c()],g.prototype,"iconSize",void 0);w([c()],g.prototype,"background",void 0);w([c({type:Boolean})],g.prototype,"border",void 0);w([c()],g.prototype,"borderColor",void 0);w([c()],g.prototype,"icon",void 0);g=w([m("wui-icon-box")],g);const ce=l.i`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var z=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let $=class extends l.i$1{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,l.x`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};$.styles=[l.resetStyles,l.colorStyles,ce];z([c()],$.prototype,"src",void 0);z([c()],$.prototype,"alt",void 0);z([c()],$.prototype,"size",void 0);$=z([m("wui-image")],$);const ue=l.i`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var R=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let x=class extends l.i$1{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const e=this.size==="md"?"mini-700":"micro-700";return l.x`
      <wui-text data-variant=${this.variant} variant=${e} color="inherit">
        <slot></slot>
      </wui-text>
    `}};x.styles=[l.resetStyles,ue];R([c()],x.prototype,"variant",void 0);R([c()],x.prototype,"size",void 0);x=R([m("wui-tag")],x);const he=l.i`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var A=function(t,e,r,o){var s=arguments.length,i=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(i=(s<3?n(i):s>3?n(e,r,i):n(e,r))||i);return s>3&&i&&Object.defineProperty(e,r,i),i};let P=class extends l.i$1{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${this.color==="inherit"?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,l.x`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};P.styles=[l.resetStyles,he];A([c()],P.prototype,"color",void 0);A([c()],P.prototype,"size",void 0);P=A([m("wui-loading-spinner")],P);exports.UiHelperUtil=f;exports.customElement=m;exports.e=T;exports.e$1=E;exports.f=U;exports.n=c;exports.o=Y;exports.r=N;
