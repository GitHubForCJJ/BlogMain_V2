/**

 @Name：layuiAdmin 会员管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */


layui.define(['table', 'form', 'element', 'GHM', 'admin', 'view', 'laydate'], function (exports) {
    var $ = layui.$,
      admin = layui.admin,
      view = layui.view,
      GHM = layui.GHM,
      $ = layui.$,
      table = layui.table,
      form = layui.form,
      laydate = layui.laydate,
      md5 = layui.md5;
  
          //所属学校下拉框渲染
          GHM.post(GHM_config.url.GetListSchool, {
            Data: '{}'
          }).then(function (res) {
            var companyid=JSON.parse(localStorage.getItem('GoAdmin')).Model.CompanyId;
            if(companyid==1){
                $.each(res.Data, function (index, val) {
                    var option = " <option  value='" + val.CompanyId + "'>" + val.SchoolName +
                      "</option>"
                    $("#CompanyId").append(option);
                  });             
            }
            else{
                $.each(res.Data, function (index, val) {
                    if(val.CompanyId==companyid){
                        var option = " <option  value='" + val.CompanyId + "'>" + val.SchoolName +
                        "</option>"
                      $("#CompanyId").append(option);
                    }
  
                  });      
            }
  
            form.render('select');
          }).catch(function (error) {
            var msg = '';
            console.log(error)
            if (error.Msg) msg = error.Msg;
            else msg = '执行失败，服务器未返回失败信息';
            layer.msg(msg);
          });
  
    //数据渲染加载
    table.render({
      elem: '#LAY-Member-manage',
      url: GHM_config.url.GetListMember //模拟接口
        ,
      method: 'post',
      where: GHM.PwdData(),
      parseData: function (res) { //res 即为原始返回的数据
        res = GHM.UnPwdData(res);
        return {
          'code': res.Code,
          'data': res.Data,
          'msg': res.Msg,
          'count': res.Count
        }
      },
      cols: [
        [{
          field: 'KID',
          width: 80,
          title: 'ID',
          sort: true,
          align: 'center'
        }, {
          field: 'UserName',
          width: 90,
          title: '姓名',
          align: 'center'
        }, {
          field: 'UserAccount',
          title: '账户',
          width: 120,
          align: 'center'
        }, {
          field: 'UserType',
          title: '会员类型',
          width: 90,
          templet: '#temp_Member_UserType',
          align: 'center'
        }, {
          field: 'AuthStates',
          title: '认证状态',
          width: 90,
          templet: '#temp_Member_AuthStates',
          align: 'center'
        }, {
          field: 'CreateTime',
          title: '注册时间',
          width: 160,
          align: 'center',
          sort: true
        }, {
          field: 'UserSpecialty',
          title: '学校信息',
          templet: '#temp_Member_UserSpecialty',
          align: 'center'
        }, {
          field: 'UserStudentId',
          title: '学号/身份证号',
          width: 180,
          templet: '#temp_Member_UserStudentId',
          align: 'center'
        }, {
          field: 'States',
          title: '状态',
          width: 110,
          templet: '#temp_Member_States',
          align: 'center'
        }, {
          field: 'CardImgs',
          title: '证件照片',
          minWidth: 150,
          align: 'center',
          templet: '#temp_Member_CardImgs'
        }, {
          title: '操作',
          width: 300,
          align: 'center',
          toolbar: '#table-Member-operation'
        }]
      ],
      page: true,
      limit: 10,
      text: {
        none: '暂无数据'
      },
      height: 676
    });
  
    //监听搜索
    form.on('submit(LAY-Member-search)', function (data) {
      var field = {};
      field.where = data.field;
     
      //执行重载
      table.reload('LAY-Member-manage', {
        where: GHM.PwdData({
          Data: JSON.stringify(field)
        }),
        page: {
          curr: 1 //重新从第 1 页开始
        }
      });
      $(".layui-table-box .layui-table-fixed").remove();
    });
  
    //监听排序
    table.on('sort(LAY-Member-manage)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var ascdesc = "asc";
      if (obj.type == "desc") {
        ascdesc = "desc";
      }
      var field = {};
      field.orderby = obj.field + " " + ascdesc;
      table.reload('LAY-Member-manage', {
        initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
          ,
        where: GHM.PwdData({
          Data: JSON.stringify(field)
        }),
        page: {
          curr: 1 //重新从第 1 页开始
        }
      });
      $(".layui-table-box .layui-table-fixed").remove();
    });
  
    //事件
    var active = {
      batchdel: function () {
          var checkStatus = table.checkStatus('LAY-Member-manage');
          //得到选中的数据
          var selectkids = "";
          for (var i = 0; i < checkStatus.data.length; i++) {
            selectkids += checkStatus.data[i].KID + ","
          }
          if (selectkids.length === 0) {
            return layer.msg('请选择数据');
          }
          layer.prompt({
            formType: 1,
            title: '敏感操作，请输入第一条数据【序号】验证操作'
          }, function (value, index) {
            if (value == checkStatus.data[0].KID) {
              layer.close(index);
  
              layer.confirm('确定批量删除吗？', function (index) {
                var loadidx = layer.msg('删除中...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false //取消自动关闭
                });
                //获取提交的字段
                var field = {};
                field.Id = selectkids;
                GHM.post(GHM_config.url.DelMembers, {
                  Data: JSON.stringify(field)
                }).then(function (res) {
                  layer.close(index); //执行关闭
                  layer.close(loadidx); //执行关闭
                  if (res.Code == 0) {
                    var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                    if (btnrefresh == null) {
                      layui.table.reload('LAY-Member-manage');
                    } else {
                      btnrefresh.click();
                    }
                  } else {
                    if (res.Msg == "") {
                      layer.msg("执行失败,服务器未返回原因");
                    } else {
                      layer.msg(res.Msg);
                    }
                  }
                }).catch(function (error) {
                  var msg = '';
                  if (error.Msg) msg = error.Msg;
                  else msg = '执行失败，服务器未返回失败信息';
                  layer.msg(msg);
                })
              });
            } else {
              layer.msg('口令错误,无法执行删除动作');
              layer.close(index);
            }
          });
        }
        //添加会员
        ,
      add: function () {
        admin.popup({
          title: '添加会员',
          skin: 'layui-layer-adminpop',
          shadeClose: false,
          area: (admin.screen() == 0 ? '99%' : '30%'),
          offset: '30px',
          success: function (layero, index) {
            view(this.id).render('member/edit', null).done(function () {
              laydate.render({
                elem: '#InCampusesTime',
                format: 'yyyy-MM-dd HH:mm:ss'
              });
              form.render(null, 'LAY-edit-Member-submit');
  
              //数据校验
              form.verify({
                UserAccount: function (value) {
                  if (value == "") {
                    return '会员账号为必填项';
                  } else if (value.length > 11) {
                    return '会员账号最多11位';
                  } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '会员账号不能有特殊字符';
                  } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '会员账号首尾不能出现下划线\'_\'';
                  } else if (!(/^1[345789]\d{9}$/.test(value))) {
                    return "请输入手机号"
                  }
                },
                UserName: function (value) {
                  if (value == "") {
                    return '学生姓名为必填项';
                  } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '学生姓名不能有特殊字符';
                  } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '学生姓名首尾不能出现下划线\'_\'';
                  }
                },
                UserSpecialty: function (value) {
                  if (value == "") {
                    return '专业为必填项';
                  } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '专业首尾不能出现下划线\'_\'';
                  }
                },
                UserStudentId: function (value) {
                  if (value == "") {
                    return '学生证为必填项';
                  } else if (value.length < 9) {
                    return '学生证最少9位';
                  }
                },
                UserCardNo: function (value) {
                  if (!GHM_Core.checkIDCard(value)) {
                    return '身份证格式输入有误';
                  } else if (value.length < 18 || value.length > 18) {
                    return '身份证长度有误';
                  }
                },
                InCampusesTime: function (value) {
                  if (value == "") {
                    return '请输入入学时间';
                  }
                },
                RePlaceId: function (value) {
                  if (value == "") {
                    return '请选择所属学校';
                  }
                },
                /** emel:function(value){
                  if (value == "") {
                    return '请选择所属学校';
                  }
                },*/
                UserPassword: function (value) {
                  if (value != '' && value.length < 6) {
                    return '账号密码最少6位';
                  }
                },
                unitName: function (value) {
                  if (value == "") {
                    return '请输入单位名称';
                  }
                },
                unitRefer:function(value){
                  if (value == "") {
                    return '请输入单位简称';
                  }
                },
                contacter:function(value){
                  if (value == "") {
                    return '请输入联系人';
                  }
                },
                contactPhone: function (value) {
                  if (value == "") {
                    return '请输入联系电话';
                  }else if (value.length > 11) {
                    return '会员账号最多11位';
                  } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                    return '会员账号不能有特殊字符';
                  } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                    return '手机号格式有误';
                  } else if (!(/^1[345789]\d{9}$/.test(value))) {
                    return "手机号格式有误"
                  }
                }
              });
              //监听提交
              form.on('submit(LAY-edit-Member-submit)', function (data) {
                var loadidx = layer.msg('添加中,请勿刷新页面...', {
                  icon: 16,
                  shade: [0.5, '#000'],
                  time: false //取消自动关闭
                });
                var filed = data.field;
                var data;
                if(filed.UserPassword == ""){
                    filed.UserPassword="888888";
                }
  
                filed.UserPassword = md5(filed.UserPassword, false, true);
                if (filed.imgFirst != "") {
                  filed.CardImgs = filed.imgFirst + "," + filed.imgLast
                } else {
                  filed.CardImgs = "," + filed.imgLast
                }
                if (filed.UserType == 1) {
                  data = JSON.stringify({
                    "UserAccount": filed.UserAccount,
                    "UserPassword": filed.UserPassword,
                    "UserType": filed.UserType,
                    'CompanyId': filed.CompanyId,
                    'Extend4': filed.Extend4
                  });
                } else if(filed.UserType == 2) {
                  //data = JSON.stringify(filed);
                  data=JSON.stringify({
                    "UserAccount": filed.UserAccount,
                    "UserPassword": filed.UserPassword,
                    "UserType": filed.UserType,
                    'CompanyId': filed.CompanyId,
                    'Extend4': filed.Extend4,
                    "UserName": filed.UserName,
                    "InCampusesTime": filed.InCampusesTime,
                    'UserSpecialty': filed.UserSpecialty,
                    'UserStudentId': filed.UserStudentId,
                    'UserCardNo':filed.UserCardNo,
                    'CardImgs':filed.CardImgs,
                  });
                }else if(filed.UserType == 3 || filed.UserType == 4){
                  if(filed.Extend4=="请选择"){
                    filed.Extend4=""
                  }
                  data = JSON.stringify({
                    "UserAccount": filed.UserAccount,
                    "UserPassword": filed.UserPassword,
                    "UserType": filed.UserType,
                    "CompanyId": filed.RePlaceId,
                    'Extend4': filed.Extend4,
                    "UserName": filed.unitName,
                    "UserNickName": filed.unitRefer,
                    'LinkMan': filed.contacter,
                    'UserPhone': filed.contactPhone,
                    'CompanyAddress':filed.AddressName,
                    'AddressId':filed.FullAddressId,
                    'DetailAddress':filed.detailMsg
                  });
                }
                console.log(data);
                GHM.post(GHM_config.url.AddItemMember, {
                  Data: data
                }).then(function (res) {
                  layer.close(loadidx);
                  if (res.Code == 0) {
                    layer.close(index); //执行关闭
                    layer.msg("添加成功");
                    var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                    if (btnrefresh == null) {
                      layui.table.reload('LAY-Member-manage');
                    } else {
                      btnrefresh.click();
                    }
                  } else {
                    if (res.Msg == "") {
                      layer.msg("执行失败,服务器未返回原因");
                    } else {
                      layer.msg(res.Msg);
                    }
                  }
                }).catch(function (error) {
                  var msg = '';
                  if (error.Msg) msg = error.Msg;
                  else msg = '执行失败，服务器未返回失败信息';
                  layer.msg(msg);
                });
              });
            });
          }
        })
      }
    };
  
    //事件注册
    $(document).on('click', '.layui-btn.layuiadmin-btn-Member', function () {
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  
    //监听工具条
    table.on('tool(LAY-Member-manage)', function (obj) {
      var data = obj.data;
      var kid = data.KID;
      if (obj.event == 'edit') {
        //编辑
        GHM.post(GHM_config.url.GetOneMember, {Data: JSON.stringify({"KID": kid})
        }).then(function (res) {
          data=res.Data;
          admin.popup({
            title: '编辑会员',
            skin: 'layui-layer-adminpop',
            shadeClose: false,
            area: (admin.screen() == 0 ? '99%' : '30%'),
            offset: '30px',
            success: function (layero, index) {
              //传入当前行的数据
              var imgs = data.CardImgs.split(',');
              if (imgs[0] != '') {
                data.imgFirst = imgs[0];
              }
              if (imgs[1] != '') {
                data.imgLast = imgs[1];
              }
              laydate.render({
                elem: '#InCampusesTime',
                format: 'yyyy-MM-dd HH:mm:ss'
              });
              view(this.id).render('member/edit', data).done(function () {
                laydate.render({
                  elem: '#InCampusesTime',
                  format: 'yyyy-MM-dd HH:mm:ss'
                });
                form.render(null, 'LAY-edit-Member-submit');
                //数据校验
                form.verify({
                  UserAccount: function (value) {
                    if (value == "") {
                      return '会员账号为必填项';
                    } else if (value.length > 11) {
                      return '会员账号最多11位';
                    } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                      return '会员账号不能有特殊字符';
                    } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                      return '会员账号首尾不能出现下划线\'_\'';
                    } else if (!(/^1[345789]\d{9}$/.test(value))) {
                      return "请输入手机号"
                    }
                  },
                  UserName: function (value) {
                    if (value == "") {
                      return '学生姓名为必填项';
                    } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                      return '学生姓名不能有特殊字符';
                    } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                      return '学生姓名首尾不能出现下划线\'_\'';
                    }
                  },
                  UserSpecialty: function (value) {
                    if (value == "") {
                      return '专业为必填项';
                    } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                      return '专业首尾不能出现下划线\'_\'';
                    }
                  },
                  UserStudentId: function (value) {
                    if (value == "") {
                      return '学生证为必填项';
                    } else if (value.length < 9) {
                      return '学生证最少9位';
                    }
                  },
                  UserCardNo: function (value) {
                    if (!GHM_Core.checkIDCard(value)) {
                      return '身份证格式输入有误';
                    } else if (value.length < 18 || value.length > 18) {
                      return '身份证长度有误';
                    }
                  },
                  InCampusesTime: function (value) {
                    if (value == "") {
                      return '请输入入学时间';
                    }
                  },
                  RePlaceId: function (value) {
                    if (value == "") {
                      return '请输入所属学校';
                    }
                  },
                  UserPassword: function (value) {
                    if (value != '' && value.length < 6) {
                      return '账号密码最少6位';
                    }
                  },
                  UserPassword: function (value) {
                    if (value != '' && value.length < 6) {
                      return '账号密码最少6位';
                    }
                  },
                  unitName: function (value) {
                    if (value == "") {
                      return '请输入单位名称';
                    }
                  },
                  unitRefer:function(value){
                    if (value == "") {
                      return '请输入单位简称';
                    }
                  },
                  contacter:function(value){
                    if (value == "") {
                      return '请输入联系人';
                    }
                  },
                  contactPhone: function (value) {
                    if (value.length > 11) {
                      return '会员账号最多11位';
                    } else if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                      return '会员账号不能有特殊字符';
                    } else if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                      return '手机号格式有误';
                    } else if (!(/^1[345789]\d{9}$/.test(value))) {
                      return "手机号格式有误"
                    }
                  }
                });
                //监听提交
                form.on('submit(LAY-edit-Member-submit)', function (data) {
                  var loadidx = layer.msg('编辑中,请勿刷新页面...', {
                    icon: 16,
                    shade: [0.5, '#000'],
                    time: false //取消自动关闭
                  });
                  fields = data.field;
                  //console.log(fields);
                  //if (fields.UserPassword) fields.UserPassword = md5(fields.UserPassword, false, true);
                  //else fields.UserPassword = obj.data.UserPassword;
                  if(fields.UserPassword==""){
                    fields.UserPassword=fields.passwords
                  }else{
                    fields.UserPassword=md5(fields.UserPassword, false, true);
                  }
                  if (fields.imgFirst != "") {
                    fields.CardImgs = fields.imgFirst + "," + fields.imgLast
                  } else {
                    fields.CardImgs = "," + fields.imgLast
                  }
                  if (fields.CardImgs.length == 1) {
                    fields.CardImgs = ""
                  }
                  if (fields.UserType == 1) {
                    data = JSON.stringify({
                      "update": {
                        "UserAccount": fields.UserAccount,
                        "UserPassword": fields.UserPassword,
                        "UserType": fields.UserType,
                        'CompanyId': fields.CompanyId,
                        'Extend4': fields.Extend4
                      },
                      "kid": kid
                    });
                  } else if (fields.UserType == 2) {
                      var field = {};
                      var box={
                      "UserAccount": fields.UserAccount,
                      "UserPassword": fields.UserPassword,
                      "UserType": fields.UserType,
                      'CompanyId': fields.CompanyId,
                      'Extend4': fields.Extend4,
                      "UserName": fields.UserName,
                      "InCampusesTime": fields.InCampusesTime,
                      'UserSpecialty': fields.UserSpecialty,
                      'UserStudentId': fields.UserStudentId,
                      'UserCardNo':fields.UserCardNo,
                      'CardImgs':fields.CardImgs
                      }
                    field.update = box
                    field.kid = kid;
                    data = JSON.stringify(field)
                  }else if(fields.UserType == 3 || fields.UserType == 4){
                    if(fields.Extend4=="请选择"){
                      fields.Extend4=""
                    }
                      var box={
                        "UserAccount": fields.UserAccount,
                        "UserPassword": fields.UserPassword,
                        "UserType": fields.UserType,
                        "CompanyId": fields.RePlaceId,
                        'Extend4': fields.Extend4,
                        "UserName": fields.unitName,
                        "UserNickName": fields.unitRefer,
                        'LinkMan': fields.contacter,
                        'UserPhone': fields.contactPhone,
                        'CompanyAddress':fields.AddressName,
                        'AddressId':fields.FullAddressId,
                        'DetailAddress':fields.detailMsg
                      }
                    var field = {};
                    field.update = box
                    field.kid = kid;
                    data = JSON.stringify(field)
                  }
                  console.log(data);
                  GHM.post(GHM_config.url.UpdateItemMember, {
                    Data: data
                  }).then(function (res) {
                    layer.close(loadidx);
                    layer.close(index); //执行关闭
                    layer.msg("编辑成功");
                    var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                    if (btnrefresh == null) {
                      layui.table.reload('LAY-Member-manage');
                    } else {
                      btnrefresh.click();
                    }
                  }).catch(function (error) {
                    layer.close(loadidx);
                    var msg = '';
                    if (error.Msg) msg = error.Msg;
                    else msg = '执行失败，服务器未返回失败信息';
                    layer.msg(msg);
                  });
                });
              });
            }
          })
        }).catch(function (error) {
          if (error.Code == 1) {
            var msg = '';
            if (error.Msg) msg = error.Msg;
            layer.msg(msg);
            layer.close(loadidx);
          }
        });
      } else if (obj.event == "del") {
        layer.prompt({
          formType: 0,
          title: '敏感操作，请输入ID【' + kid + '】后继续',
        }, function (value, index) {
          if (value == kid) {
            layer.close(index);
            var title = "";
            if (data.UserType == 2 && data.AuthStates == 1) {
              title = '确定删除该学生身份？删除后该会员将无法查看原注册信息及对应订单!有未完成订单的学生不可删除?'
            } else if (data.UserType == 1 && data.AuthStates == 0) {
              title = '确定删除该普通会员身份？删除后该普通会员将无法查看原注册信息及对应订单!有未完成订单的普通会员不可删除?'
            }else if(data.UserType == 3){
              title = '确定删除普通雇主身份？删除后该雇主将无法查看原注册信息及对应订单?'
            }else if(data.UserType == 4){
              title = '确定删除员工雇主身份？删除后该雇主将无法查看原注册信息及对应订单?'
            }
            data = JSON.stringify({
              "KID": kid
            })
  
            layer.confirm(title, {
              skin: "my-skin",
              title: "删除"
            }, function (index) {
              var loadidx = layer.msg('删除中...', {
                icon: 16,
                shade: [0.5, '#000'],
                time: true //取消自动关闭
              });
              GHM.post(GHM_config.url.DeleteMember, {
                Data: data
              }).then(function (res) {
                //console.log(res.Code);
                if (res.Code == 0) {
                  var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                  layer.confirm('删除成功！将无法查看原注册信息及对应订单！可重新注册?', {
                    skin: "my-skin",
                    title: "删除",
                    btn: ['关闭']
                  }, function (index, layero) {
                    if (btnrefresh == null) {
                      layui.table.reload('LAY-Member-manage');
                    } else {
                      btnrefresh.click();
                    }
                    layer.close(index);
                  });
                }
              }).catch(function (error) {
                  layer.confirm('该会员有未完成的订单，不可删除！', {
                    skin: "my-skin",
                    title: "删除",
                    btn: ['关闭']
                  }, function (index, layero) {
                    layer.close(index);
                  })
              });
            });
          }
        });
      } else if (obj.event == 'UpperFrame') {
        tit = data.States == 0 ? "禁用" : "启用"
        var title = "";
        if (data.UserType == 2 && data.AuthStates == 1) {
          title = data.States == 0 ? "确定禁用学生身份？禁用后该学生不能登录" : "确定启用学生身份？启用后该学生将可以继续发布或购买创客商品";
        } else if (data.UserType == 1 && data.AuthStates == 0) {
          title = data.States == 0 ? "确定禁用普通会员?禁用后该普通会员将不能登录" : "确定启用普通会员?启用后可以正常登录但不能发布创客商品";
        } else if (data.UserType == 3 && data.AuthStates == 1) {
          title = data.States == 0 ? "确定禁用普通雇主身份？禁用后该雇主不能登录" : "确定启用普通雇主身份？启用后该雇主将可以继续发布或购买创客商品";
        }else if(data.UserType == 4  && data.AuthStates == 1){
          title = data.States == 0 ? "确定禁用员工雇主身份？禁用后该雇主不能登录" : "确定启用员工雇主身份？启用后该雇主将可以继续发布或购买创客商品";
        }
        data = {
            "update": {
              "States": data.States == 0 ? "1" : "0"
            },
            "kid": kid
          },
          layer.confirm(title, {
            skin: "my-skin",
            title: tit
          }, function (index) {
            GHM.post(GHM_config.url.StartOrStopMember, {
              Data: JSON.stringify(data)
            }).then(function (res) {
              if (res.Code == 0) {
                var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                if (btnrefresh == null) {
                  layui.table.reload('LAY-Member-manage');
                } else {
                  btnrefresh.click();
                }
              } else {
                if (res.Msg == "") {
                  layer.msg("执行失败,服务器未返回原因");
                } else {
                  layer.msg(res.Msg);
                }
              }
            }).catch(function (error) {
              var msg = '';
              if (error.Msg) msg = error.Msg;
              else msg = '执行失败，服务器未返回失败信息';
              layer.msg(msg);
            });
            layer.close(index);
          });
      } else if (obj.event == 'dowload') {
        var loadidx = layer.msg('正在为你下载附件,请勿刷新页面...', {
          icon: 16,
          shade: [0.5, '#000'],
          time: false //取消自动关闭
        });
        GHM.post(GHM_config.url.DownAttachment, {
          Data: JSON.stringify({
            "kid": kid
          })
        }).then(function (res) {
          if (res.Code == 0) {
            layer.close(loadidx);
            //window.location.href=GHM_config.url.GetFile+res.Msg
            //window.open(GHM_config.url.GetFile + res.Msg, '_blank');
            GHM_Core.downloadFile(GHM_config.url.GetFile + res.Msg) 
          }
        }).catch(function (error) {
          if (error.Code == 1) {
            var msg = '';
            if (error.Msg) msg = error.Msg;
            layer.msg(msg);
            layer.close(loadidx);
          }
        });
      }
    });
    exports('member', {})
  });