layui.define(['table', 'form', 'element', 'GHM', 'admin', 'view', 'GHM_log', 'laydate', 'GHM_log'], function (exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        GHM = layui.GHM,
        $ = layui.$,
        table = layui.table,
        form = layui.form;
    GHM_log = layui.GHM_log;

    form.render();
    var idate = {};
    idate.where = {};

    table.render({
        elem: '#LAY-access-manage'
        , url: GHM_config.url.GetListAccess
        , method: 'post'
        , where: GHM.PwdData({ Data: JSON.stringify(idate) })
        , parseData: function (res) {
            res = GHM.UnPwdData(res);
            console.log(res);
            return {
                'code': res.Code,
                'data': res.Data,
                'msg': res.Msg,
                'count': res.Count
            }
        }
        , cols: [[
            { field: 'KID', title: '序号', align: 'center', width: 100, sort: true }
            , { field: 'AccessType', title: '博客类型', align: 'center', templet: '#AccessType' }
            , { field: 'IpAddress', title: 'IP地址', align: 'center' }
            , { field: 'BlogNum', title: '博客编号', align: 'center' }
            , { field: 'BlogName', title: '博客名称', align: 'center' }
            , { field: 'CreateTime', title: '访问时间', align: 'center' }
            // , { field: 'States', title: '状态', align: 'center', templet: '#runAddService_States' }
            // , { title: '操作', align: 'center', width: 360, toolbar: '#table-runAddService-operation' }
        ]]
        , page: true
        , limit: 10
        , text: {
            none: '暂无数据'
        },

    });

    //监听查询
    form.on('submit(LAY-access-search)', function (data) {
        var field = data.field;

        var data = { where: field };
        //console.log(data);
        table.reload('LAY-access-manage', {
            where: GHM.PwdData({ Data: JSON.stringify(data) }),
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
        $(".layui-table-box .layui-table-fixed").remove();
    });

    var active = {
        add: function () {
            admin.popup({
                id: 'LAY-runAddService-add',
                title: '添加增值服务',
                shadeClose: false,
                area: [(admin.screen() == 0 ? '99%' : '35%'), '45%'],
                success: function (layero, index) {
                    view(this.id).render('runAddService/addEditService', null).done(function () {

                        addCompany(false, '');
                        // addGroup(false, '', '');
                        form.render(null, 'LAY-edit-runAddService-submit');
                        //数据校验
                        form.verify({
                            CompanyId: function (value) {
                                if (value == '') {
                                    return "归属学校是必选项"
                                }
                            }
                            , RuleName: function (value) {
                                if (value == '') {
                                    return "增值服务名称为必填项"
                                }
                                if (value.length > 15) {
                                    return "增值服务名称不超过15个字符"
                                }
                            }

                            , Sort: function (value) {
                                if (value == '') {
                                    return "显示排序是必填项"
                                }
                                var reg = new RegExp("^-?[1-9]+[0-9]*$|^0$");
                                if (!reg.test(value)) {
                                    return "请输入数字"
                                }
                            }
                            , Price: function (value) {
                                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                                if (!reg.test(value)) {
                                    return "增值价格不合法"
                                }
                            }
                        });
                        //提交监听
                        form.on('submit(LAY-runAddService-add-submit)', function (data) {
                            var loadidx = layer.msg('添加中,请勿刷新页面...', {
                                icon: 16,
                                shade: [0.5, '#000'],
                                time: false  //取消自动关闭
                            });
                            var field = data.field;
                            field.AddServerType = 1;
                            GHM.post(GHM_config.url.AddItemRunAddService, { Data: JSON.stringify({ update: field }) }).then(function (res) {
                                layer.close(loadidx);
                                if (res.Code == 0) {
                                    layer.close(index); //执行关闭
                                    layer.msg("添加成功");
                                    var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                                    if (btnrefresh == null) {
                                        layui.table.reload('LAY-runAddService-manage');
                                    }
                                    else {
                                        btnrefresh.click();
                                    }
                                }
                                else {
                                    if (res.Msg == "") {
                                        layer.msg("执行失败,服务器未返回原因");
                                    }
                                    else {
                                        layer.msg(res.Msg);
                                    }
                                }
                            }).catch(function (error) {
                                var msg = '';
                                if (error.Msg) msg = error.Msg;
                                else msg = '执行失败，服务器未返回失败信息';
                                layer.msg(msg);
                            });
                        })
                    });
                }
            });
        }
    }

    // 处理添加编辑的 公司 下拉框
    var addCompany = function (isedit, companyid) {
        GHM.post(GHM_config.url.GetSmallFullListChannel, { Data: '{}', Limit: 99 }).then(function (res) {
            if (res.Code == 0) {
                if (res != null) {
                    var opthtml = '';
                    for (var i = 0; i < res.Data.length; i++) {

                        if (isedit && res.Data[i].KID == companyid) {
                            opthtml += ' <option selected value="' + res.Data[i].KID + '">' + res.Data[i].PlaceFullName + '</option>';
                        }
                        else {
                            opthtml += ' <option value="' + res.Data[i].KID + '">' + res.Data[i].PlaceFullName + '</option>'
                        }
                    }
                    console.log(opthtml)
                    $("#CompanyId").append(opthtml);
                    form.render('select');
                }

            }
            else {
                if (res.Msg == "") {
                    layer.msg("执行失败,服务器未返回原因");
                }
                else {
                    layer.msg(res.Msg);
                }
            }
        }).catch(function (error) {
            var msg = '';
            if (error.Msg) msg = error.Msg;
            else msg = '执行失败，服务器未返回失败信息';
            layer.msg(msg);
        });
    }

    // 处理添加编辑的 组名 下拉框
    var addGroup = function (isedit, companyid, groupid) {
        var dwhere = { 'CompanyId': companyid }
        var data = {}

        data.where = dwhere;
        $("#GroupId").empty();
        GHM.post(GHM_config.url.GetSmallGroupServiceGroup, { Data: JSON.stringify(data), Limit: 99 }).then(function (res) {
            console.log(res)
            if (res.Code == 0) {
                if (res != null) {
                    var opthtml = '';
                    opthtml += '<option value="">请选择</option>';
                    for (var i = 0; i < res.Data.length; i++) {

                        if (isedit && res.Data[i].KID == groupid) {
                            opthtml += ' <option selected value="' + res.Data[i].KID + '">' + res.Data[i].GroupName + '</option>';
                        }
                        else {
                            opthtml += ' <option value="' + res.Data[i].KID + '">' + res.Data[i].GroupName + '</option>'
                        }
                    }
                    $("#GroupId").append(opthtml);
                    form.render('select');
                }

            }
            else {
                form.render('select');
                if (res.Msg == "") {
                    layer.msg("执行失败,服务器未返回原因");
                }
                else {
                    layer.msg(res.Msg);
                }
            }
        }).catch(function (error) {
            form.render('select');
            var msg = '';
            if (error.Msg) msg = error.Msg;
            else msg = '执行失败，服务器未返回失败信息';
            layer.msg(msg);
        });
    }

    //监听状态切换
    form.on('switch(startstop2)', function (data) {
        var loadidx = layer.msg("状态修改中...", {
            icon: 16,
            shade: [0.5, '#000'],
            time: false //取消自动关闭
        });

        var state = 1;
        var msg = "禁用成功";
        if (data.elem.checked) {
            state = 0;
            msg = "启用成功";
        }

        var field = {};
        field.update = {
            States: state
        };
        field.kid = data.value;

        GHM.post(GHM_config.url.StartOrStopItemAddService, {
            Data: JSON.stringify(field)
        }).then(function (res) {
            layer.close(loadidx);
            if (res.Code == 0) {
                layer.msg(msg);
                var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                if (btnrefresh == null) {
                    layui.table.reload('LAY-Advert-manage');
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
            //layer.closeAll();
            var msg = '';
            if (error.msg) msg = error.msg;
            else msg = '执行失败，服务器未返回失败信息';
            layer.msg(msg);
        });
    });

    // 监听博客访问类型选择
    $('.states_tab').on('click', 'li', function () {
        var state = $(this).data().state;
        window.console.log(state)
        $(this).addClass('active').siblings('li').removeClass('active');
        $('input[name = AccessType]').val(state);
        $('#LAY-access-search').click();
    });


    form.on('select(CompanyId)', function (data) {
        console.log(data)
        $("#CompanyName").val($(this)[0].innerText)
        addGroup(false, data.value, '')

    })
    form.on('select(GroupId)', function (data) {
        console.log($(this)[0].innerText)
        $("#GroupName").val($(this)[0].innerText)
    })

    $(document).on('click', '.layui-admin-access', function () {
        var type = $(this).attr('data-type');
        active[type] ? active[type].call(this) : '';
    });

    table.on('tool(LAY-access-manage)', function (obj) {
        var data = obj.data;
        var kid = data.KID;
        var companyid = obj.data.CompanyId;
        var groupid = obj.data.GroupId;
        console.log(data)
        if (obj.event == 'Edit') {
            admin.popup({
                id: 'LAY-runAddService-add',
                title: '编辑增值服务',
                shadeClose: false,
                area: [(admin.screen() == 0 ? '99%' : '35%'), '45%'],
                success: function (layero, index) {
                    view(this.id).render('runAddService/addEditService', data).done(function () {

                        addCompany(true, companyid);
                        addGroup(true, companyid, groupid);

                        form.render(null, 'LAY-edit-runAddService-submit');
                        //数据校验
                        form.verify({
                            CompanyId: function (value) {
                                if (value == '') {
                                    return "归属学校是必选项"
                                }
                            }
                            , RuleName: function (value) {
                                if (value == '') {
                                    return "增值服务名称为必填项"
                                }
                                if (value.length > 15) {
                                    return "增值服务名称不超过15个字符"
                                }
                            }

                            , Sort: function (value) {
                                if (value == '') {
                                    return "显示排序是必填项"
                                }
                                var reg = new RegExp("^-?[1-9]+[0-9]*$|^0$");
                                if (!reg.test(value)) {
                                    return "请输入数字"
                                }
                            }
                            , Price: function (value) {
                                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                                if (!reg.test(value)) {
                                    return "增值价格不合法"
                                }
                            }
                        });
                        form.on('submit(LAY-runAddService-add-submit)', function (data) {
                            var loadidx = layer.msg('编辑中,请勿刷新页面...', {
                                icon: 16,
                                shade: [0.5, '#000'],
                                time: false  //取消自动关闭
                            });

                            data = { update: data.field, "kid": kid }
                            GHM.post(GHM_config.url.UpdateItemRunAddService, { Data: JSON.stringify(data) }).then(function (res) {
                                layer.close(loadidx);
                                if (res.Code == 0) {
                                    layer.close(index); //执行关闭
                                    layer.msg("编辑成功");
                                    var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                                    if (btnrefresh == null) {
                                        layui.table.reload('LAY-runAddService-manage');
                                    }
                                    else {
                                        btnrefresh.click();
                                    }
                                }
                                else {
                                    if (res.Msg == "") {
                                        layer.msg("执行失败,服务器未返回原因");
                                    }
                                    else {
                                        layer.msg(res.Msg);
                                    }
                                }
                            }).catch(function (error) {
                                var msg = '';
                                if (error.Msg) msg = error.Msg;
                                else msg = '执行失败，服务器未返回失败信息';
                                layer.msg(msg);
                            });
                        })
                    });
                }
            });

        }
        else if (obj.event == 'Delete') {
            //删除
            layer.prompt({
                formType: 0,
                title: '敏感操作，请输入ID【' + kid + '】后继续',
            }, function (value, index) {
                if (value == kid) {
                    data = JSON.stringify({ "KID": kid })
                    layer.close(index);

                    layer.confirm('确定删除该增值服务？删除不可恢复?', { skin: "my-skin", title: "删除" }, function (index) {
                        var loadidx = layer.msg('删除中...', {
                            icon: 16,
                            shade: [0.5, '#000'],
                            time: true  //取消自动关闭
                        });
                        GHM.post(GHM_config.url.DeleteItemRunAddService, { Data: data }).then(function (res) {
                            layer.close(loadidx);
                            if (res.Code == 0) {
                                layer.msg("删除成功");
                                layer.close(index);
                                var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
                                if (btnrefresh == null) {
                                    layui.table.reload('LAY-runAddService-manage');
                                } else {
                                    btnrefresh.click();
                                }
                            } else {
                                if (res.Msg == "") {
                                    layer.msg("执行失败,服务器未返回原因");
                                }
                                else {
                                    layer.msg(res.Msg);
                                }
                            }
                        }).catch(function (error) {
                            var msg = '';
                            if (error.Msg) msg = error.Msg;
                            else msg = '执行失败，服务器未返回失败信息';
                            layer.msg(msg);
                        })
                    })


                }
            });

        } else {
            // 日志
            var log = {};
            log.where = {
                RunAddServerId: data.KID
            }

            admin.popup({
                title: '增值服务组日志',
                area: ['60%', '80%'],
                skin: 'layui-layer-adminpop',
                success: function (layero, index) {
                    view(this.id).render('log/index', null).done(function () {
                        var cols = [
                            [{
                                field: 'OperUserName',
                                width: 200,
                                title: '操作人',
                                align: 'center'
                            },
                            {
                                field: 'OperUserId',
                                width: 200,
                                title: '操作账号',
                                align: 'center'
                            },
                            {
                                field: 'CreateTime',
                                width: 200,
                                title: '操作时间',
                                align: 'center'
                            },
                            {
                                field: 'OperContent',
                                title: '操作内容',
                                align: 'center'
                            }
                            ]
                        ];
                        GHM_log(GHM_config.url.GetListLogsRunAddService, log, cols);
                    })
                }
            })
        }
    });
    exports('access', {})
});