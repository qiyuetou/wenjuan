<?php
 $file=$_FILES['upfile'];
 $name=rand(0,500000).dechex(rand(0,10000)).".jpg";
 move_uploaded_file($file['tmp_name'],"./img/".$name);
//调用iframe父窗口的js 函数
 echo "<script>parent.stopSend('$name')</script>";
?>