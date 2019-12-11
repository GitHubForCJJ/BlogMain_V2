/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;!function(e,t){var n,i={},r=function(e,t){var n,i,r;if("string"==typeof e)return a(e);for(n=[],i=e.length,r=0;r<i;r++)n.push(a(e[r]));return t.apply(null,n)},o=function(e,t,n){2===arguments.length&&(n=t,t=null),r(t||[],function(){s(e,n,arguments)})},s=function(e,t,n){var o,s={exports:t};"function"==typeof t&&(n.length||(n=[r,s.exports,s]),o=t.apply(null,n),void 0!==o&&(s.exports=o)),i[e]=s.exports},a=function(t){var n=i[t]||e[t];if(!n)throw new Error("`"+t+"` is undefined");return n},u=function(e){var t,n,r,o,s,a;a=function(e){return e&&e.charAt(0).toUpperCase()+e.substr(1)};for(t in i)if(n=e,i.hasOwnProperty(t)){for(r=t.split("/"),s=a(r.pop());o=a(r.shift());)n[o]=n[o]||{},n=n[o];n[s]=i[t]}},c=t(e,o,r);u(c),"object"==typeof module&&"object"==typeof module.exports?module.exports=c:"function"==typeof define&&define.amd?define([],c):(n=e.WebUploader,e.WebUploader=c,e.WebUploader.noConflict=function(){e.WebUploader=n})}(this,function(e,t,n){return t("dollar-third",[],function(){return e.jQuery||e.Zepto}),t("dollar",["dollar-third"],function(e){return e}),t("promise-third",["dollar"],function(e){return{Deferred:e.Deferred,when:e.when,isPromise:function(e){return e&&"function"==typeof e.then}}}),t("promise",["promise-third"],function(e){return e}),t("base",["dollar","promise"],function(t,n){function i(e){return function(){return a.apply(e,arguments)}}function r(e,t){return function(){return e.apply(t,arguments)}}function o(e){var t;return Object.create?Object.create(e):(t=function(){},t.prototype=e,new t)}var s=function(){},a=Function.call;return{version:"0.1.2",$:t,Deferred:n.Deferred,isPromise:n.isPromise,when:n.when,browser:function(e){var t={},n=e.match(/WebKit\/([\d.]+)/),i=e.match(/Chrome\/([\d.]+)/)||e.match(/CriOS\/([\d.]+)/),r=e.match(/MSIE\s([\d\.]+)/)||e.match(/(?:trident)(?:.*rv:([\w.]+))?/i),o=e.match(/Firefox\/([\d.]+)/),s=e.match(/Safari\/([\d.]+)/),a=e.match(/OPR\/([\d.]+)/);return n&&(t.webkit=parseFloat(n[1])),i&&(t.chrome=parseFloat(i[1])),r&&(t.ie=parseFloat(r[1])),o&&(t.firefox=parseFloat(o[1])),s&&(t.safari=parseFloat(s[1])),a&&(t.opera=parseFloat(a[1])),t}(navigator.userAgent),os:function(e){var t={},n=e.match(/(?:Android);?[\s\/]+([\d.]+)?/),i=e.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);return n&&(t.android=parseFloat(n[1])),i&&(t.ios=parseFloat(i[1].replace(/_/g,"."))),t}(navigator.userAgent),inherits:function(e,n,i){var r;return"function"==typeof n?(r=n,n=null):r=n&&n.hasOwnProperty("constructor")?n.constructor:function(){return e.apply(this,arguments)},t.extend(!0,r,e,i||{}),r.__super__=e.prototype,r.prototype=o(e.prototype),n&&t.extend(!0,r.prototype,n),r},noop:s,bindFn:r,log:function(){return e.console?r(console.log,console):s}(),nextTick:function(){return function(e){setTimeout(e,1)}}(),slice:i([].slice),guid:function(){var e=0;return function(t){for(var n=(+new Date).toString(32),i=0;i<5;i++)n+=Math.floor(65535*Math.random()).toString(32);return(t||"wu_")+n+(e++).toString(32)}}(),formatSize:function(e,t,n){var i;for(n=n||["B","K","M","G","TB"];(i=n.shift())&&e>1024;)e/=1024;return("B"===i?e:e.toFixed(t||2))+i}}}),t("mediator",["base"],function(e){function t(e,t,n,i){return o.grep(e,function(e){return e&&(!t||e.e===t)&&(!n||e.cb===n||e.cb._cb===n)&&(!i||e.ctx===i)})}function n(e,t,n){o.each((e||"").split(a),function(e,i){n(i,t)})}function i(e,t){for(var n,i=!1,r=-1,o=e.length;++r<o;)if(n=e[r],n.cb.apply(n.ctx2,t)===!1){i=!0;break}return!i}var r,o=e.$,s=[].slice,a=/\s+/;return r={on:function(e,t,i){var r,o=this;return t?(r=this._events||(this._events=[]),n(e,t,function(e,t){var n={e:e};n.cb=t,n.ctx=i,n.ctx2=i||o,n.id=r.length,r.push(n)}),this):this},once:function(e,t,i){var r=this;return t?(n(e,t,function(e,t){var n=function(){return r.off(e,n),t.apply(i||r,arguments)};n._cb=t,r.on(e,n,i)}),r):r},off:function(e,i,r){var s=this._events;return s?e||i||r?(n(e,i,function(e,n){o.each(t(s,e,n,r),function(){delete s[this.id]})}),this):(this._events=[],this):this},trigger:function(e){var n,r,o;return this._events&&e?(n=s.call(arguments,1),r=t(this._events,e),o=t(this._events,"all"),i(r,n)&&i(o,arguments)):this}},o.extend({installTo:function(e){return o.extend(e,r)}},r)}),t("uploader",["base","mediator"],function(e,t){function n(e){this.options=i.extend(!0,{},n.options,e),this._init(this.options)}var i=e.$;return n.options={},t.installTo(n.prototype),i.each({upload:"start-upload",stop:"stop-upload",getFile:"get-file",getFiles:"get-files",addFile:"add-file",addFiles:"add-file",sort:"sort-files",removeFile:"remove-file",skipFile:"skip-file",retry:"retry",isInProgress:"is-in-progress",makeThumb:"make-thumb",getDimension:"get-dimension",addButton:"add-btn",getRuntimeType:"get-runtime-type",refresh:"refresh",disable:"disable",enable:"enable",reset:"reset"},function(e,t){n.prototype[e]=function(){return this.request(t,arguments)}}),i.extend(n.prototype,{state:"pending",_init:function(e){var t=this;t.request("init",e,function(){t.state="ready",t.trigger("ready")})},option:function(e,t){var n=this.options;return arguments.length>1?void(i.isPlainObject(t)&&i.isPlainObject(n[e])?i.extend(n[e],t):n[e]=t):e?n[e]:n},getStats:function(){var e=this.request("get-stats");return{successNum:e.numOfSuccess,cancelNum:e.numOfCancel,invalidNum:e.numOfInvalid,uploadFailNum:e.numOfUploadFailed,queueNum:e.numOfQueue}},trigger:function(e){var n=[].slice.call(arguments,1),r=this.options,o="on"+e.substring(0,1).toUpperCase()+e.substring(1);return!(t.trigger.apply(this,arguments)===!1||i.isFunction(r[o])&&r[o].apply(this,n)===!1||i.isFunction(this[o])&&this[o].apply(this,n)===!1||t.trigger.apply(t,[this,e].concat(n))===!1)},request:e.noop}),e.create=n.create=function(e){return new n(e)},e.Uploader=n,n}),t("runtime/runtime",["base","mediator"],function(e,t){function n(t){this.options=i.extend({container:document.body},t),this.uid=e.guid("rt_")}var i=e.$,r={},o=function(e){for(var t in e)if(e.hasOwnProperty(t))return t;return null};return i.extend(n.prototype,{getContainer:function(){var e,t,n=this.options;return this._container?this._container:(e=i(n.container||document.body),t=i(document.createElement("div")),t.attr("id","rt_"+this.uid),t.css({position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),e.append(t),e.addClass("webuploader-container"),this._container=t,t)},init:e.noop,exec:e.noop,destroy:function(){this._container&&this._container.parentNode.removeChild(this.__container),this.off()}}),n.orders="html5,flash",n.addRuntime=function(e,t){r[e]=t},n.hasRuntime=function(e){return!!(e?r[e]:o(r))},n.create=function(e,t){var s,a;if(t=t||n.orders,i.each(t.split(/\s*,\s*/g),function(){if(r[this])return s=this,!1}),s=s||o(r),!s)throw new Error("Runtime Error");return a=new r[s](e)},t.installTo(n.prototype),n}),t("runtime/client",["base","mediator","runtime/runtime"],function(e,t,n){function i(t,i){var o,s=e.Deferred();this.uid=e.guid("client_"),this.runtimeReady=function(e){return s.done(e)},this.connectRuntime=function(t,a){if(o)throw new Error("already connected!");return s.done(a),"string"==typeof t&&r.get(t)&&(o=r.get(t)),o=o||r.get(null,i),o?(e.$.extend(o.options,t),o.__promise.then(s.resolve),o.__client++):(o=n.create(t,t.runtimeOrder),o.__promise=s.promise(),o.once("ready",s.resolve),o.init(),r.add(o),o.__client=1),i&&(o.__standalone=i),o},this.getRuntime=function(){return o},this.disconnectRuntime=function(){o&&(o.__client--,o.__client<=0&&(r.remove(o),delete o.__promise,o.destroy()),o=null)},this.exec=function(){if(o){var n=e.slice(arguments);return t&&n.unshift(t),o.exec.apply(this,n)}},this.getRuid=function(){return o&&o.uid},this.destroy=function(e){return function(){e&&e.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()}}(this.destroy)}var r;return r=function(){var e={};return{add:function(t){e[t.uid]=t},get:function(t,n){var i;if(t)return e[t];for(i in e)if(!n||!e[i].__standalone)return e[i];return null},remove:function(t){delete e[t.uid]}}}(),t.installTo(i.prototype),i}),t("lib/dnd",["base","mediator","runtime/client"],function(e,t,n){function i(e){e=this.options=r.extend({},i.options,e),e.container=r(e.container),e.container.length&&n.call(this,"DragAndDrop")}var r=e.$;return i.options={accept:null,disableGlobalDnd:!1},e.inherits(n,{constructor:i,init:function(){var e=this;e.connectRuntime(e.options,function(){e.exec("init"),e.trigger("ready")})},destroy:function(){this.disconnectRuntime()}}),t.installTo(i.prototype),i}),t("widgets/widget",["base","uploader"],function(e,t){function n(e){if(!e)return!1;var t=e.length,n=r.type(e);return!(1!==e.nodeType||!t)||("array"===n||"function"!==n&&"string"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e))}function i(e){this.owner=e,this.options=e.options}var r=e.$,o=t.prototype._init,s={},a=[];return r.extend(i.prototype,{init:e.noop,invoke:function(e,t){var n=this.responseMap;return n&&e in n&&n[e]in this&&r.isFunction(this[n[e]])?this[n[e]].apply(this,t):s},request:function(){return this.owner.request.apply(this.owner,arguments)}}),r.extend(t.prototype,{_init:function(){var e=this,t=e._widgets=[];return r.each(a,function(n,i){t.push(new i(e))}),o.apply(e,arguments)},request:function(t,i,r){var o,a,u,c,l=0,d=this._widgets,p=d.length,f=[],h=[];for(i=n(i)?i:[i];l<p;l++)o=d[l],a=o.invoke(t,i),a!==s&&(e.isPromise(a)?h.push(a):f.push(a));return r||h.length?(u=e.when.apply(e,h),c=u.pipe?"pipe":"then",u[c](function(){var t=e.Deferred(),n=arguments;return setTimeout(function(){t.resolve.apply(t,n)},1),t.promise()})[c](r||e.noop)):f[0]}}),t.register=i.register=function(t,n){var o,s={init:"init"};return 1===arguments.length?(n=t,n.responseMap=s):n.responseMap=r.extend(s,t),o=e.inherits(i,n),a.push(o),o},i}),t("widgets/filednd",["base","uploader","lib/dnd","widgets/widget"],function(e,t,n){var i=e.$;return t.options.dnd="",t.register({init:function(t){if(t.dnd&&"html5"===this.request("predict-runtime-type")){var r,o=this,s=e.Deferred(),a=i.extend({},{disableGlobalDnd:t.disableGlobalDnd,container:t.dnd,accept:t.accept});return r=new n(a),r.once("ready",s.resolve),r.on("drop",function(e){o.request("add-file",[e])}),r.on("accept",function(e){return o.owner.trigger("dndAccept",e)}),r.init(),s.promise()}}})}),t("lib/filepaste",["base","mediator","runtime/client"],function(e,t,n){function i(e){e=this.options=r.extend({},e),e.container=r(e.container||document.body),n.call(this,"FilePaste")}var r=e.$;return e.inherits(n,{constructor:i,init:function(){var e=this;e.connectRuntime(e.options,function(){e.exec("init"),e.trigger("ready")})},destroy:function(){this.exec("destroy"),this.disconnectRuntime(),this.off()}}),t.installTo(i.prototype),i}),t("widgets/filepaste",["base","uploader","lib/filepaste","widgets/widget"],function(e,t,n){var i=e.$;return t.register({init:function(t){if(t.paste&&"html5"===this.request("predict-runtime-type")){var r,o=this,s=e.Deferred(),a=i.extend({},{container:t.paste,accept:t.accept});return r=new n(a),r.once("ready",s.resolve),r.on("paste",function(e){o.owner.request("add-file",[e])}),r.init(),s.promise()}}})}),t("lib/blob",["base","runtime/client"],function(e,t){function n(e,n){var i=this;i.source=n,i.ruid=e,t.call(i,"Blob"),this.uid=n.uid||this.uid,this.type=n.type||"",this.size=n.size||0,e&&i.connectRuntime(e)}return e.inherits(t,{constructor:n,slice:function(e,t){return this.exec("slice",e,t)},getSource:function(){return this.source}}),n}),t("lib/file",["base","lib/blob"],function(e,t){function n(e,n){var o;t.apply(this,arguments),this.name=n.name||"untitled"+i++,o=r.exec(n.name)?RegExp.$1.toLowerCase():"",!o&&this.type&&(o=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(this.type)?RegExp.$1.toLowerCase():"",this.name+="."+o),!this.type&&~"jpg,jpeg,png,gif,bmp".indexOf(o)&&(this.type="image/"+("jpg"===o?"jpeg":o)),this.ext=o,this.lastModifiedDate=n.lastModifiedDate||(new Date).toLocaleString()}var i=1,r=/\.([^.]+)$/;return e.inherits(t,n)}),t("lib/filepicker",["base","runtime/client","lib/file"],function(t,n,i){function r(e){if(e=this.options=o.extend({},r.options,e),e.container=o(e.id),!e.container.length)throw new Error("按钮指定错误");e.innerHTML=e.innerHTML||e.label||e.container.html()||"",e.button=o(e.button||document.createElement("div")),e.button.html(e.innerHTML),e.container.html(e.button),n.call(this,"FilePicker",!0)}var o=t.$;return r.options={button:null,container:null,label:null,innerHTML:null,multiple:!0,accept:null,name:"file"},t.inherits(n,{constructor:r,init:function(){var t=this,n=t.options,r=n.button;r.addClass("webuploader-pick"),t.on("all",function(e){var s;switch(e){case"mouseenter":r.addClass("webuploader-pick-hover");break;case"mouseleave":r.removeClass("webuploader-pick-hover");break;case"change":s=t.exec("getFiles"),t.trigger("select",o.map(s,function(e){return e=new i(t.getRuid(),e),e._refer=n.container,e}),n.container)}}),t.connectRuntime(n,function(){t.refresh(),t.exec("init",n),t.trigger("ready")}),o(e).on("resize",function(){t.refresh()})},refresh:function(){var e=this.getRuntime().getContainer(),t=this.options.button,n=t.outerWidth?t.outerWidth():t.width(),i=t.outerHeight?t.outerHeight():t.height(),r=t.offset();n&&i&&e.css({bottom:"auto",right:"auto",width:n+"px",height:i+"px"}).offset(r)},enable:function(){var e=this.options.button;e.removeClass("webuploader-pick-disable"),this.refresh()},disable:function(){var e=this.options.button;this.getRuntime().getContainer().css({top:"-99999px"}),e.addClass("webuploader-pick-disable")},destroy:function(){this.runtime&&(this.exec("destroy"),this.disconnectRuntime())}}),r}),t("widgets/filepicker",["base","uploader","lib/filepicker","widgets/widget"],function(e,t,n){var i=e.$;return i.extend(t.options,{pick:null,accept:null}),t.register({"add-btn":"addButton",refresh:"refresh",disable:"disable",enable:"enable"},{init:function(e){return this.pickers=[],e.pick&&this.addButton(e.pick)},refresh:function(){i.each(this.pickers,function(){this.refresh()})},addButton:function(t){var r,o,s,a=this,u=a.options,c=u.accept;if(t)return s=e.Deferred(),i.isPlainObject(t)||(t={id:t}),r=i.extend({},t,{accept:i.isPlainObject(c)?[c]:c,swf:u.swf,runtimeOrder:u.runtimeOrder}),o=new n(r),o.once("ready",s.resolve),o.on("select",function(e){a.owner.request("add-file",[e])}),o.init(),this.pickers.push(o),s.promise()},disable:function(){i.each(this.pickers,function(){this.disable()})},enable:function(){i.each(this.pickers,function(){this.enable()})}})}),t("file",["base","mediator"],function(e,t){function n(){return o+s++}function i(e){this.name=e.name||"Untitled",this.size=e.size||0,this.type=e.type||"application",this.lastModifiedDate=e.lastModifiedDate||1*new Date,this.id=n(),this.ext=a.exec(this.name)?RegExp.$1:"",this.statusText="",u[this.id]=i.Status.INITED,this.source=e,this.loaded=0,this.on("error",function(e){this.setStatus(i.Status.ERROR,e)})}var r=e.$,o="WU_FILE_",s=0,a=/\.([^.]+)$/,u={};return r.extend(i.prototype,{setStatus:function(e,t){var n=u[this.id];"undefined"!=typeof t&&(this.statusText=t),e!==n&&(u[this.id]=e,this.trigger("statuschange",e,n))},getStatus:function(){return u[this.id]},getSource:function(){return this.source},destory:function(){delete u[this.id]}}),t.installTo(i.prototype),i.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},i}),t("queue",["base","mediator","file"],function(e,t,n){function i(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0},this._queue=[],this._map={}}var r=e.$,o=n.Status;return r.extend(i.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,n,i=this._queue.length;for(e=e||o.QUEUED,t=0;t<i;t++)if(n=this._queue[t],e===n.getStatus())return n;return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),n=[],i=0,o=this._queue.length;i<o;i++)e=this._queue[i],t.length&&!~r.inArray(e.getStatus(),t)||n.push(e);return n},_fileAdded:function(e){var t=this,n=this._map[e.id];n||(this._map[e.id]=e,e.on("statuschange",function(e,n){t._onFileStatusChange(e,n)})),e.setStatus(o.QUEUED)},_onFileStatusChange:function(e,t){var n=this.stats;switch(t){case o.PROGRESS:n.numOfProgress--;break;case o.QUEUED:n.numOfQueue--;break;case o.ERROR:n.numOfUploadFailed--;break;case o.INVALID:n.numOfInvalid--}switch(e){case o.QUEUED:n.numOfQueue++;break;case o.PROGRESS:n.numOfProgress++;break;case o.ERROR:n.numOfUploadFailed++;break;case o.COMPLETE:n.numOfSuccess++;break;case o.CANCELLED:n.numOfCancel++;break;case o.INVALID:n.numOfInvalid++}}}),t.installTo(i.prototype),i}),t("widgets/queue",["base","uploader","queue","file","lib/file","runtime/client","widgets/widget"],function(e,t,n,i,r,o){var s=e.$,a=/\.\w+$/,u=i.Status;return t.register({"sort-files":"sortFiles","add-file":"addFiles","get-file":"getFile","fetch-file":"fetchFile","get-stats":"getStats","get-files":"getFiles","remove-file":"removeFile",retry:"retry",reset:"reset","accept-file":"acceptFile"},{init:function(t){var i,r,a,u,c,l,d,p=this;if(s.isPlainObject(t.accept)&&(t.accept=[t.accept]),t.accept){for(c=[],a=0,r=t.accept.length;a<r;a++)u=t.accept[a].extensions,u&&c.push(u);c.length&&(l="\\."+c.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),p.accept=new RegExp(l,"i")}if(p.queue=new n,p.stats=p.queue.stats,"html5"===this.request("predict-runtime-type"))return i=e.Deferred(),d=new o("Placeholder"),d.connectRuntime({runtimeOrder:"html5"},function(){p._ruid=d.getRuid(),i.resolve()}),i.promise()},_wrapFile:function(e){if(!(e instanceof i)){if(!(e instanceof r)){if(!this._ruid)throw new Error("Can't add external files.");e=new r(this._ruid,e)}e=new i(e)}return e},acceptFile:function(e){var t=!e||e.size<6||this.accept&&a.exec(e.name)&&!this.accept.test(e.name);return!t},_addFile:function(e){var t=this;if(e=t._wrapFile(e),t.owner.trigger("beforeFileQueued",e))return t.acceptFile(e)?(t.queue.append(e),t.owner.trigger("fileQueued",e),e):void t.owner.trigger("error","Q_TYPE_DENIED",e)},getFile:function(e){return this.queue.getFile(e)},addFiles:function(e){var t=this;e.length||(e=[e]),e=s.map(e,function(e){return t._addFile(e)}),t.owner.trigger("filesQueued",e),t.options.auto&&t.request("start-upload")},getStats:function(){return this.stats},removeFile:function(e){var t=this;e=e.id?e:t.queue.getFile(e),e.setStatus(u.CANCELLED),t.owner.trigger("fileDequeued",e)},getFiles:function(){return this.queue.getFiles.apply(this.queue,arguments)},fetchFile:function(){return this.queue.fetch.apply(this.queue,arguments)},retry:function(e,t){var n,i,r,o=this;if(e)return e=e.id?e:o.queue.getFile(e),e.setStatus(u.QUEUED),void(t||o.request("start-upload"));for(n=o.queue.getFiles(u.ERROR),i=0,r=n.length;i<r;i++)e=n[i],e.setStatus(u.QUEUED);o.request("start-upload")},sortFiles:function(){return this.queue.sort.apply(this.queue,arguments)},reset:function(){this.queue=new n,this.stats=this.queue.stats}})}),t("widgets/runtime",["uploader","runtime/runtime","widgets/widget"],function(e,t){return e.support=function(){return t.hasRuntime.apply(t,arguments)},e.register({"predict-runtime-type":"predictRuntmeType"},{init:function(){if(!this.predictRuntmeType())throw Error("Runtime Error")},predictRuntmeType:function(){var e,n,i=this.options.runtimeOrder||t.orders,r=this.type;if(!r)for(i=i.split(/\s*,\s*/g),e=0,n=i.length;e<n;e++)if(t.hasRuntime(i[e])){this.type=r=i[e];break}return r}})}),t("lib/transport",["base","runtime/client","mediator"],function(e,t,n){function i(e){var n=this;e=n.options=r.extend(!0,{},i.options,e||{}),t.call(this,"Transport"),this._blob=null,this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),this.on("load error",function(){n.trigger("progress",1),clearTimeout(n._timer)})}var r=e.$;return i.options={server:"",method:"POST",withCredentials:!1,fileVal:"file",timeout:12e4,formData:{},headers:{},sendAsBinary:!1},r.extend(i.prototype,{appendBlob:function(e,t,n){var i=this,r=i.options;i.getRuid()&&i.disconnectRuntime(),i.connectRuntime(t.ruid,function(){i.exec("init")}),i._blob=t,r.fileVal=e||r.fileVal,r.filename=n||r.filename},append:function(e,t){"object"==typeof e?r.extend(this._formData,e):this._formData[e]=t},setRequestHeader:function(e,t){"object"==typeof e?r.extend(this._headers,e):this._headers[e]=t},send:function(e){this.exec("send",e),this._timeout()},abort:function(){return clearTimeout(this._timer),this.exec("abort")},destroy:function(){this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()},getResponse:function(){return this.exec("getResponse")},getResponseAsJson:function(){return this.exec("getResponseAsJson")},getStatus:function(){return this.exec("getStatus")},_timeout:function(){var e=this,t=e.options.timeout;t&&(clearTimeout(e._timer),e._timer=setTimeout(function(){e.abort(),e.trigger("error","timeout")},t))}}),n.installTo(i.prototype),i}),t("widgets/upload",["base","uploader","file","lib/transport","widgets/widget"],function(e,t,n,i){function r(e,t){for(var n,i=[],r=e.source,o=r.size,s=t?Math.ceil(o/t):1,a=0,u=0;u<s;)n=Math.min(t,o-a),i.push({file:e,start:a,end:t?a+n:o,total:o,chunks:s,chunk:u++}),a+=n;return e.blocks=i.concat(),e.remaning=i.length,{file:e,has:function(){return!!i.length},fetch:function(){return i.shift()}}}var o=e.$,s=e.isPromise,a=n.Status;o.extend(t.options,{prepareNextFile:!1,chunked:!1,chunkSize:5242880,chunkRetry:2,threads:3,formData:null}),t.register({"start-upload":"start","stop-upload":"stop","skip-file":"skipFile","is-in-progress":"isInProgress"},{init:function(){var t=this.owner;this.runing=!1,this.pool=[],this.pending=[],this.remaning=0,this.__tick=e.bindFn(this._tick,this),t.on("uploadComplete",function(e){e.blocks&&o.each(e.blocks,function(e,t){t.transport&&(t.transport.abort(),t.transport.destroy()),delete t.transport}),delete e.blocks,delete e.remaning})},start:function(){var t=this;o.each(t.request("get-files",a.INVALID),function(){t.request("remove-file",this)}),t.runing||(t.runing=!0,o.each(t.pool,function(e,n){var i=n.file;i.getStatus()===a.INTERRUPT&&(i.setStatus(a.PROGRESS),t._trigged=!1,n.transport&&n.transport.send())}),t._trigged=!1,t.owner.trigger("startUpload"),e.nextTick(t.__tick))},stop:function(e){var t=this;t.runing!==!1&&(t.runing=!1,e&&o.each(t.pool,function(e,t){t.transport&&t.transport.abort(),t.file.setStatus(a.INTERRUPT)}),t.owner.trigger("stopUpload"))},isInProgress:function(){return!!this.runing},getStats:function(){return this.request("get-stats")},skipFile:function(e,t){e=this.request("get-file",e),e.setStatus(t||a.COMPLETE),e.skipped=!0,e.blocks&&o.each(e.blocks,function(e,t){var n=t.transport;n&&(n.abort(),n.destroy(),delete t.transport)}),this.owner.trigger("uploadSkip",e)},_tick:function(){var t,n,i=this,r=i.options;return i._promise?i._promise.always(i.__tick):void(i.pool.length<r.threads&&(n=i._nextBlock())?(i._trigged=!1,t=function(t){i._promise=null,t&&t.file&&i._startSend(t),e.nextTick(i.__tick)},i._promise=s(n)?n.always(t):t(n)):i.remaning||i.getStats().numOfQueue||(i.runing=!1,i._trigged||e.nextTick(function(){i.owner.trigger("uploadFinished")}),i._trigged=!0))},_nextBlock:function(){var e,t,n=this,i=n._act,o=n.options;return i&&i.has()&&i.file.getStatus()===a.PROGRESS?(o.prepareNextFile&&!n.pending.length&&n._prepareNextFile(),i.fetch()):n.runing?(!n.pending.length&&n.getStats().numOfQueue&&n._prepareNextFile(),e=n.pending.shift(),t=function(e){return e?(i=r(e,o.chunked?o.chunkSize:0),n._act=i,i.fetch()):null},s(e)?e[e.pipe?"pipe":"then"](t):t(e)):void 0},_prepareNextFile:function(){var e,t=this,n=t.request("fetch-file"),i=t.pending;n&&(e=t.request("before-send-file",n,function(){return n.getStatus()===a.QUEUED?(t.owner.trigger("uploadStart",n),n.setStatus(a.PROGRESS),n):t._finishFile(n)}),e.done(function(){var t=o.inArray(e,i);~t&&i.splice(t,1,n)}),e.fail(function(e){n.setStatus(a.ERROR,e),t.owner.trigger("uploadError",n,e),t.owner.trigger("uploadComplete",n)}),i.push(e))},_popBlock:function(e){var t=o.inArray(e,this.pool);this.pool.splice(t,1),e.file.remaning--,this.remaning--},_startSend:function(t){var n,i=this,r=t.file;i.pool.push(t),i.remaning++,t.blob=1===t.chunks?r.source:r.source.slice(t.start,t.end),n=i.request("before-send",t,function(){r.getStatus()===a.PROGRESS?i._doSend(t):(i._popBlock(t),e.nextTick(i.__tick))}),n.fail(function(){1===r.remaning?i._finishFile(r).always(function(){t.percentage=1,i._popBlock(t),i.owner.trigger("uploadComplete",r),e.nextTick(i.__tick)}):(t.percentage=1,i._popBlock(t),e.nextTick(i.__tick))})},_doSend:function(t){var n,r,s=this,u=s.owner,c=s.options,l=t.file,d=new i(c),p=o.extend({},c.formData),f=o.extend({},c.headers);t.transport=d,d.on("destroy",function(){delete t.transport,s._popBlock(t),e.nextTick(s.__tick)}),d.on("progress",function(e){var n=0,i=0;n=t.percentage=e,t.chunks>1&&(o.each(l.blocks,function(e,t){i+=(t.percentage||0)*(t.end-t.start)}),n=i/l.size),u.trigger("uploadProgress",l,n||0)}),n=function(e){var n;return r=d.getResponseAsJson()||{},r._raw=d.getResponse(),n=function(t){e=t},u.trigger("uploadAccept",t,r,n)||(e=e||"server"),e},d.on("error",function(e,i){t.retried=t.retried||0,t.chunks>1&&~"http,abort".indexOf(e)&&t.retried<c.chunkRetry?(t.retried++,d.send()):(i||"server"!==e||(e=n(e)),l.setStatus(a.ERROR,e),u.trigger("uploadError",l,e),u.trigger("uploadComplete",l))}),d.on("load",function(){var e;return(e=n())?void d.trigger("error",e,!0):void(1===l.remaning?s._finishFile(l,r):d.destroy())}),p=o.extend(p,{id:l.id,name:l.name,type:l.type,lastModifiedDate:l.lastModifiedDate,size:l.size}),t.chunks>1&&o.extend(p,{chunks:t.chunks,chunk:t.chunk}),u.trigger("uploadBeforeSend",t,p,f),d.appendBlob(c.fileVal,t.blob,l.name),d.append(p),d.setRequestHeader(f),d.send()},_finishFile:function(e,t,n){var i=this.owner;return i.request("after-send-file",arguments,function(){e.setStatus(a.COMPLETE),i.trigger("uploadSuccess",e,t,n)}).fail(function(t){e.getStatus()===a.PROGRESS&&e.setStatus(a.ERROR,t),i.trigger("uploadError",e,t)}).always(function(){i.trigger("uploadComplete",e)})}})}),t("widgets/validator",["base","uploader","file","widgets/widget"],function(e,t,n){var i,r=e.$,o={};return i={addValidator:function(e,t){o[e]=t},removeValidator:function(e){delete o[e]}},t.register({init:function(){var e=this;r.each(o,function(){this.call(e.owner)})}}),i.addValidator("fileNumLimit",function(){var e=this,t=e.options,n=0,i=t.fileNumLimit>>0,r=!0;i&&(e.on("beforeFileQueued",function(e){return n>=i&&r&&(r=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",i,e),setTimeout(function(){r=!0},1)),!(n>=i)}),e.on("fileQueued",function(){n++}),e.on("fileDequeued",function(){n--}),e.on("uploadFinished",function(){n=0}))}),i.addValidator("fileSizeLimit",function(){var e=this,t=e.options,n=0,i=t.fileSizeLimit>>0,r=!0;i&&(e.on("beforeFileQueued",function(e){var t=n+e.size>i;return t&&r&&(r=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",i,e),setTimeout(function(){r=!0},1)),!t}),e.on("fileQueued",function(e){n+=e.size}),e.on("fileDequeued",function(e){n-=e.size}),e.on("uploadFinished",function(){n=0}))}),i.addValidator("fileSingleSizeLimit",function(){var e=this,t=e.options,i=t.fileSingleSizeLimit;i&&e.on("beforeFileQueued",function(e){if(e.size>i)return e.setStatus(n.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",e),!1})}),i.addValidator("duplicate",function(){function e(e){for(var t,n=0,i=0,r=e.length;i<r;i++)t=e.charCodeAt(i),n=t+(n<<6)+(n<<16)-n;return n}var t=this,n=t.options,i={};n.duplicate||(t.on("beforeFileQueued",function(t){var n=t.__hash||(t.__hash=e(t.name+t.size+t.lastModifiedDate));if(i[n])return this.trigger("error","F_DUPLICATE",t),!1}),t.on("fileQueued",function(e){var t=e.__hash;t&&(i[t]=!0)}),t.on("fileDequeued",function(e){var t=e.__hash;t&&delete i[t]}))}),i}),t("runtime/compbase",[],function(){function e(e,t){this.owner=e,this.options=e.options,this.getRuntime=function(){return t},this.getRuid=function(){return t.uid},this.trigger=function(){return e.trigger.apply(e,arguments)}}return e}),t("runtime/html5/runtime",["base","runtime/runtime","runtime/compbase"],function(t,n,i){function r(){var e={},i=this,r=this.destory;n.apply(i,arguments),i.type=o,i.exec=function(n,r){var o,a=this,u=a.uid,c=t.slice(arguments,2);if(s[n]&&(o=e[u]=e[u]||new s[n](a,i),o[r]))return o[r].apply(o,c)},i.destory=function(){return r&&r.apply(this,arguments)}}var o="html5",s={};return t.inherits(n,{constructor:r,init:function(){var e=this;setTimeout(function(){e.trigger("ready")},1)}}),r.register=function(e,n){var r=s[e]=t.inherits(i,n);return r},e.Blob&&e.FileReader&&e.DataView&&n.addRuntime(o,r),r}),t("runtime/html5/blob",["runtime/html5/runtime","lib/blob"],function(e,t){return e.register("Blob",{slice:function(e,n){var i=this.owner.source,r=i.slice||i.webkitSlice||i.mozSlice;return i=r.call(i,e,n),new t(this.getRuid(),i)}})}),t("runtime/html5/dnd",["base","runtime/html5/runtime","lib/file"],function(e,t,n){var i=e.$,r="webuploader-dnd-";return t.register("DragAndDrop",{init:function(){var t=this.elem=this.options.container;this.dragEnterHandler=e.bindFn(this._dragEnterHandler,this),this.dragOverHandler=e.bindFn(this._dragOverHandler,this),this.dragLeaveHandler=e.bindFn(this._dragLeaveHandler,this),this.dropHandler=e.bindFn(this._dropHandler,this),this.dndOver=!1,t.on("dragenter",this.dragEnterHandler),t.on("dragover",this.dragOverHandler),t.on("dragleave",this.dragLeaveHandler),t.on("drop",this.dropHandler),this.options.disableGlobalDnd&&(i(document).on("dragover",this.dragOverHandler),i(document).on("drop",this.dropHandler))},_dragEnterHandler:function(e){var t,n=this,i=n._denied||!1;return e=e.originalEvent||e,n.dndOver||(n.dndOver=!0,t=e.dataTransfer.items,t&&t.length&&(n._denied=i=!n.trigger("accept",t)),n.elem.addClass(r+"over"),n.elem[i?"addClass":"removeClass"](r+"denied")),e.dataTransfer.dropEffect=i?"none":"copy",!1},_dragOverHandler:function(e){var t=this.elem.parent().get(0);return!(t&&!i.contains(t,e.currentTarget))&&(clearTimeout(this._leaveTimer),this._dragEnterHandler.call(this,e),!1)},_dragLeaveHandler:function(){var e,t=this;return e=function(){t.dndOver=!1,t.elem.removeClass(r+"over "+r+"denied")},clearTimeout(t._leaveTimer),t._leaveTimer=setTimeout(e,100),!1},_dropHandler:function(e){var t=this,o=t.getRuid(),s=t.elem.parent().get(0);return!(s&&!i.contains(s,e.currentTarget))&&(t._getTansferFiles(e,function(e){t.trigger("drop",i.map(e,function(e){return new n(o,e)}))}),t.dndOver=!1,t.elem.removeClass(r+"over"),!1)},_getTansferFiles:function(t,n){var i,r,o,s,a,u,c,l,d=[],p=[];for(t=t.originalEvent||t,o=t.dataTransfer,i=o.items,r=o.files,l=!(!i||!i[0].webkitGetAsEntry),u=0,c=r.length;u<c;u++)s=r[u],a=i&&i[u],l&&a.webkitGetAsEntry().isDirectory?p.push(this._traverseDirectoryTree(a.webkitGetAsEntry(),d)):d.push(s);e.when.apply(e,p).done(function(){d.length&&n(d)})},_traverseDirectoryTree:function(t,n){var i=e.Deferred(),r=this;return t.isFile?t.file(function(e){n.push(e),i.resolve()}):t.isDirectory&&t.createReader().readEntries(function(t){var o,s=t.length,a=[],u=[];for(o=0;o<s;o++)a.push(r._traverseDirectoryTree(t[o],u));e.when.apply(e,a).then(function(){n.push.apply(n,u),i.resolve()},i.reject)}),i.promise()},destroy:function(){var e=this.elem;e.off("dragenter",this.dragEnterHandler),e.off("dragover",this.dragEnterHandler),e.off("dragleave",this.dragLeaveHandler),e.off("drop",this.dropHandler),this.options.disableGlobalDnd&&(i(document).off("dragover",this.dragOverHandler),i(document).off("drop",this.dropHandler))}})}),t("runtime/html5/filepaste",["base","runtime/html5/runtime","lib/file"],function(e,t,n){return t.register("FilePaste",{init:function(){var t,n,i,r,o=this.options,s=this.elem=o.container,a=".*";if(o.accept){for(t=[],n=0,i=o.accept.length;n<i;n++)r=o.accept[n].mimeTypes,r&&t.push(r);t.length&&(a=t.join(","),a=a.replace(/,/g,"|").replace(/\*/g,".*"));
}this.accept=a=new RegExp(a,"i"),this.hander=e.bindFn(this._pasteHander,this),s.on("paste",this.hander)},_pasteHander:function(e){var t,i,r,o,s,a=[],u=this.getRuid();for(e=e.originalEvent||e,t=e.clipboardData.items,o=0,s=t.length;o<s;o++)i=t[o],"file"===i.kind&&(r=i.getAsFile())&&a.push(new n(u,r));a.length&&(e.preventDefault(),e.stopPropagation(),this.trigger("paste",a))},destroy:function(){this.elem.off("paste",this.hander)}})}),t("runtime/html5/filepicker",["base","runtime/html5/runtime"],function(e,t){var n=e.$;return t.register("FilePicker",{init:function(){var e,t,i,r,o=this.getRuntime().getContainer(),s=this,a=s.owner,u=s.options,c=n(document.createElement("label")),l=n(document.createElement("input"));if(l.attr("type","file"),l.attr("name",u.name),l.addClass("webuploader-element-invisible"),c.on("click",function(){l.trigger("click")}),c.css({opacity:0,width:"100%",height:"100%",display:"block",cursor:"pointer",background:"#ffffff"}),u.multiple&&l.attr("multiple","multiple"),u.accept&&u.accept.length>0){for(e=[],t=0,i=u.accept.length;t<i;t++)e.push(u.accept[t].mimeTypes);l.attr("accept",e.join(","))}o.append(l),o.append(c),r=function(e){a.trigger(e.type)},l.on("change",function(e){var t,i=arguments.callee;s.files=e.target.files,t=this.cloneNode(!0),this.parentNode.replaceChild(t,this),l.off(),l=n(t).on("change",i).on("mouseenter mouseleave",r),a.trigger("change")}),c.on("mouseenter mouseleave",r)},getFiles:function(){return this.files},destroy:function(){}})}),t("runtime/html5/transport",["base","runtime/html5/runtime"],function(e,t){var n=e.noop,i=e.$;return t.register("Transport",{init:function(){this._status=0,this._response=null},send:function(){var t,n,r,o=this.owner,s=this.options,a=this._initAjax(),u=o._blob,c=s.server;s.sendAsBinary?(c+=(/\?/.test(c)?"&":"?")+i.param(o._formData),n=u.getSource()):(t=new FormData,i.each(o._formData,function(e,n){t.append(e,n)}),t.append(s.fileVal,u.getSource(),s.filename||o._formData.name||"")),s.withCredentials&&"withCredentials"in a?(a.open(s.method,c,!0),a.withCredentials=!0):a.open(s.method,c),this._setRequestHeader(a,s.headers),n?(a.overrideMimeType("application/octet-stream"),e.os.android?(r=new FileReader,r.onload=function(){a.send(this.result),r=r.onload=null},r.readAsArrayBuffer(n)):a.send(n)):a.send(t)},getResponse:function(){return this._response},getResponseAsJson:function(){return this._parseJson(this._response)},getStatus:function(){return this._status},abort:function(){var e=this._xhr;e&&(e.upload.onprogress=n,e.onreadystatechange=n,e.abort(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,t=new XMLHttpRequest,i=this.options;return!i.withCredentials||"withCredentials"in t||"undefined"==typeof XDomainRequest||(t=new XDomainRequest),t.upload.onprogress=function(t){var n=0;return t.lengthComputable&&(n=t.loaded/t.total),e.trigger("progress",n)},t.onreadystatechange=function(){if(4===t.readyState)return t.upload.onprogress=n,t.onreadystatechange=n,e._xhr=null,e._status=t.status,t.status>=200&&t.status<300?(e._response=t.responseText,e.trigger("load")):t.status>=500&&t.status<600?(e._response=t.responseText,e.trigger("error","server")):e.trigger("error",e._status?"http":"abort")},e._xhr=t,t},_setRequestHeader:function(e,t){i.each(t,function(t,n){e.setRequestHeader(t,n)})},_parseJson:function(e){var t;try{t=JSON.parse(e)}catch(n){t={}}return t}})}),t("runtime/flash/runtime",["base","runtime/runtime","runtime/compbase"],function(t,n,i){function r(){var e;try{e=navigator.plugins["Shockwave Flash"],e=e.description}catch(t){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(n){e="0.0"}}return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1],10)}function o(){function i(e,t){var n,i,r=e.type||e;n=r.split("::"),i=n[0],r=n[1],"Ready"===r&&i===c.uid?c.trigger("ready"):o[i]&&o[i].trigger(r.toLowerCase(),e,t)}var r={},o={},s=this.destory,c=this,l=t.guid("webuploader_");n.apply(c,arguments),c.type=a,c.exec=function(e,n){var i,s=this,a=s.uid,l=t.slice(arguments,2);return o[a]=s,u[e]&&(r[a]||(r[a]=new u[e](s,c)),i=r[a],i[n])?i[n].apply(i,l):c.flashExec.apply(s,arguments)},e[l]=function(){var e=arguments;setTimeout(function(){i.apply(null,e)},1)},this.jsreciver=l,this.destory=function(){return s&&s.apply(this,arguments)},this.flashExec=function(e,n){var i=c.getFlash(),r=t.slice(arguments,2);return i.exec(this.uid,e,n,r)}}var s=t.$,a="flash",u={};return t.inherits(n,{constructor:o,init:function(){var e,n=this.getContainer(),i=this.options;n.css({position:"absolute",top:"-8px",left:"-8px",width:"9px",height:"9px",overflow:"hidden"}),e='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+i.swf+'" ',t.browser.ie&&(e+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),e+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+i.swf+'" /><param name="flashvars" value="uid='+this.uid+"&jsreciver="+this.jsreciver+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',n.html(e)},getFlash:function(){return this._flash?this._flash:(this._flash=s("#"+this.uid).get(0),this._flash)}}),o.register=function(e,n){return n=u[e]=t.inherits(i,s.extend({flashExec:function(){var e=this.owner,t=this.getRuntime();return t.flashExec.apply(e,arguments)}},n))},r()>=11.4&&n.addRuntime(a,o),o}),t("runtime/flash/filepicker",["base","runtime/flash/runtime"],function(e,t){var n=e.$;return t.register("FilePicker",{init:function(e){var t,i,r=n.extend({},e);for(t=r.accept&&r.accept.length,i=0;i<t;i++)r.accept[i].title||(r.accept[i].title="Files");delete r.button,delete r.container,this.flashExec("FilePicker","init",r)},destroy:function(){}})}),t("runtime/flash/transport",["base","runtime/flash/runtime","runtime/client"],function(e,t,n){var i=e.$;return t.register("Transport",{init:function(){this._status=0,this._response=null,this._responseJson=null},send:function(){var e,t=this.owner,n=this.options,r=this._initAjax(),o=t._blob,s=n.server;r.connectRuntime(o.ruid),n.sendAsBinary?(s+=(/\?/.test(s)?"&":"?")+i.param(t._formData),e=o.uid):(i.each(t._formData,function(e,t){r.exec("append",e,t)}),r.exec("appendBlob",n.fileVal,o.uid,n.filename||t._formData.name||"")),this._setRequestHeader(r,n.headers),r.exec("send",{method:n.method,url:s},e)},getStatus:function(){return this._status},getResponse:function(){return this._response},getResponseAsJson:function(){return this._responseJson},abort:function(){var e=this._xhr;e&&(e.exec("abort"),e.destroy(),this._xhr=e=null)},destroy:function(){this.abort()},_initAjax:function(){var e=this,t=new n("XMLHttpRequest");return t.on("uploadprogress progress",function(t){return e.trigger("progress",t.loaded/t.total)}),t.on("load",function(){var n=t.exec("getStatus"),i="";return t.off(),e._xhr=null,n>=200&&n<300?(e._response=t.exec("getResponse"),e._responseJson=t.exec("getResponseAsJson")):n>=500&&n<600?(e._response=t.exec("getResponse"),e._responseJson=t.exec("getResponseAsJson"),i="server"):i="http",t.destroy(),t=null,i?e.trigger("error",i):e.trigger("load")}),t.on("error",function(){t.off(),e._xhr=null,e.trigger("error","http")}),e._xhr=t,t},_setRequestHeader:function(e,t){i.each(t,function(t,n){e.exec("setRequestHeader",t,n)})}})}),t("preset/withoutimage",["base","widgets/filednd","widgets/filepaste","widgets/filepicker","widgets/queue","widgets/runtime","widgets/upload","widgets/validator","runtime/html5/blob","runtime/html5/dnd","runtime/html5/filepaste","runtime/html5/filepicker","runtime/html5/transport","runtime/flash/filepicker","runtime/flash/transport"],function(e){return e}),t("webuploader",["preset/withoutimage"],function(e){return e}),n("webuploader")});ent.prototype );
        return RuntimeClient;
    });
    /**
     * @fileOverview 错误信息
     */
    define('lib/dnd',[
        'base',
        'mediator',
        'runtime/client'
    ], function( Base, Mediator, RuntimeClent ) {
    
        var $ = Base.$;
    
        function DragAndDrop( opts ) {
            opts = this.options = $.extend({}, DragAndDrop.options, opts );
    
            opts.container = $( opts.container );
    
            if ( !opts.container.length ) {
                return;
            }
    
            RuntimeClent.call( this, 'DragAndDrop' );
        }
    
        DragAndDrop.options = {
            accept: null,
            disableGlobalDnd: false
        };
    
        Base.inherits( RuntimeClent, {
            constructor: DragAndDrop,
    
            init: function() {
                var me = this;
    
                me.connectRuntime( me.options, function() {
                    me.exec('init');
                    me.trigger('ready');
                });
            },
    
            destroy: function() {
                this.disconnectRuntime();
            }
        });
    
        Mediator.installTo( DragAndDrop.prototype );
    
        return DragAndDrop;
    });
    /**
     * @fileOverview 组件基类。
     */
    define('widgets/widget',[
        'base',
        'uploader'
    ], function( Base, Uploader ) {
    
        var $ = Base.$,
            _init = Uploader.prototype._init,
            IGNORE = {},
            widgetClass = [];
    
        function isArrayLike( obj ) {
            if ( !obj ) {
                return false;
            }
    
            var length = obj.length,
                type = $.type( obj );
    
            if ( obj.nodeType === 1 && length ) {
                return true;
            }
    
            return type === 'array' || type !== 'function' && type !== 'string' &&
                    (length === 0 || typeof length === 'number' && length > 0 &&
                    (length - 1) in obj);
        }
    
        function Widget( uploader ) {
            this.owner = uploader;
            this.options = uploader.options;
        }
    
        $.extend( Widget.prototype, {
    
            init: Base.noop,
    
            // 类Backbone的事件监听声明，监听uploader实例上的事件
            // widget直接无法监听事件，事件只能通过uploader来传递
            invoke: function( apiName, args ) {
    
                /*
                    {
                        'make-thumb': 'makeThumb'
                    }
                 */
                var map = this.responseMap;
    
                // 如果无API响应声明则忽略
                if ( !map || !(apiName in map) || !(map[ apiName ] in this) ||
                        !$.isFunction( this[ map[ apiName ] ] ) ) {
    
                    return IGNORE;
                }
    
                return this[ map[ apiName ] ].apply( this, args );
    
            },
    
            /**
             * 发送命令。当传入`callback`或者`handler`中返回`promise`时。返回一个当所有`handler`中的promise都完成后完成的新`promise`。
             * @method request
             * @grammar request( command, args ) => * | Promise
             * @grammar request( command, args, callback ) => Promise
             * @for  Uploader
             */
            request: function() {
                return this.owner.request.apply( this.owner, arguments );
            }
        });
    
        // 扩展Uploader.
        $.extend( Uploader.prototype, {
    
            // 覆写_init用来初始化widgets
            _init: function() {
                var me = this,
                    widgets = me._widgets = [];
    
                $.each( widgetClass, function( _, klass ) {
                    widgets.push( new klass( me ) );
                });
    
                return _init.apply( me, arguments );
            },
    
            request: function( apiName, args, callback ) {
                var i = 0,
                    widgets = this._widgets,
                    len = widgets.length,
                    rlts = [],
                    dfds = [],
                    widget, rlt, promise, key;
    
                args = isArrayLike( args ) ? args : [ args ];
    
                for ( ; i < len; i++ ) {
                    widget = widgets[ i ];
                    rlt = widget.invoke( apiName, args );
    
                    if ( rlt !== IGNORE ) {
    
                        // Deferred对象
                        if ( Base.isPromise( rlt ) ) {
                            dfds.push( rlt );
                        } else {
                            rlts.push( rlt );
                        }
                    }
                }
    
                // 如果有callback，则用异步方式。
                if ( callback || dfds.length ) {
                    promise = Base.when.apply( Base, dfds );
                    key = promise.pipe ? 'pipe' : 'then';
    
                    // 很重要不能删除。删除了会死循环。
                    // 保证执行顺序。让callback总是在下一个tick中执行。
                    return promise[ key ](function() {
                                var deferred = Base.Deferred(),
                                    args = arguments;
    
                                setTimeout(function() {
                                    deferred.resolve.apply( deferred, args );
                                }, 1 );
    
                                return deferred.promise();
                            })[ key ]( callback || Base.noop );
                } else {
                    return rlts[ 0 ];
                }
            }
        });
    
        /**
         * 添加组件
         * @param  {object} widgetProto 组件原型，构造函数通过constructor属性定义
         * @param  {object} responseMap API名称与函数实现的映射
         * @example
         *     Uploader.register( {
         *         init: function( options ) {},
         *         makeThumb: function() {}
         *     }, {
         *         'make-thumb': 'makeThumb'
         *     } );
         */
        Uploader.register = Widget.register = function( responseMap, widgetProto ) {
            var map = { init: 'init' },
                klass;
    
            if ( arguments.length === 1 ) {
                widgetProto = responseMap;
                widgetProto.responseMap = map;
            } else {
                widgetProto.responseMap = $.extend( map, responseMap );
            }
    
            klass = Base.inherits( Widget, widgetProto );
            widgetClass.push( klass );
    
            return klass;
        };
    
        return Widget;
    });
    /**
     * @fileOverview DragAndDrop Widget。
     */
    define('widgets/filednd',[
        'base',
        'uploader',
        'lib/dnd',
        'widgets/widget'
    ], function( Base, Uploader, Dnd ) {
        var $ = Base.$;
    
        Uploader.options.dnd = '';
    
        /**
         * @property {Selector} [dnd=undefined]  指定Drag And Drop拖拽的容器，如果不指定，则不启动。
         * @namespace options
         * @for Uploader
         */
    
        /**
         * @event dndAccept
         * @param {DataTransferItemList} items DataTransferItem
         * @description 阻止此事件可以拒绝某些类型的文件拖入进来。目前只有 chrome 提供这样的 API，且只能通过 mime-type 验证。
         * @for  Uploader
         */
        return Uploader.register({
            init: function( opts ) {
    
                if ( !opts.dnd ||
                        this.request('predict-runtime-type') !== 'html5' ) {
                    return;
                }
    
                var me = this,
                    deferred = Base.Deferred(),
                    options = $.extend({}, {
                        disableGlobalDnd: opts.disableGlobalDnd,
                        container: opts.dnd,
                        accept: opts.accept
                    }),
                    dnd;
    
                dnd = new Dnd( options );
    
                dnd.once( 'ready', deferred.resolve );
                dnd.on( 'drop', function( files ) {
                    me.request( 'add-file', [ files ]);
                });
    
                // 检测文件是否全部允许添加。
                dnd.on( 'accept', function( items ) {
                    return me.owner.trigger( 'dndAccept', items );
                });
    
                dnd.init();
    
                return deferred.promise();
            }
        });
    });
    
    /**
     * @fileOverview 错误信息
     */
    define('lib/filepaste',[
        'base',
        'mediator',
        'runtime/client'
    ], function( Base, Mediator, RuntimeClent ) {
    
        var $ = Base.$;
    
        function FilePaste( opts ) {
            opts = this.options = $.extend({}, opts );
            opts.container = $( opts.container || document.body );
            RuntimeClent.call( this, 'FilePaste' );
        }
    
        Base.inherits( RuntimeClent, {
            constructor: FilePaste,
    
            init: function() {
                var me = this;
    
                me.connectRuntime( me.options, function() {
                    me.exec('init');
                    me.trigger('ready');
                });
            },
    
            destroy: function() {
                this.exec('destroy');
                this.disconnectRuntime();
                this.off();
            }
        });
    
        Mediator.installTo( FilePaste.prototype );
    
        return FilePaste;
    });
    /**
     * @fileOverview 组件基类。
     */
    define('widgets/filepaste',[
        'base',
        'uploader',
        'lib/filepaste',
        'widgets/widget'
    ], function( Base, Uploader, FilePaste ) {
        var $ = Base.$;
    
        /**
         * @property {Selector} [paste=undefined]  指定监听paste事件的容器，如果不指定，不启用此功能。此功能为通过粘贴来添加截屏的图片。建议设置为`document.body`.
         * @namespace options
         * @for Uploader
         */
        return Uploader.register({
            init: function( opts ) {
    
                if ( !opts.paste ||
                        this.request('predict-runtime-type') !== 'html5' ) {
                    return;
                }
    
                var me = this,
                    deferred = Base.Deferred(),
                    options = $.extend({}, {
                        container: opts.paste,
                        accept: opts.accept
                    }),
                    paste;
    
                paste = new FilePaste( options );
    
                paste.once( 'ready', deferred.resolve );
                paste.on( 'paste', function( files ) {
                    me.owner.request( 'add-file', [ files ]);
                });
                paste.init();
    
                return deferred.promise();
            }
        });
    });
    /**
     * @fileOverview Blob
     */
    define('lib/blob',[
        'base',
        'runtime/client'
    ], function( Base, RuntimeClient ) {
    
        function Blob( ruid, source ) {
            var me = this;
    
            me.source = source;
            me.ruid = ruid;
    
            RuntimeClient.call( me, 'Blob' );
    
            this.uid = source.uid || this.uid;
            this.type = source.type || '';
            this.size = source.size || 0;
    
            if ( ruid ) {
                me.connectRuntime( ruid );
            }
        }
    
        Base.inherits( RuntimeClient, {
            constructor: Blob,
    
            slice: function( start, end ) {
                return this.exec( 'slice', start, end );
            },
    
            getSource: function() {
                return this.source;
            }
        });
    
        return Blob;
    });
    /**
     * 为了统一化Flash的File和HTML5的File而存在。
     * 以至于要调用Flash里面的File，也可以像调用HTML5版本的File一下。
     * @fileOverview File
     */
    define('lib/file',[
        'base',
        'lib/blob'
    ], function( Base, Blob ) {
    
        var uid = 1,
            rExt = /\.([^.]+)$/;
    
        function File( ruid, file ) {
            var ext;
    
            Blob.apply( this, arguments );
            this.name = file.name || ('untitled' + uid++);
            ext = rExt.exec( file.name ) ? RegExp.$1.toLowerCase() : '';
    
            // todo 支持其他类型文件的转换。
    
            // 如果有mimetype, 但是文件名里面没有找出后缀规律
            if ( !ext && this.type ) {
                ext = /\/(jpg|jpeg|png|gif|bmp)$/i.exec( this.type ) ?
                        RegExp.$1.toLowerCase() : '';
                this.name += '.' + ext;
            }
    
            // 如果没有指定mimetype, 但是知道文件后缀。
            if ( !this.type &&  ~'jpg,jpeg,png,gif,bmp'.indexOf( ext ) ) {
                this.type = 'image/' + (ext === 'jpg' ? 'jpeg' : ext);
            }
    
            this.ext = ext;
            this.lastModifiedDate = file.lastModifiedDate ||
                    (new Date()).toLocaleString();
        }
    
        return Base.inherits( Blob, File );
    });
    
    /**
     * @fileOverview 错误信息
     */
    define('lib/filepicker',[
        'base',
        'runtime/client',
        'lib/file'
    ], function( Base, RuntimeClent, File ) {
    
        var $ = Base.$;
    
        function FilePicker( opts ) {
            opts = this.options = $.extend({}, FilePicker.options, opts );
    
            opts.container = $( opts.id );
    
            if ( !opts.container.length ) {
                throw new Error('按钮指定错误');
            }
    
            opts.innerHTML = opts.innerHTML || opts.label ||
                    opts.container.html() || '';
    
            opts.button = $( opts.button || document.createElement('div') );
            opts.button.html( opts.innerHTML );
            opts.container.html( opts.button );
    
            RuntimeClent.call( this, 'FilePicker', true );
        }
    
        FilePicker.options = {
            button: null,
            container: null,
            label: null,
            innerHTML: null,
            multiple: true,
            accept: null,
            name: 'file'
        };
    
        Base.inherits( RuntimeClent, {
            constructor: FilePicker,
    
            init: function() {
                var me = this,
                    opts = me.options,
                    button = opts.button;
    
                button.addClass('webuploader-pick');
    
                me.on( 'all', function( type ) {
                    var files;
    
                    switch ( type ) {
                        case 'mouseenter':
                            button.addClass('webuploader-pick-hover');
                            break;
    
                        case 'mouseleave':
                            button.removeClass('webuploader-pick-hover');
                            break;
    
                        case 'change':
                            files = me.exec('getFiles');
                            me.trigger( 'select', $.map( files, function( file ) {
                                file = new File( me.getRuid(), file );
    
                                // 记录来源。
                                file._refer = opts.container;
                                return file;
                            }), opts.container );
                            break;
                    }
                });
    
                me.connectRuntime( opts, function() {
                    me.refresh();
                    me.exec( 'init', opts );
                    me.trigger('ready');
                });
    
                $( window ).on( 'resize', function() {
                    me.refresh();
                });
            },
    
            refresh: function() {
                var shimContainer = this.getRuntime().getContainer(),
                    button = this.options.button,
                    width = button.outerWidth ?
                            button.outerWidth() : button.width(),
    
                    height = button.outerHeight ?
                            button.outerHeight() : button.height(),
    
                    pos = button.offset();
    
                width && height && shimContainer.css({
                    bottom: 'auto',
                    right: 'auto',
                    width: width + 'px',
                    height: height + 'px'
                }).offset( pos );
            },
    
            enable: function() {
                var btn = this.options.button;
    
                btn.removeClass('webuploader-pick-disable');
                this.refresh();
            },
    
            disable: function() {
                var btn = this.options.button;
    
                this.getRuntime().getContainer().css({
                    top: '-99999px'
                });
    
                btn.addClass('webuploader-pick-disable');
            },
    
            destroy: function() {
                if ( this.runtime ) {
                    this.exec('destroy');
                    this.disconnectRuntime();
                }
            }
        });
    
        return FilePicker;
    });
    
    /**
     * @fileOverview 文件选择相关
     */
    define('widgets/filepicker',[
        'base',
        'uploader',
        'lib/filepicker',
        'widgets/widget'
    ], function( Base, Uploader, FilePicker ) {
        var $ = Base.$;
    
        $.extend( Uploader.options, {
    
            /**
             * @property {Selector | Object} [pick=undefined]
             * @namespace options
             * @for Uploader
             * @description 指定选择文件的按钮容器，不指定则不创建按钮。
             *
             * * `id` {Seletor} 指定选择文件的按钮容器，不指定则不创建按钮。
             * * `label` {String} 请采用 `innerHTML` 代替
             * * `innerHTML` {String} 指定按钮文字。不指定时优先从指定的容器中看是否自带文字。
             * * `multiple` {Boolean} 是否开起同时选择多个文件能力。
             */
            pick: null,
    
            /**
             * @property {Arroy} [accept=null]
             * @namespace options
             * @for Uploader
             * @description 指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
             *
             * * `title` {String} 文字描述
             * * `extensions` {String} 允许的文件后缀，不带点，多个用逗号分割。
             * * `mimeTypes` {String} 多个用逗号分割。
             *
             * 如：
             *
             * ```
             * {
             *     title: 'Images',
             *     extensions: 'gif,jpg,jpeg,bmp,png',
             *     mimeTypes: 'image/*'
             * }
             * ```
             */
            accept: null/*{
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }*/
        });
    
        return Uploader.register({
            'add-btn': 'addButton',
            refresh: 'refresh',
            disable: 'disable',
            enable: 'enable'
        }, {
    
            init: function( opts ) {
                this.pickers = [];
                return opts.pick && this.addButton( opts.pick );
            },
    
            refresh: function() {
                $.each( this.pickers, function() {
                    this.refresh();
                });
            },
    
            /**
             * @method addButton
             * @for Uploader
             * @grammar addButton( pick ) => Promise
             * @description
             * 添加文件选择按钮，如果一个按钮不够，需要调用此方法来添加。参数跟[options.pick](#WebUploader:Uploader:options)一致。
             * @example
             * uploader.addButton({
             *     id: '#btnContainer',
             *     innerHTML: '选择文件'
             * });
             */
            addButton: function( pick ) {
                var me = this,
                    opts = me.options,
                    accept = opts.accept,
                    options, picker, deferred;
    
                if ( !pick ) {
                    return;
                }
    
                deferred = Base.Deferred();
                $.isPlainObject( pick ) || (pick = {
                    id: pick
                });
    
                options = $.extend({}, pick, {
                    accept: $.isPlainObject( accept ) ? [ accept ] : accept,
                    swf: opts.swf,
                    runtimeOrder: opts.runtimeOrder
                });
    
                picker = new FilePicker( options );
    
                picker.once( 'ready', deferred.resolve );
                picker.on( 'select', function( files ) {
                    me.owner.request( 'add-file', [ files ]);
                });
                picker.init();
    
                this.pickers.push( picker );
    
                return deferred.promise();
            },
    
            disable: function() {
                $.each( this.pickers, function() {
                    this.disable();
                });
            },
    
            enable: function() {
                $.each( this.pickers, function() {
                    this.enable();
                });
            }
        });
    });
    /**
     * @fileOverview 文件属性封装
     */
    define('file',[
        'base',
        'mediator'
    ], function( Base, Mediator ) {
    
        var $ = Base.$,
            idPrefix = 'WU_FILE_',
            idSuffix = 0,
            rExt = /\.([^.]+)$/,
            statusMap = {};
    
        function gid() {
            return idPrefix + idSuffix++;
        }
    
        /**
         * 文件类
         * @class File
         * @constructor 构造函数
         * @grammar new File( source ) => File
         * @param {Lib.File} source [lib.File](#Lib.File)实例, 此source对象是带有Runtime信息的。
         */
        function WUFile( source ) {
    
            /**
             * 文件名，包括扩展名（后缀）
             * @property name
             * @type {string}
             */
            this.name = source.name || 'Untitled';
    
            /**
             * 文件体积（字节）
             * @property size
             * @type {uint}
             * @default 0
             */
            this.size = source.size || 0;
    
            /**
             * 文件MIMETYPE类型，与文件类型的对应关系请参考[http://t.cn/z8ZnFny](http://t.cn/z8ZnFny)
             * @property type
             * @type {string}
             * @default 'application'
             */
            this.type = source.type || 'application';
    
            /**
             * 文件最后修改日期
             * @property lastModifiedDate
             * @type {int}
             * @default 当前时间戳
             */
            this.lastModifiedDate = source.lastModifiedDate || (new Date() * 1);
    
            /**
             * 文件ID，每个对象具有唯一ID，与文件名无关
             * @property id
             * @type {string}
             */
            this.id = gid();
    
            /**
             * 文件扩展名，通过文件名获取，例如test.png的扩展名为png
             * @property ext
             * @type {string}
             */
            this.ext = rExt.exec( this.name ) ? RegExp.$1 : '';
    
    
            /**
             * 状态文字说明。在不同的status语境下有不同的用途。
             * @property statusText
             * @type {string}
             */
            this.statusText = '';
    
            // 存储文件状态，防止通过属性直接修改
            statusMap[ this.id ] = WUFile.Status.INITED;
    
            this.source = source;
            this.loaded = 0;
    
            this.on( 'error', function( msg ) {
                this.setStatus( WUFile.Status.ERROR, msg );
            });
        }
    
        $.extend( WUFile.prototype, {
    
            /**
             * 设置状态，状态变化时会触发`change`事件。
             * @method setStatus
             * @grammar setStatus( status[, statusText] );
             * @param {File.Status|String} status [文件状态值](#WebUploader:File:File.Status)
             * @param {String} [statusText=''] 状态说明，常在error时使用，用http, abort,server等来标记是由于什么原因导致文件错误。
             */
            setStatus: function( status, text ) {
    
                var prevStatus = statusMap[ this.id ];
    
                typeof text !== 'undefined' && (this.statusText = text);
    
                if ( status !== prevStatus ) {
                    statusMap[ this.id ] = status;
                    /**
                     * 文件状态变化
                     * @event statuschange
                     */
                    this.trigger( 'statuschange', status, prevStatus );
                }
    
            },
    
            /**
             * 获取文件状态
             * @return {File.Status}
             * @example
                     文件状态具体包括以下几种类型：
                     {
                         // 初始化
                        INITED:     0,
                        // 已入队列
                        QUEUED:     1,
                        // 正在上传
                        PROGRESS:     2,
                        // 上传出错
                        ERROR:         3,
                        // 上传成功
                        COMPLETE:     4,
                        // 上传取消
                        CANCELLED:     5
                    }
             */
            getStatus: function() {
                return statusMap[ this.id ];
            },
    
            /**
             * 获取文件原始信息。
             * @return {*}
             */
            getSource: function() {
                return this.source;
            },
    
            destory: function() {
                delete statusMap[ this.id ];
            }
        });
    
        Mediator.installTo( WUFile.prototype );
    
        /**
         * 文件状态值，具体包括以下几种类型：
         * * `inited` 初始状态
         * * `queued` 已经进入队列, 等待上传
         * * `progress` 上传中
         * * `complete` 上传完成。
         * * `error` 上传出错，可重试
         * * `interrupt` 上传中断，可续传。
         * * `invalid` 文件不合格，不能重试上传。会自动从队列中移除。
         * * `cancelled` 文件被移除。
         * @property {Object} Status
         * @namespace File
         * @class File
         * @static
         */
        WUFile.Status = {
            INITED:     'inited',    // 初始状态
            QUEUED:     'queued',    // 已经进入队列, 等待上传
            PROGRESS:   'progress',    // 上传中
            ERROR:      'error',    // 上传出错，可重试
            COMPLETE:   'complete',    // 上传完成。
            CANCELLED:  'cancelled',    // 上传取消。
            INTERRUPT:  'interrupt',    // 上传中断，可续传。
            INVALID:    'invalid'    // 文件不合格，不能重试上传。
        };
    
        return WUFile;
    });
    
    /**
     * @fileOverview 文件队列
     */
    define('queue',[
        'base',
        'mediator',
        'file'
    ], function( Base, Mediator, WUFile ) {
    
        var $ = Base.$,
            STATUS = WUFile.Status;
    
        /**
         * 文件队列, 用来存储各个状态中的文件。
         * @class Queue
         * @extends Mediator
         */
        function Queue() {
    
            /**
             * 统计文件数。
             * * `numOfQueue` 队列中的文件数。
             * * `numOfSuccess` 上传成功的文件数
             * * `numOfCancel` 被移除的文件数
             * * `numOfProgress` 正在上传中的文件数
             * * `numOfUploadFailed` 上传错误的文件数。
             * * `numOfInvalid` 无效的文件数。
             * @property {Object} stats
             */
            this.stats = {
                numOfQueue: 0,
                numOfSuccess: 0,
                numOfCancel: 0,
                numOfProgress: 0,
                numOfUploadFailed: 0,
                numOfInvalid: 0
            };
    
            // 上传队列，仅包括等待上传的文件
            this._queue = [];
    
            // 存储所有文件
            this._map = {};
        }
    
        $.extend( Queue.prototype, {
    
            /**
             * 将新文件加入对队列尾部
             *
             * @method append
             * @param  {File} file   文件对象
             */
            append: function( file ) {
                this._queue.push( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 将新文件加入对队列头部
             *
             * @method prepend
             * @param  {File} file   文件对象
             */
            prepend: function( file ) {
                this._queue.unshift( file );
                this._fileAdded( file );
                return this;
            },
    
            /**
             * 获取文件对象
             *
             * @method getFile
             * @param  {String} fileId   文件ID
             * @return {File}
             */
            getFile: function( fileId ) {
                if ( typeof fileId !== 'string' ) {
                    return fileId;
                }
                return this._map[ fileId ];
            },
    
            /**
             * 从队列中取出一个指定状态的文件。
             * @grammar fetch( status ) => File
             * @method fetch
             * @param {String} status [文件状态值](#WebUploader:File:File.Status)
             * @return {File} [File](#WebUploader:File)
             */
            fetch: function( status ) {
                var len = this._queue.length,
                    i, file;
    
                status = status || STATUS.QUEUED;
    
                for ( i = 0; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( status === file.getStatus() ) {
                        return file;
                    }
                }
    
                return null;
            },
    
            /**
             * 对队列进行排序，能够控制文件上传顺序。
             * @grammar sort( fn ) => undefined
             * @method sort
             * @param {Function} fn 排序方法
             */
            sort: function( fn ) {
                if ( typeof fn === 'function' ) {
                    this._queue.sort( fn );
                }
            },
    
            /**
             * 获取指定类型的文件列表, 列表中每一个成员为[File](#WebUploader:File)对象。
             * @grammar getFiles( [status1[, status2 ...]] ) => Array
             * @method getFiles
             * @param {String} [status] [文件状态值](#WebUploader:File:File.Status)
             */
            getFiles: function() {
                var sts = [].slice.call( arguments, 0 ),
                    ret = [],
                    i = 0,
                    len = this._queue.length,
                    file;
    
                for ( ; i < len; i++ ) {
                    file = this._queue[ i ];
    
                    if ( sts.length && !~$.inArray( file.getStatus(), sts ) ) {
                        continue;
                    }
    
                    ret.push( file );
                }
    
                return ret;
            },
    
            _fileAdded: function( file ) {
                var me = this,
                    existing = this._map[ file.id ];
    
                if ( !existing ) {
                    this._map[ file.id ] = file;
    
                    file.on( 'statuschange', function( cur, pre ) {
                        me._onFileStatusChange( cur, pre );
                    });
                }
    
                file.setStatus( STATUS.QUEUED );
            },
    
            _onFileStatusChange: function( curStatus, preStatus ) {
                var stats = this.stats;
    
                switch ( preStatus ) {
                    case STATUS.PROGRESS:
                        stats.numOfProgress--;
                        break;
    
                    case STATUS.QUEUED:
                        stats.numOfQueue --;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed--;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid--;
                        break;
                }
    
                switch ( curStatus ) {
                    case STATUS.QUEUED:
                        stats.numOfQueue++;
                        break;
    
                    case STATUS.PROGRESS:
                        stats.numOfProgress++;
                        break;
    
                    case STATUS.ERROR:
                        stats.numOfUploadFailed++;
                        break;
    
                    case STATUS.COMPLETE:
                        stats.numOfSuccess++;
                        break;
    
                    case STATUS.CANCELLED:
                        stats.numOfCancel++;
                        break;
    
                    case STATUS.INVALID:
                        stats.numOfInvalid++;
                        break;
                }
            }
    
        });
    
        Mediator.installTo( Queue.prototype );
    
        return Queue;
    });
    /**
     * @fileOverview 队列
     */
    define('widgets/queue',[
        'base',
        'uploader',
        'queue',
        'file',
        'lib/file',
        'runtime/client',
        'widgets/widget'
    ], function( Base, Uploader, Queue, WUFile, File, RuntimeClient ) {
    
        var $ = Base.$,
            rExt = /\.\w+$/,
            Status = WUFile.Status;
    
        return Uploader.register({
            'sort-files': 'sortFiles',
            'add-file': 'addFiles',
            'get-file': 'getFile',
            'fetch-file': 'fetchFile',
            'get-stats': 'getStats',
            'get-files': 'getFiles',
            'remove-file': 'removeFile',
            'retry': 'retry',
            'reset': 'reset',
            'accept-file': 'acceptFile'
        }, {
    
            init: function( opts ) {
                var me = this,
                    deferred, len, i, item, arr, accept, runtime;
    
                if ( $.isPlainObject( opts.accept ) ) {
                    opts.accept = [ opts.accept ];
                }
    
                // accept中的中生成匹配正则。
                if ( opts.accept ) {
                    arr = [];
    
                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                        item = opts.accept[ i ].extensions;
                        item && arr.push( item );
                    }
    
                    if ( arr.length ) {
                        accept = '\\.' + arr.join(',')
                                .replace( /,/g, '$|\\.' )
                                .replace( /\*/g, '.*' ) + '$';
                    }
    
                    me.accept = new RegExp( accept, 'i' );
                }
    
                me.queue = new Queue();
                me.stats = me.queue.stats;
    
                // 如果当前不是html5运行时，那就算了。
                // 不执行后续操作
                if ( this.request('predict-runtime-type') !== 'html5' ) {
                    return;
                }
    
                // 创建一个 html5 运行时的 placeholder
                // 以至于外部添加原生 File 对象的时候能正确包裹一下供 webuploader 使用。
                deferred = Base.Deferred();
                runtime = new RuntimeClient('Placeholder');
                runtime.connectRuntime({
                    runtimeOrder: 'html5'
                }, function() {
                    me._ruid = runtime.getRuid();
                    deferred.resolve();
                });
                return deferred.promise();
            },
    
    
            // 为了支持外部直接添加一个原生File对象。
            _wrapFile: function( file ) {
                if ( !(file instanceof WUFile) ) {
    
                    if ( !(file instanceof File) ) {
                        if ( !this._ruid ) {
                            throw new Error('Can\'t add external files.');
                        }
                        file = new File( this._ruid, file );
                    }
    
                    file = new WUFile( file );
                }
    
                return file;
            },
    
            // 判断文件是否可以被加入队列
            acceptFile: function( file ) {
                var invalid = !file || file.size < 6 || this.accept &&
    
                        // 如果名字中有后缀，才做后缀白名单处理。
                        rExt.exec( file.name ) && !this.accept.test( file.name );
    
                return !invalid;
            },
    
    
            /**
             * @event beforeFileQueued
             * @param {File} file File对象
             * @description 当文件被加入队列之前触发，此事件的handler返回值为`false`，则此文件不会被添加进入队列。
             * @for  Uploader
             */
    
            /**
             * @event fileQueued
             * @param {File} file File对象
             * @description 当文件被加入队列以后触发。
             * @for  Uploader
             */
    
            _addFile: function( file ) {
                var me = this;
    
                file = me._wrapFile( file );
    
                // 不过类型判断允许不允许，先派送 `beforeFileQueued`
                if ( !me.owner.trigger( 'beforeFileQueued', file ) ) {
                    return;
                }
    
                // 类型不匹配，则派送错误事件，并返回。
                if ( !me.acceptFile( file ) ) {
                    me.owner.trigger( 'error', 'Q_TYPE_DENIED', file );
                    return;
                }
    
                me.queue.append( file );
                me.owner.trigger( 'fileQueued', file );
                return file;
            },
    
            getFile: function( fileId ) {
                return this.queue.getFile( fileId );
            },
    
            /**
             * @event filesQueued
             * @param {File} files 数组，内容为原始File(lib/File）对象。
             * @description 当一批文件添加进队列以后触发。
             * @for  Uploader
             */
    
            /**
             * @method addFiles
             * @grammar addFiles( file ) => undefined
             * @grammar addFiles( [file1, file2 ...] ) => undefined
             * @param {Array of File or File} [files] Files 对象 数组
             * @description 添加文件到队列
             * @for  Uploader
             */
            addFiles: function( files ) {
                var me = this;
    
                if ( !files.length ) {
                    files = [ files ];
                }
    
                files = $.map( files, function( file ) {
                    return me._addFile( file );
                });
    
                me.owner.trigger( 'filesQueued', files );
    
                if ( me.options.auto ) {
                    me.request('start-upload');
                }
            },
    
            getStats: function() {
                return this.stats;
            },
    
            /**
             * @event fileDequeued
             * @param {File} file File对象
             * @description 当文件被移除队列后触发。
             * @for  Uploader
             */
    
            /**
             * @method removeFile
             * @grammar removeFile( file ) => undefined
             * @grammar removeFile( id ) => undefined
             * @param {File|id} file File对象或这File对象的id
             * @description 移除某一文件。
             * @for  Uploader
             * @example
             *
             * $li.on('click', '.remove-this', function() {
             *     uploader.removeFile( file );
             * })
             */
            removeFile: function( file ) {
                var me = this;
    
                file = file.id ? file : me.queue.getFile( file );
    
                file.setStatus( Status.CANCELLED );
                me.owner.trigger( 'fileDequeued', file );
            },
    
            /**
             * @method getFiles
             * @grammar getFiles() => Array
             * @grammar getFiles( status1, status2, status... ) => Array
             * @description 返回指定状态的文件集合，不传参数将返回所有状态的文件。
             * @for  Uploader
             * @example
             * console.log( uploader.getFiles() );    // => all files
             * console.log( uploader.getFiles('error') )    // => all error files.
             */
            getFiles: function() {
                return this.queue.getFiles.apply( this.queue, arguments );
            },
    
            fetchFile: function() {
                return this.queue.fetch.apply( this.queue, arguments );
            },
    
            /**
             * @method retry
             * @grammar retry() => undefined
             * @grammar retry( file ) => undefined
             * @description 重试上传，重试指定文件，或者从出错的文件开始重新上传。
             * @for  Uploader
             * @example
             * function retry() {
             *     uploader.retry();
             * }
             */
            retry: function( file, noForceStart ) {
                var me = this,
                    files, i, len;
    
                if ( file ) {
                    file = file.id ? file : me.queue.getFile( file );
                    file.setStatus( Status.QUEUED );
                    noForceStart || me.request('start-upload');
                    return;
                }
    
                files = me.queue.getFiles( Status.ERROR );
                i = 0;
                len = files.length;
    
                for ( ; i < len; i++ ) {
                    file = files[ i ];
                    file.setStatus( Status.QUEUED );
                }
    
                me.request('start-upload');
            },
    
            /**
             * @method sort
             * @grammar sort( fn ) => undefined
             * @description 排序队列中的文件，在上传之前调整可以控制上传顺序。
             * @for  Uploader
             */
            sortFiles: function() {
                return this.queue.sort.apply( this.queue, arguments );
            },
    
            /**
             * @method reset
             * @grammar reset() => undefined
             * @description 重置uploader。目前只重置了队列。
             * @for  Uploader
             * @example
             * uploader.reset();
             */
            reset: function() {
                this.queue = new Queue();
                this.stats = this.queue.stats;
            }
        });
    
    });
    /**
     * @fileOverview 添加获取Runtime相关信息的方法。
     */
    define('widgets/runtime',[
        'uploader',
        'runtime/runtime',
        'widgets/widget'
    ], function( Uploader, Runtime ) {
    
        Uploader.support = function() {
            return Runtime.hasRuntime.apply( Runtime, arguments );
        };
    
        return Uploader.register({
            'predict-runtime-type': 'predictRuntmeType'
        }, {
    
            init: function() {
                if ( !this.predictRuntmeType() ) {
                    throw Error('Runtime Error');
                }
            },
    
            /**
             * 预测Uploader将采用哪个`Runtime`
             * @grammar predictRuntmeType() => String
             * @method predictRuntmeType
             * @for  Uploader
             */
            predictRuntmeType: function() {
                var orders = this.options.runtimeOrder || Runtime.orders,
                    type = this.type,
                    i, len;
    
                if ( !type ) {
                    orders = orders.split( /\s*,\s*/g );
    
                    for ( i = 0, len = orders.length; i < len; i++ ) {
                        if ( Runtime.hasRuntime( orders[ i ] ) ) {
                            this.type = type = orders[ i ];
                            break;
                        }
                    }
                }
    
                return type;
            }
        });
    });
    /**
     * @fileOverview Transport
     */
    define('lib/transport',[
        'base',
        'runtime/client',
        'mediator'
    ], function( Base, RuntimeClient, Mediator ) {
    
        var $ = Base.$;
    
        function Transport( opts ) {
            var me = this;
    
            opts = me.options = $.extend( true, {}, Transport.options, opts || {} );
            RuntimeClient.call( this, 'Transport' );
    
            this._blob = null;
            this._formData = opts.formData || {};
            this._headers = opts.headers || {};
    
            this.on( 'progress', this._timeout );
            this.on( 'load error', function() {
                me.trigger( 'progress', 1 );
                clearTimeout( me._timer );
            });
        }
    
        Transport.options = {
            server: '',
            method: 'POST',
    
            // 跨域时，是否允许携带cookie, 只有html5 runtime才有效
            withCredentials: false,
            fileVal: 'file',
            timeout: 2 * 60 * 1000,    // 2分钟
            formData: {},
            headers: {},
            sendAsBinary: false
        };
    
        $.extend( Transport.prototype, {
    
            // 添加Blob, 只能添加一次，最后一次有效。
            appendBlob: function( key, blob, filename ) {
                var me = this,
                    opts = me.options;
    
                if ( me.getRuid() ) {
                    me.disconnectRuntime();
                }
    
                // 连接到blob归属的同一个runtime.
                me.connectRuntime( blob.ruid, function() {
                    me.exec('init');
                });
    
                me._blob = blob;
                opts.fileVal = key || opts.fileVal;
                opts.filename = filename || opts.filename;
            },
    
            // 添加其他字段
            append: function( key, value ) {
                if ( typeof key === 'object' ) {
                    $.extend( this._formData, key );
                } else {
                    this._formData[ key ] = value;
                }
            },
    
            setRequestHeader: function( key, value ) {
                if ( typeof key === 'object' ) {
                    $.extend( this._headers, key );
                } else {
                    this._headers[ key ] = value;
                }
            },
    
            send: function( method ) {
                this.exec( 'send', method );
                this._timeout();
            },
    
            abort: function() {
                clearTimeout( this._timer );
                return this.exec('abort');
            },
    
            destroy: function() {
                this.trigger('destroy');
                this.off();
                this.exec('destroy');
                this.disconnectRuntime();
            },
    
            getResponse: function() {
                return this.exec('getResponse');
            },
    
            getResponseAsJson: function() {
                return this.exec('getResponseAsJson');
            },
    
            getStatus: function() {
                return this.exec('getStatus');
            },
    
            _timeout: function() {
                var me = this,
                    duration = me.options.timeout;
    
                if ( !duration ) {
                    return;
                }
    
                clearTimeout( me._timer );
                me._timer = setTimeout(function() {
                    me.abort();
                    me.trigger( 'error', 'timeout' );
                }, duration );
            }
    
        });
    
        // 让Transport具备事件功能。
        Mediator.installTo( Transport.prototype );
    
        return Transport;
    });
    /**
     * @fileOverview 负责文件上传相关。
     */
    define('widgets/upload',[
        'base',
        'uploader',
        'file',
        'lib/transport',
        'widgets/widget'
    ], function( Base, Uploader, WUFile, Transport ) {
    
        var $ = Base.$,
            isPromise = Base.isPromise,
            Status = WUFile.Status;
    
        // 添加默认配置项
        $.extend( Uploader.options, {
    
    
            /**
             * @property {Boolean} [prepareNextFile=false]
             * @namespace options
             * @for Uploader
             * @description 是否允许在文件传输时提前把下一个文件准备好。
             * 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。
             * 如果能提前在当前文件传输期处理，可以节省总体耗时。
             */
            prepareNextFile: false,
    
            /**
             * @property {Boolean} [chunked=false]
             * @namespace options
             * @for Uploader
             * @description 是否要分片处理大文件上传。
             */
            chunked: false,
    
            /**
             * @property {Boolean} [chunkSize=5242880]
             * @namespace options
             * @for Uploader
             * @description 如果要分片，分多大一片？ 默认大小为5M.
             */
            chunkSize: 5 * 1024 * 1024,
    
            /**
             * @property {Boolean} [chunkRetry=2]
             * @namespace options
             * @for Uploader
             * @description 如果某个分片由于网络问题出错，允许自动重传多少次？
             */
            chunkRetry: 2,
    
            /**
             * @property {Boolean} [threads=3]
             * @namespace options
             * @for Uploader
             * @description 上传并发数。允许同时最大上传进程数。
             */
            threads: 3,
    
    
            /**
             * @property {Object} [formData]
             * @namespace options
             * @for Uploader
             * @description 文件上传请求的参数表，每次发送都会发送此对象中的参数。
             */
            formData: null
    
            /**
             * @property {Object} [fileVal='file']
             * @namespace options
             * @for Uploader
             * @description 设置文件上传域的name。
             */
    
            /**
             * @property {Object} [method='POST']
             * @namespace options
             * @for Uploader
             * @description 文件上传方式，`POST`或者`GET`。
             */
    
            /**
             * @property {Object} [sendAsBinary=false]
             * @namespace options
             * @for Uploader
             * @description 是否已二进制的流的方式发送文件，这样整个上传内容`php://input`都为文件内容，
             * 其他参数在$_GET数组中。
             */
        });
    
        // 负责将文件切片。
        function CuteFile( file, chunkSize ) {
            var pending = [],
                blob = file.source,
                total = blob.size,
                chunks = chunkSize ? Math.ceil( total / chunkSize ) : 1,
                start = 0,
                index = 0,
                len;
    
            while ( index < chunks ) {
                len = Math.min( chunkSize, total - start );
    
                pending.push({
                    file: file,
                    start: start,
                    end: chunkSize ? (start + len) : total,
                    total: total,
                    chunks: chunks,
                    chunk: index++
                });
                start += len;
            }
    
            file.blocks = pending.concat();
            file.remaning = pending.length;
    
            return {
                file: file,
    
                has: function() {
                    return !!pending.length;
                },
    
                fetch: function() {
                    return pending.shift();
                }
            };
        }
    
        Uploader.register({
            'start-upload': 'start',
            'stop-upload': 'stop',
            'skip-file': 'skipFile',
            'is-in-progress': 'isInProgress'
        }, {
    
            init: function() {
                var owner = this.owner;
    
                this.runing = false;
    
                // 记录当前正在传的数据，跟threads相关
                this.pool = [];
    
                // 缓存即将上传的文件。
                this.pending = [];
    
                // 跟踪还有多少分片没有完成上传。
                this.remaning = 0;
                this.__tick = Base.bindFn( this._tick, this );
    
                owner.on( 'uploadComplete', function( file ) {
                    // 把其他块取消了。
                    file.blocks && $.each( file.blocks, function( _, v ) {
                        v.transport && (v.transport.abort(), v.transport.destroy());
                        delete v.transport;
                    });
    
                    delete file.blocks;
                    delete file.remaning;
                });
            },
    
            /**
             * @event startUpload
             * @description 当开始上传流程时触发。
             * @for  Uploader
             */
    
            /**
             * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
             * @grammar upload() => undefined
             * @method upload
             * @for  Uploader
             */
            start: function() {
                var me = this;
    
                // 移出invalid的文件
                $.each( me.request( 'get-files', Status.INVALID ), function() {
                    me.request( 'remove-file', this );
                });
    
                if ( me.runing ) {
                    return;
                }
    
                me.runing = true;
    
                // 如果有暂停的，则续传
                $.each( me.pool, function( _, v ) {
                    var file = v.file;
    
                    if ( file.getStatus() === Status.INTERRUPT ) {
                        file.setStatus( Status.PROGRESS );
                        me._trigged = false;
                        v.transport && v.transport.send();
                    }
                });
    
                me._trigged = false;
                me.owner.trigger('startUpload');
                Base.nextTick( me.__tick );
            },
    
            /**
             * @event stopUpload
             * @description 当开始上传流程暂停时触发。
             * @for  Uploader
             */
    
            /**
             * 暂停上传。第一个参数为是否中断上传当前正在上传的文件。
             * @grammar stop() => undefined
             * @grammar stop( true ) => undefined
             * @method stop
             * @for  Uploader
             */
            stop: function( interrupt ) {
                var me = this;
    
                if ( me.runing === false ) {
                    return;
                }
    
                me.runing = false;
    
                interrupt && $.each( me.pool, function( _, v ) {
                    v.transport && v.transport.abort();
                    v.file.setStatus( Status.INTERRUPT );
                });
    
                me.owner.trigger('stopUpload');
            },
    
            /**
             * 判断`Uplaode`r是否正在上传中。
             * @grammar isInProgress() => Boolean
             * @method isInProgress
             * @for  Uploader
             */
            isInProgress: function() {
                return !!this.runing;
            },
    
            getStats: function() {
                return this.request('get-stats');
            },
    
            /**
             * 掉过一个文件上传，直接标记指定文件为已上传状态。
             * @grammar skipFile( file ) => undefined
             * @method skipFile
             * @for  Uploader
             */
            skipFile: function( file, status ) {
                file = this.request( 'get-file', file );
    
                file.setStatus( status || Status.COMPLETE );
                file.skipped = true;
    
                // 如果正在上传。
                file.blocks && $.each( file.blocks, function( _, v ) {
                    var _tr = v.transport;
    
                    if ( _tr ) {
                        _tr.abort();
                        _tr.destroy();
                        delete v.transport;
                    }
                });
    
                this.owner.trigger( 'uploadSkip', file );
            },
    
            /**
             * @event uploadFinished
             * @description 当所有文件上传结束时触发。
             * @for  Uploader
             */
            _tick: function() {
                var me = this,
                    opts = me.options,
                    fn, val;
    
                // 上一个promise还没有结束，则等待完成后再执行。
                if ( me._promise ) {
                    return me._promise.always( me.__tick );
                }
    
                // 还有位置，且还有文件要处理的话。
                if ( me.pool.length < opts.threads && (val = me._nextBlock()) ) {
                    me._trigged = false;
    
                    fn = function( val ) {
                        me._promise = null;
    
                        // 有可能是reject过来的，所以要检测val的类型。
                        val && val.file && me._startSend( val );
                        Base.nextTick( me.__tick );
                    };
    
                    me._promise = isPromise( val ) ? val.always( fn ) : fn( val );
    
                // 没有要上传的了，且没有正在传输的了。
                } else if ( !me.remaning && !me.getStats().numOfQueue ) {
                    me.runing = false;
    
                    me._trigged || Base.nextTick(function() {
                        me.owner.trigger('uploadFinished');
                    });
                    me._trigged = true;
                }
            },
    
            _nextBlock: function() {
                var me = this,
                    act = me._act,
                    opts = me.options,
                    next, done;
    
                // 如果当前文件还有没有需要传输的，则直接返回剩下的。
                if ( act && act.has() &&
                        act.file.getStatus() === Status.PROGRESS ) {
    
                    // 是否提前准备下一个文件
                    if ( opts.prepareNextFile && !me.pending.length ) {
                        me._prepareNextFile();
                    }
    
                    return act.fetch();
    
                // 否则，如果正在运行，则准备下一个文件，并等待完成后返回下个分片。
                } else if ( me.runing ) {
    
                    // 如果缓存中有，则直接在缓存中取，没有则去queue中取。
                    if ( !me.pending.length && me.getStats().numOfQueue ) {
                        me._prepareNextFile();
                    }
    
                    next = me.pending.shift();
                    done = function( file ) {
                        if ( !file ) {
                            return null;
                        }
    
                        act = CuteFile( file, opts.chunked ? opts.chunkSize : 0 );
                        me._act = act;
                        return act.fetch();
                    };
    
                    // 文件可能还在prepare中，也有可能已经完全准备好了。
                    return isPromise( next ) ?
                            next[ next.pipe ? 'pipe' : 'then']( done ) :
                            done( next );
                }
            },
    
    
            /**
             * @event uploadStart
             * @param {File} file File对象
             * @description 某个文件开始上传前触发，一个文件只会触发一次。
             * @for  Uploader
             */
            _prepareNextFile: function() {
                var me = this,
                    file = me.request('fetch-file'),
                    pending = me.pending,
                    promise;
    
                if ( file ) {
                    promise = me.request( 'before-send-file', file, function() {
    
                        // 有可能文件被skip掉了。文件被skip掉后，状态坑定不是Queued.
                        if ( file.getStatus() === Status.QUEUED ) {
                            me.owner.trigger( 'uploadStart', file );
                            file.setStatus( Status.PROGRESS );
                            return file;
                        }
    
                        return me._finishFile( file );
                    });
    
                    // 如果还在pending中，则替换成文件本身。
                    promise.done(function() {
                        var idx = $.inArray( promise, pending );
    
                        ~idx && pending.splice( idx, 1, file );
                    });
    
                    // befeore-send-file的钩子就有错误发生。
                    promise.fail(function( reason ) {
                        file.setStatus( Status.ERROR, reason );
                        me.owner.trigger( 'uploadError', file, reason );
                        me.owner.trigger( 'uploadComplete', file );
                    });
    
                    pending.push( promise );
                }
            },
    
            // 让出位置了，可以让其他分片开始上传
            _popBlock: function( block ) {
                var idx = $.inArray( block, this.pool );
    
                this.pool.splice( idx, 1 );
                block.file.remaning--;
                this.remaning--;
            },
    
            // 开始上传，可以被掉过。如果promise被reject了，则表示跳过此分片。
            _startSend: function( block ) {
                var me = this,
                    file = block.file,
                    promise;
    
                me.pool.push( block );
                me.remaning++;
    
                // 如果没有分片，则直接使用原始的。
                // 不会丢失content-type信息。
                block.blob = block.chunks === 1 ? file.source :
                        file.source.slice( block.start, block.end );
    
                // hook, 每个分片发送之前可能要做些异步的事情。
                promise = me.request( 'before-send', block, function() {
    
                    // 有可能文件已经上传出错了，所以不需要再传输了。
                    if ( file.getStatus() === Status.PROGRESS ) {
                        me._doSend( block );
                    } else {
                        me._popBlock( block );
                        Base.nextTick( me.__tick );
                    }
                });
    
                // 如果为fail了，则跳过此分片。
                promise.fail(function() {
                    if ( file.remaning === 1 ) {
                        me._finishFile( file ).always(function() {
                            block.percentage = 1;
                            me._popBlock( block );
                            me.owner.trigger( 'uploadComplete', file );
                            Base.nextTick( me.__tick );
                        });
                    } else {
                        block.percentage = 1;
                        me._popBlock( block );
                        Base.nextTick( me.__tick );
                    }
                });
            },
    
    
            /**
             * @event uploadBeforeSend
             * @param {Object} object
             * @param {Object} data 默认的上传参数，可以扩展此对象来控制上传参数。
             * @description 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
             * @for  Uploader
             */
    
            /**
             * @event uploadAccept
             * @param {Object} object
             * @param {Object} ret 服务端的返回数据，json格式，如果服务端不是json格式，从ret._raw中取数据，自行解析。
             * @description 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为`false`, 则此文件将派送`server`类型的`uploadError`事件。
             * @for  Uploader
             */
    
            /**
             * @event uploadProgress
             * @param {File} file File对象
             * @param {Number} percentage 上传进度
             * @description 上传过程中触发，携带上传进度。
             * @for  Uploader
             */
    
    
            /**
             * @event uploadError
             * @param {File} file File对象
             * @param {String} reason 出错的code
             * @description 当文件上传出错时触发。
             * @for  Uploader
             */
    
            /**
             * @event uploadSuccess
             * @param {File} file File对象
             * @param {Object} response 服务端返回的数据
             * @description 当文件上传成功时触发。
             * @for  Uploader
             */
    
            /**
             * @event uploadComplete
             * @param {File} [file] File对象
             * @description 不管成功或者失败，文件上传完成时触发。
             * @for  Uploader
             */
    
            // 做上传操作。
            _doSend: function( block ) {
                var me = this,
                    owner = me.owner,
                    opts = me.options,
                    file = block.file,
                    tr = new Transport( opts ),
                    data = $.extend({}, opts.formData ),
                    headers = $.extend({}, opts.headers ),
                    requestAccept, ret;
    
                block.transport = tr;
    
                tr.on( 'destroy', function() {
                    delete block.transport;
                    me._popBlock( block );
                    Base.nextTick( me.__tick );
                });
    
                // 广播上传进度。以文件为单位。
                tr.on( 'progress', function( percentage ) {
                    var totalPercent = 0,
                        uploaded = 0;
    
                    // 可能没有abort掉，progress还是执行进来了。
                    // if ( !file.blocks ) {
                    //     return;
                    // }
    
                    totalPercent = block.percentage = percentage;
    
                    if ( block.chunks > 1 ) {    // 计算文件的整体速度。
                        $.each( file.blocks, function( _, v ) {
                            uploaded += (v.percentage || 0) * (v.end - v.start);
                        });
    
                        totalPercent = uploaded / file.size;
                    }
    
                    owner.trigger( 'uploadProgress', file, totalPercent || 0 );
                });
    
                // 用来询问，是否返回的结果是有错误的。
                requestAccept = function( reject ) {
                    var fn;
    
                    ret = tr.getResponseAsJson() || {};
                    ret._raw = tr.getResponse();
                    fn = function( value ) {
                        reject = value;
                    };
    
                    // 服务端响应了，不代表成功了，询问是否响应正确。
                    if ( !owner.trigger( 'uploadAccept', block, ret, fn ) ) {
                        reject = reject || 'server';
                    }
    
                    return reject;
                };
    
                // 尝试重试，然后广播文件上传出错。
                tr.on( 'error', function( type, flag ) {
                    block.retried = block.retried || 0;
    
                    // 自动重试
                    if ( block.chunks > 1 && ~'http,abort'.indexOf( type ) &&
                            block.retried < opts.chunkRetry ) {
    
                        block.retried++;
                        tr.send();
    
                    } else {
    
                        // http status 500 ~ 600
                        if ( !flag && type === 'server' ) {
                            type = requestAccept( type );
                        }
    
                        file.setStatus( Status.ERROR, type );
                        owner.trigger( 'uploadError', file, type );
                        owner.trigger( 'uploadComplete', file );
                    }
                });
    
                // 上传成功
                tr.on( 'load', function() {
                    var reason;
    
                    // 如果非预期，转向上传出错。
                    if ( (reason = requestAccept()) ) {
                        tr.trigger( 'error', reason, true );
                        return;
                    }
    
                    // 全部上传完成。
                    if ( file.remaning === 1 ) {
                        me._finishFile( file, ret );
                    } else {
                        tr.destroy();
                    }
                });
    
                // 配置默认的上传字段。
                data = $.extend( data, {
                    id: file.id,
                    name: file.name,
                    type: file.type,
                    lastModifiedDate: file.lastModifiedDate,
                    size: file.size
                });
    
                block.chunks > 1 && $.extend( data, {
                    chunks: block.chunks,
                    chunk: block.chunk
                });
    
                // 在发送之间可以添加字段什么的。。。
                // 如果默认的字段不够使用，可以通过监听此事件来扩展
                owner.trigger( 'uploadBeforeSend', block, data, headers );
    
                // 开始发送。
                tr.appendBlob( opts.fileVal, block.blob, file.name );
                tr.append( data );
                tr.setRequestHeader( headers );
                tr.send();
            },
    
            // 完成上传。
            _finishFile: function( file, ret, hds ) {
                var owner = this.owner;
    
                return owner
                        .request( 'after-send-file', arguments, function() {
                            file.setStatus( Status.COMPLETE );
                            owner.trigger( 'uploadSuccess', file, ret, hds );
                        })
                        .fail(function( reason ) {
    
                            // 如果外部已经标记为invalid什么的，不再改状态。
                            if ( file.getStatus() === Status.PROGRESS ) {
                                file.setStatus( Status.ERROR, reason );
                            }
    
                            owner.trigger( 'uploadError', file, reason );
                        })
                        .always(function() {
                            owner.trigger( 'uploadComplete', file );
                        });
            }
    
        });
    });
    /**
     * @fileOverview 各种验证，包括文件总大小是否超出、单文件是否超出和文件是否重复。
     */
    
    define('widgets/validator',[
        'base',
        'uploader',
        'file',
        'widgets/widget'
    ], function( Base, Uploader, WUFile ) {
    
        var $ = Base.$,
            validators = {},
            api;
    
        /**
         * @event error
         * @param {String} type 错误类型。
         * @description 当validate不通过时，会以派送错误事件的形式通知调用者。通过`upload.on('error', handler)`可以捕获到此类错误，目前有以下错误会在特定的情况下派送错来。
         *
         * * `Q_EXCEED_NUM_LIMIT` 在设置了`fileNumLimit`且尝试给`uploader`添加的文件数量超出这个值时派送。
         * * `Q_EXCEED_SIZE_LIMIT` 在设置了`Q_EXCEED_SIZE_LIMIT`且尝试给`uploader`添加的文件总大小超出这个值时派送。
         * @for  Uploader
         */
    
        // 暴露给外面的api
        api = {
    
            // 添加验证器
            addValidator: function( type, cb ) {
                validators[ type ] = cb;
            },
    
            // 移除验证器
            removeValidator: function( type ) {
                delete validators[ type ];
            }
        };
    
        // 在Uploader初始化的时候启动Validators的初始化
        Uploader.register({
            init: function() {
                var me = this;
                $.each( validators, function() {
                    this.call( me.owner );
                });
            }
        });
    
        /**
         * @property {int} [fileNumLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证文件总数量, 超出则不允许加入队列。
         */
        api.addValidator( 'fileNumLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileNumLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
    
                if ( count >= max && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_NUM_LIMIT', max, file );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return count >= max ? false : true;
            });
    
            uploader.on( 'fileQueued', function() {
                count++;
            });
    
            uploader.on( 'fileDequeued', function() {
                count--;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
    
        /**
         * @property {int} [fileSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证文件总大小是否超出限制, 超出则不允许加入队列。
         */
        api.addValidator( 'fileSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                count = 0,
                max = opts.fileSizeLimit >> 0,
                flag = true;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var invalid = count + file.size > max;
    
                if ( invalid && flag ) {
                    flag = false;
                    this.trigger( 'error', 'Q_EXCEED_SIZE_LIMIT', max, file );
                    setTimeout(function() {
                        flag = true;
                    }, 1 );
                }
    
                return invalid ? false : true;
            });
    
            uploader.on( 'fileQueued', function( file ) {
                count += file.size;
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                count -= file.size;
            });
    
            uploader.on( 'uploadFinished', function() {
                count = 0;
            });
        });
    
        /**
         * @property {int} [fileSingleSizeLimit=undefined]
         * @namespace options
         * @for Uploader
         * @description 验证单个文件大小是否超出限制, 超出则不允许加入队列。
         */
        api.addValidator( 'fileSingleSizeLimit', function() {
            var uploader = this,
                opts = uploader.options,
                max = opts.fileSingleSizeLimit;
    
            if ( !max ) {
                return;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
    
                if ( file.size > max ) {
                    file.setStatus( WUFile.Status.INVALID, 'exceed_size' );
                    this.trigger( 'error', 'F_EXCEED_SIZE', file );
                    return false;
                }
    
            });
    
        });
    
        /**
         * @property {int} [duplicate=undefined]
         * @namespace options
         * @for Uploader
         * @description 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
         */
        api.addValidator( 'duplicate', function() {
            var uploader = this,
                opts = uploader.options,
                mapping = {};
    
            if ( opts.duplicate ) {
                return;
            }
    
            function hashString( str ) {
                var hash = 0,
                    i = 0,
                    len = str.length,
                    _char;
    
                for ( ; i < len; i++ ) {
                    _char = str.charCodeAt( i );
                    hash = _char + (hash << 6) + (hash << 16) - hash;
                }
    
                return hash;
            }
    
            uploader.on( 'beforeFileQueued', function( file ) {
                var hash = file.__hash || (file.__hash = hashString( file.name +
                        file.size + file.lastModifiedDate ));
    
                // 已经重复了
                if ( mapping[ hash ] ) {
                    this.trigger( 'error', 'F_DUPLICATE', file );
                    return false;
                }
            });
    
            uploader.on( 'fileQueued', function( file ) {
                var hash = file.__hash;
    
                hash && (mapping[ hash ] = true);
            });
    
            uploader.on( 'fileDequeued', function( file ) {
                var hash = file.__hash;
    
                hash && (delete mapping[ hash ]);
            });
        });
    
        return api;
    });
    
    /**
     * @fileOverview Runtime管理器，负责Runtime的选择, 连接
     */
    define('runtime/compbase',[],function() {
    
        function CompBase( owner, runtime ) {
    
            this.owner = owner;
            this.options = owner.options;
    
            this.getRuntime = function() {
                return runtime;
            };
    
            this.getRuid = function() {
                return runtime.uid;
            };
    
            this.trigger = function() {
                return owner.trigger.apply( owner, arguments );
            };
        }
    
        return CompBase;
    });
    /**
     * @fileOverview Html5Runtime
     */
    define('runtime/html5/runtime',[
        'base',
        'runtime/runtime',
        'runtime/compbase'
    ], function( Base, Runtime, CompBase ) {
    
        var type = 'html5',
            components = {};
    
        function Html5Runtime() {
            var pool = {},
                me = this,
                destory = this.destory;
    
            Runtime.apply( me, arguments );
            me.type = type;
    
    
            // 这个方法的调用者，实际上是RuntimeClient
            me.exec = function( comp, fn/*, args...*/) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice( arguments, 2 ),
                    instance;
    
                if ( components[ comp ] ) {
                    instance = pool[ uid ] = pool[ uid ] ||
                            new components[ comp ]( client, me );
    
                    if ( instance[ fn ] ) {
                        return instance[ fn ].apply( instance, args );
                    }
                }
            };
    
            me.destory = function() {
                // @todo 删除池子中的所有实例
                return destory && destory.apply( this, arguments );
            };
        }
    
        Base.inherits( Runtime, {
            constructor: Html5Runtime,
    
            // 不需要连接其他程序，直接执行callback
            init: function() {
                var me = this;
                setTimeout(function() {
                    me.trigger('ready');
                }, 1 );
            }
    
        });
    
        // 注册Components
        Html5Runtime.register = function( name, component ) {
            var klass = components[ name ] = Base.inherits( CompBase, component );
            return klass;
        };
    
        // 注册html5运行时。
        // 只有在支持的前提下注册。
        if ( window.Blob && window.FileReader && window.DataView ) {
            Runtime.addRuntime( type, Html5Runtime );
        }
    
        return Html5Runtime;
    });
    /**
     * @fileOverview Blob Html实现
     */
    define('runtime/html5/blob',[
        'runtime/html5/runtime',
        'lib/blob'
    ], function( Html5Runtime, Blob ) {
    
        return Html5Runtime.register( 'Blob', {
            slice: function( start, end ) {
                var blob = this.owner.source,
                    slice = blob.slice || blob.webkitSlice || blob.mozSlice;
    
                blob = slice.call( blob, start, end );
    
                return new Blob( this.getRuid(), blob );
            }
        });
    });
    /**
     * @fileOverview FilePaste
     */
    define('runtime/html5/dnd',[
        'base',
        'runtime/html5/runtime',
        'lib/file'
    ], function( Base, Html5Runtime, File ) {
    
        var $ = Base.$,
            prefix = 'webuploader-dnd-';
    
        return Html5Runtime.register( 'DragAndDrop', {
            init: function() {
                var elem = this.elem = this.options.container;
    
                this.dragEnterHandler = Base.bindFn( this._dragEnterHandler, this );
                this.dragOverHandler = Base.bindFn( this._dragOverHandler, this );
                this.dragLeaveHandler = Base.bindFn( this._dragLeaveHandler, this );
                this.dropHandler = Base.bindFn( this._dropHandler, this );
                this.dndOver = false;
    
                elem.on( 'dragenter', this.dragEnterHandler );
                elem.on( 'dragover', this.dragOverHandler );
                elem.on( 'dragleave', this.dragLeaveHandler );
                elem.on( 'drop', this.dropHandler );
    
                if ( this.options.disableGlobalDnd ) {
                    $( document ).on( 'dragover', this.dragOverHandler );
                    $( document ).on( 'drop', this.dropHandler );
                }
            },
    
            _dragEnterHandler: function( e ) {
                var me = this,
                    denied = me._denied || false,
                    items;
    
                e = e.originalEvent || e;
    
                if ( !me.dndOver ) {
                    me.dndOver = true;
    
                    // 注意只有 chrome 支持。
                    items = e.dataTransfer.items;
    
                    if ( items && items.length ) {
                        me._denied = denied = !me.trigger( 'accept', items );
                    }
    
                    me.elem.addClass( prefix + 'over' );
                    me.elem[ denied ? 'addClass' :
                            'removeClass' ]( prefix + 'denied' );
                }
    
    
                e.dataTransfer.dropEffect = denied ? 'none' : 'copy';
    
                return false;
            },
    
            _dragOverHandler: function( e ) {
                // 只处理框内的。
                var parentElem = this.elem.parent().get( 0 );
                if ( parentElem && !$.contains( parentElem, e.currentTarget ) ) {
                    return false;
                }
    
                clearTimeout( this._leaveTimer );
                this._dragEnterHandler.call( this, e );
    
                return false;
            },
    
            _dragLeaveHandler: function() {
                var me = this,
                    handler;
    
                handler = function() {
                    me.dndOver = false;
                    me.elem.removeClass( prefix + 'over ' + prefix + 'denied' );
                };
    
                clearTimeout( me._leaveTimer );
                me._leaveTimer = setTimeout( handler, 100 );
                return false;
            },
    
            _dropHandler: function( e ) {
                var me = this,
                    ruid = me.getRuid(),
                    parentElem = me.elem.parent().get( 0 );
    
                // 只处理框内的。
                if ( parentElem && !$.contains( parentElem, e.currentTarget ) ) {
                    return false;
                }
    
                me._getTansferFiles( e, function( results ) {
                    me.trigger( 'drop', $.map( results, function( file ) {
                        return new File( ruid, file );
                    }) );
                });
    
                me.dndOver = false;
                me.elem.removeClass( prefix + 'over' );
                return false;
            },
    
            // 如果传入 callback 则去查看文件夹，否则只管当前文件夹。
            _getTansferFiles: function( e, callback ) {
                var results  = [],
                    promises = [],
                    items, files, dataTransfer, file, item, i, len, canAccessFolder;
    
                e = e.originalEvent || e;
    
                dataTransfer = e.dataTransfer;
                items = dataTransfer.items;
                files = dataTransfer.files;
    
                canAccessFolder = !!(items && items[ 0 ].webkitGetAsEntry);
    
                for ( i = 0, len = files.length; i < len; i++ ) {
                    file = files[ i ];
                    item = items && items[ i ];
    
                    if ( canAccessFolder && item.webkitGetAsEntry().isDirectory ) {
    
                        promises.push( this._traverseDirectoryTree(
                                item.webkitGetAsEntry(), results ) );
                    } else {
                        results.push( file );
                    }
                }
    
                Base.when.apply( Base, promises ).done(function() {
    
                    if ( !results.length ) {
                        return;
                    }
    
                    callback( results );
                });
            },
    
            _traverseDirectoryTree: function( entry, results ) {
                var deferred = Base.Deferred(),
                    me = this;
    
                if ( entry.isFile ) {
                    entry.file(function( file ) {
                        results.push( file );
                        deferred.resolve();
                    });
                } else if ( entry.isDirectory ) {
                    entry.createReader().readEntries(function( entries ) {
                        var len = entries.length,
                            promises = [],
                            arr = [],    // 为了保证顺序。
                            i;
    
                        for ( i = 0; i < len; i++ ) {
                            promises.push( me._traverseDirectoryTree(
                                    entries[ i ], arr ) );
                        }
    
                        Base.when.apply( Base, promises ).then(function() {
                            results.push.apply( results, arr );
                            deferred.resolve();
                        }, deferred.reject );
                    });
                }
    
                return deferred.promise();
            },
    
            destroy: function() {
                var elem = this.elem;
    
                elem.off( 'dragenter', this.dragEnterHandler );
                elem.off( 'dragover', this.dragEnterHandler );
                elem.off( 'dragleave', this.dragLeaveHandler );
                elem.off( 'drop', this.dropHandler );
    
                if ( this.options.disableGlobalDnd ) {
                    $( document ).off( 'dragover', this.dragOverHandler );
                    $( document ).off( 'drop', this.dropHandler );
                }
            }
        });
    });
    
    /**
     * @fileOverview FilePaste
     */
    define('runtime/html5/filepaste',[
        'base',
        'runtime/html5/runtime',
        'lib/file'
    ], function( Base, Html5Runtime, File ) {
    
        return Html5Runtime.register( 'FilePaste', {
            init: function() {
                var opts = this.options,
                    elem = this.elem = opts.container,
                    accept = '.*',
                    arr, i, len, item;
    
                // accetp的mimeTypes中生成匹配正则。
                if ( opts.accept ) {
                    arr = [];
    
                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                        item = opts.accept[ i ].mimeTypes;
                        item && arr.push( item );
                    }
    
                    if ( arr.length ) {
                        accept = arr.join(',');
                        accept = accept.replace( /,/g, '|' ).replace( /\*/g, '.*' );
                    }
                }
                this.accept = accept = new RegExp( accept, 'i' );
                this.hander = Base.bindFn( this._pasteHander, this );
                elem.on( 'paste', this.hander );
            },
    
            _pasteHander: function( e ) {
                var allowed = [],
                    ruid = this.getRuid(),
                    items, item, blob, i, len;
    
                e = e.originalEvent || e;
                items = e.clipboardData.items;
    
                for ( i = 0, len = items.length; i < len; i++ ) {
                    item = items[ i ];
    
                    if ( item.kind !== 'file' || !(blob = item.getAsFile()) ) {
                        continue;
                    }
    
                    allowed.push( new File( ruid, blob ) );
                }
    
                if ( allowed.length ) {
                    // 不阻止非文件粘贴（文字粘贴）的事件冒泡
                    e.preventDefault();
                    e.stopPropagation();
                    this.trigger( 'paste', allowed );
                }
            },
    
            destroy: function() {
                this.elem.off( 'paste', this.hander );
            }
        });
    });
    
    /**
     * @fileOverview FilePicker
     */
    define('runtime/html5/filepicker',[
        'base',
        'runtime/html5/runtime'
    ], function( Base, Html5Runtime ) {
    
        var $ = Base.$;
    
        return Html5Runtime.register( 'FilePicker', {
            init: function() {
                var container = this.getRuntime().getContainer(),
                    me = this,
                    owner = me.owner,
                    opts = me.options,
                    lable = $( document.createElement('label') ),
                    input = $( document.createElement('input') ),
                    arr, i, len, mouseHandler;
    
                input.attr( 'type', 'file' );
                input.attr( 'name', opts.name );
                input.addClass('webuploader-element-invisible');
    
                lable.on( 'click', function() {
                    input.trigger('click');
                });
    
                lable.css({
                    opacity: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    cursor: 'pointer',
                    background: '#ffffff'
                });
    
                if ( opts.multiple ) {
                    input.attr( 'multiple', 'multiple' );
                }
    
                // @todo Firefox不支持单独指定后缀
                if ( opts.accept && opts.accept.length > 0 ) {
                    arr = [];
    
                    for ( i = 0, len = opts.accept.length; i < len; i++ ) {
                        arr.push( opts.accept[ i ].mimeTypes );
                    }
    
                    input.attr( 'accept', arr.join(',') );
                }
    
                container.append( input );
                container.append( lable );
    
                mouseHandler = function( e ) {
                    owner.trigger( e.type );
                };
    
                input.on( 'change', function( e ) {
                    var fn = arguments.callee,
                        clone;
    
                    me.files = e.target.files;
    
                    // reset input
                    clone = this.cloneNode( true );
                    this.parentNode.replaceChild( clone, this );
    
                    input.off();
                    input = $( clone ).on( 'change', fn )
                            .on( 'mouseenter mouseleave', mouseHandler );
    
                    owner.trigger('change');
                });
    
                lable.on( 'mouseenter mouseleave', mouseHandler );
    
            },
    
    
            getFiles: function() {
                return this.files;
            },
    
            destroy: function() {
                // todo
            }
        });
    });
    /**
     * @fileOverview Transport
     * @todo 支持chunked传输，优势：
     * 可以将大文件分成小块，挨个传输，可以提高大文件成功率，当失败的时候，也只需要重传那小部分，
     * 而不需要重头再传一次。另外断点续传也需要用chunked方式。
     */
    define('runtime/html5/transport',[
        'base',
        'runtime/html5/runtime'
    ], function( Base, Html5Runtime ) {
    
        var noop = Base.noop,
            $ = Base.$;
    
        return Html5Runtime.register( 'Transport', {
            init: function() {
                this._status = 0;
                this._response = null;
            },
    
            send: function() {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    blob = owner._blob,
                    server = opts.server,
                    formData, binary, fr;
    
                if ( opts.sendAsBinary ) {
                    server += (/\?/.test( server ) ? '&' : '?') +
                            $.param( owner._formData );
    
                    binary = blob.getSource();
                } else {
                    formData = new FormData();
                    $.each( owner._formData, function( k, v ) {
                        formData.append( k, v );
                    });
    
                    formData.append( opts.fileVal, blob.getSource(),
                            opts.filename || owner._formData.name || '' );
                }
    
                if ( opts.withCredentials && 'withCredentials' in xhr ) {
                    xhr.open( opts.method, server, true );
                    xhr.withCredentials = true;
                } else {
                    xhr.open( opts.method, server );
                }
    
                this._setRequestHeader( xhr, opts.headers );
    
                if ( binary ) {
                    xhr.overrideMimeType('application/octet-stream');
    
                    // android直接发送blob会导致服务端接收到的是空文件。
                    // bug详情。
                    // https://code.google.com/p/android/issues/detail?id=39882
                    // 所以先用fileReader读取出来再通过arraybuffer的方式发送。
                    if ( Base.os.android ) {
                        fr = new FileReader();
    
                        fr.onload = function() {
                            xhr.send( this.result );
                            fr = fr.onload = null;
                        };
    
                        fr.readAsArrayBuffer( binary );
                    } else {
                        xhr.send( binary );
                    }
                } else {
                    xhr.send( formData );
                }
            },
    
            getResponse: function() {
                return this._response;
            },
    
            getResponseAsJson: function() {
                return this._parseJson( this._response );
            },
    
            getStatus: function() {
                return this._status;
            },
    
            abort: function() {
                var xhr = this._xhr;
    
                if ( xhr ) {
                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    xhr.abort();
    
                    this._xhr = xhr = null;
                }
            },
    
            destroy: function() {
                this.abort();
            },
    
            _initAjax: function() {
                var me = this,
                    xhr = new XMLHttpRequest(),
                    opts = this.options;
    
                if ( opts.withCredentials && !('withCredentials' in xhr) &&
                        typeof XDomainRequest !== 'undefined' ) {
                    xhr = new XDomainRequest();
                }
    
                xhr.upload.onprogress = function( e ) {
                    var percentage = 0;
    
                    if ( e.lengthComputable ) {
                        percentage = e.loaded / e.total;
                    }
    
                    return me.trigger( 'progress', percentage );
                };
    
                xhr.onreadystatechange = function() {
    
                    if ( xhr.readyState !== 4 ) {
                        return;
                    }
    
                    xhr.upload.onprogress = noop;
                    xhr.onreadystatechange = noop;
                    me._xhr = null;
                    me._status = xhr.status;
    
                    if ( xhr.status >= 200 && xhr.status < 300 ) {
                        me._response = xhr.responseText;
                        return me.trigger('load');
                    } else if ( xhr.status >= 500 && xhr.status < 600 ) {
                        me._response = xhr.responseText;
                        return me.trigger( 'error', 'server' );
                    }
    
    
                    return me.trigger( 'error', me._status ? 'http' : 'abort' );
                };
    
                me._xhr = xhr;
                return xhr;
            },
    
            _setRequestHeader: function( xhr, headers ) {
                $.each( headers, function( key, val ) {
                    xhr.setRequestHeader( key, val );
                });
            },
    
            _parseJson: function( str ) {
                var json;
    
                try {
                    json = JSON.parse( str );
                } catch ( ex ) {
                    json = {};
                }
    
                return json;
            }
        });
    });
    /**
     * @fileOverview FlashRuntime
     */
    define('runtime/flash/runtime',[
        'base',
        'runtime/runtime',
        'runtime/compbase'
    ], function( Base, Runtime, CompBase ) {
    
        var $ = Base.$,
            type = 'flash',
            components = {};
    
    
        function getFlashVersion() {
            var version;
    
            try {
                version = navigator.plugins[ 'Shockwave Flash' ];
                version = version.description;
            } catch ( ex ) {
                try {
                    version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                            .GetVariable('$version');
                } catch ( ex2 ) {
                    version = '0.0';
                }
            }
            version = version.match( /\d+/g );
            return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
        }
    
        function FlashRuntime() {
            var pool = {},
                clients = {},
                destory = this.destory,
                me = this,
                jsreciver = Base.guid('webuploader_');
    
            Runtime.apply( me, arguments );
            me.type = type;
    
    
            // 这个方法的调用者，实际上是RuntimeClient
            me.exec = function( comp, fn/*, args...*/ ) {
                var client = this,
                    uid = client.uid,
                    args = Base.slice( arguments, 2 ),
                    instance;
    
                clients[ uid ] = client;
    
                if ( components[ comp ] ) {
                    if ( !pool[ uid ] ) {
                        pool[ uid ] = new components[ comp ]( client, me );
                    }
    
                    instance = pool[ uid ];
    
                    if ( instance[ fn ] ) {
                        return instance[ fn ].apply( instance, args );
                    }
                }
    
                return me.flashExec.apply( client, arguments );
            };
    
            function handler( evt, obj ) {
                var type = evt.type || evt,
                    parts, uid;
    
                parts = type.split('::');
                uid = parts[ 0 ];
                type = parts[ 1 ];
    
                // console.log.apply( console, arguments );
    
                if ( type === 'Ready' && uid === me.uid ) {
                    me.trigger('ready');
                } else if ( clients[ uid ] ) {
                    clients[ uid ].trigger( type.toLowerCase(), evt, obj );
                }
    
                // Base.log( evt, obj );
            }
    
            // flash的接受器。
            window[ jsreciver ] = function() {
                var args = arguments;
    
                // 为了能捕获得到。
                setTimeout(function() {
                    handler.apply( null, args );
                }, 1 );
            };
    
            this.jsreciver = jsreciver;
    
            this.destory = function() {
                // @todo 删除池子中的所有实例
                return destory && destory.apply( this, arguments );
            };
    
            this.flashExec = function( comp, fn ) {
                var flash = me.getFlash(),
                    args = Base.slice( arguments, 2 );
    
                return flash.exec( this.uid, comp, fn, args );
            };
    
            // @todo
        }
    
        Base.inherits( Runtime, {
            constructor: FlashRuntime,
    
            init: function() {
                var container = this.getContainer(),
                    opts = this.options,
                    html;
    
                // if not the minimal height, shims are not initialized
                // in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)
                container.css({
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    width: '9px',
                    height: '9px',
                    overflow: 'hidden'
                });
    
                // insert flash object
                html = '<object id="' + this.uid + '" type="application/' +
                        'x-shockwave-flash" data="' +  opts.swf + '" ';
    
                if ( Base.browser.ie ) {
                    html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                }
    
                html += 'width="100%" height="100%" style="outline:0">'  +
                    '<param name="movie" value="' + opts.swf + '" />' +
                    '<param name="flashvars" value="uid=' + this.uid +
                    '&jsreciver=' + this.jsreciver + '" />' +
                    '<param name="wmode" value="transparent" />' +
                    '<param name="allowscriptaccess" value="always" />' +
                '</object>';
    
                container.html( html );
            },
    
            getFlash: function() {
                if ( this._flash ) {
                    return this._flash;
                }
    
                this._flash = $( '#' + this.uid ).get( 0 );
                return this._flash;
            }
    
        });
    
        FlashRuntime.register = function( name, component ) {
            component = components[ name ] = Base.inherits( CompBase, $.extend({
    
                // @todo fix this later
                flashExec: function() {
                    var owner = this.owner,
                        runtime = this.getRuntime();
    
                    return runtime.flashExec.apply( owner, arguments );
                }
            }, component ) );
    
            return component;
        };
    
        if ( getFlashVersion() >= 11.4 ) {
            Runtime.addRuntime( type, FlashRuntime );
        }
    
        return FlashRuntime;
    });
    /**
     * @fileOverview FilePicker
     */
    define('runtime/flash/filepicker',[
        'base',
        'runtime/flash/runtime'
    ], function( Base, FlashRuntime ) {
        var $ = Base.$;
    
        return FlashRuntime.register( 'FilePicker', {
            init: function( opts ) {
                var copy = $.extend({}, opts ),
                    len, i;
    
                // 修复Flash再没有设置title的情况下无法弹出flash文件选择框的bug.
                len = copy.accept && copy.accept.length;
                for (  i = 0; i < len; i++ ) {
                    if ( !copy.accept[ i ].title ) {
                        copy.accept[ i ].title = 'Files';
                    }
                }
    
                delete copy.button;
                delete copy.container;
    
                this.flashExec( 'FilePicker', 'init', copy );
            },
    
            destroy: function() {
                // todo
            }
        });
    });
    /**
     * @fileOverview  Transport flash实现
     */
    define('runtime/flash/transport',[
        'base',
        'runtime/flash/runtime',
        'runtime/client'
    ], function( Base, FlashRuntime, RuntimeClient ) {
        var $ = Base.$;
    
        return FlashRuntime.register( 'Transport', {
            init: function() {
                this._status = 0;
                this._response = null;
                this._responseJson = null;
            },
    
            send: function() {
                var owner = this.owner,
                    opts = this.options,
                    xhr = this._initAjax(),
                    blob = owner._blob,
                    server = opts.server,
                    binary;
    
                xhr.connectRuntime( blob.ruid );
    
                if ( opts.sendAsBinary ) {
                    server += (/\?/.test( server ) ? '&' : '?') +
                            $.param( owner._formData );
    
                    binary = blob.uid;
                } else {
                    $.each( owner._formData, function( k, v ) {
                        xhr.exec( 'append', k, v );
                    });
    
                    xhr.exec( 'appendBlob', opts.fileVal, blob.uid,
                            opts.filename || owner._formData.name || '' );
                }
    
                this._setRequestHeader( xhr, opts.headers );
                xhr.exec( 'send', {
                    method: opts.method,
                    url: server
                }, binary );
            },
    
            getStatus: function() {
                return this._status;
            },
    
            getResponse: function() {
                return this._response;
            },
    
            getResponseAsJson: function() {
                return this._responseJson;
            },
    
            abort: function() {
                var xhr = this._xhr;
    
                if ( xhr ) {
                    xhr.exec('abort');
                    xhr.destroy();
                    this._xhr = xhr = null;
                }
            },
    
            destroy: function() {
                this.abort();
            },
    
            _initAjax: function() {
                var me = this,
                    xhr = new RuntimeClient('XMLHttpRequest');
    
                xhr.on( 'uploadprogress progress', function( e ) {
                    return me.trigger( 'progress', e.loaded / e.total );
                });
    
                xhr.on( 'load', function() {
                    var status = xhr.exec('getStatus'),
                        err = '';
    
                    xhr.off();
                    me._xhr = null;
    
                    if ( status >= 200 && status < 300 ) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                    } else if ( status >= 500 && status < 600 ) {
                        me._response = xhr.exec('getResponse');
                        me._responseJson = xhr.exec('getResponseAsJson');
                        err = 'server';
                    } else {
                        err = 'http';
                    }
    
                    xhr.destroy();
                    xhr = null;
    
                    return err ? me.trigger( 'error', err ) : me.trigger('load');
                });
    
                xhr.on( 'error', function() {
                    xhr.off();
                    me._xhr = null;
                    me.trigger( 'error', 'http' );
                });
    
                me._xhr = xhr;
                return xhr;
            },
    
            _setRequestHeader: function( xhr, headers ) {
                $.each( headers, function( key, val ) {
                    xhr.exec( 'setRequestHeader', key, val );
                });
            }
        });
    });
    /**
     * @fileOverview 没有图像处理的版本。
     */
    define('preset/withoutimage',[
        'base',
    
        // widgets
        'widgets/filednd',
        'widgets/filepaste',
        'widgets/filepicker',
        'widgets/queue',
        'widgets/runtime',
        'widgets/upload',
        'widgets/validator',
    
        // runtimes
        // html5
        'runtime/html5/blob',
        'runtime/html5/dnd',
        'runtime/html5/filepaste',
        'runtime/html5/filepicker',
        'runtime/html5/transport',
    
        // flash
        'runtime/flash/filepicker',
        'runtime/flash/transport'
    ], function( Base ) {
        return Base;
    });
    define('webuploader',[
        'preset/withoutimage'
    ], function( preset ) {
        return preset;
    });
    return require('webuploader');
});
