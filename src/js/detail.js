define(['jquery'],function($){
	loadCart()
//	$('header').on("clcik","#buy",function(){
//			loadCart();
//		//加载购物车中的信息
//		console.log($("#buy"))
//	})
//			loadCart();
	//遍历cookie
	function loadCart(){
			var str = $.cookie("goods") ? $.cookie("goods") : "";
			var obj = convertStrToObj(str);
			var total = 0;
			for(var id in obj){
				total += obj[id].num; //将所有商品数量加起来
			}
			console.log($('header'))
			$("#buy").html(total);
			console.log($("#buy"));
		}
	//点击加入购物车
	$("#btn").click(function(event){
		//获取商品id
	var goodId = $(this).parents(".glass_info").prev().attr("data-good-id")
//		console.log(goodId);
	//获取商品名称：
	var goodEngName = $(this).parents().siblings(".product_title").html();
//	console.log(goodEngName)
	var goodChName = $(this).parents().siblings(".product_name").find("h2").html();	
//	console.log(goodChName)
	//获取颜色
	var goodColor = $(this).parents(".numBtn").siblings(".product_choose").find("strong").html();
//	console.log(goodColor)
	//获取价格
	var goodPrice = Number($(".newSale b").html());
//	console.log($("#buy"))
	//获取商品图片的src
	var goodSrc = $(".glass_bBox").find("img").attr("src");
//	console.log(goodSrc);
	var goodStr = $.cookie("goods") ? $.cookie("goods") : "";
	var goodObj = convertStrToObj(goodStr);
//	console.log(goodObj)
	if(goodId in goodObj){
		//如果商品已经在车里则数量+1
		goodObj[goodId].num += 1;
	}else{
		//将新的商品加入对象中
		goodObj[goodId] = {
			EngName : goodEngName,
			ChName : goodChName,
			color : goodColor,
			price : parseInt(goodPrice),
			src : goodSrc,
			num : "1"
		}
	}
	var num = $("#buy").html();
	$("#buy").html((parseInt(num) + 1))
	goodStr = convertObjToStr(goodObj);
	
	$.cookie("goods",goodStr,{expires : 7,path : "/"})
//	$("#pay").click(function(){
//			location.href = "shopcar.html"
//			
//		})
		//触发购物车更新
		var scrollTop = $(document).scrollTop();
			$("body").scrollTop(scrollTop+1);
			$("body").scrollTop(scrollTop--);
	})
	
	
	
	
	
	
	
	/******************************字符串转为对象*******************************************/
		function convertStrToObj(str){

			//如果是空串，则返回空对象 
			if(!str){
				return {};
			}
			var good = str.split(":"); //将每一个商品信息切割成数组
			var obj = {}; //定义一个空对象 
			//遍历每一个商品
			for(var i = 0; i < good.length; i ++){
				var data = good[i].split(","); //将某一个商品信息单独切割成数组
				
				//将商品信息加入对象 中
				obj[data[0]] = {
					EngName : data[1],
					ChName : data[2],
					color : data[3],
					price : parseInt(data[4]),
					src : data[5],
					num : parseInt(data[6])
				}
			}
			return obj; //返回对象 
		}
		//将对象转为字符串
		function convertObjToStr(obj){
			var str = "";
			for(var id  in obj){
				if(str){
					str += ":";
				}
				str += id + "," + obj[id].EngName +"," + obj[id].ChName + "," +obj[id].color + "," + obj[id].price + "," + obj[id].src + "," + obj[id].num;
			}
			return str;
		}
//		$(".nav_right").mouseover(function(){
//			$(".car").slideDown("fast",function(){
//				alert(1);
//			})
//		})
		
})
