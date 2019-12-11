/** layuiAdmin.pro-v1.2.1 LPPL License By http://www.layui.com/admin/ */
 ;!function(){!function(){UE=window.UE||{};var e=!!window.ActiveXObject,t={removeLastbs:function(e){return e.replace(/\/$/,"")},extend:function(e,t){for(var n=arguments,i=!!this.isBoolean(n[n.length-1])&&n[n.length-1],r=this.isBoolean(n[n.length-1])?n.length-1:n.length,a=1;a<r;a++){var s=n[a];for(var l in s)i&&e.hasOwnProperty(l)||(e[l]=s[l])}return e},isIE:e,cssRule:e?function(e,t,n){var i,r;n=n||document,i=n.indexList?n.indexList:n.indexList={};var a;if(i[e])a=n.styleSheets[i[e]];else{if(void 0===t)return"";a=n.createStyleSheet("",r=n.styleSheets.length),i[e]=r}return void 0===t?a.cssText:void(a.cssText=a.cssText+"\n"+(t||""))}:function(e,t,n){n=n||document;var i,r=n.getElementsByTagName("head")[0];if(!(i=n.getElementById(e))){if(void 0===t)return"";i=n.createElement("style"),i.id=e,r.appendChild(i)}return void 0===t?i.innerHTML:void(""!==t?i.innerHTML=i.innerHTML+"\n"+t:r.removeChild(i))},domReady:function(t){var n=window.document;"complete"===n.readyState?t():e?(!function(){if(!n.isReady){try{n.documentElement.doScroll("left")}catch(e){return void setTimeout(arguments.callee,0)}t()}}(),window.attachEvent("onload",function(){t()})):(n.addEventListener("DOMContentLoaded",function(){n.removeEventListener("DOMContentLoaded",arguments.callee,!1),t()},!1),window.addEventListener("load",function(){t()},!1))},each:function(e,t,n){if(null!=e)if(e.length===+e.length){for(var i=0,r=e.length;i<r;i++)if(t.call(n,e[i],i,e)===!1)return!1}else for(var a in e)if(e.hasOwnProperty(a)&&t.call(n,e[a],a,e)===!1)return!1},inArray:function(e,t){var n=-1;return this.each(e,function(e,i){if(e===t)return n=i,!1}),n},pushItem:function(e,t){this.inArray(e,t)==-1&&e.push(t)},trim:function(e){return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},indexOf:function(e,t,n){var i=-1;return n=this.isNumber(n)?n:0,this.each(e,function(e,r){if(r>=n&&e===t)return i=r,!1}),i},hasClass:function(e,t){t=t.replace(/(^[ ]+)|([ ]+$)/g,"").replace(/[ ]{2,}/g," ").split(" ");for(var n,i=0,r=e.className;n=t[i++];)if(!new RegExp("\\b"+n+"\\b","i").test(r))return!1;return i-1==t.length},addClass:function(e,n){if(e){n=this.trim(n).replace(/[ ]{2,}/g," ").split(" ");for(var i,r=0,a=e.className;i=n[r++];)new RegExp("\\b"+i+"\\b").test(a)||(a+=" "+i);e.className=t.trim(a)}},removeClass:function(e,t){t=this.isArray(t)?t:this.trim(t).replace(/[ ]{2,}/g," ").split(" ");for(var n,i=0,r=e.className;n=t[i++];)r=r.replace(new RegExp("\\b"+n+"\\b"),"");r=this.trim(r).replace(/[ ]{2,}/g," "),e.className=r,!r&&e.removeAttribute("className")},on:function(e,n,i){var r=this.isArray(n)?n:n.split(/\s+/),a=r.length;if(a)for(;a--;)if(n=r[a],e.addEventListener)e.addEventListener(n,i,!1);else{i._d||(i._d={els:[]});var s=n+i.toString(),l=t.indexOf(i._d.els,e);i._d[s]&&l!=-1||(l==-1&&i._d.els.push(e),i._d[s]||(i._d[s]=function(e){return i.call(e.srcElement,e||window.event)}),e.attachEvent("on"+n,i._d[s]))}e=null},off:function(e,n,i){var r=this.isArray(n)?n:n.split(/\s+/),a=r.length;if(a)for(;a--;)if(n=r[a],e.removeEventListener)e.removeEventListener(n,i,!1);else{var s=n+i.toString();try{e.detachEvent("on"+n,i._d?i._d[s]:i)}catch(l){}if(i._d&&i._d[s]){var o=t.indexOf(i._d.els,e);o!=-1&&i._d.els.splice(o,1),0==i._d.els.length&&delete i._d[s]}}},loadFile:function(){function e(e,n){try{for(var i,r=0;i=t[r++];)if(i.doc===e&&i.url==(n.src||n.href))return i}catch(a){return null}}var t=[];return function(n,i,r){var a=e(n,i);if(a)return void(a.ready?r&&r():a.funs.push(r));if(t.push({doc:n,url:i.src||i.href,funs:[r]}),!n.body){var s=[];for(var l in i)"tag"!=l&&s.push(l+'="'+i[l]+'"');return void n.write("<"+i.tag+" "+s.join(" ")+" ></"+i.tag+">")}if(!i.id||!n.getElementById(i.id)){var o=n.createElement(i.tag);delete i.tag;for(var l in i)o.setAttribute(l,i[l]);o.onload=o.onreadystatechange=function(){if(!this.readyState||/loaded|complete/.test(this.readyState)){if(a=e(n,i),a.funs.length>0){a.ready=1;for(var t;t=a.funs.pop();)t()}o.onload=o.onreadystatechange=null}},o.onerror=function(){throw Error("The load "+(i.href||i.src)+" fails,check the url")},n.getElementsByTagName("head")[0].appendChild(o)}}}()};t.each(["String","Function","Array","Number","RegExp","Object","Boolean"],function(e){t["is"+e]=function(t){return Object.prototype.toString.apply(t)=="[object "+e+"]"}});var n={};UE.parse={register:function(e,t){n[e]=t},load:function(e){t.each(n,function(n){n.call(e,t)})}},uParse=function(e,n){t.domReady(function(){var i;if(document.querySelectorAll)i=document.querySelectorAll(e);else if(/^#/.test(e))i=[document.getElementById(e.replace(/^#/,""))];else if(/^\./.test(e)){var i=[];t.each(document.getElementsByTagName("*"),function(t){t.className&&new RegExp("\\b"+e.replace(/^\./,"")+"\\b","i").test(t.className)&&i.push(t)})}else i=document.getElementsByTagName(e);t.each(i,function(i){UE.parse.load(t.extend({root:i,selector:e},n))})})}}(),UE.parse.register("insertcode",function(e){var t=this.root.getElementsByTagName("pre");if(t.length)if("undefined"==typeof XRegExp){var n,i;void 0!==this.rootPath?(n=e.removeLastbs(this.rootPath)+"/third-party/SyntaxHighlighter/shCore.js",i=e.removeLastbs(this.rootPath)+"/third-party/SyntaxHighlighter/shCoreDefault.css"):(n=this.highlightJsUrl,i=this.highlightCssUrl),e.loadFile(document,{id:"syntaxhighlighter_css",tag:"link",rel:"stylesheet",type:"text/css",href:i}),e.loadFile(document,{id:"syntaxhighlighter_js",src:n,tag:"script",type:"text/javascript",defer:"defer"},function(){e.each(t,function(e){e&&/brush/i.test(e.className)&&SyntaxHighlighter.highlight(e)})})}else e.each(t,function(e){e&&/brush/i.test(e.className)&&SyntaxHighlighter.highlight(e)})}),UE.parse.register("table",function(e){function t(t,n){var i,r=t;for(n=e.isArray(n)?n:[n];r;){for(i=0;i<n.length;i++)if(r.tagName==n[i].toUpperCase())return r;r=r.parentNode}return null}function n(t,n,r){for(var a=t.rows,s=[],l="TH"===a[0].cells[0].tagName,o=0,d=0,c=a.length;d<c;d++)s[d]=a[d];var u={reversecurrent:function(e,t){return 1},orderbyasc:function(e,t){var n=e.innerText||e.textContent,i=t.innerText||t.textContent;return n.localeCompare(i)},reversebyasc:function(e,t){var n=e.innerHTML,i=t.innerHTML;return i.localeCompare(n)},orderbynum:function(t,n){var i=t[e.isIE?"innerText":"textContent"].match(/\d+/),r=n[e.isIE?"innerText":"textContent"].match(/\d+/);return i&&(i=+i[0]),r&&(r=+r[0]),(i||0)-(r||0)},reversebynum:function(t,n){var i=t[e.isIE?"innerText":"textContent"].match(/\d+/),r=n[e.isIE?"innerText":"textContent"].match(/\d+/);return i&&(i=+i[0]),r&&(r=+r[0]),(r||0)-(i||0)}};t.setAttribute("data-sort-type",r&&"string"==typeof r&&u[r]?r:""),l&&s.splice(0,1),s=i(s,function(e,t){var i;return i=r&&"function"==typeof r?r.call(this,e.cells[n],t.cells[n]):r&&"number"==typeof r?1:r&&"string"==typeof r&&u[r]?u[r].call(this,e.cells[n],t.cells[n]):u.orderbyasc.call(this,e.cells[n],t.cells[n])});for(var h=t.ownerDocument.createDocumentFragment(),f=0,c=s.length;f<c;f++)h.appendChild(s[f]);var p=t.getElementsByTagName("tbody")[0];o?p.insertBefore(h,a[o-range.endRowIndex+range.beginRowIndex-1]):p.appendChild(h)}function i(e,t){t=t||function(e,t){return e.localeCompare(t)};for(var n=0,i=e.length;n<i;n++)for(var r=n,a=e.length;r<a;r++)if(t(e[n],e[r])>0){var s=e[n];e[n]=e[r],e[r]=s}return e}function r(t){if(!e.hasClass(t.rows[0],"firstRow")){for(var n=1;n<t.rows.length;n++)e.removeClass(t.rows[n],"firstRow");e.addClass(t.rows[0],"firstRow")}}var a=this,s=this.root,l=s.getElementsByTagName("table");if(l.length){var o=this.selector;e.cssRule("table",o+" table.noBorderTable td,"+o+" table.noBorderTable th,"+o+" table.noBorderTable caption{border:1px dashed #ddd !important}"+o+" table.sortEnabled tr.firstRow th,"+o+" table.sortEnabled tr.firstRow td{padding-right:20px; background-repeat: no-repeat;background-position: center right; background-image:url("+this.rootPath+"themes/default/images/sortable.png);}"+o+" table.sortEnabled tr.firstRow th:hover,"+o+" table.sortEnabled tr.firstRow td:hover{background-color: #EEE;}"+o+" table{margin-bottom:10px;border-collapse:collapse;display:table;}"+o+" td,"+o+" th{ background:white; padding: 5px 10px;border: 1px solid #DDD;}"+o+" caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}"+o+" th{border-top:1px solid #BBB;background:#F7F7F7;}"+o+" table tr.firstRow th{border-top:2px solid #BBB;background:#F7F7F7;}"+o+" tr.ue-table-interlace-color-single td{ background: #fcfcfc; }"+o+" tr.ue-table-interlace-color-double td{ background: #f7faff; }"+o+" td p{margin:0;padding:0;}",document),e.each("td th caption".split(" "),function(t){var n=s.getElementsByTagName(t);n.length&&e.each(n,function(e){e.firstChild||(e.innerHTML="&nbsp;")})});var l=s.getElementsByTagName("table");e.each(l,function(i){/\bsortEnabled\b/.test(i.className)&&e.on(i,"click",function(i){var s=i.target||i.srcElement,l=t(s,["td","th"]),o=t(s,"table"),d=e.indexOf(o.rows[0].cells,l),c=o.getAttribute("data-sort-type");d!=-1&&(n(o,d,a.tableSortCompareFn||c),r(o))})})}}),UE.parse.register("charts",function(e){function t(){return f?n(f):null}function n(e){for(var t,n=[],r=e.getElementsByTagName("table"),a=0;t=r[a];a++)null!==t.getAttribute("data-chart")&&n.push(i(t));return n.length?n:null}function i(e){for(var t,n=e.getAttribute("data-chart"),i={},r=[],a=0;t=e.rows[a];a++){for(var s,l=[],o=0;s=t.cells[o];o++){var d=s.innerText||s.textContent||"";l.push("TH"==s.tagName?d:0|d)}r.push(l)}n=n.split(";");for(var c,a=0;c=n[a];a++)c=c.split(":"),i[c[0]]=c[1];return{table:e,meta:i,data:r}}function r(){a()}function a(){window.jQuery?s():e.loadFile(document,{src:h+"/third-party/jquery-1.10.2.min.js",tag:"script",type:"text/javascript",defer:"defer"},function(){s()})}function s(){window.Highcharts?l():e.loadFile(document,{src:h+"/third-party/highcharts/highcharts.js",tag:"script",type:"text/javascript",defer:"defer"},function(){l()})}function l(){e.loadFile(document,{src:h+"/dialogs/charts/chart.config.js",tag:"script",type:"text/javascript",defer:"defer"},function(){o()})}function o(){for(var e=null,t=null,n=null,i=0,r=p.length;i<r;i++)e=p[i],t=u(e),n=c(e.table),d(n,typeConfig[e.meta.chartType],t)}function d(e,t,n){$(e).highcharts($.extend({},t,{credits:{enabled:!1},exporting:{enabled:!1},title:{text:n.title,x:-20},subtitle:{text:n.subTitle,x:-20},xAxis:{title:{text:n.xTitle},categories:n.categories},yAxis:{title:{text:n.yTitle},plotLines:[{value:0,width:1,color:"#808080"}]},tooltip:{enabled:!0,valueSuffix:n.suffix},legend:{layout:"vertical",align:"right",verticalAlign:"middle",borderWidth:1},series:n.series}))}function c(e){var t=document.createElement("div");return t.className="edui-chart-container",e.parentNode.replaceChild(t,e),t}function u(e){var t=[],n=[],i=[],r=e.data,a=e.meta;if("1"!=a.dataFormat){for(var s=0,l=r.length;s<l;s++)for(var o=0,d=r[s].length;o<d;o++)i[o]||(i[o]=[]),i[o][s]=r[s][o];r=i}if(i={},a.chartType!=typeConfig.length-1){n=r[0].slice(1);for(var c,s=1;c=r[s];s++)t.push({name:c[0],data:c.slice(1)});i.series=t,i.categories=n,i.title=a.title,i.subTitle=a.subTitle,i.xTitle=a.xTitle,i.yTitle=a.yTitle,i.suffix=a.suffix}else{for(var c=[],s=1,l=r[0].length;s<l;s++)c.push([r[0][s],0|r[1][s]]);t[0]={type:"pie",name:a.tip,data:c},i.series=t,i.title=a.title,i.suffix=a.suffix}return i}e.cssRule("chartsContainerHeight",".edui-chart-container { height:"+(this.chartContainerHeight||300)+"px}");var h=this.rootPath,f=this.root,p=null;h&&(p=t())&&r()}),UE.parse.register("background",function(e){for(var t,n,i=this,r=i.root,a=r.getElementsByTagName("p"),s=0;n=a[s++];)t=n.getAttribute("data-background"),t&&n.parentNode.removeChild(n);t&&e.cssRule("ueditor_background",i.selector+"{"+t+"}",document)}),UE.parse.register("list",function(e){function t(t){var r=this;e.each(t,function(t){if(t.className&&/custom_/i.test(t.className)){var a=t.className.match(/custom_(\w+)/)[1];if("dash"==a||"dot"==a)e.pushItem(n,l+" li.list-"+i[a]+"{background-image:url("+r.liiconpath+i[a]+".gif)}"),e.pushItem(n,l+" ul.custom_"+a+"{list-style:none;} "+l+" ul.custom_"+a+" li{background-position:0 3px;background-repeat:no-repeat}");else{var s=1;e.each(t.childNodes,function(t){"LI"==t.tagName&&(e.pushItem(n,l+" li.list-"+i[a]+s+"{background-image:url("+r.liiconpath+"list-"+i[a]+s+".gif)}"),s++)}),e.pushItem(n,l+" ol.custom_"+a+"{list-style:none;}"+l+" ol.custom_"+a+" li{background-position:0 3px;background-repeat:no-repeat}")}switch(a){case"cn":e.pushItem(n,l+" li.list-"+a+"-paddingleft-1{padding-left:25px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-2{padding-left:40px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-3{padding-left:55px}");break;case"cn1":e.pushItem(n,l+" li.list-"+a+"-paddingleft-1{padding-left:30px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-2{padding-left:40px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-3{padding-left:55px}");break;case"cn2":e.pushItem(n,l+" li.list-"+a+"-paddingleft-1{padding-left:40px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-2{padding-left:55px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-3{padding-left:68px}");break;case"num":case"num1":e.pushItem(n,l+" li.list-"+a+"-paddingleft-1{padding-left:25px}");break;case"num2":e.pushItem(n,l+" li.list-"+a+"-paddingleft-1{padding-left:35px}"),e.pushItem(n,l+" li.list-"+a+"-paddingleft-2{padding-left:40px}");break;case"dash":e.pushItem(n,l+" li.list-"+a+"-paddingleft{padding-left:35px}");break;case"dot":e.pushItem(n,l+" li.list-"+a+"-paddingleft{padding-left:20px}")}}})}var n=[],i={cn:"cn-1-",cn1:"cn-2-",cn2:"cn-3-",num:"num-1-",num1:"num-2-",num2:"num-3-",dash:"dash",dot:"dot"};e.extend(this,{liiconpath:"http://bs.baidu.com/listicon/",listDefaultPaddingLeft:"20"});var r=this.root,a=r.getElementsByTagName("ol"),s=r.getElementsByTagName("ul"),l=this.selector;a.length&&t.call(this,a),s.length&&t.call(this,s),(a.length||s.length)&&(n.push(l+" .list-paddingleft-1{padding-left:0}"),n.push(l+" .list-paddingleft-2{padding-left:"+this.listDefaultPaddingLeft+"px}"),n.push(l+" .list-paddingleft-3{padding-left:"+2*this.listDefaultPaddingLeft+"px}"),e.cssRule("list",l+" ol,"+l+" ul{margin:0;padding:0;}li{clear:both;}"+n.join("\n"),document))}),UE.parse.register("vedio",function(e){var t=this.root.getElementsByTagName("video"),n=this.root.getElementsByTagName("audio");if(document.createElement("video"),document.createElement("audio"),t.length||n.length){var i=e.removeLastbs(this.rootPath),r=i+"/third-party/video-js/video.js",a=i+"/third-party/video-js/video-js.min.css",s=i+"/third-party/video-js/video-js.swf";window.videojs?videojs.autoSetup():(e.loadFile(document,{id:"video_css",tag:"link",rel:"stylesheet",type:"text/css",href:a}),e.loadFile(document,{id:"video_js",src:r,tag:"script",type:"text/javascript"},function(){videojs.options.flash.swf=s,videojs.autoSetup()}))}})}();ef : cssurl
            });
            utils.loadFile(document,{
                id : "syntaxhighlighter_js",
                src : jsurl,
                tag : "script",
                type : "text/javascript",
                defer : "defer"
            },function(){
                utils.each(pres,function(pi){
                    if(pi && /brush/i.test(pi.className)){
                        SyntaxHighlighter.highlight(pi);
                    }
                });
            });
        }else{
            utils.each(pres,function(pi){
                if(pi && /brush/i.test(pi.className)){
                    SyntaxHighlighter.highlight(pi);
                }
            });
        }
    }

});
UE.parse.register('table', function (utils) {
    var me = this,
        root = this.root,
        tables = root.getElementsByTagName('table');
    if (tables.length) {
        var selector = this.selector;
        //追加默认的表格样式
        utils.cssRule('table',
            selector + ' table.noBorderTable td,' +
                selector + ' table.noBorderTable th,' +
                selector + ' table.noBorderTable caption{border:1px dashed #ddd !important}' +
                selector + ' table.sortEnabled tr.firstRow th,' + selector + ' table.sortEnabled tr.firstRow td{padding-right:20px; background-repeat: no-repeat;' +
                    'background-position: center right; background-image:url(' + this.rootPath + 'themes/default/images/sortable.png);}' +
                selector + ' table.sortEnabled tr.firstRow th:hover,' + selector + ' table.sortEnabled tr.firstRow td:hover{background-color: #EEE;}' +
                selector + ' table{margin-bottom:10px;border-collapse:collapse;display:table;}' +
                selector + ' td,' + selector + ' th{ background:white; padding: 5px 10px;border: 1px solid #DDD;}' +
                selector + ' caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}' +
                selector + ' th{border-top:1px solid #BBB;background:#F7F7F7;}' +
                selector + ' table tr.firstRow th{border-top:2px solid #BBB;background:#F7F7F7;}' +
                selector + ' tr.ue-table-interlace-color-single td{ background: #fcfcfc; }' +
                selector + ' tr.ue-table-interlace-color-double td{ background: #f7faff; }' +
                selector + ' td p{margin:0;padding:0;}',
            document);
        //填充空的单元格

        utils.each('td th caption'.split(' '), function (tag) {
            var cells = root.getElementsByTagName(tag);
            cells.length && utils.each(cells, function (node) {
                if (!node.firstChild) {
                    node.innerHTML = '&nbsp;';

                }
            })
        });

        //表格可排序
        var tables = root.getElementsByTagName('table');
        utils.each(tables, function (table) {
            if (/\bsortEnabled\b/.test(table.className)) {
                utils.on(table, 'click', function(e){
                    var target = e.target || e.srcElement,
                        cell = findParentByTagName(target, ['td', 'th']);
                    var table = findParentByTagName(target, 'table'),
                        colIndex = utils.indexOf(table.rows[0].cells, cell),
                        sortType = table.getAttribute('data-sort-type');
                    if(colIndex != -1) {
                        sortTable(table, colIndex, me.tableSortCompareFn || sortType);
                        updateTable(table);
                    }
                });
            }
        });

        //按照标签名查找父节点
        function findParentByTagName(target, tagNames) {
            var i, current = target;
            tagNames = utils.isArray(tagNames) ? tagNames:[tagNames];
            while(current){
                for(i = 0;i < tagNames.length; i++) {
                    if(current.tagName == tagNames[i].toUpperCase()) return current;
                }
                current = current.parentNode;
            }
            return null;
        }
        //表格排序
        function sortTable(table, sortByCellIndex, compareFn) {
            var rows = table.rows,
                trArray = [],
                flag = rows[0].cells[0].tagName === "TH",
                lastRowIndex = 0;

            for (var i = 0,len = rows.length; i < len; i++) {
                trArray[i] = rows[i];
            }

            var Fn = {
                'reversecurrent': function(td1,td2){
                    return 1;
                },
                'orderbyasc': function(td1,td2){
                    var value1 = td1.innerText||td1.textContent,
                        value2 = td2.innerText||td2.textContent;
                    return value1.localeCompare(value2);
                },
                'reversebyasc': function(td1,td2){
                    var value1 = td1.innerHTML,
                        value2 = td2.innerHTML;
                    return value2.localeCompare(value1);
                },
                'orderbynum': function(td1,td2){
                    var value1 = td1[utils.isIE ? 'innerText':'textContent'].match(/\d+/),
                        value2 = td2[utils.isIE ? 'innerText':'textContent'].match(/\d+/);
                    if(value1) value1 = +value1[0];
                    if(value2) value2 = +value2[0];
                    return (value1||0) - (value2||0);
                },
                'reversebynum': function(td1,td2){
                    var value1 = td1[utils.isIE ? 'innerText':'textContent'].match(/\d+/),
                        value2 = td2[utils.isIE ? 'innerText':'textContent'].match(/\d+/);
                    if(value1) value1 = +value1[0];
                    if(value2) value2 = +value2[0];
                    return (value2||0) - (value1||0);
                }
            };

            //对表格设置排序的标记data-sort-type
            table.setAttribute('data-sort-type', compareFn && typeof compareFn === "string" && Fn[compareFn] ? compareFn:'');

            //th不参与排序
            flag && trArray.splice(0, 1);
            trArray = sort(trArray,function (tr1, tr2) {
                var result;
                if (compareFn && typeof compareFn === "function") {
                    result = compareFn.call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                } else if (compareFn && typeof compareFn === "number") {
                    result = 1;
                } else if (compareFn && typeof compareFn === "string" && Fn[compareFn]) {
                    result = Fn[compareFn].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                } else {
                    result = Fn['orderbyasc'].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
                }
                return result;
            });
            var fragment = table.ownerDocument.createDocumentFragment();
            for (var j = 0, len = trArray.length; j < len; j++) {
                fragment.appendChild(trArray[j]);
            }
            var tbody = table.getElementsByTagName("tbody")[0];
            if(!lastRowIndex){
                tbody.appendChild(fragment);
            }else{
                tbody.insertBefore(fragment,rows[lastRowIndex- range.endRowIndex + range.beginRowIndex - 1])
            }
        }
        //冒泡排序
        function sort(array, compareFn){
            compareFn = compareFn || function(item1, item2){ return item1.localeCompare(item2);};
            for(var i= 0,len = array.length; i<len; i++){
                for(var j = i,length = array.length; j<length; j++){
                    if(compareFn(array[i], array[j]) > 0){
                        var t = array[i];
                        array[i] = array[j];
                        array[j] = t;
                    }
                }
            }
            return array;
        }
        //更新表格
        function updateTable(table) {
            //给第一行设置firstRow的样式名称,在排序图标的样式上使用到
            if(!utils.hasClass(table.rows[0], "firstRow")) {
                for(var i = 1; i< table.rows.length; i++) {
                    utils.removeClass(table.rows[i], "firstRow");
                }
                utils.addClass(table.rows[0], "firstRow");
            }
        }
    }
});
UE.parse.register('charts',function( utils ){

    utils.cssRule('chartsContainerHeight','.edui-chart-container { height:'+(this.chartContainerHeight||300)+'px}');
    var resourceRoot = this.rootPath,
        containers = this.root,
        sources = null;

    //不存在指定的根路径， 则直接退出
    if ( !resourceRoot ) {
        return;
    }

    if ( sources = parseSources() ) {

        loadResources();

    }


    function parseSources () {

        if ( !containers ) {
            return null;
        }

        return extractChartData( containers );

    }

    /**
     * 提取数据
     */
    function extractChartData ( rootNode ) {

        var data = [],
            tables = rootNode.getElementsByTagName( "table" );

        for ( var i = 0, tableNode; tableNode = tables[ i ]; i++ ) {

            if ( tableNode.getAttribute( "data-chart" ) !== null ) {

                data.push( formatData( tableNode ) );

            }

        }

        return data.length ? data : null;

    }

    function formatData ( tableNode ) {

        var meta = tableNode.getAttribute( "data-chart" ),
            metaConfig = {},
            data = [];

        //提取table数据
        for ( var i = 0, row; row = tableNode.rows[ i ]; i++ ) {

            var rowData = [];

            for ( var j = 0, cell; cell = row.cells[ j ]; j++ ) {

                var value = ( cell.innerText || cell.textContent || '' );
                rowData.push( cell.tagName == 'TH' ? value:(value | 0) );

            }

            data.push( rowData );

        }

        //解析元信息
        meta = meta.split( ";" );
        for ( var i = 0, metaData; metaData = meta[ i ]; i++ ) {

            metaData = metaData.split( ":" );
            metaConfig[ metaData[ 0 ] ] = metaData[ 1 ];

        }


        return {
            table: tableNode,
            meta: metaConfig,
            data: data
        };

    }

    //加载资源
    function loadResources () {

        loadJQuery();

    }

    function loadJQuery () {

        //不存在jquery， 则加载jquery
        if ( !window.jQuery ) {

            utils.loadFile(document,{
                src : resourceRoot + "/third-party/jquery-1.10.2.min.js",
                tag : "script",
                type : "text/javascript",
                defer : "defer"
            },function(){

                loadHighcharts();

            });

        } else {

            loadHighcharts();

        }

    }

    function loadHighcharts () {

        //不存在Highcharts， 则加载Highcharts
        if ( !window.Highcharts ) {

            utils.loadFile(document,{
                src : resourceRoot + "/third-party/highcharts/highcharts.js",
                tag : "script",
                type : "text/javascript",
                defer : "defer"
            },function(){

                loadTypeConfig();

            });

        } else {

            loadTypeConfig();

        }

    }

    //加载图表差异化配置文件
    function loadTypeConfig () {

        utils.loadFile(document,{
            src : resourceRoot + "/dialogs/charts/chart.config.js",
            tag : "script",
            type : "text/javascript",
            defer : "defer"
        },function(){

            render();

        });

    }

    //渲染图表
    function render () {

        var config = null,
            chartConfig = null,
            container = null;

        for ( var i = 0, len = sources.length; i < len; i++ ) {

            config = sources[ i ];

            chartConfig = analysisConfig( config );

            container = createContainer( config.table );

            renderChart( container, typeConfig[ config.meta.chartType ], chartConfig );

        }


    }

    /**
     * 渲染图表
     * @param container 图表容器节点对象
     * @param typeConfig 图表类型配置
     * @param config 图表通用配置
     * */
    function renderChart ( container, typeConfig, config ) {


        $( container ).highcharts( $.extend( {}, typeConfig, {

            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: config.title,
                x: -20 //center
            },
            subtitle: {
                text: config.subTitle,
                x: -20
            },
            xAxis: {
                title: {
                    text: config.xTitle
                },
                categories: config.categories
            },
            yAxis: {
                title: {
                    text: config.yTitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                enabled: true,
                valueSuffix: config.suffix
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 1
            },
            series: config.series

        } ));

    }

    /**
     * 创建图表的容器
     * 新创建的容器会替换掉对应的table对象
     * */
    function createContainer ( tableNode ) {

        var container = document.createElement( "div" );
        container.className = "edui-chart-container";

        tableNode.parentNode.replaceChild( container, tableNode );

        return container;

    }

    //根据config解析出正确的类别和图表数据信息
    function analysisConfig ( config ) {

        var series = [],
        //数据类别
            categories = [],
            result = [],
            data = config.data,
            meta = config.meta;

        //数据对齐方式为相反的方式， 需要反转数据
        if ( meta.dataFormat != "1" ) {

            for ( var i = 0, len = data.length; i < len ; i++ ) {

                for ( var j = 0, jlen = data[ i ].length; j < jlen; j++ ) {

                    if ( !result[ j ] ) {
                        result[ j ] = [];
                    }

                    result[ j ][ i ] = data[ i ][ j ];

                }

            }

            data = result;

        }

        result = {};

        //普通图表
        if ( meta.chartType != typeConfig.length - 1 ) {

            categories = data[ 0 ].slice( 1 );

            for ( var i = 1, curData; curData = data[ i ]; i++ ) {
                series.push( {
                    name: curData[ 0 ],
                    data: curData.slice( 1 )
                } );
            }

            result.series = series;
            result.categories = categories;
            result.title = meta.title;
            result.subTitle = meta.subTitle;
            result.xTitle = meta.xTitle;
            result.yTitle = meta.yTitle;
            result.suffix = meta.suffix;

        } else {

            var curData = [];

            for ( var i = 1, len = data[ 0 ].length; i < len; i++ ) {

                curData.push( [ data[ 0 ][ i ], data[ 1 ][ i ] | 0 ] );

            }

            //饼图
            series[ 0 ] = {
                type: 'pie',
                name: meta.tip,
                data: curData
            };

            result.series = series;
            result.title = meta.title;
            result.suffix = meta.suffix;

        }

        return result;

    }

});
UE.parse.register('background', function (utils) {
    var me = this,
        root = me.root,
        p = root.getElementsByTagName('p'),
        styles;

    for (var i = 0,ci; ci = p[i++];) {
        styles = ci.getAttribute('data-background');
        if (styles){
            ci.parentNode.removeChild(ci);
        }
    }

    //追加默认的表格样式
    styles && utils.cssRule('ueditor_background', me.selector + '{' + styles + '}', document);
});
UE.parse.register('list',function(utils){
    var customCss = [],
        customStyle = {
            'cn'    :   'cn-1-',
            'cn1'   :   'cn-2-',
            'cn2'   :   'cn-3-',
            'num'   :   'num-1-',
            'num1'  :   'num-2-',
            'num2'  :   'num-3-',
            'dash'  :   'dash',
            'dot'   :   'dot'
        };


    utils.extend(this,{
        liiconpath : 'http://bs.baidu.com/listicon/',
        listDefaultPaddingLeft : '20'
    });

    var root = this.root,
        ols = root.getElementsByTagName('ol'),
        uls = root.getElementsByTagName('ul'),
        selector = this.selector;

    if(ols.length){
        applyStyle.call(this,ols);
    }

    if(uls.length){
        applyStyle.call(this,uls);
    }

    if(ols.length || uls.length){
        customCss.push(selector +' .list-paddingleft-1{padding-left:0}');
        customCss.push(selector +' .list-paddingleft-2{padding-left:'+ this.listDefaultPaddingLeft+'px}');
        customCss.push(selector +' .list-paddingleft-3{padding-left:'+ this.listDefaultPaddingLeft*2+'px}');

        utils.cssRule('list', selector +' ol,'+selector +' ul{margin:0;padding:0;}li{clear:both;}'+customCss.join('\n'), document);
    }
    function applyStyle(nodes){
        var T = this;
        utils.each(nodes,function(list){
            if(list.className && /custom_/i.test(list.className)){
                var listStyle = list.className.match(/custom_(\w+)/)[1];
                if(listStyle == 'dash' || listStyle == 'dot'){
                    utils.pushItem(customCss,selector +' li.list-' + customStyle[listStyle] + '{background-image:url(' + T.liiconpath +customStyle[listStyle]+'.gif)}');
                    utils.pushItem(customCss,selector +' ul.custom_'+listStyle+'{list-style:none;} '+ selector +' ul.custom_'+listStyle+' li{background-position:0 3px;background-repeat:no-repeat}');

                }else{
                    var index = 1;
                    utils.each(list.childNodes,function(li){
                        if(li.tagName == 'LI'){
                            utils.pushItem(customCss,selector + ' li.list-' + customStyle[listStyle] + index + '{background-image:url(' + T.liiconpath  + 'list-'+customStyle[listStyle] +index + '.gif)}');
                            index++;
                        }
                    });
                    utils.pushItem(customCss,selector + ' ol.custom_'+listStyle+'{list-style:none;}'+selector+' ol.custom_'+listStyle+' li{background-position:0 3px;background-repeat:no-repeat}');
                }
                switch(listStyle){
                    case 'cn':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-1{padding-left:25px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-2{padding-left:40px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-3{padding-left:55px}');
                        break;
                    case 'cn1':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-1{padding-left:30px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-2{padding-left:40px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-3{padding-left:55px}');
                        break;
                    case 'cn2':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-1{padding-left:40px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-2{padding-left:55px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-3{padding-left:68px}');
                        break;
                    case 'num':
                    case 'num1':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-1{padding-left:25px}');
                        break;
                    case 'num2':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-1{padding-left:35px}');
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft-2{padding-left:40px}');
                        break;
                    case 'dash':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft{padding-left:35px}');
                        break;
                    case 'dot':
                        utils.pushItem(customCss,selector + ' li.list-'+listStyle+'-paddingleft{padding-left:20px}');
                }
            }
        });
    }


});
UE.parse.register('vedio',function(utils){
    var video = this.root.getElementsByTagName('video'),
        audio = this.root.getElementsByTagName('audio');

    document.createElement('video');document.createElement('audio');
    if(video.length || audio.length){
        var sourcePath = utils.removeLastbs(this.rootPath),
            jsurl = sourcePath + '/third-party/video-js/video.js',
            cssurl = sourcePath + '/third-party/video-js/video-js.min.css',
            swfUrl = sourcePath + '/third-party/video-js/video-js.swf';

        if(window.videojs) {
            videojs.autoSetup();
        } else {
            utils.loadFile(document,{
                id : "video_css",
                tag : "link",
                rel : "stylesheet",
                type : "text/css",
                href : cssurl
            });
            utils.loadFile(document,{
                id : "video_js",
                src : jsurl,
                tag : "script",
                type : "text/javascript"
            },function(){
                videojs.options.flash.swf = swfUrl;
                videojs.autoSetup();
            });
        }

    }
});

})();
