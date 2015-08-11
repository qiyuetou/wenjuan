// 添加 考试选择  部门的树形js
	
$(function(){
	
	//发送ajax 请求获得 所有的部门
	//第一次进来获得全部的 部门
	var BUMEN=new Array();
	var number;
	var content;
	$.ajax({
		'url' : bumen_url,
		'dataType':'json',
		'type'	:'post',
		'async'	: false,
		success : function(data){
			//对于获取来的 数组进行处理
			var shu = data.data;

			$(shu).each(function(i) {

				BUMEN.push(shu[i])
				
			});
			
		}
	})

	//点击考试部门 出现的遮罩层
	$('.addbmModal').click(function(){
		//让遮罩层 出现
		$('#addbmModal').modal({
			// keyboard: false,
			show:true,
			// backdrop:true,
		})
		//点击确定按钮  遮罩块消失 同时将点击的数据传给input
		$('#bumensure').click(function(){
			$('.disableInp').val(content);
			$('.disableInp').siblings('input[name=domain]').val(number);
			
			$('#addbmModal').modal('hide');
		})
	})



	var setting = {
		view: {
			selectedMulti: false
		},
		data: {
			key: {
				title:"key"
			},
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick : onClick,
		}
	};


	var zNodes = BUMEN;

	$(document).ready(function(){
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	});


	function onClick(e,treeId,treeNode,clickFlag){
			 // alert(treeNode.tId + ", " + treeNode.name);
			//获取 名字  
			content = treeNode.name;
            //获取a 连接的 title 
			var even = e.target || e.srcElement;
			number = $(even).parents('a').attr('title');

            //将这个获得数据 追加到 input里面去
            
         }
})



