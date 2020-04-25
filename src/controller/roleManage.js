layui.define((['form', 'table', 'GHM', 'admin', 'view', 'laypage']), function (exports) {
    var laytpl = layui.laytpl,
      admin = layui.admin,
      view = layui.view,
      GHM = layui.GHM,
      $ = layui.$,
      table = layui.table,
      laypage = layui.laypage,
      form = layui.form;
  
    //表格初始化
    form.render();
  
    // 数据初始化
    table.render({
      elem: '#LAY_RoleManage_table'
      , url: GHM_config.url.GetListRole //模拟接口
      , method: 'post'
      , where: GHM.PwdData()
      , parseData: function (res) { //res 即为原始返回的数据
        res = GHM.UnPwdData(res);
        return {
          'code': res.Code,
          'data': res.Data,
          'msg': res.Msg,
          'count': res.Count
        }
      }
      , cols: [[
        { field: 'RoleName', title: '角色名称', align: 'center' }
        , { field: 'CreateTime', title: '添加时间', align:'center' }
        , { field: 'CreateUserName', title: '创建人', align: 'center' }
        , { title: '操作', width: 220, align: 'center', toolbar: '#table-roleManage-operation' }
      ]]
      , page: true
      , limit: 10
      , text: {
        none: '暂无数据'
      }
      , height: 676
    });
  
    //事件
    var actions = {
      // 新增
      add: function () {
        admin.popup({
          id: 'LAY-RoleManage-add',
          title: '添加角色',
          area: ['400px', '200px'],
          shadeClose:false,
          success: function () {
            view(this.id).render('roleManage/addOrEdit').done(function(){
              // 监听提交
              form.on('submit(LAY-RoleManage-add-submit)',function(obj){
                var field = obj.field;
                layer.msg('添加中...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false  //取消自动关闭
                });
                GHM.post(GHM_config.url.AddItemRole,{Data:JSON.stringify(field)}).then(function(res){
                  layer.closeAll();
                  layer.msg('添加成功！');
                  refresh();
                }).catch(function(error){
                  console.log(error);
                })
              })
            })
          }
        })
      }
    };
  
    // 事件绑定
    $(document).on('click','.LAY-btn-RoleManage',function(){
      var type = $(this).attr('data-type');
      actions[type] ? actions[type].call(this) : '';
    });
  
    // 刷新表格
    function refresh() {
      var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
      if (btnrefresh == null) {
        layui.table.reload('LAY_RoleManage_table');
      }
      else {
        btnrefresh.click();
      }
    };
  
    //监听排序
    table.on('sort(LAY_RoleManage_table)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var ascdesc = "asc";
      if (obj.type == "desc") {
        ascdesc = "desc";
      }
      var field = {};
      field.orderby = obj.field + " " + ascdesc;
      table.reload('LAY_RoleManage_table', {
        initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
        , where: GHM.PwdData({ Data: JSON.stringify(field) })
        , page: {
          curr: 1 //重新从第 1 页开始
        }
      });
      $(".layui-table-box .layui-table-fixed").remove();
    });
  
    //监听工具条
    table.on('tool(LAY_RoleManage_table)', function (obj) {
      var data = obj.data;
      var event = obj.event;
  
      if (event == 'edit') {
        //编辑
        admin.popup({
          id: 'LAY-RoleManage-add',
          title: '编辑角色',
          area: ['400px', '300px'],
          shadeClose:false,
          success: function () {
            //传入当前行的数据
            view(this.id).render('roleManage/addOrEdit', data).done(function () {
              // 监听提交
              form.on('submit(LAY-RoleManage-add-submit)', function (obj) {
                var field = {};
                field.update = {
                  RoleName: obj.field.RoleName,
                };
                field.kid = data.KID;
                var loadidx = layer.msg('修改中...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false  //取消自动关闭
                });
                GHM.post(GHM_config.url.UpdateItemRole, { Data: JSON.stringify(field) }).then(function () {
                  layer.closeAll();
                  refresh();
                }).catch(function (error) {
                  layer.closeAll();
                  var msg = '';
                  if (error.Msg) msg = error.Msg;
                  else msg = '修改失败，请重试！';
                  layer.msg(msg);
                })
              })
            })
          }
        })
      } else if (event == 'del') {
        // 删除
        layer.confirm('确定删除该角色？删除后所有授权了该角色的员工对应权限将回收哦！',{title:'删除角色'}, function (index) {
          layer.msg('删除中...', {
            icon: 16,
            shade: [0.5, '#000'],
            time: false  //取消自动关闭
          });
  
          var obj = {};
          obj.kid = data.KID;
          GHM.post(GHM_config.url.DeleteItemRole, { Data: JSON.stringify(obj) }).then(function () {
            layer.closeAll();
            refresh();
          }).catch(function (error) {
            layer.closeAll();
            var msg = '';
            if (error.Msg) msg = error.Msg;
            else msg = '删除失败，请重试！';
            layer.msg(msg);
          });
        })
      } else if (event == 'role') {
        // 授权
        admin.popup({
          id: 'LAY-RoleManage-setRole',
          title: '授权',
          area: ['400px', '600px'],
          shadeClose:false,
          success: function () {
            view(this.id).render('roleManage/setRole', data).done(function () {
              $('#LAY-RoleManage-setRole-submit').click(function () {
                var treeObj = $.fn.zTree.getZTreeObj("LAY-RoleManage-Tree");
                var nodes = treeObj.getCheckedNodes(true);
                var menuList = [];
                var obj = {};
  
                for (var i in nodes) {
                  menuList.push(nodes[i].KID);
                }
  
                obj.update = {
                  "MenuLst": menuList.join(',')
                };
                obj.kid = data.KID;
                layer.msg('授权中...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false  //取消自动关闭
                });
                var loadidx = layer.msg('授权中...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false  //取消自动关闭
                });
                GHM.post(GHM_config.url.UpdateItemRole, { Data: JSON.stringify(obj) }).then(function (res) {
                  layer.closeAll();
                  layer.msg('授权成功！');
                  refresh();
                }).catch(function (error) {
                  var msg = '';
                  if (error.msg) msg = error.msg;
                  else msg = '授权失败，请重试！';
                  layer.msg(msg);
                });
              })
            });
          }
        })
      }
    });
  
    // 监听查询
    form.on('submit(LAY-RoleManage-search)', function (data) {
      var field = {};
      // 时间默认值
      field.where = data.field;
      //执行重载
      table.reload('LAY_RoleManage_table', {
          where: GHM.PwdData({ Data: JSON.stringify(field) }),
          page: {
              curr: 1 //重新从第 1 页开始
          }
      });
      $(".layui-table-box .layui-table-fixed").remove();
  });
    exports('roleManage', {})
  });