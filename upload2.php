<?php
 $file=$_FILES['userfile'];
 $name=rand(0,500000).dechex(rand(0,10000)).".jpg";
 $flag=move_uploaded_file($file['tmp_name'],"./img/".$name);
 if($flag){
 	echo json_encode(array('err'=>0,'url'=>$_SERVER['HTTP_HOST'].'/img/'.$name));
 	exit;
 }
echo json_encode(array('err'=>1));
exit;
//调用iframe父窗口的js 函数
//echo "<script>parent.stopSend('$name')</script>";
?>