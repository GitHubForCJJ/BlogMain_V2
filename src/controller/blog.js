/**

 @Name：layuiAdmin 博客管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */
layui.define(['table', 'layer', 'form', 'jquery', 'laydate', 'element', 'GHM'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        admin = layui.admin,
        view = layui.view,
        GHM = layui.GHM,
        $ = layui.$,
        table = layui.table,
        laydate = layui.laydate,
        form = layui.form;
    var myUeditor = "";


    var checkdata = function (data) {
        //return true;
        if (data.Type.length == 0) {
            layer.msg('请选择博客类型！');
            return false;
        }
        if (data.Title.length == 0) {
            layer.msg('标题不能为空');
            $('#Title').focus();
            return false;
        }
        if (data.IsOriginal == 1 && data.OriginalUrl.length == 0) {
            layer.msg('请输入原创地址！');
            $('#OriginalUrl').focus();
            return false;
        }
        var editorHtml = getUeditorHtml();
        if (editorHtml.length == 0) {
            layer.msg('请输入博客内容！');
            return false;
        }

        return true;
    }
    //laydate init
    lay('.search_date').each(function () {
        laydate.render({
            elem: this,
            format: 'yyyy-MM-dd'
        })
    });
    //数据渲染加载
    table.render({
        elem: '#LAY-Blog-manage',
        url: GHM_config.url.GetListBlog, //模拟接口
        method: 'post',
        where: GHM.PwdData(),
        parseData: function (res) { //res 即为原始返回的数据
            console.log(res)
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
                width: 70,
                title: 'KID',
                align: 'center'
            }, {
                field: 'BlogNum',
                width: 100,
                title: '博客编号',
                sort: true,
                align: 'center'
            },
            {
                field: 'Extend4',
                width: 140,
                title: '博客类型',
                align: 'center'
            }, {
                field: 'Title',
                width: 300,
                title: '标题',
                align: 'center'
            }, {
                field: 'Blogimg',
                width: 120,
                title: '博客图片',
                templet: '#table-Blog-blogimg'
            }, {
                field: 'CreateTime',
                width: 200,
                title: '创建时间',
                sort: true,
                align: 'center'
            },
            {
                field: 'Start',
                width: 100,
                title: '点赞',
                sort: true,
                align: 'center'
            },
            {
                field: 'Views',
                width: 140,
                title: '查看次数',
                sort: true,
                align: 'center'
            },
            {
                field: 'Comments',
                width: 100,
                title: '评论',
                sort: true,
                align: 'center'
            }, {
                field: 'States',
                width: 120,
                title: '状态',
                templet: "#temp_Blog_States",
                align: 'center'
            }, {
                title: '操作',
                minWidth: 150,
                toolbar: '#table-Blog-operation',
                align: 'center'
            }]
        ],
        page: true,
        limit: 10,
        text: {
            none: "暂无数据"
        }
    });

    //监听搜索
    form.on('submit(LAY-Blog-search)', function (data) {
        var field = {};
        field.where = data.field;
        console.log(field)
        //执行重载
        table.reload('LAY-Blog-manage', {
            where: GHM.PwdData({
                Data: JSON.stringify(field)
            }),
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
        $(".layui-table-box .layui-table-fixed").remove();
    });

    // 监听状态栏
    $('.states_tab').on('click', 'li', function () {
        var state = $(this).data().state;
        $(this).addClass('active').siblings('li').removeClass('active');
        $('input[name = States]').val(state);
        $('#LAY-Advert-search').click();
    });

    //监听排序
    table.on('sort(LAY-Blog-manage)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var ascdesc = "asc";
        if (obj.type == "desc") {
            ascdesc = "desc";
        }
        var field = {};
        field.orderby = obj.field + " " + ascdesc;
        table.reload('LAY-Blog-manage', {
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

    //添加博客类型
    var addCategory = function () {
        GHM.post(GHM_config.url.GetListCartgory, {
            Data: {}
        }).then(function (res) {
            console.log(res.Data.length);
            if (res.Data.length > 0) {
                for (var i in res.Data) {
                    var html = "<option value='" + res.Data[i].KID + "'>" + res.Data[i].Name + "</option>"
                    $("#category").append(html);
                }
                form.render();
            }

        }).catch(function (error) {
            //layer.closeAll();
            var msg = '';
            if (error.Msg) msg = error.Msg;
            else msg = '执行失败，服务器未返回失败信息';
            layer.msg(msg);
        });

    }

    //事件
    var active = {
        add: function () {
            GHM_Core.fullPopup('添加博客信息', 'blog/addOrEdit', null, function () {
                lay('.show_date').each(function () {
                    laydate.render({
                        elem: this,
                        type: 'datetime',
                        format: 'yyyy-MM-dd HH:mm:ss'
                    })
                });
                form.render();
                // var addoreditformwidth = $(".addoreditform").height();
                // console.log(addoreditformwidth)
                // var bcheight = $(".blog_contain").height();
                // var btnheight = $(".mybtnarea").height();

                //处理ue呈现
                addUeditor();
                //添加博客类型
                addCategory();
                var addoreditformwidth = $(".addoreditform").innerHeight();
                console.log(addoreditformwidth)

                //监听添加提交
                form.on('submit(LAY-Blog-add)', function (data) {
                    //检查为空
                    console.log(data)
                    if (checkdata(data.field)) {

                        var content = myUeditor.getContent();
                        data.field.Content = content;
                        console.log(data.field)

                        var loadidx = layer.msg('添加中...', {
                            icon: 16,
                            shade: [0.5, '#000'],
                            time: false //取消自动关闭
                        });
                        GHM.post(GHM_config.url.AddItemBlog, {
                            Data: JSON.stringify({ update: data.field })
                        }).then(function (res) {
                            layer.closeAll();
                            layer.msg("添加成功")
                            GHM_Core.reloadTable('LAY-Blog-manage');
                        }).catch(function (error) {
                            layer.close(loadidx);
                            var msg = '';
                            if (error.Msg) msg = error.Msg;
                            else msg = '执行失败，服务器未返回失败信息';
                            layer.msg(msg);
                        });
                    }
                });
            });
        }
    };

    function addUeditor () {

        var width = $(".blog_contain").width();
        myUeditor = "";

        UE.delEditor('ueditor');
        myUeditor = UE.getEditor('ueditor', {
            autoHeightEnabled: true,
            // autoFloatEnabled: true
            initialFrameWidth: width - 40,
            initialFrameHeight: 520,
            autoHeightEnabled: false,
            zIndex: 1000,
            fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36],
            fontfamily: [
                { label: '', name: 'songti', val: '宋体,SimSun' },
                { label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai' },
                { label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei' },
                { label: '', name: 'heiti', val: '黑体, SimHei' },
                { label: '', name: 'lishu', val: '隶书, SimLi' },
                { label: '', name: 'andaleMono', val: 'andale mono' },
                { label: '', name: 'arial', val: 'arial, helvetica,sans-serif' },
                { label: '', name: 'arialBlack', val: 'arial black,avant garde' },
                { label: '', name: 'comicSansMs', val: 'comic sans ms' },
                { label: '', name: 'impact', val: 'impact,chicago' },
                { label: '', name: 'timesNewRoman', val: 'times new roman' }
            ]

        });

    }

    //事件注册
    $(document).on('click', '.layui-btn.layuiadmin-btn-Advert', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //监听工具条
    table.on('tool(LAY-Blog-manage)', function (obj) {
        var data = obj.data;
        var kid = data.KID;
        if (obj.event == 'edit') {
            GHM_Core.fullPopup('编辑博客信息', 'blog/addOrEdit', data, function () {
                addCategory();
                //处理ue呈现
                addUeditor();

                GHM.post(GHM_config.url.GetItemBlog,
                    { "Data": JSON.stringify({ "Num": data.BlogNum }) }
                ).then(function (res) {
                    console.log(res)
                    $("#category").val(res.Data.Type);
                    $("#IsOriginal").val(res.Data.IsOriginal);
                    $("#IsTop").val(res.Data.IsTop);
                    $("#Title").val(res.Data.Title);
                    $("input[name='num']").val(res.Data.BlogNum);
                    form.render('select')

                    myUeditor.ready(function () {
                        myUeditor.setContent(res.Data.Content)
                    })

                }).catch(function (err) {
                    console.log(err)
                })

                //监听提交
                form.on('submit(LAY-Blog-add)', function (data) {
                    console.log(data);
                    if (checkdata(data.field)) {
                        //获取提交的字段
                        var field = {};
                        field.update = data.field;
                        field.update.Content = getUeditorHtml();
                        field.num = data.field.num;

                        var loadidx = layer.msg('修改中...', {
                            icon: 16,
                            shade: [0.5, '#000'],
                            time: false //取消自动关闭
                        });

                        GHM.post(GHM_config.url.UpdateItemBlog, {
                            Data: JSON.stringify(field)
                        }).then(function (res) {
                            console.log(res)
                            layer.closeAll();
                            layer.msg("编辑成功")
                            GHM_Core.reloadTable('LAY-Blog-manage');
                        }).catch(function (error) {
                            //layer.closeAll();
                            var msg = '';
                            if (error.msg) msg = error.msg;
                            else msg = '执行失败，服务器未返回失败信息';
                            layer.msg(msg);
                        });
                    }
                });
            });


        }
        else if (obj.event == "del") {
            layer.confirm('确定删除该数据？删除后不可恢复！', function (index) {
                var loadidx = layer.msg('删除中...', {
                    icon: 16,
                    shade: [0.5, '#000'],
                    time: false //取消自动关闭
                });
                //获取提交的字段
                var field = {};
                field.update = data.field;
                field.kid = kid;
                GHM.post(GHM_config.url.DeleteAdvert, {
                    Data: JSON.stringify(field)
                }).then(function (res) {
                    layer.close(index); //执行关闭
                    layer.close(loadidx); //执行关闭
                    if (res.Code == 0) {
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
                    var msg = '';
                    if (error.msg) msg = error.msg;
                    else msg = '执行失败，服务器未返回失败信息';
                    layer.msg(msg);
                })
            });
        }
        else if (obj.event == "log") {
            // 日志
            var log = {};
            log.kid = data.KID;
            admin.popup({
                title: '广告日志',
                area: ['60%', '80%'],
                skin: 'layui-layer-adminpop',
                success: function (layero, index) {
                    view(this.id).render('log/index', null).done(function () {
                        var cols = [
                            [{
                                field: 'CreateUserName',
                                width: 200,
                                title: '操作人',
                                align: 'center'
                            },
                            {
                                field: 'CreateUserId',
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
                                field: 'Content',
                                title: '操作内容',
                                align: 'center'
                            }
                            ]
                        ];
                        GHM_log(GHM_config.url.GetListAdvertLog, log, cols);
                    })
                }
            })
        }
    });

    //获取ueditor内容
    function getUeditorHtml () {
        return myUeditor.getContent();
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

        GHM.post(GHM_config.url.UpdateItemAdvert, {
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

    //点击查看大图
    $('.advert_box').on('click', '.show_img', function () {
        var src = $(this).attr('src');
        var html = '<img src =' + src + ' style="width:100%;">';
        layer.open({
            type: 1,
            title: false,
            area: 'auto',
            maxWidth: 1000,
            maxHeight: 800,
            content: html
        })
    });


    exports('blog', {})
});