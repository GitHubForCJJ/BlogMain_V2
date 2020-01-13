// GHM 请求数据模块
layui.define(['ext', 'token', 'md5', 'des', 'jquery', 'setter', 'layer'], function (exports) {
  var setter = layui.setter;
  var GHM = {};
  GHM.post = function (url, data) {
    var resEncrypt = layui.data(setter.tableName).dataIsEncrypt;
    window.console.log(resEncrypt);
    var secret = layui.token(true);
    var data = layui.ext(data, layui.GHM.data);
    var time = data.Timestamp = Math.round(new Date() / 1000); // 时分秒
    var token = data.Token = layui.token();
    if (token && data.Data && resEncrypt) data.Data = layui.des.encrypt(data.Data, secret, secret)
    data.Md5 = layui.md5(data.Data + time + '{' + token + '}');

    return new Promise(function (resolve, reject) {
      layui.jquery.post(url, data)
        .done(function (res) {
          if (resEncrypt && typeof res.Data === 'string') {
            var data = layui.des.decrypt(res.Data, secret, secret);
            res.Data = JSON.parse(data);
            try { res.Data = JSON.parse(data); }
            catch (err) { return reject(err); }
          } else if (typeof res.Data === 'string') {
            try { res.Data = JSON.parse(res.Data); }
            catch (err) { return reject(err); }
          }
          res.Code ? reject(res) : resolve(res);
        })
        .fail(function (err) {
          reject(err);
        });
    });
  };

  // default data
  GHM.data = {
    "AppId": GHM_config.reqBase.AppId,
    "AppName": GHM_config.reqBase.AppName,
    "AppType": GHM_config.reqBase.AppType,
    "AppVersion": GHM_config.reqBase.AppVersion,
    "Page": GHM_config.reqBase.Page,
    "Limit": GHM_config.reqBase.Limit,
    // "ResIp": returnCitySN["cip"],
    "Data": "{}"
  };

  GHM.PwdData = function (data) {
    window.console.log(data)
    var data = layui.ext(data, layui.GHM.data);
    var time = data.Timestamp = Math.round(new Date() / 1000); // 时分秒
    var token = data.Token = layui.token();
    var secret = layui.token(true);
    var resEncrypt = layui.data(setter.tableName).dataIsEncrypt;
    window.console.log(resEncrypt)
    // if (token && data.Data && resEncrypt) data.Data = layui.des.encrypt(data.Data, secret, secret)
    data.Md5 = layui.md5(data.Data + time + '{' + token + '}');
    return data;
  };

  GHM.UnPwdData = function (res) {
    window.console.log(res)
    var secret = layui.token(true);
    var resEncrypt = layui.data(setter.tableName).dataIsEncrypt;
    // if (resEncrypt && typeof res.Data === 'string') {
    //   var data = layui.des.decrypt(res.Data, secret, secret);
    //   res.Data = JSON.parse(data);
    // } else {
    //   res.Data = JSON.parse(res.Data);
    // }
    res.Data = JSON.parse(res.Data);
    return res;
  };

  /**
   * 基于Promise封装的ajax请求，不加密
   * @param {string} url 请求地址
   * @param {string} data 序列化后的json字符串
   * @param {string} method 请求方法，默认post
   */
  GHM.ComPost = function (url, data, method) {
    method = method || 'post';
    return new Promise(function (resolve, reject) {
      layui.jquery.ajax({
        url: url,
        data: data,
        method: method,
        contentType: 'application/json',
        success: function (res) {
          res.Code ? reject(res) : resolve(res);
        },
        error: function (err) {
          reject(err);
        }
      })
    });
  }
  exports('GHM', GHM);
});
