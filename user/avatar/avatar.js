// -------------------------------------------------------------  图片初始化
// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
});



// -------------------------------------------------------------  选择图片
$(".select").click(function () {
    $("#file").click();
});

//   选择图片
$("#file").change(function () {
    // 1.文件对象
    var obj = this.files[0];

    // 2.创建临时图片历史
    var src = URL.createObjectURL(obj);

    $('#image').cropper("replace", src);
})


// ------------- ----------------------------------------------- 点击确定按钮
$(".sure").click(function() {
    
    // 使用插件的方法 得到canvas对象
    var canvas = $('#image').cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    });
    
    // canvas对象把裁剪出来的图片信息 toDataURL转为base64字符串
    // 意见:小图片使用base64 后台给
    var base64 = canvas.toDataURL('image/png');
  
    // 3.ajax提交字符串，完成更新
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: { avatar: base64 },
      success: function(res) {
        layer.msg(res.message);
        if (res.status === 0) {
          // 重新渲染父页面的头像
          window.parent.get();
        }
      }
    });
  });