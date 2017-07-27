define(['jquery'],function($){
	//验证码
	class check_num{
		constructor(){
			this.init();
		}
		init(){
			var str = "0123456789";
			var num = '';
			for(var i = 0;i < 26;i ++){
				str += String.fromCharCode(97 + i) + String.fromCharCode(65 + i);
			}
			for(var j = 0;j < 4;j ++){
				num += str.charAt(Math.round(Math.random()*(str.length - 1)));
			}
			return num;
		}
	}
console.log(new check_num().init()); //测试获取到的验证码

	//检测各个注册信息的状态开关 默认false
	var reg_status = {
		user_name : false,
		psword : false,
		psword_again : false,
		match_num : false,
		message_num : true
	}
	//账户名验证
	$(".user").blur(function(){
		var regUsername = /^[a-zA-Z]\w{5,15}$/;
		var regPhone = /^1[34578]\d{9}$/;
//		alert(2)
		if(regUsername.test($(this).val()) || regPhone.test($(this).val())){
			$(this).next().html("恭喜，该账号可用");
			reg_status.user_name = true;
		}else{
			$(this).next().html("账号不可用或不合法");
		}
	})
	//密码验证
	$(".password").blur(function(){
		var reg = /^[\w\!\@\#\$\%\^\&\*\_\+]{6,16}$/;
		if(reg.test($(this).val())){
			$(this).next().html("密码可用");
			reg_status.psword = true;
		}else{
			$(this).html("密码不合法");
		}
	})
	//密码强度判断
	$(".password").on("input",function(){
		var strong = 0;
		if(/^.{5,}$/.test($(this).val())){
			if($(this).val().match(/[a-z]/i)){
				strong ++;
			}
			if($(this).val().match(/\d+/)){
				strong ++;
			}if($(this).val().match(/[\!\@\#\$\%\^\&\*\_\+]/)){
				strong ++;
			}
			reg_status.password = true;
			switch(strong){
				case 0 : $(this).next().html("密码不合规则");break;
				case 1 : $(this).next().html("密码强度低");break;
				case 2 : $(this).next().html("密码强度中等");break;
				case 3 : $(this).next().html("密码强度高");break;
				default  : $(this).next().html("密码不合规则");break;
			}
		}
	})
	$('.password_again').blur(function(){
//		console.log($(this).val())
//		console.log($(".password").val())
		
		if($(this).val() == $(".password").val()){
			$(this).next().html("两次密码一致")
			reg_status.psword_again = true;
		}else{
			$(this).next().html("两次密码不一致或者不合规则")
		}
	})
	$('.match_img').val(new check_num().init())
	$(".match_num").blur(function(){
		if($(this).val() == $('.match_img').val()){
			$(this).nextAll().html("验证码正确");
			reg_status.match_num = true
		}else{
			$(this).nextAll('p').html("验证码有误");
			$('.match_img').val(new check_num().init())
		}
	})
	
	$("#register").click(function(){
		for(var i in reg_status){
			if(!reg_status[i]){
				alert(`第${i}项有误请重填`);
				return false;
			}
		}
		
		/*	var userObj= {
		userName : $(".userName").val(),
		psword : $(".password").val()
	}*/
	var usersName = $(".userName").val();
	var psWord = $(".password").val();
	console.log(psWord)
//	var userStr = convertObjToStr(userObj);
	$.cookie("usersName",psWord,{expires:7,path:"/"});
	console.log($.cookie(username))
		
//		location.href = "login.html";
	})
	

/**********************************************************************************************/
				/*function convertStrToObj(str){
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
							name : data[1],
							price : parseFloat(data[2]),
							src : data[3],
							num : parseInt(data[4])
						}
					}
					return obj; //返回对象 
				}*/
				//将对象转为字符串
				function convertObjToStr(obj){
					var str = "";
					for(var id  in obj){
						/*if(str){
							str += ":";
						}*/
						str +=obj.userName + "," + obj.psword;
					}
					return str;
				}	
})
