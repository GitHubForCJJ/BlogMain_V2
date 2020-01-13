layui.define(['jquery', 'cropper', 'ext', 'GHM_upload', 'layer'], function (exports) {
  var $ = layui.$,
    layer = layui.layer;
  // 裁剪弹出层
  var html = '<div class="g-cropper">' +
    '<div class="g-cropper-wrapper">' +
    '<div class="img-container">' +
    '<img src="" class="img">' +
    '</div>' +
    '<div class="img-preview"></div>' +
    '</div>' +
    '<div class="g-cropper-operate">' +
    '<a href="javascript:" class="icon icon-bigger"></a>' +
    '<a href="javascript:" class="icon icon-smaller"></a>' +
    '</div>' +
    '</div>';

  // base64转blob对象
  function base64ToBlob (base64, type) {
    var binary = atob(base64.split(',')[1]),
      char = [];
    for (var i = 0; i < binary.length; i++) char.push(binary.charCodeAt(i));
    return new Blob([new Uint8Array(char)], {
      type: type
    });
  }

  /**
   * 自动图片裁剪(调用插件)
   * @param $img Object img元素的jQuery对象
   * @param opt json|null 裁剪选项(插件的) 默认:crop.opt
   * @param ready function 准备就绪的回调(开始裁剪操作)  ready(opt,data)
   */
  function cropper ($img, opt, ready) {
    opt = layui.ext(opt, cropper.opt);
    opt.ready = function (data) {
      ready(opt, data);
    };
    $img.cropper(opt);
  }

  /**
   * 拖拽图片裁剪(调用插件)
   * @param $img Object img元素的jQuery对象
   */

  function drag ($img, opt) {
    opt = layui.ext(opt, drag.opt);
    $img.on({
      ready: function (e) {
        // console.log(e.type);
      }
    }).cropper(opt);
  }

  /** 自动裁剪默认配置 */
  cropper.opt = {
    aspectRatio: 5 / 4,
    minContainerWidth: 1000,
    minContainerHeight: 800,
    zoomOnWheel: true,
    movable: true,
    viewMode: 1,
    dragMode: 'none',
  };

  /** 拖拽裁剪默认配置 */
  drag.opt = {
    aspectRatio: 16 / 9,
    preview: '.img-preview'
  };
  /* width: 750,
  height: 422,
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high' */
  /**
   * 自动裁剪并上传七牛云(单个)
   * @param file object 文件的Blob对象
   * @param cropperOpt json|null 裁剪选项 同cropper()的参数opt
   * @param canvasOpt json|null 裁剪canvas选项
   *      插件的$img.cropper('getCroppedCanvas',canvasOpt)
   *      默认: {}width:500,height:500}
   * @param uploadOpt json|null 上传的选项 同GHM_upload.blob()的参数opt
   * @return Promise string 上传的urL
   */
  cropper.autoOne = function (file, cropperOpt, canvasOpt, uploadOpt) {
    return new Promise(function (resolve, reject) {
      var $box = $('<div><img/></div>'),
        $img = $box.children('img'),
        reader = new FileReader();
      cropper($img, cropperOpt, function () {
        canvasOpt = layui.ext(canvasOpt, {
          width: 750,
          height: 600
        });
        var canvas = $img.cropper('getCroppedCanvas', canvasOpt);
        var blob = base64ToBlob(canvas.toDataURL('image/jpeg'), 'image/jpeg');
        blob.name = file.name + '.jpg';
        resolve(layui.GHM_upload.blob(blob, uploadOpt));
      });
      reader.onerror = reject;
      reader.onload = function (evt) {
        var src = evt.target.result;
        $img.cropper('replace', src, false);
      };
      reader.readAsDataURL(file);
    });
  };

  /**
   * 自动裁剪并上传七牛云(多个)
   * @param $input Element input[type="file"]的原生对象(可多选的)
   * @param cropperOpt json|null 裁剪选项 同cropper.autoOne()的cropperOpt参数
   * @param canvasOpt json|null 裁剪canvas选项 同cropper.autoOne()的canvasOpt参数
   * @param uploadOpt json|null 上传的选项 同同cropper.autoOne()的uploadOpt参数
   * @return Promise array 上传的urL
   */
  cropper.autoMul = function ($input, cropperOpt, canvasOpt, uploadOpt) {
    var files = $input.files,
      $pms = [];
    if (!files.length) return Promise.resolve([]);
    for (var i = 0; i < files.length; i++)
      $pms.push(cropper.autoOne(files[i], cropperOpt, canvasOpt, uploadOpt));

    return Promise.all($pms).then(function (files) {
      $input.value = '';
      return files;
    });
  };

  /**
   * 手动裁剪并上传七牛云(单个)
   * @param $input Element input[type="file"]的原生对象(可多选的)
   * @param cropperOpt json|null 裁剪选项 同cropper.autoOne()的cropperOpt参数
   * @param uploadOpt json|null 上传的选项 同同cropper.autoOne()的uploadOpt参数
   * @param canvasOpt json|null canvas选项，canvas大小或者填充背景色等
   * @return Promise array 上传的urL
   */

  cropper.drag = function (el, cropperOpt, canvasOpt, uploadOpt) {
    var file = el.files[0];
    canvasOpt = layui.ext(canvasOpt, {
      width: 750,
      height: 422,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high'
    });
    return new Promise(function (resolve, reject) {
      // 弹出弹出层，回显图片
      var index = layer.open({
        type: 1,
        title: '裁剪图片',
        content: html,
        area: ['800px', '732px'],
        btn: ['确定', '取消'],
        success: function () {
          var $box = $('.g-cropper');
          var $img = $box.find('.img');
          var reader = new FileReader();
          $img.attr('src', reader.result);
          drag($img, cropperOpt);

          reader.onerror = reject;
          reader.onload = function (evt) {
            var src = evt.target.result;
            $img.cropper('replace', src, false);
          };
          reader.readAsDataURL(file);
          $box.on('click', '.icon-bigger', function () {
            $img.cropper('zoom', 0.1);
          });
          $box.on('click', '.icon-smaller', function () {
            $img.cropper('zoom', -0.1);
          });
        },
        yes: function () {
          var $box = $('.g-cropper');
          var $img = $box.find('.img');
          var canvas = $img.cropper('getCroppedCanvas', canvasOpt);
          var blob = base64ToBlob(canvas.toDataURL('image/jpeg'), 'image/jpeg');
          blob.name = file.name + '.jpg';
          resolve(layui.GHM_upload.blob(blob, uploadOpt));
        },
        btn2: function () {
          layer.close(index);
          $(el).val('');
        },
        cancel: function () {
          layer.close(index);
          $(el).val('');
        }
      });
    });
  };

  exports('GHM_Crop', cropper)
});
