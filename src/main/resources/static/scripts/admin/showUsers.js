$(document).ready(function (){
    var userId = $("#userId"),
        userName = $("#userName"),
        userEmail = $( "#userEmail" ),
        userPwd = $( "#userPwd" ),
        allFields = $( [] ).add( userName ).add( userEmail ).add( userPwd ).add(userId),
        tips = $( ".validateTips" ),
        rowIndex;

    // 这里使用最原始的js语法实现，可对应换成jquery语法进行逻辑控制
    var demoImg = document.getElementById("demo_img");
    var demoInput = document.getElementById("userPwd");
    //隐藏text block，显示password block


    $("#demo_img").click(function (){
        if (demoInput.type == "password") {
            demoInput.type = "text";
            demoImg.src = "/images/invisible.png";
        }else {
            demoInput.type = "password";
            demoImg.src = "/images/visible.png";
        }
    });

    //检查能否再点击上一页，下一页
    var lab1=$("#lab1").html().trim();//获取当前页码
    var lab2=$("#lab2").html().trim();//获取总页码
    // alert(lab1+" *****"+lab2);
    $("#prePage").click(function () {
        if(lab1==1){
            alert("已经是第一页了!");
            return false;
        }
        return true;
    });
    $("#nextPage").click(function () {
        if(lab1==lab2){
            alert("已经是最后一页了!");
            return false;
        }
        return true;
    });

    $("#addBookBtn").click(function () {
        findAllBookCategoryUpdate();
        $( "#dialog-form" ).dialog( "open" );
    });

    //点击删除按钮后删除一行
    $(".deleteUserButton").click(function () {
        if(confirm("确认删除?")){

            var userId=$(this).val();
            // alert(userId);
            deleteBookCategoryById(userId);
            $(this).parent().parent().remove();
            location.reload();
        }
    });

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "" + n + " 的长度必须在 " +
                min + " 和 " + max + " 之间。" );
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "修改": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );
                bValid = bValid && checkLength( userName, "username", 3, 16 );
                bValid = bValid && checkLength( userEmail, "email", 6, 80 );
                bValid = bValid && checkLength( userPwd, "password", 5, 16 );
                bValid = bValid && checkRegexp( userName, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。" );
                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                bValid = bValid && checkRegexp( userEmail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                bValid = bValid && checkRegexp( userPwd, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9" );
                if ( bValid ) {
                    updateUser();//ajax更新用户信息
                    $( this ).dialog( "close" );
                }
            },
            "取消": function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });

    $( ".updateUserButton" )
        .click(function() {
            var b = $(this);
            var tr = b.parents("tr");
            var tds = tr.children();
            var input = tr.children("input");
            //设置初始值
            userId.val(tds.eq(0).text());
            userName.val(tds.eq(1).text());
            userEmail.val(tds.eq(2).text());
            userPwd.val(tds.eq(3).val());

            rowIndex=b.parent().parent().rowIndex;
            $( "#dialog-form" ).dialog( "open" );
        });
});

function updateUser() {
    $.ajax({
        async : false,
        type : 'post',
        url : '/updateUserByAdmin',
        data : $('#updateUserForm').serialize(),
        success : function(data) {
            alert("修改成功");
            location.reload();
        },
        error : function(data) {
            alert("修改失败");
        }
    })  ;
};

//ajax删除用户
function deleteBookCategoryById(userId) {
    $.ajax({
        async : false,
        type : "post",
        url : "/deleteUser",
        dataType : "json",
        data: {userId:userId},
        success: function (data) {

        },
        error:function (data) {
            alert(data.result);
        }
    });
}