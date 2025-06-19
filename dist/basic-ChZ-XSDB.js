"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("./core-B0kRibtD.js"),c=require("./index-BMqm6pls.js"),Fn=require("./index-CQNM8CWK.js"),Kn=r.i`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var ce=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Q=class extends r.i$1{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return this.size==="lg"?e="m":this.size==="md"?e="xs":e="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),r.x`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?r.x`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?r.x`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:r.x`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};Q.styles=[r.elementStyles,r.resetStyles,Kn];ce([c.n()],Q.prototype,"size",void 0);ce([c.n()],Q.prototype,"name",void 0);ce([c.n()],Q.prototype,"imageSrc",void 0);ce([c.n()],Q.prototype,"walletIcon",void 0);ce([c.n({type:Boolean})],Q.prototype,"installed",void 0);ce([c.n()],Q.prototype,"badgeSize",void 0);Q=ce([c.customElement("wui-wallet-image")],Q);const Gn=r.i`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var Tn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const ot=4;let Oe=class extends r.i$1{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<ot;return r.x`${this.walletImages.slice(0,ot).map(({src:n,walletName:i})=>r.x`
            <wui-wallet-image
              size="inherit"
              imageSrc=${n}
              name=${c.o(i)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(ot-this.walletImages.length)].map(()=>r.x` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Oe.styles=[r.resetStyles,Gn];Tn([c.n({type:Array})],Oe.prototype,"walletImages",void 0);Oe=Tn([c.customElement("wui-all-wallets-image")],Oe);const Yn=r.i`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var U=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let B=class extends r.i$1{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return r.x`
      <button ?disabled=${this.disabled} tabindex=${c.o(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?r.x` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?r.x` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?r.x`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?r.x`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?r.x`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?r.x`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?r.x`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};B.styles=[r.resetStyles,r.elementStyles,Yn];U([c.n({type:Array})],B.prototype,"walletImages",void 0);U([c.n()],B.prototype,"imageSrc",void 0);U([c.n()],B.prototype,"name",void 0);U([c.n()],B.prototype,"tagLabel",void 0);U([c.n()],B.prototype,"tagVariant",void 0);U([c.n()],B.prototype,"icon",void 0);U([c.n()],B.prototype,"walletIcon",void 0);U([c.n()],B.prototype,"tabIdx",void 0);U([c.n({type:Boolean})],B.prototype,"installed",void 0);U([c.n({type:Boolean})],B.prototype,"disabled",void 0);U([c.n({type:Boolean})],B.prototype,"showAllWallets",void 0);U([c.n({type:Boolean})],B.prototype,"loading",void 0);U([c.n({type:String})],B.prototype,"loadingSpinnerColor",void 0);B=U([c.customElement("wui-list-wallet")],B);var ve=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let oe=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.count=r.ApiController.state.count,this.filteredCount=r.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=r.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),r.ApiController.subscribeKey("count",e=>this.count=e),r.ApiController.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),r.ApiController.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(u=>u.id==="walletConnect"),{allWallets:n}=r.OptionsController.state;if(!e||n==="HIDE"||n==="ONLY_MOBILE"&&!r.CoreHelperUtil.isMobile())return null;const i=r.ApiController.state.featured.length,o=this.count+i,t=o<10?o:Math.floor(o/10)*10,s=this.filteredCount>0?this.filteredCount:t;let l=`${s}`;return this.filteredCount>0?l=`${this.filteredCount}`:s<o&&(l=`${s}+`),r.x`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${l}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${c.o(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){r.EventsController.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),r.RouterController.push("AllWallets")}};ve([c.n()],oe.prototype,"tabIdx",void 0);ve([c.r()],oe.prototype,"connectors",void 0);ve([c.r()],oe.prototype,"count",void 0);ve([c.r()],oe.prototype,"filteredCount",void 0);ve([c.r()],oe.prototype,"isFetchingRecommendedWallets",void 0);oe=ve([c.customElement("w3m-all-wallets-widget")],oe);var Lt=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Le=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(n=>n.type==="ANNOUNCED");return e!=null&&e.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(r.ConnectorUtil.showConnector).map(n=>r.x`
              <wui-list-wallet
                imageSrc=${c.o(r.AssetUtil.getConnectorImage(n))}
                name=${n.name??"Unknown"}
                @click=${()=>this.onConnector(n)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${n.id}`}
                .installed=${!0}
                tabIdx=${c.o(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?r.CoreHelperUtil.isMobile()?r.RouterController.push("AllWallets"):r.RouterController.push("ConnectingWalletConnect"):r.RouterController.push("ConnectingExternal",{connector:e})}};Lt([c.n()],Le.prototype,"tabIdx",void 0);Lt([c.r()],Le.prototype,"connectors",void 0);Le=Lt([c.customElement("w3m-connect-announced-widget")],Le);var Ke=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Re=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),r.CoreHelperUtil.isTelegram()&&r.CoreHelperUtil.isIos()&&(this.loading=!r.ConnectionController.state.wcUri,this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=r.OptionsController.state;if(!(e!=null&&e.length))return this.style.cssText="display: none",null;const n=this.filterOutDuplicateWallets(e);return r.x`<wui-flex flexDirection="column" gap="xs">
      ${n.map(i=>r.x`
          <wui-list-wallet
            imageSrc=${c.o(r.AssetUtil.getWalletImage(i))}
            name=${i.name??"Unknown"}
            @click=${()=>this.onConnectWallet(i)}
            data-testid=${`wallet-selector-${i.id}`}
            tabIdx=${c.o(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const n=r.StorageUtil.getRecentWallets(),i=this.connectors.map(l=>{var u;return(u=l.info)==null?void 0:u.rdns}).filter(Boolean),o=n.map(l=>l.rdns).filter(Boolean),t=i.concat(o);if(t.includes("io.metamask.mobile")&&r.CoreHelperUtil.isMobile()){const l=t.indexOf("io.metamask.mobile");t[l]="io.metamask"}return e.filter(l=>!t.includes(String(l==null?void 0:l.rdns)))}onConnectWallet(e){this.loading||r.RouterController.push("ConnectingWalletConnect",{wallet:e})}};Ke([c.n()],Re.prototype,"tabIdx",void 0);Ke([c.r()],Re.prototype,"connectors",void 0);Ke([c.r()],Re.prototype,"loading",void 0);Re=Ke([c.customElement("w3m-connect-custom-widget")],Re);var Ut=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ue=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const i=this.connectors.filter(o=>o.type==="EXTERNAL").filter(r.ConnectorUtil.showConnector).filter(o=>o.id!==r.ConstantsUtil.CONNECTOR_ID.COINBASE_SDK);return i!=null&&i.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(o=>r.x`
            <wui-list-wallet
              imageSrc=${c.o(r.AssetUtil.getConnectorImage(o))}
              .installed=${!0}
              name=${o.name??"Unknown"}
              data-testid=${`wallet-selector-external-${o.id}`}
              @click=${()=>this.onConnector(o)}
              tabIdx=${c.o(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){r.RouterController.push("ConnectingExternal",{connector:e})}};Ut([c.n()],Ue.prototype,"tabIdx",void 0);Ut([c.r()],Ue.prototype,"connectors",void 0);Ue=Ut([c.customElement("w3m-connect-external-widget")],Ue);var kt=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ke=class extends r.i$1{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>r.x`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${c.o(r.AssetUtil.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${c.o(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){r.ConnectorController.selectWalletConnector(e)}};kt([c.n()],ke.prototype,"tabIdx",void 0);kt([c.n()],ke.prototype,"wallets",void 0);ke=kt([c.customElement("w3m-connect-featured-widget")],ke);var jt=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let je=class extends r.i$1{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const e=this.connectors.filter(r.ConnectorUtil.showConnector);return e.length===0?(this.style.cssText="display: none",null):r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(n=>r.x`
            <wui-list-wallet
              imageSrc=${c.o(r.AssetUtil.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${c.o(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){r.ConnectorController.setActiveConnector(e),r.RouterController.push("ConnectingExternal",{connector:e})}};jt([c.n()],je.prototype,"tabIdx",void 0);jt([c.n()],je.prototype,"connectors",void 0);je=jt([c.customElement("w3m-connect-injected-widget")],je);var Dt=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let De=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(n=>n.type==="MULTI_CHAIN"&&n.name!=="WalletConnect");return e!=null&&e.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(n=>r.x`
            <wui-list-wallet
              imageSrc=${c.o(r.AssetUtil.getConnectorImage(n))}
              .installed=${!0}
              name=${n.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${n.id}`}
              @click=${()=>this.onConnector(n)}
              tabIdx=${c.o(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){r.ConnectorController.setActiveConnector(e),r.RouterController.push("ConnectingMultiChain")}};Dt([c.n()],De.prototype,"tabIdx",void 0);Dt([c.r()],De.prototype,"connectors",void 0);De=Dt([c.customElement("w3m-connect-multi-chain-widget")],De);var Ge=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ee=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),r.CoreHelperUtil.isTelegram()&&r.CoreHelperUtil.isIos()&&(this.loading=!r.ConnectionController.state.wcUri,this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const n=r.StorageUtil.getRecentWallets().filter(i=>!r.WalletUtil.isExcluded(i)).filter(i=>!this.hasWalletConnector(i)).filter(i=>this.isWalletCompatibleWithCurrentChain(i));return n.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(i=>r.x`
            <wui-list-wallet
              imageSrc=${c.o(r.AssetUtil.getWalletImage(i))}
              name=${i.name??"Unknown"}
              @click=${()=>this.onConnectWallet(i)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${c.o(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||r.ConnectorController.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(n=>n.id===e.id||n.name===e.name)}isWalletCompatibleWithCurrentChain(e){const n=r.ChainController.state.activeChain;return n&&e.chains?e.chains.some(i=>{const o=i.split(":")[0];return n===o}):!0}};Ge([c.n()],Ee.prototype,"tabIdx",void 0);Ge([c.r()],Ee.prototype,"connectors",void 0);Ge([c.r()],Ee.prototype,"loading",void 0);Ee=Ge([c.customElement("w3m-connect-recent-widget")],Ee);var Ye=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let _e=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,r.CoreHelperUtil.isTelegram()&&r.CoreHelperUtil.isIos()&&(this.loading=!r.ConnectionController.state.wcUri,this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=r.ConnectorController.state,{customWallets:n,featuredWalletIds:i}=r.OptionsController.state,o=r.StorageUtil.getRecentWallets(),t=e.find(f=>f.id==="walletConnect"),l=e.filter(f=>f.type==="INJECTED"||f.type==="ANNOUNCED"||f.type==="MULTI_CHAIN").filter(f=>f.name!=="Browser Wallet");if(!t)return null;if(i||n||!this.wallets.length)return this.style.cssText="display: none",null;const u=l.length+o.length,d=Math.max(0,2-u),h=r.WalletUtil.filterOutDuplicateWallets(this.wallets).slice(0,d);return h.length?r.x`
      <wui-flex flexDirection="column" gap="xs">
        ${h.map(f=>r.x`
            <wui-list-wallet
              imageSrc=${c.o(r.AssetUtil.getWalletImage(f))}
              name=${(f==null?void 0:f.name)??"Unknown"}
              @click=${()=>this.onConnectWallet(f)}
              tabIdx=${c.o(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const n=r.ConnectorController.getConnector(e.id,e.rdns);n?r.RouterController.push("ConnectingExternal",{connector:n}):r.RouterController.push("ConnectingWalletConnect",{wallet:e})}};Ye([c.n()],_e.prototype,"tabIdx",void 0);Ye([c.n()],_e.prototype,"wallets",void 0);Ye([c.r()],_e.prototype,"loading",void 0);_e=Ye([c.customElement("w3m-connect-recommended-widget")],_e);var Je=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ie=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.connectorImages=r.AssetController.state.connectorImages,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),r.AssetController.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(r.CoreHelperUtil.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(i=>i.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const n=e.imageUrl||this.connectorImages[(e==null?void 0:e.imageId)??""];return r.x`
      <wui-list-wallet
        imageSrc=${c.o(n)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${c.o(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){r.ConnectorController.setActiveConnector(e),r.RouterController.push("ConnectingWalletConnect")}};Je([c.n()],Ie.prototype,"tabIdx",void 0);Je([c.r()],Ie.prototype,"connectors",void 0);Je([c.r()],Ie.prototype,"connectorImages",void 0);Ie=Je([c.customElement("w3m-connect-walletconnect-widget")],Ie);const Jn=r.i`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var We=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let re=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=r.ConnectorController.state.connectors,this.recommended=r.ApiController.state.recommended,this.featured=r.ApiController.state.featured,this.unsubscribe.push(r.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),r.ApiController.subscribeKey("recommended",e=>this.recommended=e),r.ApiController.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.x`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:n,announced:i,injected:o,multiChain:t,recommended:s,featured:l,external:u}=r.ConnectorUtil.getConnectorsByType(this.connectors,this.recommended,this.featured);return r.ConnectorUtil.getConnectorTypeOrder({custom:e,recent:n,announced:i,injected:o,multiChain:t,recommended:s,featured:l,external:u}).map(h=>{switch(h){case"injected":return r.x`
            ${t.length?r.x`<w3m-connect-multi-chain-widget
                  tabIdx=${c.o(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?r.x`<w3m-connect-announced-widget
                  tabIdx=${c.o(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?r.x`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${c.o(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return r.x`<w3m-connect-walletconnect-widget
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return r.x`<w3m-connect-recent-widget
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return r.x`<w3m-connect-featured-widget
            .wallets=${l}
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return r.x`<w3m-connect-custom-widget
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return r.x`<w3m-connect-external-widget
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return r.x`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${c.o(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${h}`),null}})}};re.styles=Jn;We([c.n()],re.prototype,"tabIdx",void 0);We([c.r()],re.prototype,"connectors",void 0);We([c.r()],re.prototype,"recommended",void 0);We([c.r()],re.prototype,"featured",void 0);re=We([c.customElement("w3m-connector-list")],re);const Qn=r.i`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var ie=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let H=class extends r.i$1{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,n)=>{var o;const i=n===this.activeTab;return r.x`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(n)}
          data-active=${i}
          data-testid="tab-${(o=e.label)==null?void 0:o.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?r.x`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,n){const i=this.buttons[this.activeTab],o=this.buttons[e],t=i==null?void 0:i.querySelector("wui-text"),s=o==null?void 0:o.querySelector("wui-text"),l=o==null?void 0:o.getBoundingClientRect(),u=s==null?void 0:s.getBoundingClientRect();i&&t&&!n&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&l&&u&&s&&(e!==this.activeTab||n)&&(this.localTabWidth=`${Math.round(l.width+u.width)+6}px`,o.animate([{width:`${l.width+u.width}px`}],{duration:n?0:500,fill:"forwards",easing:"ease"}),s.animate([{opacity:1}],{duration:n?0:125,delay:n?0:200,fill:"forwards",easing:"ease"}))}};H.styles=[r.resetStyles,r.elementStyles,Qn];ie([c.n({type:Array})],H.prototype,"tabs",void 0);ie([c.n()],H.prototype,"onTabChange",void 0);ie([c.n({type:Array})],H.prototype,"buttons",void 0);ie([c.n({type:Boolean})],H.prototype,"disabled",void 0);ie([c.n()],H.prototype,"localTabWidth",void 0);ie([c.r()],H.prototype,"activeTab",void 0);ie([c.r()],H.prototype,"isDense",void 0);H=ie([c.customElement("wui-tabs")],H);var zt=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ze=class extends r.i$1{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return r.x`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(n=>n==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:n==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:n==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:n==="web"?{label:"Webapp",icon:"browser",platform:"web"}:n==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:n})=>n),e}onTabChange(e){var i;const n=this.platformTabs[e];n&&((i=this.onSelectPlatfrom)==null||i.call(this,n))}};zt([c.n({type:Array})],ze.prototype,"platforms",void 0);zt([c.n()],ze.prototype,"onSelectPlatfrom",void 0);ze=zt([c.customElement("w3m-connecting-header")],ze);const Xn=r.i`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var V=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const Gt={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},Zn={lg:"paragraph-600",md:"small-600"},ei={lg:"md",md:"md"};let j=class extends r.i$1{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;const e=this.textVariant??Zn[this.size];return r.x`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=ei[this.size],n=this.disabled?Gt.disabled:Gt[this.variant];return r.x`<wui-loading-spinner color=${n} size=${e}></wui-loading-spinner>`}return r.x``}};j.styles=[r.resetStyles,r.elementStyles,Xn];V([c.n()],j.prototype,"size",void 0);V([c.n({type:Boolean})],j.prototype,"disabled",void 0);V([c.n({type:Boolean})],j.prototype,"fullWidth",void 0);V([c.n({type:Boolean})],j.prototype,"loading",void 0);V([c.n()],j.prototype,"variant",void 0);V([c.n({type:Boolean})],j.prototype,"hasIconLeft",void 0);V([c.n({type:Boolean})],j.prototype,"hasIconRight",void 0);V([c.n()],j.prototype,"borderRadius",void 0);V([c.n()],j.prototype,"textVariant",void 0);j=V([c.customElement("wui-button")],j);const ti=r.i`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var Qe=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ge=class extends r.i$1{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return r.x`
      <button ?disabled=${this.disabled} tabindex=${c.o(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};ge.styles=[r.resetStyles,r.elementStyles,ti];Qe([c.n()],ge.prototype,"tabIdx",void 0);Qe([c.n({type:Boolean})],ge.prototype,"disabled",void 0);Qe([c.n()],ge.prototype,"color",void 0);ge=Qe([c.customElement("wui-link")],ge);const ni=r.i`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var An=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ne=class extends r.i$1{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,i=36-e,o=116+i,t=245+i,s=360+i*1.75;return r.x`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${o} ${t}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};Ne.styles=[r.resetStyles,ni];An([c.n({type:Number})],Ne.prototype,"radius",void 0);Ne=An([c.customElement("wui-loading-thumbnail")],Ne);const ii=r.i`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var ue=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let X=class extends r.i$1{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const e=this.size==="sm"?"small-600":"paragraph-600";return r.x`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?r.x`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};X.styles=[r.resetStyles,r.elementStyles,ii];ue([c.n()],X.prototype,"variant",void 0);ue([c.n()],X.prototype,"imageSrc",void 0);ue([c.n({type:Boolean})],X.prototype,"disabled",void 0);ue([c.n()],X.prototype,"icon",void 0);ue([c.n()],X.prototype,"size",void 0);ue([c.n()],X.prototype,"text",void 0);X=ue([c.customElement("wui-chip-button")],X);const oi=r.i`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var Xe=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let we=class extends r.i$1{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return r.x`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};we.styles=[r.resetStyles,r.elementStyles,oi];Xe([c.n({type:Boolean})],we.prototype,"disabled",void 0);Xe([c.n()],we.prototype,"label",void 0);Xe([c.n()],we.prototype,"buttonLabel",void 0);we=Xe([c.customElement("wui-cta-button")],we);const ri=r.i`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var Pn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Me=class extends r.i$1{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:n,play_store:i,chrome_store:o,homepage:t}=this.wallet,s=r.CoreHelperUtil.isMobile(),l=r.CoreHelperUtil.isIos(),u=r.CoreHelperUtil.isAndroid(),d=[n,i,t,o].filter(Boolean).length>1,h=c.UiHelperUtil.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return d&&!s?r.x`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>r.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&t?r.x`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:n&&l?r.x`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&u?r.x`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&r.CoreHelperUtil.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&r.CoreHelperUtil.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&r.CoreHelperUtil.openHref(this.wallet.homepage,"_blank")}};Me.styles=[ri];Pn([c.n({type:Object})],Me.prototype,"wallet",void 0);Me=Pn([c.customElement("w3m-mobile-download-links")],Me);const ai=r.i`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var F=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};class O extends r.i$1{constructor(){var e,n,i,o,t;super(),this.wallet=(e=r.RouterController.state.data)==null?void 0:e.wallet,this.connector=(n=r.RouterController.state.data)==null?void 0:n.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=r.AssetUtil.getWalletImage(this.wallet)??r.AssetUtil.getConnectorImage(this.connector),this.name=((i=this.wallet)==null?void 0:i.name)??((o=this.connector)==null?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=r.ConnectionController.state.wcUri,this.error=r.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",s=>{var l;this.uri=s,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(l=this.onConnect)==null||l.call(this))}),r.ConnectionController.subscribeKey("wcError",s=>this.error=s)),(r.CoreHelperUtil.isTelegram()||r.CoreHelperUtil.isSafari())&&r.CoreHelperUtil.isIos()&&r.ConnectionController.state.wcUri&&((t=this.onConnect)==null||t.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),r.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){var i;(i=this.onRender)==null||i.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let n=`Continue in ${this.name}`;return this.error&&(n="Connection declined"),r.x`
      <wui-flex
        data-error=${c.o(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${c.o(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${n}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?r.x`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?r.x`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const n=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");n==null||n.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,n;r.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(n=this.onConnect)==null||n.call(this)}loaderTemplate(){const e=r.ThemeController.state.themeVariables["--w3m-border-radius-master"],n=e?parseInt(e.replace("px",""),10):4;return r.x`<wui-loading-thumbnail radius=${n*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(r.CoreHelperUtil.copyToClopboard(this.uri),r.SnackController.showSuccess("Link copied"))}catch{r.SnackController.showError("Failed to copy")}}}O.styles=ai;F([c.r()],O.prototype,"isRetrying",void 0);F([c.r()],O.prototype,"uri",void 0);F([c.r()],O.prototype,"error",void 0);F([c.r()],O.prototype,"ready",void 0);F([c.r()],O.prototype,"showRetry",void 0);F([c.r()],O.prototype,"secondaryBtnLabel",void 0);F([c.r()],O.prototype,"secondaryLabel",void 0);F([c.r()],O.prototype,"isLoading",void 0);F([c.n({type:Boolean})],O.prototype,"isMobile",void 0);F([c.n()],O.prototype,"onRetry",void 0);var si=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Yt=class extends O{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var e;try{this.error=!1;const{connectors:n}=r.ConnectorController.state,i=n.find(o=>{var t,s,l;return o.type==="ANNOUNCED"&&((t=o.info)==null?void 0:t.rdns)===((s=this.wallet)==null?void 0:s.rdns)||o.type==="INJECTED"||o.name===((l=this.wallet)==null?void 0:l.name)});if(i)await r.ConnectionController.connectExternal(i,i.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");r.ModalController.close(),r.EventsController.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((e=this.wallet)==null?void 0:e.name)||"Unknown"}})}catch(n){r.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(n==null?void 0:n.message)??"Unknown"}}),this.error=!0}}};Yt=si([c.customElement("w3m-connecting-wc-browser")],Yt);var li=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Jt=class extends O{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:n,name:i}=this.wallet,{redirect:o,href:t}=r.CoreHelperUtil.formatNativeUrl(n,this.uri);r.ConnectionController.setWcLinking({name:i,href:t}),r.ConnectionController.setRecentWallet(this.wallet),r.CoreHelperUtil.openHref(o,"_blank")}catch{this.error=!0}}};Jt=li([c.customElement("w3m-connecting-wc-desktop")],Jt);var xe=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let ae=class extends O{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=r.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{var e;if((e=this.wallet)!=null&&e.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:n,link_mode:i,name:o}=this.wallet,{redirect:t,redirectUniversalLink:s,href:l}=r.CoreHelperUtil.formatNativeUrl(n,this.uri,i);this.redirectDeeplink=t,this.redirectUniversalLink=s,this.target=r.CoreHelperUtil.isIframe()?"_top":"_self",r.ConnectionController.setWcLinking({name:o,href:l}),r.ConnectionController.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?r.CoreHelperUtil.openHref(this.redirectUniversalLink,this.target):r.CoreHelperUtil.openHref(this.redirectDeeplink,this.target)}catch(n){r.EventsController.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:n instanceof Error?n.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=r.ConstantsUtil$1.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",()=>{this.onHandleURI()})),r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){var e;this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onTryAgain(){var e;r.ConnectionController.setWcError(!1),(e=this.onConnect)==null||e.call(this)}};xe([c.r()],ae.prototype,"redirectDeeplink",void 0);xe([c.r()],ae.prototype,"redirectUniversalLink",void 0);xe([c.r()],ae.prototype,"target",void 0);xe([c.r()],ae.prototype,"preferUniversalLinks",void 0);xe([c.r()],ae.prototype,"isLoading",void 0);ae=xe([c.customElement("w3m-connecting-wc-mobile")],ae);var fe={},rt,Qt;function ci(){return Qt||(Qt=1,rt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),rt}var at={},te={},Xt;function de(){if(Xt)return te;Xt=1;let a;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return te.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},te.getSymbolTotalCodewords=function(i){return e[i]},te.getBCHDigit=function(n){let i=0;for(;n!==0;)i++,n>>>=1;return i},te.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');a=i},te.isKanjiModeEnabled=function(){return typeof a<"u"},te.toSJIS=function(i){return a(i)},te}var st={},Zt;function Nt(){return Zt||(Zt=1,function(a){a.L={bit:1},a.M={bit:0},a.Q={bit:3},a.H={bit:2};function e(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"l":case"low":return a.L;case"m":case"medium":return a.M;case"q":case"quartile":return a.Q;case"h":case"high":return a.H;default:throw new Error("Unknown EC Level: "+n)}}a.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},a.from=function(i,o){if(a.isValid(i))return i;try{return e(i)}catch{return o}}}(st)),st}var lt,en;function ui(){if(en)return lt;en=1;function a(){this.buffer=[],this.length=0}return a.prototype={get:function(e){const n=Math.floor(e/8);return(this.buffer[n]>>>7-e%8&1)===1},put:function(e,n){for(let i=0;i<n;i++)this.putBit((e>>>n-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const n=Math.floor(this.length/8);this.buffer.length<=n&&this.buffer.push(0),e&&(this.buffer[n]|=128>>>this.length%8),this.length++}},lt=a,lt}var ct,tn;function di(){if(tn)return ct;tn=1;function a(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return a.prototype.set=function(e,n,i,o){const t=e*this.size+n;this.data[t]=i,o&&(this.reservedBit[t]=!0)},a.prototype.get=function(e,n){return this.data[e*this.size+n]},a.prototype.xor=function(e,n,i){this.data[e*this.size+n]^=i},a.prototype.isReserved=function(e,n){return this.reservedBit[e*this.size+n]},ct=a,ct}var ut={},nn;function hi(){return nn||(nn=1,function(a){const e=de().getSymbolSize;a.getRowColCoords=function(i){if(i===1)return[];const o=Math.floor(i/7)+2,t=e(i),s=t===145?26:Math.ceil((t-13)/(2*o-2))*2,l=[t-7];for(let u=1;u<o-1;u++)l[u]=l[u-1]-s;return l.push(6),l.reverse()},a.getPositions=function(i){const o=[],t=a.getRowColCoords(i),s=t.length;for(let l=0;l<s;l++)for(let u=0;u<s;u++)l===0&&u===0||l===0&&u===s-1||l===s-1&&u===0||o.push([t[l],t[u]]);return o}}(ut)),ut}var dt={},on;function pi(){if(on)return dt;on=1;const a=de().getSymbolSize,e=7;return dt.getPositions=function(i){const o=a(i);return[[0,0],[o-e,0],[0,o-e]]},dt}var ht={},rn;function fi(){return rn||(rn=1,function(a){a.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};a.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},a.from=function(o){return a.isValid(o)?parseInt(o,10):void 0},a.getPenaltyN1=function(o){const t=o.size;let s=0,l=0,u=0,d=null,h=null;for(let f=0;f<t;f++){l=u=0,d=h=null;for(let y=0;y<t;y++){let g=o.get(f,y);g===d?l++:(l>=5&&(s+=e.N1+(l-5)),d=g,l=1),g=o.get(y,f),g===h?u++:(u>=5&&(s+=e.N1+(u-5)),h=g,u=1)}l>=5&&(s+=e.N1+(l-5)),u>=5&&(s+=e.N1+(u-5))}return s},a.getPenaltyN2=function(o){const t=o.size;let s=0;for(let l=0;l<t-1;l++)for(let u=0;u<t-1;u++){const d=o.get(l,u)+o.get(l,u+1)+o.get(l+1,u)+o.get(l+1,u+1);(d===4||d===0)&&s++}return s*e.N2},a.getPenaltyN3=function(o){const t=o.size;let s=0,l=0,u=0;for(let d=0;d<t;d++){l=u=0;for(let h=0;h<t;h++)l=l<<1&2047|o.get(d,h),h>=10&&(l===1488||l===93)&&s++,u=u<<1&2047|o.get(h,d),h>=10&&(u===1488||u===93)&&s++}return s*e.N3},a.getPenaltyN4=function(o){let t=0;const s=o.data.length;for(let u=0;u<s;u++)t+=o.data[u];return Math.abs(Math.ceil(t*100/s/5)-10)*e.N4};function n(i,o,t){switch(i){case a.Patterns.PATTERN000:return(o+t)%2===0;case a.Patterns.PATTERN001:return o%2===0;case a.Patterns.PATTERN010:return t%3===0;case a.Patterns.PATTERN011:return(o+t)%3===0;case a.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(t/3))%2===0;case a.Patterns.PATTERN101:return o*t%2+o*t%3===0;case a.Patterns.PATTERN110:return(o*t%2+o*t%3)%2===0;case a.Patterns.PATTERN111:return(o*t%3+(o+t)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}a.applyMask=function(o,t){const s=t.size;for(let l=0;l<s;l++)for(let u=0;u<s;u++)t.isReserved(u,l)||t.xor(u,l,n(o,u,l))},a.getBestMask=function(o,t){const s=Object.keys(a.Patterns).length;let l=0,u=1/0;for(let d=0;d<s;d++){t(d),a.applyMask(d,o);const h=a.getPenaltyN1(o)+a.getPenaltyN2(o)+a.getPenaltyN3(o)+a.getPenaltyN4(o);a.applyMask(d,o),h<u&&(u=h,l=d)}return l}}(ht)),ht}var Be={},an;function Bn(){if(an)return Be;an=1;const a=Nt(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Be.getBlocksCount=function(o,t){switch(t){case a.L:return e[(o-1)*4+0];case a.M:return e[(o-1)*4+1];case a.Q:return e[(o-1)*4+2];case a.H:return e[(o-1)*4+3];default:return}},Be.getTotalCodewordsCount=function(o,t){switch(t){case a.L:return n[(o-1)*4+0];case a.M:return n[(o-1)*4+1];case a.Q:return n[(o-1)*4+2];case a.H:return n[(o-1)*4+3];default:return}},Be}var pt={},$e={},sn;function gi(){if(sn)return $e;sn=1;const a=new Uint8Array(512),e=new Uint8Array(256);return function(){let i=1;for(let o=0;o<255;o++)a[o]=i,e[i]=o,i<<=1,i&256&&(i^=285);for(let o=255;o<512;o++)a[o]=a[o-255]}(),$e.log=function(i){if(i<1)throw new Error("log("+i+")");return e[i]},$e.exp=function(i){return a[i]},$e.mul=function(i,o){return i===0||o===0?0:a[e[i]+e[o]]},$e}var ln;function wi(){return ln||(ln=1,function(a){const e=gi();a.mul=function(i,o){const t=new Uint8Array(i.length+o.length-1);for(let s=0;s<i.length;s++)for(let l=0;l<o.length;l++)t[s+l]^=e.mul(i[s],o[l]);return t},a.mod=function(i,o){let t=new Uint8Array(i);for(;t.length-o.length>=0;){const s=t[0];for(let u=0;u<o.length;u++)t[u]^=e.mul(o[u],s);let l=0;for(;l<t.length&&t[l]===0;)l++;t=t.slice(l)}return t},a.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let t=0;t<i;t++)o=a.mul(o,new Uint8Array([1,e.exp(t)]));return o}}(pt)),pt}var ft,cn;function mi(){if(cn)return ft;cn=1;const a=wi();function e(n){this.genPoly=void 0,this.degree=n,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(i){this.degree=i,this.genPoly=a.generateECPolynomial(this.degree)},e.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(i.length+this.degree);o.set(i);const t=a.mod(o,this.genPoly),s=this.degree-t.length;if(s>0){const l=new Uint8Array(this.degree);return l.set(t,s),l}return t},ft=e,ft}var gt={},wt={},mt={},un;function On(){return un||(un=1,mt.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),mt}var q={},dn;function Ln(){if(dn)return q;dn=1;const a="[0-9]+",e="[A-Z $%*+\\-./:]+";let n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+`)(?:.|[\r
]))+`;q.KANJI=new RegExp(n,"g"),q.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),q.BYTE=new RegExp(i,"g"),q.NUMERIC=new RegExp(a,"g"),q.ALPHANUMERIC=new RegExp(e,"g");const o=new RegExp("^"+n+"$"),t=new RegExp("^"+a+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return q.testKanji=function(u){return o.test(u)},q.testNumeric=function(u){return t.test(u)},q.testAlphanumeric=function(u){return s.test(u)},q}var hn;function he(){return hn||(hn=1,function(a){const e=On(),n=Ln();a.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},a.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},a.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},a.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},a.MIXED={bit:-1},a.getCharCountIndicator=function(t,s){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?t.ccBits[0]:s<27?t.ccBits[1]:t.ccBits[2]},a.getBestModeForData=function(t){return n.testNumeric(t)?a.NUMERIC:n.testAlphanumeric(t)?a.ALPHANUMERIC:n.testKanji(t)?a.KANJI:a.BYTE},a.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},a.isValid=function(t){return t&&t.bit&&t.ccBits};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return a.NUMERIC;case"alphanumeric":return a.ALPHANUMERIC;case"kanji":return a.KANJI;case"byte":return a.BYTE;default:throw new Error("Unknown mode: "+o)}}a.from=function(t,s){if(a.isValid(t))return t;try{return i(t)}catch{return s}}}(wt)),wt}var pn;function bi(){return pn||(pn=1,function(a){const e=de(),n=Bn(),i=Nt(),o=he(),t=On(),s=7973,l=e.getBCHDigit(s);function u(y,g,_){for(let v=1;v<=40;v++)if(g<=a.getCapacity(v,_,y))return v}function d(y,g){return o.getCharCountIndicator(y,g)+4}function h(y,g){let _=0;return y.forEach(function(v){const I=d(v.mode,g);_+=I+v.getBitsLength()}),_}function f(y,g){for(let _=1;_<=40;_++)if(h(y,_)<=a.getCapacity(_,g,o.MIXED))return _}a.from=function(g,_){return t.isValid(g)?parseInt(g,10):_},a.getCapacity=function(g,_,v){if(!t.isValid(g))throw new Error("Invalid QR Code version");typeof v>"u"&&(v=o.BYTE);const I=e.getSymbolTotalCodewords(g),m=n.getTotalCodewordsCount(g,_),w=(I-m)*8;if(v===o.MIXED)return w;const b=w-d(v,g);switch(v){case o.NUMERIC:return Math.floor(b/10*3);case o.ALPHANUMERIC:return Math.floor(b/11*2);case o.KANJI:return Math.floor(b/13);case o.BYTE:default:return Math.floor(b/8)}},a.getBestVersionForData=function(g,_){let v;const I=i.from(_,i.M);if(Array.isArray(g)){if(g.length>1)return f(g,I);if(g.length===0)return 1;v=g[0]}else v=g;return u(v.mode,v.getLength(),I)},a.getEncodedBits=function(g){if(!t.isValid(g)||g<7)throw new Error("Invalid QR Code version");let _=g<<12;for(;e.getBCHDigit(_)-l>=0;)_^=s<<e.getBCHDigit(_)-l;return g<<12|_}}(gt)),gt}var bt={},fn;function vi(){if(fn)return bt;fn=1;const a=de(),e=1335,n=21522,i=a.getBCHDigit(e);return bt.getEncodedBits=function(t,s){const l=t.bit<<3|s;let u=l<<10;for(;a.getBCHDigit(u)-i>=0;)u^=e<<a.getBCHDigit(u)-i;return(l<<10|u)^n},bt}var vt={},xt,gn;function xi(){if(gn)return xt;gn=1;const a=he();function e(n){this.mode=a.NUMERIC,this.data=n.toString()}return e.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let o,t,s;for(o=0;o+3<=this.data.length;o+=3)t=this.data.substr(o,3),s=parseInt(t,10),i.put(s,10);const l=this.data.length-o;l>0&&(t=this.data.substr(o),s=parseInt(t,10),i.put(s,l*3+1))},xt=e,xt}var yt,wn;function yi(){if(wn)return yt;wn=1;const a=he(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(i){this.mode=a.ALPHANUMERIC,this.data=i}return n.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(o){let t;for(t=0;t+2<=this.data.length;t+=2){let s=e.indexOf(this.data[t])*45;s+=e.indexOf(this.data[t+1]),o.put(s,11)}this.data.length%2&&o.put(e.indexOf(this.data[t]),6)},yt=n,yt}var Ct,mn;function Ci(){return mn||(mn=1,Ct=function(e){for(var n=[],i=e.length,o=0;o<i;o++){var t=e.charCodeAt(o);if(t>=55296&&t<=56319&&i>o+1){var s=e.charCodeAt(o+1);s>=56320&&s<=57343&&(t=(t-55296)*1024+s-56320+65536,o+=1)}if(t<128){n.push(t);continue}if(t<2048){n.push(t>>6|192),n.push(t&63|128);continue}if(t<55296||t>=57344&&t<65536){n.push(t>>12|224),n.push(t>>6&63|128),n.push(t&63|128);continue}if(t>=65536&&t<=1114111){n.push(t>>18|240),n.push(t>>12&63|128),n.push(t>>6&63|128),n.push(t&63|128);continue}n.push(239,191,189)}return new Uint8Array(n).buffer}),Ct}var $t,bn;function $i(){if(bn)return $t;bn=1;const a=Ci(),e=he();function n(i){this.mode=e.BYTE,typeof i=="string"&&(i=a(i)),this.data=new Uint8Array(i)}return n.getBitsLength=function(o){return o*8},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(i){for(let o=0,t=this.data.length;o<t;o++)i.put(this.data[o],8)},$t=n,$t}var Rt,vn;function Ri(){if(vn)return Rt;vn=1;const a=he(),e=de();function n(i){this.mode=a.KANJI,this.data=i}return n.getBitsLength=function(o){return o*13},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(i){let o;for(o=0;o<this.data.length;o++){let t=e.toSJIS(this.data[o]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),i.put(t,13)}},Rt=n,Rt}var Et={exports:{}},xn;function Ei(){return xn||(xn=1,function(a){var e={single_source_shortest_paths:function(n,i,o){var t={},s={};s[i]=0;var l=e.PriorityQueue.make();l.push(i,0);for(var u,d,h,f,y,g,_,v,I;!l.empty();){u=l.pop(),d=u.value,f=u.cost,y=n[d]||{};for(h in y)y.hasOwnProperty(h)&&(g=y[h],_=f+g,v=s[h],I=typeof s[h]>"u",(I||v>_)&&(s[h]=_,l.push(h,_),t[h]=d))}if(typeof o<"u"&&typeof s[o]>"u"){var m=["Could not find a path from ",i," to ",o,"."].join("");throw new Error(m)}return t},extract_shortest_path_from_predecessor_list:function(n,i){for(var o=[],t=i;t;)o.push(t),n[t],t=n[t];return o.reverse(),o},find_path:function(n,i,o){var t=e.single_source_shortest_paths(n,i,o);return e.extract_shortest_path_from_predecessor_list(t,o)},PriorityQueue:{make:function(n){var i=e.PriorityQueue,o={},t;n=n||{};for(t in i)i.hasOwnProperty(t)&&(o[t]=i[t]);return o.queue=[],o.sorter=n.sorter||i.default_sorter,o},default_sorter:function(n,i){return n.cost-i.cost},push:function(n,i){var o={value:n,cost:i};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};a.exports=e}(Et)),Et.exports}var yn;function _i(){return yn||(yn=1,function(a){const e=he(),n=xi(),i=yi(),o=$i(),t=Ri(),s=Ln(),l=de(),u=Ei();function d(m){return unescape(encodeURIComponent(m)).length}function h(m,w,b){const p=[];let P;for(;(P=m.exec(b))!==null;)p.push({data:P[0],index:P.index,mode:w,length:P[0].length});return p}function f(m){const w=h(s.NUMERIC,e.NUMERIC,m),b=h(s.ALPHANUMERIC,e.ALPHANUMERIC,m);let p,P;return l.isKanjiModeEnabled()?(p=h(s.BYTE,e.BYTE,m),P=h(s.KANJI,e.KANJI,m)):(p=h(s.BYTE_KANJI,e.BYTE,m),P=[]),w.concat(b,p,P).sort(function(W,E){return W.index-E.index}).map(function(W){return{data:W.data,mode:W.mode,length:W.length}})}function y(m,w){switch(w){case e.NUMERIC:return n.getBitsLength(m);case e.ALPHANUMERIC:return i.getBitsLength(m);case e.KANJI:return t.getBitsLength(m);case e.BYTE:return o.getBitsLength(m)}}function g(m){return m.reduce(function(w,b){const p=w.length-1>=0?w[w.length-1]:null;return p&&p.mode===b.mode?(w[w.length-1].data+=b.data,w):(w.push(b),w)},[])}function _(m){const w=[];for(let b=0;b<m.length;b++){const p=m[b];switch(p.mode){case e.NUMERIC:w.push([p,{data:p.data,mode:e.ALPHANUMERIC,length:p.length},{data:p.data,mode:e.BYTE,length:p.length}]);break;case e.ALPHANUMERIC:w.push([p,{data:p.data,mode:e.BYTE,length:p.length}]);break;case e.KANJI:w.push([p,{data:p.data,mode:e.BYTE,length:d(p.data)}]);break;case e.BYTE:w.push([{data:p.data,mode:e.BYTE,length:d(p.data)}])}}return w}function v(m,w){const b={},p={start:{}};let P=["start"];for(let C=0;C<m.length;C++){const W=m[C],E=[];for(let x=0;x<W.length;x++){const T=W[x],$=""+C+x;E.push($),b[$]={node:T,lastCount:0},p[$]={};for(let S=0;S<P.length;S++){const R=P[S];b[R]&&b[R].node.mode===T.mode?(p[R][$]=y(b[R].lastCount+T.length,T.mode)-y(b[R].lastCount,T.mode),b[R].lastCount+=T.length):(b[R]&&(b[R].lastCount=T.length),p[R][$]=y(T.length,T.mode)+4+e.getCharCountIndicator(T.mode,w))}}P=E}for(let C=0;C<P.length;C++)p[P[C]].end=0;return{map:p,table:b}}function I(m,w){let b;const p=e.getBestModeForData(m);if(b=e.from(w,p),b!==e.BYTE&&b.bit<p.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(b)+`.
 Suggested mode is: `+e.toString(p));switch(b===e.KANJI&&!l.isKanjiModeEnabled()&&(b=e.BYTE),b){case e.NUMERIC:return new n(m);case e.ALPHANUMERIC:return new i(m);case e.KANJI:return new t(m);case e.BYTE:return new o(m)}}a.fromArray=function(w){return w.reduce(function(b,p){return typeof p=="string"?b.push(I(p,null)):p.data&&b.push(I(p.data,p.mode)),b},[])},a.fromString=function(w,b){const p=f(w,l.isKanjiModeEnabled()),P=_(p),C=v(P,b),W=u.find_path(C.map,"start","end"),E=[];for(let x=1;x<W.length-1;x++)E.push(C.table[W[x]].node);return a.fromArray(g(E))},a.rawSplit=function(w){return a.fromArray(f(w,l.isKanjiModeEnabled()))}}(vt)),vt}var Cn;function Ii(){if(Cn)return at;Cn=1;const a=de(),e=Nt(),n=ui(),i=di(),o=hi(),t=pi(),s=fi(),l=Bn(),u=mi(),d=bi(),h=vi(),f=he(),y=_i();function g(C,W){const E=C.size,x=t.getPositions(W);for(let T=0;T<x.length;T++){const $=x[T][0],S=x[T][1];for(let R=-1;R<=7;R++)if(!($+R<=-1||E<=$+R))for(let A=-1;A<=7;A++)S+A<=-1||E<=S+A||(R>=0&&R<=6&&(A===0||A===6)||A>=0&&A<=6&&(R===0||R===6)||R>=2&&R<=4&&A>=2&&A<=4?C.set($+R,S+A,!0,!0):C.set($+R,S+A,!1,!0))}}function _(C){const W=C.size;for(let E=8;E<W-8;E++){const x=E%2===0;C.set(E,6,x,!0),C.set(6,E,x,!0)}}function v(C,W){const E=o.getPositions(W);for(let x=0;x<E.length;x++){const T=E[x][0],$=E[x][1];for(let S=-2;S<=2;S++)for(let R=-2;R<=2;R++)S===-2||S===2||R===-2||R===2||S===0&&R===0?C.set(T+S,$+R,!0,!0):C.set(T+S,$+R,!1,!0)}}function I(C,W){const E=C.size,x=d.getEncodedBits(W);let T,$,S;for(let R=0;R<18;R++)T=Math.floor(R/3),$=R%3+E-8-3,S=(x>>R&1)===1,C.set(T,$,S,!0),C.set($,T,S,!0)}function m(C,W,E){const x=C.size,T=h.getEncodedBits(W,E);let $,S;for($=0;$<15;$++)S=(T>>$&1)===1,$<6?C.set($,8,S,!0):$<8?C.set($+1,8,S,!0):C.set(x-15+$,8,S,!0),$<8?C.set(8,x-$-1,S,!0):$<9?C.set(8,15-$-1+1,S,!0):C.set(8,15-$-1,S,!0);C.set(x-8,8,1,!0)}function w(C,W){const E=C.size;let x=-1,T=E-1,$=7,S=0;for(let R=E-1;R>0;R-=2)for(R===6&&R--;;){for(let A=0;A<2;A++)if(!C.isReserved(T,R-A)){let ee=!1;S<W.length&&(ee=(W[S]>>>$&1)===1),C.set(T,R-A,ee),$--,$===-1&&(S++,$=7)}if(T+=x,T<0||E<=T){T-=x,x=-x;break}}}function b(C,W,E){const x=new n;E.forEach(function(A){x.put(A.mode.bit,4),x.put(A.getLength(),f.getCharCountIndicator(A.mode,C)),A.write(x)});const T=a.getSymbolTotalCodewords(C),$=l.getTotalCodewordsCount(C,W),S=(T-$)*8;for(x.getLengthInBits()+4<=S&&x.put(0,4);x.getLengthInBits()%8!==0;)x.putBit(0);const R=(S-x.getLengthInBits())/8;for(let A=0;A<R;A++)x.put(A%2?17:236,8);return p(x,C,W)}function p(C,W,E){const x=a.getSymbolTotalCodewords(W),T=l.getTotalCodewordsCount(W,E),$=x-T,S=l.getBlocksCount(W,E),R=x%S,A=S-R,ee=Math.floor(x/S),Ce=Math.floor($/S),qn=Ce+1,Vt=ee-Ce,Hn=new u(Vt);let et=0;const Pe=new Array(S),Ft=new Array(S);let tt=0;const Vn=new Uint8Array(C.buffer);for(let pe=0;pe<S;pe++){const it=pe<A?Ce:qn;Pe[pe]=Vn.slice(et,et+it),Ft[pe]=Hn.encode(Pe[pe]),et+=it,tt=Math.max(tt,it)}const nt=new Uint8Array(x);let Kt=0,G,Y;for(G=0;G<tt;G++)for(Y=0;Y<S;Y++)G<Pe[Y].length&&(nt[Kt++]=Pe[Y][G]);for(G=0;G<Vt;G++)for(Y=0;Y<S;Y++)nt[Kt++]=Ft[Y][G];return nt}function P(C,W,E,x){let T;if(Array.isArray(C))T=y.fromArray(C);else if(typeof C=="string"){let ee=W;if(!ee){const Ce=y.rawSplit(C);ee=d.getBestVersionForData(Ce,E)}T=y.fromString(C,ee||40)}else throw new Error("Invalid data");const $=d.getBestVersionForData(T,E);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!W)W=$;else if(W<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const S=b(W,E,T),R=a.getSymbolSize(W),A=new i(R);return g(A,W),_(A),v(A,W),m(A,E,0),W>=7&&I(A,W),w(A,S),isNaN(x)&&(x=s.getBestMask(A,m.bind(null,A,E))),s.applyMask(x,A),m(A,E,x),{modules:A,version:W,errorCorrectionLevel:E,maskPattern:x,segments:T}}return at.create=function(W,E){if(typeof W>"u"||W==="")throw new Error("No input text");let x=e.M,T,$;return typeof E<"u"&&(x=e.from(E.errorCorrectionLevel,e.M),T=d.from(E.version),$=s.from(E.maskPattern),E.toSJISFunc&&a.setToSJISFunction(E.toSJISFunc)),P(W,T,x,$)},at}var _t={},It={},$n;function Un(){return $n||($n=1,function(a){function e(n){if(typeof n=="number"&&(n=n.toString()),typeof n!="string")throw new Error("Color should be defined as hex string");let i=n.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+n);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(t){return[t,t]}))),i.length===6&&i.push("F","F");const o=parseInt(i.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+i.slice(0,6).join("")}}a.getOptions=function(i){i||(i={}),i.color||(i.color={});const o=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,t=i.width&&i.width>=21?i.width:void 0,s=i.scale||4;return{width:t,scale:t?4:s,margin:o,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},a.getScale=function(i,o){return o.width&&o.width>=i+o.margin*2?o.width/(i+o.margin*2):o.scale},a.getImageWidth=function(i,o){const t=a.getScale(i,o);return Math.floor((i+o.margin*2)*t)},a.qrToImageData=function(i,o,t){const s=o.modules.size,l=o.modules.data,u=a.getScale(s,t),d=Math.floor((s+t.margin*2)*u),h=t.margin*u,f=[t.color.light,t.color.dark];for(let y=0;y<d;y++)for(let g=0;g<d;g++){let _=(y*d+g)*4,v=t.color.light;if(y>=h&&g>=h&&y<d-h&&g<d-h){const I=Math.floor((y-h)/u),m=Math.floor((g-h)/u);v=f[l[I*s+m]?1:0]}i[_++]=v.r,i[_++]=v.g,i[_++]=v.b,i[_]=v.a}}}(It)),It}var Rn;function Wi(){return Rn||(Rn=1,function(a){const e=Un();function n(o,t,s){o.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=s,t.width=s,t.style.height=s+"px",t.style.width=s+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}a.render=function(t,s,l){let u=l,d=s;typeof u>"u"&&(!s||!s.getContext)&&(u=s,s=void 0),s||(d=i()),u=e.getOptions(u);const h=e.getImageWidth(t.modules.size,u),f=d.getContext("2d"),y=f.createImageData(h,h);return e.qrToImageData(y.data,t,u),n(f,d,h),f.putImageData(y,0,0),d},a.renderToDataURL=function(t,s,l){let u=l;typeof u>"u"&&(!s||!s.getContext)&&(u=s,s=void 0),u||(u={});const d=a.render(t,s,u),h=u.type||"image/png",f=u.rendererOpts||{};return d.toDataURL(h,f.quality)}}(_t)),_t}var Wt={},En;function Si(){if(En)return Wt;En=1;const a=Un();function e(o,t){const s=o.a/255,l=t+'="'+o.hex+'"';return s<1?l+" "+t+'-opacity="'+s.toFixed(2).slice(1)+'"':l}function n(o,t,s){let l=o+t;return typeof s<"u"&&(l+=" "+s),l}function i(o,t,s){let l="",u=0,d=!1,h=0;for(let f=0;f<o.length;f++){const y=Math.floor(f%t),g=Math.floor(f/t);!y&&!d&&(d=!0),o[f]?(h++,f>0&&y>0&&o[f-1]||(l+=d?n("M",y+s,.5+g+s):n("m",u,0),u=0,d=!1),y+1<t&&o[f+1]||(l+=n("h",h),h=0)):u++}return l}return Wt.render=function(t,s,l){const u=a.getOptions(s),d=t.modules.size,h=t.modules.data,f=d+u.margin*2,y=u.color.light.a?"<path "+e(u.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",g="<path "+e(u.color.dark,"stroke")+' d="'+i(h,d,u.margin)+'"/>',_='viewBox="0 0 '+f+" "+f+'"',I='<svg xmlns="http://www.w3.org/2000/svg" '+(u.width?'width="'+u.width+'" height="'+u.width+'" ':"")+_+' shape-rendering="crispEdges">'+y+g+`</svg>
