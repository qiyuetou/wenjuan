
$(function(){

	//开始编辑员工的时候出现的遮罩层
	
	//开始分页的class的增加
	$('.content .kuai .c .r .fenye .ys a').addClass('btn btn-mini');
	$('.content .kuai .c .r .fenye .ys span').addClass('btn btn-info');
	// 开始鼠标移动的效果  背景色改变
	$('.content .kuai .c .l ul li').mouseover(function(){
		// 给这个 里加上一个class
		$(this).addClass('onegreen');
		
	})
	$('.content .kuai .c .l ul li').mouseout(function(){
		$(this).removeClass('onegreen');
	})


	// 开始鼠标点击  功能管理 服务  统计 设置
	$('.content .kuai .c .l ul li').click(function(){
		$(this).addClass('twogreen').siblings('li').removeClass('twogreen');

	})

	//鼠标移动到里上面 显示删除 选项的按钮
	// $('.juan ul li').hover(function() {
	// 	$(this).find('b').show();
	// }, function() {
	// 	$(this).find('b').hide();
	// });
	//窗口发生改变的时候  获取宽 高
	function hei(){
		//窗体的 宽高
		var width = $(window).width();
		var height = $(window).height();
		//快本身的宽高
		var W = $('.fixKuai').height();
		var H = $('.fixKuai').width();
		//定位 的宽高
		var Wi = (width-W)/2;
		var Hi =(height-H)/2;
		$('.fixKuai').css({'left':Wi,'top':Hi});
		$('.fixKuai').fadeTo(1000,1);
		$('.fixKuai').fadeTo(1000,0);
	}









	// 开始考试的地方的 js效果
	






	



	
















	





//===========这里是解决  不能点击 上下移动的效果=========================sta
	//当鼠标移动 到这个箭头的时候   移除 掉这个blur 事件   表示第一个
	// $('.con ul li .gaibian .one').live('mouseover' , function(){
	// 	$('.con ul li p').die('blur');												 
	// }).live('mouseout' , function(){
		
		
	// 	// $('.con ul li p').select();
	// 	// $('.con ul li p').focus();
	// 	Conpblur();
	// });

	// //当鼠标移动 到这个箭头的时候   移除 掉这个blur 事件   表示第二个
	// $('.con ul li .gaibian .two').live('mouseover' , function(){
	// 	$('.con ul li p').die('blur');												 
	// }).live('mouseout' , function(){
	// 	// alert('two');
		
	// 	// $('.con ul li p').select();
	// 	// $('.con ul li p').focus();
	// 	Conpblur();
	// });


	//当鼠标移动 到这个箭头的时候   移除 掉这个blur 事件   表示第三个
	// $('.con ul li .gaibian .three').live('mouseover'  ,function(){
	// 	$('.con ul li p').die('blur');												 
	// }).live('mouseout' , function(){
		// alert('three');
		
		// $('.con ul li p').select();
		// $('.con ul li p').focus();
	// 	Conpblur();
	// });
//===========这里是解决  不能点击 上下移动的效果======================end
	
		
	
	

	


	//失去焦点的事件 封装  一个是正常封装  一个是需要触发的=============sta	
	//表示正常的 失去焦点的 事件
	 // $('.con ul li p').live('blur' ,function(){
	 // 	// alert('yes');
	 // 	//让快隐藏   并且获取到焦点
		// $(this).css({'border':'1px solid #fff'});
		// $(this).siblings('.gaibian').hide();
		// // $(this).select();
		// // $(this).focus();		
	 //  })
	
	 // Conpblur();
	 //将这个  失去焦点的事件封装
   // Conpblur = jQuery.cop = function(){
	  //  $('.con ul li p').live('blur', function(){
	  //  		// alert('no');
			// $(this).css({'border':'1px solid #fff'});
			// $(this).siblings('.gaibian').hide();
			// // $(this).select();
			// // $(this).focus();	
	  //  })
   // }
   
	//失去焦点的事件 封装  一个是正常封装  一个是需要触发的=============end			
	


	
		
	
	
	

	
	
})