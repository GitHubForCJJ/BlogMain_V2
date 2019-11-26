// 对象合并
layui.define(function(exports){
    /**
     * 对象合并(后不修改前,无递归)
     * @param obj Object|Null Null时新建{}
     * @param extN Object|Null ... 多个参数 扩展数据,重复key不修改之前的
     * @return Object 参数obj或obj非对象时新的{}
     */
    exports('ext', function(obj, extN){
        // if(typeof obj!=='object') obj = {};
        if(!obj || typeof obj!=='object') obj = {};
        var args = Array.prototype.slice.call(arguments, 1);
        for(var i=0,ext,k; i<args.length; i++){
            ext = args[i];
            for(k in ext){
                if(!ext.hasOwnProperty(k)) continue;
                // if(!(k in obj)) obj[k] = ext[k];
                if(obj[k] === undefined) obj[k] = ext[k];
            }
        }
        return obj;
    });
});
