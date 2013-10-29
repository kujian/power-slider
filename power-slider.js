;
(function($) {
	$.fn.powerSlider = function(options) {
		return this.each(function() {
			var defualts = {
				handle: "top", //滚动方式
				prevNext: true, //显示上下的导航
				Nav: true, //显示数字
				myTitle: true, //显示标题
				speed: 600, //动画速度
				delayTime: 6000, //动画间隔
				picNum: 1
			};
			//handle 为图片滚动方式
			var opts = $.extend({},
				defualts, options),
				obj = $(this),
				index = 0,
				sliderBox = $(".sliderbox", obj),
				sliderLi = sliderBox.find("li"),
				liNum = sliderLi.length,
				len = (sliderLi.length) / (opts.picNum),
				sliderNav = $(" .slidernav", obj),
				sliderText = $(" .slidertext", obj),
				prev = $(" .prev", obj),
				next = $(" .next", obj),
				sliderTimer,
				navHtml = '',
				textHtml = '';
			for (var i = 0; i < len; i++) {
				var title = $("li:eq(" + i + ") img", sliderBox).attr("alt");
				var url = $("li:eq(" + i + ") a", sliderBox).attr("href");
				navHtml += '<li><a href="#">' + (i + 1) + '</a></li>';
				textHtml += '<li><a href="' + url + '">' + title + '</a></li>';
			}
			if (opts.handle == 'fadeTo') {
				sliderLi.css({
					"position": "absolute",
					"left": "0",
					"top": "0"
				}).not(":first").hide(); //必须加这句css，否则渐隐渐显会出现一段空白的
			}
			if (opts.Nav) {
				sliderNav.append(navHtml);
			}
			if (opts.myTitle && opts.picNum == 1) {
				sliderText.append(textHtml);
			}
			if (opts.picNum > 1) {
				sliderLi.css("float", "left");
			}
			var slidertitle = sliderText.find("li"),
				sliderA = sliderNav.find("li");
			slidertitle.eq(0).show();
			sliderA.eq(0).addClass("current"),
			sliderLi.eq(0).addClass("current");

			function showImg(i, index) {
				var sliderHeight = $(obj).height(),
					sliderWidth = $(obj).width();
				slidertitle.hide().eq(index).show();
				sliderA.removeClass("current").eq(index).addClass("current"),
				sliderLi.removeClass("current").eq(index).addClass("current");

				if (opts.handle == 'top') {
					sliderBox.stop(true, false).animate({
							"top": -sliderHeight * index
						},
						opts.speed);
				} else if (opts.handle == 'left') {
					sliderLi.css("float", "left");
					sliderBox.css("width", len * sliderWidth).stop(true, true).animate({
							"left": -sliderWidth * index
						},
						opts.speed);
				} else if (opts.handle == 'hide') {
					//sliderLi.stop(true, true).hide().eq(index).show(opts.speed);
					var j = index + 1;
					sliderLi.hide().slice(index * (opts.picNum), j * (opts.picNum)).show(opts.speed);
				} else if (opts.handle == 'fadeTo') {
					sliderLi.eq(i).stop(true, false).fadeOut(opts.speed);
					sliderLi.eq(index).stop(true, false).fadeIn(opts.speed);
					// alert(i+"."+index)
				} else if (opts.handle == 'slideTo') {
					sliderLi.css("z-index", '1').stop(true, true).slideUp().eq(index).css("z-index", "2").slideDown(opts.speed);
				}
			}
			sliderA.mouseover(function() {
				index = $(this).index();
				var i = sliderA.index($(".slidernav .current:eq(0)"));
				if (index != i) {
					showImg(i, index);
				}
				$(this).children("a").click(function() {
					return false;
				});
			}).eq(0).mouseover();
			if (len <= 1) {
				prev.hide();
				next.hide();
			} else {
				if (opts.prevNext) {
					//prev
					prev.click(function() {
						var i = index;
						index -= 1;
						if (index == -1) {
							index = len - 1
						};
						showImg(i, index);
					});
					// //next
					next.click(function() {
						auto();
					});
				}
			}
			//auto fn

			function auto() {
				var i = index;
				index = (index + 1) % len;

				showImg(i, index);
			}
			//set time
			var settime = window.setInterval(auto, opts.delayTime);
			obj.mouseover(function() {
				window.clearInterval(settime);
			});
			obj.mouseleave(function() {
				window.setInterval(auto, opts.delayTime);
			});
		});
	};
})(jQuery);