//封装模块 ：
define(['jquery'],function($){
//alert(1);
	$.getJSON("../json/list.json",function(data){
//		console.log(data[1]);
		$.each(data, function(index,value) {
//						<img src="../img/sunglasses02.jpg" title="'+ value.alt +'" />
//						<img src="../img/sunglasses03.jpg" title="优雅简约女士太阳镜" />
//			console.log(value.alt)
			var str = `<div class="product_left">
						<div class="listproduct">
							<div class="product_img">
								<div class="product_label">
									<img src=" ${value.src}" title="${value.alt}" />
									
								</div>
								<div class="sale_word">
									<p class="p_top">${value.p1}</p>
									<p class="p_bottom">${value.p2}</p>
								</div>
							</div>	
							<div class="project_word">
								<p><a href="">${value.a}</a></p>
								<p><a href="">${value.p3}</a></p>
								<p>
									<span class= "redNum" style="color: red">${value.newsale}</span>
									<span style="text-decoration: line-through;;font-size: 12px;">${value.oldsale}</span>
								</p>
							</div>
						</div>
						<div class="product_size">
							<span class="size1"><img src="${value.size1}" title="${value.alt}" /></span>
							<span class="size2"><img src="${value.size2}" title="${value.alt}" /></span>
							<span class="size3"><img src="${value.size3}" title="${value.alt}" /></span>
						</div>
					</div>`
					$(".contentProduct").append(str);
					});
				})
/*******************************************************列表*************************************************************************/
//	function selectCard(){
//		$(".product_size span").mousemove(function(){
//			alert($(this).index());
//			alert(1)
//		})
//	}
//	
//	selectCard();
//	$('.contentProduct ').on('click','listproduct',function(){
////		console.log($(this).index());
//		$(this).find('span').css({
//			"display" : "block"
//		})
//		
//	})
		$('.contentProduct').on('mouseover','.product_left',function(){
			$(this).find('.product_size').css({
				"display":"block"
			})
			$(this).find(".project_word").css({
				"display" : "none"
			})
			$(this).find("span").mouseenter(function(){
				$(this).css({
					"border":"1px solid #000"
				})
				var $osrc = $(this).find('img').attr('src')
				console.log($(this))
				$(this).parent().prev().find('img').attr("src",$osrc);
			})
			$(this).find("span").mouseout(function(){
				$(this).css({
					"border":"1px solid #e7e7e7"
				})
			})
		})
		$('.contentProduct').on("mouseout",".product_left",function(){
			$(this).find('.product_size').css({
				"display" : "none"
			})
			$(this).find(".project_word").css({
				"display":"block"
			})
		})
})