//配置文件（配置main.js所依赖的模块）
require.config({
	paths:{
		"jquery" : "jquery",
		"cookie" : "jquery.cookie",
		"banner" : "banner",
		"list" : "list",
		"detail" : "detail",
		"shopcar" : "shopcar",
		"register" : "register",
		"login" : "login"
	}
})
//引用依赖的模块
require(["jquery","cookie","banner","list","detail","shopcar","register","login"],function($,cookie,banner,list,detail,shopcar,register,login){
	//实现代码
	$(function(){
//			setInterval(function(){
//		var i = 0;
//		if(i = 3){
//			i = 0;
//		}
//		i ++;
//		console.log(i)
//	},1000)

/*************************************************加载网页头部*************************************************************8*/
	$("header").load("../html/header.html",function(){
//		console.log("网页头部加载成功");
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
		$(".nav_right").mouseenter(function(){
			$('.car').stop().animate({
				"height" : "216px"
			})
		})
		$('.nav_right').mouseleave(function(){
				$('.car').stop().animate({
					"height" : "0px"
				})
			})
		//取cookie 改变购物车内数值
		var goods = $.cookie('goods');
		if(!goods){
			$('.nav_right').mouseenter(function(){
				$(".car").html("空空如也");
				$('.car').stop().animate({
					"height" : "216px"
				})
			})
		}
		if(goods){
			goodsNum= goods.split(',');
		console.log(goodsNum)
		
			$('#buy').html(goodsNum[6]);
		$('.top_center>.num').html(goodsNum)

		
		
		var str = `
			<div class="car">
				<div class="car_top">
					<div class="top_left">
						<img src="${goodsNum[5]}"/>
					</div>
					<div class="top_center">
						<h3>${goodsNum[2]}</h3>
						<p class = 'size'>58mm</p>
						<p class = "num">${goodsNum[6]}x${goodsNum[4]}</p>
					</div>
					<div class="top_right"><a href="">删除</a></div>
				</div>
				<div class="car_bottom">
					<p class="priceTotal">购物袋小计 ： <span>￥${ (goodsNum[6]*goodsNum[4]) }</span></p>
					<button id="pay">结算</button>
				</div>
			</div>
		`
		$(".shoppingCar").append(str);
		}
		$(".nav_right").click(function(){
			location.href = "html/shopcar.html"
		})
		$("#pay").click(function(){
			//跳转到购物车页
			location.href = "shopcar.html";
		})
	})
	
/*************************************************加载网页头部*************************************************************8*/
/*************************************************加载网页底部*************************************************************8*/
	$("#footLoad").load("../html/footer.html",function(){
	//		alert("底部载入成功");
//			console.log("底部载入成功");
		})
/*************************************************加载网页底部*************************************************************8*/
		
	})

})
