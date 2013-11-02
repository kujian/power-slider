power-slider
============

jQuery插件：万能滚动插件（包含文字滚动、图片上下滚动、图片左右滚动、图片渐隐渐现滚动、图片消失与出现滚动等）

插件作者：蔡宝坚

作者主页：http://caibajian.com

插件地址：http://caibajian.com/power-slider

插件案例：http://caibajian.com/demo/power-slider

如果你感兴趣可以下载里面包含的全部案例从index.html ~ index16.html共16个案例。

插件参数
==========
	handle: "top",
	//滚动方式，共有5种滚动方式，分别为"top"(默认),"left","hide","fadeTo","slideTo"
	prevNext: true,
	//显示上下的导航，默认显示上一页和下一页的导航<ul class="prev"></ul>与<ul class="next"></ul>
	Nav: true,
	//显示数字，默认显示数字导航，添加<ul class="slidernav"></ul>
	myTitle: false,
	//当为图片时且每屏为一张时才显示标题，默认不显示，若想要显示，请自行参照案例添加html代码
	speed: 600,
	//动画速度
	delayTime: 6000,
	//动画间隔
	clickMode: "click",
	//数字导航滑过方式
	sliderNum: 1
	//动画滚动一屏显示的数目
	
使用示例
==========
	$("#id").powerSlider(); //默认设置
	$("#id").powerSlider({handle:"left",speed:300,delayTime:3000,clickMode:"mouseover",sliderNum:4});
	//动画左右滚动，动画速度为300毫秒，动画间隔为3s，数字导航为鼠标滑过方式，动画一屏显示4张
	

更多请参照案例里面的内容

如果你有不明白或者发现有bug的地方，可以到我博客留言或者提交svn给我。

