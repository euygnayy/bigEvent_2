// ------------------用户基本信息获取
var form =layui.form;
$.ajax({
    url:"/my/userinfo",
    success:function(res){
        layer.msg(res.message);
        if(res.status == 0){
            // 快速赋值layUI
            var form = layui.form;
            form.val('user', res.data);
        }
    }
})