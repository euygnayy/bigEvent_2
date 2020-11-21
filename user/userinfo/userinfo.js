// ------------------用户基本信息获取
var form =layui.form;
$.ajax({
    url:"/my/userinfo",
    success:function(res){
        layer.msg(res.message);
        if(res.status == 0){
            // 快速赋值layUI
            form.val('user', res.data);
        }
    }
});


// -----------------------------------------------------更新数据
// 1. 初始化赋值id
// 2. 收集不会收集disabled；
$("form").on("submit", function(e) {
    e.preventDefault();
  
    // 1 收集数据
    var data = $(this).serialize();
  
    // 2.发送请求
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: data,
      success: function(res) {
        layer.msg(res.message);
        if (res.status == 0) {
          // 业务设计：
          // userInfo页面虽然看起来index在一个页面；其实这是两个页面；
          // 通知外层  JS 代码 重新获取用户信息；
          window.parent.get();
        }
      }
    })
  
  
  
  })

  
//   ---------------------------------重置 不是清空
$('button:contains("重置")').click(function (e) {
    e.preventDefault();
    
    //  为表单重新赋值，请求原来的数据
    //  把获取用户数据重新获取；
    get_info(); 
});