$(document).ready(function () {

    var categoryId = $("#categoryId"),
        categoryNameUpdate = $( "#categoryNameUpdate" ),
        allFields = $( [] ).add( categoryId ).add( categoryNameUpdate ),
        tips = $( ".validateTips" );

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

    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkExist( o, n) {
        if ( o.val() == -1 ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }

    function checkNum( o, n) {
        if ( o.val()<0 || o.val()>9999 || o.val()%1 != 0) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
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
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            // "录入": function() {
            //     var bValid = true;
            //     allFields.removeClass( "ui-state-error" );
            //
            //     bValid = bValid && checkLength( categoryNameUpdate, "种类名称", 1, 20 );
            //
            //     bValid = bValid && checkRegexp( categoryNameUpdate,  /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·s]{1,20}$/, "请规范种类名称");
            //
            //     if ( bValid) {
            //         addBook();//ajax更新用户信息
            //         $( this ).dialog( "close" );
            //     } else {
            //     }
            // },
            "修改": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( categoryNameUpdate, "种类名称", 1, 20 );

                bValid = bValid && checkRegexp( categoryNameUpdate,  /^[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z·s]{1,20}$/, "请规范种类名称");

                if ( bValid) {
                    updateBookCategory();//ajax更新用户信息
                    location.reload();
                    $( this ).dialog( "close" );
                } else {
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

    $("#addBookBtn").click(function () {
        findAllBookCategoryUpdate();
        $( "#dialog-form" ).dialog( "open" );
    });

    $( ".btn_updateCategory" )
        .click(function() {
            var b = $(this);
            var tr = b.parents("tr");
            var tds = tr.children();
            //设置初始值
            categoryId.val(tds.eq(0).text());
            categoryNameUpdate.val(tds.eq(1).text());

            $( "#dialog-form" ).dialog( "open" );
        });

    //表单验证后，添加种类
   $("#btn_addBookCategory").click(function () {
       if(validateForm().form())
       addBookCategory();
   });

   //点击删除按钮后删除一行
    $(".btn_deleteCategory").click(function () {
        if(confirm("确认删除?")){

            var bookCategoryId=$(this).val();
            // alert(bookCategoryId);
            deleteBookCategoryById(bookCategoryId);
            // $(this).parent().parent().remove();

            location.reload();
        }

    });
});

//表单验证
function validateForm() {
    return  $("#addBookCategoryForm").validate({
        rules:{
            categoryName:{
                required:true
            }
        },
        messages:{
            categoryName:{
                required:"请输入图书类别"
            }
        }
    }) ;
}

//ajax修改种类
function updateBookCategory() {
    $.ajax({
        async : false,
        type : "post",
        url : "/updateBookCategory",
        dataType : "json",
        data: $("#updateBookCategoryForm").serialize(),
        success: function (data) {
            console.log(data.toString());
            if(data.toString()=="true"){
                alert("修改成功!");
            }else{
                alert("修改失败!");
            }

        },
        error:function (data) {
            alert("种类不得重复!");
        }
    });
};

//ajax添加种类
function addBookCategory() {
    $.ajax({
        async : false,
        type : "post",
        url : "/addBookCategory",
        dataType : "json",
        data: $("#addBookCategoryForm").serialize(),
        success: function (data) {
            console.log(data.toString());
            if(data.toString()=="true"){
                alert("添加成功!");
            }else{
                alert("添加失败!");
            }

        },
        error:function (data) {
            alert(data.result);
        }
    });
};

//ajax删除种类
function deleteBookCategoryById(bookCategoryId) {
    $.ajax({
        async : false,
        type : "post",
        url : "/deleteCategory",
        dataType : "json",
        data: {bookCategoryId:bookCategoryId},
        success: function (data) {
            if(data.toString()=="true"){
                alert("删除成功!");
            }else{
                alert("删除失败，请清理属于该种类的书籍!");
            }
        },
        error:function (data) {
            alert("删除失败!");
        }
    });
}

