!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}({3:function(e,t){var n=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))((function(o,r){function a(e){try{f(i.next(e))}catch(e){r(e)}}function l(e){try{f(i.throw(e))}catch(e){r(e)}}function f(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,l)}f((i=i.apply(e,t||[])).next())}))};if("bgfunc"==figma.command){function i(e,t){return n(this,void 0,void 0,(function*(){if("IMAGE"===e.type){const n=figma.getImageByHash(e.imageHash),i=yield n.getBytesAsync();figma.showUI(__html__,{visible:!1}),figma.ui.postMessage({type:"run",bytes:i,apikey:t});const o=yield new Promise((e,t)=>{figma.ui.onmessage=t=>{console.log("response",t),void 0!==t.error?figma.closePlugin(t.error):e(t)}}),r=JSON.parse(JSON.stringify(e));return r.imageHash=figma.createImage(o).hash,{fill:r,updated:!0}}return{fill:e,updated:!1}}))}1!==figma.currentPage.selection.length&&figma.closePlugin("Select a single node."),figma.clientStorage.getAsync("slazzerApiKey").then(e=>{e?function(e,t){n(this,void 0,void 0,(function*(){if(["RECTANGLE","ELLIPSE","POLYGON","STAR","VECTOR","TEXT"].indexOf(e.type)>-1){let n,o=[],r=!1;for(const a of e.fills)n=yield i(a,t),r=n.updated||r,o.push(n.fill);e.fills=o,figma.closePlugin(r?"Image background removed.":"Nothing changed.")}else figma.closePlugin("Select a node with image fill.")}))}(figma.currentPage.selection[0],e):figma.closePlugin("Please set api key first.")})}else"apikey"==figma.command&&figma.clientStorage.getAsync("slazzerApiKey").then(e=>{figma.showUI(__html__,{visible:!0}),figma.ui.resize(550,700),figma.ui.postMessage({type:"key",apikey:e}),figma.ui.onmessage=e=>{figma.clientStorage.setAsync("slazzerApiKey",e).then(()=>{figma.closePlugin("API Key has been set.")})}})}});