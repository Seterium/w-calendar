if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const f=e=>i(e,r),d={module:{uri:r},exports:t,require:f};s[r]=Promise.all(n.map((e=>d[e]||f(e)))).then((e=>(o(...e),t)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.4400ef29.js",revision:null},{url:"assets/index.84f82df9.css",revision:null},{url:"index.html",revision:"d98f14a2d45b58f37e9f8ee1fba3e50b"},{url:"registerSW.js",revision:"a2d4fae464c109808b4aff30d58d0ed3"},{url:"favicon.ico",revision:"8937fab6c02d15999d1b40a2f548f992"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"fonts/RussoOne.woff",revision:"bd8c85fc91438baa081802116ab94103"},{url:"fonts/RussoOne.woff2",revision:"69e57b4434a337053dee00b1cab31556"},{url:"manifest.webmanifest",revision:"7275d44af6eea0c182d801d7e3ba3f7c"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