`;return typeof l=="function"&&l(null,I),I},Wt}var _n;function Ti(){if(_n)return fe;_n=1;const a=ci(),e=Ii(),n=Wi(),i=Si();function o(t,s,l,u,d){const h=[].slice.call(arguments,1),f=h.length,y=typeof h[f-1]=="function";if(!y&&!a())throw new Error("Callback required as last argument");if(y){if(f<2)throw new Error("Too few arguments provided");f===2?(d=l,l=s,s=u=void 0):f===3&&(s.getContext&&typeof d>"u"?(d=u,u=void 0):(d=u,u=l,l=s,s=void 0))}else{if(f<1)throw new Error("Too few arguments provided");return f===1?(l=s,s=u=void 0):f===2&&!s.getContext&&(u=l,l=s,s=void 0),new Promise(function(g,_){try{const v=e.create(l,u);g(t(v,s,u))}catch(v){_(v)}})}try{const g=e.create(l,u);d(null,t(g,s,u))}catch(g){d(g)}}return fe.create=e.create,fe.toCanvas=o.bind(null,n.render),fe.toDataURL=o.bind(null,n.renderToDataURL),fe.toString=o.bind(null,function(t,s,l){return i.render(t,l)}),fe}var Ai=Ti();const Pi=Fn.getDefaultExportFromCjs(Ai),Bi=.1,In=2.5,J=7;function St(a,e,n){return a===e?!1:(a-e<0?e-a:a-e)<=n+Bi}function Oi(a,e){const n=Array.prototype.slice.call(Pi.create(a,{errorCorrectionLevel:e}).modules.data,0),i=Math.sqrt(n.length);return n.reduce((o,t,s)=>(s%i===0?o.push([t]):o[o.length-1].push(t))&&o,[])}const Li={generate({uri:a,size:e,logoSize:n,dotColor:i="#141414"}){const o="transparent",s=[],l=Oi(a,"Q"),u=e/l.length,d=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];d.forEach(({x:v,y:I})=>{const m=(l.length-J)*u*v,w=(l.length-J)*u*I,b=.45;for(let p=0;p<d.length;p+=1){const P=u*(J-p*2);s.push(r.b`
            <rect
              fill=${p===2?i:o}
              width=${p===0?P-5:P}
              rx= ${p===0?(P-5)*b:P*b}
              ry= ${p===0?(P-5)*b:P*b}
              stroke=${i}
              stroke-width=${p===0?5:0}
              height=${p===0?P-5:P}
              x= ${p===0?w+u*p+5/2:w+u*p}
              y= ${p===0?m+u*p+5/2:m+u*p}
            />
          `)}});const h=Math.floor((n+25)/u),f=l.length/2-h/2,y=l.length/2+h/2-1,g=[];l.forEach((v,I)=>{v.forEach((m,w)=>{if(l[I][w]&&!(I<J&&w<J||I>l.length-(J+1)&&w<J||I<J&&w>l.length-(J+1))&&!(I>f&&I<y&&w>f&&w<y)){const b=I*u+u/2,p=w*u+u/2;g.push([b,p])}})});const _={};return g.forEach(([v,I])=>{var m;_[v]?(m=_[v])==null||m.push(I):_[v]=[I]}),Object.entries(_).map(([v,I])=>{const m=I.filter(w=>I.every(b=>!St(w,b,u)));return[Number(v),m]}).forEach(([v,I])=>{I.forEach(m=>{s.push(r.b`<circle cx=${v} cy=${m} fill=${i} r=${u/In} />`)})}),Object.entries(_).filter(([v,I])=>I.length>1).map(([v,I])=>{const m=I.filter(w=>I.some(b=>St(w,b,u)));return[Number(v),m]}).map(([v,I])=>{I.sort((w,b)=>w<b?-1:1);const m=[];for(const w of I){const b=m.find(p=>p.some(P=>St(w,P,u)));b?b.push(w):m.push([w])}return[v,m.map(w=>[w[0],w[w.length-1]])]}).forEach(([v,I])=>{I.forEach(([m,w])=>{s.push(r.b`
              <line
                x1=${v}
                x2=${v}
                y1=${m}
                y2=${w}
                stroke=${i}
                stroke-width=${u/(In/2)}
                stroke-linecap="round"
              />
            `)})}),s}},Ui=r.i`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var Z=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const ki="#3396ff";let N=class extends r.i$1{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??ki}
    `,r.x`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e=this.theme==="light"?this.size:this.size-32;return r.b`
      <svg height=${e} width=${e}>
        ${Li.generate({uri:this.uri,size:e,logoSize:this.arenaClear?0:e/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?r.x`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?r.x`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:r.x`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};N.styles=[r.resetStyles,Ui];Z([c.n()],N.prototype,"uri",void 0);Z([c.n({type:Number})],N.prototype,"size",void 0);Z([c.n()],N.prototype,"theme",void 0);Z([c.n()],N.prototype,"imageSrc",void 0);Z([c.n()],N.prototype,"alt",void 0);Z([c.n()],N.prototype,"color",void 0);Z([c.n({type:Boolean})],N.prototype,"arenaClear",void 0);Z([c.n({type:Boolean})],N.prototype,"farcaster",void 0);N=Z([c.customElement("wui-qr-code")],N);const ji=r.i`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var Se=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let se=class extends r.i$1{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,r.x`<slot></slot>`}};se.styles=[ji];Se([c.n()],se.prototype,"width",void 0);Se([c.n()],se.prototype,"height",void 0);Se([c.n()],se.prototype,"borderRadius",void 0);Se([c.n()],se.prototype,"variant",void 0);se=Se([c.customElement("wui-shimmer")],se);const Di="https://reown.com",zi=r.i`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;var Ni=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let At=class extends r.i$1{render(){return r.x`
      <a
        data-testid="ux-branding-reown"
        href=${Di}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};At.styles=[r.resetStyles,r.elementStyles,zi];At=Ni([c.customElement("wui-ux-by-reown")],At);const Mi=r.i`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var qi=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Pt=class extends O{constructor(){var e;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.unsubscribe)==null||e.forEach(n=>n()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),r.x`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,n=this.wallet?this.wallet.name:void 0;return r.ConnectionController.setWcLinking(void 0),r.ConnectionController.setRecentWallet(this.wallet),r.x` <wui-qr-code
      size=${e}
      theme=${r.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${c.o(r.AssetUtil.getWalletImage(this.wallet))}
      color=${c.o(r.ThemeController.state.themeVariables["--w3m-qr-color"])}
      alt=${c.o(n)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return r.x`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Pt.styles=Mi;Pt=qi([c.customElement("w3m-connecting-wc-qrcode")],Pt);var Hi=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Wn=class extends r.i$1{constructor(){var e;if(super(),this.wallet=(e=r.RouterController.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return r.x`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${c.o(r.AssetUtil.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Wn=Hi([c.customElement("w3m-connecting-wc-unsupported")],Wn);var kn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Bt=class extends O{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=r.ConstantsUtil$1.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(r.ConnectionController.subscribeKey("wcUri",()=>{this.updateLoadingState()})),r.EventsController.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:n,name:i}=this.wallet,{redirect:o,href:t}=r.CoreHelperUtil.formatUniversalUrl(n,this.uri);r.ConnectionController.setWcLinking({name:i,href:t}),r.ConnectionController.setRecentWallet(this.wallet),r.CoreHelperUtil.openHref(o,"_blank")}catch{this.error=!0}}};kn([c.r()],Bt.prototype,"isLoading",void 0);Bt=kn([c.customElement("w3m-connecting-wc-web")],Bt);var Te=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let me=class extends r.i$1{constructor(){var e;super(),this.wallet=(e=r.RouterController.state.data)==null?void 0:e.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!r.OptionsController.state.siwx,this.remoteFeatures=r.OptionsController.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(r.OptionsController.subscribeKey("remoteFeatures",n=>this.remoteFeatures=n))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.x`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){var e;return(e=this.remoteFeatures)!=null&&e.reownBranding?r.x`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if(!(this.platform==="browser"||r.OptionsController.state.manualWCControl&&!e))try{const{wcPairingExpiry:n,status:i}=r.ConnectionController.state;(e||r.OptionsController.state.enableEmbedded||r.CoreHelperUtil.isPairingExpired(n)||i==="connecting")&&(await r.ConnectionController.connectWalletConnect(),this.isSiwxEnabled||r.ModalController.close())}catch(n){r.EventsController.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(n==null?void 0:n.message)??"Unknown"}}),r.ConnectionController.setWcError(!0),r.SnackController.showError(n.message??"Connection error"),r.ConnectionController.resetWcConnection(),r.RouterController.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:n,webapp_link:i,injected:o,rdns:t}=this.wallet,s=o==null?void 0:o.map(({injected_id:_})=>_).filter(Boolean),l=[...t?[t]:s??[]],u=r.OptionsController.state.isUniversalProvider?!1:l.length,d=e,h=i,f=r.ConnectionController.checkInstalled(l),y=u&&f,g=n&&!r.CoreHelperUtil.isMobile();y&&!r.ChainController.state.noAdapters&&this.platforms.push("browser"),d&&this.platforms.push(r.CoreHelperUtil.isMobile()?"mobile":"qrcode"),h&&this.platforms.push("web"),g&&this.platforms.push("desktop"),!y&&u&&!r.ChainController.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return r.x`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return r.x`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return r.x`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return r.x`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return r.x`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return r.x`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?r.x`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var i;const n=(i=this.shadowRoot)==null?void 0:i.querySelector("div");n&&(await n.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,n.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Te([c.r()],me.prototype,"platform",void 0);Te([c.r()],me.prototype,"platforms",void 0);Te([c.r()],me.prototype,"isSiwxEnabled",void 0);Te([c.r()],me.prototype,"remoteFeatures",void 0);me=Te([c.customElement("w3m-connecting-wc-view")],me);var jn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};exports.W3mConnectingWcBasicView=class extends r.i$1{constructor(){super(...arguments),this.isMobile=r.CoreHelperUtil.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:n}=r.ApiController.state,{customWallets:i}=r.OptionsController.state,o=r.StorageUtil.getRecentWallets(),t=e.length||n.length||(i==null?void 0:i.length)||o.length;return r.x`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?r.x`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return r.x`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};jn([c.r()],exports.W3mConnectingWcBasicView.prototype,"isMobile",void 0);exports.W3mConnectingWcBasicView=jn([c.customElement("w3m-connecting-wc-basic-view")],exports.W3mConnectingWcBasicView);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=()=>new Vi;class Vi{}const Tt=new WeakMap,qt=c.e(class extends c.f{render(a){return r.E}update(a,[e]){var i;const n=e!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=e,this.ht=(i=a.options)==null?void 0:i.host,this.rt(this.ct=a.element)),r.E}rt(a){if(this.isConnected||(a=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let n=Tt.get(e);n===void 0&&(n=new WeakMap,Tt.set(e,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,a),a!==void 0&&this.G.call(this.ht,a)}else this.G.value=a}get lt(){var a,e;return typeof this.G=="function"?(a=Tt.get(this.ht??globalThis))==null?void 0:a.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),Fi=r.i`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var Dn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let qe=class extends r.i$1{constructor(){super(...arguments),this.inputElementRef=Mt(),this.checked=void 0}render(){return r.x`
      <label>
        <input
          ${qt(this.inputElementRef)}
          type="checkbox"
          ?checked=${c.o(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("switchChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};qe.styles=[r.resetStyles,r.elementStyles,r.colorStyles,Fi];Dn([c.n({type:Boolean})],qe.prototype,"checked",void 0);qe=Dn([c.customElement("wui-switch")],qe);const Ki=r.i`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var zn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let He=class extends r.i$1{constructor(){super(...arguments),this.checked=void 0}render(){return r.x`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${c.o(this.checked)}></wui-switch>
      </button>
    `}};He.styles=[r.resetStyles,r.elementStyles,Ki];zn([c.n({type:Boolean})],He.prototype,"checked",void 0);He=zn([c.customElement("wui-certified-switch")],He);const Gi=r.i`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var Nn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ve=class extends r.i$1{constructor(){super(...arguments),this.icon="copy"}render(){return r.x`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};Ve.styles=[r.resetStyles,r.elementStyles,Gi];Nn([c.n()],Ve.prototype,"icon",void 0);Ve=Nn([c.customElement("wui-input-element")],Ve);const Yi=r.i`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var K=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let D=class extends r.i$1{constructor(){super(...arguments),this.inputElementRef=Mt(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const e=`wui-padding-right-${this.inputRightPadding}`,i={[`wui-size-${this.size}`]:!0,[e]:!!this.inputRightPadding};return r.x`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${qt(this.inputElementRef)}
        class=${c.e$1(i)}
        type=${this.type}
        enterkeyhint=${c.o(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${c.o(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?r.x`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var e;this.dispatchEvent(new CustomEvent("inputChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.value,bubbles:!0,composed:!0}))}};D.styles=[r.resetStyles,r.elementStyles,Yi];K([c.n()],D.prototype,"size",void 0);K([c.n()],D.prototype,"icon",void 0);K([c.n({type:Boolean})],D.prototype,"disabled",void 0);K([c.n()],D.prototype,"placeholder",void 0);K([c.n()],D.prototype,"type",void 0);K([c.n()],D.prototype,"keyHint",void 0);K([c.n()],D.prototype,"value",void 0);K([c.n()],D.prototype,"inputRightPadding",void 0);K([c.n()],D.prototype,"tabIdx",void 0);D=K([c.customElement("wui-input-text")],D);const Ji=r.i`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var Qi=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Ot=class extends r.i$1{constructor(){super(...arguments),this.inputComponentRef=Mt()}render(){return r.x`
      <wui-input-text
        ${qt(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,n=e==null?void 0:e.inputElementRef.value;n&&(n.value="",n.focus(),n.dispatchEvent(new Event("input")))}};Ot.styles=[r.resetStyles,Ji];Ot=Qi([c.customElement("wui-search-bar")],Ot);const Xi=r.b`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Zi=r.i`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var Mn=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let Fe=class extends r.i$1{constructor(){super(...arguments),this.type="wallet"}render(){return r.x`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?r.x` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${Xi}`:r.x`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};Fe.styles=[r.resetStyles,r.elementStyles,Zi];Mn([c.n()],Fe.prototype,"type",void 0);Fe=Mn([c.customElement("wui-card-select-loader")],Fe);const eo=r.i`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var z=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let L=class extends r.i$1{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&c.UiHelperUtil.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&c.UiHelperUtil.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&c.UiHelperUtil.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&c.UiHelperUtil.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&c.UiHelperUtil.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&c.UiHelperUtil.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&c.UiHelperUtil.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&c.UiHelperUtil.getSpacingStyles(this.margin,3)};
    `,r.x`<slot></slot>`}};L.styles=[r.resetStyles,eo];z([c.n()],L.prototype,"gridTemplateRows",void 0);z([c.n()],L.prototype,"gridTemplateColumns",void 0);z([c.n()],L.prototype,"justifyItems",void 0);z([c.n()],L.prototype,"alignItems",void 0);z([c.n()],L.prototype,"justifyContent",void 0);z([c.n()],L.prototype,"alignContent",void 0);z([c.n()],L.prototype,"columnGap",void 0);z([c.n()],L.prototype,"rowGap",void 0);z([c.n()],L.prototype,"gap",void 0);z([c.n()],L.prototype,"padding",void 0);z([c.n()],L.prototype,"margin",void 0);L=z([c.customElement("wui-grid")],L);const to=r.i`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var Ae=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let le=class extends r.i$1{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(n=>{n.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var n,i;const e=((n=this.wallet)==null?void 0:n.badge_type)==="certified";return r.x`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${c.o(e?"certified":void 0)}
            >${(i=this.wallet)==null?void 0:i.name}</wui-text
          >
          ${e?r.x`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var e,n;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():r.x`
      <wui-wallet-image
        size="md"
        imageSrc=${c.o(this.imageSrc)}
        name=${(e=this.wallet)==null?void 0:e.name}
        .installed=${(n=this.wallet)==null?void 0:n.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return r.x`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=r.AssetUtil.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await r.AssetUtil.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};le.styles=to;Ae([c.r()],le.prototype,"visible",void 0);Ae([c.r()],le.prototype,"imageSrc",void 0);Ae([c.r()],le.prototype,"imageLoading",void 0);Ae([c.n()],le.prototype,"wallet",void 0);le=Ae([c.customElement("w3m-all-wallets-list-item")],le);const no=r.i`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var ye=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};const Sn="local-paginator";let ne=class extends r.i$1{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!r.ApiController.state.wallets.length,this.wallets=r.ApiController.state.wallets,this.recommended=r.ApiController.state.recommended,this.featured=r.ApiController.state.featured,this.filteredWallets=r.ApiController.state.filteredWallets,this.unsubscribe.push(r.ApiController.subscribeKey("wallets",e=>this.wallets=e),r.ApiController.subscribeKey("recommended",e=>this.recommended=e),r.ApiController.subscribeKey("featured",e=>this.featured=e),r.ApiController.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(n=>n()),(e=this.paginationObserver)==null||e.disconnect()}render(){return r.x`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var n;this.loading=!0;const e=(n=this.shadowRoot)==null?void 0:n.querySelector("wui-grid");e&&(await r.ApiController.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,n){return[...Array(e)].map(()=>r.x`
        <wui-card-select-loader type="wallet" id=${c.o(n)}></wui-card-select-loader>
      `)}walletsTemplate(){var i;const e=((i=this.filteredWallets)==null?void 0:i.length)>0?r.CoreHelperUtil.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):r.CoreHelperUtil.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return r.WalletUtil.markWalletsAsInstalled(e).map(o=>r.x`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(o)}
          .wallet=${o}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:n,featured:i,count:o}=r.ApiController.state,t=window.innerWidth<352?3:4,s=e.length+n.length;let u=Math.ceil(s/t)*t-s+t;return u-=e.length?i.length%t:0,o===0&&i.length>0?null:o===0||[...i,...e,...n].length<o?this.shimmerTemplate(u,Sn):null}createPaginationObserver(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector(`#${Sn}`);e&&(this.paginationObserver=new IntersectionObserver(([i])=>{if(i!=null&&i.isIntersecting&&!this.loading){const{page:o,count:t,wallets:s}=r.ApiController.state;s.length<t&&r.ApiController.fetchWalletsByPage({page:o+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){r.ConnectorController.selectWalletConnector(e)}};ne.styles=no;ye([c.r()],ne.prototype,"loading",void 0);ye([c.r()],ne.prototype,"wallets",void 0);ye([c.r()],ne.prototype,"recommended",void 0);ye([c.r()],ne.prototype,"featured",void 0);ye([c.r()],ne.prototype,"filteredWallets",void 0);ne=ye([c.customElement("w3m-all-wallets-list")],ne);const io=r.i`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var Ze=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let be=class extends r.i$1{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?r.x`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await r.ApiController.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=r.ApiController.state,n=r.WalletUtil.markWalletsAsInstalled(e);return e.length?r.x`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${n.map(i=>r.x`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(i)}
              .wallet=${i}
              data-testid="wallet-search-item-${i.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:r.x`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){r.ConnectorController.selectWalletConnector(e)}};be.styles=io;Ze([c.r()],be.prototype,"loading",void 0);Ze([c.n()],be.prototype,"query",void 0);Ze([c.n()],be.prototype,"badge",void 0);be=Ze([c.customElement("w3m-all-wallets-search")],be);var Ht=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};exports.W3mAllWalletsView=class extends r.i$1{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=r.CoreHelperUtil.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return r.x`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?r.x`<w3m-all-wallets-search
            query=${this.search}
            badge=${c.o(this.badge)}
          ></w3m-all-wallets-search>`:r.x`<w3m-all-wallets-list badge=${c.o(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",r.SnackController.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return r.CoreHelperUtil.isMobile()?r.x`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){r.RouterController.push("ConnectingWalletConnect")}};Ht([c.r()],exports.W3mAllWalletsView.prototype,"search",void 0);Ht([c.r()],exports.W3mAllWalletsView.prototype,"badge",void 0);exports.W3mAllWalletsView=Ht([c.customElement("w3m-all-wallets-view")],exports.W3mAllWalletsView);const oo=r.i`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var M=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};let k=class extends r.i$1{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return r.x`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${c.o(this.iconVariant)}
        tabindex=${c.o(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return r.x`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return r.x`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",n=this.iconVariant==="square-blue"?"mdl":"md",i=this.iconSize?this.iconSize:n;return r.x`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${n}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?r.x`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:r.x``}chevronTemplate(){return this.chevron?r.x`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};k.styles=[r.resetStyles,r.elementStyles,oo];M([c.n()],k.prototype,"icon",void 0);M([c.n()],k.prototype,"iconSize",void 0);M([c.n()],k.prototype,"tabIdx",void 0);M([c.n()],k.prototype,"variant",void 0);M([c.n()],k.prototype,"iconVariant",void 0);M([c.n({type:Boolean})],k.prototype,"disabled",void 0);M([c.n()],k.prototype,"imageSrc",void 0);M([c.n()],k.prototype,"alt",void 0);M([c.n({type:Boolean})],k.prototype,"chevron",void 0);M([c.n({type:Boolean})],k.prototype,"loading",void 0);k=M([c.customElement("wui-list-item")],k);var ro=function(a,e,n,i){var o=arguments.length,t=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,n,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(t=(o<3?s(t):o>3?s(e,n,t):s(e,n))||t);return o>3&&t&&Object.defineProperty(e,n,t),t};exports.W3mDownloadsView=class extends r.i$1{constructor(){var e;super(...arguments),this.wallet=(e=r.RouterController.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return r.x`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?r.x`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?r.x`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?r.x`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?r.x`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&r.CoreHelperUtil.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&r.CoreHelperUtil.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&r.CoreHelperUtil.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&r.CoreHelperUtil.openHref(this.wallet.homepage,"_blank")}};exports.W3mDownloadsView=ro([c.customElement("w3m-downloads-view")],exports.W3mDownloadsView);
