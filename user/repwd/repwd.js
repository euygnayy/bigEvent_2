//      1.新密码不能和旧密码一样
//      2.新密码 长度要求6-12位
//      3.两次输入新密码 要一样

var form = layui.form;
form.verify({
  // 规则名：[正则、不符合正则提醒信息]
  //   新密码 长度要求6-12位
  changdu: [/^\S{6,12}$/, "不满足长度要求"],


  // 规则名：函数，必须 有return  不符合正则提醒信息
  //   两次输入新密码 要一样
  same: function(val) {
    // 第一输入新密码：直接获取；HTML结构上做一些简单类名补充，方便获取值
    // 再次输入新密码：val

    if ($(".newPwd").val() != val) {
      return "两次输入的密码不一致";
    }
  },


  //新密码和旧密码不能一样
  diff:function(val){
      //旧密码 .oldPwd
      //新密码 val
      if($(".oldPwd").val() == val){
          return "新旧密码不能一样";
      }
      
  }
});


// 点击按钮 提交数据
$("form").on("submit",function(e){
    e.preventDefault();


    // 1.收集数据
    // 直接设置disabled不会被收集  无name设置也不会被收集
    var data = $(this).serialize();
    $.post('/my/updatepwd', data, function (res) {
        // 无论修改成功还是失败，都给出提示
        layer.msg(res.message);
        if (res.status === 0) {
            // 修改成功，清空输入框的值
            $('form')[0].reset(); // DOM方法reset表示重置表单 原生方法
        }
    });
})