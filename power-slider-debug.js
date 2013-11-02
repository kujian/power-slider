;//v2.0修复了动画的数量，不再局限在获取图片数量，考虑到滚动的可能是文字、可能是内容。
//修复了动画滚动触发的冒泡错误
//修复了鼠标的经过方式为hover，之前为mouseover和mouseout会出现bug
//修复了渐隐渐显当一屏滚动数量不为一的错误
//v2.1去掉自动获取图片链接、标题，改为有需要手动添加html代码
//修复了长度len不为整数时的取值
//v2.2修复了渐隐渐现和上拉下拉时多张图片重叠在一起的bug
//v2.3
//去掉了隐藏与消失的动画时间
//修复了当len数字不为整数时，向前进一位
//增加了数字导航的滑过方式（可以为鼠标移上或者点击方式）
//插件名字：power-slider（多功能滚动插件）
//插件作者：蔡宝坚
//作者博客：http://caibaojian.com
//插件网站：http://caibaojian.com/power-slider
//使用协议：在保留头部版权的情况下，个人和商业均可免费使用
//使用范例：http://caibajian.com/demo/power-slider
(function($) {
	$.fn.powerSlider = function(options) {
		return this.each(function() {
			var defualts = {
				handle: "top",
				//滚动方式
				prevNext: true,
				//显示上下的导航
				Nav: true,
				//显示数字
				myTitle: false,
				//当为图片时且每屏为一张时才显示标题
				speed: 600,
				//动画速度
				delayTime: 6000,
				//动画间隔
				clickMode: "click",
				//数字导航滑过方式
				sliderNum: 1
			};
			//handle 为图片滚动方式
			var opts = $.extend({}, defualts, options),
				obj = $(this),
				index = 0,
				sliderBox = $(".sliderbox", obj),
				sliderLi = sliderBox.find("li"),
				sliderLiWidth = $(".sliderbox li:eq(0)").outerWidth(),
				liNum = sliderLi.length,
				len = (sliderLi.length) / (opts.sliderNum),
				len = Math.ceil(len),
				sliderNav = $(" .slidernav", obj),
				sliderText = $(" .slidertext", obj),
				prev = $(" .prev", obj),
				next = $(" .next", obj),
				sliderTimer, navHtml = '',
				textHtml = '';
				// console.log(len);
				// console.log(sliderLiWidth);
			//在动画还没有开始之前预定义的内容	
			for(var i = 0; i < len; i++) {
				//var title = $("li:eq(" + i + ") img", sliderBox).attr("alt");
				//var url = $("li:eq(" + i + ") a", sliderBox).attr("href");
				navHtml += '<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>';
				//textHtml += '<li><a href="' + url + '">' + title + '</a></li>';
			}
			//当动画方式为渐隐渐现时必须定义css的样式，否则动画过程会出现空白的视觉
			if(opts.handle == 'fadeTo') {
				if(opts.sliderNum<=1){
					sliderLi.css({
						"position": "absolute",
						"left": "0",
						"top": "0"
					});
				}else{
					sliderLi.each(function(i){
						$(this).css({
							"position":"absolute",
							"left":(i%opts.sliderNum)*(sliderLi.width()),
							"top":"0"
						})
					})
				}
				var nextLen = parseInt(opts.sliderNum -1);
				// console.log(nextLen);
				sliderBox.find("li:gt("+nextLen+")").hide();
				 //必须加这句css，否则渐隐渐显会出现一段空白的
			}
			//如果有导航数字的，js则在这里添加上去
			if(opts.Nav) {
				sliderNav.append(navHtml);
			}
			//if(opts.myTitle && opts.sliderNum == 1) {
			//	sliderText.append(textHtml);
			//}
			//当定义一屏的动画数目大于1时，内容为向左浮动
			if(opts.sliderNum > 1) {
				sliderLi.css("float", "left");
				
			}
			// console.log(sliderLiWidth);
			// obj.css({"width":(opts.sliderNum)*sliderLiWidth}); 由于内容多种多样性，且css列表也需要个性化，所有不加入这个固定宽度，请使用CSS自定义整体的宽度
			var slidertitle = sliderText.find("li"),
				sliderA = sliderNav.find("li");
			//当有文字标题时预先显示第一张，其余css已经设置隐藏
			slidertitle.eq(0).show();
			//默认第一张添加了一个类名current
			sliderA.eq(0).addClass("current"), sliderLi.eq(0).addClass("current");
			//结束动画开始之前的加载
			//滚动的主要函数，i的初始值为第一个，也就是0，index是随着i而变化的
			function showImg(i, index) {
				// console.log(i);
				// console.log(index);
				var sliderHeight = obj.height(),
					sliderWidth = obj.width();
				// console.log(sliderHeight);
				// console.log(sliderWidth);
				slidertitle.hide().eq(index).show();
				sliderA.removeClass("current").eq(index).addClass("current"), sliderLi.removeClass("current").eq(index).addClass("current");

				if(opts.handle == 'top') {
					sliderBox.filter(":not(':animated')").animate({
						"top": -sliderHeight * index
					}, opts.speed);
					//console.log(opts.speed);
				} else if(opts.handle == 'left') {
					sliderLi.css("float", "left");
					sliderBox.css("width", len * sliderWidth).filter(":not(':animated')").animate({
						"left": -sliderWidth * index
					}, opts.speed);
				} else if(opts.handle == 'hide') {
					//sliderLi.stop(true, true).hide().eq(index).show(opts.speed);
					var j = index + 1;
					sliderLi.hide().slice(index * (opts.sliderNum), j * (opts.sliderNum)).show();
				} else if(opts.handle == 'fadeTo') {
					sliderLi.slice(i*(opts.sliderNum),(i+1)*(opts.sliderNum)).fadeOut(opts.speed);
					sliderLi.slice(index*(opts.sliderNum),(index+1)*(opts.sliderNum)).filter(":not(':animated')").fadeIn(opts.speed);
					// console.log(i+"."+index);
				} else if(opts.handle == 'slideTo') {
					sliderLi.css("z-index", '1').filter(":not(':animated')").slideUp().slice(index*(opts.sliderNum),(index+1)*(opts.sliderNum)).css("z-index", "2").slideDown(opts.speed);
				}
			}
			sliderA.bind(opts.clickMode,function(){
				index = $(this).index();
				var i = sliderA.index($(".slidernav .current:eq(0)"));
				if(index != i) {
					showImg(i, index);
				}
				// $(this).children("a").click(function() {
				// 	return false;
				// });
			}).eq(0).trigger(opts.clickMode);
			if(len <= 1) {
				prev.hide();
				next.hide();
			} else {
				if(opts.prevNext) {
					//prev
					prev.click(function() {
						var i = index;
						index -= 1;
						if(index == -1) {
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
			var settime;
			obj.hover(function(){
				clearInterval(settime);
			},function(){
				settime = setInterval(function(){
					auto();
				},opts.delayTime);
			}).trigger("mouseleave");
			
		});	
	};
})(jQuery);