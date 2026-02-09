var zt=Object.defineProperty;var et=e=>{throw TypeError(e)};var Yt=(e,t,r)=>t in e?zt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>Yt(e,typeof t!="symbol"?t+"":t,r),qe=(e,t,r)=>t.has(e)||et("Cannot "+r);var c=(e,t,r)=>(qe(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?et("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(qe(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),b=(e,t,r)=>(qe(e,t,"access private method"),r);var tt=(e,t,r,s)=>({set _(a){f(e,t,a,r)},get _(){return c(e,t,s)}});var rt=(e,t,r)=>(s,a)=>{let i=-1;return n(0);async function n(o){if(o<=i)throw new Error("next() called multiple times");i=o;let l,d=!1,u;if(e[o]?(u=e[o][0][0],s.req.routeIndex=o):u=o===e.length&&a||void 0,u)try{l=await u(s,()=>n(o+1))}catch(h){if(h instanceof Error&&t)s.error=h,l=await t(h,s),d=!0;else throw h}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},$e=class extends Error{constructor(t=500,r){super(r==null?void 0:r.message,{cause:r==null?void 0:r.cause});p(this,"res");p(this,"status");this.res=r==null?void 0:r.res,this.status=t}getResponse(){return this.res?new Response(this.res.body,{status:this.status,headers:this.res.headers}):new Response(this.message,{status:this.status})}},Gt=Symbol(),Xt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,i=(e instanceof xt?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?Qt(e,{all:r,dot:s}):{}};async function Qt(e,t){const r=await e.formData();return r?Zt(r,t):{}}function Zt(e,t){const r=Object.create(null);return e.forEach((s,a)=>{t.all||a.endsWith("[]")?er(r,a,s):r[a]=s}),t.dot&&Object.entries(r).forEach(([s,a])=>{s.includes(".")&&(tr(r,s,a),delete r[s])}),r}var er=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},tr=(e,t,r)=>{let s=e;const a=t.split(".");a.forEach((i,n)=>{n===a.length-1?s[i]=r:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},vt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},rr=e=>{const{groups:t,path:r}=sr(e),s=vt(r);return ar(s,t)},sr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const a=`@${s}`;return t.push([a,r]),a}),{groups:t,path:e}},ar=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let a=e.length-1;a>=0;a--)if(e[a].includes(s)){e[a]=e[a].replace(s,t[r][1]);break}}return e},Ae={},ir=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Ae[s]||(r[2]?Ae[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ae[s]=[e,r[1],!0]),Ae[s]}return null},He=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},nr=e=>He(e,decodeURI),bt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const a=t.charCodeAt(s);if(a===37){const i=t.indexOf("?",s),n=t.slice(r,i===-1?void 0:i);return nr(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(a===63)break}return t.slice(r,s)},or=e=>{const t=bt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),wt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))s+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){r.length===0&&s===""?r.push("/"):r.push(s);const i=a.replace("?","");s+="/"+i,r.push(s)}else s+="/"+a}),r.filter((a,i,n)=>n.indexOf(a)===i)},Le=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?He(e,Ge):e):e,yt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const o=e.charCodeAt(n+t.length+1);if(o===61){const l=n+t.length+2,d=e.indexOf("&",l);return Le(e.slice(l,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";n=e.indexOf(`&${t}`,n+1)}if(s=/[%+]/.test(e),!s)return}const a={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const n=e.indexOf("&",i+1);let o=e.indexOf("=",i);o>n&&n!==-1&&(o=-1);let l=e.slice(i+1,o===-1?n===-1?void 0:n:o);if(s&&(l=Le(l)),i=n,l==="")continue;let d;o===-1?d="":(d=e.slice(o+1,n===-1?void 0:n),s&&(d=Le(d))),r?(a[l]&&Array.isArray(a[l])||(a[l]=[]),a[l].push(d)):a[l]??(a[l]=d)}return t?a[t]:a},lr=yt,cr=(e,t)=>yt(e,t,!0),Ge=decodeURIComponent,st=e=>He(e,Ge),ne,A,$,Et,St,Ke,F,ut,xt=(ut=class{constructor(e,t="/",r=[[]]){g(this,$);p(this,"raw");g(this,ne);g(this,A);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,F,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const a=Object.keys(t)[0];return a?t[a].then(i=>(a==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,A,r),f(this,ne,{})}param(e){return e?b(this,$,Et).call(this,e):b(this,$,St).call(this)}query(e){return lr(this.url,e)}queries(e){return cr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Xt(this,e))}json(){return c(this,F).call(this,"text").then(e=>JSON.parse(e))}text(){return c(this,F).call(this,"text")}arrayBuffer(){return c(this,F).call(this,"arrayBuffer")}blob(){return c(this,F).call(this,"blob")}formData(){return c(this,F).call(this,"formData")}addValidatedData(e,t){c(this,ne)[e]=t}valid(e){return c(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Gt](){return c(this,A)}get matchedRoutes(){return c(this,A)[0].map(([[,e]])=>e)}get routePath(){return c(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,A=new WeakMap,$=new WeakSet,Et=function(e){const t=c(this,A)[0][this.routeIndex][1][e],r=b(this,$,Ke).call(this,t);return r&&/\%/.test(r)?st(r):r},St=function(){const e={},t=Object.keys(c(this,A)[0][this.routeIndex][1]);for(const r of t){const s=b(this,$,Ke).call(this,c(this,A)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?st(s):s)}return e},Ke=function(e){return c(this,A)[1]?c(this,A)[1][e]:e},F=new WeakMap,ut),dr={Stringify:1},_t=async(e,t,r,s,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(a?a[0]+=e:a=[e],Promise.all(i.map(o=>o({phase:t,buffer:a,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(l=>_t(l,t,!1,s,a))).then(()=>a[0]))):Promise.resolve(e)},ur="text/plain; charset=UTF-8",Me=(e,t)=>({"Content-Type":e,...t}),we,ye,H,oe,I,j,xe,le,ce,G,Ee,Se,J,ae,ht,hr=(ht=class{constructor(e,t){g(this,J);g(this,we);g(this,ye);p(this,"env",{});g(this,H);p(this,"finalized",!1);p(this,"error");g(this,oe);g(this,I);g(this,j);g(this,xe);g(this,le);g(this,ce);g(this,G);g(this,Ee);g(this,Se);p(this,"render",(...e)=>(c(this,le)??f(this,le,t=>this.html(t)),c(this,le).call(this,...e)));p(this,"setLayout",e=>f(this,xe,e));p(this,"getLayout",()=>c(this,xe));p(this,"setRenderer",e=>{f(this,le,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,j,new Response(c(this,j).body,c(this,j)));const s=c(this,j)?c(this,j).headers:c(this,G)??f(this,G,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,oe,e)});p(this,"set",(e,t)=>{c(this,H)??f(this,H,new Map),c(this,H).set(e,t)});p(this,"get",e=>c(this,H)?c(this,H).get(e):void 0);p(this,"newResponse",(...e)=>b(this,J,ae).call(this,...e));p(this,"body",(e,t,r)=>b(this,J,ae).call(this,e,t,r));p(this,"text",(e,t,r)=>!c(this,G)&&!c(this,oe)&&!t&&!r&&!this.finalized?new Response(e):b(this,J,ae).call(this,e,t,Me(ur,r)));p(this,"json",(e,t,r)=>b(this,J,ae).call(this,JSON.stringify(e),t,Me("application/json",r)));p(this,"html",(e,t,r)=>{const s=a=>b(this,J,ae).call(this,a,t,Me("text/html; charset=UTF-8",r));return typeof e=="object"?_t(e,dr.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(c(this,ce)??f(this,ce,()=>new Response),c(this,ce).call(this,this)));f(this,we,e),t&&(f(this,I,t.executionCtx),this.env=t.env,f(this,ce,t.notFoundHandler),f(this,Se,t.path),f(this,Ee,t.matchResult))}get req(){return c(this,ye)??f(this,ye,new xt(c(this,we),c(this,Se),c(this,Ee))),c(this,ye)}get event(){if(c(this,I)&&"respondWith"in c(this,I))return c(this,I);throw Error("This context has no FetchEvent")}get executionCtx(){if(c(this,I))return c(this,I);throw Error("This context has no ExecutionContext")}get res(){return c(this,j)||f(this,j,new Response(null,{headers:c(this,G)??f(this,G,new Headers)}))}set res(e){if(c(this,j)&&e){e=new Response(e.body,e);for(const[t,r]of c(this,j).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=c(this,j).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of s)e.headers.append("set-cookie",a)}else e.headers.set(t,r)}f(this,j,e),this.finalized=!0}get var(){return c(this,H)?Object.fromEntries(c(this,H)):{}}},we=new WeakMap,ye=new WeakMap,H=new WeakMap,oe=new WeakMap,I=new WeakMap,j=new WeakMap,xe=new WeakMap,le=new WeakMap,ce=new WeakMap,G=new WeakMap,Ee=new WeakMap,Se=new WeakMap,J=new WeakSet,ae=function(e,t,r){const s=c(this,j)?new Headers(c(this,j).headers):c(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,o]of i)n.toLowerCase()==="set-cookie"?s.append(n,o):s.set(n,o)}if(r)for(const[i,n]of Object.entries(r))if(typeof n=="string")s.set(i,n);else{s.delete(i);for(const o of n)s.append(i,o)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??c(this,oe);return new Response(e,{status:a,headers:s})},ht),S="ALL",pr="all",fr=["get","post","put","delete","options","patch"],Ct="Can not add a route since the matcher is already built.",Rt=class extends Error{},mr="__COMPOSED_HANDLER",gr=e=>e.text("404 Not Found",404),at=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},O,_,jt,k,z,Te,Oe,de,vr=(de=class{constructor(t={}){g(this,_);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,O,"/");p(this,"routes",[]);g(this,k,gr);p(this,"errorHandler",at);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,k,t),this));p(this,"fetch",(t,...r)=>b(this,_,Oe).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,a)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,a)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,_,Oe).call(this,t.request,t,void 0,t.request.method))})});[...fr,pr].forEach(i=>{this[i]=(n,...o)=>(typeof n=="string"?f(this,O,n):b(this,_,z).call(this,i,c(this,O),n),o.forEach(l=>{b(this,_,z).call(this,i,c(this,O),l)}),this)}),this.on=(i,n,...o)=>{for(const l of[n].flat()){f(this,O,l);for(const d of[i].flat())o.map(u=>{b(this,_,z).call(this,d.toUpperCase(),c(this,O),u)})}return this},this.use=(i,...n)=>(typeof i=="string"?f(this,O,i):(f(this,O,"*"),n.unshift(i)),n.forEach(o=>{b(this,_,z).call(this,S,c(this,O),o)}),this);const{strict:s,...a}=t;Object.assign(this,a),this.getPath=s??!0?t.getPath??bt:or}route(t,r){const s=this.basePath(t);return r.routes.map(a=>{var n;let i;r.errorHandler===at?i=a.handler:(i=async(o,l)=>(await rt([],r.errorHandler)(o,()=>a.handler(o,l))).res,i[mr]=a.handler),b(n=s,_,z).call(n,a.method,a.path,i)}),this}basePath(t){const r=b(this,_,jt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let a,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?a=l=>l:a=s.replaceRequest));const n=i?l=>{const d=i(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};a||(a=(()=>{const l=se(this._basePath,t),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const o=async(l,d)=>{const u=await r(a(l.req.raw),...n(l));if(u)return u;await d()};return b(this,_,z).call(this,S,se(t,"*"),o),this}},O=new WeakMap,_=new WeakSet,jt=function(){const t=new de({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,k,c(this,k)),t.routes=this.routes,t},k=new WeakMap,z=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const a={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,a]),this.routes.push(a)},Te=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Oe=function(t,r,s,a){if(a==="HEAD")return(async()=>new Response(null,await b(this,_,Oe).call(this,t,r,s,"GET")))();const i=this.getPath(t,{env:s}),n=this.router.match(a,i),o=new hr(t,{path:i,matchResult:n,env:s,executionCtx:r,notFoundHandler:c(this,k)});if(n[0].length===1){let d;try{d=n[0][0][0][0](o,async()=>{o.res=await c(this,k).call(this,o)})}catch(u){return b(this,_,Te).call(this,u,o)}return d instanceof Promise?d.then(u=>u||(o.finalized?o.res:c(this,k).call(this,o))).catch(u=>b(this,_,Te).call(this,u,o)):d??c(this,k).call(this,o)}const l=rt(n[0],this.errorHandler,c(this,k));return(async()=>{try{const d=await l(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,_,Te).call(this,d,o)}})()},de),At=[];function br(e,t){const r=this.buildAllMatchers(),s=((a,i)=>{const n=r[a]||r[S],o=n[2][i];if(o)return o;const l=i.match(n[0]);if(!l)return[[],At];const d=l.indexOf("",1);return[n[1][d],l]});return this.match=s,s(e,t)}var Pe="[^/]+",me=".*",ge="(?:|/.*)",ie=Symbol(),wr=new Set(".\\+*[^]$()");function yr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===me||e===ge?1:t===me||t===ge?-1:e===Pe?1:t===Pe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var X,Q,P,te,xr=(te=class{constructor(){g(this,X);g(this,Q);g(this,P,Object.create(null))}insert(t,r,s,a,i){if(t.length===0){if(c(this,X)!==void 0)throw ie;if(i)return;f(this,X,r);return}const[n,...o]=t,l=n==="*"?o.length===0?["","",me]:["","",Pe]:n==="/*"?["","",ge]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||Pe;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ie;if(d=c(this,P)[h],!d){if(Object.keys(c(this,P)).some(m=>m!==me&&m!==ge))throw ie;if(i)return;d=c(this,P)[h]=new te,u!==""&&f(d,Q,a.varIndex++)}!i&&u!==""&&s.push([u,c(d,Q)])}else if(d=c(this,P)[n],!d){if(Object.keys(c(this,P)).some(u=>u.length>1&&u!==me&&u!==ge))throw ie;if(i)return;d=c(this,P)[n]=new te}d.insert(o,r,s,a,i)}buildRegExpStr(){const r=Object.keys(c(this,P)).sort(yr).map(s=>{const a=c(this,P)[s];return(typeof c(a,Q)=="number"?`(${s})@${c(a,Q)}`:wr.has(s)?`\\${s}`:s)+a.buildRegExpStr()});return typeof c(this,X)=="number"&&r.unshift(`#${c(this,X)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},X=new WeakMap,Q=new WeakMap,P=new WeakMap,te),De,_e,pt,Er=(pt=class{constructor(){g(this,De,{varIndex:0});g(this,_e,new xr)}insert(e,t,r){const s=[],a=[];for(let n=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${n}`;return a[n]=[d,l],n++,o=!0,d}),!o)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=a.length-1;n>=0;n--){const[o]=a[n];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(o)!==-1){i[l]=i[l].replace(o,a[n][1]);break}}return c(this,_e).insert(i,t,s,c(this,De),r),s}buildRegExp(){let e=c(this,_e).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,i,n)=>i!==void 0?(r[++t]=Number(i),"$()"):(n!==void 0&&(s[Number(n)]=++t),"")),[new RegExp(`^${e}`),r,s]}},De=new WeakMap,_e=new WeakMap,pt),Sr=[/^$/,[],Object.create(null)],ke=Object.create(null);function Tt(e){return ke[e]??(ke[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function _r(){ke=Object.create(null)}function Cr(e){var d;const t=new Er,r=[];if(e.length===0)return Sr;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,y])=>u?1:m?-1:h.length-y.length),a=Object.create(null);for(let u=0,h=-1,m=s.length;u<m;u++){const[y,E,T]=s[u];y?a[E]=[T.map(([x])=>[x,Object.create(null)]),At]:h++;let w;try{w=t.insert(E,h,y)}catch(x){throw x===ie?new Rt(E):x}y||(r[h]=T.map(([x,L])=>{const Re=Object.create(null);for(L-=1;L>=0;L--){const[je,D]=w[L];Re[je]=D}return[x,Re]}))}const[i,n,o]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,y=r[u].length;m<y;m++){const E=(d=r[u][m])==null?void 0:d[1];if(!E)continue;const T=Object.keys(E);for(let w=0,x=T.length;w<x;w++)E[T[w]]=o[E[T[w]]]}const l=[];for(const u in n)l[u]=r[n[u]];return[i,l,a]}function re(e,t){if(e){for(const r of Object.keys(e).sort((s,a)=>a.length-s.length))if(Tt(r).test(t))return[...e[r]]}}var W,U,Ne,Ot,ft,Rr=(ft=class{constructor(){g(this,Ne);p(this,"name","RegExpRouter");g(this,W);g(this,U);p(this,"match",br);f(this,W,{[S]:Object.create(null)}),f(this,U,{[S]:Object.create(null)})}add(e,t,r){var o;const s=c(this,W),a=c(this,U);if(!s||!a)throw new Error(Ct);s[e]||[s,a].forEach(l=>{l[e]=Object.create(null),Object.keys(l[S]).forEach(d=>{l[e][d]=[...l[S][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=Tt(t);e===S?Object.keys(s).forEach(d=>{var u;(u=s[d])[t]||(u[t]=re(s[d],t)||re(s[S],t)||[])}):(o=s[e])[t]||(o[t]=re(s[e],t)||re(s[S],t)||[]),Object.keys(s).forEach(d=>{(e===S||e===d)&&Object.keys(s[d]).forEach(u=>{l.test(u)&&s[d][u].push([r,i])})}),Object.keys(a).forEach(d=>{(e===S||e===d)&&Object.keys(a[d]).forEach(u=>l.test(u)&&a[d][u].push([r,i]))});return}const n=wt(t)||[t];for(let l=0,d=n.length;l<d;l++){const u=n[l];Object.keys(a).forEach(h=>{var m;(e===S||e===h)&&((m=a[h])[u]||(m[u]=[...re(s[h],u)||re(s[S],u)||[]]),a[h][u].push([r,i-d+l+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(c(this,U)).concat(Object.keys(c(this,W))).forEach(t=>{e[t]||(e[t]=b(this,Ne,Ot).call(this,t))}),f(this,W,f(this,U,void 0)),_r(),e}},W=new WeakMap,U=new WeakMap,Ne=new WeakSet,Ot=function(e){const t=[];let r=e===S;return[c(this,W),c(this,U)].forEach(s=>{const a=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];a.length!==0?(r||(r=!0),t.push(...a)):e!==S&&t.push(...Object.keys(s[S]).map(i=>[i,s[S][i]]))}),r?Cr(t):null},ft),K,B,mt,jr=(mt=class{constructor(e){p(this,"name","SmartRouter");g(this,K,[]);g(this,B,[]);f(this,K,e.routers)}add(e,t,r){if(!c(this,B))throw new Error(Ct);c(this,B).push([e,t,r])}match(e,t){if(!c(this,B))throw new Error("Fatal error");const r=c(this,K),s=c(this,B),a=r.length;let i=0,n;for(;i<a;i++){const o=r[i];try{for(let l=0,d=s.length;l<d;l++)o.add(...s[l]);n=o.match(e,t)}catch(l){if(l instanceof Rt)continue;throw l}this.match=o.match.bind(o),f(this,K,[o]),f(this,B,void 0);break}if(i===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(c(this,B)||c(this,K).length!==1)throw new Error("No active router has been determined yet.");return c(this,K)[0]}},K=new WeakMap,B=new WeakMap,mt),fe=Object.create(null),V,R,Z,ue,C,q,Y,he,Ar=(he=class{constructor(t,r,s){g(this,q);g(this,V);g(this,R);g(this,Z);g(this,ue,0);g(this,C,fe);if(f(this,R,s||Object.create(null)),f(this,V,[]),t&&r){const a=Object.create(null);a[t]={handler:r,possibleKeys:[],score:0},f(this,V,[a])}f(this,Z,[])}insert(t,r,s){f(this,ue,++tt(this,ue)._);let a=this;const i=rr(r),n=[];for(let o=0,l=i.length;o<l;o++){const d=i[o],u=i[o+1],h=ir(d,u),m=Array.isArray(h)?h[0]:d;if(m in c(a,R)){a=c(a,R)[m],h&&n.push(h[1]);continue}c(a,R)[m]=new he,h&&(c(a,Z).push(h),n.push(h[1])),a=c(a,R)[m]}return c(a,V).push({[t]:{handler:s,possibleKeys:n.filter((o,l,d)=>d.indexOf(o)===l),score:c(this,ue)}}),a}search(t,r){var l;const s=[];f(this,C,fe);let i=[this];const n=vt(r),o=[];for(let d=0,u=n.length;d<u;d++){const h=n[d],m=d===u-1,y=[];for(let E=0,T=i.length;E<T;E++){const w=i[E],x=c(w,R)[h];x&&(f(x,C,c(w,C)),m?(c(x,R)["*"]&&s.push(...b(this,q,Y).call(this,c(x,R)["*"],t,c(w,C))),s.push(...b(this,q,Y).call(this,x,t,c(w,C)))):y.push(x));for(let L=0,Re=c(w,Z).length;L<Re;L++){const je=c(w,Z)[L],D=c(w,C)===fe?{}:{...c(w,C)};if(je==="*"){const M=c(w,R)["*"];M&&(s.push(...b(this,q,Y).call(this,M,t,c(w,C))),f(M,C,D),y.push(M));continue}const[Kt,Ze,pe]=je;if(!h&&!(pe instanceof RegExp))continue;const N=c(w,R)[Kt],Vt=n.slice(d).join("/");if(pe instanceof RegExp){const M=pe.exec(Vt);if(M){if(D[Ze]=M[0],s.push(...b(this,q,Y).call(this,N,t,c(w,C),D)),Object.keys(c(N,R)).length){f(N,C,D);const Be=((l=M[0].match(/\//))==null?void 0:l.length)??0;(o[Be]||(o[Be]=[])).push(N)}continue}}(pe===!0||pe.test(h))&&(D[Ze]=h,m?(s.push(...b(this,q,Y).call(this,N,t,D,c(w,C))),c(N,R)["*"]&&s.push(...b(this,q,Y).call(this,c(N,R)["*"],t,D,c(w,C)))):(f(N,C,D),y.push(N)))}}i=y.concat(o.shift()??[])}return s.length>1&&s.sort((d,u)=>d.score-u.score),[s.map(({handler:d,params:u})=>[d,u])]}},V=new WeakMap,R=new WeakMap,Z=new WeakMap,ue=new WeakMap,C=new WeakMap,q=new WeakSet,Y=function(t,r,s,a){const i=[];for(let n=0,o=c(t,V).length;n<o;n++){const l=c(t,V)[n],d=l[r]||l[S],u={};if(d!==void 0&&(d.params=Object.create(null),i.push(d),s!==fe||a&&a!==fe))for(let h=0,m=d.possibleKeys.length;h<m;h++){const y=d.possibleKeys[h],E=u[d.score];d.params[y]=a!=null&&a[y]&&!E?a[y]:s[y]??(a==null?void 0:a[y]),u[d.score]=!0}}return i},he),ee,gt,Tr=(gt=class{constructor(){p(this,"name","TrieRouter");g(this,ee);f(this,ee,new Ar)}add(e,t,r){const s=wt(t);if(s){for(let a=0,i=s.length;a<i;a++)c(this,ee).insert(e,s[a],r);return}c(this,ee).insert(e,t,r)}match(e,t){return c(this,ee).search(e,t)}},ee=new WeakMap,gt),kt=class extends vr{constructor(e={}){super(e),this.router=e.router??new jr({routers:[new Rr,new Tr]})}},Or=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(i=>typeof i=="string"?i==="*"?()=>i:n=>i===n?n:null:typeof i=="function"?i:n=>i.includes(n)?n:null)(r.origin),a=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(n,o){var u;function l(h,m){n.res.headers.set(h,m)}const d=await s(n.req.header("origin")||"",n);if(d&&l("Access-Control-Allow-Origin",d),r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),n.req.method==="OPTIONS"){r.origin!=="*"&&l("Vary","Origin"),r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await a(n.req.header("origin")||"",n);h.length&&l("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const y=n.req.header("Access-Control-Request-Headers");y&&(m=y.split(/\s*,\s*/))}return m!=null&&m.length&&(l("Access-Control-Allow-Headers",m.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await o(),r.origin!=="*"&&n.header("Vary","Origin",{append:!0})}},kr=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,it=(e,t=Dr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let a=t[s[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},Pr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Dr=Pr,Nr=(...e)=>{let t=e.filter(a=>a!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const a of r)a===".."&&s.length>0&&s.at(-1)!==".."?s.pop():a!=="."&&s.push(a);return s.join("/")||"."},Pt={br:".br",zstd:".zst",gzip:".gz"},Hr=Object.keys(Pt),Ir="index.html",Br=e=>{const t=e.root??"./",r=e.path,s=e.join??Nr;return async(a,i)=>{var u,h,m,y;if(a.finalized)return i();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,a.req.path,a)),i()}let o=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(o)&&(o=s(o,Ir));const l=e.getContent;let d=await l(o,a);if(d instanceof Response)return a.newResponse(d.body,d);if(d){const E=e.mimes&&it(o,e.mimes)||it(o);if(a.header("Content-Type",E||"application/octet-stream"),e.precompressed&&(!E||kr.test(E))){const T=new Set((h=a.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(w=>w.trim()));for(const w of Hr){if(!T.has(w))continue;const x=await l(o+Pt[w],a);if(x){d=x,a.header("Content-Encoding",w),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,o,a)),a.body(d)}await((y=e.onNotFound)==null?void 0:y.call(e,o,a)),await i()}},qr=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const a=r[e];if(!a)return null;const i=await s.get(a,{type:"stream"});return i||null},$r=e=>async function(r,s){return Br({...e,getContent:async i=>qr(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},Lr=e=>$r(e),Dt={name:"HMAC",hash:"SHA-256"},Mr=async e=>{const t=typeof e=="string"?new TextEncoder().encode(e):e;return await crypto.subtle.importKey("raw",t,Dt,!1,["sign","verify"])},Fr=async(e,t,r)=>{try{const s=atob(e),a=new Uint8Array(s.length);for(let i=0,n=s.length;i<n;i++)a[i]=s.charCodeAt(i);return await crypto.subtle.verify(Dt,r,a,new TextEncoder().encode(t))}catch{return!1}},Jr=/^[\w!#$%&'*.^`|~+-]+$/,Wr=/^[ !#-:<-[\]-~]*$/,Ve=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const r=e.trim().split(";"),s={};for(let a of r){a=a.trim();const i=a.indexOf("=");if(i===-1)continue;const n=a.substring(0,i).trim();if(t&&t!==n||!Jr.test(n))continue;let o=a.substring(i+1).trim();if(o.startsWith('"')&&o.endsWith('"')&&(o=o.slice(1,-1)),Wr.test(o)&&(s[n]=o.indexOf("%")!==-1?He(o,Ge):o,t))break}return s},nt=async(e,t,r)=>{const s={},a=await Mr(t);for(const[i,n]of Object.entries(Ve(e,r))){const o=n.lastIndexOf(".");if(o<1)continue;const l=n.substring(0,o),d=n.substring(o+1);if(d.length!==44||!d.endsWith("="))continue;const u=await Fr(d,l,a);s[i]=u?l:!1}return s},Fe=(e,t,r)=>{const s=e.req.raw.headers.get("Cookie");if(typeof t=="string"){if(!s)return;let i=t;return r==="secure"?i="__Secure-"+t:r==="host"&&(i="__Host-"+t),Ve(s,i)[i]}return s?Ve(s):{}},ot=async(e,t,r,s)=>{const a=e.req.raw.headers.get("Cookie");if(typeof r=="string"){if(!a)return;let n=r;return s==="secure"?n="__Secure-"+r:s==="host"&&(n="__Host-"+r),(await nt(a,t,n))[n]}return a?await nt(a,t):{}},Nt=e=>It(e.replace(/_|-/g,t=>({_:"/","-":"+"})[t]??t)),Ht=e=>Ur(e).replace(/\/|\+/g,t=>({"/":"_","+":"-"})[t]??t),Ur=e=>{let t="";const r=new Uint8Array(e);for(let s=0,a=r.length;s<a;s++)t+=String.fromCharCode(r[s]);return btoa(t)},It=e=>{const t=atob(e),r=new Uint8Array(new ArrayBuffer(t.length)),s=t.length/2;for(let a=0,i=t.length-1;a<=s;a++,i--)r[a]=t.charCodeAt(a),r[i]=t.charCodeAt(i);return r},ve=(e=>(e.HS256="HS256",e.HS384="HS384",e.HS512="HS512",e.RS256="RS256",e.RS384="RS384",e.RS512="RS512",e.PS256="PS256",e.PS384="PS384",e.PS512="PS512",e.ES256="ES256",e.ES384="ES384",e.ES512="ES512",e.EdDSA="EdDSA",e))(ve||{}),Kr={deno:"Deno",bun:"Bun",workerd:"Cloudflare-Workers",node:"Node.js"},Vr=()=>{var r,s;const e=globalThis;if(typeof navigator<"u"&&typeof navigator.userAgent=="string"){for(const[a,i]of Object.entries(Kr))if(zr(i))return a}return typeof(e==null?void 0:e.EdgeRuntime)=="string"?"edge-light":(e==null?void 0:e.fastly)!==void 0?"fastly":((s=(r=e==null?void 0:e.process)==null?void 0:r.release)==null?void 0:s.name)==="node"?"node":"other"},zr=e=>navigator.userAgent.startsWith(e),Yr=class extends Error{constructor(e){super(`${e} is not an implemented algorithm`),this.name="JwtAlgorithmNotImplemented"}},lt=class extends Error{constructor(){super('JWT verification requires "alg" option to be specified'),this.name="JwtAlgorithmRequired"}},Bt=class extends Error{constructor(e,t){super(`JWT algorithm mismatch: expected "${e}", got "${t}"`),this.name="JwtAlgorithmMismatch"}},Ie=class extends Error{constructor(e){super(`invalid JWT token: ${e}`),this.name="JwtTokenInvalid"}},Gr=class extends Error{constructor(e){super(`token (${e}) is being used before it's valid`),this.name="JwtTokenNotBefore"}},Xr=class extends Error{constructor(e){super(`token (${e}) expired`),this.name="JwtTokenExpired"}},Qr=class extends Error{constructor(e,t){super(`Invalid "iat" claim, must be a valid number lower than "${e}" (iat: "${t}")`),this.name="JwtTokenIssuedAt"}},Je=class extends Error{constructor(e,t){super(`expected issuer "${e}", got ${t?`"${t}"`:"none"} `),this.name="JwtTokenIssuer"}},qt=class extends Error{constructor(e){super(`jwt header is invalid: ${JSON.stringify(e)}`),this.name="JwtHeaderInvalid"}},Zr=class extends Error{constructor(e){super(`required "kid" in jwt header: ${JSON.stringify(e)}`),this.name="JwtHeaderRequiresKid"}},es=class extends Error{constructor(e){super(`symmetric algorithm "${e}" is not allowed for JWK verification`),this.name="JwtSymmetricAlgorithmNotAllowed"}},ts=class extends Error{constructor(e,t){super(`algorithm "${e}" is not in the allowed list: [${t.join(", ")}]`),this.name="JwtAlgorithmNotAllowed"}},rs=class extends Error{constructor(e){super(`token(${e}) signature mismatched`),this.name="JwtTokenSignatureMismatched"}},ss=class extends Error{constructor(e){super(`required "aud" in jwt payload: ${JSON.stringify(e)}`),this.name="JwtPayloadRequiresAud"}},as=class extends Error{constructor(e,t){super(`expected audience "${Array.isArray(e)?e.join(", "):e}", got "${t}"`),this.name="JwtTokenAudience"}},be=(e=>(e.Encrypt="encrypt",e.Decrypt="decrypt",e.Sign="sign",e.Verify="verify",e.DeriveKey="deriveKey",e.DeriveBits="deriveBits",e.WrapKey="wrapKey",e.UnwrapKey="unwrapKey",e))(be||{}),Ce=new TextEncoder,is=new TextDecoder;async function ns(e,t,r){const s=$t(t),a=await ls(e,s);return await crypto.subtle.sign(s,a,r)}async function os(e,t,r,s){const a=$t(t),i=await cs(e,a);return await crypto.subtle.verify(a,i,r,s)}function ze(e){return It(e.replace(/-+(BEGIN|END).*/g,"").replace(/\s/g,""))}async function ls(e,t){if(!crypto.subtle||!crypto.subtle.importKey)throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");if(Lt(e)){if(e.type!=="private"&&e.type!=="secret")throw new Error(`unexpected key type: CryptoKey.type is ${e.type}, expected private or secret`);return e}const r=[be.Sign];return typeof e=="object"?await crypto.subtle.importKey("jwk",e,t,!1,r):e.includes("PRIVATE")?await crypto.subtle.importKey("pkcs8",ze(e),t,!1,r):await crypto.subtle.importKey("raw",Ce.encode(e),t,!1,r)}async function cs(e,t){if(!crypto.subtle||!crypto.subtle.importKey)throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");if(Lt(e)){if(e.type==="public"||e.type==="secret")return e;e=await ct(e)}if(typeof e=="string"&&e.includes("PRIVATE")){const s=await crypto.subtle.importKey("pkcs8",ze(e),t,!0,[be.Sign]);e=await ct(s)}const r=[be.Verify];return typeof e=="object"?await crypto.subtle.importKey("jwk",e,t,!1,r):e.includes("PUBLIC")?await crypto.subtle.importKey("spki",ze(e),t,!1,r):await crypto.subtle.importKey("raw",Ce.encode(e),t,!1,r)}async function ct(e){if(e.type!=="private")throw new Error(`unexpected key type: ${e.type}`);if(!e.extractable)throw new Error("unexpected private key is unextractable");const t=await crypto.subtle.exportKey("jwk",e),{kty:r}=t,{alg:s,e:a,n:i}=t,{crv:n,x:o,y:l}=t;return{kty:r,alg:s,e:a,n:i,crv:n,x:o,y:l,key_ops:[be.Verify]}}function $t(e){switch(e){case"HS256":return{name:"HMAC",hash:{name:"SHA-256"}};case"HS384":return{name:"HMAC",hash:{name:"SHA-384"}};case"HS512":return{name:"HMAC",hash:{name:"SHA-512"}};case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"RS384":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-384"}};case"RS512":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-512"}};case"PS256":return{name:"RSA-PSS",hash:{name:"SHA-256"},saltLength:32};case"PS384":return{name:"RSA-PSS",hash:{name:"SHA-384"},saltLength:48};case"PS512":return{name:"RSA-PSS",hash:{name:"SHA-512"},saltLength:64};case"ES256":return{name:"ECDSA",hash:{name:"SHA-256"},namedCurve:"P-256"};case"ES384":return{name:"ECDSA",hash:{name:"SHA-384"},namedCurve:"P-384"};case"ES512":return{name:"ECDSA",hash:{name:"SHA-512"},namedCurve:"P-521"};case"EdDSA":return{name:"Ed25519",namedCurve:"Ed25519"};default:throw new Yr(e)}}function Lt(e){return Vr()==="node"&&crypto.webcrypto?e instanceof crypto.webcrypto.CryptoKey:e instanceof CryptoKey}var We=e=>Ht(Ce.encode(JSON.stringify(e)).buffer).replace(/=/g,""),ds=e=>Ht(e).replace(/=/g,""),Ye=e=>JSON.parse(is.decode(Nt(e)));function Mt(e){if(typeof e=="object"&&e!==null){const t=e;return"alg"in t&&Object.values(ve).includes(t.alg)&&(!("typ"in t)||t.typ==="JWT")}return!1}var us=async(e,t,r="HS256")=>{const s=We(e);let a;typeof t=="object"&&"alg"in t?(r=t.alg,a=We({alg:r,typ:"JWT",kid:t.kid})):a=We({alg:r,typ:"JWT"});const i=`${a}.${s}`,n=await ns(t,r,Ce.encode(i)),o=ds(n);return`${i}.${o}`},Ft=async(e,t,r)=>{if(!r)throw new lt;const{alg:s,iss:a,nbf:i=!0,exp:n=!0,iat:o=!0,aud:l}=typeof r=="string"?{alg:r}:r;if(!s)throw new lt;const d=e.split(".");if(d.length!==3)throw new Ie(e);const{header:u,payload:h}=Jt(e);if(!Mt(u))throw new qt(u);if(u.alg!==s)throw new Bt(s,u.alg);const m=Date.now()/1e3|0;if(i&&h.nbf&&h.nbf>m)throw new Gr(e);if(n&&h.exp&&h.exp<=m)throw new Xr(e);if(o&&h.iat&&m<h.iat)throw new Qr(m,h.iat);if(a){if(!h.iss)throw new Je(a,null);if(typeof a=="string"&&h.iss!==a)throw new Je(a,h.iss);if(a instanceof RegExp&&!a.test(h.iss))throw new Je(a,h.iss)}if(l){if(!h.aud)throw new ss(h);if(!(Array.isArray(h.aud)?h.aud:[h.aud]).some(x=>l instanceof RegExp?l.test(x):typeof l=="string"?x===l:Array.isArray(l)&&l.includes(x)))throw new as(l,h.aud)}const y=e.substring(0,e.lastIndexOf("."));if(!await os(t,s,Nt(d[2]),Ce.encode(y)))throw new rs(e);return h},hs=[ve.HS256,ve.HS384,ve.HS512],ps=async(e,t,r)=>{const s=t.verification||{},a=fs(e);if(!Mt(a))throw new qt(a);if(!a.kid)throw new Zr(a);if(hs.includes(a.alg))throw new es(a.alg);if(!t.allowedAlgorithms.includes(a.alg))throw new ts(a.alg,t.allowedAlgorithms);if(t.jwks_uri){const n=await fetch(t.jwks_uri,r);if(!n.ok)throw new Error(`failed to fetch JWKS from ${t.jwks_uri}`);const o=await n.json();if(!o.keys)throw new Error('invalid JWKS response. "keys" field is missing');if(!Array.isArray(o.keys))throw new Error('invalid JWKS response. "keys" field is not an array');t.keys?t.keys.push(...o.keys):t.keys=o.keys}else if(!t.keys)throw new Error('verifyWithJwks requires options for either "keys" or "jwks_uri" or both');const i=t.keys.find(n=>n.kid===a.kid);if(!i)throw new Ie(e);if(i.alg&&i.alg!==a.alg)throw new Bt(i.alg,a.alg);return await Ft(e,i,{alg:a.alg,...s})},Jt=e=>{try{const[t,r]=e.split("."),s=Ye(t),a=Ye(r);return{header:s,payload:a}}catch{throw new Ie(e)}},fs=e=>{try{const[t]=e.split(".");return Ye(t)}catch{throw new Ie(e)}},Xe={sign:us,verify:Ft,decode:Jt,verifyWithJwks:ps},ms=e=>{const t=e.verification||{};if(!e||!e.secret)throw new Error('JWT auth middleware requires options for "secret"');if(!e.alg)throw new Error('JWT auth middleware requires options for "alg"');if(!crypto.subtle||!crypto.subtle.importKey)throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");return async function(s,a){const i=e.headerName||"Authorization",n=s.req.raw.headers.get(i);let o;if(n){const u=n.split(/\s+/);if(u.length!==2){const h="invalid credentials structure";throw new $e(401,{message:h,res:Ue({ctx:s,error:"invalid_request",errDescription:h})})}else o=u[1]}else e.cookie&&(typeof e.cookie=="string"?o=Fe(s,e.cookie):e.cookie.secret?e.cookie.prefixOptions?o=await ot(s,e.cookie.secret,e.cookie.key,e.cookie.prefixOptions):o=await ot(s,e.cookie.secret,e.cookie.key):e.cookie.prefixOptions?o=Fe(s,e.cookie.key,e.cookie.prefixOptions):o=Fe(s,e.cookie.key));if(!o){const u="no authorization included in request";throw new $e(401,{message:u,res:Ue({ctx:s,error:"invalid_request",errDescription:u})})}let l,d;try{l=await Xe.verify(o,e.secret,{alg:e.alg,...t})}catch(u){d=u}if(!l)throw new $e(401,{message:"Unauthorized",res:Ue({ctx:s,error:"invalid_token",statusText:"Unauthorized",errDescription:"token verification failure"}),cause:d});s.set("jwtPayload",l),await a()}};function Ue(e){return new Response("Unauthorized",{status:401,statusText:e.statusText,headers:{"WWW-Authenticate":`Bearer realm="${e.ctx.req.url}",error="${e.error}",error_description="${e.errDescription}"`}})}var Wt=Xe.verify,gs=Xe.sign;const v=new kt;v.use("/api/*",Or());v.use("/static/*",Lr({root:"./public"}));const Qe=ms({secret:"croatia-cleveland-secret-key-2024",alg:"HS256"});v.get("/api/news",async e=>{const{results:t}=await e.env.DB.prepare(`
    SELECT * FROM news WHERE active = 1 ORDER BY priority DESC, created_at DESC LIMIT 10
  `).all();return e.json(t)});v.get("/api/teams",async e=>{const{results:t}=await e.env.DB.prepare(`
    SELECT * FROM teams WHERE active = 1 ORDER BY name
  `).all();return e.json(t)});v.get("/api/games",async e=>{const t=e.req.query("team_id");let r=`
    SELECT g.*, t.name as team_name 
    FROM games g 
    JOIN teams t ON g.team_id = t.id 
    WHERE g.game_date >= date('now')
  `;t&&(r+=` AND g.team_id = ${t}`),r+=" ORDER BY g.game_date ASC";const{results:s}=await e.env.DB.prepare(r).all();return e.json(s)});v.get("/api/games/results",async e=>{const{results:t}=await e.env.DB.prepare(`
    SELECT g.*, t.name as team_name 
    FROM games g 
    JOIN teams t ON g.team_id = t.id 
    WHERE g.status = 'completed' 
    ORDER BY g.game_date DESC 
    LIMIT 20
  `).all();return e.json(t)});v.get("/api/events",async e=>{const{results:t}=await e.env.DB.prepare(`
    SELECT * FROM events 
    WHERE active = 1 AND event_date >= date('now')
    ORDER BY event_date ASC
  `).all();return e.json(t)});v.get("/api/products",async e=>{const t=e.req.query("category");let r="SELECT * FROM products WHERE active = 1";t&&(r+=` AND category = '${t}'`),r+=" ORDER BY name";const{results:s}=await e.env.DB.prepare(r).all();return e.json(s)});v.get("/api/croatia-park",async e=>{const{results:t}=await e.env.DB.prepare(`
    SELECT * FROM croatia_park_updates ORDER BY created_at DESC
  `).all();return e.json(t)});v.post("/api/volunteers",async e=>{const{name:t,email:r,phone:s,availability:a,skills:i}=await e.req.json(),n=await e.env.DB.prepare(`
    INSERT INTO volunteers (name, email, phone, availability, skills)
    VALUES (?, ?, ?, ?, ?)
  `).bind(t,r,s,a,i).run();return e.json({success:!0,id:n.meta.last_row_id})});v.post("/api/donate",async e=>{const{donor_name:t,donor_email:r,amount:s,message:a}=await e.req.json(),i="test_"+Date.now(),n=await e.env.DB.prepare(`
    INSERT INTO donations (donor_name, donor_email, amount, message, stripe_payment_id)
    VALUES (?, ?, ?, ?, ?)
  `).bind(t,r,s,a,i).run();return e.json({success:!0,id:n.meta.last_row_id})});v.get("/api/media",async e=>{const t=e.req.query("category"),r=e.req.query("type");let s="SELECT * FROM media WHERE 1=1";t&&(s+=` AND category = '${t}'`),r&&(s+=` AND media_type = '${r}'`),s+=" ORDER BY created_at DESC";const{results:a}=await e.env.DB.prepare(s).all();return e.json(a)});v.get("/api/forum/categories",async e=>{const t=e.req.query("type");let r="SELECT * FROM forum_categories WHERE active = 1";t&&(r+=` AND category_type = '${t}'`),r+=" ORDER BY sort_order, name";const{results:s}=await e.env.DB.prepare(r).all();return e.json(s)});v.get("/api/forum/categories/:categoryId/topics",async e=>{const t=e.req.param("categoryId"),{results:r}=await e.env.DB.prepare(`
    SELECT 
      t.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email
    FROM forum_topics t
    JOIN users u ON t.user_id = u.id
    WHERE t.category_id = ?
    ORDER BY t.pinned DESC, t.last_reply_at DESC, t.created_at DESC
  `).bind(t).all();return e.json(r)});v.get("/api/forum/topics/:topicId",async e=>{const t=e.req.param("topicId"),r=await e.env.DB.prepare(`
    SELECT 
      t.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email,
      fc.name as category_name,
      fc.category_type
    FROM forum_topics t
    JOIN users u ON t.user_id = u.id
    JOIN forum_categories fc ON t.category_id = fc.id
    WHERE t.id = ?
  `).bind(t).first();if(!r)return e.json({error:"Topic not found"},404);await e.env.DB.prepare(`
    UPDATE forum_topics SET views = views + 1 WHERE id = ?
  `).bind(t).run();const{results:s}=await e.env.DB.prepare(`
    SELECT 
      p.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email
    FROM forum_posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.topic_id = ?
    ORDER BY p.created_at ASC
  `).bind(t).all();return e.json({topic:r,posts:s})});v.post("/api/forum/topics",async e=>{try{const t=e.req.header("Authorization");if(!t)return e.json({error:"Authentication required"},401);const r=t.replace("Bearer ",""),s=await Wt(r,"croatia-cleveland-secret-key-2024","HS256"),{category_id:a,title:i,content:n}=await e.req.json(),o=await e.env.DB.prepare(`
      SELECT category_type FROM forum_categories WHERE id = ? AND active = 1
    `).bind(a).first();if(!o)return e.json({error:"Invalid category"},400);if(o.category_type==="members"){const d=await e.env.DB.prepare(`
        SELECT membership_status FROM users WHERE id = ?
      `).bind(s.userId).first();if(!d||d.membership_status!=="active")return e.json({error:"Active membership required"},403)}const l=await e.env.DB.prepare(`
      INSERT INTO forum_topics (category_id, user_id, title, content, last_reply_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(a,s.userId,i,n).run();return e.json({success:!0,topicId:l.meta.last_row_id})}catch{return e.json({error:"Invalid token"},401)}});v.post("/api/forum/topics/:topicId/replies",async e=>{try{const t=e.req.header("Authorization");if(!t)return e.json({error:"Authentication required"},401);const r=t.replace("Bearer ",""),s=await Wt(r,"croatia-cleveland-secret-key-2024","HS256"),a=e.req.param("topicId"),{content:i}=await e.req.json(),n=await e.env.DB.prepare(`
      SELECT t.locked, fc.category_type 
      FROM forum_topics t
      JOIN forum_categories fc ON t.category_id = fc.id
      WHERE t.id = ?
    `).bind(a).first();if(!n)return e.json({error:"Topic not found"},404);if(n.locked)return e.json({error:"Topic is locked"},403);if(n.category_type==="members"){const l=await e.env.DB.prepare(`
        SELECT membership_status FROM users WHERE id = ?
      `).bind(s.userId).first();if(!l||l.membership_status!=="active")return e.json({error:"Active membership required"},403)}const o=await e.env.DB.prepare(`
      INSERT INTO forum_posts (topic_id, user_id, content)
      VALUES (?, ?, ?)
    `).bind(a,s.userId,i).run();return await e.env.DB.prepare(`
      UPDATE forum_topics 
      SET reply_count = reply_count + 1, 
          last_reply_at = datetime('now'),
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(a).run(),e.json({success:!0,postId:o.meta.last_row_id})}catch{return e.json({error:"Invalid token"},401)}});v.post("/api/auth/login",async e=>{const{email:t,password:r}=await e.req.json(),s=await e.env.DB.prepare(`
    SELECT id, email, first_name, last_name, role, membership_status
    FROM users WHERE email = ?
  `).bind(t).first();if(!s)return e.json({error:"Invalid credentials"},401);const a=await gs({userId:s.id,email:s.email,role:s.role},"croatia-cleveland-secret-key-2024","HS256");return e.json({token:a,user:{id:s.id,email:s.email,firstName:s.first_name,lastName:s.last_name,role:s.role,membershipStatus:s.membership_status}})});v.use("/api/members/*",Qe);v.get("/api/members/profile",async e=>{const t=e.get("jwtPayload"),r=await e.env.DB.prepare(`
    SELECT id, email, first_name, last_name, phone, role, membership_status, membership_expiry
    FROM users WHERE id = ?
  `).bind(t.userId).first();return e.json(r)});v.get("/api/members/memberships",async e=>{const t=e.get("jwtPayload"),{results:r}=await e.env.DB.prepare(`
    SELECT * FROM memberships WHERE user_id = ? ORDER BY created_at DESC
  `).bind(t.userId).all();return e.json(r)});v.use("/api/board/*",Qe);v.get("/api/board/minutes",async e=>{const t=e.get("jwtPayload");if(t.role!=="board"&&t.role!=="admin")return e.json({error:"Access denied"},403);const{results:r}=await e.env.DB.prepare(`
    SELECT * FROM meeting_minutes ORDER BY meeting_date DESC
  `).all();return e.json(r)});v.use("/api/admin/*",Qe);const vs=async(e,t)=>{if(e.get("jwtPayload").role!=="admin")return e.json({error:"Admin access required"},403);await t()};v.use("/api/admin/*",vs);v.post("/api/admin/news",async e=>{const{title:t,content:r,category:s,priority:a}=await e.req.json(),i=await e.env.DB.prepare(`
    INSERT INTO news (title, content, category, priority, active)
    VALUES (?, ?, ?, ?, 1)
  `).bind(t,r,s,a||0).run();return e.json({success:!0,id:i.meta.last_row_id})});v.post("/api/admin/games",async e=>{const{team_id:t,opponent:r,game_date:s,location:a,home_away:i}=await e.req.json(),n=await e.env.DB.prepare(`
    INSERT INTO games (team_id, opponent, game_date, location, home_away, status)
    VALUES (?, ?, ?, ?, ?, 'scheduled')
  `).bind(t,r,s,a,i).run();return e.json({success:!0,id:n.meta.last_row_id})});v.put("/api/admin/games/:id/score",async e=>{const t=e.req.param("id"),{score_home:r,score_away:s}=await e.req.json();return await e.env.DB.prepare(`
    UPDATE games SET score_home = ?, score_away = ?, status = 'completed'
    WHERE id = ?
  `).bind(r,s,t).run(),e.json({success:!0})});v.post("/api/admin/events",async e=>{const{title:t,description:r,event_date:s,location:a,ticket_price:i,max_tickets:n}=await e.req.json(),o=await e.env.DB.prepare(`
    INSERT INTO events (title, description, event_date, location, ticket_price, max_tickets)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(t,r,s,a,i,n).run();return e.json({success:!0,id:o.meta.last_row_id})});v.post("/api/admin/products",async e=>{const{name:t,description:r,price:s,category:a,stock_quantity:i}=await e.req.json(),n=await e.env.DB.prepare(`
    INSERT INTO products (name, description, price, category, stock_quantity)
    VALUES (?, ?, ?, ?, ?)
  `).bind(t,r,s,a,i).run();return e.json({success:!0,id:n.meta.last_row_id})});v.post("/api/admin/croatia-park",async e=>{const{title:t,content:r,progress_percentage:s}=await e.req.json(),a=await e.env.DB.prepare(`
    INSERT INTO croatia_park_updates (title, content, progress_percentage)
    VALUES (?, ?, ?)
  `).bind(t,r,s).run();return e.json({success:!0,id:a.meta.last_row_id})});v.post("/api/admin/minutes",async e=>{const{meeting_date:t,title:r,content:s}=await e.req.json(),a=await e.env.DB.prepare(`
    INSERT INTO meeting_minutes (meeting_date, title, content)
    VALUES (?, ?, ?)
  `).bind(t,r,s).run();return e.json({success:!0,id:a.meta.last_row_id})});v.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Croatia Cleveland - American Croatian National Soccer Club</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img src="/static/logo.png" alt="Croatia Cleveland Logo" class="h-12 w-12" onerror="this.style.display='none'">
                        <div>
                            <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                            <p class="text-sm">American Croatian National Soccer Club</p>
                        </div>
                    </div>
                    <div class="hidden md:flex space-x-6">
                        <a href="/" class="hover:text-blue-200">Home</a>
                        <a href="/teams" class="hover:text-blue-200">Teams</a>
                        <a href="/schedule" class="hover:text-blue-200">Schedule</a>
                        <a href="/events" class="hover:text-blue-200">Events</a>
                        <a href="/shop" class="hover:text-blue-200">Shop</a>
                        <a href="/croatia-park" class="hover:text-blue-200">Croatia Park</a>
                        <a href="/forum" class="hover:text-blue-200">Forum</a>
                        <a href="/members" class="hover:text-blue-200">Members</a>
                        <a href="/board" class="hover:text-blue-200">Board</a>
                        <a href="/admin" class="hover:text-blue-200">Admin</a>
                    </div>
                    <button id="donateBtn" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold">
                        <i class="fas fa-heart mr-2"></i>Donate
                    </button>
                </div>
            </div>
        </nav>

        <!-- Scrolling News Banner -->
        <div class="bg-blue-800 text-white py-2 overflow-hidden">
            <div id="newsBanner" class="whitespace-nowrap animate-scroll">
                Loading news...
            </div>
        </div>

        <!-- Main Content -->
        <div id="mainContent" class="container mx-auto px-4 py-8">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg p-12 mb-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Welcome to Croatia Cleveland</h2>
                <p class="text-xl mb-6">Proudly representing Croatian heritage and excellence in soccer since 1956</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="window.location.href='/membership'" class="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                        Become a Member
                    </button>
                    <button onclick="window.location.href='/schedule'" class="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800">
                        View Schedule
                    </button>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-users text-4xl text-red-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">500+</h3>
                    <p class="text-gray-600">Active Members</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-trophy text-4xl text-blue-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">15</h3>
                    <p class="text-gray-600">Championships</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-futbol text-4xl text-red-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">4</h3>
                    <p class="text-gray-600">Active Teams</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-calendar text-4xl text-blue-600 mb-2"></i>
                    <h3 class="text-2xl font-bold" id="nextGameDays">--</h3>
                    <p class="text-gray-600">Days to Next Game</p>
                </div>
            </div>

            <!-- Upcoming Games -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-calendar-alt text-red-600 mr-2"></i>
                    Upcoming Games
                </h3>
                <div id="upcomingGames">Loading...</div>
            </div>

            <!-- Recent Results -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-list text-blue-600 mr-2"></i>
                    Recent Results
                </h3>
                <div id="recentResults">Loading...</div>
            </div>

            <!-- Croatia Park Progress -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-hard-hat text-red-600 mr-2"></i>
                    Croatia Park Project
                </h3>
                <div id="croatiaParkProgress">Loading...</div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 class="text-lg font-bold mb-4">About Us</h4>
                        <p class="text-gray-400">American Croatian National Soccer Club "Croatia" Cleveland - Preserving Croatian heritage through soccer since 1956.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Location</h4>
                        <p class="text-gray-400">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            American Croatian Lodge<br>
                            LakeShore Blvd, Eastlake, OH
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Contact</h4>
                        <p class="text-gray-400">
                            <i class="fas fa-envelope mr-2"></i>
                            info@croatiacleveland.com<br>
                            <i class="fas fa-phone mr-2"></i>
                            (216) 555-0100
                        </p>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 Croatia Cleveland. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));v.get("/teams",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Our Teams - Croatia Cleveland</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    </div>
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8">
            <h2 class="text-4xl font-bold mb-8 text-center">Our Teams</h2>
            
            <div id="teamsContainer" class="space-y-6">
                <p class="text-center text-gray-600">Loading teams...</p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
            async function loadTeams() {
                try {
                    const response = await axios.get('/api/teams');
                    const teams = response.data;
                    
                    const container = document.getElementById('teamsContainer');
                    container.innerHTML = teams.map(team => \`
                        <div class="bg-white rounded-lg shadow-lg p-8">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-3xl font-bold text-red-700">\${team.name}</h3>
                                    <p class="text-gray-600 text-lg">\${team.division || 'Division TBA'}</p>
                                </div>
                                <i class="fas fa-futbol text-6xl text-blue-600"></i>
                            </div>
                            <p class="text-gray-700 mb-4">\${team.description || 'Team information coming soon.'}</p>
                            <button onclick="window.location.href='/schedule?team_id=\${team.id}'" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                <i class="fas fa-calendar mr-2"></i>View Schedule
                            </button>
                        </div>
                    \`).join('');
                } catch (error) {
                    console.error('Error loading teams:', error);
                    document.getElementById('teamsContainer').innerHTML = '<p class="text-red-600 text-center">Error loading teams</p>';
                }
            }
            
            loadTeams();
        <\/script>
    </body>
    </html>
  `));v.get("/croatia-park",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Croatia Park Project - Croatia Cleveland</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    </div>
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8">
            <div class="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg p-12 mb-8 text-center">
                <h2 class="text-4xl font-bold mb-4">
                    <i class="fas fa-hard-hat mr-3"></i>Croatia Park Project
                </h2>
                <p class="text-xl">New Soccer Field Facility - Eastlake, Ohio</p>
                <p class="mt-2">Behind Croatia Cleveland Stadium Field at American Croatian Lodge</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-8">
                    <h3 class="text-2xl font-bold mb-4">Project Updates</h3>
                    <div id="updatesContainer">
                        <p class="text-gray-600">Loading updates...</p>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-8">
                    <h3 class="text-2xl font-bold mb-4">
                        <i class="fas fa-hands-helping text-red-600 mr-2"></i>
                        Volunteer for Croatia Park
                    </h3>
                    <p class="text-gray-600 mb-6">Join our community in building the future of Croatia Cleveland soccer!</p>
                    
                    <form id="volunteerForm" class="space-y-4">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Name *</label>
                            <input type="text" id="volunteerName" required class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Email *</label>
                            <input type="email" id="volunteerEmail" required class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Phone</label>
                            <input type="tel" id="volunteerPhone" class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Availability</label>
                            <textarea id="volunteerAvailability" rows="3" placeholder="e.g., Weekends, Evenings" class="w-full border rounded-lg px-4 py-2"></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Skills</label>
                            <textarea id="volunteerSkills" rows="3" placeholder="e.g., Construction, Landscaping, Fundraising" class="w-full border rounded-lg px-4 py-2"></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                            <i class="fas fa-check mr-2"></i>Submit Volunteer Application
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script>
            // Load updates
            async function loadUpdates() {
                try {
                    const response = await axios.get('/api/croatia-park');
                    const updates = response.data;
                    
                    const container = document.getElementById('updatesContainer');
                    
                    if (updates.length === 0) {
                        container.innerHTML = '<p class="text-gray-500">No updates available.</p>';
                        return;
                    }
                    
                    container.innerHTML = updates.map(update => \`
                        <div class="border-b pb-4 mb-4 last:border-b-0">
                            <div class="mb-3">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-semibold text-gray-700">Progress</span>
                                    <span class="text-sm font-semibold text-blue-600">\${update.progress_percentage}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="bg-blue-600 h-3 rounded-full" style="width: \${update.progress_percentage}%"></div>
                                </div>
                            </div>
                            <h4 class="font-bold text-lg mb-2">\${update.title}</h4>
                            <p class="text-gray-600 mb-2">\${update.content}</p>
                            <p class="text-sm text-gray-500">\${new Date(update.created_at).toLocaleDateString()}</p>
                        </div>
                    \`).join('');
                } catch (error) {
                    console.error('Error loading updates:', error);
                    document.getElementById('updatesContainer').innerHTML = '<p class="text-red-600">Error loading updates</p>';
                }
            }
            
            // Handle volunteer form submission
            document.getElementById('volunteerForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const data = {
                    name: document.getElementById('volunteerName').value,
                    email: document.getElementById('volunteerEmail').value,
                    phone: document.getElementById('volunteerPhone').value,
                    availability: document.getElementById('volunteerAvailability').value,
                    skills: document.getElementById('volunteerSkills').value
                };
                
                try {
                    const response = await axios.post('/api/volunteers', data);
                    
                    if (response.data.success) {
                        alert('Thank you for volunteering! We will contact you soon.');
                        this.reset();
                    }
                } catch (error) {
                    console.error('Error submitting volunteer form:', error);
                    alert('Error submitting form. Please try again.');
                }
            });
            
            loadUpdates();
        <\/script>
    </body>
    </html>
  `));v.get("/forum",e=>e.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Public Forum - Croatia Cleveland</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-red-700 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    <span class="text-sm opacity-75">Public Forum</span>
                </div>
                <div class="flex space-x-4">
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                    <a href="/forum/members" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-lock mr-2"></i>Members Forum
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold mb-2">
                        <i class="fas fa-comments text-red-600 mr-2"></i>Public Forum
                    </h2>
                    <p class="text-gray-600">Connect with the Croatia Cleveland community</p>
                </div>
                <button id="newTopicBtn" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold">
                    <i class="fas fa-plus mr-2"></i>New Topic
                </button>
            </div>
        </div>
        <div id="forumCategories" class="space-y-4">
            <p class="text-center text-gray-600">Loading forum categories...</p>
        </div>
    </div>
    <div id="newTopicModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-2xl font-bold mb-4">Create New Topic</h3>
            <form id="newTopicForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Category *</label>
                    <select id="topicCategory" required class="w-full border rounded-lg px-4 py-2">
                        <option value="">Select a category...</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Topic Title *</label>
                    <input type="text" id="topicTitle" required maxlength="200" class="w-full border rounded-lg px-4 py-2" placeholder="Enter topic title">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Message *</label>
                    <textarea id="topicContent" required rows="8" class="w-full border rounded-lg px-4 py-2" placeholder="What's on your mind?"></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                        <i class="fas fa-paper-plane mr-2"></i>Post Topic
                    </button>
                    <button type="button" onclick="closeNewTopicModal()" class="px-6 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="/static/forum.js"><\/script>
</body>
</html>`));v.get("/forum/members",e=>e.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Members Forum - Croatia Cleveland</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-green-700 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    <span class="text-sm opacity-75"><i class="fas fa-lock mr-1"></i>Members Forum</span>
                </div>
                <div class="flex space-x-4">
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                    <a href="/forum" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-comments mr-2"></i>Public Forum
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <div id="accessCheck" class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-8 text-center">
            <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p class="text-gray-600">Verifying membership status...</p>
        </div>
    </div>
    <div id="forumContent" class="hidden container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold mb-2">
                        <i class="fas fa-lock text-green-600 mr-2"></i>Members Only Forum
                    </h2>
                    <p class="text-gray-600">Private discussions for active members in good standing</p>
                    <p class="text-sm text-green-600 mt-2">
                        <i class="fas fa-check-circle mr-1"></i>Your membership is active
                    </p>
                </div>
                <button id="newTopicBtn" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
                    <i class="fas fa-plus mr-2"></i>New Topic
                </button>
            </div>
        </div>
        <div id="forumCategories" class="space-y-4">
            <p class="text-center text-gray-600">Loading forum categories...</p>
        </div>
    </div>
    <div id="accessDenied" class="hidden container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-8 text-center">
            <i class="fas fa-lock text-6xl text-red-600 mb-4"></i>
            <h2 class="text-2xl font-bold mb-4">Members Only Area</h2>
            <p class="text-gray-600 mb-6">This forum is restricted to active members with paid membership in good standing.</p>
            <div class="max-w-md mx-auto space-y-4">
                <div class="text-left bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Not a member yet?</h3>
                    <p class="text-sm text-gray-700 mb-3">Join Croatia Cleveland FC!</p>
                    <button onclick="window.location.href='/membership'" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        <i class="fas fa-user-plus mr-2"></i>Become a Member
                    </button>
                </div>
                <div class="text-left bg-green-50 p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Already a member?</h3>
                    <p class="text-sm text-gray-700 mb-3">Please login to access the members forum.</p>
                    <button onclick="window.location.href='/login'" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        <i class="fas fa-sign-in-alt mr-2"></i>Login
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="newTopicModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-2xl font-bold mb-4">Create New Topic</h3>
            <form id="newTopicForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Category *</label>
                    <select id="topicCategory" required class="w-full border rounded-lg px-4 py-2">
                        <option value="">Select a category...</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Topic Title *</label>
                    <input type="text" id="topicTitle" required maxlength="200" class="w-full border rounded-lg px-4 py-2" placeholder="Enter topic title">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Message *</label>
                    <textarea id="topicContent" required rows="8" class="w-full border rounded-lg px-4 py-2" placeholder="What's on your mind?"></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
                        <i class="fas fa-paper-plane mr-2"></i>Post Topic
                    </button>
                    <button type="button" onclick="closeNewTopicModal()" class="px-6 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
    <script src="/static/forum-members.js"><\/script>
</body>
</html>`));const dt=new kt,bs=Object.assign({"/src/index.tsx":v});let Ut=!1;for(const[,e]of Object.entries(bs))e&&(dt.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),dt.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Ut=!0);if(!Ut)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{dt as default};
