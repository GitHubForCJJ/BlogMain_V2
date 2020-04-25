
layui.define(['zTree', 'jquery', 'GHM', 'form'], function (exports) {
    var zTree = layui.zTree,
      $ = layui.jquery,
      form = layui.form,
      GHM = layui.GHM;
  
    var $operate = $('#LAY-MenuMana-operate');
    var $header = $('#LAY-MenuMana-header');
    var $save = $('#LAY-MenuMana-save');
    var $FatherID = $('#LAY-MenuMana-FatherID');
    var zTreeObj;
    var newCount = 1;
    var setting = {
      view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
      },
      edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,
        showRenameBtn: false
      },
      data: {
        key: {
          name: 'MenuName'
        },
        simpleData: {
          enable: true,
          idKey: 'KID',
          pIdKey: 'FatherID'
        }
      },
      callback: {
        beforeRemove: beforeRemove,
        onClick: onClick
      }
    };
    var zNodes = [];
  
    // 初始化
    clearForm();
    initTree();
  
    // 获取菜单列表
    function initTree() {
      GHM.post(GHM_config.url.GetAllMenuDataList).then(function (res) {
        zNodes = res.Data;
        zNodes.push({KID:0,MenuName:'菜单管理'})
        for(var i in zNodes){
          zNodes[i].open = true;
        }
        
        zTreeObj = zTree.init($('#LAY-MenuMana-Tree'), setting, zNodes);
      }).catch(function (error) {
        if(error.Msg) layer.msg(error.Msg);
        else layer.msg('菜单列表获取失败！');
      });
    }
  
    // 鼠标移入事件
    function addHoverDom(treeId, treeNode) {
      var sObj = $('#' + treeNode.tId + '_span');
      if (treeNode.editNameFlag || $('#addBtn_' + treeNode.tId).length > 0) return;
      var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='add node' onfocus='this.blur();'></span>";
      sObj.after(addStr);
      var btn = $('#addBtn_' + treeNode.tId);
      //添加节点
      if (btn) btn.bind('click', function () {
        // 添加操作
        $('input[name=MenuName]').focus();
        $operate.val('add');
        clearForm();
        reForm();
        $FatherID.val(treeNode.KID);
  
        return false;
      });
    }
  
    // 鼠标移出事件
    function removeHoverDom(treeId, treeNode) {
      $('#addBtn_' + treeNode.tId).unbind().remove();
    }
  
    // 是否显示删除按钮
    function showRemoveBtn(treeId, treeNode) {
      return treeNode.KID != 0;
    }
  
    // 删除前
    function beforeRemove(treeId, treeNode, isdelcallback) {
      var zTree = $.fn.zTree.getZTreeObj('LAY-MenuMana-Tree');
      zTree.selectNode(treeNode);
  
      if(treeNode.children){
        layer.msg('该菜单下有子菜单，不能删除！');
        return false;
      }
      if (isdelcallback == 1) {
        $('#' + treeNode.tId).remove();
        var data = {};
        data.kid = treeNode.KID;
        if (data.kid) {
          GHM.post(GHM_config.url.DelItemMenuByKid, { Data: JSON.stringify(data) }).then(function () {
            initTree();
            layer.msg('删除成功');
          })
        }
      } else {
        layer.confirm('确认删除 菜单 -- ' + treeNode.MenuName + ' 吗？', {
          btn: ['确认', '取消']
        }, function () {
          //执行删除操作
          beforeRemove(treeId, treeNode, 1);
          layer.closeAll();
        });
        return false;
      }
    }
  
    // 点击node
    function onClick(event, treeId, treeNode, clickFlag) {
      $operate.val('edit');
      reForm();
      if (treeNode.KID == 0) {
        layer.msg('顶级目录不允许编辑');
        clearForm();
        return;
      }
      $('input[name="MenuName"]').val(treeNode.MenuName);
      $('input[name="KID"]').val(treeNode.KID);
      $('input[name="MenuIco"]').val(treeNode.MenuIco);
      $('input[name="MenuUrl"]').val(treeNode.MenuUrl);
      $('input[name="MenuSort"]').val(treeNode.MenuSort);
      $('input[name="MenuMsg"]').val(treeNode.MenuMsg);
      $FatherID.val(treeNode.FatherID);
    }
  
    // 清空表单
    function clearForm() {
      $('input[name="MenuName"]').val('');
      $('input[name="KID"]').val('');
      $('input[name="MenuIco"]').val('');
      $('input[name="MenuUrl"]').val('');
      $('input[name="Back1"]').val('');
      $('input[name="MenuSort"]').val('');
      $('input[name="MenuMsg"]').val('');
      $save.addClass('layui-btn-disabled').attr('disabled', true);
    }
  
    // 重置表单样式
    function reForm() {
      var action = $operate.val();
      $save.removeClass('layui-btn-disabled').attr('disabled', false);
      if (action == 'edit') {
        $header.text('修改菜单');
        $save.text('立即修改');
      } else {
        $header.text('添加菜单');
        $save.text('立即添加');
      }
    }
  
    // 监听表单提交
    form.on('submit(LAY-MenuMana-save)', function (obj) {
      var action = $operate.val();
      if (action == 'add') {
        // 添加菜单
        var data = obj.field;
        data.KID = 0;
        GHM.post(GHM_config.url.AddItemMenu, { Data: JSON.stringify(data) }).then(function () {
          clearForm();
          initTree();
          layer.msg('添加成功！');
        }).catch(function (error) {
          if (error.Msg) layer.msg(error.Msg);
          else layer.msg('添加失败！');
        });
      } else {
        // 修改菜单
        var data = {};
        data.kid = obj.field.KID;
        data.update = obj.field;
        GHM.post(GHM_config.url.UpdateItemMenu, { Data: JSON.stringify(data) }).then(function () {
          clearForm();
          initTree();
          layer.msg('修改成功！');
        }).catch(function (error) {
          if (error.Msg) layer.msg(error.Msg);
          else { layer.msg('修改失败！') };
        });
      }
    })
  
    exports('menuManage', {})
  })