var GHM_Core = window.GHM_Core || {};
// 清空调试信息
// console.log = function () {};
/**
 * 返回指定长度的随机字符串
 * 参数:len(number)
 */
GHM_Core.ranStr = function (len) {
  var str = '';
  for (var i = 0; i < len; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return layui.md5(str);
};
/**
 * 获取get请求后面的参数
 * 参数:url(string)
 */
GHM_Core.getRequest = function (url) {
  var url = url || location.search; //获取url中"?"符后的字串  
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};
/**
 * 检测对象是否为空
 * 参数:obj(Object)
 */
GHM_Core.isEmpty = function (obj) {
  return !Object.keys(obj).length;
};

/**
 * 检测页面按钮权限
 * 参数：
 * url(string):当前页url:按钮权限url('roleManage/index:add')
 */
GHM_Core.btnRole = function (url) {
  var list = JSON.parse(localStorage.getItem('BlogAdmin')).UserMenu.UserMenuByLevel;
  var rtn = {};
  list.forEach(function (l1) {
    if (!l1.subMenuLst || !l1.subMenuLst.length) return;
    l1.subMenuLst.forEach(function (l2) {
      if (!l2.subMenuLst || !l2.subMenuLst.length) return;
      l2.subMenuLst.forEach(function (l3) {
        rtn[l2.url + ':' + l3.url] = l3;
      })
    })
  })
  return !!rtn[url];
};
/**
 * 获取文件扩展名
 * 参数：
 * name(string)
 */
GHM_Core.getFileFormat = function (name) {
  var fileName = name.lastIndexOf('.');
  var fileNameLength = name.length;
  var fileFormat = name.substring(fileName + 1, fileNameLength);
  return fileFormat;
};

/**
 * 对比两个数组是否相等
 * arr1:(Array)
 * arr2:(Array)
 */
GHM_Core.arrayIsEqual = function (arr1, arr2) {
  if (!arr1 || !arr2) return false;
  if (arr1.length != arr2.length) return false;
  for (var i = 0, l = arr1.length; i < l; i++) {
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      if (!arr1[i].equals(arr2[i])) return false;
    } else if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
};

/**
 * 限制只能输入两位小数的正数
 * @param obj(原生对象)
 */
GHM_Core.checkNum = function (obj) {
  obj.value = obj.value.replace(/[^\d.]/g, "");
  obj.value = obj.value.replace(/^\./g, "");
  obj.value = obj.value.replace(/\.{2,}/g, ".");
  obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
};

/**
 * 获取Kid
 */
GHM_Core.getKid = function () {
  return JSON.parse(localStorage.getItem('BlogAdmin')).Model.KID

}
/**
 * 是否为管理员
 */
GHM_Core.getIsAdmin = function () {
  return JSON.parse(localStorage.getItem('BlogAdmin')).Model.IsAdmin
}

GHM_Core.CompanyType = function () {
  return JSON.parse(localStorage.getItem('BlogAdmin')).Model.CompanyType
}

/* 只允许输入数字
 * @param obj(原生对象)
 */
GHM_Core.onlyNum = function (obj) {
  obj.value = obj.value.replace(/[^\d]/g, "");
};

/**
 * 校验身份证
 * @param {String} code，要校验的身份证号
 * @param {Boolean} isObj，是否输出对象
 */
GHM_Core.checkIDCard = function (code, isObj) {
  var ret = new Object();
  ret.msg = "";
  ret.issuccess = true;
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };

  //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (!code || !idcardReg.test(code)) {
    ret.msg = "身份证号格式错误";
    ret.issuccess = false;
  } else if (code.length != 18) {
    ret.msg = "身份证号格式错误";
    ret.issuccess = false;
  } else if (!city[code.substr(0, 2)]) {
    ret.msg = "地址编码错误";
    ret.issuccess = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        ret.msg = "校验位错误";
        ret.issuccess = false;
      }
    }
  }
  if (ret.issuccess) {
    code = code.join("");
    var date = code.substr(6, 4) + "-" + code.substr(10, 2) + "-" + code.substr(12, 2);
    ret.birthday = date;
    if (parseInt(code.substr(16, 1)) % 2 == 1) {
      ret.sex = 1;
    } else {
      ret.sex = 0;
    }
  }
  if (isObj) return ret;
  return ret.issuccess;
}
/**
 * date格式化处理
 * @param fmt(string,处理后的格式，如yyyy:MM:dd,注意大小写)
 * @param date(string,处理前的时间)
 */
