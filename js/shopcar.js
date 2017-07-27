define(['jquery'],function($){
	var str = $.cookie("goods") ? $.cookie("goods") : "";
	if(!str){
		$('.store_total').html("你的购物车空空如也")
		console.log("空");
//		return;
	}
	var obj = convertStrToObj(str);
	for(var id in obj){
		var str = `
			<div class="shopAll" data-good-id = "${id}">
				<div class="shop_check"><input type="checkbox"/></div>
				<div class="shop_img"><img src="${obj[id].src}"/></div>
				<div class="shop_name">
					<span>${obj[id].EngName}</span>
					<span>${obj[id].ChName}</span>
					<span>${obj[id].color}</span>
					<span>M</span>
				</div>
				<div class="shop_price">￥${obj[id].price}</div>
				<div class="shop_num">
					<span id = "countReduce">-</span>
					<input type="text" value="${obj[id].num}"/>
					<span id = "countAdd">+</span>
				</div>
				<div class="shop_dis">￥0.00</div>
				<div class="shop_sale">￥${(obj[id].price*obj[id].num)}</div>
				<div class="shop_remove">
					<span id = "reOnly">删除</span>
				</div>
			</div>
		`;
		$('.store_total').append(str);
	}
	//点击-按钮
//	console.log($("#countReduce"))
//	console.log($("#buy"))
	$("#buy").html("1")
	$("#countReduce").click(function(){
		var id = $(this).parents(".shopAll").attr("data-good-id");
		var num = obj[id].num;
		if(num > 1){
			num --;
			$(this).siblings("input").val(num + '');
			$(this).parent().siblings(".shop_sale").html(num *obj[id].price + "");
			obj[id].num = num;
		}
	$("#saleTotal").html(`￥${obj[id].price*obj[id].num}`)
		
		$.cookie("goods",convertObjToStr(obj),{expires:7,path:"/"})
	})
	//点击+按钮 countAdd
	$("#countAdd").click(function(){
		var id = $(this).parents(".shopAll").attr("data-good-id");
		var num = obj[id].num;
			num ++;
			$(this).siblings("input").val(num + '');
			$(this).parent().siblings(".shop_sale").html(num *obj[id].price + "");
			obj[id].num = num;
	$("#saleTotal").html(`￥${obj[id].price*obj[id].num}`)
			
		$.cookie("goods",convertObjToStr(obj),{expires:7,path:"/"})
	})
	//点击删除按钮
	$("#reOnly").click(function(){
		var id = $(this).parents(".shopAll").attr("data-good-id");//获取商品id
		$(this).parents(".shopAll").remove();//删除上面的元素
		delete obj[id]; //删除对象中的id属性
		//将修改过的商品信息存入cookie
		$.cookie("goods",convertObjToStr(obj),{expires:7,path:"/"})
	})
	
	
//	$("#saleTotal").html(`￥${obj[id].price*obj[id].num}`)
	
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
					price : parseFloat(data[4]),
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
		/*----------------------------------------------------------------*/
})