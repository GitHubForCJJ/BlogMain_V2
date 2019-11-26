/**

 @Name：layuiAdmin 会员管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：GPL-2
    
 */
layui.define(['table', 'layer', 'form', 'jquery', 'GHM_Crop', 'laydate', 'element', 'GHM', 'admin', 'view', 'GHM_log', 'formSelects'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        admin = layui.admin,
        view = layui.view,
        GHM = layui.GHM,
        $ = layui.$,
        table = layui.table,
        laydate = layui.laydate,
        GHM_log = layui.GHM_log,
        GHM_Crop = layui.GHM_Crop,
        form = layui.form;


    GHM.post(GHM_config.url.GetAllAdAndMaxSort, {
        Data: '{}'
    }).then(function (res) {
        $.each(res.Data.Adlocations, function (index, val) {
            var option = " <option  value='" + val.KID + "'>" + val.LocationName +
                "</option>"
            $("#SLocation").append(option);
        });
        $.each(res.Data.Channels, function (index, val) {
            var option = " <option  value='" + val.PlaceId + "'>" + val.PlaceName +
                "</option>"
            $("#PlaceId").append(option);
        });

        form.render('select');
    }).catch(function (error) {
        var msg = '';
        if (error.Msg) msg = error.Msg;
        else msg = '执行失败，服务器未返回失败信息';
        layer.msg(msg);
    });

    var checkdata = function () {
        //return true;
        if ($('#AdName').val().length == 0) {
            layer.msg('请输入广告名称！');
            $('#AdName').focus();
            return false;
        }
        if ($('#SortNums').val().length == 0) {
            layer.msg('请输入广告序号！');
            $('#SortNums').focus();
            return false;
        }

        var adshowtype = $("#AdShowType:checked").val();
        if (adshowtype == 1) {
            var startdate = $("#showtimebegin").val();
            var enddate = $("#showtimeend").val();
            if (startdate == '' || enddate == '') {
                layer.msg('请选择时间段');
                return false;
            }
            var d1 = Date.parse(startdate);
            var d2 = Date.parse(enddate);
            if (d1 > d2) {
                layer.msg('广告时段不合法，开始时间大于结束时间');
                return false;
            }
        }

        var rrr = $("#ClickUrl").val();
        if ($("#AdTypevalue").val() == 0) {
            if (rrr.length < 4 || rrr.substr(0, 4).toLowerCase() != 'http') {
                layer.msg('请输入正确的广告链接！');
                $("#ClickUrl").focus();
                return false;
            }
        }
        var ImgUrlPatharr = getUrl($("#img-box1"));
        if (ImgUrlPatharr.length == 0) {
            layer.msg('请上传广告图片！');
            return false;
        }
        var clickimgs = getUrl($("#img-box2"));
        if ($("#AdTypevalue").val() == 1 && clickimgs.length == 0) {
            layer.msg('请上传跳转图片！');
            return false;
        }
        if ($("#AdTypevalue").val() == 2 && $(".select_proid").val() == '') {
            layer.msg("请选择产品");
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
        url: GHM_config.url.GetListAdvert, //模拟接口
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
                width: 150,
                title: 'KID',
                align: 'center'
            }, {
                field: 'Title',
                width: 150,
                title: '标题',
                align: 'center'
            }, {
                field: 'DetailTitle',
                width: 150,
                title: '长标题',
                align: 'center'
            }, {
                field: 'Sorc',
                width: 150,
                title: '博客序号',
                sort: true,
                align: 'center'
            }, {
                field: 'ImgUrlPath',
                width: 250,
                title: '博客图片',
                templet: '#temp_Blog_ImgUrlPath',
                align: 'center'
            }, {
                field: 'CreateTime',
                width: 250,
                title: '创建时间',
                sort: true,
                align: 'center'
            }, {
                field: 'States',
                width: 150,
                title: '博客状态',
                templet: '#temp_Advert_States',
                align: 'center'
            }, {
                title: '操作',
                minWidth: 300,
                align: 'center',
                toolbar: '#table-Advert-operation',
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
        table.reload('LAY-Advert-manage', {
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
    table.on('sort(LAY-Advert-manage)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var ascdesc = "asc";
        if (obj.type == "desc") {
            ascdesc = "desc";
        }
        var field = {};
        field.orderby = obj.field + " " + ascdesc;
        table.reload('LAY-Advert-manage', {
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
        add: function () {
            GHM_Core.fullPopup('添加广告信息', 'advert/addOrEdit', null, function () {
                lay('.show_date').each(function () {
                    laydate.render({
                        elem: this,
                        type: 'datetime',
                        format: 'yyyy-MM-dd HH:mm:ss'
                    })
                });
                // 设置margin
                setMargin();

                //上传广告图片
                var $imgBox = $('#upload-box1 .img-box');

                $("#upload-btn1").click(function () {
                    $('#upadpic').click();
                })
                $('#upadpic').change(function () {
                    if (!this.files.length) return;

                    GHM_Crop.drag(this, {}, {
                        folder: 'advert'
                    }).then(function (files) {
                        console.log(files);
                        layer.close(layer.index);
                        $("#upload-btn1").hide();
                        $("#upload-box1 .img-box li").remove();
                        var htm = '<li class="item">' +
                            '<img src=' + files + '>' +
                            '<i class="close" id="close1"></i>'
                        '</li>';
                        $imgBox.append(htm);
                    })
                });


                //显示隐藏产品
                showprodiv();
                //查询商品
                querypro();
                //选择产品
                choosepro();

                $(document).on('click', '#close1', function () {
                    $("#upload-btn1").show();
                    // 删除
                    $(this).parent('.item').remove();
                })

                //跳转图片
                var $imgBox2 = $('#upload-box2 .img-box');
                $("#upload-btn2").click(function () {
                    $('#uptzpic').click();
                })
                $('#uptzpic').change(function () {
                    layui.GHM_upload(this, {
                        folder: 'advert'
                    }).then(function (files) {
                        $("#upload-btn2").hide();
                        $("#upload-box2 .img-box li").remove();
                        var htm2 = '';
                        console.log('files:', files);
                        for (var i = 0; i < files.length; i++) {
                            htm2 += '<li class="item">' +
                                '<img src=' + files[i] + '>' +
                                '<i class="close" id="close2"></i>'
                            '</li>';
                        }
                        $imgBox2.append(htm2);
                    }).catch(function (error) {
                        var msg = '';
                        if (error.Msg) msg = error.Msg;
                        else msg = '上传失败，请重试！';
                        layer.msg(msg);
                    })
                });
                $(document).on('click', '#close2', function () {
                    $("#upload-btn2").show();
                    // 删除
                    $(this).parent('.item').remove();
                })
                form.render(null, 'LAY-edit-Advert-submit');
                //监听add提交
                form.on('submit(LAY-add-Advert-submit)', function (data) {
                    //检查为空
                    if (checkdata()) {
                        //获取提交的字段
                        var fields = {};
                        fields = data.field;
                        console.log(fields)
                        //获取广告图片地址
                        var ele = $("#img-box1");
                        var ImgUrlPath = getUrl(ele);
                        fields.ImgUrlPath = '';

                        fields.ImgUrlPath = ImgUrlPath[0];

                        if (data.field.AdType == '1') {

                            //类型为跳转时才 获取跳转图片地址
                            var ele2 = $("#img-box2");

                            var ClickUrl2 = getUrl(ele2);
                            fields.ClickUrl = '';

                            fields.ClickUrl = ClickUrl2[0];
                        }
                        var loadidx = layer.msg('添加中...', {
                            icon: 16,
                            shade: [0.5, '#000'],
                            time: false //取消自动关闭
                        });


                        GHM.post(GHM_config.url.AddItemAdvert, {
                            Data: JSON.stringify(fields)
                        }).then(function (res) {
                            layer.closeAll();
                            layer.msg("添加成功")
                            GHM_Core.reloadTable('LAY-Advert-manage');
                        }).catch(function (error) {
                            //layer.closeAll();
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




    //事件注册
    $(document).on('click', '.layui-btn.layuiadmin-btn-Advert', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    //监听工具条
    table.on('tool(LAY-Advert-manage)', function (obj) {
        var data = obj.data;
        var kid = data.KID;
        if (obj.event == 'edit') {
            GHM_Core.fullPopup('编辑广告信息', 'advert/addOrEdit', data, function () {

                lay('.show_date').each(function () {
                    laydate.render({
                        elem: this,
                        type: 'datetime',
                        format: 'yyyy-MM-dd HH:mm:ss'
                    })
                });
                console.log(data);
                // 设置margin
                setMargin();
                //显示隐藏产品
                showprodiv();
                //查询商品
                querypro();
                //选择产品
                choosepro();

                if (data.AdType == 2) {
                    queproapi();
                }
                $(".select_proid").val(data.ProId);
                //初始化产品图片
                $(".select_img").attr('src', data.Extend5);
                //初始化产品名称
                $(".select_name").text(data.Extend4);
                //初始化产品编号
                $(".select_prono").text(data.Extend6);
                $(".Extend4").val(data.Extend4);
                $(".Extend5").val(data.Extend5);
                $(".Extend6").val(data.Extend6);

                var $cropMsg = $('#cropMsg');
                var LocationId = data.LocationId;
                // 建议尺寸
                // if (LocationId == 1) {
                //     $cropMsg.text('建议尺寸750*428像素');
                // } else {
                //     $cropMsg.text('建议尺寸346*180像素');
                // }
                //上传广告图片
                var $imgBox = $('#upload-box1 .img-box');
                $("#upload-btn1").click(function () {
                    $('#upadpic').click();
                })
                $('#upadpic').change(function () {
                    if (!this.files.length) return;

                    GHM_Crop.drag(this, {}, {
                        folder: 'advert'
                    }).then(function (files) {
                        console.log(files);
                        layer.close(layer.index);
                        $("#upload-btn1").hide();
                        $("#upload-box1 .img-box li").remove();
                        var htm = '<li class="item">' +
                            '<img src=' + files + '>' +
                            '<i class="close" id="close1"></i>'
                        '</li>';
                        $imgBox.append(htm);
                    })
                });
                $(document).on('click', '#close1', function () {
                    $("#upload-btn1").show();
                    // 删除
                    $(this).parent('.item').remove();
                });
                var $imgBox2 = $('#upload-box2 .img-box');
                $("#upload-btn2").click(function () {
                    $('#uptzpic').click();
                })
                $('#uptzpic').change(function () {
                    layui.GHM_upload(this, {
                        folder: 'advert'
                    })
                        .then(function (files) {
                            $("#upload-btn2").hide();
                            //当从跳转连接切换到跳转图片时，清楚UL里面原本的那个li
                            $("#upload-box2 .img-box li").remove();
                            var htm2 = '';
                            for (var i = 0; i < files.length; i++) {
                                htm2 += '<li class="item">' +
                                    '<img src=' + files[i] + '>' +
                                    '<i class="close" id="close2"></i>'
                                '</li>';
                            }
                            $imgBox2.append(htm2);
                        })
                        .catch(function (error) {
                            var msg = '';
                            if (error.Msg) msg = error.Msg;
                            else msg = '上传失败，请重试！';
                            layer.msg(msg);
                        })
                });
                $(document).on('click', '#close2', function () {
                    $("#upload-btn2").show();
                    // 删除
                    $(this).parent('.item').remove();
                })
                form.render(null, 'LAY-edit-Advert-submit');

                //监听提交
                form.on('submit(LAY-edit-Advert-submit)', function (data) {
                    if (checkdata()) {
                        //获取提交的字段
                        var field = {};
                        field.update = data.field;
                        field.kid = kid;

                        //获取广告图片地址
                        var ele = $("#img-box1");
                        var ImgUrlPath = getUrl(ele);
                        data.field.ImgUrlPath = ImgUrlPath[0];

                        if (data.field.AdType == '1') {
                            //类型为跳转时才 获取跳转图片地址
                            var ele2 = $("#img-box2");
                            var ClickUrls = getUrl(ele2);
                            field.update.ClickUrl = '';
                            field.update.ClickUrl = ClickUrls[0];
                        }
                        var loadidx = layer.msg('添加中...', {
                            icon: 16,
                            shade: [0.5, '#000'],
                            time: false //取消自动关闭
                        });

                        GHM.post(GHM_config.url.UpdateItemAdvert, {
                            Data: JSON.stringify(field)
                        }).then(function (res) {
                            console.log(res)
                            layer.closeAll();
                            layer.msg("编辑成功")
                            GHM_Core.reloadTable('LAY-Advert-manage');
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


        } else if (obj.event == "del") {
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
        } else if (obj.event == "startstop1") {
            var msg, stitle, state;
            if (data.States == 0) {
                state = 1;
                stitle = '禁用';
                msg = '确定禁用广告？禁用后不在显示';
            } else {
                state = 0;
                stitle = '启用';
                msg = '确定启用广告？'
            }
            layer.confirm(msg, {
                title: stitle
            }, function (index) {

                var field = {};
                field.kid = kid;
                field.update = {
                    States: state
                };

                GHM.post(GHM_config.url.UpdateItemAdvert, {
                    Data: JSON.stringify(field)
                }).then(function (res) {
                    //layer.close(loadidx);
                    if (res.Code == 0) {
                        layer.msg(res.Msg);
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
        } else if (obj.event == "log") {
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

    //获取上传的图片
    function getUrl (elm, arr) {
        arr = [];
        elm.find('.item').each(function (index, item) {
            var src = $(item).find('img').attr('src');
            if (src != null && src.trim() != "" && src.trim() != " " && src != undefined && src != 'undefined') {
                arr.push(src);
            }
        });
        return arr;
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