GHM_Core.dateFtt = function (fmt, date) {
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
GHM_Core.downloadFile = function (url) {
  // 无闪现下载excel
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  console.log(url);
  function iframeLoad () {
    console.log('iframe onload');
    var win = iframe.contentWindow;
    var doc = win.document;
    if (win.location.href === url) {
      if (doc.body.childNodes.length > 0) {
        // response is error
      }
      iframe.parentNode.removeChild(iframe);
    }
  }
  if ('onload' in iframe) {
    iframe.onload = iframeLoad;
  } else if (iframe.attachEvent) {
    iframe.attachEvent('onload', iframeLoad);
  } else {
    iframe.onreadystatechange = function onreadystatechange () {
      if (iframe.readyState === 'complete') {
        iframeLoad;
      }
    };
  }
  iframe.src = '';
  document.body.appendChild(iframe);
  setTimeout(function loadUrl () {
    iframe.contentWindow.location.href = url;
  }, 50);
}
/**
 * loading层
 * @param {string} msg,loading提示消息
 */
GHM_Core.loading = function (msg) {
  msg = msg || '加载中';
  return layer.msg(msg, {
    icon: 16,
    shade: [0.5, '#000'],
    time: false
  });
};

/**
 * 重载数据表格
 * @param {string} table,数据表格的filter
 */
GHM_Core.reloadTable = function (table) {
  var btnrefresh = window.parent.document.getElementsByClassName('layui-laypage-btn')[0];
  if (btnrefresh == null) {
    layui.table.reload(table);
  } else {
    btnrefresh.click();
  }
}

GHM_Core.getNowFormatDate = function () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}




GHM_Core.checkPassport = function (code) {
  var tip = "OK";
  var pass = true;

  if (!code || !/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(code)) {
    tip = "护照号码格式错误";
    pass = false;
  }
  return { 'errCode': pass, 'errMsg': tip };
}

/**
 * 设置左侧导航高亮
 * @param {string} str,高亮 dd 的data-name值
 */
GHM_Core.setNav = function (str) {
  $('.layui-nav').find('dd[data-name="' + str + '"]').addClass('layui-this');
  setTimeout(function () {
    $('.layui-nav').find('dd[data-name="' + str + '"]').addClass('layui-this');
  }, 500);
};

// 全屏popup
GHM_Core.fullPopup = function (tit, url, data, fn) {
  var width = $('.layui-body').width();
  var height = $('.layui-body').height();
  layui.admin.popup({
    title: tit,
    area: [width + 'px', height + 'px'],
    offset: ['50px', '220px'],
    success: function (layero, index) {
      //传入当前行的数据
      layui.view(this.id).render(url, data).done(fn);
    }
  });
};

/**
 * 判断是否为空
 * @param val mixed 要判断的值
 * @return boolean
 */
GHM_Core.isEmpty = function (val) {
  if (!val) return true;
  if (typeof val !== 'object') return false; // true | string!=='' | number!==0
  if (val instanceof Array) return !val.length; // array
  return !Object.keys(val).length; // object
}

// base64转blob对象
GHM_Core.base64ToBlob = function (base64, type) {
  var binary = atob(base64.split(',')[1]),
    char = [];
  for (var i = 0; i < binary.length; i++) char.push(binary.charCodeAt(i));
  return new Blob([new Uint8Array(char)], {
    type: type
  });
}