//封装模块:
//首页轮播  + 导航固定

define(['jquery'],function($){

/*************************************************加载网页头部*************************************************************8*/
/*	$("header").load("../html/header.html",function(){
		console.log("网页头部加载成功");
	})
*/
	/*--------------------------------导航固定----retunTop && WeChat ---------------------------------*/
	$(window).scroll (function(){
		var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollHeight >= 162){
			$(".navall").css({
				"position":"fixed",
				"top" : 0,
				"z-index":9999
			}),
			$(".returnTop .top").css({
				"display":"block",
			})
		}else{
			$(".navall").css({
				"top" : 162 - 44-scrollHeight
			})
			$(".returnTop .top").css({
				"display":"none",
			})
		}
		$(".returnTop .top").click(function(){
//			document.body.scrollTop = 0;
			$("body").scrollTop(0);
		})
		//读取cookie并更新购物车数据
		var goods = $.cookie('goods');
		if(goods){
			goodsNum= goods.split(',')[6]
			$('#buy').html(goodsNum);
			$('.top_center>.num').html(goodsNum)
		}
		
	})
		/*-----------------------------------------下拉菜单-------------------------------------------------------------*/
		/*	$("#selectcard li").eq(0).find(".nav2all").css({
				"display" : "block",
				"background" : "red"
			});*/
		
		
		/*-----------------------------------------下拉菜单-------------------------------------------------------------*/
	
	//轮播
	function banner(){
		//获取首页json;
		$.getJSON('json/img.json',["img","span","agio","time"],function(data){
//			console.log(data[0].img);
//			console.log(data);
			for(var i=0;i<4;i++){
					$(".banner ul").append($("<li><a href='html/list.html'><img src='"+data[i].img+"'/></a></li>"));
				}
			
			class Banner{
			contructor(){
				this.timer = null;
				this.init();
				this.autoPlay();
				}
			init(){
				this.index = 0;
			this.timer = null;
			this.num = 0;
			var imgClone = $(".banner ul li").eq(0).clone(true);
//			console.log(imgClone)
//			console.log($(".banner ul li"))
			$(".banner ul").append(imgClone);
			this.ullis = $(".banner ul li");
//			this.num = $("banner ul li").length;
			$(".banner ul").width(1280 * this.ullis.length + 'px');
				this.span = $(".banner_span span")
//				console.log(this.ullis);
//				console.log(this.span)
				this.autoPlay();
				}
			
			autoPlay(){
				clearInterval(this.timer);
				var _this = this;
					
				this.timer = setInterval(function(){
//					console.log(1);
					if(_this.index == _this.ullis.length - 1){
						_this.index = 1;
						$(".banner ul").css({"left":0})
					}else{
						$(".banner ul").animate({
						"left" : -1280*_this.index++
					},500);
//						_this.index++;
					}
//					console.log(_this.index);
					
					_this.span.eq(_this.index - 1).addClass("span_active").siblings().removeClass("span_active");
				},2500)
			}
			}
			new Banner().init();
		})
	}
	banner();
	
	//	今日上新数据
	$.ajax({
		type : "GET",
		url : "json/img.json",
		success : function(data){
//			console.log(data);
			//遍历json
			for(var json = 4;json < data.length;json++ ){
//				console.log(data[json].img);
//				$("<div class = 'left'><div class = 'shop'><img src='"+data[json].img+"'/></div></div>").appendTo(".content");
//				$("<div class = 'shopmean'><span>+"+data[json].span+"+</span></div>").appendTo(".content .left .shop");
//				$("<p><span>"+data[json].agio+"</span>折起</p>").appendTo(".content .shopmean")

				$("<div class = 'left'><div class = 'shop'><img src='"+data[json].img+"'/></div><div class = 'shopmean'><span>+"+data[json].span+"+</span><p><span>"+data[json].agio+"</span>折起</p><div class = 'shoptime'>"+data[json].time+"</div></div></div>").appendTo("#newDay");
				
			}
		}
	})
	
	/***********************************************hotsale json*******************************************************************/
		$.getJSON("../json/hotsale.json",function(data){
//			console.log(data.hotsale); //取得所有hotsale数组
//			console.log(data.hotsale[1].img);//取得hotsale下第一组的img
			$.each(data.hotsale,function(index,value){  
//				console.log(value.img);//取得hotsale下面每一个img
				$("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>").appendTo("#hotsale")
		})
	
	})
	/***********************************************hotsale json*******************************************************************/
	/***********************************************woman json*******************************************************************/
			$.getJSON("../json/hotsale.json",function(data){
//			console.log(data.hotsale); //取得所有hotsale数组
//			console.log(data.hotsale[1].img);//取得hotsale下第一组的img
			$.each(data.woman,function(index,value){  
//				console.log(value.img);//woman
				$("#woman").append($("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>"));
		})
	
	})
/***********************************************woman json*******************************************************************/
/***********************************************man json*******************************************************************/
	$.getJSON("../json/hotsale.json",function(data){
//		console.log(data.man)
		$.each(data.man,function(key,value){
//			console.log(value.img)
			$("#man").append($("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>"))
			
		})
	})
/***********************************************man json*******************************************************************/
/***********************************************美妆 beauty*******************************************************************/
	$.getJSON("../json/hotsale.json",function(data){
		$.each(data.beauty,function(index,value){
			$("#beauty").append($("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>"))
			
		})
	})

/***********************************************美妆 beauty*******************************************************************/

/***********************************************家居 garden*******************************************************************/
	$.getJSON("../json/hotsale.json",function(data){
		$.each(data.garden,function(index,value){
//			console.log(value.img);
			$("#garden").append($("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>"))
		
		})
	})


/***********************************************家居 garden*******************************************************************/



/***********************************************婴童 child*******************************************************************/
	$.getJSON("json/hotsale.json",function(data){
		$.each(data.child,function(index,value){
			$("#child").append($("<div class ='left'><div class='shop'><img src= '../"+value.img+"'/></div><div class = 'shopmean'><span>"+value.span+"</span><p><span>"+value.agio+"</span>折起</p><div class = 'shoptime'>"+value.time+"</div><div></div>"))
			
		})
	})

/***********************************************婴童 child*******************************************************************/
	
/***********************************************海外 overseas*******************************************************************/
	$.getJSON("../json/hotsale.json",function(data){
		$.each(data.overseas,function(index,value){
			/*$("#overseas").append($("<div class ='left'>
										<div class='shop'>
											<img src= '../"+value.img+"'/>
										</div>
										<div class = 'shopmean'>
											<span>"+value.span+"</span>
											<p><span>"+value.agio+"</span>折起</p>
											<div class = 'shoptime'>"+value.time+"</div>
										<div>
									</div>"))*/
//									$("`<div class = 'left'><div class = 'shop'><img src = '../${value.img}'/></div><div class = 'shopmean'><span>${value.span}</span><p><span>${value.agio}</span>折起</p><div class = 'shoptime'>${value.time}</div></div></div>`").appendTo("#overseas")
			
			$("#overseas").append($(`<div class ='left'><div class='shop'><img src= '../${value.img}'/></div><div class = 'shopmean'><span>${value.span}</span><p><span>${value.agio}</span>折起</p><div class = 'shoptime'>${value.time}</div><div></div>`))
			
		})
	})

/***********************************************海外 overseas*******************************************************************/
	
	/*****************************************选项卡****************************************************/
	class Tabs{
		constructor(obj){
			this.obj = $(obj).find('span');
			this.line = $(".active .line");
			this.num = $(".activeSpan span").size;
//			var reveal = $(".selectAll"); // 在下面无法引用  not defined
			this.reveal = $('.selectAll');
			this.init();
		}
		init(obj){
//			console.log(this.obj);
//			console.log($(".line").width());
//			console.log(this.reveal);
			var _this = this;
				$(".activeSpan span").click(function(){
					console.log($(this).index())
					/*便利所有选项卡，点击时display：none*/
					_this.reveal.each(function(){
						$(this).css({
							"display" : "none"
						})
					})
					/*点击选项  出现横线*/
					
					_this.line.animate({
						"left": _this.line.width() * $(this).index()
					})
					/*选项卡出现*/
					_this.reveal.eq($(this).index()).css({
						"display" : "block"
					})
			})
			}
	}
	new Tabs(".activeSpan");
	/*****************************************选项卡json week1****************************************************/
		$.ajax({
			url :	"../json/hotsale.json",
				success : function(data){
//					console.log(data.week1);//取得week1
					$.each(data.week1,function(index,value){
						//es6拼接  最前面不要双引号 -_-``
					$((`
							<div class = "left select">
								<div class = "activeL shop">
									<img src= '../${value.img}'/>
								</div>
								<div class = "activeR shopmean">
									<p>${value.span}</p>
									<p><span>${value.agio}</span>折起</p>
								</div>
								<div class="activeC shoptime">
									<div class="activesmall"><a href="">预览</a><span>|</span><a href="">订阅</a>
									</div>
								</div>
							</div>
						`)).appendTo("#week1");
					})
				},
			})
	/*---------------------------------------week2--------------------------------------------------------------------*/
			$.ajax({
			url :	"../json/hotsale.json",
				success : function(data){
//					console.log(data.week1);//取得week1
					$.each(data.week2,function(index,value){
						//es6拼接  最前面不要双引号 -_-``
					$((`
							<div class = "left select">
								<div class = "activeL shop">
									<img src= '../${value.img}'/>
								</div>
								<div class = "activeR shopmean">
									<p>${value.span}</p>
									<p><span>${value.agio}</span>折起</p>
								</div>
								<div class="activeC shoptime">
									<div class="activesmall"><a href="">预览</a><span>|</span><a href="">订阅</a>
									</div>
								</div>
							</div>
						`)).appendTo("#week2");
					})
				},
			})
	
	/*---------------------------------------week2--------------------------------------------------------------------*/
	/*---------------------------------------week3--------------------------------------------------------------------*/
				$.ajax({
			url :	"../json/hotsale.json",
				success : function(data){
//					console.log(data.week1);//取得week1
					$.each(data.week3,function(index,value){
						//es6拼接  最前面不要双引号 -_-``
					$((`
							<div class = "left select">
								<div class = "activeL shop">
									<img src= '../${value.img}'/>
								</div>
								<div class = "activeR shopmean">
									<p>${value.span}</p>
									<p><span>${value.agio}</span>折起</p>
								</div>
								<div class="activeC shoptime">
									<div class="activesmall"><a href="">预览</a><span>|</span><a href="">订阅</a>
									</div>
								</div>
							</div>
						`)).appendTo("#week3");
					})
				},
			})
	
	/*---------------------------------------week3--------------------------------------------------------------------*/
	/*---------------------------------------week4--------------------------------------------------------------------*/
				$.ajax({
			url :	"../json/hotsale.json",
				success : function(data){
//					console.log(data.week1);//取得week1
					$.each(data.week4,function(index,value){
						//es6拼接  最前面不要双引号 -_-``
					$((`
							<div class = "left select">
								<div class = "activeL shop">
									<img src= '../${value.img}'/>
								</div>
								<div class = "activeR shopmean">
									<p>${value.span}</p>
									<p><span>${value.agio}</span>折起</p>
								</div>
								<div class="activeC shoptime">
									<div class="activesmall"><a href="">预览</a><span>|</span><a href="">订阅</a>
									</div>
								</div>
							</div>
						`)).appendTo("#week4");
					})
				},
			})
	
	/*---------------------------------------week4--------------------------------------------------------------------*/
	/*---------------------------------------week5--------------------------------------------------------------------*/
			$.ajax({
			url :	"../json/hotsale.json",
				success : function(data){
//					console.log(data.week1);//取得week1
					$.each(data.week5,function(index,value){
						//es6拼接  最前面不要双引号 -_-``
					$((`
							<div class = "left select">
								<div class = "activeL shop">
									<img src= '../${value.img}'/>
								</div>
								<div class = "activeR shopmean">
									<p>${value.span}</p>
									<p><span>${value.agio}</span>折起</p>
								</div>
								<div class="activeC shoptime">
									<div class="activesmall"><a href="">预览</a><span>|</span><a href="">订阅</a>
									</div>
								</div>
							</div>
						`)).appendTo("#week5");
					})
				},
			})
	
	/*---------------------------------------week5--------------------------------------------------------------------*/
	
	/*****************************************选项卡****************************************************/
	/*--------------------------------------right-banner-------------------------------------------*/
	class rBanner{
		constructor(obj){
			this.obj = $(obj).find('.rImg'); //ul
			this.ul = this.obj.find("ul");
			this.timer = null;
			this.num = 0;
			this.init();
		};
		init(){
			this.index = 0;
			this.autoPlay();
			this.cloneImg();
			this.touch();
			this.Btn();
		};
		cloneImg(){
			var ImgClone = $("#rUl li").eq(0).clone(true);
//			console.log(ImgClone);
			this.ul.append(ImgClone)
			this.ul.width(320 * $("#rUl li").length)
		};
		touch(){
			var $touch = $(".rbSpan a");
			var _this = this;
			$touch.click(function(){
				clearInterval(_this.timer);
				_this.index = $(this).index()+ 1;
				_this.run();
			})
		};
		Btn(){
			var _this = this;
			var $lBtn = $(".btn .lBtn");
			var $rBtn = $(".btn .rBtn");
//			console.log($rBtn);
			$(".rightBanner").mouseover(function(){
				clearInterval(_this.timer);
				$lBtn.css({"opacity" : 1});
				$rBtn.css({"opacity" : 1});
			});
			$(".rightBanner").mouseout(function(){
				clearInterval(_this.timer);
				_this.autoPlay();
				$lBtn.css({"opacity" : 0});
				$rBtn.css({"opacity" : 0});
			});
			//点击左键 index -1 ；
			$rBtn.click(function(){
				clearInterval(_this.timer);
				_this.index ++;
				if(_this.index >= _this.obj.find("li").length-1){
					_this.index = 0
				};
				_this.run();
			})
			$lBtn.click(function(){
				clearInterval(_this.timer);
				_this.index --;
				if(_this.index <= 0){
					_this.index = _this.obj.find("li").length - 1
				};
				_this.run();
			})
		};
		autoPlay(){
			var _this = this;
			clearInterval(this.timer);
			this.timer = setInterval(function(){
			if(_this.index == _this.obj.find("li").length-1){
				_this.index = 0;
				_this.ul.css({"left" : 0})
			}
			_this.index++;
				_this.run();
			},2500)
		};
		run(){
			/*var _this = this;
			if(this.index == this.obj.find("li").length-1){
				this.index = 0;
				this.ul.css({"left" : 0})
			}
			this.index++;*/
			this.ul.animate({
					"left": -$("#rUl li").width() * this.index
				},500);
			$(".rbSpan a").eq(this.index - 1).addClass("span_active1").siblings().removeClass("span_active1")
//			console.log(this.index);
		};
	};
	new rBanner(".rightBanner");
	
	/*********************************加载网页底部***************************************************/
	/*$("#footLoad").load("../html/footer.html",function(){
//		alert("底部载入成功");
		console.log("底部载入成功");
	})*/
	
//	console.log($(".navall"));
		$("#selectcard>li").mouseover(function(){
//			alert($(this).index());
			$(this).find(".nav2all").css({
				"display":"block"
			})
			$("#selectcard>li").mouseout(function(){
				$(this).find(".nav2all").css({
					"display":"none"
				})
			})	
		})
})