//开始 考试页面中的js效果    
$(function(){

	$(document).click(function(event) {
		$('.gaibian').hide().attr('contentEditable',false);
		$('.xiang').css({'border':'1px solid #fff'});
	});


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



		//=========考试标题的ajax============================sta
	$('.juan .biaoti p').click(function(event) {
		$(this).attr({'contentEditable':true});
		 // document.getElementById("timu").contentEditable = true;//使DIV可编辑
		 $(this).select();
		 $(this).focus();
		 $(this).css({'border':'1px solid #1C658B'});
		 return　false;
	});
	$('.juan .biaoti p').live('blur' , function(event) {
		$(this).css({'border':'1px solid #fafafa'});
		return　false;
		// 可以发送ajax
	});
	//================结束考试标题的ajax======================end




	// 开始 ==================开始单选题的标题 题目ajax===================sta
	$('.con .danxuan .ti').live('click' ,function(){
		$(this).attr({'contentEditable':true});
		// document.getElementById("dan").contentEditable = true;//使DIV可编辑
		$(this).focus();
		$(this).css({'border':'1px solid #1C658B'});

		return　false;
	})
	// 失去焦点
	$('.con .danxuan .ti').live('blur' , function(){
		$(this).css({'border':'1px solid #fff'})

		return　false;
	})
	//=================结束单选题的 标题的ajax==============================end


	//*****************考试每一道题目的 分数的编辑************STA
	$('.exam .myradio .con .danxuan .grade i').live('click',function(){
		$(this).attr({'contentEditable':true});
		$(this).focus();
		$(this).css({'border':'1px solid #1C658B'});


		return　false;
	})
	$('.exam .myradio .con .danxuan .grade i').live('blur',function(){
		$(this).css({'border':'1px solid #fff'});

		return　false;
	})
	//*****************考试每一道题目的 分数的编辑************END


		//=================开始里面的选项 ajax=================================sta
	$('.con ul li p').live('click' , function(){
		//这两行是老师增加的代码
		$('.xiang').css({'border':'1px solid #fff'});
		$('.xiang').siblings('.gaibian').hide();
		//让p标签可以编辑
		$(this).attr('contentEditable',true);
		$(this).select();
		$(this).focus();
		// $(this).focus();
		//给p加上一个蓝色的边框
		$(this).css({'border':'1px solid #1C658B'});
		//让这个 上下删  显示
		$(this).siblings('.gaibian').show().attr('contentEditable',false);
		return　false;
	})
	//=====================开始里面的选项的 ajax============================end



	//=================确定删除删除 题目的ajax========================sta
	$('.del').live('click' , function(){
		$('#myModal').modal({
			// keyboard: false,
			show:true,
			// backdrop:true,
		})
		//获取到这一道题目   然后再来进行处理
		var This = $(this).parents('.myradio');
		$('#del_timu').live('click' , function(){
			

			// 并且 还要改变这个上面的题号
			var timu = This.siblings('.myradio');

			
			$(timu).each(function(i,index) {
				// alert(i)
				//改变这上面的 Q1 
				var html = 'Q' + (parseInt(i)+1);
				if(i == 0){
					//如果i 等于0 的时候 就让name值为xuan
					$(index).find('input[type=checkbox]').attr('name','xuan');
				}else{
					//否则就为xuan1 递增
					$(index).find('input[type=checkbox]').attr('name','xuan'+i);
				}
				$(this).find('.tihao').html(html);
			});
			//确定删除 掉这个题目
			This.remove();
			//成功后让这个框消失
			$('#myModal').modal('hide');

			return　false;
		})
		return　false;
	})
	//=================群定删除 题目的ajax==================================end



	//==================添加选项的ajax=*************************====================================sta 
	$('.exam .myradio .con .addtab').live('click' ,  function() {
		// alert(23);
		//获取 复制项里面的li  追加进div中去
		var li = $("#copyall li").clone(true);
		//获取这是第几个选项
		var num = $(this).siblings('ul').find('li').length;
		//将该 复制的 快里面的选项
		var html = '选项' + (num+1);
		$(li).find('.xiang').html(html);
		//设置这个表单的value 值
		$(li).find('input[name=xuan]').val(num+1);

		



		var number = $(this).parents('.myradio').find('input[type=checkbox]');
		//说明当前没有选项  那么他的那么值 要根据 他当前 在的位置来判断
		if($(number).length == 0){
			
			//如果他的上面没有兄弟 那么为xuan  否者 按照当前的位置来排
			var len = $(this).parents('.myradio').prevAll('.myradio').length;
			if(len == 0){
				//表示前面没有题目  那么当前的name 就是xuan
				$(li).find('input[type=checkbox]').attr('name','xuan');
			}else{
				//表示前面有题目  那么name为前面题目的总数 与xuan组合
				$(li).find('input[type=checkbox]').attr('name','xuan'+len);
			}
		}else{
			//说明当前还有选项 那么直接按照最后一个 执行
			var nam = $(number).first().attr('name');
			$(li).find('input[type=checkbox]').attr('name',nam);
		}
		
		li = '<li>' + li.html() + '</li>';

		$(this).siblings('ul').append(li);

		return　false;
	});
	//============================添加选项的ajax==============================end




	//=====================选项的上下移动  以及删除  的ajax=========================sta
	//点击向上的箭头出现的效果
	$('.con ul li .gaibian .one').live('click' , function(){
		//向上的话 判断 是否已经到了第一个
		xuanze = $(this).parents("ul li");
		//获取到这个li  是第几个  
		var num = xuanze.index();
		if(num ==0){
			$('.fixKuai').html('已经是第一个选项')
			hei();
			return false;
		}

        xuanze.insertBefore(xuanze.prev());
        $(xuanze).find('p').focus();
        $(xuanze).find('p').select();
 		
 		return　false;
	})
	//点击向下的箭头出现的 效果
	$('.con ul li .gaibian .two').live('click' ,function(){

		//向下的话 判断是否已经到了最后一个
		xuanze = $(this).parents("ul li");
		//当前li的总数
		var total = xuanze.siblings('li').length;
		//点击的li  的序号
		var num = xuanze.index();
		//如果已经到了最后一个
		if(num == total){
			$('.fixKuai').html('已经是最后一个选项')
			hei();
			return false;
		}
        xuanze.insertAfter(xuanze.next());
        $(xuanze).find('p').focus();
        $(xuanze).find('p').select();


        return　false;
	})
	
	//删除选项的效果
	$('.con ul li .gaibian .three').live('click' , function(){
        //开始改变 原来的值value 值
        var Input = $(this).parents('li').siblings('li').find('input[type=checkbox]');
        $(this).parents('li').remove();
        // alert(Input.length);
        //循环改变 当前题目的 选项的 value值  方便以后使用
        $(Input).each(function(i,index) {
        	var num = i+1;
        	$(index).attr('value',num);
        })


        return　false;
	})
	//=====================选项的上下移动  以及删除  的ajax=========================end





	// ==================开始增加考题的ajax=============================sta
	$('.fabu .right .addtest').live('click',function(){
		//获取 复制项里面的div  追加进div中去
		// alert(23);
		var li = $("#copyall .myradio").clone(true);
		// 改变html 里面的内容  先获取长度 并加1  然后改变html
		var num = $('.juan .myradio').length;
		
		//判断 是否存在这个题目  1如果不存在
		if(num != 0){
			var html = 'Q' + (parseInt(num)+1);

			//改变获取的li中的html  并且赋值获取
			$(li).find('.tihao').html(html);
			//接着改变 里中name 值
			$(li).find('input[type=checkbox]').attr('name','xuan' + num);
			//组合好 里中的html
			li = "<div class='myradio'>" + li.html() + '</div>';
			//选中 最后一个 .myradio  然后 插入进去
			var son=$('.juan .myradio:last');
		}else{
			var html = 'Q1';
			$(li).find('.tihao').html(html);
			li = "<div class='myradio'>" + li.html() + '</div>';
			var son = $('.juan .ti');
		}
		//改变这个 那么值
		son.after(li);

		return　false;
	})	
	//========================结束 开始增加考题的ajax====================end
})


		
	
	
	

	
	
