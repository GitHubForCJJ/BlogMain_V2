/**
 * API管理
 */
var GHM_config = window.GHM_config || {};
var GHM_BASE_API = '';
// var GHM_QINIU_API = 'http://campusescdn.dongzouxizou.com/'; //七牛云上传地址
var GHM_PT_API = ''; // 平台地址
var GHM_PT_Domain = '';

var hostname = window.location.hostname;
if (hostname == 'localhost' || hostname.indexOf('192.168.20') != -1 || hostname.indexOf('cjjmain') > -1) {
    // 本地环境
    GHM_BASE_API = 'http://cjjapi.blog.com/api';
    //GHM_BASE_API = 'http://192.168.20.35:9953/api';
} else if (hostname.indexOf('chenjianjun') > -1) {
    // 内网环境
    GHM_BASE_API = 'https://blogapi.chenjianjun.info/api';
    GHM_PT_Domain = '.dzxz.com';
}
GHM_config.reqBase = {
    AppId: '358811079015606',
    AppName: 'dzxzapp',
    AppType: '1',
    AppVersion: '1.0.0.1',
    Page: 1,
    Limit: 10
};
GHM_config.url = {
    // common 
    codeImgAPI: GHM_BASE_API + '/Login/GetAuthCode', //图片验证码
    loginAPI: GHM_BASE_API + '/Login/Login', //用户名密码登录
    mobileCodeAPI: GHM_BASE_API + '/Comm/GetMoblieAuthCode', //手机验证码
    mobileLoginAPI: GHM_BASE_API + '/Comm/MobileLogin', //验证码登录
    GetQiNiuUploadToken: GHM_BASE_API + '/Comm/GetQiNiuUploadToken', //七牛云上传token

    // 菜单管理
    GetAllMenuDataList: GHM_BASE_API + '/Menu/GetAllMenuDataList',
    UpdateItemMenu: GHM_BASE_API + '/Menu/UpdateItemMenu',
    AddItemMenu: GHM_BASE_API + '/Menu/AddItemMenu',
    DelItemMenuByKid: GHM_BASE_API + '/Menu/DelItemMenuByKid',

    // 角色管理
    GetListRole: GHM_BASE_API + '/AdminRole/GetList',
    UpdateItemRole: GHM_BASE_API + '/AdminRole/UpdateItem',
    AddItemRole: GHM_BASE_API + '/AdminRole/AddItem',
    DeleteItemRole: GHM_BASE_API + '/AdminRole/DeleteItem',
    GetItemRole: GHM_BASE_API + '/AdminRole/GetItem',
    GetSmallListRole: GHM_BASE_API + '/AdminRole/GetSmallListRole',

    GetListBlog: GHM_BASE_API + '/AdminBlog/GetListBlog', //获取博客list
    GetItemBlog: GHM_BASE_API + '/AdminBlog/GetItemBlog', //获取博客item
    AddItemBlog: GHM_BASE_API + '/AdminBlog/AddItemBlog', //添加博客item
    UpdateItemBlog: GHM_BASE_API + '/AdminBlog/UpdateItemBlog', //添加博客item
    DeleteItemBlog: GHM_BASE_API + '/AdminBlog/DeleteItemBlog', //添加博客item
    StartOrStop: GHM_BASE_API + '/AdminBlog/StartOrStop', //启用禁用博客item


    //访问信息
    GetListAccess: GHM_BASE_API + '/Access/GetList',

    //点赞管理
    GetListArtise: GHM_BASE_API + '/Artise/GetList',

    //评论管理
    GetListAdminComment: GHM_BASE_API + '/AdminComment/GetList',
    //类别管理
    GetListCategory: GHM_BASE_API + '/Category/GetList',
    GetItemCategory: GHM_BASE_API + '/Category/GetItem', //获取博客类型
    AddItemCategory: GHM_BASE_API + '/Category/AddItem',
    UpdateItemCategory: GHM_BASE_API + '/Category/UpdateItem',
    DeleteItemCategory: GHM_BASE_API + '/Category/DeleteItem',
}