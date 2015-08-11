
function GetQueryString(name)
   {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
   }
$(function(){
	 // $.fn.hcheckbox=function(options){
  //        $(':checkbox+label',this).each(function(){
  //           $(this).addClass('checkbox');
  //           if($(this).prev().is(':disabled')==false){
  //              if($(this).prev().is(':checked'))
  //              $(this).addClass("checked");
  //           }else{
  //              $(this).addClass('disabled');
  //           }
  //        }).click(function(event){
  //           if(!$(this).prev().is(':checked')){
  //              $(this).addClass("checked");
  //              $(this).prev()[0].checked = true;
  //           }else{
  //              $(this).removeClass('checked');
  //              $(this).prev()[0].checked = false;
  //           }
  //        event.stopPropagation();
  //        }).prev().hide();
  //     }

  //     $.fn.hradio = function(options){
  //        var self = this;
  //        return $(':radio+label',this).each(function(){
  //           $(this).addClass('hRadio');
  //           if($(this).prev().is("checked"))
  //           $(this).addClass('hRadio_Checked');
  //        }).click(function(event){
  //           $(this).siblings().removeClass("hRadio_Checked");
  //           if(!$(this).prev().is(':checked')){
  //                 $(this).addClass("hRadio_Checked");
  //              $(this).prev()[0].checked = true;
  //           }

  //           event.stopPropagation();
  //        }).prev().hide();
  //     }


      // $('#chklist').hcheckbox();
   	  // $('#radiolist').hradio();

   //将jquery 里面的原型 添加方法
   // $.fn.tradio = function(options){
   //    $('.le+.ri').on('click',function(){
   //       console.log(this);
         
   //    })
   // }

   // $('.le').tradio();

   // http://open.mworking.cn/survey/ad_show?sn=8b7ecdbf7187611f541f1f0fb48ba625&token=f7d469eff382e78eded54bdf3d224edd

   //单选
   

   $('body').on('click','input[type=radio]',function(){
     
      //先设置 当前的 为 选中   
      var na = $(this).attr('name');
      // $("input[name="+na+"]").
      $(this).attr('checked','checked').parents('li').siblings('li').find('.le').removeClass('hradio');
      $(this).parents('.le').addClass('hradio');


      // alert($("input[name="+na+"]:checked").val());

   })

   // 多选
   $('body').on('click','input[type=checkbox]',function(){
      
      var na = $(this).attr('name');
      if($(this)[0].checked ==true){
        
         //表明之前 是选中   现在取消
         $(this)[0].checked = true;
         $(this).parents('.les').addClass('hcheckbox');

      }else{
         //表明之前不是选中  现在选中
         $(this)[0].checked = false;
         $(this).parents('.les').removeClass('hcheckbox');

         
      }
      
   })
   
   //获取url里面的额sn 和 uid
   var sn = GetQueryString('sn');
   var uid = GetQueryString('uid');
   var xhr = (function XHR(){
      var xhr;
      if (window.XMLHttpRequest){
        return xhr=new XMLHttpRequest();
      }else{
         return xhr=new ActiveXObject("Microsoft.XMLHTTP");
      } 
   })();
   

   xhr.open("post","http://open.mworking.cn/sapi",true);
   xhr.send(JSON.stringify({"op":"get_answer","sn":sn,"uid":uid}));

   xhr.onreadystatechange = function () {
      
      if (xhr.readyState==4 && xhr.status ==200) {
         // var arr = eval('['+xhr.responseText +']');
         arr = JSON.parse(xhr.responseText);
         var data = arr;
         
         if(data['code'] ==1){
            //表示成功了
            if(data.data['answer'].length ==0){
             //表示没有回答过  展示提交页面
             $('.biaoti').text(data.data['subject']);
             var newHtml = "<section><div id='ti'>";

             var con = data.data['content'];
             $(con).each(function(i,index){
                if(index['type'] =='dansel' || index['type'] =='dantou'||index['type'] =='duotou'|| index['type'] =='duosel'){
                   newHtml +="<div class='dansel' lei='"+index['type']+"'><div class='title'>"+index['title']+"</div><div class='sel'><ul>";
                   
                   //循环选项
                      for(x in index['data']){
                         if(index['type'] =='dansel' || index['type'] =='dantou'){
                            newHtml +="<li class='danclick'><div class='le'>";
                         }else{
                            newHtml +="<li class='duoclick'><div class='les'>";
                         }
                         
                         if(index['type'] =='dansel' || index['type'] =='dantou'){
                            newHtml +="<input type='radio' name='ra_"+(i+1)+"' value='"+x+"'>";
                         }
                         if(index['type'] =='duosel' || index['type'] =='duotou'){
                            newHtml +="<input type='checkbox' name='ra_"+(i+1)+"' value='"+x+"'>";
                         }
                                 
                         newHtml +="</div>\
                         <div class='ri'><span class='con'>"+index.data[x]+"</span>";

                         // if(index['type'] =='dantou' || index['type'] =='duotou'){
                         //    newHtml +="<span class='piao'>108票</span>";
                         // }
                         newHtml +="</div></li>";
                      }
                   
                   
                   
                   newHtml += "</ul></div></div>";
                }

                //问答
                if(index['type'] =='text'){
                   newHtml +="<div class='dansel' lei='"+index['type']+"'><div class='title'>"+index['title']+"</div><div class='sel'><textarea name='ra_"+(i+1)+"' cols='30' rows='10'>"+index.data[0]+"</textarea></div></div>";
                }

                //单选矩阵和多选矩阵
                if(index['type'] =='duojuzheng' || index['type'] == 'danjuzheng'){

                   newHtml +="<div class='dansel' lei='"+index['type']+"'><div class='title'>"+index['title']+"</div><div class='sel'>";
                   //循环 行 接着 循环列
                   $(index['data']['hang']).each(function(y,val){
                      newHtml +="<div class='title'>"+val+"</div><ul>";

                      $(index['data']['lie']).each(function(z,value){
                         
                            if(index['type'] =='duojuzheng'){
                               newHtml +="<li class='cclick'><div class='les'>";
                            }else{
                               newHtml +="<li class='rclick'><div class='le'>";
                            }
                             
                            if(index['type'] =='duojuzheng'){
                               newHtml +="<input type='checkbox' name='ra_"+i+'_'+y+"' value='"+z+"'>";
                            }else{
                               newHtml +="<input type='radio' name='ra_"+i+'_'+y+"' value='"+z+"'>";
                            }
                                 
                            newHtml +="</div>\
                            <div class='ri'><span>"+value+"</span></div>\
                         </li>";
                      })

                      newHtml +="</ul>"
                   })
                   
                   newHtml += "</div></div>";
                }

             })
             // alert(newHtml);
             newHtml +="</div></section><footer><div class='tijiao'>提交</div></footer>";
             
             $('body').append(newHtml);

            }else{

               //表示已经回答过  展示页面
               var newHtml = "<section><div id='ti'>";
               // console.log(data)
               $('.biaoti').text(data.data['subject']);
               var con = data.data['content'];
               var answer = data.data['answer'];
               
               $(con).each(function(i,index){

                   newHtml +="<div class='dansel'><div class='title'>"+index['title']+"</div><div class='sel'>";
                   // console.log(answer);
                   newHtml += get_complete(index,answer[i]);
   
                   newHtml += "</div></div>";
               })
               newHtml +="</div></section>";
              
               $('body').append(newHtml);
                     
            }

                  

         
         }
      }
   };
   // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
   


   //组合完成后的字符串
    function get_complete(index,answer){
      
      
    
        var type = index['type'];
        var newHtml ='';
        if(type =='dansel' ||type == 'dantou'  ){
            if(index['data'].length ==0) return '';
            newHtml +="<ul>";
            $(index['data']).each(function(x,val){

               
                if(answer[0] ==x){
                    newHtml +="<li><div class='le_checked'></div>";
                }else{
                    newHtml +="<li><div class='le'></div>"
                }
               newHtml +="<div class='ri'><span class='con'>"+val+"</span>"; 
               
               if(type == 'dantou' && index['flag'] ==1){
                  //判断是否有投票
                  
                  newHtml +="<span class='piao'>"+index['vote_res'][x]+"票</span>"
               }
               newHtml +="</div></li>"
            })
            newHtml +="</ul>";
            
        }else if( type == 'duosel' || type=='duotou'){
            if(index['data'].length ==0) return '';
            newHtml +="<ul>";

            $(index['data']).each(function(x,val){
             
                  if(answer[x] ==x){
                       newHtml +="<li><div class='les_checked' ></div>"
                  }else{
                       newHtml +="<li><div class='les' ></div>"
                  }   
               
                
               newHtml +="<div class='ri'><span class='con'>"+val+"</span>";
               if(type == 'duotou' && index['flag'] ==1){
                  //判断是否有投票

                  newHtml +="<span class='piao'>"+index['vote_res'][x]+"票</span>"
               }
               newHtml +="</div></li>"; 
            })

            newHtml +="</ul>";
        }else if(type =='text'){
            
            newHtml +="<div class='sel'><div class='textarea'>"+answer[0]+"</div></div>";
        }else if(type =='danjuzheng' || type =='duojuzheng'){

            console.log(index['data']['hang']);
            
            $(index['data']['hang']).each(function(x,val){

               newHtml +="<div class='title'>"+val+"</div><ul>";
               $(index['data']['lie']).each(function(y,value){
                 
                 //判断 单选矩阵  和 赋值
                 if(type == 'danjuzheng'){
                     if(y == parseInt(answer[x])){
                        newHtml +="<li><div class='le_checked'>";
                     }else{
                        newHtml +="<li><div class='le'>";
                     }
                 }else{
                     if(y == parseInt(answer[x][y])){
                        newHtml +="<li><div class='les_checked'>";
                     }else{
                        newHtml +="<li><div class='les'>";
                     }
                 }
                  
                  newHtml +='</div><div class="ri"><span>'+value+'</span></div></li>';
               })
               newHtml +="</ul>";
               
            })
          

          
        }

        return newHtml;
    }
   
   //提交

   $('body').on('click','.tijiao',function(){
      // 获取数据
      var obj={
         "op": "set_answer",
         "sn": sn,
         "uid": uid,
         'content':{},
      };

      //存储没填写 的对象
      var arr = {};
      $('#ti .dansel').each(function(i,index){
         //根据class 的不同 来储存数据
         var lei = $(index).attr('lei');
         if(lei == 'dansel' ||lei =='dantou'){
            obj.content[i] = {};
            //表示单选
            var dansel = $(index).find('input[type=radio]:checked').val();
            if(dansel ==undefined){
               //表示 单选 未填写
               arr['ul']= $(index).find('ul');
               arr['error'] =5;
               return false;
            }
            obj.content[i][0] = dansel;
         }


         if(lei == 'text'){
            obj.content[i] = {};
            var text = $(index).find('textarea').val();
            
            if(text ==''){
               arr['ul']= $(index).find('textarea');
               arr['error'] =4;
               return false;
            }
            obj.content[i][0] = text;
         }

         if(lei =='duosel' ||lei =='duotou'){
            obj.content[i] ={};

            //用来判断 是否选中多选
            var is=1;
            $(index).find('input[type=checkbox]').each(function(x,val){
               
               if($(val)[0].checked ==true){
                  is=2;
                  obj.content[i][x] = $(val).val();
               }
            })
            if (is !=2) {
               arr['ul'] = $(index).find('ul');
               arr['error'] =3;
               return false;
            };
            
         }

         //矩阵
         if (lei == 'danjuzheng') {
            obj.content[i]={};
            $(index).find('ul').each(function(x,val){
               var dansel = $(val).find('input[type=radio]:checked').val();
               if(dansel == undefined){
                 arr['ul'] = $(val);
                 arr['error'] =1;
                  return false;
               }
               obj.content[i][x] = {};
               //保持和多矩阵格式一样
               obj.content[i][x][0] = dansel;

            })
         };

         if(lei == 'duojuzheng'){
            obj.content[i] = {};
            $(index).find('ul').each(function(x,val){
               obj.content[i][x] = {};
               var is_com = 1;
               $(val).find('input[type=checkbox]').each(function(y,value){
                  //循环每一个 多选框

                  if($(value)[0].checked ==true){
                     is_com = 2;
                     obj.content[i][x][y] = $(value).val();
                  }


               })

               //判断这个 是否 选中
               if(is_com !=2){
                  arr['ul'] = $(val);
                  arr['error'] =2;
                  return false;
               }
               
            })
         }
      })
      
      //判断 是不是空对象
      if(!$.isEmptyObject(arr)){
         console.log(arr);
         var arrTop = $(arr['ul']).offset().top;
         console.log(arrTop);
         console.log(  arr['ul']);
         console.log(arr['error']);
         var scrollTop = $(window).scrollTop();
         //if(arrTop <= scrollTop){
         //   $('body,html').animate({'scrollTop':arrTop},800);
         //}

          is_diplay();
      }else{

         
         xhr.open("post","http://open.mworking.cn/sapi",true);

         xhr.onreadystatechange = function () {
         
            if (xhr.readyState==4 && xhr.status ==200){

               var arr = eval('['+xhr.responseText +']');
               window.location.href='./';
            }
         }

         xhr.send(JSON.stringify(obj));

      }
      
      
   })


    //显示
    function is_display(){
        var html = "<div id='dis'>请完成所有问题</div>";
        var he = $(window).height() -50;
        $('body').append(html);

        $('#dis').css({'top':he/2}).show();
        setTimeout(function(){
            $('#dis').hide();
        },1500)
    }
})