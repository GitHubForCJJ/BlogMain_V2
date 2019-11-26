layui.define(['jquery', 'ext', 'md5'], function (exports) {
  var $ = layui.$,
    md5 = layui.md5,
    token, expire;

  var GHM_QINIU_API = 'http://cdn1.lieweiyou.com/';//七牛云上传地址
  /* cdn1.lieweiyou.com
  cdn2.lieweiyou.com
  cdn3.lieweiyou.com
  cdn4.lieweiyou.com
  cdn5.lieweiyou.com */

  function getRndInteger (min, max) {//获取1-5的随机数
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 取得上传token
  function getToken () {
    if (token && expire > new Date() * 1) return Promise.resolve(token);
    return new Promise(function (resolve, reject) {
      $.post(GHM_config.url.GetQiNiuUploadToken, {}, function (res) {
        if ((res.Code * 1) !== 0) reject();
        expire = new Date() * 1 + 6900000; // 2小时-5分钟(防止使用刚好快过期)
        resolve(token = res.Data);
      });
    });
  }

  // 生成唯一id,用做文件资源名
  function createUid () {
    var random = Math.round(Math.random() * 10000000000).toString(36);
    return md5((new Date() * 1 - 1556668800000).toString(36) + random);
  }
  /**
   * 上传七牛云
   * @param em Element input[type='file']
   * @param opt object json 选项
   *    foleder: string 上传文件位置
   *    types: array [七牛云]限制类型mimeType 默认:['image/png', 'image/jpeg', 'image/gif']
   *          若设置,替换整个默认
   *    params: json [七牛云]用来放置自定义变量  默认: {}
   *    config: json [七牛云]上传配置 默认: {useCdnDomain:true, region:qiniu.region.z2}
   *          若设置,对未设置项的默认保留
   *          配置优先级: 参数opt.config > GHM_config.qiniuUpdate > 默认项
   *    next: function 上传进度的回调函数
   * @return Promise
   */
  function upload (em, opt) {
    var $pms = [],
      files = em.files || em;
    for (var i = 0; i < files.length; i++) $pms.push(upload.blob(files[i], opt));
    return Promise.all($pms).then(function (files) {
      em.value = '';
      return files;
    });
  }

  /**
   * 单个Blob上传
   * @param blob Blob 上传的Blob对象 需要
   *    blob.name string 原来的文件名
   * @param opt json|null 同update()的参数opt
   */
  upload.blob = function (blob, opt) {
    GHM_QINIU_API = 'http://cdn' + getRndInteger(1, 5) + '.lieweiyou.com/';
    console.log(GHM_QINIU_API);
    return getToken().then(function (token) {
      opt = layui.ext(opt, {
        types: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
      });
      var name = opt.folder + '/' + createUid() + '.' + GHM_Core.getFileFormat(blob.name),
        extra = {
          fname: blob.name,
          mimeType: opt.types,
          params: opt.params || {}
        },
        config = layui.ext(
          opt.config,
          GHM_config.qiniuUpdate, {
          useCdnDomain: true,
          region: qiniu.region.z2
        }
        );

      return new Promise(function (resolve, reject) {
        qiniu.upload(blob, name, token, extra, config).subscribe(
          opt.next || function (ret) {
            /* console.log('上传中：' + ret.total.percent + '%'); */
          },
          reject,
          function (ret) {
            return resolve(GHM_QINIU_API + ret.key);
          }
        );
      });
    });
  };

  exports('GHM_upload', upload);
});