$(document).ready(function () {

    $("#btn_addUser").click(function () {
        if(validateAddUserForm().form()){
            addUser();
        } else {
            alert("请检查输入是否合法")
        }
    });
});


//添加用户的ajax方法
function addUser() {
    $.ajax({
        async : false,
        type : 'post',
        url : '/addUser',
        data : $('#addUserForm').serialize(),
        success : function(data) {
            alert("添加成功!");

        },
        error : function(data) {
            alert("添加失败!");
        }
    });
};

//用户名必须由 a-z、0-9、下划线组成，且必须以字母开头
jQuery.validator.addMethod("checkUserName", function(value, element) {
    var chrnum = /^[a-z]([0-9a-z_])+$/i;
    return  (chrnum.test(value));
}, "须由a-z/0-9/下划线组成,以字母开头");

function validateAddUserForm() {
    return $("#addUserForm").validate({
        rules:{
            userName:{
                required:true,
                minlength:3,
                maxlength:16,
                checkUserName:true
            },
            userPwd:{
                required:true,
                minlength:5,
                maxlength:16
            },
            rePassword:{
                required:true,
                equalTo:"#userPwd"
            },
            userEmail:{
                email:true,
                minlength:6,
                maxlength:80
            }
        },
        messages:{
            userName:{
                required:"请输入用户名",
                minlength:"长度不可小于3",
                maxlength:"长度不可大于16",
                checkUserName:"须由a-z/0-9/下划线组成,以字母开头"
            },
            userPwd:{
                required:"请输入密码",
                minlength:"长度不可小于5",
                maxlength:"长度不可大于16"
            },
            rePassword:{
                required:"请确认密码",
                equalTo:"两次密码输入不一致"
            },
            userEmail:{
                email:"请输入规定格式的邮箱",
                minlength:"长度不可小于6",
                maxlength:"长度不可大于80"
            }
        }
    })
}