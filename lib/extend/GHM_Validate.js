layui.define(['form'], function (exports) {
    var form = layui.form;

    // 自定义验证
    form.verify({
        // 非必填URL验证
        urlNotRe: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value) {
                var reg = /^(https?)+:\/\/[^\s]*$/;
                if (!reg.test(value)) {
                    return 'URL格式不正确';
                }
            }
        }
    })
    //对外暴露的接口
    exports('GHM_Validate', {});
})