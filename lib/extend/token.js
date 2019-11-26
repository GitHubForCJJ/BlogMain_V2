// token 管理
layui.define('setter',function (exports) {
    /**
     * token 管理
     * @param $val string|true|null string:记录token  true:取得token秘钥  null:取得token
     * @return string|null string:取得token|秘钥(无时为:'')  null:设置
     */
    exports('token', function(val) {
        var setter=layui.setter;
        if (val === true) {
            var token = layui.data(setter.tableName).token || '';
            if(!token) return '';
            var secret = '';
            for (var i = 0; i < token.length; i++) {
                if (i % 2) secret += token[i];
                if (secret.length === 8) break;
            }
            return secret;
        } else if (val) {
            //请求成功后，写入 token
            layui.data(setter.tableName, {
                key: setter.request.tokenName
                , value: val
            });
        } else return layui.data(setter.tableName).token || '';
        return null;
    });
});
