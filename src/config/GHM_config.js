/**
 * API管理
 */
var GHM_config = window.GHM_config || {};
var GHM_BASE_API = '';
// var GHM_QINIU_API = 'http://campusescdn.dongzouxizou.com/'; //七牛云上传地址
var GHM_PT_API = ''; // 平台地址
var GHM_PT_Domain = '';

var hostname = window.location.hostname;
if (hostname == 'localhost' || hostname.indexOf('192.168.20') != -1) {
    // 本地环境
    GHM_BASE_API = 'http://cjjapi.blog.com/api';
    //GHM_BASE_API = 'http://192.168.20.35:9953/api';
} else if (hostname == 'wdmain.dzxz.com') {
    // 内网环境
    GHM_BASE_API = 'http://192.168.10.19:9953/api';
    GHM_PT_Domain = '.dzxz.com';
} else if (hostname == 'admin.lieweiyou.cn') {
    // 预发布环境
    GHM_BASE_API = 'http://api.lieweiyou.cn/api';
    GHM_PT_Domain = '.dongzouxizou.cn';
} else if (hostname == 'admin.lieweiyou.com') {
    // 正式环境
    GHM_BASE_API = 'http://api.lieweiyou.com/api';
    GHM_PT_Domain = '.dongzouxizou.com';
} else if (hostname == 'testwdmain.dzxz.com') {
    // 测试环境
    GHM_BASE_API = 'http://testwdapi.dzxz.com/api';
    GHM_PT_Domain = '.dongzouxizou.com';
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

}