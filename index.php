<!DOCTYPE html>
<html>
<head>
    <title>Html5 Ajax 上传文件</title>
    <meta charset="utf-8">
         <script type="text/javascript" src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript">

$(function(){
 $("#file").change(function(){
    //$('#file').value=document.getElementById('textfield').value;
    UpladFile();
 });
});
    var xhr;
    function createXMLHttpRequest()
    {
        if(window.ActiveXObject)
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if(window.XMLHttpRequest)
        {
            xhr = new XMLHttpRequest();
        }
    }
    function UpladFile()
    {
        var fileObj = document.getElementById("file").files[0];
        var FileController = 'http://lc.xuanke.com/survey/upload';
        var form = new FormData();
        form.append("userfile", fileObj);
        createXMLHttpRequest();
        xhr.onreadystatechange = handleStateChange;
        xhr.open("post", FileController, true);
        xhr.send(form);
    }
    function handleStateChange()
    {
        if(xhr.readyState == 4)
        {
            if (xhr.status == 200 || xhr.status == 0)
            {
                var result = xhr.responseText;
                alert(result);
                var json = eval("(" + result + ")");
                alert('图片链接:n'+json.file);
            }
        }
    }
</script>
<style>
/*    .txt{ height:28px; border:1px solid #cdcdcd; width:670px;}
    .mybtn{ background-color:#FFF; line-height:14px;vertical-align:middle;border:1px solid #CDCDCD;height:30px; width:70px;}
    .file{ position:absolute; top:0; right:80px; height:24px; filter:alpha(opacity:0);opacity: 0;width:260px }*/
</style>
</head>
<body>
<div class="form-group">
    <label class="control-label">图片</label>
    <br/>
    <input type="file" name="file" class="file" id="file" size="28"/>
</div>
</body>
</html>