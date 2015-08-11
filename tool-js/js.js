	//固定定位
	function cen_scroll(){
		var top = $(window).scrollTop();
		if(top >= 78 ){
			if($(window).width()>$('#cen').width()){
				var left = ($(window).width()-$('#cen').width())/2;
			
				$('#cen .le .le2').css({'position':'fixed','top':2,left:left})
			}else{
				$('#cen .le .le2').css({'position':'fixed','top':0,left:0})
			}
		}else{
			$('#cen .le .le2').css({'position':'relative','top':0,left:0})
		}
	}
$(function(){
	//滚动条事件

	$(window).scroll(cen_scroll);
	$(window).resize(cen_scroll);
	//常用题型处 的鼠标移动事件  变成蓝色
	$('#cen .le ul li').hover(function(){
		$(this).addClass('blue');
	},function(){
		$(this).removeClass('blue');
	})

	// 题目的上下 删除 鼠标移动 变蓝
	$('#cen .rig ul li .lef .lan').hover(function(){
		$(this).addClass('blue');
	},function(){
		$(this).removeClass('blue');
	})


	//点击左边的 题型的 时候 出现的 题目
	$('#cen .le ul li').on('click',function(){
		var lei = parseInt($(this).attr('lei'));
		
	})	

	
	
	//编辑矩阵的的时候
	
	$('#cen .rig ').delegate('ul li .edit_title','click',function(e){
		var that = this;
		//主要是为了 将函数
		edit_all(e,that);
	})

	var Th='';
	function edit_all(ev,that){
		//获取点击的类型
		body_click();
		var tynum = $(that).attr('tynum');

		
		//因为多次触发事件  所以需要禁止掉
		// $('body').unbind('click')
		stopPropagation(ev)

		//创建新的浮快    先删除掉之前的快
		var oldText = $(that).html();
		

		Th = $(that);
		if(document.getElementById('onlyFloat')){
			$('#onlyFloat').remove();
		}
		

		//组合 编辑快的 字符串
		var newHtml = '<div id="onlyFloat"><div class="kuang" id="kuang"></div><div class="move_del"><ul>';
		// 判断编辑的这个快 有啥操作  上下移动 删除

		if(tynum ==='one'){
			//表示编辑的标题  只有图片
			newHtml += '<li class="div_pic"><form id="uploadForm" method="POST" enctype="multipart/form-data" action=""><input type="file" id="uploadFile" name="upload" class="uploadFile" ><span></span></form></li>';
		}else if(tynum ==='two'){
			//表示是选项  有图片 上下 删除
			newHtml += '<li class="div_pic"><form id="uploadForm" method="POST" enctype="multipart/form-data" action=""><input type="file" id="uploadFile" name="upload" class="uploadFile" ><span></span></form></li><li class="div_up"></li><li class="div_down"></li><li class="div_del"></li>';
		}else if(tynum ==='thre'){
			//表示是矩阵 有图 左右 删除
			newHtml += '<li class="div_pic"><form id="uploadForm" method="POST" enctype="multipart/form-data" action=""><input type="file" id="uploadFile" name="upload" class="uploadFile" ><span></span></form></li><li class="ju_left"></li><li class="ju_right"></li><li class="ju_del_dan"></li>'
		}else if(tynum ==='four'){
			newHtml  +='<li class="div_pic"><form id="uploadForm" method="POST" enctype="multipart/form-data" action=""><input type="file" id="uploadFile" name="upload" class="uploadFile" ><span></span></form></li><li class="ju_up"></li><li class="ju_down"></li><li class="ju_del_duo"></li>'
		}
		newHtml += '</ul></div></div>';
		
		

		$('body').append(newHtml);
		//获取

		var even = ev || window.ev;
		
		var pos_left = even.pageX  - even.offsetX;
		var pos_top = even.pageY  - even.offsetY;
		
		//改变覆盖层的 样式
		$('#onlyFloat').css({
			'position':'absolute',
			'top':pos_top,
			'left':pos_left,
		})
		
		$('#onlyFloat .kuang').css({
			width:$(that).width(),
			'line-height':$(that).css('line-height'),
			'min-height':$(that).height(),
			'padding-left':$(that).css('padding-left'),
			'padding-right':$(that).css('padding-right'),
			'padding-top':$(that).css('padding-top'),
			'padding-bottom':$(that).css('padding-bottom'),
			'fontSize':$(that).css('fontSize'),
			'color':'#666'

		}).attr({
			'contenteditable':true,
		}).show().html(oldText);

		$('#onlyFloat .kuang').focus();

		//-------让光标移动到最后----------
		insertHtmlAtCaret($('#onlyFloat .kuang')[0])

		//鼠标 失去焦点 事件 .not($('.edit_title'))
			
		
		//专门用来 阻止事件流
		$('#onlyFloat').on('click',function(e){
			stopPropagation(e)
		})

		//图片的上传
		$('#uploadFile').change(function(){
			// 创建 form 对象
			var fileObj = document.getElementById("uploadFile").files[0];
			var FileController = 'http://open.mworking.cn/survey/upload';
        	var form = new FormData();
       		
       		form.append("userfile", fileObj);

       		
       		
       		$.ajax({
       			url:FileController,
       			'type':'post',
       			'data':form,
       			'dataType':'json',
       			processData: false,  // 告诉jQuery不要去处理发送的数据
  				contentType: false, 
       			'success':function(data){
       				
       				if(data['code'] ==1){
       					var img = data['data'];
       					var img = "<img src='"+img+"'/>";
       					// var lei = $(Th).parents('li').attr('lei');
       					var html = $('#kuang').html();
       					html +=img;
       					$('#kuang').html(html);

       				}

       				if(data['code'] ==-1){
       					alert(data['data']);
       				}
       			}
       		})


		})
		// 单选和多选 上下 移动
		$('#onlyFloat').on('click','.div_up',function(ev){
			stopPropagation(ev);
			
			var oldoffset = $(Th).offset().top;


			var num = $(Th).parents('dl').find('dd').index($(Th).parent('dd'));
			
			
			if(num ==0){
				//表示已经是第一个了
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是第一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);

				var newoffset = $(Th).offset().top;
			}else{

				//如果有 显示的 快 先保存  然后再 移动
				var old_li = $(Th).parent('dd');

				num--;
				var new_li = $(Th).parents('dl').find('dd').eq(num);
			
			   $(old_li).insertBefore($(new_li));

			   var newoffset = $(Th).offset().top;
			}

			var change = oldoffset - newoffset;
			
			var onlyTop = parseInt($('#onlyFloat').position().top)-change;
			$('#onlyFloat').css({'top':onlyTop})
			//让滚动条 滑动 这个变化的大小
			scroll_change(1,change);


			xunhuan_name();
		})


		// 矩阵 上 移动
		$('#onlyFloat').on('click','.ju_up',function(ev){
			stopPropagation(ev);
			
			var oldoffset = $(Th).offset().top;


			var num = $(Th).parents('table').find('tr').index($(Th).parent('tr'));
			
			
			if(num ==1){
				//表示已经是第一个了
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是第一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);

				var newoffset = $(Th).offset().top;
			}else{

				//如果有 显示的 快 先保存  然后再 移动
				var old_li = $(Th).parent('tr');

				num--;
				var new_li = $(Th).parents('table').find('tr').eq(num);
			
			   $(old_li).insertBefore($(new_li));

			   var newoffset = $(Th).offset().top;
			}

			var change = oldoffset - newoffset;
			
			var onlyTop = parseInt($('#onlyFloat').position().top)-change;
			$('#onlyFloat').css({'top':onlyTop})
			//让滚动条 滑动 这个变化的大小
			scroll_change(1,change);


			xunhuan_name();
		})



		//单选和多选 当前的 选项  向下移动
		$('#onlyFloat').on('click','.div_down',function(e){
			stopPropagation(e);
			var oldoffset = $(Th).offset().top;


			var num = $(Th).parents('dl').find('dd').index($(Th).parent('dd'));
			var len = $(Th).parents('dl').find('dd').length;
			
			if(parseInt(num)+1 ==len){
				//表示已经是第一个了
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是最后一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);

				var newoffset = $(Th).offset().top;
			}else{

				//如果有 显示的 快 先保存  然后再 移动
				var old_li = $(Th).parent('dd');

				num++;
				var new_li = $(Th).parents('dl').find('dd').eq(num);
			
			   $(old_li).insertAfter($(new_li));

			   var newoffset = $(Th).offset().top;
			}

			//获取 快移动的 大小
			var change = oldoffset - newoffset;
			
			var onlyTop = parseInt($('#onlyFloat').position().top)-change;
			$('#onlyFloat').css({'top':onlyTop})
			//让滚动条 滑动 这个变化的大小
			scroll_change(0,change);

			xunhuan_name();
		})
		

		//矩阵 当前的 选项  向下移动
		$('#onlyFloat').on('click','.ju_down',function(e){
			stopPropagation(e);
			var oldoffset = $(Th).offset().top;


			var num = $(Th).parents('table').find('tr').index($(Th).parent('tr'));
			var len = $(Th).parents('table').find('tr').length;
			
			if(parseInt(num)+1 ==len){
				//表示已经是第一个了
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是最后一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);

				var newoffset = $(Th).offset().top;
			}else{

				//如果有 显示的 快 先保存  然后再 移动
				var old_li = $(Th).parent('tr');

				num++;
				var new_li = $(Th).parents('table').find('tr').eq(num);
			
			   $(old_li).insertAfter($(new_li));

			   var newoffset = $(Th).offset().top;
			}

			//获取 快移动的 大小
			var change = oldoffset - newoffset;
			
			var onlyTop = parseInt($('#onlyFloat').position().top)-change;
			$('#onlyFloat').css({'top':onlyTop})
			//让滚动条 滑动 这个变化的大小
			scroll_change(0,change);


			xunhuan_name();
		})

		//单选和多选矩阵 向左移动
		$('#onlyFloat').on('click','.ju_left',function(e){
			stopPropagation(e);
			//表示 当前td 是属于哪一个
			var num = $(Th).parents('tr').find('td').index($(Th));
			var len = $(Th).parents('table').find('tr').length;
			var oldoffset = $(Th).offset().left;
			if(num ==1){
				//表示已经是第一个了
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是第一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);
				var newoffset = $(Th).offset().left;
			}else{
				for(var i=0;i<(len);i++){
					
					var old_li = $(Th).parents('table').find('tr').eq(i).find('td').eq(num);
					var new_li = $(Th).parents('table').find('tr').eq(i).find('td').eq(num-1);

					$(old_li).insertBefore($(new_li));
				}
				var newoffset = $(Th).offset().left;
			}
			//获取 快移动的 大小
			var change = oldoffset - newoffset;
			
			//让出现的快移动
			var onlyTop = parseInt($('#onlyFloat').position().left)-parseInt(change);
			$('#onlyFloat').css({'left':onlyTop});

			xunhuan_name();
		})



		//单选和多选 向右移动
		$('#onlyFloat').on('click','.ju_right',function(e){
			stopPropagation(e);
			//表示 当前td 是属于哪一个
			var num = $(Th).parents('tr').find('td').index($(Th));
			var len = $(Th).parents('table').find('tr').length;
			var oldoffset = $(Th).offset().left;
			
			if(num ==(len-1)){
				//表示已经是最后一个
				var wi = ($(window).width()-$('#yes_no').width())/2;
				$('#yes_no').text('已经是最后一个选项了').css({'left':wi}).fadeIn(800).fadeOut(800);
				var newoffset = $(Th).offset().left;
			}else{
				for(var i=0;i<(len);i++){
					
					var old_li = $(Th).parents('table').find('tr').eq(i).find('td').eq(num);
					var new_li = $(Th).parents('table').find('tr').eq(i).find('td').eq(num+1);

					$(old_li).insertAfter($(new_li));
				}
				var newoffset = $(Th).offset().left;
			}
			//获取 快移动的 大小
			var change = oldoffset - newoffset;
			
			//让出现的快移动
			var onlyTop = parseInt($('#onlyFloat').position().left)+parseInt(Math.abs(change));
			$('#onlyFloat').css({'left':onlyTop});

			xunhuan_name();
		})


		//单选和多选 当前的选项 删除
		$('#onlyFloat').on('click','.div_del',function(e){
			body_click();
			$(Th).parents('dd').remove();

			xunhuan_name()
		})

		// 矩阵删除 删除行
		$('#onlyFloat').on('click','.ju_del_duo',function(e){
			body_click();
			$(Th).parents('tr').remove();

			xunhuan_name()
		})

		//矩阵循环删除 列
		$('#onlyFloat').on('click','.ju_del_dan',function(e){
			body_click();
			// $(Th).parents('tr').remove();
			var num = $(Th).parent('tr').find('td').index($(Th));
			var obj = $(Th).parents('table').find('tr');
			$(obj).each(function(i,index){
				$(index).find('td').eq(num).remove();
			})

			xunhuan_name()
		})
	}
		

	//滚动条 移动的 效果
	function scroll_change(up,change){
		//距离滚动条 顶部的距离
		var scrollTop = $(window).scrollTop();
		//整个文档的 高度
	　　var scrollHeight = $(document).height();
		//可视区域的 高度
	　　var windowHeight = $(window).height();
		//滚动条距离底部的 距离
		var scrollBottom = scrollHeight-(parseInt(scrollTop)+parseInt(windowHeight));

		if(up ===1){
			//表示向上 滚动
			if(scrollTop > change){
				//表示可以滚动
				
				$('body,html').animate({'scrollTop':scrollTop-change},800);
			}
		}else{
			//表示向下 滚动

			if(scrollBottom > Math.abs(change)){
				
				$('body,html').animate({scrollTop:scrollTop+Math.abs(change)},800);
			}
		}
		
	}


	//点击空白地方  放出现的快消失
	$('*').bind('click','body',function(){
		body_click()
	})

	function body_click(){
		//判断是否为空
		//改变覆盖层的 样式
		
		console.log(1);
		var newText = $('#onlyFloat .kuang').html();
		var text = $('#onlyFloat .kuang').text();

		if(text ==''){
			//如果为空就不执行改变html
			$('#onlyFloat').hide();
		}else{
			$(Th).html(newText);
			$('#onlyFloat').hide();
		}
		
		// stopPropagation(e)
	}
	//点击左边的 出现的 效果
	$('#cen .le ul').on('click','li',function(){
		var dragTypes  = $(this).attr('lei');
		var html = get_type_html(dragTypes);

		
		$('#cen .rig ul').append(html);

		//滚动条滚动 最后

		//距离滚动条 顶部的距离
		var scrollTop = $(window).scrollTop();
		//整个文档的 高度
	　　var scrollHeight = $(document).height();
		//可视区域的 高度
	　　var windowHeight = $(window).height();
		//滚动条距离底部的 距离

		var change = scrollHeight - windowHeight - scrollTop;
		
		$('body,html').animate({scrollTop:scrollTop+Math.abs(change)},800);
		xunhuan_name()
	})


	//根据 lei 判断是出 是啥快
	function get_type_html(dragTypes){
		if(dragTypes ==1){
	   		//单选
	   		return "<li lei='1'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt><p class='ti edit_title' tyNum='one'>单选题</p></dt>\
							<dd>\
								<input type='radio' name='q1'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<dd>\
								<input type='radio' name='q1'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<i  class='xuan_jia'></i>\
						</dl>\
					</div>\
				</li>";
	   	}else if(dragTypes ==2){
	   		return "<li lei='2'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan delModal'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt><p class='ti edit_title' tyNum='one'>多选题</p></dt>\
							<dd>\
								<input type='checkbox' name='q2'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<dd>\
								<input type='checkbox' name='q2'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<i class='xuan_jia'></i>\
						</dl>\
					</div>\
				</li>";
	   	}else if(dragTypes ==3){
	   		return "<li lei='3'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt><p class='ti edit_title' tyNum='one'>矩阵单选题</p></dt>\
							<dd class='juzheng'>\
								<table>\
									<tr>\
										<td></td>\
										<td class='edit_title' tyNum='thre'>选项1</td>\
										<td class='edit_title' tyNum='thre'>选项2</td>\
										<td class='edit_title' tyNum='thre'>选项3</td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='radio' name='ra_1' /></span></td>\
										<td><span><input type='radio' name='ra_2' /></span></td>\
										<td><span><input type='radio' name='ra_3' /></span></td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='radio' name='ra_1' /></span></td>\
										<td><span><input type='radio' name='ra_2' /></span></td>\
										<td><span><input type='radio' name='ra_3' /></span></td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='radio' name='ra_3' /></span></td>\
										<td><span><input type='radio' name='ra_3' /></span></td>\
										<td><span><input type='radio' name='ra_3' /></span></td>\
									</tr>\
								</table>\
							</dd>\
							<dd class='jiayou'></dd>\
							<dd class='jiaxia'></dd>\
						</dl>\
					</div>\
				</li>"
	   	}else if(dragTypes ==4){
	   		return "<li lei='4'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt><p class='ti edit_title' tyNum='one'>矩阵多选题</p></dt>\
							<dd class='juzheng'>\
								<table>\
									<tr>\
										<td></td>\
										<td class='edit_title' tyNum='thre'>选项一</td>\
										<td class='edit_title' tyNum='thre'>选项二</td>\
										<td class='edit_title' tyNum='thre'>选项三</td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='checkbox' name='ra_1' /></span></td>\
										<td><span><input type='checkbox' name='ra_1' /></span></td>\
										<td><span><input type='checkbox' name='ra_1' /></span></td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='checkbox' name='ra_2' /></span></td>\
										<td><span><input type='checkbox' name='ra_2' /></span></td>\
										<td><span><input type='checkbox' name='ra_2' /></span></td>\
									</tr>\
									<tr>\
										<td class='edit_title' tyNum='four'>矩形阵1</td>\
										<td><span><input type='checkbox' name='ra_3' /></span></td>\
										<td><span><input type='checkbox' name='ra_2' /></span></td>\
										<td><span><input type='checkbox' name='ra_2' /></span></td>\
									</tr>\
								</table>\
							</dd>\
							<dd class='jiayou'></dd>\
							<dd class='jiaxia'></dd>\
						</dl>\
					</div>\
				</li>";
	   	}else if(dragTypes ==5){
	   		return "<li lei='5'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt>\
								<p class='tou edit_title' tyNum='one'>投票单选</p>\
								<p class='piao'>\
									<input type='checkbox' name='tou1'/>\
									<span>投票后显示结果</span>\
								</p>\
							</dt>\
							<dd>\
								<input type='radio' name='q5'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<dd>\
								<input type='radio' name='q5'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<i class='xuan_jia'></i></dl>\
					</div>\
				</li>"
	   	}else if(dragTypes ==6){
	   		return "<li lei='6'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt>\
								<p class='tou edit_title' tyNum='one'>投票多选</p>\
								<p class='piao'>\
									<input type='checkbox' name='tou1'/>\
									<span>投票后显示结果</span>\
								</p>\
							</dt>\
							<dd>\
								<input type='checkbox' name='q1'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<dd>\
								<input type='checkbox' name='q1'/>\
								<label class='edit_title' tyNum='two'>选项1</label>\
							</dd>\
							<i  class='xuan_jia'></i>\
						</dl>\
					</div>\
				</li>"
	   	}else if(dragTypes==7){
	   		return "<li lei='7'>\
					<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>\
						<dl>\
							<dt><p class='ti edit_title' tyNum='one'>问答</p></dt>\
							<dd>\
							<textarea name=''id='' cols='30' rows='10'></textarea>\
							</dd>\
						</dl>\
					</div>\
				</li>";
	   	}
	}
	//拖拽
	var dragTypes ='';
	$('#cen .le ul li').draggable({ 
	   appendTo: '.ui-sortable',
	   helper: function(){
	   	dragTypes = $(this).attr('lei');
	   return get_type_html(dragTypes);
	   	// return '<li ><div class="lef"><span>Q1</span><em class="lan"></em><i class="lan"></i><p class="lan"></p></div><div class="right"><dl><dt><p class="ti edit_title">多选题</p></dt><dd><input type="checkbox" name="q2"/><label class="edit_title">--</label></dd><dd><input type="checkbox" name="q2"/><label class="edit_title">--</label></dd><i></i></dl></div></li>';
	   },
	   connectToSortable: ".ui-sortable",
	   cursorAt: { top: 50, left: 50 },
	   cursor: "move",
	   revert: 'invalid',
	   // tolerance :'intersect',
	   //滚动条跟随 和跟随的速度
	   scroll:false,
	   // scrollSensitivity:100,
	   start:function(){
	   	$('#cen .rig ul li .lef span').each(function(i){
	    		$(this).text('Q'+(i+1));
	    })
	    xunhuan_name();
	   }
	});


	//排序的快
	$('#cen .rig ul').sortable({
	   placeholder:'ui-state-highlight',
	    items: '> li',
	    // revert: 'invalid',
	    revert: true,
	    handle: "dt",
	    // connectWith: ".ui-sortable-handle",
	    //当元素拖拽完成的时候
	    update : function(even,ui){
	    	
	    	$('.ui-sortable li').css({'height':'auto'});
	    	$(this).find('li .lef span').each(function(i){
	    		$(this).text('Q'+(i+1));
	    	})
	    	xunhuan_name();
	    },
	   
	}).disableSelection();


	//新建一个 题目的 时候创建 表单的 name 和更改题目的 类型
	function xunhuan_name(){
		var obj = $('#cen .rig ul li');
		
		if($(obj).length ==0) return ;
		

		$(obj).each(function(i,index){
			var lei = $(index).attr('lei');

			//改变题号 
			$(index).find('.lef span').text('Q'+parseInt(i+1));


			//如果为 单选和多选
			if(lei ==1 || lei ==2 ||lei ==5||lei==6){
				var dd = $(index).find('.right dd');
				if($(dd).length !=0){
					//执行循环
					$(dd).each(function(x,ind){
						$(ind).find('input').attr('name','q'+(parseInt(i)+1));
					})
				}

				//如果为 投票单选 和多选
				if(lei ==5 || lei ==6){
					$(index).find('dt .piao input').attr('name','tou'+(parseInt(i)+1));
				} 
			}

			if(lei ==3 || lei ==4){
				var juzheng = $(index).find('.juzheng tr:gt(0)');

				if($(juzheng).length >= 0){
					$(juzheng).each(function(x,ind){
						var all = $(ind).find('td:gt(0)');
						$(all).each(function(y,one){
							$(one).find('input').attr('name','ra_'+(parseInt(i)+1)+'_'+(parseInt(x)+1))
						})
					})
				}
			}

			
		})
	}
	//点击删除的时候出现 确定取消的 按钮 的效果
	function del_kuai(){
		var width = $(window).width();
		var wi = ($(window).width()-$('#addygModal').width())/2;
		var height = $(window).height();

		var he = ($(window).height()-$('#addygModal').height())/2;
		
		$('#all').css({'width':width,height:height}).fadeIn(300,function(){
			$('#addygModal').css({left:wi,top:he}).fadeIn(1000);
		})
	}

	//点击删除的时候
	$('#cen').delegate('.lef p','click',function(){
		del_kuai();
		
		var th = this;

		//确定删除
		$('#addygModal .mo-footer').delegate('.btn1','click',function(){
			$(th).parents('li').remove();
			no_del();

			xunhuan_name();
		})
	})
	

	$('#addygModal').delegate('.close','click',no_del);
	$('#all').delegate('#all','click',no_del);
	$('#addygModal .mo-footer').delegate('.btn2','click',no_del);
	//取消 删除 
	function no_del(){
		$('#addygModal').fadeOut(500,function(){
			$('#all').fadeOut(400);
		})
	}

	

	//让光标移动到最后的 函数
	function insertHtmlAtCaret(obj) {
		var sel, range;
		if (window.getSelection) {
			// IE9 and non-IE
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				// Range.createContextualFragment() would be useful here but is
				// non-standard and not supported in all browsers (IE9, for one)

				var frag = document.createDocumentFragment(), node, lastNode;

				while ( (node = obj.firstChild) ) {
					lastNode = frag.appendChild(node);
				}
				range.insertNode(frag);
				// Preserve the selection

				if (lastNode) {
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		} else if (document.selection && document.selection.type != "Control") {
			// IE < 9
			document.selection.createRange().pasteHTML(html);
		}
	}

	function stopPropagation(e) {
        e = e || window.event;
        if(e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    }

	

	//题目的上下移动
	// 向上
	$('#cen').delegate('.lef em','click',function(e){
		
		var num = $(this).parents('li').index();
		
		if(num ==0){
			//表示已经是第一个了
			var wi = ($(window).width()-$('#yes_no').width())/2;
			$('#yes_no').text('已经是第一道题了').css({'left':wi}).fadeIn(800).fadeOut(800);
		}else{
			//如果有 显示的 快 先保存  然后再 移动
			var old_li = $(this).parents('li');
			num--;
			var new_li = $(this).parents('ul').find('li').eq(num);
		
		   $(old_li).insertBefore($(new_li));
		}
		
		 // stopPropagation(e)
		 xunhuan_name();
	})


	// 当前 题目的 上下移动
	$('#cen').delegate('.lef i','click',function(e){
		var num = parseInt($(this).parents('li').index());
		var larNum = $(this).parents('ul').find('li').length;
		
		if(num+1 ==larNum){
			//表示已经是第一个了
			var wi = ($(window).width()-$('#yes_no').width())/2;
			$('#yes_no').text('已经是最后一道题了').css({'left':wi}).fadeIn(1500).fadeOut(1500);
		}else{
			//如果有 显示的 快 先保存  然后再 移动
			var old_li = $(this).parents('li');
			num++;
			var new_li = $(this).parents('ul').find('li').eq(num);
		
		   $(old_li).insertAfter($(new_li));
		}
		
		 // stopPropagation(e)

		 xunhuan_name();
	})




	//单选和多选选项添加
	$('#cen').delegate('.xuan_jia', 'click', function(event) {
		var num = $(this).siblings('dd').length;
		var lei = $(this).parents('li').attr('lei');

		
		if(lei ==1 || lei==5){
			//单选 和投票单选
			var html = '<input type="radio" name="q'+lei+'"><label tynum="two" class="edit_title">选项'+(num+1)+'</label>';
		}else if(lei ==2 || lei==6){
			// 多选  和投票多选
			var html = '<input type="checkbox" name="q'+lei+'"><label tynum="two" class="edit_title">选项'+(num+1)+'</label>';
		}
		var obj = $('<dd>'+html+'</dd>');

		$(this).before(function(){
			return $(obj);
		});

		xunhuan_name();
	});


	//矩阵向下添加
	$('#cen').delegate('.jiaxia', 'click', function(event) {
		var trNum = $(this).siblings('.juzheng').find('tr').length;
		var tdNum = $(this).siblings('.juzheng').find('tr:first td').length;
		var lei = $(this).parents('li').attr('lei');
		//当前是第几题  方便
		var no = $(this).parents('li').index();

		if(lei ==3 ){
			//矩阵单选

			var html ='<td tynum="four" class="edit_title">矩形阵'+trNum+'</td>';
			for(var i=1;i<tdNum;i++){
				html +='<td><span><input type="radio" name="ra'+trNum+'"></span></td>'
			}
		}else if(lei ==4 ){
			// 矩阵多选
			var html ='<td tynum="four" class="edit_title">矩形阵'+trNum+'</td>';

			for(var i=1;i<tdNum;i++){
				html +='<td><span><input type="checkbox" name="ra'+trNum+'"></span></td>';
			}
		}
		var obj = $('<tr>'+html+'</tr>');
		$(this).siblings('.juzheng').find('table').append(obj);


		xunhuan_name();
	});


	//矩阵向右添加
	$('#cen').delegate('.jiayou', 'click', function(event) {
		var trNum = $(this).siblings('.juzheng').find('tr').length;
		var tdNum = $(this).siblings('.juzheng').find('tr:first td').length;
		var lei = $(this).parents('li').attr('lei');
		//当前是第几题  方便
		var no = $(this).parents('li').index();

		var obj1 = $('<td class="edit_title" tynum="thre">选项'+tdNum+'</td>');

		$(this).siblings('.juzheng').find('tr:first').append(obj1);

		//循环创建 input 并插入页面中去
		if(lei ==3){
			//单选
			for(var i=1;i<trNum;i++){
				var html =$('<td><span><input type="radio" name="ra_'+trNum+'"></span></td>');
				$(html).css({'width':'90px'});
				$(this).siblings('.juzheng').find('tr').eq(i).append(html);

			}

		}else if(lei ==4){
			//多选
			for(var i=1;i<trNum;i++){
				var html =$('<td><span><input type="checkbox" name="ra_'+trNum+'"></span></td>');
				$(html).css({'width':'90px'});
				$(this).siblings('.juzheng').find('tr').eq(i).append(html);
			}
		}
		var wi = parseInt($(this).siblings('.juzheng').find('table').width());
		$(this).siblings('.juzheng').find('table').width(wi+90);


		xunhuan_name();
	});




	$('#top .ti').on('click','.fabu',function(){
		//判断 是否有问卷
		// var obj = $('#cen .lef ul li');

		// if(obj.length ==0){
		// 	return;
		// }

		//循环 判断类型  组成字符串
		// console.log(obj);
		// for(i in obj){
		// 	alert(i);
		// }

		var obj = {"op": "set_survey","sn": "72bcd1f5acccd5e64bf8a206d409d166","content":{}};

		$('#cen .rig ul li').each(function(i,index){
			var lei = $(this).attr('lei');
			
			//表示是 单选 多选  单选投票 多选投票
			var tit = $(index).find('.right dt .edit_title').html();
			var oneObj = {"title":tit,"data":{}};
				if(lei==1){
					oneObj['type'] = 'dansel';
					oneObj['flag'] = 0;
					//循环选项
					$(index).find('dd').each(function(x,ind){
						oneObj['data'][x] = $(ind).find('.edit_title').html();
					})
				}else if(lei ==2){
					oneObj['type'] = 'duosel';
					oneObj['flag']= 0;

					$(index).find('dd').each(function(x,ind){
						oneObj['data'][x] = $(ind).find('.edit_title').html();
					})

				}else if(lei ==3){
					// 矩阵单选
					oneObj['type'] ='danjuzheng';
					oneObj['flag']= 0;


					oneObj['data'].lie={};
					oneObj['data'].hang={};

					//循环每一列 剔除 第一个
					$(index).find('tr:first').find('td:gt(0)').each(function(x,ind){
						oneObj['data'].lie[x] = $(ind).html();
					})

					//循环 每一行  剔除第一个
					$(index).find('tr:gt(0)').each(function(x,ind){
						oneObj['data'].hang[x] = $(ind).find('td:first').html();
					})
				}else if(lei ==4){
					//矩阵多选
					oneObj['type'] = 'duojuzheng';
					oneObj['flag']= 0;

					//声明 行和列
					oneObj['data'].lie={};
					oneObj['data'].hang={};

					//循环每一列 剔除 第一个
					$(index).find('tr:first').find('td:gt(0)').each(function(x,ind){
						oneObj['data'].lie[x] = $(ind).html();
					})

					//循环 每一行  剔除第一个
					$(index).find('tr:gt(0)').each(function(x,ind){
						oneObj['data'].hang[x] = $(ind).find('td:first').html();
					})
				}else if(lei ==5){
					//投票单选
					oneObj['type'] ='dantou';

					if($(index).find('.right .piao input').eq(0).is(':checked')){
						oneObj['flag'] = 1;
					}else{
						oneObj['flag']  =2;
					}
					

					$(index).find('dd').each(function(x,ind){
						oneObj['data'][x] = $(ind).find('.edit_title').html();
					})


				}else if(lei ==6){
					//投票多选
					oneObj['type'] = 'duotou';
					// var tit = $(index).find('.right dt .edit_title').html();
					if($(index).find('.right .piao input').eq(0).is(':checked')){
						oneObj['flag'] = 1;
					}else{
						oneObj['flag'] =2
					}


					$(index).find('dd').each(function(x,ind){
						oneObj['data'][x] = $(ind).find('.edit_title').html();
					})
				}else if(lei ==7){
					//问答
					oneObj['type'] = 'text';
					oneObj['flag']= 0;

					oneObj['data'][0] ='';
				}
			obj['content'][i] = oneObj
		})

		

		$.ajax({
		"url" :'http://open.mworking.cn/sapi',
		'dataType':'json',
		'type':'post',
		'data':JSON.stringify(obj),
		'success':function(data){
			if(data['code'] ==1){
				window.location.href = 'http://ops.mworking.cn/index.php?m=Admin&c=Survey&a=index';
			}
			alert('hehe');
			

		}
		})
	})

	$.ajax({
		'url':"http://open.mworking.cn/sapi",
		'data':JSON.stringify({"op":"get_survey","sn":"72bcd1f5acccd5e64bf8a206d409d166"}),
		'dataType':'json',
		'type':'post',
		'success':function(data){
			console.log(data);
			//判断 编辑
			if(data.code ==1){
				var db = data.data['content'];
				if(db.length ==0) return;

				var html = '';
				//循环 将数据追加到页面中去
				$(db).each(function(i,index){
					var types = index['type'];
					// duosel  dantou danjuzheng text
					
					if(types =='dansel') html +="<li lei='1'>";
					if(types =='duosel') html +="<li lei='2'>";
					if(types =='danjuzheng') html +="<li lei='3'>";
					if(types =='duojuzheng') html +="<li lei='4'>";
					if(types =='dantou') html +="<li lei='5'>";
					if(types =='duotou') html +="<li lei='6'>";
					if(types =='text') html +="<li lei='7'>";

					
					html +="<div class='lef'>\
						<span>Q1</span>\
						<em class='lan'></em>\
						<i class='lan'></i>\
						<p class='lan'></p>\
					</div>\
					<div class='right'>";
							
							//单选
							if(types ==='dansel'){
								html += "<dl><dt><p class='ti edit_title' tyNum='one'>"+index["title"]+"</p></dt>";

								$(index.data).each(function(x,ind){
									html +="<dd>\
									<input type='radio' name='q1'/>\
									<label class='edit_title' tyNum='two'>"+ind+"</label>\
								</dd>"
								})
							}else if(types ==='duosel'){
								html += "<dl><dt><p class='ti edit_title' tyNum='one'>"+index["title"]+"</p></dt>";

								$(index.data).each(function(x,ind){
									html +="<dd>\
									<input type='checkbox' name='q1'/>\
									<label class='edit_title' tyNum='two'>"+ind+"</label>\
									</dd>";
									
								})

								html +="<i  class='xuan_jia'></i></dl>"
							}else if(types ==='dantou'){
								
								html +="<dl>\
								<dt>\
									<p class='tou edit_title' tyNum='one'>"+index['title']+"</p>\
									<p class='piao'>";

									if(index['flag'] ==1){
										html +="<input type='checkbox' name='t1' value='1' checked='checked'/>";
									}else{
										html +="<input type='checkbox' name='t1' value='1'/>";
									}

										
										html +="<span>投票后显示结果</span>\
									</p>\
								</dt>"
								
								$(index.data).each(function(x,ind){
									html +="<dd>\
										<input type='radio' name='q5'/>\
										<label class='edit_title' tyNum='two'>"+ind+"</label>\
									</dd>";
								})


								html+="<i  class='xuan_jia'></i></dl>"
								
							}else if(types =='duotou'){
									html +="<dl>\
									<dt>\
										<p class='tou edit_title' tyNum='one'>"+index['title']+"</p>\
										<p class='piao'>";
										
										if(index['flag'] ==1){
											
											html +="<input type='checkbox' name='t1' value='1' checked='checked'/>"
										}else{
											
											html +="<input type='checkbox' name='t1' value='1'/>"
										}
											
											html +="<span>投票后显示结果</span>\
										</p>\
									</dt>"
									
									$(index.data).each(function(x,ind){
										html +="<dd>\
											<input type='checkbox' name='q5'/>\
											<label class='edit_title' tyNum='two'>"+ind+"</label>\
										</dd>";
									})


								html+="<i  class='xuan_jia'></i></dl>";
							}else if(types =='text'){
								html +="<dl><dt><p class='ti edit_title' tyNum='one'>"+index['title']+"</p></dt>\
							<dd>\
								<textarea name='' id='' cols='30' rows='10'></textarea>\
							</dd></dl>";

							}else if(types =='danjuzheng'){
								html += "<dl>\
									<dt><p class='ti edit_title' tyNum='one'>"+index['title']+"</p></dt>\
									<dd class='juzheng'>\
										<table>";
									
									var Tr = index.data['hang'];
									var Td = index.data['lie'] ;

									//将列循环 组成 第一行
									html +="<tr><td></td>";
									$(Td).each(function(y,val){
										html +="<td class='edit_title' tyNum='thre'>"+val+"</td>";
									})
									html+="</tr>";

									//循环 行 组成最后的 行
									$(Tr).each(function(x,ind){
										html += "<tr>\
												<td class='edit_title' tyNum='four'>"+ind+"</td>\
												<td><span><input type='radio' name='ra_1' /></span></td>\
												<td><span><input type='radio' name='ra_2' /></span></td>\
												<td><span><input type='radio' name='ra_3' /></span></td>\
											</tr>";
									})


										html+="</table>\
									</dd>\
									<dd class='jiayou'></dd>\
									<dd class='jiaxia'></dd>\
								</dl>"
							}else if(types =='duojuzheng'){
								html += "<dl>\
									<dt><p class='ti edit_title' tyNum='one'>"+index['title']+"</p></dt>\
									<dd class='juzheng'>\
										<table>";
									
									var Tr = index.data['hang'];
									var Td = index.data['lie'] ;

									//将列循环 组成 第一行
									html +="<tr><td></td>";
									$(Td).each(function(y,val){
										html +="<td class='edit_title' tyNum='thre'>"+val+"</td>";
									})
									html+="</tr>";

									//循环 行 组成最后的 行
									$(Tr).each(function(x,ind){
										html += "<tr>\
												<td class='edit_title' tyNum='four'>"+ind+"</td>\
												<td><span><input type='checkbox' name='ra_1' /></span></td>\
												<td><span><input type='checkbox' name='ra_2' /></span></td>\
												<td><span><input type='checkbox' name='ra_3' /></span></td>\
											</tr>";
									})


										html+="</table>\
									</dd>\
									<dd class='jiayou'></dd>\
									<dd class='jiaxia'></dd>\
								</dl>";
							}


					html +=	"</div></li>";
					
				})


				$('#cen .rig ul').append(html);
				xunhuan_name();
			}
		}
	})
	
})
