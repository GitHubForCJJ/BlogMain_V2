layui.define(['table', 'jquery', 'GHM'], function (exports) {
    var $ = layui.$,
      table = layui.table,
      GHM = layui.GHM;
      var statisByDay = function (url, data, cols) {
        // 渲染数据
        table.render({
            elem: '#LAY-statisByDay-manage'
          , url: url
          , method: 'post'
          , where: GHM.PwdData({ Data: JSON.stringify(data) })
          , parseData: function (res) { //res 即为原始返回的数据
            res = GHM.UnPwdData(res);
            console.log(res.Data);
            return {
              'code': res.Code,
              'data': res.Data,
              'msg': res.Msg,
              'count': res.Count
            }
          }
          , cols: cols
          , page: true
          , limit: 10
          , text: {
            none: '暂无数据'
          }
        });
    }
    exports('statisByDay',statisByDay);

});