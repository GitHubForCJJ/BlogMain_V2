/* 
  日志业务逻辑
  参数：
  url(string):请求地址
  data(object):请求数据
*/
layui.define(['table', 'jquery', 'GHM'], function (exports) {
  var $ = layui.$,
    table = layui.table,
    GHM = layui.GHM;
  var GHM_log = function (url, data, cols) {
    var defaultCols = [[
      { field: 'CreateUserName', title: '操作人', align: 'center', width: 220 },
      { field: 'CreateTime', title: '操作时间', align: 'center', width: 220 },
      { field: 'OperContent', title: '操作内容' },
    ]];
    cols = cols || defaultCols;
    // 渲染数据
    table.render({
      elem: '#LAY-log-manage'
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

    // 监听排序
    table.on('sort(LAY-log-manage)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var ascdesc = "asc";
      if (obj.type == "desc") {
        ascdesc = "desc";
      }
      var field = {};
      field.orderby = obj.field + " " + ascdesc;
      table.reload('LAY-log-manage', {
        initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
        , where: GHM.PwdData({ Data: JSON.stringify(field) })
        , page: {
          curr: 1 //重新从第 1 页开始
        }
      });
      $(".layui-table-box .layui-table-fixed").remove();
    });
  }


  exports('GHM_log', GHM_log);
})