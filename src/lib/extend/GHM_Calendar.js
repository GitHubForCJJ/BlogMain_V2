/*
 * @Author: Tangfan 
 * @Date: 2019-10-08 14:39:32 
 * @Last Modified by: Tangfan
 * @Last Modified time: 2019-12-05 15:00:40
 */
'use strict';
(function () {
  var GHMCalendar = function (em, ops) {
    var nowDate = new Date();
    var _this = this;
    var defaults = {
      nowYear: nowDate.getFullYear(),
      nowMonth: nowDate.getMonth() + 1,
      nowDay: nowDate.getDate(),
      cYear: nowDate.getFullYear(),
      cMonth: nowDate.getMonth() + 1
    };
    this.$text = em.find('.text');
    this.$days = em.find('.days');
    this.options = $.extend({}, defaults, ops);
    this.$prev = em.find('.prev');
    this.$next = em.find('.next');
    this.$el = em;
    this.selectedObj = {};

    this.$prev.click(function () {
      _this.swipeMonth(_this.options.cYear, _this.options.cMonth, 0);
    });
    this.$next.click(function () {
      _this.swipeMonth(_this.options.cYear, _this.options.cMonth, 1);
    });
    this.select();

    return this;
  };

  // 获取当前月份
  GHMCalendar.getDaysInMonth = function (year, month) {
    var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((month == 2) && ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))) {
      return 29;
    } else {
      return daysInMonth[month];
    }
  };
  // 获取某个日期是周几
  GHMCalendar.getDay = function (year, month, date) {
    var date = new Date(year + '/' + month + '/' + date);
    return date.getDay();
  };
  GHMCalendar.prototype = { constructor: GHMCalendar }
  // 渲染日历
  GHMCalendar.prototype.render = function (year, month) {
    year = year || this.options.cYear;
    month = month || this.options.cMonth;
    var monStr = month;//月份补齐两位数
    this.$text.attr('data-year', year);
    this.$text.attr('data-month', month);
    if (month * 1 < 10) monStr = '0' + monStr;
    else monStr = monStr + '';

    this.$text.text(year + '年' + monStr + '月');
    var days = GHMCalendar.getDaysInMonth(year, month);
    var firstDay = GHMCalendar.getDay(year, month, 1);
    var endDay = GHMCalendar.getDay(year, month, days);
    var obj = [];
    var _this = this;
    if (firstDay) {
      for (var i = 0; i < firstDay; i++) {
        obj.push({
          abled: false,
          content: ''
        });
      }
    }
    for (var i = 0; i < days; i++) {
      // 今天之前的日期不能选
      var day = i + 1;

      if (day * 1 < 10) day = '0' + day;
      else day = day + '';

      if (this.options.nowYear === this.options.cYear && this.options.nowMonth === this.options.cMonth && (i + 1) < this.options.nowDay) {
        obj.push({
          content: day,
          abled: false,
          date: this.options.cYear + '-' + monStr + '-' + day
        });
      } else {
        obj.push({
          content: day,
          abled: true,
          date: this.options.cYear + '-' + monStr + '-' + day
        });
      }
    }
    if (endDay !== 6) {
      for (var i = 0; i < (6 - endDay); i++) {
        obj.push({
          abled: false,
          content: ''
        });
      }
    }
    // 数据处理下
    var htm = '';
    // console.log(obj);  
    for (var i = 0; i < obj.length; i++) {
      // 数据预处理
      if (!GHM_Core.isEmpty(_this.selectedObj)) {
        var selected = _this.selectedObj[obj[i].date];
        if (selected) {
          obj[i].price = selected.price;
          obj[i].stock = selected.stock;
          obj[i].spec = selected.spec;
        }
      }
      var disableClass = '';
      obj[i].abled ? disableClass = '' : disableClass = ' disable';
      var price = obj[i].price ? obj[i].price : '';
      var stock = obj[i].stock ? obj[i].stock : '';
      var spec = obj[i].spec ? obj[i].spec : '';//1五星 2四星 3特价'
      var specMsg = '';
      var stockMsg = stock ? '库存：' : '';
      var currentDate = '';
      var priceColor = 'red';
      // if (obj[i].content) currentDate = _this.options.cYear + '-' + _this.options.cMonth + '-' + obj[i].content;
      if (obj[i].content) currentDate = obj[i].date;
      if (spec * 1 === 1) specMsg = '五：￥';
      else if (spec * 1 === 2) specMsg = '四：￥';
      else if (spec * 1 === 3) specMsg = '特：￥';
      if (price) priceColor = '';
      else specMsg = specMsg.replace('￥', '');

      htm += '<li class="day' + disableClass + '" data-date="' + currentDate + '" data-spec = "' + spec + '">' +
        '<span class="content">' + obj[i].content + '</span>' +
        '<span class="label price ' + priceColor + '">' + specMsg + price + '</span>' +
        '<span class="label stock">' + stockMsg + stock + '</span>' +
        '</li>';
      this.$days.html(htm);
    }
  };
  // 切换月份
  GHMCalendar.prototype.swipeMonth = function (year, month, type) {
    // type: 0上一月 1下一月
    if (type) {
      // next
      if (month >= 12) {
        this.options.cYear += 1;
        this.options.cMonth = 1;
      } else this.options.cMonth++;
    } else {
      // prev
      if (year === this.options.nowYear && month === this.options.nowMonth) {
        this.options.cYear = this.options.nowYear;
        this.options.cMonth = this.options.nowMonth;
      } else {
        if (month == 1) {
          this.options.cYear -= 1;
          this.options.cMonth = 12;
        } else this.options.cMonth--;
      }
    }
    this.render(this.options.cYear, this.options.cMonth);
  };
  // 拖拽选中高亮
  GHMCalendar.prototype.select = function (obj) {
    var _this = this;
    this.$days.selectable({
      cancel: '.disable',
      filter: 'li',
      stop: function () {
        $(".ui-selected", this).each(function () {
          if ($(this).hasClass('disable')) {
            $(this).removeClass('ui-selected');
          } else {
            var currentDate = $(this).attr('data-date') + '-' + $(this).attr('data-spec');
            var field = obj[currentDate];
            var specialArr = [];
            var htm = '';
            var $form = $(this).parents('.set-date').siblings('.set-price').find('.detail');
            var $addSpecial = $(this).parents('.set-date').siblings('.set-price').find('.add_special');
            $('.special-line').remove();
            $addSpecial.attr('data-max', 2);

            if (field) {
              if (field.SpecialName1) specialArr.push({ name: field.SpecialName1, value: field.SpecialOverPrice1 });
              if (field.SpecialName2) specialArr.push({ name: field.SpecialName2, value: field.SpecialOverPrice2 });

              $.each($form.find('input'), function (index, item) {
                var name = $(item).attr('name');
                $(item).val(field[name]);
              });
              $.each(specialArr, function (index, item) {
                htm += '<dl class="special-line">' +
                  '<dt>' +
                  '<span>特殊人群</span>' +
                  '</dt>' +
                  '<dd>' +
                  '<div class="panel-box">' +
                  '<div class="g-panel-box">' +
                  '<div class="g-panel-item special-panel" right>' +
                  '<div class="g-panel-input">' +
                  '<input type="text" class="layui-input special-name" name="SpecialName"' +
                  'placeholder="请输入特殊人群名称，8字以内" maxlength="8" value="' + item.name + '">' +
                  '<input type="text" class="layui-input special-price" placeholder="请输入"' +
                  'name="SpecialOverPrice" onkeyup="GHM_Core.checkNum(this)" value="' + item.value + '">' +
                  '</div>' +
                  '<span>元/人</span>' +
                  '</div>' +
                  '<a href="javascript:" class="icon-delete delete_special"></a>' +
                  '</div>' +
                  '</div>' +
                  '</dd>' +
                  '</dl>';
              });
              $form.append(htm);
              $addSpecial.attr('data-max', (2 - specialArr.length))
            }
          }
        });
      }
    });
  };
  // 价格设置拖拽选中
  GHMCalendar.prototype.selectPrice = function (obj) {
    this.$days.selectable({
      cancel: '.disable',
      filter: 'li',
      stop: function () {
        $(".ui-selected", this).each(function () {
          if ($(this).hasClass('disable') || (!$(this).attr('data-spec').length)) {
            $(this).removeClass('ui-selected');
          } else {
            var currentDate = $(this).attr('data-date') + '-' + $(this).attr('data-spec');
            var $setPrice = $(this).parents('.set-date').siblings('.set-price');
            var $form = $setPrice.find('.set-by-calendar');
            var $tbody = $setPrice.find('table tbody');
            var $inputs = $form.find('input');
            var $specialLine = $tbody.find('.special-line');
            var formObj = obj[currentDate];
            var specialArr = [];
            var Commission = $('input[name = Commission]').val();
            var htm = '';

            formObj.StockOth = formObj.StockSum - formObj.StockDzxz;
            $specialLine.remove();
            $tbody.find('tr').removeClass('layui-hide');
            if (formObj) {
              if (formObj.SpecialName1.length) specialArr.push({ name: formObj.SpecialName1, value: formObj.SpecialOverPrice1 });
              if (formObj.SpecialName2.length) specialArr.push({ name: formObj.SpecialName2, value: formObj.SpecialOverPrice2 });
              // console.log(formObj, specialArr);
              // 表单回显
              $.each($inputs, function (index, item) {
                // console.log('表单回显', item);
                var name = $(item).attr('name');
                if ((formObj[name] + '').length && name !== 'Commission') {
                  $(item).val(formObj[name]);
                }
                if ((formObj.ChildOverPrice <= 0)) {
                  //儿童结算价
                  $tbody.find('.tr-child').addClass('layui-hide');
                }
                if ((formObj.BabyOverPrice <= 0)) {
                  //婴儿童结算价
                  $tbody.find('.tr-baby').addClass('layui-hide');
                }
              });
              $.each(specialArr, function (index, item) {
                var SpecialOverPrice = formObj['SpecialOverPrice' + (index + 1)];
                var SpecialSellPrice = formObj['SpecialSellPrice' + (index + 1)];
                var SpecialDisPrice = formObj['SpecialDisPrice' + (index + 1)];
                var SpecialTeamPrice = formObj['SpecialTeamPrice' + (index + 1)];
                var SpecialStaffPrice = formObj['SpecialStaffPrice' + (index + 1)];
                var SpecialChargePrice = formObj['SpecialChargePrice' + (index + 1)];
                var SpecialProfitPrice = formObj['SpecialProfitPrice' + (index + 1)];

                htm += '<tr class="special-line">' +
                  '<input type="hidden" name="SpecialName' + (index + 1) + '" value="' + formObj['SpecialName' + (index + 1)] + '">' +
                  '<td style="text-align:center"><span>' + formObj['SpecialName' + (index + 1)] + '</span></td>' +
                  '<td><input type="text" name="SpecialOverPrice' + (index + 1) + '" class="layui-input auto-complete" data-msg="' + formObj['SpecialName' + (index + 1)] + '结算价" placeholder="自动读取，可修改" value="' + SpecialOverPrice + '"></td>' +
                  '<td><input type="text" name="SpecialSellPrice' + (index + 1) + '" class="layui-input auto-complete" data-msg="' + formObj['SpecialName' + (index + 1)] + '销售价" placeholder="请输入" value="' + SpecialSellPrice + '"></td>' +
                  '<td><input type="text" name="SpecialDisPrice' + (index + 1) + '" class="layui-input auto-complete" data-msg="' + formObj['SpecialName' + (index + 1)] + '分销佣金" placeholder="请输入" value="' + SpecialDisPrice + '"></td>' +
                  '<td><input type="text" name="SpecialTeamPrice' + (index + 1) + '" class="layui-input auto-complete" data-msg="' + formObj['SpecialName' + (index + 1)] + '团长佣金" placeholder="请输入" value="' + SpecialTeamPrice + '"></td>' +
                  '<td><input type="text" name="SpecialStaffPrice' + (index + 1) + '" class="layui-input auto-complete" data-msg="' + formObj['SpecialName' + (index + 1)] + '员工提成" placeholder="请输入" value="' + SpecialStaffPrice + '"></td>' +
                  '<td><input type="text" name="Commission" class="layui-input" disabled placeholder="自动计算"' + 'value="' + Commission + '"></td>' +
                  '<td>' +
                  '<input type="text" name="SpecialChargePrice' + (index + 1) + '" class="layui-input" disabled placeholder="自动计算" value="' + SpecialChargePrice + '"></td>' +
                  '<td><input type="text" name="SpecialProfitPrice' + (index + 1) + '" class="layui-input" disabled placeholder="自动计算" value="' + SpecialProfitPrice + '"></td>' +
                  '</tr>';
              });
              $tbody.append(htm);
            }
          }
        });
      }
    });
  };
  // 保存团期
  GHMCalendar.prototype.saveDate = function (isCalendar, arr) {
    // isCalendar:是否日历设置 1日历设置 0 天天发团设置，默认日历设置
    isCalendar = isCalendar || 1;

    if (isCalendar) {
      //日历设置
      var _this = this;
      $.each(arr, function (index, item) {
        _this.selectedObj[item.date] = item;
      });
      // console.log(_this.selectedObj);
      // 重新渲染日历
      this.render();
    } else {
      // 天天发团设置
    }
  };
  // 取消团期
  GHMCalendar.prototype.cancelDate = function (isCalendar, arr) {
    // isCalendar:是否日历设置 1日历设置 0 天天发团设置，默认日历设置
    isCalendar = isCalendar || 1;
    if (isCalendar) {
      // 日历设置
      var _this = this;
      $.each(arr, function (index, item) {
        delete _this.selectedObj[item.date];
      })
      this.render();
    }
  };
  GHMCalendar.prototype.loadDate = function (arr) {
    // console.log(arr);
    //日历设置
    var _this = this;
    $.each(arr, function (index, item) {
      _this.selectedObj[item.date] = item;
    });
    // console.log(_this.selectedObj);
    // 重新渲染日历
    this.render();
  };
  window.GHMCalendar = GHMCalendar;
})();